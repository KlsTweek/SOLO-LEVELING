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
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== 'monarch-sw-state').map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-First para íconos (evita el círculo gris "S" al saltar de Wi-Fi a LTE) y Network-First para el resto
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;

  if (url.pathname === '/icon-192.png' || url.pathname === '/icon-512.png') {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((networkRes) => {
        if (networkRes && networkRes.ok) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        }
        return networkRes;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});

let _swScheduledTimers = {};
let _swMissingMissionsTimers = [];
let _swTacticalTimers = {};

function getMaxActions() {
  try {
    if (typeof Notification !== 'undefined' && Notification.maxActions) {
      return Notification.maxActions;
    }
  } catch (e) {}
  return 2;
}

function showSystemPush(title, body, tag, vibrate = [200, 100, 250], actions = [], data = {}) {
  // Unifica el aviso de auto-arranque bajo 'sl-net-depart' sin botones para reemplazar al aviso previo
  const isAutoConfirm = (tag === 'sl-net-depart-auto');
  const finalTag = isAutoConfirm ? 'sl-net-depart' : (tag || 'sl-notif-' + Date.now());
  const finalActions = isAutoConfirm ? [] : actions;

  const opts = {
    body: body || 'Directiva del Sistema actualizada.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: vibrate,
    tag: finalTag,
    renotify: true,
    data: Object.assign({ createdAt: Date.now() }, data || {})
  };
  if (Array.isArray(finalActions) && finalActions.length > 0) {
    opts.actions = finalActions.slice(0, getMaxActions());
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
  } else if (event.data.type === 'SL_CLOSE_NOTIFICATION') {
    const tagToClose = event.data.tag;
    if (tagToClose) {
      event.waitUntil(
        self.registration.getNotifications({ tag: tagToClose }).then((list) => {
          list.forEach((n) => n.close());
        }).catch(() => {})
      );
    }
  } else if (event.data.type === 'SL_SCHEDULE_TACTICAL_CHECKPOINTS') {
    Object.values(_swTacticalTimers).forEach((t) => clearTimeout(t));
    _swTacticalTimers = {};
    const list = Array.isArray(event.data.checkpoints) ? event.data.checkpoints : [];
    list.forEach((cp) => {
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

  let title = payload.title;
  let body = payload.body;
  let tag = payload.tag;
  const actions = (Array.isArray(payload.actions) && payload.actions.length > 0)
    ? payload.actions
    : (tag === 'sl-net-depart-auto' ? [] : getDefaultActionsForTag(tag));

  const tasks = [];

  // Push-Despertador inteligente: lee si sigues en Wi-Fi o ya vas en LTE al despertar el SW
  if (tag === 'sl-cp-morning_depart') {
    const connType = (self.navigator && self.navigator.connection && self.navigator.connection.type)
      ? self.navigator.connection.type
      : 'unknown';
    tag = 'sl-net-depart';

    if (connType === 'wifi') {
      title = 'SISTEMA // AÚN EN CASA (WI-FI)';
      body = 'Sigues en tu Wi-Fi doméstico. Toca cuando salgas o pospón 10 min.';
    } else {
      if (connType === 'cellular') {
        title = 'SISTEMA // SALIDA DETECTADA (LTE)';
        body = 'Datos móviles detectados a tu hora de salida. Ruta de Ida iniciará sola en 3 min.';
      }
      const now = Date.now();
      tasks.push(saveSwAutoDepartState({
        dayKey: getSwBioDayStr(now),
        detectedAt: now,
        autoStartAt: now + (3 * 60000),
        stage: 'grace_3m'
      }));
    }
  }

  tasks.push(showSystemPush(title, body, tag, [200, 100, 250], actions, payload.data));
  event.waitUntil(Promise.all(tasks));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const action = event.action || '';
  const data = (event.notification && event.notification.data) ? event.notification.data : {};
  const actionTs = Date.now();

  if (action === 'start_route_ida' || action === 'delay_route_ida' || action === 'skip_work_today') {
    if (_swScheduledTimers['auto_depart_confirm']) {
      _swScheduledTimers['auto_depart_confirm'].forEach((t) => clearTimeout(t));
      delete _swScheduledTimers['auto_depart_confirm'];
    }
  }

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