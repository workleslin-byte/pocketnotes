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

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;

    console.log('Newsletter:', email,
      'apiKey:', apiKey ? 'set' : 'MISSING',
      'audience:', audienceId ? 'set' : 'MISSING');

    if (apiKey && audienceId) {
      const r = await fetch('https://api.resend.com/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          audience_id: audienceId,
          unsubscribed: false,
        }),
      });
      const data = await r.json();
      console.log('Resend response:', r.status, JSON.stringify(data));
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
