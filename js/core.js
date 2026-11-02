    /* ==========================================================================
   CORE.JS - NÚCLEO DEL SISTEMA, POSES DINÁMICAS DE ARMERÍA Y MOTOR DE INCURSIÓN
   ========================================================================== */

/* ==========================================================================
   1. CONSTANTES GLOBALES
   ========================================================================== */
const VERSION = "V4.1_TrueMonarch";
const GOLD_NERF = 0.20;

function getBiologicalDateObj(now = new Date()) {
    let d = new Date(now.getTime());
    if (d.getHours() < 5) {
        d.setDate(d.getDate() - 1);
    }
    return d;
}

function getBiologicalDayStr(now = new Date()) {
    return getBiologicalDateObj(now).toDateString();
}
window.getBiologicalDayStr = getBiologicalDayStr;

const todayStr = getBiologicalDayStr();

let         audioCtx = null;
try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
    console.warn("Audio Context no disponible");
}

/* ==========================================================================
   2. ESTADO GLOBAL DEL JUGADOR (Tu Alma Digital - Día 1 inicia en 0/1000 MP)
   ========================================================================== */
function _safeGetStorage(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}
function _safeSetStorage(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
}

let p = JSON.parse(_safeGetStorage('SL_Player_' + VERSION) || 'null') || {
    level: 1, xp: 0, maxXp: 150, hp: 100, sp: 100, mp: 0,
    gold: 0, crystals: 0,
    finances: { freeBalance: 0, vaultGoals: [] },
    dungeonKeys: { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0, rankSSS: 0 },
    inventory: [], bosses: [], schedules: [], titles: [],
    perfectDays: 0, completedToday: [], activeMissions: {}, totalMissions: 0,
    lastLogin: todayStr, lastSunday: null, studyCompletedToday: false, isInit: false,
    sRankCleared: false,
    stats: { str: 1.0, int: 1.0, agi: 1.0 },
    shadowArmy: {
        igris: { unlocked: true, level: 1, active: false },
        tank:  { unlocked: false, level: 1, active: false, cooldownUntil: null, usesLeft: 2 },
        iron:  { unlocked: false, level: 1, active: false },
        tusk:  { unlocked: false, level: 1, active: false },
        beru:  { unlocked: false, level: 1, active: false },
        min:   { unlocked: false, usedForever: false }
    },
    equippedShadows: [],
    infantry: { soldiers: 0, mages: 0, bears: 0, orcs: 0, ants: 0 },
    shadowSlots: 1,
    currentZone: "Base", activeTags: [], activeEvent: null, 
    nightPassActive: null, lunchRegen: 0, penaltyActive: false, sleepDebt: false,
    abyssCurseUntil: null,
    timeStats: { work: 0, study: 0, traffic: 0, total: 0 },
    intBlockedUntil: null,
    spDiscountUntil: null,
    extractionBuffUntil: null,
    history: { deaths: 0, goldLost: 0, itemsBroken: 0 },
    _arcFlags: {}
};

let expectedAnswer = 0;
let pendingReward = null;
let activeFissure = null;

let studyTimer = null;
let timeRemaining = 0;
let totalStudyTime = 0;
let currentNetMpPerMin = 0;

/* ==========================================================================
   3. GUARDADO, CARGA Y MOTOR DE HABILIDADES DEL CAZADOR (TEMPORADAS 1 Y 2)
   ========================================================================== */
window._isResettingSystem = false;

// Recuerda si esta página cargó datos guardados al abrirse
let _loadedFromStorage = !!_safeGetStorage('SL_Player_' + VERSION);

function saveData() {
    if (window._isResettingSystem) return;

    // Si los datos desaparecieron mientras la página seguía abierta,
    // alguien borró el sitio: no volver a escribir el progreso viejo.
    // Recargar para empezar limpio.
    if (_loadedFromStorage && _safeGetStorage('SL_Player_' + VERSION) === null) {
        window._isResettingSystem = true;
        window.location.reload();
        return;
    }

    _safeSetStorage('SL_Player_' + VERSION, JSON.stringify(p));
    _loadedFromStorage = true;
}

window.resetSistema = window.resetMonarchSystem = async function() {
    window._isResettingSystem = true;
    try {
        localStorage.clear();
        sessionStorage.clear();
        if ('caches' in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)));
        }
        if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map(r => r.unregister()));
        }
    } catch (e) {}
    window.location.replace(window.location.pathname + '?reset=' + Date.now());
    return "Reiniciando desde Día 0...";
};


window.advanceNonTelemetryMissions = function(minsToAdvance) {
    if (!p || !p.activeMissions) return 0;
    let todayList = (typeof getTodayMissions === "function") ? getTodayMissions() : [];
    let count = 0;
    Object.keys(p.activeMissions).forEach(mid => {
        if (mid === 'm_traffic_ida' || mid === 'm_traffic_vuelta' || mid === 'm_work' || mid.startsWith('sched_')) return;
        let mObj = todayList.find(x => x.id === mid);
        if (mObj && typeof isTelemetryMission === "function" && isTelemetryMission(mObj)) return;
        p.activeMissions[mid] -= (minsToAdvance * 60000);
        count++;
    });
    if (typeof updateActiveMissionTimersInPlace === "function") updateActiveMissionTimersInPlace();
    if (typeof renderRoutine === "function") renderRoutine();
    return count;
};

function loadData() {
    let raw = _safeGetStorage('SL_Player_' + VERSION);
    let saved = raw ? JSON.parse(raw) : null;
    if (saved) {
        p = saved;
        return true;
    }
    return false;
}

window.getAvailableInfantryCount = function(typeKey) {
    if (!p || !p.infantry) return 0;
    if (p.infantryDisabled && p.infantryDisabled[typeKey]) return 0;
    let total = p.infantry[typeKey] || 0;
    let busy = (p.activeExpedition && p.activeExpedition.sentUnits && p.activeExpedition.sentUnits[typeKey])
        ? p.activeExpedition.sentUnits[typeKey]
        : 0;
    return Math.max(0, total - busy);
};

const HUNTER_SKILLS_META = {
    // --- HABILIDADES PASIVAS ---
    longevity: {
        id: 'longevity', type: 'passive', name: 'Voluntad de Recuperación', maxLvl: 5,
        desc: (lvl) => `Bendición de Kandiaru: Regenera +${lvl * 2} HP cada hora y reduce el daño de veneno/sangrado un ${lvl * 12}%. (Sube al completar misiones físicas o emergencias).`
    },
    tenacity: {
        id: 'tenacity', type: 'passive', name: 'Tenacidad', maxLvl: 3,
        desc: (lvl) => `El que Vence a la Adversidad: Cuando tu HP baja del ${20 + (lvl * 10)}%, el daño recibido se reduce un 50% y tu ataque sube +${20 + (lvl * 10)}%. (Sube al combatir con baja vida).`
    },
    dagger_mastery: {
        id: 'dagger_mastery', type: 'passive', name: 'Maestría en Armas Cortas', maxLvl: 10,
        desc: (lvl) => `Técnica de Asesino: Aumenta tu daño directo un +${lvl * 4}% y ensancha +${(lvl * 1.5).toFixed(1)}% la barra crítica del Corte Dimensional. (Sube con cada Corte y golpe a Jefes).`
    },
    // --- HABILIDADES ACTIVAS ---
    sprint: {
        id: 'sprint', type: 'active', name: 'Sprint (Quicksilver)', maxLvl: 5, mpCost: 45, cdSec: 35,
        desc: (lvl) => `En Mazmorra: Reduce un ${22 + (lvl * 3)}% el tiempo restante de la fase actual y da +30% Evasión por 60s. En Rutina: Adelanta ${6 + (lvl * 2)} min tus misiones activas (Potenciado por Botas).`
    },
    vital_strike: {
        id: 'vital_strike', type: 'active', name: 'Tajo Vital (Mutilación)', maxLvl: 5, mpCost: 60, cdSec: 12,
        desc: (lvl) => `En Choque de Jefe: Estocada al punto débil que inflige x${(2.2 + (lvl * 0.25)).toFixed(2)} de daño crítico inmediato y drena +${8 + (lvl * 3)} HP. Fuera de Mazmorra: Ensancha +25% tu próximo Corte (Potenciado por Guanteletes).`
    },
    bloodlust: {
        id: 'bloodlust', type: 'active', name: 'Intención Asesina (Sed de Sangre)', maxLvl: 3, mpCost: 85, cdSec: 45,
        desc: (lvl) => `En Mazmorra / Jefe: Paraliza de terror a los enemigos por ${12 + (lvl * 5)}s (0 daño recibido) y reduce un ${15 + (lvl * 5)}% la vida del Jefe actual (Potenciado por Casco).`
    },
    rulers_touch: {
        id: 'rulers_touch', type: 'active', name: 'Toque del Gobernante', maxLvl: 5, mpCost: 95, cdSec: 40,
        desc: (lvl) => `Telequinesis soberana: En Mazmorra golpea con fuerza gravitatoria (-${70 + (lvl * 25)} HP al Jefe) y atrae 1 mineral/llave del vacío. Fuera de Mazmorra: Reclama expediciones y condensa +${15 + (lvl * 5)} G (Potenciado por Anillo/Collar).`
    }
};
window.HUNTER_SKILLS_META = HUNTER_SKILLS_META;

function ensureHunterSkills() {
    if (!p) return;
    if (!p.hunterSkills) {
        p.hunterSkills = {
            longevity:      { lvl: 1, xp: 0, maxXp: 5 },
            tenacity:       { lvl: 1, xp: 0, maxXp: 4 },
            dagger_mastery: { lvl: 1, xp: 0, maxXp: 6 },
            sprint:         { lvl: 1, xp: 0, maxXp: 5, cdUntil: 0 },
            vital_strike:   { lvl: 1, xp: 0, maxXp: 5, cdUntil: 0 },
            bloodlust:      { lvl: 1, xp: 0, maxXp: 4, cdUntil: 0 },
            rulers_touch:   { lvl: 1, xp: 0, maxXp: 6, cdUntil: 0 }
        };
    }
}
window.ensureHunterSkills = ensureHunterSkills;

window.gainHunterSkillXP = function(skillId, amount = 1) {
    ensureHunterSkills();
    let sk = p.hunterSkills[skillId];
    let meta = HUNTER_SKILLS_META[skillId];
    if (!sk || !meta || sk.lvl >= meta.maxLvl) return;

    sk.xp = (sk.xp || 0) + amount;
    if (sk.xp >= sk.maxXp) {
        sk.xp -= sk.maxXp;
        sk.lvl++;
        sk.maxXp = Math.floor(sk.maxXp * 1.5) + 3;
        saveData();
        if (typeof systemNotify === "function") {
            systemNotify(`[HABILIDAD ASCENDIDA]: ¡[${meta.name}] ha subido al Nivel ${sk.lvl}!`, "gold");
        }
    }
};

window.castHunterSkill = function(skillId) {
    ensureHunterSkills();
    let sk = p.hunterSkills[skillId];
    let meta = HUNTER_SKILLS_META[skillId];
    if (!sk || !meta || meta.type !== 'active') return;

    let now = Date.now();
    if (sk.cdUntil && now < sk.cdUntil) {
        let secRem = Math.ceil((sk.cdUntil - now) / 1000);
        return systemNotify(`[${meta.name}] en enfriamiento (${secRem}s restantes).`, "info");
    }

    let hasBoots  = !!(p.equipment && p.equipment.boots);
    let hasGloves = !!(p.equipment && p.equipment.gloves);
    let hasHelm   = !!(p.equipment && p.equipment.head);
    let hasJewel  = !!(p.equipment && (p.equipment.ring || p.equipment.necklace));

    let cost = meta.mpCost || 50;
    if (skillId === 'sprint' && hasBoots) cost = Math.floor(cost * 0.7);
    if (hasEquippedItem && hasEquippedItem('eq_h_shadow')) cost = Math.floor(cost * 0.8);

    if ((p.mp || 0) < cost) {
        return systemNotify(`Maná insuficiente para [${meta.name}] (Requiere ${cost} MP).`, "danger");
    }

    p.mp = Math.max(0, (p.mp || 0) - cost);
    let cdMult = (skillId === 'bloodlust' && hasHelm) ? 0.75 : 1.0;
    sk.cdUntil = now + Math.floor((meta.cdSec || 30) * 1000 * cdMult);
    gainHunterSkillXP(skillId, 1);

    let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;

    if (skillId === 'sprint') {
        let pctCut = (22 + (sk.lvl * 3) + (hasBoots ? 8 : 0)) / 100;
        p.adrenalineDodgeUntil = now + 60000;
        if (typeof activeDungeon !== 'undefined' && activeDungeon && !waitingForValidation) {
            raidTimeLeft = Math.max(2, Math.floor(raidTimeLeft * (1 - pctCut)));
            updateRaidTimerUI();
            pushRaidLog(`[HABILIDAD: SPRINT Nv.${sk.lvl}] Velocidad supersónica (-${Math.round(pctCut * 100)}% tiempo de fase y +30% Evasión).`, "#7dd3fc");
            triggerArenaChoreography('hunter');
            systemNotify(`[Sprint Nv.${sk.lvl}]: Reloj de fase acelerado un ${Math.round(pctCut * 100)}% y +30% Evasión activa.`, "info");
        } else {
            let minsAdv = 6 + (sk.lvl * 2) + (hasBoots ? 3 : 0);
            let count = window.advanceNonTelemetryMissions(minsAdv);
            systemNotify(count > 0
                ? `[Sprint Nv.${sk.lvl}]: Tus misiones en curso avanzaron +${minsAdv} minutos y ganaste +30% Evasión.`
                : `[Sprint Nv.${sk.lvl}]: Reflejos acelerados (+30% Evasión por 60s).`, "info");
        }
    } else if (skillId === 'vital_strike') {
        let mult = 2.2 + (sk.lvl * 0.25) + (hasGloves ? 0.35 : 0);
        let heal = 8 + (sk.lvl * 3) + (hasGloves ? 6 : 0);
        if (typeof activeDungeon !== 'undefined' && activeDungeon && waitingForValidation) {
            let baseAtk = Math.floor((28 + (p.stats.str * 16)) * mult);
            clashBossHP = Math.max(0, clashBossHP - baseAtk);
            p.hp = Math.min(maxHP, +(p.hp + heal).toFixed(1));
            pushRaidLog(`[TAJO VITAL Nv.${sk.lvl}] ¡Impacto al punto débil! -${baseAtk} HP al Jefe y +${heal} HP restaurados.`, "#e0f2fe");
            triggerArenaChoreography('hunter');
            updateClashUI();
            if (clashBossHP <= 0) finishBossClash();
        } else {
            p.nextBossCrit = true;
            p.nextSlashWiden = true;
            p.hp = Math.min(maxHP, +(p.hp + heal).toFixed(1));
            systemNotify(`[Tajo Vital Nv.${sk.lvl}]: +${heal} HP, Zona Vital ensanchada en tu próximo Corte y Crítico listo contra el Jefe.`, "gold");
        }
    } else if (skillId === 'bloodlust') {
        let durSec = 12 + (sk.lvl * 5) + (hasHelm ? 5 : 0);
        let bossShredPct = (15 + (sk.lvl * 5)) / 100;
        p.ironImmunityUntil = now + (durSec * 1000);
        if (typeof activeDungeon !== 'undefined' && activeDungeon) {
            if (waitingForValidation && clashBossHP > 0) {
                let shred = Math.floor(clashBossHP * bossShredPct);
                clashBossHP = Math.max(1, clashBossHP - shred);
                updateClashUI();
            }
            pushRaidLog(`[INTENCIÓN ASESINA Nv.${sk.lvl}] Los monstruos tiemblan de terror (${durSec}s sin recibir daño).`, "#a5b4fc");
            systemNotify(`[Intención Asesina Nv.${sk.lvl}]: Enemigos paralizados por ${durSec}s y defensas reducidas un ${Math.round(bossShredPct * 100)}%.`, "purple");
        } else {
            systemNotify(`[Intención Asesina Nv.${sk.lvl}]: Aura de terror activa (Inmune a perder HP por ${durSec}s).`, "purple");
        }
    } else if (skillId === 'rulers_touch') {
        let dmg = 70 + (sk.lvl * 25) + (hasJewel ? 30 : 0);
        if (typeof activeDungeon !== 'undefined' && activeDungeon) {
            if (waitingForValidation) {
                clashBossHP = Math.max(0, clashBossHP - dmg);
                updateClashUI();
                if (clashBossHP <= 0) finishBossClash();
            } else {
                raidTimeLeft = Math.max(2, raidTimeLeft - (8 + sk.lvl * 3));
                updateRaidTimerUI();
            }
            if (typeof rollLootDrop === "function") rollLootDrop(false);
            pushRaidLog(`[TOQUE DEL GOBERNANTE Nv.${sk.lvl}] Telequinesis aplasta la sala y atrae botín del vacío.`, "#7dd3fc");
        } else {
            if (p.activeExpedition && Date.now() >= p.activeExpedition.endsAt && typeof claimInfantryExpedition === "function") {
                claimInfantryExpedition();
            }
            let gGain = 15 + (sk.lvl * 5);
            p.gold += gGain;
            if (typeof rollLootDrop === "function") rollLootDrop(false);
            systemNotify(`[Toque del Gobernante Nv.${sk.lvl}]: Telequinesis atrajo +${gGain} G y 1 objeto del vacío a tu Bolsa.`, "gold");
        }
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof syncRaidVitalsUI === "function") syncRaidVitalsUI();
    let skModal = document.getElementById('hunter-skills-modal');
    if (skModal && skModal.style.display === 'flex') openHunterSkillsModal();
};

window.openHunterSkillsModal = function() {
    ensureHunterSkills();
    let modal = document.getElementById('hunter-skills-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'hunter-skills-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    let now = Date.now();
    const buildRow = (k) => {
        let meta = HUNTER_SKILLS_META[k];
        let sk = p.hunterSkills[k];
        let isMax = sk.lvl >= meta.maxLvl;
        let pct = isMax ? 100 : Math.min(100, Math.floor(((sk.xp || 0) / Math.max(1, sk.maxXp || 5)) * 100));
        let cdRem = (sk.cdUntil && now < sk.cdUntil) ? Math.ceil((sk.cdUntil - now) / 1000) : 0;

        let actBtn = '';
        if (meta.type === 'active') {
            actBtn = `<button class="btn ${cdRem > 0 ? 'btn-blue' : 'btn-main'}" style="width:100%; margin-top:6px; padding:7px !important; font-size:0.72em !important;" onclick="castHunterSkill('${k}')">${cdRem > 0 ? `ENFRIAMIENTO (${cdRem}s)` : `ACTIVAR HABILIDAD (-${meta.mpCost} MP)`}</button>`;
        }

        return `
        <div style="background:rgba(3,10,24,0.92); border:1px solid rgba(125,211,252,0.4); border-left:3px solid ${meta.type === 'active' ? '#00e5ff' : '#818cf8'}; padding:10px 12px; margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span style="color:#ffffff; font-weight:700; font-size:0.9em;">${meta.name} <span style="color:#7dd3fc;">Nv.${sk.lvl}/${meta.maxLvl}</span></span>
                <span style="font-family:'Share Tech Mono', monospace; font-size:0.68em; color:#94a3b8;">${isMax ? 'MAESTRÍA MÁX' : `DOMINIO: ${sk.xp}/${sk.maxXp}`}</span>
            </div>
            <div class="bar-wrap" style="height:4px; margin-bottom:6px;">
                <div class="bar-fill xp-bar" style="width:${pct}%;"></div>
            </div>
            <div style="font-size:0.78em; color:#cbd5e1; line-height:1.4;">${meta.desc(sk.lvl)}</div>
            ${actBtn}
        </div>`;
    };

    let passivesHtml = ['longevity', 'tenacity', 'dagger_mastery'].map(buildRow).join('');
    let activesHtml  = ['sprint', 'vital_strike', 'bloodlust', 'rulers_touch'].map(buildRow).join('');

    modal.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:420px; width:100%; max-height:85vh; overflow-y:auto;">
            <div class="sl-anime-box-header" style="margin-bottom:10px;">
                <div class="sl-anime-excl-box"><div class="sl-anime-excl-circle">!</div></div>
                <div class="sl-anime-title-box">HABILIDADES</div>
            </div>
            <div style="font-family:'Share Tech Mono', monospace; font-size:0.75em; color:#7dd3fc; text-align:center; margin-bottom:10px;">
                MANÁ DISPONIBLE: <b>${Math.floor(p.mp || 0)} MP</b>
            </div>
            <div style="text-align:left;">
                <div style="font-family:'Exo 2', sans-serif; font-size:0.78em; font-weight:700; color:#e0f2fe; letter-spacing:1.5px; margin:6px 0;">[ HABILIDADES ACTIVAS DEL CAZADOR ]</div>
                ${activesHtml}
                <div style="font-family:'Exo 2', sans-serif; font-size:0.78em; font-weight:700; color:#a5b4fc; letter-spacing:1.5px; margin:12px 0 6px 0;">[ HABILIDADES PASIVAS ]</div>
                ${passivesHtml}
            </div>
            <button class="btn btn-red" style="width:100%; margin-top:10px;" onclick="closeModal('hunter-skills-modal')">CERRAR HABILIDADES</button>
        </div>
    `;
    modal.style.display = 'flex';
};
 /* ==========================================================================
   4. MOTOR ACÚSTICO DE TELEMETRÍA Y AIRE HOLOGRÁFICO (CERO NOTAS MUSICALES)
   ========================================================================== */
let _whiteNoiseBuf = null;

function _unlockAudioContext() {
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
    }
}
['pointerdown', 'touchstart', 'keydown'].forEach(ev => {
    window.addEventListener(ev, _unlockAudioContext, { passive: true });
});

function _getRawNoise() {
    if (!audioCtx) return null;
    if (_whiteNoiseBuf) return _whiteNoiseBuf;
    const len = audioCtx.sampleRate;
    _whiteNoiseBuf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const data = _whiteNoiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return _whiteNoiseBuf;
}

function _airSwipe(now, fStart, fEnd, dur, vol = 0.08, qVal = 1.6) {
    const buf = _getRawNoise();
    if (!buf) return;
    const src = audioCtx.createBufferSource();
    src.buffer = buf;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(qVal, now);
    filter.frequency.setValueAtTime(fStart, now);
    filter.frequency.exponentialRampToValueAtTime(fEnd, now + dur);

    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(vol, now + dur * 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(filter);
    filter.connect(g);
    g.connect(audioCtx.destination);
    src.start(now);
    src.stop(now + dur + 0.01);
}

function _subThump(now, fStart, fEnd, dur, vol = 0.16, delay = 0) {
    const t = now + delay;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(fStart, t);
    osc.frequency.exponentialRampToValueAtTime(fEnd, t + dur);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.01);
}

function _holoChime(now, freq1, freq2, dur, vol = 0.045, type = 'triangle', delay = 0) {
    const t = now + delay;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq1, t);
    osc.frequency.exponentialRampToValueAtTime(freq2, t + dur);

    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.01);
}

const _sfxPool = {};
function playSystemSound(type = 'info', fromNotification = false) {
    if (document.hidden) return;
    _unlockAudioContext();

    let audioFileName = 'system-notification.mp3';
    if (type === 'monarch_awakening' || type === 'dungeon_major' || type === 'gold' || type === 'success') {
        audioFileName = 'system-levelup.mp3';
    } else if (type === 'type' || type === 'step_arrow') {
        audioFileName = 'notification-clic.mp3';
    }

    try {
        let sfx = _sfxPool[audioFileName];
        if (!sfx) {
            sfx = new Audio('sounds/' + audioFileName);
            sfx.preload = 'auto';
            _sfxPool[audioFileName] = sfx;
        }
        sfx.volume = (type === 'type') ? 0.35 : 0.85;
        sfx.currentTime = 0;
        sfx.play().catch(() => {});
    } catch (e) {}
}

/* ==========================================================================
   5. FUNCIONES AUXILIARES Y CÁLCULO DE EVASIÓN (AGI)
   ========================================================================== */
function formatTime(mins) {
    let h = Math.floor(mins / 60); 
    let m = Math.floor(mins % 60);
    return `${h}h ${m}m`;
}

function sysLog(msg) {
    const el = document.getElementById('sys-message');
    if(!el) return;
    el.style.opacity = 0;
    setTimeout(() => { el.innerText = msg; el.style.opacity = 1; }, 300);
}

function getRequiredXpForLevel(lvl) {
    // Curva del Manhwa (Nivel 1 al 146 alcanzable): Niv 1 = 100 XP, Niv 40 = 800 XP, Niv 100 = 1880 XP
    return Math.floor(100 + ((Math.max(1, lvl) - 1) * 18));
}

function migrateToManhwaXpCurve() {
    if (!p || p.xpCurveMigratedV5) return;

    // 1. Calcular toda la EXP histórica que ya ganaste con la curva vieja (1.35x)
    let totalEarnedXp = Math.max(0, Math.floor(p.xp || 0));
    let simulatedOldMax = 150;
    for (let i = 1; i < (p.level || 1); i++) {
        totalEarnedXp += simulatedOldMax;
        simulatedOldMax = Math.floor(simulatedOldMax * 1.35);
    }

    // 2. Recalcular tu Nivel Real con la nueva curva del Manhwa
    let oldLvl = p.level || 1;
    let newLvl = 1;
    let remXp = totalEarnedXp;
    while (remXp >= getRequiredXpForLevel(newLvl)) {
        remXp -= getRequiredXpForLevel(newLvl);
        newLvl++;
    }

    p.xpCurveMigratedV5 = true;
    p.level = Math.max(oldLvl, newLvl);
    p.xp = remXp;
    p.maxXp = getRequiredXpForLevel(p.level);

    if (p.level > oldLvl) {
        let diff = p.level - oldLvl;
        p.crystals = (p.crystals || 0) + (diff * 2);
        setTimeout(() => {
            if (typeof systemNotify === "function") {
                systemNotify(`⚡ REAJUSTE CANON DEL SISTEMA: Tus ${totalEarnedXp} EXP acumulados han actualizado tu rango del Nivel ${oldLvl} al NIVEL ${p.level} (+${diff * 2} CM).`, "gold");
            }
            if (typeof updateHUD === "function") updateHUD();
        }, 900);
    }
    saveData();
}

function _hasEq(itemId) {
    if (typeof hasEquippedItem === "function") return hasEquippedItem(itemId);
    if (!p || !p.equipment) return false;
    return Object.values(p.equipment).some(it => it && it.id === itemId);
}

function getHunterDodgeChance() {
    if (!p || !p.stats) return 0;
    let dodge = Math.floor((p.stats.agi - 1) * 8);
    if (_hasEq("eq_w_goblin")) dodge += 8;
    if (_hasEq("eq_w_bow")) dodge += 12;
    if (_hasEq("eq_w_baruka")) dodge += 18;
    if (_hasEq("eq_b_mid")) dodge += 6;
    if (_hasEq("eq_b_shadow")) dodge += 15;
    if (_hasEq("eq_a_assassin")) dodge += 20;
    if (_hasEq("eq_a_beru")) dodge += 22;
    if (_hasEq("eq_acc_wolf")) dodge += 8;
    if (p.adrenalineDodgeUntil && Date.now() < p.adrenalineDodgeUntil) dodge += 15;
    if (p._arcEclipseActive && Date.now() < p._arcEclipseActive) dodge += 20;

        if (p.sp <= 0) dodge = Math.floor(dodge * 0.5);
    return Math.max(0, Math.min(65, dodge));
}

function isMercyActive() {
    return !!(p && p.mercyUntil && Date.now() < p.mercyUntil);
}

/* ==========================================================================
   6. CHEQUEO DIARIO BIOLÓGICO (5:00 AM, RACHAS, RESACA Y BONO CIRCADIANO)
   ========================================================================== */
function checkDaily(forcedDayStr = null) {
    let evalDayStr = forcedDayStr || getBiologicalDayStr();

    if (p.lastLogin !== evalDayStr) {
        let yestDay = new Date(p.lastLogin).getDay();

        if (typeof getTodayMissions === "function") {
            let expMissions = getTodayMissions(yestDay).length;
            let compMissions = p.completedToday ? p.completedToday.length : 0;

            if (compMissions >= expMissions && expMissions > 0) {
                p.perfectDays++;
                if (p.contractActive === p.lastLogin) {
                    p.contractActive = null;
                    p.gold += 250;
                    p.crystals = (p.crystals || 0) + 2;
                    if (typeof systemNotify === "function") {
                        systemNotify("¡Contrato de Sangre cumplido al cierre del día! +250 G y +2 CM.", "gold");
                    }
                }
                if (typeof systemNotify === "function") {
                    systemNotify(`Racha Perfecta: ${p.perfectDays} días invicto.`, "gold");
                }
            } else if (p.streakShieldActive === p.lastLogin || p.vigilProtectedDay === p.lastLogin) {
                let wasVigil = (p.vigilProtectedDay === p.lastLogin);
                p.streakShieldActive = null;
                p.vigilProtectedDay = null;
                p.contractActive = null;
                if (typeof systemNotify === "function") {
                    systemNotify(wasVigil
                        ? "Pase de Vigilia Nocturna completado: Tu Racha Perfecta fue resguardada tras tu regreso nocturno."
                        : "Decreto de Soberanía consumido: Tu Racha Perfecta fue protegida anoche sin recibir daño.", "gold");
                }
            } else {
                if (p.contractActive === p.lastLogin) {
                    p.contractActive = null;
                    p.hp -= 50;
                    if (typeof systemNotify === "function") {
                        systemNotify("Violación del Contrato de Sangre del Arquitecto: -50 HP.", "danger");
                    }
                }
                let missed = expMissions - compMissions;
                if (missed > 0 && compMissions > 0) {
                    p.hp -= (missed * 15);
                    if (typeof systemNotify === "function") {
                        systemNotify(`Castigo: Dejaste ${missed} misiones inconclusas ayer.`, "danger");
                    }
                }
                if (p.hp <= 0) {
                    triggerDeath("Fallo acumulado en la rutina obligatoria diaria o Contrato de Sangre.", "routine");
                }
                p.perfectDays = 0;
            }
        }

        let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
        p.hp = Math.max(1, maxH);
        p.sp = 100;
        p.arcticShield = 0;
        p.sleepingUntilMorning = null;
        p.sleepModeActivatedAt = null;
        p.sleepActiveUsageSecs = 0;
        p.nightPassActive = null;

        if (p.titles && p.titles.some(t => t.id === "t_demon_hunter")) {
            p.hp = Math.min(maxH, p.hp + 5);
        }

        // Etapa 1 o Etapa 4 al amanecer (5:00 AM): Bono Circadiano vs Resaca del Sistema (normal o x2 por trampa)
        if (p.sleepCheatNextMorning) {
            p.sleepCheatNextMorning = false;
            p.sleepDebt = false;
            p.earlySleepBonusPending = false;
            p.hp = Math.max(15, Math.floor(maxH * 0.25));
            p.sp = 20;
            p.mp = Math.floor((p.mp || 0) * 0.25);
            if (typeof systemNotify === "function") {
                systemNotify("RESACA DOBLE POR ENGAÑO (x2): Rompiste el Modo Hibernación anoche. Amaneces con 25% HP, 80 de Fatiga y -75% MP.", "danger");
            }
        } else if (p.sleepDebt) {
            let hasSteelTitle = p.titles && p.titles.some(t => t.id === "t_adversity");
            p.hp = Math.min(p.hp, Math.floor(maxH * (hasSteelTitle ? 0.65 : 0.50)));
            p.sp = hasSteelTitle ? 55 : 40;
            p.mp = Math.floor((p.mp || 0) * (hasSteelTitle ? 0.65 : 0.50));
            p.sleepDebt = false;
            p.earlySleepBonusPending = false;
            if (typeof systemNotify === "function") {
                systemNotify("Resaca del Sistema: Te acostaste después del toque de queda (10:00 PM). HP, SP y MP reducidos.", "danger");
            }
        } else if (p.earlySleepBonusPending) {
            p.earlySleepBonusPending = false;
            p.arcticShield = Math.min(800, (p.arcticShield || 0) + 35);
            p.circadianXpBuffUntil = Date.now() + 3600000;
            if (typeof systemNotify === "function") {
                systemNotify("SINCRONIZACIÓN CIRCADIANA: Dormiste antes de las 9:30 PM. Amaneces con 100% HP, 0 Fatiga, +35 Escudo y +10% EXP por 1 Hora.", "gold");
            }
        }

        p.completedToday = [];
        p.activeMissions = {};
        p.studyCompletedToday = false;
        p.lastLogin = evalDayStr;
        p.lunchRegen = 0;
        p.intBlockedUntil = null;
        p.spDiscountUntil = null;
        p.extractionBuffUntil = null;
        p.mercyActive = null;

        if (typeof eventDB !== "undefined" && Math.random() <= 0.70) {
            let evDesc = eventDB[Math.floor(Math.random() * eventDB.length)];
            p.activeEvent = { id: "ev_" + Date.now(), title: "Incursión Sorpresa", desc: evDesc, xp: 60, gold: 30 };
            if (typeof systemNotify === "function") {
                systemNotify("Anomalía detectada en el radar.", "info");
            }
        } else {
            p.activeEvent = null;
        }

        if (!p.inventory.some(i => i.id === "lunch_ticket")) {
            p.inventory.push({
                id: "lunch_ticket",
                icon: "🥗",
                title: "Cupón de Almuerzo",
                desc: "Regenera 40 SP de forma pausada. Válido únicamente de 11:15 AM a 2:15 PM.",
                rank: "B",
                type: "item"
            });
        }

        let currDOW = getBiologicalDateObj().getDay();
        if (currDOW === 0 && p.lastSunday !== evalDayStr) {
            p.lastSunday = evalDayStr;
            let isDeluxe = (p.perfectDays >= 5 && Math.random() <= 0.25);
            p.inventory.push({
                id: isDeluxe ? "box_deluxe" : "box_week",
                icon: isDeluxe ? "🎁" : "📦",
                title: isDeluxe ? "Cofre del Monarca Semanal" : "Suministros de Cazador",
                desc: isDeluxe ? "Botín legendario de Rango S." : "Botín básico de Rango B.",
                rank: isDeluxe ? "S" : "B",
                type: "box"
            });

            let currentPasses = p.inventory.filter(i => i.id === "work_pass").length;
            let passesToGive = Math.max(0, Math.min(2, 3 - currentPasses));
            for (let k = 0; k < passesToGive; k++) {
                p.inventory.push({
                    id: "work_pass",
                    icon: "🎫",
                    title: "Sello de Exención Laboral",
                    desc: "Salvoconducto oficial de la Asociación: Úsalo en un día entre semana que no te toque trabajar. Sella al instante tu Jornada Operativa (y Ruta Los Chorros) sin gastar SP ni exigir tiempo, protegiendo tu Racha Perfecta.",
                    rank: "A",
                    type: "item"
                });
            }

            if (typeof systemNotify === "function") {
                systemNotify(isDeluxe ? "¡Cofre del Monarca y 2 Sellos de Exención Laboral recibidos!" : "Suministros Semanales y 2 Sellos de Exención Laboral recibidos.", "gold");
            }
        }
    }

    if (!p.workPassSeededV4) {
        p.workPassSeededV4 = true;
        for (let k = 0; k < 2; k++) {
            p.inventory.push({
                id: "work_pass",
                icon: "🎫",
                title: "Sello de Exención Laboral",
                desc: "Salvoconducto oficial de la Asociación: Úsalo en un día entre semana que no te toque trabajar. Sella al instante tu Jornada Operativa (y Ruta Los Chorros) sin gastar SP ni exigir tiempo, protegiendo tu Racha Perfecta.",
                rank: "A",
                type: "item"
            });
        }
    }

    if (typeof _evalArcCalendarHook === "function") _evalArcCalendarHook();
    saveData();
}

/* ==========================================================================
   7. MOTOR DE ZONAS (Radar Físico)
   ========================================================================== */
function checkCurrentZone(h, day) {
    let isWorkingHours = (day >= 1 && day <= 5) && (h >= 8 && h < 16);
    if (isWorkingHours && p.currentZone === "Base") {
        p.currentZone = "SunTrader";
    } else if (!isWorkingHours && p.currentZone === "SunTrader") {
        p.currentZone = "Base";
    }
}

/* ==========================================================================
   8. SISTEMA DE MUERTE, ARMADURA DE MANÁ DE ASHBORN Y MIN BYUNG-GYU
   ========================================================================== */
let pendingDeathReason = "";
let pendingDeathSource = "routine";

function triggerDeath(reason, source = "routine") {
    if (p.penaltyActive) return;
    let currentDayStr = new Date().toDateString();
    let bioDayStr = getBiologicalDayStr();

    if (typeof _evalArcDeathIntercept === "function" && _evalArcDeathIntercept(reason, source)) {
        return;
    }

    if (_hasEq("eq_a_ashborn") && (p.mp || 0) >= 700) {
        p.mp -= 700;
        p.hp = 40;
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof syncRaidVitalsUI === "function") syncRaidVitalsUI();
        if (typeof systemNotify === "function") {
            systemNotify("¡MANTO DE ASHBORN! Las sombras absorbieron el golpe letal usando -350 MP. Vida anclada en 40 HP.", "purple");
        }
        return;
    }

    if (p.phoenixFeatherActive === bioDayStr || p.phoenixFeatherActive === currentDayStr) {
        p.phoenixFeatherActive = null;
        p.hp = 50;
        p.sp = 50;
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof systemNotify === "function") {
            systemNotify("¡PLUMA DEL FÉNIX ACTIVADA! Has renacido de las cenizas con 50 HP sin perder oro.", "gold");
        }
        return;
    }

    if (activeDungeon && p.shadowArmy && p.shadowArmy.min && p.shadowArmy.min.unlocked && !p.shadowArmy.min.usedForever) {
        clearInterval(raidTimer);
        clearInterval(validationTimer);
        clearInterval(clashInterval);
        pendingDeathReason = reason;
        pendingDeathSource = "dungeon";
        let rescueBox = document.getElementById('raid-min-rescue');
        if (rescueBox) {
            rescueBox.style.display = 'block';
            if (typeof playSystemSound === "function") playSystemSound('danger');
            return;
        }
    }

    executeFinalDeath(reason, source);
}

function confirmAcceptDeath() {
    let rescueBox = document.getElementById('raid-min-rescue');
    if (rescueBox) rescueBox.style.display = 'none';
    executeFinalDeath(pendingDeathReason || "Colapso en Mazmorra.", pendingDeathSource || "dungeon");
}

function executeFinalDeath(reason, source = "routine") {
    p.history.deaths++;
    let goldPenalty = Math.floor(p.gold * 0.5);
    p.history.goldLost += goldPenalty;
    p.gold -= goldPenalty;

    p.hp = 0;
    p.sp = 0;
    p.perfectDays = 0;
    p.penaltyActive = true;
    p.deathSource = source;
    document.body.classList.add('penalty-active');

    if (activeDungeon) {
        stopBiomeCanvas();
        let dungeonOverlay = document.getElementById('dungeon-overlay');
        if (dungeonOverlay) dungeonOverlay.style.display = 'none';

        let btnReturn = document.getElementById('btn-return-dungeon');
        if (btnReturn) btnReturn.remove();

        activeDungeon = null;
        clearInterval(raidTimer);
        clearInterval(validationTimer);
        clearInterval(clashInterval);
        if (typeof systemNotify === "function") systemNotify("Incursión abortada por colapso vital.", "danger");
    }

    let isSupremeSet = (_hasEq("eq_w_kamish") && _hasEq("eq_a_ashborn") && _hasEq("eq_acc_black_heart"));
    let soldierRate = _hasEq("eq_acc_metus") ? 0.015 : 0.01;
    let availSoldiers = (typeof getAvailableInfantryCount === "function") ? getAvailableInfantryCount('soldiers') : 0;
    let soldierReduction = availSoldiers * soldierRate;
    let breakChance = isSupremeSet ? 0 : Math.max(0.15, 0.50 - soldierReduction);

    if (p.inventory.length > 0 && Math.random() < breakChance) {
        let idx = Math.floor(Math.random() * p.inventory.length);
        let item = p.inventory.splice(idx, 1)[0];
        p.history.itemsBroken++;
        if (typeof systemNotify === "function") {
            systemNotify(`Castigo Crítico: El artefacto [${item.title}] se destruyó en el colapso.`, "danger");
        }
    }

    if (typeof systemNotify === "function") {
        systemNotify(`COLAPSO: ${reason}`, "danger");
    }

    let overlay = document.getElementById('damage-overlay');
    if (overlay) overlay.style.display = 'block';

    saveData();
    if (typeof switchTab === "function") switchTab('routine', 0);
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderBosses === "function") renderBosses();
}

/* ==========================================================================
   9. DRENAJE Y RECARGA DE MANÁ EN TIEMPO REAL (CONECTADO A LAS 7 RANURAS)
   ========================================================================== */
function startMpRealtimeLoop() {
    if (window.mpAmbientLoop) clearInterval(window.mpAmbientLoop);

    window.mpAmbientLoop = setInterval(() => {
        if (!p || p.penaltyActive) return;
        if (typeof ensureShadowStructure === "function") ensureShadowStructure();

        let nowMs = Date.now();
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let isNightWindow = (h === 21 && m >= 30) || h >= 22 || h < 4;

        let isSupremeSet = (_hasEq("eq_w_kamish") && _hasEq("eq_a_ashborn") && _hasEq("eq_acc_black_heart"));

        let maxNormalSlots = (typeof getMaxShadowSlots === "function") ? getMaxShadowSlots() : 1;
        if (p.imperialMarchUntil && nowMs >= p.imperialMarchUntil) {
            p.imperialMarchUntil = null;
            if (p.equippedShadows && p.equippedShadows.length > maxNormalSlots) {
                p.equippedShadows = p.equippedShadows.slice(0, maxNormalSlots);
                Object.keys(p.shadowArmy).forEach(k => {
                    if (p.shadowArmy[k]) p.shadowArmy[k].active = p.equippedShadows.includes(k);
                });
                saveData();
                if (typeof updateHUD === "function") updateHUD();
                if (typeof systemNotify === "function") {
                    systemNotify("El tiempo límite de [Marcha Imperial] (3 Horas) ha expirado. Tus Comandantes extra han regresado al vacío.", "info");
                }
            }
        }

        let drainPerMin = 0;
        let activeCount = p.equippedShadows ? p.equippedShadows.length : 0;
        if (p.equippedShadows && typeof COMMANDERS_META !== "undefined") {
            p.equippedShadows.forEach(cmdId => {
                if (!COMMANDERS_META[cmdId]) return;
                if (cmdId === 'tank' && !isNightWindow && !activeDungeon && activeCount <= 3) return;
                if (cmdId === 'igris' && _hasEq('eq_a1')) return;
                drainPerMin += COMMANDERS_META[cmdId].mpDrain;
            });
        }

                let intDiscount = Math.min(0.35, Math.max(0, ((p.stats ? p.stats.int : 1) - 1) * 0.04));
        if (_hasEq("eq_a_archlich")) drainPerMin *= 0.60;
        if (_hasEq("eq_a_ashborn")) drainPerMin *= 0.45;
        drainPerMin = drainPerMin * (1 - intDiscount);

        if (activeCount >= 4) {
            drainPerMin = Math.max(135, drainPerMin * 0.90);
        } else if (activeCount === 3) {
            drainPerMin = drainPerMin * 0.95;
        } else {
            drainPerMin = drainPerMin * 0.85;
        }
        drainPerMin = +(drainPerMin).toFixed(1);

        if (p.halfMpDrainUntil && nowMs < p.halfMpDrainUntil) drainPerMin = +(drainPerMin * 0.5).toFixed(1);
        if (p.zeroMpDrainUntil && nowMs < p.zeroMpDrainUntil) drainPerMin = 0;

        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        let mageMult = _hasEq("eq_acc_metus") ? 7.5 : 5;
        let mageCount = (typeof getAvailableInfantryCount === "function") ? getAvailableInfantryCount('mages') : 0;
        let restingBonus = (activeCount === 0 && mageCount > 0) ? 1.5 : 1.0;
        let minBlessingMult = (p.shadowArmy && p.shadowArmy.min && p.shadowArmy.min.usedForever) ? 1.10 : 1.0;
        let mageRegenPerMin = +(mageCount * mageMult * restingBonus * minBlessingMult).toFixed(1);

        // Escalado lógico de Reliquias de Maná (Rango B -> SS)
        if (_hasEq("eq_a_mage_b"))        mageRegenPerMin += 35;
        if (_hasEq("eq_h_shadow"))        mageRegenPerMin += 40;
        if (_hasEq("eq_r_mage"))          mageRegenPerMin += 60;
        if (_hasEq("eq_acc_chalice"))     mageRegenPerMin += 90;
            if (_hasEq("eq_acc_black_heart")) mageRegenPerMin += 700 + Math.floor(maxMP * 0.03);
        if (isSupremeSet)                 mageRegenPerMin += 200;
        mageRegenPerMin = +(mageRegenPerMin).toFixed(1);

        let netPerMin = +(mageRegenPerMin - drainPerMin).toFixed(1);
        currentNetMpPerMin = netPerMin;

        if (!document.hidden) {
            let rateEl = document.getElementById('mp-drain-rate');
            if (rateEl) {
                if (netPerMin < 0) {
                    rateEl.innerText = `(${netPerMin} MP/m)`;
                    rateEl.style.color = '#bae6fd';
                } else if (netPerMin > 0) {
                    rateEl.innerText = `(+${netPerMin} MP/m • Magos)`;
                    rateEl.style.color = '#7dd3fc';
                } else {
                    rateEl.innerText = `(0 MP/m)`;
                    rateEl.style.color = 'var(--text-muted)';
                }
            }
        }

        if (netPerMin !== 0) {
            let deltaPerTick = netPerMin / 60;
            p.mp = Math.max(0, Math.min(maxMP, (p.mp !== undefined ? p.mp : 0) + deltaPerTick));

            if (p.mp <= 0 && p.equippedShadows && p.equippedShadows.length > 0) {
                p.mp = 0;
                if (typeof _evalArcMpZeroHook === "function" && _evalArcMpZeroHook()) {
                    return;
                }
                p.equippedShadows = [];
                Object.keys(p.shadowArmy).forEach(k => { if (p.shadowArmy[k]) p.shadowArmy[k].active = false; });
                saveData();
                if (typeof updateHUD === "function") updateHUD();
                if (activeDungeon) renderMiniArenaUnits();
                if (typeof systemNotify === "function") {
                    systemNotify("¡NÚCLEO DE MANÁ AGOTADO! Tus Comandantes han regresado a la sombra. Recluta Magos de Sombra para recargar tu MP.", "danger");
                }
                return;
            }
        }

        if (!document.hidden) {
            if (typeof animateMPDisplayTo === "function") {
                animateMPDisplayTo(p.mp, maxMP);
            }
            if (activeDungeon && typeof syncRaidVitalsUI === "function") {
                syncRaidVitalsUI();
            }
        }
    }, 1000);
}

/* ==========================================================================
   10. PROGRESIÓN NOCTURNA DE 4 ETAPAS, VIGILIA (MÁX 11:20 PM) Y ANTI-TRAMPA 10M
   ========================================================================== */
let lastEvaluatedClockMin = -1;

function isSleepingNow(now = new Date()) {
    if (!p || !p.sleepingUntilMorning) return false;
    return p.sleepingUntilMorning === getBiologicalDayStr(now);
}
window.isSleepingNow = isSleepingNow;

function isNightVigilActiveNow(now = new Date()) {
    if (!p || !p.nightPassActive) return false;
    let bioDay = getBiologicalDayStr(now);
    if (p.nightPassActive !== bioDay) return false;

    let h = now.getHours();
    let m = now.getMinutes();
    let continuousMins = (h < 5 ? h + 24 : h) * 60 + m;
    if (continuousMins >= (23 * 60 + 20) && (h >= 20 || h < 5)) {
        return false;
    }
    return true;
}
window.isNightVigilActiveNow = isNightVigilActiveNow;

function animateHPFastDrop(targetHP, maxHealth, onZeroCallback) {
    if (window.hpFastDropTimer) clearInterval(window.hpFastDropTimer);
    let diff = p.hp - targetHP;
    if (diff <= 0.05) {
        p.hp = Math.max(0, targetHP);
        if (p.hp <= 0 && typeof onZeroCallback === "function") onZeroCallback();
        return;
    }

    let steps = 25;
    let dropStep = diff / steps;
    let count = 0;

    let hpBar = document.getElementById('hp-bar');
    if (hpBar) hpBar.style.boxShadow = '0 0 22px #ff0033';

    window.hpFastDropTimer = setInterval(() => {
        if (!p || p.penaltyActive) {
            clearInterval(window.hpFastDropTimer);
            return;
        }
        p.hp = Math.max(0, p.hp - dropStep);
        count++;

        if (hpBar) hpBar.style.width = `${Math.max(0, Math.min(100, (p.hp / maxHealth) * 100))}%`;
        let hpText = document.getElementById('hp-text');
        if (hpText) hpText.innerText = `${p.hp.toFixed(1)}/${maxHealth}`;
        if (typeof activeDungeon !== 'undefined' && activeDungeon && typeof syncRaidVitalsUI === "function") {
            syncRaidVitalsUI();
        }

        if (count >= steps || p.hp <= targetHP) {
            clearInterval(window.hpFastDropTimer);
            p.hp = Math.max(0, +(targetHP).toFixed(2));
            if (hpBar) hpBar.style.boxShadow = '';
            if (typeof updateHUD === "function") updateHUD();
            if (typeof saveData === "function") saveData();
            if (p.hp <= 0 && typeof onZeroCallback === "function") {
                onZeroCallback();
            }
        }
    }, 35);
}

function restoreMonarchV1Compensation() {
    if (!p || p.monarchV1Restored) return;
    p.monarchV1Restored = true;
    // Si es una cuenta nueva (Nivel 1 sin muertes previas), iniciar en 0 G limpios
    if ((p.level || 1) <= 1 && (!p.history || !p.history.deaths)) {
        saveData();
        return;
    }
    if (p.economyScaledX100 && !p.economyRevertedTo1x) {
        p.economyRevertedTo1x = true;
        p.gold = Math.max(50, Math.round((p.gold || 0) / 100));
        if (p.history && p.history.goldLost) p.history.goldLost = Math.round(p.history.goldLost / 100);
    }
    let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let refundGold = (p.history && p.history.goldLost > 0) ? Math.min(1200, Math.max(150, Math.floor(p.history.goldLost * 0.5))) : 200;
    p.gold = (p.gold || 0) + refundGold;
    if (p.history && p.history.deaths > 0) p.history.deaths--;

    p.penaltyActive = false;
    p.deathSource = null;
    p.sleepDebt = false;
    p.hp = maxH;
    p.sp = 100;
    document.body.classList.remove('penalty-active');
    let overlay = document.getElementById('damage-overlay');
    if (overlay) overlay.style.display = 'none';
    saveData();
}


function getWeekStampKey(d = new Date()) {
    let onejan = new Date(d.getFullYear(), 0, 1);
    let week = Math.ceil((((d.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    return `${d.getFullYear()}_W${week}`;
}

function ensureNightVigilQuota() {
    if (!p) return 0;
    let curWeek = getWeekStampKey(getBiologicalDateObj());
    if (p.nightVigilWeekKey !== curWeek) {
        p.nightVigilWeekKey = curWeek;
        p.nightVigilUsesLeft = 2;
        saveData();
    }
    if (p.nightVigilUsesLeft === undefined) p.nightVigilUsesLeft = 2;
    return p.nightVigilUsesLeft;
}

window.openNightVigilModal = function() {
    if (!p) return;
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let continuousMins = (h < 5 ? h + 24 : h) * 60 + m;

    if ((h >= 20 || h < 5) && continuousMins >= (23 * 60 + 20)) {
        return systemNotify("Ya pasan de las 11:20 PM. El Pase de Vigilia solo cubre hasta las 11:20 PM; activa el Modo Hibernación y ve a descansar.", "danger");
    }

    let usesLeft = ensureNightVigilQuota();
    if (isNightVigilActiveNow(now)) {
        return systemNotify("Ya tienes el Pase de Vigilia Nocturna activo hoy (válido hasta las 11:20 PM).", "info");
    }
    if (usesLeft <= 0) {
        return systemNotify("Has agotado tus 2 Pases de Vigilia Nocturna de esta semana. Se recargarán la próxima semana.", "danger");
    }

    let ov = document.getElementById('sl-vigil-pass-overlay');
    if (!ov) {
        let cornerSVG = (typeof getBaroqueCornerSVG === "function") ? getBaroqueCornerSVG() : '';
        ov = document.createElement('div');
        ov.id = 'sl-vigil-pass-overlay';
        ov.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,18,0.96); z-index:13800; display:flex; justify-content:center; align-items:center; padding:18px; will-change:opacity;'; 
        ov.innerHTML = `
            <div class="sl-holo-frame monarch-purple sl-fast-modal" style="width:100%; max-width:410px; cursor:default;">
                <div class="sl-holo-rail top"><span class="rail-core"></span></div>
                <div class="sl-holo-glass">
                    <div class="sl-holo-inner-box" style="padding:20px 16px; text-align:center;">
                        <span class="sl-baroque-corner tl">${cornerSVG}</span>
                        <span class="sl-baroque-corner tr">${cornerSVG}</span>
                        <span class="sl-baroque-corner bl">${cornerSVG}</span>
                        <span class="sl-baroque-corner br">${cornerSVG}</span>
                        <div class="sl-holo-header-row" style="margin-bottom:6px;">
                            <div class="sl-excl-square">!</div>
                            <div class="sl-title-rect">PASE DE VIGILIA NOCTURNA</div>
                        </div>
                        <div class="sl-holo-subbracket" id="vigil-quota-subbracket" style="letter-spacing:1px;">[SALVOCONDUCTO SEMANAL: ${usesLeft}/2 DISPONIBLES]</div>
                        <p style="color:#e9d5ff; font-size:0.88em; line-height:1.45; margin-bottom:12px;">
                            Autorización especial para noches en que regresas tarde (El Boquerón / Santa Tecla) y necesitas tiempo para cenar y ordenar hasta las <b>11:20 PM</b>:
                        </p>
                        <div style="text-align:left; background:rgba(16,4,34,0.92); border:1px solid #c084fc; padding:10px 12px; font-size:0.8em; color:#f3e8ff; line-height:1.5; margin-bottom:12px;">
                            <div>• <b style="color:#39ff14;">PROTECCIÓN HASTA LAS 11:20 PM:</b> Congela el sangrado de las 9:15 PM y la corrosión de las 10:00 PM hasta las 11:20 PM.</div>
                            <div>• <b style="color:#00e5ff;">MISIONES AL 100%:</b> Te permite sellar misiones antes de las 11:20 PM cobrando 100% EXP y Oro.</div>
                            <div>• <b style="color:#f0abfc;">SIN RESACA SI DUERMES A TIEMPO:</b> Activa el Modo Hibernación antes de las 11:20 PM para amanecer con 0 Resaca y Racha intacta.</div>
                        </div>
                        <select id="vigil-reason-select" class="input-dark" style="margin-bottom:12px; font-size:0.86em; border-color:#c084fc;">
                            <option value="Regreso tarde desde El Boquerón / Salida con Erika">Regreso tarde (El Boquerón / Santa Tecla / Erika)</option>
                            <option value="Cena tardía, orden del cuarto y descanso">Cena tardía, ordenar cuarto y descanso</option>
                            <option value="Compromiso universitario o jornada extendida">Compromiso universitario / laboral nocturno</option>
                        </select>
                        <div style="display:flex; gap:8px;">
                            <button class="btn btn-blue" style="flex:1;" onclick=\"const _v=document.getElementById('sl-vigil-pass-overlay'); if(_v){ _v.querySelector('.sl-holo-frame')?.classList.add('holo-closing'); setTimeout(()=>_v.remove(), 220); }\">CANCELAR</button>
                            <button class="btn btn-purple" style="flex:1.5;" onclick="confirmActivateNightVigil()">ACTIVAR HASTA 11:20 PM</button>
                        </div>
                    </div>
                </div>
                <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
            </div>
        `;
        document.body.appendChild(ov);
    } else {
        let subEl = document.getElementById('vigil-quota-subbracket');
        if (subEl) subEl.innerText = `[SALVOCONDUCTO SEMANAL: ${usesLeft}/2 DISPONIBLES]`;
    }
    ov.style.display = 'flex';
};

window.confirmActivateNightVigil = function() {
    ensureNightVigilQuota();
    if (p.nightVigilUsesLeft <= 0) return;

    let sel = document.getElementById('vigil-reason-select');
    let reason = sel ? sel.value : "Motivo justificado";
    let bioDayStr = getBiologicalDayStr();

    p.nightVigilUsesLeft = Math.max(0, p.nightVigilUsesLeft - 1);
    p.nightPassActive = bioDayStr;
    p.vigilProtectedDay = bioDayStr;
    p._vigilExpiredNotifiedDay = null;
    p.sleepDebt = false;

    let ov = document.getElementById('sl-vigil-pass-overlay');
    if (ov) ov.style.display = 'none';

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderRoutine === "function") renderRoutine();
    systemNotify(`Pase de Vigilia Nocturna activado [${reason}]. Tienes hasta las 11:20 PM sin sangrado ni castigo para cenar, sellar misiones y dormir (${p.nightVigilUsesLeft}/2 restantes esta semana).`, "purple");
};


function activateNightSleepMode() {
    if (!p) return;
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let bioDayStr = getBiologicalDayStr(now);

    if (h >= 5 && h < 20) {
        systemNotify("El Modo Hibernación Nocturna solo puede activarse a partir de las 8:00 PM.", "info");
        return;
    }

    p.sleepingUntilMorning = bioDayStr;
    p.sleepModeActivatedAt = Date.now();
    p.sleepActiveUsageSecs = 0;

    let minsNow = (h < 5 ? h + 24 : h) * 60 + m;
    let effectiveCurfewMins = 22 * 60;
    if (p.tankCurfewDelayDay === bioDayStr) effectiveCurfewMins += 45;
    if (p.nightPassActive === bioDayStr || p.movieNightCurfewDay === bioDayStr) effectiveCurfewMins = 23 * 60 + 20;
    if (isMercyActive()) effectiveCurfewMins = 26 * 60;

    if (minsNow <= (21 * 60 + 30)) {
        p.earlySleepBonusPending = true;
        p.sleepDebt = false;
    } else if (minsNow < effectiveCurfewMins) {
        p.sleepDebt = false;
    } else {
        p.sleepDebt = true;
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderStatusRadarProfile === "function") renderStatusRadarProfile();

    let debtWarning = p.sleepDebt
        ? " (Te acostaste después del toque de queda: el drenaje se detiene hoy, pero la Resaca de mañana permanece activa)."
        : " (Tienes 10 minutos de gracia para apagar la pantalla; si sigues usando el Sistema después de 10 min, se revocará con castigo x2).";
    systemNotify("MODO HIBERNACIÓN ACTIVADO: Drenaje nocturno congelado hasta las 5:00 AM" + debtWarning, "purple");
}

function wakeUpFromSleepMode() {
    if (!p) return;
    let now = new Date();
    let h = now.getHours();
    if (h < 5 || h >= 21) {
        if (!confirm("ADVERTENCIA: Aún es horario nocturno. Si rompes tu Modo Hibernación ahora, perderás la protección nocturna y comenzará el desgaste. ¿Despertar de todos modos?")) {
            return;
        }
    }
    p.sleepingUntilMorning = null;
    p.sleepModeActivatedAt = null;
    p.sleepActiveUsageSecs = 0;
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderStatusRadarProfile === "function") renderStatusRadarProfile();
    systemNotify("Has salido del Modo Hibernación.", "info");
}

function triggerSleepCheatPenalty(bioDayStr) {
    p.sleepingUntilMorning = null;
    p.earlySleepBonusPending = false;
    p.sleepModeActivatedAt = null;
    p.sleepActiveUsageSecs = 0;
    p.sleepCheatDoubleDay = bioDayStr;
    p.sleepCheatNextMorning = true;
    p.sleepDebt = true;

    p.hp = Math.max(10, +(p.hp - 20).toFixed(1));
    p.sp = Math.max(0, p.sp - 20);

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderStatusRadarProfile === "function") renderStatusRadarProfile();
    if (typeof systemNotify === "function") {
        systemNotify("ALERTA DE ENGAÑO: Activaste el Modo Hibernación pero sigues despierto utilizando el Sistema. Protección revocada y efectos secundarios de desvelo DUPLICADOS (x2).", "danger");
    }
}

document.addEventListener('pointerdown', (e) => {
    if (!p || !isSleepingNow()) return;
    if (e.target && e.target.closest('[onclick*="wakeUpFromSleepMode"]')) return;
    if (p.sleepModeActivatedAt && (Date.now() - p.sleepModeActivatedAt > 600000)) {
        triggerSleepCheatPenalty(getBiologicalDayStr());
    }
}, { passive: true });

function evaluateNightCurfew(isClockJump = false) {
    if (!p) return;
    restoreMonarchV1Compensation();
    if (p.penaltyActive) return;

    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let bioDayStr = getBiologicalDayStr(now);

    if (h >= 5 && h < 20) return;

    if (isSleepingNow(now)) {
        if (!document.hidden && (h >= 20 || h < 5)) {
            let elapsedSinceActivated = p.sleepModeActivatedAt ? (Date.now() - p.sleepModeActivatedAt) : 0;
            if (elapsedSinceActivated > 600000) {
                p.sleepActiveUsageSecs = (p.sleepActiveUsageSecs || 0) + 2;
                if (p.sleepActiveUsageSecs >= 16) {
                    triggerSleepCheatPenalty(bioDayStr);
                }
            }
        }
        return;
    }

    let continuousMins = (h < 5 ? (h + 24) : h) * 60 + m + (s / 60);

    if (p.nightPassActive === bioDayStr && continuousMins >= (23 * 60 + 20) && p._vigilExpiredNotifiedDay !== bioDayStr) {
        p._vigilExpiredNotifiedDay = bioDayStr;
        saveData();
        if (typeof renderRoutine === "function") renderRoutine();
        if (typeof systemNotify === "function") {
            systemNotify("11:20 PM // PASE DE VIGILIA EXPIRADO: Tu tiempo extra nocturno ha concluido. Activa el Modo Hibernación ahora mismo para evitar el desgaste y la Resaca.", "danger");
        }
    }

    if (isNightVigilActiveNow(now) || (p.stealthModeUntil && Date.now() < p.stealthModeUntil)) return;

    let startBleedMins = 21 * 60 + 15;
    if (p.tankCurfewDelayDay === bioDayStr) startBleedMins += 45;
    if (p.nightPassActive === bioDayStr || p.movieNightCurfewDay === bioDayStr) startBleedMins = 23 * 60 + 20;
    if (isMercyActive()) startBleedMins = 26 * 60;

    if (continuousMins < startBleedMins || (h >= 5 && h < 21)) return;

    let cheatMult = (p.sleepCheatDoubleDay === bioDayStr) ? 2 : 1;
    let maxHealth = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;

    let todayMissions = (typeof getTodayMissions === "function") ? getTodayMissions() : [];
    let completedArr = Array.isArray(p.completedToday) ? p.completedToday : [];
    let missedCount = Math.max(0, todayMissions.filter(ms => !completedArr.includes(ms.id)).length);

    let corrosionStartMins = (p.nightPassActive === bioDayStr || p.movieNightCurfewDay === bioDayStr)
        ? (23 * 60 + 20)
        : (startBleedMins + 45);

    if (continuousMins < corrosionStartMins) {
        if (missedCount <= 0) return;

        if (p._bleedPenalty915Day !== bioDayStr) {
            p._bleedPenalty915Day = bioDayStr;
            saveData();
            if (typeof renderRoutine === "function") renderRoutine();
            if (typeof systemNotify === "function") {
                systemNotify(`[MISIÓN DIARIA INCOMPLETA]: Tienes ${missedCount} misión(es) pendiente(s). Ha comenzado el desangrado gradual de advertencia; séllalas o hiberna antes de las 10:00 PM.`, "danger");
            }
        }

        let progress = Math.max(0, Math.min(1, ((continuousMins - startBleedMins) / 45) * cheatMult));
        let targetFloor = cheatMult > 1 ? 25 : 45;
        let expectedHP = maxHealth - ((maxHealth - targetFloor) * progress);
        if (p.cryoBuffUntil && now.getTime() < p.cryoBuffUntil) {
            expectedHP = maxHealth - ((maxHealth - expectedHP) * 0.5);
        }
        if (p.hp > expectedHP) {
            p.hp = +(expectedHP).toFixed(1);
            if (typeof updateHUD === "function") updateHUD();
        }
        return;
    }

    p.sleepDebt = true;

    let tankObj = (p.shadowArmy && p.shadowArmy.tank) ? p.shadowArmy.tank : null;
    let tankReady = p.equippedShadows && p.equippedShadows.includes('tank') && tankObj && (!tankObj.cooldownUntil || now.getTime() > tankObj.cooldownUntil) && (tankObj.usesLeft > 0);

    if (tankReady && p.tankUsedNightStr !== bioDayStr) {
        p.tankUsedNightStr = bioDayStr;
        tankObj.usesLeft = Math.max(0, (tankObj.usesLeft !== undefined ? tankObj.usesLeft : 2) - 1);
        if (typeof systemNotify === "function") {
            systemNotify(`Tank activó su Pelaje Ártico por esta noche: Pérdida de oro bloqueada y vida anclada (Guardias: ${tankObj.usesLeft}/2).`, "purple");
        }
        if (tankObj.usesLeft <= 0) tankObj.hibernationPending = true;
    }

    let fiveMinBlock = Math.floor((continuousMins - corrosionStartMins) / 5);
    if (p._lastCorrosionBlockDay !== bioDayStr) {
        p._lastCorrosionBlockDay = bioDayStr;
        p._lastCorrosionBlockIdx = -1;
        if (typeof renderRoutine === "function") renderRoutine();
    }

    if (fiveMinBlock > (p._lastCorrosionBlockIdx !== undefined ? p._lastCorrosionBlockIdx : -1)) {
        p._lastCorrosionBlockIdx = fiveMinBlock;

        let hpLoss = (tankReady ? 2.5 : 5) * cheatMult;
        let spLoss = 5 * cheatMult;
        if (p.cryoBuffUntil && now.getTime() < p.cryoBuffUntil) hpLoss *= 0.5;

        let minAllowedHp = (continuousMins < 24 * 60) ? (tankReady ? 25 : 5) : 0;
        p.hp = Math.max(minAllowedHp, +(p.hp - hpLoss).toFixed(1));
        p.sp = Math.max(0, p.sp - spLoss);

        let goldBurned = 0;
        if (!tankReady && p.gold > 10) {
            goldBurned = Math.max(1, Math.floor(p.gold * 0.03 * cheatMult));
            p.gold = Math.max(0, p.gold - goldBurned);
        } else if (tankReady && p.hp <= 25 && tankObj.hibernationPending) {
            tankObj.cooldownUntil = Date.now() + (24 * 3600000);
            tankObj.usesLeft = 2;
            tankObj.hibernationPending = false;
            p.equippedShadows = p.equippedShadows.filter(x => x !== 'tank');
        }

        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof renderRoutine === "function") renderRoutine();

        if (p.hp <= 0) {
            p.hp = 0;
            if (typeof triggerDeath === "function") {
                triggerDeath("Colapso biológico por desvelo extremo pasada la medianoche.", "midnight");
            }
            return;
        }

        if (typeof systemNotify === "function") {
            systemNotify(`CORROSIÓN NOCTURNA${cheatMult > 1 ? ' (x2 POR ENGAÑO)' : ''}: -${hpLoss} HP, +${spLoss} Fatiga${goldBurned > 0 ? ' y -' + goldBurned + ' G quemados' : ''}. Activa Hibernación y ve a dormir.`, "danger");
        }
    }
}

function startCurfewClockWatcher() {
    if (window.curfewWatchInterval) clearInterval(window.curfewWatchInterval);
    window.curfewWatchInterval = setInterval(() => {
        if (!p || p.penaltyActive) return;
        let now = new Date();
        let curMinStamp = now.getHours() * 60 + now.getMinutes();
        let jumped = (lastEvaluatedClockMin !== -1 && curMinStamp !== lastEvaluatedClockMin);
        lastEvaluatedClockMin = curMinStamp;
        evaluateNightCurfew(jumped);
    }, 2000);
}



function systemTick() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let bioDayStr = getBiologicalDayStr(now);

    if (p.lastLogin !== bioDayStr) {
        if (typeof checkDaily === "function") checkDaily(bioDayStr);
    }

    if (typeof checkCurrentZone === "function") checkCurrentZone(h, now.getDay());
    if (typeof _evalArcTickHook === "function") _evalArcTickHook(now, h, m);

    evaluateNightCurfew(false);

    let maxHealth = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let isNightBleed = ((h === 21 && m >= 15) || h >= 22 || h < 5) && !isNightVigilActiveNow(now) && !isSleepingNow(now);

    if (!p.penaltyActive && !isNightBleed && p.hp < maxHealth) {
        // Pasiva del Cazador: Voluntad de Recuperación (+2 HP/hora por nivel)
        let longLvl = (p.hunterSkills && p.hunterSkills.longevity) ? p.hunterSkills.longevity.lvl : 1;
        let passiveRegen = +((longLvl * 2) / 60).toFixed(2);
        p.hp = Math.min(maxHealth, +(p.hp + passiveRegen).toFixed(2));
    }

    if (!p.penaltyActive && p.equippedShadows && p.equippedShadows.includes('beru')) {
        if (!isNightBleed && p.hp < maxHealth) {
            p.hp = Math.min(maxHealth, +(p.hp + 2).toFixed(1));
        }
        if (p.sp < 100) {
            p.sp = Math.min(100, p.sp + 2);
        }
        if (!document.hidden && typeof updateHUD === "function") updateHUD();
    }

    if (typeof evaluatePomodoroBackgroundTick === "function") {
        evaluatePomodoroBackgroundTick();
    }
    if (typeof evaluateInfantryExpeditions === "function") {
        evaluateInfantryExpeditions();
    }

    if (p.lunchRegen > 0) {
        let heal = Math.min(4, p.lunchRegen);
        p.sp = Math.min(100, p.sp + heal);
        p.lunchRegen -= heal;
        if (typeof systemNotify === "function") systemNotify(`Absorbiendo nutrientes: +${heal} SP`, "stamina");
        if (!document.hidden && typeof updateHUD === "function") updateHUD();
    }

    if (typeof checkFissureSpawn === "function") checkFissureSpawn();
    if (typeof saveData === "function") saveData();
}

/* ==========================================================================
   11. INICIALIZACIÓN MAESTRA Y FORZADO DE CUARENTENA
   ========================================================================== */
function initializeSystem() {
    if (!p.dayZeroCompleted) {
        if (typeof startDayZeroPrologue === "function") {
            startDayZeroPrologue();
        } else {
            window.addEventListener('load', () => {
                if (typeof startDayZeroPrologue === "function") startDayZeroPrologue();
            }, { once: true });
        }
        return;
    }

    if (!p.dayZeroCompleted) {
        if (typeof startDayZeroPrologue === "function") {
            startDayZeroPrologue();
            return;
        }
    }

    if (typeof ensureSevenSlotEquipment === "function") {
        ensureSevenSlotEquipment();
    } else if (!p.equipment) {
        p.equipment = { head: null, chest: null, gloves: null, necklace: null, weapon: null, ring: null, boots: null };
    }
    if (p.mp === undefined) p.mp = 0;
    if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0, rankSSS: 0 };
    if (!p._arcFlags) p._arcFlags = {};
    if (typeof ensureShadowStructure === "function") ensureShadowStructure();

    if (!p.isInit) {
        p.mp = 0;
        p.equippedShadows = [];
        if (p.shadowArmy && p.shadowArmy.igris) p.shadowArmy.igris.active = false;

        p.inventory.push({
            id: "box_start",
            icon: "🎁",
            title: "Caja de Despertar",
            desc: "Contiene provisiones básicas para el nuevo jugador.",
            rank: "B",
            type: "box"
        });
        p.inventory.push({
            id: "lunch_ticket",
            icon: "🥗",
            title: "Cupón de Almuerzo",
            desc: "Uso de 11:15 AM a 2:15 PM. Regenera 40 SP.",
            rank: "B",
            type: "item"
        });
        p.isInit = true;
        saveData();
    }
    if (p.inventory) {
        p.inventory.forEach(it => {
            if (it.id === "lunch_ticket") it.desc = "Regenera 40 SP de forma pausada. Válido únicamente de 11:15 AM a 2:00 PM.";
        });
    }
    migrateToManhwaXpCurve();
    checkDaily();

    if (p.penaltyActive) {
        document.body.classList.add('penalty-active');
        if (typeof switchTab === "function") switchTab('routine', 0);
    }

    if (typeof updateHUD === "function") updateHUD();
    if (typeof updateEquipmentUI === "function") updateEquipmentUI();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderBosses === "function") renderBosses();
    if (typeof renderShop === "function") renderShop();
    if (typeof renderInventory === "function") renderInventory();
    if (typeof renderSchedules === "function") renderSchedules();

    startMpRealtimeLoop();
    startCurfewClockWatcher();
    systemTick();
    setInterval(systemTick, 60000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem);
} else {
    initializeSystem();
}

/* ==========================================================================
   12. MOTOR GRÁFICO <CANVAS> A 60 FPS (PARTÍCULAS Y VECTORES POR UNIVERSO)
   ========================================================================== */
let biomeAnimFrame = null;
let biomeParticles = [];

function stopBiomeCanvas() {
    if (biomeAnimFrame) {
        cancelAnimationFrame(biomeAnimFrame);
        biomeAnimFrame = null;
    }
}

function initBiomeCanvas(biome) {
    stopBiomeCanvas();
    const canvas = document.getElementById('biome-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.onresize = resize;

    biomeParticles = [];
    let count = 55;
    if (biome === 'gore' || biome === 'tower') count = 75;
    if (biome === 'star-stream') count = 65;

    for (let i = 0; i < count; i++) {
        biomeParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.8 + 0.2,
            angle: Math.random() * Math.PI * 2
        });
    }

let tick = 0;
    function renderLoop() {
        if (document.hidden || window._ultCinematicActive) {
            biomeAnimFrame = requestAnimationFrame(renderLoop);
            return;
        }
        tick++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (biome === 'trap-grid') {
            ctx.strokeStyle = 'rgba(255, 170, 0, 0.18)';
            ctx.lineWidth = 1;
            let step = 45;
            let offset = (tick * 1.2) % step;
            for (let y = offset; y < canvas.height; y += step) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
            for (let x = 0; x < canvas.width; x += step) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
        }

        biomeParticles.forEach((pt, i) => {
            ctx.save();
            if (biome === 'gore') {
                ctx.strokeStyle = `rgba(255, 15, 15, ${pt.alpha})`;
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(pt.x, pt.y + 22); ctx.stroke();
                pt.y += pt.speedY * 7;
                if (pt.y > canvas.height) { pt.y = -20; pt.x = Math.random() * canvas.width; }
            } 
            else if (biome === 'tower') {
                ctx.strokeStyle = `rgba(220, 240, 255, ${pt.alpha * 0.6})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(pt.x, pt.y + 35); ctx.stroke();
                pt.y -= pt.speedY * 6;
                if (pt.y < -40) { pt.y = canvas.height + 20; pt.x = Math.random() * canvas.width; }
            }
            else if (biome === 'star-stream') {
                ctx.fillStyle = (i % 3 === 0) ? `rgba(255, 215, 0, ${pt.alpha})` : `rgba(0, 210, 255, ${pt.alpha})`;
                ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
                pt.x += pt.speedX * 0.3; pt.y -= pt.speedY * 0.25;
                if (pt.y < 0) pt.y = canvas.height;
                if (pt.x < 0) pt.x = canvas.width;
                if (pt.x > canvas.width) pt.x = 0;

                for (let j = i + 1; j < biomeParticles.length; j++) {
                    let p2 = biomeParticles[j];
                    let dist = Math.hypot(pt.x - p2.x, pt.y - p2.y);
                    if (dist < 85) {
                        ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - dist / 85) * 0.22})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                    }
                }
            }
            else if (biome === 'ghoul') {
                let isRC = i % 2 === 0;
                ctx.fillStyle = isRC ? `rgba(255, 0, 55, ${pt.alpha})` : `rgba(160, 160, 160, ${pt.alpha * 0.5})`;
                ctx.shadowBlur = isRC ? 12 : 0; ctx.shadowColor = '#ff0033';
                ctx.beginPath(); ctx.arc(pt.x, pt.y, isRC ? pt.size * 1.4 : pt.size * 0.8, 0, Math.PI * 2); ctx.fill();
                pt.y -= pt.speedY * 0.8; pt.x += Math.sin(tick * 0.03 + i) * 0.6;
                if (pt.y < -10) { pt.y = canvas.height + 10; pt.x = Math.random() * canvas.width; }
            }
            else if (biome === 'abyss') {
                ctx.fillStyle = (i % 4 === 0) ? `rgba(255, 0, 85, ${pt.alpha})` : `rgba(168, 85, 247, ${pt.alpha * 0.7})`;
                ctx.shadowBlur = 15; ctx.shadowColor = '#ff0055';
                ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size * 1.3, 0, Math.PI * 2); ctx.fill();
                pt.y -= pt.speedY * 1.1; pt.x += Math.cos(tick * 0.02 + i) * 0.8;
                if (pt.y < -10) { pt.y = canvas.height + 10; }
            }
            else if (biome === 'shrine') {
                ctx.fillStyle = (i % 5 === 0) ? `rgba(255, 153, 0, ${pt.alpha})` : `rgba(0, 216, 255, ${pt.alpha})`;
                ctx.fillRect(pt.x, pt.y, pt.size * 1.5, pt.size * 1.5);
                pt.y -= pt.speedY * 0.6;
                if (pt.y < 0) pt.y = canvas.height;
            }
            else if (biome === 'paranormal') {
                ctx.fillStyle = (tick % 20 < 10) ? `rgba(0, 255, 204, ${pt.alpha})` : `rgba(255, 0, 200, ${pt.alpha})`;
                ctx.fillRect(pt.x, pt.y, pt.size * 4, 2);
                pt.x += (Math.random() - 0.5) * 8; pt.y += (Math.random() - 0.5) * 8;
            }
            else if (biome === 'retro-mobile') {
                ctx.fillStyle = `rgba(74, 222, 128, ${pt.alpha * 0.5})`;
                ctx.fillRect(Math.floor(pt.x / 8) * 8, Math.floor(pt.y / 8) * 8, 6, 6);
                pt.y += pt.speedY * 0.5;
                if (pt.y > canvas.height) pt.y = 0;
            }
            else {
                let color = `rgba(0, 210, 255, ${pt.alpha})`;
                if (biome === 'fire' || biome === 'groove-st') color = `rgba(255, 110, 0, ${pt.alpha})`;
                if (biome === 'ice') color = `rgba(180, 255, 255, ${pt.alpha})`;
                if (biome === 'poison' || biome === 'toxic') color = `rgba(57, 255, 20, ${pt.alpha})`;
                if (biome === 'blood-demon' || biome === 'void') color = `rgba(192, 132, 252, ${pt.alpha})`;

                ctx.fillStyle = color;
                ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2); ctx.fill();
                pt.y -= pt.speedY * 0.7;
                if (pt.y < 0) pt.y = canvas.height;
            }
            ctx.restore();
        });

        biomeAnimFrame = requestAnimationFrame(renderLoop);
    }

    renderLoop();
}
/* ==========================================================================
   13. MOTOR NARRATIVO MASIVO, VARIABLES DE RAID Y AVATAR ANATÓMICO DE JINWOO
   ========================================================================== */
let activeDungeon = null;
let currentPhase = 0;
let raidTimer = null; 
let raidTimeLeft = 0; 
let phaseInitialSecs = 60;
let waitingForValidation = false;
let validationTimer = null;
let clashInterval = null;
let clashBossHP = 100;
let clashBossMaxHP = 100;

let pendingSequenceQueue = [];
let recentNarrativeHistory = [];

const BIOME_TROPHIES = {
    'ice': ["el casco congelado de un Elfo de Hielo", "un carámbano gigante asegurando que es una lanza legendaria", "la barba escarchada de un oso polar"],
    'retro-mobile': ["una resortera de madera rota de Angry Birds", "un casco abollado de cerdito verde", "un frasco vacío de elixir rosa de Clash of Clans"],
    'groove-st': ["un bate metálico de los Ballas", "la bolsa del pedido número 9 de Big Smoke", "un trozo oxidado de los rieles del tren de Los Santos"],
    'shrine': ["el tornillo ancestral oxidado de un Guardián de Hyrule", "una semilla Kolog que huele bastante dudoso", "un escudo de viajero partido a la mitad"],
    'ghoul': ["una máscara rota del Distrito 20", "las pinzas metálicas retorcidas de Yamori", "una taza de café intacta de Anteiku"],
    'blood-demon': ["un boleto perforado del Tren Infinito", "el tambor roto de un demonio menor", "una rama de glicina chamuscada"],
    'paranormal': ["unos lentes rotos de Okarun", "el fragmento de un maniquí anatómico", "una pieza de chatarra alienígena Serpo"],
    'gore': ["el picaporte arrancado del Piso 8 del Hotel", "una cadena de motosierra oxidada", "un casco espacial vacío del Demonio de la Oscuridad"],
    'star-stream': ["un micrófono flotante que le arrebató a un Dokkaebi", "un cartel de patrocinio roto de las Constelaciones", "el boleto del vagón 3407"],
    'tower': ["un abanico de seda del piso aristocrático", "una espada rota del culto demoníaco de Murim", "una teja imperial del Piso 10"],
    'abyss': ["una rama torcida de la 4ta Capa jurando que es una Reliquia de Primer Grado", "un silbato blanco lleno de lodo abisal", "el casco vacío de un rezador de Bondrewd"],
    'poison': ["el colmillo goteante de una serpiente del pantano", "una bota derretida por el ácido de Kasaka"],
    'toxic': ["un saxofón abollado del Callejón Evadare", "un sombrero fedora agujereado"],
    'fire': ["una piedra hirviendo que le está quemando el guantelete", "el fragmento de un tótem solar"],
    'trap-grid': ["un pincho de piedra arrancado de la pared", "el ojo de piedra del altar del mono"],
    'default': ["el cráneo de un Lycan de colmillos de acero", "una piedra común que brilla un poquito", "el cartel oxidado de la estación de metro"]
};

const BIOME_ENEMY_ICONS = {
    'ice': ['🧝‍♂️', '❄️', '🐺'],
    'retro-mobile': ['🐷', '🐉', '💣'],
    'groove-st': ['🟣', '🔫', '🚔'],
    'shrine': ['🤖', '👁️', '🐗'],
    'ghoul': ['🎭', '🩸', '🕷️'],
    'blood-demon': ['👹', '🩸', '🚂'],
    'paranormal': ['👽', '👵', '👻'],
    'gore': ['🪚', '🧟', '🩸'],
    'star-stream': ['👹', '✨', '🎭'],
    'tower': ['🥷', '🗡️', '🌹'],
    'abyss': ['👾', '🐙', '💀'],
    'poison': ['🐍', '🦎', '🧪'],
    'toxic': ['🎷', '🕶️', '☣️'],
    'fire': ['🔥', '🗿', '🌋'],
    'trap-grid': ['🗿', '⚙️', '🐉'],
    'default': ['🐺', '👹', '🕷️']
};

function toggleAbyssalFocus() {
    let ov = document.getElementById('dungeon-overlay');
    if (!ov) return;
    ov.classList.toggle('abyssal-focus');
}
window.toggleRaidFocusMode = toggleAbyssalFocus;
window.rescanRadarNodes = function() {
    if (typeof rescanRadarHorizon === "function") rescanRadarHorizon();
};

function getDeployedInfantryTypes() {
    if (!p || !p.infantry) return [];
    const order = ['soldiers', 'mages', 'bears', 'orcs', 'ants'];
    return order.filter(k => (p.infantry[k] || 0) > 0 && !(p.infantryDisabled && p.infantryDisabled[k]));
}

let arenaWaveState = {
    phaseKey: '',
    round: 1,
    vanHP: 100, vanMaxHP: 100,
    supHP: 65,  supMaxHP: 65,
    comboRunning: false
};

function getMiniEnemyScaling() {
    if (!activeDungeon) return { vanMax: 90, supMax: 60, atkDmg: 5 };
    const rankHpMult = { 'E': 1.0, 'D': 1.35, 'C': 1.85, 'B': 2.5, 'A': 3.4, 'S': 4.8, 'SSS': 6.8 };
    const rankBaseDmg = { 'E': 5, 'D': 7, 'C': 10, 'B': 14, 'A': 20, 'S': 28, 'SSS': 40 };

    let r = activeDungeon.rank || 'E';
    let minLvl = activeDungeon.minLevel || 1;
    let eqCount = Array.isArray(p.equippedShadows) ? p.equippedShadows.length : 0;
    let shadowScale = 1 + (eqCount * 0.30);
    let roundScale = 1 + ((arenaWaveState.round - 1) * 0.15);

    let vanMax = Math.round((80 + (minLvl * 3.2)) * (rankHpMult[r] || 1) * shadowScale * roundScale);
    let supMax = Math.round((55 + (minLvl * 2.2)) * (rankHpMult[r] || 1) * shadowScale * roundScale);
    let atkDmg = Math.round((rankBaseDmg[r] || 5) + Math.max(0, (minLvl - 1) * 0.22));

    return { vanMax, supMax, atkDmg };
}

function initOrResetArenaWave(isNewPhase = false) {
    if (!activeDungeon) return;
    let key = `${activeDungeon.id}_${currentPhase}`;
    if (isNewPhase || arenaWaveState.phaseKey !== key) {
        arenaWaveState.phaseKey = key;
        arenaWaveState.round = 1;
    }
    let sc = getMiniEnemyScaling();
    arenaWaveState.vanMaxHP = sc.vanMax;
    arenaWaveState.vanHP    = sc.vanMax;
    arenaWaveState.supMaxHP = sc.supMax;
    arenaWaveState.supHP    = sc.supMax;
    updateArenaEnemiesHUD();
}

function updateArenaEnemiesHUD() {
    let vBar = document.getElementById('van-hp-fill');
    let sBar = document.getElementById('sup-hp-fill');
    let vSlot = document.getElementById('arena-enemy-1');
    let sSlot = document.getElementById('arena-enemy-2');
    let wBadge = document.getElementById('arena-wave-badge');

    if (vBar) vBar.style.width = `${Math.max(0, Math.min(100, (arenaWaveState.vanHP / Math.max(1, arenaWaveState.vanMaxHP)) * 100))}%`;
    if (sBar) sBar.style.width = `${Math.max(0, Math.min(100, (arenaWaveState.supHP / Math.max(1, arenaWaveState.supMaxHP)) * 100))}%`;
    if (vSlot) vSlot.classList.toggle('enemy-dead-fade', arenaWaveState.vanHP <= 0);
    if (sSlot) sSlot.classList.toggle('enemy-dead-fade', arenaWaveState.supHP <= 0);
    if (wBadge) wBadge.innerText = `RONDA ${arenaWaveState.round}`;
}

function renderMiniArenaUnits() {
    let alliesStage = document.getElementById('arena-allies-stage') || document.getElementById('arena-allies');
    let enemiesStage = document.getElementById('arena-enemies-stage') || document.getElementById('arena-enemies');
    let arenaBox = document.getElementById('raid-mini-arena');
    if (!alliesStage || !enemiesStage || !activeDungeon) return;

    let key = `${activeDungeon.id}_${currentPhase}`;
    if (arenaWaveState.phaseKey !== key) {
        initOrResetArenaWave(true);
    }

    let cmdList = Array.isArray(p.equippedShadows) ? p.equippedShadows : [];
    let alliesHtml = '';

    if (cmdList.length === 0) {
        let eqWeapon = (p && p.equipment && p.equipment.weapon) ? p.equipment.weapon : null;
        let weaponSvg = (eqWeapon && typeof getIconFor === "function")
            ? getIconFor(eqWeapon)
            : `<svg viewBox="0 0 64 64" fill="none" stroke="#00e5ff" stroke-width="2.2"><polygon points="32,8 48,20 42,50 22,50 16,20" fill="rgba(0,229,255,0.18)"/><path d="M22 28 L42 28 M26 36 L38 36" stroke="#ffffff"/></svg>`;
        let wTitle = eqWeapon ? eqWeapon.title.split('(')[0].trim() : 'Combate Marcial';

        alliesHtml = `
        <div class="pov-first-person-rig" id="arena-unit-hunter-pov">
            <div class="pov-weapon-holo">${weaponSvg}</div>
            <div style="text-align:left; font-family:'Share Tech Mono', monospace; line-height:1.2;">
                <div style="font-size:0.55em; color:#7dd3fc; letter-spacing:1px;">[1ª PERSONA // POV]</div>
                <div style="font-size:0.65em; color:#ffffff; font-weight:700; max-width:95px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${wTitle}</div>
            </div>
        </div>`;
            } else if (typeof getCommanderSVG === "function") {
                let count = cmdList.length;
                let unitSize = count >= 3 ? 74 : (count === 2 ? 80 : 86);
                let overlap = count >= 3 ? -26 : (count === 2 ? -18 : 0);

                // Formación en cuña 2.5D: la sombra central se eleva y las de los flancos se escalonan
                const staggers = count >= 3 ? [4, -8, 2] : (count === 2 ? [-4, 4] : [0]);
                const zIndices = count >= 3 ? [7, 6, 8] : (count === 2 ? [6, 7] : [6]);

                cmdList.forEach((cmdId, renderIdx) => {
                    let customSvg = getCommanderSVG(cmdId, 'walk');
                    let innerSvg = (cmdId === 'iron') ? `<div class="arena-mirror-x">${customSvg}</div>` : customSvg;
                    let offsetY = staggers[renderIdx] || 0;
                    let zIndex = zIndices[renderIdx] || (renderIdx + 5);

                    alliesHtml += `
                    <div class="arena-unit" id="arena-unit-${cmdId}" style="width:${unitSize}px; height:${unitSize}px; margin-left:${renderIdx === 0 ? 0 : overlap}px; z-index:${zIndex}; transform:translateY(${offsetY}px);">
                        ${innerSvg}
                    </div>`;
                });
            }

    alliesStage.innerHTML = alliesHtml;

    let b = activeDungeon.biome || 'default';
    enemiesStage.innerHTML = `
        <div class="mini-enemy-slot ${arenaWaveState.vanHP <= 0 ? 'enemy-dead-fade' : ''}" id="arena-enemy-1">
            <span class="mini-enemy-role-lbl">VANGUARDIA</span>
            <div style="width:48px; height:48px;">${getBiomeEnemyVectorSVG(b, false)}</div>
            <div class="mini-enemy-hp-track"><div class="mini-enemy-hp-fill" id="van-hp-fill" style="width:100%;"></div></div>
        </div>
        <div class="mini-enemy-slot ${arenaWaveState.supHP <= 0 ? 'enemy-dead-fade' : ''}" id="arena-enemy-2">
            <span class="mini-enemy-role-lbl">SOPORTE</span>
            <div style="width:38px; height:38px;">${getBiomeEnemyVectorSVG(b, true)}</div>
            <div class="mini-enemy-hp-track"><div class="mini-enemy-hp-fill support-bar" id="sup-hp-fill" style="width:100%;"></div></div>
        </div>
    `;

    if (arenaBox && !document.getElementById('arena-wave-badge')) {
        let wb = document.createElement('div');
        wb.id = 'arena-wave-badge';
        wb.className = 'arena-wave-badge';
        arenaBox.appendChild(wb);
    }
    updateArenaEnemiesHUD();
}

function applyAlliedStrikeToMiniEnemies(isComboSubHit = false) {
    if (!activeDungeon || waitingForValidation) return;
    let baseHit = 22 + Math.floor(((p.stats ? p.stats.str : 1) - 1) * 14);
    if (isComboSubHit) baseHit = Math.max(10, Math.floor(baseHit * 0.55));

    if (arenaWaveState.vanHP > 0) {
        arenaWaveState.vanHP = Math.max(0, arenaWaveState.vanHP - baseHit);
        let splash = Math.max(3, Math.floor(baseHit * 0.25));
        arenaWaveState.supHP = Math.max(1, arenaWaveState.supHP - splash);
    } else if (arenaWaveState.supHP > 0) {
        arenaWaveState.supHP = Math.max(0, arenaWaveState.supHP - Math.floor(baseHit * 1.15));
    }

    updateArenaEnemiesHUD();

    if (arenaWaveState.vanHP <= 0 && arenaWaveState.supHP <= 0 && raidTimeLeft > 2) {
        arenaWaveState.round++;
        setTimeout(() => {
            if (!activeDungeon || waitingForValidation) return;
            initOrResetArenaWave(false);
            let wBadge = document.getElementById('arena-wave-badge');
            if (wBadge) {
                wBadge.classList.remove('wave-up-flash');
                void wBadge.offsetWidth;
                wBadge.classList.add('wave-up-flash');
            }
        }, 420);
    }
}

function triggerMiniEnemyCounterPlay() {
    if (!activeDungeon || waitingForValidation) return;
    let enemy1 = document.getElementById('arena-enemy-1');
    let enemy2 = document.getElementById('arena-enemy-2');
    let tagEl = document.getElementById('arena-action-tag');
    let sc = getMiniEnemyScaling();

    let useSupport = (arenaWaveState.vanHP <= 0) || (arenaWaveState.supHP > 0 && Math.random() < 0.42);

    if (!useSupport && arenaWaveState.vanHP > 0) {
        if (enemy1) {
            enemy1.classList.remove('anim-enemy-lunge');
            void enemy1.offsetWidth;
            enemy1.classList.add('anim-enemy-lunge');
            setTimeout(() => { if (enemy1) enemy1.classList.remove('anim-enemy-lunge'); }, 650);
        }
        if (tagEl) tagEl.innerText = `VANGUARDIA ENEMIGA // ATAQUE DIRECTO (-${sc.atkDmg} HP)`;
        dealRaidDamage(sc.atkDmg, `La vanguardia de [${activeDungeon.title}] abatió tus defensas.`);
    } else if (arenaWaveState.supHP > 0) {
        let shouldHeal = (arenaWaveState.vanHP > 0 && arenaWaveState.vanHP < arenaWaveState.vanMaxHP * 0.75 && Math.random() < 0.50);
        if (enemy2) {
            enemy2.classList.remove('anim-support-cast', 'anim-enemy-lunge');
            void enemy2.offsetWidth;
            enemy2.classList.add(shouldHeal ? 'anim-support-cast' : 'anim-enemy-lunge');
            setTimeout(() => { if (enemy2) enemy2.classList.remove('anim-support-cast', 'anim-enemy-lunge'); }, 650);
        }
        if (shouldHeal) {
            let healAmt = Math.max(12, Math.floor(arenaWaveState.vanMaxHP * 0.22));
            arenaWaveState.vanHP = Math.min(arenaWaveState.vanMaxHP, arenaWaveState.vanHP + healAmt);
            updateArenaEnemiesHUD();
            if (tagEl) tagEl.innerText = `SOPORTE ENEMIGO // CURACIÓN A VANGUARDIA (+${healAmt} HP)`;
        } else {
            if (tagEl) tagEl.innerText = `SOPORTE ENEMIGO // DISPARO ARCANO (-${sc.atkDmg} HP)`;
            dealRaidDamage(sc.atkDmg, `El soporte enemigo de [${activeDungeon.title}] perforó tu guardia.`);
        }
    }
}

function triggerArenaChoreography(forcedActor = null, isComboSubHit = false, comboBadgeTxt = '') {
    if (!activeDungeon || waitingForValidation) return;

    let arenaBox = document.getElementById('raid-mini-arena');
    let fxLayer = document.getElementById('arena-fx-layer');
    let tagEl = document.getElementById('arena-action-tag');
    let enemy1 = document.getElementById('arena-enemy-1');
    let enemy2 = document.getElementById('arena-enemy-2');

    let wId = (p && p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let cmdList = Array.isArray(p.equippedShadows) ? p.equippedShadows : [];

    // 25% de probabilidad de Ráfaga de Combo (3 a 6 impactos repartidos entre tus sombras o en solitario, sin spam en el chat)
    if (!isComboSubHit && !arenaWaveState.comboRunning && Math.random() < 0.25) {
        arenaWaveState.comboRunning = true;
        let totalHits = Math.floor(Math.random() * 4) + 3;
        let comboPool = cmdList.length > 0 ? cmdList : ['hunter'];

        for (let hIdx = 0; hIdx < totalHits; hIdx++) {
            setTimeout(() => {
                if (!activeDungeon || waitingForValidation) {
                    arenaWaveState.comboRunning = false;
                    return;
                }
                let actorForHit = comboPool[hIdx % comboPool.length];
                triggerArenaChoreography(actorForHit, true, `COMBO ${hIdx + 1}/${totalHits} // `);
                if (hIdx === totalHits - 1) {
                    arenaWaveState.comboRunning = false;
                }
            }, hIdx * 175);
        }
        return;
    }

    let actors = cmdList.length > 0 ? ['hunter', ...cmdList] : ['hunter'];
    let pick = (forcedActor && actors.includes(forcedActor)) ? forcedActor : actors[Math.floor(Math.random() * actors.length)];
    let unitEl = (pick === 'hunter')
        ? document.getElementById('arena-unit-hunter-pov')
        : document.getElementById(`arena-unit-${pick}`);

    let wMeta = (typeof getRelicInfo === "function" && wId) ? getRelicInfo(wId) : null;
    let hunterLabel = wMeta && wMeta.pose ? `CAZADOR (1ª PERSONA) // ${wMeta.pose.toUpperCase()}` : 'CAZADOR (1ª PERSONA) // CORTE DIRECTO';

    const choreographies = {
        'hunter': { anim: 'anim-lunge-slash', label: hunterLabel },
        'igris':  { anim: 'anim-crimson-wave', label: 'IGRIS // TAJO RELÁMPAGO CARMESÍ' },
        'tank':   { anim: 'anim-shield-quake', label: 'TANK // EMBESTIDA GLACIAL' },
        'iron':   { anim: 'anim-shield-quake', label: 'IRON // IMPACTO SÍSMICO DE BASTIÓN' },
        'tusk':   { anim: 'anim-dragon-breath', label: 'TUSK // CAÑÓN DEL DRAGÓN DE FUEGO' },
        'beru':   { anim: 'anim-beru-blitz', label: 'BERU // DEPREDACIÓN HIPERSÓNICA' }
    };

    let ch = choreographies[pick] || choreographies['hunter'];
    if (unitEl && ch.anim) {
        if (pick !== 'hunter' && typeof setCommanderAnim === "function") {
            setCommanderAnim(unitEl, 'attack', 480);
            setTimeout(() => setCommanderAnim(unitEl, 'walk'), 490);
        }
        unitEl.classList.remove('anim-dodge-step', 'anim-lunge-slash', 'anim-crimson-wave', 'anim-shield-quake', 'anim-dragon-breath', 'anim-beru-blitz');
        void unitEl.offsetWidth;
        unitEl.classList.add(ch.anim);
        setTimeout(() => { if (unitEl) unitEl.classList.remove(ch.anim); }, 550);
    }

    if (fxLayer) {
        fxLayer.innerHTML = getArenaAttackFX(pick);
        setTimeout(() => { if (fxLayer) fxLayer.innerHTML = ''; }, 520);
    }

    setTimeout(() => {
        if (arenaBox) {
            arenaBox.classList.remove('arena-hit-shake');
            void arenaBox.offsetWidth;
            arenaBox.classList.add('arena-hit-shake');
        }
        if (enemy1 && arenaWaveState.vanHP > 0) {
            enemy1.classList.remove('anim-enemy-hit');
            void enemy1.offsetWidth;
            enemy1.classList.add('anim-enemy-hit');
        }
        if (enemy2 && arenaWaveState.supHP > 0) {
            enemy2.classList.remove('anim-enemy-hit');
            void enemy2.offsetWidth;
            enemy2.classList.add('anim-enemy-hit');
        }
        applyAlliedStrikeToMiniEnemies(isComboSubHit);
    }, 130);

    if (tagEl) tagEl.innerText = comboBadgeTxt + ch.label;
}

function pushRaidLog(text, color = "#e2e8f0") {
    let logBox = document.getElementById('raid-battle-log');
    if (!logBox) return;

    let cleanText = (typeof stripAllSystemEmojis === "function") ? stripAllSystemEmojis(text) : text;
    let m = Math.floor(raidTimeLeft / 60);
    let s = raidTimeLeft % 60;
    let timeStamp = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;

    let div = document.createElement('div');
    div.className = 'log-entry';
    div.style.color = color;
    div.innerHTML = `<span style="color:var(--neon-main);">[${timeStamp}]</span> ${cleanText}`;

    logBox.prepend(div);
    while (logBox.children.length > 3) {
        logBox.removeChild(logBox.lastChild);
    }
}
function pickNonRepeating(arr) {
    let filtered = arr.filter(item => !recentNarrativeHistory.includes(item));
    if (filtered.length === 0) {
        recentNarrativeHistory = [];
        filtered = arr;
    }
    let chosen = filtered[Math.floor(Math.random() * filtered.length)];
    recentNarrativeHistory.push(chosen);
    if (recentNarrativeHistory.length > 15) recentNarrativeHistory.shift();
    return chosen;
}

function formatDialogueLine(rawText, trophy, dungTitle, phaseName) {
    return rawText
        .replace(/\{trophy\}/g, trophy)
        .replace(/\{dungeon\}/g, dungTitle)
        .replace(/\{phase\}/g, phaseName);
}

function applyMicroRewardsFromLog(text) {
    if (text.includes("+2 G")) { p.gold += 2; if (typeof updateHUD === "function") updateHUD(); }
    if (text.includes("+3 G")) { p.gold += 3; if (typeof updateHUD === "function") updateHUD(); }
    if (text.includes("+5 HP")) {
        let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
        p.hp = Math.min(maxHP, p.hp + 5);
    }
}

function generateNarrativeEvent() {
    if (!activeDungeon) return;

    if (_hasEq("eq_acc_kandiaru")) {
        let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
        p.hp = Math.min(maxHP, +(p.hp + 12).toFixed(1));
        p.sp = Math.min(100, p.sp + 8);
    }

    let b = activeDungeon.biome || 'default';
    let trophies = BIOME_TROPHIES[b] || BIOME_TROPHIES['default'];
    let randomTrophy = trophies[Math.floor(Math.random() * trophies.length)];
    let dungTitle = activeDungeon.title;
    let phaseName = activeDungeon.phases[currentPhase] ? activeDungeon.phases[currentPhase].name : "Sector Activo";

    if (pendingSequenceQueue.length > 0) {
        let nextStep = pendingSequenceQueue.shift();
        let formattedStep = formatDialogueLine(nextStep.text, randomTrophy, dungTitle, phaseName);
        applyMicroRewardsFromLog(formattedStep);
        pushRaidLog(formattedStep, nextStep.color || "#fde047");
        triggerArenaChoreography(nextStep.actor || null);
        return;
    }

    if (typeof DIALOGUE_BANK === 'undefined') return;

    let eq = p.equippedShadows || [];
    let count = eq.length;

    if (count === 0) {
        let raw = pickNonRepeating(DIALOGUE_BANK.solo);
        let line = formatDialogueLine(raw, randomTrophy, dungTitle, phaseName);
        applyMicroRewardsFromLog(line);
        pushRaidLog(line, "#bae6fd");
        triggerArenaChoreography('hunter');
        return;
    }

    if (count >= 3 && DIALOGUE_BANK.trios && Math.random() <= 0.72) {
        let pickedThree = [...eq].sort(() => Math.random() - 0.5).slice(0, 3);
        let trioKey = [...pickedThree].sort().join('_');
        if (DIALOGUE_BANK.trios[trioKey] && DIALOGUE_BANK.trios[trioKey].length > 0) {
            let entry = pickNonRepeating(DIALOGUE_BANK.trios[trioKey]);
            if (entry && entry.p1 && entry.p2 && entry.p3) {
                let text1 = formatDialogueLine(entry.p1, randomTrophy, dungTitle, phaseName);
                applyMicroRewardsFromLog(text1);
                pushRaidLog(text1, "#d8b4fe");
                triggerArenaChoreography(entry.a1 || pickedThree[0]);

                pendingSequenceQueue.push({ text: entry.p2, color: "#93c5fd", actor: entry.a2 || pickedThree[1] });
                pendingSequenceQueue.push({ text: entry.p3, color: "#fde047", actor: entry.a3 || pickedThree[2] });
                return;
            }
        }
    }

    if (count >= 2 && DIALOGUE_BANK.duos && Math.random() <= 0.68) {
        let shuffled = [...eq].sort(() => Math.random() - 0.5);
        let s1 = shuffled[0];
        let s2 = shuffled[1];
        let pairKey = [s1, s2].sort().join('_');

        if (DIALOGUE_BANK.duos[pairKey] && DIALOGUE_BANK.duos[pairKey].length > 0) {
            let entry = pickNonRepeating(DIALOGUE_BANK.duos[pairKey]);
            if (typeof entry === 'object' && entry.p1 && entry.p2) {
                let text1 = formatDialogueLine(entry.p1, randomTrophy, dungTitle, phaseName);
                applyMicroRewardsFromLog(text1);
                pushRaidLog(text1, "#c4b5fd");
                triggerArenaChoreography(entry.a1 || s1);
                pendingSequenceQueue.push({ text: entry.p2, color: "#fde047", actor: entry.a2 || s2 });
                return;
            }
        }
    }

    let activeCmd = eq[Math.floor(Math.random() * eq.length)];
    let cmdPool = (DIALOGUE_BANK.single && DIALOGUE_BANK.single[activeCmd]) ? DIALOGUE_BANK.single[activeCmd] : DIALOGUE_BANK.solo;
    let rawCmdLine = pickNonRepeating(cmdPool);
    let finalLine = formatDialogueLine(rawCmdLine, randomTrophy, dungTitle, phaseName);

    applyMicroRewardsFromLog(finalLine);
    pushRaidLog(finalLine, "#e2e8f0");
    triggerArenaChoreography(activeCmd);
}

function getBiomeBannerText(dung, phaseIdx) {
    let b = dung.biome || 'default';
    if (b === 'abyss') {
        const curses = [
            "CAPA 1-2 // MAREO Y NÁUSEAS LEVES AL ASCENDER",
            "CAPA 3 // VÉRTIGO Y ALUCINACIONES AUDITIVAS",
            "CAPA 4 // HEMORRAGIA INTERNA (-HP ACTIVO)",
            "CAPA 5 // PÉRDIDA TOTAL DE LOS SENTIDOS",
            "CAPA 6 // PUNTO SIN RETORNO: RIESGO DE PERDER LA HUMANIDAD"
        ];
        return curses[Math.min(phaseIdx, curses.length - 1)];
    }
    const labels = {
        'gore': 'PROTOCOLO CARMESÍ // DRENAJE DE SANGRE ACTIVO',
        'star-stream': 'STAR STREAM // LAS CONSTELACIONES TE OBSERVAN',
        'tower': 'TORRE DE PRUEBAS // COMPRESIÓN ESPACIAL ACTIVA',
        'ghoul': 'ALERTA CCG // NIVEL DE CÉLULAS RC CRÍTICO',
        'trap-grid': 'ZONA DE TRAMPAS // ESCÁNER DE MOVIMIENTO ACTIVO',
        'shrine': 'TERMINAL SHEIKAH // PRUEBA HEROICA EN CURSO',
        'paranormal': 'ALERTA OCULTA // ESPÍRITUS Y ALIENS EN COLISIÓN',
        'blood-demon': 'NOCHE ETERNA // CONCENTRACIÓN TOTAL REQUERIDA',
        'groove-st': 'LOS SANTOS // NIVEL DE BÚSQUEDA EN AUMENTO',
        'retro-mobile': 'MEMORIA DE 8-BITS // SINCRONIZACIÓN CLÁSICA',
        'poison': 'AIRE TÓXICO // CORROSIÓN VITAL (-1 HP / 3s)',
        'toxic': 'AIRE TÓXICO // CORROSIÓN VITAL ACTIVA',
        'fire': 'ZONA ÍGNEA // DESGASTE DE ESTAMINA ACTIVO',
        'ice': 'CERO ABSOLUTO // CONGELAMIENTO DE MANÁ'
    };
    return labels[b] || 'SISTEMA DEL MONARCA // FLUJO ESTABLE';
}

function startDungeon(dungId) {
    if (p.penaltyActive) {
        if (typeof systemNotify === "function") systemNotify("SISTEMA BLOQUEADO. Estás en Zona de Penalización.", "danger");
        return;
    }
    if (activeDungeon) {
        if (typeof systemNotify === "function") systemNotify("Ya tienes una incursión activa. Vuelve a ella o huye primero.", "danger");
        return;
    }

    let dung = dungeonDB.find(d => d.id === dungId);
    if (!dung) return;

    let hasFreeGate = !!(p._arcFreeGateUntil && Date.now() < p._arcFreeGateUntil);
    if (hasFreeGate) {
        p._arcFreeGateUntil = null;
        systemNotify("🔮 El Arconte abrió un portento: Entrada a portal concedida sin consumir llave.", "purple");
    } else if (dung.reqKey !== null) {
let rankKeyStr = dung.reqKey || ('rank' + dung.rank);
        if (!p.dungeonKeys || !p.dungeonKeys[rankKeyStr] || p.dungeonKeys[rankKeyStr] <= 0) {
            if (typeof systemNotify === "function") systemNotify(`Acceso denegado. Falta llave de Rango ${dung.rank}.`, "danger");
            return;
        }
        p.dungeonKeys[rankKeyStr]--;
        saveData();
    }

activeDungeon = dung;
    currentPhase = (p.dungeonCheckpoints && p.dungeonCheckpoints[dungId]) ? p.dungeonCheckpoints[dungId] : 0;
    if (p.dungeonCheckpoints && p.dungeonCheckpoints[dungId] !== undefined) {
        delete p.dungeonCheckpoints[dungId];
        systemNotify(`💎 Punto de Anclaje restaurado: Reanudando en Fase ${currentPhase + 1}.`, "info");
    }
    pendingSequenceQueue = [];

    let animOverlay = document.getElementById('gate-anim-overlay');
    if (typeof safeSetText === "function") {
        safeSetText('gate-anim-title', dung.title);
        safeSetText('gate-anim-rank', `RANGO ${dung.rank}`);
    }
    
    if (animOverlay) {
        animOverlay.style.display = 'flex';
        setTimeout(() => { animOverlay.style.opacity = '1'; }, 50);
    }
    if (typeof playSystemSound === "function") playSystemSound('gold');

    setTimeout(() => {
        let overlay = document.getElementById('dungeon-overlay');
        if (overlay) {
            overlay.style.display = 'block';
            overlay.className = 'biome-' + (dung.biome || 'default');
        }

initBiomeCanvas(dung.biome || 'default');
        loadPhaseUI();

        if (['A', 'S', 'SSS'].includes(dung.rank) || dung.isRedGate) {
            if (typeof systemNotify === "function") {
                systemNotify(`⚠️ MAZMORRA DE ALTO RANGO: Has entrado a [${dung.title}] (Rango ${dung.rank}).`, "dungeon_major");
            }
        }

        if (animOverlay) {
            animOverlay.style.opacity = '0';
            setTimeout(() => { animOverlay.style.display = 'none'; }, 800);
        }
    }, 2000); 
}

function loadPhaseUI() {
    if (!activeDungeon) return;
    let phase = activeDungeon.phases[currentPhase];
    
    if (typeof safeSetText === "function") {
        safeSetText('dungeon-title', activeDungeon.title);
        safeSetText('dungeon-rank', `RANGO ${activeDungeon.rank}`);
        safeSetText('raid-phase-counter', `FASE ${currentPhase + 1} / ${activeDungeon.phases.length}`);
        safeSetText('raid-phase-name', phase.name);
        safeSetText('raid-phase-desc', phase.desc);
        safeSetText('biome-effect-banner', getBiomeBannerText(activeDungeon, currentPhase));
    }
    
    let tuskMult = (p.equippedShadows && p.equippedShadows.includes('tusk')) ? 0.80 : 1.0;
    let valkyrieMult = _hasEq("eq_a_valkyrie") ? 0.88 : 1.0;
    if (_hasEq("eq_b_shadow")) valkyrieMult *= 0.90;
    if (_hasEq("eq_b_mid")) valkyrieMult *= 0.96;

    raidTimeLeft = Math.max(5, Math.floor(phase.durationMins * 60 * tuskMult * valkyrieMult));
    phaseInitialSecs = raidTimeLeft;

    renderMiniArenaUnits();
    let logBox = document.getElementById('raid-battle-log');
    if (logBox) logBox.innerHTML = '';
    pushRaidLog(`🚪 Entrando a [${phase.name}]. Escuadrón desplegado: ${(p.equippedShadows && p.equippedShadows.length > 0) ? p.equippedShadows.map(x => x.toUpperCase()).join(', ') : 'SOLITARIO'}.`, "#38bdf8");

    updateRaidTimerUI();
    syncRaidVitalsUI();
    
    let timerBox = document.getElementById('raid-timer-box');
    if (timerBox) timerBox.style.display = 'block';
    let clashBox = document.getElementById('raid-boss-clash');
    if (clashBox) clashBox.style.display = 'none';
    let rescueBox = document.getElementById('raid-min-rescue');
    if (rescueBox) rescueBox.style.display = 'none';

    let actionBtn = document.getElementById('btn-raid-action');
    let valBtn = document.getElementById('btn-raid-validate');
    if (actionBtn) actionBtn.style.display = 'block';
    if (valBtn) valBtn.style.display = 'none';
    waitingForValidation = false;
    
    clearInterval(raidTimer);
    clearInterval(clashInterval);
    raidTimer = setInterval(raidTick, 1000);
}

/* ==========================================================================
   14. CHOQUE DE JEFE Y 15 CAJAS NEGRAS DEL ARQUITECTO (CIFRADAS)
   ========================================================================== */
const ARC_PROTOCOLS_INFO = [
    { id: "arc_01", title: "01 // Eco del Santuario", desc: "Al entrar al Santuario de Sombras (0.2% prob.), el Arquitecto filtra registros clasificados y te otorga +25 MP." },
    { id: "arc_02", title: "02 // Mercado Iluminado", desc: "Al visitar la Tienda (0.1% prob.), el Arquitecto anula el impuesto del 80% de oro durante 30 minutos." },
    { id: "arc_03", title: "03 // Despertar de Vacío", desc: "Cuando tu Maná llega a 0.00 con sombras activas (2% prob.), tu núcleo absorbe +150 MP de emergencia sin disipar tu ejército." },
    { id: "arc_04", title: "04 // Hora Bruja (3:33 AM)", desc: "Estar conectado exactamente a las 3:33 AM condensa +1 Cristal de Maná oculto." },
    { id: "arc_05", title: "05 // Sintonizador de Los Chorros", desc: "Al desplegar una misión de Tráfico (0.5% prob.), tu próximo Portal de Mazmorra no consumirá llave." },
    { id: "arc_06", title: "06 // Frecuencia Perdida del Sonar", desc: "Al reescanear el Sonar de Mazmorras (0.5% prob.), interceptas un desvío de fondos de la Asociación (+75 G)." },
    { id: "arc_07", title: "07 // Piedad del Arquitecto", desc: "Acumular 3 fallos seguidos al intentar extraer sombras condensa automáticamente +2 Cristales de Maná." },
    { id: "arc_08", title: "08 // Sincronización Prismática", desc: "Al lograr un Corte Crítico Perfecto (0.3% prob.), tu barra de EXP se vuelve arcoíris y ganas EXP x1.5 por 1 Hora." },
    { id: "arc_09", title: "09 // Sinapsis Acelerada", desc: "Al sellar una sesión de Estudio/Focus (0.5% prob.), tu barra de SP brilla en dorado y las misiones cuestan 0 SP por 1 Hora." },
    { id: "arc_10", title: "10 // Protocolo Eclipse", desc: "Al recibir un golpe mortal en Mazmorra (1% prob., 1 vez), el colapso se cancela dejándote en 50 HP con +20% Evasión y EXP x2.5." },
    { id: "arc_11", title: "11 // Pulso del Arquitecto", desc: "Tocar 75 veces la barra de mensajes del Sistema en un mismo día abre la Tesorería por 1 Hora (100% de Oro íntegro)." },
    { id: "arc_12", title: "12 // General de la Legión", desc: "Reclutar un total de 40 unidades de infantería desbloquea un título oculto permanente en tu expediente." },
    { id: "arc_13", title: "13 // Anomalía del Calendario", desc: "Al iniciar un nuevo día (0.2% prob.), el Sistema te bendice con 30 minutos de Sincronización Prismática (EXP x1.5)." },
    { id: "arc_14", title: "14 // Resonancia de Cinco Estrellas", desc: "Superar el Nivel 5 con los 3 slots de equipamiento llenos activa un pulso que regenera +5 SP al abrir tu expediente." },
    { id: "arc_15", title: "15 // Inversor de Ceniza", desc: "Almacenar gran cantidad de Oro o vender reliquias desbloquea un reembolso secreto de +60 G de la Asociación." }
];
function unlockArcProtocol(arcId) {
    if (!p) return;
    if (!Array.isArray(p.discoveredArcs)) p.discoveredArcs = [];
    if (!p.discoveredArcs.includes(arcId)) {
        p.discoveredArcs.push(arcId);
        saveData();
        let meta = ARC_PROTOCOLS_INFO.find(x => x.id === arcId);
        if (meta && typeof systemNotify === "function") {
            systemNotify(`🔓 CAJA NEGRA DESCIFRADA (${p.discoveredArcs.length}/15): [${meta.title}] registrado en tu Perfil.`, "purple");
        }
    }
}

function _evalArcTabHook(tab, idx) {
    if (tab === 'gacha' && Math.random() < 0.002) { // Bajado a 0.2%
        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        p.mp = Math.min(maxMP, (p.mp || 0) + 25);
        unlockArcProtocol("arc_01");
        systemNotify("🔮 Eco del Santuario (Protocolo 01): El Trono de Sombras resonó otorgándote +25 MP.", "purple");
    } else if (tab === 'shop' && Math.random() < 0.001) { // Bajado a 0.1%
        p._arcGildedUntil = Date.now() + 1800000;
        unlockArcProtocol("arc_02");
        systemNotify("🌟 El Arquitecto ilumina el mercado: Las comisiones de oro se anulan por 30 min.", "gold");
    }
}

function _evalArcMpZeroHook() {
    if (!p._arcFlags) p._arcFlags = {};
    if (!p._arcFlags.mpZeroTriggered && Math.random() < 0.02) { // Bajado a 2%
        p._arcFlags.mpZeroTriggered = true;
        p.mp = 150;
        unlockArcProtocol("arc_03");
        systemNotify("⚡ Despertar de Emergencia (Caja Negra): Tu núcleo vacío colapsó y absorbió +150 MP del vacío.", "purple");
        return true;
    }
    return false;
}

function _evalArcDeployHook(m) {
    if (m.id.includes('traffic') && Math.random() < 0.005) { // Bajado a 0.5%
        p._arcFreeGateUntil = Date.now() + 3600000;
        unlockArcProtocol("arc_05");
        systemNotify("📡 Sintonizador Anómalo: Una grieta secreta ha revelado coordenadas libres por 1 Hora.", "gold");
    }
}

function _evalArcRadarScan() {
    let todayKey = new Date().toDateString();
    if (p._arcRadarDay === todayKey) return;
    if (Math.random() < 0.005) { // Bajado a 0.5%
        p._arcRadarDay = todayKey;
        p.gold += 75;
        unlockArcProtocol("arc_06");
        saveData();
        systemNotify("📡 Eco del Radar (Protocolo Secreto): Captaste una frecuencia perdida del mercado. +75 G (1/día).", "gold");
    }
}

function _evalArcSealHook(isCrit, reward) {
    if (isCrit && Math.random() < 0.003) { // Bajado a 0.3%
        p._arcPrismUntil = Date.now() + 3600000;
        unlockArcProtocol("arc_08");
        systemNotify("💎 Sincronización Prismática (Caja Negra): Refracción de alma activa. EXP x1.5 por 1 Hora.", "gold");
    }
    if (reward && reward.type === 'study' && Math.random() < 0.005) { // Bajado a 0.5%
        p._arcOverdriveUntil = Date.now() + 3600000;
        unlockArcProtocol("arc_09");
        systemNotify("🧠 Sinapsis Acelerada (Caja Negra): Enfoque absoluto. SP gratuito para misiones por 1 Hora.", "purple");
    }
}

function _evalArcDeathIntercept(reason, source) {
    let now = Date.now();
    if (!p._arcFlags.eclipseUsed && Math.random() < 0.01 && source === 'dungeon') { // Bajado a 1%
        p._arcFlags.eclipseUsed = true;
        p._arcEclipseActive = now + 900000;
        p.hp = 50;
        unlockArcProtocol("arc_10");
        systemNotify("🌑 Protocolo Eclipse (Caja Negra): El colapso fue interceptado. Evasión y EXP potenciadas por 15 min.", "danger");
        return true;
    }
    return false;
}

function _evalArcTickHook(now, h, m) {
    if (h === 3 && m === 33 && !p._arcFlags.nightOwl) {
        p._arcFlags.nightOwl = true;
        p.crystals = (p.crystals || 0) + 1;
        unlockArcProtocol("arc_04");
        systemNotify("🌙 Hora Bruja (Protocolo Oculto): El Sistema premia tu desvelo con +1 Cristal de Maná.", "purple");
    }
}

function _evalArcAriseFail() {
    if (!p._arcFlags) p._arcFlags = {};
    if (!p._arcFailAriseCount) p._arcFailAriseCount = 0;
    p._arcFailAriseCount++;
    if (p._arcFailAriseCount >= 3) {
        p._arcFailAriseCount = 0;
        p.crystals = (p.crystals || 0) + 2;
        unlockArcProtocol("arc_07");
        systemNotify("💀 Piedad del Arquitecto (Caja Negra): Tres extracciones fallidas consecutivas condensaron maná residual. +2 CM.", "purple");
    }
}

function _evalArcPulseClick() {
    let now = Date.now();
    let todayKey = new Date().toDateString();
    if (!p._arcFlags) p._arcFlags = {};
    if (!p._arcFlags.pulseClicks) p._arcFlags.pulseClicks = 0;
    p._arcFlags.pulseClicks++;

    let alreadyUsedToday = (p._arcPulseDay === todayKey);
    let requiredClicks = alreadyUsedToday ? 75 : 7;

    if (p._arcFlags.pulseClicks >= requiredClicks) {
        p._arcFlags.pulseClicks = 0;
        if (alreadyUsedToday) {
            systemNotify("🔒 Pulso del Arquitecto en enfriamiento (75 toques): La Tesorería solo puede abrirse 1 vez al día. Vuelve mañana.", "info");
            return;
        }
        p._arcPulseDay = todayKey;
        p._arcGildedUntil = now + 3600000;
        unlockArcProtocol("arc_11");
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("💠 Pulso del Arquitecto desbloqueado (1/Día): Tesorería abierta por 1 Hora.", "purple");
    }
}

function _evalArcInfantryFull() {
    let totalInf = Object.values(p.infantry).reduce((a, b) => a + b, 0);
    if (totalInf >= 40 && !p._arcFlags.legionBadge) {
        p._arcFlags.legionBadge = true;
        unlockArcProtocol("arc_12");
        if (!p.titles.some(t => t.id === 'title_legion')) {
            p.titles.push({
                id: 'title_legion',
                name: '🚩 General de la Legión Inmortal',
                desc: 'Comandaste más de 40 unidades de infantería sombría en tu ejército.'
            });
            systemNotify("🚩 Título Oculto Desbloqueado: General de la Legión Inmortal.", "gold");
        }
    }
}

function _evalArcCalendarHook() {
    let nowMs = Date.now();
    if (Math.random() < 0.002) { // Bajado a 0.2%
        p._arcPrismUntil = nowMs + 1800000;
        unlockArcProtocol("arc_13");
        systemNotify("🌟 Anomalía Temporal del Calendario: El Sistema te otorga 30 min de bendición prismática.", "gold");
    }
}
const PASSIVE_TITLES_DB = [
    {
        id: "t_adversity",
        name: "🔥 El que Vence a la Adversidad",
        req: () => p.level >= 2 && ((p.history && p.history.deaths >= 1) || p.hp <= 30 || (p.totalMissions || 0) >= 3),
        desc: "[TÍTULO INICIAL DEL MANHWA - NIV. 2]: Otorgado a quienes sobreviven al borde de la muerte en la Mazmorra Doble. Tus estadísticas aumentan proporcionalmente cuando tu vida baja y mitiga un 20% la resaca por desvelo."
    },
    {
        id: "t_wolf_slayer",
        name: "🐺 Asesino de Lobos",
        req: () => p.level >= 15 && (p.totalMissions || 0) >= 15,
        desc: "[CALABOZO DE HAPJEONG - NIV. 15]: Título obtenido por masacrar bestias Lycan de Colmillos de Acero. Otorga +40% de eficiencia de enfoque y +5% de EXP en incursiones y sesiones de estudio."
    },
    {
        id: "t_job_breaker",
        name: "🗡️ Conquistador del Cambio de Clase",
        req: () => p.level >= 40,
        desc: "[MISIÓN DE CAMBIO DE CLASE - NIV. 40]: Superaste al Comandante Rojo Sangriento Igris y a las hordas de nigromantes. Desbloquea la clase oculta del Sistema y reduce un 20% el costo de SP en Ruta Los Chorros."
    },
    {
        id: "t_demon_hunter",
        name: "⚡ Cazador de Demonios",
        req: () => p.level >= 97,
        desc: "[CASTILLO DEMONÍACO PISO 100 - NIV. 97]: Aniquilaste al Monarca de las Llamas Blancas, Baran, y completaste el Elixir del Agua de la Vida. Incrementa tu regeneración celular (+5 HP cada mañana) y potencia todas tus estadísticas."
    },
    {
        id: "t_jeju_savior",
        name: "🐜 Verdugo de la Isla de Jeju",
        req: () => p.level >= 100 && p.jejuCleared,
        desc: "[4TA INCURSIÓN DE JEJU - NIV. 100]: Alcanzaste el Nivel 100 tras aplastar al Rey Hormiga en vivo ante todo el mundo. Probabilidad de Extracción ¡SURGE! aumentada en +10%."
    },
    {
        id: "t_architect_slayer",
        name: "🖤 Sucesor del Corazón Negro",
        req: () => p.level >= 103,
        desc: "[REGRESO AL TEMPLO DE CARTENON - NIV. 103]: Derrotaste a Kandiaru, el Arquitecto del Sistema, tras rechazar ser un simple cascarón. Tu núcleo de Maná se expande masivamente."
    },
    {
        id: "t_national_level",
        name: "🌟 Cazador de Nivel Nacional",
        req: () => p.level >= 122 && p.sRankCleared,
        desc: "[CRISIS DE LOS GIGANTES Y CONFERENCIA INTERNACIONAL - NIV. 122]: Sellaste el Portal Rango S de Legia tú solo y doblegaste a Thomas Andre. Tu autoridad supera a la de cualquier nación."
    },
    {
        id: "t_true_monarch",
        name: "👑 Verdadero Monarca de las Sombras",
        req: () => p.level >= 146,
        desc: "[DESPERTAR DE ASHBORN - NIV. 146]: «Yo soy el registro de tu amarga lucha». El Sistema ha eliminado todas sus restricciones; tú y el Rey de los Muertos son uno solo."
    }
];

function getHunterJobTitleByState() {
    if (!p) return "NINGUNA";
    if (p.level >= 146) return "SOBERANO DE LOS MUERTOS";
    if (p.level >= 103) return "MONARCA DE LAS SOMBRAS (CORAZÓN NEGRO)";
    if (p.level >= 51)  return "MONARCA DE LAS SOMBRAS";
    if (p.level >= 40)  return "NIGROMANTE";
    return "NINGUNA";
}

function checkPassiveTitlesUnlock() {
    if (!p) return;
    if (!Array.isArray(p.titles)) p.titles = [];

    // 1. Verificar Cambio de Clase según los niveles exactos del Manhwa (Niv 40 -> Nigromante -> Niv 51 Monarca de las Sombras)
    let currentJob = getHunterJobTitleByState();
    if (!p.lastRecordedJob) p.lastRecordedJob = currentJob;
    if (p.lastRecordedJob !== currentJob && currentJob !== "NINGUNA") {
        let oldJob = p.lastRecordedJob;
        p.lastRecordedJob = currentJob;
        saveData();
        if (typeof playJobChangeCinematic === "function") {
            playJobChangeCinematic("TU CLASE HA CAMBIADO", oldJob, currentJob);
        }
    }

    // 2. Verificar Títulos Oficiales del Manhwa
    let unlockedQueue = [];
    PASSIVE_TITLES_DB.forEach(t => {
        if (!p.titles.some(x => x.id === t.id) && t.req()) {
            let prevTitle = p.titles.length > 0
                ? p.titles[p.titles.length - 1].name.replace(/^[^\s]+\s/, '')
                : "SIN TÍTULO";
            let cleanNew = t.name.replace(/^[^\s]+\s/, '');
            p.titles.push({ id: t.id, name: t.name, desc: t.desc });
            unlockedQueue.push({ oldName: prevTitle, newName: cleanNew });
        }
    });

    if (unlockedQueue.length > 0) {
        saveData();
        let lastUnlock = unlockedQueue[unlockedQueue.length - 1];
        if (typeof playJobChangeCinematic === "function") {
            setTimeout(() => {
                playJobChangeCinematic("TÍTULO ADQUIRIDO", lastUnlock.oldName, lastUnlock.newName);
            }, 350);
        } else if (typeof systemNotify === "function") {
            systemNotify(`🏆 Título del Sistema adquirido: [${lastUnlock.newName}]`, "gold");
        }
    }
}
function _evalArcHudHook() {
    if (!p || !p.equipment) return;
    if (!Array.isArray(p.discoveredArcs)) p.discoveredArcs = [];
    if (p._arcPrismUntil && !p.discoveredArcs.includes("arc_08")) p.discoveredArcs.push("arc_08");
    if (p._arcGildedUntil && !p.discoveredArcs.includes("arc_11")) p.discoveredArcs.push("arc_11");

    let equippedCount = Object.values(p.equipment).filter(Boolean).length;
    if (p.level >= 5 && equippedCount >= 3 && !p._arcFlags.fiveStarResonance) {
        p._arcFlags.fiveStarResonance = true;
        p.sp = Math.min(100, p.sp + 5);
        unlockArcProtocol("arc_14");
    }
    if ((p.totalMissions || 0) >= 10 && p.gold >= 500 && !p._arcFlags.ashInvestor) {
        p._arcFlags.ashInvestor = true;
        p.gold += 60;
        unlockArcProtocol("arc_15");
        systemNotify("Inversor de Ceniza (Protocolo 15): Reembolso secreto de la Asociación (+60 G).", "gold");
    }
}

function syncRaidVitalsUI() {
    if (!p) return;
    let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
    let curMP = p.mp !== undefined ? p.mp : 0;

    let hpPct = Math.max(0, Math.min(100, (p.hp / maxHP) * 100));
    let spPct = Math.max(0, Math.min(100, p.sp));
    let mpPct = Math.max(0, Math.min(100, (curMP / maxMP) * 100));

    let raidHpBar = document.getElementById('raid-hp-bar');
    if (raidHpBar) raidHpBar.style.width = `${hpPct}%`;
    let raidSpBar = document.getElementById('raid-sp-bar');
    if (raidSpBar) raidSpBar.style.width = `${spPct}%`;
    let raidMpBar = document.getElementById('raid-mp-bar');
    if (raidMpBar) raidMpBar.style.width = `${mpPct}%`;

    p.arcticShield = Math.min(800, Math.max(0, Math.floor(p.arcticShield || 0)));
    let rShieldBar = document.getElementById('raid-shield-bar');
    if (rShieldBar) rShieldBar.style.width = `${Math.min(hpPct, ((p.arcticShield || 0) / 800) * 100)}%`;
    let rfRing = document.getElementById('raid-fatigue-ring');
    if (rfRing) {
        if (!rfRing.firstChild) {
            let segs = '';
            for (let i = 0; i < 12; i++) segs += `<path class="fat-seg" id="rfat-seg-${i}" d="M -2.5 -17 L 2.5 -17 L 2 -12 L -2 -12 Z" transform="rotate(${i * 30})"/>`;
            rfRing.innerHTML = `<g transform="translate(22,22)">${segs}</g>`;
        }
        let rFat = Math.max(0, Math.min(100, Math.round(100 - p.sp)));
        let rAct = Math.round((rFat / 100) * 12);
        let raidWidget = rfRing.closest('.sl-fatigue-widget');
        if (raidWidget) {
            raidWidget.classList.toggle('fatigue-critical-pulse', rFat >= 100);
        }
        for (let i = 0; i < 12; i++) {
            let sEl = document.getElementById(`rfat-seg-${i}`);
            if (sEl) {
                sEl.classList.toggle('active-seg', i < rAct && rFat < 80);
                sEl.classList.toggle('danger-seg', i < rAct && rFat >= 80);
            }
        }
        safeSetText('raid-fatigue-val', rFat);
    }


    let shieldInd = document.getElementById('raid-shield-indicator');
    let shieldVal = document.getElementById('raid-shield-val');
    if (shieldInd && shieldVal) {
        if ((p.arcticShield || 0) > 0) {
            shieldInd.style.display = 'block';
            shieldVal.innerText = Math.floor(p.arcticShield);
        } else {
            shieldInd.style.display = 'none';
        }
    }

    let hpDisplay = (p.hp % 1 === 0) ? p.hp.toFixed(0) : p.hp.toFixed(1);
    let raidShieldTxt = (p.arcticShield > 0) ? ` [+${Math.floor(p.arcticShield)}/800]` : '';

    safeSetText('raid-hp-text', `${hpDisplay}/${maxHP}${raidShieldTxt}`);
    safeSetText('raid-sp-text', `${Math.floor(p.sp)}/100`);
    if (typeof animateMPDisplayTo === "function") {
        animateMPDisplayTo(curMP, maxMP);
    }

    let raidRateEl = document.getElementById('raid-mp-rate');
    if (raidRateEl) {
        if (currentNetMpPerMin < 0) {
            raidRateEl.innerText = `DRENAJE SOMBRÍO: ${currentNetMpPerMin} MP/min`;
            raidRateEl.style.color = '#bae6fd';
        } else if (currentNetMpPerMin > 0) {
            raidRateEl.innerText = `RECARGA DE MAGOS: +${currentNetMpPerMin} MP/min`;
            raidRateEl.style.color = '#7dd3fc';
        } else {
            raidRateEl.innerText = `FLUJO MP: 0 MP/min (ESTABLE)`;
            raidRateEl.style.color = '#94a3b8';
        }

        let hasUnlockedAnyShadow = p.shadowArmy && ['igris', 'tank', 'iron', 'tusk', 'beru'].some(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);
        let parentRow = raidRateEl.parentElement;
        if (parentRow) {
            let oldBtn = parentRow.querySelector('button');
            if (oldBtn) oldBtn.style.display = 'none';
            raidRateEl.style.display = hasUnlockedAnyShadow ? 'inline' : 'none';

            let bar = document.getElementById('raid-cmd-btn-bar');
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'raid-cmd-btn-bar';
                bar.style.cssText = 'display:grid; grid-template-columns:repeat(4, 1fr); gap:5px; width:100%; margin-top:8px;';
                bar.innerHTML = `
                    <button class="btn btn-main" style="padding:7px 2px !important; font-size:0.64em !important;" onclick="openHunterSkillsModal()">HABILIDADES</button>
                    <button class="btn btn-blue" style="padding:7px 2px !important; font-size:0.64em !important;" onclick="deployShadowsInRaid()">¡SURGE!</button>
                    <button class="btn btn-blue" style="padding:7px 2px !important; font-size:0.64em !important;" onclick="castActiveSkillInRaid()">SOMBRA</button>
                    <button class="btn btn-blue" style="padding:7px 2px !important; font-size:0.64em !important;" onclick="recallAllShadows()">GUARDAR</button>
                `;
                parentRow.parentElement.appendChild(bar);
            }
            bar.style.display = 'grid';
        }
    }
}

function dealRaidDamage(dmg, deathMsg, isBossAttack = false) {
    let now = Date.now();
    if (p.hazardImmunityUntil && now < p.hazardImmunityUntil) return;
    if (p.ironImmunityUntil && now < p.ironImmunityUntil) return;

    if (!isBossAttack && _hasEq("eq_a_assassin") && (phaseInitialSecs - raidTimeLeft) < 180) return;

    let dodgePct = getHunterDodgeChance(); if (!isBossAttack && Math.random() * 100 < dodgePct) {
        pushRaidLog(`¡ESQUIVA POR AGILIDAD (${dodgePct}%)! Evitaste el ataque sin recibir daño.`, "#00ffcc");
        return;
    }

    let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    if (p.hp <= maxH * 0.30) dmg *= 0.5;
    if (p.cryoBuffUntil && now < p.cryoBuffUntil) dmg *= 0.5;
    if (isBossAttack && _hasEq("eq_a_giant")) dmg *= 0.5;
    if (_hasEq("eq_h_crimson")) dmg *= 0.85;
    if (_hasEq("eq_a1")) dmg *= 0.93;
    if (_hasEq("eq_g_high")) dmg *= 0.97;
    if (_hasEq("eq_g_low")) dmg *= 0.99;
    if (isBossAttack && _hasEq("eq_a_helm_d")) dmg = Math.max(1, dmg - 5);

    if ((p.arcticShield || 0) > 0) {
        let absorbed = Math.min(p.arcticShield, dmg);
        p.arcticShield -= absorbed;
        dmg -= absorbed;
    }

    if (dmg > 0) {
        p.hp = Math.max(0, +(p.hp - dmg).toFixed(1));
        if (typeof updateHUD === "function") updateHUD();
        syncRaidVitalsUI();
        if (p.hp <= 0) {
            p.hp = 0;
            triggerDeath(deathMsg, "dungeon");
        }
    }
}

function raidTick() {
    if (waitingForValidation || !activeDungeon) return;

    raidTimeLeft--;
    updateRaidTimerUI();
    syncRaidVitalsUI();

    let depthPct = Math.min(100, Math.floor(((phaseInitialSecs - raidTimeLeft) / Math.max(1, phaseInitialSecs)) * 100));
    let depthFill = document.getElementById('raid-depth-bar');
    if (depthFill) depthFill.style.width = `${depthPct}%`;
    safeSetText('raid-depth-text', `PROFUNDIDAD: ${depthPct}%`);

    let hasBaranSet = (_hasEq("eq_w_demon_daggers") || _hasEq("eq_w_demon_sword")) && (_hasEq("eq_a_archlich") || _hasEq("eq_acc_national"));
    if (hasBaranSet && raidTimeLeft > 0 && raidTimeLeft % 10 === 0) {
        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        p.mp = Math.min(maxMP, (p.mp || 0) + 5);
        pushRaidLog("Set del Rey Demonio Baran: Relámpago blanco diezma la sala (+5 MP).", "#38bdf8");
        triggerArenaChoreography('hunter');
    }

      if (_hasEq("eq_a_beru") && raidTimeLeft > 0 && raidTimeLeft % 60 === 0) {
        let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
        let beruHeal = 20 + Math.floor(maxHP * 0.04);
        p.hp = Math.min(maxHP, +(p.hp + beruHeal).toFixed(1));
        pushRaidLog(`Exoesqueleto de Quitina: Regeneración biológica +${beruHeal} HP.`, "#00ffcc");
    }


 let logModulo = (p.candleBuffUntil && Date.now() < p.candleBuffUntil) ? 7 : 14;
    if (raidTimeLeft > 0 && raidTimeLeft % logModulo === 0) {
        generateNarrativeEvent();
    } else if (raidTimeLeft > 0 && raidTimeLeft % 4 === 0) {
        triggerArenaChoreography();
    } else if (raidTimeLeft > 0 && raidTimeLeft % 6 === 2) {
        triggerMiniEnemyCounterPlay();
    }

    let b = activeDungeon.biome || 'default';

    if ((b === 'poison' || b === 'toxic') && !_hasEq("eq_a_gloves_c") && raidTimeLeft % 3 === 0) {
        let longLvl = (p.hunterSkills && p.hunterSkills.longevity) ? p.hunterSkills.longevity.lvl : 1;
        let poisonDmg = +(1 * Math.max(0.2, 1 - (longLvl * 0.12))).toFixed(2);
        dealRaidDamage(poisonDmg, "El veneno de la mazmorra consumió tus signos vitales.");
    }
    if (b === 'fire' && !_hasEq("eq_acc_cerberus") && raidTimeLeft % 10 === 0 && p.sp > 5) {
        p.sp = Math.max(0, p.sp - 1);
        if (typeof updateHUD === "function") updateHUD();
        syncRaidVitalsUI();
    }
    if (b === 'star-stream' && raidTimeLeft > 0 && raidTimeLeft % 45 === 0) {
        const constellations = ["Prisionero de la Diadema Dorada", "Juez como el Demonio del Fuego", "Conspirador Secreto", "Dragón Abismal de la Llama Negra"];
        let cName = constellations[Math.floor(Math.random() * constellations.length)];
        p.gold += 10;
        pushRaidLog(`La constelación [${cName}] se divierte con tus sombras y te dona +10 G.`, "#fde047");
        if (typeof updateHUD === "function") updateHUD();
    }
    if (b === 'ghoul' && raidTimeLeft > 0 && raidTimeLeft % 60 === 0) {
        let num = 1000 - (Math.floor(Math.random() * 15) * 7);
        pushRaidLog(`Susurro en tu mente: «¿Cuánto es ${num} menos 7?...»`, "#f43f5e");
    }
        if (b === 'abyss' && currentPhase >= 2 && raidTimeLeft % 6 === 0) {
        dealRaidDamage(1, "Tu cuerpo no soportó la presión de las capas profundas del Abismo.");
    }
    if (p.sp <= 0 && raidTimeLeft % 15 === 0) {
        dealRaidDamage(2, "Agotamiento muscular y colapso por 100% de Fatiga.");
        pushRaidLog("SOBRECARGA FÍSICA: Tu cuerpo colapsa por 100% de Fatiga (-2 HP).", "#ff2a55");
    }


    if (raidTimeLeft <= 0) {
        clearInterval(raidTimer);
        let phase = activeDungeon.phases[currentPhase];
        if (phase.autoNext && currentPhase < activeDungeon.phases.length - 1) {
            if (typeof playSystemSound === "function") playSystemSound('gold');
            if (typeof systemNotify === "function") systemNotify(`Fase superada: ${phase.name}. Avanzando...`, "success");
            advancePhase();
        } else {
            triggerPhaseValidation();
        }
    }
}

function updateRaidTimerUI() {
    let m = Math.floor(raidTimeLeft / 60);
    let s = raidTimeLeft % 60;
    if (typeof safeSetText === "function") {
        safeSetText('raid-timer', `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`);
    }
}

/* ==========================================================================
   15. CHOQUE DE JEFE Y NAVEGACIÓN TÁCTICA (CONECTADO A 7 RANURAS)
   ========================================================================== */
let playerStrikeCooldownUntil = 0;
let bossTelegraphActive = false;
let bossParryWindowUntil = 0;

function triggerPhaseValidation() {
    waitingForValidation = true;
    playerStrikeCooldownUntil = 0;
    bossTelegraphActive = false;
    if (typeof playSystemSound === "function") playSystemSound('danger');
    if (navigator.vibrate) navigator.vibrate([150, 100, 150]);

    pushRaidLog("¡ALERTA ROJA! La puerta de la cámara del Jefe se ha abierto.", "#ff2a55");

    // Rango E = 360 HP (~8 golpes a Niv.1 sin equipo) | Rango S = 2550 HP (~56 golpes a Niv.1-2)
    let rankMult = { 'E': 360, 'D': 620, 'C': 980, 'B': 1450, 'A': 1950, 'S': 2550, 'SSS': 3800 };
    clashBossMaxHP = rankMult[activeDungeon.rank] || 360;
    clashBossHP = clashBossMaxHP;

    if (_hasEq("eq_w_kamish")) {
        clashBossHP = Math.floor(clashBossMaxHP * 0.65);
        pushRaidLog("¡IRA DE KAMISH! El miedo del Dragón redujo un 35% la vida inicial del Jefe.", "#ff0055");
    }

    let timerBox = document.getElementById('raid-timer-box');
    if (timerBox) timerBox.style.display = 'none';
    let clashBox = document.getElementById('raid-boss-clash');
    let escapeBtn = document.getElementById('btn-raid-action');
    if (clashBox) clashBox.style.display = 'block';
    if (escapeBtn) escapeBtn.style.display = 'none';

    renderClashShadowButtons();
    updateClashUI();

    let underLvlGap = Math.max(0, (activeDungeon.minLevel || 1) - (p.level || 1));
    let baseTickMs = _hasEq("eq_w1") ? 4400 : 3400;
    let bossTickMs = Math.max(2100, baseTickMs - (underLvlGap * 22));

    clearInterval(clashInterval);
    clashInterval = setInterval(() => {
        if (!waitingForValidation || !activeDungeon) {
            clearInterval(clashInterval);
            return;
        }

        if (_hasEq("eq_w1")) {
            clashBossHP = Math.max(0, clashBossHP - 35);
            pushRaidLog("Veneno de Kasaka: El Jefe pierde -35 HP por hemorragia.", "#00ffcc");
        }
        if (_hasEq("eq_w_demon_sword")) {
            clashBossHP = Math.max(0, clashBossHP - 65);
            pushRaidLog("Tormenta de Llamas Blancas (Baran): Rayo automático -65 HP al Jefe.", "#38bdf8");
        }

        if (p.equippedShadows && p.equippedShadows.includes('igris')) {
            let igLvl = (p.shadowArmy && p.shadowArmy.igris) ? (p.shadowArmy.igris.level || 1) : 1;
            let igDmg = 18 + (igLvl * 4);
            clashBossHP = Math.max(0, clashBossHP - igDmg);
            pushRaidLog(`Igris (Niv.${igLvl}): Tajo relámpago automático (-${igDmg} HP al Jefe).`, "#00d2ff");
        }
        if (p.equippedShadows && p.equippedShadows.includes('beru')) {
            clashBossHP = Math.max(0, clashBossHP - 28);
            let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
            p.hp = Math.min(maxH, p.hp + 5);
        }

        updateClashUI();
        if (clashBossHP <= 0) {
            finishBossClash();
            return;
        }

        if (_hasEq("eq_w_iron_mace") && Math.random() < 0.28) {
            pushRaidLog("¡ROMPECRÁNEOS! Tu Maza de Hierro aturdió al Jefe e impidió su ataque.", "#fde047");
            return;
        }

        if (p.iceSlowBossParry && p.iceSlowBossParry > 0) {
            p.iceSlowBossParry--;
            pushRaidLog("❄️ ¡MAGIA CRIOGÉNICA! Las cadenas de hielo congelaron el ataque del Jefe en este turno.", "#38bdf8");
            return;
        }

        let agiBonusMs = Math.min(850, Math.floor(((p.stats ? p.stats.agi : 1) - 1) * 90));
        let levelPenaltyMs = Math.min(450, underLvlGap * 12);
        let parryWindowMs = Math.max(750, 1300 + agiBonusMs - levelPenaltyMs);
        bossParryWindowUntil = Date.now() + parryWindowMs;
        let parryBtn = document.getElementById('btn-clash-parry');
        if (parryBtn) {
            parryBtn.style.display = 'block';
            parryBtn.innerText = `[ ! ] ESQUIVAR / BLOQUEAR ATAQUE (${(parryWindowMs / 1000).toFixed(1)}s)`;
        }

        setTimeout(() => {
            if (!waitingForValidation || !activeDungeon) return;
            if (parryBtn) parryBtn.style.display = 'none';
            if (bossParryWindowUntil === 0) return;
            bossParryWindowUntil = 0;

            let ironEquipped = p.equippedShadows && p.equippedShadows.includes('iron');
            let rankAtkTable = { 'E': 22, 'D': 30, 'C': 42, 'B': 58, 'A': 82, 'S': 115, 'SSS': 165 };
            let rawAtk = (rankAtkTable[activeDungeon.rank] || 22) + Math.floor(underLvlGap * 1.5);
            if (activeDungeon.isRedGate) rawAtk = Math.floor(rawAtk * 1.25);
            let finalAtk = ironEquipped ? Math.ceil(rawAtk * 0.20) : rawAtk;

            if (ironEquipped) {
                let ironGold = 15;
                p.gold += ironGold;
                pushRaidLog(`¡BASTIÓN DE IRON! Absorbió el 80% del impacto y soltó chispas de maná (+${ironGold} G).`, "#38bdf8");
            }

            dealRaidDamage(finalAtk, `El Jefe de [${activeDungeon.title}] destrozó tus defensas en el choque final.`, true);
            if (typeof systemNotify === "function" && p.hp > 0) {
                systemNotify(`Impacto del Jefe: -${finalAtk} HP${ironEquipped ? ' (80% mitigado por Iron)' : ''}.`, "danger");
            }
        }, parryWindowMs);
    }, bossTickMs);
}

window.attemptClashParry = function() {
    if (Date.now() <= bossParryWindowUntil) {
        bossParryWindowUntil = 0;
        let parryBtn = document.getElementById('btn-clash-parry');
        if (parryBtn) parryBtn.style.display = 'none';
        playerStrikeCooldownUntil = 0;
        let strikeBtn = document.querySelector('.clash-skills-grid .btn-main');
        if (strikeBtn) {
            strikeBtn.disabled = false;
            strikeBtn.style.opacity = '1';
            strikeBtn.innerText = 'CONTRAATAQUE LISTO (0s)';
        }
        pushRaidLog("¡DESVÍO PERFECTO! Bloqueaste la embestida del Jefe sin recibir daño y recargaste tu arma.", "#00ffcc");
        if (typeof playSystemSound === "function") playSystemSound('step_arrow');
    }
};

function updateClashUI() {
    let bossName = (activeDungeon && activeDungeon.phases[currentPhase])
        ? activeDungeon.phases[currentPhase].name.toUpperCase()
        : "JEFE DE CALABOZO";
    let dungMinLvl = (activeDungeon && activeDungeon.minLevel) ? activeDungeon.minLevel : 1;
    let lvlGap = dungMinLvl - (p && p.level ? p.level : 1);
    let diffClass = lvlGap >= 5 ? 'boss-diff-red' : (lvlGap >= -8 ? 'boss-diff-orange' : 'boss-diff-white');

    let headerSpan = document.querySelector('#raid-boss-clash .boss-clash-header span:first-child');
    if (headerSpan) {
        headerSpan.innerHTML = `<span style="display:inline-block; border:1px solid currentColor; padding:1px 6px; margin-right:6px; background:rgba(255,255,255,0.08);" class="${diffClass}">!</span><span class="${diffClass}">${bossName}</span>`;
    }
    safeSetText('clash-boss-hp-text', `HP: ${Math.max(0, Math.floor(clashBossHP))} / ${clashBossMaxHP}`);
    let bar = document.getElementById('clash-boss-bar');
    if (bar) bar.style.width = `${Math.max(0, (clashBossHP / clashBossMaxHP) * 100)}%`;

    let grid = document.querySelector('.clash-skills-grid');
    if (grid && !document.getElementById('btn-clash-parry')) {
        let pBtn = document.createElement('button');
        pBtn.id = 'btn-clash-parry';
        pBtn.className = 'btn btn-main';
        pBtn.style.cssText = 'display:none; width:100%; margin-bottom:8px; border-color:#00e5ff !important; background:rgba(14,165,233,0.32) !important; box-shadow:0 0 18px rgba(0,229,255,0.6) !important; animation:blinkText 0.45s infinite;';
        pBtn.onclick = attemptClashParry;
        grid.insertBefore(pBtn, grid.firstChild);
    }
}
function renderClashShadowButtons() {
    let cont = document.getElementById('clash-shadow-buttons');
    if (!cont) return;
    cont.innerHTML = '';

    if (!p.equippedShadows || p.equippedShadows.length === 0) {
        cont.innerHTML = `<div style="grid-column:span 2; color:var(--text-muted); font-size:0.8em; text-align:center;">Tus sombras están en reposo. Usa ataque directo o invócalas con ¡SURGE!.</div>`;
        return;
    }

    p.equippedShadows.forEach(cmdId => {
        let meta = COMMANDERS_META[cmdId];
        if (!meta) return;
        let cost = Math.floor(meta.activeCost * (_hasEq("eq_h_shadow") ? 0.32 : 0.4));
        cont.innerHTML += `
        <button class="btn btn-purple" style="font-size:0.78em; padding:10px 6px;" onclick="executeShadowClashSkill('${cmdId}', ${cost})">
            ${meta.icon} ${meta.name} (-${cost} MP)
        </button>`;
    });
}

function executePlayerClashStrike() {
    if (!waitingForValidation) return;
    let now = Date.now();
    if (now < playerStrikeCooldownUntil) return;

    let agiVal = (p.stats && p.stats.agi) ? p.stats.agi : 1.0;
    let cdMs = Math.max(950, Math.floor(2400 - ((agiVal - 1) * 280)));
    if (_hasEq("eq_w_demon_daggers") || _hasEq("eq_w_baruka")) cdMs = Math.floor(cdMs * 0.72);
    if (p.sp <= 0) cdMs = Math.floor(cdMs * 1.35);

    playerStrikeCooldownUntil = now + cdMs;

    let strikeBtn = document.querySelector('.clash-skills-grid .btn-main');
    if (strikeBtn) {
        strikeBtn.disabled = true;
        strikeBtn.style.opacity = '0.45';
        strikeBtn.innerText = `RECARGANDO ARMA (${(cdMs/1000).toFixed(1)}s)...`;
        setTimeout(() => {
            if (strikeBtn && waitingForValidation) {
                strikeBtn.disabled = false;
                strikeBtn.style.opacity = '1';
                strikeBtn.innerText = 'ATAQUE DIRECTO DEL CAZADOR';
            }
        }, cdMs);
    }

    ensureHunterSkills();
    if (typeof gainHunterSkillXP === "function") {
        gainHunterSkillXP('dagger_mastery', 1);
        if (p.hp <= 45) gainHunterSkillXP('tenacity', 1);
    }
    let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let tenLvl = p.hunterSkills.tenacity ? p.hunterSkills.tenacity.lvl : 1;
    let dagLvl = p.hunterSkills.dagger_mastery ? p.hunterSkills.dagger_mastery.lvl : 1;
    let tenacityMult = (p.hp <= maxH * (0.20 + tenLvl * 0.10)) ? (1.20 + tenLvl * 0.10) : 1.0;
    let daggerMult = 1 + (dagLvl * 0.04);
    let strDmg = Math.floor((28 + (p.stats.str * 16)) * tenacityMult * daggerMult);

        if (_hasEq("eq_w_razor")) strDmg += 25;
    if (_hasEq("eq_w_vulcan_club")) strDmg += 85;
    if (_hasEq("eq_g_low")) strDmg = Math.floor(strDmg * 1.10);
    if (_hasEq("eq_w_killer") && ['B', 'A', 'S', 'SSS'].includes(activeDungeon.rank)) strDmg *= 2;
    if (_hasEq("eq_w_demon_daggers")) {
        strDmg = Math.floor(strDmg * 1.6);
        let maxMP = Math.floor(1000 + ((p.stats.int - 1) * 1000));
        let hasSh = p.shadowArmy && ['igris', 'tank', 'iron', 'tusk', 'beru'].some(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);
        if (hasSh) p.mp = Math.min(maxMP, (p.mp || 0) + 85);
    }
    if (_hasEq("eq_a_high_orc")) strDmg = Math.floor(strDmg * 1.30);
    if (_hasEq("eq_acc_cerberus") && p.hp < (maxH * 0.50)) strDmg = Math.floor(strDmg * 1.50);
    if (_hasEq("eq_g_monarch")) {
        p.hp = Math.min(maxH, +(p.hp + 35).toFixed(1));
        pushRaidLog("Garras del Rey Hormiga: Drenaste +35 HP del Jefe.", "#00ffcc");
    }

    if (p.nextBossCrit) {
        let isStealthAmbush = !!(p.stealthModeUntil && Date.now() < p.stealthModeUntil);
        strDmg = Math.floor(strDmg * (isStealthAmbush ? 3.0 : 2.5));
        p.nextBossCrit = false;
        pushRaidLog(`¡IMPACTO DESDE EL SIGILO! Daño crítico multiplicado (x${isStealthAmbush ? '3.0' : '2.5'}).`, "#fde047");
    }

    clashBossHP = Math.max(0, clashBossHP - strDmg);
    triggerArenaChoreography('hunter');
    if (typeof playSystemSound === "function") playSystemSound('info');
    updateClashUI();
    syncRaidVitalsUI();
    if (clashBossHP <= 0) finishBossClash();
}

function executeShadowClashSkill(cmdId, mpCost) {
    if (!waitingForValidation) return;

    let shadowMult = 1.0;
    if (_hasEq("eq_w_arachnid")) shadowMult += 0.25;
    if (_hasEq("eq_r_mage")) shadowMult += 0.20;
    if (_hasEq("eq_w_halberd") && (cmdId === 'igris' || cmdId === 'tank')) shadowMult += 0.45;

    consumeMPFast(mpCost, () => {
        playCommanderUltCinematic(cmdId, () => {
            if (cmdId === 'igris') {
                let d = Math.floor(110 * shadowMult);
                clashBossHP = Math.max(0, clashBossHP - d);
                systemNotify(`¡Igris ejecutó un Tajo Relámpago (-${d} HP al Jefe)!`, "purple");
            } else if (cmdId === 'tank') {
                let d = Math.floor(50 * shadowMult);
                p.arcticShield = (p.arcticShield || 0) + 45;
                clashBossHP = Math.max(0, clashBossHP - d);
                systemNotify(`¡Tank embistió al Jefe (-${d} HP) y levantó +45 Escudo Ártico!`, "info");
            } else if (cmdId === 'iron') {
                let d = Math.floor(70 * shadowMult);
                clashBossHP = Math.max(0, clashBossHP - d);
                p.arcticShield = (p.arcticShield || 0) + 30;
                systemNotify(`¡Iron aturdió al Jefe con su escudo (-${d} HP, +30 Guardia)!`, "gold");
            } else if (cmdId === 'tusk') {
                clashBossHP = 0;
                systemNotify("¡TUSK DESATÓ EL HIMNO DEL DRAGÓN DE FUEGO! Jefe incinerado al instante.", "gold");
            } else if (cmdId === 'beru') {
                let d = Math.floor(160 * shadowMult);
                clashBossHP = Math.max(0, clashBossHP - d);
                p.hp += 25;
                systemNotify(`¡Beru desgarró al Jefe (-${d} HP) y te regeneró +25 HP!`, "purple");
            }
            syncRaidVitalsUI();
            updateClashUI();
            if (clashBossHP <= 0) finishBossClash();
        });
    });
}

function finishBossClash() {
    clearInterval(clashInterval);
    waitingForValidation = false;
    let timerBox = document.getElementById('raid-timer-box');
    if (timerBox) timerBox.style.display = 'block';
    let clashBox = document.getElementById('raid-boss-clash');
    if (clashBox) clashBox.style.display = 'none';
    if (typeof playSystemSound === "function") playSystemSound('gold');
    if (typeof systemNotify === "function") systemNotify("¡Jefe de fase aniquilado!", "success");
    advancePhase();
}

function manualPhaseValidation() {
    finishBossClash();
}

function advancePhase() {
    if (!activeDungeon) return;
    currentPhase++;
    if (currentPhase >= activeDungeon.phases.length) {
        let completedDung = activeDungeon;
        stopBiomeCanvas();

        let nationalMult = (_hasEq("eq_acc_national") && ['A', 'S', 'SSS'].includes(completedDung.rank)) ? 1.30 : 1.0;
        let wolfMult = _hasEq("eq_acc_wolf") ? 1.10 : 1.0;
        let voidMult = (p.voidXpBuffUntil && Date.now() < p.voidXpBuffUntil) ? 2.0 : 1.0;
        if (p.circadianXpBuffUntil && Date.now() < p.circadianXpBuffUntil) voidMult *= 1.10;

        let gainedXP = Math.floor(completedDung.rewards.xp * nationalMult * voidMult);
        if (Array.isArray(p.titles) && p.titles.some(t => t.id === 't_wolf_slayer')) gainedXP = Math.floor(gainedXP * 1.05);
        let gainedGold = Math.floor(completedDung.rewards.gold * nationalMult * wolfMult);

        if (p.whiteTigerBounty) {
            gainedGold += 110;
            p.whiteTigerBounty = false;
            if (completedDung.reqKey && ['E', 'D', 'C', 'B'].includes(completedDung.rank)) {
                let rk = completedDung.reqKey || ('rank' + completedDung.rank);
                p.dungeonKeys[rk] = (p.dungeonKeys[rk] || 0) + 1;
            }
            if (typeof rollLootDrop === "function") { rollLootDrop(false); rollLootDrop(false); }
            if (typeof systemNotify === "function") systemNotify("Concesión Tigre Blanco liquidada: +110 G sin impuestos, 2 minerales extraídos y llave reembolsada por Baek Yoonho.", "gold");
        }

        if (p.starStreamNext) {
            gainedGold *= 3;
            p.starStreamNext = false;
            if (typeof systemNotify === "function") systemNotify("¡Patrocinio del Star Stream consumido! Oro de Mazmorra triplicado.", "gold");
        }

        p.xp += gainedXP;
        p.gold += gainedGold;
        p.totalMissions = (p.totalMissions || 0) + 1;

        if (!Array.isArray(p.clearedDungeons)) p.clearedDungeons = [];
        if (!p.clearedDungeons.includes(completedDung.id)) {
            p.clearedDungeons.push(completedDung.id);
            if (typeof systemNotify === "function") {
                systemNotify(`🔓 [${completedDung.title}] ha quedado desbloqueada permanentemente para ti y para las Expediciones de tu Legión.`, "info");
            }
        }
        if (p.beaconUnlockedGates && p.beaconUnlockedGates[completedDung.id]) {
            delete p.beaconUnlockedGates[completedDung.id];
        }

        if (p.demonBloodUntil && Date.now() < p.demonBloodUntil) {
            let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
            p.hp += 25;
            p.mp = Math.min(maxMP, (p.mp || 0) + 200);
        }

        if (completedDung.id === 'dung_red_ice' && p.shadowArmy && p.shadowArmy.tank) {
            p.shadowArmy.tank.unlocked = true;
        }

        if (completedDung.rank === 'S' || completedDung.rank === 'SSS') {
            p.sRankCleared = true;
        }
        if (completedDung.id === 'jeju_island') {
            p.jejuCleared = true;
            if (p.shadowArmy && p.shadowArmy.beru) p.shadowArmy.beru.unlocked = true;
            if (p.shadowArmy && p.shadowArmy.min && !p.shadowArmy.min.usedForever && !p.shadowArmy.min.unlocked) {
                p.shadowArmy.min.unlocked = true;
                if (typeof systemNotify === "function") {
                    systemNotify("¡ISLA DE JEJU CONQUISTADA! Has extraído a Beru y el milagro único de Min Byung-Gyu se ha desbloqueado en tu Santuario.", "success");
                }
            }
        }
        if (typeof triggerBeruPredation === "function") triggerBeruPredation();
        if (typeof attemptShadowExtraction === "function") attemptShadowExtraction(completedDung.rank);
        if (typeof rollLootDrop === "function") rollLootDrop(completedDung.rank === 'S' || completedDung.rank === 'SSS');

        if (typeof systemNotify === "function") {
            systemNotify(`INCURSIÓN DESPEJADA: ${completedDung.title} (+${gainedXP} XP, +${gainedGold} G)`, "gold");
        }

        if (completedDung.rank === 'A' || completedDung.rank === 'S' || completedDung.rank === 'SSS') {
            let bonusCrystals = completedDung.rank === 'SSS' ? 10 : (completedDung.rank === 'S' ? 3 : 1);
            p.crystals = (p.crystals || 0) + bonusCrystals;
            if (typeof systemNotify === "function") systemNotify(`Botín de Jefe: +${bonusCrystals} Cristales de Maná.`, "purple");
        }

        while (p.xp >= p.maxXp) {
            p.level++;
            p.xp -= p.maxXp;
            p.maxXp = (typeof getRequiredXpForLevel === "function") ? getRequiredXpForLevel(p.level) : Math.floor(100 + (p.level - 1) * 18);
            p.hp = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
            p.sp = 100;
            p.crystals = (p.crystals || 0) + 2;
            if (typeof systemNotify === "function") systemNotify(`¡ASCENSIÓN AL NIVEL ${p.level}!`, "gold");
        }

        let overlay = document.getElementById('dungeon-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            overlay.classList.remove('abyssal-focus');
        }
        let btnReturn = document.getElementById('btn-return-dungeon');
        if (btnReturn) btnReturn.remove();

        activeDungeon = null;
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof renderBosses === "function") renderBosses();
    } else {
        loadPhaseUI();
    }
}

function applyAbyssAscentPenalty(actionName) {
    if (!activeDungeon || activeDungeon.biome !== 'abyss') return false;
    let layer = currentPhase + 1;
    if (layer <= 2) {
        p.sp = Math.max(0, p.sp - 10);
        systemNotify(`Maldición de la Capa ${layer} (${actionName}): Mareo intenso. -10 SP.`, "stamina");
    } else if (layer <= 4) {
        p.hp -= 25;
        p.sp = Math.max(0, p.sp - 20);
        systemNotify(`Maldición de la Capa ${layer} (${actionName}): Hemorragia por ascenso. -25 HP, -20 SP.`, "danger");
    } else {
        p.abyssCurseUntil = Date.now() + (24 * 3600000);
        p.hp = Math.min(p.hp, 25);
        systemNotify(`MALDICIÓN DE LA 6TA CAPA: Has perdido parte de tu humanidad al ascender. Vida Máxima reducida al 50% por 24h.`, "danger");
    }
    if (typeof updateHUD === "function") updateHUD();
    syncRaidVitalsUI();
    if (p.hp <= 0) {
        triggerDeath("La Maldición del Abismo destruyó tus órganos al intentar ascender.", "dungeon");
        return true;
    }
    return false;
}

function attemptRaidEscape() {
    if (p.penaltyActive || p.hp <= 0) {
        if (typeof systemNotify === "function") systemNotify("SISTEMA BLOQUEADO. No puedes huir mientras estás colapsado.", "danger");
        return;
    }

    if (!activeDungeon) return;

    if (activeDungeon.biome === 'abyss') {
        let died = applyAbyssAscentPenalty("Intento de Huida");
        if (died) return;
    }

    if (activeDungeon.isRedGate) {
        if (typeof systemNotify === "function") systemNotify("Portal Rojo sellado. Huir no es una opción (Salvo con Intercambio de Sombra).", "danger");
        if (typeof playSystemSound === "function") playSystemSound('danger');
        return;
    }

    stopBiomeCanvas();
    let ov = document.getElementById('dungeon-overlay');
    if (ov) {
        ov.style.display = 'none';
        ov.classList.remove('abyssal-focus');
    }
    activeDungeon = null;
    clearInterval(raidTimer);
    clearInterval(validationTimer);
    clearInterval(clashInterval);

    let btnReturn = document.getElementById('btn-return-dungeon');
    if (btnReturn) btnReturn.remove();

    let escDmg = _hasEq("eq_acc_gate") ? 10 : 20;
    p.hp -= escDmg;

    if (p.hp <= 0) {
        triggerDeath("Tus heridas fueron letales al huir cobardemente de la mazmorra.", "dungeon");
    } else {
        if (typeof systemNotify === "function") systemNotify(`Has huido de la mazmorra. Penalización: -${escDmg} HP.`, "danger");
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderBosses === "function") renderBosses();
}

function ensureRaidCmdModal() {
    let m = document.getElementById('raid-cmd-selector-modal');
    if (!m) {
        m = document.createElement('div');
        m.id = 'raid-cmd-selector-modal';
        m.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(2,6,16,0.9); backdrop-filter:blur(8px); z-index:9480; display:none; justify-content:center; align-items:center; padding:18px;';
        document.body.appendChild(m);
    }
    return m;
}

function deployShadowsInRaid() {
    if (!activeDungeon) return;
    if (typeof ensureShadowStructure === "function") ensureShadowStructure();
    let maxSlots = (typeof getMaxShadowSlots === "function") ? getMaxShadowSlots() : 1;

    let unlockedList = Object.keys(COMMANDERS_META).filter(k => {
        let st = p.shadowArmy[k];
        if (!st || !st.unlocked) return false;
        if (k === 'tank' && st.cooldownUntil && Date.now() < st.cooldownUntil) return false;
        return true;
    });

    if (unlockedList.length === 0) {
        systemNotify("No tienes comandantes disponibles para desplegar.", "danger");
        return;
    }

    // Si solo tienes 1 sombra desbloqueada (ej. solo Igris), la despliega directo sin abrir menú
    if (unlockedList.length === 1) {
        let onlyCmd = unlockedList[0];
        if (p.equippedShadows.includes(onlyCmd)) {
            systemNotify(`${COMMANDERS_META[onlyCmd].name} ya está desplegado en la arena.`, "info");
            return;
        }
        if ((p.mp || 0) < 20) {
            systemNotify("💧 Necesitas al menos 20 MP para invocar a tu Comandante en combate.", "danger");
            return;
        }
        p.equippedShadows = [onlyCmd];
        p.shadowArmy[onlyCmd].active = true;
        saveData();
        renderMiniArenaUnits();
        if (typeof renderClashShadowButtons === "function") renderClashShadowButtons();
        syncRaidVitalsUI();
        if (typeof updateHUD === "function") updateHUD();
        pushRaidLog(`🗣️ ¡SURGE! [${COMMANDERS_META[onlyCmd].name}] desplegado en combate.`, "#38bdf8");
        systemNotify(`🗣️ ¡SURGE! ${COMMANDERS_META[onlyCmd].name} desplegado.`, "purple");
        return;
    }

    // Si tienes 2 o más sombras desbloqueadas, abrir el Selector Táctico para que elijas cuál(es) sacar
    let modal = ensureRaidCmdModal();
    let rowsHtml = unlockedList.map(cmdId => {
        let meta = COMMANDERS_META[cmdId];
        let st = p.shadowArmy[cmdId];
        let isEq = p.equippedShadows.includes(cmdId);
        let btnClass = isEq ? 'btn-red' : 'btn-main';
        let btnTxt = isEq ? '🌑 GUARDAR' : '🗣️ ¡SURGE!';
        return `
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(4,14,32,0.92); border:1px solid ${isEq ? '#38bdf8' : '#1e3a5f'}; padding:10px 12px; margin-bottom:8px; border-radius:2px;">
            <div style="text-align:left;">
                <div style="color:#f1f5f9; font-weight:700; font-size:0.95em;">${meta.icon} ${meta.name} (Niv.${st.level || 1})</div>
                <div style="color:#94a3b8; font-size:0.76em; font-family:'Share Tech Mono', monospace;">Drenaje: -${meta.mpDrain} MP/m • ${isEq ? '<span style="color:#38bdf8;">EN CAMPO</span>' : 'EN SOMBRA'}</div>
            </div>
            <button class="btn ${btnClass}" style="padding:7px 12px; font-size:0.75em;" onclick="toggleRaidCommanderSlot('${cmdId}')">${btnTxt}</button>
        </div>`;
    }).join('');

    modal.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:400px; width:100%;">
            <div class="sl-window-header">
                <span class="sl-excl-box">!</span>
                <span class="sl-notif-tag">DESPLIEGUE DE SOMBRAS (${p.equippedShadows.length}/${maxSlots})</span>
            </div>
            <p style="font-size:0.82em; color:#94a3b8; text-align:center; margin:8px 0 12px 0;">Elige qué Comandante(s) deseas hacer surgir en la arena:</p>
            <div style="max-height:52vh; overflow-y:auto;">${rowsHtml}</div>
            <button class="btn btn-main" style="width:100%; margin-top:12px;" onclick="document.getElementById('raid-cmd-selector-modal').style.display='none'">⚔️ VOLVER AL COMBATE</button>
        </div>
    `;
    modal.style.display = 'flex';
}

function toggleRaidCommanderSlot(cmdId) {
    if (typeof toggleEquipCommander === "function") {
        toggleEquipCommander(cmdId);
    }
    renderMiniArenaUnits();
    if (typeof renderClashShadowButtons === "function") renderClashShadowButtons();
    syncRaidVitalsUI();
    deployShadowsInRaid(); // Refresca el selector en vivo
}

function castActiveSkillInRaid() {
    if (!activeDungeon) return;
    if (!p.equippedShadows || p.equippedShadows.length === 0) {
        systemNotify("🗣️ Primero presiona «¡SURGE!» para desplegar al menos un Comandante en la arena.", "danger");
        return;
    }

    // Si solo llevas 1 sombra equipada en campo, ejecuta su habilidad directo sin preguntar
    if (p.equippedShadows.length === 1) {
        executeRaidSpecificActive(p.equippedShadows[0]);
        return;
    }

    // Si llevas 2 o 3 sombras equipadas, abrir selector para que elijas cuál habilidad activar
    let modal = ensureRaidCmdModal();
    let rowsHtml = p.equippedShadows.map(cmdId => {
        let meta = COMMANDERS_META[cmdId];
        if (!meta) return '';
        let cost = waitingForValidation
            ? Math.floor(meta.activeCost * 0.4)
            : ((typeof getEffectiveActiveCost === "function") ? getEffectiveActiveCost(cmdId) : meta.activeCost);
        let canAfford = (p.mp || 0) >= cost;

        return `
        <div style="background:rgba(4,14,32,0.92); border:1px solid ${canAfford ? '#38bdf8' : '#334155'}; padding:10px 12px; margin-bottom:8px; border-radius:2px; opacity:${canAfford ? '1' : '0.55'};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="color:#f1f5f9; font-weight:700; font-size:0.95em;">${meta.icon} ${meta.name}</span>
                <span style="color:#38bdf8; font-family:'Share Tech Mono', monospace; font-size:0.8em; font-weight:700;">-${cost} MP</span>
            </div>
            <div style="color:#94a3b8; font-size:0.78em; margin-bottom:8px; text-align:left; line-height:1.3;"><b>${meta.activeName}:</b> ${meta.activeDesc}</div>
            <button class="btn btn-main" style="width:100%; padding:8px; font-size:0.78em;" onclick="document.getElementById('raid-cmd-selector-modal').style.display='none'; executeRaidSpecificActive('${cmdId}')">⚡ DESATAR: ${meta.activeName}</button>
        </div>`;
    }).join('');

    modal.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:410px; width:100%;">
            <div class="sl-window-header">
                <span class="sl-excl-box">!</span>
                <span class="sl-notif-tag">SELECCIONAR HABILIDAD ACTIVA</span>
            </div>
            <p style="font-size:0.82em; color:#94a3b8; text-align:center; margin:8px 0 12px 0;">Maná disponible: <b style="color:#38bdf8;">${Math.floor(p.mp || 0)} MP</b>. Elige qué Comandante atacará:</p>
            <div style="max-height:55vh; overflow-y:auto;">${rowsHtml}</div>
            <button class="btn btn-red" style="width:100%; margin-top:10px;" onclick="document.getElementById('raid-cmd-selector-modal').style.display='none'">CANCELAR</button>
        </div>
    `;
    modal.style.display = 'flex';
}

function executeRaidSpecificActive(cmdId) {
    if (!activeDungeon || !COMMANDERS_META[cmdId]) return;
    if (waitingForValidation && typeof executeShadowClashSkill === "function") {
        let meta = COMMANDERS_META[cmdId];
        let cost = Math.floor(meta.activeCost * 0.4);
        executeShadowClashSkill(cmdId, cost);
    } else if (typeof castCommanderActive === "function") {
        castCommanderActive(cmdId);
    }
}

function openRaidFloatingDrawer(mode) {
    let drawer = document.getElementById('raid-tactical-drawer');
    if (!drawer) {
        drawer = document.createElement('div');
        drawer.id = 'raid-tactical-drawer';
        drawer.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(2,6,16,0.9);z-index:9450; display:flex; justify-content:center; align-items:center; padding:18px;';
        document.body.appendChild(drawer);
    }

    let contentHtml = '';
    if (mode === 'bag') {
        if (!p.inventory || p.inventory.length === 0) {
            contentHtml = `<p style="color:var(--text-muted); text-align:center; padding:25px 0;">Tu Bolsa Dimensional está vacía.</p>`;
        } else {
            let grouped = (typeof getGroupedInventoryList === "function") ? getGroupedInventoryList() : p.inventory.map((it, i) => ({ item: it, firstIdx: i, count: 1 }));
            contentHtml = `<div class="minecraft-grid">` + grouped.map(g => {
                let item = g.item;
                let icon = (typeof getIconFor === "function") ? getIconFor(item) : (item.icon || '💠');
                let sub = item.sellGold ? `${item.sellGold}G` : (item.rank || 'A');
                let badge = g.count > 1 ? `<span class="slot-stack-badge">x${g.count}</span>` : '';
                return `<div class="grid-slot rank-${item.rank || 'A'}" onclick="inspectInventoryItem(${g.firstIdx}, ${g.count}); setTimeout(()=>openRaidFloatingDrawer('bag'), 400);">
                    ${badge}
                    <div class="slot-icon">${icon}</div>
                    <div class="slot-price">${sub}</div>
                </div>`;
            }).join('') + `</div>`;
        }
    } else {
        let items = (typeof shopDB !== 'undefined') ? shopDB.filter(i => i.cat === 'Consumibles' || i.cat === 'Pergaminos') : [];
        contentHtml = `<div class="minecraft-grid">` + items.map(item => {
            let canBuy = p.gold >= item.cost;
            let icon = (typeof getIconFor === "function") ? getIconFor(item) : (item.icon || '🧪');
return `<div class="grid-slot rank-${item.rank}" style="opacity:${canBuy ? '1' : '0.45'};" onclick="inspectShopItem('${item.id}'); setTimeout(()=>{ if(document.getElementById('raid-tactical-drawer')?.style.display==='flex') openRaidFloatingDrawer('shop'); }, 350);">
                <div class="slot-icon">${icon}</div>
                <div class="slot-price">${item.cost}G</div>
            </div>`;
        }).join('') + `</div>`;
    }

    drawer.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:410px; width:100%; max-height:82vh; overflow-y:auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(56,189,248,0.28); padding-bottom:10px; margin-bottom:12px;">
                <span style="color:#38bdf8; font-weight:700; font-size:1.1em; letter-spacing:1px;">${mode === 'bag' ? '🎒 BOLSA EN INCURSIÓN' : '🛒 SUMINISTROS'}</span>
                <span style="color:#e2e8f0; font-family:'Share Tech Mono', monospace; font-weight:700;">🪙 ${Math.floor(p.gold)} G</span>
            </div>
            <div style="display:flex; gap:8px; margin-bottom:14px;">
                <button class="btn ${mode === 'bag' ? 'btn-main' : 'btn-blue'}" style="flex:1; padding:8px; font-size:0.8em;" onclick="openRaidFloatingDrawer('bag')">🎒 Mi Bolsa</button>
                <button class="btn ${mode === 'shop' ? 'btn-main' : 'btn-blue'}" style="flex:1; padding:8px; font-size:0.8em;" onclick="openRaidFloatingDrawer('shop')">🛒 Tienda Rápida</button>
            </div>
            ${contentHtml}
            <button class="btn btn-red" style="width:100%; margin-top:16px;" onclick="document.getElementById('raid-tactical-drawer').style.display='none'">⚔️ CERRAR Y SEGUIR EN MAZMORRA</button>
        </div>
    `;
    drawer.style.display = 'flex';
}

function abrirBolsaMazmorra() {
    if (applyAbyssAscentPenalty("Abrir Bolsa")) return;
    openRaidFloatingDrawer('bag');
}

function abrirTiendaMazmorra() {
    if (applyAbyssAscentPenalty("Abrir Tienda")) return;
    openRaidFloatingDrawer('shop');
}

function inyectarBotonRetorno() {}
/* ==========================================================================
   16. CAJA NEGRA DE PERSISTENCIA OFFLINE (PANTALLA APAGADA / APAGÓN DE CELULAR)
   ========================================================================== */
function saveBlackBoxState() {
    if (!p) return;
    p.lastHeartbeat = Date.now();
    if (typeof activeDungeon !== 'undefined' && activeDungeon && !waitingForValidation) {
        p._savedRaidState = {
            dungId: activeDungeon.id,
            phaseIdx: currentPhase,
            phaseEndsAt: Date.now() + (raidTimeLeft * 1000),
            phaseInitialSecs: phaseInitialSecs
        };
    } else if (!activeDungeon) {
        p._savedRaidState = null;
    }
    saveData();
}

function recoverFromSystemCollapse(wasHardReboot = false) {
    if (!p || !p.lastHeartbeat) {
        if (p) p.lastHeartbeat = Date.now();
        return;
    }
    let now = Date.now();
    let offlineSecs = Math.floor((now - p.lastHeartbeat) / 1000);
    p.lastHeartbeat = now;

    // Solo intervenir si estuvo apagado/bloqueado al menos 15 segundos
    if (offlineSecs < 15) return;

    let offlineMins = +(offlineSecs / 60).toFixed(1);

    // 1. Sincronizar el flujo de Maná (MP) y curación de Beru durante el tiempo apagado
    if (!p.penaltyActive) {
        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
        if (typeof currentNetMpPerMin !== 'undefined' && currentNetMpPerMin !== 0) {
            let mpDelta = currentNetMpPerMin * (offlineSecs / 60);
            p.mp = Math.max(0, Math.min(maxMP, (p.mp || 0) + mpDelta));
            if (p.mp <= 0 && p.equippedShadows && p.equippedShadows.length > 0) {
                p.mp = 0;
                p.equippedShadows = [];
                Object.keys(p.shadowArmy).forEach(k => { if (p.shadowArmy[k]) p.shadowArmy[k].active = false; });
            }
        }
        if (p.equippedShadows && p.equippedShadows.includes('beru')) {
            let healAdd = Math.floor(offlineSecs / 60) * 2;
            if (healAdd > 0) {
                p.hp = Math.min(maxHP, p.hp + healAdd);
                p.sp = Math.min(100, p.sp + healAdd);
            }
        }
    }

    // 2. Si el teléfono se apagó del todo a mitad de una Mazmorra, restaurarla y descontar el tiempo transcurrido
    if (!activeDungeon && p._savedRaidState && !p.penaltyActive && typeof dungeonDB !== 'undefined') {
        let st = p._savedRaidState;
        let dung = dungeonDB.find(d => d.id === st.dungId);
        if (dung) {
            activeDungeon = dung;
            currentPhase = st.phaseIdx || 0;
            phaseInitialSecs = st.phaseInitialSecs || 60;
            let remSecs = Math.max(1, Math.floor((st.phaseEndsAt - now) / 1000));

            let overlay = document.getElementById('dungeon-overlay');
            if (overlay) {
                overlay.style.display = 'block';
                overlay.className = 'biome-' + (dung.biome || 'default');
            }
            initBiomeCanvas(dung.biome || 'default');
            loadPhaseUI();
            raidTimeLeft = remSecs;
            updateRaidTimerUI();
            pushRaidLog(`⚡ CAJA NEGRA: Incursión recuperada tras corte de energía (${Math.ceil(offlineMins)}m sincronizados).`, "#00ffcc");
        }
    } else if (activeDungeon && p._savedRaidState && !waitingForValidation) {
        // Si solo bloqueó la pantalla y volvió a encenderla dentro de la mazmorra
        let remSecs = Math.max(1, Math.floor((p._savedRaidState.phaseEndsAt - now) / 1000));
        raidTimeLeft = remSecs;
        updateRaidTimerUI();
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderBosses === "function") renderBosses();

    let oneHourMs = 3600000;
    let canShowReconnectToast = !p.lastReconnectToastAt || ((now - p.lastReconnectToastAt) >= oneHourMs);

    if (canShowReconnectToast && offlineSecs >= 3600) {
        p.lastReconnectToastAt = now;
        saveData();
        let timeLabel = offlineSecs >= 60 ? `${Math.floor(offlineSecs / 60)}m ${offlineSecs % 60}s` : `${offlineSecs}s`;
        setTimeout(() => {
            if (typeof systemNotify === "function") {
                systemNotify(`⚠️ RECONEXIÓN DEL SISTEMA: El dispositivo colapsó o permaneció inactivo por [${timeLabel}], pero tu progreso, misiones y cronómetros fueron resguardados intactos.`, "info");
            }
        },600);
    }
}

// Guardar latido cada 3 segundos y escuchar bloqueo/encendido de pantalla
setInterval(() => { if (!document.hidden) saveBlackBoxState(); }, 12000);
window.addEventListener('pagehide', saveBlackBoxState);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        saveBlackBoxState();
    } else {
        recoverFromSystemCollapse(false);
    }
});

// Al encender el teléfono y abrir la app, recuperar estado de inmediato
setTimeout(() => recoverFromSystemCollapse(true), 450);
