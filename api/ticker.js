import { redis, kvConfigured, ensureWaitlistMigrated } from './_lib/kit.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    return res.end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  // Short shared-CDN cache so a burst of shop visits doesn't fan out to Redis.
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  if (!kvConfigured) {
    return res.status(200).json({ entries: [], total: 0 });
  }

  try {
    await ensureWaitlistMigrated();

    // Single range read of the capped recent list — no KEYS, no per-key fan-out.
    const { result: rows = [] } = await redis('lrange', 'waitlist:recent', '0', '-1');

    const parsed = rows
      .map(r => { try { return typeof r === 'string' ? JSON.parse(r) : r; } catch { return null; } })
      .filter(Boolean)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Deduplicate by email, then by name+city, for display (matches prior behavior).
    const seenEmail = new Set();
    const byEmail = parsed.filter(e => {
      if (!e.email) return true;
      const key = e.email.toLowerCase();
      if (seenEmail.has(key)) return false;
      seenEmail.add(key);
      return true;
    });
    const seenNameCity = new Set();
    const deduped = byEmail.filter(e => {
      if (!e.name || !e.city) return true;
      const key = `${e.name.toLowerCase().trim()}|${e.city.toLowerCase().trim()}`;
      if (seenNameCity.has(key)) return false;
      seenNameCity.add(key);
      return true;
    });

    const entries = deduped
      .slice(0, 20)
      .map(({ name, city, product_interest }) => ({ name, city, product_interest }));

    // Unbounded O(1) count of unique signups.
    const { result: total } = await redis('scard', 'waitlist:emails');

    return res.status(200).json({ entries, total: total || deduped.length });
  } catch (err) {
    console.error('Ticker handler error:', err);
    return res.status(500).json({ error: 'Could not load ticker.' });
  }
}
