import assert from 'node:assert/strict';
import { test } from 'node:test';
import { makeFeedbackHandler, validateFeedback } from '../server/feedback.mjs';

const input = { requestId: 'a6567ce2-aed2-4875-8f23-99e85476658a', category: 'feedback', message: ' map note ' };
const env = {
  VERCEL_ENV: 'preview', FEEDBACK_STAGING_ENABLED: 'true',
  FEEDBACK_STAGING_SUPABASE_URL: 'https://disposable.supabase.co',
  FEEDBACK_STAGING_SUPABASE_KEY: 'sb_secret_test_only',
  FEEDBACK_STAGING_RATE_SECRET: 'a synthetic secret for unit tests only',
};
const url = 'https://preview.example.com/api/feedback';
function request(body = input, overrides = {}) {
  return new Request(url, { method: 'POST',
    headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.45' },
    body: JSON.stringify(body), ...overrides });
}
const rejectFetch = async () => { assert.fail('Unexpected fetch'); };

test('validates and normalizes all allowed fields', () => {
  assert.deepEqual(validateFeedback({ ...input, email: ' note@example.com ', buildingId: 'ab-1', pin: { lat: 13, lng: 77 } }),
    { requestId: input.requestId, category: 'feedback', message: 'map note', email: 'note@example.com', buildingId: 'ab-1', lat: 13, lng: 77 });
  for (const fields of [{ requestId: '123' }, { category: 'general' }, { message: ' ' },
    { message: 'x'.repeat(2001) }, { message: 'x\0' }, { fullName: 'unexpected' },
    { email: 'bad' }, { email: 'a@example.com\n' }, { buildingId: '?' },
    { pin: { lat: 91, lng: 77 } }, { pin: { lat: 13, lng: 77, extra: 0 } }, { pin: { lat: 13 } }]) {
    assert.equal(validateFeedback({ ...input, ...fields }), null);
  }
});

test('saves an explicitly selected issue location and omits missing coordinates', async () => {
  const payloads = [];
  const handle = makeFeedbackHandler({ env, fetcher: async (_target, options) => {
    const { p_building_id, p_lat, p_lng } = JSON.parse(options.body);
    payloads.push([p_building_id, p_lat, p_lng]);
    return Response.json('saved');
  }});
  assert.equal((await handle(request({ ...input, category: 'incorrect_location',
    buildingId: 'academic-block', pin: { lat: 13.1, lng: 77.5 } }))).status, 200);
  assert.equal((await handle(request(input))).status, 200);
  assert.deepEqual(payloads, [['academic-block', 13.1, 77.5], [null, null, null]]);
  assert.equal(validateFeedback({ ...input, category: 'pin_marker' }), null);
});

test('disabled endpoints gate before any persistence', async () => {
  for (const disabled of [{ VERCEL_ENV: 'production' }, { FEEDBACK_STAGING_ENABLED: 'false' },
    { FEEDBACK_STAGING_SUPABASE_URL: 'http://disposable.supabase.co' },
    { FEEDBACK_STAGING_SUPABASE_URL: 'https://other.example.com' }, { FEEDBACK_STAGING_SUPABASE_KEY: 'sb_publishable_invalid' }]) {
    const handle = makeFeedbackHandler({ env: { ...env, ...disabled }, fetcher: rejectFetch });
    const result = await handle(request());
    assert.equal(result.status, 503);
    assert.deepEqual(await result.json(), { ok: false, error: disabled.VERCEL_ENV === 'production' ? 'unavailable' : 'feedback_disabled' });
  }
});

test('rejects wrong method, cross-origin, absent platform IP, bad JSON, oversize, and wrong media type', async () => {
  const handle = makeFeedbackHandler({ env, fetcher: rejectFetch });
  assert.equal((await handle(new Request(url))).status, 405);
  const headers = { 'content-type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.45' };
  assert.equal((await handle(request(input, { headers: { ...headers, origin: 'https://other.example.com' } }))).status, 403);
  assert.equal((await handle(request(input, { headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.45' } }))).status, 503);
  assert.equal((await handle(request(input, { headers: { ...headers, 'content-type': 'text/plain' } }))).status, 415);
  assert.equal((await handle(request(input, { body: 'broken' }))).status, 400);
  assert.equal((await handle(request(input, { body: JSON.stringify('x'.repeat(8193)) }))).status, 413);
});

test('calls only the staging RPC with pseudonymous requester key and clean payload', async () => {
  const handle = makeFeedbackHandler({ env, fetcher: async (target, options) => {
    assert.equal(target.href, 'https://disposable.supabase.co/rest/v1/rpc/submit_feedback_v1');
    assert.equal(options.headers.apikey, env.FEEDBACK_STAGING_SUPABASE_KEY);
    assert.equal(options.headers.Authorization, undefined);
    const body = JSON.parse(options.body);
    assert.match(body.p_requester_key, /^[0-9a-f]{64}$/);
    assert.ok(!options.body.includes('192.0.2.45'));
    assert.equal(body.p_message, 'map note');
    assert.equal(body.p_email, null);
    return Response.json('saved');
  }});
  const result = await handle(request());
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await result.json(), { ok: true });
});

test('maps duplicates, rate limits, conflict, and backend failures without leaking details', async () => {
  for (const [backend, expected] of [
    ['duplicate', 200], ['limited', 429], ['conflict', 409], ['unexpected', 503],
  ]) {
    const handle = makeFeedbackHandler({ env, fetcher: async () => Response.json(backend) });
    const res = await handle(request());
    assert.equal(res.status, expected);
    if (expected === 429) assert.equal(res.headers.get('retry-after'), '3600');
  }
  const handle = makeFeedbackHandler({ env, fetcher: async () => new Response('private backend error', { status: 500 }) });
  assert.deepEqual(await (await handle(request())).json(), { ok: false, error: 'unavailable' });
});

const prodEnv = {
  VERCEL_ENV: 'production', FEEDBACK_PRODUCTION_ENABLED: 'true',
  FEEDBACK_PRODUCTION_SUPABASE_URL: 'https://feedbackonly.supabase.co',
  FEEDBACK_PRODUCTION_SUPABASE_KEY: 'sb_secret_prod_synthetic_only',
  FEEDBACK_PRODUCTION_RATE_SECRET: 'an independent production test secret',
};

test('production requires an explicit gate and complete valid production-only inputs', async () => {
  for (const overrides of [
    { FEEDBACK_PRODUCTION_ENABLED: undefined },
    { FEEDBACK_PRODUCTION_ENABLED: 'false' },
    { FEEDBACK_PRODUCTION_SUPABASE_URL: undefined },
    { FEEDBACK_PRODUCTION_SUPABASE_URL: 'http://feedbackonly.supabase.co' },
    { FEEDBACK_PRODUCTION_SUPABASE_URL: 'https://feedbackonly.supabase.co/something' },
    { FEEDBACK_PRODUCTION_SUPABASE_KEY: undefined },
    { FEEDBACK_PRODUCTION_SUPABASE_KEY: 'sb_publishable_synthetic_only' },
    { FEEDBACK_PRODUCTION_RATE_SECRET: undefined },
    { FEEDBACK_PRODUCTION_RATE_SECRET: 'short' },
    { VERCEL_ENV: 'development' },
  ]) {
    const handle = makeFeedbackHandler({ env: { ...env, ...prodEnv, ...overrides }, fetcher: rejectFetch });
    assert.equal((await handle(request())).status, 503);
  }
});

test('production rejects a known shared project or reused preview credential', async () => {
  for (const overrides of [
    { VITE_SUPABASE_URL: prodEnv.FEEDBACK_PRODUCTION_SUPABASE_URL + '/' },
    { FEEDBACK_STAGING_SUPABASE_URL: prodEnv.FEEDBACK_PRODUCTION_SUPABASE_URL },
    { FEEDBACK_STAGING_SUPABASE_KEY: prodEnv.FEEDBACK_PRODUCTION_SUPABASE_KEY },
    { FEEDBACK_STAGING_RATE_SECRET: prodEnv.FEEDBACK_PRODUCTION_RATE_SECRET },
  ]) {
    const handle = makeFeedbackHandler({ env: { ...env, ...prodEnv, ...overrides }, fetcher: rejectFetch });
    assert.equal((await handle(request())).status, 503);
  }
});

test('valid production and preview each use only their own configuration and rate keys', async () => {
  const seen = [];
  for (const [scope, project, key] of [
    ['production', prodEnv.FEEDBACK_PRODUCTION_SUPABASE_URL, prodEnv.FEEDBACK_PRODUCTION_SUPABASE_KEY],
    ['preview', env.FEEDBACK_STAGING_SUPABASE_URL, env.FEEDBACK_STAGING_SUPABASE_KEY],
  ]) {
    let called = false;
    const handle = makeFeedbackHandler({
      env: { ...env, ...prodEnv, VERCEL_ENV: scope },
      fetcher: async (target, options) => {
        called = true;
        assert.equal(target.origin, project);
        assert.equal(options.headers.apikey, key);
        seen.push(JSON.parse(options.body).p_requester_key);
        return Response.json('saved');
      },
    });
    assert.equal((await handle(request())).status, 200);
    assert.ok(called);
  }
  assert.equal(seen.length, 2);
  assert.notEqual(seen[0], seen[1]);
});
