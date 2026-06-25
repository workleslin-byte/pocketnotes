import { Resend } from 'resend';
import {
  applyCors, clientIp, sanitise, rateLimit, redis, kvConfigured,
  ensureWaitlistMigrated, EMAIL_RE, NAME_RE, CITY_RE, BLOCKED_DOMAINS, RECENT_CAP,
} from './_lib/kit.js';

const resend = new Resend(process.env.RESEND_API_KEY);
const ALLOWED_PRODUCTS = new Set(['founders', 'flow', 'both']);

async function sendWelcomeEmail(name, email) {
  try {
    const { error } = await resend.emails.send({
      from: 'Pocket Notes <hello@pocketnotes.in>',
      to: email,
      replyTo: 'hello@pocketnotes.in',
      subject: `${name}, you just joined a short list.`,
      template: { id: process.env.RESEND_WAITLIST_TEMPLATE_ID, variables: { NAME: name } },
    });
    if (error) console.error('Resend waitlist email error:', JSON.stringify(error));
  } catch (err) {
    console.error('Resend send failed:', err.message);
  }
}

export default async function handler(req, res) {
  applyCors(req, res, 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (parseInt(req.headers['content-length'] || '0') > 2048) {
    return res.status(413).json({ error: 'Request too large' });
  }

  const ip = clientIp(req);
  if (!(await rateLimit(ip, 'waitlist'))) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
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
  const emailDomain = email.trim().split('@')[1].toLowerCase();
  if (BLOCKED_DOMAINS.has(emailDomain)) {
    return res.status(400).json({ error: 'Please use a real email address' });
  }
  if (!city || !CITY_RE.test(city.trim())) {
    return res.status(400).json({ error: 'Please enter a valid city name' });
  }
  if (!ALLOWED_PRODUCTS.has(product_interest)) {
    return res.status(400).json({ error: 'Please select a product' });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanCity = city.trim();

  if (kvConfigured) {
    // Heal the legacy keyspace once, then dedupe atomically: SADD returns 1 for
    // a new email, 0 if it already exists — no read-all race, no KEYS scan.
    await ensureWaitlistMigrated();

    let added;
    try {
      ({ result: added } = await redis('sadd', 'waitlist:emails', cleanEmail));
    } catch (err) {
      console.error('Waitlist KV write failed:', err.message);
      return res.status(503).json({ error: 'Temporarily unavailable. Please try again shortly.' });
    }

    if (added === 0) {
      return res.status(200).json({ success: true, duplicate: true, message: "You're already on the list." });
    }

    const record = JSON.stringify({
      name: cleanName, email: cleanEmail, city: cleanCity,
      product_interest, timestamp: new Date().toISOString(),
    });
    try {
      await redis('lpush', 'waitlist:recent', record);
      await redis('ltrim', 'waitlist:recent', '0', String(RECENT_CAP - 1));
    } catch (err) {
      // Email is already uniquely recorded in the set; the display list is
      // best-effort, so degrade rather than fail the signup.
      console.error('Waitlist list append failed:', err.message);
    }
  }

  await sendWelcomeEmail(cleanName, cleanEmail);
  return res.status(200).json({ success: true });
}
