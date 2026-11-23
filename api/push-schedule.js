const webpush = require('web-push');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { subscription, title, body, tag, delaySec = 0 } = req.body || {};
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Falta subscription válida' });
  }

  // Envío inmediato (ej. botón de prueba)
  if (!delaySec || Number(delaySec) <= 0) {
    try {
      webpush.setVapidDetails(
        process.env.VAPID_SUBJECT || 'mailto:monarch@system.local',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
      );
      await webpush.sendNotification(subscription, JSON.stringify({ title, body, tag }));
      return res.status(200).json({ ok: true, mode: 'instant' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Envío diferido exacto al segundo usando Upstash QStash
  const qstashToken = process.env.QSTASH_TOKEN;
  const host = req.headers.host;
  const deliverUrl = `https://${host}/api/push-deliver`;

  if (!qstashToken) {
    return res.status(500).json({ error: 'Falta QSTASH_TOKEN en Vercel' });
  }

  try {
    const qRes = await fetch(`https://qstash.upstash.io/v2/publish/${deliverUrl}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${qstashToken}`,
        'Content-Type': 'application/json',
        'Upstash-Delay': `${Math.max(1, Math.floor(Number(delaySec)))}s`
      },
      body: JSON.stringify({
        secret: process.env.PUSH_INTERNAL_SECRET,
        subscription,
        title,
        body,
        tag
      })
    });
    const data = await qRes.json();
    return res.status(qRes.ok ? 200 : 500).json({ ok: qRes.ok, messageId: data.messageId || null });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
