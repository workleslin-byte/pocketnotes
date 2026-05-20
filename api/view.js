export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const key = `views:${slug}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(200).json({ count: 1 });
  }

  async function redis(command) {
    const r = await fetch(`${url}/${command}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return r.json();
  }

  if (req.method === 'GET') {
    const data = await redis(`GET/${key}`);
    const count = parseInt(data.result, 10) || 1;
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ count });
  }

  if (req.method === 'POST') {
    const data = await redis(`INCR/${key}`);
    const count = parseInt(data.result, 10) || 1;
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ count });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
