/* ==========================================================================
   SW.JS - SERVICE WORKER V5.1 COMPATIBLE CON VERCEL Y WEBAPK ANDROID
   ========================================================================== */
const CACHE_NAME = 'monarch-domain-v5.1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
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
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          fetch(url, { cache: 'reload' })
            .then(async (res) => {
              if (res && res.ok) {
                await cache.put(url, await cleanResponse(res));
              }
            })
            .catch(() => {})
        )
      );
    })
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
      const cached = await cache.match(event.request, { ignoreSearch: true });

      const networkFetch = fetch(event.request)
        .then(async (res) => {
          if (res && res.status === 200) {
            const clean = await cleanResponse(res);
            cache.put(event.request, clean.clone());
            return clean;
          }
          return res;
        })
        .catch(() => null);

      if (cached) {
        return cached;
      }

      const netRes = await networkFetch;
      if (netRes) return netRes;

      if (event.request.mode === 'navigate') {
        return (await cache.match('/index.html')) || (await cache.match('/'));
      }
      return new Response('Offline', { status: 503 });
    })()
  );
});
