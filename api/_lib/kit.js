// Shared helpers for the /api serverless functions.
// Files under api/_lib are NOT treated as routes by Vercel (underscore prefix).

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_RE = /^[a-zA-Z\s'\-]{2,50}$/;
export const CITY_RE = /^[a-zA-Z\s\-]{2,50}$/;

export const BLOCKED_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email', 'yopmail.com',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'guerrillamail.info', 'spam4.me',
  'trashmail.com', 'trashmail.net', 'dispostable.com', 'maildrop.cc', 'fakeinbox.com',
  'mailnull.com', 'spamgourmet.com', 'spamgourmet.net', 'boun.cr', 'spamfree24.org',
  'discard.email', 'spamcero.com', 'objectmail.com', 'ownmail.net',
]);

// Single canonical allowlist. Includes both apex and www (the live host) plus
// localhost, so every function answers cross-origin requests consistently.
const ALLOWED_ORIGINS = new Set([
  'https://pocketnotes.in', 'https://www.pocketnotes.in',
  'http://localhost:3000', 'http://localhost',
]);

export function applyCors(req, res, methods = 'POST, OPTIONS') {
  const origin = req.headers.origin || '';
  res.setHeader('Access-Control-Allow-Origin',
    ALLOWED_ORIGINS.has(origin) ? origin : 'https://www.pocketnotes.in');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// On Vercel, x-vercel-forwarded-for / x-real-ip are set by the platform and
// cannot be spoofed by the client. The first hop of x-forwarded-for IS
// client-controlled, so only fall back to it as a last resort.
export function clientIp(req) {
  const trusted = req.headers['x-vercel-forwarded-for'] || req.headers['x-real-ip'];
  if (trusted) return String(trusted).split(',')[0].trim();
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

// Strips angle brackets, double quotes, and javascript: URIs, then trims and
// caps length. Apostrophes/hyphens are preserved so valid names like O'Brien
// survive (NAME_RE already permits them).
export function sanitise(str, max = 200) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>"]/g, '').replace(/javascript:/gi, '').trim().slice(0, max);
}

// Accept both the canonical env names (production) and the Vercel/Upstash
// integration names (local .env.local), so identical code runs in both.
const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.upstash_KV_REST_API_URL || '';
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.upstash_KV_REST_API_TOKEN || '';
export const kvConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

// Upstash REST: each command segment is path-encoded. Throws on transport
// failure so callers can decide whether to fail open or surface an error.
export async function redis(...cmd) {
  const path = cmd.map(encodeURIComponent).join('/');
  const r = await fetch(`${REDIS_URL}/${path}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  if (!r.ok) throw new Error(`Upstash ${r.status}`);
  return r.json();
}

export async function rateLimit(ip, endpoint, { limit = 5, window = 3600 } = {}) {
  if (!kvConfigured) return true;
  const key = `ratelimit:${endpoint}:${ip}`;
  try {
    const { result: count } = await redis('incr', key);
    if (count === 1) await redis('expire', key, String(window));
    return count <= limit;
  } catch {
    return true; // fail open — never block signups on limiter failure
  }
}

export const RECENT_CAP = 500;

// One-time, idempotent backfill from the legacy per-signup keys
// (waitlist:<ts>-<uuid>) into the SET + LIST model. The waitlist:migrated flag
// (SET ... NX) guards it so the O(N) KEYS scan runs at most once; the
// SADD-guarded LPUSH keeps it safe to re-run if a previous attempt died.
export async function ensureWaitlistMigrated() {
  if (!kvConfigured) return;
  try {
    const { result } = await redis('set', 'waitlist:migrated', '1', 'NX');
    if (result !== 'OK') return; // already migrated or another request is doing it
    const { result: keys = [] } = await redis('keys', 'waitlist:*');
    for (const k of keys) {
      if (k === 'waitlist:recent' || k === 'waitlist:emails' || k === 'waitlist:migrated') continue;
      const { result: raw } = await redis('get', k);
      if (!raw) continue;
      let entry;
      try { entry = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { continue; }
      const email = entry && entry.email && String(entry.email).toLowerCase();
      if (!email) continue;
      const { result: added } = await redis('sadd', 'waitlist:emails', email);
      if (added === 1) await redis('lpush', 'waitlist:recent', JSON.stringify(entry));
    }
    await redis('ltrim', 'waitlist:recent', '0', String(RECENT_CAP - 1));
  } catch (err) {
    // Release the lock so a later request retries; SADD-idempotency prevents dupes.
    try { await redis('del', 'waitlist:migrated'); } catch (_) {}
    console.error('waitlist backfill failed:', err.message);
  }
}
