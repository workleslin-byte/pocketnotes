import { clientIp } from './_lib/kit.js';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const key = `views:${slug}`;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.upstash_KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.upstash_KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(200).json({ count: 1 });
  }

  async function redis(command) {
    const r = await fetch(`${url}/${command}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return r.json();
  }

  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    const data = await redis(`GET/${key}`);
    const count = parseInt(data.result, 10) || 1;
    return res.status(200).json({ count });
  }

  if (req.method === 'POST') {
    // De-duplicate increments per IP+slug so the public "reads" count can't be
    // trivially inflated by repeated POSTs. Only the first POST from a given IP
    // within the window increments the real counter; the rest just read it.
    const ip = clientIp(req);
    const seenKey = encodeURIComponent(`viewseen:${slug}:${ip}`);
    let shouldIncrement = true;
    try {
      const seen = await redis(`INCR/${seenKey}`);
      if (seen.result === 1) {
        await redis(`EXPIRE/${seenKey}/21600`); // 6h window
      } else {
        shouldIncrement = false;
      }
    } catch {
      // On limiter failure, fall through and count the view (fail open).
    }

    const data = await redis(shouldIncrement ? `INCR/${key}` : `GET/${key}`);
    const count = parseInt(data.result, 10) || 1;
    return res.status(200).json({ count });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
