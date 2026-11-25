/* ==========================================================================
   MISSIONS.JS - RUTINAS, CUARENTENA, SONAR RADAR Y PROTOCOLOS OCULTOS
   ========================================================================== */

/* ==========================================================================
   1. OBTENER MISIONES DEL DÍA (FILTRADAS POR HORARIO, RUTA Y ACADEMIA)
   ========================================================================== */
let showAllProgressiveMissions = false;

window.toggleProgressiveViewMode = function() {
    showAllProgressiveMissions = !showAllProgressiveMissions;
    renderRoutine();
};

const ROTATABLE_SUB_IDS = ['m_phys', 'm_creative', 'm_gf'];
const ROTATABLE_SUB_NAMES = {
    'm_phys': 'Mecánica Serpento',
    'm_creative': 'Práctica Creativa',
    'm_gf': 'Vínculo Amoroso'
};

window.cycleTodayParallelMission = function(currentId) {
    if (!p) return;
    let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
    let idx = ROTATABLE_SUB_IDS.indexOf(currentId);
    let nextId = ROTATABLE_SUB_IDS[(idx + 1) % ROTATABLE_SUB_IDS.length];
    p.customSubOverrideDay = todayKey;
    p.customSubOverrideId = nextId;
    selectedRoutineMissionId = nextId;
    saveData();
    renderRoutine();
    if (typeof systemNotify === 'function') {
        systemNotify(`[DIRECTIVA PARALELA REASIGNADA]: Hoy tu objetivo rotativo es [${ROTATABLE_SUB_NAMES[nextId]}].`, "info");
    }
};

window.incrementHydrationGlass = function() {
    if (!p || p.penaltyActive) return;
    let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
    if (p.hydrationDay !== todayKey) {
        p.hydrationDay = todayKey;
        p.hydrationGlasses = 0;
    }
    if (p.completedToday && p.completedToday.includes('m_hydration')) return;

    p.hydrationGlasses = Math.min(8, (p.hydrationGlasses || 0) + 1);
    p.sp = Math.min(100, (p.sp || 0) + 2);
    if (typeof playSystemSound === 'function') playSystemSound('check');

    let isFinished = (p.hydrationGlasses >= 8);
    if (isFinished) {
        if (!p.completedToday) p.completedToday = [];
        if (!p.completedToday.includes('m_hydration')) {
            p.completedToday.push('m_hydration');
        }
        p.totalMissions = (p.totalMissions || 0) + 1;
        p.xp += 25;
        p.gold += Math.max(3, Math.floor(15 * (typeof GOLD_NERF !== 'undefined' ? GOLD_NERF : 0.20)));
        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        p.mp = Math.min(maxMP, (p.mp || 0) + 25);
        if (p.stats) p.stats.str = +(p.stats.str + 0.05).toFixed(2);
        if (!p.missionTimestampsToday || p.missionTimestampsDay !== todayKey) {
            p.missionTimestampsDay = todayKey;
            p.missionTimestampsToday = {};
        }
        p.missionTimestampsToday['m_hydration'] = Date.now();
        systemNotify("[RECARGA BIOLÓGICA COMPLETADA: 8/8 VASOS]: +25 XP, +0.05 STR y +25 MP asimilados.", "gold");
    }

    saveData();
    if (typeof updateHUD === 'function') updateHUD();

    let liveBracket = document.getElementById('mission-live-timer-m_hydration');
    let nextTxt = `[${p.hydrationGlasses}/8]`;
    if (liveBracket && !isFinished) {
        if (typeof setBracketCounterFlip === 'function') {
            setBracketCounterFlip(liveBracket, 'mission_m_hydration', nextTxt);
        } else {
            liveBracket.textContent = nextTxt;
        }
        let hydBtn = document.getElementById('btn-hydration-glass');
        if (hydBtn) hydBtn.textContent = `REGISTRAR VASO DE AGUA (${p.hydrationGlasses}/8)`;
    } else {
        renderRoutine();
    }
};

function syncMissingMissionsWithSW() {
    if (!p || !('serviceWorker' in navigator)) return;
    let list = getTodayMissions();
    let done = Array.isArray(p.completedToday) ? p.completedToday : [];
    let missingTitles = list.filter(m => !done.includes(m.id)).map(m => m.title);
    if (!p.studyCompletedToday) missingTitles.unshift('Repaso Cognitivo');

    navigator.serviceWorker.ready.then(reg => {
        if (reg.active) {
            reg.active.postMessage({
                type: 'SL_SYNC_MISSING_MISSIONS',
                missing: missingTitles
            });
        }
    }).catch(() => {});
}

function getTodayMissions(forcedDay = null) {
    let rawList = typeof baseMissions !== 'undefined' ? [...baseMissions] : [];
    let now = new Date();
    let nowMs = now.getTime();
    let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr(now) : now.toDateString();
    let currentDay = forcedDay !== null ? forcedDay : ((typeof getBiologicalDateObj === 'function') ? getBiologicalDateObj(now).getDay() : now.getDay());
    let currentHour = now.getHours();

    let list = [];
    let hasExtraPass = p && p.extraChorrosUnlockedDay === todayKey;
    let idaCompleted = p && Array.isArray(p.completedToday) && p.completedToday.includes('m_traffic_ida');
    let idaReadyAfter30s = idaCompleted && (!p.chorrosIdaFinishedAt || (nowMs - p.chorrosIdaFinishedAt >= 30000));

    let isWeekday = (currentDay >= 1 && currentDay <= 5);
    const weekdaySubRotation = {
        1: 'm_phys',
        2: 'm_creative',
        3: 'm_gf',
        4: 'm_phys',
        5: 'm_creative'
    };
    let todayRotatedSub = (p && p.customSubOverrideDay === todayKey && p.customSubOverrideId)
        ? p.customSubOverrideId
        : (weekdaySubRotation[currentDay] || 'm_phys');

    rawList.forEach(m => {
        if (forcedDay === null && !hasExtraPass) {
            if (m.id === 'm_traffic_ida' && currentHour >= 14 && !(p.activeMissions && p.activeMissions['m_traffic_ida']) && !idaCompleted) return;
            if (m.id === 'm_traffic_vuelta' && currentHour < 14 && !idaReadyAfter30s) return;
        }
        if ((currentDay === 0 || currentDay === 6) && m.id === 'm_work') return;

        if (isWeekday && ROTATABLE_SUB_IDS.includes(m.id)) {
            let alreadyDoneOrActive = (p && Array.isArray(p.completedToday) && p.completedToday.includes(m.id)) || (p && p.activeMissions && p.activeMissions[m.id]);
            if (m.id !== todayRotatedSub && !alreadyDoneOrActive) return;
        }

        list.push(m);
    });

    if (p && p.schedules && p.schedules.length > 0) {
        p.schedules.forEach((sched, idx) => {
            let daysArr = Array.isArray(sched.days) ? sched.days : [parseInt(sched.day)];
            if (daysArr.includes(currentDay)) {
                let showByShift = true;
                if (forcedDay === null) {
                    if (sched.shift === "Mañana" && currentHour >= 15) showByShift = false;
                    if (sched.shift === "Tarde" && currentHour < 12) showByShift = false;
                }

                if (showByShift) {
                    list.push({
                        id: `sched_${idx}_${sched.name}`,
                        title: `${sched.type === 'tutor' ? 'Tutoría:' : 'Academia:'} ${sched.name}`,
                        desc: `Sesión programada del turno ${sched.shift}. Mantén atención absoluta.`,
                        type: "main",
                        rank: "A",
                        xp: 75,
                        gold: 45,
                        spCost: 20,
                        stat: "int",
                        timeCat: "study",
                        mins: 90
                    });
                }
            }
        });
    }

    return list;
}

function getEffectiveMissionSpCost(m) {
    let spCost = m.spCost || 10;
    if (!p) return spCost;
    let now = Date.now();
    let hasEq = (id) => (typeof hasEquippedItem === "function") ? hasEquippedItem(id) : false;

    let antMult = hasEq("eq_acc_metus") ? 1.5 : 1;
    let availAnts = (typeof getAvailableInfantryCount === "function") ? getAvailableInfantryCount('ants') : 0;
    let antCount = Math.floor(availAnts * antMult);
    if (antCount >= 5 && (m.id.includes('clean') || m.id.includes('traffic'))) {
        spCost = Math.max(2, spCost - Math.floor(antCount / 5));
    }
    if (hasEq("eq_a_boots_e") && (m.stat === 'str' || m.id.includes('clean'))) {
        spCost = Math.max(2, spCost - 3);
    }
    if (hasEq("eq_a_serpento") && m.id.includes('traffic')) {
        spCost = Math.floor(spCost * 0.5);
    }
    if (m.id.includes('traffic') && Array.isArray(p.titles) && p.titles.some(t => t.id === 't_job_breaker')) {
        spCost = Math.max(2, Math.floor(spCost * 0.80));
    }
    if (p.equippedShadows && p.equippedShadows.includes('tusk')) {
        let tuskLvl = (p.shadowArmy && p.shadowArmy.tusk) ? (p.shadowArmy.tusk.level || 1) : 1;
        let discPct = Math.min(0.55, 0.35 + ((tuskLvl - 1) * 0.02));
        spCost = Math.max(2, Math.floor(spCost * (1 - discPct)));
    }
    if (p.spDiscountUntil && now < p.spDiscountUntil) {
        spCost = Math.floor(spCost * 0.5);
    }
    if (p.bypassFatigue || (p._arcOverdriveUntil && now < p._arcOverdriveUntil) || (p.stealthModeUntil && now < p.stealthModeUntil)) {
        spCost = 0;
    }
    return spCost;
}

/* ==========================================================================
   2. RENDERIZAR TABLÓN DE RUTINA (CON CUARENTENA ABSOLUTA AL MORIR)
   ========================================================================== */
function getEffectiveMissionGoldReward(m) {
    if (!p || !m) return 0;
    let now = Date.now();
    let hasEq = (id) => (typeof hasEquippedItem === "function") ? hasEquippedItem(id) : false;

    let igrisActive = p.equippedShadows && p.equippedShadows.includes('igris');
    let igrisBuff = igrisActive ? 1 + (((p.shadowArmy && p.shadowArmy.igris ? p.shadowArmy.igris.level : 1) || 1) * 0.03) : 1;

    let netGold = 0;
    if (p.starStreamNext && (m.gold || 0) > 0) {
        netGold = Math.floor((m.gold || 0) * 3 * igrisBuff);
    } else {
        let beruLvl = (p.shadowArmy && p.shadowArmy.beru) ? (p.shadowArmy.beru.level || 1) : 1;
        let beruGoldMult = (p.beruSpeedUntil && now < p.beruSpeedUntil) ? (1 + ((35 + ((beruLvl - 1) * 3)) / 100)) : 1.0;
        let wolfGoldMult = hasEq("eq_acc_wolf") ? 1.10 : 1.0;
        let taxRate = (p._arcGildedUntil && now < p._arcGildedUntil) ? 1.0 : (typeof GOLD_NERF !== 'undefined' ? GOLD_NERF : 0.20);
        netGold = Math.floor((m.gold || 0) * igrisBuff * beruGoldMult * wolfGoldMult * taxRate);
    }

    let availOrcs = (typeof getAvailableInfantryCount === "function") ? getAvailableInfantryCount('orcs') : 0;
    if (m.stat === 'str' && availOrcs > 0) {
        let orcMult = hasEq("eq_acc_metus") ? 4.5 : 3;
        netGold += Math.floor(availOrcs * orcMult);
    }
    if (m.id && m.id.includes('traffic') && hasEq("eq_a_serpento")) netGold += 15;
    if (hasEq("eq_acc_silver")) netGold += 10;

    return netGold;
}

let selectedRoutineMissionId = null;

function isTelemetryMission(m) {
    if (!m || !m.id) return false;
    return m.id === 'm_traffic_ida' || m.id === 'm_traffic_vuelta' || m.id === 'm_work' || m.id.startsWith('sched_');
}

const TELEMETRY_EMA_ALPHA = 0.35;

function ensureWorkTelemetryProfile() {
    if (!p) return null;
    if (!p.workTelemetryProfile) {
        p.workTelemetryProfile = {
            departMins: 355,     // 5:55 AM inicial
            arrivalMins: 480,    // 8:00 AM inicial
            leaveWorkMins: 930,  // 3:30 PM inicial
            samples: 0,
            shiftStreak: { depart: 0, arrival: 0, leave: 0 }
        };
    }
    if (!p.workTelemetryProfile.shiftStreak) {
        p.workTelemetryProfile.shiftStreak = { depart: 0, arrival: 0, leave: 0 };
    }
    return p.workTelemetryProfile;
}

function formatClockMins12h(totalMins) {
    let m = ((Math.round(totalMins) % 1440) + 1440) % 1440;
    let h24 = Math.floor(m / 60);
    let min = m % 60;
    let ap = h24 >= 12 ? 'PM' : 'AM';
    let h12 = h24 % 12 || 12;
    return `${h12}:${String(min).padStart(2, '0')} ${ap}`;
}

function recordWorkClockSample(kind, dateObjOrTs) {
    let prof = ensureWorkTelemetryProfile();
    if (!prof) return;
    let d = new Date(dateObjOrTs);
    let curMins = d.getHours() * 60 + d.getMinutes();

    const fieldMap = { depart: 'departMins', arrival: 'arrivalMins', leave: 'leaveWorkMins' };
    const key = fieldMap[kind];
    if (!key) return;

    let prev = prof[key];
    let diff = Math.abs(curMins - prev);

    // Si durante 3 días seguidos tu horario real se desvía > 20 min, el Sistema asume cambio de trabajo/horario y se adapta rápido
    if (diff > 20) {
        prof.shiftStreak[kind] = (prof.shiftStreak[kind] || 0) + 1;
    } else {
        prof.shiftStreak[kind] = 0;
    }

    let alpha = prof.samples < 3 ? 0.55 : (prof.shiftStreak[kind] >= 3 ? 0.72 : TELEMETRY_EMA_ALPHA);
    prof[key] = Math.round((alpha * curMins) + ((1 - alpha) * prev));
    if (kind === 'arrival') prof.samples = (prof.samples || 0) + 1;

    if (prof.shiftStreak[kind] >= 3) {
        prof.shiftStreak[kind] = 0;
        if (typeof systemNotify === 'function') {
            systemNotify(`[RECALIBRACIÓN DE HORARIO]: Nuevo patrón detectado (${formatClockMins12h(prof[key])}). Los avisos se han ajustado automáticamente.`, 'info');
        }
    }
}

function recordAdaptiveTelemetry(missionId, realMins) {
    if (!p || !missionId) return realMins;
    let cleanMins = Math.max(1, Math.round(realMins));
    if (!p.telemetryStats) p.telemetryStats = {};
    let st = p.telemetryStats[missionId];
    if (!st) {
        st = { totalMins: cleanMins, count: 1, bestMins: cleanMins, emaMins: cleanMins, lastMins: cleanMins };
        p.telemetryStats[missionId] = st;
    } else {
        let prevEma = st.emaMins || (st.count > 0 ? Math.round(st.totalMins / st.count) : cleanMins);
        st.totalMins += cleanMins;
        st.count += 1;
        st.lastMins = cleanMins;
        if (cleanMins < (st.bestMins || cleanMins)) st.bestMins = cleanMins;
        st.emaMins = Math.round((TELEMETRY_EMA_ALPHA * cleanMins) + ((1 - TELEMETRY_EMA_ALPHA) * prevEma));
    }
    if (!p.telemetryLastToday) p.telemetryLastToday = {};
    p.telemetryLastToday[missionId] = cleanMins;
    return st.emaMins;
}

function getTelemetryAverageMins(missionId, fallbackMins = 30) {
    if (!p || !p.telemetryStats || !p.telemetryStats[missionId] || p.telemetryStats[missionId].count === 0) {
        return fallbackMins;
    }
    let st = p.telemetryStats[missionId];
    if (st.emaMins) return Math.round(st.emaMins);
    return Math.round(st.totalMins / st.count);
}

window.toggleMissionCardSelect = function(id) {
    selectedRoutineMissionId = (selectedRoutineMissionId === id) ? null : id;
    renderRoutine();
};

window.claimEmergencySurvivalHeal = function() {
    if (!p) return;
    let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    if (p.emergencySurvivalDay === currentDayStr) return;
    p.emergencySurvivalDay = currentDayStr;
    let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    p.hp = Math.min(maxH, +(p.hp + 25).toFixed(1));
    selectedRoutineMissionId = null;
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    renderRoutine();
    if (typeof systemNotify === "function") {
        systemNotify("[VOLUNTAD DE RECUPERACIÓN]: Signos vitales estabilizados de emergencia (+25 HP).", "info");
    }
};

function renderRoutine() {
    if (!p) return;

    const tabRoutine = document.getElementById('tab-routine');
    const penContainer = document.getElementById('penalty-container');
    const evContainer = document.getElementById('event-container');
    const routContainer = document.getElementById('routine-container');
    const headers = tabRoutine ? tabRoutine.querySelectorAll('.section-header') : [];

    // Ocultar los encabezados separados antiguos para que luzca una sola ventana limpia como en el anime
    headers.forEach(h => h.style.display = 'none');
    if (evContainer) evContainer.style.display = 'none';

    if (p.penaltyActive) {
        if (routContainer) routContainer.style.display = 'none';
        if (penContainer) {
            const PENALTY_TRIALS = [
                "Completa <b>30 flexiones de pecho estrictas y 1 litro de agua pura</b> para reactivar tu bombeo sanguíneo.",
                "Ejecuta <b>40 sentadillas profundas y 60 segundos de plancha abdominal (plank)</b> sin apoyar las rodillas.",
                "Realiza <b>15 minutos cronometrados de limpieza y orden físico extremo</b> en tu cuarto o área de trabajo.",
                "Completa <b>50 saltos de tijera (Jumping Jacks) y 20 fondos de tríceps</b> en el borde de una silla o cama.",
                "Haz <b>25 zancadas por pierna (Lunges) y elimina 30 archivos o capturas basura</b> de la memoria de tu teléfono.",
                "Mantén <b>90 segundos de sentadilla isométrica contra la pared (Wall Sit) y 20 abdominales</b>.",
                "Ejecuta <b>15 burpees completos a tu propio ritmo</b> y estira la espalda y el cuello durante 3 minutos."
            ];
            let daySeed = new Date().getDate() + ((p.history && p.history.deaths) ? p.history.deaths : 0);
            let todayTrial = PENALTY_TRIALS[daySeed % PENALTY_TRIALS.length];

            penContainer.innerHTML = `
            <div class="card penalty" style="flex-direction: column; align-items: flex-start; gap: 14px; margin-top: 10px;">
                <div class="card-body" style="padding-right: 0; width: 100%;">
                    <div class="card-title" style="color: var(--danger); font-size: 1.35em;">⚠️ ZONA DE PENALIZACIÓN: DIRECTIVA #${(daySeed % PENALTY_TRIALS.length) + 1}</div>
                    <div class="card-desc" style="color: #fff; font-size: 0.98em;">Tus signos vitales colapsaron.<br><br>🎯 <b>MISIÓN DE SUPERVIVENCIA DE HOY:</b><br>${todayTrial}</div>
                </div>
                <div style="display:flex; gap:10px; width:100%;">
                    <button class="btn btn-blue" style="flex:1;" onclick="switchTab('inventory', 2)">🎒 Ir a Bolsa</button>
                    <button class="btn btn-purple" style="flex:1;" onclick="switchTab('shop', 3)">🛒 Ir a Tienda</button>
                </div>
                <button class="btn btn-red" style="width: 100%; padding: 16px; font-size: 1.05em;" onclick="completePenalty()">⚔️ HE SOBREVIVIDO (SELLAR CASTIGO)</button>
            </div>`;
        }
        return;
    }

    if (penContainer) penContainer.innerHTML = '';
    if (!routContainer) return;
    routContainer.style.display = 'block';

    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr(now) : now.toDateString();
    let isSleeping = (typeof isSleepingNow === "function") ? isSleepingNow(now) : (p.sleepingUntilMorning === currentDayStr);
    let isVigilActiveTonight = (typeof isNightVigilActiveNow === "function") ? isNightVigilActiveNow(now) : (p.nightPassActive === currentDayStr);

        let continuousMins = (h < 5 ? h + 24 : h) * 60 + m;
    let deadlineMins = 21 * 60 + 20; // 9:20 PM: Misiones incompletas pasan a X roja
    if (p.tankCurfewDelayDay === currentDayStr) deadlineMins += 45;
    if (p.nightPassActive === currentDayStr || p.movieNightCurfewDay === currentDayStr) deadlineMins = 23 * 60 + 20;
    if (isMercyActive()) deadlineMins = 26 * 60;
    let curMinRoutine = h * 60 + m;
    let isPastDeadline = (continuousMins >= deadlineMins && !isSleeping && !isVigilActiveTonight && (curMinRoutine >= 1280 || curMinRoutine < 270));

    const svgCheckGreen = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px #00e5ff);"><polyline points="20,6 9,17 4,12"/></svg>`;
    const svgCrossRed   = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ff2a55" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px #ff2a55);"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    let rowsHtml = '';

    if (p.hp <= 15 && p.emergencySurvivalDay !== currentDayStr) {
        let emSelected = (selectedRoutineMissionId === 'emergency_survival');
        rowsHtml += `
        <div class="sl-goal-row-item ${emSelected ? 'active-goal-row' : ''}" onclick="toggleMissionCardSelect('emergency_survival')">
            <div class="sl-goal-main-line">
                <span class="sl-goal-name" style="color:#fda4af !important;">[EMERGENCIA: SIGNOS VITALES CRÍTICOS]</span>
                <div class="sl-goal-right">
                    <span style="color:#fda4af !important;">[+25 HP]</span>
                    <div class="sl-goal-check-box failed-red" onclick="event.stopPropagation(); claimEmergencySurvivalHeal()">!</div>
                </div>
            </div>
            ${emSelected ? `
            <div class="sl-goal-drawer" onclick="event.stopPropagation()">
                <div style="margin-bottom:8px;">Bebe un vaso de agua pura y respira profundo durante 30 segundos para estabilizar tu pulso sin gastar oro (1 vez al día).</div>
                <button class="btn btn-main" style="width:100%; padding:10px;" onclick="claimEmergencySurvivalHeal()">ESTABILIZAR PULSO (+25 HP GRATIS)</button>
            </div>` : ''}
        </div>`;
    }

    if (p.activeEvent) {
        let evSelected = (selectedRoutineMissionId === 'daily_anomaly');
        rowsHtml += `
        <div class="sl-goal-row-item ${evSelected ? 'active-goal-row' : ''}" onclick="toggleMissionCardSelect('daily_anomaly')">
            <div class="sl-goal-main-line">
                <span class="sl-goal-name">${p.activeEvent.title || 'Incursión Sorpresa'}</span>
                <div class="sl-goal-right">
                    <span>[???]</span>
                    <div class="sl-goal-check-box" onclick="event.stopPropagation(); claimDailyEvent()"></div>
                </div>
            </div>
            ${evSelected ? `
            <div class="sl-goal-drawer" onclick="event.stopPropagation()">
                <div style="margin-bottom:8px; color:#fff;">${p.activeEvent.desc}</div>
                <button class="btn btn-main" style="width:100%; padding:10px;" onclick="claimDailyEvent()">SELLAR ANOMALÍA (+60 XP)</button>
            </div>` : ''}
        </div>`;
    }

    let studyDone = !!p.studyCompletedToday;
    let studySelected = (selectedRoutineMissionId === 'study_focus');
    let studyBoxClass = studyDone ? 'checked-green' : (isPastDeadline ? 'failed-red' : '');
    let studyBoxIcon  = studyDone ? svgCheckGreen : (isPastDeadline ? svgCrossRed : '');
    rowsHtml += `
    <div class="sl-goal-row-item ${studySelected ? 'active-goal-row' : ''} ${studyDone ? 'goal-row-completed' : ''}" onclick="toggleMissionCardSelect('study_focus')">
        <div class="sl-goal-main-line">
            <span class="sl-goal-name">Repaso Cognitivo</span>
            <div class="sl-goal-right">
                <span>[${studyDone ? '25/25m' : '0/25m'}]</span>
                <div class="sl-goal-check-box ${studyBoxClass}" onclick="event.stopPropagation(); ${!studyDone ? "openModal('study-modal')" : ''}">${studyBoxIcon}</div>
            </div>
        </div>
        ${studySelected ? `
        <div class="sl-goal-drawer" onclick="event.stopPropagation()">
            <div style="margin-bottom:8px;">Aísla tu mente por 5 o 25 minutos de inmersión total (+MP e Inteligencia).</div>
            ${studyDone
                ? `<div class="sl-mission-sealed-msg" style="color:#e0f2fe;">[Sesión cognitiva completada hoy]</div>`
                : `<button class="btn btn-main" style="width:100%; padding:10px;" onclick="openModal('study-modal')">ENTRAR A CÁMARA DE FOCUS</button>`}
        </div>` : ''}
    </div>`;

    let todayMissions = getTodayMissions();
    if (!p.completedToday) p.completedToday = [];
    if (!p.activeMissions) p.activeMissions = {};
    if (p.hydrationDay !== currentDayStr) {
        p.hydrationDay = currentDayStr;
        p.hydrationGlasses = 0;
    }

    todayMissions.forEach(m => {
        let isDone = p.completedToday.includes(m.id);
        let isActive = !!p.activeMissions[m.id];
        let isSelected = (selectedRoutineMissionId === m.id);
        let isTelemetry = isTelemetryMission(m);
        let isHydration = (m.id === 'm_hydration');
        let isRotatableSub = ROTATABLE_SUB_IDS.includes(m.id);

        let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;
        let reqMins = isTelemetry ? getTelemetryAverageMins(m.id, m.mins || 30) : Math.ceil((m.mins || 30) * agiFactor);
        let minsPassed = isActive ? Math.max(0, Math.floor((Date.now() - p.activeMissions[m.id]) / 60000)) : 0;

        let bracketText = '';
        if (isHydration) {
            let gCount = isDone ? 8 : (p.hydrationGlasses || 0);
            bracketText = `[${gCount}/8]`;
        } else if (isDone) {
            let lastRec = (p.telemetryLastToday && p.telemetryLastToday[m.id]) ? p.telemetryLastToday[m.id] : reqMins;
            bracketText = `[${lastRec}/${reqMins}m]`;
        } else if (isActive) {
            bracketText = isTelemetry ? `[${minsPassed}m]` : `[${minsPassed}/${reqMins}m]`;
        } else {
            bracketText = `[0/${reqMins}m]`;
        }

        let boxClass = isDone ? 'checked-green' : (isPastDeadline ? 'failed-red' : '');
        let boxIcon  = isDone ? svgCheckGreen : (isPastDeadline ? svgCrossRed : '');
        let quickCheckClick = '';
        if (!isDone) {
            if (isHydration) {
                quickCheckClick = `incrementHydrationGlass()`;
            } else {
                quickCheckClick = isActive ? `finishRoutineMission('${m.id}')` : `deployRoutineMission('${m.id}')`;
            }
        }

        if (typeof _bracketFlipCache !== 'undefined') {
            _bracketFlipCache[`mission_${m.id}`] = bracketText;
        }

                let isTransitAudioThis = (m.id.startsWith('sched_') && isActive && p.classAudioTransitMode);
        let telemetryNote = isTelemetry
            ? `<div class="sl-telemetry-note" style="color:#bae6fd; margin-bottom:6px;">[Telemetría Adaptativa EMA: ~${reqMins}m]${isTransitAudioThis ? '<br><span style="color:#7dd3fc;">[ENLACE RADIAL EN MOTO ACTIVO • 0 CASTIGO POR DESERCIÓN]</span>' : ''}</div>`
            : '';

        let swapNextName = '';
        if (isRotatableSub && !isDone && !isActive) {
            let nextSubId = ROTATABLE_SUB_IDS[(ROTATABLE_SUB_IDS.indexOf(m.id) + 1) % ROTATABLE_SUB_IDS.length];
            swapNextName = ROTATABLE_SUB_NAMES[nextSubId];
        }

        let swapBtnHtml = swapNextName
            ? `<button class="btn" style="margin-bottom:8px; opacity:0.85;" onclick="cycleTodayParallelMission('${m.id}')">[ ⇄ CAMBIAR HOY POR: ${swapNextName.toUpperCase()} ]</button>`
            : '';

        let activePulseIndicator = isActive ? `<span class="sl-active-mission-dot"></span>` : '';

        rowsHtml += `
        <div class="sl-goal-row-item ${isSelected ? 'active-goal-row' : ''} ${isDone ? 'goal-row-completed' : ''} ${isActive ? 'is-running-row' : ''}" onclick="toggleMissionCardSelect('${m.id}')">
            ${activePulseIndicator}
            <div class="sl-goal-main-line">
                <span class="sl-goal-name">${m.title}</span>
                <div class="sl-goal-right">
                    <span id="mission-live-timer-${m.id}">${bracketText}</span>
                    <div class="sl-goal-check-box ${boxClass}" onclick="event.stopPropagation(); ${quickCheckClick}">${boxIcon}</div>
                </div>
            </div>

            ${isSelected ? `
            <div class="sl-goal-drawer" onclick="event.stopPropagation()">
                <div>${m.desc}</div>
                ${telemetryNote}
                <div class="card-rewards" style="width:100%; justify-content:space-around;">
                    <span class="r-xp">+${m.xp} XP</span>
                    <span class="r-gold">+${getEffectiveMissionGoldReward(m)} G</span>
                    <span class="r-sp">+${getEffectiveMissionSpCost(m)} FATIGA</span>
                    <span class="r-stat">+${(m.mins && m.mins >= 40) ? 65 : 45} MP</span>
                </div>
                ${swapBtnHtml}
                ${isDone
                    ? `<div class="sl-mission-sealed-msg" style="color:#e0f2fe;">[Misión sellada en el registro de hoy]</div>`
                    : (isHydration
                        ? `<button class="btn" id="btn-hydration-glass" onclick="incrementHydrationGlass()">REGISTRAR VASO DE AGUA (${p.hydrationGlasses || 0}/8)</button>`
                                                : (isActive
                            ? `${m.id.startsWith('sched_') ? `<button class="btn btn-blue" style="margin-bottom:8px;" onclick="toggleClassOledShield(true, '${m.id}', '${m.title.replace(/'/g, "\\'")}')">[ ESCUDO OLED: PONER EN BOLSILLO ]</button><button class="btn btn-blue" style="margin-bottom:8px;" onclick="toggleClassAudioTransitMode()">[ ENLACE RADIAL EN MOTO: ${p.classAudioTransitMode ? 'ACTIVO' : 'APAGADO'} ]</button>` : ''}${m.id === 'm_traffic_ida' ? `<button class="btn btn-blue" style="margin-bottom:8px;" onclick="openSmartArrivalHandoverModal()">[ RELEVO A TRABAJO / AJUSTAR HORA ]</button>` : ''}${m.id === 'm_work' ? `<button class="btn btn-blue" style="margin-bottom:8px;" onclick="openSmartWorkExitModal()">[ SALÍ DEL TRABAJO / AJUSTAR HORA ]</button>` : ''}<button class="btn" onclick="finishRoutineMission('${m.id}')">${isTelemetry ? 'FINALIZAR Y REGISTRAR TIEMPO REAL' : 'SELLAR MISIÓN (' + minsPassed + '/' + reqMins + 'm)'}</button>`
                            : `${m.id.startsWith('sched_') ? `<button class="btn btn-blue" style="margin-bottom:8px;" onclick="openRetroactiveClassStartModal('${m.id}')">[ YA LA ESCUCHABA EN RUTA (AJUSTAR HORA) ]</button>` : ''}<button class="btn" onclick="selectedRoutineMissionId=null; deployRoutineMission('${m.id}')">${isTelemetry ? 'INICIAR CRONÓMETRO REAL' : 'DESPLEGAR MISIÓN (' + reqMins + 'm)'}</button>`))}
            </div>` : ''}
        </div>`;
    });

    syncMissingMissionsWithSW();

    // Controles Nocturnos en Misiones: SOLO visibles desde las 8:00 PM (h >= 20 || h < 5), invisibles de día
    let vigilLeft = (typeof ensureNightVigilQuota === "function") ? ensureNightVigilQuota() : 2;
        let curMinCtrls = h * 60 + m;
    let showNightControls = (curMinCtrls >= 1200 || curMinCtrls < 270);

    let sleepSectionHtml = '';

    if (showNightControls) {
        let vigilExpiredTonight = (p.nightPassActive === currentDayStr && continuousMins >= (23 * 60 + 20));
        let vigilHtml = '';
        if (isVigilActiveTonight) {
            vigilHtml = `
            <div style="margin-bottom:8px; padding:8px 10px; background:rgba(88,28,135,0.28); border:1px solid #bae6fd; text-align:center; font-size:0.76em; color:#bae6fd;">
                <b>PASE DE DESVELO (11:20)</b><br>
                <span style="color:#bae6fd;">Cero corrosión • Misiones al 100% (${vigilLeft}/2 restantes)</span>
            </div>`;
        } else if (vigilExpiredTonight) {
            vigilHtml = `
            <div style="margin-bottom:8px; padding:7px 10px; background:rgba(45,6,20,0.45); border:1px solid #bae6fd; text-align:center; font-size:0.74em; color:#bae6fd;">
                <b>PASE DE DESVELO EXPIRADO (11:20 PM)</b> — Activa Hibernación para dormir
            </div>`;
        } else if (continuousMins < (23 * 60 + 20)) {
            vigilHtml = `
            <button class="btn btn-blue" style="width:100%; margin-bottom:8px; padding:9px !important; font-size:0.74em !important; border-color:#bae6fd !important;" onclick="openNightVigilModal()">
                PASE NOCTURNO 11:20 (${vigilLeft}/2)
            </button>`;
        }

        let hibernateHtml = isSleeping
            ? `<div style="padding:10px; background:rgba(16, 185, 129, 0.12); border:1px solid #bae6fd; text-align:center;">
                <div style="color:#bae6fd; font-weight:700; font-size:0.86em; margin-bottom:4px;">MODO HIBERNACIÓN ACTIVO</div>
                <div style="color:#bae6fd; font-size:0.74em; margin-bottom:8px;">Signos vitales y oro protegidos hasta las 4:30 AM.</div>
                <button class="btn btn-blue" style="padding:5px 10px !important; font-size:0.68em !important;" onclick="wakeUpFromSleepMode()">Desbloquear antes de las 4:30 AM</button>
               </div>`
            : `<button class="btn btn-purple" style="width:100%; padding:11px !important; font-size:0.78em !important; border-color:#bae6fd !important;" onclick="activateNightSleepMode()">
                TERMINAR DÍA
               </button>`;

        sleepSectionHtml = `<div style="margin:18px 16px 0 18px;">${vigilHtml}${hibernateHtml}</div>`;
    }

    routContainer.innerHTML = `
    <div class="sl-goal-frame-outer">
        <div class="sl-mech-rail top"></div>
        <div class="sl-goal-window ${(100 - (p.sp !== undefined ? p.sp : 100)) >= 80 ? 'high-fatigue-glitch' : ''}">
            <div class="sl-goal-inner-border">
                <div class="sl-anime-box-header">
                    <div class="sl-anime-excl-box"><div class="sl-anime-excl-circle">!</div></div>
                    <div class="sl-anime-title-box">INFO DE MISIÓN</div>
                </div>
                <div class="sl-goal-subhead">[Misión Diaria: La preparación para volverse fuerte ha llegado.]</div>
                <div class="sl-goal-title-wrap">
                    <div class="sl-goal-title">OBJETIVO</div>
                </div>
                <div class="sl-goal-list">
                    ${rowsHtml}
                </div>
                ${sleepSectionHtml}
                <div class="sl-goal-warning-footer ${isPastDeadline ? 'bleed-active' : ''}"></div>
            </div>
        </div>
        <div class="sl-mech-rail bottom"></div>
    </div>`;
}


function updateActiveMissionTimersInPlace() {
    if (document.hidden || !p || p.penaltyActive || !p.activeMissions) return;
    let todayList = getTodayMissions();
    let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;

    Object.keys(p.activeMissions).forEach(id => {
        let el = document.getElementById(`mission-live-timer-${id}`);
        if (!el) return;
        let m = todayList.find(x => x.id === id);
        if (!m) return;

        let minsPassed = Math.floor((Date.now() - p.activeMissions[id]) / 60000);
        let nextTxt = '';
        if (isTelemetryMission(m)) {
            nextTxt = `[${minsPassed}m]`;
        } else {
            let reqMins = Math.ceil((m.mins || 30) * agiFactor);
            nextTxt = `[${minsPassed}/${reqMins}m]`;
        }
        if (typeof setBracketCounterFlip === "function") {
            setBracketCounterFlip(el, `mission_${id}`, nextTxt);
        } else {
            el.textContent = nextTxt;
        }
    });
}

if (window.routineLiveTimerInterval) clearInterval(window.routineLiveTimerInterval);
window.routineLiveTimerInterval = setInterval(updateActiveMissionTimersInPlace, 15000);

function scheduleMissionNativeReminders(m) {
    if (!m || !('serviceWorker' in navigator)) return;
    let alerts = [];
    if (m.id === 'm_traffic_ida') {
        alerts = [
            { delayMs: 45 * 60000, title: 'SISTEMA DEL MONARCA // RUTA', body: 'Llevas 45m en Ruta de Ida. ¿Ya llegaste al trabajo? Sella tu ruta y despliega Jornada Laboral.', tag: 'sl-rem-ida-1' },
            { delayMs: 65 * 60000, title: 'ALERTA DE MEMORIA // CAZADOR', body: '65m en Ruta de Ida. No olvides sellar tu viaje e iniciar Jornada Laboral.', tag: 'sl-rem-ida-2' },
            { delayMs: 85 * 60000, title: 'RELEVO AUTOMÁTICO EN ESPERA', body: 'Tu cronómetro de Ruta superó los 85m. Abre el Sistema para transferir el tiempo excedente a tu Jornada Laboral.', tag: 'sl-rem-ida-3' }
        ];
    } else if (m.id === 'm_work') {
        alerts = [
            { delayMs: 120 * 60000, title: 'TELEMETRÍA DE JORNADA (2H)', body: 'Mitad del bloque matutino completada. Hidrátate y mantén el enfoque.', tag: 'sl-rem-work-1' },
            { delayMs: 240 * 60000, title: 'META DE JORNADA ALCANZADA (4H)', body: 'Ya puedes sellar tu Jornada Laboral o seguir acumulando tiempo real.', tag: 'sl-rem-work-2' }
        ];
    } else if (m.id.startsWith('sched_')) {
        alerts = [
            { delayMs: 45 * 60000, title: 'VIGÍA DE ACADEMIA (45M)', body: 'Mitad de clase. Prohibido abrir juegos externos; el Ojo de Kandiaru vigila tu INT.', tag: 'sl-rem-sched-1' },
            { delayMs: 90 * 60000, title: 'CLASE COMPLETADA (90M)', body: 'Sella tu sesión académica en el Tablón y dirígete a cerrar tus misiones nocturnas.', tag: 'sl-rem-sched-2' }
        ];
    } else {
        let reqM = m.mins || 15;
        alerts = [
            { delayMs: reqM * 60000, title: 'OBJETIVO COMPLETADO: ' + m.title.toUpperCase(), body: 'El tiempo requerido ha concluido. Regresa al Sistema para ejecutar el Corte Dimensional.', tag: 'sl-rem-' + m.id }
        ];
    }

        navigator.serviceWorker.ready.then(reg => {
        if (reg.active) {
            reg.active.postMessage({ type: 'SL_SCHEDULE_REMINDERS', missionId: m.id, alerts: alerts });
        }
    }).catch(() => {});

    if (typeof window.scheduleCloudPush === 'function') {
        alerts.forEach(al => {
            window.scheduleCloudPush(m.id, al.title, al.body, Math.round((al.delayMs || 60000) / 1000), al.tag);
        });
    }
}

function cancelMissionNativeReminders(missionId) {
    if (typeof window.cancelCloudPush === 'function') window.cancelCloudPush(missionId);
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.ready.then(reg => {
        if (reg.active) {
            reg.active.postMessage({ type: 'SL_CANCEL_REMINDERS', missionId: missionId });
        }
    }).catch(() => {});
}


let _oledWakeLock = null;
let _oledTimerInterval = null;
window._classOledShieldActive = false;

window.toggleClassOledShield = async function(enable, missionId = null, title = 'SESIÓN EN CURSO') {
    let ov = document.getElementById('sl-class-shield-overlay');
    let titleEl = document.getElementById('sl-class-shield-title');
    let timerEl = document.getElementById('sl-class-shield-timer');

    if (!enable) {
        window._classOledShieldActive = false;
        if (_oledTimerInterval) { clearInterval(_oledTimerInterval); _oledTimerInterval = null; }
        if (_oledWakeLock) { try { await _oledWakeLock.release(); } catch (e) {} _oledWakeLock = null; }
        if (ov) ov.style.display = 'none';
        return;
    }

    window._classOledShieldActive = true;
    if (titleEl) titleEl.innerText = title.toUpperCase();
    if (ov) ov.style.display = 'flex';

    const updateOledClock = () => {
        if (!p || !p.activeMissions || !missionId || !p.activeMissions[missionId]) return;
        let mins = Math.max(0, Math.floor((Date.now() - p.activeMissions[missionId]) / 60000));
        if (timerEl) timerEl.innerText = `${String(mins).padStart(2, '0')}m`;
    };
    updateOledClock();
    if (_oledTimerInterval) clearInterval(_oledTimerInterval);
    _oledTimerInterval = setInterval(updateOledClock, 15000);

    if ('wakeLock' in navigator) {
        try { _oledWakeLock = await navigator.wakeLock.request('screen'); } catch (e) {}
    }
};

window.toggleClassAudioTransitMode = function() {
    if (!p) return;
    p.classAudioTransitMode = !p.classAudioTransitMode;
    saveData();
    renderRoutine();
    if (typeof systemNotify === 'function') {
        systemNotify(p.classAudioTransitMode
            ? "[ENLACE RADIAL ACTIVADO]: Puedes escuchar tu clase manejando con pantalla apagada o en otra app sin castigo por deserción."
            : "[ENLACE RADIAL DESACTIVADO]: Vigilancia estándar de academia restaurada.", "info");
    }
};

function _buildSmartTimeShell(modalId, title, sub, bodyHtml) {
    let old = document.getElementById(modalId);
    if (old) old.remove();
    let cornerSVG = (typeof getBaroqueCornerSVG === "function") ? getBaroqueCornerSVG() : '';
    let ov = document.createElement('div');
    ov.id = modalId;
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,18,0.92); backdrop-filter:blur(6px); z-index:13650; display:flex; justify-content:center; align-items:center; padding:18px;';
    ov.innerHTML = `
        <div class="sl-holo-frame" style="width:100%; max-width:405px; cursor:default;">
            <div class="sl-holo-rail top"><span class="rail-core"></span></div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="padding:18px 15px; text-align:center;">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div class="sl-holo-header-row" style="margin-bottom:6px;">
                        <div class="sl-excl-square"><span class="sl-excl-circle-inner">!</span></div>
                        <div class="sl-title-rect">${title}</div>
                    </div>
                    <div class="sl-holo-subbracket" style="margin-bottom:10px;">${sub}</div>
                    ${bodyHtml}
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
        </div>
    `;
    document.body.appendChild(ov);
    return ov;
}

function _timeInputToTodayTs(hhmmStr) {
    if (!hhmmStr || !hhmmStr.includes(':')) return Date.now();
    let parts = hhmmStr.split(':').map(Number);
    let d = new Date();
    d.setHours(parts[0] || 0, parts[1] || 0, 0, 0);
    return d.getTime();
}

window.openSmartArrivalHandoverModal = function() {
    if (!p || !p.activeMissions || !p.activeMissions['m_traffic_ida']) return;
    let startTs = p.activeMissions['m_traffic_ida'];
    let now = Date.now();
    let elapsedMins = Math.max(1, Math.floor((now - startTs) / 60000));
    let prof = ensureWorkTelemetryProfile();
    let learnedArrMins = prof ? prof.arrivalMins : 480;
    let learnedLabel = formatClockMins12h(learnedArrMins);

    let learnedDate = new Date();
    learnedDate.setHours(Math.floor(learnedArrMins / 60), learnedArrMins % 60, 0, 0);
    let learnedTs = Math.min(now, Math.max(startTs + 60000, learnedDate.getTime()));

    let defH = String(new Date().getHours()).padStart(2, '0');
    let defM = String(new Date().getMinutes()).padStart(2, '0');
    let isLearnedMature = prof && prof.samples >= 7;

    let html = `
        <div style="color:#e0f2fe; font-size:0.86em; line-height:1.45; margin-bottom:12px;">
            Tu <b>[Ruta de Ida]</b> lleva <b>${elapsedMins} min</b> activa.<br>
            Indica en 1 toque a qué hora llegaste al trabajo para separar el viaje real y tu jornada:
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px;">
            <button class="btn btn-main" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartArrivalHandover(${now})">LLEGUÉ AHORITA</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartArrivalHandover(${Math.max(startTs + 60000, now - 15 * 60000)})">HACE 15 MIN</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartArrivalHandover(${Math.max(startTs + 60000, now - 30 * 60000)})">HACE 30 MIN</button>
            <button class="btn ${isLearnedMature ? 'btn-main' : 'btn-blue'}" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartArrivalHandover(${learnedTs})">HABITUAL (${learnedLabel})</button>
        </div>
        <div style="display:flex; gap:6px; align-items:center; margin-bottom:10px;">
            <input type="time" id="sl-exact-arrival-time" class="input-dark" value="${defH}:${defM}" style="margin:0; padding:8px; flex:1; color-scheme:dark; text-align:center;">
            <button class="btn btn-blue" style="padding:9px 10px !important; font-size:0.7em !important;" onclick="executeSmartArrivalHandover(_timeInputToTodayTs(document.getElementById('sl-exact-arrival-time').value))">APLICAR HORA</button>
        </div>
        <button class="btn btn-red" style="width:100%; padding:8px !important; font-size:0.72em !important;" onclick="snoozeArrivalHandover()">SIGO EN TRÁFICO (PREGUNTAR EN 15M)</button>
    `;
    _buildSmartTimeShell('sl-handover-modal', 'RELEVO DE LLEGADA', '[ SEPARACIÓN DE RUTA Y JORNADA ]', html);
};

window.snoozeArrivalHandover = function() {
    let modal = document.getElementById('sl-handover-modal');
    if (modal) modal.remove();
    p._arrivalHandoverSnoozeUntil = Date.now() + (15 * 60000);
    saveData();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
            if (reg.active) {
                reg.active.postMessage({
                    type: 'SL_SCHEDULE_REMINDERS',
                    missionId: 'arrival_snooze',
                    alerts: [{
                        delayMs: 15 * 60000,
                        title: 'SISTEMA // VERIFICACIÓN DE ARRIBO',
                        body: 'Pasaron 15 min más. ¿Ya llegaste al trabajo?',
                        tag: 'sl-cp-work_arrival',
                        actions: [
                            { action: 'arrived_now', title: 'Llegué ya' },
                            { action: 'arrived_15_ago', title: 'Hace 15m' },
                            { action: 'still_traffic', title: 'Sigo en ruta' }
                        ]
                    }]
                });
            }
        }).catch(() => {});
    }
    systemNotify("Entendido. Te volveré a preguntar en 15 minutos.", "info");
};

window.executeSmartArrivalHandover = function(arrivalTs, silentFromNotif = false) {
    let modal = document.getElementById('sl-handover-modal');
    if (modal) modal.remove();
    if (!p || !p.activeMissions || !p.activeMissions['m_traffic_ida']) return;

    let startTs = p.activeMissions['m_traffic_ida'];
    let now = Date.now();
    let clampedArrivalTs = Math.min(now, Math.max(startTs + 60000, arrivalTs || now));
    let routeMins = Math.max(1, Math.round((clampedArrivalTs - startTs) / 60000));
    let workAccumMins = Math.max(0, Math.round((now - clampedArrivalTs) / 60000));

    let mIda = getTodayMissions().find(x => x.id === 'm_traffic_ida');
    if (!mIda) return;

    recordAdaptiveTelemetry('m_traffic_ida', routeMins);
    recordWorkClockSample('depart', startTs);
    recordWorkClockSample('arrival', clampedArrivalTs);

    delete p.activeMissions['m_traffic_ida'];
    p._arrivalHandoverSnoozeUntil = null;
    cancelMissionNativeReminders('m_traffic_ida');

    if (!p.completedToday.includes('m_work')) {
        p.activeMissions['m_work'] = clampedArrivalTs;
        let mWork = getTodayMissions().find(x => x.id === 'm_work');
        if (mWork) scheduleMissionNativeReminders(mWork);
    }

    if (!p.synergiesClaimedList) p.synergiesClaimedList = [];
    if (!p.synergiesClaimedList.includes('syn_relay_work')) {
        p.synergiesClaimedList.push('syn_relay_work');
        p.mp = Math.min(1000 + ((p.stats.int - 1) * 1000), (p.mp || 0) + 80);
    }

    if (silentFromNotif) {
        // Completado silencioso desde botón de notificación Push (sin abrir modal de corte)
        if (!p.completedToday.includes('m_traffic_ida')) p.completedToday.push('m_traffic_ida');
        p.chorrosIdaFinishedAt = clampedArrivalTs;
        p.xp += mIda.xp || 40;
        p.gold += getEffectiveMissionGoldReward(mIda);
        p.totalMissions = (p.totalMissions || 0) + 1;
        if (p.timeStats) p.timeStats.traffic = (p.timeStats.traffic || 0) + routeMins;
        saveData();
        renderRoutine();
        updateHUD();
        syncDailyTacticalCheckpoints();
        systemNotify(`[RELEVO POR NOTIFICACIÓN]: Ruta de Ida sellada (${routeMins}m) y Jornada iniciada a las ${formatClockMins12h(new Date(clampedArrivalTs).getHours() * 60 + new Date(clampedArrivalTs).getMinutes())}.`, "gold");
        return;
    }

    saveData();
    renderRoutine();
    updateHUD();
    syncDailyTacticalCheckpoints();

    let arrivalClockStr = formatClockMins12h(new Date(clampedArrivalTs).getHours() * 60 + new Date(clampedArrivalTs).getMinutes());
    systemNotify(`[RELEVO SINCRONIZADO]: Ruta ${routeMins}m • Jornada corriendo desde ${arrivalClockStr} (${workAccumMins}m acumulados).`, "info");

    openSealModal({
        type: 'routine',
        id: 'm_traffic_ida',
        xp: mIda.xp,
        gold: mIda.gold,
        stat: mIda.stat,
        timeCat: 'traffic',
        mins: routeMins,
        realMins: routeMins,
        honorNote: `Llegada a trabajo ${arrivalClockStr} (${routeMins}m ruta)`
    });
};

window.openSmartWorkExitModal = function() {
    if (!p || !p.activeMissions || !p.activeMissions['m_work']) return;
    let startTs = p.activeMissions['m_work'];
    let now = Date.now();
    let prof = ensureWorkTelemetryProfile();
    let leaveMins = prof ? prof.leaveWorkMins : 930; // 3:30 PM
    let leaveDate = new Date();
    leaveDate.setHours(Math.floor(leaveMins / 60), leaveMins % 60, 0, 0);
    let leaveTs = Math.min(now, Math.max(startTs + 60000, leaveDate.getTime()));

    let defH = String(new Date().getHours()).padStart(2, '0');
    let defM = String(new Date().getMinutes()).padStart(2, '0');

    let html = `
        <div style="color:#e0f2fe; font-size:0.86em; line-height:1.45; margin-bottom:12px;">
            Indica a qué hora saliste del trabajo para guardar tu jornada real y transferir el resto a <b>[Ruta de Vuelta]</b>:
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px;">
            <button class="btn btn-main" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartWorkExit(${now})">SALÍ AHORITA</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartWorkExit(${leaveTs})">HABITUAL (${formatClockMins12h(leaveMins)})</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartWorkExit(${Math.max(startTs + 60000, now - 30 * 60000)})">HACE 30 MIN</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="executeSmartWorkExit(${Math.max(startTs + 60000, now - 60 * 60000)})">HACE 1 HORA</button>
        </div>
        <div style="display:flex; gap:6px; align-items:center; margin-bottom:10px;">
            <input type="time" id="sl-exact-exit-time" class="input-dark" value="${defH}:${defM}" style="margin:0; padding:8px; flex:1; color-scheme:dark; text-align:center;">
            <button class="btn btn-blue" style="padding:9px 10px !important; font-size:0.7em !important;" onclick="executeSmartWorkExit(_timeInputToTodayTs(document.getElementById('sl-exact-exit-time').value))">APLICAR HORA</button>
        </div>
        <button class="btn btn-red" style="width:100%; padding:8px !important; font-size:0.72em !important;" onclick="document.getElementById('sl-handover-modal')?.remove()">SEGUIR EN JORNADA</button>
    `;
    _buildSmartTimeShell('sl-handover-modal', 'CIERRE DE JORNADA', '[ RELEVO A RUTA DE VUELTA ]', html);
};

window.executeSmartWorkExit = function(exitTs, silentFromNotif = false) {
    let modal = document.getElementById('sl-handover-modal');
    if (modal) modal.remove();
    if (!p || !p.activeMissions || !p.activeMissions['m_work']) return;

    let startTs = p.activeMissions['m_work'];
    let now = Date.now();
    let clampedExitTs = Math.min(now, Math.max(startTs + 60000, exitTs || now));
    let workMins = Math.max(1, Math.round((clampedExitTs - startTs) / 60000));
    let mWork = getTodayMissions().find(x => x.id === 'm_work');
    if (!mWork) return;

    recordAdaptiveTelemetry('m_work', workMins);
    recordWorkClockSample('leave', clampedExitTs);

    delete p.activeMissions['m_work'];
    cancelMissionNativeReminders('m_work');

    // Inicia Ruta de Vuelta desde la hora exacta de salida del trabajo
    if (!p.completedToday.includes('m_traffic_vuelta')) {
        p.activeMissions['m_traffic_vuelta'] = clampedExitTs;
        let mVuelta = getTodayMissions().find(x => x.id === 'm_traffic_vuelta');
        if (mVuelta) scheduleMissionNativeReminders(mVuelta);
    }

    let exitStr = formatClockMins12h(new Date(clampedExitTs).getHours() * 60 + new Date(clampedExitTs).getMinutes());

    if (silentFromNotif) {
        if (!p.completedToday.includes('m_work')) p.completedToday.push('m_work');
        p.xp += mWork.xp || 90;
        p.gold += getEffectiveMissionGoldReward(mWork);
        p.totalMissions = (p.totalMissions || 0) + 1;
        if (p.timeStats) p.timeStats.work = (p.timeStats.work || 0) + workMins;
        saveData();
        renderRoutine();
        updateHUD();
        syncDailyTacticalCheckpoints();
        systemNotify(`[SALIDA REGISTRADA]: Jornada cerrada (${workMins}m) y Ruta de Vuelta corriendo desde ${exitStr}.`, "gold");
        return;
    }

    saveData();
    renderRoutine();
    updateHUD();
    syncDailyTacticalCheckpoints();

    openSealModal({
        type: 'routine',
        id: 'm_work',
        xp: mWork.xp,
        gold: mWork.gold,
        stat: mWork.stat,
        timeCat: 'work',
        mins: workMins,
        realMins: workMins,
        honorNote: `Jornada completada hasta ${exitStr} (${workMins}m)`
    });
};

window.openRetroactiveRouteModal = function() {
    let prof = ensureWorkTelemetryProfile();
    let depMins = prof ? prof.departMins : 355;
    let depH = String(Math.floor(depMins / 60)).padStart(2, '0');
    let depM = String(depMins % 60).padStart(2, '0');

    let html = `
        <div style="color:#e0f2fe; font-size:0.86em; line-height:1.45; margin-bottom:12px;">
            Vas a iniciar <b>[Jornada Laboral]</b>, pero olvidaste activar <b>[Ruta de Ida]</b> al salir.<br>
            ¿Quieres registrar tu salida de casa ahora mismo para no perder tu telemetría ni la racha?
        </div>
        <div style="display:flex; gap:6px; align-items:center; margin-bottom:10px;">
            <span style="font-family:'Share Tech Mono', monospace; font-size:0.72em; color:#bae6fd; white-space:nowrap;">SALÍ A LAS:</span>
            <input type="time" id="sl-retro-depart-time" class="input-dark" value="${depH}:${depM}" style="margin:0; padding:8px; flex:1; color-scheme:dark; text-align:center;">
        </div>
        <div style="display:flex; flex-direction:column; gap:7px;">
            <button class="btn btn-main" style="width:100%; padding:10px !important;" onclick="confirmRetroactiveRouteAndWork()">REGISTRAR RUTA + INICIAR JORNADA</button>
            <button class="btn btn-blue" style="width:100%; padding:9px !important;" onclick="document.getElementById('sl-retro-modal')?.remove(); deployRoutineMission('m_work', true)">SOLO INICIAR JORNADA</button>
        </div>
    `;
    _buildSmartTimeShell('sl-retro-modal', 'RUTA MATUTINA', '[ REGISTRO RETROACTIVO ]', html);
};

window.confirmRetroactiveRouteAndWork = function() {
    let inp = document.getElementById('sl-retro-depart-time');
    let departTs = inp ? _timeInputToTodayTs(inp.value) : (Date.now() - 90 * 60000);
    let modal = document.getElementById('sl-retro-modal');
    if (modal) modal.remove();

    let now = Date.now();
    let routeMins = Math.max(15, Math.min(240, Math.round((now - departTs) / 60000)));
    let mIda = getTodayMissions().find(x => x.id === 'm_traffic_ida');

    recordAdaptiveTelemetry('m_traffic_ida', routeMins);
    recordWorkClockSample('depart', departTs);
    recordWorkClockSample('arrival', now);

    if (!p.completedToday) p.completedToday = [];
    if (!p.completedToday.includes('m_traffic_ida')) {
        p.completedToday.push('m_traffic_ida');
        p.totalMissions = (p.totalMissions || 0) + 1;
        if (mIda) {
            p.xp += mIda.xp || 40;
            p.gold += getEffectiveMissionGoldReward(mIda);
        }
        if (p.timeStats) p.timeStats.traffic = (p.timeStats.traffic || 0) + routeMins;
    }
    p.chorrosIdaFinishedAt = now;
    saveData();
    systemNotify(`[RUTA RETROACTIVA]: ${routeMins}m registrados desde tu salida. Iniciando Jornada Laboral...`, "gold");
    deployRoutineMission('m_work', true);
};

window.openRetroactiveClassStartModal = function(schedId) {
    let html = `
        <div style="color:#e0f2fe; font-size:0.86em; line-height:1.45; margin-bottom:12px;">
            ¿Empezaste a escuchar la clase en la moto y olvidaste activarla?<br>
            Elige desde qué hora la llevas escuchando y se activará el <b>Enlace Radial</b> (cero castigo por deserción):
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px;">
            <button class="btn btn-main" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="confirmRetroactiveClassStart('${schedId}', _timeInputToTodayTs('18:30'))">DESDE 6:30 PM</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="confirmRetroactiveClassStart('${schedId}', Date.now() - 15*60000)">HACE 15 MIN</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="confirmRetroactiveClassStart('${schedId}', Date.now() - 30*60000)">HACE 30 MIN</button>
            <button class="btn btn-blue" style="padding:9px 4px !important; font-size:0.72em !important;" onclick="confirmRetroactiveClassStart('${schedId}', Date.now())">AHORITA MISMO</button>
        </div>
        <div style="display:flex; gap:6px; align-items:center; margin-bottom:10px;">
            <input type="time" id="sl-retro-class-time" class="input-dark" value="18:30" style="margin:0; padding:8px; flex:1; color-scheme:dark; text-align:center;">
            <button class="btn btn-blue" style="padding:9px 10px !important; font-size:0.7em !important;" onclick="confirmRetroactiveClassStart('${schedId}', _timeInputToTodayTs(document.getElementById('sl-retro-class-time').value))">APLICAR</button>
        </div>
        <button class="btn btn-red" style="width:100%; padding:8px !important; font-size:0.72em !important;" onclick="document.getElementById('sl-retro-class-modal')?.remove()">CANCELAR</button>
    `;
    _buildSmartTimeShell('sl-retro-class-modal', 'ENLACE RADIAL', '[ CLASE EN RUTA DE REGRESO ]', html);
};

window.confirmRetroactiveClassStart = function(schedId, startedTs) {
    let modal = document.getElementById('sl-retro-class-modal');
    if (modal) modal.remove();
    let now = Date.now();
    let safeStart = Math.min(now, Math.max(now - 180 * 60000, startedTs || now));
    p.classAudioTransitMode = true;
    deployRoutineMission(schedId, true);
    if (p.activeMissions && p.activeMissions[schedId]) {
        p.activeMissions[schedId] = safeStart;
        saveData();
        renderRoutine();
        updateActiveMissionTimersInPlace();
    }
};

function checkForgottenRouteHandover(fromAutoWatcher = false) {
    if (!p || !p.activeMissions || !p.activeMissions['m_traffic_ida']) return false;
    let now = Date.now();
    if (fromAutoWatcher && p._arrivalHandoverSnoozeUntil && now < p._arrivalHandoverSnoozeUntil) return false;

    let startTs = p.activeMissions['m_traffic_ida'];
    let elapsedMins = Math.floor((now - startTs) / 60000);
    let dNow = new Date(now);
    let curClockMins = dNow.getHours() * 60 + dNow.getMinutes();
    let prof = ensureWorkTelemetryProfile();
    let autoAskClock = Math.max(510, (prof ? prof.arrivalMins : 480) + 25); // 8:30 AM o +25m tras hora habitual

    if (elapsedMins < 95 && curClockMins < autoAskClock) return false;
    if (document.getElementById('sl-handover-modal')) return true;

    openSmartArrivalHandoverModal();
    return true;
}

function checkForgottenTelemetryHandover(missionObj) {
    if (!missionObj || !p || !p.activeMissions || !p.activeMissions[missionObj.id]) return false;
    let id = missionObj.id;
    let isWork = (id === 'm_work');
    let isClass = id.startsWith('sched_');
    if (!isWork && !isClass) return false;

    let elapsedMins = Math.floor((Date.now() - p.activeMissions[id]) / 60000);
    if (isWork) {
        let nowH = new Date().getHours();
        let nowM = new Date().getMinutes();
        let curClock = nowH * 60 + nowM;
        // Si ya pasan de las 4:15 PM (o lleva > 9 horas) y cierra Jornada, ofrece relevo directo a Ruta de Vuelta
        if (elapsedMins >= 540 || curClock >= 975) {
            openSmartWorkExitModal();
            return true;
        }
        return false;
    }

    if (elapsedMins < 210) return false;
    if (document.getElementById('sl-handover-modal')) return true;

    let safeAvg = getTelemetryAverageMins(id, 90);
    let html = `
        <div style="color:#e0f2fe; font-size:0.9em; line-height:1.5; margin:10px 0 14px 0;">
            <b>[${missionObj.title}]</b> lleva <b>${elapsedMins} min</b> activa. ¿Olvidaste cerrarla a tiempo?<br>
            Puedes sellarla con tu promedio real (<b>${safeAvg} min</b>) para no distorsionar tus estadísticas.
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
            <button class="btn btn-main" style="width:100%; padding:11px;" onclick="confirmCleanTelemetrySeal('${id}', ${safeAvg})">
                SELLAR CON PROMEDIO REAL (${safeAvg}M)
            </button>
            <button class="btn btn-blue" style="width:100%; padding:9px;" onclick="confirmCleanTelemetrySeal('${id}', ${elapsedMins})">
                CONSERVAR ${elapsedMins}M COMPLETOS
            </button>
        </div>
    `;
    _buildSmartTimeShell('sl-handover-modal', 'PROTECCIÓN DE TELEMETRÍA', `[ CRONÓMETRO EXCEDIDO: ${elapsedMins}M ]`, html);
    return true;
}

window.confirmCleanTelemetrySeal = function(id, chosenMins) {
    let modal = document.getElementById('sl-handover-modal');
    if (modal) modal.remove();
    let m = getTodayMissions().find(x => x.id === id);
    if (!m) return;

    recordAdaptiveTelemetry(m.id, chosenMins);
    p.classAudioTransitMode = false;
    toggleClassOledShield(false);

    openSealModal({
        type: 'routine',
        id: m.id,
        xp: m.xp,
        gold: m.gold,
        stat: m.stat,
        timeCat: m.timeCat,
        mins: chosenMins,
        realMins: chosenMins
    });
};

let _classFocusLeftAt = null;
function initAcademicAntiClashGuard() {
    if (window._antiClashBound) return;
    window._antiClashBound = true;

    document.addEventListener('visibilitychange', () => {
        if (!p || !p.activeMissions) return;
        let activeClassId = Object.keys(p.activeMissions).find(id => id.startsWith('sched_'));
        if (!activeClassId || window._classOledShieldActive || p.classAudioTransitMode) {
            _classFocusLeftAt = null;
            return;
        }

        if (document.hidden) {
            _classFocusLeftAt = Date.now();
        } else if (_classFocusLeftAt) {
            let awaySecs = Math.floor((Date.now() - _classFocusLeftAt) / 1000);
            _classFocusLeftAt = null;
            if (awaySecs >= 45 && awaySecs <= 900) {
                p.classDeserterToday = true;
                p.hp = Math.max(5, +(p.hp - 20).toFixed(1));
                p.gold = Math.max(0, p.gold - 35);
                p.activeMissions[activeClassId] += (awaySecs * 1000);
                saveData();
                updateHUD();
                renderRoutine();
                systemNotify(`[DESERCIÓN EN CLASE DETECTADA: ${awaySecs}s FUERA DEL SISTEMA]: Si vas manejando o escuchando audio, activa el Enlace Radial o Escudo OLED. (-20 HP, -35 G).`, "danger");
            }
        }
    });
}
initAcademicAntiClashGuard();

function deployRoutineMission(id, skipRetroPrompt = false) {
    if (p.penaltyActive) {
        systemNotify("SISTEMA BLOQUEADO. Cumple tu supervivencia primero.", "danger");
        return;
    }
    let todayList = getTodayMissions();
    let m = todayList.find(x => x.id === id);
    if (!m) return;

    if (!p.activeMissions) p.activeMissions = {};
    if (p.activeMissions[id]) return;

    // Si inicia Jornada Laboral entre 6:30 y 11:00 AM sin haber registrado Ruta de Ida, ofrece registro retroactivo en 1 toque
    if (!skipRetroPrompt && id === 'm_work') {
        let hNow = new Date().getHours();
        let idaDone = Array.isArray(p.completedToday) && p.completedToday.includes('m_traffic_ida');
        if (!idaDone && !p.activeMissions['m_traffic_ida'] && hNow >= 6 && hNow <= 11) {
            openRetroactiveRouteModal();
            return;
        }
    }

    if (m.type === 'main') {
        let activeMainId = Object.keys(p.activeMissions).find(actId => {
            let actObj = todayList.find(x => x.id === actId);
            return actObj && actObj.type === 'main';
        });
        if (activeMainId) {
            let isTransitClassPair = (id.startsWith('sched_') && activeMainId === 'm_traffic_vuelta') ||
                                     (id === 'm_traffic_vuelta' && activeMainId.startsWith('sched_'));
            if (isTransitClassPair) {
                p.classAudioTransitMode = true;
                systemNotify("[ENLACE RADIAL ACADÉMICO]: Ruta de Vuelta y Clase enlazadas en paralelo (0 castigo por deserción mientras conduces).", "gold");
            } else {
                if (activeMainId === 'm_traffic_ida') {
                    openSmartArrivalHandoverModal();
                    return;
                }
                if (activeMainId === 'm_work' && id === 'm_traffic_vuelta') {
                    openSmartWorkExitModal();
                    return;
                }
                let activeMainObj = todayList.find(x => x.id === activeMainId);
                systemNotify(`Ubicación Física Ocupada: Ya estás ejecutando [${activeMainObj ? activeMainObj.title : activeMainId}]. Séllala antes de iniciar otra principal.`, "danger");
                return;
            }
        }
    }

    let now = Date.now();
    let spCost = getEffectiveMissionSpCost(m);

    if (m.id === 'm_work' && p.chorrosIdaFinishedAt && (now - p.chorrosIdaFinishedAt <= 20 * 60000)) {
        spCost = 0;
        if (!p.synergiesClaimedList) p.synergiesClaimedList = [];
        if (!p.synergiesClaimedList.includes('syn_relay_work')) {
            p.synergiesClaimedList.push('syn_relay_work');
            let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
            p.mp = Math.min(maxMP, (p.mp || 0) + 90);
            systemNotify("[SINERGIA DE RELEVO PERFECTO]: Iniciaste Jornada Laboral justo al llegar de Ruta de Ida (0 Fatiga inicial y +90 MP).", "gold");
        }
    }

    if (p.bypassFatigue) {
        spCost = 0;
        p.bypassFatigue = false;
        systemNotify("Bypass de Fatiga consumido: 0 Fatiga acumulada.", "purple");
    } else if (p.entropyBuffUntil && now < p.entropyBuffUntil) {
        spCost = -8;
    }

    if (spCost > 0 && p.sp < spCost) {
        p.hp = Math.max(0, p.hp - 10);
        updateHUD();
        systemNotify("Límite de Fatiga excedido (100%). Forzar tu cuerpo te costó -10 HP.", "danger");
        if (p.hp <= 0 && typeof triggerDeath === "function") {
            p.deathSource = 'routine';
            triggerDeath("Colapso por agotamiento extremo al forzar una misión con 100% de Fatiga.");
            return;
        }
    } else if (spCost !== 0) {
        if (typeof animateSPChange === "function") {
            animateSPChange(-spCost);
        } else {
            p.sp = Math.max(0, Math.min(100, p.sp - spCost));
        }
    }

    p.activeMissions[id] = now;
    scheduleMissionNativeReminders(m);
    if (typeof _evalArcDeployHook === "function") _evalArcDeployHook(m);

    saveData();
    updateHUD();
    renderRoutine();
    if (m.id.startsWith('sched_')) {
        systemNotify(`Vigía de Academia activo: [${m.title}]. Mantén el Sistema abierto o la pantalla bloqueada; salir a juegos externos por +28s restará HP y Oro.`, "info");
    } else if (isTelemetryMission(m)) {
        let avgM = getTelemetryAverageMins(m.id, m.mins || 30);
        systemNotify(`Cronómetro de Telemetría iniciado: [${m.title}]. Sella cuando termines en la vida real (Promedio: ${avgM} min).`, "info");
    } else {
        let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;
        systemNotify(`Misión iniciada: [${m.title}]. Meta: ${Math.ceil((m.mins || 30) * agiFactor)} min.`, "info");
    }
}

function finishRoutineMission(id) {
    let m = getTodayMissions().find(x => x.id === id);
    if (!m || !p.activeMissions || !p.activeMissions[id]) return;

       if (id === 'm_traffic_ida' && checkForgottenRouteHandover()) {
        return;
    }
    if (checkForgottenTelemetryHandover(m)) {
        return;
    }
        if (id.startsWith('sched_')) {
        toggleClassOledShield(false);
        p.classAudioTransitMode = false;
    }

    let now = Date.now();
    let rawElapsedMs = now - p.activeMissions[id];
    if (rawElapsedMs < 0) {
        p.activeMissions[id] = now - 60000;
        rawElapsedMs = 60000;
    }
    let elapsedMins = rawElapsedMs / 60000;
    let isTelemetry = isTelemetryMission(m);

    if (isTelemetry) {
        if (elapsedMins < 1) {
            systemNotify("El cronómetro de telemetría lleva menos de 1 minuto. Registra tu tiempo real al finalizar la actividad.", "info");
            return;
        }
                let realMins = Math.max(1, Math.round(elapsedMins));
        let prevAvg = getTelemetryAverageMins(m.id, realMins);
        let newAvg = recordAdaptiveTelemetry(m.id, realMins);
        if (m.id === 'm_traffic_ida') {
            recordWorkClockSample('depart', p.activeMissions[id]);
            recordWorkClockSample('arrival', now);
        } else if (m.id === 'm_work') {
            recordWorkClockSample('leave', now);
        }
        syncDailyTacticalCheckpoints();

        systemNotify(`Telemetría EMA [${m.title}]: ${realMins} min reales (Promedio adaptativo: ${newAvg}m | Anterior: ${prevAvg}m).`, "info");
        openSealModal({
            type: 'routine',
            id: m.id,
            xp: m.xp,
            gold: m.gold,
            stat: m.stat,
            timeCat: m.timeCat,
            mins: realMins,
            realMins: realMins
        });
        return;
    }

    let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;
    let requiredMins = (m.mins || 30) * ((p.ambrosiaHalfTimeUses && p.ambrosiaHalfTimeUses > 0) ? 0.50 : agiFactor);
    let beruBypass = (p.beruSpeedUntil && now < p.beruSpeedUntil) || (p._arcOverdriveUntil && now < p._arcOverdriveUntil);

    if (!beruBypass && elapsedMins < requiredMins) {
        let missing = Math.ceil(requiredMins - elapsedMins);
        let penaltyDmg = (p.cryoBuffUntil && now < p.cryoBuffUntil) ? 2.5 : 5;
        p.hp = Math.max(0, p.hp - penaltyDmg);
        updateHUD();
        saveData();
        systemNotify(`Faltan ${missing} minutos para completar [${m.title}]. Penalización por prisa: -${penaltyDmg} HP.`, "danger");
        if (p.hp <= 0 && typeof triggerDeath === "function") {
            p.deathSource = 'routine';
            triggerDeath("Colapso por intentar forzar sellos antes de tiempo.");
        }
        return;
    }

    if (p.ambrosiaHalfTimeUses && p.ambrosiaHalfTimeUses > 0) {
        p.ambrosiaHalfTimeUses--;
        systemNotify(`Néctar de los Gobernantes aplicado: Misión validada al 50% del tiempo (${p.ambrosiaHalfTimeUses} usos restantes).`, "gold");
    }

    let realMinsWorked = Math.max(m.mins || 30, Math.floor(elapsedMins));
    let overtimeBlocks = Math.max(0, Math.floor((realMinsWorked - (m.mins || 30)) / 15));
    let bonusXP = overtimeBlocks * 5;
    let bonusGold = overtimeBlocks * 3;

    if (!p.telemetryLastToday) p.telemetryLastToday = {};
    p.telemetryLastToday[m.id] = realMinsWorked;

    openSealModal({
        type: 'routine',
        id: m.id,
        xp: m.xp + bonusXP,
        gold: m.gold + bonusGold,
        stat: m.stat,
        timeCat: m.timeCat,
        mins: m.mins,
        realMins: realMinsWorked
    });
}

/* ==========================================================================
   4. SONAR RADAR CIRCULAR DE LA ASOCIACIÓN Y TERMINAL DE GREMIO ÚNICA
   ========================================================================== */
let currentDungFilter = 'Todos';
let currentRadarBlips = [];
let selectedRadarDungId = null;

const SONAR_QUADRANTS = [
    { x: 28, y: 30, sector: "N-O // SEC-04" },
    { x: 72, y: 26, sector: "N-E // SEC-11" },
    { x: 26, y: 70, sector: "S-O // SEC-19" },
    { x: 74, y: 68, sector: "S-E // SEC-27" }
];

function syncBeaconRescanButton() {
    let btn = document.querySelector('button[onclick="rescanRadarNodes()"]');
    if (!btn) return;
    if (p && p.redBeaconArmed) {
        btn.className = 'btn btn-red';
        btn.style.cssText = 'padding: 6px 12px; font-size: 0.72em; border-color: #ff2a55 !important; box-shadow: 0 0 16px rgba(255,42,85,0.85) !important; animation: pulseRedBar 1s infinite;';
        btn.innerHTML = `<span style="display:inline-block; background:#ff2a55; color:#ffffff; font-weight:900; padding:0 5px; margin-right:5px; border-radius:1px; box-shadow:0 0 8px #ff2a55;">?</span>REESCANEAR`;
    } else {
        btn.className = 'btn btn-main';
        btn.style.cssText = 'padding: 6px 12px; font-size: 0.72em;';
        btn.innerHTML = `📡 Reescanear`;
    }
}
window.syncBeaconRescanButton = syncBeaconRescanButton;

function getBeaconAllowedRanksByLevel(lvl) {
    if (lvl < 15) return ['E', 'D', 'C'];           // Cazador Rango E: Da E, D y máximo C
    if (lvl < 27) return ['D', 'C', 'B'];           // Cazador Rango D: Da D, C y máximo B
    if (lvl < 40) return ['C', 'B', 'A'];           // Cazador Rango C: Da C, B y máximo A
    if (lvl < 80) return ['B', 'A', 'S'];           // Cazador Rango B/A: Da B, A y máximo S
    return ['A', 'S', 'SSS'];                       // Cazador Rango S: Da A, S y probabilidad de SSS
}

function cleanExpiredBeaconGates() {
    if (!p) return;
    let now = Date.now();
    if (p.beaconUnlockedGates) {
        Object.keys(p.beaconUnlockedGates).forEach(id => {
            if (p.beaconUnlockedGates[id].expiresAt <= now) {
                delete p.beaconUnlockedGates[id];
            }
        });
    }
    if (p.savedRadarBlipsUntil && p.savedRadarBlipsUntil <= now) {
        p.savedRadarBlipsUntil = null;
        p.savedRadarBlipsData = null;
    }
}

window.filterDungeons = function(rank, btnElement) {
    currentDungFilter = rank;
    if (btnElement) {
        document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }
    generateRadarBlips(false);
    renderBosses();
};

let _isSonarScanning = false;
let _sonarScanTimers = [];
let _threatsDrawerOpen = false;

window.togglePersonalThreatsDrawer = function() {
    _threatsDrawerOpen = !_threatsDrawerOpen;
    let bar = document.getElementById('sl-threats-bar');
    let drawer = document.getElementById('boss-container');
    if (bar) bar.classList.toggle('is-open', _threatsDrawerOpen);
    if (drawer) drawer.classList.toggle('collapsed', !_threatsDrawerOpen);
};

function _getBlipAngleDeg(x, y) {
    let rad = Math.atan2(x - 50, -(y - 50));
    let deg = (rad * 180) / Math.PI;
    return (deg + 360) % 360;
}

function rescanRadarHorizon() {
    if (_isSonarScanning) return;
    _isSonarScanning = true;
    _sonarScanTimers.forEach(t => clearTimeout(t));
    _sonarScanTimers = [];

    if (navigator.vibrate) navigator.vibrate(40);
    if (typeof _evalArcRadarScan === "function") _evalArcRadarScan();

    let usedBeacon = !!(p && p.redBeaconArmed);
    if (usedBeacon) {
        p.redBeaconArmed = false;
        currentDungFilter = 'Todos';
        document.querySelectorAll('.filter-tab').forEach((b, i) => b.classList.toggle('active', i === 0));
    }

    generateRadarBlips(true, usedBeacon);
    syncBeaconRescanButton();
    renderBosses(true);

    let screen = document.querySelector('#dungeon-list-container .sonar-screen');
    let scanOv = document.getElementById('sonar-scan-overlay');
    let pingWv = document.getElementById('sonar-ping-wave');
    let metaCount = document.getElementById('sonar-signals-count');
    let termSlot = document.getElementById('sonar-terminal-slot');

    if (metaCount) metaCount.textContent = `ESCANEANDO... 0/${currentRadarBlips.length}`;
    if (termSlot) {
        termSlot.innerHTML = `
        <div class="sl-sonar-dossier" style="text-align:center; padding:18px;">
            <div style="font-family:'Share Tech Mono', monospace; color:#7dd3fc; font-size:0.8em; letter-spacing:1.2px;">
                [ BARRIDO DIMENSIONAL EN PROGRESO... ]
            </div>
        </div>`;
    }

    if (scanOv) {
        scanOv.classList.remove('scanning-active');
        void scanOv.offsetWidth;
        scanOv.classList.add('scanning-active');
    }
    if (pingWv) {
        pingWv.classList.remove('ping-active');
        void pingWv.offsetWidth;
        pingWv.classList.add('ping-active');
    }

    let ordered = currentRadarBlips
        .map(b => ({ id: b.dung.id, angle: _getBlipAngleDeg(b.x, b.y) }))
        .sort((a, b) => a.angle - b.angle);

    let foundCount = 0;
    ordered.forEach((item) => {
        let delayMs = Math.max(180, Math.round((item.angle / 360) * 1280));
        let tid = setTimeout(() => {
            foundCount++;
            if (screen) {
                let blipEl = screen.querySelector(`.sonar-blip[data-dung-id="${item.id}"]`);
                if (blipEl) {
                    blipEl.classList.remove('blip-hidden');
                    blipEl.classList.add('blip-lock-in');
                }
            }
            if (metaCount) metaCount.textContent = `DETECTADAS: ${foundCount}/${currentRadarBlips.length}`;
            if (typeof playSystemSound === 'function') playSystemSound('type');
        }, delayMs);
        _sonarScanTimers.push(tid);
    });

    let finishTid = setTimeout(() => {
        _isSonarScanning = false;
        if (scanOv) scanOv.classList.remove('scanning-active');
        if (pingWv) pingWv.classList.remove('ping-active');
        if (metaCount) metaCount.textContent = `SEÑALES: ${currentRadarBlips.length}/4`;
        if (screen) {
            screen.querySelectorAll('.sonar-blip').forEach(el => {
                el.classList.remove('blip-hidden', 'blip-lock-in');
            });
        }
        updateSonarTerminalOnly();
        if (typeof systemNotify === "function") {
            systemNotify(usedBeacon
                ? "SOBRECARGA CARMESÍ COMPLETADA: Portales de alto rango fijados durante 30 minutos."
                : "Barrido sonar completado.", usedBeacon ? "danger" : "info");
        }
    }, 1420);
    _sonarScanTimers.push(finishTid);
}

function selectRadarBlip(dungId) {
    if (_isSonarScanning || selectedRadarDungId === dungId) return;
    selectedRadarDungId = dungId;
    if (typeof playSystemSound === 'function') playSystemSound('type');

    document.querySelectorAll('#dungeon-list-container .sonar-blip').forEach(el => {
        el.classList.toggle('selected-blip', el.getAttribute('data-dung-id') === dungId);
    });
    updateSonarTerminalOnly();
}

function generateRadarBlips(forceReshuffle = false, triggeredByBeacon = false) {
    if (typeof dungeonDB === 'undefined' || dungeonDB.length === 0) {
        currentRadarBlips = [];
        return;
    }

    cleanExpiredBeaconGates();
    let now = Date.now();
    let clearedList = (p && Array.isArray(p.clearedDungeons)) ? p.clearedDungeons : [];
    let beaconMap = (p && p.beaconUnlockedGates) ? p.beaconUnlockedGates : {};

    // 1. Si presionó Reescanear o no hay escaneo guardado vigente, generar los 4 nodos base y guardarlos por 30 minutos
    if (forceReshuffle || !p.savedRadarBlipsData || !p.savedRadarBlipsUntil || p.savedRadarBlipsUntil <= now) {
        let picked = [];

        if (triggeredByBeacon) {
            if (!p.beaconUnlockedGates) p.beaconUnlockedGates = {};
            let allowedRanks = getBeaconAllowedRanksByLevel(p.level || 1);
            let pool = dungeonDB.filter(d => allowedRanks.includes(d.rank));
            if (p.level >= 80 && Math.random() < 0.45) {
                let sssGates = dungeonDB.filter(d => d.rank === 'SSS');
                if (sssGates.length > 0) picked.push(sssGates[0]);
            }
            let highRanks = allowedRanks.slice(-2);
            let highPool = pool.filter(d => highRanks.includes(d.rank)).sort(() => Math.random() - 0.5);
            let restPool = pool.sort(() => Math.random() - 0.5);
            let merged = [...picked, ...highPool.slice(0, 2), ...restPool];
            let seen = new Set();
            picked = [];
            for (let d of merged) {
                if (!seen.has(d.id) && picked.length < 4) {
                    seen.add(d.id);
                    picked.push(d);
                }
            }
            picked.forEach((d, idx) => {
                p.beaconUnlockedGates[d.id] = {
                    expiresAt: now + (30 * 60000),
                    isRedGate: (idx < 2 || Math.random() < 0.50)
                };
            });
            beaconMap = p.beaconUnlockedGates;
        } else {
            let eligible = dungeonDB.filter(dung => {
                let isCleared = clearedList.includes(dung.id);
                let isBeaconActive = !!(beaconMap[dung.id] && beaconMap[dung.id].expiresAt > now);
                let isLevelOk = dung.minLevel <= ((p.level || 1) + 4);
                return isLevelOk || isCleared || isBeaconActive;
            });
            picked = [...eligible].sort(() => Math.random() - 0.5).slice(0, 4);
        }

        p.savedRadarBlipsUntil = now + (30 * 60000);
        p.savedRadarBlipsData = picked.map((d, idx) => {
            let baseQ = SONAR_QUADRANTS[idx % SONAR_QUADRANTS.length];
            let jitterX = Math.floor(Math.random() * 12) - 6;
            let jitterY = Math.floor(Math.random() * 12) - 6;
            let isRed = (beaconMap[d.id] && beaconMap[d.id].isRedGate !== undefined)
                ? beaconMap[d.id].isRedGate
                : (Math.random() < 0.08);
            return {
                dungId: d.id,
                isRedGate: isRed,
                x: Math.max(18, Math.min(82, baseQ.x + jitterX)),
                y: Math.max(18, Math.min(82, baseQ.y + jitterY)),
                sector: baseQ.sector
            };
        });
        if (typeof saveData === "function") saveData();
    }

// 2. Construir la vista actual respetando el filtro y distribuyendo cada nodo en su propio cuadrante sin encimarse
    if (!p._radarRedCache || p._radarRedCacheUntil !== p.savedRadarBlipsUntil) {
        p._radarRedCache = {};
        p._radarRedCacheUntil = p.savedRadarBlipsUntil;
    }

    let sourceBlips = (p.savedRadarBlipsData || []).map(saved => {
        let d = dungeonDB.find(x => x.id === saved.dungId);
        if (!d) return null;
        let bInfo = beaconMap[d.id];
        d.isRedGate = bInfo ? bInfo.isRedGate : !!saved.isRedGate;
        p._radarRedCache[d.id] = d.isRedGate;
        d._beaconUnlocked = !!(bInfo && bInfo.expiresAt > now) || clearedList.includes(d.id);
        d._beaconExpiresAt = (bInfo && bInfo.expiresAt > now) ? bInfo.expiresAt : (p.savedRadarBlipsUntil || null);
        return { dung: d };
    }).filter(Boolean);

    let listToPlace = [];
    if (currentDungFilter === 'Todos') {
        listToPlace = sourceBlips.map(b => b.dung);
    } else {
        let matchingSaved = sourceBlips.filter(b => b.dung.rank === currentDungFilter).map(b => b.dung);
        let extraEligible = dungeonDB.filter(d => {
            if (d.rank !== currentDungFilter) return false;
            if (matchingSaved.some(m => m.id === d.id)) return false;
            let isCleared = clearedList.includes(d.id);
            let isBeacon = !!(beaconMap[d.id] && beaconMap[d.id].expiresAt > now);
            let isLvlOk = d.minLevel <= ((p.level || 1) + 4);
            return isCleared || isBeacon || isLvlOk;
        }).slice(0, Math.max(0, 4 - matchingSaved.length));

        extraEligible.forEach(d => {
            let bInfo = beaconMap[d.id];
            if (p._radarRedCache[d.id] === undefined) {
                p._radarRedCache[d.id] = bInfo ? bInfo.isRedGate : (Math.random() < 0.08);
            }
            d.isRedGate = p._radarRedCache[d.id];
            d._beaconUnlocked = !!(bInfo && bInfo.expiresAt > now) || clearedList.includes(d.id);
            d._beaconExpiresAt = (bInfo && bInfo.expiresAt > now) ? bInfo.expiresAt : null;
        });

        listToPlace = [...matchingSaved, ...extraEligible].slice(0, 4);
    }

    // Asignar a cada nodo su propio cuadrante exclusivo (0: N-O, 1: N-E, 2: S-O, 3: S-E) con desplazamiento estable
    currentRadarBlips = listToPlace.map((d, idx) => {
        let baseQ = SONAR_QUADRANTS[idx % SONAR_QUADRANTS.length];
        let hash = 0;
        for (let c = 0; c < d.id.length; c++) hash = ((hash << 5) - hash) + d.id.charCodeAt(c);
        let jitterX = (Math.abs(hash) % 13) - 6;
        let jitterY = (Math.abs(hash >> 4) % 13) - 6;

        return {
            dung: d,
            x: Math.max(20, Math.min(80, baseQ.x + jitterX)),
            y: Math.max(20, Math.min(80, baseQ.y + jitterY)),
            sector: baseQ.sector
        };
    });

    if (!currentRadarBlips.some(b => b.dung.id === selectedRadarDungId)) {
        selectedRadarDungId = currentRadarBlips[0] ? currentRadarBlips[0].dung.id : null;
    }
}

const POMODORO_CYCLE_BLOCKS = [
    { mode: 'study', mins: 40, label: 'ASALTO 1: ESTUDIO PROFUNDO (40M)' },
    { mode: 'break', mins: 10, label: 'RECESO TÁCTICO (10M)' },
    { mode: 'study', mins: 30, label: 'ASALTO 2: INMERSIÓN (30M)' },
    { mode: 'break', mins: 5,  label: 'RECESO RÁPIDO (5M)' }
];

let _pomoKeepAliveOsc = null;

function togglePomodoroKeepAliveAudio(enable) {
    try {
        if (!enable) {
            if (_pomoKeepAliveOsc) {
                _pomoKeepAliveOsc.stop();
                _pomoKeepAliveOsc.disconnect();
                _pomoKeepAliveOsc = null;
            }
            return;
        }
        if (_pomoKeepAliveOsc || typeof audioCtx === 'undefined' || !audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(30, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.0001, audioCtx.currentTime); // Inaudible, mantiene vivo el hilo en Android
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        _pomoKeepAliveOsc = osc;
    } catch (e) {}
}

function sendNativeSystemNotification(title, body, tag = 'sl-pomodoro') {
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
    }
    if (navigator.vibrate) navigator.vibrate([200, 100, 250]);
    if (typeof playSystemSound === "function") playSystemSound('monarch_awakening');

    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
            if (reg.active) {
                reg.active.postMessage({ type: 'SL_POMODORO_NOTIFY', title: title, body: body, tag: tag });
            } else {
                reg.showNotification(title, { body: body, icon: '/icon-192.png', vibrate: [200, 100, 250] });
            }
        }).catch(() => {});
    } else if ("Notification" in window && Notification.permission === "granted") {
        try { new Notification(title, { body: body, icon: '/icon-192.png' }); } catch (e) {}
    }
}

function startPersonalBoss(idx, asQuickTask = false) {
    if (!p.bosses || !p.bosses[idx]) return;
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
    }
    let b = p.bosses[idx];
    if (b.gold && b.gold >= 1000) b.gold = Math.round(b.gold / 100);

    if (asQuickTask) {
        b.isQuickTask = true;
        b.start = Date.now();
        saveData();
        renderBosses();
        actBoss(idx);
        return;
    }

    b.isQuickTask = false;
    b.pomoStep = 0;
    b.blocksCompleted = b.blocksCompleted || 0;
    let firstBlock = POMODORO_CYCLE_BLOCKS[0];
    b.start = Date.now();
    b.phaseDurationSecs = firstBlock.mins * 60;
    b.phaseEndsAt = Date.now() + (firstBlock.mins * 60000);
    b.pausedRemainingSecs = null;
    b.warned30s = false;

        togglePomodoroKeepAliveAudio(true);
    if (typeof window.scheduleCloudPush === 'function') {
        window.scheduleCloudPush('pomo_' + b.id, 'BLOQUE POMODORO COMPLETADO', `Inicia tu receso táctico en [${b.title}].`, firstBlock.mins * 60, 'pomo-end-' + b.id);
    }
    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.ready.then(reg => {
            if (reg.active) {
                reg.active.postMessage({
                    type: 'SL_SCHEDULE_REMINDERS',
                    missionId: 'pomo_' + b.id,
                    alerts: [
                        { delayMs: firstBlock.mins * 60000, title: 'BLOQUE POMODORO COMPLETADO', body: `Inicia tu receso táctico en [${b.title}].`, tag: 'pomo-end-' + b.id }
                    ]
                });
            }
        }).catch(() => {});
    }
    saveData();
    renderBosses();
    systemNotify(`Asedio Pomodoro iniciado [${b.title}]: 40 minutos de estudio. Notificación programada al iniciar tu receso.`, "info");
}

window.togglePausePersonalBoss = function(idx) {
    if (!p.bosses || !p.bosses[idx]) return;
    let b = p.bosses[idx];
    if (!b.start || b.isQuickTask) return;

    if (b.pausedRemainingSecs) {
        b.phaseEndsAt = Date.now() + (b.pausedRemainingSecs * 1000);
        b.pausedRemainingSecs = null;
        togglePomodoroKeepAliveAudio(true);
        systemNotify(`▶️ Pomodoro reanudado: [${b.title}].`, "info");
    } else {
        b.pausedRemainingSecs = Math.max(1, Math.floor((b.phaseEndsAt - Date.now()) / 1000));
        systemNotify(`⏸️ Pomodoro en pausa: [${b.title}].`, "info");
    }
    saveData();
    renderBosses();
};

function evaluatePomodoroBackgroundTick() {
    if (typeof p === 'undefined' || !p || !Array.isArray(p.bosses)) return;
    let now = Date.now();
    let changed = false;
    let anyActiveRunning = false;

    p.bosses.forEach((b, idx) => {
        if (b.gold && b.gold >= 1000) b.gold = Math.round(b.gold / 100);
        if (!b.start || b.isQuickTask || !b.phaseEndsAt || b.pausedRemainingSecs) return;
        anyActiveRunning = true;

        let stepIdx = (b.pomoStep || 0) % POMODORO_CYCLE_BLOCKS.length;
        let curBlock = POMODORO_CYCLE_BLOCKS[stepIdx];
        let secsLeft = Math.floor((b.phaseEndsAt - now) / 1000);

        if (curBlock.mode === 'break' && secsLeft <= 30 && secsLeft > 0 && !b.warned30s) {
            b.warned30s = true;
            changed = true;
            sendNativeSystemNotification(
                "⚡ ALERTA DE REINGRESO (30s)",
                `Te quedan 30 segundos de receso en [${b.title}]. Regresa al Sistema y pon No Molestar para seguir estudiando.`,
                `pomo-30s-${b.id}`
            );
            systemNotify(`⚡ Te quedan 30 segundos de receso en [${b.title}]. Prepárate para el siguiente asalto.`, "gold");
        }

        if (secsLeft <= 0) {
            if (curBlock.mode === 'study') {
                b.blocksCompleted = (b.blocksCompleted || 0) + 1;
                if (p.timeStats) p.timeStats.study = (p.timeStats.study || 0) + curBlock.mins;
            }
            b.pomoStep = ((b.pomoStep || 0) + 1) % POMODORO_CYCLE_BLOCKS.length;
            let nextBlock = POMODORO_CYCLE_BLOCKS[b.pomoStep];
            b.phaseDurationSecs = nextBlock.mins * 60;
            b.phaseEndsAt = now + (nextBlock.mins * 60000);
            b.warned30s = false;
            changed = true;

            if (nextBlock.mode === 'break') {
                sendNativeSystemNotification(
                    "🛡️ ¡BLOQUE DE ESTUDIO COMPLETADO!",
                    `Empiezan tus ${nextBlock.mins} minutos de receso en [${b.title}]. Suelta los apuntes, hidrátate y descansa la vista.`,
                    `pomo-break-${b.id}`
                );
                systemNotify(`🛡️ ¡Asalto completado! Empiezan tus ${nextBlock.mins} minutos de receso (+1 Bloque acumulado).`, "success");
            } else {
                sendNativeSystemNotification(
                    "⚔️ ¡FIN DEL RECESO // NUEVO ASALTO!",
                    `Comienza el bloque de ${nextBlock.mins} minutos de estudio para [${b.title}]. Activa No Molestar y continúa.`,
                    `pomo-study-${b.id}`
                );
                systemNotify(`⚔️ Receso terminado. Iniciando bloque de ${nextBlock.mins} minutos de estudio.`, "info");
            }
        }
    });

    if (!anyActiveRunning && _pomoKeepAliveOsc) {
        togglePomodoroKeepAliveAudio(false);
    }

    if (changed) {
        saveData();
        renderBosses();
    } else {
        p.bosses.forEach((b, i) => {
            if (!b.start || b.isQuickTask || !b.phaseEndsAt) return;
            let timerEl = document.getElementById(`pomo-live-timer-${i}`);
            let barEl = document.getElementById(`pomo-live-bar-${i}`);
            let rem = b.pausedRemainingSecs ? b.pausedRemainingSecs : Math.max(0, Math.floor((b.phaseEndsAt - now) / 1000));
            let stIdx = (b.pomoStep || 0) % POMODORO_CYCLE_BLOCKS.length;
            let blk = POMODORO_CYCLE_BLOCKS[stIdx];
            let totalSecs = b.phaseDurationSecs || (blk.mins * 60);
            let pct = Math.min(100, Math.max(0, ((totalSecs - rem) / totalSecs) * 100));

            if (timerEl) {
                let mm = String(Math.floor(rem / 60)).padStart(2, '0');
                let ss = String(rem % 60).padStart(2, '0');
                timerEl.innerText = `[${b.pausedRemainingSecs ? '⏸️ PAUSADO' : (blk.mode === 'break' ? '☕ RECESO' : '🔥 ' + blk.label)}: ${mm}:${ss} • Bloques: ${b.blocksCompleted || 0}]`;
            }
            if (barEl) {
                barEl.style.width = `${pct}%`;
            }
        });
    }
}

if (window.pomodoroWatcherInterval) clearInterval(window.pomodoroWatcherInterval);
window.pomodoroWatcherInterval = setInterval(evaluatePomodoroBackgroundTick, 1000);

function actBoss(idx) {
    if (!p.bosses || !p.bosses[idx]) return;
    let b = p.bosses[idx];
    if (b.gold && b.gold >= 1000) b.gold = Math.round(b.gold / 100);

    let blocks = b.blocksCompleted || 0;
    if (!b.isQuickTask && blocks === 0) {
        let elapsedSecs = b.start ? Math.floor((Date.now() - b.start) / 1000) : 0;
        if (elapsedSecs < 600) {
            systemNotify("⏳ Debes completar al menos tu primer bloque de estudio (o 10 min mínimos) antes de reclamar un Jefe Pomodoro.", "danger");
            return;
        }
    }

    togglePomodoroKeepAliveAudio(false);
    let bonusMult = 1 + (blocks * 0.35);
    let finalXp = Math.floor((b.xp || 80) * bonusMult);
    let finalGold = Math.floor((b.gold || 40) * bonusMult);

    openSealModal({
        type: 'boss',
        idx: idx,
        xp: finalXp,
        gold: finalGold
    });
}

function buildSonarTerminalHTML() {
    let nowMs = Date.now();
    let activeBlipObj = currentRadarBlips.find(b => b.dung.id === selectedRadarDungId) || null;
    if (!activeBlipObj) {
        return `
        <div class="sl-sonar-dossier" style="text-align:center; padding:18px;">
            <div style="font-family:'Share Tech Mono', monospace; color:#94a3b8; font-size:0.82em; line-height:1.5;">
                [ SIN SEÑALES DE RANGO ${currentDungFilter} EN TU NIVEL ACTUAL ]<br>
                Cambia la frecuencia arriba o presiona REESCANEAR.
            </div>
        </div>`;
    }

    let dung = activeBlipObj.dung;
    let isClearedPerm = Array.isArray(p.clearedDungeons) && p.clearedDungeons.includes(dung.id);
    let isBeaconTemp = !!(p.beaconUnlockedGates && p.beaconUnlockedGates[dung.id] && p.beaconUnlockedGates[dung.id].expiresAt > nowMs);
    let isLevelLocked = (p.level < dung.minLevel) && !isClearedPerm && !isBeaconTemp;
    let rankKeyStr = dung.reqKey || ('rank' + dung.rank);
    let keysOwned = p.dungeonKeys ? (p.dungeonKeys[rankKeyStr] || 0) : 0;
    let hasKey = dung.reqKey === null || keysOwned > 0 || !!(p._arcFreeGateUntil && nowMs < p._arcFreeGateUntil);
    let totalMins = dung.phases.reduce((acc, ph) => acc + ph.durationMins, 0);

    let accessText = dung.reqKey
        ? `Llave Rango ${dung.rank} (${keysOwned} en bolsa)`
        : `Grieta Inestable (Acceso Libre)`;

    let statusNotes = '';
    if (dung.isRedGate) {
        statusNotes += `<div style="margin-top:6px; padding:5px 8px; background:rgba(255,42,85,0.16); border-left:2.5px solid #ff2a55; color:#fda4af; font-size:0.78em; font-weight:600;">PORTAL ROJO: Retirada sellada al entrar. Recompensas potenciadas.</div>`;
    }
    if (isClearedPerm) {
        statusNotes += `<div style="margin-top:5px; color:#7dd3fc; font-size:0.74em; font-family:'Share Tech Mono', monospace;">[PORTAL CONQUISTADO • APTO PARA EXPEDICIONES]</div>`;
    } else if (isBeaconTemp) {
        let minsRem = Math.max(1, Math.ceil((p.beaconUnlockedGates[dung.id].expiresAt - nowMs) / 60000));
        statusNotes += `<div style="margin-top:5px; color:#c084fc; font-size:0.74em; font-family:'Share Tech Mono', monospace;">[BALIZA CARMESÍ ACTIVA • EXPIRA EN ${minsRem}M]</div>`;
    }

    let phasesHtml = `<div class="sl-sonar-phases-track">` +
        dung.phases.map((ph, idx) => `<span class="sl-sonar-phase-chip">F${idx + 1}: ${ph.name} (${ph.durationMins}m)</span>`).join('') +
        `</div>`;

    let btnHtml = '';
    if (isLevelLocked) {
        btnHtml = `<button class="btn btn-red" style="width:100%; opacity:0.5; cursor:not-allowed;">NIVEL INSUFICIENTE (REQ. NIV. ${dung.minLevel})</button>`;
    } else if (!hasKey) {
        btnHtml = `<button class="btn btn-blue" style="width:100%;" onclick="switchTab('shop', 3); filterShop('Pergaminos'); systemNotify('Necesitas una Llave de Rango ${dung.rank}. Adquiérela aquí en Runas.', 'info');">COMPRAR LLAVE RANGO ${dung.rank} EN TIENDA</button>`;
    } else {
        btnHtml = `<button class="btn btn-main" style="width:100%; padding:13px; font-size:0.95em;" onclick="startDungeon('${dung.id}')">ENTRAR AL PORTAL (${totalMins} MIN)</button>`;
    }

    return `
    <div class="sl-sonar-dossier ${dung.isRedGate ? 'red-dossier' : ''}">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(125,211,252,0.22); padding-bottom:6px; margin-bottom:8px;">
            <span style="font-family:'Share Tech Mono', monospace; font-size:0.72em; color:#7dd3fc;">${activeBlipObj.sector}</span>
            <span class="card-tag ${dung.rank}">RANGO ${dung.rank}</span>
        </div>
        <div style="font-size:1.12em; font-weight:700; color:#ffffff; margin-bottom:4px; text-shadow:0 0 8px rgba(0,229,255,0.45);">${dung.title}</div>
        <div style="font-size:0.78em; color:#cbd5e1;">${accessText} • Duración: <b>${totalMins} min</b></div>
        ${phasesHtml}
        ${statusNotes}
        <div class="sl-sonar-rewards-grid" style="margin-top:10px;">
            <div class="sl-sonar-rew-box"><span class="sl-sonar-rew-lbl">EXPERIENCIA</span><span class="sl-sonar-rew-val">+${dung.rewards.xp} XP</span></div>
            <div class="sl-sonar-rew-box"><span class="sl-sonar-rew-lbl">BOTÍN ORO</span><span class="sl-sonar-rew-val">+${dung.rewards.gold} G</span></div>
            <div class="sl-sonar-rew-box"><span class="sl-sonar-rew-lbl">EXTRACCIÓN</span><span class="sl-sonar-rew-val">${['B','A','S','SSS'].includes(dung.rank) ? 'POSIBLE' : 'ESTÁNDAR'}</span></div>
        </div>
        ${btnHtml}
    </div>`;
}

function updateSonarTerminalOnly() {
    let slot = document.getElementById('sonar-terminal-slot');
    if (slot) slot.innerHTML = buildSonarTerminalHTML();
}

function renderBosses(hideBlipsForScan = false) {
    if (p && p.penaltyActive) {
        if (typeof switchTab === "function") switchTab('routine', 0);
        return;
    }

    const personalCont = document.getElementById('boss-container');
    const threatsBar = document.getElementById('sl-threats-bar');
    const threatsCount = document.getElementById('sl-threats-count');
    let bossCount = (p.bosses && Array.isArray(p.bosses)) ? p.bosses.length : 0;

    if (threatsCount) threatsCount.textContent = bossCount;
    if (threatsBar) {
        threatsBar.classList.toggle('has-active-threats', bossCount > 0);
        if (bossCount > 0 && !_threatsDrawerOpen) _threatsDrawerOpen = true;
        if (bossCount === 0) _threatsDrawerOpen = false;
        threatsBar.classList.toggle('is-open', _threatsDrawerOpen);
    }

    if (personalCont) {
        personalCont.classList.toggle('collapsed', !_threatsDrawerOpen);
        personalCont.innerHTML = '';
        if (bossCount === 0) {
            personalCont.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:8px; font-size:0.8em;">Sin objetivos personales activos. Usa "+ ESCANEAR" para crear un Pomodoro 40/10 ➔ 30/5.</p>`;
        } else {
            let now = Date.now();
            p.bosses.forEach((b, i) => {
                if (b.gold && b.gold >= 1000) b.gold = Math.round(b.gold / 100);
                let isStarted = !!b.start;
                let timerHtml = '';
                let blocks = b.blocksCompleted || 0;
                let bonusMult = +(1 + (blocks * 0.35)).toFixed(2);

                if (isStarted && b.phaseEndsAt) {
                    let rem = b.pausedRemainingSecs ? b.pausedRemainingSecs : Math.max(0, Math.floor((b.phaseEndsAt - now) / 1000));
                    let mm = String(Math.floor(rem / 60)).padStart(2, '0');
                    let ss = String(rem % 60).padStart(2, '0');
                    let stIdx = (b.pomoStep || 0) % POMODORO_CYCLE_BLOCKS.length;
                    let blk = POMODORO_CYCLE_BLOCKS[stIdx];
                    let totalSecs = b.phaseDurationSecs || (blk.mins * 60);
                    let pct = Math.min(100, Math.max(0, ((totalSecs - rem) / totalSecs) * 100));
                    let col = blk.mode === 'break' ? '#7dd3fc' : '#00e5ff';

                    timerHtml = `
                        <div id="pomo-live-timer-${i}" style="color:${col}; font-family:'Share Tech Mono', monospace; font-size:0.8em; margin-top:4px;">
                            [${b.pausedRemainingSecs ? 'PAUSADO' : (blk.mode === 'break' ? 'RECESO' : blk.label)}: ${mm}:${ss} • Bloques: ${blocks}]
                        </div>
                        <div class="bar-wrap" style="height:5px; margin-top:5px; border-color:${col};">
                            <div class="bar-fill" id="pomo-live-bar-${i}" style="width:${pct}%; background:${col};"></div>
                        </div>`;
                }

                let btnAction = isStarted
                    ? `<div style="display:flex; gap:6px; width:100%;">
                        <button class="btn btn-blue" style="flex:0.8; padding:7px !important;" onclick="togglePausePersonalBoss(${i})">${b.pausedRemainingSecs ? 'REANUDAR' : 'PAUSAR'}</button>
                        <button class="btn btn-green" style="flex:1.4; padding:7px !important;" onclick="actBoss(${i})">COBRAR (x${bonusMult})</button>
                       </div>`
                    : `<div style="display:flex; gap:6px; width:100%;">
                        <button class="btn btn-main" style="flex:1.4; padding:7px !important;" onclick="startPersonalBoss(${i}, false)">POMODORO (40/10)</button>
                        <button class="btn btn-blue" style="flex:0.8; padding:7px !important;" onclick="startPersonalBoss(${i}, true)">RÁPIDA</button>
                       </div>`;

                let netG = Math.floor((b.gold || 40) * (typeof GOLD_NERF !== 'undefined' ? GOLD_NERF : 0.20) * bonusMult);
                personalCont.innerHTML += `
                <div class="card rank-${b.rank}" style="flex-direction:column; align-items:stretch; padding:10px 12px !important; margin-bottom:8px;">
                    <div style="margin-bottom:8px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                            <span style="font-weight:700; color:#fff; font-size:0.96em;">${b.title}</span>
                            <span class="card-tag ${b.rank}">RANGO ${b.rank}</span>
                        </div>
                        ${timerHtml}
                        <div class="card-rewards" style="margin-top:6px;">
                            <span class="r-xp">+${Math.floor((b.xp || 80) * bonusMult)} XP</span>
                            <span class="r-gold">+${netG} G</span>
                        </div>
                    </div>
                    ${btnAction}
                </div>`;
            });
        }
    }

    const container = document.getElementById('dungeon-list-container');
    if (!container) return;

    syncBeaconRescanButton();
    generateRadarBlips(false);

    if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0 };
    const keyRanks = [
        { k: 'rankE', l: 'E' }, { k: 'rankD', l: 'D' }, { k: 'rankC', l: 'C' },
        { k: 'rankB', l: 'B' }, { k: 'rankA', l: 'A' }, { k: 'rankS', l: 'S' }
    ];
    let keyStripInner = `<span>LLAVERO:</span>` +
        keyRanks.map(kr => {
            let cnt = p.dungeonKeys[kr.k] || 0;
            return `<span class="sl-key-pill ${cnt > 0 ? 'has-key' : ''}">${kr.l}:${cnt}</span>`;
        }).join('');

    let nowMs = Date.now();
    let scanMinsLeft = (p.savedRadarBlipsUntil && p.savedRadarBlipsUntil > nowMs)
        ? Math.max(1, Math.ceil((p.savedRadarBlipsUntil - nowMs) / 60000))
        : 30;

    let blipsHtml = '';
    currentRadarBlips.forEach(b => {
        let d = b.dung;
        let isSelected = (d.id === selectedRadarDungId);
        let isCleared = Array.isArray(p.clearedDungeons) && p.clearedDungeons.includes(d.id);
        let isBeacon = !!(p.beaconUnlockedGates && p.beaconUnlockedGates[d.id] && p.beaconUnlockedGates[d.id].expiresAt > nowMs);
        let isLvlLocked = (p.level < d.minLevel) && !isCleared && !isBeacon;
        let rk = d.reqKey || ('rank' + d.rank);
        let hasKey = d.reqKey === null || (p.dungeonKeys[rk] || 0) > 0 || !!(p._arcFreeGateUntil && nowMs < p._arcFreeGateUntil);

        let extraCls = [];
        let badgeTxt = '';
        if (d.isRedGate) { extraCls.push('red-gate-blip'); badgeTxt = 'ROJO'; }
        else if (d.reqKey === null) { extraCls.push('free-blip'); badgeTxt = 'LIBRE'; }

          let showClearedPip = false;
        if (isLvlLocked || !hasKey) {
            extraCls.push('locked-blip');
            if (!badgeTxt) badgeTxt = isLvlLocked ? `NV.${d.minLevel}` : 'LLAVE';
        } else if (isCleared) {
            extraCls.push('cleared-blip');
            if (!badgeTxt) showClearedPip = true;
        }
        if (hideBlipsForScan) extraCls.push('blip-hidden');

        blipsHtml += `
        <div class="sonar-blip ${extraCls.join(' ')} ${isSelected ? 'selected-blip' : ''}"
             data-dung-id="${d.id}"
             style="left:${b.x}%; top:${b.y}%;"
             onclick="selectRadarBlip('${d.id}')">
            <span>${d.rank}</span>
            ${badgeTxt ? `<span class="sonar-blip-badge">${badgeTxt}</span>` : (showClearedPip ? `<span class="sonar-blip-cleared-pip"></span>` : '')}
        </div>`;
    });

    // Crear el contenedor del Sonar una sola vez para no reiniciar nunca el giro del haz
    let existingScreen = container.querySelector('.sonar-screen');
    if (!existingScreen) {
        container.innerHTML = `
        <div class="sl-sonar-frame-outer">
            <div class="sl-mech-rail top"></div>
            <div class="sl-sonar-window">
                <div class="sl-sonar-key-strip" id="sonar-key-strip-slot">${keyStripInner}</div>
                <div class="sonar-radar-wrap">
                    <div class="sonar-meta-row">
                        <span id="sonar-signals-count">SEÑALES: ${currentRadarBlips.length}/4</span>
                        <span id="sonar-cycle-left">CICLO: ${scanMinsLeft}M</span>
                    </div>
                    <div class="sonar-screen">
                        <div class="sonar-crosshair-h"></div>
                        <div class="sonar-crosshair-v"></div>
                        <div class="sonar-sweep-beam"></div>
                        <div class="sonar-scan-overlay" id="sonar-scan-overlay"></div>
                        <div class="sonar-ping-wave" id="sonar-ping-wave"></div>
                        <div class="sonar-center-dot"></div>
                        <div id="sonar-blips-layer">${blipsHtml}</div>
                    </div>
                </div>
                <div id="sonar-terminal-slot">${hideBlipsForScan ? '' : buildSonarTerminalHTML()}</div>
            </div>
            <div class="sl-mech-rail bottom"></div>
        </div>`;
    } else {
        let keySlot = document.getElementById('sonar-key-strip-slot');
        let sigSlot = document.getElementById('sonar-signals-count');
        let cycSlot = document.getElementById('sonar-cycle-left');
        let blipsLayer = document.getElementById('sonar-blips-layer');

        if (keySlot) keySlot.innerHTML = keyStripInner;
        if (sigSlot && !hideBlipsForScan) sigSlot.textContent = `SEÑALES: ${currentRadarBlips.length}/4`;
        if (cycSlot) cycSlot.textContent = `CICLO: ${scanMinsLeft}M`;

        let blipSig = (hideBlipsForScan ? 'H|' : 'S|') + currentRadarBlips.map(b => `${b.dung.id}:${b.dung.isRedGate ? 1 : 0}:${b.dung.id === selectedRadarDungId ? 1 : 0}`).join(',');
        if (blipsLayer && blipsLayer.dataset.blipSig !== blipSig) {
            blipsLayer.dataset.blipSig = blipSig;
            blipsLayer.innerHTML = blipsHtml;
        }
        if (!hideBlipsForScan) updateSonarTerminalOnly();
    }
}

/* ==========================================================================
   5. GESTOR DE HORARIOS UNIVERSITARIOS (ACADEMIAS)
   ========================================================================== */
   
function _normSubjectKey(str) {
    return (str || "")
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function _isSameSubject(nameA, nameB) {
    let a = _normSubjectKey(nameA);
    let b = _normSubjectKey(nameB);
    if (a === b) return true;

    // Si tienen números distintos (ej: "publicidad 1" vs "publicidad 2" o "ii"), NO son la misma
    let numsA = (a.match(/\b(\d+|i|ii|iii|iv|v)\b/g) || []).join(',');
    let numsB = (b.match(/\b(\d+|i|ii|iii|iv|v)\b/g) || []).join(',');
    if (numsA !== numsB) return false;

    // Permitir 1 letra de error o espacio escapado en nombres de al menos 5 letras
    if (Math.abs(a.length - b.length) > 1 || Math.min(a.length, b.length) < 5) return false;
    let i = 0, j = 0, diffs = 0;
    while (i < a.length && j < b.length) {
        if (a[i] !== b[j]) {
            diffs++;
            if (diffs > 1) return false;
            if (a.length > b.length) i++;
            else if (b.length > a.length) j++;
            else { i++; j++; }
        } else {
            i++; j++;
        }
    }
    return (diffs + (a.length - i) + (b.length - j)) <= 1;
}

function consolidateExistingSchedules() {
    if (!p || !Array.isArray(p.schedules)) return;
    let merged = [];
    p.schedules.forEach(s => {
        let sDays = Array.isArray(s.days) ? s.days.map(Number) : [parseInt(s.day)];
        let found = merged.find(m => m.type === s.type && m.shift === s.shift && _isSameSubject(m.name, s.name));
        if (found) {
            sDays.forEach(d => { if (!found.days.includes(d)) found.days.push(d); });
            found.days.sort((a, b) => a - b);
        } else {
            merged.push({
                name: s.name.trim(),
                type: s.type,
                shift: s.shift,
                days: [...new Set(sDays)].sort((a, b) => a - b)
            });
        }
    });
    p.schedules = merged;
}

function addScheduleItem() {
    let nameEl = document.getElementById('sched-name');
    let typeEl = document.getElementById('sched-type');
    let dayEl = document.getElementById('sched-day');
    let shiftEl = document.getElementById('sched-shift');

    if (!nameEl || !nameEl.value.trim()) {
        systemNotify("Escribe el nombre de la materia.", "danger");
        return;
    }

    if (!p.schedules) p.schedules = [];
    consolidateExistingSchedules();

    let cleanName = nameEl.value.trim();
    let dayNum = parseInt(dayEl.value);
    let existing = p.schedules.find(s => s.type === typeEl.value && s.shift === shiftEl.value && _isSameSubject(s.name, cleanName));

    if (existing) {
        if (!existing.days.includes(dayNum)) {
            existing.days.push(dayNum);
            existing.days.sort((a, b) => a - b);
            systemNotify(`✅ Día agregado a la materia existente: [${existing.name}].`, "success");
        } else {
            systemNotify(`ℹ️ [${existing.name}] ya tiene vinculado ese día y turno.`, "info");
        }
    } else {
        p.schedules.push({
            name: cleanName,
            type: typeEl.value,
            shift: shiftEl.value,
            days: [dayNum]
        });
        systemNotify("✅ Horario vinculado al Sistema.", "success");
    }

    nameEl.value = '';
    saveData();
    renderSchedules();
    renderRoutine();
}

function removeScheduleItem(idx) {
    if (!p.schedules) return;
    p.schedules.splice(idx, 1);
    saveData();
    renderSchedules();
    renderRoutine();
}

function renderSchedules() {
    const listEl = document.getElementById('sched-list');
    if (!listEl) return;

    consolidateExistingSchedules();

    if (!p.schedules || p.schedules.length === 0) {
        listEl.innerHTML = `<p style="color:var(--text-muted); font-size:0.85em;">No hay materias vinculadas.</p>`;
        return;
    }

    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    let html = '';
    p.schedules.forEach((s, idx) => {
        let daysArr = Array.isArray(s.days) ? s.days : [parseInt(s.day)];
        let daysLabel = daysArr.map(d => dayNames[d]).join(', ');
        html += `
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.4); padding:8px 12px; border-radius:2px; margin-bottom:6px; border:1px solid #1e293b;">
            <span style="font-size:0.85em; color:#fff;"><strong>[${daysLabel} - ${s.shift}]</strong> ${s.name}</span>
            <button class="btn btn-red" style="padding:4px 8px; font-size:0.7em;" onclick="removeScheduleItem(${idx})">✕</button>
        </div>`;
    });
    listEl.innerHTML = html;
}
/* ==========================================================================
   9. SINCRONIZADOR DEL PIE DE MISIÓN DIARIA Y DESANGRADO NOCTURNO (9:15 PM)
   ========================================================================== */
window.openDailyQuestClearRewardModal = function() {
    if (!p) return;
    let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    if (p.dailyClearRewardClaimedDay === currentDayStr) {
        return systemNotify("[Misión Diaria]: Ya reclamaste la recompensa de finalización de hoy.", "info");
    }

    let cornerSVG = (typeof getBaroqueCornerSVG === "function") ? getBaroqueCornerSVG() : '';
    let ov = document.createElement('div');
    ov.id = 'sl-daily-clear-reward-modal';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,18,0.94); z-index:14200; display:flex; justify-content:center; align-items:center; padding:18px;';
    ov.innerHTML = `
        <div class="sl-holo-frame" style="width:100%; max-width:410px; cursor:default;">
            <div class="sl-holo-rail top"><span class="rail-core"></span></div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="padding:20px 16px; text-align:center;">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div class="sl-holo-header-row" style="margin-bottom:8px;">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect">RECOMPENSA DE MISIÓN</div>
                    </div>
                    <div class="sl-holo-subbracket">[ MISIÓN DIARIA COMPLETADA AL 100% ]</div>
                    <div style="color:#e0f2fe; font-size:0.88em; margin:12px 0;">
                        Has cumplido todos los objetivos de hoy. Selecciona una de las siguientes recompensas del Sistema:
                    </div>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        <button class="btn" style="width:100%; padding:11px;" onclick="claimDailyClearChoice(1)">
                            [ 1. RECUPERACIÓN DE ESTADO (100% HP / 0 FATIGA) ]
                        </button>
                        <button class="btn" style="width:100%; padding:11px;" onclick="claimDailyClearChoice(2)">
                            [ 2. PUNTOS DE ESTADO (+0.05 FUE / INT / AGI) ]
                        </button>
                        <button class="btn" style="width:100%; padding:11px;" onclick="claimDailyClearChoice(3)">
                            [ 3. CAJA ALEATORIA BENDITA (+1 SUMINISTRO) ]
                        </button>
                    </div>
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
        </div>
    `;
    document.body.appendChild(ov);
    if (typeof playSystemSound === 'function') playSystemSound('gold');
};

window.claimDailyClearChoice = function(choiceNum) {
    let modal = document.getElementById('sl-daily-clear-reward-modal');
    if (modal) modal.remove();
    if (!p) return;

    let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    p.dailyClearRewardClaimedDay = currentDayStr;
    let maxH = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
    let maxM = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;

    if (choiceNum === 1) {
        p.hp = maxH;
        p.sp = 100;
        p.mp = Math.min(maxM, (p.mp || 0) + 250);
        systemNotify("[Recompensa de Misión Diaria]: Estado restaurado al 100% (HP lleno, 0 Fatiga y +250 MP).", "gold");
    } else if (choiceNum === 2) {
        if (p.stats) {
            p.stats.str = +(p.stats.str + 0.05).toFixed(2);
            p.stats.int = +(p.stats.int + 0.05).toFixed(2);
            p.stats.agi = +(p.stats.agi + 0.05).toFixed(2);
        }
        systemNotify("[Recompensa de Misión Diaria]: Puntos de Estado asimilados (+0.05 STR, +0.05 INT, +0.05 AGI).", "gold");
    } else {
        let boxObj = (typeof shopDB !== 'undefined') ? shopDB.find(x => x.id === 'p_box_s' || x.id === 'p_box_b') : null;
        if (boxObj) p.inventory.push({...boxObj, type: 'box'});
        p.crystals = (p.crystals || 0) + 1;
        systemNotify("[Recompensa de Misión Diaria]: Caja Aleatoria Bendita y +1 Cristal de Maná enviados a tu Bolsa.", "gold");
    }

    saveData();
    if (typeof updateHUD === 'function') updateHUD();
    renderRoutine();
    syncDailyGoalFooterStatus();
};

function syncDailyGoalFooterStatus() {
    if (document.hidden) return;
    const footerEl = document.querySelector('.sl-goal-warning-footer');
    if (!footerEl || typeof p === 'undefined' || !p) return;

    let todayMissions = (typeof getTodayMissions === 'function') ? getTodayMissions() : [];
    let completedArr = Array.isArray(p.completedToday) ? p.completedToday : [];
    let totalCount = todayMissions.length;
    let doneCount = todayMissions.filter(m => completedArr.includes(m.id)).length;
    let allCompleted = (totalCount > 0 && doneCount >= totalCount && !!p.studyCompletedToday);

    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr(now) : now.toDateString();
    let isSleeping = (typeof isSleepingNow === "function") ? isSleepingNow(now) : (p.sleepingUntilMorning === currentDayStr);
    let isVigil = (typeof isNightVigilActiveNow === "function") ? isNightVigilActiveNow(now) : (p.nightPassActive === currentDayStr);

    let continuousMins = (h < 5 ? h + 24 : h) * 60 + m;
    let deadlineMins = 21 * 60 + 20; // 9:20 PM: Inicio oficial de X rojas y desangrado
    if (p.tankCurfewDelayDay === currentDayStr) deadlineMins += 45;
    if (p.nightPassActive === currentDayStr || p.movieNightCurfewDay === currentDayStr) deadlineMins = 23 * 60 + 20;
    if (typeof isMercyActive === "function" && isMercyActive()) deadlineMins = 26 * 60;

    let curMinFooter = h * 60 + m;
    let isPastDeadline = (continuousMins >= deadlineMins && !isSleeping && !isVigil && (curMinFooter >= 1280 || curMinFooter < 270));
    let isBleedTriggered = (!allCompleted && isPastDeadline) || (continuousMins >= 22 * 60 && !isSleeping && !isVigil);
    let rewardPending = (allCompleted && p.dailyClearRewardClaimedDay !== currentDayStr);

    let warningTextHtml = '';
    let frameStateClass = '';
    let checkSvgHtml = '';
    let clickAttr = '';
    let pulseStyle = '';

    if (allCompleted) {
        footerEl.classList.remove('bleed-active');
        warningTextHtml = rewardPending
            ? `[Misión diaria completada: Toca el sello inferior para reclamar tu recompensa.]`
            : `[Misión diaria: Todos los objetivos de hoy han sido completados.]`;
        frameStateClass = 'all-done';
        checkSvgHtml = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px #00e5ff);"><polyline points="20 6 9 17 4 12"/></svg>`;
        if (rewardPending) {
            clickAttr = `onclick="openDailyQuestClearRewardModal()"`;
            pulseStyle = `cursor:pointer; box-shadow:0 0 14px #00e5ff !important;`;
        }
    } else if (isBleedTriggered) {
        footerEl.classList.add('bleed-active');
        warningTextHtml = `Misión diaria: <b>Ha llegado el desangrado nocturno.</b>`;
        frameStateClass = 'bleed-red';
        checkSvgHtml = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ff2a55" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px #ff2a55);"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    } else {
        footerEl.classList.remove('bleed-active');
        warningTextHtml = `ADVERTENCIA: No completar la misión diaria<br>resultará en una <span style="color:#ff2a55; text-shadow:0 0 8px rgba(255,42,85,0.85);">penalización</span> apropiada.`;
        frameStateClass = '';
        checkSvgHtml = '';
    }

    const nextHTML = `
        <div>${warningTextHtml}</div>
        <div class="sl-goal-footer-box-center">
            <div class="sl-anime-outer-check-frame ${frameStateClass}" ${clickAttr}>
                <div class="sl-goal-check-box" style="${pulseStyle}">${checkSvgHtml}</div>
            </div>
        </div>
    `;

    if (footerEl.getAttribute('data-sync-state') !== `${allCompleted}_${isBleedTriggered}_${rewardPending}`) {
        footerEl.setAttribute('data-sync-state', `${allCompleted}_${isBleedTriggered}_${rewardPending}`);
        footerEl.innerHTML = nextHTML;
    }
}

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const sc = params.get('shortcut');
    if (sc && typeof deployRoutineMission === 'function') {
        setTimeout(() => {
            if (p && (!p.activeMissions || !p.activeMissions[sc])) {
                deployRoutineMission(sc);
            }
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 500);
    }
});

// Ejecutar al cargar, al actualizar misiones y vigilar el reloj cada 5 segundos
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(syncDailyGoalFooterStatus, 20);
    setInterval(syncDailyGoalFooterStatus, 5000);
});

// Enlazar automáticamente con renderRoutine si existe en app.js
window.addEventListener('load', () => {
    if (typeof window.renderRoutine === 'function' && !window._routineFooterHooked) {
        const _origRenderRoutine = window.renderRoutine;
        window.renderRoutine = function() {
            const res = _origRenderRoutine.apply(this, arguments);
            syncDailyGoalFooterStatus();
            return res;
        };
        window._routineFooterHooked = true;
    }
    syncDailyGoalFooterStatus();
});

/* ==========================================================================
   10. CHECKPOINTS TÁCTICOS PUSH, RECEPTOR DE BOTONES Y SENSOR DE RED SEGURO
   ========================================================================== */
function syncDailyTacticalCheckpoints() {
    if (!p || !p.dayZeroCompleted || p.penaltyActive) return;
    if (!('serviceWorker' in navigator)) return;

    let now = new Date();
    let nowMs = now.getTime();
    let dow = (typeof getBiologicalDateObj === 'function') ? getBiologicalDateObj(now).getDay() : now.getDay();
    let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr(now) : now.toDateString();
    let isWeekday = (dow >= 1 && dow <= 5);
    let noWorkToday = (p.noWorkDayStr === todayKey);

    let prof = ensureWorkTelemetryProfile();
    let checkpoints = [];

    const msUntilClock = (targetMinsOfDay) => {
        let t = new Date(nowMs);
        t.setHours(Math.floor(targetMinsOfDay / 60), targetMinsOfDay % 60, 0, 0);
        return t.getTime() - nowMs;
    };

    let done = Array.isArray(p.completedToday) ? p.completedToday : [];
    let act = p.activeMissions || {};

    if (isWeekday && !noWorkToday) {
        // 1. Check de Salida Matutina (~6:05 AM o departMins + 10m) si olvidó activar Ruta de Ida
        if (!done.includes('m_traffic_ida') && !act['m_traffic_ida'] && !done.includes('m_work') && !act['m_work']) {
            let depDelay = msUntilClock(Math.max(350, Math.min(380, (prof ? prof.departMins : 355) + 10)));
            if (depDelay > 5000) {
                checkpoints.push({
                    key: 'morning_depart',
                    delayMs: depDelay,
                    title: 'SISTEMA // SALIDA MATUTINA',
                    body: '¿Ya saliste rumbo al trabajo? Inicia tu Ruta de Ida en 1 toque.',
                    actions: [
                        { action: 'start_route_ida', title: 'Iniciar Ruta' },
                        { action: 'skip_work_today', title: 'Hoy no trabajo' }
                    ]
                });
            }
        }

        // 2. Check de Llegada al Trabajo (7:45 AM o arrivalMins - 15m)
        if (!done.includes('m_work') && !act['m_work']) {
            let arrCheckMins = Math.max(450, Math.min(480, (prof ? prof.arrivalMins : 480) - 15)); // 7:45 AM por defecto
            let arrDelay = msUntilClock(arrCheckMins);
            if (arrDelay > 5000) {
                checkpoints.push({
                    key: 'work_arrival',
                    delayMs: arrDelay,
                    title: 'SISTEMA // LLEGADA AL TRABAJO',
                    body: `${formatClockMins12h(arrCheckMins)}: ¿Ya llegaste al trabajo para iniciar tu Jornada?`,
                    actions: [
                        { action: 'arrived_now', title: 'Llegué ya' },
                        { action: 'arrived_15_ago', title: 'Hace 15m' },
                        { action: 'still_traffic', title: 'Sigo en ruta' }
                    ]
                });
            }

            // 3. Red de seguridad a las 8:30 AM si siguió sin confirmar
            let safeDelay = msUntilClock(510);
            if (safeDelay > 5000) {
                checkpoints.push({
                    key: 'work_arrival_late',
                    delayMs: safeDelay,
                    title: 'SISTEMA // RELEVO PENDIENTE (8:30 AM)',
                    body: '¿Olvidaste marcar tu llegada? Toca para ajustar tu hora real de entrada.',
                    actions: [
                        { action: 'arrived_now', title: 'Llegué ya' },
                        { action: 'arrived_15_ago', title: 'Hace 15m' }
                    ],
                    data: { defaultAction: 'open_arrival_modal' }
                });
            }
        }

        // 4. Check de Salida del Trabajo (3:30 PM o leaveWorkMins aprendido)
        if (!done.includes('m_traffic_vuelta') && !act['m_traffic_vuelta']) {
            let exitMins = prof ? prof.leaveWorkMins : 930; // 3:30 PM
            let exitDelay = msUntilClock(exitMins);
            if (exitDelay > 5000) {
                checkpoints.push({
                    key: 'work_exit',
                    delayMs: exitDelay,
                    title: 'SISTEMA // FIN DE JORNADA',
                    body: `${formatClockMins12h(exitMins)}: ¿Ya saliste del trabajo? Inicia tu Ruta de Vuelta.`,
                    actions: [
                        { action: 'leave_work_now', title: 'Salí ya' },
                        { action: 'leave_work_30_ago', title: 'Hace 30m' },
                        { action: 'still_working', title: 'Aún en turno' }
                    ]
                });
            }
        }
    }

    // 5. Check de Clase Nocturna / Enlace Radial en Moto (6:25 PM si hoy hay materia turno Tarde)
    let todayList = getTodayMissions();
    let afternoonClass = todayList.find(m => m.id.startsWith('sched_') && !done.includes(m.id) && !act[m.id]);
    if (afternoonClass) {
        let clsDelay = msUntilClock(1105); // 6:25 PM
        if (clsDelay > 5000) {
            checkpoints.push({
                key: 'class_transit',
                delayMs: clsDelay,
                title: `ENLACE ACADÉMICO // ${afternoonClass.title.toUpperCase()}`,
                body: 'Tu clase inicia pronto. Si vas en moto, activa el Modo Audio en Ruta sin deserción.',
                actions: [
                    { action: 'start_class_transit', title: 'Escuchar en Ruta' }
                ],
                data: { schedId: afternoonClass.id }
            });
        }
    }

    navigator.serviceWorker.ready.then(reg => {
        if (reg.active) {
            reg.active.postMessage({
                type: 'SL_SCHEDULE_TACTICAL_CHECKPOINTS',
                checkpoints: checkpoints
            });
        }
    }).catch(() => {});

    // Si Web Push en la nube (Vercel + QStash) está suscrito, programar también el aviso clave de 7:45 AM y 3:30 PM una vez al día
    if (typeof window.scheduleCloudPush === 'function' && p.webPushSub && p._cloudTacticalDay !== todayKey && checkpoints.length > 0) {
        p._cloudTacticalDay = todayKey;
        saveData();
        checkpoints.forEach(cp => {
            if (cp.key === 'work_arrival' || cp.key === 'work_exit' || cp.key === 'class_transit') {
                window.scheduleCloudPush('tactical_' + cp.key, cp.title, cp.body, Math.round(cp.delayMs / 1000), 'sl-cp-' + cp.key);
            }
        });
    }
}
window.syncDailyTacticalCheckpoints = syncDailyTacticalCheckpoints;

function handleTacticalNotificationAction(action, data = {}, actionTs = Date.now()) {
    if (!p || !action) return;
    let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();

    if (action === 'start_route_ida') {
        if (!p.activeMissions['m_traffic_ida'] && !p.completedToday.includes('m_traffic_ida')) {
            deployRoutineMission('m_traffic_ida', true);
            if (p.activeMissions['m_traffic_ida']) {
                p.activeMissions['m_traffic_ida'] = actionTs;
                saveData();
            }
        }
    } else if (action === 'skip_work_today') {
        p.noWorkDayStr = todayKey;
        saveData();
        syncDailyTacticalCheckpoints();
        systemNotify("Día sin turno laboral marcado. Avisos de trabajo silenciados hoy.", "info");
    } else if (action === 'arrived_now' || action === 'arrived_15_ago') {
        let delta = action === 'arrived_15_ago' ? 15 * 60000 : 0;
        let arrTs = actionTs - delta;
        if (p.activeMissions && p.activeMissions['m_traffic_ida']) {
            executeSmartArrivalHandover(arrTs, true);
        } else if (!p.activeMissions['m_work'] && !p.completedToday.includes('m_work')) {
            // Si olvidó activar Ruta de Ida, la registra retroactiva con su salida EMA y arranca Jornada a la hora tocada
            let prof = ensureWorkTelemetryProfile();
            let depMins = prof ? prof.departMins : 355;
            let depDate = new Date(arrTs);
            depDate.setHours(Math.floor(depMins / 60), depMins % 60, 0, 0);
            let routeMins = Math.max(20, Math.round((arrTs - depDate.getTime()) / 60000));
            recordAdaptiveTelemetry('m_traffic_ida', routeMins);
            recordWorkClockSample('arrival', arrTs);
            if (!p.completedToday.includes('m_traffic_ida')) p.completedToday.push('m_traffic_ida');
            p.chorrosIdaFinishedAt = arrTs;
            deployRoutineMission('m_work', true);
            if (p.activeMissions['m_work']) p.activeMissions['m_work'] = arrTs;
            saveData();
            renderRoutine();
            updateHUD();
            systemNotify(`[ENTRADA REGISTRADA]: Ruta (${routeMins}m) y Jornada activada desde ${formatClockMins12h(new Date(arrTs).getHours() * 60 + new Date(arrTs).getMinutes())}.`, "gold");
        }
    } else if (action === 'open_arrival_modal') {
        if (p.activeMissions && p.activeMissions['m_traffic_ida']) openSmartArrivalHandoverModal();
        else openRetroactiveRouteModal();
    } else if (action === 'leave_work_now' || action === 'leave_work_30_ago') {
        let delta = action === 'leave_work_30_ago' ? 30 * 60000 : 0;
        let exitTs = actionTs - delta;
        if (p.activeMissions && p.activeMissions['m_work']) {
            executeSmartWorkExit(exitTs, true);
        } else if (!p.activeMissions['m_traffic_vuelta'] && !p.completedToday.includes('m_traffic_vuelta')) {
            deployRoutineMission('m_traffic_vuelta', true);
            if (p.activeMissions['m_traffic_vuelta']) {
                p.activeMissions['m_traffic_vuelta'] = exitTs;
                saveData();
            }
        }
    } else if (action === 'start_class_transit') {
        let schedId = data.schedId || (getTodayMissions().find(m => m.id.startsWith('sched_') && !p.completedToday.includes(m.id)) || {}).id;
        if (schedId) {
            p.classAudioTransitMode = true;
            deployRoutineMission(schedId, true);
            if (p.activeMissions[schedId]) p.activeMissions[schedId] = actionTs;
            saveData();
            renderRoutine();
        }
    }
}

// Detector pasivo de transición Wi-Fi <-> Datos Móviles (blindado por ventana horaria anti-apagón)
let _lastKnownConnType = (navigator.connection && navigator.connection.type) ? navigator.connection.type : null;

function evaluateSafeNetworkTransition() {
    if (!p || !p.dayZeroCompleted || p.penaltyActive) return;
    if (!navigator.connection || !navigator.connection.type) return;

    let curType = navigator.connection.type;
    let prevType = _lastKnownConnType;
    _lastKnownConnType = curType;
    if (!prevType || prevType === curType) return;

    let now = new Date();
    let dow = now.getDay();
    let curMins = now.getHours() * 60 + now.getMinutes();
    let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr(now) : now.toDateString();

// Detector pasivo de transición Wi-Fi <-> Datos Móviles (blindado por ventana horaria anti-apagón)
function _readConnType() {
    if (!navigator.onLine) return 'none';
    if (navigator.connection && navigator.connection.type && navigator.connection.type !== 'unknown') {
        return navigator.connection.type;
    }
    return 'online';
}

let _lastKnownConnType = _readConnType();
let _lastActiveConnType = _lastKnownConnType !== 'none' ? _lastKnownConnType : null;

function _triggerMorningDeparturePrompt(todayKey) {
    if (!p || !p.activeMissions || p.activeMissions['m_traffic_ida']) return;
    if (Array.isArray(p.completedToday) && p.completedToday.includes('m_traffic_ida')) return;
    if (p._netMorningPromptDay === todayKey) return;

    p._netMorningPromptDay = todayKey;
    saveData();

    // 1. Notificación nativa con botones si el permiso está activo
    if ('serviceWorker' in navigator && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
            if (reg.active) {
                reg.active.postMessage({
                    type: 'SL_SHOW_TACTICAL_NOW',
                    payload: {
                        title: 'SISTEMA // SALIDA DETECTADA',
                        body: 'Desconexión de Wi-Fi doméstico detectada. ¿Iniciamos Ruta de Ida?',
                        tag: 'sl-net-depart',
                        actions: [
                            { action: 'start_route_ida', title: 'Iniciar Ruta' },
                            { action: 'skip_work_today', title: 'Ignorar' }
                        ]
                    }
                });
            }
        }).catch(() => {});
    }

    // 2. Respaldo visual inmediato dentro de la app (si está abierta o si faltaba permiso Push)
    if (!document.hidden && typeof openSystemConfirmModal === 'function') {
        openSystemConfirmModal(
            'SALIDA DETECTADA',
            '[ DESCONEXIÓN DE WI-FI DOMÉSTICO ]',
            'Se detectó salida de la red de casa en tu ventana laboral.<br><br>¿Iniciamos tu <b>Ruta de Ida</b> ahora mismo?',
            'INICIAR RUTA',
            () => handleTacticalNotificationAction('start_route_ida', {}, Date.now()),
            ''
        );
    } else if (typeof systemNotify === 'function') {
        systemNotify("Salida de Wi-Fi doméstico detectada. Recuerda iniciar tu [Ruta de Ida].", "info");
    }
}

function evaluateSafeNetworkTransition() {
    if (!p || !p.dayZeroCompleted || p.penaltyActive) return;

    let curType = _readConnType();
    let prevType = _lastKnownConnType;
    let prevActive = _lastActiveConnType;

    _lastKnownConnType = curType;
    if (curType !== 'none') _lastActiveConnType = curType;
    if (prevType === curType) return;

    let now = new Date();
    let dow = now.getDay();
    let curMins = now.getHours() * 60 + now.getMinutes();
    let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr(now) : now.toDateString();

    // Ventana 1 (5:30 AM - 6:35 AM, Lun-Vie): Apagaste/saliste del Wi-Fi de casa (aunque pase por 'none' antes de 'cellular')
    if (dow >= 1 && dow <= 5 && p.noWorkDayStr !== todayKey && curMins >= 330 && curMins <= 395) {
        let leftWifi = (prevType === 'wifi' && (curType === 'none' || curType === 'cellular')) ||
                       (prevActive === 'wifi' && curType === 'cellular') ||
                       (prevType === 'online' && curType === 'none');
        if (leftWifi) {
            _triggerMorningDeparturePrompt(todayKey);
        }
    }

    // Ventana 2 (5:15 PM - 8:00 PM): Volviste al Wi-Fi de casa tras Ruta de Vuelta
    if (curMins >= 1035 && curMins <= 1200 && curType === 'wifi' && (prevType === 'cellular' || prevActive === 'cellular' || prevType === 'none')) {
        if (p.activeMissions && p.activeMissions['m_traffic_vuelta']) {
            systemNotify("Wi-Fi de casa detectado. Recuerda sellar tu [Ruta de Vuelta] cuando bajes de la moto.", "info");
        }
    }
    // Cualquier otra hora (ej. apagón a las 9:00 PM): se ignora por completo
}

if (navigator.connection && typeof navigator.connection.addEventListener === 'function') {
    navigator.connection.addEventListener('change', evaluateSafeNetworkTransition);
}
window.addEventListener('offline', evaluateSafeNetworkTransition);
window.addEventListener('online', evaluateSafeNetworkTransition);


                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then(reg => {
                        if (reg.active) {
                            reg.active.postMessage({
                                type: 'SL_SHOW_TACTICAL_NOW',
                                payload: {
                                    title: 'SISTEMA // SALIDA DETECTADA',
                                    body: 'Desconexión de Wi-Fi doméstico detectada. ¿Iniciamos Ruta de Ida?',
                                    tag: 'sl-net-depart',
                                    actions: [
                                        { action: 'start_route_ida', title: 'Iniciar Ruta' },
                                        { action: 'skip_work_today', title: 'Ignorar' }
                                    ]
                                }
                            });
                        }
                    }).catch(() => {});
                }
            }
        }
    }

    // Ventana 2 (5:15 PM - 8:00 PM): Volviste al Wi-Fi de casa tras Ruta de Vuelta
    if (curMins >= 1035 && curMins <= 1200 && prevType === 'cellular' && curType === 'wifi') {
        if (p.activeMissions && p.activeMissions['m_traffic_vuelta']) {
            systemNotify("Wi-Fi de casa detectado. Recuerda sellar tu [Ruta de Vuelta] cuando bajes de la moto.", "info");
        }
    }
    // Cualquier otra hora (ej. apagón a las 9:00 PM): se ignora por completo
}

if (navigator.connection && typeof navigator.connection.addEventListener === 'function') {
    navigator.connection.addEventListener('change', evaluateSafeNetworkTransition);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SL_TACTICAL_ACTION') {
            handleTacticalNotificationAction(event.data.action, event.data.data || {}, event.data.actionTs || Date.now());
        }
    });
}

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && p && p.dayZeroCompleted && !p.penaltyActive) {
        evaluateSafeNetworkTransition();
        setTimeout(() => checkForgottenRouteHandover(true), 600);
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        if (!p || !p.dayZeroCompleted) return;
        const params = new URLSearchParams(window.location.search);
        const swAct = params.get('swAction');
        const swTs = Number(params.get('swTs')) || Date.now();
        if (swAct) {
            handleTacticalNotificationAction(swAct, {}, swTs);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        syncDailyTacticalCheckpoints();
        checkForgottenRouteHandover(true);
    }, 900);
});
