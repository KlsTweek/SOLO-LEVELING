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
    "eq_w_razor":        { pose: "Asesino Invertido",       passive: "Desgarro Lycan: Cada ataque directo al Jefe le causa -5 HP extra por sangrado." },
    "eq_w_iron_mace":    { pose: "Berserker Colosal",       passive: "Rompecráneos: Tus ataques directos al Jefe tienen 25% de probabilidad de aturdirlo 2 segundos." },
    "eq_w_arachnid":     { pose: "Asesino Invertido",       passive: "Filo Ácido: Reduce la defensa del Jefe aumentando el daño de tus sombras un +15%." },
    "eq_w_bow":          { pose: "Francotirador Fantasma",  passive: "Disparo Lejano: Atacas con flechas de maná desde lejos y ganas +12% de Evasión contra Jefes." },
    "eq_w1":             { pose: "Asesino Kasaka",          passive: "Veneno y Parálisis de Kasaka: Retrasa los ataques del Jefe y le drena -10 HP cada turno." },
    "eq_w_killer":       { pose: "Asesino Carmesí",         passive: "Perforador de Placas: Tus ataques directos hacen el DOBLE de daño (x2) contra Jefes Rango B, A y S." },
    "eq_w_halberd":      { pose: "Lancero Imperial",        passive: "Alcance de Caballería: Si Igris o Tank están activos, sus ataques en choque hacen +35% de daño." },
    "eq_w_baruka":       { pose: "Tormenta Hyakki",         passive: "Viento Élfico: Ralentiza un 20% la aguja del Corte Dimensional y otorga +18% de Evasión." },
    "eq_w_kargalgan":    { pose: "Canalizador Arcano",      passive: "Amplificador de Kargalgan: Duplica (x2) el poder de Tusk y reduce un 30% el costo de sus hechizos." },
    "eq_w_vulcan_club":  { pose: "Berserker Volcánico",     passive: "Impacto de Magma: Cada golpe tuyo sacude la mazmorra quemando -35 HP adicionales al Jefe." },
    "eq_w_scythe":       { pose: "Segador Abisal",          passive: "Cosecha de Almas: Cada misión o fase sellada te cura +8 HP y recarga +80 MP adicionales." },
    "eq_w_demon_daggers":{ pose: "Relámpago Gemelo",        passive: "Velocidad de Baran: Golpeas dos veces por turno en la arena y cada golpe recarga +20 MP." },
    "eq_w_demon_sword":  { pose: "Esgrimista del Trueno",   passive: "Tormenta de Llamas Blancas: Cada 8s cae un rayo automático en la mazmorra que daña al Jefe." },
    "eq_w_kamish":       { pose: "Calamidad de Kamish",     passive: "Ira del Dragón: Todo golpe en zona roja cuenta como Crítico Perfecto y reduce 30% la vida inicial de los Jefes." },

    // --- 14 ARMADURAS ---
    "eq_a_leather":      { silhouette: "Cazador Ligero",    passive: "Cuero Curtido: Reduce en -2 HP cualquier daño por fallo en el Corte Dimensional." },
    "eq_a_boots_e":      { silhouette: "Corredor Táctico",  passive: "Paso Firme: Reduce en -3 SP el costo de iniciar cualquier misión física o de limpieza." },
    "eq_a_serpento":     { silhouette: "Motociclista Blindado", passive: "Rey de Los Chorros: Las misiones de Tráfico cuestan 50% menos SP y pagan +15 G extra." },
    "eq_a_helm_d":       { silhouette: "Vanguardia de Acero", passive: "Cráneo Blindado: Inmune al daño de las trampas de techo y bloquea -5 HP de daño de Jefes." },
    "eq_a_gloves_c":     { silhouette: "Cazador Escamado",  passive: "Agarre de Serpiente: Inmune al veneno de pantano (-0 HP en biomas tóxicos) y +10% precisión." },
    "eq_a_assassin":     { silhouette: "Espectro de Sigilo", passive: "Camuflaje de Taeshik: +20% de Evasión (Dodge) y los primeros 3 min de mazmorra no sufres daño ambiental." },
    "eq_a_mage_b":       { silhouette: "Túnica Arcana",     passive: "Tejido de Maná: Regenera +6 MP por minuto de forma pasiva para sostener a tus sombras." },
    "eq_a1":             { silhouette: "Armadura de Igris", passive: "Pacto del Caballero Rojo: Igris consume 0 MP/min mientras lleves esta pechera y su activa cuesta -150 MP." },
    "eq_a_high_orc":     { silhouette: "Coloso Alto Orco",  passive: "Sed de Sangre Orca: Aumenta tu HP Máximo en +40 HP adicionales y +25% daño físico." },
    "eq_a_valkyrie":     { silhouette: "Cazador Alado",     passive: "Velocidad Supersónica: Los relojes de las fases de mazmorra corren un 12% más rápido a tu favor." },
    "eq_a_archlich":     { silhouette: "Arquimago Abisal",  passive: "Dominio de la Muerte: Reduce en un 35% el drenaje de MP por minuto de todos tus Comandantes." },
    "eq_a_giant":        { silhouette: "Titán de Legia",    passive: "Coraza Nacional: Reduce a la mitad (50%) todo daño recibido en Choques de Jefe." },
    "eq_a_beru":         { silhouette: "Coraza Rey Hormiga",passive: "Regeneración de Quitina: Despliega alas reales, te cura +3 HP/min en mazmorra y da +22% Evasión." },
    "eq_a_ashborn":      { silhouette: "Monarca Sombrío",   passive: "Trono de Ashborn: -50% consumo de MP de sombras y activa Armadura de Maná (el daño letal consume MP en vez de matarte)." },

    // --- 10 ACCESORIOS ---
    "eq_acc_copper":     { aura: "Anillo Mental",           passive: "Mente Clara: Las sesiones en la Cámara de Focus otorgan +25% más de EXP y +50 MP." },
    "eq_acc_wolf":       { aura: "Instinto Lupino",         passive: "Cazador de Manada: +10% de Oro en todas las incursiones y +8% de Evasión." },
    "eq_acc_silver":     { aura: "Sello Oficial",           passive: "Autoridad de la Asociación: Descuento implícito (+10 G devueltos al sellar misiones principales)." },
    "eq_acc_cerberus":   { aura: "Llamas del Infierno",     passive: "Furia de Cerbero: Inmune al desgaste de SP en biomas de fuego y +40% de daño cuando tienes menos de 50 HP." },
    "eq_acc_gate":       { aura: "Runas de Cartenon",       passive: "Sobreviviente del Templo: Reduce a la mitad la pérdida de HP al huir o fallar un sello." },
    "eq_acc_metus":      { aura: "Necromancia Pura",        passive: "Voz de Metus: Tus soldados y magos de infantería rinden un +50% más sin gastar cristales extra." },
    "eq_acc_kandiaru":   { aura: "Bendición del Arquitecto",passive: "Cuerpo Indestructible: Regenera +2 HP y +2 SP cada vez que completas un evento narrativo en mazmorra." },
    "eq_acc_national":   { aura: "Estrella Nacional",       passive: "Autoridad de Nivel Nacional: Aumenta en +30% el Oro y EXP de todos los Portales de Rango A, S y SSS." },
    "eq_acc_chalice":    { aura: "Reloj de los Gobernantes",passive: "Distorsión de los Gobernantes: Otorga +15 minutos de tolerancia antes de que un Jefe personal te castigue." },
    "eq_acc_black_heart":{ aura: "El Corazón Negro",        passive: "Núcleo del Monarca: Regenera +25 MP por minuto de forma pasiva (Maná Casi Infinito para tu ejército)." }
};

function getRelicInfo(itemId) {
    return RELIC_MECHANICS[itemId] || null;
}

function getActiveSetBonuses() {
    if (!p || !p.equipment) return [];
    let w = p.equipment.weapon ? p.equipment.weapon.id : "";
    let a = p.equipment.armor ? p.equipment.armor.id : "";
    let acc = p.equipment.accessory ? p.equipment.accessory.id : "";
    let sets = [];

    if ((w === "eq_w_killer" || w === "eq_w_halberd") && a === "eq_a1") {
        sets.push({ name: "⚔️ Set del Comandante Sangriento", desc: "Igris consume 0 MP/m y ataca con doble frecuencia." });
    }
    if ((w === "eq_w_demon_daggers" || w === "eq_w_demon_sword") && (a === "eq_a_archlich" || acc === "eq_acc_national")) {
        sets.push({ name: "⚡ Set del Rey Demonio Baran", desc: "Relámpagos blancos automáticos cada 10s en mazmorra." });
    }
    if (w === "eq_w_kamish" && a === "eq_a_ashborn" && acc === "eq_acc_black_heart") {
        sets.push({ name: "👑 Set Supremo: Soberano del Abismo", desc: "Inmune a rotura de ítems, +35 MP/m y daño letal absorbido por maná." });
    }
    return sets;
}

function calculateHunterMaxHP() {
    if (!p) return 100;
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
    let orcArmorBonus = (aId === "eq_a_high_orc") ? 40 : 0;
    let bearHpPerUnit = (accId === "eq_acc_metus") ? 7.5 : 5;
    let bearBonusHP = (p.infantry && p.infantry.bears) ? Math.floor(p.infantry.bears * bearHpPerUnit) : 0;
    let maxHP = p.stats ? Math.floor(100 + ((p.stats.str - 1) * 20) + bearBonusHP + orcArmorBonus) : (100 + bearBonusHP + orcArmorBonus);
    if (p.abyssCurseUntil && Date.now() < p.abyssCurseUntil) {
        maxHP = Math.floor(maxHP * 0.5);
    }
    return maxHP;
}

/* ==========================================================================
   2. MOTOR DE GLIFOS HOLOGRÁFICOS SVG (1 DISEÑO ÚNICO POR CADA ÍTEM)
   ========================================================================== */
const UNIQUE_ITEM_SVGS = {
    // --- CONSUMIBLES (36 DISEÑOS ÚNICOS) ---
   "p_extra_chorros": `<polygon points="10,48 26,18 38,34 46,22 56,48" F1 S1/><path d="M22 56 L30 34 L34 34 L42 56" S2/><line x1="32" y1="38" x2="32" y2="54" S1 stroke-dasharray="3 3"/>`,
"p_high_mana_ore": `<polygon points="32,6 48,18 42,54 22,54 16,18" F1 S1/><polyline points="32,6 28,30 42,54" S2/><polyline points="16,18 28,30 48,18" S2/><circle cx="30" cy="28" r="3" fill="#fff"/>`,
    "p_stealth_rune": `<polygon points="32,8 52,22 44,52 20,52 12,22" F1 S1 stroke-dasharray="4 3"/><path d="M22 28 Q32 20 42 28 M18 38 L46 38" S2/>`,
    "p_red_hearthstone": `<polygon points="32,6 50,24 32,58 14,24" F1 S1/><circle cx="32" cy="26" r="6" fill="#fff" S2/><path d="M22 24 L32 12 L42 24" S2/>`,
    "p_lycan_bandage": `<rect x="14" y="22" width="36" height="20" rx="4" transform="rotate(-25 32 32)" F1 S1/><path d="M26 26 L38 38 M38 26 L26 38" S2/>`,
    "p_white_tiger_pass": `<polygon points="16,14 26,8 32,14 38,8 48,14 52,32 32,54 12,32" F1 S1/><polygon points="22,24 28,28 24,32" fill="#fff"/><polygon points="42,24 36,28 40,32" fill="#fff"/><path d="M26 40 L32 36 L38 40" S2/>`,
    "c_mercy": `<polygon points="32,10 52,24 45,50 19,50 12,24" F1 S1/><path d="M32 10 L32 50 M12 24 L52 24 M19 50 L32 32 L45 50" S2/><ellipse cx="32" cy="16" rx="20" ry="6" S2/>`,
    "c_magma_heart": `<path d="M32 54 L14 34 C8 24 14 12 24 14 C28 15 32 20 32 20 C32 20 36 15 40 14 C50 12 56 24 50 34 Z" F1 S1/><path d="M22 10 L26 4 L32 12 L38 4 L42 10 M24 28 L32 36 L40 26" S2/>`,
    "c_zero_serum": `<rect x="22" y="12" width="20" height="40" rx="4" F1 S1/><path d="M26 6 L38 6 M32 6 L32 12 M32 20 L32 44 M24 28 L40 36 M40 28 L24 36" S2/>`,
    "c_void_blood": `<path d="M20 12 L44 12 L38 34 L46 52 L18 52 L26 34 Z" F1 S1/><circle cx="32" cy="24" r="5" S2/><path d="M22 44 Q32 38 42 44" S2/>`,
    "c_hourglass": `<line x1="16" y1="10" x2="48" y2="10" S1/><line x1="16" y1="54" x2="48" y2="54" S1/><polygon points="20,10 44,10 32,32" F1 S1/><polygon points="32,32 44,54 20,54" F1 S1/><circle cx="32" cy="44" r="3" fill="#fff"/>`,
    "c_star_drop": `<polygon points="32,6 37,22 54,22 40,32 45,48 32,38 19,48 24,32 10,22 27,22" F1 S1/><path d="M12 52 L24 42 M8 44 L18 36" S2/>`,
    "c1": `<path d="M26 10 L38 10 M29 10 L29 20 L16 42 C13 48 17 54 24 54 L40 54 C47 54 51 48 48 42 L35 20 L35 10" F1 S1/><path d="M32 30 C27 37 26 42 32 46 C38 42 37 37 32 30 Z" S2/>`,
    "c_hp_mid": `<path d="M18 12 L46 12 L40 34 C38 40 26 40 24 34 Z" F1 S1/><path d="M32 38 L32 52 M22 52 L42 52 M21 22 Q32 28 43 22" S2/>`,
    "c_med": `<path d="M18 36 L46 36 L40 52 L24 52 Z" F1 S1/><path d="M24 30 Q20 20 28 12 M32 28 Q36 18 30 8 M40 30 Q44 20 38 12" S2/>`,
    "c2": `<polygon points="36,6 16,34 31,34 26,58 48,28 33,28" F1 S1/><circle cx="32" cy="32" r="22" S2 stroke-dasharray="6 4"/>`,
    "c_sp_pure": `<rect x="20" y="14" width="24" height="40" rx="3" F1 S1/><rect x="26" y="8" width="12" height="6" S1/><path d="M25 24 L39 24 M25 34 L39 34 M25 44 L39 44" S2/>`,
    "c_mp_pot": `<path d="M32 8 C18 26 14 36 18 46 C22 54 42 54 46 46 C50 36 46 26 32 8 Z" F1 S1/><polygon points="32,24 38,36 32,46 26,36" S2/>`,
    "c3": `<path d="M32 10 L32 54 M20 54 L44 54 M14 22 L50 22" S1/><polygon points="14,22 8,36 20,36" F1 S2/><polygon points="50,22 44,36 56,36" F1 S2/>`,
    "c_blood_pact": `<path d="M32 52 L14 34 C8 24 14 12 24 14 C28 15 32 20 32 20 C32 20 36 15 40 14 C50 12 56 24 50 34 Z" F1 S1/><polyline points="10,32 22,32 27,20 34,44 39,28 43,32 54,32" S2/>`,
    "c_antidote": `<g transform="rotate(25 32 32)"><rect x="25" y="8" width="14" height="46" rx="7" F1 S1/><line x1="22" y1="14" x2="42" y2="14" S1/><circle cx="32" cy="40" r="2.5" fill="#fff"/><circle cx="30" cy="30" r="2" S2/></g>`,
    "c4": `<g transform="rotate(-35 32 32)"><rect x="21" y="10" width="22" height="44" rx="11" F1 S1/><line x1="21" y1="32" x2="43" y2="32" S1/><path d="M32 17 L32 25 M28 21 L36 21" S2/></g>`,
    "c6": `<path d="M14 24 L42 24 L38 46 C37 50 19 50 18 46 Z" F1 S1/><path d="M42 28 C50 28 50 40 40 40 M10 52 L46 52 M24 18 Q24 10 28 10 M32 18 Q32 10 36 10" S2/>`,
    "c5": `<circle cx="32" cy="28" r="18" F1 S1/><path d="M20 52 L44 52 L38 44 L26 44 Z" F1 S1/><path d="M26 28 C26 20 38 20 38 28 C38 34 32 34 32 40" S2/>`,
    "c_rc_cells": `<path d="M20 10 C44 22 20 42 44 54 M44 10 C20 22 44 42 20 54" S1/><path d="M25 18 L39 18 M23 32 L41 32 M25 46 L39 46" S2/>`,
    "c_wisteria": `<circle cx="32" cy="32" r="5" fill="#fff"/><path d="M32 8 C38 16 38 24 32 27 C26 24 26 16 32 8 Z M54 24 C46 30 38 30 35 27 C38 21 46 19 54 24 Z M46 50 C38 44 34 38 35 33 C41 34 46 42 46 50 Z M18 50 C18 42 23 34 29 33 C30 38 26 44 18 50 Z M10 24 C18 19 26 21 29 27 C26 30 18 30 10 24 Z" F1 S1/>`,
    "c_kandiaru_eye": `<polygon points="32,8 56,50 8,50" F1 S1/><path d="M16 36 Q32 22 48 36 Q32 50 16 36 Z" S2/><circle cx="32" cy="36" r="4" fill="#fff"/>`,
    "c_phoenix": `<path d="M16 54 C20 34 32 16 50 8 C48 26 36 42 16 54 Z" F1 S1/><path d="M16 54 L46 12 M28 38 L40 36 M34 26 L46 24" S2/>`,
    "c_ambrosia": `<polygon points="24,14 40,14 48,28 40,52 24,52 16,28" F1 S1/><path d="M20 8 L26 14 L32 8 L38 14 L44 8 M18 30 L46 30" S2/>`,
    "c7": `<path d="M24 14 L40 14 L36 26 L46 44 C48 50 44 54 32 54 C20 54 16 50 18 44 L28 26 Z" F1 S1/><path d="M10 26 Q20 18 28 26 M54 26 Q44 18 36 26 M32 34 L32 46 M26 40 L38 40" S2/>`,
    "c_posture": `<path d="M32 8 L32 56" S2/><rect x="24" y="10" width="16" height="6" rx="2" F1 S1/><rect x="22" y="21" width="20" height="6" rx="2" F1 S1/><rect x="24" y="32" width="16" height="6" rx="2" F1 S1/><rect x="26" y="43" width="12" height="6" rx="2" F1 S1/>`,
    "c_breathing": `<path d="M32 10 L32 28 M32 22 L22 28 M32 22 L42 28" S2/><path d="M28 20 C14 20 10 36 14 48 C18 54 28 50 28 42 Z M36 20 C50 20 54 36 50 48 C46 54 36 50 36 42 Z" F1 S1/>`,
    "c_eye_drops": `<path d="M10 38 Q32 22 54 38 Q32 54 10 38 Z" F1 S1/><circle cx="32" cy="38" r="7" S2/><path d="M32 8 C27 16 27 20 32 23 C37 20 37 16 32 8 Z" F1 S1/>`,
    "c_cold_splash": `<path d="M8 40 Q20 28 32 40 T56 40 M8 50 Q20 38 32 50 T56 50" S1/><polygon points="22,12 26,20 22,28 18,20" F1 S2/><polygon points="42,10 47,20 42,30 37,20" F1 S2/>`,
    "c_adrenaline": `<g transform="rotate(40 32 32)"><rect x="25" y="16" width="14" height="30" F1 S1/><path d="M32 6 L32 16 M24 6 L40 6 M32 46 L32 58 M28 24 L36 30 L28 36" S2/></g>`,
    "c_sage_tea": `<path d="M16 28 L48 28 L44 48 C42 52 22 52 20 48 Z" F1 S1/><path d="M12 52 L52 52 M32 24 C32 14 42 10 42 18 C42 24 32 24 32 24 Z" S2/>`,
    "c_cartenon_candle": `<rect x="24" y="26" width="16" height="28" F1 S1/><path d="M16 54 L48 54 M32 8 C24 18 28 24 32 26 C36 24 40 18 32 8 Z" F1 S2/>`,
    "c_giant_serum": `<path d="M14 42 L14 24 C14 16 24 16 26 24 L26 30 L42 26 C48 26 50 34 46 42 L34 50 L18 50 Z" F1 S1/><path d="M32 12 L32 20 M24 14 L28 21 M40 14 L36 21" S2/>`,
    "c_baran_drop": `<path d="M18 28 C10 28 10 16 20 16 C24 10 38 10 42 16 C52 16 52 28 44 28 Z" F1 S1/><polyline points="26,28 20,42 28,42 22,56" S2/><polyline points="40,28 34,42 42,42 36,56" S2/>`,
    "c_liquid_shadow": `<path d="M32 8 C18 26 16 38 20 48 C24 54 40 54 44 48 C48 38 46 26 32 8 Z" F1 S1/><path d="M24 38 Q32 28 40 38 Q32 48 24 38 Z" S2/><circle cx="32" cy="38" r="2.5" fill="#fff"/>`,
    "c_demon_blood": `<polygon points="16,22 10,8 24,16 40,16 54,8 48,22 50,42 32,54 14,42" F1 S1/><polygon points="21,28 29,32 23,35" fill="#fff"/><polygon points="43,28 35,32 41,35" fill="#fff"/><polyline points="22,44 27,39 32,44 37,39 42,44" S2/>`,
    "c_world_fruit": `<path d="M28 54 L28 36 L20 28 M36 54 L36 36 L44 28" S1/><circle cx="32" cy="24" r="16" F1 S1/><circle cx="26" cy="22" r="3" fill="#fff"/><circle cx="38" cy="22" r="3" fill="#fff"/><circle cx="32" cy="14" r="3" fill="#fff"/>`,

    // --- PERGAMINOS Y LLAVES (36 DISEÑOS ÚNICOS) ---
    "p1": `<path d="M32 8 L32 56 M12 20 L52 44 M52 20 L12 44" S1/><polygon points="32,20 42,26 42,38 32,44 22,38 22,26" F1 S2/>`,
    "p3": `<circle cx="32" cy="32" r="20" S2 stroke-dasharray="6 4"/><path d="M32 6 L32 58 M6 32 L58 32 M14 14 L50 50 M50 14 L14 50" S1/><circle cx="32" cy="32" r="6" F1 S1/>`,
    "p_chrono": `<circle cx="32" cy="32" r="22" F1 S1/><polygon points="22,22 34,32 22,42" fill="#fff" S2/><polygon points="34,22 46,32 34,42" fill="#fff" S2/>`,
    "p6": `<path d="M20 32 C12 32 12 18 22 16 C24 8 40 8 42 16 C52 18 52 32 44 32 C46 42 38 48 32 46 C26 48 18 42 20 32 Z" F1 S1/><polyline points="34,14 26,30 36,30 28,44" S2/>`,
    "p_reroll": `<path d="M14 26 A18 18 0 0 1 48 20 M50 38 A18 18 0 0 1 16 44" S1/><polyline points="42,12 50,20 40,24" S2/><polyline points="22,52 14,44 24,40" S2/><polygon points="32,24 38,32 32,40 26,32" F1 S2/>`,
    "p_xp_boost": `<path d="M10 16 L30 20 L30 50 L10 46 Z M54 16 L34 20 L34 50 L54 46 Z" F1 S1/><path d="M16 26 L25 28 M16 34 L25 36 M39 28 L48 26 M39 36 L48 34 M32 8 L32 14" S2/>`,
    "p_bloodlust": `<path d="M6 32 Q32 10 58 32 Q32 54 6 32 Z" F1 S1/><polygon points="32,20 36,32 32,44 28,32" fill="#fff" S2/><path d="M12 16 L20 22 M52 16 L44 22 M12 48 L20 42 M52 48 L44 42" S2/>`,
    "p_shadow_exchange": `<circle cx="20" cy="20" r="6" F1 S1/><path d="M12 36 L28 36 L24 26 L16 26 Z" F1 S1/><circle cx="44" cy="44" r="6" F1 S2/><path d="M36 56 L52 56 L48 48 L40 48 Z" F1 S2/><path d="M30 18 Q44 18 44 32 M34 46 Q20 46 20 32" S2/>`,
    "p_tusk_fire": `<polygon points="12,48 20,16 34,22 48,10 44,28 54,32 40,44 46,52 26,48" F1 S1/><circle cx="34" cy="28" r="3" fill="#fff"/><path d="M44 38 L56 42 M42 44 L54 50" S2/>`,
    "p_tank_shield": `<polygon points="14,12 50,12 50,34 32,54 14,34" F1 S1/><circle cx="32" cy="34" r="6" fill="#fff"/><circle cx="23" cy="24" r="2.5" S2/><circle cx="29" cy="20" r="2.5" S2/><circle cx="35" cy="20" r="2.5" S2/><circle cx="41" cy="24" r="2.5" S2/>`,
    "p7": `<line x1="12" y1="52" x2="52" y2="12" S1/><line x1="52" y1="52" x2="12" y2="12" S1/><polygon points="20,28 24,16 32,24 40,16 44,28" F1 S2/>`,
    "p_arise": `<polygon points="32,8 40,24 38,52 26,52 24,24" F1 S1/><polygon points="18,22 24,32 24,52 14,52 14,32" F1 S2/><polygon points="46,22 50,32 50,52 40,52 40,32" F1 S2/>`,
    "p_dokkaebi": `<circle cx="32" cy="34" r="18" F1 S1/><polygon points="18,20 12,8 26,16" F1 S1/><polygon points="46,20 52,8 38,16" F1 S1/><path d="M26 28 L38 28 L30 42" S2/>`,
    "p_double_loot": `<path d="M22 48 L16 30 L22 28 L25 36 L25 16 L30 16 L30 34 L34 14 L39 14 L39 34 L44 18 L48 20 L44 48 Z" F1 S1/><ellipse cx="32" cy="32" rx="24" ry="10" S2 stroke-dasharray="5 4"/>`,
    "p_repair": `<line x1="14" y1="50" x2="46" y2="18" S1/><rect x="38" y="10" width="16" height="10" transform="rotate(45 46 15)" F1 S1/><line x1="50" y1="50" x2="18" y2="18" S2/><circle cx="16" cy="16" r="6" S2/>`,
    "key_e": `<circle cx="20" cy="32" r="8" F1 S1/><path d="M28 32 L52 32 M44 32 L44 40 M50 32 L50 40" S1/>`,
    "key_d": `<g transform="rotate(-30 32 32)"><polygon points="20,24 30,32 20,40 10,32" F1 S1/><path d="M30 32 L54 32 M42 32 L42 42 M48 32 L48 22 M54 32 L54 42" S2/></g>`,
    "key_c": `<g transform="rotate(30 32 32)"><circle cx="32" cy="16" r="8" F1 S1/><path d="M32 24 L32 54 M32 42 L42 42 M32 48 L40 48 M24 16 L40 16" S2/></g>`,
    "key_b": `<g transform="rotate(25 32 32)"><polygon points="32,6 42,16 32,24 22,16" F1 S1/><path d="M20 16 L10 12 L16 22 M44 16 L54 12 L48 22 M32 24 L32 56 M32 44 L44 44 M32 50 L42 50" S2/></g>`,
    "key_a": `<g transform="rotate(35 32 32)"><polygon points="32,6 24,18 32,14 40,18" F1 S1/><circle cx="32" cy="22" r="6" S1/><path d="M32 28 L32 56 M24 46 L40 46 M26 52 L38 52" S2/></g>`,
    "key_s": `<g transform="rotate(28 32 32)"><polygon points="32,4 22,14 32,22 42,14" F1 S1/><path d="M29 22 L35 22 L35 52 L29 56 Z" F1 S1/><path d="M35 26 L48 26 L44 32 L35 32 M35 36 L46 36 L42 42 L35 42" S2/><circle cx="32" cy="52" r="5" S1/><circle cx="32" cy="14" r="2.5" fill="#fff"/></g>`,
    "p_box_b": `<rect x="12" y="18" width="40" height="30" rx="2" F1 S1/><path d="M12 28 L52 28 M24 24 L24 32 M40 24 L40 32" S2/>`,
    "p_box_s": `<path d="M12 26 C12 14 52 14 52 26 L52 48 L12 48 Z" F1 S1/><path d="M12 28 L52 28 M28 24 L36 24 L36 34 L28 34 Z" S2/>`,
    "p_box_ss": `<polygon points="22,8 42,8 50,22 42,56 22,56 14,22" F1 S1/><path d="M32 16 L32 44 M22 26 L42 26" S2/>`,
    "p_iron_trial": `<path d="M18 32 L46 32" S1/><rect x="10" y="20" width="6" height="24" rx="2" F1 S1/><rect x="48" y="20" width="6" height="24" rx="2" F1 S1/><rect x="16" y="24" width="4" height="16" S2/><rect x="44" y="24" width="4" height="16" S2/>`,
    "p_zone_purge": `<line x1="48" y1="12" x2="26" y2="34" S1/><polygon points="26,34 12,42 22,52 34,38" F1 S1/><path d="M16 16 L20 12 M12 24 L20 24 M44 44 L50 50" S2/>`,
    "p_transmute": `<circle cx="32" cy="32" r="22" S1/><polygon points="32,10 50,42 14,42" F1 S2/><polygon points="32,54 50,22 14,22" S2/><circle cx="32" cy="32" r="4" fill="#fff"/>`,
    "p_blood_contract": `<path d="M16 10 L44 10 L44 54 L16 54 Z" F1 S1/><path d="M22 20 L38 20 M22 28 L38 28 M22 36 L34 36" S2/><circle cx="36" cy="44" r="5" fill="#fb7185" S1/>`,
    "p_focus_reset": `<circle cx="32" cy="32" r="18" S1/><path d="M32 8 L32 18 M32 46 L32 56 M8 32 L18 32 M46 32 L56 32" S2/><polygon points="34,20 24,34 32,34 30,44 40,30 32,30" fill="#fff"/>`,
    "p_kandiaru_dice": `<polygon points="32,8 52,20 52,44 32,56 12,44 12,20" F1 S1/><path d="M12 20 L32 32 L52 20 M32 32 L32 56" S2/><circle cx="32" cy="20" r="2.5" fill="#fff"/><circle cx="22" cy="36" r="2" fill="#fff"/><circle cx="42" cy="34" r="2" fill="#fff"/><circle cx="42" cy="44" r="2" fill="#fff"/>`,
    "p_bounty_hunt": `<circle cx="32" cy="30" r="14" F1 S1/><path d="M26 44 L38 44 L38 50 L26 50 Z M26 28 L29 28 M35 28 L38 28 M32 6 L32 16 M32 48 L32 58 M6 30 L18 30 M46 30 L58 30" S2/>`,
    "p_red_beacon": `<path d="M22 54 L32 28 L42 54 M25 46 L39 46" S1/><circle cx="32" cy="24" r="4" fill="#fff"/><path d="M20 16 A16 16 0 0 1 44 16 M14 10 A24 24 0 0 1 50 10" S2/>`,
    "p_hyper_time": `<circle cx="32" cy="34" r="18" F1 S1/><path d="M26 10 L38 10 M32 10 L32 16 M32 34 L32 22 M32 34 L42 38" S2/><circle cx="32" cy="34" r="23" S2 stroke-dasharray="3 5"/>`,
    "p_imperial_march": `<line x1="16" y1="8" x2="16" y2="56" S1/><polygon points="16,12 50,12 42,24 50,36 16,36" F1 S1/><polygon points="28,20 34,24 28,28" fill="#fff"/>`,
    "p_forced_arise": `<rect x="10" y="24" width="16" height="16" rx="6" F1 S1/><rect x="38" y="24" width="16" height="16" rx="6" F1 S1/><path d="M22 32 L42 32 M32 14 L28 24 M36 50 L32 40" S2/>`,
    "p_master_key": `<circle cx="32" cy="18" r="10" S1/><path d="M26 26 L16 48 M32 28 L32 54 M38 26 L48 48 M16 48 L22 50 M32 54 L38 54 M48 48 L42 50" S2/>`,

    // --- ARMERÍA: 16 ARMAS ---
    "eq_w_kim": `<g transform="rotate(35 32 32)"><polygon points="32,6 36,16 35,44 29,44 28,16" F1 S1/><path d="M20 44 L44 44 M32 44 L32 56 M28 56 L36 56" S2/></g>`,
    "eq_w_goblin": `<g transform="rotate(35 32 32)"><path d="M32 10 C38 20 38 34 34 42 L28 42 L28 18 Z" F1 S1/><path d="M24 42 L40 42 M31 42 L31 54" S2/></g>`,
    "eq_w_razor": `<g transform="rotate(35 32 32)"><path d="M32 8 C24 20 26 32 28 44 L36 44 L34 34 L38 30 L34 22 L38 18 Z" F1 S1/><path d="M24 44 L40 44 M32 44 L32 56" S2/></g>`,
    "eq_w_iron_mace": `<g transform="rotate(30 32 32)"><polygon points="32,6 42,12 42,24 32,30 22,24 22,12" F1 S1/><path d="M32 30 L32 56 M16 18 L48 18 M32 6 L32 30" S2/></g>`,
    "eq_w_arachnid": `<g transform="rotate(30 32 32)"><path d="M36 8 C20 18 22 34 30 44 L36 42 C30 32 30 20 36 8 Z" F1 S1/><circle cx="36" cy="8" r="2.5" fill="#00ffcc"/><line x1="33" y1="43" x2="33" y2="56" S2/></g>`,
    "eq_w_bow": `<path d="M22 8 C46 18 46 46 22 56" S1/><line x1="22" y1="8" x2="22" y2="56" S2/><line x1="12" y1="32" x2="52" y2="32" S1/><polygon points="54,32 45,27 45,37" fill="#fff"/>`,
    "eq_w1": `<g transform="rotate(32 32 32)"><path d="M32 6 C38 16 26 26 36 36 L34 44 L28 44 C24 32 34 22 28 12 Z" F1 S1/><path d="M22 44 L42 44 M31 44 L31 56" S2/></g>`,
    "eq_w_killer": `<g transform="rotate(32 32 32)"><polygon points="32,6 39,14 35,20 39,26 35,32 39,38 35,44 28,44 28,14" F1 S1/><path d="M20 44 L44 44 M32 44 L32 56" S2/></g>`,
    "eq_w_halberd": `<line x1="20" y1="56" x2="44" y2="8" S1/><path d="M40 14 C54 14 54 32 34 32 Z" F1 S1/><polygon points="44,8 36,16 40,20" fill="#fff"/>`,
    "eq_w_baruka": `<g transform="rotate(38 32 32)"><path d="M30 6 L35 12 L35 44 L29 44 Z" F1 S1/><path d="M24 44 L40 44 M32 44 L32 56 M20 22 Q32 16 44 22 M20 32 Q32 26 44 32" S2/></g>`,
    "eq_w_kargalgan": `<circle cx="32" cy="32" r="14" F1 S1/><ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(-25 32 32)" S2/><polygon points="32,22 36,32 32,42 28,32" fill="#fff"/>`,
    "eq_w_vulcan_club": `<g transform="rotate(30 32 32)"><path d="M24 8 L40 8 L44 36 L20 36 Z" F1 S1/><path d="M16 14 L22 14 M42 14 L48 14 M14 26 L20 26 M44 26 L50 26 M32 36 L32 56" S2/></g>`,
    "eq_w_scythe": `<line x1="20" y1="56" x2="44" y2="10" S1/><path d="M44 12 C22 4 8 16 8 32 C20 20 32 20 40 24 Z" F1 S1/>`,
    "eq_w_demon_daggers": `<path d="M14 50 L48 14 M18 38 L28 48" S1/><path d="M50 50 L16 14 M46 38 L36 48" S2/>`,
    "eq_w_demon_sword": `<g transform="rotate(35 32 32)"><polygon points="32,4 38,18 36,44 28,44 26,18" F1 S1/><polyline points="18,42 32,46 46,42" S1/><polyline points="32,8 29,22 35,28 31,42" S2/><line x1="32" y1="46" x2="32" y2="58" S1/></g>`,
    "eq_w_kamish": `<path d="M12 46 C14 24 26 12 44 8 C34 22 28 34 26 48 Z" F1 S1/><path d="M52 46 C50 24 38 12 20 8 C30 22 36 34 38 48 Z" F1 S2/>`,

    // --- ARMERÍA: 14 ARMADURAS ---
    "eq_a_leather": `<path d="M20 12 L28 18 L36 18 L44 12 L48 24 L44 52 L20 52 L16 24 Z" F1 S1/><path d="M22 14 L42 48 M42 14 L22 48" S2/>`,
    "eq_a_boots_e": `<path d="M22 12 L36 12 L36 38 L50 44 L50 52 L18 52 L18 38 Z" F1 S1/><path d="M12 22 L20 22 M10 30 L18 30" S2/>`,
    "eq_a_serpento": `<polygon points="16,14 26,10 32,20 38,10 48,14 54,28 46,52 18,52 10,28" F1 S1/><polyline points="24,20 32,32 40,20" S2/>`,
    "eq_a_helm_d": `<path d="M16 28 C16 10 48 10 48 28 L46 48 L32 54 L18 48 Z" F1 S1/><path d="M22 32 L42 32 M32 20 L32 48" S2/>`,
    "eq_a_gloves_c": `<path d="M20 26 L20 12 L26 12 L26 24 M28 24 L28 10 L34 10 L34 24 M36 24 L36 12 L42 12 L42 28 L46 22 L50 26 L42 52 L22 52 Z" F1 S1/>`,
    "eq_a_assassin": `<path d="M32 8 C16 12 12 28 14 52 L50 52 C52 28 48 12 32 8 Z" F1 S1/><polygon points="32,16 22,36 42,36" fill="#020617" S2/>`,
    "eq_a_mage_b": `<polygon points="22,12 32,16 42,12 54,26 46,32 44,26 48,54 16,54 20,26 18,32 10,26" F1 S1/><polygon points="28,16 32,48 36,16" S2/>`,
    "eq_a1": `<polygon points="16,16 32,22 48,16 54,26 44,52 32,56 20,52 10,26" F1 S1/><path d="M32 16 C22 4 12 10 10 20 M24 28 L32 34 L40 28 M24 36 L32 42 L40 36" S2/>`,
    "eq_a_high_orc": `<polygon points="8,20 24,14 32,22 40,14 56,20 50,32 44,30 44,52 20,52 20,30 14,32" F1 S1/><path d="M12,18 L8,10 M52,18 L56,10" S2/>`,
    "eq_a_valkyrie": `<path d="M26 16 L38 16 L36 52 L28 52 Z" F1 S1/><path d="M26 24 L8 12 L14 34 L26 36 M38 24 L56 12 L50 34 L38 36" F1 S2/>`,
    "eq_a_archlich": `<polygon points="18,14 32,8 46,14 52,54 12,54" F1 S1/><circle cx="32" cy="24" r="6" S2/><path d="M22 38 L42 38 M26 46 L38 46" S2/>`,
    "eq_a_giant": `<polygon points="12,14 52,14 56,28 46,54 18,54 8,28" F1 S1/><polygon points="24,24 40,24 36,44 28,44" S2/>`,
    "eq_a_beru": `<polygon points="20,16 32,12 44,16 46,52 32,56 18,52" F1 S1/><path d="M20 20 L6 10 L12 38 Z M44 20 L58 10 L52 38 Z" F1 S2/>`,
    "eq_a_ashborn": `<polygon points="14,18 32,24 50,18 56,28 46,54 32,58 18,54 8,28" F1 S1/><polygon points="22,14 26,6 32,12 38,6 42,14" fill="#fff" S2/>`,

    // --- ARMERÍA: 10 ACCESORIOS ---
    "eq_acc_copper": `<circle cx="32" cy="34" r="14" S1/><circle cx="32" cy="18" r="4" F1 S2/>`,
    "eq_acc_wolf": `<path d="M16 14 Q32 28 48 14" S2/><polygon points="26,22 38,22 32,52" F1 S1/>`,
    "eq_acc_silver": `<polygon points="32,8 50,18 50,42 32,54 14,42 14,18" F1 S1/><polygon points="32,18 40,32 32,44 24,32" S2/>`,
    "eq_acc_cerberus": `<path d="M12 20 Q32 34 52 20" S1/><polygon points="20,25 24,42 28,27" F1 S2/><polygon points="29,28 32,48 35,28" F1 S1/><polygon points="36,27 40,42 44,25" F1 S2/>`,
    "eq_acc_gate": `<circle cx="24" cy="24" r="10" S1/><circle cx="40" cy="40" r="10" S1/><line x1="30" y1="30" x2="34" y2="34" S2/>`,
    "eq_acc_metus": `<circle cx="32" cy="24" r="14" S2 stroke-dasharray="3 4"/><polygon points="32,36 40,46 32,56 24,46" F1 S1/>`,
    "eq_acc_kandiaru": `<polygon points="32,8 50,40 14,40" F1 S1/><polygon points="32,52 50,20 14,20" S2/>`,
    "eq_acc_national": `<path d="M24 8 L28 22 L36 22 L40 8" S2/><polygon points="32,18 37,30 50,30 40,38 44,52 32,43 20,52 24,38 14,30 27,30" F1 S1/>`,
    "eq_acc_chalice": `<path d="M20 12 L44 12 L38 30 L26 30 Z" F1 S1/><path d="M32 30 L32 48 M20 48 L44 48" S1/><circle cx="32" cy="22" r="18" S2 stroke-dasharray="4 4"/>`,
    "eq_acc_black_heart": `<polygon points="32,12 48,26 32,52 16,26" F1 S1/><path d="M10 18 L24 28 M54 18 L40 28 M12 44 L26 36 M52 44 L38 36" S2/><circle cx="32" cy="28" r="4" fill="#fff"/>`,

    // --- PRIVILEGIOS REALES (28 DISEÑOS ÚNICOS E INDIVIDUALES) ---
    "v_music": `<path d="M14 36 L14 28 A18 18 0 0 1 50 28 L50 36" S1/><rect x="10" y="32" width="8" height="14" rx="3" F1 S1/><rect x="46" y="32" width="8" height="14" rx="3" F1 S1/><polyline points="22,38 27,30 32,42 37,26 42,38" S2/>`,
    "v_hot_shower": `<path d="M14 12 L32 12 L42 22 L22 22 Z" F1 S1/><path d="M24 28 L20 40 M32 28 L30 44 M40 28 L38 40 M26 46 L24 54 M36 46 L34 54" S2/>`,
    "v_retro_music": `<g transform="rotate(-30 32 32)"><circle cx="26" cy="42" r="10" F1 S1/><circle cx="29" cy="30" r="7" F1 S1/><line x1="32" y1="24" x2="44" y2="8" S1/><circle cx="27" cy="38" r="2.5" S2/></g>`,
    "v1": `<rect x="20" y="10" width="24" height="44" rx="3" F1 S1/><line x1="28" y1="48" x2="36" y2="48" S2/><path d="M48 16 Q54 22 48 28 M16 16 Q10 22 16 28" S2/>`,
    "v_snack": `<path d="M18 32 L46 32 L42 52 L22 52 Z" F1 S1/><path d="M16 32 C16 18 48 18 48 32" F1 S2/><circle cx="32" cy="16" r="3" fill="#fff"/>`,
    "v_brother": `<rect x="10" y="20" width="44" height="26" rx="8" F1 S1/><path d="M22 28 L22 38 M17 33 L27 33" S2/><circle cx="42" cy="30" r="2" fill="#fff"/><circle cx="46" cy="36" r="2" fill="#fff"/>`,
    "v_tech_tinker": `<rect x="18" y="18" width="28" height="28" rx="2" F1 S1/><rect x="25" y="25" width="14" height="14" S2/><path d="M24 10 L24 18 M32 10 L32 18 M40 10 L40 18 M24 46 L24 54 M32 46 L32 54 M40 46 L40 54 M10 24 L18 24 M10 32 L18 32 M10 40 L18 40 M46 24 L54 24 M46 32 L54 32 M46 40 L54 40" S2/>`,
    "v_nap": `<path d="M36 12 A18 18 0 1 0 52 38 A14 14 0 0 1 36 12 Z" F1 S1/><polyline points="36,16 46,16 36,24 46,24" S2/>`,
    "v_fandub": `<rect x="24" y="10" width="16" height="24" rx="8" F1 S1/><path d="M18 24 A14 14 0 0 0 46 24 M32 38 L32 52 M22 52 L42 52" S2/>`,
    "v_ibispaint": `<polygon points="44,10 52,18 24,46 12,50 16,38" F1 S1/><path d="M12 50 Q28 56 48 44" S2/>`,
    "v_capcut": `<rect x="10" y="18" width="44" height="32" rx="2" F1 S1/><line x1="10" y1="26" x2="54" y2="26" S1/><polygon points="28,32 38,38 28,44" fill="#fff"/>`,
    "v_mc": `<line x1="14" y1="50" x2="46" y2="18" S1/><path d="M30 12 Q48 10 52 34" F1 S1/><line x1="20" y1="44" x2="26" y2="38" S2/>`,
    "v5": `<path d="M32 10 C16 10 10 24 14 38 C18 48 30 52 38 46 C42 42 38 36 44 34 C52 32 50 10 32 10 Z" F1 S1/><circle cx="24" cy="22" r="2.5" fill="#fff"/><circle cx="36" cy="20" r="2.5" S2/><circle cx="22" cy="34" r="2.5" S2/>`,
    "v_pepakura": `<polygon points="32,8 54,22 46,50 18,50 10,22" F1 S1/><path d="M32 8 L32 32 M10 22 L32 32 L54 22 M18 50 L32 32 L46 50" S2/>`,
    "v3": `<path d="M20 10 C16 20 18 28 18 42 C18 50 46 50 46 42 C46 28 48 20 44 10 L38 22 L26 22 Z" F1 S1/><circle cx="26" cy="34" r="3.5" fill="#fff"/><circle cx="38" cy="34" r="3.5" fill="#fff"/>`,
    "v4": `<circle cx="32" cy="32" r="20" F1 S1/><circle cx="32" cy="32" r="5" S2/><path d="M14 28 L27 30 M50 28 L37 30 M32 37 L32 52" S1/>`,
    "v_zelda": `<polygon points="32,10 42,28 22,28" F1 S1/><polygon points="22,28 32,46 12,46" F1 S1/><polygon points="42,28 52,46 32,46" F1 S1/>`,
    "v_anime": `<rect x="10" y="14" width="44" height="30" rx="2" F1 S1/><path d="M22 50 L42 50 M32 44 L32 50" S2/><polygon points="28,23 38,29 28,35" fill="#fff"/>`,
    "v_dance": `<path d="M24 22 L44 16 L44 40 M24 22 L24 44" S1/><circle cx="20" cy="44" r="5" F1 S1/><circle cx="40" cy="40" r="5" F1 S1/>`,
    "v_movie_night": `<circle cx="22" cy="26" r="10" F1 S1/><circle cx="42" cy="26" r="10" F1 S1/><rect x="16" y="36" width="32" height="14" rx="2" F1 S1/><polygon points="48,40 58,35 58,51 48,46" S2/>`,
    "v_moto_ride": `<path d="M14 36 C14 14 46 12 50 32 L46 48 L22 48 L14 40 Z" F1 S1/><polygon points="30,24 48,26 46,36 28,34" fill="#fff" S2/>`,
    "v_fastfood": `<path d="M14 28 C14 14 50 14 50 28 Z" F1 S1/><line x1="12" y1="35" x2="52" y2="35" S2/><path d="M16 42 L48 42 L44 50 L20 50 Z" F1 S1/>`,
    "v_late_wake": `<path d="M8 40 L56 40 M14 48 L50 48" S2/><path d="M18 40 A14 14 0 0 1 46 40" F1 S1/><path d="M32 14 L32 20 M16 20 L20 24 M48 20 L44 24" S2/>`,
    "v6_creator": `<polygon points="32,8 37,22 52,22 40,31 44,46 32,37 20,46 24,31 12,22 27,22" F1 S1/><circle cx="32" cy="28" r="5" fill="#fff"/>`,
    "v6": `<path d="M20 24 L44 24 L40 52 L24 52 Z" F1 S1/><path d="M20 24 C18 16 26 14 28 20 C30 12 36 12 38 20 C42 14 46 18 44 24" F1 S2/><path d="M28 24 L28 52 M36 24 L36 52" S2/>`,
    "v_streak_shield": `<path d="M14 12 L50 12 L48 34 L32 54 L16 34 Z" F1 S1/><path d="M32 18 C24 28 26 36 32 42 C38 36 40 28 32 18 Z" fill="#fff" S2/>`,
    "v_shopping": `<rect x="14" y="22" width="36" height="30" rx="2" F1 S1/><path d="M24 22 L24 16 A8 8 0 0 1 40 16 L40 22" S2/><polygon points="32,29 35,35 41,35 36,39 38,45 32,41 26,45 28,39 23,35 29,35" S2/>`,
    "v7": `<rect x="8" y="18" width="48" height="28" rx="3" F1 S1/><polygon points="22,38 25,26 32,32 39,26 42,38" fill="#fff" S2/>`,

    // --- ÍTEMS ESPECIALES DEL SISTEMA ---
    "lunch_ticket": `<circle cx="32" cy="32" r="14" F1 S1/><path d="M10 16 L10 48 M8 16 L12 16 M54 16 L54 48 M50 16 L50 28 L54 28" S2/>`,
    "work_pass": `<rect x="12" y="18" width="40" height="30" rx="3" F1 S1/><path d="M24 18 L24 12 L40 12 L40 18" S1/><polyline points="24,33 30,39 42,27" S2/>`,
    "box_start": `<polygon points="10,24 32,12 54,24 54,48 32,58 10,48" F1 S1/><path d="M10 24 L32 34 L54 24 M32 34 L32 58" S2/>`,
    "box_week": `<rect x="12" y="18" width="40" height="30" rx="2" F1 S1/><path d="M12 28 L52 28 M32 18 L32 48" S2/>`,
    "box_deluxe": `<path d="M12 26 C12 14 52 14 52 26 L52 48 L12 48 Z" F1 S1/><polygon points="32,20 37,28 32,36 27,28" fill="#fff" S2/>`
};

function getIconFor(itemOrTitle, type) {
    let id = "", slot = "", cat = "", rank = "C", t = "";
    if (typeof itemOrTitle === 'object' && itemOrTitle !== null) {
        id = (itemOrTitle.id || "").toLowerCase();
        slot = (itemOrTitle.slot || "").toLowerCase();
        cat = (itemOrTitle.cat || "").toLowerCase();
        rank = (itemOrTitle.rank || "C").toUpperCase();
        type = itemOrTitle.type || type;
        t = (itemOrTitle.title || itemOrTitle.t || "").toLowerCase();
    } else {
        t = (itemOrTitle || "").toLowerCase();
    }

    let strokeMain = "#e0f2fe", strokeAccent = "#38bdf8", fillGlow = "rgba(56, 189, 248, 0.18)";
    if (rank === "SS" || rank === "SSS" || id.includes("void") || id.includes("ashborn") || id.includes("kamish") || id.includes("black_heart")) {
        strokeMain = "#f5d0fe"; strokeAccent = "#d946ef"; fillGlow = "rgba(217, 70, 239, 0.24)";
    } else if (rank === "S" || id.includes("mercy") || id.includes("world_fruit") || id.includes("phoenix")) {
        strokeMain = "#ffffff"; strokeAccent = "#00ffcc"; fillGlow = "rgba(0, 255, 204, 0.22)";
    } else if (t.includes("sangre") || t.includes("magma") || t.includes("fuego") || t.includes("berserker") || t.includes("cáliz") || id === "c1") {
        strokeMain = "#ffe4e6"; strokeAccent = "#fb7185"; fillGlow = "rgba(244, 63, 94, 0.24)";
    }

    const baseAttr = `class="sl-holo-glyph" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"`;
    const s1 = `stroke="${strokeMain}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"`;
        const s2 = `stroke="${strokeAccent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;
    const f1 = `fill="${fillGlow}"`;

    let body = UNIQUE_ITEM_SVGS[id];
    if (!body) {
        if (slot === "weapon" || id.startsWith("eq_w")) {
            body = `<path d="M32 8 L38 14 L26 44 L20 38 Z" F1 S1/><path d="M16 42 L28 54 M22 36 L32 46" S2/>`;
        } else if (slot === "armor" || id.startsWith("eq_a")) {
            body = `<path d="M14 12 L50 12 L48 34 L32 54 L16 34 Z" F1 S1/><path d="M32 18 L32 44" S2/>`;
        } else if (slot === "accessory" || id.startsWith("eq_acc")) {
            body = `<circle cx="32" cy="38" r="14" F1 S1/><polygon points="32,8 38,20 26,20" fill="#fff" S2/>`;
        } else if (cat.includes("pergamino") || id.startsWith("p")) {
            body = `<rect x="16" y="10" width="32" height="44" rx="3" F1 S1/><path d="M22 22 L42 22 M22 30 L42 30 M22 38 L34 38" S2/>`;
        } else if (cat.includes("privilegio") || id.startsWith("v")) {
            body = `<polygon points="32,8 54,22 46,50 18,50 10,22" F1 S1/><circle cx="32" cy="30" r="5" fill="#fff"/>`;
        } else {
            body = `<path d="M24 8 L40 8 M28 8 L28 22 L16 50 L48 50 L36 22 L36 8" F1 S1/><path d="M24 38 L40 38" S2/>`;
        }
    }

    body = body.replace(/\bS1\b/g, s1).replace(/\bS2\b/g, s2).replace(/\bF1\b/g, f1);
    return `<svg ${baseAttr}>${body}</svg>`;
}
/* ==========================================================================
   3. RENDERIZADO DEL MERCADO (VISTA CUADRÍCULA / LISTA Y ANTI-DUPLICADOS)
   ========================================================================== */
let currentShopCat = 'Consumibles';
let isShopListView = false;

window.filterShop = function(cat) {
    currentShopCat = cat;
    renderShop();
};

window.toggleShopViewMode = function() {
    isShopListView = !isShopListView;
    renderShop();
};

function isRelicAlreadyOwned(itemId) {
    if (!p) return false;
    let inBag = p.inventory && p.inventory.some(x => x.id === itemId);
    let inEq = p.equipment && (
        (p.equipment.weapon && p.equipment.weapon.id === itemId) ||
        (p.equipment.armor && p.equipment.armor.id === itemId) ||
        (p.equipment.accessory && p.equipment.accessory.id === itemId)
    );
    return !!(inBag || inEq);
}

const REAL_ACTION_IDS = ["c_posture", "c_breathing", "c_eye_drops", "c_cold_splash", "c_adrenaline", "c_sage_tea", "c_cartenon_candle", "c_giant_serum", "c_baran_drop", "p_iron_trial", "p_zone_purge"];

function isRealActionDoneToday(itemId) {
    if (!p || !REAL_ACTION_IDS.includes(itemId)) return false;
    let todayKey = new Date().toDateString();
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
    let clean = item.desc.replace(/\[.*?\]/g, '').trim();
    if (clean.includes(':')) clean = clean.split(':').slice(1).join(':').trim();
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
        btnGroup.style.cssText = 'display:flex; gap:6px; align-items:center;';

        let searchBtn = document.createElement('button');
        searchBtn.id = 'btn-shop-search';
        searchBtn.className = 'btn btn-blue';
        searchBtn.style.cssText = 'padding:5px 9px; font-size:0.75em;';
        searchBtn.innerHTML = '🔍';
        searchBtn.onclick = toggleShopSearchBar;

        let toggleBtn = document.createElement('button');
        toggleBtn.id = 'btn-shop-view-mode';
        toggleBtn.className = 'btn btn-blue';
        toggleBtn.style.cssText = 'padding:5px 10px; font-size:0.72em;';
        toggleBtn.onclick = toggleShopViewMode;

        btnGroup.appendChild(searchBtn);
        btnGroup.appendChild(toggleBtn);
        shopHeader.appendChild(btnGroup);

        let searchWrap = document.createElement('div');
        searchWrap.id = 'shop-search-wrap';
        searchWrap.style.display = 'none';
        searchWrap.innerHTML = `
            <div style="display:flex; gap:6px; align-items:center;">
                <input type="text" id="shop-search-input" class="input-dark" style="margin:0; padding:10px 12px; font-size:0.95em; border-color:#38bdf8;" placeholder="🔍 Escribe clave (cm, sp, llave, gratis)..."
                    onfocus="document.body.classList.add('keyboard-search-mode')"
                    onblur="setTimeout(()=>document.body.classList.remove('keyboard-search-mode'), 180)"
                    oninput="onShopSearchInput(this.value)">
                <button class="btn btn-red" style="padding:10px 12px; font-size:0.8em;" onclick="toggleShopSearchBar()">✕</button>
            </div>
        `;
        shopHeader.parentNode.insertBefore(searchWrap, shopHeader.nextSibling);
    }

    let btnMode = document.getElementById('btn-shop-view-mode');
    if (btnMode) {
        btnMode.innerText = isShopListView ? '⊞ Vista Iconos' : '☰ Vista Lista';
    }

    shopContainer.className = isShopListView ? 'shop-list-view' : 'minecraft-grid';

    // Pre-cachear texto e icono de cada ítem 1 sola vez en la partida para búsqueda instantánea
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
                        : `<span style="color:${item.cost === 0 ? 'var(--success)' : 'var(--text-gold)'}; font-weight:700; font-family:'Share Tech Mono', monospace;">${item.cost === 0 ? '⚡ GRATIS' : '🪙 ' + costTxt}</span>`));

            htmlBuffer += `
            <div class="card rank-${item.rank}" style="padding:12px 14px; margin-bottom:8px; opacity:${(isOwned || isCoffeeLocked || isActionDone) ? '0.45' : (canBuy ? '1' : '0.65')}; filter:${isOwned ? 'grayscale(90%)' : 'none'}; cursor:pointer;" onclick="inspectShopItem('${item.id}')">
                <div style="display:flex; align-items:center; gap:12px; width:100%;">
                    <div style="font-size:1.65em; flex-shrink:0; width:36px; text-align:center;">${icon}</div>
                    <div style="flex:1; min-width:0;">
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
            filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.75)) drop-shadow(0 0 10px rgba(0, 210, 255, 0.95)) drop-shadow(0 0 22px rgba(99, 102, 241, 0.85)) !important;
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
    if (!item._cachedSvg) item._cachedSvg = getIconFor(item);
    return item._cachedSvg.replace('class="sl-holo-glyph"', 'class="ct-wireframe-svg"');
}

function formatCartenonDesc(text) {
    return (text || "")
        .replace(/(\+[0-9.%]+ [A-Z]+|100% [A-Z/]+|-[0-9]+ [A-Z]+|[0-9]+ Horas?|[0-9]+ min(?:utos)?)/gi, '<span class="ct-cyan-Runic">$1</span>')
        .replace(/(Zona de Penalización|Penalización|Maldición[^\.,]*|Cero Absoluto|Isla de Jeju|Templo de Cartenon|Cartenon|Star Stream|Abismo|Ejecución[^\.,]*|Mazmorra o Medianoche|Muerte|Castigo[^\.,]*)/gi, '<span class="ct-red-Runic">$1</span>');
}

function buildCartenonInspectorHTML(item, count = 1) {
    ensureCartenonStyles();
    if (count === 1 && item._cachedInspectorHtml) {
        return item._cachedInspectorHtml;
    }

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
        if (REAL_ACTION_IDS.includes(item.id)) {
            let todayKey = new Date().toDateString();
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

function renderInventory() {
    const invContainer = document.getElementById('inventory-container');
    if (!invContainer) return;
    
    updateEquipmentUI();

    if (!p.inventory || p.inventory.length === 0) {
        invContainer.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding: 20px;">Tu Bolsa Dimensional está vacía.</p>';
        return;
    }
    
    let grouped = getGroupedInventoryList();
    let html = `<div class="minecraft-grid">`;
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

/* ==========================================================================
   4. RENDERIZADO DE LA BOLSA DIMENSIONAL
   ========================================================================== */
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

/* ==========================================================================
   5. MOTOR DE USO DE CONSUMIBLES, PERGAMINOS Y PRIVILEGIOS REALES
   ========================================================================== */
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

    if (item.type === "box") {
        p.inventory.splice(idx, 1);
        if (item.rank === 'SS') {
            p.crystals = (p.crystals || 0) + 2;
            let ssPool = shopDB.filter(x => x.rank === 'S' || x.rank === 'SS');
            let rw = ssPool[Math.floor(Math.random() * ssPool.length)];
            if (rw) {
                p.inventory.push({...rw, type: rw.type || 'item'});
                systemNotify(`⚰️ Relicario Abisal abierto: ${rw.title} + 2 CM.`, "purple");
            }
        } else if (item.rank === 'S') {
            let sPool = ["c_mercy", "c_magma_heart", "c_void_blood", "c_hourglass", "c7", "p7", "v6"];
            let pickId = sPool[Math.floor(Math.random() * sPool.length)];
            let rw = shopDB.find(x => x.id === pickId) || shopDB[0];
            p.inventory.push({...rw, type: 'item'});
            systemNotify(`🎁 Cofre Real abierto: Obtuviste [${rw.title}].`, "gold");
        } else {
            let bPool = ["c1", "c_hp_mid", "c_med", "c2", "c3", "p1", "p3"];
            let pickId = bPool[Math.floor(Math.random() * bPool.length)];
            let rw = shopDB.find(x => x.id === pickId) || shopDB[0];
            p.inventory.push({...rw, type: 'item'});
            systemNotify(`📦 Suministros abiertos: Obtuviste [${rw.title}].`, "gold");
        }
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        renderInventory();
        return;
    }

    let now = Date.now();
    let currentDayStr = new Date().toDateString();

    // ----------------------------------------------------
    // 1. CONSUMIBLES Y BIO-SINCRONIZACIÓN (CERO ATRIBUTOS PERMANENTES)
    // ----------------------------------------------------
    if (item.id === "c_mercy") {
        p.hp = maxHP;
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
        p.hp = Math.min(maxHP, p.hp + 30);
        systemNotify("🩸 Poción de Sangre Menor consumida: +30 HP restaurados.", "success");

    } else if (item.id === "c_hp_mid") {
        if (p.sp < 10) return systemNotify("Necesitas al menos 10 SP para asimilar el Cáliz Carmesí.", "danger");
        p.sp -= 10;
        p.hp = Math.min(maxHP, p.hp + 60);
        systemNotify("🍷 Cáliz Carmesí consumido: +60 HP restaurados (-10 SP).", "success");

    } else if (item.id === "c_med") {
        p.spDiscountUntil = now + 3600000;
        systemNotify("💨 Estado Zen: Costo de SP reducido al 50% por 1 Hora.", "info");

    } else if (item.id === "c2") {
        p.sp = Math.min(100, p.sp + 55);
        p.intBlockedUntil = now + (2 * 3600000);
        systemNotify("⚡ +55 SP restaurados. Ganancia de INT bloqueada por 2H.", "stamina");

    } else if (item.id === "c_sp_pure") {
        p.sp = Math.min(100, p.sp + 60);
        systemNotify("🔋 Celda de Plasma absorbida: +60 SP limpios sin bloqueo mental.", "stamina");

    } else if (item.id === "c_mp_pot") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 400);
        systemNotify("💧 Lágrima de Maná absorbida: +400 MP.", "purple");

    } else if (item.id === "c3") {
        p.hp = Math.max(1, Math.floor(p.hp * 0.5));
        p.sp = 100;
        systemNotify("⚖️ Intercambio Equivalente: -50% HP sacrificado, SP al 100%.", "danger");

    } else if (item.id === "c_blood_pact") {
        if (p.sp < 35) return systemNotify("Necesitas al menos 35 SP para el Latido del Berserker.", "danger");
        p.sp -= 35;
        p.hp = Math.min(maxHP, p.hp + 65);
        systemNotify("🫀 Latido del Berserker: -35 SP convertidos en +65 HP.", "danger");

    } else if (item.id === "c_antidote") {
        p.sleepDebt = false;
        p.intBlockedUntil = null;
        p.hp = Math.min(maxHP, p.hp + 20);
        systemNotify("🧪 Antídoto de Kasaka: Resaca y bloqueos mentales purgados (+20 HP).", "success");

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
        if (p.hp >= 35) {
            return systemNotify("🧬 Tus células RC rechazan el mutágeno. Solo reacciona en agonía (menos de 35 HP).", "danger");
        }
        p.arcticShield = (p.arcticShield || 0) + 110;
        p.hp = Math.min(maxHP, p.hp + 40);
        systemNotify("🧬 ¡ARMADURA KAGUNE DESPLEGADA! +110 de Escudo Carmesí y +40 HP.", "danger");

    } else if (item.id === "c_wisteria") {
        p.hazardImmunityUntil = now + (2 * 3600000);
        systemNotify("🌸 Incienso de Glicinas: Inmune a veneno, fuego y presión abisal en mazmorras por 2H.", "success");

    } else if (item.id === "c_kandiaru_eye") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 850);
        p.nextSlashWiden = true;
        systemNotify("🧿 Clarividencia de Kandiaru: +850 MP y Zona Vital ampliada al máximo en tu próximo Corte.", "purple");

    } else if (item.id === "c_phoenix") {
        p.hp = Math.min(maxHP, p.hp + 60);
        p.sp = Math.min(100, p.sp + 60);
        p.phoenixFeatherActive = currentDayStr;
        systemNotify("🪶 Pluma del Fénix activa: +60 HP/SP y seguro de resurrección activado por hoy.", "gold");

    } else if (item.id === "c_ambrosia") {
        p.sp = 100;
        p.hp = Math.min(maxHP, p.hp + 40);
        p.beruSpeedUntil = now + (30 * 60000);
        systemNotify("🍯 Néctar de los Gobernantes: 100% SP, +40 HP y requisito de espera anulado por 30 minutos.", "gold");

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
        systemNotify("👁️‍🗨️ Gotas Oculares: Golpe crítico garantizado (x2 daño) en tu próximo ataque directo a Jefe.", "gold");

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
        systemNotify("🏋️ Suero de Gigante: +45 de Escudo Físico para mazmorras y +20 HP.", "gold");

    } else if (item.id === "c_baran_drop") {
        if (p.activeMissions && Object.keys(p.activeMissions).length > 0) {
            Object.keys(p.activeMissions).forEach(k => {
                p.activeMissions[k] -= (12 * 60000);
            });
            if (typeof renderRoutine === "function") renderRoutine();
            systemNotify("🌩️ Destilado de Baran: Misiones activas adelantadas 12 minutos.", "purple");
        } else {
            return systemNotify("Despliega primero una misión antes de usar el Destilado de Baran.", "danger");
        }

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

    // ----------------------------------------------------
    // 2. PERGAMINOS Y LOS 5 ÍTEMS NUEVOS DEL ANIME
    // ----------------------------------------------------
    } else if (item.id === "p1" || item.id === "p3") {
        let addMins = item.id === "p1" ? 15 : 45;
        if (p.bosses && p.bosses.length > 0) {
            p.bosses.forEach(b => {
                if (b.start) b.start += (addMins * 60000);
            });
            systemNotify(`❄️ Magia criogénica: Cronómetros de Jefes congelados por +${addMins} minutos.`, "info");
        } else {
            return systemNotify("No tienes Jefes personales activos para congelar.", "danger");
        }

    } else if (item.id === "p_stealth_rune") {
        p.hazardImmunityUntil = now + (45 * 60000);
        p.nextBossCrit = true;
        p.adrenalineDodgeUntil = now + (45 * 60000);
        systemNotify("🌫️ Habilidad [SIGILO] activada: Camuflaje total en mazmorra y golpe crítico letal preparado contra el próximo Jefe.", "purple");

    } else if (item.id === "p_red_hearthstone") {
        if (typeof activeDungeon !== 'undefined' && activeDungeon) {
            if (activeDungeon.isRedGate) {
                return systemNotify("💎 La Piedra de Retorno común se agrietó: Los Portales Rojos bloquean piedras normales (Requiere Intercambio de Sombra).", "danger");
            }
            if (typeof stopBiomeCanvas === "function") stopBiomeCanvas();
            let overlay = document.getElementById('dungeon-overlay');
            if (overlay) { overlay.style.display = 'none'; overlay.classList.remove('abyssal-focus'); }
            activeDungeon = null;
            clearInterval(raidTimer); clearInterval(validationTimer); clearInterval(clashInterval);
            p.mp = Math.min(maxMP, (p.mp || 0) + 100);
            systemNotify("💎 Piedra de Retorno activada: Saliste del calabozo sin perder HP y recuperaste +100 MP.", "info");
        } else {
            p.mp = Math.min(maxMP, (p.mp || 0) + 150);
            systemNotify("💎 Piedra de Retorno absorbida fuera de portal: +150 MP recargados.", "info");
        }

    } else if (item.id === "p_lycan_bandage") {
        p.hp = Math.min(maxHP, p.hp + 30);
        p.cryoBuffUntil = now + (30 * 60000);
        p.tankCurfewDelayDay = currentDayStr;
        systemNotify("🩹 Vendaje de Colmillo Blanco aplicado: +30 HP y hemorragia nocturna contenida.", "success");

 } else if (item.id === "p_white_tiger_pass") {
     p.whiteTigerBounty = true;
     systemNotify("🐯 Permiso del Gremio Tigre Blanco sellado: Al despejar tu próxima Mazmorra o Misión Principal recibirás +110 G limpios.", "gold");

 } else if (item.id === "p_high_mana_ore") {
     p.halfMpDrainUntil = now + (90 * 60000);
     p.mp = Math.min(maxMP, (p.mp || 0) + 150);
     systemNotify("🔷 Mineral de Maná de Alta Pureza activo: Consumo de MP/min de tus sombras reducido en -50% por 90 minutos (+150 MP).", "info");

    } else if (item.id === "p_iron_trial") {
        p.xp += 90;
        p.sp = Math.min(100, p.sp + 40);
        systemNotify("🏋️‍♂️ Misión de Castigo Físico superada: +90 XP y +40 SP por tu disciplina.", "gold");

    } else if (item.id === "p_zone_purge") {
        p.mp = Math.min(maxMP, (p.mp || 0) + 220);
        p.intBlockedUntil = null;
        systemNotify("🧹 Territorio Purificado: +220 MP y bloqueos mentales disipados.", "success");

    } else if (item.id === "p_transmute") {
        let totalLootVal = 0;
        p.inventory.forEach(inv => {
            if (inv.type === 'loot' && inv.sellGold) totalLootVal += inv.sellGold;
        });
        if (totalLootVal > 0) {
            p.inventory = p.inventory.filter(inv => !(inv.type === 'loot' && inv.sellGold));
            let bonusGold = Math.floor(totalLootVal * 1.30);
            p.gold += bonusGold;
            systemNotify(`⚗️ Chatarra transmutada: +${bonusGold} G obtenidos (con +30% de plusvalía).`, "gold");
        } else {
            return systemNotify("No tienes objetos de botín (chatarra) en tu bolsa para fundir.", "danger");
        }

    } else if (item.id === "p_blood_contract") {
        p.contractActive = currentDayStr;
        systemNotify("📜 Contrato de Sangre firmado: Completa tu Tablón hoy para ganar +280 G y +2 CM.", "purple");

    } else if (item.id === "p_focus_reset") {
        p.studyCompletedToday = false;
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("⚡ Sobrecarga de Focus: Ya puedes realizar tu segunda sesión de estudio de hoy.", "gold");

    } else if (item.id === "p_kandiaru_dice") {
        let diceRoll = Math.floor(Math.random() * 6) + 1;
        if (diceRoll === 1) {
            p.hp = Math.max(1, p.hp - 20);
            systemNotify("🎲 Dado de Kandiaru [1]: Mala suerte. -20 HP.", "danger");
        } else if (diceRoll === 2) {
            p.gold += 180;
            systemNotify("🎲 Dado de Kandiaru [2]: Destellos de oro. +180 G.", "gold");
        } else if (diceRoll === 3) {
            p.mp = Math.min(maxMP, (p.mp || 0) + 400);
            systemNotify("🎲 Dado de Kandiaru [3]: Oleada arcana. +400 MP.", "purple");
        } else if (diceRoll === 4) {
            p.dungeonKeys.rankA = (p.dungeonKeys.rankA || 0) + 1;
            systemNotify("🎲 Dado de Kandiaru [4]: Hallazgo milagroso. +1 Llave Rango A.", "gold");
        } else if (diceRoll === 5) {
            p.crystals = (p.crystals || 0) + 2;
            systemNotify("🎲 Dado de Kandiaru [5]: Condensación real. +2 Cristales de Maná (CM).", "purple");
        } else {
            p.arcticShield = (p.arcticShield || 0) + 120;
            systemNotify("🎲 Dado de Kandiaru [6]: ¡Barrera del Arquitecto! +120 de Escudo Físico.", "gold");
        }

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
        p.starStreamNext = true;
        if (typeof rescanRadarHorizon === "function") rescanRadarHorizon();
        systemNotify("📡 Baliza Carmesí sintonizada: Radar re-escaneado y Oro bonificado en tu siguiente incursión.", "purple");

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
        if (p.activeMissions && Object.keys(p.activeMissions).length > 0) {
            Object.keys(p.activeMissions).forEach(k => {
                p.activeMissions[k] -= (25 * 60000);
            });
            systemNotify("⏩ Aceleración de Taquiones: Misiones desplegadas adelantadas 25 minutos.", "gold");
            if (typeof renderRoutine === "function") renderRoutine();
        } else {
            return systemNotify("Despliega al menos una misión antes de usar este pergamino.", "danger");
        }

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
        if (typeof activeDungeon === 'undefined' || !activeDungeon) {
            return systemNotify("👤 Solo puedes usar Intercambio de Sombra cuando estás dentro de una mazmorra.", "info");
        }
        if (typeof stopBiomeCanvas === "function") stopBiomeCanvas();
        let overlay = document.getElementById('dungeon-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            overlay.classList.remove('abyssal-focus');
        }
        let btnReturn = document.getElementById('btn-return-dungeon');
        if (btnReturn) btnReturn.remove();
        activeDungeon = null;
        clearInterval(raidTimer);
        clearInterval(validationTimer);
        clearInterval(clashInterval);
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

    } else if (item.id === "p_dokkaebi") {
        if (Math.random() <= 0.50) {
            p.gold += 320;
            systemNotify("🎰 ¡Dokkaebi sonríe! Ganaste la apuesta del escenario: +320 G.", "gold");
        } else {
            p.gold = Math.max(0, p.gold - 80);
            systemNotify("🎰 El Dokkaebi se burla de tu suerte: Perdiste -80 G.", "danger");
        }

    } else if (item.id === "p_double_loot") {
        rollLootDrop(false);
        rollLootDrop(false);
        rollLootDrop(false);
        systemNotify("🧲 Mano del Gobernante: 3 objetos extraídos del vacío a tu bolsa.", "gold");

    } else if (item.id === "p_repair") {
        if (p.history && p.history.itemsBroken > 0) p.history.itemsBroken--;
        rollLootDrop(true);
        systemNotify("🛠️ Runa de Reconstrucción: Historial reparado y reliquia superior materializada.", "gold");

    // ----------------------------------------------------
    // 3. PRIVILEGIOS REALES (NERFEADOS Y ÚNICOS, CERO STATS REGALADOS)
    // ----------------------------------------------------
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
        if (p.activeMissions && Object.keys(p.activeMissions).length > 0) {
            Object.keys(p.activeMissions).forEach(k => {
                p.activeMissions[k] -= (20 * 60000);
            });
            if (typeof renderRoutine === "function") renderRoutine();
        }
        p.mp = Math.min(maxMP, (p.mp || 0) + 120);
        systemNotify("🎞️ Corte de Montaje: Misiones activas adelantadas 20 min y +120 MP.", "gold");

    } else if (item.id === "v_mc") {
        p.sp = Math.min(100, p.sp + 25);
        rollLootDrop(false);
        rollLootDrop(false);
        systemNotify("⛏️ Mente Arquitectónica: +25 SP y 2 minerales extraídos a tu bolsa.", "gold");

    } else if (item.id === "v5") {
        p._arcPrismUntil = now + (45 * 60000);
        p.mp = Math.min(maxMP, (p.mp || 0) + 150);
        systemNotify("🎨 Pase de Creador: 45 min de Sincronización Prismática (EXP x1.5) y +150 MP.", "purple");

    } else if (item.id === "v_pepakura") {
        p.arcticShield = (p.arcticShield || 0) + 55;
        p.sp = Math.min(100, p.sp + 25);
        systemNotify("📐 Armadura Poligonal: +55 de Escudo Físico para tu próxima mazmorra y +25 SP.", "info");

    } else if (item.id === "v3") {
        p.adrenalineDodgeUntil = now + (90 * 60000);
        p.nextBossCrit = true;
        systemNotify("🦋 Reflejos de Hallownest: Evasión aumentada por 90m y crítico listo contra el próximo Jefe.", "success");

    } else if (item.id === "v4") {
        p.bypassFatigue = true;
        p.sp = Math.min(100, p.sp + 35);
        systemNotify("🏎️ Aceleración Máxima: Bypass de Fatiga activado y +35 SP.", "stamina");

    } else if (item.id === "v_zelda") {
        p.arcticShield = (p.arcticShield || 0) + 35;
        if (!p.dungeonKeys) p.dungeonKeys = { rankE: 0, rankD: 0, rankC: 0, rankB: 0, rankA: 0, rankS: 0, rankSSS: 0 };
        p.dungeonKeys.rankC = (p.dungeonKeys.rankC || 0) + 1;
        systemNotify("🗺️ Corazón de Campeón: +35 de Escudo y +1 Llave de Portal Rango C.", "gold");

    } else if (item.id === "v_anime") {
        p.sp = Math.min(100, p.sp + 45);
        if (p.bosses && p.bosses.length > 0) {
            p.bosses.forEach(b => { if (b.start) b.start += (90 * 60000); });
        }
        systemNotify("📺 Maratón Autorizada: +45 SP y Jefes personales congelados por 90 min.", "gold");

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
        systemNotify("🛣️ Bitácora Vial activada: Las misiones de Ruta Los Chorros (Descenso y Retorno) están disponibles nuevamente en tu Tablón de hoy.", "info");

    } else if (item.id === "work_pass") {
        if (!p.completedToday) p.completedToday = [];
        ['m_work', 'm_traffic_ida', 'm_traffic_vuelta'].forEach(mid => {
            if (!p.completedToday.includes(mid)) {
                p.completedToday.push(mid);
                p.totalMissions = (p.totalMissions || 0) + 1;
            }
            if (p.activeMissions && p.activeMissions[mid]) {
                delete p.activeMissions[mid];
            }
        });
        p.xp += 60;
        if (typeof renderRoutine === "function") renderRoutine();
        systemNotify("🎫 Sello de Exención Laboral validado: Día sin turno laboral justificado (+60 XP y Racha Perfecta protegida).", "success");

} else if (item.id === "lunch_ticket") {
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let totalMins = (h * 60) + m;
        // Ventana flexible: 11:15 AM (675 min) hasta las 2:00 PM (840 min)
        let isLunchTime = (totalMins >= 675 && totalMins <= 840);
        if (!isLunchTime) {
            return systemNotify("🥗 Horario biológico incorrecto: El Cupón de Almuerzo solo puede digerirse entre las 11:15 AM y las 2:00 PM.", "danger");
        }
        if (totalMins < 720) {
            p.mp = Math.min(maxMP, (p.mp || 0) + 35);
            systemNotify("🥗 Almuerzo de Salida Temprana (11:15-11:59 AM): +40 SP progresivos y +35 MP extra por digestión temprana.", "stamina");
        } else {
            systemNotify("🥗 Cupón de Almuerzo activado: Tu barra de SP se recargará lentamente (+40 SP progresivos).", "stamina");
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

    p.inventory.splice(idx, 1);
    saveData(); 
    if (typeof updateHUD === "function") updateHUD(); 
    if (typeof syncRaidVitalsUI === "function") syncRaidVitalsUI();
    renderInventory(); 
    renderShop();
}
/* ==========================================================================
   6. EXTRACCIÓN DE BOTÍN (LOOTDB DROP) Y RESPALDOS
   ========================================================================== */
function rollLootDrop(guaranteedHighRank = false) {
    if (typeof lootDB === 'undefined' || lootDB.length === 0) return;
    let pool = guaranteedHighRank ? lootDB.filter(x => x.rank === 'A' || x.rank === 'S' || x.rank === 'SS') : lootDB;
    let drop = pool[Math.floor(Math.random() * pool.length)];
    if (!drop) return;

    if (drop.it && typeof shopDB !== 'undefined') {
        let shopItem = shopDB.find(x => x.id === drop.it);
        if (shopItem) {
            p.inventory.push({...shopItem, type: 'item'});
            systemNotify(`🎁 Botín Legendario obtenido: ${shopItem.title}`, "gold");
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
    systemNotify(`${drop.icon || '💎'} Botín extraído: ${drop.t} (+${drop.g} G)`, "gold");
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
    systemNotify("✅ Alma extraída con éxito.", "gold");
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData && importedData.hasOwnProperty('level') && importedData.hasOwnProperty('hp')) {
                if (confirm("⚠️ ADVERTENCIA: Inyectar un alma sobrescribirá todo tu progreso actual. ¿Continuar?")) {
                    p = importedData; saveData();
                    systemNotify("✅ Alma inyectada. Reiniciando Sistema...", "gold");
                    setTimeout(() => { window.location.reload(); }, 1500);
                }
            } else { systemNotify("❌ Archivo corrupto.", "danger"); }
        } catch (error) { systemNotify("❌ Formato irreconocible.", "danger"); }
        event.target.value = '';
    };
    reader.readAsText(file);
}

/* ==========================================================================
   7. EQUIPAMIENTO EN VIVO, VISOR DE POSE Y BONOS DE CONJUNTO
   ========================================================================== */
function applyEquipmentStats(item, direction = 1) {
    if (!item || !item.stats || !p.stats) return;
    if (item.stats.str) p.stats.str = Math.max(1, +(p.stats.str + (item.stats.str * direction)).toFixed(2));
    if (item.stats.int) p.stats.int = Math.max(1, +(p.stats.int + (item.stats.int * direction)).toFixed(2));
    if (item.stats.agi) p.stats.agi = Math.max(1, +(p.stats.agi + (item.stats.agi * direction)).toFixed(2));
}

function equipItem(idx) {
    if (!p.inventory || !p.inventory[idx]) return;
    let item = p.inventory[idx];
    
    if (!p.equipment) p.equipment = { weapon: null, armor: null, accessory: null };
    let slotType = item.slot || "accessory";

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
    if (!p.equipment || !p.equipment[slotType]) return;
    
    let item = p.equipment[slotType];
    applyEquipmentStats(item, -1);
    p.inventory.push(item);
    p.equipment[slotType] = null;

    let newMaxHP = calculateHunterMaxHP();
    if (!p.magmaOverheal && p.hp > newMaxHP) {
        p.hp = newMaxHP;
    }
    
    saveData();
    updateEquipmentUI();
    renderInventory();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof renderMiniArenaUnits === "function") renderMiniArenaUnits();
    if (typeof updateHUD === "function") updateHUD();
    systemNotify(`🎒 ${item.title} devuelto a la bolsa.`, "info");
}

function updateEquipmentUI() {
    ['weapon', 'armor', 'accessory'].forEach(slot => {
        let el = document.getElementById(`slot-${slot}`);
        let iconEl = document.getElementById(`icon-${slot}`);
        if (!el || !iconEl) return;
        
        if (p.equipment && p.equipment[slot]) {
            let item = p.equipment[slot];
            el.classList.add('filled');
            el.className = `equip-slot filled rank-${item.rank || 'A'}`;
            iconEl.innerHTML = `<div style="font-size:1.35em;">${getIconFor(item)}</div><div style="font-size:0.42em; color:#cbd5e1; margin-top:4px; line-height:1.1;">${item.title}</div>`;
        } else {
            el.className = 'equip-slot';
            iconEl.innerText = "[VACÍO]";
        }
    });

    let equipGrid = document.querySelector('#tab-inventory .equipment-grid');
    if (!equipGrid) return;
let curW = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : '';
    let curA = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : '';
    let curAcc = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : '';
    let curDodge = (typeof getHunterDodgeChance === "function") ? getHunterDodgeChance() : 0;
    let equipHash = `${curW}|${curA}|${curAcc}|${curDodge}`;
    if (window._lastEquipHash === equipHash && document.getElementById('hunter-equip-showcase')) {
        return;
    }
    window._lastEquipHash = equipHash;
    let showcaseEl = document.getElementById('hunter-equip-showcase');
    if (!showcaseEl) {
        showcaseEl = document.createElement('div');
        showcaseEl.id = 'hunter-equip-showcase';
        showcaseEl.className = 'card';
        showcaseEl.style.flexDirection = 'column';
        showcaseEl.style.alignItems = 'center';
        showcaseEl.style.marginBottom = '20px';
        showcaseEl.style.background = 'radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.14) 0%, #030611 90%)';
        equipGrid.parentNode.insertBefore(showcaseEl, equipGrid.nextSibling);
    }

    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : null;
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : null;
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : null;

    let wMeta = wId ? getRelicInfo(wId) : null;
    let aMeta = aId ? getRelicInfo(aId) : null;
    let accMeta = accId ? getRelicInfo(accId) : null;

    let currentPoseName = wMeta && wMeta.pose ? wMeta.pose : "Pose de Guardia (Base)";
    let dodgeChance = (typeof getHunterDodgeChance === "function") ? getHunterDodgeChance() : Math.min(60, Math.floor(((p.stats ? p.stats.agi : 1) - 1) * 8));

    let activePassivesHtml = '';
    if (wMeta) activePassivesHtml += `<div style="margin-bottom:4px;">🗡️ <b style="color:var(--neon-main);">Arma:</b> ${wMeta.passive}</div>`;
    if (aMeta) activePassivesHtml += `<div style="margin-bottom:4px;">🛡️ <b style="color:var(--success);">Armadura:</b> ${aMeta.passive}</div>`;
    if (accMeta) activePassivesHtml += `<div style="margin-bottom:4px;">💍 <b style="color:var(--text-gold);">Accesorio:</b> ${accMeta.passive}</div>`;
    if (!activePassivesHtml) {
        activePassivesHtml = `<div style="color:var(--text-muted); text-align:center;">Sin reliquias equipadas. Adquiere piezas en la Armería para cambiar tu pose, tus armas y desbloquear pasivas únicas.</div>`;
    }

    let sets = getActiveSetBonuses();
    let setsHtml = sets.map(s => `<div style="margin-top:6px; padding:6px; background:rgba(255,204,0,0.12); border:1px solid var(--text-gold); color:var(--text-gold); font-size:0.82em;"><b>${s.name}:</b> ${s.desc}</div>`).join('');

    let avatarSvg = (typeof getHunterMiniSVG === "function") ? getHunterMiniSVG() : '';

    showcaseEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; width:100%; align-items:center; border-bottom:1px solid rgba(0,210,255,0.2); padding-bottom:6px; margin-bottom:10px;">
            <span style="font-family:'Share Tech Mono', monospace; font-size:0.8em; color:var(--neon-main);">POSE: ${currentPoseName.toUpperCase()}</span>
            <span style="font-family:'Share Tech Mono', monospace; font-size:0.8em; color:var(--success);">⚡ EVASIÓN (AGI): ${dodgeChance}%</span>
        </div>
        <div style="width:135px; height:135px; margin:4px auto; filter:drop-shadow(0 0 15px rgba(0,210,255,0.35));">
            ${avatarSvg}
        </div>
        <div style="width:100%; background:rgba(0,0,0,0.65); border:1px solid #1e293b; padding:10px 12px; font-size:0.84em; color:#e2e8f0; margin-top:8px; line-height:1.35;">
            ${activePassivesHtml}
            ${setsHtml}
        </div>
    `;
}

function formatItemInspectorText(item) {
    let extraStats = "";
    if (item.stats) {
        let parts = [];
        if (item.stats.str) parts.push(`+${item.stats.str} STR (Fuerza/Defensa)`);
        if (item.stats.int) parts.push(`+${item.stats.int} INT (Maná/Eficiencia)`);
        if (item.stats.agi) parts.push(`+${item.stats.agi} AGI (Evasión/Reflejos)`);
        extraStats = `\n\n📊 Atributos: ${parts.join(' | ')}`;
    }

    let relicMeta = getRelicInfo(item.id);
    let relicText = "";
    if (relicMeta) {
        let styleLabel = relicMeta.pose ? `🗡️ Pose de Combate: [${relicMeta.pose}]` : (relicMeta.silhouette ? `🛡️ Aspecto Visual: [${relicMeta.silhouette}]` : `✨ Aura: [${relicMeta.aura}]`);
        relicText = `\n\n${styleLabel}\n⚡ Efecto Único: ${relicMeta.passive}`;
    }

    return `[Rango ${item.rank || 'A'}] ${item.desc || ''}${extraStats}${relicText}`;
}