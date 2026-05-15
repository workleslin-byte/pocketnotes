module.exports = async (req, res) => {
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
      const https = require('https');
      const payload = JSON.stringify({
        email,
        audience_id: audienceId,
        unsubscribed: false,
      });

      await new Promise((resolve, reject) => {
        const options = {
          hostname: 'api.resend.com',
          path: '/contacts',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
        };
        const req2 = https.request(options, (r) => {
          let data = '';
          r.on('data', chunk => { data += chunk; });
          r.on('end', () => {
            console.log('Resend response:', r.statusCode, data);
            resolve();
          });
        });
        req2.on('error', reject);
        req2.write(payload);
        req2.end();
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
