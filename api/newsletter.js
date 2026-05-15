import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body || {};

    const { email } = body;

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
      console.log('Resend contact:', JSON.stringify(r));
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
