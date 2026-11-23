/* ==========================================================================
   UI.JS - INTERFAZ, SEGURIDAD DE MUERTE, IA DEL MONARCA Y TERMINAL DE ARRANQUE
   ========================================================================== */

const _animatedNumCache = {};
const _bracketFlipCache = {};

function renderMechanicalFlipMarkup(prevStr, nextStr) {
    // Si cambia la estructura (ej. pasa de 1 dígito a 2 dígitos en corchetes), animar solo los dígitos en la misma posición de derecha a izquierda
    let maxLen = Math.max(prevStr.length, nextStr.length);
    let pPad = prevStr.padStart(maxLen, ' ');
    let nPad = nextStr.padStart(maxLen, ' ');
    let out = '';

    for (let i = 0; i < maxLen; i++) {
        let cOld = pPad[i];
        let cNew = nPad[i];
        if (cNew === ' ') continue;
        if (cOld !== cNew && /\d/.test(cNew) && /\d/.test(cOld)) {
            out += `<span class="sl-digit-slot"><span class="sl-digit-track"><span class="sl-digit-old">${cOld}</span><span class="sl-digit-new">${cNew}</span></span></span>`;
        } else if (cOld === ' ' && /\d/.test(cNew)) {
            out += `<span class="sl-digit-slot"><span class="sl-digit-track"><span class="sl-digit-old">0</span><span class="sl-digit-new">${cNew}</span></span></span>`;
        } else {
            out += `<span class="sl-digit-slot sl-digit-static">${cNew}</span>`;
        }
    }
    return out;
}

const _flipCleanTimers = {};
const _bracketCleanTimers = {};

function safeSetText(id, text) {
    let el = document.getElementById(id);
    if (!el) return;
    let nextStr = String(text);
    let prevStr = _animatedNumCache[id];

    if (prevStr === undefined) {
        _animatedNumCache[id] = nextStr;
        el.textContent = nextStr;
        return;
    }
    if (prevStr === nextStr) return;

    _animatedNumCache[id] = nextStr;

    const flipIds = [
        'gold-display', 'crystal-display', 'lvl-display',
        'fatigue-val', 'raid-fatigue-val'
    ];

    if (flipIds.includes(id)) {
        el.innerHTML = renderMechanicalFlipMarkup(prevStr, nextStr);
        if (_flipCleanTimers[id]) clearTimeout(_flipCleanTimers[id]);
        _flipCleanTimers[id] = setTimeout(() => {
            let currentEl = document.getElementById(id);
            if (currentEl && _animatedNumCache[id] === nextStr) {
                currentEl.textContent = nextStr;
            }
        }, 240);
    } else {
        el.textContent = nextStr;
    }
}

function setBracketCounterFlip(el, idKey, newBracketStr) {
    if (!el) return;
    let prev = _bracketFlipCache[idKey];
    if (prev === undefined || prev === newBracketStr) {
        _bracketFlipCache[idKey] = newBracketStr;
        if (!el.querySelector('.sl-digit-track')) {
            el.textContent = newBracketStr;
        }
        return;
    }
    _bracketFlipCache[idKey] = newBracketStr;
    el.innerHTML = renderMechanicalFlipMarkup(prev, newBracketStr);

    if (_bracketCleanTimers[idKey]) clearTimeout(_bracketCleanTimers[idKey]);
    _bracketCleanTimers[idKey] = setTimeout(() => {
        if (el && el.isConnected && _bracketFlipCache[idKey] === newBracketStr) {
            el.textContent = newBracketStr;
        }
    }, 240);
}


document.addEventListener('pointerdown', (e) => {
    let interactive = e.target.closest('.btn, .nav-item, .sl-goal-check-box, .grid-slot, .sonar-blip, .sl-anatomy-node');
    if (interactive && navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) {
        navigator.vibrate(14);
    }
}, { passive: true });
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
let _toastStackItems = [];

const _EMO_SRC = '(?:[\\u{1F000}-\\u{1FAFF}]|[\\u2600-\\u26FF]|[\\u2700-\\u27BF]|[\\u2B00-\\u2BFF]|[\\u2300-\\u23FF]|[\\u25A0-\\u25FF]|[\\u2190-\\u21FF]|[\\u3030\\u303D\\u3297\\u3299])(?:[\\uFE0E\\uFE0F]|[\\u{1F3FB}-\\u{1F3FF}]|\\u200D(?:[\\u{1F000}-\\u{1FAFF}]|[\\u2600-\\u27BF\\u2B50])[\\uFE0E\\uFE0F]?)*';
const _EMO_RE = new RegExp(_EMO_SRC + '\\s*', 'gu');
const _EMO_TEST = new RegExp(_EMO_SRC, 'u');

function stripAllSystemEmojis(str) {
    if (!str || typeof str !== 'string') return str;
    return str.replace(_EMO_RE, '');
}

function replaceEmojisWithVectors(str) {
    return stripAllSystemEmojis(str);
}

function vectorizeEmojisIn(root) {
    if (!root || root.nodeType !== 1) return;
    if (!root.textContent || !_EMO_TEST.test(root.textContent)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
            const par = n.parentElement;
            if (!par || par.closest('svg, script, style, textarea, noscript, .sl-digit-slot')) return NodeFilter.FILTER_REJECT;
            return _EMO_TEST.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].nodeValue = nodes[i].nodeValue.replace(_EMO_RE, '');
    }
}

function startEmojiVectorizer() {
    document.title = stripAllSystemEmojis(document.title).trim();
    vectorizeEmojisIn(document.body);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEmojiVectorizer);
} else {
    startEmojiVectorizer();
}


function scrubAllDOMVectors(root = document.body) {
    if (root) vectorizeEmojisIn(root);
}

function highlightAnimeKeywords(text) {
    let base = stripAllSystemEmojis(text || "");
    const negStatRegex = /(?<![a-záéíóúñA-ZÁÉÍÓÚÑ])(PENALIZACIÓN|CASTIGO|COLAPSO|ALERTA|PELIGRO|FALLIDA|(?:DE\s+)?EMERGENCIA|-[0-9.]+(?:\s+)?(?:HP|SP|MP|G)(?:\/(?:min|seg|m|s))?)(?![a-záéíóúñA-ZÁÉÍÓÚÑ])/gi;
    const posStatRegex = /(?<![a-záéíóúñA-ZÁÉÍÓÚÑ])(?:[+\-]?\d+(?:[\.,]\d+)?%?(?:\s+(?:de|del|la|el))?\s+(?:G|XP|EXP|MP(?:\/(?:min|seg|m|s))?|CM|HP(?:\/(?:min|seg|m|s))?|SP(?:\/(?:min|seg|m|s))?|FATIGA|STR|INT|AGI|FUE|VIT|PER|Escudo|Oro|Evasión)|CAZADORES|CAZADOR)(?![a-záéíóúñA-ZÁÉÍÓÚÑ])/gi;
    const rankRegex = /(?<![a-záéíóúñA-ZÁÉÍÓÚÑ])(JUGADOR 1|ÉXITO|NIVEL \d+|ASCENSIÓN AL NIVEL \d+|¡SURGE!|MILAGRO CONSUMADO)(?![a-záéíóúñA-ZÁÉÍÓÚÑ])/gi;

    return base
        .replace(negStatRegex, '<span style="color:#fb7185; font-weight:700; text-shadow:0 0 8px rgba(255,42,85,0.85);">$1</span>')
        .replace(posStatRegex, '<span style="color:#00e5ff; font-weight:700; text-shadow:0 0 10px rgba(0,229,255,0.8);">$&</span>')
        .replace(rankRegex, '<span style="color:#ffffff; font-weight:700; text-shadow:0 0 10px #00d2ff;">$1</span>')
        .replace(/(\[[^\]]+\])/g, '<span style="color:#7dd3fc; font-weight:700; text-shadow:0 0 8px rgba(0,210,255,0.65);">$1</span>');
}

function getBaroqueCornerSVG() {
    return `<svg viewBox="0 0 28 28" width="100%" height="100%" fill="none" stroke="#e0f2fe" stroke-width="1.6"><path d="M2 26V2h24"/><path d="M6 18V6h12"/><circle cx="6" cy="6" r="2" fill="#00d2ff"/></svg>`;
}

function isMajorMonarchNotification(msg, type) {
    if (type === "monarch_supreme") return true;
    let upper = (msg || "").toUpperCase();
    return upper.includes("CAMBIO DE CLASE") || upper.includes("CORAZÓN NEGRO") || upper.includes("SOBERANO DE LOS MUERTOS") || upper.includes("CAJA NEGRA DESCIFRADA") || upper.includes("ISLA DE JEJU") || upper.includes("PORTAL ROJO") || upper.includes("LOGRO OCULTO");
}

function _syncToastStackDepth() {
    for (let i = 0; i < _toastStackItems.length; i++) {
        let el = _toastStackItems[i].el;
        if (!el) continue;
        el.classList.remove('toast-stack-0', 'toast-stack-1', 'toast-stack-2');
        el.classList.add('toast-stack-' + Math.min(2, i));
    }
}

function dismissActiveHoloToast() {
    if (activeToastTimer) {
        clearTimeout(activeToastTimer);
        activeToastTimer = null;
    }
    const tc = document.getElementById('toast-container');
    if (!tc) return;

    const toClose = [..._toastStackItems];
    _toastStackItems = [];

    toClose.forEach((entry, idx) => {
        const frame = entry.el;
        if (!frame) return;
        if (idx === 0 && !frame.classList.contains('holo-closing')) {
            const glass = frame.querySelector('.sl-holo-glass');
            if (glass && glass.offsetHeight > 0) {
                frame.style.setProperty('--shutter-y', Math.round(glass.offsetHeight / 2) + 'px');
            }
            frame.classList.add('holo-closing');
            setTimeout(() => { if (frame && frame.parentNode) frame.remove(); }, 230);
        } else {
            frame.style.opacity = '0';
            setTimeout(() => { if (frame && frame.parentNode) frame.remove(); }, 180);
        }
    });
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

    let newSeverity = isMajorMonarchNotification(msg, type) ? 3 : (type === "danger" ? 2 : 1);
    let cleanRaw = stripAllSystemEmojis(msg || "").trim();
    let frontEntry = _toastStackItems[0] || null;
    let isConsecutiveNotif = !!frontEntry;
    let isSameAsFront = frontEntry && frontEntry.lastMsg === cleanRaw;

    // Si es exactamente el mismo mensaje repetido rápido, apila contador/línea en la tarjeta frontal sin recrear rieles
    if (isSameAsFront && frontEntry.el && frontEntry.el.isConnected) {
        frontEntry.repeatCount = (frontEntry.repeatCount || 1) + 1;
        let listEl = frontEntry.el.querySelector('.sl-holo-msg-list');
        if (listEl) {
            if (frontEntry.repeatCount <= 3) {
                listEl.insertAdjacentHTML('beforeend', `<div class="sl-holo-msg-item">${highlightAnimeKeywords(msg)}</div>`);
            } else {
                let lastLine = listEl.lastElementChild;
                if (lastLine) lastLine.innerHTML = `${highlightAnimeKeywords(msg)} <span style="color:#7dd3fc;">(x${frontEntry.repeatCount})</span>`;
            }
        }
        frontEntry.el.classList.remove('holo-pulse-update');
        void frontEntry.el.offsetWidth;
        frontEntry.el.classList.add('holo-pulse-update');
    } else {
        // Nueva ventana holográfica que se apila en 3D delante de las anteriores (como el anime)
        let themeClass = newSeverity === 3 ? "monarch-purple" : (newSeverity === 2 ? "danger" : "");
        let headerTitle = newSeverity === 3 ? "SISTEMA DEL MONARCA" : (newSeverity === 2 ? "ALERTA DE SISTEMA" : "NOTIFICACIÓN");
        let subBracket = newSeverity === 3 ? "[ DIRECTIVA DEL ABISMO ]" : (newSeverity === 2 ? "[ ADVERTENCIA CRÍTICA ]" : "");
        let cornerSVG = getBaroqueCornerSVG();

        const frame = document.createElement('div');
        frame.className = `sl-holo-frame toast-stack-0 ${themeClass}`.trim();

        let toastStartY = null;
        frame.addEventListener('pointerdown', (e) => { toastStartY = e.clientY; }, { passive: true });
        frame.addEventListener('pointermove', (e) => {
            if (toastStartY !== null && (e.clientY - toastStartY < -14)) {
                toastStartY = null;
                dismissActiveHoloToast();
            }
        }, { passive: true });
        frame.onclick = (e) => {
            e.stopPropagation();
            dismissActiveHoloToast();
        };

                        frame.innerHTML = `
            <div class="sl-holo-rail top"><span class="rail-core"></span></div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div>
                        <div class="sl-holo-header-row">
                            <div class="sl-excl-square"><span class="sl-excl-circle-inner">!</span></div>
                            <div class="sl-title-rect">${headerTitle}</div>
                        </div>
                        ${subBracket ? `<div class="sl-holo-subbracket">${subBracket}</div>` : ''}
                    </div>
                    <div class="sl-holo-msg-list">
                        <div class="sl-holo-msg-item">${highlightAnimeKeywords(msg)}</div>
                    </div>
                    <div class="sl-holo-footer-hint">[ TOCA PARA CERRAR ]</div>
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
        `;

        tc.appendChild(frame);

        // Medición única de media altura para que ambos rieles partan exactamente del centro
        const glass = frame.querySelector('.sl-holo-glass');
        if (glass && glass.offsetHeight > 0) {
            frame.style.setProperty('--shutter-y', Math.round(glass.offsetHeight / 2) + 'px');
        }

        _toastStackItems.unshift({ el: frame, lastMsg: cleanRaw, repeatCount: 1 });
        while (_toastStackItems.length > 3) {
            let oldest = _toastStackItems.pop();
            if (oldest && oldest.el && oldest.el.parentNode) oldest.el.remove();
        }
        _syncToastStackDepth();
    }

    if (isConsecutiveNotif) {
        if (typeof playSystemSound === 'function') playSystemSound('type');
    } else if (typeof playSystemSound === 'function') {
        playSystemSound(type);
    }

    if (activeToastTimer) clearTimeout(activeToastTimer);
    activeToastTimer = setTimeout(() => {
        dismissActiveHoloToast();
    }, 3800);
}

window.openSystemConfirmModal = function(title, sub, msgHtml, confirmLabel, onConfirm, themeClass = 'danger') {
    let old = document.getElementById('sl-sys-confirm-overlay');
    if (old) old.remove();
    let cornerSVG = (typeof getBaroqueCornerSVG === 'function') ? getBaroqueCornerSVG() : '';

    let ov = document.createElement('div');
    ov.id = 'sl-sys-confirm-overlay';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,18,0.92); backdrop-filter:blur(6px); z-index:14800; display:flex; justify-content:center; align-items:center; padding:18px;';
    ov.innerHTML = `
        <div class="sl-holo-frame ${themeClass}" style="width:100%; max-width:395px; cursor:default;">
            <div class="sl-holo-rail top"><span class="rail-core"></span></div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="padding:18px 16px; text-align:center;">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div class="sl-holo-header-row" style="margin-bottom:6px;">
                        <div class="sl-excl-square"><span class="sl-excl-circle-inner">!</span></div>
                        <div class="sl-title-rect">${title}</div>
                    </div>
                    ${sub ? `<div class="sl-holo-subbracket" style="margin-bottom:10px;">${sub}</div>` : ''}
                    <div style="color:#e2e8f0; font-size:0.9em; line-height:1.5; margin:12px 0 16px 0;">${msgHtml}</div>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-blue" style="flex:1;" id="sl-sys-conf-cancel">CANCELAR</button>
                        <button class="btn ${themeClass === 'danger' ? 'btn-red' : 'btn-main'}" style="flex:1.3;" id="sl-sys-conf-ok">${confirmLabel || 'CONFIRMAR'}</button>
                    </div>
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
        </div>
    `;
    document.body.appendChild(ov);
    document.getElementById('sl-sys-conf-cancel').onclick = () => ov.remove();
    document.getElementById('sl-sys-conf-ok').onclick = () => {
        ov.remove();
        if (typeof onConfirm === 'function') onConfirm();
    };
};

window.openSystemPickerModal = function(title, sub, options, selectedVal, onSelect, themeClass = '') {
    let old = document.getElementById('sl-sys-picker-overlay');
    if (old) old.remove();
    let cornerSVG = (typeof getBaroqueCornerSVG === 'function') ? getBaroqueCornerSVG() : '';

    let optsHtml = options.map((opt, idx) => {
        let isSel = String(opt.value) === String(selectedVal);
        return `
        <div class="sl-picker-option ${isSel ? 'selected' : ''}" data-pick-idx="${idx}">
            <span>${opt.label}</span>
            <span class="sl-picker-dot"></span>
        </div>`;
    }).join('');

    let ov = document.createElement('div');
    ov.id = 'sl-sys-picker-overlay';
    ov.style.cssText = 'position:fixed; inset:0; background:rgba(2,6,18,0.92); backdrop-filter:blur(6px); z-index:14850; display:flex; justify-content:center; align-items:center; padding:18px;';
    ov.innerHTML = `
        <div class="sl-holo-frame ${themeClass}" style="width:100%; max-width:405px; cursor:default;">
            <div class="sl-holo-rail top"><span class="rail-core"></span></div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="padding:16px 14px; text-align:center;">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div class="sl-holo-header-row" style="margin-bottom:4px;">
                        <div class="sl-excl-square"><span class="sl-excl-circle-inner">!</span></div>
                        <div class="sl-title-rect">${title}</div>
                    </div>
                    ${sub ? `<div class="sl-holo-subbracket">${sub}</div>` : ''}
                    <div class="sl-picker-list">${optsHtml}</div>
                    <button class="btn btn-blue" style="width:100%;" onclick="document.getElementById('sl-sys-picker-overlay').remove()">CERRAR</button>
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
        </div>
    `;
    document.body.appendChild(ov);

    ov.querySelectorAll('.sl-picker-option').forEach(el => {
        el.onclick = () => {
            let picked = options[Number(el.getAttribute('data-pick-idx'))];
            ov.remove();
            if (picked && typeof onSelect === 'function') onSelect(picked.value, picked.label);
        };
    });
};



window.openHonorLogModal = function() {
    let modal = document.getElementById('honor-log-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'honor-log-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    let logs = (p && Array.isArray(p.honorLogs)) ? p.honorLogs : [];
    let listHtml = logs.length === 0
        ? `<p style="color:var(--text-muted); text-align:center; padding:20px 0;">Aún no hay registros en tu Bitácora de Honor.</p>`
        : logs.map(item => `
            <div style="background:rgba(3, 10, 24, 0.92); border:1px solid rgba(125, 211, 252, 0.45); border-left:3px solid #7dd3fc; padding:9px 12px; margin-bottom:8px;">
                <div style="font-family:'Share Tech Mono', monospace; font-size:0.7em; color:#7dd3fc; margin-bottom:3px;">[${item.date} • ${item.time}] // ${String(item.id || '').toUpperCase()}</div>
                <div style="font-size:0.88em; color:#ffffff; line-height:1.35;">${item.note}</div>
            </div>`).join('');

    modal.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:410px;">
            <div class="sl-anime-box-header" style="margin-bottom:10px;">
                <div class="sl-anime-excl-box"><div class="sl-anime-excl-circle">!</div></div>
                <div class="sl-anime-title-box">BITÁCORA DE HONOR</div>
            </div>
            <div style="max-height:58vh; overflow-y:auto; margin:12px 0; text-align:left;">
                ${listHtml}
            </div>
            <button class="btn btn-main" style="width:100%;" onclick="closeModal('honor-log-modal')">CERRAR BITÁCORA</button>
        </div>
    `;
    modal.style.display = 'flex';
};

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

let _currentActiveTab = 'routine';
const _tabScrollMemory = {};
let _lastTabSwitchAt = 0;
let _lastTabAiAt = 0;
let _lastArcTabAt = 0;
let _tabScrollRaf = null;
const TAB_SWITCH_COOLDOWN_MS = 260;

function switchTab(tab, idx, force = false) {
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
    }

    let isPenalty = !!(p && p.penaltyActive);
    if (isPenalty && !['routine', 'inventory', 'shop'].includes(tab)) {
        systemNotify("ZONA DE PENALIZACIÓN: El Sistema ha bloqueado esta sección.", "danger");
        tab = 'routine';
        idx = 0;
    }

    if (_currentActiveTab === tab) return;

    let nowMs = Date.now();
    if (!force && !isPenalty && (nowMs - _lastTabSwitchAt < TAB_SWITCH_COOLDOWN_MS)) return;
    _lastTabSwitchAt = nowMs;

    _tabScrollMemory[_currentActiveTab] = window.scrollY || document.documentElement.scrollTop || 0;
    _currentActiveTab = tab;

    ['routine', 'bosses', 'inventory', 'shop', 'gacha', 'profile'].forEach(t => { 
        let e = document.getElementById(`tab-${t}`); 
        if (e) e.classList.add('hidden'); 
    });
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    let activeTab = document.getElementById(`tab-${tab}`); 
    if (activeTab) activeTab.classList.remove('hidden');
    
    let navItems = document.querySelectorAll('.nav-item'); 
    if (navItems[idx]) navItems[idx].classList.add('active');

    if (typeof _evalArcTabHook === 'function' && (nowMs - _lastArcTabAt >= 3000)) {
        _lastArcTabAt = nowMs;
        _evalArcTabHook(tab, idx);
    }

    if (typeof triggerAiMonarchComment === 'function' && (nowMs - _lastTabAiAt >= AI_COOLDOWN_MS)) {
        _lastTabAiAt = nowMs;
        triggerAiMonarchComment('tab_' + tab);
        if (typeof scheduleAiRotation === 'function') scheduleAiRotation(AI_ROTATION_TAB_MS);
    }

    if (tab === 'routine') {
        let rc = document.getElementById('routine-container');
        if ((!rc || !rc.childElementCount) && typeof renderRoutine === 'function') renderRoutine();
    } else if (tab === 'inventory' && typeof syncAnatomyPointerLines === 'function') {
        requestAnimationFrame(syncAnatomyPointerLines);
    } else if (tab === 'bosses') {
        let dc = document.getElementById('dungeon-list-container');
        if ((!dc || !dc.childElementCount) && typeof renderBosses === 'function') renderBosses();
    } else if (tab === 'gacha' && typeof renderShadowSanctuary === 'function') {
        renderShadowSanctuary();
        if (typeof enforceSanctuaryMonochrome === 'function') enforceSanctuaryMonochrome();
    } else if (tab === 'profile') {
        if (typeof renderStatusRadarProfile === 'function') renderStatusRadarProfile();
        if (typeof renderTitles === 'function') renderTitles();
    }

    if (_tabScrollRaf) cancelAnimationFrame(_tabScrollRaf);
    let savedScroll = _tabScrollMemory[tab] || 0;
    _tabScrollRaf = requestAnimationFrame(() => {
        _tabScrollRaf = null;
        window.scrollTo(0, savedScroll);
    });
}


function renderStatusRadarProfile() {
    let tabProf = document.getElementById('tab-profile');
    if (!tabProf || !p || !p.stats) return;

    let statusCard = document.getElementById('sl-status-master-card');
    if (!statusCard) {
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

        const _achOnlyIds = (typeof ACHIEVEMENT_ONLY_TITLE_IDS !== 'undefined')
        ? ACHIEVEMENT_ONLY_TITLE_IDS
        : ['title_min_byung_gyu', 'title_fallen_souls', 'title_legion'];
    let _equipableTitles = Array.isArray(p.titles)
        ? p.titles.filter(t => t && !t.isAchievementOnly && !_achOnlyIds.includes(t.id))
        : [];
    if (_equipableTitles.length > 1 && typeof PASSIVE_TITLES_DB !== 'undefined') {
        const _orderMap = {};
        PASSIVE_TITLES_DB.forEach((item, idx) => { _orderMap[item.id] = idx; });
        _equipableTitles.sort((a, b) => (_orderMap[a.id] ?? -1) - (_orderMap[b.id] ?? -1));
    }
    let hunterTitle = _equipableTitles.length > 0
        ? _equipableTitles[_equipableTitles.length - 1].name.replace(/^[^\wÁÉÍÓÚÑáéíóúñ¡!«"']+\s*/, '')
        : 'NINGUNO';


    let strVal = +(p.stats.str * 10).toFixed(2);
    let intVal = +(p.stats.int * 10).toFixed(2);
    let agiVal = +(p.stats.agi * 10).toFixed(2);
    let disVal = +(10 + ((p.perfectDays || 0) * 0.5) + ((p.totalMissions || 0) * 0.15)).toFixed(2);
    let spiVal = +(10 + ((p.equippedShadows ? p.equippedShadows.length : 0) * 2.5) + ((p.stats.int - 1) * 5)).toFixed(2);

    let apVal = Math.floor(strVal * 1.2 + agiVal * 0.5);
    let bearsOn = p.infantry && p.infantry.bears && !(p.infantryDisabled && p.infantryDisabled.bears);
    let defVal = Math.floor(strVal * 1.1 + (bearsOn ? p.infantry.bears * 2 : 0));

    let discCount = Array.isArray(p.discoveredArcs) ? p.discoveredArcs.length : 0;
    let bioDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    let isSleeping = (typeof isSleepingNow === "function") ? isSleepingNow() : (p.sleepingUntilMorning === bioDayStr);
    let vigilLeft = (typeof ensureNightVigilQuota === "function") ? ensureNightVigilQuota() : 2;
    let isVigilActiveTonight = (typeof isNightVigilActiveNow === "function") ? isNightVigilActiveNow() : (p.nightPassActive === bioDayStr);

    let hist = Array.isArray(p.streakHistory) ? p.streakHistory : [];
    let histKey = hist.map(x => x.status[0]).join('');

    let profSig = [
        p.playerName || 'CRISTIAN', p.level, hunterClass, hunterTitle, hunterRank,
        strVal, intVal, agiVal, disVal, spiVal, apVal, defVal, p.perfectDays || 0,
        discCount, Array.isArray(p.honorLogs) ? p.honorLogs.length : 0,
        isSleeping ? 1 : 0, isVigilActiveTonight ? 1 : 0, vigilLeft, histKey
    ].join('|');
    if (statusCard.dataset.profSig === profSig && statusCard.childElementCount > 0) return;
    statusCard.dataset.profSig = profSig;

    // Construir cadena de 14 días (si hoy ya está completo o racha >= 14, el nodo 14 también se ilumina)
    let cellsHtml = '';
    let todayListRef = (typeof getTodayMissions === 'function') ? getTodayMissions() : [];
    let todayAllDone = todayListRef.length > 0
        && Array.isArray(p.completedToday)
        && todayListRef.every(m => p.completedToday.includes(m.id))
        && !!p.studyCompletedToday;

    let padded = hist.slice(-13);
    let emptyCount = Math.max(0, 13 - padded.length);
    for (let i = 0; i < emptyCount; i++) {
        cellsHtml += `<div class="sl-streak-day-cell" title="Sin registro"></div>`;
    }
    padded.forEach(item => {
        let cls = item.status === 'perfect' ? 'st-perfect' : (item.status === 'protected' ? 'st-protected' : 'st-missed');
        cellsHtml += `<div class="sl-streak-day-cell ${cls}" title="${item.day}: ${item.status.toUpperCase()}"></div>`;
    });
    let todayNodeCls = (todayAllDone || (p.perfectDays || 0) >= 14) ? 'st-perfect' : 'st-today-active';
    cellsHtml += `<div class="sl-streak-day-cell ${todayNodeCls}" title="${todayAllDone ? 'Hoy completado' : 'Hoy en curso'}"></div>`;


    let gearSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#e0f2fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px #00e5ff);"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
    let cubeSvg = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#7dd3fc" stroke-width="2" style="margin-right:3px; filter:drop-shadow(0 0 4px #00e5ff);"><polygon points="12,2 21,7 21,17 12,22 3,17 3,7"/><circle cx="12" cy="12" r="2.5" fill="#ffffff"/></svg>`;

    statusCard.innerHTML = `
        <div class="sl-status-top-bar">
            <span style="opacity:0.9; cursor:pointer; width:48px; height:22px; display:inline-flex; align-items:center; justify-content:center; border:1px solid rgba(186,230,253,0.4); background:rgba(4,15,32,0.8);" onclick="openModal('schedule-modal')" title="Configurar Horario">${gearSvg}</span>
            <h2 class="sl-status-main-title">ESTADO</h2>
            <span style="opacity:0.9; width:48px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-size:0.65em; font-family:'Share Tech Mono', monospace; cursor:pointer; border:1px solid rgba(125,211,252,0.35); background:rgba(4,15,32,0.8);" onclick="openArcProtocolsModal()">${cubeSvg}${discCount}/15</span>
        </div>
        <div class="sl-status-divider"></div>

        <div class="sl-status-id-grid">
            <div class="sl-status-id-left">
                <div>NOMBRE: <b>${(p.playerName || 'CRISTIAN').toUpperCase()}</b></div>
                <div>NV: <b>${p.level}</b></div>
                <div>CLASE: <b>${hunterClass}</b></div>
                <div>TÍTULO: <b>${hunterTitle}</b></div>
            </div>
            <div class="sl-status-rank-box">
                <svg viewBox="0 0 100 100" width="78" height="78">
                    <polygon points="50,6 90,28 76,86 24,86 10,28" fill="none" stroke="#e0f2fe" stroke-width="1.8" opacity="0.9" filter="drop-shadow(0 0 6px #00e5ff)"/>
                    <polygon points="50,94 90,72 76,14 24,14 10,72" fill="rgba(0, 229, 255, 0.14)" stroke="#7dd3fc" stroke-width="1.8" filter="drop-shadow(0 0 8px rgba(0,229,255,0.65))"/>
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

                <div class="sl-streak-14-wrap">
            <div class="sl-streak-14-header">
                <span>CADENA DE RESONANCIA (14 DÍAS)</span>
                <span class="sl-streak-badge">${p.perfectDays || 0} INVICTO</span>
            </div>
            <div class="sl-streak-14-grid">${cellsHtml}</div>
        </div>


        <div class="sl-status-divider"></div>
        <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
            <button class="btn btn-main" style="width:100%; padding:10px; font-size:0.8em;" onclick="openHunterSkillsModal()">
                [ HABILIDADES DEL CAZADOR (PASIVAS Y ACTIVAS) ]
            </button>
            <button class="btn btn-blue" style="width:100%; padding:9px; font-size:0.76em;" onclick="openHonorLogModal()">
                [ BITÁCORA DE HONOR DEL CAZADOR (${Array.isArray(p.honorLogs) ? p.honorLogs.length : 0}) ]
            </button>
            ${isVigilActiveTonight
                ? `<div style="padding:9px 12px; background:rgba(30,41,59,0.55); border:1px solid #818cf8; text-align:center; font-size:0.78em; color:#e0f2fe;">
                    <b>PASE DE VIGILIA NOCTURNA ACTIVO HOY</b><br>
                    <span style="color:#94a3b8;">Cero corrosión hasta 11:20 PM • Misiones al 100% (${vigilLeft}/2 restantes)</span>
                   </div>`
                : `<button class="btn btn-blue" style="width:100%; padding:10px; font-size:0.78em;" onclick="openNightVigilModal()">
                    PASE DE VIGILIA NOCTURNA (${vigilLeft}/2 ESTA SEMANA)
                   </button>`}
            ${isSleeping
                ? `<div style="padding:10px; background:rgba(14,165,233,0.12); border:1px solid #7dd3fc; text-align:center;">
                    <div style="color:#e0f2fe; font-weight:700; font-size:0.85em; margin-bottom:4px;">MODO HIBERNACIÓN ACTIVO</div>
                    <div style="color:#94a3b8; font-size:0.76em; margin-bottom:8px;">Signos vitales y tesorería protegidos hasta las 4:30 AM.</div>
                    <button class="btn btn-blue" style="padding:6px 12px; font-size:0.72em;" onclick="wakeUpFromSleepMode()">Desbloquear antes de las 4:30 AM</button>
                   </div>`
                : `<button class="btn btn-main" style="width:100%; padding:11px; font-size:0.78em;" onclick="activateNightSleepMode()">
                    TERMINAR DÍA Y DORMIR (CONGELAR DRENAJE NOCTURNO)
                   </button>`}
        </div>
    `;
}
/* ==========================================================================
   2. MOTOR DE FLUJO CONTINUO 60 FPS PARA HP Y MANÁ (CERO PAUSAS)
   ========================================================================== */
let _rollingMpValue = null;
let _rollingMpRaf = null;
let _lastRenderedMpInt = null;
let _lastRenderedMpPct = null;
let _mpDomCache = null;
let _mpLastEls = {};

let _rollingHpValue = null;
let _rollingHpRaf = null;
let _lastRenderedHpStr = null;
let _lastRenderedHpPct = null;
let _hpDomCache = null;

function _getMpDomElements() {
    if (!_mpDomCache || !_mpDomCache.mpTxtEl || !_mpDomCache.mpTxtEl.isConnected) {
        _mpDomCache = {
            mpTxtEl: document.getElementById('mp-text'),
            mpBarEl: document.getElementById('mp-bar'),
            rMpTxtEl: document.getElementById('raid-mp-text'),
            rMpBarEl: document.getElementById('raid-mp-bar')
        };
    }
    return _mpDomCache;
}

function _getHpDomElements() {
    if (!_hpDomCache || !_hpDomCache.hpTxtEl || !_hpDomCache.hpTxtEl.isConnected) {
        _hpDomCache = {
            hpTxtEl: document.getElementById('hp-text'),
            hpBarEl: document.getElementById('hp-bar'),
            rHpTxtEl: document.getElementById('raid-hp-text'),
            rHpBarEl: document.getElementById('raid-hp-bar')
        };
    }
    return _hpDomCache;
}

function renderMpElementsNow(val, maxMP) {
    let dom = _getMpDomElements();
    let safeMax = Math.max(1, maxMP);
    let displayInt = Math.max(0, Math.min(safeMax, Math.round(val)));
    let pctNum = Math.max(0, Math.min(100, (val / safeMax) * 100));
    let pctStr = `${pctNum.toFixed(2)}%`;

   // Si el DOM de la barra fue reemplazado, forzar una nueva escritura de ancho y texto
let _mpSwapped = (dom.mpTxtEl !== _mpLastEls.txt) || (dom.rMpTxtEl !== _mpLastEls.rTxt) ||
                 (dom.mpBarEl !== _mpLastEls.bar) || (dom.rMpBarEl !== _mpLastEls.rBar);
if (_mpSwapped) {
    _mpLastEls = { txt: dom.mpTxtEl, rTxt: dom.rMpTxtEl, bar: dom.mpBarEl, rBar: dom.rMpBarEl };
    _lastRenderedMpInt = null;
    _lastRenderedMpPct = null;
}

if (_lastRenderedMpInt !== displayInt) {
        _lastRenderedMpInt = displayInt;
        let txt = `${displayInt}/${safeMax}`;
        if (dom.mpTxtEl) dom.mpTxtEl.textContent = txt;
        if (dom.rMpTxtEl) dom.rMpTxtEl.textContent = txt;
    }

    if (_lastRenderedMpPct !== pctStr) {
        _lastRenderedMpPct = pctStr;
        if (dom.mpBarEl) {
            dom.mpBarEl.style.transition = 'none';
            dom.mpBarEl.style.width = pctStr;
        }
        if (dom.rMpBarEl) {
            dom.rMpBarEl.style.transition = 'none';
            dom.rMpBarEl.style.width = pctStr;
        }
    }
}

function renderHpElementsNow(val, maxHP) {
    let dom = _getHpDomElements();
    let safeMax = Math.max(1, maxHP);
    let clamped = Math.max(0, val);
    let isTenacity = (clamped > 0 && clamped <= safeMax * 0.30);
    let numStr = (Math.abs(clamped - Math.round(clamped)) < 0.05)
        ? String(Math.round(clamped))
        : clamped.toFixed(1);
    let fullTxt = `${numStr}/${safeMax}${isTenacity ? ' [TENACIDAD]' : ''}`;
    let pctNum = Math.max(0, Math.min(100, (clamped / safeMax) * 100));
    let pctStr = `${pctNum.toFixed(2)}%`;

    if (_lastRenderedHpStr !== fullTxt) {
        _lastRenderedHpStr = fullTxt;
        if (dom.hpTxtEl) dom.hpTxtEl.textContent = fullTxt;
        _animatedNumCache['hp-text'] = fullTxt;
    }

    if (_lastRenderedHpPct !== pctStr) {
        _lastRenderedHpPct = pctStr;
        if (dom.hpBarEl) {
            dom.hpBarEl.style.transition = 'none';
            dom.hpBarEl.style.width = pctStr;
        }
        if (dom.rHpBarEl) {
            dom.rHpBarEl.style.transition = 'none';
            dom.rHpBarEl.style.width = pctStr;
        }
    }
}

function animateHPDisplayTo(targetHP, maxHP) {
    if (document.hidden) {
        _rollingHpValue = targetHP;
        renderHpElementsNow(targetHP, maxHP);
        return;
    }
    if (_rollingHpValue === null) {
        _rollingHpValue = targetHP;
        renderHpElementsNow(targetHP, maxHP);
        return;
    }

    let diff = targetHP - _rollingHpValue;
    if (Math.abs(diff) < 0.005) {
        _rollingHpValue = targetHP;
        renderHpElementsNow(targetHP, maxHP);
        return;
    }

    if (_rollingHpRaf) cancelAnimationFrame(_rollingHpRaf);

    let startVal = _rollingHpValue;
    let absDiff = Math.abs(diff);
    // 1050ms solapa ligeramente el tick de 1000ms para que el movimiento jamás se detenga entre segundos
    let durationMs = absDiff <= 15 ? 1050 : Math.min(500, Math.max(220, absDiff * 4));
    let startTime = performance.now();

    function stepHpFrame(now) {
        let elapsed = now - startTime;
        let t = Math.min(1, elapsed / durationMs);
        _rollingHpValue = startVal + (targetHP - startVal) * t;
        renderHpElementsNow(_rollingHpValue, maxHP);

        if (t < 1) {
            _rollingHpRaf = requestAnimationFrame(stepHpFrame);
        } else {
            _rollingHpValue = targetHP;
            _rollingHpRaf = null;
            renderHpElementsNow(targetHP, maxHP);
        }
    }
    _rollingHpRaf = requestAnimationFrame(stepHpFrame);
}
window.animateHPDisplayTo = animateHPDisplayTo;

function animateMPDisplayTo(targetMP, maxMP) {
    if (document.hidden) {
        _rollingMpValue = targetMP;
        renderMpElementsNow(targetMP, maxMP);
        return;
    }
    if (_rollingMpValue === null) {
        _rollingMpValue = targetMP;
        renderMpElementsNow(targetMP, maxMP);
        return;
    }

    let diff = targetMP - _rollingMpValue;
    if (Math.abs(diff) < 0.01) {
        _rollingMpValue = targetMP;
        renderMpElementsNow(targetMP, maxMP);
        return;
    }

    if (_rollingMpRaf) cancelAnimationFrame(_rollingMpRaf);

    let startVal = _rollingMpValue;
    let absDiff = Math.abs(diff);
    // 1050ms solapa el tick de 1000ms para que el conteo sea 100% continuo sin pausas
    let durationMs = absDiff <= 35 ? 1050 : Math.min(520, Math.max(240, absDiff * 1.1));
    let startTime = performance.now();

    function stepMpFrame(now) {
        let elapsed = now - startTime;
        let t = Math.min(1, elapsed / durationMs);
        _rollingMpValue = startVal + (targetMP - startVal) * t;
        renderMpElementsNow(_rollingMpValue, maxMP);

        if (t < 1) {
            _rollingMpRaf = requestAnimationFrame(stepMpFrame);
        } else {
            _rollingMpValue = targetMP;
            _rollingMpRaf = null;
            renderMpElementsNow(targetMP, maxMP);
        }
    }
    _rollingMpRaf = requestAnimationFrame(stepMpFrame);
}
window.animateMPDisplayTo = animateMPDisplayTo;


function consumeMPFast(amount, onComplete) {
    if (!p) return false;
    let currentMP = p.mp !== undefined ? p.mp : 0;
    if (currentMP < amount) {
        systemNotify(`Maná insuficiente en el núcleo (${Math.floor(currentMP)}/${amount} MP).`, "danger");
        return false;
    }

    let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
    let startMP = currentMP;
    let targetMP = Math.max(0, Math.round((currentMP - amount) * 100) / 100);
    p.mp = targetMP;

    if (_rollingMpRaf) cancelAnimationFrame(_rollingMpRaf);
    let dom = _getMpDomElements();
    if (dom.mpBarEl) dom.mpBarEl.style.boxShadow = '0 0 20px #d946ef';

    let durationMs = 360;
    let startTime = performance.now();

    function drainFrame(now) {
        let t = Math.min(1, (now - startTime) / durationMs);
        _rollingMpValue = startMP + (targetMP - startMP) * t;
        renderMpElementsNow(_rollingMpValue, maxMP);

        if (t < 1) {
            _rollingMpRaf = requestAnimationFrame(drainFrame);
        } else {
            _rollingMpValue = targetMP;
            _rollingMpRaf = null;
            if (dom.mpBarEl) dom.mpBarEl.style.boxShadow = '';
            renderMpElementsNow(targetMP, maxMP);
            updateHUD();
            saveData();
            if (typeof onComplete === 'function') onComplete();
        }
    }
    _rollingMpRaf = requestAnimationFrame(drainFrame);
    return true;
}

// Funciones antiguas de MP eliminadas (ahora usa el motor 60 FPS de arriba)

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
    if (aiTypewriterTimer) {
        clearInterval(aiTypewriterTimer);
        aiTypewriterTimer = null;
    }

    const sysBar = el.closest('.sys-log');
    if (document.hidden || (sysBar && sysBar.classList.contains('sys-log-collapsed'))) {
        el.textContent = text;
        return;
    }

    let censorTriggered = (Math.random() < 0.24 && text.length > 28);
    let censorWord = "";
    let censoredText = text;
    if (censorTriggered) {
        let words = text.split(' ').filter(w => w.length >= 6 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(w));
        if (words.length > 0) {
            censorWord = words[Math.floor(Math.random() * words.length)];
            censoredText = text.replace(censorWord, '[ █████ ]');
        } else {
            censorTriggered = false;
        }
    }

    let activeStream = censorTriggered ? censoredText : text;
    el.style.opacity = 1;
    el.style.whiteSpace = "normal";
    el.style.wordBreak = "break-word";
    el.textContent = "";
    let i = 0;

    aiTypewriterTimer = setInterval(() => {
        if (document.hidden || (sysBar && sysBar.classList.contains('sys-log-collapsed'))) {
            clearInterval(aiTypewriterTimer);
            aiTypewriterTimer = null;
            el.textContent = text;
            return;
        }
        i += 2;
        el.textContent = activeStream.slice(0, i);
        if (i >= activeStream.length) {
            clearInterval(aiTypewriterTimer);
            aiTypewriterTimer = null;
            if (censorTriggered) {
                setTimeout(() => {
                    if (el && el.textContent.includes('[ █████ ]')) {
                        el.classList.add('sl-km-anomaly-pulse');
                        el.textContent = text;
                        setTimeout(() => el.classList.remove('sl-km-anomaly-pulse'), 650);
                    }
                }, 520);
            }
        }
    }, speed);
}

function formatAiTemplate(rawStr) {
    if (!p || !rawStr) return rawStr || "";
    let maxH = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
    let timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return rawStr
        .replace(/\{time\}/g, timeNow)
        .replace(/\{hp\}/g, Math.floor(p.hp || 0))
        .replace(/\{maxHp\}/g, maxH)
        .replace(/\{sp\}/g, Math.floor(p.sp || 0))
        .replace(/\{mp\}/g, Math.floor(p.mp || 0))
        .replace(/\{gold\}/g, Math.floor(p.gold || 0))
        .replace(/\{crystals\}/g, Math.floor(p.crystals || 0))
        .replace(/\{level\}/g, p.level || 1)
        .replace(/\{streak\}/g, p.perfectDays || 0)
        .replace(/\{missions\}/g, p.totalMissions || 0)
        .replace(/\{str\}/g, p.stats ? p.stats.str.toFixed(2) : '1.00')
        .replace(/\{int\}/g, p.stats ? p.stats.int.toFixed(2) : '1.00')
        .replace(/\{agi\}/g, p.stats ? p.stats.agi.toFixed(2) : '1.00');
}

function triggerAiMonarchComment(forcedCategory = null) {
    if (!p || typeof SYSTEM_AI_LINES === 'undefined') return;
    let nowMs = Date.now();
    if (!forcedCategory && (nowMs - lastAiCommentTime < AI_COOLDOWN_MS)) return;
    lastAiCommentTime = nowMs;

    let maxH = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
    let cat = forcedCategory;
    if (!cat) {
        if (p.penaltyActive) cat = 'penalty';
        else if (p.hp <= maxH * 0.28) cat = 'critical_hp';
        else if (p.sp <= 25) cat = 'stamina_status';
        else if (p.hp >= maxH * 0.95 && p.sp >= 90 && (!p.activeMissions || Object.keys(p.activeMissions).length === 0) && SYSTEM_AI_LINES.idle_calm) {
            cat = 'idle_calm';
        } else {
            let h = new Date().getHours();
            cat = (h >= 5 && h < 12) ? 'morning' : ((h >= 12 && h < 19) ? 'afternoon' : 'night');
        }
    }

    let pool = SYSTEM_AI_LINES[cat] || SYSTEM_AI_LINES.ai_thoughts || ["SISTEMA DEL MONARCA EN LÍNEA."];
    let rawLine = pool[Math.floor(Math.random() * pool.length)];
    let cleanMsg = stripAllSystemEmojis(formatAiTemplate(rawLine));
    typeWriterMessage(cleanMsg, 'sys-message', 18);
}

const AI_ROTATION_NORMAL_MS = 15000; // Ritmo normal
const AI_ROTATION_TAB_MS = 12000;    // Primer comentario tras cambiar de pestaña
let aiRotationTimer = null;

// Cada cambio de pestaña reprograma el siguiente comentario en 12 s; después vuelve al ritmo de 15 s.
function scheduleAiRotation(delayMs) {
    clearTimeout(aiRotationTimer);
    aiRotationTimer = setTimeout(() => {
        const sb = document.querySelector('.sys-log');
        if (!document.hidden && p && !p.penaltyActive && (!sb || !sb.classList.contains('sys-log-collapsed'))) {
            triggerAiMonarchComment();
        }
        scheduleAiRotation(AI_ROTATION_NORMAL_MS);
    }, delayMs);
}

function initAiBootScreen() {
    if (!p || !p.dayZeroCompleted) return;
    let bioDay = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
    if (localStorage.getItem('SL_BootShownDay') === bioDay) return;
    localStorage.setItem('SL_BootShownDay', bioDay);
    triggerAiMonarchComment();
}

function getActiveBuffsList(now, currentDayStr, maxHP) {
    if (!p) return [];
    const minsLeft = (untilTs) => {
        let m = Math.max(1, Math.ceil((untilTs - now) / 60000));
        return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
    };

    let buffs = [];
        if (p.temperedBarrierCharges && p.temperedBarrierCharges > 0) buffs.push({ lbl: 'Barrera Templada', time: `${p.temperedBarrierCharges}/3 CARGAS`, alert: false, info: 'Sobrecarga de Escudo (800/800): reduce un 35% el próximo golpe antes de tocar tu escudo.' });
    if (isMercyActive()) buffs.push({ lbl: 'Piedra de la Misericordia', time: minsLeft(p.mercyUntil), alert: false, info: 'Caída nocturna extendida hasta las 2:00 AM y protección vital activa.' });
    if (p.magmaOverheal && p.hp > maxHP) buffs.push({ lbl: `Sobrecarga de Magma (${Math.round((p.hp / maxHP) * 100)}%)`, time: 'ACTIVO', alert: false, info: 'Tu HP supera temporalmente el límite máximo normal.' });
    if (p.cryoBuffUntil && now < p.cryoBuffUntil) buffs.push({ lbl: 'Suero de Cero Absoluto', time: minsLeft(p.cryoBuffUntil), alert: false, info: 'Reduce al 50% todo daño recibido.' });
    if (p.stealthModeUntil && now < p.stealthModeUntil) buffs.push({ lbl: 'Habilidad: Sigilo', time: minsLeft(p.stealthModeUntil), alert: false, info: 'Inmune a daño ambiental, 0 fatiga inicial y golpe Crítico x3 a Jefe.' });
    if (p.voidXpBuffUntil && now < p.voidXpBuffUntil) buffs.push({ lbl: 'Sangre Corrupta (EXP x2)', time: minsLeft(p.voidXpBuffUntil), alert: false, info: 'Duplica la experiencia obtenida al sellar misiones.' });
    if (p._arcPrismUntil && now < p._arcPrismUntil) buffs.push({ lbl: 'Sincronización Prismática', time: minsLeft(p._arcPrismUntil), alert: false, info: 'EXP x1.5 activa en todas tus misiones.' });
    if (p._arcGildedUntil && now < p._arcGildedUntil) buffs.push({ lbl: 'Tesorería del Arquitecto', time: minsLeft(p._arcGildedUntil), alert: false, info: 'Impuesto de oro anulado (cobras el 100%).' });
    if (p.entropyBuffUntil && now < p.entropyBuffUntil) buffs.push({ lbl: 'Reloj de Ceniza', time: minsLeft(p.entropyBuffUntil), alert: false, info: 'Desplegar misiones regenera +8 SP en lugar de gastar.' });
    if (p.spDiscountUntil && now < p.spDiscountUntil) buffs.push({ lbl: 'Estado Zen', time: minsLeft(p.spDiscountUntil), alert: false, info: 'Costo de fatiga (SP) reducido al 50%.' });
    if (p.bypassFatigue) buffs.push({ lbl: 'Bypass de Fatiga', time: '1 USO', alert: false, info: 'Tu próxima misión o sesión Focus costará 0 SP.' });
    if (p.starStreamNext || (p.starStreamCharges && p.starStreamCharges > 0)) buffs.push({ lbl: 'Patrocinio Star Stream', time: `${p.starStreamCharges || 1} CARGA(S)`, alert: false, info: 'Oro x3 + 90 G libres de impuestos en tus próximas recompensas.' });
    if (p.whiteTigerBounty) buffs.push({ lbl: 'Permiso Tigre Blanco', time: '1 USO', alert: false, info: 'Próxima misión o mazmorra paga 100% Oro + 110 G y 2 minerales.' });
    if (p.zeroMpDrainUntil && now < p.zeroMpDrainUntil) buffs.push({ lbl: 'Esencia de Sombra Líquida', time: minsLeft(p.zeroMpDrainUntil), alert: false, info: 'Tus Comandantes consumen 0 MP/min temporalmente.' });
    if (p.halfMpDrainUntil && now < p.halfMpDrainUntil) buffs.push({ lbl: 'Mineral de Alta Pureza', time: minsLeft(p.halfMpDrainUntil), alert: false, info: 'Drenaje de MP de sombras reducido al 50%.' });
   let _hasCmdBuf = p.shadowArmy && ['igris', 'tank', 'iron', 'tusk', 'beru'].some(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);
    if (p.sovereignCritDiscount && _hasCmdBuf) buffs.push({ lbl: 'Autoridad del Soberano', time: '1 USO', alert: false, info: 'La próxima Habilidad Activa de tus Sombras cuesta -50% MP.' });
    if (p.beruSpeedUntil && now < p.beruSpeedUntil) buffs.push({ lbl: 'Modo Berserker (Beru)', time: minsLeft(p.beruSpeedUntil), alert: false, info: 'Bono de oro activo y validación rápida.' });
    if (p.ironImmunityUntil && now < p.ironImmunityUntil) buffs.push({ lbl: 'Bastión Inmune', time: minsLeft(p.ironImmunityUntil), alert: false, info: '100% inmune a perder vida mientras dure el efecto.' });
    if (p.hazardImmunityUntil && now < p.hazardImmunityUntil) buffs.push({ lbl: 'Incienso de Glicinas', time: minsLeft(p.hazardImmunityUntil), alert: false, info: 'Inmune a veneno, fuego y presión ambiental.' });
    if (p.demonBloodUntil && now < p.demonBloodUntil) buffs.push({ lbl: 'Sangre de Demonio Noble', time: minsLeft(p.demonBloodUntil), alert: false, info: 'Al sellar misiones absorbes +25 HP y +200 MP adicionales.' });
    if (p.ambrosiaHalfTimeUses && p.ambrosiaHalfTimeUses > 0) buffs.push({ lbl: 'Néctar de Gobernantes', time: `${p.ambrosiaHalfTimeUses} USOS`, alert: false, info: 'Tus próximas misiones solo requieren 50% del tiempo.' });
    if (p.phoenixFeatherActive === currentDayStr) buffs.push({ lbl: 'Pluma del Fénix', time: 'HOY', alert: false, info: 'Evita una muerte hoy y te revive con 50 HP.' });
    if (p.streakShieldActive === currentDayStr) buffs.push({ lbl: 'Escudo de Racha', time: 'HOY', alert: false, info: 'Protege tu Racha Perfecta al cierre del día.' });
    if (p.contractActive === currentDayStr) buffs.push({ lbl: 'Contrato de Sangre', time: 'HOY', alert: true, info: 'Completa todo el Tablón hoy para ganar +280 G y +2 CM (o -50 HP si fallas).' });
    if (p.nightPassActive === currentDayStr && typeof isNightVigilActiveNow === 'function' && isNightVigilActiveNow()) buffs.push({ lbl: 'Pase de Vigilia Nocturna', time: 'HASTA 11:20 PM', alert: false, info: 'Cero sangrado y recompensas al 100% hasta las 11:20 PM.' });
    if (p.nextBossCrit) buffs.push({ lbl: 'Golpe Crítico Preparado', time: '1 USO', alert: false, info: 'Tu próximo ataque directo a Jefe inflige daño crítico multiplicado.' });
    if (p.nextSlashWiden) buffs.push({ lbl: 'Zona Vital Ensanchada', time: '1 USO', alert: false, info: 'Tu próximo Corte Dimensional tendrá la zona crítica más ancha.' });
    if (p.nextSlashSlow) buffs.push({ lbl: 'Corte Ralentizado', time: '1 USO', alert: false, info: 'La aguja de tu próximo Corte Dimensional irá más lenta.' });
    if (p.sageTeaFocusMp) buffs.push({ lbl: 'Infusión del Sabio', time: '1 USO', alert: false, info: 'Tu próxima sesión en Cámara de Focus otorgará +180 MP extra.' });
    if (p.redBeaconArmed) buffs.push({ lbl: 'Baliza Carmesí Armada', time: 'LISTA', alert: true, info: 'Presiona REESCANEAR en el Sonar para activar Portales de alto rango.' });
    return buffs;
}

function renderActiveBuffsStrip(now, currentDayStr, maxHP) {
    let trig = document.getElementById('sl-buff-pill-trigger');
    if (!trig) return;

    let buffs = getActiveBuffsList(now, currentDayStr, maxHP);
    let hasAlert = buffs.some(b => b.alert);
    let sig = `${buffs.length}_${hasAlert ? 1 : 0}`;
    if (trig.dataset.sig === sig) return;
    trig.dataset.sig = sig;

    if (buffs.length === 0) {
        trig.classList.remove('has-buffs', 'has-alert');
        trig.innerHTML = '';
        return;
    }

    trig.classList.add('has-buffs');
    trig.classList.toggle('has-alert', hasAlert);
    trig.innerHTML = `<span class="sl-buff-mini-diamond"></span><span>${buffs.length}</span>`;
}

window.openActiveBuffsModal = function() {
    let now = Date.now();
    let currentDayStr = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
    let maxHP = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
    let buffs = getActiveBuffsList(now, currentDayStr, maxHP);
    if (buffs.length === 0) return;

    let modal = document.getElementById('active-buffs-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'active-buffs-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }

    let rowsHtml = buffs.map(b => `
        <div class="sl-buff-modal-row ${b.alert ? 'row-alert' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:3px;">
                <span style="font-weight:700; color:#ffffff; font-size:0.88em;">${b.lbl}</span>
                <span style="font-family:'Share Tech Mono', monospace; font-size:0.68em; color:${b.alert ? '#fda4af' : '#7dd3fc'};">${b.time}</span>
            </div>
            <div style="font-size:0.78em; color:#cbd5e1; line-height:1.35;">${b.info}</div>
        </div>
    `).join('');

    modal.innerHTML = `
        <div class="modal-content sl-system-window" style="max-width:400px;">
            <div class="sl-anime-box-header" style="margin-bottom:10px;">
                <div class="sl-anime-excl-box"><div class="sl-anime-excl-circle">!</div></div>
                <div class="sl-anime-title-box">EFECTOS ACTIVOS</div>
            </div>
            <div style="max-height:56vh; overflow-y:auto; margin:10px 0;">${rowsHtml}</div>
            <button class="btn btn-main" style="width:100%;" onclick="closeModal('active-buffs-modal')">CERRAR</button>
        </div>
    `;
    modal.style.display = 'flex';
};

function updateHUD() {
    if (!p) return;
    let now = Date.now();
    let currentDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    let maxHP = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
    let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
    if (p.hp <= maxHP) p.magmaOverheal = false;

    if (p.xp >= p.maxXp) {
        while (p.xp >= p.maxXp) {
            p.level++;
            p.xp -= p.maxXp;
            p.maxXp = (typeof getRequiredXpForLevel === "function") ? getRequiredXpForLevel(p.level) : Math.floor(100 + (p.level - 1) * 18);
            maxHP = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
            maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
            p.hp = maxHP;
            p.sp = 100;
            p.mp = maxMP;
            p.crystals = (p.crystals || 0) + 2;
        }
        saveData();
        systemNotify(`¡ASCENSIÓN AL NIVEL ${p.level}! Vitalidad restaurada al 100% (+2 CM).`, "gold");
    }

       p.arcticShield = Math.min(800, Math.max(0, Math.floor(p.arcticShield || 0)));
    let shieldVal = p.arcticShield;

    safeSetText('lvl-display', p.level);
    safeSetText('xp-text', `${Math.floor(p.xp)}/${p.maxXp}`);
    animateHPDisplayTo(p.hp, maxHP);
    safeSetText('sp-text', `${Math.floor(p.sp)}/100`);
    safeSetText('gold-display', Math.floor(p.gold));
    safeSetText('crystal-display', Math.floor(p.crystals || 0));

    let shieldTagEl = document.getElementById('hud-shield-text');
    let shieldBarEl = document.getElementById('shield-bar');
    if (shieldTagEl) {
        shieldTagEl.innerText = shieldVal > 0 ? `[+${shieldVal}/800]` : '';
    }
    if (shieldBarEl) {
        shieldBarEl.style.width = '0%';
    }

    let fatigueNum = Math.max(0, Math.min(100, Math.round(100 - (p.sp !== undefined ? p.sp : 100))));
    safeSetText('fatigue-val', fatigueNum);
    let activeSegments = Math.round((fatigueNum / 100) * 12);
    let ringWidget = document.getElementById('sl-fatigue-widget');
    if (ringWidget) {
        ringWidget.classList.toggle('fatigue-critical-pulse', fatigueNum >= 100);
    }
    for (let sIdx = 0; sIdx < 12; sIdx++) {
        let segEl = document.getElementById(`fat-seg-${sIdx}`);
        if (segEl) {
            segEl.classList.toggle('active-seg', sIdx < activeSegments && fatigueNum < 80);
            segEl.classList.toggle('danger-seg', sIdx < activeSegments && fatigueNum >= 80);
        }
    }

    let goldTxtEl = document.querySelector('.gold-txt');
    if (goldTxtEl) {
        goldTxtEl.style.color = '';
        goldTxtEl.style.textShadow = '';
    }
    
        let isStealthOn = !!(p.stealthModeUntil && now < p.stealthModeUntil);
    let isTenacityOn = (!p.penaltyActive && p.hp > 0 && p.hp <= maxHP * 0.30);
    let isGildedOn = !!(p._arcGildedUntil && now < p._arcGildedUntil);
    let isEclipseOn = !!(p._arcEclipseActive && now < p._arcEclipseActive);
    let isPrismOrVoid = !!(p._arcPrismUntil && now < p._arcPrismUntil) || !!(p.voidXpBuffUntil && now < p.voidXpBuffUntil);
    let isCryoOn = !!(p.cryoBuffUntil && now < p.cryoBuffUntil);
    let isMagmaOn = !!(p.magmaOverheal && p.hp > maxHP);
    let isZeroMpOn = !!(p.zeroMpDrainUntil && now < p.zeroMpDrainUntil);

    document.body.classList.toggle('stealth-camouflage-active', isStealthOn);
    document.body.classList.toggle('tenacity-glitch-active', isTenacityOn);

    let headerEl = document.querySelector('.header');
    if (headerEl) headerEl.classList.toggle('arc-sovereign-mode', isGildedOn);

    let sysBarAnim = document.querySelector('.sys-log');
    if (sysBarAnim) {
        sysBarAnim.classList.toggle('arc-celestial-pulse', isGildedOn);
        sysBarAnim.classList.toggle('arc-anomaly-pulse', isEclipseOn);
    }

    let stealthSlot = document.getElementById('sl-stealth-banner-slot');
    if (stealthSlot) {
        if (isStealthOn) {
            let stMins = Math.max(1, Math.ceil((p.stealthModeUntil - now) / 60000));
            let stSig = `stealth_${stMins}`;
            if (stealthSlot.dataset.sig !== stSig) {
                stealthSlot.dataset.sig = stSig;
                stealthSlot.innerHTML = `<div class="sl-stealth-hud-banner"><span>[ HABILIDAD: SIGILO ACTIVO ]</span><span>${stMins}M // CRÍT x3</span></div>`;
            }
        } else if (stealthSlot.innerHTML !== '') {
            stealthSlot.dataset.sig = '';
            stealthSlot.innerHTML = '';
        }
    }

    let xpBar = document.getElementById('xp-bar');
    if (xpBar) {
        xpBar.style.width = `${Math.min(100, (p.xp / p.maxXp) * 100)}%`;
        xpBar.classList.toggle('arc-st-01', isPrismOrVoid);
        xpBar.style.background = '';
        xpBar.style.boxShadow = '';
    }

    let hpBar = document.getElementById('hp-bar');
    let hpWrapEl = document.getElementById('hp-wrap');
    if (hpWrapEl) {
        hpWrapEl.classList.toggle('mercy-emerald-halo', isMercyActive());
        hpWrapEl.classList.toggle('pulse-danger', p.hp <= 30 && !isMagmaOn);
        hpWrapEl.classList.toggle('overheal-magma', isMagmaOn);
        hpWrapEl.classList.toggle('cryo-aura', isCryoOn && !isMagmaOn && !isMercyActive());
    }
    if (hpBar) {
        hpBar.classList.toggle('arc-st-02', isEclipseOn);
    }

    let currentMP = p.mp !== undefined ? p.mp : 0;
    let hasUnlockedAnyShadow = p.shadowArmy && ['igris', 'tank', 'iron', 'tusk', 'beru'].some(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);

    animateMPDisplayTo(currentMP, maxMP);
    let mpBar = document.getElementById('mp-bar');
    if (mpBar) {
        mpBar.classList.toggle('arc-st-04', isZeroMpOn);
    }

    renderActiveBuffsStrip(now, currentDayStr, maxHP);

    // Mostrar la barra de MP desde Nivel 1 (igual que en el Episodio 3 del anime)
    let mpColEl = document.getElementById('sl-mp-col');
    if (mpColEl) {
        mpColEl.classList.remove('mp-locked-hidden');
        mpColEl.classList.add('mp-unlocked-visible');
    }

    // Ocultar botones de sombras en mazmorra si aún no hay sombras desbloqueadas
    let raidCmdBar = document.getElementById('raid-cmd-btn-bar');
    if (raidCmdBar) {
        raidCmdBar.style.display = hasUnlockedAnyShadow ? 'grid' : 'none';
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

    let sysBarEl = document.querySelector('.sys-log');
    if (sysBarEl && !document.getElementById('btn-notif-log')) {
        let logBtn = document.createElement('button');
        logBtn.id = 'btn-notif-log';
        logBtn.className = 'btn btn-blue';
        logBtn.style.cssText = 'margin-left:auto; padding:3px 8px; font-size:0.72em; flex-shrink:0;';
        logBtn.innerText = 'REG 10';
        logBtn.onclick = (ev) => { ev.stopPropagation(); openNotifHistoryModal(); };
        sysBarEl.appendChild(logBtn);
    }

let oldArcRowEl = document.getElementById('prof-arc-row');
    if (oldArcRowEl) oldArcRowEl.remove();

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

    if (typeof activeDungeon !== 'undefined' && activeDungeon && typeof syncRaidVitalsUI === 'function') {
        syncRaidVitalsUI();
    }

    const tabProfEl = document.getElementById('tab-profile');
    if (tabProfEl && !tabProfEl.classList.contains('hidden')) {
        if (typeof renderStatusRadarProfile === 'function') renderStatusRadarProfile();
        if (typeof renderTitles === 'function') renderTitles();
    }

    const tabGachaEl = document.getElementById('tab-gacha');
    if (tabGachaEl && !tabGachaEl.classList.contains('hidden')) {
        if (typeof renderShadowSanctuary === 'function') renderShadowSanctuary();
        if (typeof enforceSanctuaryMonochrome === 'function') enforceSanctuaryMonochrome();
    }
}

function enforceSanctuaryMonochrome() {
    const tabGacha = document.getElementById('tab-gacha');
    if (!tabGacha) return;
    tabGacha.querySelectorAll('[style]').forEach(el => {
        let st = el.getAttribute('style') || '';
        let newSt = st
            .replace(/#00ffcc|#10b981|#39ff14|#2dd4bf|var\(--success\)/gi, '#7dd3fc')
            .replace(/#fde047|#ffcc00|#f59e0b|var\(--text-gold\)/gi, '#e0f2fe')
            .replace(/#f43f5e|#ff2a55|#fb7185|var\(--danger\)/gi, '#93c5fd');
        if (newSt !== st) el.setAttribute('style', newSt);
    });
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

let _focusTabLeftAt = null;
function _bindFocusChamberGuard() {
    if (window._focusGuardBound) return;
    window._focusGuardBound = true;
    document.addEventListener('visibilitychange', () => {
        if (!studyStartedAt || studySessionCompleted) return;
        let studyModal = document.getElementById('study-modal');
        if (!studyModal || studyModal.style.display === 'none') return;
        if (document.hidden) {
            _focusTabLeftAt = Date.now();
        } else if (_focusTabLeftAt) {
            let awayS = Math.floor((Date.now() - _focusTabLeftAt) / 1000);
            _focusTabLeftAt = null;
            if (awayS >= 30 && awayS <= 600) {
                studyStartedAt += (awayS + 60) * 1000;
                if (p && p.activeStudySession) {
                    p.activeStudySession.startedAt = studyStartedAt;
                    saveData();
                }
                systemNotify(`[OJO DE KANDIARU]: Saliste ${awayS}s durante la Cámara de Focus. Tiempo descontado + 1 min de penalización.`, "danger");
            }
        }
    });
}
_bindFocusChamberGuard();

function _runStudyTimerLoop() {
    clearInterval(studyTimer);
    let stopBtn = document.getElementById('btn-study-stop');
    let timerText = document.getElementById('study-timer-text');
    let optsEl = document.getElementById('study-options');
    let closeBtn = document.getElementById('btn-study-close');

    if (optsEl) optsEl.style.display = 'none';
    if (closeBtn) closeBtn.style.display = 'none';
    if (stopBtn) {
        stopBtn.style.display = 'block';
        stopBtn.className = 'btn btn-red';
        stopBtn.innerText = 'INTERRUMPIR SESIÓN (-10 HP)';
    }
    if (timerText) {
        timerText.style.color = '#ffffff';
        timerText.style.textShadow = '0 0 14px #00e5ff';
    }

    const tickFocus = () => {
        let sec = Math.max(0, Math.floor((Date.now() - studyStartedAt) / 1000));
        if (sec >= totalStudyTime * 60) {
            sec = totalStudyTime * 60;
            studySessionCompleted = true;
            if (timerText) {
                timerText.style.color = '#e0f2fe';
                timerText.style.textShadow = '0 0 18px #00e5ff';
            }
            if (stopBtn) {
                stopBtn.className = 'btn btn-main';
                stopBtn.innerText = 'SELLAR NÚCLEO DE ENFOQUE (+MP)';
            }
            clearInterval(studyTimer);
            systemNotify("Inmersión Cognitiva completada. Sella tu núcleo para absorber el maná.", "gold");
        }
        let m = String(Math.floor(sec / 60)).padStart(2, '0');
        let s = String(sec % 60).padStart(2, '0');
        if (timerText) timerText.innerText = `${m}:${s}`;
    };

    tickFocus();
    studyTimer = setInterval(tickFocus, 1000);
}

function restoreActiveStudySession() {
    if (!p || !p.activeStudySession || p.penaltyActive) return;
    let st = p.activeStudySession;
    let ageMins = (Date.now() - st.startedAt) / 60000;
    if (ageMins > 180) {
        p.activeStudySession = null;
        saveData();
        return;
    }
    totalStudyTime = st.mins || 25;
    studyStartedAt = st.startedAt;
    studySessionCompleted = (ageMins >= totalStudyTime);
    openModal('study-modal');
    _runStudyTimerLoop();
}
window.addEventListener('load', () => setTimeout(restoreActiveStudySession, 550));

function startStudy(mins) {
    if (p.penaltyActive) {
        systemNotify("SISTEMA BLOQUEADO. Cumple tu castigo primero.", "danger");
        return;
    }

    if (studySessionCompleted && totalStudyTime === mins) {
        p.activeStudySession = null;
        saveData();
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
        systemNotify("Bypass de Fatiga consumido: 0 SP gastados.", "purple");
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
    studyStartedAt = Date.now();
    p.activeStudySession = { startedAt: studyStartedAt, mins: mins };
    updateHUD();
    saveData();
    _runStudyTimerLoop();
}

function stopStudy() {
    clearInterval(studyTimer);

    document.getElementById('study-options').style.display = 'block';
    document.getElementById('btn-study-close').style.display = 'block';
    document.getElementById('btn-study-stop').style.display = 'none';

    let elapsedSecs = Math.floor((Date.now() - studyStartedAt) / 1000);
    let requiredSecs = Math.floor((totalStudyTime * 60) * 0.9);
    let beruBypass = p && p.beruSpeedUntil && Date.now() < p.beruSpeedUntil;

    p.activeStudySession = null;
    saveData();
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

window.setSysLogCollapsed = function(collapsed) {
    const sysBar = document.querySelector('.sys-log');
    if (!sysBar) return;
    if (collapsed && aiTypewriterTimer) {
        clearInterval(aiTypewriterTimer);
        aiTypewriterTimer = null;
    }
    let handle = document.getElementById('sys-log-restore-handle');
    if (!handle && sysBar.parentElement) {
        handle = document.createElement('div');
        handle.id = 'sys-log-restore-handle';
        handle.className = 'sys-log-restore-handle';
        handle.innerHTML = `<svg viewBox="0 0 24 10" width="28" height="10" fill="none" stroke="#7dd3fc" stroke-width="2" stroke-linecap="round"><polyline points="4,2 12,8 20,2"/></svg>`;
        handle.onclick = () => window.setSysLogCollapsed(false);
        sysBar.parentElement.insertBefore(handle, sysBar.nextSibling);
    }
    sysBar.classList.toggle('sys-log-collapsed', !!collapsed);
    if (handle) handle.classList.toggle('visible', !!collapsed);
    if (collapsed && typeof dismissActiveHoloToast === 'function') {
        dismissActiveHoloToast();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const sysBar = document.querySelector('.sys-log');
    if (sysBar) {
        sysBar.style.cursor = 'pointer';
        let touchStartY = null;
        let swipedUp = false;

        sysBar.addEventListener('pointerdown', (e) => {
            touchStartY = e.clientY;
            swipedUp = false;
        }, { passive: true });

        sysBar.addEventListener('pointermove', (e) => {
            if (touchStartY === null) return;
            if (e.clientY - touchStartY < -14) {
                swipedUp = true;
                touchStartY = null;
                window.setSysLogCollapsed(true);
            }
        }, { passive: true });

        sysBar.addEventListener('pointerup', () => {
            touchStartY = null;
        }, { passive: true });

        sysBar.addEventListener('click', (e) => {
            if (swipedUp) {
                swipedUp = false;
                return;
            }
            if (e.target.closest('#btn-notif-log')) return;
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

scheduleAiRotation(AI_ROTATION_NORMAL_MS);
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
                        <div class="sl-excl-square"><span class="sl-excl-circle-inner">!</span></div>
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
                if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate([90, 50, 220]);
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

/* ==========================================================================
   7. MOTOR CIFRADO DE MICRO-ANOMALÍAS CANON (11 SECRETOS DE DESCUBRIMIENTO)
   ========================================================================== */
(function _initCanonAnomalyMatrix() {
    if (window._canonMatrixLoaded) return;
    window._canonMatrixLoaded = true;

    const _k = (s) => _d64(s);
    const _once = (id) => {
        if (!p) return false;
        if (!p._kmLog) p._kmLog = {};
        let d = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
        if (p._kmLog[id] === d) return false;
        p._kmLog[id] = d;
        if (typeof saveData === 'function') saveData();
        return true;
    };

    // Efecto visual de Intercambio de Sombra al cambiar o invocar comandante
    const _origSelectCmd = window.selectShowcaseCommander;
    if (typeof _origSelectCmd === 'function') {
        window.selectShowcaseCommander = function(cmdId) {
            _origSelectCmd(cmdId);
            let stg = document.getElementById('throne-cmd-stage');
            if (stg) {
                stg.classList.remove('shadow-exchange-dive');
                void stg.offsetWidth;
                stg.classList.add('shadow-exchange-dive');
            }
        };
    }

    // M01 & M02
    let _taps = 0, _tTimer = null;
    document.addEventListener('click', (e) => {
        if (!p || p.penaltyActive) return;
        let lBox = e.target.closest('.lvl-container');
        if (lBox) {
            _taps++;
            clearTimeout(_tTimer);
            _tTimer = setTimeout(() => { _taps = 0; }, 1400);
            if (_taps === 3 && _once('km_01')) {
                _taps = 0;
                p.mp = Math.min(1000 + ((p.stats.int - 1) * 1000), (p.mp || 0) + 45);
                updateHUD();
                systemNotify(_k('W1JFRUNWQUxVQUNJw5NOIERFTCBTQ0FOTkVSXTogRXJyb3IgZGUgbWVkaWNpw7NuIGVuIGVsIG1hbmFtw6l0cm8uIFJlY2FsaWJyYW5kbyByYW5nbyBkZWwgSnVnYWRvciAoKzQ1IE1QKS4='), 'info');
            }
        }
        let fWidget = e.target.closest('#sl-fatigue-widget');
        if (fWidget && (100 - p.sp) >= 70 && _once('km_02')) {
            p.sp = Math.min(100, p.sp + 12);
            updateHUD();
            systemNotify(_k('W1JFU1BJUkFDSU9OIERFTCBDQVpBRE9SXSDCq05vIGNlZGFzIGFudGUgbGEgZmF0aWdhwrsuIFR1IHB1bHNvIHNlIGVzdGFiaWxpemEgKC0xMiBGYXRpZ2EpLg=='), 'info');
        }
    });

    // M03, M04, M05 & M06
    setInterval(() => {
        if (document.hidden || !p || p.penaltyActive) return;
        let now = new Date();
        let hh = now.getHours(), mm = now.getMinutes();

        if (hh === mm && (hh === 11 || hh === 22 || hh === 0) && _once('km_03_' + hh)) {
            p.arcticShield = Math.min(800, (p.arcticShield || 0) + 30);
            updateHUD();
            systemNotify(_k('W01BTkRBTUlFTlRPIERFIENBUlRFTk9OXSAxLiBBZG9yYXLDoXMgYWwgU2XDsW9yLiAyLiBBbGFiYXLDoXMgYWwgU2XDsW9yLiAzLiBEZW1vc3RyYXLDoXMgdHUgZmUgKCszMCBFc2N1ZG8pLg=='), 'purple');
        }

        if (Math.floor(p.hp) === 1 && _once('km_04')) {
            p.hp = Math.min((typeof calculateHunterMaxHP === 'function' ? calculateHunterMaxHP() : 100), p.hp + 33);
            updateHUD();
            systemNotify(_k('W01JU0lPTiBTRUNSRVRBOiBFTCBWQVRJQ0lOSU8gREUgTE9TIERFQklMRVNdIFR1IGNvcmF6w7NuIHNlIG5pZWdhIGEgbW9yaXIuICszMyBIUCBkZSBlbWVyZ2VuY2lhLg=='), 'gold');
        }

        if (Math.floor(p.gold) === 777 && _once('km_05')) {
            p.gold += 77;
            updateHUD();
            systemNotify(_k('W1NVQkFTVEEgREUgTE9TIEdSRU1JT1NdIFVuIGNvbGVjY2lvbmlzdGEgYW5vbmltbyBwYWfDsyB1biBib25vIHBvciB0dSB0ZXNvcmVyw61hIGV4YWN0YSAoKzc3IEcpLg=='), 'gold');
        }

        if ((100 - p.sp) === 0 && p.hp >= ((typeof calculateHunterMaxHP === 'function' ? calculateHunterMaxHP() : 100)) && Math.random() < 0.012 && _once('km_06')) {
            p.mp = Math.min(1000 + ((p.stats.int - 1) * 1000), (p.mp || 0) + 35);
            updateHUD();
            systemNotify(_k('W1NJTkNST05JWkFDSU9OIERFTCBSRUNFUFRBQ1VMT10gRWwgQXJxdWl0ZWN0byByZWdpc3RyYSB1biBlcXVpbGlicmlvIGZpc2ljbyBwZXJmZWN0byAoKzM1IE1QKS4='), 'info');
        }
    }, 10000);

    // M07 & M08
    document.addEventListener('input', (e) => {
        if (!e.target || e.target.id !== 'shop-search-input') return;
        let v = (e.target.value || '').trim().toLowerCase();
        if ((v === _k('YXNoYm9ybg==') || v === _k('a2FuZGlhcnU=')) && _once('km_07')) {
            p.mp = Math.min(1000 + ((p.stats.int - 1) * 1000), (p.mp || 0) + 60);
            updateHUD();
            systemNotify(_k('W1JFR0lTVFJPIENMQVNJRklDQURPXSAwMDE6IEVsIG5vbWJyZSBpbmdyZXNhZG8gcGVydGVuZWNlIGEgdW4gYWRtaW5pc3RyYWRvciBkZWwgU2lzdGVtYSAoKzYwIE1QKS4='), 'purple');
        } else if (v === _k('c3VyZ2U=') && _once('km_08')) {
            p.sp = Math.min(100, p.sp + 15);
            updateHUD();
            systemNotify(_k('W0NPTUFORF8gREUgRVhUUkFDQ0lPTl0gTuKAmW8gaGF5IGNhZGF2ZXJlcyBlbiBlbCBtZXJjYWRvLCBwZXJvIHR1IGF1cmEgcmV2aXRhbGl6w7MgdHUgY3VlcnBvICgtMTUgRmF0aWdhKS4='), 'purple');
        }
    });

    // M09, M10 & M11
    document.addEventListener('pointerdown', (e) => {
        if (!p || p.penaltyActive) return;
        if (e.target.closest('.sonar-center-dot') && _once('km_09')) {
            p.mp = Math.min(1000 + ((p.stats.int - 1) * 1000), (p.mp || 0) + 30);
            updateHUD();
            systemNotify(_k('W1BVTFNPIERFIERFVEVDQ0lPTl0gRW1pdGlzdGUgdW5hIG9uZGEgZGUgbWFuw6EgZGlyZWN0YSBkZXNkZSB0dSBwb3NpY2nDs24gYWN0dWFsICgrMzAgTVApLg=='), 'info');
        }
        if (e.target.closest('.sl-anatomy-body-center') && _once('km_10')) {
            let mh = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
            p.hp = Math.min(mh, +(p.hp + 15).toFixed(1));
            updateHUD();
            systemNotify(_k('W0NPUkFaT04gTkVHUk9dIFR1IG51Y2xlbyBpbnRlcm5vIGxhdGUgY29uIGxhIGVuZXJnw61hIGRlbCBNb25hcmNhIGRlIGxhcyBTb21icmFzICgrMTUgSFApLg=='), 'purple');
        }
        if (e.target.closest('.sl-status-rank-box') && _once('km_11')) {
            p.gold += 25;
            updateHUD();
            systemNotify(_k('W0FTT0NJQUNJT04gREUgQ0FaQURPUkVTXSBTdWJzaWRpbyBkaWFyaW8gZGUgaW5zZWNjaW9uIGRlIGxpY2VuY2lhIGFjcmVkaXRhZG8gKCsyNSBHKS4='), 'gold');
        }
    }, { passive: true });
})();
/* ==========================================================================
   17. PRÓLOGO CINEMATOGRÁFICO: DÍA CERO (DESPERTAR EN EL TEMPLO DE CARTENON)
   ========================================================================== */
let dayZeroStep = 0;
let dayZeroPlayerName = "Cristian";
let _dayZeroReplayOnly = false;
let _dayZeroTypeTimer = null;
let _dayZeroTypingDone = true;
let _dayZeroLastTap = 0;

const DAY_ZERO_SEQUENCE = [
    {
        frame: "sl-holo-frame",
        header: "NOTIFICACIÓN",
        sub: "[ MISIÓN SECRETA COMPLETADA ]",
        body: "Has cumplido todos los requisitos necesarios para completar la Misión Secreta: «El Valor de los Débiles».",
        action: "[ TOCA PARA CONTINUAR ]"
    },
    {
        frame: "sl-holo-frame",
        header: "NOTIFICACIÓN",
        sub: "[ SELECCIÓN DE RECEPTÁCULO ]",
        body: "Has obtenido el derecho de convertirte en un JUGADOR.<br><br>¿Aceptas la designación del Sistema?",
        action: "[ TOCA PARA CONTINUAR ]"
    },
    {
        frame: "sl-holo-frame danger",
        header: "ADVERTENCIA",
        sub: "[ CRONÓMETRO VITAL ACTIVO ]",
        body: "<span class='ct-red-Runic'>NO TE QUEDA MUCHO TIEMPO.</span>",
        action: "[ TOCA PARA CONTINUAR ]",
        heartbeat: true,
        sound: "danger"
    },
    {
        frame: "sl-holo-frame danger",
        header: "CRÍTICO",
        sub: "[ AMENAZA BIOLÓGICA ]",
        body: "Si te niegas, tus signos vitales colapsarán y tu corazón se detendrá en <b class='ct-red-Runic' id='dz-crit-timer'>0.02 segundos</b>.<br><br>¿Aceptas ser el Receptáculo?",
        heartbeat: true,
        ecg: true,
        type: "choice"
    },
    {
        frame: "sl-holo-frame",
        header: "REGISTRO",
        sub: "[ EXPEDIENTE DEL CAZADOR ]",
        body: "Ingresa el nombre del Jugador:",
        type: "input"
    },
    {
        frame: "sl-holo-frame",
        header: "NOTIFICACIÓN",
        sub: "[ DESPERTAR CONFIRMADO ]",
        body: "[ Felicitaciones por convertirte en un JUGADOR.­­­­­­­­­­­­­­­­­­­­­­­]",
        action: "[ TOCA PARA CONTINUAR ]",
        sound: "gold"
    },
    {
        frame: "sl-holo-frame",
        header: "NOTIFICACIÓN",
        sub: "[ DIRECTIVA PRINCIPAL ]",
        body: "[ El Sistema asistirá y guiará el crecimiento continuo del Jugador. ]",
        action: "[ TOCA PARA CONTINUAR ]"
    },
    {
        frame: "sl-holo-frame danger",
        header: "NOTIFICACIÓN",
        sub: "[ CLÁUSULA INQUEBRANTABLE ]",
        body: "[ En caso de no cumplir estrictamente las directivas diarias del Sistema, se aplicará una <b class='ct-red-Runic'>ZONA DE PENALIZACIÓN</b> apropiada. ]",
        action: "[ TOCA PARA CONTINUAR ]"
    },
    {
        frame: "sl-holo-frame",
        header: "RECOMPENSA",
        sub: "[ SUMINISTROS DE BIENVENIDA ]",
        body: `[ Has recibido suministros iniciales: <b>Caja de Despertar</b> y <b>Cupón de Almuerzo</b> han sido materializados en tu Bolsa Dimensional. ]`,
        showBoxIcon: true,
        action: "[ TOCA PARA CONTINUAR ]",
        sound: "gold"
    },
    {
        frame: "sl-holo-frame",
        header: "NUEVO MENSAJE",
        sub: "[ BUZÓN DEL SISTEMA ]",
        body: `[ Misión Diaria: «La preparación para volverse fuerte» ha sido asignada. <span style="color:#fb7185;">(NO LEÍDA)</span> ]`,
        showFinalName: true,
        type: "finish"
    }
];

function _ensureDayZeroOverlayEl() {
    let ov = document.getElementById('sl-day-zero-overlay');
    if (!ov) {
        ov = document.createElement('div');
        ov.id = 'sl-day-zero-overlay';
        ov.style.cssText = 'display:none; position:fixed; inset:0; background:#02040a; z-index:14000; justify-content:center; align-items:center; padding:18px;';
        ov.innerHTML = `<div id="sl-day-zero-content" style="width:100%; max-width:410px;"></div>`;
        document.body.appendChild(ov);
    }
    return ov;
}

window.startDayZeroPrologue = function(isReplay = false) {
    _dayZeroReplayOnly = !!isReplay;
    let ov = _ensureDayZeroOverlayEl();
    ov.style.opacity = '1';
    ov.style.display = 'flex';
    ov.classList.remove('dz-heartbeat-bg', 'dz-accept-flash');
    dayZeroStep = 0;
    if (p && p.playerName) dayZeroPlayerName = p.playerName;
    renderDayZeroStep();
};

window.replayDayZeroPrologue = function() {
    window.startDayZeroPrologue(true);
};

window.renderDayZeroStep = function() {
    clearInterval(_dayZeroTypeTimer);
    let ov = _ensureDayZeroOverlayEl();
    let cont = document.getElementById('sl-day-zero-content');
    if (!ov || !cont) return;

    if (dayZeroStep >= DAY_ZERO_SEQUENCE.length) {
        finishDayZeroPrologue();
        return;
    }

    let stepData = DAY_ZERO_SEQUENCE[dayZeroStep];
    let cornerSVG = (typeof getBaroqueCornerSVG === "function") ? getBaroqueCornerSVG() : '';

    ov.classList.toggle('dz-heartbeat-bg', !!stepData.heartbeat);

    if (stepData.sound && typeof playSystemSound === "function") {
        playSystemSound(stepData.sound);
    } else if (typeof playSystemSound === "function" && dayZeroStep > 0) {
        playSystemSound('type');
    }

    let ecgHtml = stepData.ecg
        ? `<svg class="dz-ecg-line" viewBox="0 0 260 32"><polyline class="dz-ecg-path" points="0,16 70,16 86,16 96,4 106,28 116,10 124,16 175,16 186,8 196,24 205,16 260,16"/></svg>`
        : '';

    let iconHtml = stepData.showBoxIcon && typeof UNIQUE_ITEM_SVGS !== 'undefined' && UNIQUE_ITEM_SVGS.box_start
        ? `<div style="width:54px; height:54px; margin:0 auto 10px auto;"><svg viewBox="0 0 64 64" width="100%" height="100%">${UNIQUE_ITEM_SVGS.box_start}</svg></div>`
        : '';

    let finalNameHtml = stepData.showFinalName
        ? `<div style="margin-bottom:8px; color:#7dd3fc; font-family:'Share Tech Mono', monospace; font-size:0.86em;">[ JUGADOR: ${dayZeroPlayerName.toUpperCase()} ]</div>`
        : '';

    let innerContent = "";
    if (stepData.type === "choice") {
        innerContent = `
            <div style="display:flex; gap:8px; margin-top:16px;" onclick="event.stopPropagation()">
                <button class="btn btn-main" style="flex:1;" onclick="acceptDayZeroAwakening()">ACEPTAR</button>
                <button class="btn btn-red" id="dz-btn-reject" style="flex:1;" onclick="handleDayZeroReject()">RECHAZAR</button>
            </div>
        `;
    } else if (stepData.type === "input") {
        innerContent = `
            <div onclick="event.stopPropagation()">
                <input type="text" id="dz-name-input" class="sl-name-bestow-input" value="" placeholder="Escribe tu nombre..." autocomplete="off" style="margin:14px auto 12px auto; max-width:250px;">
                <button class="btn btn-main" style="width:100%;" onclick="confirmDayZeroRegistration()">CONFIRMAR REGISTRO</button>
            </div>
        `;
    } else if (stepData.type === "finish") {
        innerContent = `
            <button class="btn btn-main" style="width:100%; margin-top:16px; padding:13px; font-size:0.92em;" onclick="event.stopPropagation(); finishDayZeroPrologue()">
                ${_dayZeroReplayOnly ? 'VOLVER AL SISTEMA' : 'ABRIR MISIÓN DIARIA'}
            </button>
        `;
    } else {
        innerContent = `
            <div class="sl-holo-footer-hint" id="dz-tap-hint" style="margin-top:16px; opacity:0.35;">${stepData.action}</div>
        `;
    }

    cont.innerHTML = `
        <div class="${stepData.frame}" style="width:100%;" ${(!stepData.type) ? 'onclick="handleDayZeroTap()"' : ''}>
            <div class="sl-holo-rail top"><span class="rail-core"></span></div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="padding:22px 18px; text-align:center;">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div class="sl-holo-header-row" style="margin-bottom:8px;">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect">${stepData.header}</div>
                    </div>
                    ${stepData.sub ? `<div class="sl-holo-subbracket" style="margin-bottom:10px;">${stepData.sub}</div>` : ''}
                    ${ecgHtml}
                    ${iconHtml}
                    ${finalNameHtml}
                    <div id="dz-body-text" style="font-family:'Share Tech Mono', monospace; font-size:0.92em; color:#e2e8f0; line-height:1.55; min-height:2.4em; word-break:break-word;"></div>
                    ${innerContent}
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
        </div>
    `;

    let bodyEl = document.getElementById('dz-body-text');
    let hintEl = document.getElementById('dz-tap-hint');
    let hasHtmlTags = /<[^>]+>/.test(stepData.body);

    if (hasHtmlTags || stepData.type === 'input') {
        if (bodyEl) bodyEl.innerHTML = stepData.body;
        _dayZeroTypingDone = true;
        if (hintEl) hintEl.style.opacity = '0.9';
    } else if (bodyEl) {
        _dayZeroTypingDone = false;
        let idx = 0;
        let fullStr = stepData.body;
        _dayZeroTypeTimer = setInterval(() => {
            idx += 2;
            bodyEl.textContent = fullStr.slice(0, idx);
            if (idx >= fullStr.length) {
                clearInterval(_dayZeroTypeTimer);
                _dayZeroTypingDone = true;
                if (hintEl) hintEl.style.opacity = '0.95';
            }
        }, 22);
    }

    if (stepData.type === "input") {
        setTimeout(() => {
            let inp = document.getElementById('dz-name-input');
            if (inp) { inp.focus(); inp.select(); }
        }, 280);
    }
};

window.handleDayZeroTap = function() {
    let now = Date.now();
    if (now - _dayZeroLastTap < 280) return;
    _dayZeroLastTap = now;

    let stepData = DAY_ZERO_SEQUENCE[dayZeroStep];
    if (!stepData) return;

    if (!_dayZeroTypingDone) {
        clearInterval(_dayZeroTypeTimer);
        _dayZeroTypingDone = true;
        let bodyEl = document.getElementById('dz-body-text');
        let hintEl = document.getElementById('dz-tap-hint');
        if (bodyEl) bodyEl.innerHTML = stepData.body;
        if (hintEl) hintEl.style.opacity = '0.95';
        return;
    }

    advanceDayZeroStep();
};

window.advanceDayZeroStep = function() {
    dayZeroStep++;
    renderDayZeroStep();
};

window.acceptDayZeroAwakening = function() {
    let ov = document.getElementById('sl-day-zero-overlay');
    if (ov) {
        ov.classList.remove('dz-heartbeat-bg');
        ov.classList.add('dz-accept-flash');
    }
    if (typeof playSystemSound === 'function') playSystemSound('gold');
    if (navigator.vibrate) navigator.vibrate([40, 40, 120]);
    setTimeout(() => {
        if (ov) ov.classList.remove('dz-accept-flash');
        advanceDayZeroStep();
    }, 360);
};

window.handleDayZeroReject = function() {
    let btnR = document.getElementById('dz-btn-reject');
    let timerTxt = document.getElementById('dz-crit-timer');
    if (btnR) {
        btnR.style.opacity = '0.4';
        btnR.style.pointerEvents = 'none';
        btnR.innerText = "BLOQUEADO";
    }
    if (timerTxt) {
        timerTxt.innerText = "0.01 segundos";
        timerTxt.classList.add('dayzero-crit-blink');
    }
    let cont = document.getElementById('sl-day-zero-content');
    if (cont) {
        cont.classList.remove('arena-hit-shake');
        void cont.offsetWidth;
        cont.classList.add('arena-hit-shake');
    }
    if (typeof playSystemSound === "function") playSystemSound('danger');
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
};

window.confirmDayZeroRegistration = function() {
    let inp = document.getElementById('dz-name-input');
    if (inp && inp.value.trim()) {
        dayZeroPlayerName = inp.value.trim();
    }
    if (!_dayZeroReplayOnly && p) {
        p.playerName = dayZeroPlayerName;
        if (typeof saveData === "function") saveData();
        if (typeof renderStatusRadarProfile === "function") renderStatusRadarProfile();
    }
    advanceDayZeroStep();
};

window.finishDayZeroPrologue = function() {
    clearInterval(_dayZeroTypeTimer);
    let ov = document.getElementById('sl-day-zero-overlay');
    if (!ov) return;

    if (!_dayZeroReplayOnly && p) {
        p.dayZeroCompleted = true;
        if (typeof saveData === "function") saveData();
    }

    if (typeof playSystemSound === "function") playSystemSound('monarch_awakening');

    ov.style.transition = "opacity 0.55s ease";
    ov.style.opacity = "0";
    setTimeout(() => {
        ov.style.display = 'none';
        ov.style.opacity = '1';
        ov.classList.remove('dz-heartbeat-bg', 'dz-accept-flash');
        if (!_dayZeroReplayOnly) {
            let todayBootKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
            localStorage.setItem('SL_BootShownDay', todayBootKey);
            if (typeof initializeSystem === "function") initializeSystem();
            if (typeof switchTab === "function") switchTab('routine', 0, true);
        }
        _dayZeroReplayOnly = false;
    }, 560);
};

/* ==========================================================================
   18. MOTOR CLIENTE WEB PUSH VAPID (NOTIFICACIONES CON APP CERRADA)
   ========================================================================== */
// Pega aquí tu llave pública VAPID generada con: npx web-push generate-vapid-keys
const MONARCH_VAPID_PUBLIC_KEY = "BK1YaarowfMKjIPPx82Ls6NIsESA3VIKs8fCtZelAVytIjJJvagAmW_8WavfrpQpPPYvjG7nsLDty2RxrvgIe28";

function _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const out = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) out[i] = rawData.charCodeAt(i);
    return out;
}

window.enableMonarchWebPush = async function() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return systemNotify("Este navegador no soporta Web Push nativo.", "danger");
    }
    if (!MONARCH_VAPID_PUBLIC_KEY || MONARCH_VAPID_PUBLIC_KEY.includes("PEGA_AQUI")) {
        return systemNotify("Pega tu VAPID_PUBLIC_KEY en js/ui.js y en las variables de Vercel para activar Push.", "info");
    }

    const perm = await Notification.requestPermission();
    if (perm !== 'granted') {
        return systemNotify("Permiso de notificaciones denegado en el sistema.", "danger");
    }

    try {
        const reg = await navigator.serviceWorker.ready;
        let sub = await reg.pushManager.getSubscription();
        if (!sub) {
            sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: _urlBase64ToUint8Array(MONARCH_VAPID_PUBLIC_KEY)
            });
        }
        p.webPushSub = sub.toJSON();
        saveData();
        if (typeof renderStatusRadarProfile === 'function') renderStatusRadarProfile();

        // Enviar prueba diferida 8 segundos para que puedas apagar la pantalla y comprobarlo
        await window.scheduleCloudPush('test_push', 'SISTEMA DEL MONARCA', 'Conexión Web Push verificada en segundo plano.', 8, 'sl-push-test');
        systemNotify("Push activado. Apaga tu pantalla: recibirás una notificación de prueba en 8 segundos.", "gold");
    } catch (e) {
        systemNotify("Error al suscribir Web Push: " + e.message, "danger");
    }
};

window.scheduleCloudPush = async function(groupKey, title, body, delaySec = 0, tag = 'sl-push') {
    if (!p || !p.webPushSub || location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
    try {
        const res = await fetch('/api/push-schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscription: p.webPushSub, title, body, delaySec, tag })
        });
        const data = await res.json();
        if (data && data.messageId) {
            if (!p._cloudPushIds) p._cloudPushIds = {};
            if (!Array.isArray(p._cloudPushIds[groupKey])) p._cloudPushIds[groupKey] = [];
            p._cloudPushIds[groupKey].push(data.messageId);
            saveData();
        }
    } catch (e) {}
};

window.cancelCloudPush = async function(groupKey) {
    if (!p || !p._cloudPushIds || !p._cloudPushIds[groupKey] || p._cloudPushIds[groupKey].length === 0) return;
    const ids = p._cloudPushIds[groupKey];
    delete p._cloudPushIds[groupKey];
    saveData();
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
    try {
        await fetch('/api/push-cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageIds: ids })
        });
    } catch (e) {}
};
async function _silentSyncWebPush() {
    if (!p || !('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol !== 'https:') return;
    if (!MONARCH_VAPID_PUBLIC_KEY || MONARCH_VAPID_PUBLIC_KEY.includes('PEGA_AQUI')) return;
    if (Notification.permission !== 'granted') return;
    try {
        const reg = await navigator.serviceWorker.ready;
        let sub = await reg.pushManager.getSubscription();
        if (!sub) {
            sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: _urlBase64ToUint8Array(MONARCH_VAPID_PUBLIC_KEY)
            });
        }
        p.webPushSub = sub.toJSON();
        saveData();
    } catch (e) {}
}

window.addEventListener('load', () => {
    setTimeout(_silentSyncWebPush, 1200);
    const splash = document.getElementById('sl-splash-screen');

    if (!splash) return;
    const isDayZero = (typeof p !== 'undefined' && p && !p.dayZeroCompleted);
    setTimeout(() => {
        splash.classList.add('splash-hide');
        setTimeout(() => { if (splash.parentNode) splash.remove(); }, 480);
    }, isDayZero ? 180 : 850);
});
