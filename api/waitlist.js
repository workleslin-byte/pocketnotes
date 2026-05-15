import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitise(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>'"]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 200);
}

async function checkRateLimit(ip, endpoint) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return true;
  const key = `ratelimit:${endpoint}:${ip}`;
  try {
    const incrRes = await fetch(`${url}/incr/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const incrData = await incrRes.json();
    const count = incrData.result;
    if (count === 1) {
      await fetch(`${url}/expire/${key}/3600`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    return count <= 5;
  } catch {
    return true;
  }
}

const ALLOWED_PRODUCTS = ['founders', 'flow', 'both'];
const NAME_RE = /^[a-zA-Z\s'\-]{2,50}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CITY_RE = /^[a-zA-Z\s\-]{2,50}$/;

function setCORS(res, origin) {
  const allowed = ['https://pocketnotes.in', 'http://localhost:3000', 'http://localhost'];
  const o = allowed.includes(origin) ? origin : 'https://pocketnotes.in';
  res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function kvFetch(path) {
  const URL = process.env.UPSTASH_REDIS_REST_URL;
  const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!URL || !TOKEN) return null;
  try {
    const r = await fetch(`${URL}${path}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return r.json();
  } catch (err) {
    console.error('KV fetch failed:', err.message);
    return null;
  }
}

async function checkDuplicate(email) {
  const keysData = await kvFetch('/keys/waitlist:*');
  if (!keysData) return false;
  const keys = keysData.result || [];
  for (const key of keys) {
    const valData = await kvFetch(`/get/${encodeURIComponent(key)}`);
    if (!valData) continue;
    try {
      const raw = valData.result;
      const entry = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (entry && entry.email && entry.email.toLowerCase() === email) return true;
    } catch (_) {}
  }
  return false;
}

async function kvSet(name, email, city, product_interest) {
  const key = `waitlist:${Date.now()}`;
  const value = JSON.stringify({ name, email, city, product_interest, timestamp: new Date().toISOString() });
  await kvFetch(`/set/${key}/${encodeURIComponent(value)}`);
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
        variables: { NAME: cleanName },
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

  const contentLength = parseInt(req.headers['content-length'] || '0');
  if (contentLength > 2048) {
    return res.status(413).json({ error: 'Request too large' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.socket?.remoteAddress
    || 'unknown';
  const allowed = await checkRateLimit(ip, 'waitlist');
  if (!allowed) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const raw = req.body || {};
  const name = sanitise(raw.name);
  const email = sanitise(raw.email);
  const city = sanitise(raw.city);
  const product_interest = sanitise(raw.product_interest);

  if (!name || !NAME_RE.test(name.trim())) {
    return res.status(400).json({ error: 'Please enter a valid name' });
  }
  if (!email || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  const BLOCKED_DOMAINS = [
    'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
    'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
    'guerrillamail.info', 'spam4.me', 'trashmail.com', 'trashmail.net',
    'dispostable.com', 'maildrop.cc', 'fakeinbox.com', 'mailnull.com',
    'spamgourmet.com', 'spamgourmet.net', 'boun.cr', 'spamfree24.org',
    'discard.email', 'spamcero.com', 'objectmail.com', 'ownmail.net',
  ];
  const emailDomain = email.trim().split('@')[1].toLowerCase();
  if (BLOCKED_DOMAINS.includes(emailDomain)) {
    return res.status(400).json({ error: 'Please use a real email address' });
  }

  if (!city || !CITY_RE.test(city.trim())) {
    return res.status(400).json({ error: 'Please enter a valid city name' });
  }
  if (!ALLOWED_PRODUCTS.includes(product_interest)) {
    return res.status(400).json({ error: 'Please select a product' });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanCity = city.trim();

  const isDuplicate = await checkDuplicate(cleanEmail);
  if (isDuplicate) {
    return res.status(200).json({ success: true, duplicate: true, message: "You're already on the list." });
  }

  await kvSet(cleanName, cleanEmail, cleanCity, product_interest);
  await sendEmail(cleanName, cleanEmail);

  return res.status(200).json({ success: true });
}
