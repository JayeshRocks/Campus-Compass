import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';

const CATEGORIES = new Set([
  'missing_place', 'incorrect_location', 'incorrect_info', 'routing_error',
  'accessibility', 'bug', 'feature_request', 'feedback',
]);
const FIELDS = new Set(['requestId', 'category', 'message', 'email', 'buildingId', 'pin']);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@<>]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/;
const MAX_BYTES = 8192;
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export function validateFeedback(input) {
  if (!isObject(input) || Object.keys(input).some((k) => !FIELDS.has(k))) return null;
  const { requestId, category, message, email, buildingId, pin } = input;
  if (typeof requestId !== 'string' || !UUID.test(requestId) || !CATEGORIES.has(category)) return null;
  if (typeof message !== 'string' || !message.trim() || message.trim().length > 2000 || message.includes('\0')) return null;
  if (email !== undefined && (typeof email !== 'string' || email.trim().length > 254 || !EMAIL.test(email.trim()) || /[\x00-\x1f\x7f]/.test(email))) return null;
  if (buildingId !== undefined && (typeof buildingId !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(buildingId))) return null;
  if (pin !== undefined && (!isObject(pin) || Object.keys(pin).length !== 2 ||
    !Number.isFinite(pin.lat) || !Number.isFinite(pin.lng) ||
    Math.abs(pin.lat) > 90 || Math.abs(pin.lng) > 180)) return null;
  return { requestId, category, message: message.trim(), email: email?.trim() ?? null,
    buildingId: buildingId ?? null, lat: pin?.lat ?? null, lng: pin?.lng ?? null };
}

function feedbackConfig(env) {
  const preview = env.VERCEL_ENV === 'preview';
  const production = env.VERCEL_ENV === 'production';
  if (!preview && !production) return null;
  const prefix = preview ? 'FEEDBACK_STAGING_' : 'FEEDBACK_PRODUCTION_';
  if (env[prefix + 'ENABLED'] !== 'true') return null;
  const url = env[prefix + 'SUPABASE_URL'];
  const key = env[prefix + 'SUPABASE_KEY'];
  const secret = env[prefix + 'RATE_SECRET'];
  if (!url || !/^https:\/\/[a-z0-9]+\.supabase\.co\/?$/.test(url) || !key?.startsWith('sb_secret_') ||
      !secret || secret.length < 32) return null;

  // Refuse a known shared project or credential if the corresponding env is visible here.
  // Deployment review must still verify the isolated project; build-time vars may be absent.
  if (production) {
    const projectHost = new URL(url).host;
    for (const other of [env.VITE_SUPABASE_URL, env.FEEDBACK_STAGING_SUPABASE_URL]) {
      if (!other) continue;
      try {
        if (new URL(other).host === projectHost) return null;
      } catch {
        return null;
      }
    }
    if (key === env.FEEDBACK_STAGING_SUPABASE_KEY || secret === env.FEEDBACK_STAGING_RATE_SECRET)
      return null;
  }
  return { url, key, secret };
}

async function readBody(request) {
  if (!request.body) return null;
  const declaredSize = Number(request.headers.get('content-length'));
  if (declaredSize > MAX_BYTES) throw new RangeError();
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let bytes = 0, body = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) {
        void reader.cancel().catch(() => {});
        throw new RangeError();
      }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

function reply(status, error, headers = {}) {
  return Response.json(error ? { ok: false, error } : { ok: true },
    { status, headers: { 'Cache-Control': 'no-store', ...headers } });
}

export function makeFeedbackHandler({ env = process.env, fetcher = fetch } = {}) {
  return async function feedback(request) {
    if (request.method !== 'POST') return reply(405, 'method_not_allowed', { Allow: 'POST' });
    const config = feedbackConfig(env);
    if (!config) return reply(503, env.VERCEL_ENV === 'preview' ? 'feedback_disabled' : 'unavailable');
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json')
      return reply(415, 'unsupported_content_type');
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return reply(403, 'forbidden');
    if (request.headers.get('sec-fetch-site') === 'cross-site') return reply(403, 'forbidden');

    // Vercel normalizes the forwarding header. Do not trust a list or fall back to headers callers provide.
    const ip = request.headers.get('x-vercel-forwarded-for')?.trim();
    if (!ip || !isIP(ip)) return reply(503, 'unavailable');

    let body;
    try { body = validateFeedback(await readBody(request)); }
    catch (error) {
      return error instanceof RangeError ? reply(413, 'payload_too_large') : reply(400, 'invalid_feedback');
    }
    if (!body) return reply(400, 'invalid_feedback');

    const requesterKey = createHmac('sha256', config.secret).update(ip.toLowerCase()).digest('hex');
    try {
      const response = await fetcher(new URL('/rest/v1/rpc/submit_feedback_v1', config.url), {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(8000),
        headers: { apikey: config.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p_request_id: body.requestId, p_requester_key: requesterKey,
          p_category: body.category, p_message: body.message, p_email: body.email,
          p_building_id: body.buildingId, p_lat: body.lat, p_lng: body.lng,
        }),
      });
      if (!response.ok) return reply(503, 'unavailable');
      const result = await response.json();
      if (result === 'saved' || result === 'duplicate') return reply(200);
      if (result === 'limited') return reply(429, 'rate_limited', { 'Retry-After': '3600' });
      if (result === 'conflict') return reply(409, 'request_id_conflict');
    } catch {
      // Do not log request text, contact details, IPs, credentials, or upstream error bodies.
    }
    return reply(503, 'unavailable');
  };
}

export const handleFeedback = makeFeedbackHandler();
