import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL, { tls: {}, lazyConnect: false });

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
  res.setHeader('Cache-Control', 'no-store');

  try {
    const keys = await redis.keys('waitlist:*');

    if (!keys || keys.length === 0) {
      return res.status(200).json({ entries: [] });
    }

    const values = await redis.mget(...keys);

    const entries = values
      .filter(Boolean)
      .map(v => {
        try { return typeof v === 'string' ? JSON.parse(v) : v; }
        catch { return null; }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20)
      .map(({ name, city, product_interest }) => ({ name, city, product_interest }));

    return res.status(200).json({ entries });
  } catch (err) {
    console.error('Ticker handler error:', err);
    return res.status(500).json({ error: 'Could not load ticker.' });
  }
}
