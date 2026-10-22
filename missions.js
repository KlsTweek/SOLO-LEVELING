/* ==========================================================================
   MISSIONS.JS - RUTINAS, CUARENTENA, SONAR RADAR Y PROTOCOLOS OCULTOS
   ========================================================================== */

/* ==========================================================================
   1. OBTENER MISIONES DEL DÍA (FILTRADAS POR HORARIO, RUTA Y ACADEMIA)
   ========================================================================== */
function getTodayMissions(forcedDay = null) {
    let rawList = typeof baseMissions !== 'undefined' ? [...baseMissions] : [];
    let now = new Date();
    let currentDay = forcedDay !== null ? forcedDay : now.getDay();
    let currentHour = now.getHours();

    let list = [];
    rawList.forEach(m => {
        if (forcedDay === null) {
            if (m.id === 'm_traffic_ida' && currentHour >= 14) return;
            if (m.id === 'm_traffic_vuelta' && currentHour < 14) return;
        }
        if ((currentDay === 0 || currentDay === 6) && m.id === 'm_work') return;
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
                        title: `${sched.type === 'tutor' ? '📐 Tutoría:' : '🎓 Academia:'} ${sched.name}`,
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
                            
/* ==========================================================================
   2. RENDERIZAR TABLÓN DE RUTINA (CON CUARENTENA ABSOLUTA AL MORIR)
   ========================================================================== */
function renderRoutine() {
    if (!p) return;

    const tabRoutine = document.getElementById('tab-routine');
    const penContainer = document.getElementById('penalty-container');
    const evContainer = document.getElementById('event-container');
    const routContainer = document.getElementById('routine-container');
    const headers = tabRoutine ? tabRoutine.querySelectorAll('.section-header') : [];

    if (p.penaltyActive) {
        headers.forEach(h => h.style.display = 'none');
        if (evContainer) evContainer.style.display = 'none';
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

            let deathNote = (p.deathSource === 'dungeon' || p.deathSource === 'midnight')
                ? `<div style="margin-top:8px; padding:8px; background:rgba(0,0,0,0.6); border-left:3px solid var(--danger); font-size:0.85em; color:#fca5a5;">🔒 <b>CASTIGO DE ALTO RANGO:</b> Las Píldoras de Purificación comunes no funcionan en muertes por Mazmorra o Ejecución Nocturna. Cumple el reto físico o usa una reliquia Rango S/SS.</div>`
                : '';

            penContainer.innerHTML = `
            <div class="card penalty" style="flex-direction: column; align-items: flex-start; gap: 14px; margin-top: 10px;">
                <div class="card-body" style="padding-right: 0; width: 100%;">
                    <div class="card-title" style="color: var(--danger); font-size: 1.35em;">⚠️ ZONA DE PENALIZACIÓN: DIRECTIVA #${(daySeed % PENALTY_TRIALS.length) + 1}</div>
                    <div class="card-desc" style="color: #fff; font-size: 0.98em;">Tus signos vitales colapsaron. El Sistema ha bloqueado tus funciones de Cazador.<br><br>🎯 <b>MISIÓN DE SUPERVIVENCIA DE HOY:</b><br>${todayTrial}</div>
                    ${deathNote}
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

    headers.forEach(h => h.style.display = 'flex');
    if (evContainer) evContainer.style.display = 'block';
    if (routContainer) routContainer.style.display = 'block';
    if (penContainer) penContainer.innerHTML = '';

    if (evContainer) {
        if (p.activeEvent) {
            evContainer.innerHTML = `
            <div class="card rank-S">
                <div class="card-body">
                    <div class="card-title">🌟 ${p.activeEvent.title || 'Anomalía Diaria'}</div>
                    <div class="card-desc" style="margin-bottom: 0; color:#e2e8f0;">${p.activeEvent.desc}</div>
                </div>
                <button class="btn btn-green" onclick="claimDailyEvent()">RECLAMAR</button>
            </div>`;
        } else {
            evContainer.innerHTML = `<p style="color:var(--text-muted); font-size:0.9em; margin-bottom:15px;">Sin anomalías activas en el radar.</p>`;
        }
    }

    if (!routContainer) return;

    let html = '';
    if (!p.studyCompletedToday) {
        html += `
        <div class="card rank-A">
            <div class="card-body">
                <div class="card-title">
                    <span>Repaso Cognitivo</span>
                    <span class="card-tag exclusive">FOCUS</span>
                </div>
                <div class="card-desc" style="margin-bottom: 0;">Aísla tu mente por 5 o 25 minutos de inmersión total (+MP).</div>
            </div>
            <button class="btn btn-main" onclick="openModal('study-modal')">INICIAR</button>
        </div>`;
    }

    let todayMissions = getTodayMissions();
    if (!p.completedToday) p.completedToday = [];
    if (!p.activeMissions) p.activeMissions = {};

    todayMissions.forEach(m => {
        if (p.completedToday.includes(m.id)) return;

        let isActive = !!p.activeMissions[m.id];
        let tagLabel = m.type === 'main' ? 'PRINCIPAL' : 'PARALELA';
        let tagClass = m.type === 'main' ? 'exclusive' : 'parallel';
        let rClass = `rank-${m.rank || 'B'}`;

        let elapsedText = '';
        if (isActive) {
            let minsPassed = Math.floor((Date.now() - p.activeMissions[m.id]) / 60000);
            let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;
            let reqMins = Math.ceil((m.mins || 30) * agiFactor);
            let isReady = minsPassed >= reqMins;
            let extraMins = Math.max(0, minsPassed - reqMins);
            let colorTimer = isReady ? 'var(--success)' : 'var(--text-gold)';
            let labelTimer = isReady
                ? `[⚡ LISTO: ${minsPassed}/${reqMins}m${extraMins > 0 ? ' (+' + extraMins + 'm extra)' : ''}]`
                : `[ACTIVO: ${minsPassed}/${reqMins}m]`;
            elapsedText = `<span id="mission-live-timer-${m.id}" style="color:${colorTimer}; font-size:0.75em; font-family:'Share Tech Mono', monospace;">${labelTimer}</span>`;
        }

        let btnHtml = isActive 
            ? `<button class="btn btn-gold" style="width: 100%; margin-top: 12px;" onclick="finishRoutineMission('${m.id}')">⚔️ SELLAR MISIÓN (${m.mins}m)</button>`
            : `<button class="btn btn-main" style="width: 100%; margin-top: 12px;" onclick="deployRoutineMission('${m.id}')">DESPLEGAR (${m.mins}m)</button>`;

        html += `
        <div class="card ${isActive ? 'active-task' : ''} ${rClass}" style="flex-direction: column; align-items: flex-start;">
            <div class="card-body" style="width: 100%; padding-right: 0;">
                <div class="card-title">
                    <span>${m.title}</span>
                    <span class="card-tag ${tagClass}">${tagLabel}</span>
                    ${elapsedText}
                </div>
                <div class="card-desc">${m.desc}</div>
                <div class="card-rewards">
                    <span class="r-xp">+${m.xp} XP</span>
                    <span class="r-sp">-${m.spCost} SP</span>
                    <span class="r-stat">+${(m.mins && m.mins >= 40) ? 65 : 45} MP</span>
                </div>
                ${btnHtml}
            </div>
        </div>`;
    });

    routContainer.innerHTML = html;
}

function updateActiveMissionTimersInPlace() {
    if (!p || p.penaltyActive || !p.activeMissions) return;
    let todayList = getTodayMissions();
    let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;

    Object.keys(p.activeMissions).forEach(id => {
        let el = document.getElementById(`mission-live-timer-${id}`);
        if (!el) return;
        let m = todayList.find(x => x.id === id);
        if (!m) return;

        let minsPassed = Math.floor((Date.now() - p.activeMissions[id]) / 60000);
        let reqMins = Math.ceil((m.mins || 30) * agiFactor);
        let isReady = minsPassed >= reqMins;
        let extraMins = Math.max(0, minsPassed - reqMins);

        el.style.color = isReady ? 'var(--success)' : 'var(--text-gold)';
        el.innerText = isReady
            ? `[⚡ LISTO: ${minsPassed}/${reqMins}m${extraMins > 0 ? ' (+' + extraMins + 'm extra)' : ''}]`
            : `[ACTIVO: ${minsPassed}/${reqMins}m]`;
    });
}

if (window.routineLiveTimerInterval) clearInterval(window.routineLiveTimerInterval);
window.routineLiveTimerInterval = setInterval(updateActiveMissionTimersInPlace, 15000);

/* ==========================================================================
   3. DESPLIEGUE Y VALIDACIÓN ANTI-TRAMPAS (CON PASIVAS DE BOTAS, RUTA Y AGI)
   ========================================================================== */
function deployRoutineMission(id) {
    if (p.penaltyActive) {
        systemNotify("SISTEMA BLOQUEADO. Cumple tu supervivencia primero.", "danger");
        return;
    }
    let todayList = getTodayMissions();
    let m = todayList.find(x => x.id === id);
    if (!m) return;

    if (!p.activeMissions) p.activeMissions = {};

    // REGLA DE EXCLUSIVIDAD: Solo 1 Misión PRINCIPAL activa a la vez (No puedes limpiar tu cuarto mientras vas en Los Chorros)
    if (m.type === 'main') {
        let activeMainId = Object.keys(p.activeMissions).find(actId => {
            let actObj = todayList.find(x => x.id === actId);
            return actObj && actObj.type === 'main';
        });
        if (activeMainId) {
            let activeMainObj = todayList.find(x => x.id === activeMainId);
            systemNotify(`⚠️ Ubicación Física Ocupada: Ya estás ejecutando la misión principal [${activeMainObj.title}]. Séllala antes de iniciar otra principal.`, "danger");
            return;
        }
    }

    let now = Date.now();
    let spCost = m.spCost || 10;
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";

    let antMult = (accId === "eq_acc_metus") ? 1.5 : 1;
    let antCount = (p.infantry && p.infantry.ants) ? Math.floor(p.infantry.ants * antMult) : 0;
    if (antCount >= 5 && (m.id.includes('clean') || m.id.includes('traffic'))) {
        spCost = Math.max(2, spCost - Math.floor(antCount / 5));
    }

    if (aId === "eq_a_boots_e" && (m.stat === 'str' || m.id.includes('clean'))) {
        spCost = Math.max(2, spCost - 3);
    }
    if (aId === "eq_a_serpento" && m.id.includes('traffic')) {
        spCost = Math.floor(spCost * 0.5);
    }
    // Nueva Pasiva de Tusk: Magia de Ligereza Gravitatoria (-25% SP en todas las misiones)
    if (p.equippedShadows && p.equippedShadows.includes('tusk')) {
        spCost = Math.max(2, Math.floor(spCost * 0.75));
    }

    if (p.bypassFatigue) {
        spCost = 0;
        p.bypassFatigue = false;
        systemNotify("🧠 Bypass de Fatiga consumido: 0 SP gastados.", "purple");
    } else if (p.entropyBuffUntil && now < p.entropyBuffUntil) {
        spCost = -10;
    } else if (p.spDiscountUntil && now < p.spDiscountUntil) {
        spCost = Math.floor(spCost * 0.5);
    }

    if (spCost > 0 && p.sp < spCost) {
        p.hp = Math.max(0, p.hp - 10);
        updateHUD();
        systemNotify("Estamina agotada. Forzar tu cuerpo te costó -10 HP.", "danger");
        if (p.hp <= 0 && typeof triggerDeath === "function") {
            p.deathSource = 'routine';
            triggerDeath("Colapso por agotamiento extremo al forzar una misión sin SP.");
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
    if (typeof _evalArcDeployHook === "function") _evalArcDeployHook(m);

    saveData();
    updateHUD();
    renderRoutine();
    let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;
    systemNotify(`⚡ Inmersión iniciada: [${m.title}]. Duración requerida: ${Math.ceil((m.mins || 30) * agiFactor)} min.`, "info");
}
function finishRoutineMission(id) {
    let m = getTodayMissions().find(x => x.id === id);
    if (!m || !p.activeMissions || !p.activeMissions[id]) return;

    let now = Date.now();
    let elapsedMins = (now - p.activeMissions[id]) / 60000;
    let agiFactor = p.stats ? Math.max(0.75, 0.90 - ((p.stats.agi - 1) * 0.02)) : 0.90;
    let requiredMins = (m.mins || 30) * agiFactor;
    let beruBypass = (p.beruSpeedUntil && now < p.beruSpeedUntil) || (p._arcOverdriveUntil && now < p._arcOverdriveUntil);

    if (!beruBypass && elapsedMins < requiredMins) {
        let missing = Math.ceil(requiredMins - elapsedMins);
        let penaltyDmg = (p.cryoBuffUntil && now < p.cryoBuffUntil) ? 2.5 : 5;
        p.hp = Math.max(0, p.hp - penaltyDmg);
        updateHUD();
        saveData();
        systemNotify(`Fraude de inmersión detectado. Faltan ${missing} minutos para sellar [${m.title}]. Castigo: -${penaltyDmg} HP.`, "danger");
        if (p.hp <= 0 && typeof triggerDeath === "function") {
            p.deathSource = 'routine';
            triggerDeath("Aniquilado por el Sistema al intentar falsificar múltiples misiones.");
        }
        return;
    }

    let realMinsWorked = Math.max(m.mins || 30, Math.floor(elapsedMins));
    let overtimeBlocks = Math.max(0, Math.floor((realMinsWorked - (m.mins || 30)) / 15));
    let bonusXP = overtimeBlocks * 5;
    let bonusGold = overtimeBlocks * 3;

    if (overtimeBlocks > 0) {
        systemNotify(`⏱️ Sobrecarga de Tiempo (+${realMinsWorked - m.mins}m extra): Bono de +${bonusXP} XP y +${bonusGold} G añadido.`, "gold");
    }

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

window.filterDungeons = function(rank, btnElement) {
    currentDungFilter = rank;
    if (btnElement) {
        document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }
    generateRadarBlips(true);
    renderBosses();
};

function rescanRadarHorizon() {
    if (typeof playSystemSound === "function") playSystemSound('info');
    if (navigator.vibrate) navigator.vibrate(50);
    if (typeof _evalArcRadarScan === "function") _evalArcRadarScan();
    generateRadarBlips(true);
    renderBosses();
    if (typeof systemNotify === "function") {
        systemNotify("📡 Barrido de sonar completado. Nuevas fluctuaciones de maná sintonizadas.", "info");
    }
}

function selectRadarBlip(dungId) {
    selectedRadarDungId = dungId;
    if (typeof playSystemSound === "function") playSystemSound('info');
    renderBosses();
}

function generateRadarBlips(forceReshuffle = false) {
    if (typeof dungeonDB === 'undefined' || dungeonDB.length === 0) {
        currentRadarBlips = [];
        return;
    }

    let eligible = dungeonDB.filter(dung => {
        let matchesTab = currentDungFilter === 'Todos' || dung.rank === currentDungFilter;
        let isTooHigh = dung.minLevel > (p.level + 4);
        return matchesTab && !isTooHigh;
    });

    if (eligible.length === 0) {
        currentRadarBlips = [];
        selectedRadarDungId = null;
        return;
    }

    if (!forceReshuffle && currentRadarBlips.length > 0) {
        let stillValid = currentRadarBlips.every(b => eligible.some(e => e.id === b.dung.id));
        if (stillValid) return;
    }

    let shuffled = [...eligible].sort(() => Math.random() - 0.5);
    let picked = shuffled.slice(0, 4);

    currentRadarBlips = picked.map((d, idx) => {
        let baseQ = SONAR_QUADRANTS[idx % SONAR_QUADRANTS.length];
        let jitterX = Math.floor(Math.random() * 12) - 6;
        let jitterY = Math.floor(Math.random() * 12) - 6;
        return {
            dung: d,
            x: Math.max(18, Math.min(82, baseQ.x + jitterX)),
            y: Math.max(18, Math.min(82, baseQ.y + jitterY)),
            sector: baseQ.sector
        };
    });

    selectedRadarDungId = currentRadarBlips[0] ? currentRadarBlips[0].dung.id : null;
}

function startPersonalBoss(idx) {
    if (!p.bosses || !p.bosses[idx]) return;
    p.bosses[idx].start = Date.now();
    saveData();
    renderBosses();
    let maxMins = (p.equipment && p.equipment.accessory && p.equipment.accessory.id === "eq_acc_chalice") ? 85 : 70;
    systemNotify(`⚔️ Combate iniciado contra [${p.bosses[idx].title}]. Tienes ${maxMins} minutos antes de sufrir penalización por deserción.`, "info");
}

function actBoss(idx) {
    if (!p.bosses || !p.bosses[idx]) return;
    let b = p.bosses[idx];
    openSealModal({
        type: 'boss',
        idx: idx,
        xp: b.xp,
        gold: b.gold
    });
}

function renderBosses() {
    if (p && p.penaltyActive) {
        if (typeof switchTab === "function") switchTab('routine', 0);
        return;
    }

    const personalCont = document.getElementById('boss-container');
    if (personalCont) {
        personalCont.innerHTML = '';
        if (!p.bosses || p.bosses.length === 0) {
            personalCont.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 8px 0 14px 0; font-size:0.88em;">Sin amenazas personales activas. Usa "+ Escanear Jefe" para registrar una tarea crítica.</p>`;
        } else {
            let maxMins = (p.equipment && p.equipment.accessory && p.equipment.accessory.id === "eq_acc_chalice") ? 85 : 70;
            p.bosses.forEach((b, i) => {
                let isStarted = !!b.start;
                let timerHtml = '';
                if (isStarted) {
                    let elapsed = Math.floor((Date.now() - b.start) / 60000);
                    let left = Math.max(0, maxMins - elapsed);
                    timerHtml = `<span style="color:var(--danger); font-family:'Share Tech Mono', monospace; font-size:0.8em;">[⏳ ${left}m restantes]</span>`;
                }

                let btnAction = isStarted
                    ? `<button class="btn btn-gold" style="width:100%;" onclick="actBoss(${i})">⚔️ EJECUTAR AMENAZA</button>`
                    : `<button class="btn btn-main" style="width:100%;" onclick="startPersonalBoss(${i})">INICIAR COMBATE (${maxMins}m MÁX)</button>`;

                personalCont.innerHTML += `
                <div class="card rank-${b.rank}" style="flex-direction:column; align-items:stretch;">
                    <div style="margin-bottom:12px;">
                        <h3 class="card-title">${b.title} <span class="card-tag ${b.rank}">RANGO ${b.rank}</span> ${timerHtml}</h3>
                        <div class="card-rewards" style="margin-top:6px;">
                            <span class="r-xp">+${b.xp} XP</span>
                            <span class="r-gold">+${Math.floor(b.gold * (typeof GOLD_NERF !== 'undefined' ? GOLD_NERF : 0.20))} G</span>
                        </div>
                    </div>
                    ${btnAction}
                </div>`;
            });
        }
    }

    const container = document.getElementById('dungeon-list-container');
    if (!container) return;

    generateRadarBlips(false);

    let blipsHtml = '';
    currentRadarBlips.forEach(b => {
        let d = b.dung;
        let isSelected = (d.id === selectedRadarDungId);
        let redClass = d.isRedGate ? 'red-gate-blip' : '';
        blipsHtml += `
        <div class="sonar-blip blip-${d.rank} ${redClass} ${isSelected ? 'selected-blip' : ''}" 
             style="left:${b.x}%; top:${b.y}%;" 
             onclick="selectRadarBlip('${d.id}')">
            ${d.rank}
        </div>`;
    });

    let activeBlipObj = currentRadarBlips.find(b => b.dung.id === selectedRadarDungId) || null;
    let terminalHtml = '';

    if (!activeBlipObj) {
        terminalHtml = `
        <div class="card" style="border-style:dashed; border-color:#334155; text-align:center; flex-direction:column; padding:22px;">
            <div style="font-family:'Share Tech Mono', monospace; color:var(--text-muted); font-size:0.9em;">
                [ SIN SEÑALES DE ESTE RANGO EN TU NIVEL ACTUAL ]<br>
                Cambia la frecuencia arriba o sube tu Nivel de Cazador.
            </div>
        </div>`;
    } else {
        let dung = activeBlipObj.dung;
        let isLevelLocked = p.level < dung.minLevel;
        let rankKeyStr = 'rank' + dung.rank;
        let keysOwned = p.dungeonKeys ? (p.dungeonKeys[rankKeyStr] || 0) : 0;
        let hasKey = dung.reqKey === null || keysOwned > 0 || !!(p._arcFreeGateUntil && Date.now() < p._arcFreeGateUntil);
        let totalMins = dung.phases.reduce((acc, ph) => acc + ph.durationMins, 0);

        let accessText = dung.reqKey 
            ? `🗝️ Llave requerida: Rango ${dung.rank} (${keysOwned} en bolsa)` 
            : `⚡ Grieta Inestable: Entrada Libre (Sin llave)`;

        let redGateWarning = dung.isRedGate 
            ? `<div style="margin-top:8px; padding:6px 10px; background:rgba(255,42,85,0.15); border-left:3px solid var(--danger); color:var(--danger); font-weight:700; font-size:0.84em;">⚠️ ANOMALÍA DE PORTAL ROJO: Una vez dentro, la huida convencional queda sellada.</div>` 
            : '';

        let phasesPreview = dung.phases.map((ph, idx) => `<span style="color:#cbd5e1;">F${idx+1}: ${ph.name} (${ph.durationMins}m)</span>`).join(' → ');

        let btnHtml = '';
        if (isLevelLocked) {
            btnHtml = `<button class="btn btn-red" style="width: 100%; opacity: 0.45; cursor: not-allowed;">🔒 NIVEL INSUFICIENTE (REQ. NIV. ${dung.minLevel})</button>`;
        } else if (!hasKey) {
            btnHtml = `<button class="btn btn-red" style="width: 100%;" onclick="systemNotify('Te falta una llave de Rango ${dung.rank}. Adquiérela en la sección Pergaminos de la tienda.', 'danger')">🗝️ LLAVE REQUERIDA (${keysOwned} EN BOLSA)</button>`;
        } else {
            btnHtml = `<button class="btn btn-main" style="width: 100%; padding:15px; font-size:1.05em;" onclick="startDungeon('${dung.id}')">⚔️ ENTRAR AL PORTAL (${totalMins} MIN)</button>`;
        }

        terminalHtml = `
        <div class="card rank-${dung.rank}" style="flex-direction:column; align-items:stretch;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px; margin-bottom:10px;">
                <span style="font-family:'Share Tech Mono', monospace; font-size:0.75em; color:var(--neon-main);">📡 COORDENADAS: ${activeBlipObj.sector}</span>
                <span class="card-tag ${dung.rank}">RANGO ${dung.rank}</span>
            </div>
            <div class="card-title" style="font-size:1.3em; margin-bottom:6px;">${dung.title}</div>
            <div class="card-desc" style="margin-bottom:10px;">
                <div>${accessText} • ⏱️ Duración total: <b>${totalMins} min</b></div>
                <div style="font-size:0.82em; margin-top:6px; color:var(--text-lore);">Estructura: ${phasesPreview}</div>
                ${redGateWarning}
            </div>
            <div class="card-rewards" style="margin-bottom:14px; justify-content:space-around; width:100%;">
                <span class="r-xp">🏆 +${dung.rewards.xp} EXP</span>
                <span class="r-gold">🪙 +${dung.rewards.gold} G</span>
                <span class="r-stat">🗣️ Extracción Posible</span>
            </div>
            ${btnHtml}
        </div>`;
    }

    let existingScreen = container.querySelector('.sonar-screen');
    let coordsBar = container.querySelector('.sonar-coords-bar');
    let termWrap = document.getElementById('sonar-terminal-slot');

    if (existingScreen && coordsBar && termWrap) {
        coordsBar.innerText = `TOCA UN NODO DE MANÁ EN EL SONAR (${currentRadarBlips.length} DETECTADOS)`;
        existingScreen.querySelectorAll('.sonar-blip').forEach(el => el.remove());
        existingScreen.insertAdjacentHTML('beforeend', blipsHtml);
        termWrap.innerHTML = terminalHtml;
    } else {
        container.innerHTML = `
        <div class="sonar-radar-wrap">
            <div class="sonar-coords-bar">TOCA UN NODO DE MANÁ EN EL SONAR (${currentRadarBlips.length} DETECTADOS)</div>
            <div class="sonar-screen">
                <div class="sonar-crosshair-h"></div>
                <div class="sonar-crosshair-v"></div>
                <div class="sonar-sweep-beam"></div>
                <div class="sonar-center-dot"></div>
                ${blipsHtml}
            </div>
        </div>
        <div id="sonar-terminal-slot">${terminalHtml}</div>`;
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