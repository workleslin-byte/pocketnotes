module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Newsletter env check:', {
    hasApiKey: !!process.env.RESEND_API_KEY,
    hasAudienceId: !!process.env.RESEND_NEWSLETTER_AUDIENCE_ID,
  });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const { email } = body;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    const audienceId = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
    const apiKey = process.env.RESEND_API_KEY;
    console.log('Newsletter signup:', email, 'audience:', audienceId ? 'set' : 'MISSING');

    if (audienceId && apiKey) {
      const resendRes = await fetch('https://api.resend.com/contacts', {
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
      const resendData = await resendRes.json();
      console.log('Resend response:', resendRes.status, JSON.stringify(resendData));
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend contact error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
