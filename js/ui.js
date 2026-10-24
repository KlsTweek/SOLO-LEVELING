/* ==========================================================================
   UI.JS - INTERFAZ, SEGURIDAD DE MUERTE, IA DEL MONARCA Y TERMINAL DE ARRANQUE
   ========================================================================== */

function safeSetText(id, text) {
    let el = document.getElementById(id);
    if (el) el.innerText = text;
}

function _d64(str) {
    try { return decodeURIComponent(escape(window.atob(str))); } catch (e) { return ""; }
}

/* ==========================================================================
   1. NOTIFICACIONES BLINDADAS Y NAVEGACIÓN CON CUARENTENA
   ========================================================================== */
/* ==========================================================================
   1. MOTOR DE VENTANA HOLOGRÁFICA ÚNICA (SIN SATURACIÓN Y 100% ESPAÑOL)
   ========================================================================== */
let activeToastTimer = null;
let activeToastMessages = [];
let currentToastSeverity = 0; // 1 = Azul Normal, 2 = Rojo Peligro, 3 = Morado Supremo

const SL_VECTOR_MAP = {
    "⚔️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M9.5 6.5L21 18v3h-3L6.5 9.5"/></svg>`,
    "🗡️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><polygon points="18,2 22,6 11,17 7,13"/><path d="M4 20l4-4M6 12l6 6"/></svg>`,
    "🗣️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><polygon points="12,5 19,12 12,19 5,12"/><path d="M19 9l3-3M19 15l3 3"/></svg>`,
    "⚡": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2.2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>`,
    "🌑": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    "🎒": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect x="4" y="6" width="16" height="15" rx="3"/><path d="M9 6V4a3 3 0 0 1 6 0v2M4 12h16"/></svg>`,
    "🛒": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7"/><circle cx="12" cy="12" r="3"/></svg>`,
    "💀": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><circle cx="12" cy="10" r="7"/><path d="M9 16v4h6v-4M9 10h.01M15 10h.01"/></svg>`,
    "🔥": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2"><path d="M12 2c2 5 6 7 6 12a6 6 0 0 1-12 0c0-5 4-7 6-12z"/></svg>`,
    "❄️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"/></svg>`,
    "🧊": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" stroke-width="2"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/><path d="M12 22V12M20 7l-8 5-8-5"/></svg>`,
    "🛡️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    "🐻‍❄️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polygon points="4,8 8,3 12,6 16,3 20,8 19,17 12,21 5,17"/><circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/></svg>`,
    "🐜": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#d946ef" stroke-width="2"><polygon points="12,3 17,8 15,15 12,21 9,15 7,8"/><path d="M9 4L4 2M15 4l5-2M7 11l-5 2M17 11l5 2"/></svg>`,
    "🌟": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f3d078" stroke-width="2"><polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/></svg>`,
    "✨": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>`,
    "🪙": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f3d078" stroke-width="2"><circle cx="12" cy="12" r="9"/><polygon points="12,6 16,12 12,18 8,12"/></svg>`,
    "💠": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><polygon points="12,2 20,9 17,21 7,21 4,9"/><circle cx="12" cy="12" r="2.5"/></svg>`,
    "🔮": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><circle cx="12" cy="10" r="7"/><path d="M7 20h10M9 17h6"/></svg>`,
    "⚠️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><polygon points="12,2 22,20 2,20"/><line x1="12" y1="9" x2="12" y2="14"/><circle cx="12" cy="17" r="1"/></svg>`,
    "🔒": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
    "🔓": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7-2"/></svg>`,
    "📜": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`,
"📡": '<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><circle cx="12" cy="15" r="2.5"/><path d="M7.5 10.5a6.5 6.5 0 0 1 9 0M4 7a11.5 11.5 0 0 1 16 0"/></svg>',
   "🏆": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f3d078" stroke-width="2"><path d="M7 4h10v6a5 5 0 0 1-10 0V4zM12 15v5M8 20h8"/></svg>`,
    "💧": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    "🩸": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    "👁️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`,
    "⚙️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg>`,
    "🚪": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect x="5" y="2" width="14" height="20"/><circle cx="15" cy="12" r="1"/></svg>`,
    "🎁": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#f3d078" stroke-width="2"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/></svg>`,
    "📦": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7"/><polyline points="3,7 12,12 21,7"/></svg>`,
    "🎫": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6v12"/></svg>`,
    "🥗": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2"><path d="M4 12h16a8 8 0 0 1-16 0zM8 8l4 4 4-4"/></svg>`,
    "🪨": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><polygon points="12,2 19,8 17,20 7,20 5,8"/></svg>`,
    "🚩": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M4 22V2l15 5-15 5"/></svg>`,
    "👑": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#d946ef" stroke-width="2"><polygon points="2,18 5,7 12,12 19,7 22,18"/></svg>`,
    "⬆️": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`,
    "✅": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>`,
    "🔔": `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>`
};

function replaceEmojisWithVectors(str) {
    if (!str || typeof str !== 'string') return str;
    let out = str;
    for (const [emo, svg] of Object.entries(SL_VECTOR_MAP)) {
        if (out.includes(emo)) out = out.split(emo).join(svg);
    }
    return out;
}
/* ==========================================================================
   VECTORIZADOR GLOBAL: reemplaza TODO emoji de la pantalla por arte vectorial
   ========================================================================== */
const _vx = (c, inner) => `<svg class="sl-inline-vec" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const _VX_BOOK = '<path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M8 8h7"/>';
const _VX_FALLBACK = _vx('#38bdf8', '<polygon points="12,3 21,12 12,21 3,12"/>');

const _VX_GROUPS = [
    [['🐉','🐺','🐗','🐷','🐍','🦎','🐙','🕷'], _vx('#f43f5e', '<path d="M5 4c4 0 7 4 7 9M19 4c-4 0-7 4-7 9M9 13l3 7 3-7"/>')],
    [['👹','🧟','👽','👾','🤖','👻','🥷','👵','🧝\u200D♂','🎭','🕶'], _vx('#c084fc', '<path d="M12 3a7 7 0 0 1 7 7v11l-3-2-2 2-2-2-2 2-2-2-3 2V10a7 7 0 0 1 7-7z"/><path d="M9 10h.01M15 10h.01"/>')],
    [['🚔','🚂','🏍'], _vx('#38bdf8', '<rect x="3" y="8" width="18" height="8" rx="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/>')],
    [['🔨','🪚'], _vx('#38bdf8', '<path d="M14 4l6 6-3 3-6-6zM13 11L4 20"/>')],
    [['🔫','🎯'], _vx('#f43f5e', '<circle cx="12" cy="12" r="8"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>')],
    [['📘'], _vx('#38bdf8', _VX_BOOK)],
    [['📗'], _vx('#2dd4bf', _VX_BOOK)],
    [['🧪'], _vx('#2dd4bf', '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>')],
    [['🧠'], _vx('#c084fc', '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V4a3 3 0 0 0-3 0zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>')],
    [['🗿'], _vx('#00e5ff', '<path d="M7 21V8l2-5h6l2 5v13z"/><path d="M10 11h.01M14 11h.01M10 16h4"/>')],
    [['🪶'], _vx('#38bdf8', '<path d="M20 4c-9 0-14 5-14 14M20 4c0 9-5 14-14 14M6 18L3 21"/>')],
    [['💣'], _vx('#f43f5e', '<circle cx="11" cy="14" r="7"/><path d="M16 9l3-3M19 3v3M17 6h3"/>')],
    [['🟣'], _vx('#a855f7', '<circle cx="12" cy="12" r="7" fill="#a855f7"/>')],
    [['🌹'], _vx('#f43f5e', '<circle cx="12" cy="9" r="5"/><path d="M12 14v8M12 18l-4-2M12 19l4-2"/>')],
    [['🎷'], _vx('#f3d078', '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>')],
    [['☣'], _vx('#2dd4bf', '<circle cx="12" cy="12" r="3"/><path d="M12 9V3M9.4 13.5L4 16.5M14.6 13.5L20 16.5"/>')],
    [['🌋'], _vx('#fb7185', '<path d="M3 21l6-12h6l6 12zM9 9L8 5M15 9l1-4M12 8V3"/>')],
    [['🌙'], _vx('#a855f7', '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>')],
    [['💎'], _vx('#00e5ff', '<polygon points="6,3 18,3 22,9 12,22 2,9"/><path d="M2 9h20M10 3L8 9l4 13 4-13-2-6"/>')],
    [['🌩'], _vx('#c084fc', '<path d="M17 18a4 4 0 0 0 0-8 6 6 0 0 0-11 1 4 4 0 0 0 1 7"/><path d="M13 12l-3 5h4l-3 5"/>')],
    [['💥'], _vx('#f3d078', '<polygon points="12,2 14,8 21,6 16,12 22,16 15,16 14,22 11,17 5,20 7,13 2,9 9,9"/>')],
    [['🔍'], _vx('#38bdf8', '<circle cx="10" cy="10" r="6"/><path d="M15 15l6 6"/>')],
    [['❌','✖'], _vx('#f43f5e', '<path d="M5 5l14 14M19 5L5 19"/>')],
    [['✔'], _vx('#00e5ff', '<polyline points="20,6 9,17 4,12"/>')],
    [['⭐','★'], _vx('#f3d078', '<polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/>')],
    [['❤'], _vx('#f43f5e', '<path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z"/>')],
    [['⏳','⌛'], _vx('#38bdf8', '<path d="M6 3h12M6 21h12M7 3c0 6 5 6 5 9s-5 3-5 9M17 3c0 6-5 6-5 9s5 3 5 9"/>')]
];

const _vxStrip = s => s.replace(/[\uFE0E\uFE0F]/g, '');
const _VEC_NORM = {};
Object.entries(SL_VECTOR_MAP).forEach(([k, v]) => { _VEC_NORM[_vxStrip(k)] = v; });
_VX_GROUPS.forEach(([keys, svg]) => keys.forEach(k => { _VEC_NORM[_vxStrip(k)] = svg; }));
_VEC_NORM['👁\u200D🗨'] = _VEC_NORM['👁'];

const _EMO_SRC = '(?:[\\u{1F000}-\\u{1FAFF}]|[\\u2600-\\u26FF]|[\\u2702-\\u2793\\u27A1\\u27B0\\u27BF]|[\\u2B05-\\u2B07\\u2B1B\\u2B1C\\u2B50\\u2B55]|[\\u231A\\u231B\\u23E9-\\u23F3\\u23F8-\\u23FA])(?:[\\uFE0E\\uFE0F]|[\\u{1F3FB}-\\u{1F3FF}]|\\u200D(?:[\\u{1F000}-\\u{1FAFF}]|[\\u2600-\\u27BF\\u2B50])[\\uFE0E\\uFE0F]?)*';
const _EMO_RE = new RegExp(_EMO_SRC, 'gu');
const _EMO_TEST = new RegExp(_EMO_SRC, 'u');

function vectorizeEmojisIn(root) {
    if (!root || root.nodeType !== 1) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
            const par = n.parentElement;
            if (!par || par.closest('svg, script, style, textarea, noscript')) return NodeFilter.FILTER_REJECT;
            return _EMO_TEST.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
        const par = n.parentElement;
        const s = n.nodeValue;
        if (par && (par.tagName === 'OPTION' || par.tagName === 'TITLE')) {
            n.nodeValue = s.replace(_EMO_RE, '').trim();
            return;
        }
        const frag = document.createDocumentFragment();
        let last = 0;
        s.replace(_EMO_RE, (m, idx) => {
            frag.append(s.slice(last, idx));
            const tpl = document.createElement('template');
            tpl.innerHTML = _VEC_NORM[_vxStrip(m)] || _VX_FALLBACK;
            frag.append(tpl.content);
            last = idx + m.length;
            return m;
        });
        frag.append(s.slice(last));
        n.replaceWith(frag);
    });
}

function startEmojiVectorizer() {
    if (!document.getElementById('sl-vec-style')) {
        const st = document.createElement('style');
        st.id = 'sl-vec-style';
        st.textContent = ':where(.sl-inline-vec){width:1.15em;height:1.15em;vertical-align:-0.2em;display:inline-block;flex:none;}';
        document.head.appendChild(st);
    }
    document.title = document.title.replace(_EMO_RE, '').trim();
    vectorizeEmojisIn(document.body);
new MutationObserver(muts => {
        for (let i = 0; i < muts.length; i++) {
            const added = muts[i].addedNodes;
            for (let j = 0; j < added.length; j++) {
                const n = added[j];
                if (n.nodeType === 1) vectorizeEmojisIn(n);
            }
        }
    }).observe(document.body, { childList: true, subtree: true });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEmojiVectorizer);
} else {
    startEmojiVectorizer();
}

function scrubAllDOMVectors(root = document.body) {
    if (!root) return;
    const elems = root.querySelectorAll('.btn, .card-title, .shadow-title, .modal-title, .sl-status-top-bar span, .sl-status-center-stat, .raid-phase-badge, #raid-shield-indicator, .boss-clash-header span');
    elems.forEach(el => {
        if (el.children.length === 0 || !el.innerHTML.includes('<svg')) {
            let clean = replaceEmojisWithVectors(el.innerHTML);
            if (clean !== el.innerHTML) el.innerHTML = clean;
        }
    });
}

function highlightAnimeKeywords(text) {
    let base = replaceEmojisWithVectors(text || "");
    return base
        .replace(/(JUGADOR 1|CAZADOR|ÉXITO|NIVEL \d+|ASCENSIÓN AL NIVEL \d+|¡SURGE!|MILAGRO CONSUMADO)/g, '<span style="color:#00ffcc; font-weight:800; text-shadow:0 0 8px rgba(0,255,204,0.6);">$1</span>')
        .replace(/(PENALIZACIÓN|CASTIGO|COLAPSO|ALERTA|PELIGRO|FALLIDA|-[0-9.]+ HP|-[0-9]+ SP)/g, '<span style="color:#ff2a55; font-weight:800; text-shadow:0 0 8px rgba(255,42,85,0.65);">$1</span>')
        .replace(/(RECOMPENSA|\+[0-9]+ G|\+[0-9]+ XP|\+[0-9]+ MP|\+[0-9]+ CM|CRÍTICO PERFECTO)/g, '<span style="color:#38bdf8; font-weight:800; text-shadow:0 0 8px rgba(56,189,248,0.65);">$1</span>');
}

function getBaroqueCornerSVG() {
    return `<svg viewBox="0 0 28 28" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 26 L1 1 L26 1" stroke="#ffffff" stroke-width="1.8"/>
        <path d="M5 20 L5 5 L20 5" stroke="#38bdf8" stroke-width="1.2"/>
        <path d="M5 12 C9 12, 12 9, 12 5" stroke="#e0f2fe" stroke-width="1.2"/>
        <polygon points="8,8 12,6 10,10" fill="#ffffff"/>
    </svg>`;
}

function isMajorMonarchNotification(msg, type) {
    if (type === "dungeon_major") return true;
    let upper = (msg || "").toUpperCase();
    // EXCLUSIVO PARA MAZMORRAS IMPORTANTES (Rango A, S, SSS, Portales Rojos, Isla de Jeju, Abismo) y NADA MÁS
    if (
        upper.includes("INCURSIÓN DESPEJADA") ||
        upper.includes("ISLA DE JEJU") ||
        upper.includes("PORTAL ROJO") ||
        upper.includes("CAPITAL DE LOS NO DEVUELTOS") ||
        upper.includes("CASTILLO DE HYRULE") ||
        upper.includes("CASTILLO OSCURO") ||
        upper.includes("EL INFIERNO") ||
        upper.includes("MUNDO DEL ROMANCE") ||
        upper.includes("CALLEJÓN EVADARE") ||
        upper.includes("DOMINIO DE LOS ELFOS") ||
        upper.includes("TREN INFINITO")
    ) {
        return true;
    }
    return false;
}

let holoTypingInterval = null;

function dismissActiveHoloToast() {
    const tc = document.getElementById('toast-container');
    if (!tc) return;
    const currentFrame = tc.querySelector('.sl-holo-frame');
    if (activeToastTimer) {
        clearTimeout(activeToastTimer);
        activeToastTimer = null;
    }
    activeToastMessages = [];
    currentToastSeverity = 0;

    if (currentFrame && !currentFrame.classList.contains('holo-closing')) {
        // Sin sonido de cierre para mantener la interfaz limpia
        currentFrame.classList.add('holo-closing');
        setTimeout(() => {
            if (currentFrame && currentFrame.parentNode) currentFrame.remove();
        }, 220);
    }
}

function systemNotify(msg, type = "info") {
    if (typeof p !== 'undefined' && p) {
        if (!Array.isArray(p.notifLog)) p.notifLog = [];
        let timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        p.notifLog.unshift({ time: timeStr, msg: msg, type: type });
        if (p.notifLog.length > 10) p.notifLog = p.notifLog.slice(0, 10);
        if (typeof saveData === 'function') saveData();
    }

    const tc = document.getElementById('toast-container');
    if (!tc) return;

    let isMajorPurple = isMajorMonarchNotification(msg, type);
    let newSeverity = isMajorPurple ? 3 : (type === "danger" ? 2 : 1);

    let isShadowToggle = msg.includes("Comandante") && (msg.includes("desplegado") || msg.includes("regresado a tu sombra") || msg.includes("reposo"));
    if (isShadowToggle) {
        activeToastMessages = activeToastMessages.filter(m => !(m.includes("Comandante") && (m.includes("desplegado") || m.includes("regresado a tu sombra") || m.includes("reposo"))));
    }

    if (!activeToastMessages.includes(msg)) {
        activeToastMessages.push(msg);
    }
    if (activeToastMessages.length > 3) {
        activeToastMessages.shift();
    }

    if (newSeverity > currentToastSeverity || activeToastMessages.length === 1) {
        currentToastSeverity = newSeverity;
    }

    let frameThemeClass = "";
    let headerLabel = "INFORMACIÓN";
    let subBracketText = "[NOTIFICACIÓN DEL SISTEMA]";

    if (currentToastSeverity === 3) {
        frameThemeClass = "monarch-purple";
        headerLabel = "AUTORIDAD DEL MONARCA";
        subBracketText = "[DIRECTIVA SOBERANA]";
    } else if (currentToastSeverity === 2) {
        frameThemeClass = "danger";
        headerLabel = "ALARMA // PELIGRO";
        subBracketText = "[ADVERTENCIA CRÍTICA]";
    } else if (type === "gold" || type === "success") {
        headerLabel = "MISIÓN // BOTÍN";
        subBracketText = "[NOTIFICACIÓN DEL SISTEMA]";
    }

    let existingFrame = tc.querySelector('.sl-holo-frame');
    let cornerSVG = getBaroqueCornerSVG();

    // Texto directo con fade-in limpio sin saltos de línea ni tecleo trabado
    let combinedHtml = activeToastMessages
        .map(m => `<div class="sl-holo-msg-item">${highlightAnimeKeywords(m)}</div>`)
        .join('<div class="sl-holo-msg-divider"></div>');

    if (existingFrame && !existingFrame.classList.contains('holo-closing')) {
        existingFrame.className = `toast sl-holo-frame ${frameThemeClass} holo-pulse-update`;
        setTimeout(() => { if (existingFrame) existingFrame.classList.remove('holo-pulse-update'); }, 300);

        let titleRect = existingFrame.querySelector('.sl-title-rect');
        let subEl = existingFrame.querySelector('.sl-holo-subbracket');
        let listEl = existingFrame.querySelector('.sl-holo-msg-list');

        if (titleRect) titleRect.innerText = headerLabel;
        if (subEl) subEl.innerText = subBracketText;
        if (listEl) listEl.innerHTML = combinedHtml;
    } else {
        tc.innerHTML = '';
        const t = document.createElement('div');
        t.className = `toast sl-holo-frame ${frameThemeClass}`;
        t.onclick = dismissActiveHoloToast;

        t.innerHTML = `
            <div class="sl-holo-rail top">
                <span class="rail-cap left"></span>
                <span class="rail-core"></span>
                <span class="rail-cap right"></span>
            </div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <span class="sl-manhwa-controls">— ✕</span>

                    <div class="sl-holo-header-row">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect">${headerLabel}</div>
                    </div>
                    <div class="sl-holo-subbracket">${subBracketText}</div>
                    <div class="sl-holo-msg-list">${combinedHtml}</div>
                    <div class="sl-holo-footer-hint">[ TOCA LA VENTANA PARA CERRAR ]</div>
                </div>
            </div>
            <div class="sl-holo-rail bottom">
                <span class="rail-cap left"></span>
                <span class="rail-core"></span>
                <span class="rail-cap right"></span>
            </div>
        `;
        tc.appendChild(t);
    }

    if (typeof playSystemSound === 'function') playSystemSound(type);

    if ("Notification" in window && Notification.permission === "granted" && document.hidden) {
        try {
            new Notification("Sistema del Monarca", { body: msg.replace(/<[^>]*>?/gm, '') });
        } catch (e) {}
    }

    if (activeToastTimer) clearTimeout(activeToastTimer);
    activeToastTimer = setTimeout(() => {
        dismissActiveHoloToast();
    }, 4200);
}

function openNotifHistoryModal() {
    let modal = document.getElementById('notif-history-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'notif-history-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    let logs = (p && Array.isArray(p.notifLog)) ? p.notifLog : [];
    let listHtml = logs.length === 0
        ? `<p style="color:var(--text-muted); text-align:center; padding:20px 0;">Aún no hay notificaciones registradas hoy.</p>`
        : logs.map(item => {
            let isDanger = item.type === 'danger';
            let borderCol = isDanger ? 'rgba(225, 29, 72, 0.75)' : 'rgba(56, 189, 248, 0.55)';
            let tagCol = isDanger ? '#fb7185' : '#38bdf8';
            // Forzar tamaño 20x20px directamente en cualquier SVG guardado en el historial
            let safeMsg = highlightAnimeKeywords(item.msg).replace(/<svg /g, '<svg width="20" height="20" style="width:20px !important; height:20px !important; display:inline-block; vertical-align:-4px; margin-right:6px;" ');
            return `
            <div style="background:rgba(3, 10, 24, 0.92); border:1px solid rgba(30, 58, 95, 0.65); border-left:3px solid ${borderCol}; padding:10px 12px; margin-bottom:8px; border-radius:2px;">
                <div style="font-family:'Share Tech Mono', monospace; font-size:0.72em; color:${tagCol}; margin-bottom:3px; letter-spacing:1px;">[${item.time}] // DIRECTIVA DEL SISTEMA</div>
                <div style="font-size:0.88em; color:#e2e8f0; line-height:1.35;">${safeMsg}</div>
            </div>`;
        }).join('');

    modal.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:410px;">
            <div class="sl-window-header">
                <span class="sl-excl-box">!</span>
                <span class="sl-notif-tag">REGISTRO DEL SISTEMA (ÚLTIMAS 10)</span>
            </div>
            <div style="max-height:58vh; overflow-y:auto; margin:14px 0; text-align:left;">
                ${listHtml}
            </div>
            <button class="btn btn-main" style="width:100%;" onclick="closeModal('notif-history-modal')">CERRAR REGISTRO</button>
        </div>
    `;
    modal.style.display = 'flex';
}

function openArcProtocolsModal() {
    let modal = document.getElementById('arc-protocols-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'arc-protocols-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    let unlocked = (p && Array.isArray(p.discoveredArcs)) ? p.discoveredArcs : [];
    let allInfo = (typeof ARC_PROTOCOLS_INFO !== 'undefined') ? ARC_PROTOCOLS_INFO : [];

    let rowsHtml = allInfo.map(arc => {
        let isDisc = unlocked.includes(arc.id);
        if (isDisc) {
            return `
            <div style="background:rgba(4, 18, 42, 0.85); border:1px solid rgba(56, 189, 248, 0.5); border-left:3px solid #38bdf8; padding:10px 12px; margin-bottom:8px;">
                <div style="color:#38bdf8; font-weight:700; font-size:0.92em; font-family:'Share Tech Mono', monospace;">🔓 ${arc.title}</div>
                <div style="color:#e2e8f0; font-size:0.84em; margin-top:4px; line-height:1.35;">${arc.desc}</div>
            </div>`;
        } else {
            return `
            <div style="background:rgba(2, 6, 16, 0.75); border:1px dashed #1e3a5f; padding:10px 12px; margin-bottom:8px; opacity:0.55;">
                <div style="color:#64748b; font-weight:700; font-size:0.88em; font-family:'Share Tech Mono', monospace;">🔒 ${arc.title.split('//')[0]} // [ PROTOCOLO CLASIFICADO ]</div>
                <div style="color:#475569; font-size:0.78em; margin-top:3px;">Interactúa con las funciones del Sistema para desencriptar esta Caja Negra.</div>
            </div>`;
        }
    }).join('');

    modal.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:415px;">
            <div class="sl-window-header">
                <span class="sl-excl-box">!</span>
                <span class="sl-notif-tag">CAJAS NEGRAS DEL ARQUITECTO (${unlocked.length}/15)</span>
            </div>
            <div style="max-height:60vh; overflow-y:auto; margin:14px 0; text-align:left;">
                ${rowsHtml}
            </div>
            <button class="btn btn-main" style="width:100%;" onclick="closeModal('arc-protocols-modal')">CERRAR EXPEDIENTE</button>
        </div>
    `;
    modal.style.display = 'flex';
}

function openModal(id) { 
    let m = document.getElementById(id); 
    if (m) m.style.display = 'flex'; 
}

function closeModal(id) { 
    let m = document.getElementById(id); 
    if (m) m.style.display = 'none'; 
}

function switchTab(tab, idx) {
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
    }

    if (p && p.penaltyActive && !['routine', 'inventory', 'shop'].includes(tab)) {
        systemNotify("🔒 ZONA DE PENALIZACIÓN: El Sistema ha bloqueado esta sección.", "danger");
        tab = 'routine';
        idx = 0;
    }

    ['routine', 'bosses', 'inventory', 'shop', 'gacha', 'profile'].forEach(t => { 
        let e = document.getElementById(`tab-${t}`); 
        if (e) e.classList.add('hidden'); 
    });
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    let activeTab = document.getElementById(`tab-${tab}`); 
    if (activeTab) activeTab.classList.remove('hidden');
    
    let navItems = document.querySelectorAll('.nav-item'); 
    if (navItems[idx]) navItems[idx].classList.add('active');

    if (typeof _evalArcTabHook === 'function') _evalArcTabHook(tab, idx);
    if (typeof triggerAiMonarchComment === 'function') triggerAiMonarchComment('tab_' + tab);

    if (tab === 'routine' && typeof renderRoutine === 'function') renderRoutine();
    if (tab === 'bosses' && typeof renderBosses === 'function') renderBosses();
    if (tab === 'gacha' && typeof renderShadowSanctuary === 'function') renderShadowSanctuary();
    if (tab === 'profile') {
        if (typeof renderStatusRadarProfile === 'function') renderStatusRadarProfile();
        if (typeof renderTitles === 'function') renderTitles();
        if (typeof scrubAllDOMVectors === 'function') setTimeout(() => scrubAllDOMVectors(), 20);
    }
}
function renderStatusRadarProfile() {
    let tabProf = document.getElementById('tab-profile');
    if (!tabProf || !p || !p.stats) return;

    let statusCard = document.getElementById('sl-status-master-card');
    if (!statusCard) {
        // Ocultar las dos tarjetas viejas de arriba para mostrar la nueva ventana ESTADO unificada
        let oldCards = tabProf.querySelectorAll('.profile-card');
        if (oldCards[0]) oldCards[0].style.display = 'none';
        if (oldCards[1]) oldCards[1].style.display = 'none';
        let firstHeader = tabProf.querySelector('.section-header');
        if (firstHeader) firstHeader.style.display = 'none';

        statusCard = document.createElement('div');
        statusCard.id = 'sl-status-master-card';
        statusCard.className = 'sl-status-window';
        tabProf.insertBefore(statusCard, tabProf.firstChild);
    }

    // Calcular Rango y Clase 100% Canon según el Nivel del Manhwa
    let hunterRank = 'E';
    if (p.level >= 122) hunterRank = 'NAC';
    else if (p.level >= 80) hunterRank = 'S';
    else if (p.level >= 61) hunterRank = 'A';
    else if (p.level >= 40) hunterRank = 'B';
    else if (p.level >= 27) hunterRank = 'C';
    else if (p.level >= 15) hunterRank = 'D';

    let hunterClass = (typeof getHunterJobTitleByState === 'function')
        ? getHunterJobTitleByState()
        : (p.level >= 51 ? 'MONARCA DE LAS SOMBRAS' : (p.level >= 40 ? 'NIGROMANTE' : 'NINGUNA'));

    let hunterTitle = (p.titles && p.titles.length > 0)
        ? p.titles[p.titles.length - 1].name.replace(/^[^\s]+\s/, '')
        : 'NINGUNO';

    // Escalar valores estilo la captura (x10 para que 1.00 sea 10, 1.25 sea 12.5, etc.)
    let strVal = +(p.stats.str * 10).toFixed(2);
    let intVal = +(p.stats.int * 10).toFixed(2);
    let agiVal = +(p.stats.agi * 10).toFixed(2);
    let disVal = +(10 + ((p.perfectDays || 0) * 0.5) + ((p.totalMissions || 0) * 0.15)).toFixed(2);
    let spiVal = +(10 + ((p.equippedShadows ? p.equippedShadows.length : 0) * 2.5) + ((p.stats.int - 1) * 5)).toFixed(2);

    let apVal = Math.floor(strVal * 1.2 + agiVal * 0.5);
    let defVal = Math.floor(strVal * 1.1 + ((p.infantry && p.infantry.bears) ? p.infantry.bears * 2 : 0));
    let leaderPts = +((strVal + intVal + agiVal + disVal + spiVal) / 4.8 + (p.level * 1.25)).toFixed(3);
    let physRed = Math.min(75, Math.floor(4 + (p.stats.str * 1.5) + (p.equippedShadows && p.equippedShadows.includes('iron') ? 35 : 0)));
    let magRed = Math.min(75, Math.floor(3 + (p.stats.int * 1.5)));

    // Calcular los 5 vértices del Pentágono Radar (Centro 110, 105, Radio Máx 68)
    const cx = 110, cy = 105, maxR = 68;
    const angles = [-90, -18, 54, 126, 198].map(a => a * Math.PI / 180);
    const norm = (v) => Math.min(1, Math.max(0.16, (v - 8) / 35));
    const vals = [norm(strVal), norm(intVal), norm(spiVal), norm(disVal), norm(agiVal)];

    const getPolyPoints = (scale) => angles.map(ang => `${(cx + Math.cos(ang) * maxR * scale).toFixed(1)},${(cy + Math.sin(ang) * maxR * scale).toFixed(1)}`).join(' ');
    const statPoints = angles.map((ang, i) => `${(cx + Math.cos(ang) * maxR * vals[i]).toFixed(1)},${(cy + Math.sin(ang) * maxR * vals[i]).toFixed(1)}`).join(' ');
    const statDots = angles.map((ang, i) => `<circle cx="${(cx + Math.cos(ang) * maxR * vals[i]).toFixed(1)}" cy="${(cy + Math.sin(ang) * maxR * vals[i]).toFixed(1)}" r="3.5" fill="#00aaff" stroke="#ffffff" stroke-width="1"/>`).join('');

    let discCount = Array.isArray(p.discoveredArcs) ? p.discoveredArcs.length : 0;

    statusCard.innerHTML = `
        <div class="sl-status-top-bar">
            <span style="opacity:0.75; cursor:pointer;" onclick="openModal('schedule-modal')">⚙️</span>
            <h2 class="sl-status-main-title">ESTADO</h2>
            <span style="opacity:0.75; font-size:0.8em; font-family:'Share Tech Mono', monospace; cursor:pointer;" onclick="openArcProtocolsModal()">🔮 ${discCount}/15</span>
        </div>

        <div class="sl-status-divider"></div>

        <div class="sl-status-id-grid">
            <div class="sl-status-id-left">
                <div>NOMBRE: <b>CRISTIAN</b></div>
                <div>NV: <b>${p.level}</b></div>
                <div>CLASE: <b>${hunterClass}</b></div>
                <div>TÍTULO: <b>${hunterTitle}</b></div>
            </div>
            <div class="sl-status-rank-box">
                <svg viewBox="0 0 100 100" width="78" height="78">
                    <polygon points="50,6 90,28 76,86 24,86 10,28" fill="none" stroke="#00aaff" stroke-width="1.8" opacity="0.85"/>
                    <polygon points="50,94 90,72 76,14 24,14 10,72" fill="rgba(0, 170, 255, 0.08)" stroke="#38bdf8" stroke-width="1.8"/>
                    <text x="50" y="64" text-anchor="middle" fill="#ffffff" font-family="Rajdhani, sans-serif" font-weight="700" font-size="42">${hunterRank}</text>
                </svg>
                <div class="sl-rank-label">RANGO</div>
            </div>
        </div>

        <div class="sl-status-divider"></div>

        <div class="sl-status-attrs-grid">
            <div>
                <div>FUERZA : <b>${strVal}</b></div>
                <div>INTELIGENCIA : <b>${intVal}</b></div>
                <div>DISCIPLINA : <b>${disVal}</b></div>
                <div>ESPÍRITU : <b>${spiVal}</b></div>
            </div>
            <div>
                <div>PA (ATAQUE) : <b>${apVal}</b></div>
                <div>DEF (DEFENSA) : <b>${defVal}</b></div>
                <div>AGILIDAD : <b>${agiVal}</b></div>
                <div>RACHA : <b>${p.perfectDays || 0} DÍAS</b></div>
            </div>
        </div>

        <div class="sl-status-divider"></div>

        <!-- PENTÁGONO RADAR DINÁMICO EN ESPAÑOL -->
        <div class="sl-radar-chart-wrap">
            <svg viewBox="0 0 220 205" width="100%" height="205">
                <polygon points="${getPolyPoints(1.0)}" fill="rgba(2, 8, 24, 0.7)" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.2"/>
                <polygon points="${getPolyPoints(0.75)}" fill="none" stroke="rgba(148, 163, 184, 0.25)" stroke-width="0.9"/>
                <polygon points="${getPolyPoints(0.50)}" fill="none" stroke="rgba(148, 163, 184, 0.25)" stroke-width="0.9"/>
                <polygon points="${getPolyPoints(0.25)}" fill="none" stroke="rgba(148, 163, 184, 0.25)" stroke-width="0.9"/>
                ${angles.map(ang => `<line x1="${cx}" y1="${cy}" x2="${(cx + Math.cos(ang) * maxR).toFixed(1)}" y2="${(cy + Math.sin(ang) * maxR).toFixed(1)}" stroke="rgba(148, 163, 184, 0.3)" stroke-width="0.9"/>`).join('')}

                <polygon points="${statPoints}" fill="rgba(0, 170, 255, 0.38)" stroke="#00d2ff" stroke-width="2" filter="drop-shadow(0 0 8px rgba(0,210,255,0.6))"/>
                ${statDots}

                <text x="110" y="25" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">FUE</text>
                <text x="192" y="84" text-anchor="start" fill="#ffffff" font-size="11" font-weight="700">INT</text>
                <text x="162" y="182" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">ESP</text>
                <text x="58" y="182" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700">DIS</text>
                <text x="28" y="84" text-anchor="end" fill="#ffffff" font-size="11" font-weight="700">AGI</text>
            </svg>
        </div>

        <div class="sl-status-divider"></div>
        <div class="sl-status-center-stat">PUNTOS DE CLASIFICACIÓN: <b>${leaderPts}</b></div>
        <div class="sl-status-divider"></div>
        <div class="sl-status-center-stat" style="font-size:0.95em;">
            <div>REDUCCIÓN DE DAÑO FÍSICO: <b>${physRed}%</b></div>
            <div style="margin-top:4px;">REDUCCIÓN DE DAÑO MÁGICO: <b>${magRed}%</b></div>
        </div>
        <div class="sl-status-divider"></div>
        <div class="sl-status-center-stat" style="font-size:0.88em; color:var(--neon-main); cursor:pointer;" onclick="openArcProtocolsModal()">
            🔍 PROTOCOLOS OCULTOS DESCUBIERTOS: <b>${discCount} / 15</b> (TOCA PARA ABRIR)
        </div>
    `;
} 

/* ==========================================================================
   2. DRENAJE VISUAL RÁPIDO DE MANÁ (HUD Y MAZMORRA EN TIEMPO REAL)
   ========================================================================== */
function consumeMPFast(amount, onComplete) {
    if (!p) return false;
    let currentMP = p.mp !== undefined ? p.mp : 0;
    if (currentMP < amount) {
        systemNotify(`💧 Maná insuficiente en el núcleo (${Math.floor(currentMP)}/${amount} MP).`, "danger");
        return false;
    }

    if (window.mpFastInterval) clearInterval(window.mpFastInterval);

    let steps = 25;
    let drainPerStep = amount / steps;
    let count = 0;

    let mpBar = document.getElementById('mp-bar');
    if (mpBar) mpBar.style.boxShadow = '0 0 20px #d946ef';

    window.mpFastInterval = setInterval(() => {
        p.mp = Math.max(0, p.mp - drainPerStep);
        count++;

        let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
        if (mpBar) mpBar.style.width = `${Math.max(0, Math.min(100, (p.mp / maxMP) * 100))}%`;
        safeSetText('mp-text', `${p.mp.toFixed(2)}/${maxMP}`);
        if (typeof syncRaidVitalsUI === 'function') syncRaidVitalsUI();

        if (count >= steps || p.mp <= 0) {
            clearInterval(window.mpFastInterval);
            p.mp = Math.round(p.mp * 100) / 100;
            if (mpBar) mpBar.style.boxShadow = '';
            updateHUD();
            saveData();
            if (typeof onComplete === 'function') onComplete();
        }
    }, 40);

        return true;
}

function animateSPChange(deltaAmount, onComplete) {
    if (!p) return;
    if (window.spFastInterval) clearInterval(window.spFastInterval);

    let targetSP = Math.max(0, Math.min(100, p.sp + deltaAmount));
    let totalDiff = targetSP - p.sp;
    if (Math.abs(totalDiff) < 0.1) {
        if (typeof onComplete === 'function') onComplete();
        return;
    }

    let steps = 22;
    let stepVal = totalDiff / steps;
    let count = 0;

    let spBar = document.getElementById('sp-bar');
    if (spBar) spBar.style.boxShadow = deltaAmount < 0 ? '0 0 18px #ff2a55' : '0 0 18px #00ffcc';

    window.spFastInterval = setInterval(() => {
        p.sp = Math.max(0, Math.min(100, p.sp + stepVal));
        count++;

        if (spBar) spBar.style.width = `${p.sp}%`;
        safeSetText('sp-text', `${Math.floor(p.sp)}/100`);
        if (typeof syncRaidVitalsUI === 'function') syncRaidVitalsUI();

        if (count >= steps) {
            clearInterval(window.spFastInterval);
            p.sp = Math.round(targetSP);
            if (spBar) spBar.style.boxShadow = '';
            updateHUD();
            saveData();
            if (typeof onComplete === 'function') onComplete();
        }
    }, 38);
}

/* ==========================================================================
   3. MOTOR DE VOZ IA TIPO CHATGPT EN LA BARRA SUPERIOR (COOLDOWN 5 SEGUNDOS)
   ========================================================================== */
let aiTypewriterTimer = null;
let lastAiCommentTime = 0;
const AI_COOLDOWN_MS = 5000;

function typeWriterMessage(text, elementId = 'sys-message', speed = 20) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (aiTypewriterTimer) clearInterval(aiTypewriterTimer);

    el.style.opacity = 1;
    el.style.whiteSpace = "normal";
    el.style.wordBreak = "break-word";
    el.textContent = "";
    let i = 0;

    aiTypewriterTimer = setInterval(() => {
        i++;
        el.textContent = text.slice(0, i);
        if (i >= text.length) {
            clearInterval(aiTypewriterTimer);
            aiTypewriterTimer = null;
        }
    }, speed);
}

function formatAiTemplate(rawStr) {
    if (!p) return rawStr;
    let now = new Date();
    let timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;

    return rawStr
        .replace(/\{time\}/g, timeStr)
        .replace(/\{hp\}/g, p.hp.toFixed(1))
        .replace(/\{maxHp\}/g, maxHP)
        .replace(/\{sp\}/g, Math.floor(p.sp))
        .replace(/\{mp\}/g, Math.floor(p.mp || 0))
        .replace(/\{level\}/g, p.level)
        .replace(/\{gold\}/g, Math.floor(p.gold))
        .replace(/\{crystals\}/g, Math.floor(p.crystals || 0))
        .replace(/\{streak\}/g, p.perfectDays || 0)
        .replace(/\{missions\}/g, p.totalMissions || 0)
        .replace(/\{str\}/g, p.stats.str.toFixed(2))
        .replace(/\{int\}/g, p.stats.int.toFixed(2))
        .replace(/\{agi\}/g, p.stats.agi.toFixed(2));
}

let recentAiLinesHistory = [];

function triggerAiMonarchComment(contextKey = null, forceManual = false) {
    if (typeof SYSTEM_AI_LINES === 'undefined') return;

    let now = Date.now();
    if (!forceManual && (now - lastAiCommentTime < AI_COOLDOWN_MS)) {
        return;
    }
    lastAiCommentTime = now;

    let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let activeMissionsCount = (p && p.activeMissions) ? Object.keys(p.activeMissions).length : 0;
    let isIdleFull = p && !p.penaltyActive && p.hp >= (maxHP * 0.95) && p.sp >= 95 && activeMissionsCount === 0;

    let pool = [];
    if (p && p.penaltyActive) {
        pool = SYSTEM_AI_LINES.penalty;
    } else if (p && p.hp <= 35 && Math.random() < 0.65) {
        pool = SYSTEM_AI_LINES.critical_hp;
    } else if (contextKey && SYSTEM_AI_LINES[contextKey] && contextKey !== 'ai_thoughts') {
        // Si cambiaste a la pestaña de rutina y no has iniciado nada con todo al 100%, mezclar con frases de calma
        if (contextKey === 'tab_routine' && isIdleFull && SYSTEM_AI_LINES.idle_calm) {
            pool = [...SYSTEM_AI_LINES.tab_routine, ...SYSTEM_AI_LINES.idle_calm];
        } else {
            pool = SYSTEM_AI_LINES[contextKey];
        }
    } else {
        // Rotación automática o toque en la barra superior: combina Hora + Pensamientos + Estado Calma
        let h = new Date().getHours();
        let timePool = (h >= 5 && h < 12) ? SYSTEM_AI_LINES.morning : ((h >= 12 && h < 19) ? SYSTEM_AI_LINES.afternoon : SYSTEM_AI_LINES.night);
        pool = [...(SYSTEM_AI_LINES.ai_thoughts || []), ...(timePool || [])];

        if (isIdleFull && SYSTEM_AI_LINES.idle_calm) {
            pool.push(...SYSTEM_AI_LINES.idle_calm);
        }
        if (p && p.sp <= 40 && SYSTEM_AI_LINES.stamina_status) {
            pool.push(...SYSTEM_AI_LINES.stamina_status);
        }
    }

    if (!pool || pool.length === 0) pool = SYSTEM_AI_LINES.ai_thoughts;

    // Filtro anti-repetición de las últimas 25 frases
    let available = pool.filter(line => !recentAiLinesHistory.includes(line));
    if (available.length === 0) {
        recentAiLinesHistory = [];
        available = pool;
    }

    let rawLine = available[Math.floor(Math.random() * available.length)];
    recentAiLinesHistory.push(rawLine);
    if (recentAiLinesHistory.length > 25) recentAiLinesHistory.shift();

    let finalLine = formatAiTemplate(rawLine);
    typeWriterMessage(finalLine, 'sys-message', 18);
}
function initAiBootScreen() {
    if (document.getElementById('ai-boot-overlay')) return;

    let todayBootKey = new Date().toDateString();
    if (localStorage.getItem('SL_BootShownDay') === todayBootKey) {
        return; // Ya se mostró hoy: entra directo a la app sin molestar
    }
    localStorage.setItem('SL_BootShownDay', todayBootKey);

    let h = new Date().getHours();
    let greetingCategory = 'morning';
    if (h >= 12 && h < 19) greetingCategory = 'afternoon';
    else if (h >= 19 || h < 5) greetingCategory = 'night';

    let greetPool = (p && p.hp <= 35) ? SYSTEM_AI_LINES.critical_hp : (SYSTEM_AI_LINES[greetingCategory] || SYSTEM_AI_LINES.morning);
    let rawGreeting = greetPool[Math.floor(Math.random() * greetPool.length)];
    let bootText = formatAiTemplate(rawGreeting);

    const overlay = document.createElement('div');
    overlay.id = 'ai-boot-overlay';
      overlay.innerHTML = `
        <div class="sl-holo-frame boot-holo-modal" style="width:100%; max-width:395px;">
            <div class="sl-holo-rail top">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
            <div class="sl-holo-glass" style="padding:18px 16px;">
                <span class="sl-corner tl"></span><span class="sl-corner tr"></span>
                <span class="sl-corner bl"></span><span class="sl-corner br"></span>
                <div class="sl-holo-inner-box" style="padding:22px 16px;">
                    <div class="sl-holo-header-row" style="margin-bottom:18px;">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect">NOTIFICACIÓN</div>
                    </div>
                    <div class="ai-boot-message" id="ai-boot-text" style="text-align:center; font-family:'Rajdhani', sans-serif; font-size:1.12em; color:#f8fafc; min-height:75px;"></div>
                    <button class="btn btn-main" style="width:100%; padding:12px; font-size:0.95em; margin-top:14px;" onclick="dismissAiBootScreen()">⚡ ACEPTAR DIRECTIVA</button>
                </div>
            </div>
            <div class="sl-holo-rail bottom">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const textEl = document.getElementById('ai-boot-text');
    if (textEl) {
        let idx = 0;
        function typeBoot() {
            if (idx < bootText.length) {
                idx++;
                textEl.innerHTML = bootText.slice(0, idx) + '<span class="ai-cursor"></span>';
                setTimeout(typeBoot, 18);
            }
        }
        setTimeout(typeBoot, 250);
    }
}

function dismissAiBootScreen() {
    const ov = document.getElementById('ai-boot-overlay');
    if (ov) {
        ov.classList.add('boot-fade-out');
        setTimeout(() => ov.remove(), 650);
    }
}

/* ==========================================================================
   4. ACTUALIZACIÓN DEL HUD Y SEGURO DE MUERTE EN 0 HP
   ========================================================================== */
function updateHUD() {
    if (!p) return;

    // SEGURO CRÍTICO: Si la vida llega a 0 y no está penalizado, forzar muerte de inmediato
    if (p.hp <= 0 && !p.penaltyActive) {
        p.hp = 0;
        if (typeof triggerDeath === "function") {
            triggerDeath("Colapso vital absoluto detectado por el Sistema.", "routine");
        }
        return;
    }

    document.body.classList.toggle('penalty-active', !!p.penaltyActive);

    let navItems = document.querySelectorAll('.nav-item');
    [1, 4, 5].forEach(i => {
        if (navItems[i]) navItems[i].classList.toggle('locked-nav', !!p.penaltyActive);
    });
    
    let now = Date.now();
    let currentDayStr = new Date().toDateString();

    let maxHP = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
    if (p.hp <= maxHP) p.magmaOverheal = false;
    
    let displayHp = (p.hp % 1 === 0) ? p.hp : p.hp.toFixed(1);
    
    safeSetText('lvl-display', p.level);
    safeSetText('xp-text', `${Math.floor(p.xp)}/${p.maxXp}`);
    safeSetText('hp-text', `${displayHp}/${maxHP}`);
    safeSetText('sp-text', `${Math.floor(p.sp)}/100`);
    safeSetText('gold-display', Math.floor(p.gold));
    safeSetText('crystal-display', Math.floor(p.crystals || 0));

    let goldTxtEl = document.querySelector('.gold-txt');
    if (goldTxtEl) {
        if (p.starStreamNext) {
            goldTxtEl.style.color = '#00ffff';
            goldTxtEl.style.textShadow = '0 0 15px #00ffff';
        } else if (p._arcGildedUntil && now < p._arcGildedUntil) {
            goldTxtEl.style.color = '#fde047';
            goldTxtEl.style.textShadow = '0 0 18px #f59e0b';
        } else {
            goldTxtEl.style.color = '';
            goldTxtEl.style.textShadow = '';
        }
    }
    
    let xpBar = document.getElementById('xp-bar'); 
    if (xpBar) {
        xpBar.style.width = `${Math.min(100, (p.xp / p.maxXp) * 100)}%`;
        xpBar.classList.toggle('arc-st-01', !!(p._arcPrismUntil && now < p._arcPrismUntil));
        if (p.voidXpBuffUntil && now < p.voidXpBuffUntil) {
            xpBar.style.background = 'linear-gradient(90deg, #7928ca, #ff0080)';
            xpBar.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.7)';
        } else {
            xpBar.style.background = '';
            xpBar.style.boxShadow = '';
        }
    }
    
 let hpBar = document.getElementById('hp-bar');
    let hpWrapEl = document.getElementById('hp-wrap');
    if (hpWrapEl) {
        hpWrapEl.classList.toggle('mercy-emerald-halo', p.mercyActive === currentDayStr);
    }
    if (hpBar) {
        hpBar.style.width = `${Math.max(0, Math.min(100, (p.hp / maxHP) * 100))}%`;
        hpBar.classList.toggle('arc-st-02', !!(p._arcEclipseActive && now < p._arcEclipseActive));
        if (p.hp > maxHP || p.magmaOverheal) {
            hpBar.style.background = 'linear-gradient(90deg, #ff4500, #ffcc00)';
            hpBar.style.boxShadow = '0 0 14px rgba(255, 102, 0, 0.75)';
} else if (p.mercyActive === currentDayStr) {
            // Interior 100% Rojo Sangre limpio sin brillo verde adentro
            hpBar.style.background = 'linear-gradient(90deg, #990022, #ff2a55)';
            hpBar.style.boxShadow = 'none';
        } else if (p.cryoBuffUntil && now < p.cryoBuffUntil) {
            hpBar.style.background = 'linear-gradient(90deg, #990022, #ff2a55, #38bdf8)';
            hpBar.style.boxShadow = '0 0 12px rgba(56, 189, 248, 0.5)';
        } else {
            hpBar.style.background = ''; 
            hpBar.style.boxShadow = '';
        }
    }

    let spBar = document.getElementById('sp-bar'); 
    if (spBar) {
        spBar.style.width = `${Math.max(0, Math.min(100, p.sp))}%`;
        spBar.classList.toggle('arc-st-03', !!(p._arcOverdriveUntil && now < p._arcOverdriveUntil));
        if (p.entropyBuffUntil && now < p.entropyBuffUntil) {
            spBar.style.background = 'linear-gradient(90deg, #00ffcc, #0099ff)';
            spBar.style.boxShadow = '0 0 15px rgba(0, 255, 204, 0.5)';
        } else {
            spBar.style.background = '';
            spBar.style.boxShadow = '';
        }
    }

    let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000; 
      let currentMP = p.mp !== undefined ? p.mp : 0;
  let displayMp = (currentMP % 1 === 0) ? currentMP.toFixed(0) : currentMP.toFixed(1);
    
let hasUnlockedAnyShadow = p.shadowArmy && ['igris', 'tank', 'iron', 'tusk', 'beru'].some(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);

    safeSetText('mp-text', `${displayMp}/${maxMP}`);
    let mpBar = document.getElementById('mp-bar'); 
    if (mpBar) {
        mpBar.style.width = `${Math.max(0, Math.min(100, (currentMP / maxMP) * 100))}%`;
        mpBar.classList.toggle('arc-st-04', !!(p.zeroMpDrainUntil && now < p.zeroMpDrainUntil));
        let hudMpTile = mpBar.closest('.vital-tile');
        if (hudMpTile) hudMpTile.style.display = hasUnlockedAnyShadow ? 'block' : 'none';
    }
    let raidMpBarEl = document.getElementById('raid-mp-bar');
    if (raidMpBarEl && raidMpBarEl.closest('.raid-vital-row')) {
        raidMpBarEl.closest('.raid-vital-row').style.display = hasUnlockedAnyShadow ? 'grid' : 'none';
    }

    let hpWrap = document.getElementById('hp-wrap');
    if (hpWrap) { 
        if (p.hp <= 30) hpWrap.classList.add('pulse-danger'); 
        else hpWrap.classList.remove('pulse-danger'); 
    }

    let overlay = document.getElementById('damage-overlay');
    if (overlay) {
        overlay.style.display = p.penaltyActive ? 'block' : 'none';
    }

    if (p.stats) {
        safeSetText('stat-int', p.stats.int.toFixed(2));
        safeSetText('stat-str', p.stats.str.toFixed(2));
        safeSetText('stat-agi', p.stats.agi.toFixed(2));
    }

    safeSetText('prof-streak', `${p.perfectDays} Días`);
    safeSetText('prof-missions', p.totalMissions || 0);
        // Inyectar botón de Historial de 10 Notificaciones en la barra superior
    let sysBarEl = document.querySelector('.sys-log');
    if (sysBarEl && !document.getElementById('btn-notif-log')) {
        let logBtn = document.createElement('button');
        logBtn.id = 'btn-notif-log';
        logBtn.className = 'btn btn-blue';
        logBtn.style.cssText = 'margin-left:auto; padding:3px 8px; font-size:0.72em; flex-shrink:0;';
        logBtn.innerText = '📜 10';
        logBtn.onclick = (ev) => { ev.stopPropagation(); openNotifHistoryModal(); };
        sysBarEl.appendChild(logBtn);
    }

    // Inyectar fila interactiva de Protocolos Ocultos (X/15) en el Perfil
    let profMissionsEl = document.getElementById('prof-missions');
    if (profMissionsEl && profMissionsEl.parentElement && !document.getElementById('prof-arc-row')) {
        let parentCard = profMissionsEl.parentElement.parentElement;
        profMissionsEl.parentElement.className = 'stat-row';
        let arcRow = document.createElement('div');
        arcRow.id = 'prof-arc-row';
        arcRow.className = 'stat-row-last';
        arcRow.style.cursor = 'pointer';
        arcRow.onclick = openArcProtocolsModal;
        parentCard.appendChild(arcRow);
    }
    let arcRowEl = document.getElementById('prof-arc-row');
    if (arcRowEl) {
        let discCount = Array.isArray(p.discoveredArcs) ? p.discoveredArcs.length : 0;
        arcRowEl.innerHTML = `<span>Protocolos Ocultos (Toca para ver):</span><span style="color:var(--neon-main); font-weight:700; font-size:1.1em; text-decoration:underline;">🔮 ${discCount} / 15</span>`;
    }

    if (p.history) {
        safeSetText('history-deaths', p.history.deaths);
        safeSetText('history-gold-lost', `${p.history.goldLost} G`);
        safeSetText('history-items-broken', p.history.itemsBroken);
    }

    if (p.timeStats) {
        safeSetText('time-work', formatTime(p.timeStats.work || 0));
        safeSetText('time-study', formatTime(p.timeStats.study || 0));
        safeSetText('time-traffic', formatTime(p.timeStats.traffic || 0));
    }

    if (typeof _evalArcHudHook === 'function') _evalArcHudHook();
    if (typeof checkPassiveTitlesUnlock === 'function') checkPassiveTitlesUnlock();
    if (typeof renderStatusRadarProfile === 'function') renderStatusRadarProfile();
    if (typeof syncRaidVitalsUI === 'function') syncRaidVitalsUI();
    if (typeof renderShadowSanctuary === 'function') renderShadowSanctuary();
    if (typeof renderTitles === 'function') renderTitles();
}

/* ==========================================================================
   5. SANTUARIO, ESCÁNER DE JEFES Y CÁMARA DE FOCUS BLINDADA
   ========================================================================== */
function feedIgris() { 
    if (p.crystals >= 1) { 
        p.crystals -= 1; 
        p.shadowArmy.igris.level++; 
        updateHUD(); 
        saveData();
        systemNotify(`⚔️ El vínculo se fortalece: Comandante Igris ascendió a Nivel ${p.shadowArmy.igris.level}.`, "purple"); 
    } else { 
        systemNotify("Cristales de Maná insuficientes.", "danger"); 
    } 
}

function addBoss(title, rank, xp, gold) {
    if (!p.bosses) p.bosses = [];
    p.bosses.push({
        id: Date.now(),
        title: title,
        rank: rank,
        xp: xp,
        gold: gold,
        start: null
    });
    saveData();
    if (typeof renderBosses === 'function') renderBosses();
    systemNotify(`💀 Amenaza Rango ${rank} registrada: [${title}]`, "danger");
}

function addSmartBoss() {
    let n = document.getElementById('boss-name').value.trim(); 
    if (!n) return; 
    let t = n.toLowerCase(); 
    let r, xp, g;
    
    if (["final", "proyecto", "grabar", "edición", "tesis", "parcial"].some(k => t.includes(k))) { r = 'S'; xp = 250; g = 120; } 
    else if (["ensayo", "estudiar", "tarea", "exposición", "investigar"].some(k => t.includes(k))) { r = 'A'; xp = 120; g = 60; } 
    else if (["agua", "ropa", "basura", "limpiar", "ordenar", "cuarto"].some(k => t.includes(k))) { r = 'C'; xp = 40; g = 20; } 
    else { r = 'B'; xp = 70; g = 35; }
    
    addBoss(n, r, xp, g);
    closeModal('boss-modal'); 
    document.getElementById('boss-name').value = ''; 
}

let studyStartedAt = 0;
let studySessionCompleted = false;

function startStudy(mins) {
    if (p.penaltyActive) {
        systemNotify("SISTEMA BLOQUEADO. Cumple tu castigo primero.", "danger");
        return;
    }

    if (studySessionCompleted && totalStudyTime === mins) {
        closeModal('study-modal');
        let baseXP = totalStudyTime === 5 ? 50 : 180; 
        let baseGold = totalStudyTime === 5 ? 20 : 80;
        openSealModal({ type: 'study', mins: totalStudyTime, xp: baseXP, gold: baseGold });
        return;
    }
    
    clearInterval(studyTimer); 
    totalStudyTime = mins; 
    studySessionCompleted = false;

    let spCost = mins === 5 ? 15 : 40; 
    if (p.bypassFatigue) {
        spCost = 0;
        p.bypassFatigue = false;
        systemNotify("🧠 Bypass de Fatiga consumido: 0 SP gastados.", "purple");
    } else if (p.entropyBuffUntil && Date.now() < p.entropyBuffUntil) {
        spCost = -10;
    } else if (p.spDiscountUntil && Date.now() < p.spDiscountUntil) {
        spCost = Math.floor(spCost * 0.5);
    }

    if (spCost > 0 && p.sp < spCost) { 
        p.hp = Math.max(0, p.hp - 15); 
        updateHUD(); 
        systemNotify("Estamina mental insuficiente para la inmersión. -15 HP.", "danger"); 
        if (p.hp <= 0 && typeof triggerDeath === 'function') {
            triggerDeath("Colapso físico al forzar una sesión de estudio cognitiva sin SP.", "routine");
        }
        return; 
    }

    p.sp = Math.min(100, p.sp - spCost); 
    updateHUD(); 
    saveData();
    
    document.getElementById('study-options').style.display = 'none'; 
    document.getElementById('btn-study-close').style.display = 'none'; 
    
    let stopBtn = document.getElementById('btn-study-stop');
    if (stopBtn) {
        stopBtn.style.display = 'block';
        stopBtn.className = 'btn btn-red';
        stopBtn.innerText = '⚠️ INTERRUMPIR SESIÓN (-10 HP)';
    }
    
    let timerText = document.getElementById('study-timer-text');
    if (timerText) {
        timerText.style.color = "var(--neon-main)"; 
        timerText.style.textShadow = "0 0 20px rgba(0, 210, 255, 0.4)";
    }
    
    studyStartedAt = Date.now();
    
    studyTimer = setInterval(() => {
        let sec = Math.floor((Date.now() - studyStartedAt) / 1000);
        
        if (sec >= totalStudyTime * 60) { 
            sec = totalStudyTime * 60; 
            studySessionCompleted = true;
            if (timerText) {
                timerText.style.color = "var(--success)"; 
                timerText.style.textShadow = "0 0 20px rgba(0, 255, 204, 0.6)"; 
            }
            if (stopBtn) {
                stopBtn.className = 'btn btn-gold';
                stopBtn.innerText = '⚔️ SELLAR NÚCLEO DE ENFOQUE (+MP)';
            }
            clearInterval(studyTimer); 
            systemNotify("Inmersión Cognitiva completada. Toca el botón dorado para sellar.", "gold"); 
        }
        
        let m = String(Math.floor(sec / 60)).padStart(2, '0'); 
        let s = String(sec % 60).padStart(2, '0'); 
        if (timerText) timerText.innerText = `${m}:${s}`;
    }, 1000); 
}

function stopStudy() {
    clearInterval(studyTimer); 
    
    document.getElementById('study-options').style.display = 'block'; 
    document.getElementById('btn-study-close').style.display = 'block'; 
    document.getElementById('btn-study-stop').style.display = 'none';
    
    let elapsedSecs = Math.floor((Date.now() - studyStartedAt) / 1000);
    let requiredSecs = Math.floor((totalStudyTime * 60) * 0.9);
    let beruBypass = p && p.beruSpeedUntil && Date.now() < p.beruSpeedUntil;

    closeModal('study-modal'); 

    if (!studySessionCompleted && !beruBypass && elapsedSecs < requiredSecs) {
        p.hp = Math.max(0, p.hp - 10);
        updateHUD();
        saveData();
        systemNotify("Concentración rota antes de tiempo. Sesión abortada: -10 HP.", "danger");
        if (p.hp <= 0 && typeof triggerDeath === 'function') {
            triggerDeath("Colapso mental por interrumpir reiteradamente la Cámara de Focus.", "routine");
        }
        return;
    }
    
    studySessionCompleted = false;
    let baseXP = totalStudyTime === 5 ? 50 : 180; 
    let baseGold = totalStudyTime === 5 ? 20 : 80; 
    
    if (typeof openSealModal === 'function') {
        openSealModal({ 
            type: 'study',
            mins: totalStudyTime,
            xp: baseXP, 
            gold: baseGold 
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sysBar = document.querySelector('.sys-log');
    if (sysBar) {
        sysBar.style.cursor = 'pointer';
        sysBar.addEventListener('click', () => {
            if (typeof _evalArcPulseClick === 'function') _evalArcPulseClick();
            if (typeof triggerAiMonarchComment === 'function') triggerAiMonarchComment('ai_thoughts');
        });
    }

    // Activar la pantalla de bienvenida estilo IA al abrir la app
    if (typeof initAiBootScreen === 'function') {
        setTimeout(initAiBootScreen, 350);
    }

    // Inicializar la barra superior con el primer mensaje conversacional de la IA
    setTimeout(() => {
        if (typeof triggerAiMonarchComment === 'function') triggerAiMonarchComment();
    }, 1200);

    // Rotar comentarios de la IA cada 45 segundos para que siempre esté viva la barra superior
    setInterval(() => {
        if (typeof triggerAiMonarchComment === 'function' && !p.penaltyActive) {
            triggerAiMonarchComment();
        }
    }, 45000);
});

/* ==========================================================================
   6. CINEMÁTICA OFICIAL DE CAMBIO DE CLASE Y DESPERTAR DE TÍTULOS (MANHWA)
   ========================================================================== */
function playJobChangeCinematic(leadText = "TU CLASE HA CAMBIADO", oldName = "NINGUNA", newName = "NIGROMANTE") {
    let existing = document.getElementById('sl-job-change-overlay');
    if (existing) existing.remove();

    let cornerSVG = (typeof getBaroqueCornerSVG === "function") ? getBaroqueCornerSVG() : '';
    let ov = document.createElement('div');
    ov.id = 'sl-job-change-overlay';
    ov.innerHTML = `
        <div class="sl-holo-frame monarch-purple" style="width:100%; max-width:410px; pointer-events:auto;">
            <div class="sl-holo-rail top">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="padding:22px 16px;">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div class="sl-holo-header-row" style="margin-bottom:12px;">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect">DESPERTAR DEL SISTEMA</div>
                    </div>
                    <div class="sl-job-seq-box">
                        <div class="sl-job-lead-text" id="job-seq-lead"></div>
                        <div class="sl-job-old-bracket" id="job-seq-old">[ ${oldName} ]</div>
                        <div class="sl-job-chevrons" id="job-seq-chev"><span>∨</span><span>∨</span></div>
                        <div class="sl-job-new-awakening" id="job-seq-new">${newName}</div>
                    </div>
                </div>
            </div>
            <div class="sl-holo-rail bottom">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
        </div>
    `;
    document.body.appendChild(ov);

    let leadEl = document.getElementById('job-seq-lead');
    let oldEl = document.getElementById('job-seq-old');
    let chevEl = document.getElementById('job-seq-chev');
    let newEl = document.getElementById('job-seq-new');

    let i = 0;
    let typeTimer = setInterval(() => {
        i++;
        if (leadEl) leadEl.textContent = leadText.slice(0, i);
        if (i % 2 === 0 && typeof playSystemSound === "function") playSystemSound('type');
        if (i >= leadText.length) {
            clearInterval(typeTimer);
            setTimeout(() => {
                if (oldEl) oldEl.classList.add('visible');
                if (typeof playSystemSound === "function") playSystemSound('step_arrow');
            }, 300);
            setTimeout(() => {
                if (chevEl) chevEl.classList.add('visible');
                if (typeof playSystemSound === "function") playSystemSound('step_arrow');
            }, 750);
            setTimeout(() => {
                if (newEl) newEl.classList.add('awaken-slam');
                if (typeof playSystemSound === "function") playSystemSound('monarch_awakening');
                if (navigator.vibrate) navigator.vibrate([90, 50, 220]);
            }, 1300);
            setTimeout(() => {
                ov.style.transition = 'opacity 0.5s ease';
                ov.style.opacity = '0';
                setTimeout(() => ov.remove(), 520);
            }, 4300);
        }
    }, 32);

    ov.onclick = () => {
        clearInterval(typeTimer);
        ov.remove();
    };
}