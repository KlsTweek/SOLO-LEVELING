const webpush = require('web-push');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { secret, subscription, title, body, tag } = req.body || {};
  if (process.env.PUSH_INTERNAL_SECRET && secret !== process.env.PUSH_INTERNAL_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Sin suscripción' });
  }

  try {
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT || 'mailto:monarch@system.local',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: title || 'SISTEMA DEL MONARCA',
        body: body || 'Directiva pendiente.',
        tag: tag || 'sl-push'
      })
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};
