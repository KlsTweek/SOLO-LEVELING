/* ==========================================================================
   MODELS.JS - MOTOR MODULAR DE ARTE VECTORIAL Y ANIMACIONES (60 FPS)
   ========================================================================== */

function getInfantrySVG(typeKey) {
    if (typeKey === 'soldiers') {
        return `<svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="108" rx="34" ry="6" fill="none" stroke="#38bdf8" stroke-width="1.4" stroke-dasharray="5 3"/>
            <g class="svg-torso-solid">
                <path d="M48 16 C38 8 28 12 24 22 C34 18 42 18 48 18 Z" fill="#7dd3fc"/>
                <polygon points="60,14 46,28 50,46 60,52 70,46 74,28" fill="#050b18" stroke="#7dd3fc" stroke-width="1.6"/>
                <polygon points="50,32 57,35 52,38" fill="#ffffff"/><polygon points="70,32 63,35 68,38" fill="#ffffff"/>
                <path d="M34 50 L60 58 L86 50 L78 96 L42 96 Z" fill="#040914" stroke="#38bdf8" stroke-width="1.6"/>
                <line x1="78" y1="84" x2="106" y2="28" stroke="#e0f2fe" stroke-width="2.6" stroke-linecap="round"/>
            </g>
        </svg>`;
    }
    if (typeKey === 'mages') {
        return `<svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="108" rx="34" ry="6" fill="none" stroke="#818cf8" stroke-width="1.4" stroke-dasharray="5 3"/>
            <g class="svg-torso-solid">
                <path d="M60 12 L36 42 L44 52 L60 30 L76 52 L84 42 Z" fill="#060c1d" stroke="#a5b4fc" stroke-width="1.6"/>
                <path d="M32 48 L88 48 L94 104 L26 104 Z" fill="#040814" stroke="#7dd3fc" stroke-width="1.6"/>
                <circle cx="52" cy="36" r="2.2" fill="#ffffff"/><circle cx="68" cy="36" r="2.2" fill="#ffffff"/>
                <circle cx="94" cy="56" r="9" fill="rgba(0,229,255,0.25)" stroke="#ffffff" stroke-width="1.6"/>
            </g>
        </svg>`;
    }
    if (typeKey === 'bears') {
        return `<svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="108" rx="38" ry="6" fill="none" stroke="#38bdf8" stroke-width="1.4" stroke-dasharray="5 3"/>
            <g class="svg-torso-solid">
                <polygon points="38,20 44,12 52,20 68,20 76,12 82,20 88,44 60,54 32,44" fill="#061024" stroke="#7dd3fc" stroke-width="1.6"/>
                <path d="M22 46 L60 56 L98 46 L92 102 L28 102 Z" fill="#040b18" stroke="#38bdf8" stroke-width="1.8"/>
                <polygon points="48,30 55,33 50,36" fill="#ffffff"/><polygon points="72,30 65,33 70,36" fill="#ffffff"/>
                <polyline points="42,64 60,78 78,64" fill="none" stroke="#e0f2fe" stroke-width="2"/>
            </g>
        </svg>`;
    }
    if (typeKey === 'orcs') {
        return `<svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="108" rx="36" ry="6" fill="none" stroke="#7dd3fc" stroke-width="1.4" stroke-dasharray="5 3"/>
            <g class="svg-torso-solid">
                <polygon points="42,20 60,12 78,20 82,46 60,54 38,46" fill="#071022" stroke="#e0f2fe" stroke-width="1.6"/>
                <polygon points="46,42 42,32 50,40" fill="#ffffff"/><polygon points="74,42 78,32 70,40" fill="#ffffff"/>
                <path d="M26 48 L94 48 L88 102 L32 102 Z" fill="#050b18" stroke="#7dd3fc" stroke-width="1.8"/>
                <path d="M92 30 L108 42 L92 56 Z" fill="#7dd3fc" stroke="#ffffff" stroke-width="1.4"/>
            </g>
        </svg>`;
    }
    return `<svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="108" rx="34" ry="6" fill="none" stroke="#818cf8" stroke-width="1.4" stroke-dasharray="5 3"/>
        <g class="svg-torso-solid">
            <path d="M50 20 L38 8 M70 20 L82 8" stroke="#e0f2fe" stroke-width="1.8"/>
            <polygon points="60,16 44,34 60,50 76,34" fill="#050a18" stroke="#7dd3fc" stroke-width="1.6"/>
            <polygon points="38,52 82,52 74,98 46,98" fill="#040814" stroke="#818cf8" stroke-width="1.6"/>
            <polygon points="50,30 57,34 52,37" fill="#ffffff"/><polygon points="70,30 63,34 68,37" fill="#ffffff"/>
        </g>
    </svg>`;
}
window.getInfantrySVG = getInfantrySVG;

function getArenaAttackFX(actorKey) {
    if (actorKey === 'igris') {
        return `<svg class="arena-svg-fx" viewBox="0 0 320 110"><g class="fx-travel-wave"><path d="M120 10 C185 32, 185 78, 120 100 C162 72, 162 38, 120 10 Z" fill="#00d2ff" stroke="#ffffff" stroke-width="2"/><path d="M105 18 C165 38, 165 72, 105 92 C140 68, 140 42, 105 18 Z" fill="#ff2a55" opacity="0.9"/></g></svg>`;
    }
    if (actorKey === 'tank') {
        return `<svg class="arena-svg-fx" viewBox="0 0 320 110"><g class="fx-impact-burst"><polygon points="150,105 168,42 184,105" fill="rgba(56,189,248,0.75)"/><polygon points="185,105 212,22 232,105" fill="#00d2ff"/><polygon points="225,105 258,12 282,105" fill="#e0f2fe"/></g></svg>`;
    }
    if (actorKey === 'iron') {
        return `<svg class="arena-svg-fx" viewBox="0 0 320 110"><g class="fx-travel-wave"><ellipse cx="145" cy="55" rx="18" ry="42" fill="none" stroke="#a855f7" stroke-width="5"/><ellipse cx="168" cy="55" rx="12" ry="30" fill="none" stroke="#38bdf8" stroke-width="3"/></g></svg>`;
    }
    if (actorKey === 'tusk') {
        return `<svg class="arena-svg-fx" viewBox="0 0 320 110"><g class="fx-beam-expand"><path d="M85 32 L295 14 L295 96 L85 78 Z" fill="rgba(255,42,85,0.65)"/><line x1="85" y1="55" x2="295" y2="55" stroke="#ffffff" stroke-width="6"/></g></svg>`;
    }
    if (actorKey === 'beru') {
        return `<svg class="arena-svg-fx" viewBox="0 0 320 110"><g class="fx-impact-burst"><path d="M180 18 Q235 42 292 26" fill="none" stroke="#00ffcc" stroke-width="5"/><path d="M172 48 Q235 62 298 52" fill="none" stroke="#d946ef" stroke-width="7"/></g></svg>`;
    }
    return `<svg class="arena-svg-fx" viewBox="0 0 320 110"><g class="fx-impact-burst"><path d="M185 15 Q245 55 295 95" fill="none" stroke="#00d2ff" stroke-width="6"/><path d="M295 15 Q245 55 185 95" fill="none" stroke="#d946ef" stroke-width="6"/></g></svg>`;
}

function getBiomeEnemyVectorSVG(biome, isSecondary = false) {
    // Paleta por bioma
    let col = isSecondary ? "#38bdf8" : "#ff2a55";
    if (biome === 'ice') col = isSecondary ? "#bae6fd" : "#38bdf8";
    else if (biome === 'poison' || biome === 'toxic' || biome === 'retro-mobile') col = isSecondary ? "#a7f3d0" : "#2dd4bf";
    else if (biome === 'shrine' || biome === 'star-stream' || biome === 'trap-grid') col = isSecondary ? "#fef08a" : "#f59e0b";
    else if (biome === 'abyss' || biome === 'void' || biome === 'paranormal' || biome === 'tower') col = isSecondary ? "#e879f9" : "#a855f7";

    // MODELO TRASERO (SOPORTE / CHAMÁN / ARTILLERO)
    if (isSecondary) {
        if (biome === 'ice' || biome === 'shrine') {
            // Hechicero / Oráculo Arcano con báculo flotante
            return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
                <circle cx="32" cy="32" r="24" stroke="${col}" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.6"/>
                <polygon points="32,8 46,26 42,54 22,54 18,26" fill="rgba(4,10,24,0.92)" stroke="${col}" stroke-width="2"/>
                <circle cx="27" cy="26" r="2.2" fill="#ffffff"/><circle cx="37" cy="26" r="2.2" fill="#ffffff"/>
                <polygon points="52,12 58,20 52,28 46,20" fill="#ffffff" stroke="${col}" stroke-width="1.6"/>
                <line x1="52" y1="28" x2="52" y2="56" stroke="${col}" stroke-width="2"/>
            </svg>`;
        }
        if (biome === 'abyss' || biome === 'void' || biome === 'paranormal') {
            // Ojo / Sonda Psíquica del Abismo
            return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
                <polygon points="32,6 56,32 32,58 8,32" fill="rgba(8,4,20,0.92)" stroke="${col}" stroke-width="2"/>
                <circle cx="32" cy="32" r="10" fill="rgba(0,0,0,0.8)" stroke="#ffffff" stroke-width="1.8"/>
                <circle cx="32" cy="32" r="4" fill="${col}"/>
                <path d="M16 16 L24 24 M48 16 L40 24 M16 48 L24 40 M48 48 L40 40" stroke="${col}" stroke-width="1.6"/>
            </svg>`;
        }
        // Chamán / Tirador de Soporte General
        return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
            <path d="M18 54 L22 22 L32 10 L42 22 L46 54 Z" fill="rgba(6,10,22,0.94)" stroke="${col}" stroke-width="2"/>
            <polygon points="25,26 30,29 26,32" fill="#ffffff"/><polygon points="39,26 34,29 38,32" fill="#ffffff"/>
            <circle cx="14" cy="24" r="6" fill="rgba(255,255,255,0.2)" stroke="#ffffff" stroke-width="1.6"/>
            <path d="M14 30 L14 54" stroke="${col}" stroke-width="2"/>
        </svg>`;
    }

    // MODELO DELANTERO (VANGUARDIA PESADA / BESTIA DE CHOQUE)
    if (biome === 'ice') {
        // Guerrero Hyakki / Gólem Glacial
        return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
            <polygon points="32,6 48,16 54,38 44,56 20,56 10,38 16,16" fill="rgba(4,14,28,0.95)" stroke="${col}" stroke-width="2.4"/>
            <polygon points="20,26 29,30 22,34" fill="#ffffff"/><polygon points="44,26 35,30 42,34" fill="#ffffff"/>
            <path d="M10 22 L4 10 L18 16 M54 22 L60 10 L46 16" stroke="#ffffff" stroke-width="2"/>
            <polyline points="22,44 32,38 42,44" stroke="${col}" stroke-width="2.2"/>
        </svg>`;
    }
    if (biome === 'abyss' || biome === 'gore' || biome === 'ghoul' || biome === 'blood-demon') {
        // Aberración Carmesí / Bestia del Abismo
        return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
            <path d="M10 54 L8 24 L18 8 L32 18 L46 8 L56 24 L54 54 L32 46 Z" fill="rgba(16,4,12,0.95)" stroke="${col}" stroke-width="2.4"/>
            <polygon points="18,26 28,31 20,35" fill="#ffffff"/><polygon points="46,26 36,31 44,35" fill="#ffffff"/>
            <polyline points="18,43 25,37 32,44 39,37 46,43" stroke="#ffffff" stroke-width="1.8"/>
        </svg>`;
    }
    if (biome === 'shrine' || biome === 'trap-grid' || biome === 'tower') {
        // Coloso / Guardián Acorazado
        return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
            <polygon points="16,12 48,12 56,28 48,54 16,54 8,28" fill="rgba(12,10,6,0.95)" stroke="${col}" stroke-width="2.4"/>
            <rect x="20" y="24" width="24" height="6" fill="#ffffff"/>
            <circle cx="32" cy="27" r="3" fill="${col}"/>
            <line x1="18" y1="42" x2="46" y2="42" stroke="${col}" stroke-width="2.2"/>
        </svg>`;
    }
    // Vanguardia Licántropo / Bestia de Acero
    return `<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
        <path d="M12 54 L16 24 L8 10 L24 18 L32 8 L40 18 L56 10 L48 24 L52 54 L32 48 Z" fill="rgba(6,10,22,0.94)" stroke="${col}" stroke-width="2.4"/>
        <polygon points="18,28 29,33 21,37" fill="#ffffff"/>
        <polygon points="46,28 35,33 43,37" fill="#ffffff"/>
        <polyline points="20,44 26,39 32,45 38,39 44,44" stroke="${col}" stroke-width="1.8"/>
    </svg>`;
}


/* ==========================================================================
   MOTOR DE ARTEFACTOS HOLOGRÁFICOS DEL SISTEMA (PALETA BLANCO-CELESTE ANIME)
   ========================================================================== */
const UNIQUE_ITEM_SVGS = {
    // ==================== 1. CONSUMIBLES (36 DISEÑOS NUEVOS) ====================
    "c_mercy": `<circle cx="32" cy="32" r="24" S2 stroke-dasharray="4 3"/><polygon points="32,6 50,20 44,50 20,50 14,20" F1 S1/><polygon points="32,14 42,24 38,44 26,44 22,24" S2/><path d="M32 18 L32 38 M24 26 L40 26" stroke="#ffffff" stroke-width="2.5"/><circle cx="32" cy="10" r="2" fill="#ffffff"/>`,
    "c_magma_heart": `<path d="M24 14 L24 8 M32 12 L32 6 M40 14 L40 8" S2/><path d="M32 56 L14 36 C7 26 12 14 23 14 C28 14 32 20 32 20 C32 20 36 14 41 14 C52 14 57 26 50 36 Z" F1 S1/><polygon points="32,24 40,34 32,46 24,34" fill="rgba(255,255,255,0.25)" S2/><polyline points="16,30 26,32 32,24 38,32 48,30" S2/><circle cx="32" cy="34" r="3" fill="#ffffff"/>`,
    "c_zero_serum": `<path d="M24 6 L40 6 M32 6 L32 12 M20 12 L44 12 M20 50 L44 50 M28 50 L32 58 L36 50" S1/><rect x="21" y="12" width="22" height="38" rx="3" F1 S1/><path d="M21 20 L25 20 M21 28 L25 28 M21 36 L25 36 M21 44 L25 44" S2/><path d="M32 18 L32 44 M23 26 L41 36 M41 26 L23 36" S2/><polygon points="32,25 37,31 32,37 27,31" fill="#ffffff"/>`,
    "c_void_blood": `<path d="M24 8 L40 8 M28 8 L28 16 L14 38 L22 56 L42 56 L50 38 L36 16 L36 8" F1 S1/><path d="M18 38 L46 38" S2/><path d="M32 28 C38 28 40 36 34 40 C28 44 24 36 28 32" S2/><circle cx="32" cy="36" r="3" fill="#ffffff"/><circle cx="26" cy="46" r="1.8" fill="#ffffff"/><circle cx="38" cy="44" r="1.5" fill="#ffffff"/>`,
    "c_hourglass": `<ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-25 32 32)" S2 stroke-dasharray="4 3"/><path d="M16 8 L48 8 M16 56 L48 56 M20 8 L20 16 L32 32 L44 16 L44 8 M20 56 L20 48 L32 32 L44 48 L44 56" F1 S1/><polygon points="25,18 39,18 32,28" fill="#ffffff"/><path d="M32 32 L32 46" S2 stroke-dasharray="2 2"/><polygon points="24,52 40,52 32,44" fill="#ffffff"/>`,
    "c_star_drop": `<path d="M8 56 L26 38 M6 44 L20 30 M20 58 L32 46" S2/><polygon points="38,8 42,20 54,24 42,28 38,40 34,28 22,24 34,20" F1 S1/><circle cx="38" cy="24" r="4" fill="#ffffff"/><circle cx="14" cy="50" r="2" fill="#ffffff"/><circle cx="26" cy="52" r="1.5" fill="#ffffff"/>`,
    "c1": `<path d="M25 8 L39 8 M28 8 L28 18 L14 36 C10 42 14 54 24 54 L40 54 C50 54 54 42 50 36 L36 18 L36 8" F1 S1/><path d="M15 40 Q24 36 32 40 T49 40" S2/><path d="M32 26 C28 32 28 36 32 38 C36 36 36 32 32 26 Z" fill="#ffffff"/>`,
    "c_hp_mid": `<path d="M18 22 C8 16 6 26 14 32 M46 22 C56 16 58 26 50 32" S2/><path d="M18 10 L46 10 L42 32 C40 40 24 40 22 32 Z" F1 S1/><path d="M32 38 L32 54 M20 54 L44 54 M26 46 L38 46" S1/><polygon points="32,16 37,24 32,32 27,24" fill="#ffffff" S2/>`,
    "c_med": `<path d="M24 26 C20 18 28 14 26 6 M32 24 C28 16 36 12 32 4 M40 26 C36 18 44 14 40 6" S2/><polygon points="32,28 40,38 32,44 24,38" F1 S1/><polygon points="16,32 28,38 22,46" F1 S1/><polygon points="48,32 36,38 42,46" F1 S1/><path d="M12 46 L52 46 L46 54 L18 54 Z" F1 S1/>`,
    "c2": `<path d="M12 22 L18 22 M10 32 L18 32 M12 42 L18 42 M46 22 L52 22 M46 32 L54 32 M46 42 L52 42" S2/><rect x="18" y="10" width="28" height="44" rx="6" F1 S1/><path d="M24 6 L40 6 M24 58 L40 58" S1/><polygon points="35,14 23,32 32,32 29,50 41,32 32,32" fill="#ffffff" S2/>`,
    "c_sp_pure": `<polygon points="24,6 40,6 44,12 20,12" F1 S1/><rect x="18" y="12" width="28" height="42" rx="3" F1 S1/><polygon points="20,54 44,54 40,58 24,58" F1 S1/><rect x="23" y="18" width="18" height="7" fill="#ffffff" S2/><rect x="23" y="29" width="18" height="7" fill="#ffffff" S2/><rect x="23" y="40" width="18" height="7" fill="#ffffff" S2/>`,
    "c_mp_pot": `<path d="M26 8 L38 8 M32 4 L32 12" S1/><path d="M32 12 C18 26 14 38 20 48 C25 56 39 56 44 48 C50 38 46 26 32 12 Z" F1 S1/><circle cx="32" cy="38" r="10" S2 stroke-dasharray="3 2"/><polygon points="32,26 38,38 32,46 26,38" fill="#ffffff"/>`,
    "c3": `<path d="M32 8 L32 56 M18 56 L46 56 M10 20 L54 20" S1/><polygon points="32,8 37,16 27,16" fill="#ffffff"/><path d="M14 20 L8 36 L20 36 Z M50 20 L44 36 L56 36 Z" F1 S2/><path d="M14 28 L12 32 L16 32 Z M50 26 L48 32 L52 32 Z" fill="#ffffff"/>`,
    "c_blood_pact": `<circle cx="32" cy="32" r="24" S2 stroke-dasharray="6 3"/><path d="M32 52 L16 34 C10 26 14 14 24 14 C29 14 32 20 32 20 C32 20 35 14 40 14 C50 14 54 26 48 34 Z" F1 S1/><polyline points="6,32 18,32 24,18 30,44 36,22 40,36 44,32 58,32" stroke="#ffffff" stroke-width="2.4"/>`,
    "c_antidote": `<path d="M16 14 C28 14 32 26 26 42 C24 48 16 44 20 34" F1 S1/><path d="M34 10 L46 10 M37 10 L37 20 L48 44 L28 44 L37 20" F1 S1/><circle cx="24" cy="50" r="3" fill="#ffffff"/><path d="M36 32 L42 32 M39 29 L39 35" stroke="#ffffff" stroke-width="2"/>`,
    "c4": `<circle cx="32" cy="32" r="24" S2 stroke-dasharray="4 4"/><g transform="rotate(-35 32 32)"><rect x="20" y="8" width="24" height="48" rx="12" F1 S1/><line x1="20" y1="32" x2="44" y2="32" S1/><path d="M32 15 L32 25 M27 20 L37 20" stroke="#ffffff" stroke-width="2.5"/><circle cx="32" cy="42" r="3" fill="#ffffff"/></g>`,
    "c6": `<path d="M26 6 A6 6 0 0 0 34 14 A8 8 0 0 1 26 6 Z" fill="#ffffff"/><path d="M20 18 Q24 12 20 8 M38 18 Q42 12 38 8" S2/><path d="M14 22 L44 22 L40 46 C38 52 20 52 18 46 Z" F1 S1/><path d="M44 26 C54 26 54 40 41 40 M8 52 L50 52" S1/><line x1="20" y1="30" x2="38" y2="30" S2/>`,
    "c5": `<path d="M14 54 L22 42 L42 42 L50 54 M20 54 L44 54" S1/><circle cx="32" cy="26" r="18" F1 S1/><path d="M32 14 C40 14 42 26 32 26 C22 26 24 38 32 38" S2/><circle cx="32" cy="26" r="4" fill="#ffffff"/><circle cx="24" cy="20" r="1.8" fill="#ffffff"/><circle cx="40" cy="32" r="1.8" fill="#ffffff"/>`,
    "c_rc_cells": `<path d="M18 8 C46 20 18 44 46 56 M46 8 C18 20 46 44 18 56" S1/><path d="M8 20 Q18 26 14 36 M56 20 Q46 26 50 36 M24 16 L40 16 M24 48 L40 48" S2/><circle cx="32" cy="32" r="5" fill="#ffffff" S1/>`,
    "c_wisteria": `<path d="M10 10 Q32 6 54 14" S1/><polygon points="20,12 25,22 20,28 15,22" F1 S1/><polygon points="20,24 24,32 20,38 16,32" F1 S2/><polygon points="32,10 38,22 32,30 26,22" F1 S1/><polygon points="32,26 37,36 32,44 27,36" F1 S1/><polygon points="32,40 35,48 32,54 29,48" fill="#ffffff"/><polygon points="44,14 49,24 44,30 39,24" F1 S1/><polygon points="44,26 48,34 44,40 40,34" F1 S2/>`,
    "c_kandiaru_eye": `<path d="M26 6 L38 6 M30 6 L30 14 L54 52 L10 52 L34 14 L34 6" F1 S1/><path d="M18 38 Q32 24 46 38 Q32 52 18 38 Z" S1/><circle cx="32" cy="38" r="5" fill="#ffffff"/><path d="M32 20 L32 26 M20 28 L24 32 M44 28 L40 32" S2/>`,
    "c_phoenix": `<path d="M12 54 C16 32 30 14 52 8 C48 28 36 44 12 54 Z" F1 S1/><path d="M12 54 L48 12 M26 36 L40 34 M32 26 L45 24 M20 44 L32 44" S2/><polygon points="40,18 44,22 40,26 36,22" fill="#ffffff"/><circle cx="16" cy="24" r="2" fill="#ffffff"/><circle cx="48" cy="42" r="2" fill="#ffffff"/>`,
    "c_ambrosia": `<path d="M22 8 L26 14 L32 8 L38 14 L42 8" S2/><path d="M24 16 L40 16 L46 28 L38 50 L26 50 L18 28 Z" F1 S1/><path d="M18 24 C8 18 8 34 20 36 M46 24 C56 18 56 34 44 36 M22 54 L42 54" S1/><polygon points="32,24 37,32 32,40 27,32" fill="#ffffff"/>`,
    "c7": `<path d="M18 26 C6 16 4 30 16 36 M46 26 C58 16 60 30 48 36" F1 S2/><path d="M32 6 L32 14 M28 10 L36 10" stroke="#ffffff" stroke-width="2"/><path d="M26 14 L38 14 L36 24 L46 40 C48 48 42 56 32 56 C22 56 16 48 18 40 L28 24 Z" F1 S1/><polygon points="32,28 36,38 46,40 36,42 32,52 28,42 18,40 28,38" fill="#ffffff"/>`,
    "c_posture": `<line x1="32" y1="6" x2="32" y2="58" S2 stroke-dasharray="2 2"/><polygon points="22,10 42,10 38,17 26,17" F1 S1/><polygon points="18,21 46,21 40,28 24,28" F1 S1/><polygon points="20,32 44,32 38,39 26,39" F1 S1/><polygon points="24,43 40,43 36,50 28,50" F1 S1/><circle cx="32" cy="13.5" r="2" fill="#ffffff"/><circle cx="32" cy="24.5" r="2" fill="#ffffff"/><circle cx="32" cy="35.5" r="2" fill="#ffffff"/><circle cx="32" cy="46.5" r="2" fill="#ffffff"/>`,
    "c_breathing": `<path d="M32 6 L32 26 M32 22 L22 30 M32 22 L42 30 M22 30 L18 38 M22 30 L26 36 M42 30 L46 38 M42 30 L38 36" stroke="#ffffff" stroke-width="2"/><path d="M28 16 C14 16 8 32 12 46 C15 54 28 52 28 42 Z M36 16 C50 16 56 32 52 46 C49 54 36 52 36 42 Z" F1 S1/>`,
    "c_eye_drops": `<path d="M8 36 Q32 16 56 36 Q32 56 8 36 Z" F1 S1/><circle cx="32" cy="36" r="10" S1/><circle cx="32" cy="36" r="3.5" fill="#ffffff"/><path d="M32 22 L32 28 M32 44 L32 50 M18 36 L24 36 M40 36 L46 36" S2/><path d="M32 6 C28 12 28 16 32 18 C36 16 36 12 32 6 Z" fill="#ffffff"/>`,
    "c_cold_splash": `<path d="M6 42 C16 32 24 32 32 42 C40 52 48 52 58 42 M6 52 C16 42 24 42 32 52 C40 62 48 62 58 52" S1/><polygon points="32,8 37,20 32,32 27,20" F1 S1/><polygon points="18,16 22,24 18,32 14,24" F1 S2/><polygon points="46,16 50,24 46,32 42,24" F1 S2/><circle cx="32" cy="20" r="2.5" fill="#ffffff"/>`,
    "c_adrenaline": `<g transform="rotate(35 32 32)"><rect x="26" y="6" width="12" height="6" F1 S1/><rect x="22" y="12" width="20" height="32" rx="2" F1 S1/><polygon points="26,44 38,44 34,52 30,52" F1 S1/><line x1="32" y1="52" x2="32" y2="60" stroke="#ffffff" stroke-width="2.2"/><polygon points="34,18 27,28 33,28 30,38 37,28 31,28" fill="#ffffff"/></g>`,
    "c_sage_tea": `<path d="M24 16 Q22 10 26 6 M34 14 Q32 8 36 4" S2/><path d="M16 24 L44 24 C46 38 40 48 30 48 C20 48 14 38 16 24 Z" F1 S1/><path d="M44 28 C54 28 54 40 42 42 M16 28 L8 22 L10 34 L16 36 M12 52 L48 52" S1/><path d="M26 34 Q30 28 34 34 Q30 40 26 34 Z" fill="#ffffff"/>`,
    "c_cartenon_candle": `<circle cx="32" cy="18" r="12" S2 stroke-dasharray="3 2"/><path d="M32 6 C25 14 27 22 32 24 C37 22 39 14 32 6 Z" fill="#ffffff" S1/><rect x="25" y="26" width="14" height="24" F1 S1/><path d="M25 32 Q32 36 39 32 M16 50 L48 50 L52 56 L12 56 Z" F1 S1/>`,
    "c_giant_serum": `<path d="M24 8 L40 8 L38 16 L50 26 L46 54 L18 54 L14 26 L26 16 Z" F1 S1/><path d="M14 26 L50 26 M18 46 L46 46" S2/><rect x="24" y="30" width="16" height="12" rx="2" fill="rgba(255,255,255,0.2)" S1/><line x1="28" y1="30" x2="28" y2="36" S1/><line x1="32" y1="30" x2="32" y2="36" S1/><line x1="36" y1="30" x2="36" y2="36" S1/>`,
    "c_baran_drop": `<path d="M24 8 L40 8 M28 8 L28 16 L46 26 L46 52 L18 52 L18 26 L36 16 L36 8" F1 S1/><polyline points="34,20 24,34 33,34 26,48 40,32 31,32 34,20" fill="#ffffff" S2/>`,
    "c_liquid_shadow": `<path d="M18 20 Q10 12 18 6 M46 20 Q54 12 46 6" S2/><path d="M32 10 C18 26 14 38 20 48 C26 56 38 56 44 48 C50 38 46 26 32 10 Z" F1 S1/><polygon points="22,36 30,39 25,42" fill="#ffffff"/><polygon points="42,36 34,39 39,42" fill="#ffffff"/>`,
    "c_demon_blood": `<path d="M18 14 C8 6 6 20 18 26 M46 14 C56 6 58 20 46 26" S1/><polygon points="18,14 46,14 40,38 24,38" F1 S1/><path d="M32 38 L32 54 M20 54 L44 54 M22 20 L26 28 L32 22 L38 28 L42 20" S2/><circle cx="32" cy="30" r="3" fill="#ffffff"/>`,
    "c_world_fruit": `<path d="M32 16 L32 6 M32 12 C22 4 14 10 22 16 M32 12 C42 4 50 10 42 16" S1/><path d="M32 16 C16 16 12 34 22 46 L32 54 L42 46 C52 34 48 16 32 16 Z" F1 S1/><polygon points="32,24 38,34 32,44 26,34" fill="#ffffff" S2/>`,

    // ==================== 2. PERGAMINOS Y LLAVES (42 DISEÑOS NUEVOS) ====================
    "p1": `<rect x="14" y="8" width="36" height="6" rx="3" F1 S1/><rect x="14" y="50" width="36" height="6" rx="3" F1 S1/><rect x="18" y="14" width="28" height="36" F1 S1/><path d="M32 20 L32 44 M22 26 L42 38 M42 26 L22 38" stroke="#ffffff" stroke-width="2"/><polygon points="32,26 37,32 32,38 27,32" S2/>`,
    "p_extra_chorros": `<polygon points="8,46 22,16 34,34 44,12 58,46" F1 S1/><path d="M18 56 C22 44 42 40 38 28" S1/><path d="M28 56 C30 46 48 42 42 28" S1/><path d="M24 54 L36 30" S2 stroke-dasharray="3 3"/><circle cx="44" cy="12" r="2.5" fill="#ffffff"/>`,
    "p3": `<rect x="12" y="10" width="40" height="44" rx="2" F1 S1/><circle cx="32" cy="32" r="14" S2 stroke-dasharray="4 2"/><polygon points="32,14 36,28 50,32 36,36 32,50 28,36 14,32 28,28" fill="#ffffff" S1/>`,
    "p_chrono": `<rect x="14" y="8" width="36" height="48" rx="3" F1 S1/><circle cx="32" cy="32" r="13" S1/><polyline points="32,23 32,32 39,35" stroke="#ffffff" stroke-width="2.4"/><path d="M24 14 L40 14 M24 50 L40 50 M48 24 L54 32 L48 40" S2/>`,
    "p6": `<rect x="14" y="8" width="36" height="48" rx="3" F1 S1/><path d="M20 24 L28 32 M44 24 L36 32 M20 40 L28 32 M44 40 L36 32" S2/><polygon points="35,16 25,32 33,32 29,48 39,32 31,32" fill="#ffffff"/>`,
    "p_reroll": `<path d="M14 28 A18 18 0 1 1 20 46" S1/><polyline points="10,20 14,30 24,26" S1/><polygon points="32,18 44,32 32,46 20,32" F1 S2/><circle cx="32" cy="32" r="4" fill="#ffffff"/>`,
    "p_xp_boost": `<path d="M8 16 L32 22 L56 16 L56 48 L32 54 L8 48 Z" F1 S1/><line x1="32" y1="22" x2="32" y2="54" S1/><polygon points="32,6 38,14 32,18 26,14" fill="#ffffff" S2/><path d="M14 26 L26 29 M14 34 L26 37 M38 29 L50 26 M38 37 L50 34" S2/>`,
    "p_bloodlust": `<path d="M6 32 C18 14 46 14 58 32 C46 50 18 50 6 32 Z" F1 S1/><ellipse cx="32" cy="32" rx="4" ry="12" fill="#ffffff"/><path d="M16 14 L22 20 M48 14 L42 20 M16 50 L22 44 M48 50 L42 44 M4 24 L10 26 M60 24 L54 26" S2/>`,
    "p_shadow_exchange": `<polygon points="18,10 26,18 18,26 10,18" F1 S1/><polygon points="46,38 54,46 46,54 38,46" fill="#ffffff" S1/><path d="M28 16 C44 16 46 24 46 34 M36 48 C20 48 18 40 18 30" S2/><polyline points="42,30 46,36 50,30" S1/><polyline points="14,34 18,28 22,34" S1/>`,
    "p_tusk_fire": `<rect x="14" y="8" width="36" height="48" rx="3" F1 S1/><path d="M22 44 C20 30 28 24 32 14 C36 24 44 30 42 44 C38 40 35 42 32 48 C29 42 26 40 22 44 Z" fill="#ffffff" S2/>`,
    "p_tank_shield": `<path d="M12 10 L52 10 L50 36 L32 56 L14 36 Z" F1 S1/><polygon points="20,18 24,12 28,18 36,18 40,12 44,18 46,32 32,44 18,32" S2/><polygon points="24,25 29,28 25,30" fill="#ffffff"/><polygon points="40,25 35,28 39,30" fill="#ffffff"/>`,
    "p7": `<path d="M10 52 L54 52" S1/><polygon points="32,8 37,20 35,52 29,52 27,20" fill="#ffffff" S1/><polygon points="18,18 22,26 21,52 15,52 15,26" F1 S2/><polygon points="46,18 49,26 49,52 43,52 42,26" F1 S2/>`,
    "p_arise": `<polygon points="32,6 42,22 38,48 26,48 22,22" F1 S1/><polygon points="16,18 24,28 22,48 12,48 12,28" F1 S2/><polygon points="48,18 52,28 52,48 42,48 40,28" F1 S2/><polygon points="32,14 37,26 32,40 27,26" fill="#ffffff"/><path d="M10 52 L54 52" S1/>`,
    "p_dokkaebi": `<rect x="14" y="12" width="36" height="44" rx="2" F1 S1/><polygon points="20,12 14,4 26,12" fill="#ffffff" S1/><polygon points="44,12 50,4 38,12" fill="#ffffff" S1/><circle cx="32" cy="34" r="10" S2/><polygon points="32,27 36,34 32,41 28,34" fill="#ffffff"/>`,
    "p_double_loot": `<circle cx="32" cy="32" r="22" S2 stroke-dasharray="5 3"/><path d="M22 48 L16 30 L22 28 L25 35 L25 16 L30 16 L30 33 L35 14 L40 14 L40 33 L45 20 L49 22 L43 48 Z" F1 S1/><polygon points="32,6 36,10 32,14 28,10" fill="#ffffff"/>`,
    "p_repair": `<path d="M12 42 L52 42 L46 50 L38 50 L40 56 L24 56 L26 50 L18 50 Z" F1 S1/><line x1="20" y1="34" x2="42" y2="12" S1/><rect x="36" y="8" width="14" height="8" transform="rotate(45 43 12)" fill="#ffffff" S1/><path d="M24 22 L18 16 M30 36 L34 32" S2/>`,
    "key_e": `<circle cx="18" cy="32" r="9" F1 S1/><circle cx="18" cy="32" r="3" fill="#ffffff"/><path d="M27 32 L54 32 M44 32 L44 42 M50 32 L50 42" S1/>`,
    "key_d": `<g transform="rotate(-35 32 32)"><polygon points="18,22 28,32 18,42 8,32" F1 S1/><circle cx="18" cy="32" r="3" fill="#ffffff"/><path d="M28 32 L56 32 M42 32 L42 42 M48 32 L48 22 M54 32 L54 42" S1/></g>`,
    "key_c": `<g transform="rotate(35 32 32)"><circle cx="32" cy="16" r="9" F1 S1/><path d="M23 16 L14 12 L18 22 M41 16 L50 12 L46 22" S2/><path d="M32 25 L32 56 M32 44 L42 44 M32 50 L44 50" S1/><circle cx="32" cy="16" r="3" fill="#ffffff"/></g>`,
    "key_b": `<g transform="rotate(30 32 32)"><polygon points="32,6 42,16 32,26 22,16" F1 S1/><polygon points="32,11 37,16 32,21 27,16" fill="#ffffff"/><path d="M22 16 L12 10 L16 22 M42 16 L52 10 L48 22" S2/><path d="M32 26 L32 56 M24 44 L40 44 M26 50 L42 50" S1/></g>`,
    "key_a": `<g transform="rotate(35 32 32)"><path d="M22 18 L16 6 L28 14 L32 4 L36 14 L48 6 L42 18 Z" F1 S1/><circle cx="32" cy="22" r="6" fill="#ffffff" S1/><path d="M32 28 L32 58 M22 44 L42 44 M24 50 L40 50 M26 56 L38 56" S1/></g>`,
    "key_s": `<g transform="rotate(35 32 32)"><polygon points="32,4 40,14 32,24 24,14" fill="#ffffff" S1/><path d="M24 14 L8 8 L14 22 L24 22 M40 14 L56 8 L50 22 L40 22" F1 S1/><path d="M30 24 L34 24 L34 56 L30 56 Z" F1 S1/><path d="M34 38 L46 38 L42 44 L34 44 M34 46 L44 46 L40 52 L34 52 M30 42 L20 42 L24 48 L30 48" S2/></g>`,
    "p_box_b": `<path d="M24 16 L24 10 L40 10 L40 16" S1/><rect x="10" y="16" width="44" height="34" rx="3" F1 S1/><path d="M10 28 L54 28 M22 16 L22 50 M42 16 L42 50" S2/><rect x="28" y="24" width="8" height="8" fill="#ffffff" S1/>`,
    "p_box_s": `<path d="M10 26 C10 12 54 12 54 26 L52 52 L12 52 Z" F1 S1/><path d="M10 28 L54 28 M22 16 L22 52 M42 16 L42 52" S2/><polygon points="32,20 38,28 32,36 26,28" fill="#ffffff" S1/>`,
    "p_box_ss": `<polygon points="22,6 42,6 52,20 44,58 20,58 12,20" F1 S1/><polygon points="26,12 38,12 44,22 38,52 26,52 20,22" S2/><path d="M12 28 L52 36 M52 28 L12 36" S1/><polygon points="32,22 37,32 32,42 27,32" fill="#ffffff"/>`,
    "p_iron_trial": `<line x1="16" y1="32" x2="48" y2="32" stroke="#ffffff" stroke-width="3"/><rect x="8" y="16" width="6" height="32" rx="2" F1 S1/><rect x="14" y="20" width="5" height="24" rx="1" F1 S1/><rect x="50" y="16" width="6" height="32" rx="2" F1 S1/><rect x="45" y="20" width="5" height="24" rx="1" F1 S1/><path d="M24 16 L32 24 L40 16 M24 48 L32 40 L40 48" S2/>`,
    "p_zone_purge": `<circle cx="32" cy="32" r="22" F1 S1/><polygon points="32,10 37,27 54,32 37,37 32,54 27,37 10,32 27,27" fill="#ffffff" S2/><circle cx="32" cy="32" r="14" S2 stroke-dasharray="3 3"/>`,
    "p_transmute": `<circle cx="32" cy="32" r="24" S1/><polygon points="32,8 52,44 12,44" F1 S2/><polygon points="32,56 52,20 12,20" S2/><polygon points="24,28 40,28 44,36 20,36" fill="#ffffff" S1/>`,
    "p_blood_contract": `<path d="M14 8 L46 8 L46 56 L14 56 Z" F1 S1/><path d="M20 18 L40 18 M20 26 L40 26 M20 34 L32 34" S2/><path d="M40 32 L54 14 L50 28 L40 32 Z" fill="#ffffff" S1/><circle cx="30" cy="45" r="5" fill="#ffffff" S2/>`,
    "p_focus_reset": `<polygon points="32,6 48,22 48,42 32,58 16,42 16,22" F1 S1/><polyline points="10,18 28,32 22,32 32,46" stroke="#ffffff" stroke-width="2.2"/><polyline points="54,18 36,32 42,32 32,46" stroke="#ffffff" stroke-width="2.2"/><circle cx="32" cy="32" r="4" fill="#ffffff"/>`,
    "p_kandiaru_dice": `<polygon points="32,6 54,18 54,46 32,58 10,46 10,18" F1 S1/><polyline points="10,18 32,32 54,18" S1/><line x1="32" y1="32" x2="32" y2="58" S1/><polygon points="32,6 54,18 32,32 10,18" fill="rgba(255,255,255,0.2)"/><circle cx="32" cy="19" r="3" fill="#ffffff"/><circle cx="20" cy="34" r="2" fill="#ffffff"/><circle cx="20" cy="42" r="2" fill="#ffffff"/><circle cx="44" cy="32" r="2" fill="#ffffff"/><circle cx="44" cy="40" r="2" fill="#ffffff"/><circle cx="44" cy="48" r="2" fill="#ffffff"/>`,
    "p_bounty_hunt": `<circle cx="32" cy="32" r="22" S2/><path d="M32 4 L32 14 M32 50 L32 60 M4 32 L14 32 M50 32 L60 32" S1/><path d="M20 28 C20 16 44 16 44 28 L40 38 L38 46 L26 46 L24 38 Z" F1 S1/><circle cx="27" cy="28" r="2.5" fill="#ffffff"/><circle cx="37" cy="28" r="2.5" fill="#ffffff"/>`,
    "p_red_beacon": `<polygon points="22,56 32,24 42,56" F1 S1/><line x1="16" y1="56" x2="48" y2="56" S1/><circle cx="32" cy="22" r="4" fill="#ffffff"/><path d="M18 18 A16 16 0 0 1 46 18 M12 12 A24 24 0 0 1 52 12" S2/>`,
    "p_hyper_time": `<circle cx="32" cy="32" r="22" S1/><ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(35 32 32)" S2/><ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(-35 32 32)" S2/><polygon points="26,22 38,22 32,32 38,42 26,42 32,32" fill="#ffffff"/>`,
    "p_imperial_march": `<line x1="16" y1="6" x2="16" y2="58" S1/><polygon points="16,6 20,12 12,12" fill="#ffffff"/><polygon points="16,12 54,14 44,26 54,38 16,40" F1 S1/><polygon points="32,18 37,26 32,34 27,26" fill="#ffffff" S2/>`,
    "p_forced_arise": `<path d="M8 16 L56 48 M56 16 L8 48" S2 stroke-dasharray="5 3"/><polygon points="16,42 14,22 24,30 32,16 40,30 50,22 48,42" F1 S1/><circle cx="32" cy="34" r="3" fill="#ffffff"/>`,
    "p_master_key": `<circle cx="32" cy="16" r="9" S1/><path d="M26 24 L14 48 M14 48 L20 50 M32 25 L32 56 M32 50 L38 50 M32 56 L40 56 M38 24 L50 48 M50 48 L44 50" S1/><circle cx="32" cy="16" r="3" fill="#ffffff"/>`,
    "p_stealth_rune": `<polygon points="30,8 14,22 18,48 28,54 26,34 32,26" F1 S1/><polygon points="36,10 50,24 46,50 34,56 32,36 38,28" F1 S1/><path d="M8 30 Q20 24 32 30 T56 30 M10 40 Q22 34 34 40 T54 40" stroke="#ffffff" stroke-width="2"/>`,
    "p_red_hearthstone": `<polygon points="32,6 52,24 44,56 20,56 12,24" F1 S1/><polygon points="32,12 46,26 40,50 24,50 18,26" S2/><path d="M32 22 C40 22 40 34 32 34 C26 34 26 42 34 42" stroke="#ffffff" stroke-width="2.4"/><circle cx="32" cy="28" r="2.5" fill="#ffffff"/>`,
    "p_lycan_bandage": `<g transform="rotate(-30 32 32)"><rect x="10" y="22" width="44" height="20" rx="4" F1 S1/><line x1="22" y1="22" x2="22" y2="42" S2/><line x1="42" y1="22" x2="42" y2="42" S2/><path d="M32 26 L32 38 M26 32 L38 32" stroke="#ffffff" stroke-width="2.5"/></g>`,
    "p_white_tiger_pass": `<polygon points="12,16 22,8 28,14 36,14 42,8 52,16 54,34 32,56 10,34" F1 S1/><path d="M16 22 L24 26 M48 22 L40 26 M14 30 L22 32 M50 30 L42 32" S2/><polygon points="22,26 28,29 24,32" fill="#ffffff"/><polygon points="42,26 36,29 40,32" fill="#ffffff"/><polygon points="28,38 36,38 32,44" fill="#ffffff"/><path d="M24 44 L28 50 M40 44 L36 50" stroke="#ffffff" stroke-width="2"/>`,
    "p_high_mana_ore": `<polygon points="32,6 40,20 38,48 26,48 24,20" fill="#ffffff" S1/><polygon points="18,16 26,26 26,48 14,48 12,28" F1 S1/><polygon points="46,14 52,26 50,48 38,48 38,26" F1 S1/><polygon points="8,46 56,46 50,56 14,56" F1 S2/>`,

    // ==================== 3. ARMERÍA: 16 ARMAS ====================
    "eq_w_kim": `<g transform="rotate(35 32 32)"><polygon points="32,4 36,14 35,44 29,44 28,14" F1 S1/><line x1="32" y1="8" x2="32" y2="42" stroke="#ffffff" stroke-width="1.8"/><path d="M18 44 L46 44 M30 44 L30 56 L34 56 L34 44" S1/><circle cx="32" cy="58" r="3" fill="#ffffff"/></g>`,
    "eq_w_goblin": `<g transform="rotate(35 32 32)"><path d="M32 6 C42 16 42 30 35 42 L27 42 C29 30 26 18 32 6 Z" F1 S1/><path d="M22 42 L40 42 M31 42 L31 56" S1/><line x1="33" y1="12" x2="33" y2="38" stroke="#ffffff" stroke-width="1.8"/></g>`,
    "eq_w_razor": `<g transform="rotate(35 32 32)"><path d="M34 6 C22 18 22 32 27 44 L37 44 L34 34 L39 30 L34 22 L39 18 Z" F1 S1/><path d="M22 44 L42 44 M30 44 L30 56 L34 56 L34 44" S1/><path d="M29 14 L27 38" stroke="#ffffff" stroke-width="2"/></g>`,
    "eq_w_iron_mace": `<g transform="rotate(35 32 32)"><polygon points="32,4 44,12 44,26 32,32 20,26 20,12" F1 S1/><polygon points="32,8 38,14 38,24 32,28 26,24 26,14" fill="#ffffff"/><path d="M16 14 L20 16 M48 14 L44 16 M16 24 L20 22 M48 24 L44 22 M32 32 L32 58 M28 56 L36 56" S1/></g>`,
    "eq_w_arachnid": `<g transform="rotate(35 32 32)"><polygon points="32,4 37,22 34,42 30,42 27,22" F1 S1/><path d="M27 42 C18 38 18 48 24 50 M37 42 C46 38 46 48 40 50 M32 42 L32 58" S1/><line x1="32" y1="8" x2="32" y2="40" stroke="#ffffff" stroke-width="2"/></g>`,
    "eq_w_bow": `<path d="M20 6 C44 14 48 26 38 32 C48 38 44 50 20 58" S1/><line x1="20" y1="6" x2="20" y2="58" S2/><line x1="10" y1="32" x2="54" y2="32" stroke="#ffffff" stroke-width="2.4"/><polygon points="56,32 46,27 48,32 46,37" fill="#ffffff"/>`,
    "eq_w1": `<g transform="rotate(35 32 32)"><path d="M32 4 C40 14 40 28 36 42 L26 42 L29 34 L24 30 L29 22 L24 18 Z" F1 S1/><path d="M33 10 C36 20 36 30 33 40" stroke="#ffffff" stroke-width="2"/><polygon points="20,42 44,42 40,47 24,47" F1 S1/><path d="M31 47 L31 58" S1/></g>`,
    "eq_w_killer": `<g transform="rotate(35 32 32)"><polygon points="32,4 40,14 35,20 40,26 35,32 40,38 36,44 27,44 27,14" F1 S1/><line x1="30" y1="10" x2="30" y2="42" stroke="#ffffff" stroke-width="2"/><polygon points="18,42 46,46 42,50 22,46" F1 S1/><line x1="32" y1="46" x2="32" y2="58" S1/></g>`,
    "eq_w_halberd": `<line x1="16" y1="56" x2="46" y2="8" S1/><polygon points="46,8 50,2 42,12" fill="#ffffff" S1/><path d="M38 16 C56 12 58 32 32 32 Z" F1 S1/><polygon points="36,18 24,14 32,24" fill="#ffffff" S2/>`,
    "eq_w_baruka": `<g transform="rotate(35 32 32)"><path d="M32 4 C36 16 36 30 34 44 L28 44 C28 30 28 16 32 4 Z" fill="#ffffff" S1/><path d="M22 44 L42 44 M31 44 L31 58" S1/><path d="M18 20 C26 14 38 14 46 20 M16 30 C26 24 38 24 48 30" S2/></g>`,
    "eq_w_kargalgan": `<circle cx="32" cy="32" r="14" F1 S1/><circle cx="32" cy="32" r="6" fill="#ffffff"/><path d="M18 32 C18 16 32 12 32 12 M46 32 C46 48 32 52 32 52 M32 18 L28 10 M46 32 L54 28 M18 32 L10 36" S2/><ellipse cx="32" cy="32" rx="24" ry="8" transform="rotate(-30 32 32)" S1/>`,
    "eq_w_vulcan_club": `<g transform="rotate(35 32 32)"><polygon points="22,6 42,6 46,38 18,38" F1 S1/><polygon points="18,12 10,16 18,20" fill="#ffffff"/><polygon points="46,12 54,16 46,20" fill="#ffffff"/><polygon points="18,26 10,30 18,34" fill="#ffffff"/><polygon points="46,26 54,30 46,34" fill="#ffffff"/><polyline points="28,10 34,20 28,28 34,36" stroke="#ffffff" stroke-width="2"/><rect x="29" y="38" width="6" height="18" F1 S1/></g>`,
    "eq_w_scythe": `<line x1="18" y1="58" x2="46" y2="10" S1/><path d="M44 12 C22 2 6 14 8 34 C18 20 32 18 40 24 Z" F1 S1/><path d="M42 14 C24 8 12 16 12 28" stroke="#ffffff" stroke-width="2"/>`,
    "eq_w_demon_daggers": `<g transform="rotate(30 32 32)"><polygon points="24,8 29,20 27,44 21,44 19,20" F1 S1/><path d="M16 44 L32 44 M24 44 L24 56" S1/></g><g transform="rotate(-30 32 32)"><polygon points="40,8 45,20 43,44 37,44 35,20" fill="#ffffff" S1/><path d="M32 44 L48 44 M40 44 L40 56" S1/></g>`,
    "eq_w_demon_sword": `<g transform="rotate(35 32 32)"><polygon points="32,2 38,16 36,44 28,44 26,16" F1 S1/><polyline points="32,6 29,18 35,26 30,38" stroke="#ffffff" stroke-width="2.2"/><path d="M16 40 L32 46 L48 40 L42 46 L22 46 Z" fill="#ffffff" S1/><line x1="32" y1="46" x2="32" y2="58" S1/></g>`,
    "eq_w_kamish": `<path d="M10 48 C10 24 24 10 48 8 C34 20 26 32 24 48 Z" F1 S1/><path d="M54 48 C54 24 40 10 16 8 C30 20 38 32 40 48 Z" F1 S1/><path d="M14 44 C16 26 26 16 42 12 M50 44 C48 26 38 16 22 12" stroke="#ffffff" stroke-width="2"/><path d="M18 48 L12 58 M46 48 L52 58" S1/>`,

    // ==================== 4. ARMERÍA: 14 ARMADURAS ====================
    "eq_a_leather": `<polygon points="18,12 26,18 38,18 46,12 52,22 46,54 18,54 12,22" F1 S1/><line x1="20" y1="14" x2="44" y2="52" S2/><line x1="44" y1="14" x2="20" y2="52" S2/><rect x="27" y="30" width="10" height="6" fill="#ffffff" S1/>`,
    "eq_a_boots_e": `<path d="M22 10 L38 10 L38 36 L52 42 L52 54 L18 54 L18 10 Z" F1 S1/><path d="M18 50 L52 50 M22 20 L38 20 M22 28 L38 28" S2/><polygon points="34,14 34,36 46,42 38,42 30,36 30,14" fill="#ffffff"/>`,
    "eq_a_serpento": `<polygon points="14,14 26,10 32,20 38,10 50,14 56,28 48,32 46,24 44,54 20,54 18,24 16,32 8,28" F1 S1/><polyline points="24,14 32,30 40,14" stroke="#ffffff" stroke-width="2"/><line x1="34" y1="28" x2="34" y2="52" S2/>`,
    "eq_a_helm_d": `<path d="M16 26 C16 8 48 8 48 26 L46 50 L32 56 L18 50 Z" F1 S1/><polygon points="20,28 44,28 42,33 34,33 34,48 30,48 30,33 22,33" fill="#ffffff"/><line x1="32" y1="8" x2="32" y2="24" S2/>`,
    "eq_a_gloves_c": `<polygon points="18,28 18,12 23,12 23,24 27,10 32,10 32,24 36,12 41,12 41,26 47,20 51,24 44,54 20,54" F1 S1/><path d="M22 34 L32 28 L42 34 M22 42 L32 36 L42 42" stroke="#ffffff" stroke-width="1.8"/>`,
    "eq_a_assassin": `<path d="M32 6 C16 10 10 26 12 54 L52 54 C54 26 48 10 32 6 Z" F1 S1/><polygon points="32,14 20,38 32,34 44,38" fill="#020817" S2/><polygon points="24,28 30,31 26,33" fill="#ffffff"/><polygon points="40,28 34,31 38,33" fill="#ffffff"/>`,
    "eq_a_mage_b": `<polygon points="20,10 32,16 44,10 56,24 48,34 44,26 48,56 16,56 20,26 16,34 8,24" F1 S1/><polygon points="27,14 32,52 37,14" S2/><polygon points="32,20 36,28 32,36 28,28" fill="#ffffff"/>`,
    "eq_a1": `<path d="M32 14 C20 2 10 8 8 20 C18 14 26 14 32 14 Z" fill="#ffffff" S1/><polygon points="12,18 32,24 52,18 58,28 46,52 32,58 18,52 6,28" F1 S1/><path d="M22 28 L32 35 L42 28 M24 36 L32 43 L40 36 M26 44 L32 50 L38 44" stroke="#ffffff" stroke-width="2"/>`,
    "eq_a_high_orc": `<path d="M12 20 L6 8 L18 16 M52 20 L58 8 L46 16" fill="#ffffff" S1/><polygon points="10,18 26,14 32,22 38,14 54,18 50,32 44,30 44,54 20,54 20,30 14,32" F1 S1/><polygon points="26,28 38,28 32,44" S2/>`,
    "eq_a_valkyrie": `<path d="M26 14 L38 14 L36 54 L28 54 Z" F1 S1/><path d="M26 20 L6 8 L12 24 L8 32 L26 38 Z M38 20 L58 8 L52 24 L56 32 L38 38 Z" fill="#ffffff" S1/>`,
    "eq_a_archlich": `<circle cx="32" cy="30" r="22" S2 stroke-dasharray="4 3"/><polygon points="18,12 32,6 46,12 52,56 12,56" F1 S1/><polygon points="32,18 38,28 32,38 26,28" fill="#ffffff"/><path d="M22 44 L42 44 M24 50 L40 50" S2/>`,
    "eq_a_giant": `<polygon points="8,16 24,10 32,16 40,10 56,16 58,32 46,56 18,56 6,32" F1 S1/><polygon points="32,22 40,32 32,44 24,32" fill="#ffffff" S2/><path d="M12 24 L24 32 M52 24 L40 32 M18 48 L26 40 M46 48 L38 40" S2/>`,
    "eq_a_beru": `<path d="M22 20 L4 6 L10 30 L6 44 L20 38 M42 20 L60 6 L54 30 L58 44 L44 38" F1 S2/><polygon points="20,14 32,10 44,14 46,52 32,58 18,52" F1 S1/><polygon points="26,22 32,30 38,22 35,46 32,52 29,46" fill="#ffffff"/>`,
    "eq_a_ashborn": `<polygon points="20,14 16,4 26,10 32,2 38,10 48,4 44,14" fill="#ffffff" S1/><polygon points="8,20 26,16 32,24 38,16 56,20 50,34 46,56 32,60 18,56 14,34" F1 S1/><polygon points="32,28 39,36 32,48 25,36" fill="#ffffff" S2/>`,

    // ==================== 5. ARMERÍA: 10 ACCESORIOS ====================
    "eq_acc_copper": `<ellipse cx="32" cy="36" rx="18" ry="14" S1/><ellipse cx="32" cy="36" rx="13" ry="9" S2/><polygon points="32,12 40,22 32,28 24,22" fill="#ffffff" S1/>`,
    "eq_acc_wolf": `<path d="M14 12 Q32 26 50 12" S2/><polygon points="26,18 38,18 36,24 28,24" F1 S1/><polygon points="28,24 36,24 32,54" fill="#ffffff" S1/>`,
    "eq_acc_silver": `<polygon points="32,6 52,18 52,44 32,56 12,44 12,18" F1 S1/><path d="M32 14 L32 48 M20 26 L32 22 L44 26" stroke="#ffffff" stroke-width="2.2"/><circle cx="32" cy="32" r="12" S2/>`,
    "eq_acc_cerberus": `<path d="M10 18 Q32 32 54 18" S1/><polygon points="18,22 22,42 26,25" fill="#ffffff" S1/><polygon points="28,26 32,52 36,26" fill="#ffffff" S1/><polygon points="38,25 42,42 46,22" fill="#ffffff" S1/>`,
    "eq_acc_gate": `<path d="M16 24 A16 14 0 1 1 16 40" S1/><path d="M22 26 A10 9 0 1 1 22 38" S2/><rect x="10" y="20" width="8" height="8" F1 S1/><rect x="10" y="36" width="8" height="8" F1 S1/><polygon points="38,28 44,32 38,36" fill="#ffffff"/>`,
    "eq_acc_metus": `<path d="M18 10 L32 24 L46 10" S2 stroke-dasharray="3 2"/><polygon points="26,22 38,22 44,34 38,56 26,56 20,34" F1 S1/><circle cx="32" cy="36" r="4" fill="#ffffff"/>`,
    "eq_acc_kandiaru": `<polygon points="32,8 52,44 12,44" F1 S1/><polygon points="32,56 52,20 12,20" F1 S1/><circle cx="32" cy="32" r="6" fill="#ffffff"/>`,
    "eq_acc_national": `<polygon points="32,6 37,24 56,24 41,35 46,54 32,42 18,54 23,35 8,24 27,24" F1 S1/><polygon points="32,16 36,28 48,32 36,36 32,48 28,36 16,32 28,28" fill="#ffffff"/>`,
    "eq_acc_chalice": `<polygon points="18,10 46,10 40,26 24,26" F1 S1/><polygon points="26,30 38,30 34,42 30,42" F1 S1/><path d="M32 42 L32 54 M20 54 L44 54" S1/><circle cx="32" cy="28" r="22" S2 stroke-dasharray="4 3"/>`,
"eq_acc_black_heart": `<path d="M8 20 L24 28 M56 20 L40 28 M8 44 L24 36 M56 44 L40 36 M32 6 L32 18 M32 46 L32 58" S2/><polygon points="32,14 48,28 32,50 16,28" F1 S1/><polygon points="32,22 40,30 32,42 24,30" fill="#ffffff"/>`,
"eq_h_crimson": `<path d="M32 6 C18 6 10 18 14 34 L22 54 L32 46 L42 54 L50 34 C54 18 46 6 32 6 Z" F1 S1/><path d="M32 6 L20 22 L32 18 L44 22 Z" fill="#ffffff"/><path d="M18 32 L28 38 L22 46 M46 32 L36 38 L42 46" S2/>`,
    "eq_h_shadow": `<polygon points="32,4 48,16 52,42 38,56 26,56 12,42 16,16" F1 S1/><polygon points="20,28 30,33 24,36" fill="#ffffff"/><polygon points="44,28 34,33 40,36" fill="#ffffff"/><polyline points="24,14 32,24 40,14" S2/>`,
    "eq_g_low": `<path d="M16 38 L28 14 L46 20 L38 48 L22 54 Z" F1 S1/><line x1="24" y1="24" x2="42" y2="30" S2/><line x1="20" y1="34" x2="38" y2="40" S2/>`,
    "eq_g_high": `<path d="M14 42 L26 10 L48 18 L40 50 L20 56 Z" F1 S1/><polygon points="28,16 42,22 36,42 22,36" fill="rgba(255,255,255,0.22)" S2/><circle cx="32" cy="30" r="3" fill="#ffffff"/>`,
    "eq_g_monarch": `<polygon points="14,44 24,8 50,16 42,52 20,58" F1 S1/><path d="M24 16 L34 28 L46 22 M20 30 L32 42 L42 36" stroke="#ffffff" stroke-width="2"/>`,
    "eq_r_mage": `<ellipse cx="32" cy="36" rx="16" ry="12" transform="rotate(-20 32 36)" F1 S1/><circle cx="28" cy="22" r="6" fill="#ffffff" S1/><path d="M22 18 L34 18" S2/>`,
    "eq_b_mid": `<path d="M22 8 L38 12 L34 38 L50 46 L48 56 L18 52 Z" F1 S1/><line x1="22" y1="22" x2="36" y2="25" S2/><line x1="20" y1="34" x2="34" y2="37" S2/>`,
    "eq_b_shadow": `<path d="M20 6 L40 10 L36 36 L54 44 L50 56 L16 52 Z" F1 S1/><polygon points="24,14 36,16 32,36 22,34" fill="#ffffff"/>`,

    // ==================== 6. PRIVILEGIOS REALES (28 DISEÑOS NUEVOS) ====================
    "v_music": `<path d="M14 34 L14 26 A18 18 0 0 1 50 26 L50 34" S1/><rect x="8" y="30" width="10" height="18" rx="4" F1 S1/><rect x="46" y="30" width="10" height="18" rx="4" F1 S1/><path d="M24 38 L24 30 M29 42 L29 24 M35 42 L35 26 M40 38 L40 30" stroke="#ffffff" stroke-width="2.2"/>`,
    "v_hot_shower": `<path d="M12 10 L32 10 L42 20 L18 20 Z" F1 S1/><line x1="8" y1="10" x2="16" y2="10" S1/><path d="M22 26 L18 38 M30 26 L28 42 M38 26 L36 38 M24 44 L22 54 M34 44 L32 54" stroke="#ffffff" stroke-width="2"/><path d="M46 34 Q52 28 46 22 M48 48 Q54 42 48 36" S2/>`,
    "v_retro_music": `<circle cx="28" cy="34" r="20" F1 S1/><circle cx="28" cy="34" r="12" S2 stroke-dasharray="4 3"/><circle cx="28" cy="34" r="5" fill="#ffffff"/><polyline points="48,10 52,26 38,34" S1/>`,
    "v1": `<rect x="18" y="8" width="28" height="48" rx="4" F1 S1/><line x1="28" y1="50" x2="36" y2="50" S2/><polygon points="28,22 40,29 28,36" fill="#ffffff"/>`,
    "v_snack": `<path d="M20 26 L44 26 L40 54 L24 54 Z" F1 S1/><path d="M18 26 C18 14 46 14 46 26 Z" fill="#ffffff" S1/><line x1="36" y1="16" x2="42" y2="6" S1/><line x1="22" y1="36" x2="42" y2="36" S2/>`,
    "v_brother": `<path d="M12 22 L52 22 C56 22 58 40 50 46 L42 38 L22 38 L14 46 C6 40 8 22 12 22 Z" F1 S1/><path d="M20 27 L20 33 M17 30 L23 30" stroke="#ffffff" stroke-width="2"/><circle cx="44" cy="28" r="2" fill="#ffffff"/><circle cx="40" cy="32" r="2" fill="#ffffff"/>`,
    "v_tech_tinker": `<rect x="18" y="18" width="28" height="28" rx="3" F1 S1/><polygon points="32,24 40,32 32,40 24,32" fill="#ffffff"/><path d="M24 8 L24 18 M32 8 L32 18 M40 8 L40 18 M24 46 L24 56 M32 46 L32 56 M40 46 L40 56 M8 24 L18 24 M8 32 L18 32 M8 40 L18 40 M46 24 L56 24 M46 32 L56 32 M46 40 L56 40" S2/>`,
    "v_nap": `<path d="M36 10 A20 20 0 1 0 54 38 A15 15 0 0 1 36 10 Z" F1 S1/><polygon points="40,16 43,22 49,22 44,26 46,32 40,28 34,32 36,26 31,22 37,22" fill="#ffffff"/>`,
    "v_fandub": `<rect x="24" y="8" width="16" height="26" rx="8" F1 S1/><line x1="24" y1="18" x2="40" y2="18" S2/><line x1="24" y1="24" x2="40" y2="24" S2/><path d="M16 22 A16 16 0 0 0 48 22 M32 38 L32 54 M20 54 L44 54" S1/><circle cx="16" cy="34" r="5" fill="rgba(255,255,255,0.25)" S2/>`,
    "v_ibispaint": `<rect x="10" y="20" width="38" height="32" rx="3" F1 S1/><polygon points="52,8 56,12 32,36 24,38 26,30" fill="#ffffff" S1/><path d="M16 44 Q24 34 36 44" S2/>`,
    "v_capcut": `<rect x="8" y="14" width="48" height="36" rx="2" F1 S1/><path d="M8 22 L56 22 M8 42 L56 42 M18 14 L18 22 M32 14 L32 22 M46 14 L46 22 M18 42 L18 50 M32 42 L32 50 M46 42 L46 50" S2/><polygon points="27,26 39,32 27,38" fill="#ffffff"/>`,
    "v_mc": `<polygon points="32,10 52,20 52,44 32,54 12,44 12,20" F1 S1/><polyline points="12,20 32,30 52,20" S1/><line x1="32" y1="30" x2="32" y2="54" S1/><polygon points="32,10 52,20 32,30 12,20" fill="rgba(255,255,255,0.22)"/>`,
    "v5": `<polygon points="14,34 12,16 24,24 32,12 40,24 52,16 50,34" F1 S1/><polygon points="32,28 40,42 32,56 24,42" fill="#ffffff" S1/><circle cx="32" cy="40" r="2.5" fill="#030818"/>`,
    "v_pepakura": `<polygon points="32,6 52,18 48,44 32,58 16,44 12,18" F1 S1/><path d="M32 6 L32 58 M12 18 L52 18 M16 44 L48 44 M12 18 L32 34 L52 18 M16 44 L32 34 L48 44" S2/><polygon points="20,24 28,28 22,30" fill="#ffffff"/><polygon points="44,24 36,28 42,30" fill="#ffffff"/>`,
    "v3": `<path d="M20 10 C16 20 18 28 18 42 C18 50 46 50 46 42 C46 28 48 20 44 10 L38 22 L26 22 Z" F1 S1/><circle cx="26" cy="34" r="3.5" fill="#fff"/><circle cx="38" cy="34" r="3.5" fill="#fff"/>`, 
    "v4": `<path d="M12 46 A22 22 0 1 1 52 46" F1 S1/><path d="M16 42 L20 38 M14 28 L20 29 M22 16 L26 21 M32 12 L32 18 M42 16 L38 21 M50 28 L44 29" S2/><line x1="32" y1="36" x2="46" y2="22" stroke="#ffffff" stroke-width="2.6"/><circle cx="32" cy="36" r="4" fill="#ffffff"/>`,
    "v_zelda": `<polygon points="32,8 42,24 22,24" fill="#ffffff" S1/><polygon points="22,24 32,40 12,40" F1 S1/><polygon points="42,24 52,40 32,40" F1 S1/><line x1="32" y1="4" x2="32" y2="58" stroke="#ffffff" stroke-width="2.2"/><path d="M22 46 L42 46" S1/>`,
    "v_anime": `<rect x="8" y="12" width="48" height="32" rx="2" F1 S1/><path d="M22 52 L42 52 M32 44 L32 52" S1/><path d="M16 24 L28 28 L18 32 Z M48 24 L36 28 L46 32 Z" fill="#ffffff"/>`,
    "v_dance": `<circle cx="34" cy="12" r="5" fill="#ffffff"/><path d="M20 22 L34 20 L46 12 M34 20 L30 34 L20 48 M30 34 L42 40 L40 52" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="32" cy="54" rx="20" ry="4" F1 S2/>`,
    "v_movie_night": `<rect x="10" y="24" width="44" height="28" rx="2" F1 S1/><polygon points="10,24 54,14 52,8 8,18" fill="#ffffff" S1/><polygon points="28,32 38,38 28,44" fill="#ffffff"/>`,
    "v_moto_ride": `<circle cx="15" cy="42" r="9" F1 S1/><circle cx="15" cy="42" r="3.5" fill="#ffffff"/><circle cx="49" cy="42" r="9" F1 S1/><circle cx="49" cy="42" r="3.5" fill="#ffffff"/><polygon points="15,42 25,26 38,26 46,18 52,24 49,42 36,38 24,38" F1 S1/><line x1="42" y1="20" x2="49" y2="42" stroke="#ffffff" stroke-width="2"/><polygon points="52,22 60,20 58,26" fill="#ffffff"/><path d="M6 26 L16 26 M4 32 L12 32" S2/>`,
    "v_fastfood": `<path d="M12 28 C12 12 52 12 52 28 Z" F1 S1/><line x1="10" y1="34" x2="54" y2="34" stroke="#ffffff" stroke-width="3"/><path d="M14 40 L50 40 L46 50 L18 50 Z" F1 S1/><circle cx="24" cy="20" r="1.5" fill="#ffffff"/><circle cx="32" cy="18" r="1.5" fill="#ffffff"/><circle cx="40" cy="20" r="1.5" fill="#ffffff"/>`,
    "v_late_wake": `<line x1="6" y1="44" x2="58" y2="44" S1/><path d="M16 44 A16 16 0 0 1 48 44" fill="#ffffff" S1/><path d="M32 12 L32 20 M14 20 L20 26 M50 20 L44 26 M16 52 L48 52" S2/>`,
    "v6_creator": `<rect x="12" y="18" width="28" height="20" rx="2" F1 S1/><polygon points="40,22 54,14 54,34 40,26" fill="#ffffff" S1/><path d="M26 38 L16 56 M26 38 L26 56 M26 38 L36 56" S1/><circle cx="22" cy="12" r="5" F1 S2/><circle cx="34" cy="12" r="5" F1 S2/>`,
    "v6": `<g transform="rotate(-15 26 34)"><rect x="12" y="18" width="24" height="34" rx="2" F1 S1/></g><g transform="rotate(15 38 34)"><rect x="28" y="18" width="24" height="34" rx="2" F1 S1/><polygon points="40,28 43,34 49,34 44,38 46,44 40,40 34,44 36,38 31,34 37,34" fill="#ffffff"/></g>`,
    "v_streak_shield": `<path d="M10 16 L4 10 L12 26 M54 16 L60 10 L52 26" S2/><path d="M14 12 L50 12 L48 36 L32 56 L16 36 Z" F1 S1/><polygon points="22,22 25,14 32,20 39,14 42,22" fill="#ffffff"/><polygon points="32,26 38,36 32,46 26,36" fill="#ffffff"/>`,
    "v_shopping": `<polygon points="14,22 50,22 54,54 10,54" F1 S1/><path d="M22 22 L22 14 A10 10 0 0 1 42 14 L42 22" S1/><polygon points="32,28 38,38 32,48 26,38" fill="#ffffff"/>`,
    "v7": `<rect x="6" y="16" width="52" height="32" rx="3" F1 S1/><line x1="18" y1="16" x2="18" y2="48" S2 stroke-dasharray="3 3"/><polygon points="26,38 28,24 35,30 42,24 44,38" fill="#ffffff" S1/>`,

    // ==================== 7. ESPECIALES DEL SISTEMA (5) ====================
    "lunch_ticket": `<path d="M12 38 A20 20 0 0 1 52 38 Z" F1 S1/><circle cx="32" cy="14" r="3" fill="#ffffff"/><line x1="6" y1="42" x2="58" y2="42" S1/><path d="M20 50 L44 50" S2/>`,
    "work_pass": `<rect x="14" y="10" width="36" height="46" rx="3" F1 S1/><line x1="26" y1="16" x2="38" y2="16" S2/><circle cx="32" cy="30" r="8" S1/><polyline points="28,30 31,34 37,26" stroke="#ffffff" stroke-width="2.4"/><line x1="22" y1="46" x2="42" y2="46" S2/>`,
    "box_start": `<path d="M10 26 L54 26 L52 54 L12 54 Z" F1 S1/><path d="M14 26 L22 12 L42 12 L50 26" F1 S1/><rect x="26" y="22" width="12" height="8" rx="1" fill="#ffffff" S1/><path d="M32 30 L32 54" S1/>`,
    "box_week": `<path d="M12 26 L52 26 L50 54 L14 54 Z" F1 S1/><path d="M12 26 L20 10 L44 10 L52 26" F1 S1/><rect x="24" y="22" width="16" height="8" rx="1" fill="#ffffff" S1/><path d="M32 30 L32 54 M12 26 L52 26" S1/>`,
    "box_deluxe": `<path d="M10 28 L54 28 L52 56 L12 56 Z" F1 S1/><path d="M10 28 L24 8 L40 8 L54 28" F1 S1/><polygon points="32,18 40,28 32,38 24,28" fill="#ffffff" S1/><path d="M32 38 L32 56 M10 28 L54 28" S1/>`
};

const UNIQUE_LOOT_SVGS = {
    // ==================== 8. LOS 52 BOTINES Y MINERALES DE MAZMORRA ====================
    "tuerca oxidada de mazmorra": `<polygon points="32,8 52,19 52,45 32,56 12,45 12,19" F1 S1/><circle cx="32" cy="32" r="10" fill="#030818" S1/><circle cx="32" cy="32" r="15" S2 stroke-dasharray="4 3"/>`,
    "cable pelado de cobre": `<rect x="8" y="26" width="22" height="12" rx="2" F1 S1/><path d="M30 28 Q42 20 54 16 M30 32 L56 32 M30 36 Q42 44 54 48" stroke="#ffffff" stroke-width="2.2"/>`,
    "engranaje de golem roto": `<circle cx="32" cy="32" r="15" F1 S1/><circle cx="32" cy="32" r="6" fill="#030818" S1/><path d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32 M15 15 L21 21 M43 43 L49 49 M49 15 L43 21 M15 49 L21 43" stroke="#ffffff" stroke-width="3"/>`,
    "plástico fundido de escombro": `<polygon points="14,48 10,30 22,16 40,12 54,26 48,50 28,54" F1 S1/><polygon points="24,24 38,22 42,36 26,40" S2/>`,
    "bujía desgastada de serpento": `<path d="M32 6 L32 12 M26 12 L38 12 L38 26 L26 26 Z" F1 S1/><polygon points="22,26 42,26 38,38 26,38" fill="#ffffff" S1/><rect x="27" y="38" width="10" height="14" F1 S1/><path d="M32 52 L32 58 L38 58" S2/>`,
    "perno de chasis suelto": `<polygon points="16,10 48,10 44,20 20,20" fill="#ffffff" S1/><rect x="25" y="20" width="14" height="36" F1 S1/><path d="M25 28 L39 32 M25 36 L39 40 M25 44 L39 48" S2/>`,
    "llave doblada de candado": `<circle cx="18" cy="18" r="9" F1 S1/><circle cx="18" cy="18" r="3" fill="#ffffff"/><polyline points="25,24 38,30 34,46 48,52" S1/><path d="M36 40 L44 43 M40 49 L44 44" S2/>`,
    "goma de neumático quemada": `<circle cx="32" cy="32" r="20" F1 S1/><circle cx="32" cy="32" r="9" fill="#030818" S1/><path d="M22 14 L26 22 M42 14 L38 22 M50 32 L42 32 M14 32 L22 32 M22 50 L26 42 M42 50 L38 42" stroke="#ffffff" stroke-width="2"/>`,
    "resorte de embrague tensor": `<path d="M18 12 L46 12 L18 22 L46 22 L18 32 L46 32 L18 42 L46 42 L18 52 L46 52" S1/><line x1="22" y1="8" x2="42" y2="8" stroke="#ffffff" stroke-width="2.5"/><line x1="22" y1="56" x2="42" y2="56" stroke="#ffffff" stroke-width="2.5"/>`,
    "filtro de aire obstruido": `<polygon points="16,12 48,12 42,52 22,52" F1 S1/><line x1="14" y1="12" x2="50" y2="12" stroke="#ffffff" stroke-width="2.5"/><line x1="20" y1="52" x2="44" y2="52" stroke="#ffffff" stroke-width="2.5"/><path d="M24 18 L26 46 M32 18 L32 46 M40 18 L38 46" S2/>`,
    "tornillo de mariposa m8": `<path d="M32 22 C16 6 8 18 22 28 L42 28 C56 18 48 6 32 22 Z" fill="#ffffff" S1/><rect x="27" y="28" width="10" height="26" F1 S1/><path d="M27 36 L37 39 M27 44 L37 47" S2/>`,
    "lata de refresco abollada": `<polygon points="20,10 44,10 46,24 38,32 45,42 42,54 22,54 18,40 25,30 18,20" F1 S1/><line x1="20" y1="10" x2="44" y2="10" stroke="#ffffff" stroke-width="2.5"/><path d="M25 30 L38 32" S2/>`,
    "placa base frita de laptop": `<rect x="10" y="10" width="44" height="44" rx="2" F1 S1/><rect x="23" y="23" width="18" height="18" fill="#ffffff" S1/><path d="M10 20 L23 20 M10 32 L23 32 M41 26 L54 26 M41 38 L54 38 M28 10 L28 23 M36 41 L36 54" S2/>`,
    "tapón de válvula de aire": `<rect x="26" y="8" width="12" height="8" fill="#ffffff" S1/><polygon points="20,16 44,16 46,48 18,48" F1 S1/><path d="M26 22 L25 42 M32 22 L32 42 M38 22 L39 42" S2/>`,
    "fusible de filamento quemado": `<rect x="20" y="8" width="24" height="10" rx="2" fill="#ffffff" S1/><rect x="20" y="46" width="24" height="10" rx="2" fill="#ffffff" S1/><rect x="22" y="18" width="20" height="28" F1 S1/><polyline points="32,18 26,28 38,36 32,46" S2/>`,
    "clavo retorcido de madera": `<line x1="14" y1="12" x2="32" y2="12" stroke="#ffffff" stroke-width="3"/><polyline points="23,12 23,28 40,34 34,54" S1/><polyline points="20,12 20,30 36,36 34,54" S2/>`,
    "pedazo de alambre galvanizado": `<circle cx="32" cy="32" r="18" S1/><ellipse cx="32" cy="32" rx="22" ry="12" transform="rotate(30 32 32)" S2/><path d="M10 24 L18 28 M46 36 L54 40" stroke="#ffffff" stroke-width="2.2"/>`,
    "arandela de presión deformada": `<circle cx="32" cy="32" r="20" F1 S1/><circle cx="32" cy="32" r="10" fill="#030818" S1/><polygon points="44,14 52,22 42,26" fill="#ffffff"/>`,
    "carbón de motor desgastado": `<polygon points="18,16 46,16 42,48 22,48" F1 S1/><path d="M32 6 L32 16 M24 24 L40 24 M24 32 L40 32 M24 40 L40 40" S2/><circle cx="32" cy="54" r="2.5" fill="#ffffff"/>`,
    "tapa de combustible rompible": `<circle cx="32" cy="32" r="20" F1 S1/><circle cx="32" cy="32" r="14" S2 stroke-dasharray="4 3"/><rect x="18" y="28" width="28" height="8" rx="2" fill="#ffffff" S1/>`,
    "cristal de maná opaco": `<polygon points="32,6 48,22 40,56 24,56 16,22" F1 S1/><line x1="32" y1="6" x2="32" y2="56" S2/><polyline points="16,22 32,28 48,22" S2/><polygon points="32,6 48,22 32,28" fill="rgba(255,255,255,0.28)"/>`,
    "fragmento de espejo ilusorio": `<polygon points="20,8 50,16 46,48 24,56 12,32" F1 S1/><line x1="22" y1="18" x2="40" y2="36" stroke="#ffffff" stroke-width="2.5"/><line x1="18" y1="28" x2="32" y2="42" S2/>`,
    "retazo de cuero de bestia": `<path d="M14 12 Q32 20 50 12 Q42 32 50 52 Q32 44 14 52 Q22 32 14 12 Z" F1 S1/><path d="M24 24 L40 40 M28 20 L44 36 M20 28 L36 44" stroke="#ffffff" stroke-width="1.8"/>`,
    "polvo de esencia mágica": `<path d="M12 50 Q32 34 52 50 Z" F1 S1/><polygon points="32,10 36,22 48,26 36,30 32,42 28,30 16,26 28,22" fill="#ffffff" S1/><circle cx="18" cy="16" r="2" fill="#ffffff"/><circle cx="46" cy="18" r="2" fill="#ffffff"/>`,
    "colmillo afilado de monstruo": `<path d="M20 8 C16 32 26 48 46 56 C38 38 36 24 38 10 Z" F1 S1/><path d="M24 14 C22 30 28 42 40 50" stroke="#ffffff" stroke-width="2"/><line x1="18" y1="14" x2="39" y2="16" S2/>`,
    "esencia destilada de orco": `<path d="M26 8 L38 8 M29 8 L29 18 L48 34 C52 42 46 54 32 54 C18 54 12 42 16 34 L35 18 L35 8" F1 S1/><polygon points="32,28 38,38 32,48 26,38" fill="#ffffff"/>`,
    "fragmento de núcleo de golem": `<polygon points="32,6 54,20 48,48 32,58 16,48 10,20" F1 S1/><circle cx="32" cy="32" r="9" fill="#ffffff" S1/><path d="M32 6 L32 23 M54 20 L40 28 M48 48 L38 38 M16 48 L26 38 M10 20 L24 28" S2/>`,
    "moneda del antiguo imperio": `<circle cx="32" cy="32" r="22" F1 S1/><circle cx="32" cy="32" r="17" S2/><rect x="25" y="25" width="14" height="14" transform="rotate(45 32 32)" fill="#030818" stroke="#ffffff" stroke-width="2"/>`,
    "anillo simbólico de cobre": `<circle cx="32" cy="34" r="18" S1/><circle cx="32" cy="34" r="12" S2/><polygon points="24,16 32,8 40,16 36,22 28,22" fill="#ffffff" S1/>`,
    "collar de cuentas manchado": `<circle cx="32" cy="28" r="18" S2 stroke-dasharray="2 5"/><circle cx="32" cy="10" r="3.5" F1 S1/><circle cx="16" cy="20" r="3.5" F1 S1/><circle cx="48" cy="20" r="3.5" F1 S1/><circle cx="16" cy="36" r="3.5" F1 S1/><circle cx="48" cy="36" r="3.5" F1 S1/><polygon points="32,42 38,50 32,58 26,50" fill="#ffffff" S1/>`,
    "reloj de bolsillo descompuesto": `<path d="M26 6 L38 6 M32 6 L32 14" S1/><circle cx="32" cy="35" r="19" F1 S1/><circle cx="32" cy="35" r="15" S2 stroke-dasharray="3 3"/><polyline points="32,22 32,35 42,40" stroke="#ffffff" stroke-width="2.5"/>`,
    "cáliz de plata de la aristocracia": `<polygon points="16,10 48,10 40,34 24,34" F1 S1/><path d="M32 34 L32 52 M18 52 L46 52 M24 44 L40 44" S1/><polygon points="32,16 37,24 32,30 27,24" fill="#ffffff"/>`,
    "gema de maná inferior": `<polygon points="32,6 52,32 32,58 12,32" F1 S1/><polygon points="32,14 44,32 32,50 20,32" fill="rgba(255,255,255,0.25)" S2/><line x1="12" y1="32" x2="52" y2="32" S2/>`,
    "pequeña estatua de duende": `<polygon points="22,18 10,12 20,26 16,52 48,52 44,26 54,12 42,18 32,8" F1 S1/><polygon points="24,24 30,27 26,29" fill="#ffffff"/><polygon points="40,24 34,27 38,29" fill="#ffffff"/><line x1="22" y1="42" x2="42" y2="42" S2/>`,
    "esquirla de luz divina": `<polygon points="32,4 38,26 60,32 38,38 32,60 26,38 4,32 26,26" fill="#ffffff" S1/><circle cx="32" cy="32" r="14" S2 stroke-dasharray="4 3"/>`,
    "gema de maná brillante": `<polygon points="20,10 44,10 56,24 32,56 8,24" F1 S1/><line x1="8" y1="24" x2="56" y2="24" S1/><polyline points="20,10 26,24 32,56 38,24 44,10" S1/><polygon points="26,24 38,24 32,48" fill="#ffffff"/>`,
    "gema de sangre de licántropo": `<polygon points="32,6 50,22 44,48 32,58 20,48 14,22" F1 S1/><polygon points="32,14 42,26 38,44 32,50 26,44 22,26" fill="#ffffff" S2/>`,
    "cofre de monedas pequeño": `<path d="M10 24 L20 12 L44 12 L54 24 Z" F1 S1/><rect x="12" y="24" width="40" height="28" rx="2" F1 S1/><circle cx="24" cy="24" r="3.5" fill="#ffffff"/><circle cx="32" cy="22" r="4" fill="#ffffff"/><circle cx="40" cy="24" r="3.5" fill="#ffffff"/>`,
    "escama menor de dragón": `<path d="M32 6 L52 20 C54 38 44 52 32 58 C20 52 10 38 12 20 Z" F1 S1/><path d="M32 14 L44 24 C45 36 38 46 32 50 C26 46 19 36 20 24 Z" S2/><line x1="32" y1="14" x2="32" y2="50" stroke="#ffffff" stroke-width="2"/>`,
    "reliquia perdida de los chorros": `<polygon points="22,8 42,8 38,18 48,32 42,54 22,54 16,32 26,18" F1 S1/><path d="M22 14 C10 14 10 28 18 30 M42 14 C54 14 54 28 46 30" S1/><polygon points="32,24 38,34 32,44 26,34" fill="#ffffff"/>`,
    "bolsa de oro pesada": `<path d="M22 14 L42 14 L36 22 C50 26 54 46 42 54 L22 54 C10 46 14 26 28 22 Z" F1 S1/><line x1="24" y1="22" x2="40" y2="22" stroke="#ffffff" stroke-width="2.5"/><polygon points="32,28 38,38 32,48 26,38" fill="#ffffff"/>`,
    "moneda de platino puro": `<circle cx="32" cy="32" r="22" F1 S1/><circle cx="32" cy="32" r="16" S2/><polygon points="32,12 37,27 52,32 37,37 32,52 27,37 12,32 27,27" fill="#ffffff"/>`,
    "lingote de oro macizo": `<polygon points="18,22 46,22 56,46 8,46" F1 S1/><polygon points="22,26 42,26 48,40 16,40" fill="#ffffff" S2/><path d="M32 8 L32 16 M18 12 L22 18 M46 12 L42 18" stroke="#ffffff" stroke-width="2"/>`,
    "corona fracturada del monarca": `<polygon points="10,48 8,20 22,30 32,10 42,30 56,20 54,48" F1 S1/><polygon points="32,18 37,28 32,38 27,28" fill="#ffffff"/><line x1="10" y1="42" x2="54" y2="42" S2/>`,
    "esencia pura de rango s": `<ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(35 32 32)" S2/><ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-35 32 32)" S2/><polygon points="32,14 42,32 32,50 22,32" fill="#ffffff" S1/>`,
    "autorización: comida rápida": `<path d="M12 26 C12 12 52 12 52 26 Z" F1 S1/><line x1="10" y1="33" x2="54" y2="33" stroke="#ffffff" stroke-width="3"/><path d="M14 40 L50 40 L46 50 L18 50 Z" F1 S1/>`,
    "reliquia del tiempo físico": `<circle cx="32" cy="32" r="24" S2 stroke-dasharray="4 3"/><polygon points="18,10 46,10 32,32 46,54 18,54 32,32" F1 S1/><circle cx="32" cy="32" r="4" fill="#ffffff"/>`,
    "amuleto de suerte académica": `<polygon points="32,8 40,22 32,30 24,22" fill="#ffffff" S1/><polygon points="56,32 42,40 34,32 42,24" F1 S1/><polygon points="32,56 24,42 32,34 40,42" F1 S1/><polygon points="8,32 22,24 30,32 22,40" F1 S1/>`
};

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

    // Paleta unificada Blanco-Celeste Brillante fiel al anime
    const strokeMain = "#ffffff";
    const strokeAccent = "#38bdf8";
    const fillGlow = "rgba(0, 210, 255, 0.22)";

    const baseAttr = `class="sl-holo-glyph" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"`;
    const s1 = `stroke="${strokeMain}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
    const s2 = `stroke="${strokeAccent}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;
    const f1 = `fill="${fillGlow}"`;

    let body = UNIQUE_ITEM_SVGS[id] || UNIQUE_LOOT_SVGS[t];
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

window.getIconFor = getIconFor;
window.UNIQUE_ITEM_SVGS = UNIQUE_ITEM_SVGS;
window.UNIQUE_LOOT_SVGS = UNIQUE_LOOT_SVGS;

let _igrisUidCounter = 0;

function getCommanderSVG(cmdId, initialState = 'idle') {
    let key = String(cmdId || '').toLowerCase().trim();
    let svgOut = '';

    if (key === 'igris' && typeof getIgrisSVG === 'function') {
        svgOut = getIgrisSVG();
    } else if (key === 'tank' && typeof getTankSVG === 'function') {
        svgOut = getTankSVG();
    } else if (key === 'iron' && typeof getIronSVG === 'function') {
        svgOut = getIronSVG();
    } else if (key === 'tusk' && typeof getTuskSVG === 'function') {
        svgOut = getTuskSVG();
    } else if (key === 'tusk' && typeof TUSK_SVG !== 'undefined' && TUSK_SVG) {
        svgOut = TUSK_SVG;
    } else if (key === 'beru' && typeof getBeruSVG === 'function') {
        svgOut = getBeruSVG();
} else if (key === 'beru' && typeof BERU_SVG !== 'undefined' && BERU_SVG) {
        svgOut = BERU_SVG;
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

    if (initialState && initialState !== 'idle') {
        svgOut = svgOut.replace('class="ig ig-idle"', `class="ig ig-${initialState}"`);
    }
    svgOut = svgOut.replace('<svg ', `<svg data-cmd-key="${key}" `);
    if (typeof applyShadowOffsetsToDOM === 'function') setTimeout(() => applyShadowOffsetsToDOM(), 0);
    return svgOut;
}
window.getCommanderSVG = getCommanderSVG;
window.getcommandersvg = getCommanderSVG; 

// Controlador universal para cambiar el estado animado de cualquier Comandante en vivo
window.setCommanderAnim = function(targetElOrSelector, state = 'idle', durationMs = 0) {
    let root = (typeof targetElOrSelector === 'string')
        ? document.querySelector(targetElOrSelector)
        : targetElOrSelector;
    if (!root) return;

    let svgEl = root.classList && root.classList.contains('ig') ? root : root.querySelector('svg.ig');
    if (!svgEl) return;

    const states = ['idle', 'walk', 'attack', 'guard', 'hit', 'summon'];
    states.forEach(s => svgEl.classList.remove('ig-' + s));
    svgEl.classList.add('ig-' + state);

    if (svgEl._animResetTimer) clearTimeout(svgEl._animResetTimer);
    if (durationMs > 0 && state !== 'idle') {
        svgEl._animResetTimer = setTimeout(() => {
            states.forEach(s => svgEl.classList.remove('ig-' + s));
            svgEl.classList.add('ig-idle');
        }, durationMs);
    }
};

