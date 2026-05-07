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

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  if (!KV_URL || !KV_TOKEN) {
    return res.status(200).json({ entries: [] });
  }

  try {
    const keysRes = await fetch(`${KV_URL}/keys/waitlist:*`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    const keysData = await keysRes.json();
    const keys = keysData.result || [];

    if (!keys.length) {
      return res.status(200).json({ entries: [] });
    }

    const values = await Promise.all(
      keys.map(k =>
        fetch(`${KV_URL}/get/${encodeURIComponent(k)}`, {
          headers: { Authorization: `Bearer ${KV_TOKEN}` },
        }).then(r => r.json())
      )
    );

    const entries = values
      .map(v => {
        const raw = v.result;
        if (!raw) return null;
        try { return typeof raw === 'string' ? JSON.parse(raw) : raw; }
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
