/* ==========================================================================
   UI.JS - INTERFAZ, SEGURIDAD DE MUERTE, IA DEL MONARCA Y TERMINAL DE ARRANQUE
   ========================================================================== */

const _animatedNumCache = {};
const _bracketFlipCache = {};

function renderMechanicalFlipMarkup(prevStr, nextStr) {
    let maxLen = Math.max(prevStr.length, nextStr.length);
    let pPad = prevStr.padStart(maxLen, ' ');
    let nPad = nextStr.padStart(maxLen, ' ');
    let out = '';

    for (let i = 0; i < maxLen; i++) {
        let cOld = pPad[i];
        let cNew = nPad[i];
        if (cOld !== cNew && /\d/.test(cNew)) {
            let oldDisp = cOld === ' ' ? '0' : cOld;
            out += `<span class="sl-digit-slot"><span class="sl-digit-track"><span class="sl-digit-old">${oldDisp}</span><span class="sl-digit-new">${cNew}</span></span></span>`;
        } else {
            let fixedChar = cNew === ' ' ? '&nbsp;' : cNew;
            out += `<span class="sl-digit-slot sl-digit-static">${fixedChar}</span>`;
        }
    }
    return out;
}

const _flipCleanTimers = {};

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

    if (flipIds.includes(id) && prevStr.length === nextStr.length) {
        el.innerHTML = renderMechanicalFlipMarkup(prevStr, nextStr);
        if (_flipCleanTimers[id]) clearTimeout(_flipCleanTimers[id]);
        _flipCleanTimers[id] = setTimeout(() => {
            if (el && _animatedNumCache[id] === nextStr) {
                el.textContent = nextStr;
            }
        }, 220);
    } else {
        el.textContent = nextStr;
    }
}

function setBracketCounterFlip(el, idKey, newBracketStr) {
    if (!el) return;
    let prev = _bracketFlipCache[idKey];
    if (prev === undefined || prev === newBracketStr) {
        _bracketFlipCache[idKey] = newBracketStr;
        if (prev === undefined) el.innerText = newBracketStr;
        return;
    }
    _bracketFlipCache[idKey] = newBracketStr;
    el.innerHTML = renderMechanicalFlipMarkup(prev, newBracketStr);
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
let activeToastMessages = [];
let currentToastSeverity = 0; // 1 = Azul Normal, 2 = Rojo Peligro, 3 = Morado Supremo

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
    new MutationObserver(muts => {
        if (document.hidden) return;
        for (let i = 0; i < muts.length; i++) {
            const m = muts[i];
            if (m.type === 'characterData') {
                const t = m.target;
                if (t && t.nodeValue && _EMO_TEST.test(t.nodeValue)) {
                    t.nodeValue = t.nodeValue.replace(_EMO_RE, '');
                }
            } else {
                const added = m.addedNodes;
                for (let j = 0; j < added.length; j++) {
                    const n = added[j];
                    if (n.nodeType === 1) {
                        if (n.textContent && _EMO_TEST.test(n.textContent)) vectorizeEmojisIn(n);
                    } else if (n.nodeType === 3 && n.nodeValue && _EMO_TEST.test(n.nodeValue)) {
                        n.nodeValue = n.nodeValue.replace(_EMO_RE, '');
                    }
                }
            }
        }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
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
    return base
        .replace(/(\[[^\]]+\])/g, '<span style="color:#7dd3fc; font-weight:700; text-shadow:0 0 8px rgba(0,210,255,0.65);">$1</span>')
        .replace(/(\+[0-9,]+ (?:G|XP|EXP|MP|CM|HP|SP|FATIGA)|[0-9]+% [A-ZÁÉÍÓÚÑ]+|\+[0-9.]+ (?:STR|INT|AGI|FUE|VIT|PER))/gi, '<span style="color:#00e5ff; font-weight:700; text-shadow:0 0 10px rgba(0,229,255,0.8);">$1</span>')
        .replace(/(JUGADOR 1|CAZADOR|ÉXITO|NIVEL \d+|ASCENSIÓN AL NIVEL \d+|¡SURGE!|MILAGRO CONSUMADO)/g, '<span style="color:#ffffff; font-weight:700; text-shadow:0 0 10px #00d2ff;">$1</span>')
        .replace(/(PENALIZACIÓN|CASTIGO|COLAPSO|ALERTA|PELIGRO|FALLIDA|-[0-9.]+ HP|-[0-9]+ SP)/g, '<span style="color:#fb7185; font-weight:700; text-shadow:0 0 8px rgba(255,42,85,0.85);">$1</span>');
}

function getBaroqueCornerSVG() {
    return `<svg viewBox="0 0 28 28" width="100%" height="100%" fill="none" stroke="#e0f2fe" stroke-width="1.6"><path d="M2 26V2h24"/><path d="M6 18V6h12"/><circle cx="6" cy="6" r="2" fill="#00d2ff"/></svg>`;
}

function isMajorMonarchNotification(msg, type) {
    if (type === "monarch_supreme") return true;
    let upper = (msg || "").toUpperCase();
    return upper.includes("CAMBIO DE CLASE") || upper.includes("CORAZÓN NEGRO") || upper.includes("SOBERANO DE LOS MUERTOS") || upper.includes("CAJA NEGRA DESCIFRADA") || upper.includes("ISLA DE JEJU") || upper.includes("PORTAL ROJO") || upper.includes("LOGRO OCULTO");
}

function dismissActiveHoloToast() {
    if (activeToastTimer) {
        clearTimeout(activeToastTimer);
        activeToastTimer = null;
    }
    const tc = document.getElementById('toast-container');
    if (!tc) return;
    const frame = tc.querySelector('.sl-holo-frame');
    if (frame && !frame.classList.contains('holo-closing')) {
        frame.classList.add('holo-closing');
        setTimeout(() => {
            if (frame && frame.parentNode) frame.remove();
        }, 250);
    } else {
        tc.innerHTML = '';
    }
    activeToastMessages = [];
    currentToastSeverity = 0;
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
    let existingFrame = tc.querySelector('.sl-holo-frame:not(.holo-closing)');
    let isConsecutiveNotif = !!existingFrame;

    if (!existingFrame) {
        tc.innerHTML = '';
        activeToastMessages = [msg];
        currentToastSeverity = newSeverity;

        let themeClass = currentToastSeverity === 3 ? "monarch-purple" : (currentToastSeverity === 2 ? "danger" : "");
        let headerTitle = currentToastSeverity === 3 ? "SISTEMA DEL MONARCA" : (currentToastSeverity === 2 ? "ALERTA DE SISTEMA" : "NOTIFICACIÓN");
        let subBracket = currentToastSeverity === 3 ? "[ DIRECTIVA DEL ABISMO ]" : (currentToastSeverity === 2 ? "[ ADVERTENCIA CRÍTICA ]" : "[ MENSAJE DEL SISTEMA ]");
        let cornerSVG = getBaroqueCornerSVG();

const frame = document.createElement('div');
        frame.className = `sl-holo-frame ${themeClass}`.trim();
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
            <div class="sl-holo-rail top">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <span class="sl-manhwa-controls">_ □ X</span>
                    <div class="sl-holo-header-row">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect" id="sl-holo-title-txt">${headerTitle}</div>
                    </div>
                    <div class="sl-holo-subbracket" id="sl-holo-sub-txt">${subBracket}</div>
                    <div class="sl-holo-msg-list" id="sl-holo-msg-list">
                        <div class="sl-holo-msg-item">${highlightAnimeKeywords(msg)}</div>
                    </div>
                    <div class="sl-holo-footer-hint">[ TOCA PARA CERRAR ]</div>
                </div>
            </div>
            <div class="sl-holo-rail bottom">
                <span class="rail-cap left"></span><span class="rail-core"></span><span class="rail-cap right"></span>
            </div>
        `;

        tc.appendChild(frame);
    } else {
        if (!activeToastMessages.includes(msg)) {
            activeToastMessages.push(msg);
            if (activeToastMessages.length > 3) activeToastMessages.shift();
        }
        if (newSeverity > currentToastSeverity) {
            currentToastSeverity = newSeverity;
        }

        existingFrame.classList.remove('monarch-purple', 'danger', 'holo-pulse-update');
        if (currentToastSeverity === 3) existingFrame.classList.add('monarch-purple');
        else if (currentToastSeverity === 2) existingFrame.classList.add('danger');

        void existingFrame.offsetWidth;
        existingFrame.classList.add('holo-pulse-update');

        let headerTitle = currentToastSeverity === 3 ? "SISTEMA DEL MONARCA" : (currentToastSeverity === 2 ? "ALERTA DE SISTEMA" : "NOTIFICACIÓN");
        let subBracket = currentToastSeverity === 3 ? "[ DIRECTIVA DEL ABISMO ]" : (currentToastSeverity === 2 ? "[ ADVERTENCIA CRÍTICA ]" : "[ MENSAJE DEL SISTEMA ]");

        let titleEl = existingFrame.querySelector('#sl-holo-title-txt');
        let subEl = existingFrame.querySelector('#sl-holo-sub-txt');
        let listEl = existingFrame.querySelector('#sl-holo-msg-list');

        if (titleEl) titleEl.innerText = headerTitle;
        if (subEl) subEl.innerText = subBracket;
        if (listEl) {
            listEl.innerHTML = activeToastMessages
                .map(m => `<div class="sl-holo-msg-item">${highlightAnimeKeywords(m)}</div>`)
                .join('<div class="sl-holo-msg-divider"></div>');
        }
    }

// 1ª notificación usa system-notification.mp3; todas las notificaciones seguidas (incluso del mismo daño) usan notification-clic.mp3
    if (isConsecutiveNotif) {
        if (typeof playSystemSound === 'function') {
            playSystemSound('type');
        }
    } else if (typeof playSystemSound === 'function') {
        playSystemSound(type);
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
if (tab === 'gacha' && typeof renderShadowSanctuary === 'function') {
        renderShadowSanctuary();
        if (typeof enforceSanctuaryMonochrome === 'function') enforceSanctuaryMonochrome();
    }
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
    let bearsOn = p.infantry && p.infantry.bears && !(p.infantryDisabled && p.infantryDisabled.bears); let defVal = Math.floor(strVal * 1.1 + (bearsOn ? p.infantry.bears * 2 : 0));
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
    let bioDayStr = (typeof getBiologicalDayStr === "function") ? getBiologicalDayStr() : new Date().toDateString();
    let isSleeping = (typeof isSleepingNow === "function") ? isSleepingNow() : (p.sleepingUntilMorning === bioDayStr);
    let vigilLeft = (typeof ensureNightVigilQuota === "function") ? ensureNightVigilQuota() : 2;
    let isVigilActiveTonight = (typeof isNightVigilActiveNow === "function") ? isNightVigilActiveNow() : (p.nightPassActive === bioDayStr);

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
        <div style="display:flex; flex-direction:column; gap:8px; margin-top:6px;">
            <button class="btn btn-main" style="width:100%; padding:10px; font-size:0.8em;" onclick="openHunterSkillsModal()">
                [ HABILIDADES DEL CAZADOR (PASIVAS Y ACTIVAS) ]
            </button>
            ${isVigilActiveTonight
                ? `<div style="padding:9px 12px; background:rgba(30,41,59,0.55); border:1px solid #818cf8; text-align:center; font-size:0.78em; color:#e0f2fe;">
                    <b>PASE DE VIGILIA NOCTURNA ACTIVO HOY</b><br>
                    <span style="color:#94a3b8;">Cero corrosión nocturna • Misiones al 100% (${vigilLeft}/2 restantes)</span>
                   </div>`
                : `<button class="btn btn-blue" style="width:100%; padding:10px; font-size:0.78em;" onclick="openNightVigilModal()">
                    PASE DE VIGILIA NOCTURNA (${vigilLeft}/2 ESTA SEMANA)
                   </button>`}
            ${isSleeping
                ? `<div style="padding:10px; background:rgba(14,165,233,0.12); border:1px solid #7dd3fc; text-align:center;">
                    <div style="color:#e0f2fe; font-weight:700; font-size:0.85em; margin-bottom:4px;">MODO HIBERNACIÓN ACTIVO</div>
                    <div style="color:#94a3b8; font-size:0.76em; margin-bottom:8px;">Signos vitales y tesorería protegidos hasta las 5:00 AM.</div>
                    <button class="btn btn-blue" style="padding:6px 12px; font-size:0.72em;" onclick="wakeUpFromSleepMode()">Desbloquear antes de las 5:00 AM</button>
                   </div>`
                : `<button class="btn btn-main" style="width:100%; padding:11px; font-size:0.78em;" onclick="activateNightSleepMode()">
                    TERMINAR DÍA Y DORMIR (CONGELAR DRENAJE NOCTURNO)
                   </button>`}
        </div>
    `;
}
/* ==========================================================================
   2. DRENAJE VISUAL RÁPIDO DE MANÁ (HUD Y MAZMORRA EN TIEMPO REAL)
   ========================================================================== */
let _rollingMpValue = null;
let _rollingMpRaf = null;
let _lastRenderedMpInt = null;
let _lastRenderedMpPct = null;
let _mpDomCache = null;

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

function renderMpElementsNow(val, maxMP) {
    let dom = _getMpDomElements();
    let safeMax = Math.max(1, maxMP);
    let displayInt = Math.max(0, Math.min(safeMax, Math.round(val)));
    let pctNum = Math.max(0, Math.min(100, (val / safeMax) * 100));
    let pctStr = `${pctNum.toFixed(2)}%`;

    if (_lastRenderedMpInt !== displayInt) {
        _lastRenderedMpInt = displayInt;
        let txt = `${displayInt}/${safeMax}`;
        if (dom.mpTxtEl) dom.mpTxtEl.textContent = txt;
        if (dom.rMpTxtEl) dom.rMpTxtEl.textContent = txt;
    }

    if (_lastRenderedMpPct !== pctStr) {
        _lastRenderedMpPct = pctStr;
        if (dom.mpBarEl) dom.mpBarEl.style.width = pctStr;
        if (dom.rMpBarEl) dom.rMpBarEl.style.width = pctStr;
    }
}

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
    if (Math.abs(diff) < 0.05) {
        _rollingMpValue = targetMP;
        renderMpElementsNow(targetMP, maxMP);
        return;
    }

    if (_rollingMpRaf) cancelAnimationFrame(_rollingMpRaf);

    let startVal = _rollingMpValue;
    let absDiff = Math.abs(diff);
    // Si es el tick continuo por segundo (drenaje/recarga), interpolar durante 960ms para que baje de 1 en 1 (100->99->98) sin pausas
    let durationMs = absDiff <= 25 ? 960 : Math.min(520, Math.max(240, absDiff * 1.1));
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
    if (!p || !p.dayZeroCompleted) return;
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

    if (p.hp <= 0 && !p.penaltyActive) {
        p.hp = 0;
        if (typeof triggerDeath === "function") {
            triggerDeath("Colapso vital absoluto detectado por el Sistema.", "routine");
        }
        return;
    }

    document.body.classList.toggle('penalty-active', !!p.penaltyActive);
     let _mH = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
     document.body.classList.toggle('tenacity-glitch-active', !!(p.hp > 0 && p.hp <= _mH * 0.30));
    let isStealthNow = !!(p.stealthModeUntil && Date.now() < p.stealthModeUntil);
    document.body.classList.toggle('stealth-camouflage-active', isStealthNow);
    let stealthBadge = document.getElementById('sl-stealth-hud-badge');
    if (isStealthNow) {
        let minsRem = Math.max(1, Math.ceil((p.stealthModeUntil - Date.now()) / 60000));
        if (!stealthBadge) {
            let hdr = document.querySelector('.header');
            if (hdr) {
                stealthBadge = document.createElement('div');
                stealthBadge.id = 'sl-stealth-hud-badge';
                stealthBadge.className = 'sl-stealth-hud-banner';
                hdr.insertBefore(stealthBadge, hdr.firstChild);
            }
        }
        if (stealthBadge) {
            stealthBadge.innerHTML = `<span>[ HABILIDAD: SIGILO ACTIVO • ${minsRem}M RESTANTES ]</span><span>EMBOSCADA x3 LISTA</span>`;
        }
    } else if (stealthBadge) {
        stealthBadge.remove();
    }

    let navItems = document.querySelectorAll('.nav-item');
    [1, 4, 5].forEach(i => {
        if (navItems[i]) navItems[i].classList.toggle('locked-nav', !!p.penaltyActive);
    });
    
    let now = Date.now();
    let currentDayStr = new Date().toDateString();
let maxHP = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
    if (p.hp <= maxHP) p.magmaOverheal = false;

    // Comprobador universal de Ascensión de Nivel (por si ganas EXP con habilidades activas o pergaminos)
    if (p.xp >= p.maxXp) {
        while (p.xp >= p.maxXp) {
            p.level++;
            p.xp -= p.maxXp;
            p.maxXp = (typeof getRequiredXpForLevel === "function") ? getRequiredXpForLevel(p.level) : Math.floor(100 + (p.level - 1) * 18);
            maxHP = (typeof calculateHunterMaxHP === 'function') ? calculateHunterMaxHP() : 100;
            p.hp = maxHP;
            p.sp = 100;
            p.crystals = (p.crystals || 0) + 2;
        }
        saveData();
        systemNotify(`¡ASCENSIÓN AL NIVEL ${p.level}! Vitalidad restaurada al 100% (+2 CM).`, "gold");
    }

    // Límite real y visual de Escudo = 800 (ej. 80 de escudo = 10% de la barra, sin sobrepasar la barra blanca de HP)
    p.arcticShield = Math.min(800, Math.max(0, Math.floor(p.arcticShield || 0)));
    let shieldVal = p.arcticShield;
    let displayHp = (p.hp % 1 === 0) ? p.hp : p.hp.toFixed(1);
    let isTenacityActive = (p.hp > 0 && p.hp <= maxHP * 0.30);

    safeSetText('lvl-display', p.level);
    safeSetText('xp-text', `${Math.floor(p.xp)}/${p.maxXp}`);
    safeSetText('hp-text', `${displayHp}/${maxHP}${isTenacityActive ? ' [TENACIDAD]' : ''}`);
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
    // Actualizar Anillo de 12 Segmentos de FATIGA (Fatiga = 100 - SP)
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
    
    let xpBar = document.getElementById('xp-bar'); 
    if (xpBar) {
        xpBar.style.width = `${Math.min(100, (p.xp / p.maxXp) * 100)}%`;
        xpBar.classList.remove('arc-st-01');
        xpBar.style.background = '';
        xpBar.style.boxShadow = '';
    }
    let hpBar = document.getElementById('hp-bar');
    let hpWrapEl = document.getElementById('hp-wrap');
    if (hpWrapEl) {
        hpWrapEl.classList.toggle('mercy-emerald-halo', isMercyActive());
        hpWrapEl.classList.toggle('pulse-danger', p.hp <= 30);
  }
    if (hpBar) {
        hpBar.style.width = `${Math.max(0, Math.min(100, (p.hp / maxHP) * 100))}%`;
        hpBar.classList.toggle('arc-st-02', !!(p._arcEclipseActive && now < p._arcEclipseActive));
    }

let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000; 
    let currentMP = p.mp !== undefined ? p.mp : 0;
    let hasUnlockedAnyShadow = p.shadowArmy && ['igris', 'tank', 'iron', 'tusk', 'beru'].some(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);

    animateMPDisplayTo(currentMP, maxMP);
    let mpBar = document.getElementById('mp-bar'); 
    if (mpBar) {
        mpBar.classList.toggle('arc-st-04', !!(p.zeroMpDrainUntil && now < p.zeroMpDrainUntil));
    }

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

// Rotar comentarios de la IA cada 45 segundos solo cuando la app está visible en pantalla
    setInterval(() => {
        if (document.hidden) return;
        const _sb = document.querySelector('.sys-log'); if (typeof triggerAiMonarchComment === 'function' && p && !p.penaltyActive && (!_sb || !_sb.classList.contains('sys-log-collapsed'))) {
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
        let d = new Date().toDateString();
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
            systemNotify(_k('W01JU0lP TiBTRUNSRVRBOiBFTCBWQVRpQ0lOSU8gREUgTE9TIERFQklMRVNdIFR1IGNvcmF6w7NuIHNlIG5pZWdhIGEgbW9yaXIuICszMyBIUCBkZSBlbWVyZ2VuY2lhLg=='), 'gold');
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
let dayZeroPlayerName = " ";

const DAY_ZERO_SEQUENCE = [
    {
        frame: "sl-holo-frame",
        header: "NOTIFICACIÓN",
        sub: "[ MISIÓN SECRETA COMPLETADA ]",
        body: "Has cumplido todos los requisitos necesarios para completar la Misión Secreta: «El Valor de los Débiles».",
        action: "Toca para continuar..."
    },
    {
        frame: "sl-holo-frame",
        header: "NOTIFICACIÓN",
        sub: "[ SELECCIÓN DE RECEPTÁCULO ]",
        body: "Has obtenido el derecho de convertirte en un JUGADOR.<br><br>¿Aceptas la designación del Sistema?",
        action: "Toca para continuar..."
    },
    {
        frame: "sl-holo-frame danger",
        header: "ADVERTENCIA",
        sub: "[ CRONÓMETRO VITAL ACTIVO ]",
        body: "<span class='ct-red-Runic'>NO TE QUEDA MUCHO TIEMPO.</span>",
        action: "Toca para continuar...",
        sound: "danger"
    },
    {
        frame: "sl-holo-frame danger",
        header: "CRÍTICO",
        sub: "[ AMENAZA BIOLÓGICA ]",
        body: "Si te niegas, tus signos vitales colapsarán y tu corazón se detendrá en <b class='ct-red-Runic' id='dz-crit-timer'>0.02 segundos</b>.<br><br>¿Aceptas ser el Receptáculo?",
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
        sub: "",
        body: "[ Felicitaciones por convertirte en un JUGADOR.\u00A0]",
        action: "Toca para continuar..."
    },
    {
        frame: "sl-holo-frame",
        header: "NOTIFICACIÓN",
        sub: "",
        body: "[ El Sistema asistirá y guiará el crecimiento continuo del Jugador. ]",
        action: "Toca para continuar..."
    },
    {
        frame: "sl-holo-frame danger",
        header: "NOTIFICACIÓN",
        sub: "[ CLÁUSULA INQUEBRANTABLE ]",
        body: "[ En caso de no cumplir estrictamente las directivas diarias del Sistema, se aplicará una <b class='ct-red-Runic'>ZONA DE PENALIZACIÓN</b> apropiada. ]",
        action: "Toca para continuar..."
    },
    {
        frame: "sl-holo-frame",
        header: "RECOMPENSA",
        sub: "",
        body: `
            ${(typeof UNIQUE_ITEM_SVGS !== 'undefined' && UNIQUE_ITEM_SVGS.box_start)
                ? `<div style="width:58px; height:58px; margin:0 auto 12px auto;"><svg viewBox="0 0 64 64" width="100%" height="100%">${UNIQUE_ITEM_SVGS.box_start}</svg></div>`
                : ''}
            [ Has recibido suministros iniciales: Caja de Despertar y Cupón de Almuerzo han sido materializados en tu Bolsa Dimensional. ]
        `,
        action: "Toca para continuar...",
        sound: "gold"
    },
            {
        frame: "sl-holo-frame",
        header: "NUEVO MENSAJE",
        sub: "",
        body: `
            ${(typeof UNIQUE_ITEM_SVGS !== 'undefined' && UNIQUE_ITEM_SVGS.box_start)
                ? `<div style="width:58px; height:58px; margin:0 auto 12px auto;"><svg viewBox="0 0 64 64" width="100%" height="100%">${UNIQUE_ITEM_SVGS.box_start}</svg></div>`
                : ''}
            <div style="margin-bottom:8px; color:#7dd3fc;">[ Jugador: <span id="dz-final-name-disp"></span> ]</div>
            [ Misión Diaria: «La preparación para volverse fuerte» ha sido asignada. <span style="color:#fb7185;">(NO LEÍDA)</span>. ]
        `,
        type: "finish"
    }
];

window.startDayZeroPrologue = function() {
    let ov = document.getElementById('sl-day-zero-overlay');
    if (!ov) return;
    ov.style.display = 'flex';
    dayZeroStep = 0;
    
    // Sincronizar el nombre guardado previamente si existe
    if (p && p.playerName) dayZeroPlayerName = p.playerName;
    
    renderDayZeroStep();
};

window.renderDayZeroStep = function() {
    let ov = document.getElementById('sl-day-zero-overlay');
    let cont = document.getElementById('sl-day-zero-content');
    if (!ov || !cont) return;

    if (dayZeroStep >= DAY_ZERO_SEQUENCE.length) {
        finishDayZeroPrologue();
        return;
    }

    let stepData = DAY_ZERO_SEQUENCE[dayZeroStep];
    let cornerSVG = (typeof getBaroqueCornerSVG === "function") ? getBaroqueCornerSVG() : '';

    if (stepData.sound && typeof playSystemSound === "function") {
        playSystemSound(stepData.sound);
    } else if (typeof playSystemSound === "function" && dayZeroStep > 0) {
        playSystemSound('step_arrow');
    }

    let innerContent = "";
    if (stepData.type === "choice") {
        innerContent = `
            <div style="display:flex; gap:8px; margin-top:16px;">
                <button class="btn btn-main" style="flex:1;" onclick="advanceDayZeroStep()">ACEPTAR</button>
                <button class="btn btn-red" id="dz-btn-reject" style="flex:1;" onclick="handleDayZeroReject()">RECHAZAR</button>
            </div>
        `;
    } else if (stepData.type === "input") {
        innerContent = `
            <input type="text" id="dz-name-input" class="sl-name-bestow-input" value="${p.playerName || 'Cristian'}" style="margin:16px auto 12px auto; max-width:240px;">
            <button class="btn btn-main" style="width:100%;" onclick="confirmDayZeroRegistration()">CONFIRMAR REGISTRO</button>
        `;
    } else if (stepData.type === "finish") {
        innerContent = `
            <button class="btn btn-main" style="width:100%; margin-top:16px; padding:14px; font-size:1em;" onclick="finishDayZeroPrologue()">INGRESAR AL DOMINIO DEL MONARCA</button>
        `;
    } else {
        innerContent = `
            <div class="sl-holo-footer-hint" style="margin-top:16px; cursor:pointer;" onclick="advanceDayZeroStep()">${stepData.action}</div>
        `;
    }

    cont.innerHTML = `
        <div class="${stepData.frame} sl-day-zero-fade" style="width:100%; cursor:default;" ${(!stepData.type) ? 'onclick="advanceDayZeroStep()"' : ''}>
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
                    ${stepData.sub ? `<div class="sl-holo-subbracket" style="margin-bottom:14px;">${stepData.sub}</div>` : ''}
                    <div style="font-family:'Share Tech Mono', monospace; font-size:0.95em; color:#e2e8f0; line-height:1.5; margin-bottom:8px; word-break:break-word;">
                        ${stepData.body}
                    </div>
                    ${innerContent}
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-core"></span></div>
        </div>
    `;

        if (stepData.type === "input") {
        setTimeout(() => {
            let inp = document.getElementById('dz-name-input');
            if (inp) { inp.focus(); inp.select(); }
        }, 150);
    } else if (stepData.type === "finish") {
        let nameDisp = document.getElementById('dz-final-name-disp');
        if (nameDisp) nameDisp.innerText = dayZeroPlayerName.toUpperCase();
    }
};

window.advanceDayZeroStep = function() {
    dayZeroStep++;
    renderDayZeroStep();
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
    if (p) {
        p.playerName = dayZeroPlayerName;
        if (typeof saveData === "function") saveData();
        if (typeof renderStatusRadarProfile === "function") renderStatusRadarProfile();
    }
    advanceDayZeroStep();
};

window.finishDayZeroPrologue = function() {
    let ov = document.getElementById('sl-day-zero-overlay');
    if (!ov) return;

    if (p) {
        p.dayZeroCompleted = true;
        if (!p.inventory) p.inventory = [];
        let hasStartBox = p.inventory.some(i => i.id === "box_start");
        if (!hasStartBox) {
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
                desc: "Regenera 40 SP de forma pausada. Válido únicamente de 11:15 AM a 2:00 PM.",
                rank: "B",
                type: "item"
            });
        }
        if (typeof saveData === "function") saveData();
    }

    if (typeof playSystemSound === "function") playSystemSound('monarch_awakening');

    ov.style.transition = "opacity 0.6s ease";
    ov.style.opacity = "0";
    setTimeout(() => {
        ov.remove();
        let todayBootKey = new Date().toDateString();
        localStorage.setItem('SL_BootShownDay', todayBootKey);
        if (typeof initializeSystem === "function") {
            initializeSystem();
        }
        if (typeof switchTab === "function") switchTab('routine', 0);
    }, 650);
};