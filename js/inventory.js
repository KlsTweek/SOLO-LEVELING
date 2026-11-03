/* ==========================================================================
   INVENTORY.JS - REMASTER DE ARMERÍA, POSES Y PRIVILEGIOS CON EFECTOS REALES
   ========================================================================== */

/* ==========================================================================
   1. CATÁLOGO DE MECÁNICAS ÚNICAS Y POSES POR RELIQUIA
   ========================================================================== */
const RELIC_MECHANICS = {
    // --- 16 ARMAS ---
    "eq_w_kim":          { pose: "Vanguardia de Espada",    passive: "Corte de Superviviente: +10% de ancho en la Zona Vital del Corte Dimensional." },
    "eq_w_goblin":       { pose: "Asesino Invertido",       passive: "Paso Rápido: Otorga 8% de probabilidad de Esquivar (Dodge) daño en mazmorras." },
    "eq_w_razor":        { pose: "Asesino Invertido",       passive: "Desgarro Lycan: Cada ataque directo al Jefe le causa -25 HP extra por sangrado." },
    "eq_w_iron_mace":    { pose: "Berserker Colosal",       passive: "Rompecráneos: Tus ataques directos al Jefe tienen 28% de probabilidad de aturdirlo." },
    "eq_w_arachnid":     { pose: "Asesino Invertido",       passive: "Filo Ácido: Reduce la defensa del Jefe aumentando el daño de tus sombras un +25%." },
    "eq_w_bow":          { pose: "Francotirador Fantasma",  passive: "Disparo Lejano: Atacas con flechas de maná desde lejos y ganas +12% de Evasión contra Jefes." },
    "eq_w1":             { pose: "Asesino Kasaka",          passive: "Veneno y Parálisis de Kasaka: Retrasa los ataques del Jefe y le drena -35 HP cada turno." },
    "eq_w_killer":       { pose: "Asesino Carmesí",         passive: "Perforador de Placas: Tus ataques directos hacen el DOBLE de daño (x2) contra Jefes Rango B, A, S y SSS." },
    "eq_w_halberd":      { pose: "Lancero Imperial",        passive: "Alcance de Caballería: Si Igris o Tank están activos, sus ataques en choque hacen +45% de daño." },
    "eq_w_baruka":       { pose: "Tormenta Hyakki",         passive: "Viento Élfico: Ralentiza un 20% la aguja del Corte Dimensional y otorga +18% de Evasión." },
    "eq_w_kargalgan":    { pose: "Canalizador Arcano",      passive: "Amplificador de Kargalgan: Duplica (x2) el poder de Tusk y reduce un 35% el costo de sus hechizos." },
    "eq_w_vulcan_club":  { pose: "Berserker Volcánico",     passive: "Impacto de Magma: Cada golpe tuyo sacude la mazmorra quemando -85 HP adicionales al Jefe." },
    "eq_w_scythe":       { pose: "Segador Abisal",          passive: "Cosecha de Almas: Cada misión o fase sellada te cura +25 HP y recarga +250 MP adicionales." },
    "eq_w_demon_daggers":{ pose: "Relámpago Gemelo",        passive: "Velocidad de Baran: Reduce 28% tu enfriamiento de ataque y cada golpe recarga +85 MP." },
    "eq_w_demon_sword":  { pose: "Esgrimista del Trueno",   passive: "Tormenta de Llamas Blancas: Cada turno cae un rayo automático que inflige -65 HP al Jefe." },
    "eq_w_kamish":       { pose: "Calamidad de Kamish",     passive: "Ira del Dragón: Todo golpe en zona roja cuenta como Crítico Perfecto y reduce 35% la vida inicial de los Jefes." },

    // --- ARMADURAS Y JOYERÍA DE 7 RANURAS ---
    "eq_a_leather":      { silhouette: "Cazador Ligero",       passive: "Cuero Curtido: Reduce en -4 HP cualquier daño por fallo en el Corte Dimensional." },
    "eq_a_boots_e":      { silhouette: "Corredor Táctico",     passive: "Paso Firme: Reduce en -5 SP el costo de iniciar cualquier misión física o de limpieza." },
    "eq_g_low":          { silhouette: "Guantelete Ligero",    passive: "Puño de Acero: Daño físico -4% y +10% daño en golpes directos al Jefe." },
    "eq_a_serpento":     { silhouette: "Motociclista Blindado",passive: "Rey de Los Chorros: Las misiones de Tráfico cuestan 50% menos SP y pagan +35 G extra." },
    "eq_a_helm_d":       { silhouette: "Vanguardia de Acero",  passive: "Cráneo Blindado: Inmune al daño de trampas y bloquea -10 HP de daño de Jefes." },
    "eq_b_mid":          { silhouette: "Caballería Media",     passive: "Impulso Táctico: +8% Evasión y acelera un 6% tus desplazamientos en mazmorra." },
    "eq_a_gloves_c":     { silhouette: "Cazador Escamado",     passive: "Agarre de Serpiente: Inmune al veneno de pantano (-0 HP en biomas tóxicos) y +10% precisión." },
    "eq_a_assassin":     { silhouette: "Espectro de Sigilo",   passive: "Camuflaje de Taeshik: +20% de Evasión (Dodge) y los primeros 3 min de mazmorra no sufres daño ambiental." },
    "eq_a_mage_b":       { silhouette: "Túnica Arcana",        passive: "Tejido de Maná: Regenera +35 MP por minuto de forma pasiva para sostener a tus sombras." },
    "eq_g_high":         { silhouette: "Guantelete Real",      passive: "Guantelete de Alto Rango: Daño físico -8% y ensancha +10% la zona crítica del Corte." },
    "eq_h_crimson":      { silhouette: "Yelmo Carmesí",        passive: "Casco del Caballero Carmesí: Daño físico -15% y +80 HP de vitalidad máxima." },
    "eq_a1":             { silhouette: "Armadura de Igris",    passive: "Pacto del Caballero Rojo: Igris consume 0 MP/min mientras lleves esta pechera y su activa cuesta -110 MP." },
    "eq_a_high_orc":     { silhouette: "Coloso Alto Orco",     passive: "Sed de Sangre Orca: Aumenta tu HP Máximo en +150 HP adicionales y +30% daño físico." },
    "eq_a_valkyrie":     { silhouette: "Cazador Alado",        passive: "Velocidad Supersónica: Los relojes de las fases de mazmorra corren un 15% más rápido a tu favor." },
    "eq_a_archlich":     { silhouette: "Arquimago Abisal",     passive: "Dominio de la Muerte: Reduce en un 40% el drenaje de MP por minuto de todos tus Comandantes." },
    "eq_h_shadow":       { silhouette: "Corona Sombría",       passive: "Mente del Monarca: Reduce un 25% el costo de MP de todas las habilidades y suma +40 MP/min." },
    "eq_a_giant":        { silhouette: "Titán de Legia",       passive: "Coraza Nacional: Otorga +250 HP Máximos y reduce a la mitad (50%) todo daño en Choques de Jefe." },
    "eq_g_monarch":      { silhouette: "Garras del Rey",       passive: "Desgarro de Jeju: Cada golpe directo al Jefe drena +35 HP de vida para ti." },
    "eq_a_beru":         { silhouette: "Coraza Rey Hormiga",   passive: "Regeneración de Quitina: Regenera +20 HP + 4% de tu HP Máx por minuto en mazmorra y da +22% Evasión." },
    "eq_b_shadow":       { silhouette: "Paso de Ashborn",      passive: "Velocidad del Soberano: +18% Evasión y +15% velocidad de reloj en Mazmorras." },
    "eq_a_ashborn":      { silhouette: "Monarca Sombrío",      passive: "Trono de Ashborn: Otorga +350 HP Máximos, -55% drenaje de MP de sombras y activa Armadura de Maná." },
    "eq_acc_copper":     { aura: "Anillo Mental",              passive: "Mente Clara: Las sesiones en la Cámara de Focus otorgan +25% más de EXP y +120 MP." },
    "eq_acc_wolf":       { aura: "Instinto Lupino",            passive: "Cazador de Manada: +15% de Oro en todas las incursiones y +8% de Evasión." },
    "eq_acc_silver":     { aura: "Sello Oficial",              passive: "Autoridad de la Asociación: +25 G adicionales al sellar misiones de rutina." },
    "eq_acc_cerberus":   { aura: "Collar del Guardián",        passive: "Furia de Cerbero: Inmune al desgaste de SP en biomas de fuego y +50% de daño bajo 50% HP." },
    "eq_acc_gate":       { aura: "Runas de Cartenon",          passive: "Sobreviviente del Templo: Reduce a la mitad la pérdida de HP al huir o fallar un sello." },
    "eq_r_mage":         { aura: "Anillo de Alto Rango",       passive: "Conductividad Arcana: Daño mágico +20% y +60 MP/min de recarga pasiva." },
    "eq_acc_metus":      { aura: "Necromancia Pura",           passive: "Voz de Metus: Tus soldados, osos y magos de infantería rinden un +50% más." },
    "eq_acc_kandiaru":   { aura: "Bendición del Arquitecto",   passive: "Cuerpo Indestructible: Regenera +12 HP y +8 SP en cada evento narrativo de mazmorra." },
    "eq_acc_national":   { aura: "Estrella Nacional",          passive: "Autoridad de Nivel Nacional: Aumenta en +35% el Oro y EXP de Portales Rango A, S y SSS." },
    "eq_acc_chalice":    { aura: "Reloj de los Gobernantes",   passive: "Distorsión de los Gobernantes: Regenera +90 MP/min pasivos y acelera tu recuperación de habilidades." },
    "eq_acc_black_heart":{ aura: "El Corazón Negro",           passive: "Núcleo del Monarca: Regenera +700 MP/min + 3% de tu MP Máximo por minuto de forma pasiva." }
};

const SEVEN_EQUIP_SLOTS = ['head', 'chest', 'gloves', 'necklace', 'weapon', 'ring', 'boots'];

function ensureSevenSlotEquipment() {
    if (!p) return;
    if (!p.equipment) p.equipment = {};
    // Migrar automáticamente si el jugador tenía ítems en las ranuras antiguas "armor" o "accessory"
    if (p.equipment.armor) {
        let oldArmor = p.equipment.armor;
        let dbMatch = (typeof shopDB !== 'undefined') ? shopDB.find(x => x.id === oldArmor.id) : null;
        let targetSlot = (dbMatch && dbMatch.slot) ? dbMatch.slot : 'chest';
        oldArmor.slot = targetSlot;
        if (!p.equipment[targetSlot]) p.equipment[targetSlot] = oldArmor;
        else p.inventory.push(oldArmor);
        delete p.equipment.armor;
    }
    if (p.equipment.accessory) {
        let oldAcc = p.equipment.accessory;
        let dbMatch = (typeof shopDB !== 'undefined') ? shopDB.find(x => x.id === oldAcc.id) : null;
        let targetSlot = (dbMatch && dbMatch.slot) ? dbMatch.slot : 'necklace';
        oldAcc.slot = targetSlot;
        if (!p.equipment[targetSlot]) p.equipment[targetSlot] = oldAcc;
        else p.inventory.push(oldAcc);
        delete p.equipment.accessory;
    }
    SEVEN_EQUIP_SLOTS.forEach(s => {
        if (p.equipment[s] === undefined) p.equipment[s] = null;
    });
    // Actualizar las ranuras de cualquier reliquia guardada en la bolsa
    if (Array.isArray(p.inventory) && typeof shopDB !== 'undefined') {
        p.inventory.forEach(it => {
            let dbIt = shopDB.find(x => x.id === it.id);
            if (dbIt && dbIt.slot) it.slot = dbIt.slot;
        });
    }
}

window.hasEquippedItem = function(itemId) {
    if (!p || !p.equipment) return false;
    return SEVEN_EQUIP_SLOTS.some(s => p.equipment[s] && p.equipment[s].id === itemId);
};

function getRelicInfo(itemId) {
    return RELIC_MECHANICS[itemId] || null;
}

function getActiveSetBonuses() {
    if (!p || !p.equipment) return [];
    ensureSevenSlotEquipment();
    let sets = [];

    if ((hasEquippedItem("eq_w_killer") || hasEquippedItem("eq_w_halberd") || hasEquippedItem("eq_h_crimson")) && hasEquippedItem("eq_a1")) {
        sets.push({ name: "Set del Comandante Sangriento", desc: "Igris consume 0 MP/m y ataca con doble frecuencia." });
    }
    if ((hasEquippedItem("eq_w_demon_daggers") || hasEquippedItem("eq_w_demon_sword")) && (hasEquippedItem("eq_a_archlich") || hasEquippedItem("eq_acc_national"))) {
        sets.push({ name: "Set del Rey Demonio Baran", desc: "Relámpagos blancos automáticos cada 10s en mazmorra." });
    }
    if (hasEquippedItem("eq_w_kamish") && hasEquippedItem("eq_a_ashborn") && hasEquippedItem("eq_acc_black_heart")) {
        sets.push({ name: "Set Supremo: Soberano del Abismo", desc: "Inmune a rotura de ítems, +200 MP/m adicionales y daño letal absorbido por maná." });
    }
    return sets;
}

function calculateHunterMaxHP() {
    if (!p) return 100;
    ensureSevenSlotEquipment();
    let crimsonHelmBonus = hasEquippedItem("eq_h_crimson") ? 80 : 0;
    let orcArmorBonus    = hasEquippedItem("eq_a_high_orc") ? 150 : 0;
    let giantArmorBonus  = hasEquippedItem("eq_a_giant") ? 250 : 0;
    let ashbornBonus     = hasEquippedItem("eq_a_ashborn") ? 350 : 0;
    let bearHpPerUnit    = hasEquippedItem("eq_acc_metus") ? 12 : 8;
    let availBears       = (typeof getAvailableInfantryCount === "function")
        ? getAvailableInfantryCount('bears')
        : ((p.infantry && p.infantry.bears && !(p.infantryDisabled && p.infantryDisabled.bears)) ? p.infantry.bears : 0);
    let bearBonusHP      = Math.floor(availBears * bearHpPerUnit);
    let equipBonusHP     = crimsonHelmBonus + orcArmorBonus + giantArmorBonus + ashbornBonus;
    let maxHP = p.stats
        ? Math.floor(100 + ((p.stats.str - 1) * 25) + bearBonusHP + equipBonusHP)
        : (100 + bearBonusHP + equipBonusHP);
    if (p.abyssCurseUntil && Date.now() < p.abyssCurseUntil) {
        maxHP = Math.floor(maxHP * 0.5);
    }
    return maxHP;
}
/* ==========================================================================
   2. PUENTE CONECTOR CON MODELS.JS (INVOCACIÓN DIRECTA DE MODELOS SVG)
   ========================================================================== */
function getIconFor(itemOrTitle, type) {
    let id = "", slot = "", cat = "", t = "";
    if (typeof itemOrTitle === 'object' && itemOrTitle !== null) {
        id = (itemOrTitle.id || "").toLowerCase();
        slot = (itemOrTitle.slot || "").toLowerCase();
        cat = (itemOrTitle.cat || "").toLowerCase();
        type = itemOrTitle.type || type;
        t = (itemOrTitle.title || itemOrTitle.t || "").toLowerCase();
    } else {
        t = (itemOrTitle || "").toLowerCase();
    }

const strokeMain = "#ffffff";
    const strokeAccent = "#7dd3fc";
    const fillGlow = "rgba(0, 210, 255, 0.22)";

    const baseAttr = `class="sl-holo-glyph" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"`;
    const s1 = `stroke="${strokeMain}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
    const s2 = `stroke="${strokeAccent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;
    const f1 = `fill="${fillGlow}"`;

    const itemDict = (typeof UNIQUE_ITEM_SVGS !== 'undefined') ? UNIQUE_ITEM_SVGS : window.UNIQUE_ITEM_SVGS;
    const lootDict = (typeof UNIQUE_LOOT_SVGS !== 'undefined') ? UNIQUE_LOOT_SVGS : window.UNIQUE_LOOT_SVGS;

    let body = (itemDict && itemDict[id]) || (lootDict && lootDict[t]);
    if (!body) {
        if (slot === "weapon" || id.startsWith("eq_w")) {
            body = `<g transform="rotate(35 32 32)"><polygon points="32,6 37,18 35,44 29,44 27,18" F1 S1/><path d="M20 44 L44 44 M32 44 L32 56" S2/></g>`;
        } else if (slot === "armor" || id.startsWith("eq_a")) {
            body = `<path d="M14 12 L50 12 L48 36 L32 56 L16 36 Z" F1 S1/><polygon points="32,18 38,32 32,46 26,32" fill="#ffffff"/>`;
        } else if (slot === "accessory" || id.startsWith("eq_acc")) {
            body = `<circle cx="32" cy="36" r="15" F1 S1/><polygon points="32,10 39,20 25,20" fill="#ffffff" S2/>`;
        } else if (cat.includes("pergamino") || id.startsWith("p")) {
            body = `<rect x="14" y="10" width="36" height="44" rx="3" F1 S1/><polygon points="32,20 38,32 32,44 26,32" fill="#ffffff"/>`;
        } else if (cat.includes("privilegio") || id.startsWith("v")) {
            body = `<polygon points="32,8 54,22 46,50 18,50 10,22" F1 S1/><circle cx="32" cy="30" r="6" fill="#ffffff"/>`;
        } else {
            body = `<path d="M24 8 L40 8 M28 8 L28 20 L14 48 L50 48 L36 20 L36 8" F1 S1/><polygon points="32,26 37,36 32,44 27,36" fill="#ffffff"/>`;
        }
    }

body = body.replace(/\bS1\b/g, s1).replace(/\bS2\b/g, s2).replace(/\bF1\b/g, f1);
    return `<svg ${baseAttr}>${body}</svg>`;
}

// Si models.js terminó de cargar de forma asíncrona, limpiar caché previo y re-renderizar los iconos reales
window.addEventListener('load', () => {
    if (typeof shopDB !== 'undefined') {
        shopDB.forEach(it => { delete it._cachedSvg; delete it._cachedInspectorHtml; });
    }
    if (typeof renderShop === 'function') renderShop();
    if (typeof renderInventory === 'function') renderInventory();
    if (typeof updateEquipmentUI === 'function') {
        window._lastEquipHash = null;
        updateEquipmentUI();
    }
});
/* ==========================================================================
   3. RENDERIZADO DEL MERCADO (VISTA CUADRÍCULA / LISTA Y ANTI-DUPLICADOS)
   ========================================================================== */
let currentShopCat = 'Consumibles';
let isShopListView = false;
let currentShopSortMode = 'rank'; // 'rank' (E -> SSS), 'price' (menor a mayor), 'name' (A -> Z)

const SHOP_RANK_ORDER = { 'E': 1, 'D': 2, 'C': 3, 'B': 4, 'A': 5, 'S': 6, 'SS': 7, 'SSS': 8 };

window.filterShop = function(cat) {
    currentShopCat = cat;
    renderShop();
};

window.toggleShopViewMode = function() {
    isShopListView = !isShopListView;
    renderShop();
};

window.cycleShopSortMode = function() {
    if (currentShopSortMode === 'rank') currentShopSortMode = 'price';
    else if (currentShopSortMode === 'price') currentShopSortMode = 'name';
    else currentShopSortMode = 'rank';
    renderShop();
};
function isRelicAlreadyOwned(itemId) {
    if (!p) return false;
    ensureSevenSlotEquipment();
    let inBag = p.inventory && p.inventory.some(x => x.id === itemId);
    let inEq = hasEquippedItem(itemId);
    return !!(inBag || inEq);
}

const REAL_ACTION_IDS = ["c_posture", "c_breathing", "c_eye_drops", "c_cold_splash", "c_adrenaline", "c_sage_tea", "c_cartenon_candle", "c_giant_serum", "c_baran_drop", "p_iron_trial", "p_zone_purge"];

function isRealActionDoneToday(itemId) { if (!p || !REAL_ACTION_IDS.includes(itemId)) return false; let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
    if (p.realActionsDay !== todayKey) return false;
    return Array.isArray(p.realActionsClaimed) && p.realActionsClaimed.includes(itemId);
}

function isCoffeeOnWeeklyCooldown() {
    if (!p || !p.lastCoffeeBoughtAt) return false;
    return (Date.now() - p.lastCoffeeBoughtAt) < (7 * 24 * 3600000);
}

function isImperialMarchOnCooldown() {
    if (!p || !p.lastImperialMarchBoughtAt) return false;
    return (Date.now() - p.lastImperialMarchBoughtAt) < (3 * 24 * 3600000);
}

function getShortItemSummary(item) {
    if (item.cat === 'Armería') {
        let rm = getRelicInfo(item.id);
        let st = [];
        if (item.stats) {
            if (item.stats.str) st.push(`+${item.stats.str} STR`);
            if (item.stats.int) st.push(`+${item.stats.int} INT`);
            if (item.stats.agi) st.push(`+${item.stats.agi} AGI`);
        }
        let shortPass = rm && rm.passive ? rm.passive.split(':')[1] || rm.passive : item.desc;
        return `${st.join(' ')} • ${shortPass.trim()}`;
    }
    let clean = item.desc.replace(/\[.*?\]/g, '').replace(/^[\.\s:•-]+/, '').trim();
    if (clean.includes(':')) clean = clean.split(':').slice(1).join(':').replace(/^[\.\s:•-]+/, '').trim();
    return clean.length > 78 ? clean.slice(0, 75) + '...' : clean;
}

let shopSearchQuery = '';
let isShopSearchOpen = false;
let shopSearchDebounce = null;

function ensureShopSearchStyles() {
    if (document.getElementById('sl-shop-search-css')) return;
    let st = document.createElement('style');
    st.id = 'sl-shop-search-css';
    st.innerHTML = `
        body.keyboard-search-mode .header { display: none !important; }
        body.keyboard-search-mode .nav { display: none !important; }
        body.keyboard-search-mode #tab-shop { padding-top: 10px !important; padding-bottom: 30px !important; }
        body.keyboard-search-mode #tab-shop .shop-tabs { display: none !important; }
        #shop-search-wrap {
            position: sticky; top: 6px; z-index: 940;
            background: rgba(3, 10, 24, 0.98);
            border: 1.5px solid #00d2ff;
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 210, 255, 0.3);
            padding: 8px; border-radius: 2px; margin-bottom: 14px;
        }
    `;
    document.head.appendChild(st);
}

window.toggleShopSearchBar = function() {
    ensureShopSearchStyles();
    isShopSearchOpen = !isShopSearchOpen;
    let wrap = document.getElementById('shop-search-wrap');
    let inp = document.getElementById('shop-search-input');
    if (wrap) wrap.style.display = isShopSearchOpen ? 'block' : 'none';
    if (isShopSearchOpen && inp) {
        inp.focus();
    } else if (!isShopSearchOpen) {
        document.body.classList.remove('keyboard-search-mode');
        shopSearchQuery = '';
        if (inp) inp.value = '';
        renderShop();
    }
};

window.onShopSearchInput = function(val) {
    shopSearchQuery = (val || '').trim().toLowerCase();
    if (shopSearchDebounce) clearTimeout(shopSearchDebounce);
    // Debounce de 60ms para que el teclado de Android escriba 100% libre sin tirones
    shopSearchDebounce = setTimeout(() => {
        requestAnimationFrame(renderShop);
    }, 60);
};

function renderShop() {
    ensureShopSearchStyles();
    const shopContainer = document.getElementById('shop-container');
    if (!shopContainer || typeof shopDB === 'undefined') return;

 let shopHeader = document.querySelector('#tab-shop .section-header');
    if (shopHeader && !document.getElementById('btn-shop-view-mode')) {
        let btnGroup = document.createElement('div');
        btnGroup.style.cssText = 'display:flex; gap:5px; align-items:center;';

        const svgLupa = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px #00e5ff);"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
        const svgCloseX = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#ffe4e6" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

        let searchBtn = document.createElement('button');
        searchBtn.id = 'btn-shop-search';
        searchBtn.className = 'btn btn-blue';
        searchBtn.style.cssText = 'height:28px; width:28px; padding:0 !important; display:inline-flex; align-items:center; justify-content:center;';
        searchBtn.innerHTML = svgLupa;
        searchBtn.onclick = toggleShopSearchBar;

        let sortBtn = document.createElement('button');
        sortBtn.id = 'btn-shop-sort';
        sortBtn.className = 'btn btn-blue';
        sortBtn.style.cssText = 'height:28px; padding:0 7px !important; font-size:0.62em !important; letter-spacing:0.6px !important; display:inline-flex; align-items:center; justify-content:center; white-space:nowrap;';
        sortBtn.onclick = cycleShopSortMode;

        let toggleBtn = document.createElement('button');
        toggleBtn.id = 'btn-shop-view-mode';
        toggleBtn.className = 'btn btn-blue';
        toggleBtn.style.cssText = 'height:28px; padding:0 8px !important; font-size:0.62em !important; letter-spacing:0.6px !important; display:inline-flex; align-items:center; justify-content:center; white-space:nowrap;';
        toggleBtn.onclick = toggleShopViewMode;

        btnGroup.appendChild(searchBtn);
        btnGroup.appendChild(sortBtn);
        btnGroup.appendChild(toggleBtn);
        shopHeader.appendChild(btnGroup);

        let searchWrap = document.createElement('div');
        searchWrap.id = 'shop-search-wrap';
        searchWrap.style.display = 'none';
        searchWrap.innerHTML = `
            <div style="display:flex; gap:6px; align-items:center;">
                <div style="position:relative; flex:1; display:flex; align-items:center;">
                    <span style="position:absolute; left:10px; pointer-events:none; opacity:0.8;">${svgLupa}</span>
                    <input type="text" id="shop-search-input" class="input-dark" style="margin:0; padding:10px 12px 10px 34px; font-size:0.92em; border-color:#38bdf8; width:100%;" placeholder="Escribe clave (cm, sp, llave, gratis)..."
                        onfocus="document.body.classList.add('keyboard-search-mode')"
                        onblur="setTimeout(()=>document.body.classList.remove('keyboard-search-mode'), 180)"
                        oninput="onShopSearchInput(this.value)">
                </div>
                <button class="btn btn-red" style="padding:10px 12px; display:flex; align-items:center; justify-content:center;" onclick="toggleShopSearchBar()">${svgCloseX}</button>
            </div>
        `;
        shopHeader.parentNode.insertBefore(searchWrap, shopHeader.nextSibling);
    }

    let btnSort = document.getElementById('btn-shop-sort');
    if (btnSort) {
        let sortLabels = { 'rank': '⇅ RANGO', 'price': '⇅ PRECIO', 'name': '⇅ NOMBRE' };
        btnSort.innerText = sortLabels[currentShopSortMode] || '⇅ RANGO';
    }

    let btnMode = document.getElementById('btn-shop-view-mode');
    if (btnMode) {
        btnMode.innerText = isShopListView ? '⊞ ICONOS' : '☰ LISTA';
    }

    shopContainer.className = isShopListView ? 'shop-list-view' : 'minecraft-grid';

    let items = [];
    if (shopSearchQuery.length > 0) {
        items = shopDB.filter(i => {
            if (!i._searchBlob) {
                let relic = getRelicInfo(i.id);
                let rTxt = relic ? `${relic.pose || ''} ${relic.silhouette || ''} ${relic.aura || ''} ${relic.passive || ''}` : '';
                i._searchBlob = `${i.title} ${i.desc} ${i.cat} ${i.rank} ${i.cost === 0 ? 'gratis 0g' : i.cost + 'g'} ${rTxt}`.toLowerCase();
            }
            return i._searchBlob.includes(shopSearchQuery);
        });
        if (items.length === 0) {
            shopContainer.className = '';
            shopContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:22px 10px; font-size:0.9em;">No se encontraron artefactos con la clave «<b>${shopSearchQuery}</b>».</p>`;
            return;
        }
    } else {
        items = shopDB.filter(i => i.cat === currentShopCat);
    }

    // Ordenar ítems: Por Rango (E arriba -> S/SSS abajo), Por Precio (Menor a Mayor) o Por Nombre (A-Z)
    items = [...items].sort((a, b) => {
        if (currentShopSortMode === 'price') {
            return (a.cost || 0) - (b.cost || 0) || (SHOP_RANK_ORDER[a.rank] || 5) - (SHOP_RANK_ORDER[b.rank] || 5);
        }
        if (currentShopSortMode === 'name') {
            return (a.title || '').localeCompare(b.title || 'es');
        }
        let rA = SHOP_RANK_ORDER[a.rank] || 5;
        let rB = SHOP_RANK_ORDER[b.rank] || 5;
        if (rA !== rB) return rA - rB;
        return (a.cost || 0) - (b.cost || 0);
    });

    // Construir todo el HTML en memoria y tocar el DOM 1 sola vez (40x más rápido)
    let htmlBuffer = '';
    items.forEach(item => {
        let isOwned = (item.cat === 'Armería' || item.slot) && isRelicAlreadyOwned(item.id);
        let isCoffeeLocked = (item.id === 'c6') && isCoffeeOnWeeklyCooldown();
        let isActionDone = isRealActionDoneToday(item.id);
        let canBuy = p.gold >= item.cost && !isOwned && !isCoffeeLocked && !isActionDone;
        if (!item._cachedSvg) item._cachedSvg = getIconFor(item);
        let icon = item._cachedSvg;
        let costTxt = item.cost === 0 ? 'GRATIS' : `${item.cost}G`;

if (isShopListView) {
            let rightTag = isOwned
                ? `<span style="color:#94a3b8; font-size:0.72em; font-weight:700; font-family:'Share Tech Mono', monospace;">✓ EN POSESIÓN</span>`
                : (isActionDone
                    ? `<span style="color:var(--success); font-size:0.72em; font-family:'Share Tech Mono', monospace;">✓ HECHO HOY</span>`
                    : (isCoffeeLocked
                        ? `<span style="color:var(--danger); font-size:0.7em; font-family:'Share Tech Mono', monospace;">⏳ 1/SEMANA</span>`
                        : `<span style="color:${item.cost === 0 ? 'var(--success)' : 'var(--text-gold)'}; font-weight:700; font-family:'Share Tech Mono', monospace;">${item.cost === 0 ? 'GRATIS' : costTxt}</span>`));

            htmlBuffer += `
            <div class="card rank-${item.rank}" style="content-visibility:auto; contain-intrinsic-size:68px; padding:12px 14px; margin-bottom:8px; opacity:${(isOwned || isCoffeeLocked || isActionDone) ? '0.45' : '1'}; filter:${isOwned ? 'grayscale(90%)' : 'none'}; cursor:pointer;" onclick="inspectShopItem('${item.id}')">
                <div style="display:flex; align-items:center; gap:12px; width:100%;">
                    <div class="shop-list-icon-box">${icon}</div>
                    <div style="flex:1; min-width:0; opacity:${canBuy ? '1' : '0.72'};">
                        <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
                            <span style="font-weight:700; color:#fff; font-size:0.98em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</span>
                            ${rightTag}
                        </div>
                        <div style="font-size:0.8em; color:var(--text-lore); line-height:1.25; margin-top:3px;">${getShortItemSummary(item)}</div>
                    </div>
                </div>
            </div>`;
        } else {
            let opacity = (isOwned || isCoffeeLocked || isActionDone) ? '0.35' : (canBuy ? '1' : '0.45');
            let grayFilter = isOwned ? 'filter:grayscale(100%);' : '';
            let priceLabel = isOwned ? 'POSEÍDO' : (isActionDone ? 'HECHO' : (isCoffeeLocked ? '7 DÍAS' : costTxt));
            let priceColor = isOwned ? 'color:#94a3b8;' : (item.cost === 0 && !isActionDone ? 'color:var(--success);' : '');

            htmlBuffer += `
            <div class="grid-slot rank-${item.rank}" style="opacity:${opacity}; ${grayFilter}" onclick="inspectShopItem('${item.id}')">
                <div class="slot-icon">${icon}</div>
                <div class="slot-price" style="${priceColor}">${priceLabel}</div>
            </div>`;
        }
    });

    shopContainer.innerHTML = htmlBuffer;
}
function ensureCartenonStyles() {
    if (document.getElementById('sl-cartenon-holo-css')) return;
    let st = document.createElement('style');
    st.id = 'sl-cartenon-holo-css';
    st.innerHTML = `
        #inspect-modal .modal-content {
            background-color: #030818 !important;
            background-image: 
                linear-gradient(rgba(0, 195, 255, 0.045) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 195, 255, 0.045) 1px, transparent 1px),
                radial-gradient(circle at 50% 42%, rgba(20, 75, 165, 0.38) 0%, rgba(5, 14, 36, 0.96) 72%, #02050f 100%) !important;
            background-size: 16px 16px, 16px 16px, 100% 100% !important;
            border: 1.5px solid #38bdf8 !important;
            box-shadow: 0 0 32px rgba(0, 195, 255, 0.42), inset 0 0 28px rgba(0, 140, 255, 0.22), 0 12px 40px rgba(0, 0, 0, 0.95) !important;
            padding: 20px 18px !important;
            max-width: 430px !important;
            position: relative;
            overflow: hidden;
            animation: none !important;
        }
        .ct-circuit-bg {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; opacity: 0.32; z-index: 0;
        }
        .ct-wrap {
            position: relative; z-index: 2; text-align: left !important;
            font-family: 'Rajdhani', sans-serif;
        }
        .ct-top-row {
            display: grid;
            grid-template-columns: 106px 1fr;
            gap: 14px;
            align-items: stretch;
            margin-bottom: 16px;
        }
.ct-wireframe-box {
            width: 106px; height: 112px;
            border: 1.5px solid rgba(186, 230, 253, 0.85);
            background: radial-gradient(circle at 50% 50%, rgba(126, 34, 206, 0.34) 0%, rgba(3, 8, 22, 0.96) 78%);
            box-shadow: none !important;
            display: flex; justify-content: center; align-items: center;
            padding: 12px; position: relative;
        }
        .ct-wireframe-box::after {
            content: ''; position: absolute; inset: 3px;
            border: 1px solid rgba(56, 189, 248, 0.28);
            pointer-events: none;
        }
        .ct-wireframe-svg {
            width: 100%; height: 100%;
            overflow: visible;
            filter:
                drop-shadow(0 0 4px rgba(255, 255, 255, calc(var(--item-menu-glow-opacity) * 1.4)))
                drop-shadow(0 0 10px rgba(0, 210, 255, calc(var(--item-menu-glow-opacity) * 1.8)))
                drop-shadow(0 0 22px rgba(99, 102, 241, calc(var(--item-menu-glow-opacity) * 1.6))) !important;
        }
        .ct-right-col {
            display: flex; flex-direction: column; justify-content: space-between; min-width: 0;
        }
        .ct-title-Banner {
            border: 1.5px solid rgba(186, 230, 253, 0.78);
            border-right: none;
            background: linear-gradient(90deg, rgba(14, 165, 233, 0.28) 0%, rgba(14, 165, 233, 0.06) 75%, transparent 100%);
            padding: 7px 10px;
            margin-bottom: 10px;
            text-align: left !important;
        }
        .ct-item-label {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.76em; color: #bae6fd; letter-spacing: 1.5px;
            margin-right: 4px;
            text-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
        }
        .ct-item-name {
            font-size: 1.15em; font-weight: 700; color: #ffffff;
            letter-spacing: 0.5px; line-height: 1.15;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.75), 0 0 18px rgba(0, 210, 255, 0.9) !important;
        }
        .ct-submeta-grid {
            display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 10px;
            padding-left: 2px; text-align: left !important;
        }
        .ct-meta-lbl {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.65em; color: #bae6fd; letter-spacing: 1px;
            text-transform: uppercase; margin-bottom: 3px; white-space: nowrap;
        }
        .ct-meta-val {
            font-family: 'Share Tech Mono', monospace;
            font-size: 1.08em; font-weight: 700; color: #ffffff;
            letter-spacing: 1px;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(56, 189, 248, 0.85) !important;
        }
        .ct-desc-area {
            text-align: left !important;
            border-top: 1px solid rgba(56, 189, 248, 0.28);
            padding-top: 12px; margin-top: 4px;
        }
        .ct-desc-line {
            font-size: 1.02em; color: #f1f5f9; font-weight: 600;
            line-height: 1.5; margin-bottom: 7px; letter-spacing: 0.2px;
            text-shadow: 0 0 7px rgba(186, 230, 253, 0.42) !important;
        }
        .ct-red-Runic { 
            color: #ff2a55 !important; font-weight: 700; 
            text-shadow: 0 0 8px rgba(255, 42, 85, 0.95), 0 0 18px rgba(244, 63, 94, 0.7) !important;
        }
        .ct-cyan-Runic { 
            color: #7dd3fc !important; font-weight: 700; 
            text-shadow: 0 0 8px rgba(125, 211, 252, 0.95), 0 0 18px rgba(0, 210, 255, 0.85) !important;
        }
        #inspect-price {
            text-shadow:none !important;
        }
    `;
    document.head.appendChild(st);
}
function getCartenonWireframeSVG(item) {
    let svg = getIconFor(item);
    return svg.replace('class="sl-holo-glyph"', 'class="ct-wireframe-svg"');
}

function formatCartenonDesc(text) {
    if (!text) return "";
    // 1. Sintagmas numéricos completos: Número/Porcentaje + (conector opcional: de, la, el, por...) + Palabra(s) completas sin cortar jamás a la mitad
    const numPhraseRegex = /(?:[+\-x]?\d+(?:[\.,]\d+)?%?(?:\s+(?:de|del|la|el|los|las|al|en|por|para|a))?\s+[a-záéíóúñA-ZÁÉÍÓÚÑ/]+(?:\s+(?:Protector|Vital|Máximo|Máximos|Físico|Ártico|extra|adicionales))?|[+\-]?\d+(?:[\.,]\d+)?%)(?![a-záéíóúñA-ZÁÉÍÓÚÑ])/gi;

    // 2. Conceptos críticos / peligro (siempre respetando fronteras de palabra completas)
    const dangerRegex = /(?<![a-záéíóúñA-ZÁÉÍÓÚÑ])(Zona de Penalización|Penalización|Maldición(?:\s+de\s+[a-záéíóúñA-ZÁÉÍÓÚÑ]+)?|Cero Absoluto|Isla de Jeju|Templo de Cartenon|Cartenon|Star Stream|Abismo|Mazmorra o Medianoche|Muertes?|Castigo(?:\s+Crítico|\s+Físico)?)(?![a-záéíóúñA-ZÁÉÍÓÚÑ])/gi;

    return text
        .replace(numPhraseRegex, '<span class="ct-cyan-Runic">$&</span>')
        .replace(dangerRegex, '<span class="ct-red-Runic">$1</span>');
}

function buildCartenonInspectorHTML(item, count = 1) {
    ensureCartenonStyles();
    // Genera siempre el icono actualizado en tiempo real

    let catLabel = item.cat || (item.slot ? "Armería" : (item.type === "loot" ? "Botín" : (item.type === "box" ? "Cofre" : "Consumible")));
    let rankLabel = item.rank || "A";
    let stackTag = count > 1 ? ` <span class="ct-cyan-Runic">(x${count})</span>` : '';

    let rawSentences = (item.desc || "").split(/(?<=\.)\s+/);
    let paragraphsHtml = rawSentences.map(s => `<div class="ct-desc-line">${formatCartenonDesc(s)}</div>`).join('');

    let statsRow = "";
    if (item.stats) {
        let parts = [];
        if (item.stats.str) parts.push(`+${item.stats.str} STR`);
        if (item.stats.int) parts.push(`+${item.stats.int} INT`);
        if (item.stats.agi) parts.push(`+${item.stats.agi} AGI`);
        statsRow = `<div class="ct-desc-line" style="margin-top:8px;"><span class="ct-cyan-Runic">EFECTO DE ATRIBUTOS: ${parts.join('  //  ')}</span></div>`;
    }

    let relicMeta = getRelicInfo(item.id);
    let relicRow = "";
    if (relicMeta) {
        let styleLabel = relicMeta.pose ? `POSE: ${relicMeta.pose}` : (relicMeta.silhouette ? `SILUETA: ${relicMeta.silhouette}` : `AURA: ${relicMeta.aura}`);
        relicRow = `<div class="ct-desc-line"><span class="ct-cyan-Runic">[${styleLabel.toUpperCase()}]</span> ${formatCartenonDesc(relicMeta.passive)}</div>`;
    }

    let finalHtml = `
        <svg class="ct-circuit-bg" viewBox="0 0 400 300" preserveAspectRatio="none">
            <path d="M10 140 L90 140 L110 160 L240 160 M160 110 L210 110 L225 125 L380 125 M140 190 L190 190 L205 175 L340 175" fill="none" stroke="#00d2ff" stroke-width="1.2"/>
            <rect x="245" y="152" width="16" height="10" fill="none" stroke="#38bdf8" stroke-width="1"/>
            <rect x="310" y="118" width="22" height="12" fill="none" stroke="#a855f7" stroke-width="1"/>
        </svg>
        <div class="ct-wrap">
            <div class="ct-top-row">
                <div class="ct-wireframe-box">
                    ${getCartenonWireframeSVG(item)}
                </div>
                <div class="ct-right-col">
                    <div class="ct-title-Banner">
                        <span class="ct-item-label">ITEM:</span>
                        <span class="ct-item-name">${item.title}${stackTag}</span>
                    </div>
                    <div class="ct-submeta-grid">
                        <div>
                            <div class="ct-meta-lbl">DIFICULTAD ADQ.:</div>
                            <div class="ct-meta-val">${rankLabel}</div>
                        </div>
                        <div>
                            <div class="ct-meta-lbl">CATEGORÍA:</div>
                            <div class="ct-meta-val">${catLabel.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ct-desc-area">
                ${paragraphsHtml}
                ${statsRow}
                ${relicRow}
            </div>
        </div>
    `;
    if (count === 1) item._cachedInspectorHtml = finalHtml;
    return finalHtml;
}

function inspectShopItem(id) {
    if (typeof shopDB === 'undefined') return;
    let item = shopDB.find(x => x.id === id);
    if (!item) return;

    let nameEl = document.getElementById('inspect-name');
    if (nameEl) nameEl.style.display = 'none';

    let descEl = document.getElementById('inspect-desc');
    if (descEl) {
        descEl.style.whiteSpace = 'normal';
        descEl.innerHTML = buildCartenonInspectorHTML(item, 1);
    }
    
    let priceEl = document.getElementById('inspect-price');
    priceEl.innerText = `COSTO DE ADQUISICIÓN: ${item.cost} G`;
    priceEl.style.cssText = 'text-align:center; color:#38bdf8; font-family:"Share Tech Mono", monospace; font-size:0.76em; font-weight:700; margin:10px 0 6px 0; letter-spacing:0.8px; opacity:0.92;';
    priceEl.style.display = 'block';

    let btnUsar = document.getElementById('inspect-buy-btn');
    let btnSoltar = document.getElementById('inspect-cancel-btn') || btnUsar.previousElementSibling;
    
    btnUsar.style.display = 'block';
    if (btnSoltar) {
        btnSoltar.innerText = "Cerrar";
        btnSoltar.className = "btn btn-blue";
        btnSoltar.style.width = 'auto';
        btnSoltar.style.flex = '1';
        btnSoltar.onclick = () => closeModal('inspect-modal');
    }

let isOwned = (item.cat === 'Armería' || item.slot) && isRelicAlreadyOwned(item.id);
    let isCoffeeLocked = (item.id === 'c6') && isCoffeeOnWeeklyCooldown();
    let isActionDone = isRealActionDoneToday(item.id);

    if (item.cost === 0) {
        priceEl.innerText = `MICRO-MISIÓN FÍSICA (1 POR DÍA)`;
        priceEl.style.color = '#00ffcc';
    }

    if (isOwned) {
        btnUsar.innerText = "Ya tienes este objeto";
        btnUsar.className = "btn btn-blue";
        btnUsar.style.opacity = "0.55";
        btnUsar.onclick = () => { systemNotify("Ya posees esta reliquia en tu Bolsa o Ranura Equipada.", "info"); };
    } else if (isActionDone) {
        btnUsar.innerText = "Completado Hoy (1/Día)";
        btnUsar.className = "btn btn-blue";
        btnUsar.style.opacity = "0.55";
        btnUsar.onclick = () => { systemNotify("✅ Ya reclamaste esta micro-misión de acción real hoy. Vuelve mañana.", "info"); };
    } else if (isCoffeeLocked) {
        let daysLeft = Math.ceil(((7 * 24 * 3600000) - (Date.now() - p.lastCoffeeBoughtAt)) / (24 * 3600000));
        btnUsar.innerText = `Enfriamiento (${daysLeft}d)`;
        btnUsar.className = "btn btn-red";
        btnUsar.style.opacity = "0.6";
        btnUsar.onclick = () => { systemNotify(`☕ Límite semanal: Solo puedes comprar 1 Café de Medianoche por semana (Faltan ${daysLeft} días).`, "danger"); };
    } else if (p.gold >= item.cost) {
        btnUsar.innerText = item.cost === 0 ? " Reclamar Micro-Misión" : "Sellar Compra";
        btnUsar.className = "btn btn-main";
        btnUsar.style.opacity = "1";
        btnUsar.onclick = () => { 
            buyItem(item.id); 
            closeModal('inspect-modal'); 
        };
    } else {
        btnUsar.innerText = "Oro Insuficiente";
        btnUsar.className = "btn btn-red";
        btnUsar.style.opacity = "1";
        btnUsar.onclick = () => { systemNotify("Tus fondos son insuficientes para este artefacto.", "danger"); };
    }

    openModal('inspect-modal');
}

function buyItem(itemId) {
    if (typeof shopDB === 'undefined') return;
    let item = shopDB.find(x => x.id === itemId);
    if (!item) return;

    if ((item.cat === 'Armería' || item.slot) && isRelicAlreadyOwned(item.id)) {
        return systemNotify("Ya tienes este objeto en tu poder.", "info");
    }
    if (isRealActionDoneToday(item.id)) {
        return systemNotify("✅ Ya reclamaste esta micro-misión física hoy.", "info");
    }
    if (item.id === 'c6' && isCoffeeOnWeeklyCooldown()) {
        return systemNotify("☕ Solo puedes adquirir 1 Café Expreso de Medianoche por semana.", "danger");
    }

    if (p.gold >= item.cost) {
        p.gold -= item.cost;
        if (item.id === 'c6') p.lastCoffeeBoughtAt = Date.now();
if (REAL_ACTION_IDS.includes(item.id)) { let todayKey = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString();
            if (p.realActionsDay !== todayKey) {
                p.realActionsDay = todayKey;
                p.realActionsClaimed = [];
            }
            p.realActionsClaimed.push(item.id);
        }
        
        if (item.keyRank) {
            if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0, rankSSS: 0 };
            p.dungeonKeys[item.keyRank] = (p.dungeonKeys[item.keyRank] || 0) + 1;
            systemNotify(`${getIconFor(item)} Llave adquirida: ${item.title}`, "gold");
            if (typeof renderBosses === "function") renderBosses();
        } else {
            p.inventory.push({...item, type: item.type || 'item'});
            systemNotify(`${getIconFor(item)} Adquirido: ${item.title}`, "success");
        }

        saveData(); 
        if (typeof updateHUD === "function") updateHUD(); 
        renderShop(); 
        renderInventory();
    }
}
/* ==========================================================================
   4. RENDERIZADO DE LA BOLSA DIMENSIONAL (CON AGRUPACIÓN AUTOMÁTICA x2, x3)
   ========================================================================== */
function getGroupedInventoryList() {
    if (!p || !Array.isArray(p.inventory)) return [];
    let groups = [];
    let map = {};

    p.inventory.forEach((item, idx) => {
        let key = (item.type === 'loot') ? `loot_${item.title}` : `id_${item.id || item.title}`;
        if (!map[key]) {
            map[key] = { key: key, item: item, firstIdx: idx, count: 1 };
            groups.push(map[key]);
        } else {
            map[key].count++;
        }
    });
    return groups;
}

window.fuseDungeonKeys = function(fromRank, toRank, labelFrom, labelTo) {
    if (!p || !p.dungeonKeys) return;
    if ((p.dungeonKeys[fromRank] || 0) < 3) {
        systemNotify(`Necesitas 3 Llaves de Rango ${labelFrom} para sintetizar 1 de Rango ${labelTo}.`, "danger");
        return;
    }
    p.dungeonKeys[fromRank] -= 3;
    p.dungeonKeys[toRank] = (p.dungeonKeys[toRank] || 0) + 1;
    saveData();
    renderInventory();
    if (typeof renderBosses === "function") renderBosses();
    systemNotify(`🗝️ ¡SÍNTESIS DIMENSIONAL! Fusionaste 3 Llaves Rango ${labelFrom} en +1 Llave Rango ${labelTo}.`, "gold");
};

let currentBagFilter = 'Todos';
let currentBagSort = 'rank'; // 'rank', 'price', 'name'

window.setBagFilter = function(flt) {
    currentBagFilter = flt;
    renderInventory();
};

window.cycleBagSort = function() {
    if (currentBagSort === 'rank') currentBagSort = 'price';
    else if (currentBagSort === 'price') currentBagSort = 'name';
    else currentBagSort = 'rank';
    renderInventory();
};

window.inspectDungeonKeySlot = function(keyProp, rankLetter, nextProp, nextLetter, qty) {
    let keyItemObj = (typeof shopDB !== 'undefined' && shopDB.find(x => x.keyRank === keyProp)) || {
        id: 'key_' + rankLetter.toLowerCase(),
        title: `Llave de Portal Rango ${rankLetter}`,
        desc: `Llave dimensional que permite abrir portales de Rango ${rankLetter} en el Sonar. Si acumulas 3 llaves del mismo rango, puedes fundirlas aquí mismo en 1 Llave de Rango superior.`,
        rank: rankLetter,
        cat: 'Llave Dimensional'
    };

    let nameEl = document.getElementById('inspect-name');
    if (nameEl) nameEl.style.display = 'none';
    let descEl = document.getElementById('inspect-desc');
    if (descEl) {
        descEl.style.whiteSpace = 'normal';
        descEl.innerHTML = buildCartenonInspectorHTML(keyItemObj, qty);
    }
    let priceEl = document.getElementById('inspect-price');
    if (priceEl) {
        priceEl.style.display = 'block';
        priceEl.style.color = '#7dd3fc';
        priceEl.innerText = nextLetter
            ? `SÍNTESIS DISPONIBLE: 3x RANGO ${rankLetter} ➔ 1x RANGO ${nextLetter} (TIENES ${qty})`
            : `LLAVE SUPREMA DE RANGO ${rankLetter} (TIENES ${qty})`;
    }

    let btnUsar = document.getElementById('inspect-buy-btn');
    let btnCerrar = document.getElementById('inspect-cancel-btn') || btnUsar.previousElementSibling;
    if (btnCerrar) {
        btnCerrar.innerText = "Cerrar";
        btnCerrar.onclick = () => closeModal('inspect-modal');
    }

    if (nextProp && qty >= 3) {
        btnUsar.style.display = 'block';
        btnUsar.className = 'btn btn-main';
        btnUsar.innerText = `FUNDIR 3 ➔ +1 LLAVE RANGO ${nextLetter}`;
        btnUsar.onclick = () => {
            closeModal('inspect-modal');
            fuseDungeonKeys(keyProp, nextProp, rankLetter, nextLetter);
        };
    } else {
        btnUsar.style.display = 'block';
        btnUsar.className = 'btn btn-blue';
        btnUsar.innerText = "IR AL SONAR DE PORTALES";
        btnUsar.onclick = () => {
            closeModal('inspect-modal');
            if (typeof switchTab === 'function') switchTab('bosses', 1);
        };
    }
    openModal('inspect-modal');
};

function renderInventory() {
    const invContainer = document.getElementById('inventory-container');
    if (!invContainer) return;
    
    updateEquipmentUI();

    if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0 };
    const keyMetaList = [
        { k: 'rankE', nxt: 'rankD', lbl: 'E', nxtLbl: 'D', id: 'key_e' },
        { k: 'rankD', nxt: 'rankC', lbl: 'D', nxtLbl: 'C', id: 'key_d' },
        { k: 'rankC', nxt: 'rankB', lbl: 'C', nxtLbl: 'B', id: 'key_c' },
        { k: 'rankB', nxt: 'rankA', lbl: 'B', nxtLbl: 'A', id: 'key_b' },
        { k: 'rankA', nxt: 'rankS', lbl: 'A', nxtLbl: 'S', id: 'key_a' },
        { k: 'rankS', nxt: null,    lbl: 'S', nxtLbl: '',  id: 'key_s' }
    ];

    let sortLabel = currentBagSort === 'price' ? '⇅ VALOR' : (currentBagSort === 'name' ? '⇅ NOMBRE' : '⇅ RANGO');
    let bagToolbar = `
    <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; margin-bottom:10px;">
        <div style="display:flex; gap:4px; flex:1; overflow-x:auto;">
            ${['Todos', 'Usables', 'Equipo', 'Botín'].map(f => `
                <button class="btn ${currentBagFilter === f ? 'btn-main' : 'btn-blue'}" style="padding:5px 8px !important; font-size:0.62em !important; flex:1;" onclick="setBagFilter('${f}')">${f}</button>
            `).join('')}
        </div>
        <button class="btn btn-blue" style="height:26px; padding:0 8px !important; font-size:0.62em !important; white-space:nowrap;" onclick="cycleBagSort()">${sortLabel}</button>
    </div>`;

    // Integrar sutilmente solo las llaves que tengas (> 0) como casillas normales dentro de la cuadrícula
    let ownedKeySlotsHtml = '';
    if (currentBagFilter === 'Todos' || currentBagFilter === 'Usables') {
        keyMetaList.forEach(kr => {
            let qty = p.dungeonKeys[kr.k] || 0;
            if (qty <= 0) return;
            let canFuse = kr.nxt && qty >= 3;
            let keyIcon = getIconFor({ id: kr.id, title: 'Llave Rango ' + kr.lbl, rank: kr.lbl });
            let subLbl = canFuse ? `3➔1 ${kr.nxtLbl}` : `LLAVE ${kr.lbl}`;
            ownedKeySlotsHtml += `
            <div class="grid-slot rank-${kr.lbl}" style="${canFuse ? 'border-color:#ffffff !important; box-shadow:0 0 12px rgba(0,229,255,0.45);' : ''}" onclick="inspectDungeonKeySlot('${kr.k}','${kr.lbl}','${kr.nxt || ''}','${kr.nxtLbl}',${qty})">
                ${qty > 1 ? `<span class="slot-stack-badge">x${qty}</span>` : ''}
                <div class="slot-icon">${keyIcon}</div>
                <div class="slot-price" style="${canFuse ? 'color:#7dd3fc;' : ''}">${subLbl}</div>
            </div>`;
        });
    }

    let grouped = getGroupedInventoryList().filter(g => {
        let it = g.item;
        if (currentBagFilter === 'Equipo') return !!(it.slot || it.cat === 'Armería');
        if (currentBagFilter === 'Botín') return it.type === 'loot';
        if (currentBagFilter === 'Usables') return !it.slot && it.cat !== 'Armería' && it.type !== 'loot';
        return true;
    });

    grouped.sort((a, b) => {
        let itA = a.item, itB = b.item;
        if (currentBagSort === 'price') {
            let vA = itA.sellGold || itA.cost || 0;
            let vB = itB.sellGold || itB.cost || 0;
            return vA - vB;
        }
        if (currentBagSort === 'name') {
            return (itA.title || '').localeCompare(itB.title || '', 'es');
        }
        let rA = SHOP_RANK_ORDER[itA.rank] || 5;
        let rB = SHOP_RANK_ORDER[itB.rank] || 5;
        return rA - rB;
    });

    if (grouped.length === 0 && !ownedKeySlotsHtml) {
        invContainer.innerHTML = bagToolbar + `<p style="color:var(--text-muted); text-align:center; padding:18px;">Tu Bolsa Dimensional está vacía en «${currentBagFilter}».</p>`;
        return;
    }

    let html = bagToolbar + `<div class="minecraft-grid">` + ownedKeySlotsHtml;
    grouped.forEach(g => {
        let item = g.item;
        let icon = getIconFor(item);
        let subLabel = item.sellGold ? `${item.sellGold}G` : (item.rank || 'A');
        let stackBadge = g.count > 1 ? `<span class="slot-stack-badge">x${g.count}</span>` : '';
        html += `
        <div class="grid-slot rank-${item.rank || 'A'}" onclick="inspectInventoryItem(${g.firstIdx}, ${g.count})">
            ${stackBadge}
            <div class="slot-icon">${icon}</div>
            <div class="slot-price">${subLabel}</div>
        </div>`;
    });
    html += `</div>`;
    
    invContainer.innerHTML = html;
}
function inspectInventoryItem(idx, stackCount = 1) {
    if (!p.inventory[idx]) return;
    let item = p.inventory[idx];

    let nameEl = document.getElementById('inspect-name');
    if (nameEl) nameEl.style.display = 'none';

    let descEl = document.getElementById('inspect-desc');
    if (descEl) {
        descEl.style.whiteSpace = 'normal';
        descEl.innerHTML = buildCartenonInspectorHTML(item, stackCount);
    }
    
    let priceEl = document.getElementById('inspect-price');
    if (item.sellGold) {
        let totalVal = item.sellGold * stackCount;
        priceEl.innerText = stackCount > 1
            ? `VALOR UNITARIO: +${item.sellGold} G  |  LOTE (x${stackCount}): +${totalVal} G`
            : `VALOR DE VENTA: +${item.sellGold} G`;
        priceEl.style.cssText = 'text-align:center; color:#38bdf8; font-family:"Share Tech Mono", monospace; font-size:0.95em; font-weight:700; margin:12px 0;';
        priceEl.style.display = 'block';
    } else {
        priceEl.style.display = 'none';
    }

    let btnUsar = document.getElementById('inspect-buy-btn');
    let btnSoltar = document.getElementById('inspect-cancel-btn') || btnUsar.previousElementSibling;

    btnUsar.className = "btn btn-main";
    btnUsar.style.opacity = "1";
    if (item.cat === 'Armería' || item.slot) {
        btnUsar.innerText = "⚔️ Equipar Reliquia";
    } else if (item.type === 'box') {
        btnUsar.innerText = "Abrir Cofre";
    } else if (item.type === 'loot') {
        btnUsar.innerText = stackCount > 1 ? `Vender Lote (+${item.sellGold * stackCount} G)` : `Vender (+${item.sellGold} G)`;
    } else {
        btnUsar.innerText = "Activar Artefacto";
    }
    
    if (p.penaltyActive && item.id !== "c4" && item.id !== "c7" && item.id !== "c_mercy") {
        btnUsar.style.display = 'none'; 
        if (btnSoltar) {
            btnSoltar.style.flex = 'none';
            btnSoltar.style.width = '100%'; 
        }
    } else {
        btnUsar.style.display = 'block';
        if (btnSoltar) {
            btnSoltar.innerText = "Cerrar";
            btnSoltar.className = "btn btn-blue";
            btnSoltar.style.width = 'auto';
            btnSoltar.style.flex = '1';
        }
    }

    if (btnSoltar) {
        btnSoltar.onclick = () => closeModal('inspect-modal');
    }

    btnUsar.onclick = () => {
        closeModal('inspect-modal');
        if (item.cat === 'Armería' || item.slot) {
            equipItem(idx);
        } else if (item.type === 'loot' && stackCount > 1) {
            sellEntireLootStack(item.title, item.sellGold);
        } else {
            useItem(idx);
        }
    };

    openModal('inspect-modal');
}

function sellEntireLootStack(lootTitle, unitGold) {
    let count = 0;
    p.inventory = p.inventory.filter(inv => {
        if (inv.type === 'loot' && inv.title === lootTitle) {
            count++;
            return false;
        }
        return true;
    });
    if (count > 0) {
        let totalG = count * (unitGold || 1);
        p.gold += totalG;
        systemNotify(`🪙 Lote vendido: ${count}x [${lootTitle}] por +${totalG} G.`, "gold");
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        renderInventory();
        renderShop();
    }
}

function closeArtifactRitualModal() {
    let ov = document.getElementById('sl-artifact-ritual-overlay');
    if (ov) ov.remove();
}

function createArtifactRitualShell(headerTitle, subBracket, innerHtml, themeClass = "") {
    closeArtifactRitualModal();
    let cornerSVG = (typeof getBaroqueCornerSVG === "function") ? getBaroqueCornerSVG() : '';
    let ov = document.createElement('div');
    ov.id = 'sl-artifact-ritual-overlay';
    ov.innerHTML = `
        <div class="sl-holo-frame ${themeClass}" style="width:100%; max-width:415px; cursor:default;">
            <div class="sl-holo-rail top"><span class="rail-Core"></span></div>
            <div class="sl-holo-glass">
                <div class="sl-holo-inner-box" style="padding:18px 15px; text-align:center;">
                    <span class="sl-baroque-corner tl">${cornerSVG}</span>
                    <span class="sl-baroque-corner tr">${cornerSVG}</span>
                    <span class="sl-baroque-corner bl">${cornerSVG}</span>
                    <span class="sl-baroque-corner br">${cornerSVG}</span>
                    <div class="sl-holo-header-row" style="margin-bottom:6px;">
                        <div class="sl-excl-square">!</div>
                        <div class="sl-title-rect">${headerTitle}</div>
                    </div>
                    <div class="sl-holo-subbracket" style="margin-bottom:12px;">${subBracket}</div>
                    <div id="sl-ritual-body-slot">${innerHtml}</div>
                </div>
            </div>
            <div class="sl-holo-rail bottom"><span class="rail-Core"></span></div>
        </div>
    `;
    document.body.appendChild(ov);
    return ov;
}

function finalizeInventoryConsumption(idx) {
    if (idx !== null && idx !== undefined && p.inventory && p.inventory[idx]) {
        p.inventory.splice(idx, 1);
    }
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof syncRaidVitalsUI === "function") syncRaidVitalsUI();
    renderInventory();
    renderShop();
}

/* 1. INTERFAZ PERSONALIZADA: CONTRATO DE MONEDAS DEL DOKKAEBI */
function openDokkaebiWagerModal(idx) {
    let maxGold = Math.floor(p.gold || 0);
    if (maxGold < 10) {
        return systemNotify("Necesitas al menos 10 G en tu tesorería para abrir una apuesta con el Dokkaebi.", "danger");
    }
    let defaultBet = Math.min(maxGold, Math.max(10, Math.floor(maxGold * 0.25)));

    let html = `
        <div style="width:68px; height:68px; margin:0 auto 10px auto;">${getIconFor(p.inventory[idx])}</div>
        <div style="color:#e0f2fe; font-size:0.9em; line-height:1.45; margin-bottom:12px;">
            Las Constelaciones observan tu tesorería (<b style="color:#00e5ff;">${maxGold} G</b> disponibles).<br>
            Elige cuánto Oro deseas arriesgar al 50/50 para duplicarlo al instante:
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; margin-bottom:10px;">
            <button class="btn btn-blue" onclick="document.getElementById('dokkaebi-bet-input').value=${Math.max(10, Math.floor(maxGold * 0.25))}">25% (${Math.max(10, Math.floor(maxGold * 0.25))}G)</button>
            <button class="btn btn-blue" onclick="document.getElementById('dokkaebi-bet-input').value=${Math.max(10, Math.floor(maxGold * 0.50))}">50% (${Math.max(10, Math.floor(maxGold * 0.50))}G)</button>
            <button class="btn btn-red" onclick="document.getElementById('dokkaebi-bet-input').value=${maxGold}">TODO (${maxGold}G)</button>
        </div>
        <input type="number" id="dokkaebi-bet-input" class="sl-name-bestow-input" value="${defaultBet}" min="10" max="${maxGold}">
        <div id="dokkaebi-result-area" style="min-height:28px; margin-bottom:10px; font-family:'Share Tech Mono', monospace; font-size:0.88em; color:#7dd3fc;">
            [ ESPERANDO APUESTA DEL CAZADOR ]
        </div>
        <div style="display:flex; gap:8px;">
            <button class="btn btn-red" style="flex:1;" id="btn-dok-cancel" onclick="closeArtifactRitualModal()">RETIRARSE</button>
            <button class="btn btn-main" style="flex:1.4;" id="btn-dok-exec" onclick="executeDokkaebiWager(${idx})">LANZAR MONEDA</button>
        </div>
    `;
    createArtifactRitualShell("SUBASTA DEL CANAL", "[ CONTRATO DE MONEDAS DEL DOKKAEBI ]", html);
}

window.executeDokkaebiWager = function(idx) {
    let inp = document.getElementById('dokkaebi-bet-input');
    let resArea = document.getElementById('dokkaebi-result-area');
    let btnExec = document.getElementById('btn-dok-exec');
    let btnCancel = document.getElementById('btn-dok-cancel');
    if (!inp || !resArea) return;

    let maxGold = Math.floor(p.gold || 0);
    let bet = Math.floor(Number(inp.value) || 0);
    if (bet < 10 || bet > maxGold) {
        resArea.style.color = '#ff2a55';
        resArea.innerText = `[ ERROR: INGRESA ENTRE 10 Y ${maxGold} G ]`;
        return;
    }

    if (btnExec) btnExec.style.display = 'none';
    if (btnCancel) btnCancel.style.display = 'none';
    inp.disabled = true;

    let ticks = 0;
    let spinTimer = setInterval(() => {
        ticks++;
        resArea.style.color = ticks % 2 === 0 ? '#00e5ff' : '#c084fc';
        resArea.innerHTML = ` GIRANDO MONEDA DEL DESTINO... <span class="sl-digit-new">${ticks % 2 === 0 ? 'CARA (+' + bet + 'G)' : 'CRUZ (-' + bet + 'G)'}</span>`;
        if (ticks >= 12) {
            clearInterval(spinTimer);
            let win = Math.random() <= 0.52;
            if (win) {
                p.gold += bet;
                resArea.style.color = '#39ff14';
                resArea.innerHTML = `¡LAS CONSTELACIONES APLAUDEN! GANASTE <b>+${bet} G</b>`;
                if (typeof playSystemSound === "function") playSystemSound('gold');
            } else {
                p.gold = Math.max(0, p.gold - bet);
                resArea.style.color = '#ff2a55';
                resArea.innerHTML = `EL DOKKAEBI SE QUEDA CON TU ORO: <b>-${bet} G</b>`;
                if (typeof playSystemSound === "function") playSystemSound('danger');
            }
            finalizeInventoryConsumption(idx);
            setTimeout(() => {
                closeArtifactRitualModal();
                systemNotify(win ? `🪙 Apuesta ganada: +${bet} G transferidos a tu cuenta.` : `💀 Apuesta perdida: -${bet} G absorbidos por el canal.`, win ? "gold" : "danger");
            }, 1450);
        }
    }, 95);
};

/* 2. INTERFAZ PERSONALIZADA: CONTRATO DE SANGRE DEL ARQUITECTO */
let _bloodHoldInterval = null;
let _bloodHoldPct = 0;

function openBloodContractModal(idx) {
    let todayList = (typeof getTodayMissions === "function") ? getTodayMissions() : [];
    let pendingList = todayList.filter(m => !(p.completedToday && p.completedToday.includes(m.id)));

    let missionsHtml = pendingList.length === 0
        ? `<div style="color:#39ff14; font-weight:700; padding:8px;">¡Todas las misiones de hoy ya están completadas! Reclamarás la recompensa al sellar.</div>`
        : pendingList.map(m => `<div style="display:flex; justify-content:space-between; font-size:0.82em; padding:4px 8px; border-bottom:1px solid rgba(251,113,133,0.2);"><span>• ${m.title}</span><span style="color:#fda4af;">[PENDIENTE]</span></div>`).join('');

    let html = `
        <div style="color:#ffe4e6; font-size:0.88em; line-height:1.45; margin-bottom:10px;">
            Juramento solemne ante Kandiaru: Debes completar <b>todas las misiones listadas abajo</b> antes de la medianoche.
        </div>
        <div style="max-height:130px; overflow-y:auto; background:rgba(15,2,8,0.85); border:1px solid rgba(251,113,133,0.5); margin-bottom:10px; text-align:left;">
            ${missionsHtml}
        </div>
        <div style="display:flex; justify-content:space-around; font-family:'Share Tech Mono', monospace; font-size:0.8em; margin-bottom:8px;">
            <span style="color:#39ff14;">ÉXITO: +280 G & +2 CM</span>
            <span style="color:#ff2a55;">FALLO: -50 HP</span>
        </div>
        <div class="sl-blood-pad"
            onmousedown="startBloodSignature(${idx})" onmouseup="stopBloodSignature()" onmouseleave="stopBloodSignature()"
            ontouchstart="startBloodSignature(${idx}, event)" ontouchend="stopBloodSignature(event)">
            <div class="sl-blood-fill-bar" id="sl-blood-fill-bar"></div>
            <div style="position:relative; z-index:2; font-family:'Share Tech Mono', monospace; font-size:0.85em; color:#ffffff; font-weight:700;" id="sl-blood-pad-lbl">
                🩸 MANTÉN PRESIONADO AQUÍ PARA FIRMAR CON SANGRE (0%)
            </div>
        </div>
        <button class="btn btn-blue" style="width:100%;" onclick="stopBloodSignature(); closeArtifactRitualModal()">RECHAZAR CONTRATO</button>
    `;
    createArtifactRitualShell("PACTO DE SANGRE", "[ CLÁUSULA INQUEBRANTABLE DEL ARQUITECTO ]", html, "danger");
}

window.startBloodSignature = function(idx, ev) {
    if (ev && ev.cancelable) ev.preventDefault();
    clearInterval(_bloodHoldInterval);
    _bloodHoldPct = 0;
    _bloodHoldInterval = setInterval(() => {
        _bloodHoldPct += 5;
        let bar = document.getElementById('sl-blood-fill-bar');
        let lbl = document.getElementById('sl-blood-pad-lbl');
        if (bar) bar.style.width = `${Math.min(100, _bloodHoldPct)}%`;
        if (lbl) lbl.innerText = `🩸 SELLANDO HUELLA VITAL... (${Math.min(100, _bloodHoldPct)}%)`;
        if (_bloodHoldPct >= 100) {
            clearInterval(_bloodHoldInterval);
let currentDayStr = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString(); let todayList = (typeof getTodayMissions === "function") ? getTodayMissions() : [];
            let allDoneNow = todayList.length > 0 && todayList.every(m => p.completedToday && p.completedToday.includes(m.id));
            if (allDoneNow) {
                p.gold += 280;
                p.crystals = (p.crystals || 0) + 2;
                finalizeInventoryConsumption(idx);
                closeArtifactRitualModal();
                systemNotify("📜 ¡Contrato de Sangre firmado y liquidado al instante! +280 G y +2 CM.", "gold");
            } else {
                p.contractActive = currentDayStr;
                finalizeInventoryConsumption(idx);
                closeArtifactRitualModal();
                systemNotify("📜 Contrato de Sangre rubricado. Completa tu Tablón antes de medianoche para cobrar +280 G y +2 CM.", "purple");
            }
        }
    }, 40);
};

window.stopBloodSignature = function(ev) {
    if (ev && ev.cancelable) ev.preventDefault();
    clearInterval(_bloodHoldInterval);
    if (_bloodHoldPct < 100) {
        _bloodHoldPct = 0;
        let bar = document.getElementById('sl-blood-fill-bar');
        let lbl = document.getElementById('sl-blood-pad-lbl');
        if (bar) bar.style.width = '0%';
        if (lbl) lbl.innerText = '🩸 MANTÉN PRESIONADO AQUÍ PARA FIRMAR CON SANGRE (0%)';
    }
};

/* 3. INTERFAZ PERSONALIZADA: RUNA DE HABILIDAD SIGILO [STEALTH] */
function openStealthInfiltrationModal(idx) {
    let html = `
        <div style="width:76px; height:76px; margin:0 auto 10px auto; filter:drop-shadow(0 0 14px #c084fc);">${getIconFor(p.inventory[idx])}</div>
        <div style="color:#f3e8ff; font-size:0.92em; line-height:1.5; margin-bottom:12px;">
            Al quebrar esta piedra rúnica, tu presencia física y mágica se desvanecerá en el vacío durante <b>60 MINUTOS</b>:
        </div>
        <div style="text-align:left; background:rgba(18,4,36,0.9); border:1px solid #c084fc; padding:10px 12px; font-size:0.82em; color:#e9d5ff; line-height:1.55; margin-bottom:14px;">
            <div>• <b style="color:#39ff14;">EMBOSCADA LETAL:</b> Tu primer ataque directo contra un Jefe inflige <b>x3.0 de Daño Crítico</b>.</div>
            <div>• <b style="color:#00e5ff;">INDETECTABLE EN MAZMORRA:</b> 100% Inmune al veneno, fuego y maldición ambiental.</div>
            <div>• <b style="color:#f0abfc;">OCULTACIÓN NOCTURNA:</b> Oculta tu rastro del reloj de corrosión nocturna y despliega misiones con <b>0 Fatiga inicial</b>.</div>
        </div>
        <div style="display:flex; gap:8px;">
            <button class="btn btn-blue" style="flex:1;" onclick="closeArtifactRitualModal()">CANCELAR</button>
            <button class="btn btn-purple" style="flex:1.5;" onclick="activateStealthCamouflage(${idx})">ACTIVAR CAMUFLAJE (60M)</button>
        </div>
    `;
    createArtifactRitualShell("HABILIDAD: SIGILO", "[ PROTOCOLO DE INFILTRACIÓN FANTASMA ]", html, "monarch-purple");
}

window.activateStealthCamouflage = function(idx) {
    let now = Date.now();
    p.stealthModeUntil = now + (60 * 60000);
    p.hazardImmunityUntil = now + (60 * 60000);
    p.adrenalineDodgeUntil = now + (60 * 60000);
    p.nextBossCrit = true;
    finalizeInventoryConsumption(idx);
    closeArtifactRitualModal();
    if (typeof updateHUD === "function") updateHUD();
    systemNotify("🌫️ [Habilidad: Sigilo] activada por 60 minutos. El HUD ha entrado en modo camuflaje y tu golpe de emboscada x3 está listo.", "purple");
};

/* 4. INTERFAZ PERSONALIZADA: DADO DE LA CAUSALIDAD DE KANDIARU */
function openKandiaruDiceModal(idx) {
    let html = `
        <div style="color:#bae6fd; font-size:0.86em; margin-bottom:6px;">
            El poliedro rúnico del Arquitecto gira entre la bendición y el castigo:
        </div>
        <div class="sl-dice-stage">
            <div class="sl-dice-cube" id="sl-kandiaru-cube">
                <div class="sl-dice-face-box" id="sl-kandiaru-face">
                    <div class="sl-dice-num" id="sl-kandiaru-num">?</div>
                    <div style="font-family:'Share Tech Mono', monospace; font-size:0.65em; color:#7dd3fc; margin-top:4px;" id="sl-kandiaru-lbl">CAUSALIDAD</div>
                </div>
            </div>
        </div>
        <div id="sl-kandiaru-outcome" style="min-height:38px; font-size:0.88em; color:#e0f2fe; margin-bottom:12px;">
            [1] -20 HP • [2] +180 G • [3] +400 MP<br>[4] Llave R-A • [5] +2 CM • [6] +120 Escudo
        </div>
        <div style="display:flex; gap:8px;" id="sl-kandiaru-btns">
            <button class="btn btn-red" style="flex:1;" onclick="closeArtifactRitualModal()">GUARDAR</button>
            <button class="btn btn-main" style="flex:1.5;" onclick="rollKandiaru3DDice(${idx})">LANZAR DADO ARCANO</button>
        </div>
    `;
    createArtifactRitualShell("DADO DE KANDIARU", "[ JUEGO DE CAUSALIDAD DEL ARQUITECTO ]", html);
}

window.rollKandiaru3DDice = function(idx) {
    let cube = document.getElementById('sl-kandiaru-cube');
    let numEl = document.getElementById('sl-kandiaru-num');
    let lblEl = document.getElementById('sl-kandiaru-lbl');
    let outEl = document.getElementById('sl-kandiaru-outcome');
    let btns = document.getElementById('sl-kandiaru-btns');
    if (!cube || !numEl) return;

    if (btns) btns.style.display = 'none';
    cube.classList.add('rolling-active');

    let step = 0;
    let rollTimer = setInterval(() => {
        step++;
        numEl.innerText = Math.floor(Math.random() * 6) + 1;
        if (step >= 16) {
            clearInterval(rollTimer);
            cube.classList.remove('rolling-active');
            let finalFace = Math.floor(Math.random() * 6) + 1;
            numEl.innerText = finalFace;

            let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;
            let resTxt = "";
            if (finalFace === 1) {
                p.hp = Math.max(1, p.hp - 20);
                lblEl.innerText = "MALDICIÓN";
                outEl.innerHTML = `<span style="color:#ff2a55; font-weight:700;">CARA [1]: La causalidad exige sangre (-20 HP).</span>`;
                resTxt = "🎲 Dado de Kandiaru [1]: -20 HP.";
            } else if (finalFace === 2) {
                p.gold += 180;
                lblEl.innerText = "RIQUEZA";
                outEl.innerHTML = `<span style="color:#39ff14; font-weight:700;">CARA [2]: Tesorería bendecida (+180 G).</span>`;
                resTxt = "🎲 Dado de Kandiaru [2]: +180 G.";
            } else if (finalFace === 3) {
                p.mp = Math.min(maxMP, (p.mp || 0) + 400);
                lblEl.innerText = "TORRENTE";
                outEl.innerHTML = `<span style="color:#00e5ff; font-weight:700;">CARA [3]: Sobrecarga de núcleo (+400 MP).</span>`;
                resTxt = "🎲 Dado de Kandiaru [3]: +400 MP.";
            } else if (finalFace === 4) {
                p.dungeonKeys.rankA = (p.dungeonKeys.rankA || 0) + 1;
                lblEl.innerText = "PORTAL";
                outEl.innerHTML = `<span style="color:#39ff14; font-weight:700;">CARA [4]: Coordenada mayor (+1 Llave Rango A).</span>`;
                resTxt = "🎲 Dado de Kandiaru [4]: +1 Llave Rango A.";
            } else if (finalFace === 5) {
                p.crystals = (p.crystals || 0) + 2;
                lblEl.innerText = "ABISMO";
                outEl.innerHTML = `<span style="color:#c084fc; font-weight:700;">CARA [5]: Condensación real (+2 Cristales CM).</span>`;
                resTxt = "🎲 Dado de Kandiaru [5]: +2 Cristales de Maná.";
            } else {
                p.arcticShield = (p.arcticShield || 0) + 120;
                lblEl.innerText = "BASTIÓN";
                outEl.innerHTML = `<span style="color:#39ff14; font-weight:700;">CARA [6]: ¡Barrera del Arquitecto (+120 Escudo)!</span>`;
                resTxt = "🎲 Dado de Kandiaru [6]: +120 de Escudo Físico.";
            }

            finalizeInventoryConsumption(idx);
            setTimeout(() => {
                closeArtifactRitualModal();
                systemNotify(resTxt, finalFace === 1 ? "danger" : "gold");
            }, 1600);
        }
    }, 80);
};

/* 5A. INTERFAZ PERSONALIZADA: FUNDICIÓN ALQUÍMICA DE CHATARRA */
function openAlchemicalSmelterModal(idx) {
    let lootItems = (p.inventory || []).filter(inv => inv.type === 'loot' && inv.sellGold);
    if (lootItems.length === 0) {
        return systemNotify("No tienes piezas de chatarra o minerales en tu bolsa para fundir.", "danger");
    }

    let baseTotal = lootItems.reduce((acc, it) => acc + (it.sellGold || 0), 0);
    let bonusTotal = Math.floor(baseTotal * 1.30);

    let chipsHtml = lootItems.slice(0, 24).map(it => `<div class="sl-smelt-chip">${getIconFor(it)}</div>`).join('');

    let html = `
        <div style="color:#bae6fd; font-size:0.86em;">
            Piezas detectadas en bolsa: <b>${lootItems.length} objetos</b>
        </div>
        <div class="sl-smelt-grid" id="sl-smelt-grid">${chipsHtml}</div>
        <div style="font-family:'Share Tech Mono', monospace; font-size:0.9em; margin:10px 0;">
            <div>VALOR BASE: <span style="color:#94a3b8;">${baseTotal} G</span></div>
            <div style="font-size:1.15em; color:#39ff14; margin-top:4px;">REFINADO (+30%): <b id="sl-smelt-counter">${bonusTotal} G</b></div>
        </div>
        <div style="display:flex; gap:8px;" id="sl-smelt-btns">
            <button class="btn btn-blue" style="flex:1;" onclick="closeArtifactRitualModal()">CANCELAR</button>
            <button class="btn btn-main" style="flex:1.5;" onclick="executeAlchemicalSmelting('${ p.inventory[idx].id }', ${bonusTotal})">FUNDIR EN ORO PURO</button>
        </div>
    `;
    createArtifactRitualShell("CRISOL DE GREMIO", "[ TRANSMUTACIÓN ALQUÍMICA DE MATERIALES ]", html);
}

window.executeAlchemicalSmelting = function(scrollId, bonusTotal) {
    let chips = document.querySelectorAll('#sl-smelt-grid .sl-smelt-chip');
    let btns = document.getElementById('sl-smelt-btns');
    if (btns) btns.style.display = 'none';

    chips.forEach((ch, i) => {
        setTimeout(() => ch.classList.add('disintegrate'), i * 25);
    });

    setTimeout(() => {
        p.inventory = p.inventory.filter(inv => !(inv.type === 'loot' && inv.sellGold));
        let scrollIdx = p.inventory.findIndex(inv => inv.id === scrollId);
        if (scrollIdx !== -1) p.inventory.splice(scrollIdx, 1);
        p.gold += bonusTotal;
        finalizeInventoryConsumption(null);
        closeArtifactRitualModal();
        systemNotify(`⚗️ Fundición completada: Materiales refinados por +${bonusTotal} G (+30% bonificado).`, "gold");
    }, 900);
};

/* 5B. INTERFAZ PERSONALIZADA: APERTURA DE COFRES Y RELICARIOS SARCÓFAGO */
function openSarcophagusChestModal(idx) {
    let boxItem = p.inventory[idx];
    if (!boxItem) return;

    let isSS = boxItem.rank === 'SS';
    let isS = boxItem.rank === 'S';
    let theme = isSS ? "monarch-purple" : "";

    let html = `
        <div class="sl-sarcophagus-box chest-shake" id="sl-chest-visual-box">
            ${getIconFor(boxItem)}
        </div>
        <div style="font-family:'Share Tech Mono', monospace; font-size:0.78em; color:#7dd3fc; margin-bottom:12px; white-space:nowrap;" id="sl-chest-status-txt">
            [ RANGO DEL CONTENEDOR: ${boxItem.rank || 'B'} // LISTO PARA DESELLAR ]
        </div>
        <div id="sl-chest-reward-slot" style="display:none; margin-bottom:12px;"></div>
        <button class="btn btn-main" style="width:100%; padding:12px;" id="btn-open-sarcophagus" onclick="executeSarcophagusUnseal(${idx})">
            ROMPER SELLO DIMENSIONAL
        </button>
    `;
    createArtifactRitualShell(boxItem.title.toUpperCase(), "[ APERTURA DE RELICARIO DEL SISTEMA ]", html, theme);
}

window.executeSarcophagusUnseal = function(idx) {
    let boxItem = p.inventory[idx];
    if (!boxItem) return;

    let btn = document.getElementById('btn-open-sarcophagus');
    let statusTxt = document.getElementById('sl-chest-status-txt');
    let visualBox = document.getElementById('sl-chest-visual-box');
    let rewardSlot = document.getElementById('sl-chest-reward-slot');
    if (btn) btn.style.display = 'none';
    if (statusTxt) statusTxt.innerText = "[ DESINTEGRANDO SELLOS RÚNICOS... ]";

    setTimeout(() => {
        let rw = null;
        let extraMsg = "";
        if (boxItem.rank === 'SS') {
            p.crystals = (p.crystals || 0) + 2;
            let ssPool = shopDB.filter(x => x.rank === 'S' || x.rank === 'SS');
            rw = ssPool[Math.floor(Math.random() * ssPool.length)];
            extraMsg = " + 2 Cristales de Maná (CM)";
        } else if (boxItem.rank === 'S') {
            let sPool = ["c_mercy", "c_magma_heart", "c_void_blood", "c_hourglass", "c7", "p7", "v6"];
            let pickId = sPool[Math.floor(Math.random() * sPool.length)];
            rw = shopDB.find(x => x.id === pickId) || shopDB[0];
        } else {
            let bPool = ["c1", "c_hp_mid", "c_med", "c2", "c3", "p1", "p3"];
            let pickId = bPool[Math.floor(Math.random() * bPool.length)];
            rw = shopDB.find(x => x.id === pickId) || shopDB[0];
        }

        p.inventory.splice(idx, 1);
        if (rw) p.inventory.push({...rw, type: rw.type || 'item'});
        finalizeInventoryConsumption(null);

        if (visualBox && rw) {
            visualBox.classList.remove('chest-shake');
            visualBox.style.borderColor = '#39ff14';
            visualBox.style.boxShadow = '0 0 32px rgba(57,255,20,0.75)';
            visualBox.innerHTML = getIconFor(rw);
        }
        if (statusTxt && rw) {
            statusTxt.style.color = '#39ff14';
            statusTxt.innerText = `[ RAREZA OBTENIDA: RANGO ${rw.rank || 'S'} ]`;
        }
        if (rewardSlot && rw) {
            rewardSlot.style.display = 'block';
            rewardSlot.innerHTML = `
                <div style="font-size:1.15em; font-weight:700; color:#ffffff; text-shadow:0 0 10px #00e5ff;">${rw.title}${extraMsg}</div>
                <div style="font-size:0.8em; color:#bae6fd; margin-top:4px;">${rw.desc}</div>
            `;
        }
        if (btn) {
            btn.style.display = 'block';
            btn.innerText = "GUARDAR EN LA BOLSA";
            btn.onclick = () => closeArtifactRitualModal();
        }
    }, 650);
};

/* 6. RITUAL VISUAL HOLOGRÁFICO DE CARTENON PARA CONSUMIBLES Y MICRO-MISIONES */
function openCartenonConsumableRitual(item, effectSummaryHtml, onConfirm, isPhysicalMicro = false) {
    let timerHtml = isPhysicalMicro
        ? `<div id="ritual-micro-timer" style="font-family:'Share Tech Mono', monospace; font-size:1.8em; color:#00e5ff; margin:8px 0;">00:15</div>
           <div style="font-size:0.78em; color:#bae6fd; margin-bottom:10px;">Ejecuta la directiva física en la vida real mientras el Sistema escanea tu pulso...</div>`
        : '';

    let html = `
        <div style="width:74px; height:74px; margin:0 auto 10px auto; filter:drop-shadow(0 0 14px #00e5ff);">${getIconFor(item)}</div>
        <div style="font-size:1.1em; font-weight:700; color:#ffffff; margin-bottom:6px;">${item.title}</div>
        <div style="background:rgba(2,12,28,0.9); border:1px solid rgba(125,211,252,0.5); padding:10px; font-size:0.84em; color:#e0f2fe; line-height:1.5; margin-bottom:12px;">
            ${effectSummaryHtml}
        </div>
        ${timerHtml}
        <button class="btn btn-main" id="btn-ritual-confirm" style="width:100%; padding:11px;">ASIMILAR EN EL NÚCLEO</button>
    `;
    createArtifactRitualShell("RITUAL DE ASIMILACIÓN", `[ ARTEFACTO RANGO ${item.rank || 'A'} ACTIVADO ]`, html);

    let btn = document.getElementById('btn-ritual-confirm');
    if (isPhysicalMicro && btn) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        let rem = 15;
        let tEl = document.getElementById('ritual-micro-timer');
        let iv = setInterval(() => {
            rem--;
            if (tEl) tEl.innerText = `00:${String(Math.max(0, rem)).padStart(2, '0')}`;
            if (rem <= 0) {
                clearInterval(iv);
                if (tEl) { tEl.style.color = '#39ff14'; tEl.innerText = '¡SINCRONIZADO!'; }
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.innerText = 'RECLAMAR BONIFICACIÓN FÍSICA';
            }
        }, 1000);
    }

    if (btn) {
        btn.onclick = () => {
            closeArtifactRitualModal();
            if (typeof onConfirm === "function") onConfirm();
        };
    }
}

function useItem(idx) {
    if (!p.inventory || !p.inventory[idx]) return;
    let item = p.inventory[idx];

    if (p.penaltyActive && item.id !== "c4" && item.id !== "c7" && item.id !== "c_mercy") {
        systemNotify("SISTEMA BLOQUEADO. Cumple tu supervivencia o usa una Piedra de la Misericordia / Píldora de Purificación.", "danger");
        return; 
    }

    let maxHP = calculateHunterMaxHP();
    let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;

    if (item.type === "loot" && item.sellGold) {
        p.gold += item.sellGold;
        p.inventory.splice(idx, 1);
        systemNotify(`🪙 [${item.title}] vendido al Sistema por +${item.sellGold} G.`, "gold");
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        renderInventory();
        renderShop();
        return;
    }

    // INTERFACES INTERACTIVAS PERSONALIZADAS (LOS 5 SISTEMAS ESPECIALES)
    if (item.type === "box") return openSarcophagusChestModal(idx);
    if (item.id === "p_dokkaebi") return openDokkaebiWagerModal(idx);
    if (item.id === "p_blood_contract") return openBloodContractModal(idx);
    if (item.id === "p_stealth_rune") return openStealthInfiltrationModal(idx);
    if (item.id === "p_kandiaru_dice") return openKandiaruDiceModal(idx);
    if (item.id === "p_transmute") return openAlchemicalSmelterModal(idx);

    let isMicroPhysical = REAL_ACTION_IDS.includes(item.id);
    let isMajorRitualItem = ["c_mercy", "c_magma_heart", "c_zero_serum", "c_void_blood", "c_hourglass", "c_star_drop", "c7", "c_world_fruit", "p_white_tiger_pass", "p_red_hearthstone", "p_high_mana_ore", "p_lycan_bandage"].includes(item.id) || isMicroPhysical;

    if (isMajorRitualItem && !item._ritualConfirmed) {
        return openCartenonConsumableRitual(item, formatCartenonDesc(item.desc), () => {
            item._ritualConfirmed = true;
            useItem(idx);
        }, isMicroPhysical);
    }
    delete item._ritualConfirmed;

let now = Date.now(); let currentDayStr = (typeof getBiologicalDayStr === 'function') ? getBiologicalDayStr() : new Date().toDateString(); if (item.id === "c_mercy") {
        p.hp = maxHP;
        p.mercyUntil = now + (6 * 3600000);
        p.mercyActive = currentDayStr;
        if (p.penaltyActive) {
            p.penaltyActive = false;
            p.deathSource = null;
            p.sp = Math.max(50, p.sp);
            document.body.classList.remove('penalty-active');
            let overlay = document.getElementById('damage-overlay');
            if (overlay) overlay.style.display = 'none';
            if (typeof renderRoutine === "function") renderRoutine();
            systemNotify("🪨 ¡COMPASIÓN DEL MONARCA! La Piedra de la Misericordia perdonó tu castigo, restauró tu HP al 100% y blindó tu barra de vida.", "success");
        } else {
            systemNotify("🪨 Piedra de la Misericordia activada: Contorno Esmeralda activo y caída nocturna extendida hasta las 2:00 AM.", "success");
        }
    } else if (item.id === "c_magma_heart") {
        p.hp = Math.floor(maxHP * 1.4);
        p.magmaOverheal = true;
        systemNotify(`❤️‍🔥 Corazón de Magma: ¡SOBRECARGA VITAL AL 140% (${p.hp}/${maxHP} HP)!`, "gold");
    } else if (item.id === "c_zero_serum") {
        p.cryoBuffUntil = now + (6 * 3600000);
        systemNotify("🧊 Suero de Cero Absoluto: Todo daño recibido se reduce al 50% durante 6 Horas.", "info");
    } else if (item.id === "c_void_blood") {
        if (p.hp <= 25) return systemNotify("Riesgo letal: Necesitas más de 25 HP para soportar la Sangre Corrupta.", "danger");
        p.hp -= 25;
        p.voidXpBuffUntil = now + (90 * 60000);
        systemNotify("🟣 Sangre Corrupta asimilada (-25 HP): Barra de EXP Púrpura y ganancia de EXP aumentada por 90 min.", "purple");
    } else if (item.id === "c_hourglass") {
        p.entropyBuffUntil = now + (90 * 60000);
        systemNotify("⏳ Reloj de Ceniza activo: Desplegar misiones te regenerará +8 SP durante 90 minutos.", "info");
    } else if (item.id === "c_star_drop") {
        p.starStreamNext = true;
        systemNotify("🌟 Patrocinio del Star Stream: Tu próxima misión o incursión pagará Oro extra libre de impuestos.", "gold");
    } else if (item.id === "c1") {
        let heal = Math.max(35, Math.floor(maxHP * 0.25));
        p.hp = Math.min(maxHP, +(p.hp + heal).toFixed(1));
        systemNotify(`Poción de Sangre Menor consumida: +${heal} HP restaurados.`, "success");
    } else if (item.id === "c_hp_mid") {
        if (p.sp < 10) return systemNotify("Necesitas al menos 10 SP para asimilar el Cáliz Carmesí.", "danger");
        p.sp -= 10;
        let heal = Math.max(75, Math.floor(maxHP * 0.45));
        p.hp = Math.min(maxHP, +(p.hp + heal).toFixed(1));
        systemNotify(`Cáliz Carmesí consumido: +${heal} HP restaurados (-10 SP).`, "success");
    } else if (item.id === "c_med") {
        p.spDiscountUntil = now + 3600000;
        systemNotify("Estado Zen: Costo de SP reducido al 50% por 1 Hora.", "info");
    } else if (item.id === "c2") {
        p.sp = Math.min(100, p.sp + 55);
        p.intBlockedUntil = now + (2 * 3600000);
        systemNotify("+55 SP restaurados. Ganancia de INT bloqueada por 2H.", "stamina");
    } else if (item.id === "c_sp_pure") {
        p.sp = Math.min(100, p.sp + 70);
        systemNotify("Celda de Plasma absorbida: +70 SP limpios sin bloqueo mental.", "stamina");
    } else if (item.id === "c_mp_pot") {
        let mpRest = Math.max(500, Math.floor(maxMP * 0.25));
        p.mp = Math.min(maxMP, (p.mp || 0) + mpRest);
        systemNotify(`Lágrima de Maná absorbida: +${mpRest} MP.`, "purple");
    } else if (item.id === "c3") {
        p.hp = Math.max(1, Math.floor(p.hp * 0.5));
        p.sp = 100;
        systemNotify("Intercambio Equivalente: -50% HP sacrificado, SP al 100%.", "danger");
    } else if (item.id === "c_blood_pact") {
        if (p.sp < 35) return systemNotify("Necesitas al menos 35 SP para el Latido del Berserker.", "danger");
        p.sp -= 35;
        let heal = Math.max(90, Math.floor(maxHP * 0.55));
        p.hp = Math.min(maxHP, +(p.hp + heal).toFixed(1));
        systemNotify(`Latido del Berserker: -35 SP convertidos en +${heal} HP.`, "danger");
    } else if (item.id === "c_antidote") {
        p.sleepDebt = false;
        p.sleepCheatNextMorning = false;
        p.intBlockedUntil = null;
        let heal = Math.max(30, Math.floor(maxHP * 0.20));
        p.hp = Math.min(maxHP, +(p.hp + heal).toFixed(1));
        systemNotify(`Antídoto de Kasaka: Resaca y bloqueos mentales purgados (+${heal} HP).`, "success");

    } else if (item.id === "c4") {
        if (p.penaltyActive) {
            if (p.deathSource === 'dungeon' || p.deathSource === 'midnight') {
                return systemNotify("🔒 Castigo de Alto Rango: La Píldora de Purificación no anula muertes de Mazmorra o Medianoche.", "danger");
            }
            p.penaltyActive = false;
            p.hp = 25;
            p.sp = 0;
            document.body.classList.remove('penalty-active');
            let overlay = document.getElementById('damage-overlay');
            if (overlay) overlay.style.display = 'none';
            systemNotify("💊 Cuerpo purificado con secuelas (25 HP, 0 SP). Has salido de la Zona de Penalización.", "gold");
            if (typeof renderRoutine === "function") renderRoutine();
        } else {
            return systemNotify("No tienes ninguna penalización activa que purificar.", "info");
        }
    } else if (item.id === "c5") {
        p.extractionBuffUntil = now + (3 * 3600000);
        systemNotify("🔮 Orbe de Almas: Probabilidad de Extracción (¡SURGE!) aumentada por 3H.", "purple");
    } else if (item.id === "c6") {
        p.hp = Math.min(maxHP, p.hp + 35);
        p.sp = Math.min(100, p.sp + 35);
        p.nightPassActive = currentDayStr;
        systemNotify("☕ Café Expreso: +35 HP, +35 SP y permiso de vigilia nocturna activo hoy.", "gold");
    } else if (item.id === "c_rc_cells") {
        if (p.hp >= 35) return systemNotify("🧬 Tus células RC rechazan el mutágeno. Solo reacciona en agonía (menos de 35 HP).", "danger");
        p.arcticShield = (p.arcticShield || 0) + 110;
        p.hp = Math.min(maxHP, p.hp + 40);
        systemNotify("🧬 ¡ARMADURA KAGUNE DESPLEGADA! +110 de Escudo Carmesí y +40 HP.", "danger");
    } else if (item.id === "c_wisteria") {
        p.hazardImmunityUntil = now + (2 * 3600000);
        systemNotify("🌸 Incienso de Glicinas: Inmune a veneno, fuego y presión abisal en mazmorras por 2H.", "success");
} else if (item.id === "c_kandiaru_eye") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 850);
        p.nextSlashWiden = true;
        systemNotify("🧿 Clarividencia de Kandiaru: +850 MP y Zona Vital ampliada al doble en tu próximo Corte.", "purple");
    } else if (item.id === "c_phoenix") {
        p.hp = Math.min(maxHP, p.hp + 60);
        p.sp = Math.min(100, p.sp + 60);
        p.phoenixFeatherActive = currentDayStr;
        systemNotify("🪶 Pluma del Fénix activa: +60 HP/SP y seguro de resurrección activado por hoy.", "gold");
    } else if (item.id === "c_ambrosia") {
        p.sp = 100;
        p.hp = Math.min(maxHP, p.hp + 40);
        p.arcticShield = (p.arcticShield || 0) + 65;
        p.ambrosiaHalfTimeUses = 2;
        systemNotify("🍯 Néctar de los Gobernantes: Fatiga en 0, +40 HP y tus próximas 2 misiones solo exigirán el 50% del tiempo.", "gold");
    } else if (item.id === "c7") {
        p.abyssCurseUntil = null;
        let cleanMaxHP = calculateHunterMaxHP();
        p.hp = cleanMaxHP; p.sp = 100; p.mp = maxMP;
        p.intBlockedUntil = null; p.spDiscountUntil = null;
        p.sleepDebt = false;
        p.penaltyActive = false; p.deathSource = null;
        document.body.classList.remove('penalty-active');
        let overlay = document.getElementById('damage-overlay');
        if (overlay) overlay.style.display = 'none';
        systemNotify("✨ ELIXIR DEL AGUA DE LA VIDA: Restauración absoluta del Monarca.", "gold");
        if (typeof renderRoutine === "function") renderRoutine();
    } else if (item.id === "c_posture") {
        p.intBlockedUntil = null;
        p.sp = Math.min(100, p.sp + 18);
        systemNotify("🧘 Reajuste Vertebral completado: Bloqueos de INT purgados y +18 SP.", "success");
    } else if (item.id === "c_breathing") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 160);
        p.nextSlashWiden = true;
        systemNotify("🫁 Respiración Total: +160 MP y Zona Vital ampliada (+15%) en tu próximo corte.", "purple");
    } else if (item.id === "c_eye_drops") {
        p.nextBossCrit = true;
        systemNotify("👁️‍🗨️ Gotas Oculares: Golpe crítico garantizado en tu próximo ataque directo a Jefe.", "gold");
    } else if (item.id === "c_cold_splash") {
        p.sp = Math.min(100, p.sp + 20);
        p.nextSlashSlow = true;
        systemNotify("🌊 Choque Térmico Facial: +20 SP y aguja ralentizada un 35% en tu próximo corte.", "success");
    } else if (item.id === "c_adrenaline") {
        p.adrenalineDodgeUntil = now + 3600000;
        p.nextSlashFast = true;
        systemNotify("💉 Adrenalina Cinética: +15% Evasión en mazmorra durante 1 Hora.", "stamina");
    } else if (item.id === "c_sage_tea") {
        p.sageTeaFocusMp = true;
        systemNotify("🍵 Infusión del Sabio preparada: Tu próxima sesión en la Cámara de Focus otorgará +180 MP adicionales al sellarla.", "purple");
    } else if (item.id === "c_cartenon_candle") {
        p.candleBuffUntil = now + (90 * 60000);
        systemNotify("🕯️ Vela de Cartenon: Eventos narrativos y hallazgos de tus sombras al DOBLE de velocidad por 90m.", "gold");
    } else if (item.id === "c_giant_serum") {
        p.hp = Math.min(maxHP, p.hp + 20);
        p.arcticShield = (p.arcticShield || 0) + 45;
        systemNotify("🏋️ Suero de Gigante: +45 de Escudo Físico y +20 HP.", "gold");
} else if (item.id === "c_baran_drop") {
        let advCount = (typeof window.advanceNonTelemetryMissions === "function") ? window.advanceNonTelemetryMissions(12) : 0;
        p.sp = Math.min(100, p.sp + 20);
        systemNotify(advCount > 0
            ? `🌩️ Destilado de Baran: Tus misiones activas adelantaron +12 min (contadores reales intactos) y -20 Fatiga.`
            : `🌩️ Destilado de Baran: -20 Fatiga instantánea (No tenías misiones de tiempo fijo activas).`, "purple");
    } else if (item.id === "c_liquid_shadow") {
        p.zeroMpDrainUntil = now + (45 * 60000);
        systemNotify("🖤 Esencia de Sombra Líquida: Tus Comandantes consumen 0 MP/min durante 45 minutos.", "purple");
    } else if (item.id === "c_demon_blood") {
        p.demonBloodUntil = now + (90 * 60000);
        systemNotify("👹 Sangre de Demonio Noble activa (90m): Al sellar misiones o fases absorberás +20 HP y +140 MP.", "danger");
    } else if (item.id === "c_world_fruit") {
        p.hp = maxHP;
        p.sp = 100;
        p.arcticShield = (p.arcticShield || 0) + 100;
        p.sovereignCritDiscount = true;
        systemNotify("🌳 ¡FRUTO DEL ÁRBOL DEL MUNDO! 100% HP/SP, +100 Escudo y -50% costo en tu próxima Activa.", "gold");
    } else if (item.id === "p1" || item.id === "p3") {
        let freezeMins = item.id === "p1" ? 15 : 45;
        let shAdd = item.id === "p1" ? 35 : 85;
        p.arcticShield = (p.arcticShield || 0) + shAdd;
        p.iceSlowBossParry = (item.id === "p1") ? 1 : 2;
        let bossesFrozen = 0;
        if (Array.isArray(p.bosses)) {
            p.bosses.forEach(b => {
                if (b.phaseEndsAt) {
                    b.phaseEndsAt += (freezeMins * 60000);
                    bossesFrozen++;
                }
            });
            if (typeof renderBosses === "function") renderBosses();
        }
        systemNotify(`❄️ ${item.id === "p1" ? "Hielo Menor" : "Ventisca Mayor"}: Cronómetros de Jefes congelados +${freezeMins}m (${bossesFrozen} activos), +${shAdd} Escudo y ataques de Jefe ralentizados.`, "info");
    } else if (item.id === "p_red_hearthstone") {
        if (typeof activeDungeon !== 'undefined' && activeDungeon) {
            if (activeDungeon.isRedGate) return systemNotify("💎 Los Portales Rojos bloquean piedras normales (Requiere Intercambio de Sombra).", "danger");
            if (!p.dungeonCheckpoints) p.dungeonCheckpoints = {};
            p.dungeonCheckpoints[activeDungeon.id] = currentPhase || 0;
            if (activeDungeon.reqKey) {
                let rk = activeDungeon.reqKey || ('rank' + activeDungeon.rank);
                p.dungeonKeys[rk] = (p.dungeonKeys[rk] || 0) + 1;
            }
            if (typeof stopBiomeCanvas === "function") stopBiomeCanvas();
            let overlay = document.getElementById('dungeon-overlay');
            if (overlay) { overlay.style.display = 'none'; overlay.classList.remove('abyssal-focus'); }
            let savedName = activeDungeon.title;
            let savedPhaseNum = (currentPhase || 0) + 1;
            activeDungeon = null;
            clearInterval(raidTimer); clearInterval(validationTimer); clearInterval(clashInterval);
            p.mp = Math.min(maxMP, (p.mp || 0) + 100);
            systemNotify(`💎 Evacuación con Punto de Anclaje: Saliste de [${savedName}] en Fase ${savedPhaseNum}, recuperaste tu llave y +100 MP.`, "info");
        } else {
            p.mp = Math.min(maxMP, (p.mp || 0) + 150);
            systemNotify("💎 Piedra de Retorno absorbida fuera de portal: +150 MP recargados.", "info");
        }
    } else if (item.id === "p_lycan_bandage") {
        p.hp = Math.min(maxHP, p.hp + 35);
        p.arcticShield = (p.arcticShield || 0) + 45;
        p.cryoBuffUntil = now + (90 * 60000);
        p.tankCurfewDelayDay = currentDayStr;
        systemNotify("🩹 Torniquete de Colmillo Blanco: +35 HP, +45 Escudo y sangrado nocturno congelado hasta las 10:30 PM.", "success");
    } else if (item.id === "p_white_tiger_pass") {
        p.whiteTigerBounty = true;
        systemNotify("🐯 Concesión del Gremio Tigre Blanco activa: Tu próxima Mazmorra o Misión Principal pagará 100% Oro libre de impuestos + 110 G, 2 minerales garantizados y reembolso de llave.", "gold");
    } else if (item.id === "p_high_mana_ore") {
        p.halfMpDrainUntil = now + (90 * 60000);
        p.mp = Math.min(maxMP, (p.mp || 0) + 220);
        p.sovereignCritDiscount = true;
        systemNotify("🔷 Mineral de Alta Pureza activo: -50% drenaje de sombras por 90m, +220 MP y -50% costo en tu próxima Activa.", "info");
    } else if (item.id === "p_iron_trial") {
        p.xp += 90;
        p.sp = Math.min(100, p.sp + 40);
        systemNotify("🏋️‍♂️ Misión de Castigo Físico superada: +90 XP y +40 SP por tu disciplina.", "gold");
    } else if (item.id === "p_zone_purge") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 220);
        p.intBlockedUntil = null;
        systemNotify("🧹 Territorio Purificado: +220 MP y bloqueos mentales disipados.", "success");
    } else if (item.id === "p_focus_reset") {
        p.studyCompletedToday = false;
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("⚡ Sobrecarga de Focus: Ya puedes realizar tu segunda sesión de estudio de hoy.", "gold");
    } else if (item.id === "p_bounty_hunt") {
        if (p.bosses && p.bosses.length > 0) {
            p.bosses.forEach(b => {
                b.xp = Math.floor((b.xp || 80) * 1.75);
                b.gold = Math.floor((b.gold || 40) * 1.75);
            });
            systemNotify("🎯 Caza Mayor decretada: Todos tus Jefes activos aumentan un +75% su recompensa.", "gold");
        } else {
            return systemNotify("No tienes Jefes personales escaneados.", "danger");
        }
} else if (item.id === "p_red_beacon") {
        p.redBeaconArmed = true;
        p.redBeaconGoldDouble = true;
        if (typeof syncBeaconRescanButton === "function") syncBeaconRescanButton();
        if (typeof renderBosses === "function") renderBosses();
        systemNotify("📡 Baliza Carmesí armada: El botón [? REESCANEAR] del Sonar se ha puesto en ROJO. Presiónalo para sobrecargar el radar durante 30 minutos (+Oro x2).", "danger");
        
    } else if (item.id === "p_hyper_time") {
        p.studyCompletedToday = false;
        p.voidXpBuffUntil = now + (90 * 60000);
        p.mp = Math.min(maxMP, (p.mp || 0) + 250);
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("⌛ Cámara Hiperbólica activa: Cámara de Focus reabierta hoy, 90m de EXP bonificada y +250 MP.", "gold");
    } else if (item.id === "p_imperial_march") {
        ensureShadowStructure();
        let unlockedCmds = Object.keys(COMMANDERS_META).filter(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);
        if (unlockedCmds.length === 0) return systemNotify("Aún no has desbloqueado Comandantes para la Marcha Imperial.", "danger");
        p.equippedShadows = unlockedCmds;
        Object.keys(p.shadowArmy).forEach(k => { if (p.shadowArmy[k]) p.shadowArmy[k].active = unlockedCmds.includes(k); });
        p.imperialMarchUntil = now + (3 * 3600000);
        p.mp = Math.min(maxMP, (p.mp || 0) + 350);
        systemNotify("🚩 Marcha Imperial activa (3 Horas): ¡TODOS tus Comandantes desbloqueados están en campo (+350 MP)!", "purple");
    } else if (item.id === "p_forced_arise") {
        p.infantry.soldiers = Math.min(25, (p.infantry.soldiers || 0) + 2);
        p.infantry.mages = Math.min(20, (p.infantry.mages || 0) + 1);
        p.extractionBuffUntil = now + (6 * 3600000);
        systemNotify("⛓️ Subyugación Forzada: +2 Soldados, +1 Mago y probabilidad de extracción aumentada por 6H.", "purple");
    } else if (item.id === "p_master_key") {
        if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0, rankSSS: 0 };
        p.dungeonKeys.rankE = (p.dungeonKeys.rankE || 0) + 1;
        p.dungeonKeys.rankD = (p.dungeonKeys.rankD || 0) + 1;
        p.dungeonKeys.rankC = (p.dungeonKeys.rankC || 0) + 1;
        p.dungeonKeys.rankB = (p.dungeonKeys.rankB || 0) + 1;
        p.dungeonKeys.rankA = (p.dungeonKeys.rankA || 0) + 1;
        systemNotify("🗝️ Llavero Maestro recibido: +1 Llave de Rango E, D, C, B y A añadidas.", "gold");
    } else if (item.id === "p_chrono") {
        let advCount = (typeof window.advanceNonTelemetryMissions === "function") ? window.advanceNonTelemetryMissions(25) : 0;
        p.sp = Math.min(100, p.sp + 35);
        systemNotify(advCount > 0
            ? `⏩ Aceleración de Taquiones: +25 min adelantados en tus misiones activas (Ruta/Jornada intactas) y -35 Fatiga.`
            : `⏩ Aceleración de Taquiones: -35 Fatiga y +90 XP (No tenías misiones de tiempo fijo activas).`, "gold");
        if (advCount === 0) p.xp += 90;
    } else if (item.id === "p6") {
        p.bypassFatigue = true;
        systemNotify("🧠 Bypass de Fatiga activo: Tu próxima misión o Focus costará 0 SP.", "purple");
    } else if (item.id === "p_reroll") {
        if (typeof eventDB !== "undefined" && eventDB.length > 0) {
            let evDesc = eventDB[Math.floor(Math.random() * eventDB.length)];
            p.activeEvent = { id: "ev_" + Date.now(), title: "Incursión Sorpresa", desc: evDesc, xp: 60, gold: 30 };
            systemNotify("🔄 Causalidad rebobinada: Nueva Anomalía Diaria invocada.", "purple");
            if (typeof renderRoutine === "function") renderRoutine();
        }
    } else if (item.id === "p_xp_boost") {
        p.xp += 140;
        while (p.xp >= p.maxXp) {
            p.level++;
            p.xp -= p.maxXp;
            p.maxXp = (typeof getRequiredXpForLevel === "function") ? getRequiredXpForLevel(p.level) : Math.floor(100 + (p.level - 1) * 18);
            p.hp = calculateHunterMaxHP(); p.sp = 100;
            p.crystals = (p.crystals || 0) + 2;
            systemNotify(`¡ASCENSIÓN AL NIVEL ${p.level}!`, "gold");
        }
        systemNotify("📘 Grimorio del Arquitecto descifrado: +140 XP.", "gold");
    } else if (item.id === "p_bloodlust") {
        if (p.bosses && p.bosses.length > 0) {
            let b = p.bosses.shift();
            p.xp += b.xp || 80;
            p.gold += Math.floor((b.gold || 40) * GOLD_NERF);
            systemNotify(`👁️ Intención Asesina: [${b.title}] colapsó de terror (+${b.xp} XP).`, "purple");
            if (typeof renderBosses === "function") renderBosses();
        } else {
            return systemNotify("No tienes amenazas personales escaneadas para aniquilar.", "danger");
        }
    } else if (item.id === "p_shadow_exchange") {
        if (typeof activeDungeon === 'undefined' || !activeDungeon) return systemNotify("👤 Solo puedes usar Intercambio de Sombra dentro de una mazmorra.", "info");
        if (typeof stopBiomeCanvas === "function") stopBiomeCanvas();
        let overlay = document.getElementById('dungeon-overlay');
        if (overlay) { overlay.style.display = 'none'; overlay.classList.remove('abyssal-focus'); }
        activeDungeon = null;
        clearInterval(raidTimer); clearInterval(validationTimer); clearInterval(clashInterval);
        systemNotify("👤 ¡INTERCAMBIO DE SOMBRA! Evacuación limpia sin daño ni maldición.", "purple");
    } else if (item.id === "p_tusk_fire") {
        if (typeof activeDungeon === 'undefined' || !activeDungeon || typeof raidTimeLeft === 'undefined') {
            return systemNotify("🔥 Solo puedes invocar el Himno de Fuego dentro de una mazmorra activa.", "danger");
        }
        raidTimeLeft = Math.max(2, Math.floor(raidTimeLeft * 0.5));
        if (typeof updateRaidTimerUI === "function") updateRaidTimerUI();
        systemNotify("🔥 ¡HIMNO DEL DRAGÓN DE FUEGO! Tiempo de fase reducido a la mitad.", "gold");
    } else if (item.id === "p_tank_shield") {
        if (typeof ensureShadowStructure === "function") ensureShadowStructure();
        p.arcticShield = (p.arcticShield || 0) + 75;
        if (p.shadowArmy.tank && p.shadowArmy.tank.unlocked) {
            p.shadowArmy.tank.usesLeft = Math.min(2, (p.shadowArmy.tank.usesLeft || 0) + 1);
            p.shadowArmy.tank.cooldownUntil = null;
            systemNotify(`🐻‍❄️ Rugido de Tank: +75 Escudo Ártico y +1 noche de guardia restaurada (${p.shadowArmy.tank.usesLeft}/2).`, "purple");
        } else {
            systemNotify("🐻‍❄️ Rugido Blindado: +75 de Escudo Ártico activado.", "info");
        }
    } else if (item.id === "p7") {
        let mList = typeof getTodayMissions === 'function' ? getTodayMissions() : [];
        let paralelas = mList.filter(x => x.type === 'sub');
        paralelas.forEach(m => {
            if (!p.completedToday.includes(m.id)) {
                p.completedToday.push(m.id);
                p.xp += m.xp;
                p.gold += Math.floor(m.gold * GOLD_NERF);
            }
        });
        systemNotify("⚔️ Dominio de Sombras: Tus sombras han limpiado todas tus misiones paralelas de hoy.", "purple");
        if (typeof renderRoutine === "function") renderRoutine();
    } else if (item.id === "p_arise") {
        p.crystals = (p.crystals || 0) + 3;
        systemNotify("💠 Decreto de Cristalización: +3 Cristales de Maná obtenidos.", "purple");
    } else if (item.id === "p_double_loot") {
        rollLootDrop(false); rollLootDrop(false); rollLootDrop(false);
        systemNotify("🧲 Mano del Gobernante: 3 objetos extraídos del vacío a tu bolsa.", "gold");
    } else if (item.id === "p_repair") {
        if (p.history && p.history.itemsBroken > 0) p.history.itemsBroken--;
        rollLootDrop(true);
        systemNotify("🛠️ Runa de Reconstrucción: Historial reparado y reliquia superior materializada.", "gold");
    } else if (item.id === "v_music") {
        p.sp = Math.min(100, p.sp + 25);
        p.mp = Math.min(maxMP, (p.mp || 0) + 120);
        systemNotify("🎧 Sesión Musical: Resonancia rítmica activada (+25 SP, +120 MP).", "gold");
    } else if (item.id === "v_hot_shower") {
        p.intBlockedUntil = null;
        p.sleepDebt = false;
        p.hp = Math.min(maxHP, p.hp + 30);
        systemNotify("🚿 Ducha Regenerativa: Resaca y bloqueos purgados (+30 HP).", "success");
    } else if (item.id === "v_retro_music") {
        p.hp = Math.min(maxHP, p.hp + 20);
        p.spDiscountUntil = now + 3600000;
        systemNotify("🎸 Clásicos Inmortales: +20 HP y -50% costo de SP por 1 Hora.", "gold");
    } else if (item.id === "v1") {
        p.sp = Math.min(100, p.sp + 35);
        p.nextSlashSlow = true;
        systemNotify("📱 Descompresión Mental: +35 SP y aguja ralentizada en tu próximo Corte.", "success");
    } else if (item.id === "v_snack") {
        p.hp = Math.min(maxHP, p.hp + 15);
        p.lunchRegen = (p.lunchRegen || 0) + 30;
        systemNotify("🍫 Suministro Dulce: +15 HP y +30 SP en regeneración progresiva.", "gold");
    } else if (item.id === "v_brother") {
        p.sp = Math.min(100, p.sp + 30);
        p.infantry.soldiers = Math.min(25, (p.infantry.soldiers || 0) + 1);
        systemNotify("🕹️ Alianza con Henry: +30 SP y +1 Soldado de Sombra reclutado.", "purple");
    } else if (item.id === "v_tech_tinker") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 320);
        p.sovereignCritDiscount = true;
        systemNotify("🤖 Overclock Técnico: +320 MP y -50% costo en tu próxima habilidad Activa.", "purple");
    } else if (item.id === "v_nap") {
        p.sp = Math.min(100, p.sp + 50);
        p.hp = Math.min(maxHP, p.hp + 25);
        p.sleepDebt = false;
        systemNotify("🛌 Siesta Táctica: +50 SP, +25 HP y deuda de sueño saldada.", "stamina");
    } else if (item.id === "v_fandub") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 200);
        p.zeroMpDrainUntil = now + (25 * 60000);
        systemNotify("🎙️ Voz de Mando: +200 MP y 0 drenaje sombrío durante 25 minutos.", "purple");
    } else if (item.id === "v_ibispaint") {
        p.nextSlashWiden = true;
        p.mp = Math.min(maxMP, (p.mp || 0) + 180);
        systemNotify("✏️ Trazo Preciso: Zona Vital ensanchada en tu próximo Corte y +180 MP.", "purple");
} else if (item.id === "v_capcut") {
        let adv = (typeof window.advanceNonTelemetryMissions === "function") ? window.advanceNonTelemetryMissions(20) : 0;
        p.mp = Math.min(maxMP, (p.mp || 0) + 120);
        if (adv === 0) p.xp += 75;
        systemNotify("🎞️ Laboratorio CapCut: +20 min adelantados en misiones fijas (contadores reales intactos) y +120 MP.", "gold");
    } else if (item.id === "v_mc") {
        p.sp = Math.min(100, p.sp + 25);
        rollLootDrop(false); rollLootDrop(false);
        systemNotify("⛏️ Mente Arquitectónica: +25 SP y 2 minerales extraídos a tu bolsa.", "gold");
    } else if (item.id === "v5") {
        p._arcPrismUntil = now + (45 * 60000);
        p.mp = Math.min(maxMP, (p.mp || 0) + 150);
        systemNotify("🎨 Pase de Creador: 45 min de Sincronización Prismática (EXP x1.5) y +150 MP.", "purple");
    } else if (item.id === "v_pepakura") {
        p.arcticShield = (p.arcticShield || 0) + 55;
        p.sp = Math.min(100, p.sp + 25);
        systemNotify("📐 Armadura Poligonal: +55 de Escudo Físico y +25 SP.", "info");
    } else if (item.id === "v3") {
        p.adrenalineDodgeUntil = now + (90 * 60000);
        p.nextBossCrit = true;
        p.iceSlowBossParry = 1;
        systemNotify("🦋 Reflejos de Hallownest: Evasión aumentada por 90m, desvío asistido y crítico listo contra el próximo Jefe.", "success");
    } else if (item.id === "v4") {
        p.bypassFatigue = true;
        p.sp = Math.min(100, p.sp + 35);
        if (p.activeExpedition && p.activeExpedition.endsAt > now) {
            let rem = p.activeExpedition.endsAt - now;
            p.activeExpedition.endsAt = now + Math.floor(rem * 0.5);
        }
        systemNotify("🏎️ Aceleración Máxima: Bypass de Fatiga, +35 SP y tiempo de Expedición de Infantería reducido a la mitad.", "stamina");
    } else if (item.id === "v_zelda") {
        p.arcticShield = (p.arcticShield || 0) + 35;
        if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0, rankSSS: 0 };
        p.dungeonKeys.rankC = (p.dungeonKeys.rankC || 0) + 1;
        systemNotify("🗺️ Corazón de Campeón: +35 de Escudo y +1 Llave de Portal Rango C.", "gold");
} else if (item.id === "v_anime") {
        p.sp = Math.min(100, p.sp + 45);
        if (Array.isArray(p.bosses)) {
            p.bosses.forEach(b => { if (b.phaseEndsAt) b.phaseEndsAt += (90 * 60000); });
            if (typeof renderBosses === "function") renderBosses();
        }
        systemNotify("📺 Maratón Autorizada: +45 SP y cronómetros de Jefes Personales congelados por +90 minutos.", "gold");
    } else if (item.id === "v_dance") {
        p.sp = Math.min(100, p.sp + 55);
        p.hp = Math.min(maxHP, p.hp + 30);
        if (!p.completedToday.includes('m_hydration')) p.completedToday.push('m_hydration');
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("🕺 Ensayo Activo: +55 SP, +30 HP y Recarga Biológica sellada.", "gold");
    } else if (item.id === "v_movie_night") {
        p.sp = Math.min(100, p.sp + 40);
        p.mp = Math.min(maxMP, (p.mp || 0) + 150);
        p.movieNightCurfewDay = currentDayStr;
        systemNotify("🎥 Función Privada: +40 SP, +150 MP y sangrado nocturno retrasado hasta las 11:20 PM.", "gold");
    } else if (item.id === "v_moto_ride") {
        p.sp = Math.min(100, p.sp + 45);
        if (!p.completedToday.includes('m_phys')) {
            p.completedToday.push('m_phys');
            p.xp += 40;
        }
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("🏍️ Rodada Libre: +45 SP y misión Mecánica Serpento sellada.", "stamina");
    } else if (item.id === "v_fastfood") {
        p.hp = Math.floor(maxHP * 1.20);
        p.magmaOverheal = true;
        p.sp = Math.min(100, p.sp + 65);
        systemNotify("🍔 Banquete Real: HP al 120% (Overheal) y +65 SP.", "gold");
    } else if (item.id === "v_late_wake") {
        p.hp = maxHP;
        p.sp = 100;
        p.mp = Math.min(maxMP, (p.mp || 0) + 300);
        p.sleepDebt = false;
        systemNotify("🌅 Mañana sin Despertador: 100% HP/SP, +300 MP y resaca purgada.", "gold");
    } else if (item.id === "v6_creator") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 350);
        if (!p.completedToday.includes('m_creative')) {
            p.completedToday.push('m_creative');
            p.xp += 50;
        }
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("🎬 Impulso de Creador Mayor: +350 MP y misión creativa sellada.", "purple");
    } else if (item.id === "v6") {
        p.sp = Math.min(100, p.sp + 50);
        p.mp = Math.min(maxMP, (p.mp || 0) + 250);
        p.movieNightCurfewDay = currentDayStr;
        if (!p.completedToday.includes('m_gf')) {
            p.completedToday.push('m_gf');
            p.xp += 25;
        }
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("🍿 Cita Especial: Vínculo Amoroso sellado, +50 SP, +250 MP y toque de queda retrasado a las 11:30 PM.", "gold");
    } else if (item.id === "v_streak_shield") {
        p.streakShieldActive = currentDayStr;
        systemNotify("🛡️ Escudo de Racha activado: Tu racha perfecta está protegida contra imprevistos al cierre de hoy.", "gold");
    } else if (item.id === "v_shopping") {
        p.sp = Math.min(100, p.sp + 60);
        let bBox = shopDB.find(x => x.id === "p_box_b");
        if (bBox) p.inventory.push({...bBox, type: 'box'});
        systemNotify("🛍️ Gusto Personal adquirido: +60 SP y 1 Caja de Suministros Rango B añadida a tu bolsa.", "gold");
    } else if (item.id === "v7") {
        p.streakShieldActive = currentDayStr;
        p.movieNightCurfewDay = currentDayStr;
        p.tankCurfewDelayDay = currentDayStr;
        p.hp = Math.min(maxHP, p.hp + Math.floor(maxHP * 0.5));
        p.sp = Math.min(100, p.sp + 50);
        systemNotify("🎟️ Pase de Día Libre activado: Racha protegida hoy, +50% HP/SP y toque de queda extendido a la madrugada.", "gold");
    } else if (item.id === "p_extra_chorros") {
        if (!p.completedToday) p.completedToday = [];
        p.completedToday = p.completedToday.filter(id => id !== 'm_traffic_ida' && id !== 'm_traffic_vuelta');
        p.extraChorrosUnlockedDay = currentDayStr;
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("🛣️ Bitácora Vial activada: Las misiones de Ruta Los Chorros están disponibles nuevamente hoy.", "info");
    } else if (item.id === "work_pass") {
        if (!p.completedToday) p.completedToday = [];
        ['m_work', 'm_traffic_ida', 'm_traffic_vuelta'].forEach(mid => {
            if (!p.completedToday.includes(mid)) {
                p.completedToday.push(mid);
                p.totalMissions = (p.totalMissions || 0) + 1;
            }
            if (p.activeMissions && p.activeMissions[mid]) delete p.activeMissions[mid];
        });
        p.xp += 60;
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("🎫 Sello de Exención Laboral validado: Día sin turno laboral justificado (+60 XP y Racha protegida).", "success");
    } else if (item.id === "lunch_ticket") {
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let totalMins = (h * 60) + m;
        let isLunchTime = (totalMins >= 675 && totalMins <= 840);
        if (!isLunchTime) return systemNotify("🥗 Horario biológico incorrecto: El Cupón de Almuerzo solo puede digerirse entre las 11:15 AM y las 2:00 PM.", "danger");
        if (totalMins < 720) {
            p.mp = Math.min(maxMP, (p.mp || 0) + 35);
            systemNotify("🥗 Almuerzo de Salida Temprana: +40 SP progresivos y +35 MP extra.", "stamina");
        } else {
            systemNotify("🥗 Cupón de Almuerzo activado: +40 SP progresivos.", "stamina");
        }
        if (window.lunchSlowTimer) clearInterval(window.lunchSlowTimer);
        let ticksLeft = 20;
        window.lunchSlowTimer = setInterval(() => {
            if (!p || p.penaltyActive || ticksLeft <= 0 || p.sp >= 100) {
                clearInterval(window.lunchSlowTimer);
                return;
            }
            ticksLeft--;
            if (typeof animateSPChange === "function") animateSPChange(2);
            else { p.sp = Math.min(100, p.sp + 2); updateHUD(); saveData(); }
        }, 3000);
    } else {
        systemNotify(`✨ Privilegio activado: ${item.title}. Disfrútalo sin culpa.`, "gold");
    }

    finalizeInventoryConsumption(idx);
}

function rollLootDrop(guaranteedHighRank = false) {
    if (typeof lootDB === 'undefined' || lootDB.length === 0) return;

    // Rareza de Llave Dimensional (12% prob.): Si se activa, reemplaza el objeto de chatarra por una Llave de Portal
    if (Math.random() <= 0.12) {
        if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0 };
        let rng = Math.random();
        let pickedKey = { prop: 'rankE', lbl: 'E', id: 'key_e' };
        if (guaranteedHighRank) {
            if (rng < 0.50) pickedKey = { prop: 'rankB', lbl: 'B', id: 'key_b' };
            else if (rng < 0.88) pickedKey = { prop: 'rankA', lbl: 'A', id: 'key_a' };
            else pickedKey = { prop: 'rankS', lbl: 'S', id: 'key_s' };
        } else {
            if (rng < 0.52) pickedKey = { prop: 'rankE', lbl: 'E', id: 'key_e' };
            else if (rng < 0.80) pickedKey = { prop: 'rankD', lbl: 'D', id: 'key_d' };
            else if (rng < 0.94) pickedKey = { prop: 'rankC', lbl: 'C', id: 'key_c' };
            else pickedKey = { prop: 'rankB', lbl: 'B', id: 'key_b' };
        }
        p.dungeonKeys[pickedKey.prop] = (p.dungeonKeys[pickedKey.prop] || 0) + 1;
        saveData();
        let kIcon = getIconFor({ id: pickedKey.id, rank: pickedKey.lbl });
        systemNotify(`${kIcon} ¡HALLAZGO RARO DE PORTAL! En lugar de chatarra, encontraste +1 Llave de Portal Rango ${pickedKey.lbl}.`, "gold");
        return;
    }

    let pool = guaranteedHighRank ? lootDB.filter(x => x.rank === 'A' || x.rank === 'S' || x.rank === 'SS') : lootDB;
    let drop = pool[Math.floor(Math.random() * pool.length)];
    if (!drop) return;

    if (drop.it && typeof shopDB !== 'undefined') {
        let shopItem = shopDB.find(x => x.id === drop.it);
        if (shopItem) {
            p.inventory.push({...shopItem, type: 'item'});
            systemNotify(`Botín Legendario obtenido: ${shopItem.title}`, "gold");
            return;
        }
    }

    p.inventory.push({
        id: "loot_" + Date.now() + "_" + Math.floor(Math.random() * 999),
        title: drop.t,
        desc: drop.d,
        rank: drop.rank || "E",
        icon: drop.icon || "💎",
        sellGold: drop.g || 10,
        type: "loot"
    });
    systemNotify(`Botín extraído: ${drop.t} (+${drop.g} G)`, "gold");
}

function exportData() {
    saveData();
    const dataStr = JSON.stringify(p, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cazador_Alma_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    systemNotify("Alma extraída con éxito.", "gold");
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData && importedData.hasOwnProperty('level') && importedData.hasOwnProperty('hp')) {
                if (confirm("ADVERTENCIA: Inyectar un alma sobrescribirá todo tu progreso actual. ¿Continuar?")) {
                    p = importedData; saveData();
                    systemNotify("Alma inyectada. Reiniciando Sistema...", "gold");
                    setTimeout(() => { window.location.reload(); }, 1500);
                }
            } else { systemNotify("Archivo corrupto.", "danger"); }
        } catch (error) { systemNotify("Formato irreconocible.", "danger"); }
        event.target.value = '';
    };
    reader.readAsText(file);
}

function applyEquipmentStats(item, direction = 1) {
    if (!item || !item.stats || !p.stats) return;
    if (item.stats.str) p.stats.str = Math.max(1, +(p.stats.str + (item.stats.str * direction)).toFixed(2));
    if (item.stats.int) p.stats.int = Math.max(1, +(p.stats.int + (item.stats.int * direction)).toFixed(2));
    if (item.stats.agi) p.stats.agi = Math.max(1, +(p.stats.agi + (item.stats.agi * direction)).toFixed(2));
}

function resolveEquipmentSlot(item) {
    if (!item) return 'ring';
    if (typeof shopDB !== 'undefined') {
        let dbMatch = shopDB.find(x => x.id === item.id);
        if (dbMatch && SEVEN_EQUIP_SLOTS.includes(dbMatch.slot)) return dbMatch.slot;
    }
    if (SEVEN_EQUIP_SLOTS.includes(item.slot)) return item.slot;
    if (item.slot === 'armor') return 'chest';
    return 'necklace';
}

function equipItem(idx) {
    if (!p.inventory || !p.inventory[idx]) return;
    ensureSevenSlotEquipment();
    let item = p.inventory[idx];
    let slotType = resolveEquipmentSlot(item);
    item.slot = slotType;

    if (p.equipment[slotType]) {
        applyEquipmentStats(p.equipment[slotType], -1);
        p.inventory.push(p.equipment[slotType]);
    }

    p.equipment[slotType] = item;
    applyEquipmentStats(item, 1);
    p.inventory.splice(idx, 1);
    
    if (item.id === 'eq_w_kargalgan' && p.shadowArmy && p.shadowArmy.tusk) {
        p.shadowArmy.tusk.unlocked = true;
    }

    let newMaxHP = calculateHunterMaxHP();
    if (!p.magmaOverheal && p.hp > newMaxHP) {
        p.hp = newMaxHP;
    }

    window._lastEquipHash = null;
    saveData();
    updateEquipmentUI();
    renderInventory();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderMiniArenaUnits === "function") renderMiniArenaUnits();
    if (typeof updateHUD === "function") updateHUD();

    let relicMeta = getRelicInfo(item.id);
    let poseMsg = relicMeta && relicMeta.pose ? ` | Pose: [${relicMeta.pose}]` : "";
    systemNotify(`${getIconFor(item)} Reliquia equipada: ${item.title}${poseMsg}`, "gold");
}

function unequipItem(slotType) {
    ensureSevenSlotEquipment();
    if (!p.equipment || !p.equipment[slotType]) return;
    
    let item = p.equipment[slotType];
    applyEquipmentStats(item, -1);
    p.inventory.push(item);
    p.equipment[slotType] = null;

    let newMaxHP = calculateHunterMaxHP();
    if (!p.magmaOverheal && p.hp > newMaxHP) {
        p.hp = newMaxHP;
    }
    
    window._lastEquipHash = null;
    saveData();
    updateEquipmentUI();
    renderInventory();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderMiniArenaUnits === "function") renderMiniArenaUnits();
    if (typeof updateHUD === "function") updateHUD();
    systemNotify(`${item.title} devuelto a la bolsa.`, "info");
}

// Maniquí Anatómico Holográfico Fiel al Anime (Temporada 2)
function getCentralCoreSVG() {
    return `
    <svg viewBox="0 0 110 260" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#e0f2fe" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="rgba(14,165,233,0.1)">
            <!-- Cabeza y Cuello -->
            <ellipse cx="55" cy="24" rx="11" ry="14"/>
            <path d="M50 37 L50 44 L60 44 L60 37"/>
            <!-- Torso Superior y Pecho Segmentado -->
            <polygon points="34,46 76,46 72,82 55,88 38,82"/>
            <line x1="55" y1="46" x2="55" y2="88" stroke="rgba(125,211,252,0.6)"/>
            <path d="M38 62 Q55 68 72 62" stroke="rgba(125,211,252,0.6)"/>
            <!-- Abdomen y Cintura -->
            <polygon points="40,84 70,84 66,112 55,118 44,112"/>
            <polygon points="38,114 72,114 68,130 55,136 42,130"/>
            <!-- Hombros y Brazos Articulados -->
            <circle cx="31" cy="52" r="5"/>
            <circle cx="79" cy="52" r="5"/>
            <path d="M27 57 L20 86 L26 88 L33 60 Z"/>
            <path d="M83 57 L90 86 L84 88 L77 60 Z"/>
            <circle cx="22" cy="90" r="3.5"/>
            <circle cx="88" cy="90" r="3.5"/>
            <path d="M19 94 L12 122 L18 124 L25 96 Z"/>
            <path d="M91 94 L98 122 L92 124 L85 96 Z"/>
            <!-- Manos -->
            <polygon points="11,124 18,125 15,138 8,134"/>
            <polygon points="99,124 92,125 95,138 102,134"/>
            <!-- Piernas Superiores (Muslos) -->
            <path d="M40 132 L34 182 L44 184 L52 136 Z"/>
            <path d="M70 132 L76 182 L66 184 L58 136 Z"/>
            <!-- Rodillas -->
            <circle cx="39" cy="187" r="4.5"/>
            <circle cx="71" cy="187" r="4.5"/>
            <!-- Espinillas y Botas -->
            <path d="M35 192 L32 234 L40 234 L43 192 Z"/>
            <path d="M75 192 L78 234 L70 234 L67 192 Z"/>
            <polygon points="31,235 41,235 43,248 27,248"/>
            <polygon points="79,235 69,235 67,248 83,248"/>
        </g>
    </svg>`;
}

function getRelicGreenStatText(item) {
    if (!item) return `<span style="color:#64748b;">[VACÍO]</span>`;
    let buffs = [];
    if (item.id === 'eq_h_crimson') buffs.push('Daño físico -15%');
    if (item.id === 'eq_a1') buffs.push('Daño físico -7%');
    if (item.id === 'eq_g_high') buffs.push('Daño físico -3%');
    if (item.id === 'eq_g_low') buffs.push('Daño físico -1%');
    if (item.id === 'eq_r_mage') buffs.push('Daño mágico +15%');
    if (item.stats) {
        if (item.stats.str) buffs.push(`FUE +${Math.round(item.stats.str * 20)}`);
        if (item.stats.int) buffs.push(`INT +${Math.round(item.stats.int * 20)}`);
        if (item.stats.agi) buffs.push(`AGI +${Math.round(item.stats.agi * 20)}`);
    }
    return buffs.length > 0 ? buffs.slice(0, 2).join('<br>') : 'ACTIVO';
}

function updateEquipmentUI() {
    let equipGrid = document.querySelector('#tab-inventory .equipment-grid');
    if (!equipGrid) return;
    equipGrid.classList.add('sl-anatomy-active');
    ensureSevenSlotEquipment();

    let eq = p.equipment;
    let equipHash = SEVEN_EQUIP_SLOTS.map(s => eq[s] ? eq[s].id : '').join('|');

    if (window._lastEquipHash === equipHash && document.getElementById('hunter-equip-showcase')) {
        return;
    }
    window._lastEquipHash = equipHash;

    let showcaseEl = document.getElementById('hunter-equip-showcase');
    if (!showcaseEl) {
        showcaseEl = document.createElement('div');
        showcaseEl.id = 'hunter-equip-showcase';
        equipGrid.parentNode.insertBefore(showcaseEl, equipGrid.nextSibling);
    }

    const emptySvgs = {
        head:     `<svg viewBox="0 0 64 64" class="sl-holo-glyph" stroke="#64748b" stroke-width="2" fill="none"><path d="M18 28 C18 10 46 10 46 28 L44 48 L32 54 L20 48 Z"/></svg>`,
        chest:    `<svg viewBox="0 0 64 64" class="sl-holo-glyph" stroke="#64748b" stroke-width="2" fill="none"><path d="M16 14 L48 14 L46 36 L32 52 L18 36 Z"/></svg>`,
        gloves:   `<svg viewBox="0 0 64 64" class="sl-holo-glyph" stroke="#64748b" stroke-width="2" fill="none"><path d="M18 42 L28 14 L46 20 L38 48 Z"/></svg>`,
        necklace: `<svg viewBox="0 0 64 64" class="sl-holo-glyph" stroke="#64748b" stroke-width="2" fill="none"><path d="M16 18 Q32 34 48 18"/><polygon points="32,28 38,44 26,44"/></svg>`,
        weapon:   `<svg viewBox="0 0 64 64" class="sl-holo-glyph" stroke="#64748b" stroke-width="2" fill="none"><path d="M18 46 L46 18 M28 18 L46 18 L46 36"/></svg>`,
        ring:     `<svg viewBox="0 0 64 64" class="sl-holo-glyph" stroke="#64748b" stroke-width="2" fill="none"><circle cx="32" cy="36" r="14"/><polygon points="32,12 37,20 27,20"/></svg>`,
        boots:    `<svg viewBox="0 0 64 64" class="sl-holo-glyph" stroke="#64748b" stroke-width="2" fill="none"><path d="M22 12 L38 14 L34 38 L48 44 L46 54 L18 50 Z"/></svg>`
    };

    const renderSlotNode = (slotKey, label, isRight = false) => {
        let it = eq[slotKey];
        let ic = it ? getIconFor(it) : emptySvgs[slotKey];
        return `
        <div class="sl-anatomy-node ${isRight ? 'right-node' : ''}" onclick="unequipItem('${slotKey}')">
            <div class="sl-node-box ${it ? '' : 'empty-node'}">${ic}</div>
            <div class="sl-node-meta">
                <span class="sl-node-slot-lbl">${label}</span>
                <span class="sl-node-name">${it ? it.title : 'Sin equipar'}</span>
                <span class="sl-node-stat-green">${getRelicGreenStatText(it)}</span>
            </div>
        </div>`;
    };

    let activeRelicLines = SEVEN_EQUIP_SLOTS
        .filter(s => eq[s] && getRelicInfo(eq[s].id))
        .map(s => `<div>• <b style="color:#fff;">${eq[s].title}:</b> ${getRelicInfo(eq[s].id).passive}</div>`)
        .join('');

    let sets = getActiveSetBonuses();
    let setsHtml = sets.map(s => `<div style="margin-top:6px; padding:5px 8px; background:rgba(14,165,233,0.14); border:1px solid #38bdf8; color:#e0f2fe; font-size:0.78em;"><b>${s.name}:</b> ${s.desc}</div>`).join('');

    showcaseEl.className = 'sl-equip-anatomy-frame';
    showcaseEl.innerHTML = `
        <div class="sl-mech-rail top"></div>
        <div class="sl-equip-anatomy-window">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; position:relative; z-index:3;">
                <div class="sl-equip-tag-header">EQUIPO</div>
                <div style="font-family:'Share Tech Mono', monospace; font-size:0.68em; color:#7dd3fc;">7 RANURAS ACTIVAS</div>
            </div>

            <div class="sl-anatomy-stage">
                <svg class="sl-anatomy-lines-svg" viewBox="0 0 360 270" preserveAspectRatio="none">
                    <!-- 3 Líneas Izquierdas: Casco -> Cabeza, Pechera -> Torso, Guantelete -> Brazo Izq -->
                    <polyline points="82,42 138,42 172,28" fill="none" stroke="rgba(186,230,253,0.5)" stroke-width="1"/>
                    <polyline points="82,135 138,135 168,78" fill="none" stroke="rgba(186,230,253,0.5)" stroke-width="1"/>
                    <polyline points="82,228 135,228 158,125" fill="none" stroke="rgba(186,230,253,0.5)" stroke-width="1"/>
                    <!-- 4 Líneas Derechas: Collar -> Cuello, Arma -> Mano Der, Anillo -> Dedos, Botas -> Pies -->
                    <polyline points="278,30 225,30 188,44" fill="none" stroke="rgba(186,230,253,0.5)" stroke-width="1"/>
                    <polyline points="278,98 228,98 202,118" fill="none" stroke="rgba(186,230,253,0.5)" stroke-width="1"/>
                    <polyline points="278,168 228,168 204,136" fill="none" stroke="rgba(186,230,253,0.5)" stroke-width="1"/>
                    <polyline points="278,236 225,236 196,236" fill="none" stroke="rgba(186,230,253,0.5)" stroke-width="1"/>
                </svg>

                <!-- Columna Izquierda: 3 Ranuras (Casco, Pechera, Guantelete) -->
                <div class="sl-anatomy-col">
                    ${renderSlotNode('head', 'CASCO', false)}
                    ${renderSlotNode('chest', 'PECHERA', false)}
                    ${renderSlotNode('gloves', 'GUANTELETE', false)}
                </div>

                <!-- Centro: Silueta Anatómica Holográfica del Anime -->
                <div class="sl-anatomy-body-center">
                    ${getCentralCoreSVG()}
                </div>

                <!-- Columna Derecha: 4 Ranuras (Collar, Arma, Anillo, Botas) -->
                <div class="sl-anatomy-col">
                    ${renderSlotNode('necklace', 'COLLAR', true)}
                    ${renderSlotNode('weapon', 'ARMA', true)}
                    ${renderSlotNode('ring', 'ANILLO', true)}
                    ${renderSlotNode('boots', 'BOTAS', true)}
                </div>
            </div>

            ${(activeRelicLines || setsHtml) ? `
            <div style="border-top:1px solid rgba(147,197,253,0.25); margin-top:8px; padding-top:8px; font-size:0.75em; color:#94a3b8; line-height:1.4; position:relative; z-index:2;">
                ${activeRelicLines}
                ${setsHtml}
            </div>` : ''}
        </div>
        <div class="sl-mech-rail bottom"></div>
    `;
}

function formatItemInspectorText(item) {
    let extraStats = "";
    if (item.stats) {
        let parts = [];
        if (item.stats.str) parts.push(`+${item.stats.str} STR`);
        if (item.stats.int) parts.push(`+${item.stats.int} INT`);
        if (item.stats.agi) parts.push(`+${item.stats.agi} AGI`);
        extraStats = `\n\nAtributos: ${parts.join(' | ')}`;
    }
    let relicMeta = getRelicInfo(item.id);
    let relicText = relicMeta ? `\n\nEfecto Único: ${relicMeta.passive}` : "";
    return `[Rango ${item.rank || 'A'}] ${item.desc || ''}${extraStats}${relicText}`;
} 
