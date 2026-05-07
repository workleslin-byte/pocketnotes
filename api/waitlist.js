import { kv } from '@vercel/kv';

const ALLOWED_PRODUCTS = ['founders', 'flow', 'both'];
const CORS = {
  'Access-Control-Allow-Origin': 'https://pocketnotes.in',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    return res.end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  const { name, email, city, product_interest } = req.body || {};

  // Validation
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

  try {
    // Write to KV — never store email (ticker only)
    await kv.set(
      `waitlist:${Date.now()}`,
      JSON.stringify({
        name: cleanName,
        city: cleanCity,
        product_interest,
        timestamp: new Date().toISOString(),
      })
    );

    // Send confirmation via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Pocket Notes <hello@pocketnotes.in>',
        to: cleanEmail,
        subject: 'You're on the list.',
        template: {
          id: process.env.RESEND_WAITLIST_TEMPLATE_ID,
          variables: {
            NAME: cleanName,
            CITY: cleanCity,
          },
        },
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.json().catch(() => ({}));
      console.error('Resend error:', err);
      // KV write succeeded — don't surface email failure to user
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
