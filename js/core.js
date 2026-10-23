/* ==========================================================================
   CORE.JS - NÚCLEO DEL SISTEMA, POSES DINÁMICAS DE ARMERÍA Y MOTOR DE INCURSIÓN
   ========================================================================== */

/* ==========================================================================
   1. CONSTANTES GLOBALES
   ========================================================================== */
const VERSION = "V4.1_TrueMonarch";
const GOLD_NERF = 0.20;
const todayStr = new Date().toDateString();

let audioCtx = null;
try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
    console.warn("Audio Context no disponible");
}

/* ==========================================================================
   2. ESTADO GLOBAL DEL JUGADOR (Tu Alma Digital - Día 1 inicia en 0/1000 MP)
   ========================================================================== */
let p = JSON.parse(localStorage.getItem('SL_Player_' + VERSION)) || {
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
   3. GUARDADO Y CARGA
   ========================================================================== */
function saveData() {
    localStorage.setItem('SL_Player_' + VERSION, JSON.stringify(p));
}

function loadData() {
    let saved = JSON.parse(localStorage.getItem('SL_Player_' + VERSION));
    if (saved) {
        p = saved;
        return true;
    }
    return false;
}

/* /* ==========================================================================
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

function playSystemSound(type = 'info') {
    _unlockAudioContext();
    if (!audioCtx || audioCtx.state === 'suspended') return;

    try {
        const now = audioCtx.currentTime;

        // Ignorar sonidos de cierre
        if (type === 'close') return;

        // 1. PULSO DE TELEMETRÍA (Solo para la cinemática de Cambio de Clase)
        if (type === 'type') {
            _holoChime(now, 2400, 1900, 0.018, 0.08, 'sine', 0);
            return;
        }

        // 2. FLECHA DE TRANSICIÓN [ ∨∨ ]
        if (type === 'step_arrow') {
            _holoChime(now, 1100, 620, 0.08, 0.12, 'triangle', 0);
            return;
        }

        // 3. DESPERTAR DE CLASE / TÍTULO MORADO
        if (type === 'monarch_awakening' || type === 'dungeon_major') {
            _subThump(now, 135, 28, 0.48, 0.32, 0);
            _airSwipe(now, 300, 2800, 0.28, 0.18, 1.4);
            _holoChime(now, 587.33, 1174.66, 0.38, 0.16, 'triangle', 0.02); // D5 -> D6 resonante
            _holoChime(now, 880, 1760, 0.42, 0.12, 'sine', 0.06);          // A5 -> A6 cristalino
            return;
        }

        // 4. ALERTA ROJA / PELIGRO (Doble pulso disonante de alarma del Sistema)
        if (type === 'danger' || type === 'error') {
            _subThump(now, 140, 40, 0.18, 0.24, 0);
            _holoChime(now, 880, 440, 0.14, 0.15, 'sawtooth', 0);
            _holoChime(now, 880, 400, 0.18, 0.15, 'sawtooth', 0.14);
            return;
        }

        // 5. SONIDO OFICIAL DE VENTANA DEL SISTEMA (Despliegue de Cristal Azul de Solo Leveling)
        // Capa 1: Barrido magnético rápido de los rieles al abrirse
        _airSwipe(now, 220, 1100, 0.12, 0.16, 2.2);
        // Capa 2: Impacto grave de anclaje holográfico
        _subThump(now, 120, 38, 0.15, 0.22, 0);
        // Capa 3: Doble armónico cristalino futurista (el "Shiiing-Ding" metálico de la interfaz del anime)
        _holoChime(now, 392.00, 587.33, 0.16, 0.15, 'sine', 0.01);     // C6 -> C7 brillante
        _holoChime(now, 587.33, 880.00, 0.22, 0.11, 'triangle', 0.035); // G6 -> G7 eco de cristal
    } catch (e) {
        console.warn("Error de audio:", e);
    }
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

function getHunterDodgeChance() {
    if (!p || !p.stats) return 0;
    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";

    let dodge = Math.floor((p.stats.agi - 1) * 8);
    if (wId === "eq_w_goblin") dodge += 8;
    if (wId === "eq_w_bow") dodge += 12;
    if (wId === "eq_w_baruka") dodge += 18;
    if (aId === "eq_a_assassin") dodge += 20;
    if (aId === "eq_a_beru") dodge += 22;
    if (accId === "eq_acc_wolf") dodge += 8;
    if (p.adrenalineDodgeUntil && Date.now() < p.adrenalineDodgeUntil) dodge += 15;
    if (p._arcEclipseActive && Date.now() < p._arcEclipseActive) dodge += 20;

    return Math.max(0, Math.min(65, dodge));
}

/* ==========================================================================
   6. CHEQUEO DIARIO (RACHAS, CONTRATO DE SANGRE, ESCUDO DE RACHA Y EVENTOS)
   ========================================================================== */
function checkDaily(forcedDayStr = null) {
    let evalDayStr = forcedDayStr || todayStr;
    
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
                        systemNotify("📜 ¡Contrato de Sangre cumplido al cierre del día! +250 G y +2 CM.", "gold");
                    }
                }
                if (typeof systemNotify === "function") {
                    systemNotify(`🌟 Racha Perfecta: ${p.perfectDays} días invicto.`, "gold");
                }
            } else if (p.streakShieldActive === p.lastLogin) {
                p.streakShieldActive = null;
                p.contractActive = null;
                if (typeof systemNotify === "function") {
                    systemNotify("🛡️ Decreto de Soberanía consumido: Tu Racha Perfecta fue protegida anoche sin recibir daño.", "gold");
                }
            } else {
                if (p.contractActive === p.lastLogin) {
                    p.contractActive = null;
                    p.hp -= 50;
                    if (typeof systemNotify === "function") {
                        systemNotify("📜 Violación del Contrato de Sangre del Arquitecto: -50 HP.", "danger");
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
        
        p.hp = Math.max(1, p.hp); 
        p.sp = 100; 

        // Pasiva del Título "Monarca de la Rutina" (14 días invicto): +5 HP al iniciar el día
        if (p.titles && p.titles.some(t => t.id === "t_demon_hunter")) {
            let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
            p.hp = Math.min(maxH, p.hp + 5);
        }
        
        if (p.sleepDebt) {
            // Pasiva del Título "Acero Forjado": mitiga un 20% el castigo por desvelo
            let hasSteelTitle = p.titles && p.titles.some(t => t.id === "t_adversity");
            p.hp = Math.min(p.hp, hasSteelTitle ? 65 : 50); 
            p.sp = hasSteelTitle ? 55 : 40; 
            p.mp = Math.floor((p.mp || 0) * (hasSteelTitle ? 0.65 : 0.5));
            p.sleepDebt = false; 
            if (typeof systemNotify === "function") {
                systemNotify("⚠️ Resaca del Sistema: Ignoraste el descanso ayer. HP, SP y MP reducidos.", "danger");
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
        p.mercyActive = null; // Limpia la Piedra de la Misericordia al iniciar un nuevo día

        
        if (typeof eventDB !== "undefined" && Math.random() <= 0.70) {
            let evDesc = eventDB[Math.floor(Math.random() * eventDB.length)];
            p.activeEvent = { id: "ev_" + Date.now(), title: "Incursión Sorpresa", desc: evDesc, xp: 60, gold: 30 };
            if (typeof systemNotify === "function") {
                systemNotify("🔔 Anomalía detectada en el radar.", "info");
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
        
        let currDOW = new Date(evalDayStr).getDay();
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

// Entregar hasta 2 Sellos de Exención Laboral cada Domingo (Tope máximo acumulable en bolsa: 3)
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
                systemNotify(isDeluxe ? "🎁 ¡Cofre del Monarca y 2 Sellos de Exención Laboral recibidos!" : "📦 Suministros Semanales y 2 Sellos de Exención Laboral recibidos.", "gold");
            }
        }
    }

    // Inyectar tus primeros 2 Sellos de Exención Laboral en tu partida actual si aún no los has recibido esta semana
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

    if (typeof _evalArcDeathIntercept === "function" && _evalArcDeathIntercept(reason, source)) {
        return;
    }

    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    if (aId === "eq_a_ashborn" && (p.mp || 0) >= 350) {
        p.mp -= 350;
        p.hp = 40;
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof syncRaidVitalsUI === "function") syncRaidVitalsUI();
        if (typeof systemNotify === "function") {
            systemNotify("👑 ¡MANTO DE ASHBORN! Las sombras absorbieron el golpe letal usando -350 MP. Vida anclada en 40 HP.", "purple");
        }
        return;
    }

    if (p.phoenixFeatherActive === currentDayStr) {
        p.phoenixFeatherActive = null;
        p.hp = 50;
        p.sp = 50;
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof systemNotify === "function") {
            systemNotify("🪶 ¡PLUMA DEL FÉNIX ACTIVADA! Has renacido de las cenizas con 50 HP sin perder oro.", "gold");
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
        if (typeof systemNotify === "function") systemNotify("⚠️ Incursión abortada por colapso vital.", "danger");
    }
    
    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
    let isSupremeSet = (wId === "eq_w_kamish" && aId === "eq_a_ashborn" && accId === "eq_acc_black_heart");

    let soldierRate = (accId === "eq_acc_metus") ? 0.015 : 0.01;
    let soldierReduction = (p.infantry && p.infantry.soldiers) ? (p.infantry.soldiers * soldierRate) : 0;
    let breakChance = isSupremeSet ? 0 : Math.max(0.15, 0.50 - soldierReduction);

    if (p.inventory.length > 0 && Math.random() < breakChance) {
        let idx = Math.floor(Math.random() * p.inventory.length);
        let item = p.inventory.splice(idx, 1)[0];
        p.history.itemsBroken++;
        if (typeof systemNotify === "function") {
            systemNotify(`💀 Castigo Crítico: El artefacto [${item.title}] se destruyó en el colapso.`, "danger");
        }
    }
    
    if (typeof systemNotify === "function") {
        systemNotify(`💀 COLAPSO: ${reason}`, "danger");
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
   9. DRENAJE Y RECARGA DE MANÁ EN TIEMPO REAL (CON SOMBRA LÍQUIDA Y SETS)
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

        let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
        let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
        let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
        let isSupremeSet = (wId === "eq_w_kamish" && aId === "eq_a_ashborn" && accId === "eq_acc_black_heart");

        // Verificar si las 3 Horas del pergamino Marcha Imperial ya expiraron
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
                    systemNotify("🚩 El tiempo límite de [Marcha Imperial] (3 Horas) ha expirado. Tus Comandantes extra han regresado al vacío.", "info");
                }
            }
        }

        let drainPerMin = 0;
        let activeCount = p.equippedShadows ? p.equippedShadows.length : 0;
        if (p.equippedShadows && typeof COMMANDERS_META !== "undefined") {
            p.equippedShadows.forEach(cmdId => {
                if (!COMMANDERS_META[cmdId]) return;
                if (cmdId === 'tank' && !isNightWindow && !activeDungeon && activeCount <= 3) return;
                if (cmdId === 'igris' && aId === 'eq_a1') return;
                drainPerMin += COMMANDERS_META[cmdId].mpDrain;
            });
        }

        let intDiscount = Math.min(0.35, Math.max(0, ((p.stats ? p.stats.int : 1) - 1) * 0.04));
        if (aId === "eq_a_archlich") drainPerMin *= 0.65;
        if (aId === "eq_a_ashborn") drainPerMin *= 0.50;
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

        if (p.zeroMpDrainUntil && nowMs < p.zeroMpDrainUntil) {
            drainPerMin = 0;
        }
        let mageMult = (accId === "eq_acc_metus") ? 6 : 4;
        let mageRegenPerMin = (p.infantry && p.infantry.mages) ? (p.infantry.mages * mageMult) : 0;
        if (aId === "eq_a_mage_b") mageRegenPerMin += 6;
        if (accId === "eq_acc_black_heart") mageRegenPerMin += 25;
        if (isSupremeSet) mageRegenPerMin += 10;

        let netPerMin = +(mageRegenPerMin - drainPerMin).toFixed(1);
        currentNetMpPerMin = netPerMin;

        let rateEl = document.getElementById('mp-drain-rate');
        if (rateEl) {
            if (netPerMin < 0) {
                rateEl.innerText = `(${netPerMin} MP/m)`;
                rateEl.style.color = '#f43f5e';
            } else if (netPerMin > 0) {
                rateEl.innerText = `(+${netPerMin} MP/m)`;
                rateEl.style.color = '#10b981';
            } else {
                rateEl.innerText = `(0 MP/m)`;
                rateEl.style.color = 'var(--text-muted)';
            }
        }

        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;

        if (netPerMin !== 0) {
            let deltaPerTick = netPerMin / 300;
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
                    systemNotify("💧 ¡NÚCLEO DE MANÁ AGOTADO! Tus Comandantes de Sombra se han disipado.", "danger");
                }
                return;
            }
        }

              let mpBar = document.getElementById('mp-bar');
      if (mpBar) mpBar.style.width = `${(p.mp / maxMP) * 100}%`;
      let mpText = document.getElementById('mp-text');
      if (mpText) {
          let cleanMp = (p.mp % 1 === 0) ? p.mp.toFixed(0) : p.mp.toFixed(1);
          mpText.innerText = `${cleanMp}/${maxMP}`;
      }

        if (activeDungeon && typeof syncRaidVitalsUI === "function") {
            syncRaidVitalsUI();
        }
    }, 200);
}

/* ==========================================================================
   10. BUCLE EN TIEMPO REAL: SANGRADO 9:15-10:00 PM Y CAÍDA RÁPIDA AL CAMBIAR HORA
   ========================================================================== */
let lastEvaluatedClockMin = -1;

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

function evaluateNightCurfew(isClockJump = false) {
    if (!p || p.penaltyActive) return;

    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let currentDayStr = now.toDateString();

    // Si tiene Pase Nocturno (Café Expreso / Cita / Día Libre), es inmune toda la noche
    if (p.nightPassActive === currentDayStr) return;

    // Convertir hora a minutos continuos desde las 9:00 PM (21:00 = 1260m). Si es de madrugada (0:00 a 3:59), sumar 24h (1440m)
    let continuousMins = (h < 4 ? (h + 24) : h) * 60 + m + (s / 60);
    let startBleedMins = 21 * 60 + 15; // 9:15 PM (1275m)

    // Si activó la Estampida de Tank hoy, retrasa +45 min el inicio del sangrado (inicia a las 10:00 PM y mata a las 10:45 PM)
    if (p.tankCurfewDelayDay === currentDayStr) {
        startBleedMins += 45; }
    if (p.movieNightCurfewDay === currentDayStr) { startBleedMins = 22 * 60 + 55; }

    if (continuousMins < startBleedMins || (h >= 4 && h < 21)) return;

    p.sleepDebt = true;
    let maxHealth = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let hasMercy = (p.mercyActive === currentDayStr);

    let tankObj = (p.shadowArmy && p.shadowArmy.tank) ? p.shadowArmy.tank : null;
    let tankReady = p.equippedShadows && p.equippedShadows.includes('tank') && tankObj && (!tankObj.cooldownUntil || now.getTime() > tankObj.cooldownUntil) && (tankObj.usesLeft > 0);

    if (tankReady && p.tankUsedNightStr !== currentDayStr) {
        p.tankUsedNightStr = currentDayStr;
        tankObj.usesLeft = Math.max(0, (tankObj.usesLeft !== undefined ? tankObj.usesLeft : 2) - 1);
        if (typeof systemNotify === "function") {
            systemNotify(`🐻‍❄️ Tank ha activado su Pelaje Ártico por esta noche (Guardias restantes: ${tankObj.usesLeft}/2).`, "purple");
        }
        if (tankObj.usesLeft <= 0) tankObj.hibernationPending = true;
    }

    // Hora límite de muerte: 10:00 PM (o 10:45 PM con activa de Tank), PERO con Piedra de la Misericordia se extiende hasta las 2:00 AM (26 * 60 = 1560m)
    let deathLimitMins = hasMercy ? (26 * 60) : (startBleedMins + 45);
    let totalWindowMins = deathLimitMins - startBleedMins;
    let elapsedBleedMins = continuousMins - startBleedMins;

    // 1. Si ya pasó la hora límite de muerte (10:00 PM normal, o 2:00 AM con Piedra de la Misericordia)
    if (continuousMins >= deathLimitMins) {
        if (tankReady && !hasMercy) {
            if (p.hp > 20) {
                animateHPFastDrop(20, maxHealth);
            } else {
                p.hp = 20;
            }
            if (tankObj.hibernationPending) {
                tankObj.cooldownUntil = Date.now() + (24 * 3600000);
                tankObj.usesLeft = 2;
                tankObj.hibernationPending = false;
                p.equippedShadows = p.equippedShadows.filter(x => x !== 'tank');
                if (typeof systemNotify === "function") {
                    systemNotify("🧊 Tank ancló tu vida en 20 HP tras el golpe letal de las 10:00 PM y entró en Hibernación por 24h.", "purple");
                }
            }
            if (typeof updateHUD === "function") updateHUD();
            return;
        }

        // Sin Tank (o si ya dieron las 2:00 AM incluso con Piedra): Caída rápida a 0 HP y Muerte
        animateHPFastDrop(0, maxHealth, () => {
            triggerDeath(hasMercy ? "El límite de las 2:00 AM de la Piedra de la Misericordia expiró." : "Ejecución Nocturna de las 10:00 PM. El Sistema aniquila a los desvelados.", "midnight");
            if (typeof playSystemSound === "function") playSystemSound('danger');
        });
        return;
    }

    // 2. Estamos dentro de la ventana de sangrado (Ej: 9:15 PM a 9:59 PM, o hasta la 1:59 AM con Piedra)
    let progress = Math.max(0, Math.min(1, elapsedBleedMins / totalWindowMins));
    // Curva progresiva: calcula exactamente cuánta vida deberías tener a esta hora exacta
    let curveExp = hasMercy ? 1.6 : 1.25;
    let expectedHP = maxHealth * (1 - Math.pow(progress, curveExp));

    if (tankReady) {
        // Tank mitiga el 50% de la pérdida y nunca deja que baje de 20 HP
        expectedHP = Math.max(20, maxHealth - ((maxHealth - expectedHP) * 0.5));
    }
    if (p.cryoBuffUntil && now.getTime() < p.cryoBuffUntil) {
        expectedHP = maxHealth - ((maxHealth - expectedHP) * 0.5);
    }

    if (p.hp > expectedHP) {
        let dropNeeded = p.hp - expectedHP;
        // Si adelantaste el reloj (ej. a las 9:50 PM) o la diferencia es mayor a 3 HP, baja súper rápido visualmente
        if (isClockJump || dropNeeded >= 3) {
            animateHPFastDrop(expectedHP, maxHealth, () => {
                triggerDeath("Tus signos vitales cedieron ante la hemorragia nocturna.", "midnight");
            });
        } else {
            p.hp = Math.max(0, expectedHP);
            if (typeof updateHUD === "function") updateHUD();
            if (p.hp <= 0) {
                triggerDeath("Tus signos vitales cedieron ante la hemorragia nocturna.", "midnight");
            }
        }
    }
}

function startCurfewClockWatcher() {
    if (window.curfewWatchInterval) clearInterval(window.curfewWatchInterval);
    // Revisa cada 1.5 segundos si adelantaste la hora del dispositivo o si estás en sangrado activo
    window.curfewWatchInterval = setInterval(() => {
        if (!p || p.penaltyActive) return;
        let now = new Date();
        let curMinStamp = now.getHours() * 60 + now.getMinutes();
        let jumped = (lastEvaluatedClockMin !== -1 && curMinStamp !== lastEvaluatedClockMin);
        lastEvaluatedClockMin = curMinStamp;
        evaluateNightCurfew(jumped);
    }, 1500);
}

function systemTick() {
    let now = new Date();
    let h = now.getHours(); 
    let m = now.getMinutes();
    let currentDayStr = now.toDateString();

    if (p.lastLogin !== currentDayStr) {
        if (typeof checkDaily === "function") checkDaily(currentDayStr);
    }
    
    if (typeof checkCurrentZone === "function") checkCurrentZone(h, now.getDay());
    if (typeof _evalArcTickHook === "function") _evalArcTickHook(now, h, m);

    evaluateNightCurfew(false);

    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
    let maxHealth = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;

    // Pasiva de Beru en campo: Regeneración de Rango S (+2 HP y +2 SP por minuto)
    if (!p.penaltyActive && p.equippedShadows && p.equippedShadows.includes('beru')) {
        let isNightBleed = ((h === 21 && m >= 15) || h >= 22 || h < 4) && p.nightPassActive !== currentDayStr;
        if (!isNightBleed && p.hp < maxHealth) {
            p.hp = Math.min(maxHealth, +(p.hp + 2).toFixed(1));
        }
        if (p.sp < 100) {
            p.sp = Math.min(100, p.sp + 2);
        }
        if (typeof updateHUD === "function") updateHUD();
    }

    let maxBossMins = (accId === "eq_acc_chalice") ? 85 : 70;
    let currTime = Date.now();
    if (p.bosses && p.bosses.length > 0) {
        p.bosses.forEach((b, idx) => {
            if (b.start && !b.paused) {
                let elapsedMins = (currTime - b.start) / 60000;
                if (elapsedMins > maxBossMins) {
                    p.bosses[idx].start = null;
                    let ironEquipped = p.equippedShadows && p.equippedShadows.includes('iron');
                    let desertionDmg = ironEquipped ? 10 : 40;
                    if (p.ironImmunityUntil && currTime < p.ironImmunityUntil) desertionDmg = 0;
                    p.hp = Math.max(0, p.hp - desertionDmg);
                    if (typeof systemNotify === "function") {
                        systemNotify(`⚔️ Infracción: Abandonaste a [${b.title}]. -${desertionDmg} HP${ironEquipped ? ' (75% absorbido por Iron)' : ''}`, "danger");
                    }
                    if (typeof playSystemSound === "function") playSystemSound('danger');
                    
                    if (p.hp <= 0) {
                        triggerDeath("Deserción en combate contra un Jefe.", "routine");
                    } else {
                        if (typeof updateHUD === "function") updateHUD(); 
                        if (typeof renderBosses === "function") renderBosses();
                    }
                }
            }
        });
    }

    if (p.lunchRegen > 0) {
        let heal = Math.min(4, p.lunchRegen);
        p.sp = Math.min(100, p.sp + heal);
        p.lunchRegen -= heal;
        if (typeof systemNotify === "function") systemNotify(`🥗 Absorbiendo nutrientes: +${heal} SP`, "stamina");
        if (typeof updateHUD === "function") updateHUD();
    }

    if (typeof checkFissureSpawn === "function") checkFissureSpawn();
    if (typeof saveData === "function") saveData();
}

/* ==========================================================================
   11. INICIALIZACIÓN MAESTRA Y FORZADO DE CUARENTENA
   ========================================================================== */
function initializeSystem() {
    if (!p.equipment) p.equipment = { weapon: null, armor: null, accessory: null };
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

function getHunterMiniSVG() {
    let wId = (p && p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p && p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p && p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";

    let coatStroke = "#00d2ff";
    let coatTop = "#0f172a";
    let coatBot = "#03060c";
    let backExtras = "";
    let headGear = "";
    let armorLayer = "";
    let accAura = "";

    // 1. LAS 14 ARMADURAS AMOLDADAS EXACTAMENTE AL CONTORNO DEL PECHO Y HOMBROS (M18 62 -> M102 62)
    if (aId === "eq_a_leather") {
        // Chaleco Táctico moldeado sobre las solapas y pectorales del nuevo torso
        armorLayer = `
            <path d="M30 52 L48 48 L60 66 L72 48 L90 52 L86 98 L60 104 L34 98 Z" fill="#451a03" stroke="#f59e0b" stroke-width="1.3"/>
            <polygon points="35,58 55,66 53,82 34,78" fill="#78350f" stroke="#fbbf24" stroke-width="0.9"/>
            <polygon points="85,58 65,66 67,82 86,78" fill="#78350f" stroke="#fbbf24" stroke-width="0.9"/>
            <line x1="36" y1="52" x2="82" y2="94" stroke="#fde047" stroke-width="1.5"/>
            <line x1="84" y1="52" x2="38" y2="94" stroke="#fde047" stroke-width="1.5"/>
            <rect x="54" y="84" width="12" height="6" rx="1" fill="#fde047" stroke="#78350f" stroke-width="0.8"/>`;
    } else if (aId === "eq_a_boots_e") {
        coatStroke = "#38bdf8";
        armorLayer = `
            <path d="M32 52 L48 48 L60 68 L72 48 L88 52 L84 102 L36 102 Z" fill="rgba(14, 116, 144, 0.35)" stroke="#00ffff" stroke-width="1.3"/>
            <polyline points="38,76 60,90 82,76" fill="none" stroke="#00ffff" stroke-width="2"/>`;
    } else if (aId === "eq_a_serpento") {
        coatStroke = "#ef4444"; coatTop = "#1f090d";
        armorLayer = `
            <path d="M18 62 C24 48, 36 45, 48 48 L44 68 L20 68 Z" fill="#991b1b" stroke="#f87171" stroke-width="1.3"/>
            <path d="M102 62 C96 48, 84 45, 72 48 L76 68 L100 68 Z" fill="#991b1b" stroke="#f87171" stroke-width="1.3"/>
            <path d="M34 52 L48 48 L60 68 L72 48 L86 52 L82 100 L60 106 L38 100 Z" fill="#111827" stroke="#ef4444" stroke-width="1.4"/>
            <polyline points="40,62 60,78 80,62" fill="none" stroke="#fca5a5" stroke-width="2"/>`;
    } else if (aId === "eq_a_helm_d") {
        headGear = `<path d="M40 24 Q60 8 80 24 L78 32 L60 27 L42 32 Z" fill="#475569" stroke="#e2e8f0" stroke-width="1.4"/>`;
        armorLayer = `<path d="M30 52 L48 48 L60 66 L72 48 L90 52 L85 98 L35 98 Z" fill="#1e293b" stroke="#94a3b8" stroke-width="1.4"/>`;
    } else if (aId === "eq_a_gloves_c") {
        coatStroke = "#10b981";
        armorLayer = `
            <path d="M30 52 L48 48 L60 66 L72 48 L90 52 L84 98 L60 104 L36 98 Z" fill="#064e3b" stroke="#10b981" stroke-width="1.4"/>
            <polyline points="38,64 60,78 82,64" fill="none" stroke="#34d399" stroke-width="1.8"/>`;
    } else if (aId === "eq_a_assassin") {
        coatStroke = "#a855f7"; coatTop = "#140726";
        headGear = `<path d="M60 4 Q36 10 34 40 L43 46 L60 16 L77 46 L86 40 Q84 10 60 4 Z" fill="rgba(9, 4, 20, 0.9)" stroke="#a855f7" stroke-width="1.4"/>`;
        armorLayer = `<path d="M30 50 L48 48 L60 68 L72 48 L90 50 L86 102 L34 102 Z" fill="#0b0317" stroke="#a855f7" stroke-width="1.4"/>`;
    } else if (aId === "eq_a_mage_b") {
        coatStroke = "#f43f5e"; coatTop = "#3b0718";
        armorLayer = `
            <path d="M28 50 L48 48 L60 68 L72 48 L92 50 L88 106 L32 106 Z" fill="#2a0512" stroke="#fb7185" stroke-width="1.4"/>
            <polygon points="48,50 60,98 72,50" fill="none" stroke="#fde047" stroke-width="1.6"/>`;
    } else if (aId === "eq_a1") {
        coatStroke = "#ff2a55";
        headGear = `<path class="igris-plume-anim" d="M60 8 C40 -4, 18 10, 12 34 C28 24, 46 16, 60 14 Z" fill="#ff2a55"/>`;
        armorLayer = `
            <polygon points="16,58 44,46 42,68 18,66" fill="#0f172a" stroke="#00d2ff" stroke-width="1.4"/>
            <polygon points="104,58 76,46 78,68 102,66" fill="#0f172a" stroke="#00d2ff" stroke-width="1.4"/>
            <path d="M32 52 L48 48 L60 64 L72 48 L88 52 L84 100 L60 106 L36 100 Z" fill="#070c18" stroke="#00d2ff" stroke-width="1.5"/>
            <polyline points="42,60 60,72 78,60" fill="none" stroke="#ffffff" stroke-width="2"/>
            <polyline points="44,70 60,82 76,70" fill="none" stroke="#00ffff" stroke-width="1.8"/>`;
    } else if (aId === "eq_a_high_orc" || aId === "eq_a_giant") {
        coatStroke = "#f97316";
        armorLayer = `
            <polygon points="12,56 46,42 44,70 14,66" fill="#1e293b" stroke="#f97316" stroke-width="1.8"/>
            <polygon points="108,56 74,42 76,70 106,66" fill="#1e293b" stroke="#f97316" stroke-width="1.8"/>
            <path d="M30 52 L48 48 L60 66 L72 48 L90 52 L86 102 L34 102 Z" fill="#27120b" stroke="#fb923c" stroke-width="1.6"/>`;
    } else if (aId === "eq_a_beru" || aId === "eq_a_valkyrie") {
        coatStroke = "#00ffcc";
        backExtras = `<g class="svg-wings-flutter">
            <path d="M52 56 L4 16 L16 78 Z" fill="rgba(0, 255, 204, 0.3)" stroke="#00ffcc" stroke-width="1.4"/>
            <path d="M68 56 L116 16 L104 78 Z" fill="rgba(0, 255, 204, 0.3)" stroke="#00ffcc" stroke-width="1.4"/>
        </g>`;
        armorLayer = `<path d="M30 50 L48 48 L60 66 L72 48 L90 50 L84 102 L60 108 L36 102 Z" fill="#040814" stroke="#00ffcc" stroke-width="1.6"/>`;
    } else if (aId === "eq_a_archlich") {
        coatStroke = "#c084fc";
        backExtras = `<circle cx="60" cy="58" r="48" fill="none" stroke="#c084fc" stroke-width="1.4" stroke-dasharray="6 4"/>`;
        armorLayer = `<path d="M28 50 L48 48 L60 68 L72 48 L92 50 L88 106 L32 106 Z" fill="#160629" stroke="#c084fc" stroke-width="1.5"/>`;
    } else if (aId === "eq_a_ashborn") {
        coatStroke = "#d946ef";
        headGear = `<polygon points="44,14 36,-2 52,10 60,-4 68,10 84,-2 76,14" fill="#d946ef" stroke="#ffffff" stroke-width="1.1"/>`;
        backExtras = `<path class="svg-shadow-flame-1" d="M14 110 Q24 52 14 16 Q60 42 106 16 Q96 52 106 110 Z" fill="rgba(157, 0, 255, 0.32)"/>`;
        armorLayer = `
            <polygon points="14,54 46,42 44,68 16,64" fill="#090314" stroke="#d946ef" stroke-width="1.6"/>
            <polygon points="106,54 74,42 76,68 104,64" fill="#090314" stroke="#d946ef" stroke-width="1.6"/>
            <path d="M30 50 L48 48 L60 66 L72 48 L90 50 L86 104 L60 110 L34 104 Z" fill="#090314" stroke="#f0abfc" stroke-width="1.6"/>`;
    }

    // 2. LOS 10 ACCESORIOS CON DISEÑO VISUAL PROPIO (ADIÓS AL PUNTO AZUL GENÉRICO)
    if (accId === "eq_acc_black_heart" || aId === "eq_a_ashborn") {
        accAura = `
            <g class="igris-sword-glow">
                <path d="M46 60 L60 68 L74 60 M50 78 L60 68 L70 78" fill="none" stroke="#a855f7" stroke-width="1.4"/>
                <polygon points="60,58 67,65 60,75 53,65" fill="#090214" stroke="#d946ef" stroke-width="1.6"/>
                <circle cx="60" cy="66" r="2.5" fill="#ffffff"/>
            </g>`;
    } else if (accId === "eq_acc_cerberus") {
        // Collar de Colmillos de Cerbero y Llamas Infernales alrededor del cuello
        accAura = `
            <g class="igris-sword-glow">
                <path d="M44 50 Q60 60 76 50" fill="none" stroke="#ff4500" stroke-width="2.2"/>
                <polygon points="48,52 51,62 54,53" fill="#ffffff" stroke="#dc2626" stroke-width="0.8"/>
                <polygon points="57,55 60,67 63,55" fill="#fde047" stroke="#ff0000" stroke-width="1"/>
                <polygon points="66,53 69,62 72,52" fill="#ffffff" stroke="#dc2626" stroke-width="0.8"/>
            </g>`;
    } else if (accId === "eq_acc_wolf") {
        // Colgante de Colmillo Blanco Lupino
        accAura = `
            <path d="M48 48 Q60 58 72 48" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
            <polygon points="57,54 63,54 60,69" fill="#f8fafc" stroke="#38bdf8" stroke-width="1"/>`;
    } else if (accId === "eq_acc_copper") {
        // Anillo Mental con Halo de Enfoque Cian
        accAura = `<ellipse cx="60" cy="22" rx="24" ry="5" fill="none" stroke="#f59e0b" stroke-width="1.3" stroke-dasharray="4 3"/>`;
    } else if (accId === "eq_acc_silver") {
        // Insignia de Plata de la Asociación en la solapa
        accAura = `<polygon points="72,56 76,60 72,66 68,60" fill="#e2e8f0" stroke="#38bdf8" stroke-width="1.2"/>`;
    } else if (accId === "eq_acc_gate") {
        // Cadenas Rúnicas Azules de Cartenon cruzando el torso
        accAura = `
            <line x1="34" y1="54" x2="86" y2="86" stroke="#00d2ff" stroke-width="2" stroke-dasharray="3 2"/>
            <line x1="86" y1="54" x2="34" y2="86" stroke="#00d2ff" stroke-width="2" stroke-dasharray="3 2"/>`;
    } else if (accId === "eq_acc_metus") {
        // Rosario Nigromante Púrpura del Metus
        accAura = `
            <path d="M46 50 Q60 66 74 50" fill="none" stroke="#c084fc" stroke-width="2" stroke-dasharray="2 3"/>
            <polygon points="60,58 65,66 60,74 55,66" fill="#581c87" stroke="#e9d5ff" stroke-width="1.2"/>`;
    } else if (accId === "eq_acc_kandiaru") {
        // Runa Geométrica Dorada de Kandiaru
        accAura = `
            <polygon points="60,56 68,68 52,68" fill="none" stroke="#00ffcc" stroke-width="1.3"/>
            <polygon points="60,72 68,60 52,60" fill="none" stroke="#fde047" stroke-width="1.3"/>`;
    } else if (accId === "eq_acc_national") {
        // Estrella Dorada de Nivel Nacional
        accAura = `<polygon points="60,54 63,62 71,62 65,67 67,75 60,70 53,75 55,67 49,62 57,62" fill="#fde047" stroke="#ffffff" stroke-width="1" class="igris-sword-glow"/>`;
    } else if (accId === "eq_acc_chalice") {
        // Reliquia de la Copa del Renacimiento
        accAura = `
            <polygon points="54,58 66,58 62,67 58,67" fill="#fbbf24" stroke="#ffffff" stroke-width="1"/>
            <line x1="60" y1="67" x2="60" y2="73" stroke="#fbbf24" stroke-width="2"/>
            <line x1="55" y1="73" x2="65" y2="73" stroke="#fbbf24" stroke-width="2"/>`;
    }
        // === MANOS, BRAZOS Y HUMO DE SOMBRA (reutilizables) ===
    const r1 = n => Math.round(n * 10) / 10;

    // Puño enguantado con nudillos, juntas de dedos, pulgar y aura de maná. Apunta hacia +X, se rota con "rot"
    const makeHand = (cx, cy, rot, glow) => `
        <g transform="translate(${cx} ${cy}) rotate(${rot}) scale(1.2)">
            <circle r="10" fill="${glow}" opacity=".3" filter="url(#softGlow)">
                <animate attributeName="r" values="8;12;8" dur="1.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values=".18;.42;.18" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <path d="M-6.5 -5.2 C-2 -6.8 5 -6.8 8 -4.6 C9.6 -2.6 9.6 2.6 8 4.6 C5 6.8 -2 6.8 -6.5 5.2 Z" fill="#0b1324" stroke="${glow}" stroke-width="1.1" stroke-linejoin="round"/>
            <path d="M2.5 -5.6 L2.5 1.4 M2.5 -2.4 L9 -2.4 M2.5 0 L9.4 0" fill="none" stroke="${glow}" stroke-width=".6" opacity=".55"/>
            <path d="M-4.5 3.2 C-1 1.6 3.5 2 5.4 4 C3.4 6.2 -2 6.5 -4.5 5 Z" fill="#14213d" stroke="${glow}" stroke-width=".7"/>
            <g fill="#1e3a5f" stroke="#bae6fd" stroke-width=".5">
                <circle cx="7.3" cy="-3.7" r="1.4"/><circle cx="7.7" cy="-1.2" r="1.4"/>
                <circle cx="7.7" cy="1.3" r="1.4"/><circle cx="7.3" cy="3.7" r="1.4"/>
            </g>
        </g>`;

    // Brazo completo: manga oscura + vendas con rayas + puño. (x1,y1) = codo, (x2,y2) = centro del puño
    const makeArm = (x1, y1, x2, y2, glow) => {
        const L = Math.hypot(x2 - x1, y2 - y1);
        const ang = r1(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI);
        const w = r1(L - 6), b0 = r1(L * 0.22);
        let tape = "";
        for (let x = b0 + 2; x < w - 1; x += 3.2) tape += `M${r1(x)} -5.2L${r1(x + 2.2)} 5.2`;
        return `
        <g transform="translate(${x1} ${y1}) rotate(${ang})">
            <path d="M0 -6.6L${w} -5L${w} 5L0 6.6A6.6 6.6 0 0 1 0 -6.6Z" fill="#0e1a30"/>
            <path d="M${b0} -5.6L${w} -5L${w} 5L${b0} 5.6Z" fill="#dbe4ee" stroke="#64748b" stroke-width="1"/>
            <path d="${tape}" fill="none" stroke="#94a3b8" stroke-width="1"/>
            <path d="M${b0} -4.3L${w} -3.8" fill="none" stroke="#ffffff" stroke-width=".6" opacity=".7"/>
            <path d="M${r1(w - 1.5)} -5L${r1(w - 1.5)} 5" fill="none" stroke="${glow}" stroke-width="1.2"/>
        </g>${makeHand(x2, y2, ang, glow)}`;
    };

    // Humo épico: dos capas de llamas que mutan de forma + volutas que suben + brasas
    const flameA = "M10 118C0 92 6 64 14 40C20 52 24 56 30 58C24 40 26 22 32 8C38 28 42 38 48 42C50 30 54 14 60 0C66 14 70 30 72 42C78 38 82 28 88 8C94 22 96 40 90 58C96 56 100 52 106 40C114 64 120 92 110 118Z";
    const flameB = "M10 118C2 90 4 60 18 34C20 50 26 56 30 58C28 36 30 18 28 4C36 24 42 38 48 42C48 28 56 18 60 6C64 18 72 28 72 42C78 38 84 24 92 4C90 18 92 38 90 58C94 56 100 50 102 34C116 60 118 90 110 118Z";
    const morph = (a, b, dur) => `<animate attributeName="d" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" values="${a};${b};${a}"/>`;

    const wisps = [[12,100,2.6,0],[22,84,3.1,.9],[28,58,2.8,1.7],[92,58,3.0,.5],[98,84,2.7,1.4],[108,100,3.2,2.1],[50,30,2.5,1.1],[70,30,2.9,.2]]
        .map(([x, y, d, b]) => `
        <g transform="translate(${x} ${y})"><path d="M0 0C-4-9 3-15-1-26C7-16 6-8 0 0Z" fill="url(#smokeGrad)" opacity="0">
            <animateTransform attributeName="transform" type="translate" values="0 0;${x < 60 ? -4 : 4} -34" dur="${d}s" begin="${b}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;.9;0" dur="${d}s" begin="${b}s" repeatCount="indefinite"/>
        </path></g>`).join("");

    const embers = [[16,3.1,0],[26,2.7,.8],[38,3.6,1.5],[82,3.0,.4],[94,3.4,1.1],[104,2.8,1.9],[10,3.8,2.3],[110,3.3,.2]]
        .map(([x, d, b], i) => `<circle cx="${x}" cy="108" r="1.1" fill="${i % 2 ? '#c084fc' : '#9ff3ff'}" opacity="0">
            <animate attributeName="cy" values="108;14" dur="${d + 1.5}s" begin="${b}s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="${x};${x + (x < 60 ? -5 : 5)};${x}" dur="${d + 1.5}s" begin="${b}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="${d + 1.5}s" begin="${b}s" repeatCount="indefinite"/>
        </circle>`).join("");

    const smokeFX = `
        <g filter="url(#smokeWarp)">
            <path d="${flameA}" fill="url(#smokeGrad)" stroke="url(#smokeRim)" stroke-width=".9" opacity=".92">${morph(flameA, flameB, 2.6)}</path>
            <g transform="translate(12 23.6) scale(.8)">
                <path d="${flameB}" fill="url(#smokeHot)" opacity=".8">${morph(flameB, flameA, 1.9)}</path>
            </g>
            ${wisps}
        </g>
        ${embers}`;

    // 3. POSES DE COMBATE Y ARMAS REDISEÑADAS (SIN ARMA = PUÑOS VENDADOS SIN CUCHILLAS)
                let weaponAndArmsLayer = "";
    let topBladeStroke = "#00d2ff";
    let botBladeStroke = "#ff2a55";
    if (!wId) {
        // DESARMADO: Guardia Marcial a Manos Limpias (Brazos y puños vendados con aura de maná, CERO cuchillas) 
        weaponAndArmsLayer = `
        <g class="svg-arm-weapon">
            <g stroke="#0e1a30" stroke-width="12.5" stroke-linecap="round" fill="none">
                <path d="M23 66 Q22 80 28 92"/>
                <path d="M97 66 Q98 82 93 94"/>
            </g>
            ${makeArm(93, 94, 74, 61, "#38bdf8")}
            ${makeArm(28, 92, 47, 55, "#00ffff")}
        </g>`;
    } else if (wId === "eq_w_bow") {
        // ARCO COMPUESTO: Cuerpo firme y arco rúnico tensado a la derecha
        weaponAndArmsLayer = `
        <g>
            <polygon points="64,60 92,56 94,65 66,69" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <line x1="74" y1="58" x2="76" y2="67" stroke="#64748b" stroke-width="1.2"/>
            <line x1="82" y1="57" x2="84" y2="66" stroke="#64748b" stroke-width="1.2"/>
            <rect x="89" y="55" width="7" height="10" rx="2" fill="#0f172a" stroke="#00ffcc" stroke-width="1.2"/>

            <polygon points="24,68 48,54 54,62 30,76" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
            <line x1="32" y1="63" x2="37" y2="71" stroke="#64748b" stroke-width="1.2"/>
            <line x1="40" y1="58" x2="45" y2="66" stroke="#64748b" stroke-width="1.2"/>
            <rect x="46" y="54" width="9" height="9" rx="2" fill="#0f172a" stroke="#00d2ff" stroke-width="1.2"/>

            <g class="svg-bow-draw">
                <path d="M84 14 C104 28, 112 44, 94 60 C112 76, 104 92, 84 106" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
                <path d="M84 14 C104 28, 112 44, 94 60 C112 76, 104 92, 84 106" fill="none" stroke="#00ffcc" stroke-width="2.2" stroke-linecap="round" filter="drop-shadow(0 0 6px #00ffcc)"/>
                <polyline points="84,14 50,59 84,106" fill="none" stroke="#e2e8f0" stroke-width="1.3"/>
                <line x1="48" y1="59" x2="114" y2="59" stroke="#00ffff" stroke-width="2.8" filter="drop-shadow(0 0 8px #00ffff)"/>
                <polygon points="119,59 105,52 108,59 105,66" fill="#ffffff" stroke="#00ffcc" stroke-width="1"/>
            </g>
        </g>`;
    } else if (wId === "eq_w_iron_mace" || wId === "eq_w_vulcan_club") {
        // MAZA PESADA / GARROTE DE VULCANO: Descansando sobre el hombro derecho con cabeza de guerra octagonal y pinchos (SIN tapar la cara)
        let isVulcan = (wId === "eq_w_vulcan_club");
        let coreCol = isVulcan ? "#7c2d12" : "#1e293b";
        let rimCol = isVulcan ? "#ff4500" : "#94a3b8";
        let glowCol = isVulcan ? "#fde047" : "#38bdf8";
        weaponAndArmsLayer = `
        <g class="svg-arm-weapon">
            <!-- Asta pesada apoyada desde la cintura hasta detrás del hombro derecho (libre del rostro) -->
            <line x1="56" y1="96" x2="96" y2="28" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
            <line x1="56" y1="96" x2="96" y2="28" stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round"/>
            <!-- Pomo inferior -->
            <circle cx="55" cy="98" r="3.5" fill="${rimCol}" stroke="#ffffff" stroke-width="1"/>

            <!-- Cabeza de Maza Bridada con 6 Pinchos de Acero/Magma arriba a la derecha (X:96, Y:24) -->
            <polygon points="96,4 102,14 90,14" fill="#ffffff"/>
            <polygon points="116,16 106,24 104,14" fill="#ffffff"/>
            <polygon points="116,34 104,34 106,24" fill="#ffffff"/>
            <polygon points="76,16 88,14 86,24" fill="#ffffff"/>
            <polygon points="88,12 104,12 110,24 104,36 88,36 82,24" fill="${coreCol}" stroke="${rimCol}" stroke-width="2" filter="drop-shadow(0 0 8px ${rimCol})"/>
            <polygon points="92,16 100,16 104,24 100,32 92,32 88,24" fill="${rimCol}"/>
            <circle cx="96" cy="24" r="3.5" fill="${glowCol}"/>

            <!-- Brazo derecho vendado flexionado sujetando el mango a la altura del pecho -->
            <polygon points="68,84 86,62 94,68 76,90" fill="#e2e8f0" stroke="#475569" stroke-width="1.3"/>
            <line x1="74" y1="78" x2="82" y2="84" stroke="#64748b" stroke-width="1.3"/>
            <line x1="79" y1="71" x2="87" y2="77" stroke="#64748b" stroke-width="1.3"/>
            <rect x="74" y="56" width="11" height="10" rx="2" transform="rotate(-28 79 61)" fill="#0f172a" stroke="${glowCol}" stroke-width="1.4"/>

            <!-- Brazo izquierdo vendado sujetando la base del mango -->
            <polygon points="34,76 62,76 62,86 34,86" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <line x1="44" y1="76" x2="44" y2="86" stroke="#64748b" stroke-width="1.2"/>
            <line x1="52" y1="76" x2="52" y2="86" stroke="#64748b" stroke-width="1.2"/>
            <rect x="58" y="74" width="11" height="11" rx="2" fill="#0f172a" stroke="#00d2ff" stroke-width="1.3"/>
        </g>`;
    } else if (wId === "eq_w_scythe" || wId === "eq_w_halberd") {
        // GUADAÑA DEL SEGADOR / ALABARDA REAL: Asta larga lateral derecha con hoja curva gigante arriba sin tapar los ojos
        let isScythe = (wId === "eq_w_scythe");
        let bladeFill = isScythe ? "#140526" : "#7f1d1d";
        let bladeStroke = isScythe ? "#d946ef" : "#ff2a55";
        let edgeGlow = isScythe ? "#00ffff" : "#fde047";
        let headSvg = isScythe
            ? `<path d="M92 22 C72 2, 28 6, 16 28 C44 18, 72 22, 88 34 Z" fill="${bladeFill}" stroke="${bladeStroke}" stroke-width="1.8" filter="drop-shadow(0 0 8px ${bladeStroke})"/>
               <path d="M18 27 C44 19, 70 23, 86 33" fill="none" stroke="#ffffff" stroke-width="1.3"/>
               <circle cx="90" cy="26" r="4" fill="${edgeGlow}"/>`
            : `<polygon points="92,24 98,2 86,22" fill="#ffffff" stroke="#ff2a55" stroke-width="1.2"/>
               <path d="M90 18 C116 12, 118 44, 84 42 C96 34, 96 24, 90 18 Z" fill="#991b1b" stroke="#ff2a55" stroke-width="1.6"/>
               <polygon points="88,22 72,18 84,32" fill="#fde047"/>`;

        weaponAndArmsLayer = `
        <g class="svg-arm-weapon">
            <!-- Asta diagonal estilizada a la derecha del cuerpo -->
            <line x1="68" y1="112" x2="94" y2="16" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
            <line x1="68" y1="112" x2="94" y2="16" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
            ${headSvg}
            <!-- Mano derecha alta y mano izquierda baja con vendas -->
            <polygon points="64,68 84,56 88,65 68,77" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
            <rect x="80" y="53" width="10" height="10" rx="2" fill="#0f172a" stroke="${bladeStroke}" stroke-width="1.3"/>
            <polygon points="38,80 72,82 72,91 38,89" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <line x1="50" y1="81" x2="50" y2="90" stroke="#64748b" stroke-width="1.2"/>
            <rect x="68" y="80" width="10" height="10" rx="2" fill="#0f172a" stroke="#00d2ff" stroke-width="1.3"/>
        </g>`;
    } else if (wId === "eq_w_kargalgan") {
        // ORBE DE AVARICIA: Manos abiertas conjurando y el Orbe carmesí levitando con anillos arcanos
        weaponAndArmsLayer = `
        <g class="svg-arm-weapon">
            <polygon points="26,74 48,58 54,66 32,82" fill="#e2e8f0" stroke="#475569" stroke-width="1.2"/>
            <line x1="34" y1="68" x2="40" y2="76" stroke="#64748b" stroke-width="1.2"/>
            <polygon points="46,56 58,52 56,64 46,64" fill="#0f172a" stroke="#ff2a55" stroke-width="1.3"/>
            <polygon points="58,80 82,72 86,81 62,89" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <polygon points="80,70 92,66 90,78 80,78" fill="#0f172a" stroke="#ffcc00" stroke-width="1.3"/>
            <g class="svg-orb-levitate">
                <circle cx="96" cy="46" r="16" fill="none" stroke="#ffcc00" stroke-width="1.2" stroke-dasharray="5 3"/>
                <circle cx="96" cy="46" r="11" fill="#dc2626" stroke="#ff2a55" stroke-width="2" filter="drop-shadow(0 0 10px #ff0055)"/>
                <circle cx="96" cy="46" r="5" fill="#fef08a"/>
            </g>
        </g>`;
    } else if (wId === "eq_w_kim" || wId === "eq_w_demon_sword") {
        // ESPADA DE KIM SANGSHIK / ESPADA LARGA DE BARAN: Mandoble cruzado con guardia detallada
        let isBaran = (wId === "eq_w_demon_sword");
        let swordCol = isBaran ? "#ffffff" : "#38bdf8";
        let swordEdge = isBaran ? "#00ffff" : "#0284c7";
        weaponAndArmsLayer = `
        <g class="svg-arm-weapon">
            <polygon points="52,80 76,74 78,86 54,92" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <polygon points="26,70 50,48 58,56 36,80" fill="#e2e8f0" stroke="#475569" stroke-width="1.3"/>
            <line x1="32" y1="64" x2="42" y2="74" stroke="#64748b" stroke-width="1.3"/>
            <line x1="38" y1="58" x2="48" y2="68" stroke="#64748b" stroke-width="1.3"/>
            <line x1="30" y1="32" x2="48" y2="48" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
            <line x1="30" y1="32" x2="48" y2="48" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round"/>
            <polygon points="38,56 58,36 62,40 42,60" fill="#fde047" stroke="#78350f" stroke-width="1.2"/>
            <polygon points="50,44 114,84 118,94 106,92 44,52" fill="${swordCol}" stroke="${swordEdge}" stroke-width="1.6" filter="drop-shadow(0 0 8px ${swordEdge})"/>
            <line x1="52" y1="50" x2="112" y2="88" stroke="#0f172a" stroke-width="1.5"/>
            <rect x="43" y="43" width="12" height="11" rx="2" fill="#0f172a" stroke="#00d2ff" stroke-width="1.4"/>
        </g>`;
    } else {
        // TODAS LAS DAGAS EQUIPADAS (Kasaka, Knight Killer, Baruka, Baran, Kamish, Lycan, Duende, Arácnida)
        if (wId === "eq_w1") { topBladeStroke = "#00ffcc"; botBladeStroke = "#38bdf8"; }
        else if (wId === "eq_w_killer") { topBladeStroke = "#ff2a55"; botBladeStroke = "#f97316"; }
        else if (wId === "eq_w_demon_daggers") { topBladeStroke = "#ffffff"; botBladeStroke = "#00ffff"; }
        else if (wId === "eq_w_kamish") { topBladeStroke = "#ff0055"; botBladeStroke = "#fde047"; }
        else if (wId === "eq_w_baruka") { topBladeStroke = "#00ffcc"; botBladeStroke = "#bae6fd"; }

        weaponAndArmsLayer = `
        <g class="svg-arm-weapon">
            <path d="M58 88 L8 96 L18 84 L42 82 Z" fill="#09040a" stroke="${botBladeStroke}" stroke-width="1.5"/>
            <path d="M12 94 L24 91 L30 93 L42 90 L56 89" fill="none" stroke="#00ffff" stroke-width="1"/>
            <polygon points="52,80 76,74 78,86 54,92" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <line x1="58" y1="80" x2="60" y2="90" stroke="#64748b" stroke-width="1.2"/>
            <line x1="66" y1="78" x2="68" y2="88" stroke="#64748b" stroke-width="1.2"/>
            <polygon points="26,70 50,48 58,56 36,80" fill="#e2e8f0" stroke="#475569" stroke-width="1.3"/>
            <line x1="31" y1="65" x2="41" y2="75" stroke="#64748b" stroke-width="1.3"/>
            <line x1="37" y1="59" x2="47" y2="69" stroke="#64748b" stroke-width="1.3"/>
            <line x1="43" y1="53" x2="53" y2="63" stroke="#64748b" stroke-width="1.3"/>
            <line x1="36" y1="34" x2="48" y2="46" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
            <path d="M52 50 L108 82 L88 80 L48 56 Z" fill="url(#kasakaBlade)" stroke="${topBladeStroke}" stroke-width="1.5"/>
            <polyline points="55,56 72,66 76,64 96,78" fill="none" stroke="#00ffff" stroke-width="1.3"/>
            <polygon points="44,44 56,44 58,54 46,56" fill="#0f172a" stroke="#00d2ff" stroke-width="1.2"/>
        </g>`;
    }

    return `
    <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="jwAura" cx="50%" cy="45%" r="52%">
            <stop offset="0%" stop-color="rgba(0, 210, 255, 0.38)"/>
            <stop offset="55%" stop-color="rgba(30, 64, 175, 0.18)"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
          <linearGradient id="kasakaBlade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#040814"/>
            <stop offset="70%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="${topBladeStroke}"/>
          </linearGradient>
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${coatTop}"/>
            <stop offset="100%" stop-color="${coatBot}"/>
          </linearGradient>
                    <linearGradient id="smokeGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stop-color="#02040a" stop-opacity=".95"/>
            <stop offset=".5" stop-color="#0a1a3d" stop-opacity=".75"/>
            <stop offset=".85" stop-color="#0090ff" stop-opacity=".4"/>
            <stop offset="1" stop-color="#00e5ff" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="smokeHot" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stop-color="#1e1b4b" stop-opacity=".6"/>
            <stop offset=".6" stop-color="#2563eb" stop-opacity=".45"/>
            <stop offset="1" stop-color="#7df9ff" stop-opacity="0"/>
          </linearGradient>
          <filter id="smokeWarp" filterUnits="userSpaceOnUse" x="-10" y="-14" width="140" height="150" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.045" numOctaves="2" seed="7" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
            <feGaussianBlur stdDeviation=".5"/>
          </filter>
          <filter id="softGlow" filterUnits="userSpaceOnUse" x="-16" y="-16" width="32" height="32">
            <feGaussianBlur stdDeviation="2.4"/>
          </filter>
          <linearGradient id="smokeRim" x1="0" y1="1" x2="0" y2="0">
            <stop offset=".35" stop-color="${coatStroke}" stop-opacity="0"/>
            <stop offset=".8" stop-color="${coatStroke}" stop-opacity=".6"/>
          </linearGradient>
          
        </defs>

        <circle cx="60" cy="56" r="54" fill="url(#jwAura)"/>
            
        ${smokeFX}
        
        ${backExtras}

        <g class="svg-torso-solid">
          <path d="M34 54 L38 36 L60 44 L82 36 L86 54 Z" fill="#040710" stroke="#38bdf8" stroke-width="1"/>
          <path d="M18 62 C24 50, 36 46, 46 48 L60 68 L74 48 C84 46, 96 50, 102 62 L94 114 L26 114 Z" fill="url(#coatGrad)" stroke="${coatStroke}" stroke-width="1.3"/>
          <polygon points="36,48 48,48 56,82 40,74" fill="#1e293b" stroke="#38bdf8" stroke-width="0.9"/>
          <polygon points="84,48 72,48 64,82 80,74" fill="#1e293b" stroke="#38bdf8" stroke-width="0.9"/>
          <path d="M22 58 Q32 54 38 64 M98 58 Q88 54 82 64" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.7"/>
          <path d="M32 88 L30 112 M88 88 L90 112" fill="none" stroke="#00d2ff" stroke-width="0.9" opacity="0.5"/>

          ${armorLayer}
          ${accAura}

          <path d="M48 38 L46 52 L60 64 L74 52 L72 38 Z" fill="#0c1526" stroke="#1e293b" stroke-width="1"/>
          <polygon points="50,40 70,40 60,51" fill="#020409"/>
          <path d="M51 44 L56 55 M69 44 L64 55 M48 53 L58 58 M72 53 L62 58" fill="none" stroke="#38bdf8" stroke-width="0.8" opacity="0.65"/>

          <path d="M43 27 Q38 25 40 33 L45 37 M77 27 Q82 25 80 33 L75 37" fill="#101b30" stroke="#38bdf8" stroke-width=".8"/>
          <path d="M43 20 Q47 13 60 13 Q73 13 77 20 L75 34 L68 44 L60 49 L52 44 L45 34 Z" fill="#111d32" stroke="#38bdf8" stroke-width="1.1"/>
          <path d="M60 18 L76 21 L75 34 L68 44 L60 49 Z" fill="#030711" opacity=".92"/>
          <path d="M43 23 L56 27 L60 34 L64 27 L77 23 L74 35 L67 43 L60 47 L52 43 L46 35 Z" fill="#020610" opacity=".88"/>
          <path d="M60 32 L58.5 37 L61 38" fill="none" stroke="#526b8b" stroke-width=".7" opacity=".7"/>

          <g class="svg-eyes-blink">
            <path d="M44 28 L57 31 L54 35 L43 32 Z" fill="#00dfff" opacity=".7" filter="drop-shadow(0 0 4px #00dfff)"/>
            <path d="M76 28 L63 31 L66 35 L77 32 Z" fill="#00dfff" opacity=".7" filter="drop-shadow(0 0 4px #00dfff)"/>
            <path d="M44 29 L56 31.5 L53 33.5 L44 31.5 Z" fill="#e8fcff"/>
            <path d="M76 29 L64 31.5 L67 33.5 L76 31.5 Z" fill="#e8fcff"/>
            <path d="M50 30.5 L54 31.5 L52.5 33 L49.5 32 Z" fill="#00aaff"/>
            <path d="M70 30.5 L66 31.5 L67.5 33 L70.5 32 Z" fill="#00aaff"/>
            <circle cx="52" cy="31.5" r=".8" fill="#ffffff"/>
            <circle cx="68" cy="31.5" r=".8" fill="#ffffff"/>
          </g>

          <path d="M44 27 L56 29.5 M76 27 L64 29.5" fill="none" stroke="#02040a" stroke-width="2" stroke-linecap="round"/>
          <path d="M41 29 C37 21 41 12 49 8 C55 5 62 5 66 6 L69 4 L68 8 C77 11 82 19 79 28 L82 30 L77 29 L75 36 L71 27 L67 34 L64 24 L60 37 L57 27 L53 34 L50 25 L46 34 L43 27 L39 30 Z" fill="#03060d" stroke="#00cfff" stroke-width="1" stroke-linejoin="round"/>
          <path d="M47 15 L49 25 M55 11 L56 25 M65 10 L63 22 M73 15 L72 25" fill="none" stroke="#163d5c" stroke-width="1" stroke-linecap="round"/>
          <path d="M46 14 Q58 8 69 13" fill="none" stroke="#38bdf8" stroke-width=".8" opacity=".65"/>
          <path d="M45 24 L55 28 L60 35 L65 28 L76 24" fill="none" stroke="#000000" stroke-width="1.4" opacity=".85"/>
          ${headGear}

          ${weaponAndArmsLayer}
        </g>
    </svg>`;
}

function getArenaAttackFX(actorKey) {
    if (actorKey === 'hunter') {
        let wId = (p && p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";

        if (wId === "eq_w_bow") {
            return `
            <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
                <g class="fx-travel-wave">
                    <line x1="70" y1="40" x2="220" y2="40" stroke="#00ffcc" stroke-width="4" filter="drop-shadow(0 0 10px #00ffcc)"/>
                    <polygon points="230,40 210,33 210,47" fill="#ffffff"/>
                    <line x1="90" y1="68" x2="245" y2="68" stroke="#00d2ff" stroke-width="4" filter="drop-shadow(0 0 10px #00ffcc)"/>
                    <polygon points="255,68 235,61 235,75" fill="#ffffff"/>
                </g>
            </svg>`;
        }
        if (wId === "eq_w_kamish") {
            return `
            <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
                <g class="fx-impact-burst">
                    <path d="M165 12 Q240 55 305 98" fill="none" stroke="#ff0055" stroke-width="9" stroke-linecap="round" filter="drop-shadow(0 0 16px #ff0055)"/>
                    <path d="M305 12 Q240 55 165 98" fill="none" stroke="#fde047" stroke-width="8" stroke-linecap="round" filter="drop-shadow(0 0 16px #ff0055)"/>
                    <circle cx="240" cy="55" r="26" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="8 4"/>
                </g>
            </svg>`;
        }
        if (wId === "eq_w_demon_sword" || wId === "eq_w_demon_daggers") {
            return `
            <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
                <g class="fx-impact-burst">
                    <polyline points="245,0 220,42 255,48 215,108" fill="none" stroke="#ffffff" stroke-width="6" filter="drop-shadow(0 0 16px #00d2ff)"/>
                    <polyline points="275,5 250,52 280,58 245,108" fill="none" stroke="#38bdf8" stroke-width="4"/>
                </g>
            </svg>`;
        }

        return `
        <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
            <g class="fx-impact-burst">
                <path d="M185 15 Q245 55 295 95" fill="none" stroke="#00d2ff" stroke-width="6" stroke-linecap="round" filter="drop-shadow(0 0 10px #00d2ff)"/>
                <path d="M185 15 Q245 55 295 95" fill="none" stroke="#ffffff" stroke-width="2"/>
                <path d="M295 15 Q245 55 185 95" fill="none" stroke="#d946ef" stroke-width="6" stroke-linecap="round" filter="drop-shadow(0 0 10px #d946ef)"/>
                <path d="M295 15 Q245 55 185 95" fill="none" stroke="#ffffff" stroke-width="2"/>
                <circle cx="240" cy="55" r="14" fill="none" stroke="#00ffff" stroke-width="2" stroke-dasharray="6 4"/>
            </g>
        </svg>`;
    }

    if (actorKey === 'igris') {
        return `
        <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
            <g class="fx-travel-wave">
                <path d="M120 10 C185 32, 185 78, 120 100 C162 72, 162 38, 120 10 Z" fill="#00d2ff" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 0 14px #00d2ff)"/>
                <path d="M105 18 C165 38, 165 72, 105 92 C140 68, 140 42, 105 18 Z" fill="#ff2a55" opacity="0.9" filter="drop-shadow(0 0 12px #ff2a55)"/>
                <polyline points="85,55 115,42 135,64 168,48 190,55" fill="none" stroke="#e0f2fe" stroke-width="2.5"/>
            </g>
        </svg>`;
    }

    if (actorKey === 'tank') {
        return `
        <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
            <g class="fx-impact-burst">
                <polygon points="150,105 168,42 184,105" fill="rgba(56, 189, 248, 0.75)" stroke="#e0f2fe" stroke-width="1.5"/>
                <polygon points="185,105 212,22 232,105" fill="rgba(0, 210, 255, 0.85)" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 0 12px #00d2ff)"/>
                <polygon points="225,105 258,12 282,105" fill="rgba(186, 230, 253, 0.92)" stroke="#00ffff" stroke-width="2" filter="drop-shadow(0 0 16px #00f2fe)"/>
            </g>
        </svg>`;
    }

    if (actorKey === 'iron') {
        return `
        <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
            <g class="fx-travel-wave">
                <ellipse cx="145" cy="55" rx="18" ry="42" fill="none" stroke="#a855f7" stroke-width="5" filter="drop-shadow(0 0 12px #a855f7)"/>
                <ellipse cx="168" cy="55" rx="12" ry="30" fill="none" stroke="#38bdf8" stroke-width="3"/>
                <polygon points="135,55 185,25 175,55 185,85" fill="#fde047" opacity="0.85"/>
            </g>
        </svg>`;
    }

    if (actorKey === 'tusk') {
        return `
        <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
            <g class="fx-beam-expand">
                <ellipse cx="85" cy="55" rx="10" ry="36" fill="none" stroke="#ffcc00" stroke-width="3" stroke-dasharray="8 4"/>
                <path d="M85 32 L295 14 L295 96 L85 78 Z" fill="rgba(255, 42, 85, 0.65)" filter="drop-shadow(0 0 18px #ff2a55)"/>
                <path d="M85 44 L295 34 L295 76 L85 66 Z" fill="#fde047" opacity="0.9"/>
                <line x1="85" y1="55" x2="295" y2="55" stroke="#ffffff" stroke-width="6"/>
            </g>
        </svg>`;
    }

    if (actorKey === 'beru') {
        return `
        <svg class="arena-svg-fx" viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
            <g class="fx-impact-burst">
                <path d="M180 18 Q235 42 292 26" fill="none" stroke="#00ffcc" stroke-width="5" stroke-linecap="round" filter="drop-shadow(0 0 12px #00ffcc)"/>
                <path d="M172 48 Q235 62 298 52" fill="none" stroke="#d946ef" stroke-width="7" stroke-linecap="round" filter="drop-shadow(0 0 15px #d946ef)"/>
                <path d="M182 82 Q238 88 290 78" fill="none" stroke="#00ffcc" stroke-width="5" stroke-linecap="round" filter="drop-shadow(0 0 12px #00ffcc)"/>
                <path d="M215 12 L265 98" fill="none" stroke="#ffffff" stroke-width="3"/>
            </g>
        </svg>`;
    }

    return '';
}

function getBiomeEnemyVectorSVG(biome, isSecondary = false) {
    let col = isSecondary ? "#fb7185" : "#ff2a55";
    if (biome === 'ice') col = "#38bdf8";
    else if (biome === 'poison' || biome === 'toxic' || biome === 'retro-mobile') col = "#2dd4bf";
    else if (biome === 'shrine' || biome === 'star-stream' || biome === 'trap-grid') col = "#f3d078";
    else if (biome === 'abyss' || biome === 'void' || biome === 'paranormal') col = "#c084fc";

    if (isSecondary) {
        return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="32,8 52,22 46,52 18,52 12,22" fill="rgba(9,13,26,0.9)" stroke="${col}" stroke-width="2.2"/>
            <polygon points="20,26 28,32 22,36" fill="#ffffff"/>
            <polygon points="44,26 36,32 42,36" fill="#ffffff"/>
            <polyline points="22,44 27,40 32,45 37,40 42,44" stroke="${col}" stroke-width="2"/>
        </svg>`;
    }
    return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 54 L16 24 L8 10 L24 18 L32 8 L40 18 L56 10 L48 24 L52 54 L32 48 Z" fill="rgba(6,10,22,0.94)" stroke="${col}" stroke-width="2.4"/>
        <polygon points="18,28 29,33 21,37" fill="${col}" filter="drop-shadow(0 0 4px ${col})"/>
        <polygon points="46,28 35,33 43,37" fill="${col}" filter="drop-shadow(0 0 4px ${col})"/>
        <polygon points="22,30 27,33 23,35" fill="#ffffff"/>
        <polygon points="42,30 37,33 41,35" fill="#ffffff"/>
        <polyline points="20,44 26,39 32,45 38,39 44,44" stroke="#ffffff" stroke-width="1.8"/>
    </svg>`;
}

function renderMiniArenaUnits() {
    let alliesStage = document.getElementById('arena-allies-stage') || document.getElementById('arena-allies');
    let enemiesStage = document.getElementById('arena-enemies-stage') || document.getElementById('arena-enemies');
    if (!alliesStage || !enemiesStage || !activeDungeon) return;

    let count = p.equippedShadows ? p.equippedShadows.length : 0;
    let unitSize = count >= 4 ? 38 : (count === 3 ? 42 : 48);
    let overlap = count >= 4 ? -14 : (count >= 2 ? -10 : 0);

    let alliesHtml = `<div class="arena-unit" id="arena-unit-hunter" style="width:${unitSize}px; height:${unitSize}px; margin-left:0; z-index:10;" title="Monarca">${getHunterMiniSVG()}</div>`;
    if (p.equippedShadows && p.equippedShadows.length > 0 && typeof getCommanderSVG === "function") {
        p.equippedShadows.forEach((cmdId, idx) => {
            let customSvg = getCommanderSVG(cmdId).replace(/svg-torso-solid/g, `cmd-idle-${cmdId}`);
            alliesHtml += `<div class="arena-unit" id="arena-unit-${cmdId}" style="width:${unitSize}px; height:${unitSize}px; margin-left:${overlap}px; z-index:${9 - idx};">${customSvg}</div>`;
        });
    }
    alliesStage.innerHTML = alliesHtml;

    let b = activeDungeon.biome || 'default';
    enemiesStage.innerHTML = `
        <div class="arena-unit" id="arena-enemy-1" style="width:46px; height:46px;">${getBiomeEnemyVectorSVG(b, false)}</div>
        <div class="arena-unit" id="arena-enemy-2" style="width:36px; height:36px; opacity:0.85;">${getBiomeEnemyVectorSVG(b, true)}</div>
    `;
}

function triggerArenaChoreography(forcedActor = null) {
    if (!activeDungeon || waitingForValidation) return;

    let arenaBox = document.getElementById('raid-mini-arena');
    let fxLayer = document.getElementById('arena-fx-layer');
    let tagEl = document.getElementById('arena-action-tag');
    let enemy1 = document.getElementById('arena-enemy-1');
    let enemy2 = document.getElementById('arena-enemy-2');

    let wId = (p && p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p && p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let hasBloodySet = (wId === "eq_w_killer" || wId === "eq_w_halberd") && aId === "eq_a1";

    let actors = ['hunter', ...(p.equippedShadows || [])];
    if (hasBloodySet && p.equippedShadows && p.equippedShadows.includes('igris')) {
        actors.push('igris');
    }

    let pick = forcedActor && actors.includes(forcedActor) ? forcedActor : actors[Math.floor(Math.random() * actors.length)];
    let unitEl = document.getElementById(`arena-unit-${pick}`);

    let wMeta = (typeof getRelicInfo === "function" && wId) ? getRelicInfo(wId) : null;
    let hunterLabel = wMeta && wMeta.pose ? `🗡️ ${wMeta.pose.toUpperCase()}` : '🗡️ Golpe seco';

    const choreographies = {
        'hunter': { anim: (wId === 'eq_w_bow' || wId === 'eq_w_kargalgan') ? 'anim-ranged-steady' : 'anim-lunge-slash', label: hunterLabel },
        'igris':  { anim: 'anim-crimson-wave', label: '⚔️ IGRIS // TAJO RELÁMPAGO CARMESÍ' },
        'tank':   { anim: 'anim-shield-quake', label: '🐻‍❄️ TANK // EMBESTIDA GLACIAL' },
        'iron':   { anim: 'anim-shield-quake', label: '🛡️ IRON // IMPACTO SÍSMICO DE BASTIÓN' },
        'tusk':   { anim: 'anim-dragon-breath', label: '🔥 TUSK // CAÑÓN DEL DRAGÓN DE FUEGO' },
        'beru':   { anim: 'anim-beru-blitz', label: '🐜 BERU // DEPREDACIÓN HIPERSÓNICA' }
    };

    if (!forcedActor && Math.random() < 0.20 && enemy1 && unitEl) {
        enemy1.classList.remove('anim-enemy-lunge', 'anim-enemy-hit');
        void enemy1.offsetWidth;
        enemy1.classList.add('anim-enemy-lunge');
        setTimeout(() => { if (enemy1) enemy1.classList.remove('anim-enemy-lunge'); }, 650);

        unitEl.classList.remove('anim-dodge-step', 'anim-lunge-slash', 'anim-crimson-wave', 'anim-shield-quake', 'anim-dragon-breath', 'anim-beru-blitz');
        void unitEl.offsetWidth;
        unitEl.classList.add('anim-dodge-step');
        setTimeout(() => { if (unitEl) unitEl.classList.remove('anim-dodge-step'); }, 620);

        if (tagEl) tagEl.innerText = (pick === 'iron' || pick === 'tank') ? '🛡️ BLOQUEO DE GUARDIA PERFECTO' : '⚡ ESQUIVA SOMBRÍA A ALTA VELOCIDAD';
        return;
    }

    let ch = choreographies[pick] || choreographies['hunter'];
    if (unitEl) {
        unitEl.classList.remove('anim-dodge-step', 'anim-lunge-slash', 'anim-crimson-wave', 'anim-shield-quake', 'anim-dragon-breath', 'anim-beru-blitz');
        void unitEl.offsetWidth;
        unitEl.classList.add(ch.anim);
        setTimeout(() => { if (unitEl) unitEl.classList.remove(ch.anim); }, 700);
    }

    if (fxLayer) {
        fxLayer.innerHTML = getArenaAttackFX(pick);
        setTimeout(() => { if (fxLayer) fxLayer.innerHTML = ''; }, 680);
    }

    setTimeout(() => {
        if (arenaBox) {
            arenaBox.classList.remove('arena-hit-shake');
            void arenaBox.offsetWidth;
            arenaBox.classList.add('arena-hit-shake');
        }
        if (enemy1) {
            enemy1.classList.remove('anim-enemy-hit');
            void enemy1.offsetWidth;
            enemy1.classList.add('anim-enemy-hit');
        }
        if (enemy2 && Math.random() > 0.4) {
            enemy2.classList.remove('anim-enemy-hit');
            void enemy2.offsetWidth;
            enemy2.classList.add('anim-enemy-hit');
        }
    }, 160);

    if (tagEl) tagEl.innerText = ch.label;
}

function pushRaidLog(text, color = "#e2e8f0") {
    let logBox = document.getElementById('raid-battle-log');
    if (!logBox) return;

    let m = Math.floor(raidTimeLeft / 60);
    let s = raidTimeLeft % 60;
    let timeStamp = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;

    let div = document.createElement('div');
    div.className = 'log-entry';
    div.style.color = color;
    div.innerHTML = `<span style="color:var(--neon-main);">[${timeStamp}]</span> ${text}`;

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

    if (p.equipment && p.equipment.accessory && p.equipment.accessory.id === "eq_acc_kandiaru") {
        let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
        p.hp = Math.min(maxHP, p.hp + 2);
        p.sp = Math.min(100, p.sp + 2);
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
    currentPhase = 0;
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
    
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let tuskMult = (p.equippedShadows && p.equippedShadows.includes('tusk')) ? 0.80 : 1.0;
    let valkyrieMult = (aId === "eq_a_valkyrie") ? 0.88 : 1.0;

    raidTimeLeft = Math.max(5, Math.floor(phase.durationMins * 60 * tuskMult * valkyrieMult));
    phaseInitialSecs = raidTimeLeft;

    renderMiniArenaUnits();
    let logBox = document.getElementById('raid-battle-log');
    if (logBox) logBox.innerHTML = '';
    pushRaidLog(`🚪 Entrando a [${phase.name}]. Escuadrón desplegado: ${(p.equippedShadows && p.equippedShadows.length > 0) ? p.equippedShadows.map(x => x.toUpperCase()).join(', ') : 'SOLITARIO'}.`, "#38bdf8");

    updateRaidTimerUI();
    syncRaidVitalsUI();
    
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
    { id: "arc_01", title: "01 // Eco del Santuario", desc: "Al entrar al Santuario de Sombras (8% prob.), el Arquitecto filtra registros clasificados y te otorga +25 MP." },
    { id: "arc_02", title: "02 // Mercado Iluminado", desc: "Al visitar la Tienda (6% prob.), el Arquitecto anula el impuesto del 80% de oro durante 30 minutos." },
    { id: "arc_03", title: "03 // Despertar de Vacío", desc: "Cuando tu Maná llega a 0.00 con sombras activas (45% prob.), tu núcleo absorbe +150 MP de emergencia sin disipar tu ejército." },
    { id: "arc_04", title: "04 // Hora Bruja (3:33 AM)", desc: "Estar conectado exactamente a las 3:33 AM condensa +1 Cristal de Maná oculto." },
    { id: "arc_05", title: "05 // Sintonizador de Los Chorros", desc: "Al desplegar una misión de Tráfico (15% prob.), tu próximo Portal de Mazmorra no consumirá llave." },
    { id: "arc_06", title: "06 // Frecuencia Perdida del Sonar", desc: "Al reescanear el Sonar de Mazmorras (10% prob.), interceptas un desvío de fondos de la Asociación (+75 G)." },
    { id: "arc_07", title: "07 // Piedad del Arquitecto", desc: "Acumular 3 fallos seguidos al intentar extraer sombras condensa automáticamente +2 Cristales de Maná." },
    { id: "arc_08", title: "08 // Sincronización Prismática", desc: "Al lograr un Corte Crítico Perfecto (12% prob.), tu barra de EXP se vuelve arcoíris y ganas EXP x1.5 por 1 Hora." },
    { id: "arc_09", title: "09 // Sinapsis Acelerada", desc: "Al sellar una sesión de Estudio/Focus (20% prob.), tu barra de SP brilla en dorado y las misiones cuestan 0 SP por 1 Hora." },
    { id: "arc_10", title: "10 // Protocolo Eclipse", desc: "Al recibir un golpe mortal en Mazmorra (25% prob., 1 vez), el colapso se cancela dejándote en 50 HP con +20% Evasión y EXP x2.5." },
    { id: "arc_11", title: "11 // Pulso del Arquitecto", desc: "Tocar 7 veces la barra de mensajes del Sistema abre la Tesorería por 1 Hora (100% de Oro íntegro sin impuestos)." },
    { id: "arc_12", title: "12 // General de la Legión", desc: "Reclutar un total de 40 unidades de infantería desbloquea un título oculto permanente en tu expediente." },
    { id: "arc_13", title: "13 // Anomalía del Calendario", desc: "Al iniciar un nuevo día (18% prob.), el Sistema te bendice con 30 minutos de Sincronización Prismática (EXP x1.5)." },
    { id: "arc_14", title: "14 // Resonancia de Cinco Estrellas", desc: "Superar el Nivel 5 con los 3 slots de equipamiento llenos activa un pulso que regenera +5 SP al abrir tu expediente." },
    { id: "arc_15", title: "15 // Inversor de Ceniza", desc: "Comprar o vender 5 artefactos en el mismo día desbloquea un reembolso secreto de +60 G de la Asociación." }
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
    if (tab === 'gacha' && Math.random() < 0.015) {
        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        p.mp = Math.min(maxMP, (p.mp || 0) + 25);
        unlockArcProtocol("arc_01");
        systemNotify("🔮 Eco del Santuario (Protocolo 01): El Trono de Sombras resonó otorgándote +25 MP.", "purple");
    } else if (tab === 'shop' && Math.random() < 0.01) {
        p._arcGildedUntil = Date.now() + 1800000;
        unlockArcProtocol("arc_02");
        systemNotify("🌟 El Arquitecto ilumina el mercado: Las comisiones de oro se anulan por 30 min.", "gold");
    }
}

function _evalArcMpZeroHook() {
    if (!p._arcFlags) p._arcFlags = {};
    if (!p._arcFlags.mpZeroTriggered && Math.random() < 0.10) {
        p._arcFlags.mpZeroTriggered = true;
        p.mp = 150;
        unlockArcProtocol("arc_03");
        systemNotify("⚡ Despertar de Emergencia (Caja Negra): Tu núcleo vacío colapsó y absorbió +150 MP del vacío.", "purple");
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

function _evalArcDeployHook(m) {
    if (m.id.includes('traffic') && Math.random() < 0.02) {
        p._arcFreeGateUntil = Date.now() + 3600000;
        unlockArcProtocol("arc_05");
        systemNotify("📡 Sintonizador Anómalo: Una grieta secreta ha revelado coordenadas libres por 1 Hora.", "gold");
    }
}

function _evalArcRadarScan() {
    let todayKey = new Date().toDateString();
    if (p._arcRadarDay === todayKey) return;
    if (Math.random() < 0.02) {
        p._arcRadarDay = todayKey;
        p.gold += 75;
        unlockArcProtocol("arc_06");
        saveData();
        systemNotify("📡 Eco del Radar (Protocolo Secreto): Captaste una frecuencia perdida del mercado. +75 G (1/día).", "gold");
    }
}

function _evalArcAriseFail() {
    if (!p._arcFailAriseCount) p._arcFailAriseCount = 0;
    p._arcFailAriseCount++;
    if (p._arcFailAriseCount >= 3) {
        p._arcFailAriseCount = 0;
        p.crystals = (p.crystals || 0) + 2;
        unlockArcProtocol("arc_07");
        systemNotify("💀 Piedad del Arquitecto (Caja Negra): Tres extracciones fallidas consecutivas condensaron maná residual. +2 CM.", "purple");
    }
}

function _evalArcSealHook(isCrit, reward) {
    if (isCrit && Math.random() < 0.02) {
        p._arcPrismUntil = Date.now() + 3600000;
        unlockArcProtocol("arc_08");
        systemNotify("💎 Sincronización Prismática (Caja Negra): Refracción de alma activa. EXP x1.5 por 1 Hora.", "gold");
    }
    if (reward && reward.type === 'study' && Math.random() < 0.03) {
        p._arcOverdriveUntil = Date.now() + 3600000;
        unlockArcProtocol("arc_09");
        systemNotify("🧠 Sinapsis Acelerada (Caja Negra): Enfoque absoluto. SP gratuito para misiones por 1 Hora.", "purple");
    }
}

function _evalArcDeathIntercept(reason, source) {
    let now = Date.now();
    if (!p._arcFlags.eclipseUsed && Math.random() < 0.08 && source === 'dungeon') {
        p._arcFlags.eclipseUsed = true;
        p._arcEclipseActive = now + 900000;
        p.hp = 50;
        unlockArcProtocol("arc_10");
        systemNotify("🌑 Protocolo Eclipse (Caja Negra): El colapso fue interceptado. Evasión y EXP potenciadas por 15 min.", "danger");
        return true;
    }
    return false;
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
    if (Math.random() < 0.015) {
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

    let allEquipped = p.equipment.weapon && p.equipment.armor && p.equipment.accessory;
    if (p.level >= 5 && allEquipped && !p._arcFlags.fiveStarResonance) {
        p._arcFlags.fiveStarResonance = true;
        p.sp = Math.min(100, p.sp + 5);
        unlockArcProtocol("arc_14");
    }
    if ((p.totalMissions || 0) >= 10 && p.gold >= 500 && !p._arcFlags.ashInvestor) {
        p._arcFlags.ashInvestor = true;
        p.gold += 60;
        unlockArcProtocol("arc_15");
        systemNotify("🪙 Inversor de Ceniza (Protocolo 15): Reembolso secreto de la Asociación (+60 G).", "gold");
    }
}

function syncRaidVitalsUI() {
    if (!p) return;
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
    let bearHpPerUnit = (accId === "eq_acc_metus") ? 7.5 : 5;
    let bearBonusHP = (p.infantry && p.infantry.bears) ? Math.floor(p.infantry.bears * bearHpPerUnit) : 0;
    let orcArmorBonus = (aId === "eq_a_high_orc") ? 40 : 0;
    let maxHP = p.stats ? Math.floor(100 + ((p.stats.str - 1) * 20) + bearBonusHP + orcArmorBonus) : (100 + bearBonusHP + orcArmorBonus);
    if (p.abyssCurseUntil && Date.now() < p.abyssCurseUntil) maxHP = Math.floor(maxHP * 0.5);
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
    let mpDisplay = curMP.toFixed(2);

    safeSetText('raid-hp-text', `${hpDisplay}/${maxHP}`);
    safeSetText('raid-sp-text', `${Math.floor(p.sp)}/100`);
    safeSetText('raid-mp-text', `${mpDisplay}`);

        let raidRateEl = document.getElementById('raid-mp-rate');
    if (raidRateEl) {
        if (currentNetMpPerMin < 0) {
            raidRateEl.innerText = `DRENAJE SOMBRÍO: ${currentNetMpPerMin} MP/min`;
            raidRateEl.style.color = '#f43f5e';
        } else if (currentNetMpPerMin > 0) {
            raidRateEl.innerText = `RECARGA DE MAGOS: +${currentNetMpPerMin} MP/min`;
            raidRateEl.style.color = '#10b981';
        } else {
            raidRateEl.innerText = `FLUJO MP: 0 MP/min (ESTABLE)`;
            raidRateEl.style.color = '#94a3b8';
        }

        // Inyectar los 3 botones (¡SURGE!, Activa y Guardar) automáticamente si aún está el botón viejo
        let parentRow = raidRateEl.parentElement;
        if (parentRow && !document.getElementById('raid-cmd-btn-bar')) {
            let oldBtn = parentRow.querySelector('button');
            if (oldBtn) oldBtn.style.display = 'none';
            let bar = document.createElement('div');
            bar.id = 'raid-cmd-btn-bar';
            bar.style.cssText = 'display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; width:100%; margin-top:8px;';
            bar.innerHTML = `
                <button class="btn btn-main" style="padding:7px 4px; font-size:0.74em;" onclick="deployShadowsInRaid()">🗣️ ¡SURGE!</button>
                <button class="btn btn-gold" style="padding:7px 4px; font-size:0.74em;" onclick="castActiveSkillInRaid()">⚡ Activa</button>
                <button class="btn btn-purple" style="padding:7px 4px; font-size:0.74em;" onclick="recallAllShadows()">🌑 Guardar</button>
            `;
            parentRow.parentElement.appendChild(bar);
        }
    }
}

function dealRaidDamage(dmg, deathMsg, isBossAttack = false) {
    let now = Date.now();
    if (p.hazardImmunityUntil && now < p.hazardImmunityUntil) return;
    if (p.ironImmunityUntil && now < p.ironImmunityUntil) return;

    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";

    if (!isBossAttack && aId === "eq_a_assassin" && (phaseInitialSecs - raidTimeLeft) < 180) return;

    let dodgePct = getHunterDodgeChance();
    if (Math.random() * 100 < dodgePct) {
        pushRaidLog(`⚡ ¡ESQUIVA POR AGILIDAD (${dodgePct}%)! Evitaste el ataque sin recibir daño.`, "#00ffcc");
        return;
    }

    if (p.cryoBuffUntil && now < p.cryoBuffUntil) dmg *= 0.5;
    if (isBossAttack && aId === "eq_a_giant") dmg *= 0.5;
    if (isBossAttack && aId === "eq_a_helm_d") dmg = Math.max(1, dmg - 5);

    if ((p.arcticShield || 0) > 0) {
        let absorbed = Math.min(p.arcticShield, dmg);
        p.arcticShield -= absorbed;
        dmg -= absorbed;
    }

    if (dmg > 0) {
        p.hp = Math.max(0, p.hp - dmg);
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

    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";

    let hasBaranSet = (wId === "eq_w_demon_daggers" || wId === "eq_w_demon_sword") && (aId === "eq_a_archlich" || accId === "eq_acc_national");
    if (hasBaranSet && raidTimeLeft > 0 && raidTimeLeft % 10 === 0) {
        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        p.mp = Math.min(maxMP, (p.mp || 0) + 5);
        pushRaidLog("⚡ Set del Rey Demonio Baran: Relámpago blanco diezma la sala (+5 MP).", "#38bdf8");
        triggerArenaChoreography('hunter');
    }

    if (aId === "eq_a_beru" && raidTimeLeft > 0 && raidTimeLeft % 60 === 0) {
        let orcArmorBonus = (aId === "eq_a_high_orc") ? 40 : 0;
        let maxHP = Math.floor(100 + ((p.stats.str - 1) * 20) + ((p.infantry.bears || 0) * 5) + orcArmorBonus);
        p.hp = Math.min(maxHP, p.hp + 3);
        pushRaidLog("🐜 Exoesqueleto de Quitina: Regeneración biológica +3 HP.", "#00ffcc");
    }

    let logModulo = (p.candleBuffUntil && Date.now() < p.candleBuffUntil) ? 7 : 14;
    if (raidTimeLeft > 0 && raidTimeLeft % logModulo === 0) {
        generateNarrativeEvent();
    } else if (raidTimeLeft > 0 && raidTimeLeft % 5 === 0) {
        triggerArenaChoreography();
    }

    let b = activeDungeon.biome || 'default';

    if ((b === 'poison' || b === 'toxic') && aId !== "eq_a_gloves_c" && raidTimeLeft % 3 === 0) {
        dealRaidDamage(1, "El veneno de la mazmorra consumió tus signos vitales.");
    }
    if (b === 'fire' && accId !== "eq_acc_cerberus" && raidTimeLeft % 10 === 0 && p.sp > 5) {
        p.sp = Math.max(0, p.sp - 1);
        if (typeof updateHUD === "function") updateHUD();
        syncRaidVitalsUI();
    }
    if (b === 'star-stream' && raidTimeLeft > 0 && raidTimeLeft % 45 === 0) {
        const constellations = ["Prisionero de la Diadema Dorada", "Juez como el Demonio del Fuego", "Conspirador Secreto", "Dragón Abismal de la Llama Negra"];
        let cName = constellations[Math.floor(Math.random() * constellations.length)];
        p.gold += 10;
        pushRaidLog(`✨ La constelación [${cName}] se divierte con tus sombras y te dona +10 G.`, "#fde047");
        if (typeof updateHUD === "function") updateHUD();
    }
    if (b === 'ghoul' && raidTimeLeft > 0 && raidTimeLeft % 60 === 0) {
        let num = 1000 - (Math.floor(Math.random() * 15) * 7);
        pushRaidLog(`🩸 Susurro en tu mente: «¿Cuánto es ${num} menos 7?...»`, "#f43f5e");
    }
    if (b === 'abyss' && currentPhase >= 2 && raidTimeLeft % 6 === 0) {
        dealRaidDamage(1, "Tu cuerpo no soportó la presión de las capas profundas del Abismo.");
    }

    if (raidTimeLeft <= 0) {
        clearInterval(raidTimer);
        let phase = activeDungeon.phases[currentPhase];
        if (phase.autoNext && currentPhase < activeDungeon.phases.length - 1) {
            if (typeof playSystemSound === "function") playSystemSound('gold');
            if (typeof systemNotify === "function") systemNotify(`⚡ Fase superada: ${phase.name}. Avanzando...`, "success");
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
   15. CHOQUE DE JEFE Y NAVEGACIÓN TÁCTICA
   ========================================================================== */
function triggerPhaseValidation() {
    waitingForValidation = true;
    if (typeof playSystemSound === "function") playSystemSound('danger');
    if (navigator.vibrate) navigator.vibrate([150, 100, 150]);

    pushRaidLog("💀 ¡ALERTA ROJA! La puerta de la cámara del Jefe se ha abierto.", "#ff2a55");

    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let rankMult = { 'E': 100, 'D': 140, 'C': 180, 'B': 240, 'A': 320, 'S': 450, 'SSS': 700 };
    clashBossMaxHP = rankMult[activeDungeon.rank] || 150;
    clashBossHP = clashBossMaxHP;

    if (wId === "eq_w_kamish") {
        clashBossHP = Math.floor(clashBossMaxHP * 0.70);
        pushRaidLog("🐉 ¡IRA DE KAMISH! El miedo del Dragón redujo un 30% la vida inicial del Jefe.", "#ff0055");
    }

    let clashBox = document.getElementById('raid-boss-clash');
    let escapeBtn = document.getElementById('btn-raid-action');
    if (clashBox) clashBox.style.display = 'block';
    if (escapeBtn) escapeBtn.style.display = 'none';

    renderClashShadowButtons();
    updateClashUI();

    let bossTickMs = (wId === "eq_w1") ? 5500 : 4000;

    clearInterval(clashInterval);
    clashInterval = setInterval(() => {
        if (!waitingForValidation || !activeDungeon) {
            clearInterval(clashInterval);
            return;
        }

        if (wId === "eq_w1") {
            clashBossHP = Math.max(0, clashBossHP - 10);
            pushRaidLog("🐍 Veneno de Kasaka: El Jefe pierde -10 HP por hemorragia.", "#00ffcc");
        }
        if (wId === "eq_w_demon_sword") {
            clashBossHP = Math.max(0, clashBossHP - 20);
            pushRaidLog("🌩️ Tormenta de Llamas Blancas (Baran): Rayo automático -20 HP al Jefe.", "#38bdf8");
        }

        let hasBloodySet = (wId === "eq_w_killer" || wId === "eq_w_halberd") && aId === "eq_a1";
        if (hasBloodySet && p.equippedShadows && p.equippedShadows.includes('igris')) {
            clashBossHP = Math.max(0, clashBossHP - 35);
            pushRaidLog("⚔️ Set Comandante Sangriento: Igris ejecuta un tajo doble automático (-35 HP al Jefe).", "#ff2a55");
        }

                if (p.equippedShadows && p.equippedShadows.includes('igris')) {
            clashBossHP = Math.max(0, clashBossHP - 15);
            pushRaidLog("⚔️ Pasiva de Igris: Estocada relámpago automática (-15 HP al Jefe).", "#00d2ff");
        }
        if (p.equippedShadows && p.equippedShadows.includes('beru')) {
            clashBossHP = Math.max(0, clashBossHP - 25);
            let maxH = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
            p.hp = Math.min(maxH, p.hp + 5);
        }


        updateClashUI();
        if (clashBossHP <= 0) {
            finishBossClash();
            return;
        }

        if (wId === "eq_w_iron_mace" && Math.random() < 0.25) {
            pushRaidLog("🔨 ¡ROMPECRÁNEOS! Tu Maza de Hierro aturdió al Jefe e impidió su ataque.", "#fde047");
            return;
        }

        let ironEquipped = p.equippedShadows && p.equippedShadows.includes('iron');
        let rawAtk = (activeDungeon.rank === 'S' || activeDungeon.rank === 'SSS') ? 28 : 16;
        let finalAtk = ironEquipped ? Math.ceil(rawAtk * 0.25) : rawAtk;

        dealRaidDamage(finalAtk, `El Jefe de [${activeDungeon.title}] destrozó tus defensas en el choque final.`, true);
        if (typeof systemNotify === "function" && p.hp > 0) {
            systemNotify(`💥 Impacto del Jefe: -${finalAtk} HP${ironEquipped ? ' (Mitigado por Iron)' : ''}. ¡Ataca!`, "danger");
        }
    }, bossTickMs);
}

function updateClashUI() {
    safeSetText('clash-boss-hp-text', `${Math.max(0, Math.floor(clashBossHP))}/${clashBossMaxHP} HP`);
    let bar = document.getElementById('clash-boss-bar');
    if (bar) bar.style.width = `${Math.max(0, (clashBossHP / clashBossMaxHP) * 100)}%`;
}

function renderClashShadowButtons() {
    let cont = document.getElementById('clash-shadow-buttons');
    if (!cont) return;
    cont.innerHTML = '';

    if (!p.equippedShadows || p.equippedShadows.length === 0) {
        cont.innerHTML = `<div style="grid-column:span 2; color:var(--text-muted); font-size:0.8em; text-align:center;">Tus sombras están en reposo. Usa ataque directo o invócalas en el Santuario.</div>`;
        return;
    }

    p.equippedShadows.forEach(cmdId => {
        let meta = COMMANDERS_META[cmdId];
        if (!meta) return;
        let cost = Math.floor(meta.activeCost * 0.4);
        cont.innerHTML += `
        <button class="btn btn-purple" style="font-size:0.78em; padding:10px 6px;" onclick="executeShadowClashSkill('${cmdId}', ${cost})">
            ${meta.icon} ${meta.name} (-${cost} MP)
        </button>`;
    });
}

function executePlayerClashStrike() {
    if (!waitingForValidation) return;

    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";

    let strDmg = Math.floor(25 + (p.stats.str * 15));

    if (wId === "eq_w_razor") strDmg += 5;
    if (wId === "eq_w_vulcan_club") strDmg += 35;
    if (wId === "eq_w_killer" && ['B', 'A', 'S', 'SSS'].includes(activeDungeon.rank)) strDmg *= 2;
    if (wId === "eq_w_demon_daggers") {
        strDmg = Math.floor(strDmg * 1.6);
        let maxMP = Math.floor(1000 + ((p.stats.int - 1) * 1000));
        p.mp = Math.min(maxMP, (p.mp || 0) + 20);
    }
    if (aId === "eq_a_high_orc") strDmg = Math.floor(strDmg * 1.25);
    if (accId === "eq_acc_cerberus" && p.hp < 50) strDmg = Math.floor(strDmg * 1.40);

    if (p.nextBossCrit) {
        strDmg *= 2;
        p.nextBossCrit = false;
        pushRaidLog("👁️‍🗨️ ¡CRÍTICO DEL VIGÍA! Golpe directo duplicado (x2).", "#fde047");
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

    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let shadowMult = 1.0;
    if (wId === "eq_w_arachnid") shadowMult += 0.15;
    if (wId === "eq_w_halberd" && (cmdId === 'igris' || cmdId === 'tank')) shadowMult += 0.35;

    consumeMPFast(mpCost, () => {
        playCommanderUltCinematic(cmdId, () => {
            if (cmdId === 'igris') {
                let d = Math.floor(110 * shadowMult);
                clashBossHP = Math.max(0, clashBossHP - d);
                systemNotify(`⚔️ ¡Igris ejecutó un Tajo Relámpago (-${d} HP al Jefe)!`, "purple");
            } else if (cmdId === 'tank') {
                let d = Math.floor(50 * shadowMult);
                p.arcticShield = (p.arcticShield || 0) + 45;
                clashBossHP = Math.max(0, clashBossHP - d);
                systemNotify(`🐻‍❄️ ¡Tank embistió al Jefe (-${d} HP) y levantó +45 Escudo Ártico!`, "info");
            } else if (cmdId === 'iron') {
                let d = Math.floor(70 * shadowMult);
                clashBossHP = Math.max(0, clashBossHP - d);
                p.arcticShield = (p.arcticShield || 0) + 30;
                systemNotify(`🛡️ ¡Iron aturdió al Jefe con su escudo (-${d} HP, +30 Guardia)!`, "gold");
            } else if (cmdId === 'tusk') {
                clashBossHP = 0;
                systemNotify("🔥 ¡TUSK DESATÓ EL HIMNO DEL DRAGÓN DE FUEGO! Jefe incinerado al instante.", "gold");
            } else if (cmdId === 'beru') {
                let d = Math.floor(160 * shadowMult);
                clashBossHP = Math.max(0, clashBossHP - d);
                p.hp += 25;
                systemNotify(`🐜 ¡Beru desgarró al Jefe (-${d} HP) y te regeneró +25 HP!`, "purple");
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
    let clashBox = document.getElementById('raid-boss-clash');
    if (clashBox) clashBox.style.display = 'none';
    if (typeof playSystemSound === "function") playSystemSound('gold');
    if (typeof systemNotify === "function") systemNotify("🏆 ¡Jefe de fase aniquilado!", "success");
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

        let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
        let nationalMult = (accId === "eq_acc_national" && ['A', 'S', 'SSS'].includes(completedDung.rank)) ? 1.30 : 1.0;
        let wolfMult = (accId === "eq_acc_wolf") ? 1.10 : 1.0;
        let voidMult = (p.voidXpBuffUntil && Date.now() < p.voidXpBuffUntil) ? 2.0 : 1.0;

        let gainedXP = Math.floor(completedDung.rewards.xp * nationalMult * voidMult);
        if (Array.isArray(p.titles) && p.titles.some(t => t.id === 't_wolf_slayer')) gainedXP = Math.floor(gainedXP * 1.05);
        let gainedGold = Math.floor(completedDung.rewards.gold * nationalMult * wolfMult);
        
if (p.whiteTigerBounty) { gainedGold += 110; p.whiteTigerBounty = false; if (typeof systemNotify === "function") systemNotify("🐯 Convenio Tigre Blanco liquidado: +110 G limpios transferidos por Baek Yoonho.", "gold"); }

        if (p.starStreamNext) {
            gainedGold *= 3;
            p.starStreamNext = false;
            if (typeof systemNotify === "function") systemNotify("🌟 ¡Patrocinio del Star Stream consumido! Oro de Mazmorra triplicado.", "gold");
        }

        p.xp += gainedXP;
        p.gold += gainedGold;
        p.totalMissions = (p.totalMissions || 0) + 1;

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
                    systemNotify("📗 ¡ISLA DE JEJU CONQUISTADA! Has extraído a Beru y el milagro único de Min Byung-Gyu se ha desbloqueado en tu Santuario.", "success");
                }
            }
        }
        if (typeof triggerBeruPredation === "function") triggerBeruPredation();
        if (typeof attemptShadowExtraction === "function") attemptShadowExtraction(completedDung.rank);
        if (typeof rollLootDrop === "function") rollLootDrop(completedDung.rank === 'S' || completedDung.rank === 'SSS');

        if (typeof systemNotify === "function") {
            systemNotify(`🏆 INCURSIÓN DESPEJADA: ${completedDung.title} (+${gainedXP} XP, +${gainedGold} G)`, "gold");
        }

        if (completedDung.rank === 'A' || completedDung.rank === 'S' || completedDung.rank === 'SSS') {
            let bonusCrystals = completedDung.rank === 'SSS' ? 10 : (completedDung.rank === 'S' ? 3 : 1);
            p.crystals = (p.crystals || 0) + bonusCrystals;
            if (typeof systemNotify === "function") systemNotify(`💠 Botín de Jefe: +${bonusCrystals} Cristales de Maná.`, "purple");
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
        systemNotify(`⚠️ Maldición de la Capa ${layer} (${actionName}): Mareo intenso. -10 SP.`, "stamina");
    } else if (layer <= 4) {
        p.hp -= 25;
        p.sp = Math.max(0, p.sp - 20);
        systemNotify(`🩸 Maldición de la Capa ${layer} (${actionName}): Hemorragia por ascenso. -25 HP, -20 SP.`, "danger");
    } else {
        p.abyssCurseUntil = Date.now() + (24 * 3600000);
        p.hp = Math.min(p.hp, 25);
        systemNotify(`💀 MALDICIÓN DE LA 6TA CAPA: Has perdido parte de tu humanidad al ascender. Vida Máxima reducida al 50% por 24h.`, "danger");
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
    
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
    let escDmg = (accId === "eq_acc_gate") ? 10 : 20;
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
        drawer.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(2,6,16,0.9); backdrop-filter:blur(8px); z-index:9450; display:flex; justify-content:center; align-items:center; padding:18px;';
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
            return `<div class="grid-slot rank-${item.rank}" style="opacity:${canBuy ? '1' : '0.45'};" onclick="inspectShopItem('${item.id}')">
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