/* ==========================================================================
   1. CATÁLOGO MAESTRO DE COMANDANTES E INFANTERÍA (MONARC_SYSTEM V0.1)
   ========================================================================== */
const COMMANDERS_META = {
    igris: {
        id: 'igris',
        name: 'Comandante Igris',
        title: 'Mariscal Rojo Sangriento',
        icon: '⚔️',
        color: '#00d2ff',
        accent: '#ff2a55',
        mpDrain: 62,
        activeCost: 240,
        activeName: 'Tajo Carmesí del Monarca',
        reqText: 'Niv. 40 (Cambio de Clase)',
        passiveDesc: 'Otorga +4% EXP y +4% Oro por cada nivel de Igris, ensancha +12% el núcleo crítico del Corte Dimensional y en Choques de Jefe ejecuta estocadas automáticas cada turno.',
        activeDesc: 'En el Sello: Parte el núcleo con Crítico Perfecto garantizado. En Pomodoro / Rutina: Activa Concentración del Caballero (+50% EXP en tu bloque actual de estudio, -20 Fatiga y cobro diario de Oro del gremio).'
    },
    tank: {
        id: 'tank',
        name: 'Tank',
        title: 'Alfa de los Osos de Hielo',
        icon: '🐻‍❄️',
        color: '#38bdf8',
        accent: '#e0f2fe',
        mpDrain: 260,
        activeCost: 230,
        activeName: 'Estampida del Cero Absoluto',
        reqText: 'Niv. 48 o Elfos de Hielo',
        passiveDesc: 'Genera automáticamente un Escudo Ártico visible en tu barra de HP (+35 🛡️ + 10 por nivel). En la noche bloquea el 100% de la quema de Oro y ancla tu vida en 25 HP.',
        activeDesc: 'Levanta un Escudo Ártico inmediato de +80 🛡️ en tu barra de HP, descarga -30 de FATIGA de tu anillo y retrasa +45 minutos el inicio del desgaste nocturno de hoy.'
    },
    iron: {
        id: 'iron',
        name: 'Iron',
        title: 'El Bastión de Acero Gigante',
        icon: '🛡️',
        color: '#a855f7',
        accent: '#38bdf8',
        mpDrain: 300,
        activeCost: 270,
        activeName: 'Grito de Provocación Total',
        reqText: 'Niv. 52 o STR 4.00',
        passiveDesc: 'Absorbe el 80% de todo daño en Mazmorras o fallos de Corte. Cada vez que bloquea un ataque de Jefe por ti, su escudo suelta chispas doradas (+1,500 G).',
        activeDesc: 'Golpea su escudo forzando una Fisura Rango A con TRIPLE botín de Oro, descarga -35 de FATIGA y te vuelve 100% inmune a perder vida durante 20 minutos.'
    },
    tusk: {
        id: 'tusk',
        name: 'Tusk (Kargalgan)',
        title: 'Gran Chamán de los Altos Orcos',
        icon: '🔥',
        color: '#ff2a55',
        accent: '#ffcc00',
        mpDrain: 340,
        activeCost: 600,
        activeName: 'Himno del Dragón de Fuego',
        reqText: 'Niv. 72 o Orbe de Avaricia',
        passiveDesc: 'Magia de Gravedad Cero: Reduce un 35% la FATIGA que generan todas las misiones, ralentiza 30% la aguja del Corte y acelera 20% los relojes de mazmorra.',
        activeDesc: 'En Mazmorra: Incinera al instante toda la fase o al Jefe actual. Fuera de Mazmorra: Incinera tus misiones secundarias domésticas de hoy entregándote su EXP y Oro sin alterar tus cronómetros de telemetría.'
    },
    beru: {
        id: 'beru',
        name: 'Beru',
        title: 'Rey de las Hormigas de Jeju',
        icon: '🐜',
        color: '#d946ef',
        accent: '#00ffcc',
        mpDrain: 380,
        activeCost: 720,
        activeName: 'Velocidad del Rey ("¡Mi Rey!")',
        reqText: 'Isla de Jeju o Niv. 90',
        passiveDesc: 'En campo te cura +3 HP y baja -3 de FATIGA cada minuto. Al derrotar cualquier Mazmorra o Jefe Pomodoro devora su núcleo (+0.05 atributo y prob. de +1 Cristal de Maná extra).',
        activeDesc: 'Desata el Modo Berserker: Cura +60 HP, limpia tu FATIGA a 0, aumenta +40% todo el Oro ganado por 1 hora y extiende +5 min tu descanso Pomodoro.'
    }
};

const INFANTRY_META = {
    soldiers: { id: 'soldiers', name: 'Soldados de Sombra', icon: '🗡️', cost: 1, goldCost: 180, max: 25, desc: 'Escuadrón de vanguardia: Reduce rotura de ítems (-1% c/u) y recolecta Oro en Expediciones de Legión.' },
    mages:    { id: 'mages',    name: 'Magos de Sombra',    icon: '🔮', cost: 2, goldCost: 280, max: 20, desc: '1ª Función: Sostienen el drenaje de tus Comandantes (+5 MP/min c/u). 2ª Función: Cuando tus sombras descansan, recargan tu barra de MP sola (+7.5 MP/min c/u).' },
    bears:    { id: 'bears',    name: 'Osos de Hielo',      icon: '🐾', cost: 2, goldCost: 260, max: 15, desc: 'Bestias de asedio: Aumentan tu Vida Máxima base en +5 HP c/u y extraen minerales raros en Expediciones.' },
    orcs:     { id: 'orcs',     name: 'Guerreros Altos Orcos', icon: '👹', cost: 3, goldCost: 350, max: 15, desc: 'Guardia pesada: Aumentan en +3 G el oro ganado en misiones físicas (STR) y multiplican el botín de Expedición.' },
    ants:     { id: 'ants',     name: 'Hormigas de Jeju',   icon: '🐜', cost: 3, goldCost: 380, max: 25, desc: 'Obreras reales: Cada 5 hormigas reducen en -1 la Fatiga de tus misiones y aceleran las Expediciones.' }
};
let currentShowcaseCmd = 'igris';

// Coordenadas X / Y por defecto para centrar a cada Sombra sobre su círculo de invocación
const DEFAULT_SHADOW_OFFSETS = {
    igris: { x: 0, y: 0 },
    tank:  { x: 0, y: 0 },
    iron:  { x: 0, y: 0 },
    tusk:  { x: 0, y: 0 },
    beru:  { x: 0, y: 0 }
};

function getShadowOffset(cmdId) {
    let key = String(cmdId || '').toLowerCase().trim();
    if (typeof p !== 'undefined' && p && p.shadowOffsets && p.shadowOffsets[key]) {
        return p.shadowOffsets[key];
    }
    return DEFAULT_SHADOW_OFFSETS[key] || { x: 0, y: 0 };
}

// Función global para mover cualquier sombra en el eje X y Y sobre su círculo (ej: setShadowOffset('igris', -4, -6))
window.setShadowOffset = function(cmdId, x = 0, y = 0) {
    let key = String(cmdId || '').toLowerCase().trim();
    if (typeof p !== 'undefined' && p) {
        if (!p.shadowOffsets) p.shadowOffsets = {};
        p.shadowOffsets[key] = { x: Number(x) || 0, y: Number(y) || 0 };
        if (typeof saveData === 'function') saveData();
    }
    applyShadowOffsetsToDOM();
    return p && p.shadowOffsets ? p.shadowOffsets[key] : { x, y };
};

window.nudgeShadowOffset = function(cmdId, dx = 0, dy = 0) {
    let cur = getShadowOffset(cmdId);
    let nx = Math.round((cur.x + dx) * 10) / 10;
    let ny = Math.round((cur.y + dy) * 10) / 10;
    window.setShadowOffset(cmdId, nx, ny);
    let lbl = document.getElementById('sl-calibrator-coords');
    if (lbl) lbl.innerText = `${cmdId.toUpperCase()} -> X: ${nx}px | Y: ${ny}px`;
};

function applyShadowOffsetsToDOM(root = document) {
    root.querySelectorAll('svg[data-cmd-key]').forEach(svg => {
        let key = svg.getAttribute('data-cmd-key');
        let off = getShadowOffset(key);
        // Mueve el cuerpo del personaje dejando el círculo base de invocación fijo
        let bodyGroup = svg.querySelector('.ig-body, .tk-body, .ir-body, .svg-torso-solid');
        if (bodyGroup) {
            bodyGroup.style.transform = (off.x !== 0 || off.y !== 0) ? `translate(${off.x}px, ${off.y}px)` : '';
        } else {
            Array.from(svg.children).forEach(ch => {
                let tag = ch.tagName.toLowerCase();
                if (tag === 'defs' || tag === 'ellipse' || ch.classList.contains('svg-summon-ring')) return;
                ch.style.transform = (off.x !== 0 || off.y !== 0) ? `translate(${off.x}px, ${off.y}px)` : '';
            });
        }
    });
}

let activeCalibratorCmd = 'igris';
window.openShadowXYCalibrator = function(cmdId) {
    if (cmdId) activeCalibratorCmd = cmdId;
    let bar = document.getElementById('sl-shadow-xy-calibrator');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'sl-shadow-xy-calibrator';
        bar.style.cssText = 'position:fixed; bottom:88px; left:50%; transform:translateX(-50%); width:94%; max-width:395px; background:rgba(3,10,24,0.96); border:1.5px solid #7dd3fc; box-shadow:0 0 22px rgba(0,229,255,0.4); padding:10px 12px; z-index:9900; border-radius:2px;';
        document.body.appendChild(bar);
    }
    let cur = getShadowOffset(activeCalibratorCmd);
let tabs = ['igris', 'tank', 'iron', 'tusk', 'beru', 'min'].map(k =>
        `<span onclick="openShadowXYCalibrator('${k}')" style="padding:3px 7px; font-family:'Share Tech Mono',monospace; font-size:0.7em; cursor:pointer; border:1px solid ${k===activeCalibratorCmd?'#fff':'rgba(125,211,252,0.35)'}; background:${k===activeCalibratorCmd?'rgba(14,165,233,0.35)':'transparent'}; color:#fff;">${k.toUpperCase()}</span>`
    ).join('');

    bar.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-family:'Share Tech Mono',monospace; font-size:0.75em; color:#7dd3fc;" id="sl-calibrator-coords">${activeCalibratorCmd.toUpperCase()} -> X: ${cur.x}px | Y: ${cur.y}px</span>
            <span style="cursor:pointer; color:#94a3b8; font-size:0.75em; padding:2px 6px;" onclick="document.getElementById('sl-shadow-xy-calibrator').remove()">CERRAR ✕</span>
        </div>
        <div style="display:flex; gap:4px; justify-content:center; margin-bottom:8px; flex-wrap:wrap;">${tabs}</div>
        <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:5px;">
            <button class="btn btn-blue" style="padding:6px 2px;" onclick="nudgeShadowOffset('${activeCalibratorCmd}', -2, 0)">◀ X-</button>
            <button class="btn btn-blue" style="padding:6px 2px;" onclick="nudgeShadowOffset('${activeCalibratorCmd}', 2, 0)">X+ ▶</button>
            <button class="btn btn-blue" style="padding:6px 2px;" onclick="nudgeShadowOffset('${activeCalibratorCmd}', 0, -2)">▲ Y-</button>
            <button class="btn btn-blue" style="padding:6px 2px;" onclick="nudgeShadowOffset('${activeCalibratorCmd}', 0, 2)">▼ Y+</button>
            <button class="btn btn-red" style="padding:6px 2px; font-size:0.65em;" onclick="setShadowOffset('${activeCalibratorCmd}', 0, 0); openShadowXYCalibrator('${activeCalibratorCmd}')">RESET</button>
        </div>
    `;
};

let _igrisUidFallback = 0;
window.getCommanderSVG = function(cmdId, mode = 'idle') {
    let key = String(cmdId || '').toLowerCase().trim();
    let svgOut = '';

    if (key === 'igris' && typeof getIgrisSVG === 'function') {
        svgOut = getIgrisSVG();
    } else if (key === 'tank' && typeof getTankSVG === 'function') {
        svgOut = getTankSVG();
    } else if (key === 'iron' && typeof getIronSVG === 'function') {
        svgOut = getIronSVG();
    } else if (key === 'igris') {
        let rawSvg = (typeof IGRIS_SVG !== 'undefined') ? IGRIS_SVG : (window.IGRIS_SVG || '');
        if (rawSvg) {
            let uid = (++_igrisUidFallback);
            svgOut = rawSvg.replace(/\b(igcL|igcR|igcA|igcCore|igcLobeL|igcLobeR|Gradient1|Gradient2|Gradient3)\b/g, `$1_${uid}`);
        }
} else if (key === 'tusk' && typeof getTuskSVG === 'function') {
        svgOut = getTuskSVG();
    } else if (key === 'tusk' && typeof TUSK_SVG !== 'undefined' && TUSK_SVG) {
        svgOut = TUSK_SVG;
    } else if (key === 'beru' && typeof getBeruSVG === 'function') {
        svgOut = getBeruSVG();
    } else if (key === 'beru' && typeof BERU_SVG !== 'undefined' && BERU_SVG) {
        svgOut = BERU_SVG;
    } else if (key === 'tusk') {
        svgOut = `<svg viewBox="0 0 220 220" width="100%" height="100%"><circle cx="110" cy="110" r="65" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
} else if (key === 'beru') {
        svgOut = `<svg viewBox="0 0 220 220" width="100%" height="100%"><circle cx="110" cy="110" r="65" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
    } else if (key === 'min' && typeof getMinSVG === 'function') {
        svgOut = getMinSVG();
    } else if (key === 'min' && typeof getMinByungGyuSVG === 'function') {
        svgOut = getMinByungGyuSVG();
    } else if (key === 'min' && typeof MIN_SVG !== 'undefined' && MIN_SVG) {
        svgOut = MIN_SVG;
    } else if (key === 'min' && typeof MIN_BYUNG_GYU_SVG !== 'undefined' && MIN_BYUNG_GYU_SVG) {
        svgOut = MIN_BYUNG_GYU_SVG;
    } else if (key === 'min') {
        svgOut = `<svg class="ig ig-idle" viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="198" rx="64" ry="10" fill="none" stroke="#7dd3fc" stroke-width="1.6" stroke-dasharray="8 5"/><g class="svg-torso-solid"><circle cx="110" cy="78" r="46" fill="none" stroke="rgba(186,230,253,0.45)" stroke-width="1.4" stroke-dasharray="6 4"/><path d="M110 20 L110 34 M103 27 L117 27" stroke="#ffffff" stroke-width="2.4"/><path d="M110 36 C82 36 70 58 74 88 L90 98 L110 86 L130 98 L146 88 C150 58 138 36 110 36 Z" fill="#061226" stroke="#e0f2fe" stroke-width="1.8"/><path d="M56 92 L110 108 L164 92 L176 192 L44 192 Z" fill="#040b18" stroke="#7dd3fc" stroke-width="1.8"/><path d="M92 98 L110 178 L128 98" fill="none" stroke="#e0f2fe" stroke-width="1.5"/><polygon points="95,68 106,71 98,74" fill="#ffffff"/><polygon points="125,68 114,71 122,74" fill="#ffffff"/><line x1="168" y1="54" x2="168" y2="192" stroke="#e0f2fe" stroke-width="2.4"/><polygon points="168,36 180,52 168,68 156,52" fill="rgba(125,211,252,0.3)" stroke="#ffffff" stroke-width="1.8"/></g></svg>`;
    } else if (key === 'min_unknown') {
        svgOut = `<svg viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="198" rx="60" ry="10" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6 5"/><circle cx="110" cy="105" r="56" fill="rgba(15,23,42,0.75)" stroke="rgba(125,211,252,0.45)" stroke-width="1.6" stroke-dasharray="8 6"/><text x="110" y="132" text-anchor="middle" fill="#e0f2fe" font-family="Exo 2, sans-serif" font-weight="700" font-size="82" style="filter:drop-shadow(0 0 12px #00e5ff);">?</text></svg>`;
    } else {
        svgOut = `<svg viewBox="0 0 220 220" width="100%" height="100%"><circle cx="110" cy="110" r="65" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="6 6"/></svg>`;
    }

    if (mode && mode !== 'idle') {
        svgOut = svgOut.replace('class="ig ig-idle"', `class="ig ig-${mode}"`);
    }
    svgOut = svgOut.replace('<svg ', `<svg data-cmd-key="${key}" `);
    setTimeout(() => applyShadowOffsetsToDOM(), 0);
    return svgOut;
};
var getCommanderSVG = window.getCommanderSVG;
/* ==========================================================================
   3. CINEMÁTICA HOLOGRÁFICA A PANTALLA COMPLETA PARA HABILIDADES ACTIVAS
   ========================================================================== */
function playCommanderUltCinematic(cmdId, onComplete) {
    let meta = COMMANDERS_META[cmdId];
    if (!meta) {
        if (typeof onComplete === "function") onComplete();
        return;
    }

    let overlay = document.getElementById('commander-ult-overlay');
    let flash = document.getElementById('ult-bg-flash');
    let stage = document.getElementById('ult-stage-box');
    let nameEl = document.getElementById('ult-cmd-name');
    let titleEl = document.getElementById('ult-skill-title');
    let subEl = document.getElementById('ult-skill-sub');

    if (!overlay || !stage) {
        if (typeof onComplete === "function") onComplete();
        return;
    }

    flash.style.background = `radial-gradient(circle, ${meta.color}55 0%, ${meta.accent}22 60%, transparent 90%)`;
    nameEl.innerText = `🗣️ ¡SURGE! // ${meta.name.toUpperCase()}`;
    nameEl.style.color = meta.color;
    titleEl.innerText = meta.activeName;
    titleEl.style.textShadow = `0 0 25px ${meta.color}, 0 0 45px ${meta.accent}`;
    subEl.innerText = meta.activeDesc;

        stage.innerHTML = `
        <div class="ult-slash-beam" style="box-shadow: 0 0 25px ${meta.color}, 0 0 50px ${meta.accent};"></div>
        ${getCommanderSVG(cmdId, 'attack')}
    `;

    window._ultCinematicActive = true;
    document.body.classList.add('ult-cinematic-playing');
    overlay.style.display = 'flex';
    if (typeof playSystemSound === "function") playSystemSound('purple');
    if (navigator.vibrate) navigator.vibrate([80, 50, 180, 50, 250]);

    setTimeout(() => {
        overlay.style.display = 'none';
        window._ultCinematicActive = false;
        document.body.classList.remove('ult-cinematic-playing');
        if (typeof onComplete === "function") onComplete();
    }, 2200);
} 

/* ==========================================================================
   4. ESTRUCTURA DEL EJÉRCITO Y SELLO EXCLUSIVO DE ISLA DE JEJU (MIN BYUNG-GYU)
   ========================================================================== */
function ensureShadowStructure() {
    if (!p) return;
    if (!p.shadowArmy) p.shadowArmy = {};
    if (!p.shadowArmy.igris) p.shadowArmy.igris = { unlocked: false, level: 1, active: false };
    if (!p.shadowArmy.tank)  p.shadowArmy.tank  = { unlocked: false, level: 1, active: false, usesLeft: 2, cooldownUntil: null };
    if (!p.shadowArmy.iron)  p.shadowArmy.iron  = { unlocked: false, level: 1, active: false };
    if (!p.shadowArmy.tusk)  p.shadowArmy.tusk  = { unlocked: false, level: 1, active: false };
    if (!p.shadowArmy.beru)  p.shadowArmy.beru  = { unlocked: false, level: 1, active: false };
    if (!p.shadowArmy.min)   p.shadowArmy.min   = { unlocked: false, usedForever: false };

    // Migración Canon: Igris ya NO se regala al inicio; requiere Nivel 40 (Cambio de Clase) o haberlo extraído con cristales en rango alto
    if (!p.canonShadowLockV6) {
        p.canonShadowLockV6 = true;
        if ((p.level || 1) < 40 && !p.igrisExtractedCanon) {
            p.shadowArmy.igris.unlocked = false;
            p.shadowArmy.igris.active = false;
            if (Array.isArray(p.equippedShadows)) {
                p.equippedShadows = p.equippedShadows.filter(id => id !== 'igris');
            }
        }
    }

    if (!p.jejuCleared && !p.shadowArmy.min.usedForever) {
        p.shadowArmy.min.unlocked = false;
    } else if (p.jejuCleared) {
        p.shadowArmy.min.unlocked = true;
    }

    if (!Array.isArray(p.equippedShadows)) {
        p.equippedShadows = [];
    }
    if (!p.infantry) {
        p.infantry = { soldiers: 0, mages: 0, bears: 0, orcs: 0, ants: 0 };
    }
    if (!Array.isArray(p.titles)) p.titles = [];

    // Desbloqueos automáticos por Historia Canon del Manhwa
    if (p.stats) {
        if (p.level >= 40) p.shadowArmy.igris.unlocked = true;
        if (p.level >= 48 || p.stats.str >= 3.8) p.shadowArmy.tank.unlocked = true;
        if (p.level >= 52 || p.stats.str >= 4.0) p.shadowArmy.iron.unlocked = true;
if (p.level >= 72 || p.stats.int >= 4.5 || (typeof hasEquippedItem === "function" && hasEquippedItem('eq_w_kargalgan'))) {
            p.shadowArmy.tusk.unlocked = true;
        }
        if (p.jejuCleared || p.level >= 90) p.shadowArmy.beru.unlocked = true;
    }
}

function getEffectiveActiveCost(cmdId) {
    let meta = COMMANDERS_META[cmdId];
    if (!meta) return 300;
    let cost = meta.activeCost;
    let hasEq = (id) => (typeof hasEquippedItem === "function") ? hasEquippedItem(id) : false;
    if (cmdId === 'igris' && hasEq('eq_a1')) {
        cost = Math.max(100, cost - 110);
    }
    if (cmdId === 'tusk' && hasEq('eq_w_kargalgan')) {
        cost = Math.floor(cost * 0.65);
    }
    if (hasEq('eq_h_shadow')) {
        cost = Math.floor(cost * 0.75);
    }
    if (p && p.sovereignCritDiscount) {
        cost = Math.floor(cost * 0.5);
    }
    return cost;
}

function getIgrisNextGoldReward() {
    let todayKey = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    if (!p || p.igrisGoldDay !== todayKey) return 75;
    let uses = p.igrisGoldUses || 0;
    const schedule = [75, 40, 25];
    return uses < schedule.length ? schedule[uses] : 0;
}

function getHoloLockSVG(size = 14, color = "currentColor") {
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-2px;"><rect x="4" y="11" width="16" height="10" rx="2" fill="rgba(15,23,42,0.85)"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.5" fill="${color}"/></svg>`;
}

function getCommanderDynamicText(cmdId) {
    ensureShadowStructure();
    let st = (p && p.shadowArmy && p.shadowArmy[cmdId]) ? p.shadowArmy[cmdId] : { level: 1 };
    let lvl = st.level || 1;
    let bonus = lvl - 1;

    if (cmdId === 'igris') {
        let expGoldPct = 4 * lvl;
        let clashDmg = 18 + (lvl * 4);
        let nextGold = getIgrisNextGoldReward();
        let goldLabel = nextGold > 0 ? `+${nextGold} G limpios hoy (Escala: 75/40/25/0 G)` : `0 G (Límite diario alcanzado)`;
        return {
            passive: `Otorga <b style="color:#7dd3fc;">+${expGoldPct}% EXP y +${expGoldPct}% Oro</b> (Niv.${lvl}), ensancha <b style="color:#7dd3fc;">+12%</b> el núcleo crítico del Corte y en Choques de Jefe lanza tajos automáticos de <b style="color:#7dd3fc;">-${clashDmg} HP</b>.`,
            active: `En el Sello: Parte el núcleo con Crítico Perfecto. Fuera del Sello: Activa Concentración del Caballero (<b style="color:#e0f2fe;">-20 Fatiga, +${45 + (bonus * 12)} XP</b> y <b style="color:#e0f2fe;">${goldLabel}</b> sin alterar tus tiempos reales).`
        };
    }
    if (cmdId === 'tank') {
        let passiveShield = 35 + (lvl * 10);
        let activeShield = 80 + (bonus * 15);
        let fatRelief = Math.min(100, 30 + (bonus * 4));
        return {
            passive: `Mantiene una Barrera Ártica de hasta <b style="color:#7dd3fc;">+${passiveShield}</b>, bloquea la quema nocturna de Oro y ancla tu vida en <b style="color:#7dd3fc;">25 HP</b> (Máx. 2 noches antes de hibernar 24h).`,
            active: `Levanta un Escudo Ártico inmediato de <b style="color:#e0f2fe;">+${activeShield}</b> (Niv.${lvl}), descarga <b style="color:#e0f2fe;">-${fatRelief} de FATIGA</b> y retrasa +45 min el desgaste nocturno de hoy.`
        };
    }
    if (cmdId === 'iron') {
        let immMins = 20 + (bonus * 4);
        let fatRelief = Math.min(100, 35 + (bonus * 4));
        return {
            passive: `Absorbe el <b style="color:#7dd3fc;">80% de todo daño</b> en Mazmorras o fallos de Corte. Cada vez que bloquea un golpe de Jefe por ti, suelta chispas de maná (<b style="color:#7dd3fc;">+15 G</b>).`,
            active: `Golpea su escudo forzando una Fisura Rango A con <b style="color:#e0f2fe;">TRIPLE botín</b>, descarga <b style="color:#e0f2fe;">-${fatRelief} de FATIGA</b> y te vuelve 100% inmune al daño por <b style="color:#e0f2fe;">${immMins} min</b>.`
        };
    }
    if (cmdId === 'tusk') {
        let spDisc = Math.min(55, 35 + (bonus * 2));
        let fbXp = 150 + (bonus * 30);
        let fbGold = 65 + (bonus * 15);
        return {
            passive: `Magia de Gravedad Cero: Reduce un <b style="color:#7dd3fc;">${spDisc}% la FATIGA</b> de todas tus misiones, ralentiza 30% la aguja del Corte y acelera 20% los relojes de mazmorra (Niv.${lvl}).`,
            active: `En Mazmorra: Incinera toda la fase actual al instante. En Rutina: Incinera tus misiones secundarias domésticas entregando su EXP/Oro sin tocar la telemetría (o condensa <b style="color:#e0f2fe;">+${fbXp} XP y +${fbGold} G</b>).`
        };
    }
    if (cmdId === 'beru') {
        let statGain = (0.05 + (bonus * 0.01)).toFixed(2);
        let gBoost = 40 + (bonus * 4);
        let aHeal = 60 + (bonus * 10);
        return {
            passive: `En campo te cura <b style="color:#7dd3fc;">+3 HP</b> y reduce <b style="color:#7dd3fc;">-3 de FATIGA</b> cada minuto. Al derrotar cualquier Mazmorra o Jefe Pomodoro devora su núcleo (<b style="color:#7dd3fc;">+${statGain} atributo permanente</b>).`,
            active: `Desata el Modo Berserker (60m): Cura <b style="color:#e0f2fe;">+${aHeal} HP</b>, limpia tu <b style="color:#e0f2fe;">FATIGA a 0</b>, aumenta <b style="color:#e0f2fe;">+${gBoost}% todo el Oro</b> y extiende +5 min tu descanso Pomodoro actual.`
        };
    }
    return { passive: COMMANDERS_META[cmdId].passiveDesc, active: COMMANDERS_META[cmdId].activeDesc };
}

function getMaxShadowSlots() {
    if (!p || !p.stats) return 1;
    let slots = 1;
    let sumStats = Math.floor((p.stats.str + p.stats.int) * 10);
    // Balance Canon: Ranura 2 en Nivel 45 (o STR+INT >= 500) | Ranura 3 en Nivel 75 + INT 4.50
    if (p.level >= 45 || sumStats >= 500) slots = 2;
    if (p.level >= 75 && p.stats.int >= 4.5) slots = 3;
    p.shadowSlots = slots;
    return slots;
}
function recallAllShadows() {
    ensureShadowStructure();
    if (!p.equippedShadows || p.equippedShadows.length === 0) {
        systemNotify("🌑 Todas tus sombras ya se encuentran en reposo (0 MP/m).", "info");
        return;
    }
    p.equippedShadows = [];
    Object.keys(p.shadowArmy).forEach(k => {
        if (p.shadowArmy[k] && typeof p.shadowArmy[k] === 'object') {
            p.shadowArmy[k].active = false;
        }
    });
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderClashShadowButtons === "function") renderClashShadowButtons();
    if (typeof renderMiniArenaUnits === "function") renderMiniArenaUnits();
    systemNotify("🌑 Tus Comandantes han regresado a tu sombra. Drenaje de Maná detenido (0 MP/m).", "purple");
}

function selectShowcaseCommander(cmdId) {
    currentShowcaseCmd = cmdId;
    renderShadowSanctuary();
}

/* ==========================================================================
   5. MOTOR ANTI-TRAMPAS: CANALIZACIÓN DE PULSO Y CORTE DIMENSIONAL
   ========================================================================== */
let channelInterval = null;
let channelProgress = 0;
let slashAnimFrame = null;
let slashPos = 0;
let slashDir = 1;
let slashSpeed = 1.65;
let targetStart = 37;
let targetWidth = 26;

function generateMathCaptcha() {
    resetSealModalToPhase1();
}

function resetSealModalToPhase1() {
    ensureShadowStructure();
    clearInterval(channelInterval);
    if (slashAnimFrame) cancelAnimationFrame(slashAnimFrame);
    channelProgress = 0;

    let p1 = document.getElementById('seal-phase-1');
    let p2 = document.getElementById('seal-phase-2');
    let bar = document.getElementById('channel-bar-fill');
    let lbl = document.getElementById('channel-bar-label');
    let fx = document.getElementById('igris-slash-fx');

    if (p1) p1.style.display = 'block';
    if (p2) p2.style.display = 'none';
    if (bar) bar.style.width = '0%';
    if (lbl) lbl.innerText = 'SINCRONIZACIÓN: 0%';
    if (fx) fx.style.display = 'none';

    let igrisBtn = document.getElementById('btn-igris-slash');
    if (igrisBtn) {
        let igrisEquipped = p.equippedShadows && p.equippedShadows.includes('igris');
        let cost = getEffectiveActiveCost('igris');
        igrisBtn.innerText = `⚔️ ORDENAR A IGRIS: TAJO CARMESÍ (-${cost} MP)`;
        igrisBtn.style.display = igrisEquipped ? 'block' : 'none';
    }
}

function openSealModal(rewardData) {
    pendingReward = rewardData;
    resetSealModalToPhase1();
    openModal('confirm-modal');
}

function abortSeal() {
    clearInterval(channelInterval);
    if (slashAnimFrame) cancelAnimationFrame(slashAnimFrame);
    pendingReward = null;
    closeModal('confirm-modal');
}

function completePenalty() {
    openSealModal({ type: 'penalty' });
}

function claimDailyEvent() {
    if (!p.activeEvent) return;
    openSealModal({ 
        type: 'daily_event', 
        xp: p.activeEvent.xp || 60, 
        gold: p.activeEvent.gold || 30 
    });
}

function startSealChannel(e) {
    if (e && e.cancelable) e.preventDefault();
    clearInterval(channelInterval);

    channelInterval = setInterval(() => {
        channelProgress += 5;
        let bar = document.getElementById('channel-bar-fill');
        let lbl = document.getElementById('channel-bar-label');
        if (bar) bar.style.width = `${Math.min(100, channelProgress)}%`;
        if (lbl) lbl.innerText = `SINCRONIZACIÓN: ${Math.min(100, channelProgress)}%`;

        if (channelProgress >= 100) {
            clearInterval(channelInterval);
            if (navigator.vibrate) navigator.vibrate(80);
            if (typeof playSystemSound === "function") playSystemSound('purple');
            startSlashPhase();
        }
    }, 45);
}

function stopSealChannel(e) {
    if (e && e.cancelable) e.preventDefault();
    clearInterval(channelInterval);
    if (channelProgress < 100) {
        channelProgress = 0;
        let bar = document.getElementById('channel-bar-fill');
        let lbl = document.getElementById('channel-bar-label');
        if (bar) bar.style.width = '0%';
        if (lbl) lbl.innerText = 'SINCRONIZACIÓN INTERRUMPIDA (MANTÉN PRESIONADO)';
    }
}

function startSlashPhase() {
    let p1 = document.getElementById('seal-phase-1');
    let p2 = document.getElementById('seal-phase-2');
    if (p1) p1.style.display = 'none';
    if (p2) p2.style.display = 'block';

    let agiVal = (p && p.stats) ? p.stats.agi : 1.0;
    let hasEq = (id) => (typeof hasEquippedItem === "function") ? hasEquippedItem(id) : false;
    let tuskEquipped = p.equippedShadows && p.equippedShadows.includes('tusk');

    let bonusWidth = Math.min(14, Math.floor((agiVal - 1) * 3));
    if (tuskEquipped) bonusWidth += 8;
    if (hasEq("eq_w_kim")) bonusWidth += 4;
    if (hasEq("eq_a_gloves_c")) bonusWidth += 3;
    if (hasEq("eq_g_high")) bonusWidth += 4;

    targetWidth = Math.min(50, 24 + bonusWidth);
    if (p.nextSlashWiden) {
        targetWidth = Math.min(62, targetWidth + 12);
        p.nextSlashWiden = false;
    }
    targetStart = Math.floor(Math.random() * (85 - targetWidth - 15)) + 15;

    let baseSpd = tuskEquipped ? 1.3 : 1.75;
    if (hasEq("eq_w_baruka")) baseSpd *= 0.80;
    slashSpeed = Math.max(0.85, baseSpd - ((agiVal - 1) * 0.08));

    if (p.nextSlashSlow) {
        slashSpeed *= 0.65;
        p.nextSlashSlow = false;
    }
    if (p.nextSlashFast) {
        slashSpeed *= 1.15;
        p.nextSlashFast = false;
    }

    slashPos = 0;
    slashDir = 1;

    let zoneEl = document.getElementById('slash-target-zone');
    if (zoneEl) {
        zoneEl.style.left = `${targetStart}%`;
        zoneEl.style.width = `${targetWidth}%`;
    }

    if (slashAnimFrame) cancelAnimationFrame(slashAnimFrame);
    function animateCursor() {
        slashPos += slashSpeed * slashDir;
        if (slashPos >= 96) { slashPos = 96; slashDir = -1; }
        if (slashPos <= 0)  { slashPos = 0;  slashDir = 1; }

        let cur = document.getElementById('slash-cursor');
        if (cur) cur.style.left = `${slashPos}%`;
        slashAnimFrame = requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

function triggerIgrisInstantSeal() {
    let cost = getEffectiveActiveCost('igris');

    if (!p || (p.mp || 0) < cost) {
        systemNotify(`Maná insuficiente para ordenar el Tajo Carmesí de Igris (Requiere ${cost} MP).`, "danger");
        return;
    }
    clearInterval(channelInterval);
    if (slashAnimFrame) cancelAnimationFrame(slashAnimFrame);
    closeModal('confirm-modal');

    p.sovereignCritDiscount = false;
    consumeMPFast(cost, () => {
        playCommanderUltCinematic('igris', () => {
            systemNotify("¡TAJO CARMESÍ DE IGRIS! Núcleo partido en dos con precisión absoluta.", "purple");
            executeSealSuccess(true);
        });
    });
}

function validateAndSeal() {
    if (slashAnimFrame) cancelAnimationFrame(slashAnimFrame);

    let hitEnd = targetStart + targetWidth;
    let hasEq = (id) => (typeof hasEquippedItem === "function") ? hasEquippedItem(id) : false;
    let igrisEquipped = p && p.equippedShadows && p.equippedShadows.includes('igris');
    let dagLvl = (p && p.hunterSkills && p.hunterSkills.dagger_mastery) ? p.hunterSkills.dagger_mastery.lvl : 1;
    let critRatio = (igrisEquipped ? 0.45 : 0.35) + (dagLvl * 0.015) + (hasEq("eq_g_high") ? 0.08 : 0);
    if (typeof gainHunterSkillXP === "function") gainHunterSkillXP('dagger_mastery', 1);
    let critMargin = targetWidth * critRatio;
    let critStart = targetStart + ((targetWidth - critMargin) / 2);
    let critEnd = critStart + critMargin;

    if (slashPos >= targetStart && slashPos <= hitEnd) {
        let isCrit = hasEq("eq_w_kamish") || (slashPos >= critStart && slashPos <= critEnd);
        executeSealSuccess(isCrit);
    } else {
        p._arcCritChain = 0;
        let ironEquipped = p && p.equippedShadows && p.equippedShadows.includes('iron');
        let dmg = (p.cryoBuffUntil && Date.now() < p.cryoBuffUntil) ? 2.5 : 5;
        if (ironEquipped) dmg = +(dmg * 0.25).toFixed(1);
        if (hasEq("eq_a_leather")) dmg = Math.max(1, dmg - 2);
        if (hasEq("eq_acc_gate")) dmg *= 0.5;
        if (p.ironImmunityUntil && Date.now() < p.ironImmunityUntil) dmg = 0;

        if (ironEquipped && Math.random() < 0.40) {
            p.gold += 10;
            systemNotify(`¡REBOTE DE BASTIÓN! Iron desvió el contraataque con su escudo y extrajo +10 G (Daño: -${dmg} HP).`, "gold");
        } else {
            systemNotify(`Corte desviado. La anomalía contraatacó tu apertura: -${dmg} HP`, "danger");
        }

        if (p && p.hp !== undefined) {
            p.hp = Math.max(0, p.hp - dmg);
            if (typeof updateHUD === "function") updateHUD();
            saveData();
            if (p.hp <= 0) return;
        }
        startSlashPhase();
    }
}

/* ==========================================================================
   6. PROCESAMIENTO DE RECOMPENSAS, RELIQUIAS Y BONO DE CRÍTICO
   ========================================================================== */
function executeSealSuccess(isCrit = false) {
    closeModal('confirm-modal');
    ensureShadowStructure();

    let now = Date.now();
    let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    let hasEq = (id) => (typeof hasEquippedItem === "function") ? hasEquippedItem(id) : false;

    let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;

    if (!pendingReward || !p) return;

    let igrisActive = p.equippedShadows && p.equippedShadows.includes('igris');
    let igrisBuff = igrisActive ? 1 + ((p.shadowArmy.igris.level || 1) * 0.03) : 1;
    let critMult = isCrit ? 1.15 : 1.0;
    let voidMult = (p.voidXpBuffUntil && now < p.voidXpBuffUntil) ? 2.0 : 1.0;
    if (p._arcPrismUntil && now < p._arcPrismUntil) voidMult *= 1.5;
    if (p._arcEclipseActive && now < p._arcEclipseActive) voidMult *= 2.5;
    if (p.circadianXpBuffUntil && now < p.circadianXpBuffUntil) voidMult *= 1.10;

    if (p.demonBloodUntil && now < p.demonBloodUntil) {
        voidMult *= 1.25;
        p.hp = Math.min(maxHP, p.hp + 25);
        p.mp = Math.min(maxMP, (p.mp || 0) + 200);
        systemNotify("Frenesí de Sangre de Demonio Noble: +25 HP y +200 MP absorbidos.", "danger");
    }

    let beruLvl = (p.shadowArmy && p.shadowArmy.beru) ? (p.shadowArmy.beru.level || 1) : 1;
    let beruGoldMult = (p.beruSpeedUntil && now < p.beruSpeedUntil) ? (1 + ((35 + ((beruLvl - 1) * 3)) / 100)) : 1.0;
        let wolfGoldMult = hasEq("eq_acc_wolf") ? 1.15 : 1.0;
    let copperFocusMult = (pendingReward.type === 'study' && hasEq("eq_acc_copper")) ? 1.25 : 1.0;
    let hasWolfTitle = Array.isArray(p.titles) && p.titles.some(t => t.id === 't_wolf_slayer');
    let wolfStudyXpMult = (pendingReward.type === 'study' && hasWolfTitle) ? 1.05 : 1.0;

    let finalXP = Math.floor((pendingReward.xp || 0) * igrisBuff * critMult * voidMult * copperFocusMult * wolfStudyXpMult);
    let finalGold = 0;

    if (p.starStreamNext && (pendingReward.gold || 0) > 0) {
        finalGold = Math.floor((pendingReward.gold || 0) * 3 * igrisBuff);
        p.starStreamNext = false;
        systemNotify("¡Patrocinio del Star Stream consumido! Oro triplicado libre de impuestos.", "gold");
    } else {
        let taxRate = (p._arcGildedUntil && now < p._arcGildedUntil) ? 1.0 : GOLD_NERF;
        finalGold = Math.floor((pendingReward.gold || 0) * igrisBuff * beruGoldMult * wolfGoldMult * taxRate);
    }

let availOrcs = (typeof getAvailableInfantryCount === "function") ? getAvailableInfantryCount('orcs') : 0;
    if (pendingReward.stat === 'str' && availOrcs > 0) {
        let orcMult = hasEq("eq_acc_metus") ? 4.5 : 3;
        finalGold += Math.floor(availOrcs * orcMult);
    }
    
    if (pendingReward.id === 'm_traffic_ida') {
        p.chorrosIdaFinishedAt = Date.now();
        saveData();
        setTimeout(() => {
            if (typeof renderRoutine === "function") renderRoutine();
            if (typeof systemNotify === "function") {
                systemNotify("Ruta Los Chorros (Retorno) ya está disponible en tu Tablón para tu viaje de regreso.", "info");
            }
        }, 30100);
    }
    if (pendingReward.id && pendingReward.id.includes('traffic') && hasEq("eq_a_serpento")) {
        finalGold += 35;
    }
    if (pendingReward.type === 'routine' && hasEq("eq_acc_silver")) {
        finalGold += 25;
    }

    let h = new Date().getHours();
    let m = new Date().getMinutes();
        let curMinSeal = h * 60 + m;
    let isLate = (h === 21 && m >= 15) || h >= 22 || curMinSeal < 270;
    let vigilOk = (typeof isNightVigilActiveNow === "function") ? isNightVigilActiveNow() : (p.nightPassActive === currentDayStr);

    if (isLate && !vigilOk && !(p.stealthModeUntil && now < p.stealthModeUntil) && !isMercyActive() && pendingReward.type !== 'penalty') {
        finalXP = 0;
        finalGold = 0;
        systemNotify("Maldición de Insomnio: Has quemado tu estamina en horario prohibido. +0 G, +0 XP.", "danger");
    }

    p.xp += finalXP;
    p.gold += finalGold;

        let hasUnlockedShadow = p.shadowArmy && ['igris', 'tank', 'iron', 'tusk', 'beru'].some(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);
    let mpGain = (pendingReward.type === 'study') ? ((pendingReward.mins === 25) ? 110 : 35) : 25;
    if (pendingReward.type === 'study' && hasWolfTitle) mpGain = Math.floor(mpGain * 1.40);
    if (isCrit) mpGain += 15;
    if (hasEq("eq_w_scythe")) { mpGain += 250; p.hp = Math.min(maxHP, p.hp + 25); }
    if (pendingReward.type === 'study' && hasEq("eq_acc_copper")) mpGain += 120;
    if (pendingReward.type === 'study' && p.sageTeaFocusMp) {
        mpGain += 180;
        p.sageTeaFocusMp = false;
        systemNotify("Infusión del Sabio asimilada: +180 MP extra canalizados.", "purple");
    }
    if (p.shadowArmy && p.shadowArmy.min && p.shadowArmy.min.usedForever) mpGain = Math.floor(mpGain * 1.05);

    p.mp = Math.min(maxMP, (p.mp || 0) + mpGain);


    if (pendingReward.type === 'routine' && p.whiteTigerBounty) {
        let taxRefund = Math.floor((pendingReward.gold || 0) * (1 - GOLD_NERF));
        p.gold += 110 + taxRefund;
        p.whiteTigerBounty = false;
        if (typeof rollLootDrop === "function") { rollLootDrop(false); rollLootDrop(false); }
        systemNotify("Concesión Tigre Blanco liquidada: 100% Oro bruto sin impuestos (+110 G extra) y 2 minerales extraídos.", "gold");
    }

    if (isCrit) {
        p.sovereignCritDiscount = true;
        systemNotify(`¡CORTE CRÍTICO PERFECTO! +15% EXP, +${mpGain} MP y la próxima Habilidad Activa de tus Sombras costará -50% MP.`, "gold");
    } else {
        systemNotify(`Sincronización completada. Incursión sellada (+${mpGain} MP).`, "success");
    }

    if (typeof _evalArcSealHook === "function") _evalArcSealHook(isCrit, pendingReward);

    if (pendingReward.type === 'penalty') {
        p.hp = 35;
        p.sp = 50;
        p.penaltyActive = false;
        p.deathSource = null;
        document.body.classList.remove('penalty-active');
        let overlay = document.getElementById('damage-overlay');
        if (overlay) overlay.style.display = 'none';
        systemNotify("Penalización saldada con sudor y sangre. Tus cadenas han sido rotas.", "gold");

    } else if (pendingReward.type === 'routine') {
        if (!p.completedToday) p.completedToday = [];
        if (!p.completedToday.includes(pendingReward.id)) {
            p.completedToday.push(pendingReward.id);
        }
        p.totalMissions = (p.totalMissions || 0) + 1;
        if (pendingReward.stat === 'str' && typeof gainHunterSkillXP === "function") {
            gainHunterSkillXP('longevity', 1);
        }

        if (!p.synergiesClaimedDay || p.synergiesClaimedDay !== currentDayStr) {
            p.synergiesClaimedDay = currentDayStr;
            p.synergiesClaimedList = [];
        }
        const hasDone = (mid) => p.completedToday.includes(mid);
        const claimSynergy = (synKey, notifyMsg, effectFn) => {
            if (!p.synergiesClaimedList.includes(synKey)) {
                p.synergiesClaimedList.push(synKey);
                effectFn();
                setTimeout(() => systemNotify(notifyMsg, "gold"), 500);
            }
        };

        if (hasDone('m_hydration') && (hasDone('m_traffic_ida') || hasDone('m_traffic_vuelta'))) {
            claimSynergy('syn_hydration_road', "[SINERGIA: HIDRATACIÓN EN RUTA] Completaste Recarga Biológica + Ruta Los Chorros: Recibes 1x Lágrima de Maná Puro (+400 MP) en tu Bolsa.", () => {
                let mpPot = (typeof shopDB !== 'undefined') ? shopDB.find(x => x.id === 'c_mp_pot') : null;
                if (mpPot) p.inventory.push({...mpPot, type: 'item'});
                p.mp = Math.min(maxMP, (p.mp || 0) + 100);
            });
        }
        let anySchedDone = p.completedToday.some(id => id.startsWith('sched_'));
        if (hasDone('m_workout') && (p.studyCompletedToday || anySchedDone)) {
            claimSynergy('syn_mind_body', "[SINERGIA: MENTE Y CUERPO DE ACERO] Completaste Entrenamiento + Estudio: +45 Escudo Protector y -20 Fatiga.", () => {
                p.arcticShield = Math.min(800, (p.arcticShield || 0) + 45);
                p.sp = Math.min(100, p.sp + 20);
            });
        }
        if (hasDone('m_clean') && hasDone('m_work')) {
            claimSynergy('syn_order_work', "[SINERGIA: DOMINIO OPERATIVO] Completaste Zona Limpia + Jornada Laboral: +1 Llave de Portal Rango D añadida a tu Bolsa.", () => {
                if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0 };
                p.dungeonKeys.rankD = (p.dungeonKeys.rankD || 0) + 1;
            });
        }
        if (hasDone('m_creative') && (hasDone('m_gf') || hasDone('m_phys'))) {
            claimSynergy('syn_creative_flow', "[SINERGIA: FLUJO DEL CREADOR] Completaste Práctica Creativa + Misión Paralela: Recibes 1x Incienso de Meditación y +20 HP.", () => {
                let medItem = (typeof shopDB !== 'undefined') ? shopDB.find(x => x.id === 'c_med') : null;
                if (medItem) p.inventory.push({...medItem, type: 'item'});
                p.hp = Math.min(maxHP, p.hp + 20);
            });
        }

        if (pendingReward.id && pendingReward.id.includes('traffic')) {
            if (p.chorrosCountDay !== currentDayStr) {
                p.chorrosCountDay = currentDayStr;
                p.chorrosDailyCount = 0;
            }
            p.chorrosDailyCount = (p.chorrosDailyCount || 0) + 1;

            if (p.chorrosDailyCount >= 4) {
                p.chorros4Unlocked = true;
                p.fallenSoulsPendingNextLvl = true;
                p.arcticShield = (p.arcticShield || 0) + 80;
                p.sp = 100;
                p.tankCurfewDelayDay = currentDayStr;

                if (!Array.isArray(p.titles)) p.titles = [];
                if (!p.titles.some(t => t.id === 'title_fallen_souls')) {
                    p.titles.push({
                        id: 'title_fallen_souls',
                        name: 'Protección de las Almas Caídas',
                        desc: 'Cruzar cuatro veces la Ruta Los Chorros en una misma jornada despertó una gracia silenciosa sobre tu camino. «Jehová guardará tu salida y tu entrada desde ahora y para siempre» (Salmos 121:8).'
                    });
                }

                setTimeout(() => {
                    if (typeof playJobChangeCinematic === "function") {
                        playJobChangeCinematic(
                            "LOGRO OCULTO // DIOS TE OBSERVA Y TE CUIDA",
                            "SALMOS 121:8 • GUARDARÁ TU SALIDA Y TU ENTRADA",
                            "PROTECCIÓN DE LAS ALMAS CAÍDAS"
                        );
                    }
                    systemNotify("Has conseguido un logro oculto: Hacer 2 veces esta ruta desbloquea en tu siguiente nivel [Protección de las Almas Caídas]. Donde otros cayeron en el asfalto, Dios observa tu camino y te cuida (+80 Escudo de Gracia y 100% SP).", "dungeon_major");
                }, 650);
            }
        }
        if (p.activeMissions && p.activeMissions[pendingReward.id]) {
            delete p.activeMissions[pendingReward.id];
        }
        if (pendingReward.stat && p.stats && p.stats[pendingReward.stat] !== undefined) {
            if (pendingReward.stat !== 'int' || !p.intBlockedUntil || now > p.intBlockedUntil) {
                let gain = 0.05;
                if (pendingReward.stat === 'int' && p.sageTeaActive) {
                    gain *= 2;
                    p.sageTeaActive = false;
                    systemNotify("Infusión del Sabio consumida: Ganancia de INT duplicada (+0.10 INT).", "purple");
                }
                p.stats[pendingReward.stat] = +(p.stats[pendingReward.stat] + gain).toFixed(2);
            }
        }
        if (pendingReward.timeCat && p.timeStats) {
            let minsToRecord = pendingReward.realMins || pendingReward.mins || 30;
            p.timeStats[pendingReward.timeCat] = (p.timeStats[pendingReward.timeCat] || 0) + minsToRecord;
        }
        if (Math.random() <= 0.35 && typeof rollLootDrop === "function") rollLootDrop(false);

        if (p.contractActive === currentDayStr && typeof getTodayMissions === "function") {
            let allToday = getTodayMissions();
            if (allToday.length > 0 && p.completedToday.length >= allToday.length) {
                p.contractActive = null;
                p.gold += 250;
                systemNotify("¡CONTRATO DE SANGRE CUMPLIDO AL 100%! Recibes +250 G limpios y +2 Cristales de Maná.", "gold");
            }
        }

    } else if (pendingReward.type === 'boss') {
        if (p.bosses && p.bosses[pendingReward.idx]) {
            let defeatedRank = p.bosses[pendingReward.idx].rank;
            p.bosses.splice(pendingReward.idx, 1);
            triggerBeruPredation();
            attemptShadowExtraction(defeatedRank);
            if (typeof rollLootDrop === "function") rollLootDrop(defeatedRank === 'S');
        }

    } else if (pendingReward.type === 'study') {
        p.studyCompletedToday = true;
        if (!p.intBlockedUntil || now > p.intBlockedUntil) {
            let intGain = (pendingReward.mins === 25 ? 0.10 : 0.03);
            if (p.sageTeaActive) {
                intGain *= 2;
                p.sageTeaActive = false;
                systemNotify(`Infusión del Sabio consumida: Ganancia de INT duplicada (+${intGain.toFixed(2)} INT).`, "purple");
            }
            p.stats.int = +(p.stats.int + intGain).toFixed(2);
        }
        if (p.timeStats) {
            p.timeStats.study = (p.timeStats.study || 0) + (pendingReward.mins || 25);
        }

    } else if (pendingReward.type === 'daily_event' || pendingReward.type === 'fissure') {
        if (pendingReward.type === 'daily_event') p.activeEvent = null;
        let rng = Math.random();
        if (rng > 0.75) {
            p.gold += 35;
            systemNotify("+35 G adicionales encontrados en la grieta.", "gold");
        } else if (rng > 0.35 && typeof rollLootDrop === "function") {
            rollLootDrop(false);
        } else {
            p.crystals = (p.crystals || 0) + 1;
            systemNotify("+1 Cristal de Maná condensado.", "purple");
        }
    }

    while (p.xp >= p.maxXp) {
        p.level++;
        p.xp -= p.maxXp;
        p.maxXp = (typeof getRequiredXpForLevel === "function") ? getRequiredXpForLevel(p.level) : Math.floor(100 + (p.level - 1) * 18);
        p.hp = maxHP;
        p.sp = 100;
        p.crystals = (p.crystals || 0) + 2;
        if (p.fallenSoulsPendingNextLvl) {
            p.fallenSoulsPendingNextLvl = false;
            p.phoenixFeatherActive = currentDayStr;
            p.arcticShield = (p.arcticShield || 0) + 120;
            systemNotify("¡BENDICIÓN DE NIVEL ACTIVADA [Protección de las Almas Caídas]! «Jehová guardará tu salida y tu entrada» (Salmos 121:8). Seguro de vida celestial activo hoy y +120 de Escudo de Gracia.", "dungeon_major");
        }
        systemNotify(`¡ASCENSIÓN AL NIVEL ${p.level}! Vitalidad y Maná al 100% (+2 CM).`, "gold");
    }

    pendingReward = null;
    ensureShadowStructure();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderBosses === "function") renderBosses();
    if (typeof renderInventory === "function") renderInventory();
    saveData();
}

function triggerBeruPredation() {
    if (!p.equippedShadows || !p.equippedShadows.includes('beru')) return;
    let beruLvl = (p.shadowArmy && p.shadowArmy.beru) ? (p.shadowArmy.beru.level || 1) : 1;
    let statGain = +(0.05 + ((beruLvl - 1) * 0.01)).toFixed(2);
    let hpGain = 15 + ((beruLvl - 1) * 4);

    const keys = ['str', 'int', 'agi'];
    const labels = { str: 'STR', int: 'INT', agi: 'AGI' };
    let pick = keys[Math.floor(Math.random() * keys.length)];
    p.stats[pick] = +(p.stats[pick] + statGain).toFixed(2);

    let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    p.hp = Math.min(maxHP, p.hp + hpGain);
    systemNotify(`¡DEPREDACIÓN DE BERU (Niv.${beruLvl})! Devoró el núcleo enemigo: +${statGain} ${labels[pick]} permanente y +${hpGain} HP.`, "purple");
}

function attemptShadowExtraction(rank) {
    ensureShadowStructure();
    if (rank === 'S' || rank === 'SSS') {
        p.shadowArmy.beru.unlocked = true;
    }
    if (rank !== 'B' && rank !== 'A' && rank !== 'S' && rank !== 'SSS') return;

    let baseChance = (rank === 'S' || rank === 'SSS') ? 0.35 : (rank === 'A' ? 0.50 : 0.60);
    let intBonus = p.stats ? (p.stats.int - 1) * 0.03 : 0;
    let jejuTitleBonus = (Array.isArray(p.titles) && p.titles.some(t => t.id === 't_jeju_savior')) ? 0.10 : 0;
    let totalChance = baseChance + intBonus + jejuTitleBonus;

    if (p.extractionBuffUntil && Date.now() < p.extractionBuffUntil) {
        totalChance *= 2;
    }

    totalChance = Math.min(0.95, totalChance);

    if (Math.random() <= totalChance) {
        p._arcFailAriseCount = 0;
        systemNotify("¡SURGE! Extracción Exitosa. La sombra se arrodilla ante tu voluntad.", "purple");
        let gain = (rank === 'S' || rank === 'SSS') ? 5 : (rank === 'A' ? 3 : 1);
        let hasMetus = (typeof hasEquippedItem === "function") && hasEquippedItem("eq_acc_metus");
        let soldierGain = hasMetus ? 2 : 1;

        p.crystals = (p.crystals || 0) + gain;
        p.infantry.soldiers = Math.min(25, (p.infantry.soldiers || 0) + soldierGain);
        systemNotify(`+${gain} Cristales de Maná y +${soldierGain} Soldado(s) de Sombra reclutado(s).`, "gold");
    } else {
        systemNotify("Extracción Fallida. El alma resistió el llamado y se desvaneció.", "danger");
        if (typeof _evalArcAriseFail === "function") _evalArcAriseFail();
    }
}
/* ==========================================================================
   7. SANTUARIO DEL MONARCA: CUADRÍCULA DE RETRATOS Y CAJÓN DESPLEGABLE
   ========================================================================== */
let selectedCommanderInspectId = null;
let selectedCommanderBackTab = {};
let selectedInfantryInspectId = null;

window.toggleCommanderCardInspect = function(cmdId) {
    selectedCommanderInspectId = (selectedCommanderInspectId === cmdId) ? null : cmdId;
    renderShadowSanctuary();
};

window.switchCmdBackTab = function(ev, cmdId, tabName) {
    if (ev) ev.stopPropagation();
    selectedCommanderBackTab[cmdId] = tabName;
    renderShadowSanctuary();
};

window.toggleInfantryCardInspect = function(infKey) {
    selectedInfantryInspectId = (selectedInfantryInspectId === infKey) ? null : infKey;
    renderShadowSanctuary();
};

function renderShadowSanctuary() {
    ensureShadowStructure();
    let maxSlots = getMaxShadowSlots();
    let now = Date.now();

    // 1. TRONO SUPERIOR (Único lugar donde las animaciones están activas)
    let altarEl = document.getElementById('shadow-altar-showcase');
    if (altarEl) {
        let activeCmdId = (p.equippedShadows && p.equippedShadows.length > 0)
            ? (p.equippedShadows.includes(currentShowcaseCmd) ? currentShowcaseCmd : p.equippedShadows[0])
            : null;

        if (activeCmdId && COMMANDERS_META[activeCmdId]) {
            altarEl.classList.remove('resting-compact');
            let meta = COMMANDERS_META[activeCmdId];
            let st = p.shadowArmy[activeCmdId];
            let effCost = getEffectiveActiveCost(activeCmdId);
            let customIdleSvg = getCommanderSVG(activeCmdId, 'idle');

            let selectorHtml = '';
            if (p.equippedShadows.length > 1) {
                selectorHtml = `<div style="display:flex; gap:6px; z-index:4; margin-bottom:8px; flex-wrap:wrap; justify-content:center;">` +
                    p.equippedShadows.map(cid => {
                        let m = COMMANDERS_META[cid];
                        let isSel = (cid === activeCmdId);
                        return `<button class="btn ${isSel ? 'btn-main' : 'btn-blue'}" style="padding:4px 10px; font-size:0.72em;" onclick="selectShowcaseCommander('${cid}')">${m.name}</button>`;
                    }).join('') + `</div>`;
            }

            altarEl.innerHTML = `
                <div class="altar-snow-bg"></div>
                ${selectorHtml}
                <div class="commander-svg-stage live-anim-active" id="throne-cmd-stage" onclick="setCommanderAnim('#throne-cmd-stage', 'attack', 650)">${customIdleSvg}</div>
                <div class="altar-info-bar">
                    <div style="font-size:1.12em; font-weight:700; color:#f8fafc; text-transform:uppercase; letter-spacing:1.5px; text-shadow:0 0 10px rgba(0,229,255,0.6);">
                        ${meta.name} • NIV. ${st.level || 1}
                    </div>
                    <div style="font-size:0.78em; color:#94a3b8; margin:3px 0 8px 0;">
                        ${meta.title} (<span style="color:#7dd3fc;">-${meta.mpDrain} MP/min base</span>)
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-main" style="flex:1; padding:8px; font-size:0.76em;" onclick="castCommanderActive('${activeCmdId}')">${meta.activeName} (-${effCost} MP)</button>
                        <button class="btn btn-blue" style="flex:1; padding:8px; font-size:0.76em;" onclick="toggleEquipCommander('${activeCmdId}')">GUARDAR EN SOMBRA</button>
                    </div>
                </div>`;
        } else {
            altarEl.classList.add('resting-compact');
            let firstUnlockedCmd = Object.keys(COMMANDERS_META).find(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);
            let surgeBtnHtml = firstUnlockedCmd
                ? `<button class="btn btn-main" style="padding:8px 14px; font-size:0.78em; flex-shrink:0;" onclick="toggleEquipCommander('${firstUnlockedCmd}')">¡SURGE!</button>`
                : `<button class="btn btn-blue" style="padding:8px 12px; font-size:0.72em; flex-shrink:0; opacity:0.5; cursor:not-allowed;" disabled>${getHoloLockSVG(12, "#94a3b8")} NIV.40</button>`;

            altarEl.innerHTML = `
                <div class="altar-info-bar" style="margin-top:0; display:flex; justify-content:space-between; align-items:center; gap:10px; padding:10px 14px; width:100%;">
                    <div style="text-align:left;">
                        <div style="font-size:0.9em; font-weight:700; color:#cbd5e1; letter-spacing:1px;">TRONO EN REPOSO ABSOLUTO</div>
                        <div style="font-size:0.74em; color:#7dd3fc; font-family:'Share Tech Mono', monospace;">Consumo: 0 MP/min (Núcleo Estable)</div>
                    </div>
                    ${surgeBtnHtml}
                </div>`;
        }
    }

    // 2. RANURAS DE COMANDANTES DESPLEGADOS (Estáticas sin animación)
    for (let i = 1; i <= 3; i++) {
        let slotEl = document.getElementById(`slot-shadow-${i}`);
        if (!slotEl) continue;

        if (i > maxSlots) {
            slotEl.className = "shadow-slot locked-slot";
            let cond = (i === 2)
                ? `Niv.45 o STR+INT: ${Math.floor((p.stats.str + p.stats.int) * 10)}/500`
                : `Niv.75 + INT ${p.stats.int.toFixed(2)}/4.50`;
            slotEl.innerHTML = `<span class="lock-icon">${getHoloLockSVG(24, "#64748b")}</span><span class="slot-lock-text" style="color:#94a3b8;">RANURA ${i}</span><span class="slot-2-condition" style="color:#64748b;">${cond}</span>`;
        } else {
            let cmdId = p.equippedShadows[i - 1];
            if (cmdId && COMMANDERS_META[cmdId]) {
                let meta = COMMANDERS_META[cmdId];
                let cmdState = p.shadowArmy[cmdId];
                slotEl.className = "shadow-slot active-slot";
                slotEl.onclick = () => toggleCommanderCardInspect(cmdId);
                slotEl.innerHTML = `
                    <div class="slot-live-model static-shadow-pose" style="width:74px; height:74px; margin:0 auto;">${getCommanderSVG(cmdId, 'idle')}</div>
                    <div style="color:#f8fafc; font-weight:700; font-size:0.8em; letter-spacing:0.8px;">${meta.name.replace('Comandante ', '').toUpperCase()}</div>
                    <div style="font-size:0.68em; color:#7dd3fc; font-family:'Share Tech Mono', monospace;">NV.${cmdState.level || 1} • -${meta.mpDrain} MP/m</div>
                    <button class="btn btn-blue" style="width:100%; padding:4px; font-size:0.62em; margin-top:4px;" onclick="event.stopPropagation(); toggleEquipCommander('${cmdId}')">GUARDAR</button>`;
            } else {
                slotEl.className = "shadow-slot";
                slotEl.onclick = null;
                slotEl.innerHTML = `<span class="slot-1-meta" style="color:#64748b;">[RANURA ${i} LIBRE]</span><span style="font-size:0.7em; color:#94a3b8; margin-top:4px;">0 MP/m</span><span style="font-size:0.65em; color:#475569;">Toca una sombra abajo</span>`;
            }
        }
    }

// 3. Ocultar el contenedor viejo de Min Byung-Gyu (ahora vive como la 6.ª tarjeta de la cuadrícula)
    let minCont = document.getElementById('min-sanctuary-container');
    if (minCont) {
        minCont.style.display = 'none';
        minCont.innerHTML = '';
    }

    // 4. PANTEÓN DE COMANDANTES: TARJETAS 3D GIRATORIAS + 6.ª TARJETA DE MIN BYUNG-GYU
    let cmdCont = document.getElementById('commanders-list-container');
    if (cmdCont) {
        let discountBanner = p.sovereignCritDiscount
            ? `<div style="margin-bottom:12px; padding:8px 12px; background:rgba(14,165,233,0.12); border:1px solid rgba(125,211,252,0.5); color:#e0f2fe; font-size:0.8em; font-weight:600; text-align:center;">AUTORIDAD DEL SOBERANO: Tu próxima Habilidad Activa cuesta <b style="color:#7dd3fc;">-50% MP</b> por tu último Corte Crítico.</div>`
            : '';

        let gridHtml = `<div class="sl-cmd-portrait-grid">`;

        Object.keys(COMMANDERS_META).forEach(key => {
            let meta = COMMANDERS_META[key];
            let st = p.shadowArmy[key];
            let isEquipped = p.equippedShadows.includes(key);
            let isSelected = (selectedCommanderInspectId === key);
            let isCooldown = (key === 'tank' && st.cooldownUntil && now < st.cooldownUntil);
            let shortName = meta.name.replace('Comandante ', '').split(' ')[0].toUpperCase();
            let effCost = getEffectiveActiveCost(key);
            let dynTxt = getCommanderDynamicText(key);
            let upCost = (key === 'igris') ? 1 : 2;
            let activeTab = selectedCommanderBackTab[key] || 'passive';

            let topBadge = '';
            if (!st.unlocked) {
                topBadge = `<span class="sl-cmd-mini-badge locked">${getHoloLockSVG(11, "#94a3b8")}</span>`;
            } else if (isEquipped) {
                topBadge = `<span class="sl-cmd-mini-badge active">EN CAMPO</span>`;
            } else if (isCooldown) {
                topBadge = `<span class="sl-cmd-mini-badge locked">24H</span>`;
            }

            let skillContentHtml = (activeTab === 'active')
                ? `<div style="color:#e0f2fe; font-weight:700; font-size:0.74em; margin-bottom:3px;">${meta.activeName.toUpperCase()} (-${effCost}MP)</div><div>${dynTxt.active}</div>`
                : `<div style="color:#7dd3fc; font-weight:700; font-size:0.72em; margin-bottom:3px;">DRENAJE: -${meta.mpDrain} MP/MIN</div><div>${dynTxt.passive}</div>`;

            let dockHtml = '';
            if (!st.unlocked) {
                dockHtml = `
                <div class="sl-cmd-action-dock" style="grid-template-columns: 1fr;" onclick="event.stopPropagation()">
                    <div class="sl-dock-chip primary-chip" onclick="unlockCommanderWithCrystals('${key}')">${getHoloLockSVG(10, "#ffffff")} EXTRAER (4 CM)</div>
                </div>`;
            } else {
                dockHtml = `
                <div class="sl-cmd-action-dock" onclick="event.stopPropagation()">
                    <div class="sl-dock-chip ${isEquipped ? '' : 'primary-chip'}" onclick="${isCooldown ? '' : `toggleEquipCommander('${key}')`}">${isCooldown ? 'REPOSO' : (isEquipped ? 'GUARDAR' : '¡SURGE!')}</div>
                    <div class="sl-dock-chip" onclick="upgradeCommander('${key}')">+NV (${upCost}CM)</div>
                </div>`;
            }

            let cardStateClass = `${isEquipped ? 'equipped-card' : ''} ${isSelected ? 'is-flipped' : ''} ${!st.unlocked ? 'locked-card' : ''}`.trim();

            gridHtml += `
            <div class="sl-cmd-portrait-card ${cardStateClass}" onclick="toggleCommanderCardInspect('${key}')">
                <div class="sl-cmd-flip-inner">
                    <div class="sl-cmd-face-front">
                        ${topBadge}
                        <div class="sl-cmd-portrait-figure static-shadow-pose">
                            ${getCommanderSVG(key, 'idle')}
                        </div>
                        <div class="sl-cmd-portrait-name">${shortName} <span style="color:#7dd3fc; font-size:0.85em;">NV.${st.level || 1}</span></div>
                    </div>
                    <div class="sl-cmd-face-back">
                        <div class="sl-cmd-back-head">
                            <span style="font-size:0.76em; font-weight:700; color:#f8fafc;">${shortName} NV.${st.level || 1}</span>
                            <div class="sl-cmd-back-tabs" onclick="event.stopPropagation()">
                                <span class="sl-cmd-back-tab ${activeTab === 'passive' ? 'active' : ''}" onclick="switchCmdBackTab(event, '${key}', 'passive')">PASIVA</span>
                                <span class="sl-cmd-back-tab ${activeTab === 'active' ? 'active' : ''}" onclick="switchCmdBackTab(event, '${key}', 'active')">ACTIVA</span>
                            </div>
                        </div>
                        <div class="sl-cmd-back-scroll">
                            ${skillContentHtml}
                            ${!st.unlocked ? `<div style="margin-top:4px; color:#93c5fd; font-size:0.9em;">Req: ${meta.reqText}</div>` : ''}
                        </div>
                        ${dockHtml}
                    </div>
                </div>
            </div>`;
        });

        // 6.ª TARJETA: MIN BYUNG-GYU (Aparece con ? a 2 niveles de Isla de Jeju [Niv. 80+], con su figura al despejar Jeju, y con contornos apagados tras liberarlo)
        let minObj = (p.shadowArmy && p.shadowArmy.min) ? p.shadowArmy.min : { unlocked: false, usedForever: false };
        let showMinCard = (p.level >= 80) || p.jejuCleared || minObj.unlocked || minObj.usedForever;

        if (showMinCard) {
            let isMinSelected = (selectedCommanderInspectId === 'min');
            if (minObj.usedForever) {
                // Estado 3: Alma liberada (contornos apagados, sin botones, historia al voltear)
                gridHtml += `
                <div class="sl-cmd-portrait-card liberated-soul-card ${isMinSelected ? 'is-flipped' : ''}" onclick="toggleCommanderCardInspect('min')">
                    <div class="sl-cmd-flip-inner">
                        <div class="sl-cmd-face-front">
                            <span class="sl-cmd-mini-badge locked">LIBERADO</span>
                            <div class="sl-cmd-portrait-figure static-shadow-pose">
                                ${getCommanderSVG('min', 'idle')}
                            </div>
                            <div class="sl-cmd-portrait-name">MIN BYUNG-GYU</div>
                        </div>
                        <div class="sl-cmd-face-back">
                            <div class="sl-cmd-back-head">
                                <span style="font-size:0.74em; font-weight:700; color:#94a3b8;">MIN BYUNG-GYU</span>
                                <span style="font-family:'Share Tech Mono', monospace; font-size:0.58em; color:#64748b;">EN PAZ</span>
                            </div>
                            <div class="sl-cmd-back-scroll" style="color:#94a3b8; font-size:0.71em; line-height:1.38;">
                                Cazador Sanador de Rango S que murió en la Isla de Jeju. Su alma fue tan noble que aceptó surgir una última vez para poder curar. No puedes usar su habilidad ya que su alma fue liberada.
                            </div>
                        </div>
                    </div>
                </div>`;
            } else if (p.jejuCleared || minObj.unlocked) {
                // Estado 2: Isla de Jeju despejada (Trofeo Rango S o 1 Único Uso para el logro oculto)
                gridHtml += `
                <div class="sl-cmd-portrait-card equipped-card ${isMinSelected ? 'is-flipped' : ''}" onclick="toggleCommanderCardInspect('min')">
                    <div class="sl-cmd-flip-inner">
                        <div class="sl-cmd-face-front">
                            <span class="sl-cmd-mini-badge active">1 ÚNICO USO</span>
                            <div class="sl-cmd-portrait-figure static-shadow-pose">
                                ${getCommanderSVG('min', 'idle')}
                            </div>
                            <div class="sl-cmd-portrait-name">MIN BYUNG-GYU <span style="color:#7dd3fc; font-size:0.82em;">R-S</span></div>
                        </div>
                        <div class="sl-cmd-face-back">
                            <div class="sl-cmd-back-head">
                                <span style="font-size:0.74em; font-weight:700; color:#f8fafc;">LUZ DE RESURRECCIÓN</span>
                                <span style="font-family:'Share Tech Mono', monospace; font-size:0.6em; color:#7dd3fc;">1 USO</span>
                            </div>
                            <div class="sl-cmd-back-scroll" style="font-size:0.7em;">
                                <div style="margin-bottom:3px;"><b style="color:#e0f2fe;">MILAGRO ÚNICO:</b> 100% HP/SP/MP, Escudo al máximo (<b style="color:#7dd3fc;">+800/800</b>), anula cualquier Penalización y otorga <b style="color:#7dd3fc;">+0.50 STR/INT, +1 Nv. Longevidad y Logro Oculto</b> antes de liberar su alma.</div>
                            </div>
                            <div class="sl-cmd-action-dock" style="grid-template-columns: 1fr;" onclick="event.stopPropagation()">
                                <div class="sl-dock-chip primary-chip" onclick="triggerMinByungGyuMiracle(false)">INVOCAR Y LIBERAR ALMA</div>
                            </div>
                        </div>
                    </div>
                </div>`;
            } else {
                // Estado 1: A 1-2 niveles de desbloquear Isla de Jeju (Signo de interrogación grande)
                gridHtml += `
                <div class="sl-cmd-portrait-card locked-card ${isMinSelected ? 'is-flipped' : ''}" onclick="toggleCommanderCardInspect('min')">
                    <div class="sl-cmd-flip-inner">
                        <div class="sl-cmd-face-front">
                            <span class="sl-cmd-mini-badge locked">ISLA JEJU</span>
                            <div class="sl-cmd-portrait-figure static-shadow-pose">
                                ${getCommanderSVG('min_unknown', 'idle')}
                            </div>
                            <div class="sl-cmd-portrait-name">??? <span style="color:#64748b; font-size:0.82em;">RANGO S</span></div>
                        </div>
                        <div class="sl-cmd-face-back">
                            <div class="sl-cmd-back-head">
                                <span style="font-size:0.74em; font-weight:700; color:#cbd5e1;">ALMA DESCONOCIDA</span>
                                <span style="font-family:'Share Tech Mono', monospace; font-size:0.6em; color:#7dd3fc;">NIV. 82</span>
                            </div>
                            <div class="sl-cmd-back-scroll" style="color:#94a3b8; font-size:0.72em;">
                                Una cálida fluctuación de maná de Rango S resuena desde el sur. Despeja la incursión <b style="color:#e0f2fe;">Isla de Jeju (Niv. 82)</b> en el Sonar para revelar esta sombra.
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }

        gridHtml += `</div>`;

        cmdCont.innerHTML = discountBanner + gridHtml;
        applyShadowOffsetsToDOM(cmdCont);
    }
// 5. LEGIÓN DE INFANTERÍA COMPACTA + EXPEDICIONES A PORTALES DESPEJADOS
    let infCont = document.getElementById('infantry-list-container');
    if (infCont) {
        if (!p.infantryDisabled) p.infantryDisabled = {};
        let totalUnits = Object.values(p.infantry || {}).reduce((a, b) => a + b, 0);

        let expHtml = '';
        let nowMs = Date.now();
        if (p.activeExpedition && p.activeExpedition.endsAt) {
            let remMs = p.activeExpedition.endsAt - nowMs;
            let sentTotal = p.activeExpedition.sentTotal || totalUnits;
            let pTitle = p.activeExpedition.portalTitle || 'Portal Conquistado';
            let pRank = p.activeExpedition.portalRank || 'E';

            if (remMs <= 0) {
                expHtml = `
                <div class="card" style="flex-direction:column; align-items:stretch; margin-bottom:14px; border-color:#00e5ff !important;">
                    <div class="card-title" style="color:#f8fafc;">EXPEDICIÓN COMPLETADA [RANGO ${pRank}]</div>
                    <div class="card-desc" style="color:#bae6fd;">Tus <b>${sentTotal} sombras</b> han regresado de <b>[${pTitle}]</b> con el 100% del botín recolectado.</div>
                    <button class="btn btn-main" style="width:100%;" onclick="claimInfantryExpedition(false)">RECLAMAR 100% DEL BOTÍN</button>
                </div>`;
            } else {
                let minsLeft = Math.ceil(remMs / 60000);
                let hrs = Math.floor(minsLeft / 60);
                let mns = minsLeft % 60;
                let totalDurMs = (p.activeExpedition.hours || 2) * 3600000;
                let progressPct = Math.min(99, Math.max(1, Math.floor(((totalDurMs - remMs) / totalDurMs) * 100)));

                expHtml = `
                <div class="card" style="flex-direction:column; align-items:stretch; margin-bottom:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <span style="font-weight:700; color:#e0f2fe; font-size:0.95em;">FARMEANDO: ${pTitle}</span>
                        <span class="card-tag ${pRank}">RANGO ${pRank}</span>
                    </div>
                    <div class="card-desc" style="color:#94a3b8; margin-bottom:8px;">
                        <b>${sentTotal} sombras</b> en el portal (Sus pasivas están en pausa). Restante: <b style="color:#f8fafc;">${hrs}h ${mns}m</b> (${progressPct}%).
                    </div>
                    <div class="bar-wrap" style="height:5px; margin-bottom:10px;">
                        <div class="bar-fill xp-bar" style="width:${progressPct}%;"></div>
                    </div>
                    <button class="btn btn-red" style="width:100%; padding:9px;" onclick="recallInfantryExpeditionEarly()">
                        EXTRAER SOMBRAS AHORA (-20% BOTÍN EXTRAÍDO)
                    </button>
                </div>`;
            }
        } else {
            let clearedCount = Array.isArray(p.clearedDungeons) ? p.clearedDungeons.length : 0;
            expHtml = `
            <div class="card" style="flex-direction:column; align-items:stretch; margin-bottom:14px;">
                <div class="card-title" style="color:#f8fafc;">EXPEDICIONES DE RECOLECCIÓN (${totalUnits} UNIDADES)</div>
                <div class="card-desc" style="color:#94a3b8;">Envía tus sombras de soporte a farmear portales ya despejados (<b>${clearedCount} disponibles</b>). Mientras farmean en un portal, no otorgan sus pasivas en base.</div>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; width:100%;">
                    <button class="btn btn-blue" style="padding:8px 4px; font-size:0.74em;" onclick="startInfantryExpedition(2)">2 HORAS</button>
                    <button class="btn btn-blue" style="padding:8px 4px; font-size:0.74em;" onclick="startInfantryExpedition(4)">4 HORAS</button>
                    <button class="btn btn-main" style="padding:8px 4px; font-size:0.74em;" onclick="startInfantryExpedition(8)">8 HORAS</button>
                </div>
            </div>`;
        }

        let rowsHtml = '';
        Object.keys(INFANTRY_META).forEach(k => {
            let inf = INFANTRY_META[k];
            let count = p.infantry[k] || 0;
            let sentCount = (p.activeExpedition && p.activeExpedition.sentUnits && p.activeExpedition.sentUnits[k]) ? p.activeExpedition.sentUnits[k] : 0;
            let availCount = Math.max(0, count - sentCount);
            let isOff = !!p.infantryDisabled[k];
            let isExpanded = (selectedInfantryInspectId === k);
            let gCostStr = (inf.goldCost || 200).toLocaleString('en-US');
            let statusBadge = sentCount > 0
                ? `${availCount}/${count} (${sentCount} EN PORTAL)`
                : `${count}/${inf.max}${isOff ? ' PAUSA' : ''}`;

            rowsHtml += `
            <div class="card" style="flex-direction:column; align-items:stretch; margin-bottom:8px; padding:11px 14px !important; opacity:${(isOff || (count > 0 && availCount === 0)) ? '0.6' : '1'}; cursor:pointer;" onclick="toggleInfantryCardInspect('${k}')">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                    <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:0; flex-wrap:wrap;">
                        <span style="font-weight:700; color:#f8fafc; font-size:0.95em;">${inf.name}</span>
                        <span style="font-family:'Share Tech Mono', monospace; font-size:0.7em; color:${sentCount > 0 ? '#7dd3fc' : '#a5b4fc'}; border:1px solid rgba(165,180,252,0.35); padding:1px 6px; background:rgba(30,41,59,0.6);">${statusBadge}</span>
                    </div>
                    <div style="display:flex; gap:6px; align-items:center; flex-shrink:0;" onclick="event.stopPropagation()">
                        ${count > 0 ? `<button class="btn btn-blue" style="padding:5px 8px; font-size:0.65em;" onclick="toggleInfantryUnit('${k}')">${isOff ? 'ACTIVAR' : 'PAUSAR'}</button>` : ''}
                        <button class="btn btn-main" style="padding:6px 10px; font-size:0.72em;" onclick="recruitInfantry('${k}', true)">+1 (${gCostStr}G)</button>
                    </div>
                </div>
                ${isExpanded ? `<div style="margin-top:8px; padding-top:8px; border-top:1px solid rgba(148,163,184,0.2); font-size:0.8em; color:#94a3b8; line-height:1.45;">${inf.desc}</div>` : ''}
            </div>`;
        });

        let bottomSmallCalibrator = `
            <div style="display:flex; justify-content:flex-end; margin-top:6px;">
                <button class="btn btn-blue" style="padding:3px 8px !important; font-size:0.58em !important; opacity:0.65;" onclick="openShadowXYCalibrator()">✢ X/Y</button>
            </div>`;

        infCont.innerHTML = expHtml + rowsHtml + bottomSmallCalibrator;
    }
}

const EXPEDITION_RANK_MULTS = { 'E': 1.0, 'D': 1.5, 'C': 2.2, 'B': 3.2, 'A': 4.8, 'S': 7.5, 'SSS': 12.0 };
let _pendingExpHours = 2;

function startInfantryExpedition(hours) {
    ensureShadowStructure();
    let totalUnits = Object.values(p.infantry || {}).reduce((a, b) => a + b, 0);
    if (totalUnits <= 0) {
        return systemNotify("Necesitas reclutar al menos 1 unidad de infantería para enviar una expedición.", "danger");
    }
    if (!Array.isArray(p.clearedDungeons) || p.clearedDungeons.length === 0) {
        return systemNotify("🔒 Aún no has despejado ningún portal. Conquista al menos 1 mazmorra en el Sonar para poder enviar sombras a recolectar botín.", "danger");
    }

    _pendingExpHours = hours;
    let clearedObjs = p.clearedDungeons
        .map(id => (typeof dungeonDB !== 'undefined') ? dungeonDB.find(d => d.id === id) : null)
        .filter(Boolean);

    if (clearedObjs.length === 0) {
        return systemNotify("🔒 No se encontraron portales despejados válidos.", "danger");
    }

    let portalOptionsHtml = clearedObjs.map(d => {
        let rMult = EXPEDITION_RANK_MULTS[d.rank] || 1.0;
        return `<option value="${d.id}">[Rango ${d.rank} • Botín x${rMult}] ${d.title}</option>`;
    }).join('');

    let unitSelectorsHtml = Object.keys(INFANTRY_META).map(k => {
        let meta = INFANTRY_META[k];
        let owned = p.infantry[k] || 0;
        if (owned <= 0) return '';
        return `
        <div style="background:rgba(4,12,28,0.9); border:1px solid rgba(125,211,252,0.35); padding:8px 10px; margin-bottom:6px; text-align:left;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span style="font-weight:700; color:#ffffff; font-size:0.86em;">${meta.name}</span>
                <span style="font-family:'Share Tech Mono', monospace; font-size:0.74em; color:#7dd3fc;">En base: ${owned}</span>
            </div>
            <div style="display:flex; gap:4px; align-items:center;">
                <button class="btn btn-blue" style="padding:4px 7px !important; font-size:0.62em !important;" onclick="setExpUnitInput('${k}', 0, ${owned})">NINGUNA</button>
                <button class="btn btn-blue" style="padding:4px 8px !important; font-size:0.72em !important;" onclick="stepExpUnitInput('${k}', -1, ${owned})">-</button>
                <input type="number" id="exp-unit-inp-${k}" class="input-dark" value="${owned}" min="0" max="${owned}" style="margin:0; padding:4px; text-align:center; font-family:'Share Tech Mono', monospace; font-size:0.9em; width:56px; flex:1;" oninput="updateExpeditionPreview()">
                <button class="btn btn-blue" style="padding:4px 8px !important; font-size:0.72em !important;" onclick="stepExpUnitInput('${k}', 1, ${owned})">+</button>
                <button class="btn btn-main" style="padding:4px 7px !important; font-size:0.62em !important;" onclick="setExpUnitInput('${k}', ${owned}, ${owned})">TODAS</button>
            </div>
        </div>`;
    }).join('');

    let modalHtml = `
        <div style="text-align:left; margin-bottom:10px;">
            <div style="font-family:'Share Tech Mono', monospace; font-size:0.72em; color:#bae6fd; margin-bottom:4px;">1. SELECCIONA PORTAL CONQUISTADO (${hours} HORAS):</div>
            <select id="exp-portal-select" class="input-dark" style="margin:0; padding:9px; font-size:0.86em; border-color:#38bdf8;" onchange="updateExpeditionPreview()">
                ${portalOptionsHtml}
            </select>
        </div>
        <div style="text-align:left; margin-bottom:6px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span style="font-family:'Share Tech Mono', monospace; font-size:0.72em; color:#bae6fd;">2. SOMBRAS A DESPLEGAR:</span>
                <div style="display:flex; gap:4px;">
                    <button class="btn btn-blue" style="padding:2px 6px !important; font-size:0.58em !important;" onclick="setAllExpUnits(false)">VACIAR</button>
                    <button class="btn btn-main" style="padding:2px 6px !important; font-size:0.58em !important;" onclick="setAllExpUnits(true)">ENVIAR TODAS</button>
                </div>
            </div>
            <div style="max-height:190px; overflow-y:auto; padding-right:2px;">
                ${unitSelectorsHtml}
            </div>
        </div>
        <div id="exp-loot-preview" style="background:rgba(2,8,20,0.95); border:1px solid #00e5ff; padding:8px 10px; font-family:'Share Tech Mono', monospace; font-size:0.78em; color:#e0f2fe; margin-bottom:12px; line-height:1.4;"></div>
        <div style="display:flex; gap:8px;">
            <button class="btn btn-red" style="flex:1;" onclick="closeArtifactRitualModal()">CANCELAR</button>
            <button class="btn btn-main" style="flex:1.5;" onclick="confirmStartTacticalExpedition()">INICIAR EXTRACCIÓN</button>
        </div>
    `;

    if (typeof createArtifactRitualShell === "function") {
        createArtifactRitualShell("DESPLIEGUE DE LEGIÓN", `[ EXPEDICIÓN DE ${hours} HORAS A PORTAL ]`, modalHtml);
        updateExpeditionPreview();
    }
}

window.setExpUnitInput = function(key, val, maxOwned) {
    let inp = document.getElementById(`exp-unit-inp-${key}`);
    if (inp) {
        inp.value = Math.max(0, Math.min(maxOwned, val));
        updateExpeditionPreview();
    }
};

window.stepExpUnitInput = function(key, delta, maxOwned) {
    let inp = document.getElementById(`exp-unit-inp-${key}`);
    if (inp) {
        let cur = parseInt(inp.value) || 0;
        inp.value = Math.max(0, Math.min(maxOwned, cur + delta));
        updateExpeditionPreview();
    }
};

window.setAllExpUnits = function(sendAll) {
    Object.keys(INFANTRY_META).forEach(k => {
        let owned = p.infantry[k] || 0;
        let inp = document.getElementById(`exp-unit-inp-${k}`);
        if (inp) inp.value = sendAll ? owned : 0;
    });
    updateExpeditionPreview();
};

function calculateExpeditionYield(sentUnits, hours, portalRank, ratio = 1.0, earlyPenalty = false) {
    let rMult = EXPEDITION_RANK_MULTS[portalRank] || 1.0;
    let sSoldiers = sentUnits.soldiers || 0;
    let sMages    = sentUnits.mages || 0;
    let sBears    = sentUnits.bears || 0;
    let sOrcs     = sentUnits.orcs || 0;
    let sAnts     = sentUnits.ants || 0;
    let totalSent = sSoldiers + sMages + sBears + sOrcs + sAnts;

    let rawGold = ((hours * 15) + ((sSoldiers * 4 + sBears * 6 + sOrcs * 10 + sAnts * 8 + sMages * 5) * hours)) * rMult * ratio;
    let rawMp   = (sMages * hours * 55) * (1 + (rMult - 1) * 0.35) * ratio;
    let rawDrops = Math.floor((1 + (totalSent / 12) + ((sBears + sAnts) / 8) + (hours / 4)) * (0.7 + rMult * 0.3) * ratio);

    if (earlyPenalty) {
        rawGold *= 0.80;
        rawMp   *= 0.80;
        rawDrops = Math.max(0, Math.floor(rawDrops * 0.80));
    }

    return {
        gold: Math.max(0, Math.floor(rawGold)),
        mp: Math.max(0, Math.floor(rawMp)),
        drops: Math.min(6, Math.max(0, rawDrops)),
        totalSent: totalSent
    };
}

window.updateExpeditionPreview = function() {
    let selEl = document.getElementById('exp-portal-select');
    let prevEl = document.getElementById('exp-loot-preview');
    if (!selEl || !prevEl) return;

    let dung = (typeof dungeonDB !== 'undefined') ? dungeonDB.find(d => d.id === selEl.value) : null;
    let pRank = dung ? dung.rank : 'E';

    let sent = {};
    Object.keys(INFANTRY_META).forEach(k => {
        let inp = document.getElementById(`exp-unit-inp-${k}`);
        let maxOwned = p.infantry[k] || 0;
        sent[k] = inp ? Math.max(0, Math.min(maxOwned, parseInt(inp.value) || 0)) : 0;
    });

    let est = calculateExpeditionYield(sent, _pendingExpHours, pRank, 1.0, false);
    if (est.totalSent <= 0) {
        prevEl.innerHTML = `<span style="color:#ff2a55;">Selecciona al menos 1 sombra de soporte para enviar al portal.</span>`;
    } else {
        prevEl.innerHTML = `ESTIMADO (${est.totalSent} SOMBRAS • RANGO ${pRank}):<br><span style="color:#39ff14;">+${est.gold} G</span> • <span style="color:#00e5ff;">+${est.mp} MP</span> • <span style="color:#c084fc;">~${Math.max(1, est.drops)} Botines</span>`;
    }
};

window.confirmStartTacticalExpedition = function() {
    let selEl = document.getElementById('exp-portal-select');
    let dung = (selEl && typeof dungeonDB !== 'undefined') ? dungeonDB.find(d => d.id === selEl.value) : null;
    if (!dung) return;

    let sent = {};
    let totalSent = 0;
    Object.keys(INFANTRY_META).forEach(k => {
        let inp = document.getElementById(`exp-unit-inp-${k}`);
        let maxOwned = p.infantry[k] || 0;
        let val = inp ? Math.max(0, Math.min(maxOwned, parseInt(inp.value) || 0)) : 0;
        sent[k] = val;
        totalSent += val;
    });

    if (totalSent <= 0) {
        return systemNotify("Debes asignar al menos 1 unidad de sombra para iniciar la expedición.", "danger");
    }

    p.activeExpedition = {
        hours: _pendingExpHours,
        portalId: dung.id,
        portalTitle: dung.title,
        portalRank: dung.rank,
        sentUnits: sent,
        sentTotal: totalSent,
        startedAt: Date.now(),
        endsAt: Date.now() + (_pendingExpHours * 3600000),
        notified: false
    };

    if (typeof closeArtifactRitualModal === "function") closeArtifactRitualModal();

    if (sent.bears > 0 && typeof calculateHunterMaxHP === "function") {
        let newMax = calculateHunterMaxHP();
        if (!p.magmaOverheal && p.hp > newMax) p.hp = newMax;
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    renderShadowSanctuary();
    systemNotify(`🗺️ ${totalSent} sombras enviadas a [${dung.title}] (Rango ${dung.rank}) por ${_pendingExpHours}h. Sus pasivas en base quedan en pausa hasta su regreso.`, "purple");
};

function evaluateInfantryExpeditions() {
    if (!p || !p.activeExpedition || p.activeExpedition.notified) return;
    if (Date.now() >= p.activeExpedition.endsAt) {
        if (p.stats && p.stats.int >= 2.0) {
            claimInfantryExpedition(false);
            systemNotify("[TOQUE DEL GOBERNANTE]: Tu Inteligencia recolectó automáticamente el botín de la Expedición de Infantería.", "gold");
            return;
        }
        p.activeExpedition.notified = true;
        saveData();
        if (typeof sendNativeSystemNotification === "function") {
            sendNativeSystemNotification("Expedición de Sombra Completada", "Tu legión de infantería ha regresado del portal con Oro, Minerales y Maná.");
        }
        systemNotify("¡Tu Legión de Infantería ha terminado de farmear el portal! Reclama el botín en el Santuario.", "gold");
    }
}

window.recallInfantryExpeditionEarly = function() {
    if (!p || !p.activeExpedition) return;
    claimInfantryExpedition(true);
};

function claimInfantryExpedition(isEarlyRecall = false) {
    if (!p || !p.activeExpedition) return;
    let exp = p.activeExpedition;
    let now = Date.now();
    let hrs = exp.hours || 2;
    let totalDurMs = hrs * 3600000;
    let elapsedMs = Math.max(0, now - (exp.startedAt || ( exp.endsAt - totalDurMs )));
    let completionRatio = isEarlyRecall ? Math.min(1, Math.max(0.05, elapsedMs / totalDurMs)) : 1.0;

    let sentUnits = exp.sentUnits || p.infantry || {};
    let pRank = exp.portalRank || 'E';
    let pTitle = exp.portalTitle || 'Portal Conquistado';

    let result = calculateExpeditionYield(sentUnits, hrs, pRank, completionRatio, isEarlyRecall);

    p.gold += result.gold;
    if (result.mp > 0) {
        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        p.mp = Math.min(maxMP, (p.mp || 0) + result.mp);
    }

    if (!isEarlyRecall && hrs >= 8 && p.dungeonKeys) {
        let keyProp = 'rank' + (pRank === 'SSS' ? 'S' : pRank);
        p.dungeonKeys[keyProp] = (p.dungeonKeys[keyProp] || 0) + 1;
    }

    p.activeExpedition = null;

    let highRankDrop = ['A', 'S', 'SSS'].includes(pRank);
    if (typeof rollLootDrop === "function") {
        for (let i = 0; i < result.drops; i++) {
            rollLootDrop(highRankDrop);
        }
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    renderShadowSanctuary();

    if (isEarlyRecall) {
        let pctDone = Math.round(completionRatio * 100);
        systemNotify(`⚡ EXTRACCIÓN DE EMERGENCIA (${pctDone}% del tiempo, -20% penalización por prisa): Tus sombras regresaron de [${pTitle}] con +${result.gold} G${result.mp > 0 ? ', +' + result.mp + ' MP' : ''} y tus pasivas en base han sido restauradas.`, "stamina");
    } else {
        systemNotify(`🎁 Expedición en [${pTitle}] (Rango ${pRank}) completada: +${result.gold} G${result.mp > 0 ? ', +' + result.mp + ' MP' : ''}${hrs >= 8 ? ', +1 Llave de Portal' : ''} y tus sombras han restaurado sus pasivas.`, "gold");
    }
}

function toggleInfantryUnit(typeKey) {
    if (!p.infantryDisabled) p.infantryDisabled = {};
    p.infantryDisabled[typeKey] = !p.infantryDisabled[typeKey];

    if (typeKey === 'bears' && typeof calculateHunterMaxHP === "function") {
        let newMaxHP = calculateHunterMaxHP();
        if (!p.magmaOverheal && p.hp > newMaxHP) {
            p.hp = newMaxHP;
        }
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    renderShadowSanctuary();
}

function recruitInfantry(typeKey, useGold = true) {
    ensureShadowStructure();
    let meta = INFANTRY_META[typeKey];
    if (!meta) return;
    if ((p.infantry[typeKey] || 0) >= meta.max) {
        systemNotify(`Tu batallón de ${meta.name} ya está en su capacidad máxima (${meta.max}).`, "info");
        return;
    }
    let gCost = meta.goldCost || 200;
    if (p.gold < gCost) {
        systemNotify(`Necesitas ${gCost} G para contratar esta unidad.`, "danger");
        return;
    }
    p.gold -= gCost;
    p.infantry[typeKey] = (p.infantry[typeKey] || 0) + 1;
    if (typeof _evalArcInfantryFull === "function") _evalArcInfantryFull();
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    systemNotify(`${meta.icon} +1 ${meta.name} incorporado a tu legión.`, "purple");
}

function toggleEquipCommander(cmdId) {
    ensureShadowStructure();
    let st = p.shadowArmy[cmdId];
    if (!st || !st.unlocked) {
        systemNotify("🔒 Aún no has desbloqueado a este Comandante de Sombra.", "danger");
        return;
    }

    if (cmdId === 'tank' && st.cooldownUntil && Date.now() < st.cooldownUntil) {
        let hrs = Math.ceil((st.cooldownUntil - Date.now()) / 3600000);
        systemNotify(`🧊 Tank está agotado tras protegerte 2 noches. Hibernación restante: ${hrs}h.`, "danger");
        return;
    }

    let idx = p.equippedShadows.indexOf(cmdId);
    if (idx !== -1) {
        p.equippedShadows.splice(idx, 1);
        st.active = false;
        systemNotify(`🌑 [${COMMANDERS_META[cmdId].name}] ha regresado a tu sombra. Ya no consume Maná.`, "info");
    } else {
        let maxSlots = getMaxShadowSlots();
        if (p.equippedShadows.length >= maxSlots) {
            systemNotify(`Límite de ranuras alcanzado (${maxSlots}/${maxSlots}). Guarda una sombra primero.`, "danger");
            return;
        }
        if ((p.mp || 0) < 30) {
            systemNotify("💧 Necesitas al menos 30 MP en tu núcleo para sostener la invocación de un Comandante.", "danger");
            return;
        }
        p.equippedShadows.push(cmdId);
        st.active = true;
        currentShowcaseCmd = cmdId;
        systemNotify(`🗣️ ¡SURGE! [${COMMANDERS_META[cmdId].name}] se ha desplegado (-${COMMANDERS_META[cmdId].mpDrain} MP/min).`, "purple");
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderMiniArenaUnits === "function") renderMiniArenaUnits();
}

function playAriseExtractionAnim(cmdId, isSuccess, chancePct, onDone) {
    let meta = COMMANDERS_META[cmdId];
    if (!meta) {
        if (typeof onDone === "function") onDone();
        return;
    }
    let ov = document.createElement('div');
    ov.style.cssText = 'position:fixed; inset:0; background:radial-gradient(circle, rgba(16,6,36,0.96) 0%, #02040a 92%); z-index:13200; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:24px; text-align:center;';
    ov.innerHTML = `
        <div style="width:190px; height:190px; filter:drop-shadow(0 0 24px ${isSuccess ? '#a855f7' : '#ff2a55'}); animation:ultZoomIn 0.45s ease-out;">
            ${getCommanderSVG(cmdId)}
        </div>
        <div style="font-family:'Share Tech Mono', monospace; color:#c084fc; letter-spacing:3px; font-size:0.9em; margin-top:14px;">EXTRACCIÓN DE SOMBRA (${chancePct}% PROB.)</div>
        <h2 style="color:#ffffff; font-size:1.8em; text-shadow:0 0 18px ${isSuccess ? '#00e5ff' : '#ff2a55'}; margin:6px 0;">¡SURGE! // ${meta.name.toUpperCase()}</h2>
    `;
    document.body.appendChild(ov);
    if (typeof playSystemSound === "function") playSystemSound(isSuccess ? 'monarch_awakening' : 'danger');
    setTimeout(() => {
        ov.remove();
        if (typeof onDone === "function") onDone();
    }, 1500);
}

function unlockCommanderWithCrystals(cmdId) {
    ensureShadowStructure();
    let st = p.shadowArmy[cmdId];
    let meta = COMMANDERS_META[cmdId];
    if (!st || !meta) return;
    if (st.unlocked) {
        systemNotify(`${meta.name} ya forma parte de tu ejército.`, "info");
        return;
    }
    let now = Date.now();
    if (st.ariseCooldownUntil && now < st.ariseCooldownUntil) {
        let minsLeft = Math.ceil((st.ariseCooldownUntil - now) / 60000);
        systemNotify(`⏳ El alma de ${meta.name} sigue oculta en el vacío. Espera ${minsLeft} min.`, "danger");
        return;
    }
    if ((p.crystals || 0) < 4) {
        systemNotify("Necesitas 4 Cristales de Maná (CM) para forzar la extracción real.", "danger");
        return;
    }
    p.crystals -= 4;

    let baseChance = 55 + Math.floor(((p.stats ? p.stats.int : 1) - 1) * 12);
    if (p.extractionBuffUntil && now < p.extractionBuffUntil) baseChance += 30;
    let chancePct = Math.min(95, baseChance);
    let isSuccess = (Math.random() * 100) <= chancePct;

    playAriseExtractionAnim(cmdId, isSuccess, chancePct, () => {
        if (isSuccess) {
            if (cmdId === 'igris') p.igrisExtractedCanon = true;
            st.unlocked = true;
            st.ariseCooldownUntil = null;
            saveData();
            openShadowBestowNameModal(cmdId);
        } else {
            st.ariseCooldownUntil = now + (3 * 3600000);
            if (typeof _evalArcAriseFail === "function") _evalArcAriseFail();
            systemNotify(`💀 Extracción Fallida (${chancePct}% prob.). El alma de [${meta.name}] resistió el llamado y se ocultó por 3 Horas.`, "danger");
            saveData();
            if (typeof updateHUD === "function") updateHUD();
        }
    });
}

function openShadowBestowNameModal(cmdId) {
    let meta = COMMANDERS_META[cmdId];
    if (!meta) return;
    let st = p.shadowArmy[cmdId] || { level: 1 };
    let defaultName = meta.name.replace('Comandante ', '').split(' ')[0];

    let ov = document.createElement('div');
    ov.id = 'sl-bestow-name-overlay';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,16,0.92); backdrop-filter:blur(10px); z-index:13500; display:flex; justify-content:center; align-items:center; padding:20px;';
    ov.innerHTML = `
        <div class="sl-holo-frame" style="width:100%; max-width:400px;">
            <div class="sl-holo-rail top">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="text-align:center; padding:22px 16px;">
                    <div class="sl-holo-header-row" style="margin-bottom:14px;">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect">NOTIFICACIÓN</div>
                    </div>
                    <div id="bestow-step-1">
                        <div style="color:#e0f2fe; font-size:0.95em; margin-bottom:6px;">[Habilidad: <b style="color:#00e5ff;">Extracción de Sombra</b> realizada con éxito.]</div>
                        <div style="color:#bae6fd; font-size:0.88em; margin-bottom:10px;">Nv.${st.level || 1} • ${meta.title}<br>Puedes asignarle un nombre.</div>
                        <input type="text" id="bestow-name-input" class="sl-name-bestow-input" value="${defaultName}" maxlength="18" autocomplete="off">
                        <button class="btn btn-main" style="width:78%; padding:10px;" onclick="confirmShadowBestowName('${cmdId}')">CONFIRMAR NOMBRE</button>
                    </div>
                    <div id="bestow-step-2" style="display:none; padding:12px 0;">
                        <div style="font-family:'Exo 2', sans-serif; font-size:1.25em; font-weight:700; color:#ffffff; text-shadow:0 0 12px #00e5ff; margin-bottom:6px;" id="bestow-final-tag">[${defaultName} Nv.${st.level || 1}]</div>
                        <div style="color:#bae6fd; font-size:0.92em;">${meta.title}</div>
                    </div>
                </div>
            </div>
            <div class="sl-holo-rail bottom">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
        </div>
    `;
    document.body.appendChild(ov);
    let inp = document.getElementById('bestow-name-input');
    if (inp) setTimeout(() => inp.focus(), 120);
}

window.confirmShadowBestowName = function(cmdId) {
    let inp = document.getElementById('bestow-name-input');
    let chosen = (inp && inp.value.trim()) ? inp.value.trim() : COMMANDERS_META[cmdId].name;
    let st = p.shadowArmy[cmdId];
    if (st) st.customName = chosen;
    COMMANDERS_META[cmdId].name = chosen;

    let s1 = document.getElementById('bestow-step-1');
    let s2 = document.getElementById('bestow-step-2');
    let tag = document.getElementById('bestow-final-tag');
    if (tag) tag.innerText = `[${chosen} Nv.${st ? (st.level || 1) : 1}]`;
    if (s1) s1.style.display = 'none';
    if (s2) s2.style.display = 'block';

    if (typeof playSystemSound === "function") playSystemSound('monarch_awakening');
    if (navigator.vibrate) navigator.vibrate([40, 60, 140]);
    saveData();
    if (typeof updateHUD === "function") updateHUD();

    setTimeout(() => {
        let ov = document.getElementById('sl-bestow-name-overlay');
        if (ov) ov.remove();
        systemNotify(`🗣️ «Ese es tu nombre»: [${chosen}] se ha unido a tu Panteón de Sombras.`, "purple");
    }, 1700);
};

function upgradeCommander(cmdId) {
    if (cmdId === 'igris') return feedIgris();
    if ((p.crystals || 0) < 2) {
        systemNotify("Requiere 2 Cristales de Maná (CM).", "danger");
        return;
    }
    p.crystals -= 2;
    p.shadowArmy[cmdId].level = (p.shadowArmy[cmdId].level || 1) + 1;
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    systemNotify(`⬆️ [${COMMANDERS_META[cmdId].name}] ascendió a Nivel ${p.shadowArmy[cmdId].level}. Sus habilidades han aumentado de poder.`, "purple");
}

function castCommanderActive(cmdId) {
    ensureShadowStructure();
    let meta = COMMANDERS_META[cmdId];
    let st = p.shadowArmy[cmdId];
    if (!meta || !st || !st.unlocked) return;

    if (!p.equippedShadows.includes(cmdId)) {
        systemNotify(`Debes desplegar a ${meta.name} en una ranura activa antes de usar su habilidad.`, "danger");
        return;
    }

    let cost = getEffectiveActiveCost(cmdId);
    let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    let lvl = st.level || 1;
    let bonus = lvl - 1;

    if ((p.mp || 0) < cost) {
        systemNotify(`💧 Maná insuficiente en el núcleo (${Math.floor(p.mp || 0)}/${cost} MP).`, "danger");
        return;
    }

    p.sovereignCritDiscount = false;

    consumeMPFast(cost, () => {
        playCommanderUltCinematic(cmdId, () => {
            if (cmdId === 'igris') {
                if (p.igrisGoldDay !== currentDayStr) {
                    p.igrisGoldDay = currentDayStr;
                    p.igrisGoldUses = 0;
                }
                let goldReward = getIgrisNextGoldReward();
                p.igrisGoldUses = (p.igrisGoldUses || 0) + 1;
                p.gold += goldReward;

                let xpGain = 45 + (bonus * 12);
                p.xp += xpGain;
                if (typeof animateSPChange === "function") animateSPChange(20);
                else p.sp = Math.min(100, p.sp + 20);

                let goldMsg = goldReward > 0
                    ? `+${goldReward} G del gremio (${p.igrisGoldUses}/3 hoy)`
                    : `0 G (Límite diario 3/3 alcanzado)`;
                systemNotify(`⚔️ ¡CONCENTRACIÓN DEL CABALLERO (Niv.${lvl})! +${xpGain} XP, -20 Fatiga y ${goldMsg} (Tiempos reales intactos).`, "purple");
            } else if (cmdId === 'tank') {
                let shieldAdd = 80 + (bonus * 15);
                let spAdd = Math.min(100, 30 + (bonus * 4));
                p.arcticShield = (p.arcticShield || 0) + shieldAdd;
                p.tankCurfewDelayDay = currentDayStr;
                if (typeof animateSPChange === "function") animateSPChange(spAdd);
                else p.sp = Math.min(100, p.sp + spAdd);
                systemNotify(`🐻‍❄️ ¡ESTAMPIDA DEL CERO ABSOLUTO (Niv.${lvl})! +${shieldAdd} 🛡️ Escudo Ártico, -${spAdd} Fatiga y desgaste nocturno retrasado +45m hoy.`, "info");
            } else if (cmdId === 'iron') {
                let immMins = 20 + (bonus * 4);
                let spAdd = Math.min(100, 35 + (bonus * 4));
                p.ironImmunityUntil = Date.now() + (immMins * 60000);
                if (typeof animateSPChange === "function") animateSPChange(spAdd);
                else p.sp = Math.min(100, p.sp + spAdd);
                systemNotify(`🛡️ ¡GRITO DE PROVOCACIÓN (Niv.${lvl})! -${spAdd} Fatiga, Inmunidad total por ${immMins} min y Fisura Rango A con TRIPLE botín.`, "gold");
                if (typeof checkFissureSpawn === "function") checkFissureSpawn(true);
            } else if (cmdId === 'tusk') {
let hasOrb = (typeof hasEquippedItem === 'function') && hasEquippedItem('eq_w_kargalgan');
                if (typeof activeDungeon !== 'undefined' && activeDungeon) {
                    systemNotify("🔥 ¡HIMNO DEL DRAGÓN DE FUEGO! Tusk incineró toda la fase de la mazmorra.", "gold");
                    if (typeof advancePhase === "function") advancePhase();
                } else {
                    let mList = typeof getTodayMissions === 'function' ? getTodayMissions() : [];
                    let subs = mList.filter(x => x.type === 'sub');
                    let clearedCount = 0;
                    subs.forEach(m => {
                        if (!p.completedToday.includes(m.id)) {
                            p.completedToday.push(m.id);
                            p.xp += hasOrb ? m.xp * 2 : m.xp;
                            p.gold += Math.floor(m.gold * GOLD_NERF);
                            p.totalMissions = (p.totalMissions || 0) + 1;
                            if (m.stat && p.stats && p.stats[m.stat] !== undefined) {
                                p.stats[m.stat] = +(p.stats[m.stat] + 0.05).toFixed(2);
                            }
                            clearedCount++;
                        }
                    });
                    if (clearedCount === 0) {
                        let fbXp = 150 + (bonus * 30);
                        let fbGold = 65 + (bonus * 15);
                        p.xp += fbXp;
                        p.gold += fbGold;
                        systemNotify(`🔥 ¡HIMNO DE KARGALGAN (Niv.${lvl})! Tusk condensó +${fbXp} XP y +${fbGold} G.`, "gold");
                    } else {
                        systemNotify(`🔥 ¡HIMNO DE KARGALGAN! ${clearedCount} misiones secundarias selladas sin tocar tus cronómetros de telemetría.`, "gold");
                    }
                    if (typeof renderRoutine === "function") renderRoutine();
                }
            } else if (cmdId === 'beru') {
                let gBoost = 40 + (bonus * 4);
                let hHeal = 60 + (bonus * 10);
                p.beruSpeedUntil = Date.now() + (60 * 60000);
                let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
                p.hp = Math.min(maxHP, p.hp + hHeal);
                p.sp = 100;
                if (Array.isArray(p.bosses)) {
                    p.bosses.forEach(b => {
                        if (b.start && !b.isQuickTask && b.phaseEndsAt) {
                            let stIdx = (b.pomoStep || 0) % 4;
                            if (stIdx === 1 || stIdx === 3) b.phaseEndsAt += (5 * 60000);
                        }
                    });
                    if (typeof renderBosses === "function") renderBosses();
                }
                systemNotify(`🐜 ¡MODO BERSERKER (Niv.${lvl})! +${hHeal} HP, FATIGA en 0, +${gBoost}% Oro por 1h y +5m en tu receso Pomodoro actual.`, "purple");
            }
            saveData();
            if (typeof updateHUD === "function") updateHUD();
        });
    });
}

/* ==========================================================================
   8. EL MILAGRO DE 1 SOLO USO DE MIN BYUNG-GYU Y TÍTULOS DE PERFIL
   ========================================================================== */
function triggerMinByungGyuMiracle(fromDungeon = false) {
    ensureShadowStructure();
    if (!p.shadowArmy.min.unlocked) {
        systemNotify("🔒 El alma de Min Byung-Gyu está sellada. Solo puedes desbloquearla despejando la Mazmorra Rango S: Isla de Jeju.", "danger");
        return;
    }
    if (p.shadowArmy.min.usedForever) {
        systemNotify("El alma de Min Byung-Gyu ya descansa en paz eterna.", "info");
        return;
    }

    if (!fromDungeon && !p.penaltyActive && p.hp > 50) {
        if (!confirm("⚠️ ADVERTENCIA DEL SISTEMA: Solo puedes invocar a Min Byung-Gyu UNA VEZ en toda tu partida. ¿Estás seguro de gastar su milagro ahora?")) {
            return;
        }
    }

    let rescueBox = document.getElementById('raid-min-rescue');
    if (rescueBox) rescueBox.style.display = 'none';

    let grimoireOverlay = document.getElementById('min-grimoire-overlay');
    if (grimoireOverlay) grimoireOverlay.style.display = 'flex';
    if (typeof playSystemSound === "function") playSystemSound('gold');
    if (navigator.vibrate) navigator.vibrate([100, 80, 250, 80, 400]);

    setTimeout(() => {
        if (grimoireOverlay) grimoireOverlay.style.display = 'none';

        p.shadowArmy.min.usedForever = true;
        p.penaltyActive = false;
        p.deathSource = null;
        p.abyssCurseUntil = null;
        p.sleepDebt = false;
        document.body.classList.remove('penalty-active');

        let dmgOverlay = document.getElementById('damage-overlay');
        if (dmgOverlay) dmgOverlay.style.display = 'none';

        p.stats.int = +(p.stats.int + 0.50).toFixed(2);
        p.stats.str = +(p.stats.str + 0.50).toFixed(2);

        let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
        let maxMP = Math.floor(1000 + ((p.stats.int - 1) * 1000));

// Milagro Remasterizado: 100% HP/SP/MP, Escudo al Tope (800/800) y +1 Nivel a [Voluntad de Recuperación]
        p.hp = maxHP;
        p.sp = 100;
        p.mp = maxMP;
        p.magmaOverheal = false;
        p.arcticShield = 800;
        if (typeof gainHunterSkillXP === "function") {
            gainHunterSkillXP('longevity', 20);
        }

        if (!p.titles.some(t => t.id === 'title_min_byung_gyu')) {
            p.titles.push({
                id: 'title_min_byung_gyu',
                name: '📗 Misericordia del Monarca: El Descanso de Min Byung-Gyu',
                desc: 'Extrajiste el alma de un sanador Rango S en la Isla de Jeju para obrar un milagro de resurrección y renunciaste a su poder para concederle la paz eterna. (Bono eterno: +5% recarga de MP y +0.50 STR/INT).'
            });
        }

        if (fromDungeon && typeof activeDungeon !== 'undefined' && activeDungeon) {
            let clashBox = document.getElementById('raid-boss-clash');
            if (clashBox) clashBox.style.display = 'none';
            if (typeof syncRaidVitalsUI === "function") syncRaidVitalsUI();
            if (typeof advancePhase === "function") advancePhase();
        }

        saveData();
        if (typeof updateHUD === "function") updateHUD();
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("✨ ¡MILAGRO CONSUMADO! Vitalidad al 100%, +100 Escudo, +0.50 STR/INT y el título de Min Byung-Gyu ha quedado grabado en tu Perfil.", "success");
    }, 3600);
}

function renderTitles() {
    const cont = document.getElementById('titles-container');
    if (!cont) return;
    ensureShadowStructure();

    if (!p.chorros4Unlocked) {
        p.fallenSoulsPendingNextLvl = false;
        if (Array.isArray(p.titles)) {
            p.titles = p.titles.filter(t => t.id !== 'title_fallen_souls');
        }
    }

    if (!p.titles || p.titles.length === 0) {
        cont.innerHTML = `<p style="color:var(--text-muted); font-size:0.9em;">Aún no has desbloqueado reliquias de título en tu expediente.</p>`;
        return;
    }

    const TITLE_GREEN_EFFECTS = {
        "t_adversity":        { label: "Supervivencia Crítica:",   buff: "MITIGACIÓN DE RESACA +20%" },
        "t_wolf_slayer":      { label: "Bestias y Enfoque:",       buff: "TODAS LAS HABILIDADES +40%" },
        "t_job_breaker":      { label: "Dominio de Ruta:",         buff: "COSTO DE FATIGA VIAL -20%" },
        "t_demon_hunter":     { label: "Sangre del Monarca:",      buff: "REGENERACIÓN MATUTINA +5 HP" },
        "t_jeju_savior":      { label: "Autoridad de Extracción:", buff: "PROBABILIDAD ¡SURGE! +10%" },
        "t_architect_slayer": { label: "Corazón Negro:",           buff: "NÚCLEO DE MANÁ EXPANDIDO" },
        "t_national_level":   { label: "Rango Nacional:",          buff: "AUTORIDAD SOBERANA ACTIVA" },
        "t_true_monarch":     { label: "Trono de Sombras:",        buff: "PODER ABSOLUTO DESBLOQUEADO" },
        "title_min_byung_gyu":{ label: "Bendición Eterna:",        buff: "RECARGA MP +5% // FUE & INT +0.50" },
        "title_legion":       { label: "Comandante Supremo:",      buff: "MORAL DE INFANTERÍA +25%" },
        "title_fallen_souls": { label: "Salmos 121:8:",            buff: "ESCUDO DE GRACIA +80 HP" }
    };

    let html = '';
    p.titles.forEach(t => {
        let cleanTitle = (t.name || "").replace(/^[^\wÁÉÍÓÚÑáéíóúñ¡!]+\s*/, '');
        let fx = TITLE_GREEN_EFFECTS[t.id] || { label: "Efecto Pasivo:", buff: "BONIFICACIÓN PERMANENTE ACTIVA" };
        html += `
        <div class="sl-title-anime-window">
            <div class="sl-title-bracket-box">[Título: ${cleanTitle}]</div>
            <div class="sl-title-lore-line">${t.desc}</div>
            <div class="sl-title-green-buff">${fx.label} <b>${fx.buff}</b></div>
        </div>`;
    });
    cont.innerHTML = html;
}
function triggerDeathFromCombat(reason) {
    if (typeof triggerDeath === "function") {
        triggerDeath(reason, 'dungeon');
    }
}

function validateConfirmation(expectedText) {
    const inputEl = document.getElementById('confirm-input');
    if (!inputEl) return false;
    const inputVal = inputEl.value.trim().toUpperCase();
    return inputVal === expectedText.toUpperCase();
}
