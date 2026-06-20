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

function clientIp(req) {
  // On Vercel x-vercel-forwarded-for / x-real-ip are set by the platform and
  // cannot be spoofed by the client. The first hop of x-forwarded-for IS
  // client-controlled, so only fall back to it as a last resort.
  const trusted = req.headers['x-vercel-forwarded-for'] || req.headers['x-real-ip'];
  if (trusted) return String(trusted).split(',')[0].trim();
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
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

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://pocketnotes.in',
    'https://www.pocketnotes.in',
    'http://localhost:3000',
  ];
  const corsOrigin = allowedOrigins.includes(origin)
    ? origin
    : 'https://www.pocketnotes.in';
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contentLength = parseInt(req.headers['content-length'] || '0');
  if (contentLength > 2048) {
    return res.status(413).json({ error: 'Request too large' });
  }

  const ip = clientIp(req);
  const allowed = await checkRateLimit(ip, 'newsletter');
  if (!allowed) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body || {};

    const email = sanitise(body.email);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    const BLOCKED_DOMAINS = [
      'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwaway.email',
      'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la',
      'guerrillamail.info', 'spam4.me', 'trashmail.com', 'trashmail.net',
      'dispostable.com', 'maildrop.cc', 'fakeinbox.com', 'mailnull.com',
      'spamgourmet.com', 'spamgourmet.net', 'boun.cr', 'spamfree24.org',
      'discard.email', 'spamcero.com', 'objectmail.com', 'ownmail.net',
    ];

    const domain = email.split('@')[1].toLowerCase();

    if (BLOCKED_DOMAINS.includes(domain)) {
      return res.status(400).json({ error: 'Please use a real email address' });
    }

    const tld = domain.split('.').pop();
    if (!tld || tld.length < 2) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    if (
      email.includes('test@test') ||
      email.includes('fake@') ||
      email.includes('asdf') ||
      /^[a-z]{1,2}@/.test(email)
    ) {
      return res.status(400).json({ error: 'Please use a real email address' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;

    if (apiKey && audienceId) {
      const r = await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
      if (process.env.NODE_ENV !== 'production') console.log('Resend contact:', JSON.stringify(r));
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
