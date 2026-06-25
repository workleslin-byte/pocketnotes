import { Resend } from 'resend';
import { applyCors, clientIp, sanitise, rateLimit, EMAIL_RE, BLOCKED_DOMAINS } from './_lib/kit.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  applyCors(req, res, 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (parseInt(req.headers['content-length'] || '0') > 2048) {
    return res.status(413).json({ error: 'Request too large' });
  }

  const ip = clientIp(req);
  if (!(await rateLimit(ip, 'newsletter'))) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const email = sanitise(body.email);

    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    const domain = email.split('@')[1].toLowerCase();
    if (BLOCKED_DOMAINS.has(domain)) {
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

    const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
    if (process.env.RESEND_API_KEY && audienceId) {
      const { error } = await resend.contacts.create({ email, audienceId, unsubscribed: false });
      if (error) console.error('Resend contacts.create error:', JSON.stringify(error));
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
