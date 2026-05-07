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

  const URL = process.env.UPSTASH_REDIS_REST_URL;
  const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!URL || !TOKEN) {
    return res.status(200).json({ entries: [], total: 0 });
  }

  try {
    const keysRes = await fetch(`${URL}/keys/waitlist:*`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const keysData = await keysRes.json();
    const keys = keysData.result || [];

    if (!keys.length) {
      return res.status(200).json({ entries: [], total: 0 });
    }

    const values = await Promise.all(
      keys.map(k =>
        fetch(`${URL}/get/${encodeURIComponent(k)}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }).then(r => r.json())
      )
    );

    const parsed = values
      .map(v => {
        const raw = v.result;
        if (!raw) return null;
        try { return typeof raw === 'string' ? JSON.parse(raw) : raw; }
        catch { return null; }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Deduplicate by email (keep most recent — already sorted desc)
    const seenEmails = new Set();
    const dedupedByEmail = parsed.filter(e => {
      if (!e.email) return true;
      const key = e.email.toLowerCase();
      if (seenEmails.has(key)) return false;
      seenEmails.add(key);
      return true;
    });

    // Deduplicate by name+city combination (keep most recent)
    const seenNameCity = new Set();
    const deduped = dedupedByEmail.filter(e => {
      if (!e.name || !e.city) return true;
      const key = `${e.name.toLowerCase().trim()}|${e.city.toLowerCase().trim()}`;
      if (seenNameCity.has(key)) return false;
      seenNameCity.add(key);
      return true;
    });

    const total = deduped.length;

    const entries = deduped
      .slice(0, 20)
      .map(({ name, city, product_interest }) => ({ name, city, product_interest }));

    return res.status(200).json({ entries, total });
  } catch (err) {
    console.error('Ticker handler error:', err);
    return res.status(500).json({ error: 'Could not load ticker.' });
  }
}
