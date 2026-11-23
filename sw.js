/* ==========================================================================
   SW.JS - SERVICE WORKER V9 COMPATIBLE CON VERCEL Y WEBAPK ANDROID
   ========================================================================== */
const CACHE_NAME = 'monarch-domain-v10.0';
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
  '/sounds/system-check.mp3',
  '/comandantes/igris-svg.js',
  '/comandantes/tank-svg.js',
  '/comandantes/iron-svg.js',
  '/comandantes/tusk-svg.js',
  '/comandantes/min-svg.js',
  '/comandantes/beru-svg.js',
  '/models.js',
  '/js/models.js',
  '/js/database.js',
  '/js/dialogues.js',
  '/js/core.js',
  '/js/combat.js',
  '/js/events.js',
  '/js/inventory.js',
  '/js/missions.js',
  '/js/ui.js'
];

async function cleanResponse(res) {
  if (!res || !res.redirected) return res;
  const body = await res.blob();
  return new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers: new Headers(res.headers)
  });
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          fetch(url, { cache: 'reload' })
            .then(async (res) => {
              if (res && res.ok) {
                await cache.put(url, await cleanResponse(res));
              }
            })
            .catch(() => {})
        )
      )
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => (name !== CACHE_NAME ? caches.delete(name) : null))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const urlObj = new URL(event.request.url);
      const isSameOrigin = urlObj.origin === self.location.origin;
      const cleanKey = isSameOrigin ? urlObj.pathname : event.request;

      try {
        const netRes = await fetch(event.request, { cache: 'no-store' });
        if (netRes && netRes.status === 200) {
          const clean = await cleanResponse(netRes);
          cache.put(cleanKey, clean.clone());
          return clean;
        }
      } catch (e) {}

      const cached = (await cache.match(cleanKey)) || (await cache.match(event.request, { ignoreSearch: true }));
      if (cached) return cached;

      if (event.request.mode === 'navigate') {
        return (await cache.match('/index.html')) || (await cache.match('/'));
      }
      return new Response('Offline', { status: 503 });
    })()
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
    if (_swScheduledTimers[idKey]) {
      _swScheduledTimers[idKey].forEach((t) => clearTimeout(t));
    }
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
    const intervalsMins = [45, 100, 165];
    intervalsMins.forEach((mins, idx) => {
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
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('/');
    })
  );
});
