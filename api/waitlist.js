import { kv } from '@vercel/kv';

const ALLOWED_PRODUCTS = ['founders', 'flow', 'both'];

function setCORS(res, origin) {
  const allowed = ['https://pocketnotes.in', 'http://localhost:3000'];
  const o = allowed.includes(origin) ? origin : 'https://pocketnotes.in';
  res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

  try {
    // Write to KV — email never stored
    await kv.set(
      `waitlist:${Date.now()}`,
      JSON.stringify({
        name: cleanName,
        city: cleanCity,
        product_interest,
        timestamp: new Date().toISOString(),
      })
    );

    // Send confirmation via Resend (template with {{{NAME}}} variable)
    const resendPayload = {
      from: 'Pocket Notes <hello@pocketnotes.in>',
      to: cleanEmail,
      subject: "You're on the list.",
    };

    if (process.env.RESEND_WAITLIST_TEMPLATE_ID) {
      resendPayload.template_id = process.env.RESEND_WAITLIST_TEMPLATE_ID;
      resendPayload.data = { NAME: cleanName };
    } else {
      // Fallback plain-text email until template is published
      resendPayload.html = `<p>Hi ${cleanName},</p><p>You're on the Pocket Notes waitlist. We'll reach out when we launch.</p><p>— Pocket Notes</p>`;
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
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
