-- Run only against a disposable database after the v1 migration.
begin;
do $$
declare
  role_name text;
  fn constant text := 'public.submit_feedback_v1(uuid,text,text,text,text,text,double precision,double precision)';
  request uuid := '01954b40-bf10-4000-8000-000000000001';
  key text := repeat('a', 64);
  outcome text;
  before_count integer;
  i integer;
begin
  foreach role_name in array array['anon', 'authenticated'] loop
    if has_schema_privilege(role_name, 'campus_feedback_v1_private', 'USAGE')
       or has_table_privilege(role_name, 'campus_feedback_v1_private.feedback_v1', 'SELECT')
       or has_table_privilege(role_name, 'campus_feedback_v1_private.feedback_v1', 'INSERT')
       or has_function_privilege(role_name, fn, 'EXECUTE')
    then raise exception 'Unexpected feedback access for %', role_name; end if;
  end loop;
  if not has_function_privilege('service_role', fn, 'EXECUTE')
     or has_table_privilege('service_role', 'campus_feedback_v1_private.feedback_v1', 'INSERT')
  then raise exception 'Service role is not limited to intake RPC'; end if;

  select count(*) into before_count from campus_feedback_v1_private.feedback_v1;
  outcome := public.submit_feedback_v1(request, key, 'incorrect_location',
    'Synthetic location report', null, 'academic-block', 13.1, 77.5);
  if outcome is distinct from 'saved' then raise exception 'Save failed: %', outcome; end if;

  outcome := public.submit_feedback_v1(request, repeat('b', 64), 'incorrect_location',
    'Synthetic location report', null, 'academic-block', 13.1, 77.5);
  if outcome is distinct from 'duplicate' then raise exception 'Retry was not deduplicated'; end if;

  outcome := public.submit_feedback_v1(request, key, 'incorrect_location',
    'A different test message', null, 'academic-block', 13.1, 77.5);
  if outcome is distinct from 'conflict' then raise exception 'Mismatched retry was not rejected'; end if;

  for i in 2..8 loop
    outcome := public.submit_feedback_v1(md5('rate-test' || i)::uuid, key, 'feedback',
      'Synthetic test message', 'test@example.invalid', null, null, null);
    if outcome is distinct from 'saved' then raise exception 'Limit applied too early'; end if;
  end loop;
  outcome := public.submit_feedback_v1(md5('rate-test9')::uuid, key, 'feedback',
    'Synthetic test message', null, null, null, null);
  if outcome is distinct from 'limited' then raise exception 'Per-client limit not enforced'; end if;

  if (select count(*) from campus_feedback_v1_private.feedback_v1) <> before_count + 8
  then raise exception 'Unexpected feedback row count'; end if;

  for i in 9..120 loop
    outcome := public.submit_feedback_v1(md5('global-test' || i)::uuid,
      lpad(to_hex(i), 64, '0'), 'feedback', 'Synthetic test message', null, null, null, null);
    if outcome is distinct from 'saved' then raise exception 'Global limit applied too early'; end if;
  end loop;
  outcome := public.submit_feedback_v1(md5('global-test121')::uuid, repeat('c',64),
    'feedback', 'Synthetic test message', null, null, null, null);
  if outcome is distinct from 'limited' then raise exception 'Global limit not enforced'; end if;
end
$$;
rollback;
