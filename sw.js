/* ==========================================================================
   SW.JS - SERVICE WORKER 100% OFFLINE (MODO NATIVO)
   ========================================================================== */
const CACHE_NAME = 'monarch-domain-v4.7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './js/database.js',
  './js/dialogues.js',
  './js/core.js',
  './js/combat.js',
  './js/events.js',
  './js/inventory.js',
  './js/missions.js',
  './js/ui.js'
];

// Chrome rechaza servir una respuesta "redirigida" a una navegación.
// Vercel redirige /index.html -> / (cleanUrls), así que hay que "limpiarla".
async function cleanResponse(res) {
  if (!res.redirected) return res;
  const body = await res.blob();
  return new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers
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
              if (res.ok) return cache.put(url, await cleanResponse(res));
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
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Actualiza en segundo plano si hay internet, pero sirve desde caché al instante
        fetch(event.request)
          .then(async (networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clean = await cleanResponse(networkResponse);
              const cache = await caches.open(CACHE_NAME);
              cache.put(event.request, clean);
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clean = await cleanResponse(networkResponse);
            const clone = clean.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return clean;
          }
          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});