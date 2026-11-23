const CACHE_NAME = 'monarch-domain-auto';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/sounds/system-notification.mp3',
  '/sounds/system-levelup.mp3',
  '/sounds/notification-clic.mp3',
  '/sounds/system-check.mp3'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Estrategia Network-First: siempre descarga cambios frescos al subir a Vercel y usa caché solo sin conexión
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((networkRes) => {
        if (networkRes && networkRes.ok) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        }
        return networkRes;
      })
      .catch(() => caches.match(event.request))
  );
});

let _swScheduledTimers = {};
let _swMissingMissionsTimers = [];

function showSystemPush(title, body, tag, vibrate = [200, 100, 250]) {
  return self.registration.showNotification(title || 'SISTEMA DEL MONARCA', {
    body: body || 'Directiva del Sistema actualizada.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: vibrate,
    tag: tag || 'sl-notif-' + Date.now(),
    renotify: true
  });
}

self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SL_POMODORO_NOTIFY') {
    showSystemPush(
      event.data.title,
      event.data.body,
      event.data.tag || 'sl-pomodoro-' + Date.now(),
      [200, 100, 250, 100, 300]
    );
  } else if (event.data.type === 'SL_SCHEDULE_REMINDERS') {
    const idKey = event.data.missionId || 'default';
    if (_swScheduledTimers[idKey]) _swScheduledTimers[idKey].forEach((t) => clearTimeout(t));
    _swScheduledTimers[idKey] = [];
    const alerts = Array.isArray(event.data.alerts) ? event.data.alerts : [];
    alerts.forEach((al) => {
      const tid = setTimeout(() => {
        showSystemPush(
          al.title || 'SISTEMA DEL MONARCA',
          al.body || 'Verifica el estado de tu misión en curso.',
          al.tag || 'sl-remind-' + idKey,
          [250, 120, 250]
        );
      }, Math.max(1000, al.delayMs || 60000));
      _swScheduledTimers[idKey].push(tid);
    });
  } else if (event.data.type === 'SL_CANCEL_REMINDERS') {
    const idKey = event.data.missionId || 'default';
    if (_swScheduledTimers[idKey]) {
      _swScheduledTimers[idKey].forEach((t) => clearTimeout(t));
      delete _swScheduledTimers[idKey];
    }
  } else if (event.data.type === 'SL_SYNC_MISSING_MISSIONS') {
    _swMissingMissionsTimers.forEach((t) => clearTimeout(t));
    _swMissingMissionsTimers = [];
    const missing = Array.isArray(event.data.missing) ? event.data.missing : [];
    if (missing.length === 0) return;

    const previewList = missing.slice(0, 3).join(', ') + (missing.length > 3 ? ` (+${missing.length - 3} más)` : '');
    [45, 100, 165].forEach((mins, idx) => {
      const tid = setTimeout(() => {
        showSystemPush(
          `INFO DE MISIÓN // FALTAN ${missing.length} OBJETIVOS`,
          `Pendientes hoy: ${previewList}. No completar la misión diaria resultará en una penalización apropiada.`,
          'sl-missing-ping-' + idx
        );
      }, mins * 60000);
      _swMissingMissionsTimers.push(tid);
    });
  }
});

self.addEventListener('push', (event) => {
  let payload = { title: 'SISTEMA DEL MONARCA', body: 'Tienes una directiva pendiente.', tag: 'sl-webpush' };
  if (event.data) {
    try { payload = Object.assign(payload, event.data.json()); }
    catch (e) { payload.body = event.data.text() || payload.body; }
  }
  event.waitUntil(showSystemPush(payload.title, payload.body, payload.tag));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      for (const client of clientsArr) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});