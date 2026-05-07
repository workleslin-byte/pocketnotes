import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_PRODUCTS = ['founders', 'flow', 'both'];

function setCORS(res, origin) {
  const allowed = ['https://pocketnotes.in', 'http://localhost:3000', 'http://localhost'];
  const o = allowed.includes(origin) ? origin : 'https://pocketnotes.in';
  res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function kvSet(name, city, product_interest) {
  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;
  if (!KV_URL || !KV_TOKEN) {
    console.error('KV write skipped: missing KV_REST_API_URL or KV_REST_API_TOKEN');
    return;
  }
  try {
    const key = `waitlist:${Date.now()}`;
    const value = JSON.stringify({ name, city, product_interest, timestamp: new Date().toISOString() });
    await fetch(`${KV_URL}/set/${key}/${encodeURIComponent(value)}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
  } catch (err) {
    console.error('KV write failed:', err.message);
  }
}

async function sendEmail(cleanName, cleanEmail) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Pocket Notes <hello@pocketnotes.in>',
      to: cleanEmail,
      replyTo: 'hello@pocketnotes.in',
      subject: `${cleanName}, you just joined a short list.`,
      template: {
        id: process.env.RESEND_WAITLIST_TEMPLATE_ID,
        variables: { first_name: cleanName },
      },
    });
    if (error) {
      console.error('Resend error:', JSON.stringify(error));
    } else {
      console.log('Resend success:', data.id);
    }
  } catch (err) {
    console.error('Resend send failed:', err.message);
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

  console.log('ENV CHECK:', {
    hasKvUrl: !!process.env.KV_REST_API_URL,
    hasKvToken: !!process.env.KV_REST_API_TOKEN,
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasTemplateId: !!process.env.RESEND_WAITLIST_TEMPLATE_ID,
  });

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

  kvSet(cleanName, cleanCity, product_interest);

  await sendEmail(cleanName, cleanEmail);

  return res.status(200).json({ success: true });
}
