import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL, { tls: {}, lazyConnect: false });
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const ALLOWED_PRODUCTS = ['founders', 'flow', 'both'];

function setCORS(res, origin) {
  const allowed = ['https://pocketnotes.in', 'http://localhost:3000', 'http://localhost'];
  const o = allowed.includes(origin) ? origin : 'https://pocketnotes.in';
  res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function kvSet(key, value) {
  try {
    await redis.set(key, JSON.stringify(value));
  } catch (err) {
    console.error('KV write failed:', err.message);
  }
}

async function sendEmail(cleanName, cleanEmail) {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return;
  }

  const payload = {
    from: 'Pocket Notes <hello@pocketnotes.in>',
    to: [cleanEmail],
    reply_to: 'hello@pocketnotes.in',
    template_id: '3741dff1-3aa7-4e8f-88e4-0c764d338568',
    with: { first_name: cleanName },
    headers: {
      'X-Entity-Ref-ID': Date.now().toString(),
    },
  };

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      console.error('Resend error:', JSON.stringify(err));
    } else {
      const ok = await r.json().catch(() => ({}));
      console.log('Resend success:', ok.id);
    }
  } catch (err) {
    console.error('Resend fetch failed:', err.message);
  }
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  setCORS(res, origin);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, city, product_interest } = req.body || {};

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (!city || !city.trim()) {
    return res.status(400).json({ error: 'City is required.' });
  }
  if (!ALLOWED_PRODUCTS.includes(product_interest)) {
    return res.status(400).json({ error: 'Please select a product.' });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanCity = city.trim();

  kvSet(`waitlist:${Date.now()}`, { name: cleanName, city: cleanCity, product_interest, timestamp: new Date().toISOString() });

  await sendEmail(cleanName, cleanEmail);

  return res.status(200).json({ success: true });
}
