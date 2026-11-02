/* ==========================================================================
   SW.JS - SERVICE WORKER V8.2 COMPATIBLE CON VERCEL Y WEBAPK ANDROID
   ========================================================================== */
const CACHE_NAME = 'monarch-domain-v8.3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
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
      try {
        const netRes = await fetch(event.request, { cache: 'no-store' });
        if (netRes && netRes.status === 200) {
          const clean = await cleanResponse(netRes);
          cache.put(event.request, clean.clone());
          return clean;
        }
      } catch (e) {}

      const cached = await cache.match(event.request, { ignoreSearch: true });
      if (cached) return cached;

      if (event.request.mode === 'navigate') {
        return (await cache.match('/index.html')) || (await cache.match('/'));
      }
      return new Response('Offline', { status: 503 });
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SL_POMODORO_NOTIFY') {
    self.registration.showNotification(event.data.title || 'SISTEMA DEL MONARCA', {
      body: event.data.body || 'Directiva del Sistema actualizada.',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 250, 100, 300],
      tag: event.data.tag || 'sl-pomodoro-' + Date.now(),
      renotify: true
    });
  }
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
