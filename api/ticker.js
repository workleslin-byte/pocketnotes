import { kv } from '@vercel/kv';

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
    const keys = await kv.keys('waitlist:*');

    if (!keys || keys.length === 0) {
      return res.status(200).json({ entries: [] });
    }

    // Get all values, sort by timestamp desc, take last 20
    const values = await Promise.all(keys.map(k => kv.get(k)));

    const entries = values
      .filter(Boolean)
      .map(v => (typeof v === 'string' ? JSON.parse(v) : v))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20)
      .map(({ name, city, product_interest }) => ({ name, city, product_interest }));

    return res.status(200).json({ entries });
  } catch (err) {
    console.error('Ticker handler error:', err);
    return res.status(500).json({ error: 'Could not load ticker.' });
  }
}
