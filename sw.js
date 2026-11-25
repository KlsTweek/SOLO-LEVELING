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
      // ignoreSearch: permite que /?swAction=... encuentre '/' en caché sin conexión
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});

let _swScheduledTimers = {};
let _swMissingMissionsTimers = [];
let _swTacticalTimers = {};

// Android Chrome normalmente muestra solo 2 acciones
function getMaxActions() {
  try {
    if (typeof Notification !== 'undefined' && Notification.maxActions) {
      return Notification.maxActions;
    }
  } catch (e) {}
  return 2;
}

function showSystemPush(title, body, tag, vibrate = [200, 100, 250], actions = [], data = {}) {
  const opts = {
    body: body || 'Directiva del Sistema actualizada.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: vibrate,
    tag: tag || 'sl-notif-' + Date.now(),
    renotify: true,
    data: Object.assign({ createdAt: Date.now() }, data || {})
  };
  if (Array.isArray(actions) && actions.length > 0) {
    opts.actions = actions.slice(0, getMaxActions());
    opts.requireInteraction = true;
  }
  return self.registration.showNotification(title || 'SISTEMA DEL MONARCA', opts);
}

self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SL_POMODORO_NOTIFY') {
    event.waitUntil(
      showSystemPush(
        event.data.title,
        event.data.body,
        event.data.tag || 'sl-pomodoro-' + Date.now(),
        [200, 100, 250, 100, 300]
      )
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
          [250, 120, 250],
          al.actions || [],
          al.data || {}
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
  } else if (event.data.type === 'SL_SCHEDULE_TACTICAL_CHECKPOINTS') {
    Object.values(_swTacticalTimers).forEach((t) => clearTimeout(t));
    _swTacticalTimers = {};
    const list = Array.isArray(event.data.checkpoints) ? event.data.checkpoints : [];
    list.forEach((cp) => {
      // Corrección: !(x > 0) también descarta undefined/NaN (antes disparaba al instante)
      if (!cp || !cp.key || !(cp.delayMs > 0)) return;
      _swTacticalTimers[cp.key] = setTimeout(() => {
        showSystemPush(
          cp.title,
          cp.body,
          'sl-cp-' + cp.key,
          [180, 90, 220],
          cp.actions || [],
          Object.assign({ cpKey: cp.key }, cp.data || {})
        );
      }, cp.delayMs);
    });
  } else if (event.data.type === 'SL_SHOW_TACTICAL_NOW') {
    const cp = event.data.payload || {};
    event.waitUntil(
      showSystemPush(
        cp.title,
        cp.body,
        cp.tag || 'sl-tactical-now',
        [160, 80, 180],
        cp.actions || [],
        cp.data || {}
      )
    );
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

function getSwBioDayStr(ts = Date.now()) {
  const d = new Date(ts);
  if ((d.getHours() * 60 + d.getMinutes()) < 270) d.setDate(d.getDate() - 1);
  return d.toDateString();
}

async function saveSwAutoDepartState(stateObj) {
  try {
    const cache = await caches.open('monarch-sw-state');
    await cache.put('/__sw_auto_depart', new Response(JSON.stringify(stateObj), {
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (e) {}
}

function getDefaultActionsForTag(tag) {
  if (tag === 'sl-cp-morning_depart' || tag === 'sl-net-depart') {
    return [
      { action: 'start_route_ida', title: 'Iniciar Ruta' },
      { action: 'delay_route_ida', title: 'Todavía no' }
    ];
  }
  if (tag === 'sl-cp-work_arrival') {
    return [
      { action: 'arrived_now', title: 'Llegué ya' },
      { action: 'still_traffic', title: 'Sigo en ruta' }
    ];
  }
  if (tag === 'sl-cp-work_arrival_late') {
    return [
      { action: 'arrived_now', title: 'Llegué ya' },
      { action: 'arrived_15_ago', title: 'Hace 15m' }
    ];
  }
  if (tag === 'sl-cp-work_exit') {
    return [
      { action: 'leave_work_now', title: 'Salí ya' },
      { action: 'still_working', title: 'Aún en turno' }
    ];
  }
  if (tag === 'sl-cp-class_transit') {
    return [{ action: 'start_class_transit', title: 'Escuchar en Ruta' }];
  }
  return [];
}

self.addEventListener('push', (event) => {
  let payload = { title: 'SISTEMA DEL MONARCA', body: 'Tienes una directiva pendiente.', tag: 'sl-webpush', actions: [], data: {} };
  if (event.data) {
    try { payload = Object.assign(payload, event.data.json()); }
    catch (e) { payload.body = event.data.text() || payload.body; }
  }
  const actions = (Array.isArray(payload.actions) && payload.actions.length > 0)
    ? payload.actions
    : getDefaultActionsForTag(payload.tag);

  const tasks = [
    showSystemPush(payload.title, payload.body, payload.tag, [200, 100, 250], actions, payload.data)
  ];

  // Si llegó el Push de Salida Matutina con la app cerrada, dejar guardado el auto-arranque en 3 min
  if (payload.tag === 'sl-cp-morning_depart') {
    const now = Date.now();
    tasks.push(saveSwAutoDepartState({
      dayKey: getSwBioDayStr(now),
      detectedAt: now,
      autoStartAt: now + (3 * 60000),
      stage: 'grace_3m'
    }));
  }

  event.waitUntil(Promise.all(tasks));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const action = event.action || '';
  const data = (event.notification && event.notification.data) ? event.notification.data : {};
  const actionTs = Date.now();

  if (action === 'still_traffic') {
    const nextCount = (data.retryCount || 0) + 1;
    if (nextCount <= 3) {
      if (_swTacticalTimers['traffic_retry']) clearTimeout(_swTacticalTimers['traffic_retry']);
      _swTacticalTimers['traffic_retry'] = setTimeout(() => {
        showSystemPush(
          'SISTEMA // VERIFICACIÓN DE ARRIBO',
          'Han pasado 15 min más en ruta. ¿Ya llegaste al trabajo?',
          'sl-cp-work_arrival',
          [180, 90, 220],
          [
            { action: 'arrived_now', title: 'Llegué ya' },
            { action: 'still_traffic', title: 'Sigo en ruta' }
          ],
          { retryCount: nextCount, cpKey: 'work_arrival' }
        );
      }, 15 * 60000);
    }
    event.waitUntil(Promise.resolve());
    return;
  }

  if (action === 'still_working') {
    if (_swTacticalTimers['work_retry']) clearTimeout(_swTacticalTimers['work_retry']);
    _swTacticalTimers['work_retry'] = setTimeout(() => {
      showSystemPush(
        'SISTEMA // CIERRE DE JORNADA',
        '¿Ya saliste del trabajo para iniciar tu Ruta de Vuelta?',
        'sl-cp-work_exit',
        [180, 90, 220],
        [
          { action: 'leave_work_now', title: 'Salí ya' },
          { action: 'leave_work_30_ago', title: 'Hace 30m' }
        ],
        { cpKey: 'work_exit' }
      );
    }, 20 * 60000);
    event.waitUntil(Promise.resolve());
    return;
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (clientsArr) => {
      const targetAction = action || data.defaultAction || '';
      const silentActions = ['arrived_now', 'arrived_15_ago', 'start_route_ida', 'delay_route_ida', 'skip_work_today', 'leave_work_now', 'leave_work_30_ago', 'start_class_transit'];

      if (clientsArr.length > 0) {
        const client = clientsArr[0];
        if (targetAction) {
          client.postMessage({ type: 'SL_TACTICAL_ACTION', action: targetAction, data: data, actionTs: actionTs });
        }
        if (!silentActions.includes(targetAction) && 'focus' in client) {
          return client.focus();
        }
        return;
      }

      // App 100% cerrada: guardar decisión en caché del SW sin obligar a abrir Chrome encima
      if (targetAction === 'start_route_ida') {
        await saveSwAutoDepartState({
          dayKey: getSwBioDayStr(actionTs),
          detectedAt: actionTs,
          autoStartAt: actionTs,
          stage: 'confirmed_start'
        });
        return showSystemPush(
          'SISTEMA // RUTA DE IDA ACTIVA',
          'Cronómetro iniciado en segundo plano. Conduce con precaución.',
          'sl-net-depart'
        );
      }

      if (targetAction === 'delay_route_ida') {
        await saveSwAutoDepartState({
          dayKey: getSwBioDayStr(actionTs),
          detectedAt: actionTs,
          autoStartAt: actionTs + (10 * 60000),
          stage: 'wait_10m'
        });
        return showSystemPush(
          'SISTEMA // EN ESPERA (10 MIN)',
          'Si ya saliste y no vuelves a responder, Ruta de Ida arrancará sola con esos 10 min recorridos.',
          'sl-net-depart'
        );
      }

      if (self.clients.openWindow) {
        const qs = targetAction
          ? `/?swAction=${encodeURIComponent(targetAction)}&swTs=${actionTs}`
          : '/';
        return self.clients.openWindow(qs);
      }
    })
  );
});