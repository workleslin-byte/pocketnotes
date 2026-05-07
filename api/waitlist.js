import Redis from 'ioredis';
import { Resend } from 'resend';

const redis = new Redis(process.env.REDIS_URL);
const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_PRODUCTS = ['founders', 'flow', 'both'];

function setCORS(res, origin) {
  const allowed = ['https://pocketnotes.in', 'http://localhost:3000', 'http://localhost'];
  const o = allowed.includes(origin) ? origin : 'https://pocketnotes.in';
  res.setHeader('Access-Control-Allow-Origin', o);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function writeKV(name, city, product_interest) {
  try {
    await redis.set(
      `waitlist:${Date.now()}`,
      JSON.stringify({ name, city, product_interest, timestamp: new Date().toISOString() })
    );
  } catch (err) {
    console.error('KV write failed:', err.message);
  }
}

async function sendEmail(cleanName, cleanEmail) {
  try {
    const templateId = process.env.RESEND_WAITLIST_TEMPLATE_ID;

    let payload;
    if (templateId) {
      payload = {
        from: 'Pocket Notes <hello@pocketnotes.in>',
        to: cleanEmail,
        subject: `${cleanName}, you just joined a short list.`,
        template: {
          id: templateId,
          variables: { NAME: cleanName },
        },
      };
    } else {
      payload = {
        from: 'Pocket Notes <hello@pocketnotes.in>',
        to: cleanEmail,
        subject: `${cleanName}, you just joined a short list.`,
        html: `<!DOCTYPE html><html><body style="font-family:Georgia,serif;background:#FAF3E3;padding:40px;color:#1A1612;max-width:500px;margin:0 auto">
          <h1 style="font-size:2rem;font-weight:900;letter-spacing:-0.03em;margin-bottom:0.5rem">Hi ${cleanName}.</h1>
          <p style="font-size:1.05rem;line-height:1.7;margin-bottom:1.5rem">You're on the Pocket Notes waitlist.</p>
          <p style="font-size:1.05rem;line-height:1.7;margin-bottom:1.5rem">We'll reach out the moment we're live. First 100 sets only — you have first access.</p>
          <p style="font-size:0.85rem;color:#3D342A;font-family:monospace">— Pocket Notes</p>
        </body></html>`,
      };
    }

    const { data, error } = await resend.emails.send(payload);

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

  writeKV(cleanName, cleanCity, product_interest);

  await sendEmail(cleanName, cleanEmail);

  return res.status(200).json({ success: true });
}
