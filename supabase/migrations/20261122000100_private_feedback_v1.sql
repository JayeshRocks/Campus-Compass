begin;

create schema if not exists campus_feedback_v1_private;
revoke all on schema campus_feedback_v1_private from public, anon, authenticated, service_role;

create table campus_feedback_v1_private.feedback_v1 (
  request_id uuid primary key,
  created_at timestamptz not null default now(),
  category text not null check (category in ('missing_place','incorrect_location','incorrect_info',
    'routing_error','accessibility','bug','feature_request','feedback')),
  message text not null check (char_length(message) between 1 and 2000 and length(btrim(message)) > 0),
  email text check (char_length(email) between 1 and 254),
  building_id text check (building_id ~ '^[A-Za-z0-9_-]{1,80}$'),
  lat double precision,
  lng double precision,
  check ((lat is null and lng is null) or
    (lat is not null and lng is not null and lat between -90 and 90 and lng between -180 and 180))
);
create table campus_feedback_v1_private.feedback_rate_v1 (
  window_start timestamptz not null,
  requester_key text not null,
  hits integer not null check (hits > 0),
  primary key (window_start, requester_key)
);
alter table campus_feedback_v1_private.feedback_v1 enable row level security;
alter table campus_feedback_v1_private.feedback_rate_v1 enable row level security;
revoke all on all tables in schema campus_feedback_v1_private from public, anon, authenticated, service_role;

create function public.submit_feedback_v1(
  p_request_id uuid, p_requester_key text, p_category text, p_message text,
  p_email text, p_building_id text, p_lat double precision, p_lng double precision
) returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_existing campus_feedback_v1_private.feedback_v1%rowtype;
  v_now timestamptz := date_trunc('hour', now(), 'UTC');
  v_hits integer;
begin
  if p_requester_key is null or p_requester_key !~ '^[0-9a-f]{64}$' then
    raise exception 'Invalid rate key';
  end if;

  -- Serialize retries on the same UUID even if the requester key has changed.
  perform pg_advisory_xact_lock(hashtextextended('campus-feedback-v1:' || p_request_id::text, 0));
  select * into v_existing from campus_feedback_v1_private.feedback_v1 where request_id = p_request_id;
  if found then
    if (v_existing.category, v_existing.message, v_existing.email, v_existing.building_id, v_existing.lat, v_existing.lng)
       is not distinct from (p_category, p_message, p_email, p_building_id, p_lat, p_lng)
    then return 'duplicate'; end if;
    return 'conflict';
  end if;

  -- Counter updates and the report insert run inside the same DB transaction.
  -- Guarded ON CONFLICT updates make both limits safe across concurrent instances.
  insert into campus_feedback_v1_private.feedback_rate_v1 as rate (window_start, requester_key, hits)
    values (v_now, p_requester_key, 1)
    on conflict (window_start, requester_key) do update set hits = rate.hits + 1 where rate.hits < 8
    returning hits into v_hits;
  if not found then return 'limited'; end if;

  insert into campus_feedback_v1_private.feedback_rate_v1 as rate (window_start, requester_key, hits)
    values (v_now, 'global', 1)
    on conflict (window_start, requester_key) do update set hits = rate.hits + 1 where rate.hits < 120
    returning hits into v_hits;
  if not found then return 'limited'; end if;

  insert into campus_feedback_v1_private.feedback_v1(request_id, category, message, email, building_id, lat, lng)
    values (p_request_id, p_category, p_message, p_email, p_building_id, p_lat, p_lng);

  -- This only purges expired counters in the new isolated table, never reports.
  delete from campus_feedback_v1_private.feedback_rate_v1 where window_start < v_now - interval '24 hours';
  return 'saved';
end;
$$;

revoke all on function public.submit_feedback_v1(uuid,text,text,text,text,text,double precision,double precision)
  from public, anon, authenticated, service_role;
grant execute on function public.submit_feedback_v1(uuid,text,text,text,text,text,double precision,double precision)
  to service_role;

commit;
