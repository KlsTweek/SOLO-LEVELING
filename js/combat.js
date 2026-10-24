/* ==========================================================================
   1. CATÁLOGO MAESTRO DE COMANDANTES E INFANTERÍA (FIEL AL ANIME)
   ========================================================================== */
const COMMANDERS_META = {
    igris: {
        id: 'igris',
        name: 'Comandante Igris',
        title: 'Caballero Rojo Sangriento',
        icon: '⚔️',
        color: '#00d2ff',
        accent: '#ff2a55',
        mpDrain: 62,
        activeCost: 260,
        activeName: 'Tajo Carmesí del Monarca',
        reqText: 'Niv. 40 (Cambio de Clase)',
        passiveDesc: 'Otorga +3% EXP y +3% Oro por cada nivel de Igris, ensancha +10% el núcleo crítico del Corte Dimensional y en Choques de Jefe lanza tajos relámpago automáticos (-15 HP al Jefe cada turno).',
        activeDesc: 'En el Sello: Parte el núcleo al instante con Crítico Perfecto garantizado (+15% EXP). Fuera del Sello: Adelanta 25 minutos tus misiones activas y te entrega hasta +75 G limpios.'
    },
    tank: {
        id: 'tank',
        name: 'Tank',
        title: 'Alfa de los Osos de Hielo',
        icon: '🐻‍❄️',
        color: '#38bdf8',
        accent: '#e0f2fe',
        mpDrain: 112,
        activeCost: 240,
        activeName: 'Estampida del Cero Absoluto',
        reqText: 'Niv. 48 o Elfos de Hielo',
        passiveDesc: 'Mitiga 50% el desangrado nocturno y ancla tu vida en 20 HP al llegar la hora de ejecución nocturna (Máx. 2 noches, luego 24h de hibernación).',
        activeDesc: 'Levanta un Escudo Ártico de +60 HP para mazmorras, restaura +30 SP al instante, congela 60 min los cronómetros de Jefes Personales y retrasa +45 minutos el inicio del desangrado nocturno de hoy.'
    },
    iron: {
        id: 'iron',
        name: 'Iron',
        title: 'El Bastión de Acero Gigante',
        icon: '🛡️',
        color: '#a855f7',
        accent: '#38bdf8',
        mpDrain: 145,
        activeCost: 280,
        activeName: 'Grito de Provocación Total',
        reqText: 'Niv. 52 o STR 4.00',
        passiveDesc: 'Absorbe el 75% del daño por deserción de jefes o ataques en mazmorra, anula el costo de SP al huir de fisuras y si fallas un Corte Dimensional tienes 40% de probabilidad de rebotar el golpe ganando +10 G.',
        activeDesc: 'Golpea su escudo gigante forzando una Fisura Rango A con TRIPLE botín, restaura +35 SP por adrenalina de guerra y te hace 100% inmune a todo daño durante 15 minutos.'
    },
    tusk: {
        id: 'tusk',
        name: 'Tusk (Kargalgan)',
        title: 'Gran Chamán de los Altos Orcos',
        icon: '🔥',
        color: '#ff2a55',
        accent: '#ffcc00',
        mpDrain: 225,
        activeCost: 650,
        activeName: 'Himno del Dragón de Fuego',
        reqText: 'Niv. 72 o Orbe de Avaricia',
        passiveDesc: 'Magia de Gravedad y Ceguera: Ralentiza 25% la aguja del Corte Dimensional, ensancha la Zona Vital, acelera 20% los relojes de mazmorra y reduce un 25% el costo de SP de todas tus misiones diarias.',
        activeDesc: 'En Mazmorra: Incinera instantáneamente toda la fase o al Jefe actual. En el Tablón Diario: Completa automáticamente TODAS tus misiones paralelas del día dándote su EXP, Oro y Atributos.'
    },
    beru: {
        id: 'beru',
        name: 'Beru',
        title: 'Rey de las Hormigas de Jeju',
        icon: '🐜',
        color: '#d946ef',
        accent: '#00ffcc',
        mpDrain: 275,
        activeCost: 780,
        activeName: 'Velocidad del Rey ("¡Mi Rey!")',
        reqText: 'Isla de Jeju o Niv. 90',
        passiveDesc: 'Depredación y Sanación Rango S: Al derrotar un Jefe o Mazmorra devora su núcleo (+0.05 a un atributo permanente y +15 HP), y mientras está desplegado en campo te regenera +2 HP y +2 SP cada minuto.',
        activeDesc: 'Desata el Modo Berserker por 45 min: Anula el requisito de tiempo en tus misiones (puedes desplegarlas y sellarlas al instante), aumenta +35% todo el Oro ganado y te cura +40 HP al instante.'
    }
};
const INFANTRY_META = {
    soldiers: { id: 'soldiers', name: 'Soldados de Sombra', icon: '🗡️', cost: 1, max: 25, desc: 'Reduce en -1% la probabilidad de que tus ítems se rompan al morir (Máx 25).' },
    mages:    { id: 'mages',    name: 'Magos de Sombra',    icon: '🔮', cost: 2, max: 20, desc: 'Cada mago regenera +4 MP por minuto de forma pasiva para sostener a tus comandantes.' },
    bears:    { id: 'bears',    name: 'Osos de Hielo', icon: '🐾', cost: 2, max: 15, desc: 'Aumenta tu Vida Máxima (Max HP) base en +5 HP por cada oso reclutado.' },
    orcs:     { id: 'orcs',     name: 'Guerreros Altos Orcos', icon: '👹', cost: 3, max: 15, desc: 'Aumenta en +3 G el oro base ganado en misiones físicas (STR).' },
    ants:     { id: 'ants',     name: 'Hormigas de Jeju', icon: '🐜', cost: 3, max: 25, desc: 'Cada 5 hormigas reducen en -1 SP el costo de Zona Limpia y Ruta Los Chorros.' }
};

let currentShowcaseCmd = 'igris';
/* ==========================================================================
   2. ARTE Y RIGGING VECTORIAL SVG AL 300% (LLAMAS DE SOMBRA, RUNAS Y EYE-TRAILS)
   ========================================================================== */
function getCommanderSVG(cmdId) {
    if (cmdId === 'igris') {
        return `
        <svg viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="igrisSword" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#0284c7"/>
                    <stop offset="50%" stop-color="#00d2ff"/>
                    <stop offset="100%" stop-color="#ffffff"/>
                </linearGradient>
                <linearGradient id="igrisPlume" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff2a55"/>
                    <stop offset="55%" stop-color="#dc2626"/>
                    <stop offset="100%" stop-color="#450a0a"/>
                </linearGradient>
                <radialGradient id="igrisAura" cx="50%" cy="55%" r="50%">
                    <stop offset="0%" stop-color="rgba(0, 210, 255, 0.32)"/>
                    <stop offset="60%" stop-color="rgba(157, 0, 255, 0.12)"/>
                    <stop offset="100%" stop-color="transparent"/>
                </radialGradient>
            </defs>

            <g class="svg-summon-ring">
                <ellipse cx="110" cy="202" rx="76" ry="12" fill="none" stroke="#00d2ff" stroke-width="2" stroke-dasharray="10 5"/>
                <ellipse cx="110" cy="202" rx="52" ry="7" fill="rgba(0, 210, 255, 0.18)" stroke="#9d00ff" stroke-width="1.2"/>
            </g>

            <circle cx="110" cy="115" r="82" fill="url(#igrisAura)"/>
            <g class="svg-shadow-flame-1">
                <path d="M32 200 Q45 125 32 72 Q68 105 85 75 Q110 40 135 75 Q155 105 188 68 Q175 130 188 200 Z" fill="rgba(4, 7, 17, 0.9)" stroke="rgba(0, 210, 255, 0.35)" stroke-width="1.2"/>
            </g>

            <!-- 1. CAPA Y PLUMA CARMESÍ AL FONDO -->
            <g class="igris-plume-anim">
                <path d="M108 42 C102 6, 76 10, 54 65 C36 108, 16 132, 6 156 C30 144, 56 120, 76 78 C88 50, 100 30, 108 42 Z" fill="url(#igrisPlume)"/>
                <path d="M110 38 C95 16, 70 35, 42 95 C64 78, 85 52, 106 44 Z" fill="#ff4d6d" opacity="0.8"/>
            </g>

            <!-- 2. TORSO, CAPA NEGRA Y PLACAS DEL PECHO EN CAPA MEDIA -->
            <path class="svg-torso-solid" d="M26 204 L48 100 L82 86 L110 94 L138 86 L172 100 L194 204 L165 196 L142 204 L110 194 L78 204 L55 196 Z" fill="#03050c" stroke="#1e293b" stroke-width="1.5"/>
            <path d="M44 102 L22 198 L54 192 L64 114 Z" fill="#7f1d1d" opacity="0.75"/>
            <path d="M176 102 L198 198 L166 192 L156 114 Z" fill="#450a0a" opacity="0.65"/>

            <g class="igris-sword-glow">
                <polygon points="88,102 110,118 132,102 127,98 110,110 93,98" fill="#ffffff" stroke="#00d2ff" stroke-width="1.2"/>
                <polygon points="84,114 110,132 136,114 130,109 110,123 90,109" fill="#bae6fd" stroke="#00d2ff" stroke-width="1.2"/>
                <polygon points="88,128 110,144 132,128 127,124 110,136 93,124" fill="#38bdf8"/>
                <polygon points="92,142 110,156 128,142 124,138 110,149 96,138" fill="#0284c7"/>
                <polygon points="96,156 110,168 124,156 120,152 110,160 100,152" fill="#00d2ff"/>
            </g>

            <!-- 3. YELMO DE CABALLERO Y OJOS -->
            <polygon points="110,40 93,56 89,38 84,65 92,94 110,106 128,94 136,65 131,38 127,56" fill="#040710" stroke="#38bdf8" stroke-width="1.4"/>
            <polygon points="110,32 104,58 110,80 116,58" fill="#0f172a" stroke="#00d2ff" stroke-width="1"/>
            <g class="svg-eyes-blink">
                <path class="svg-eye-trail" d="M95,75 Q80,68 68,56 Q86,70 105,78 Z" fill="#00d2ff" opacity="0.75"/>
                <path class="svg-eye-trail" d="M125,75 Q140,68 152,56 Q134,70 115,78 Z" fill="#00d2ff" opacity="0.75"/>
                <polygon points="94,74 106,79 96,82" fill="#ffffff"/>
                <polygon points="126,74 114,79 124,82" fill="#ffffff"/>
            </g>

            <!-- 4. BRAZOS ACORAZADOS Y MANDOBLE EN PRIMER PLANO ABSOLUTO (DELANTE DEL TORSO) -->
            <g class="svg-arm-shield">
                <!-- Hombrera y Guantelete Izquierdo con Garras de Acero -->
                <polygon points="142,88 182,96 192,122 154,116" fill="#0a1326" stroke="#00d2ff" stroke-width="1.6"/>
                <polygon points="158,116 186,120 176,162 148,152" fill="#070d1c" stroke="#38bdf8" stroke-width="1.4"/>
                <polyline points="150,152 144,170 156,154 152,174 164,156 162,172" fill="none" stroke="#00ffff" stroke-width="1.8" stroke-linecap="round"/>
            </g>

            <g class="svg-arm-weapon">
                <!-- Hombrera Derecha Escalonada -->
                <polygon points="78,88 38,96 26,124 66,116" fill="#0a1326" stroke="#00d2ff" stroke-width="1.7"/>
                <polygon points="42,102 68,96 64,112 36,118" fill="#1e293b" stroke="#38bdf8" stroke-width="1.2"/>
                <!-- Antebrazo Acorazado Cruzando Hacia el Centro del Pecho -->
                <polygon points="36,120 56,112 88,136 68,150" fill="#070d1c" stroke="#00d2ff" stroke-width="1.6"/>
                <line x1="46" y1="128" x2="62" y2="118" stroke="#38bdf8" stroke-width="1.4"/>
                <line x1="56" y1="136" x2="72" y2="126" stroke="#38bdf8" stroke-width="1.4"/>

                <!-- Gran Espada Larga del Rey Demonio Empuñada al Frente -->
                <g class="igris-sword-glow">
                    <!-- Hoja diagonal que sube desde su mano en el pecho hacia arriba a la derecha -->
                    <polygon points="84,126 196,16 212,14 204,30 96,138" fill="url(#igrisSword)" stroke="#ffffff" stroke-width="1.6"/>
                    <line x1="90" y1="132" x2="206" y2="18" stroke="#ffffff" stroke-width="2.5"/>
                    <polyline class="svg-lightning-crackle" points="102,118 122,92 130,98 158,64 166,70 198,26" fill="none" stroke="#00ffff" stroke-width="2"/>
                    <polyline class="svg-lightning-crackle" points="116,108 142,82 138,72 178,44" fill="none" stroke="#ff2a55" stroke-width="1.6"/>
                    <!-- Guardia Cruciforme Real y Pomo -->
                    <polygon points="68,112 110,148 102,155 60,119" fill="#0f172a" stroke="#00ffff" stroke-width="1.8"/>
                    <polygon points="84,126 94,134 88,140 78,132" fill="#ff2a55"/>
                    <line x1="86" y1="134" x2="62" y2="158" stroke="#cbd5e1" stroke-width="5.5" stroke-linecap="round"/>
                    <polygon points="56,164 62,152 70,160" fill="#00d2ff" stroke="#ffffff" stroke-width="1"/>
                </g>

                <!-- Guantelete Derecho Articulado Cerrando los Dedos Sobre la Empuñadura (En Primerísima Capa) -->
                <polygon points="68,128 88,124 94,142 74,148" fill="#020617" stroke="#00ffff" stroke-width="1.8"/>
                <line x1="72" y1="133" x2="88" y2="130" stroke="#e0f2fe" stroke-width="1.5"/>
                <line x1="74" y1="138" x2="90" y2="135" stroke="#38bdf8" stroke-width="1.5"/>
                <line x1="76" y1="143" x2="91" y2="140" stroke="#0284c7" stroke-width="1.5"/>
            </g>
        </svg>`;
    }

    if (cmdId === 'tank') {
        return `
        <svg viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="tankFur" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0f172a"/>
                    <stop offset="55%" stop-color="#040814"/>
                    <stop offset="100%" stop-color="#010308"/>
                </linearGradient>
                <linearGradient id="tankIce" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="45%" stop-color="#38bdf8"/>
                    <stop offset="100%" stop-color="#0284c7"/>
                </linearGradient>
            </defs>

            <g class="svg-summon-ring">
                <ellipse cx="110" cy="204" rx="86" ry="13" fill="rgba(56, 189, 248, 0.18)" stroke="#00f2fe" stroke-width="2" stroke-dasharray="12 6"/>
            </g>

            <!-- Cristales de Hielo Abisal en el Lomo -->
            <g class="svg-orb-levitate">
                <polygon points="34,132 14,48 64,88" fill="url(#tankIce)" stroke="#ffffff" stroke-width="1.4" opacity="0.88"/>
                <polygon points="186,132 206,48 156,88" fill="url(#tankIce)" stroke="#ffffff" stroke-width="1.4" opacity="0.88"/>
                <polygon points="62,84 48,24 88,64" fill="#0284c7" stroke="#bae6fd" stroke-width="1.3"/>
                <polygon points="158,84 172,24 132,64" fill="#0284c7" stroke="#bae6fd" stroke-width="1.3"/>
                <polygon points="110,8 88,62 132,62" fill="url(#tankIce)" stroke="#ffffff" stroke-width="1.6"/>
            </g>

            <!-- Torso Colosal de Oso Polar Sombrío con Pelaje Dentado -->
            <g class="svg-torso-solid">
                <path d="M18 204 L12 148 L24 152 L20 112 L38 74 L58 46 L76 58 L110 42 L144 58 L162 46 L182 74 L200 112 L196 152 L208 148 L202 204 Z" fill="url(#tankFur)" stroke="#38bdf8" stroke-width="2"/>
                <!-- Placas pectorales y cicatrices rúnicas brillantes -->
                <path d="M46 114 L82 132 L110 120 L138 132 L174 114 L162 168 L110 192 L58 168 Z" fill="#030712" stroke="#0284c7" stroke-width="1.4"/>
                <path d="M58 142 L92 164 L110 152 L128 164 L162 142" fill="none" stroke="#00f2fe" stroke-width="3" filter="drop-shadow(0 0 8px #00f2fe)"/>
                <path d="M72 168 L110 186 L148 168" fill="none" stroke="#38bdf8" stroke-width="2"/>

                <!-- Orejas redondas acorazadas y Cabeza de Bestia Alfa -->
                <polygon points="56,52 44,32 68,38 72,56" fill="#040814" stroke="#38bdf8" stroke-width="1.6"/>
                <polygon points="164,52 176,32 152,38 148,56" fill="#040814" stroke="#38bdf8" stroke-width="1.6"/>
                <polygon points="64,56 110,44 156,56 168,96 146,134 110,144 74,134 52,96" fill="#050b18" stroke="#00d2ff" stroke-width="1.8"/>

                <!-- Runa Real del Alfa en la Frente y Cicatriz en el Ojo -->
                <polygon points="110,54 98,76 110,96 122,76" fill="url(#tankIce)" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 10px #00f2fe)"/>
                <line x1="74" y1="68" x2="88" y2="104" stroke="#00f2fe" stroke-width="2.2"/>

                <!-- Ojos Feroces con Rastro de Luz -->
                <g class="svg-eyes-blink">
                    <path class="svg-eye-trail" d="M76,84 Q54,72 38,56 Q64,76 92,90 Z" fill="#00f2fe"/>
                    <path class="svg-eye-trail" d="M144,84 Q166,72 182,56 Q156,76 128,90 Z" fill="#00f2fe"/>
                    <polygon points="74,82 94,90 78,94" fill="#ffffff"/>
                    <polygon points="146,82 126,90 142,94" fill="#ffffff"/>
                </g>

                <!-- Hocico Tridimensional y Fauces Abiertas con Colmillos Gigantes -->
                <polygon points="84,96 110,88 136,96 142,114 110,120 78,114" fill="#091326" stroke="#38bdf8" stroke-width="1.3"/>
                <polygon points="102,98 118,98 110,108" fill="#00f2fe"/>
                <g class="svg-jaw-snap">
                    <polygon points="78,112 110,106 142,112 134,142 110,148 86,142" fill="#020308" stroke="#00d2ff" stroke-width="1.8"/>
                    <!-- Colmillos Superiores e Inferiores -->
                    <polygon points="82,112 90,132 96,114" fill="#ffffff"/>
                    <polygon points="138,112 130,132 124,114" fill="#ffffff"/>
                    <polygon points="96,114 102,126 108,114 114,126 120,114" fill="#bae6fd"/>
                    <polygon points="88,140 94,124 100,142" fill="#e0f2fe"/>
                    <polygon points="132,140 126,124 120,142" fill="#e0f2fe"/>
                </g>

                <g class="svg-breath-mist">
                    <ellipse cx="110" cy="134" rx="34" ry="13" fill="rgba(186, 230, 253, 0.5)" filter="blur(3px)"/>
                </g>

                <!-- Brazos y Zarpas Acorazadas de Hielo en Primer Plano -->
                <g class="svg-arm-shield">
                    <polygon points="10,152 38,112 66,158 48,204 14,204" fill="#040917" stroke="#00d2ff" stroke-width="2"/>
                    <polygon points="210,152 182,112 154,158 172,204 206,204" fill="#040917" stroke="#00d2ff" stroke-width="2"/>
                    <!-- 4 Garras de Hielo Afiladas por Zarpa -->
                    <polygon points="16,204 22,174 30,204" fill="url(#tankIce)"/>
                    <polygon points="28,204 35,172 42,204" fill="url(#tankIce)"/>
                    <polygon points="40,204 48,176 54,204" fill="url(#tankIce)"/>
                    <polygon points="204,204 198,174 190,204" fill="url(#tankIce)"/>
                    <polygon points="192,204 185,172 178,204" fill="url(#tankIce)"/>
                    <polygon points="180,204 172,176 166,204" fill="url(#tankIce)"/>
                </g>
            </g>
        </svg>`;
    }

    if (cmdId === 'iron') {
        return `
        <svg viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ironArmor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#17283b"/>
              <stop offset="45%" stop-color="#070c17"/>
              <stop offset="100%" stop-color="#02040a"/>
            </linearGradient>
            <linearGradient id="ironGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e0fbff"/>
              <stop offset="40%" stop-color="#00eaff"/>
              <stop offset="100%" stop-color="#0078ff"/>
            </linearGradient>
            <radialGradient id="ironAura">
              <stop offset="0%" stop-color="#00dfff" stop-opacity=".55"/>
              <stop offset="65%" stop-color="#0875ff" stop-opacity=".20"/>
              <stop offset="100%" stop-color="#001020" stop-opacity="0"/>
            </radialGradient>
            <filter id="ironNeon" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="ironSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7"/>
            </filter>
          </defs>

          <g transform="translate(11, 10) scale(0.90)">
            <!-- Aura espectral -->
            <circle cx="110" cy="100" r="100" fill="url(#ironAura)"/>
            <g class="svg-shadow-flame-1" opacity=".85">
              <path d="M58 95 Q35 65 55 34 L67 51 L76 19 L94 42 L110 9 L127 40 L147 20 L153 52 L169 35 Q188 68 162 96 Z" fill="#00cfff" opacity=".17"/>
              <path d="M72 71 L65 39 L84 57 L91 30 L109 52 L126 27 L132 56 L153 40 L146 73 Z" fill="#00eaff" opacity=".24" filter="url(#ironSoftGlow)"/>
            </g>

            <!-- Espinas de la espalda -->
            <g fill="#030711" stroke="#00cfff" stroke-width="1.4" stroke-linejoin="round">
              <path d="M66 91 L13 28 L43 86 L28 60 L59 105 Z"/>
              <path d="M59 104 L5 65 L39 113 Z"/>
              <path d="M154 91 L207 28 L177 86 L192 60 L161 105 Z"/>
              <path d="M161 104 L215 65 L181 113 Z"/>
            </g>

            <g class="svg-torso-solid">
              <!-- Cuello blindado -->
              <path d="M83 62 L79 81 L91 96 L129 96 L141 81 L137 62 L125 74 L95 74 Z" fill="#02050d" stroke="#00dfff" stroke-width="1.5"/>

              <!-- Cuernos: largos, oscuros y curvados -->
              <g fill="url(#ironArmor)" stroke="#00dfff" stroke-width="1.5" stroke-linejoin="round">
                <path d="M91 36 C69 35 47 25 37 5 C38 27 53 45 79 49 L98 48 Z"/>
                <path d="M129 36 C151 35 173 25 183 5 C182 27 167 45 141 49 L122 48 Z"/>
              </g>
              <path d="M43 12 Q55 35 83 42" fill="none" stroke="#456c88" stroke-width="1.4"/>
              <path d="M177 12 Q165 35 137 42" fill="none" stroke="#456c88" stroke-width="1.4"/>

              <!-- Casco: una silueta continua -->
              <path d="M79 47 L91 32 L110 20 L129 32 L141 47 L135 69 L124 83 L110 91 L96 83 L85 69 Z" fill="url(#ironArmor)" stroke="#00dfff" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M84 48 L72 61 L83 74 L94 67 Z" fill="#091321" stroke="#167ba5" stroke-width="1.2"/>
              <path d="M136 48 L148 61 L137 74 L126 67 Z" fill="#091321" stroke="#167ba5" stroke-width="1.2"/>
              <path d="M96 34 L110 26 L124 34 L121 48 L110 56 L99 48 Z" fill="#02050c" stroke="#243b53" stroke-width="1"/>

              <!-- Ojos blancos estrechos -->
              <g class="svg-eyes-blink" filter="url(#ironNeon)">
                <path d="M91 53 L108 58 L101 63 L89 59 Z" fill="#e9fdff"/>
                <path d="M129 53 L112 58 L119 63 L131 59 Z" fill="#e9fdff"/>
              </g>

              <!-- Crestas del rostro -->
              <path d="M98 66 L110 73 L122 66 L116 80 L110 84 L104 80 Z" fill="#030711" stroke="#087da9" stroke-width="1.2"/>
              <path d="M110 74 L110 83" stroke="#00dfff" stroke-width="1.2"/>

              <!-- Hombreras masivas -->
              <path d="M73 82 L49 72 L26 84 L19 99 L39 111 L72 106 L88 96 Z" fill="url(#ironArmor)" stroke="#00dfff" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M147 82 L171 72 L194 84 L201 99 L181 111 L148 106 L132 96 Z" fill="url(#ironArmor)" stroke="#00dfff" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M30 88 L51 80 L69 88 L58 98 L36 100 Z" fill="#101c2c" stroke="#167ba5" stroke-width="1"/>
              <path d="M190 88 L169 80 L151 88 L162 98 L184 100 Z" fill="#101c2c" stroke="#167ba5" stroke-width="1"/>

              <!-- Brazos blindados -->
              <path d="M31 105 L20 133 L30 166 L47 160 L43 130 L61 109 L55 101 Z" fill="url(#ironArmor)" stroke="#00cfff" stroke-width="1.6"/>
              <path d="M189 105 L200 133 L190 166 L173 160 L177 130 L159 109 L165 101 Z" fill="url(#ironArmor)" stroke="#00cfff" stroke-width="1.6"/>

              <!-- Franjas de las placas de los brazos -->
              <g fill="none" stroke="#00eaff" stroke-width="2.1">
                <path d="M25 119 Q36 126 45 121"/>
                <path d="M23 130 Q35 137 46 132"/>
                <path d="M26 141 Q37 147 47 143"/>
                <path d="M195 119 Q184 126 175 121"/>
                <path d="M197 130 Q185 137 174 132"/>
                <path d="M194 141 Q183 147 173 143"/>
              </g>

              <!-- Torso ancho, blindado y anguloso -->
              <path d="M68 83 L152 83 L164 113 L144 157 L130 174 L90 174 L76 157 L56 113 Z" fill="url(#ironArmor)" stroke="#00dfff" stroke-width="2" stroke-linejoin="round"/>
              <path d="M66 94 L86 99 L91 121 L77 133 L65 111 Z" fill="#101b2b" stroke="#167ba5" stroke-width="1.1"/>
              <path d="M154 94 L134 99 L129 121 L143 133 L155 111 Z" fill="#101b2b" stroke="#167ba5" stroke-width="1.1"/>

              <!-- Núcleo luminoso del pecho -->
              <path d="M77 91 L96 98 L110 113 L124 98 L143 91 L133 116 L110 137 L87 116 Z" fill="#00dfff" opacity=".18" filter="url(#ironSoftGlow)"/>
              <g filter="url(#ironNeon)">
                <path d="M76 94 L96 100 L110 113 L124 100 L144 94 L132 116 L110 132 L88 116 Z" fill="url(#ironGlow)"/>
                <path d="M85 119 L101 128 L110 136 L119 128 L135 119 L124 139 L110 148 L96 139 Z" fill="#00cfff"/>
                <path d="M94 142 L105 149 L110 153 L115 149 L126 142 L119 157 L110 163 L101 157 Z" fill="#079bd5"/>
              </g>

              <!-- Divisiones oscuras del núcleo -->
              <path d="M99 114 L110 124 L121 114 L115 128 L110 132 L105 128 Z" fill="#06101d"/>
              <path d="M102 139 L110 146 L118 139 L114 151 L110 155 L106 151 Z" fill="#06101d"/>

              <!-- Placas abdominales y faldón -->
              <path d="M80 153 L99 161 L93 174 L78 169 Z" fill="#091321" stroke="#00aede" stroke-width="1.2"/>
              <path d="M140 153 L121 161 L127 174 L142 169 Z" fill="#091321" stroke="#00aede" stroke-width="1.2"/>
              <path d="M82 169 L101 176 L96 194 L73 187 Z" fill="#050914" stroke="#00dfff" stroke-width="1.5"/>
              <path d="M138 169 L119 176 L124 194 L147 187 Z" fill="#050914" stroke="#00dfff" stroke-width="1.5"/>
              <path d="M96 170 L124 170 L121 207 L110 216 L99 207 Z" fill="#030711" stroke="#00dfff" stroke-width="1.7"/>
              <path d="M101 178 L110 188 L119 178" fill="none" stroke="#00eaff" stroke-width="1.5"/>

              <!-- Piernas pesadas -->
              <path d="M73 185 L96 193 L90 215 L57 215 L62 197 Z" fill="url(#ironArmor)" stroke="#00dfff" stroke-width="1.6"/>
              <path d="M147 185 L124 193 L130 215 L163 215 L158 197 Z" fill="url(#ironArmor)" stroke="#00dfff" stroke-width="1.6"/>
              <path d="M67 198 L89 203 L85 210 L63 208 Z" fill="#14283b" stroke="#167ba5" stroke-width="1"/>
              <path d="M153 198 L131 203 L135 210 L157 208 Z" fill="#14283b" stroke="#167ba5" stroke-width="1"/>

              <!-- Gran escudo/hoja curva del brazo derecho visual -->
              <g class="svg-arm-shield">
                <path d="M173 94 C195 105 207 139 201 174 L190 204 L171 184 C181 154 181 124 164 105 Z" fill="url(#ironArmor)" stroke="#00dfff" stroke-width="1.8" stroke-linejoin="round"/>
                <path d="M180 115 C192 137 193 161 187 186 L179 174 C184 152 183 132 180 115 Z" fill="#00eaff" filter="url(#ironNeon)"/>
              </g>

              <!-- MAZO / GRAN HACHA DE BATALLA REDISEÑADA (Masiva, doble filo curvo y núcleo cian) -->
              <g class="svg-arm-weapon">
                <!-- Asta larga de acero sombrío con pomo puntiagudo -->
                <line x1="46" y1="142" x2="-2" y2="212" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
                <line x1="46" y1="142" x2="-2" y2="212" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
                <!-- Cabeza colosal de Hacha/Mazo de Guerra -->
                <path d="M26 168 C4 148, -14 172, -6 196 C12 192, 22 182, 26 168 Z" fill="url(#ironArmor)" stroke="#00eaff" stroke-width="2"/>
                <path d="M18 180 C34 202, 14 222, -6 210 C2 196, 12 188, 18 180 Z" fill="url(#ironArmor)" stroke="#00eaff" stroke-width="2"/>
                <!-- Filo de plasma cian brillante y núcleo del mazo -->
                <path d="M2 162 C-10 176, -10 192, -4 206" fill="none" stroke="#ffffff" stroke-width="2.5" filter="url(#ironNeon)"/>
                <polygon points="16,170 28,176 20,188 10,182" fill="#00eaff" filter="url(#ironNeon)"/>
              </g>
            </g>
          </g>
        </svg>`;
    }

    if (cmdId === 'tusk') {
        return `
        <svg viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="tuskRobe" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2a0410"/>
                    <stop offset="55%" stop-color="#0d0314"/>
                    <stop offset="100%" stop-color="#040108"/>
                </linearGradient>
                <radialGradient id="tuskFireAura" cx="50%" cy="55%" r="50%">
                    <stop offset="0%" stop-color="rgba(255, 42, 85, 0.38)"/>
                    <stop offset="65%" stop-color="rgba(157, 0, 255, 0.14)"/>
                    <stop offset="100%" stop-color="transparent"/>
                </radialGradient>
            </defs>

            <circle cx="110" cy="115" r="88" fill="url(#tuskFireAura)"/>

            <!-- CÍRCULO RÚNICO GIRATORIO CON PUNTAS AMARILLAS (INTACTO COMO PEDISTE) -->
            <g class="svg-arcane-halo">
                <circle cx="110" cy="115" r="82" fill="none" stroke="#ff2a55" stroke-width="1.8" stroke-dasharray="14 8 4 8"/>
                <polygon points="110,28 116,40 104,40" fill="#ffcc00"/>
                <polygon points="110,202 116,190 104,190" fill="#ffcc00"/>
                <polygon points="24,115 36,109 36,121" fill="#ffcc00"/>
                <polygon points="196,115 184,109 184,121" fill="#ffcc00"/>
            </g>

            <g class="svg-torso-solid">
                <!-- Túnica Real de Gran Chamán con Hombreras de Picos y Solapas Rúnicas -->
                <path d="M22 206 L34 102 L18 86 L48 66 L78 52 L110 24 L142 52 L172 66 L202 86 L186 102 L198 206 Z" fill="url(#tuskRobe)" stroke="#ff2a55" stroke-width="2"/>
                <path d="M52 72 L82 206 M168 72 L138 206" stroke="#fb7185" stroke-width="1.2" opacity="0.6"/>
                <!-- Hombreras rituales con ornamentos dorados -->
                <polygon points="20,88 52,66 64,92 28,106" fill="#18040c" stroke="#ffcc00" stroke-width="1.5"/>
                <polygon points="200,88 168,66 156,92 192,106" fill="#18040c" stroke="#ffcc00" stroke-width="1.5"/>

                <!-- Capucha Profunda y Rostro Feroz de Kargalgan -->
                <path d="M64 68 L110 26 L156 68 L146 112 L110 122 L74 112 Z" fill="#05020a" stroke="#ff2a55" stroke-width="1.6"/>
                <!-- Mandíbula y Pómulos de Alto Orco Sombrío -->
                <polygon points="76,72 110,64 144,72 138,108 110,118 82,108" fill="#12061c" stroke="#a855f7" stroke-width="1.2"/>
                <!-- Corona Chamánica en la frente -->
                <polygon points="86,54 98,38 110,50 122,38 134,54 110,62" fill="#ffcc00" stroke="#ff2a55" stroke-width="1.2"/>

                <!-- Ojos Ardientes del Chamán -->
                <g class="svg-eyes-blink">
                    <path class="svg-eye-trail" d="M88,78 Q68,66 52,52 Q74,70 98,82 Z" fill="#ff2a55"/>
                    <path class="svg-eye-trail" d="M132,78 Q152,66 168,52 Q146,70 122,82 Z" fill="#ff2a55"/>
                    <polygon points="84,74 102,80 88,84" fill="#ffcc00"/>
                    <polygon points="136,74 118,80 132,84" fill="#ffcc00"/>
                    <circle cx="93" cy="78" r="2" fill="#ffffff"/>
                    <circle cx="127" cy="78" r="2" fill="#ffffff"/>
                </g>

                <!-- Colmillos Inferiores Gigantes de Alto Orco (Apuntando hacia arriba desde la mandíbula) -->
                <g class="svg-jaw-snap">
                    <path d="M84 102 L110 108 L136 102" fill="none" stroke="#ff2a55" stroke-width="2"/>
                    <polygon points="80,108 86,78 96,106" fill="#ffffff" stroke="#ff2a55" stroke-width="1.2"/>
                    <polygon points="140,108 134,78 124,106" fill="#ffffff" stroke="#ff2a55" stroke-width="1.2"/>
                    <polygon points="98,106 103,94 108,107" fill="#e2e8f0"/>
                    <polygon points="122,106 117,94 112,107" fill="#e2e8f0"/>
                </g>

                <!-- Collar de Cráneos de Cazadores en el Pecho -->
                <g class="svg-shadow-flame-2">
                    <path d="M62 112 Q110 136 158 112" fill="none" stroke="#94a3b8" stroke-width="2"/>
                    <!-- 5 Cráneos tallados con cuencas oscuras -->
                    <g transform="translate(72, 114)"><circle r="8" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.4"/><circle cx="-3" cy="-1" r="2" fill="#090414"/><circle cx="3" cy="-1" r="2" fill="#090414"/><line x1="-2" y1="4" x2="2" y2="4" stroke="#090414" stroke-width="1.2"/></g>
                    <g transform="translate(91, 121)"><circle r="9" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.4"/><circle cx="-3" cy="-1" r="2.2" fill="#090414"/><circle cx="3" cy="-1" r="2.2" fill="#090414"/><line x1="-2" y1="5" x2="2" y2="5" stroke="#090414" stroke-width="1.2"/></g>
                    <g transform="translate(110, 124)"><circle r="10" fill="#ffffff" stroke="#ff2a55" stroke-width="1.5"/><circle cx="-3.5" cy="-1" r="2.5" fill="#ff2a55"/><circle cx="3.5" cy="-1" r="2.5" fill="#ff2a55"/><polygon points="0,1 -2,5 2,5" fill="#090414"/></g>
                    <g transform="translate(129, 121)"><circle r="9" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.4"/><circle cx="-3" cy="-1" r="2.2" fill="#090414"/><circle cx="3" cy="-1" r="2.2" fill="#090414"/><line x1="-2" y1="5" x2="2" y2="5" stroke="#090414" stroke-width="1.2"/></g>
                    <g transform="translate(148, 114)"><circle r="8" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.4"/><circle cx="-3" cy="-1" r="2" fill="#090414"/><circle cx="3" cy="-1" r="2" fill="#090414"/><line x1="-2" y1="4" x2="2" y2="4" stroke="#090414" stroke-width="1.2"/></g>
                </g>

                <!-- Manos de Chamán Canalizando Runas y el Orbe de Avaricia -->
                <g class="svg-arm-weapon">
                    <polygon points="34,142 58,128 66,144 42,158" fill="#1e1b4b" stroke="#ff2a55" stroke-width="1.5"/>
                    <polyline points="58,128 72,118 64,136 78,132 66,144" fill="none" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>
                    <polygon points="186,142 162,128 154,144 178,158" fill="#1e1b4b" stroke="#ff2a55" stroke-width="1.5"/>
                    <polyline points="162,128 148,118 156,136 142,132 154,144" fill="none" stroke="#ffcc00" stroke-width="2" stroke-linecap="round"/>
                </g>

                <g class="svg-orb-levitate">
                    <path d="M78 164 Q110 112 142 164 Q110 198 78 164 Z" fill="rgba(255, 42, 85, 0.45)"/>
                    <circle cx="110" cy="162" r="25" fill="#dc2626" stroke="#ffcc00" stroke-width="3" filter="drop-shadow(0 0 14px #ff2a55)"/>
                    <circle cx="110" cy="162" r="14" fill="#fef08a"/>
                    <polygon points="110,144 115,162 110,180 105,162" fill="#ffffff"/>
                </g>
            </g>
        </svg>`;
    }

    if (cmdId === 'beru') {
        return `
        <svg viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g class="svg-shadow-flame-1">
              <path d="M36 210 Q18 120 44 48 Q110 14 176 48 Q202 120 184 210 Z" fill="rgba(157, 0, 255, 0.22)" filter="drop-shadow(0 0 16px #ff0055)"/>
            </g>
            <path d="M74 62 C56 105, 60 155, 72 196 L94 172 L96 68 Z" fill="rgba(216, 180, 254, 0.25)" stroke="#c084fc" stroke-width="1.4"/>
            <path d="M146 62 C164 105, 160 155, 148 196 L126 172 L124 68 Z" fill="rgba(216, 180, 254, 0.25)" stroke="#c084fc" stroke-width="1.4"/>
            <polygon points="104,136 116,136 110,198" fill="rgba(224, 242, 254, 0.45)" stroke="#38bdf8" stroke-width="1"/>
            <g class="svg-torso-solid">
              <polygon points="78,52 24,68 42,78 18,90 48,96 34,108 76,94" fill="#05050a" stroke="#9333ea" stroke-width="1.6"/>
              <polygon points="142,52 196,68 178,78 202,90 172,96 186,108 144,94" fill="#05050a" stroke="#9333ea" stroke-width="1.6"/>
              <polygon points="68,56 152,56 136,122 110,134 84,122" fill="#040408" stroke="#64748b" stroke-width="1.6"/>
              <path d="M78 66 L106 74 L96 84 L76 76 Z" fill="#334155"/>
              <path d="M142 66 L114 74 L124 84 L144 76 Z" fill="#334155"/>
              <polygon points="86,90 110,102 134,90 124,108 110,116 96,108" fill="#1e293b" stroke="#94a3b8" stroke-width="1"/>
              <polygon points="84,126 136,126 144,168 122,168 110,144 98,168 76,168" fill="#040408" stroke="#475559" stroke-width="1.5"/>
              <polygon points="72,162 82,150 98,168 94,214 74,214" fill="#040408" stroke="#9333ea" stroke-width="1.5"/>
              <polygon points="148,162 138,150 122,168 126,214 146,214" fill="#040408" stroke="#9333ea" stroke-width="1.5"/>
              <polygon points="110,12 96,26 90,18 92,42 100,58 110,64 120,58 128,42 130,18 124,26" fill="#05050a" stroke="#cbd5e1" stroke-width="1.5"/>
              <polygon points="96,48 102,64 108,56" fill="#090d16" stroke="#f43f5e" stroke-width="1.2"/>
              <polygon points="124,48 118,64 112,56" fill="#090d16" stroke="#f43f5e" stroke-width="1.2"/>
              <g class="svg-eyes-blink">
                <polygon points="95,36 107,42 98,45" fill="#ff2a55" filter="drop-shadow(0 0 6px #ff0055)"/>
                <polygon points="98,38 105,41 100,43" fill="#ffffff"/>
                <polygon points="125,36 113,42 122,45" fill="#ff2a55" filter="drop-shadow(0 0 6px #ff0055)"/>
                <polygon points="122,38 115,41 120,43" fill="#ffffff"/>
              </g>
              <path d="M102 32 L54 24 Q42 75 52 132" fill="none" stroke="#94a3b8" stroke-width="2.2"/>
              <path d="M118 32 L166 24 Q178 75 168 132" fill="none" stroke="#94a3b8" stroke-width="2.2"/>
              <g class="svg-arm-weapon">
                <polygon points="48,88 32,126 24,108 28,168 46,164 48,124" fill="#05050a" stroke="#94a3b8" stroke-width="1.5"/>
                <path d="M28 166 L18 184 L28 194 M36 166 L32 188 L42 194 M44 164 L48 182 L40 190" fill="none" stroke="#e2e8f0" stroke-width="2.2" stroke-linecap="round"/>
                <polygon points="172,88 188,126 196,108 192,168 174,164 172,124" fill="#05050a" stroke="#94a3b8" stroke-width="1.5"/>
                <path d="M192 166 L202 184 L192 194 M184 166 L188 188 L178 194 M176 164 L172 182 L180 190" fill="none" stroke="#e2e8f0" stroke-width="2.2" stroke-linecap="round"/>
              </g>
            </g>
        </svg>`;
    }

    return `
    <svg viewBox="0 0 220 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="110" cy="110" r="65" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="6 6"/>
        <polygon points="110,45 75,165 145,165" fill="rgba(15, 23, 42, 0.7)" stroke="#475569" stroke-width="1.5"/>
        <text x="110" y="118" text-anchor="middle" fill="#64748b" font-family="Share Tech Mono" font-size="14">SOMBRA EN REPOSO</text>
    </svg>`;
}

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
        ${getCommanderSVG(cmdId)}
    `;

    overlay.style.display = 'flex';
    if (typeof playSystemSound === "function") playSystemSound('purple');
    if (navigator.vibrate) navigator.vibrate([80, 50, 180, 50, 250]);

    setTimeout(() => {
        overlay.style.display = 'none';
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
        if (p.level >= 72 || p.stats.int >= 4.5 || (p.equipment && p.equipment.weapon && p.equipment.weapon.id === 'eq_w_kargalgan')) {
            p.shadowArmy.tusk.unlocked = true;
        }
        if (p.jejuCleared || p.level >= 90) p.shadowArmy.beru.unlocked = true;
    }
}

function getEffectiveActiveCost(cmdId) {
    let meta = COMMANDERS_META[cmdId];
    if (!meta) return 300;
    let cost = meta.activeCost;
    if (cmdId === 'igris' && p && p.equipment && p.equipment.armor && p.equipment.armor.id === 'eq_a1') {
        cost = Math.max(100, cost - 90);
    }
    if (cmdId === 'tusk' && p && p.equipment && p.equipment.weapon && p.equipment.weapon.id === 'eq_w_kargalgan') {
        cost = Math.floor(cost * 0.7);
    }
    if (p && p.sovereignCritDiscount) {
        cost = Math.floor(cost * 0.5);
    }
    return cost;
}

function getIgrisNextGoldReward() {
    let todayKey = new Date().toDateString();
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
        let expGoldPct = 3 * lvl;
        let critZone = 10;
        let clashDmg = 15;
        let skipMins = 25 + (bonus * 2);
        let nextGold = getIgrisNextGoldReward();
        let goldLabel = nextGold > 0 ? `+${nextGold} G limpios en tu próximo uso de hoy (Escala: 75/40/25/0 G)` : `0 G (Límite de 3 cobros diarios alcanzado hoy)`;
        return {
            passive: `Otorga <b style="color:#00ffcc;">+${expGoldPct}% EXP y +${expGoldPct}% Oro</b> (Niv.${lvl}), ensancha <b style="color:#00ffcc;">+${critZone}%</b> el núcleo crítico del Corte y en Choques de Jefe lanza tajos automáticos de <b style="color:#00ffcc;">-${clashDmg} HP</b>.`,
            active: `En el Sello: Parte el núcleo con Crítico Perfecto (+15% EXP). Fuera del Sello: Adelanta <b style="color:#fde047;">${skipMins} min</b> tus misiones activas y entrega <b style="color:#fde047;">${goldLabel}</b>.`
        };
    }
    if (cmdId === 'tank') {
        let anchorHp = 20;
        let shieldHp = 60 + (bonus * 12);
        let spGain = Math.min(100, 30 + (bonus * 3));
        let freezeMins = 60 + (bonus * 10);
        return {
            passive: `Mitiga 50% el desangrado nocturno y ancla tu vida en <b style="color:#00ffcc;">${anchorHp} HP</b> al llegar la ejecución de las 10:00 PM (Máx. 2 noches, luego 24h de hibernación).`,
            active: `Levanta un Escudo Ártico de <b style="color:#fde047;">+${shieldHp} HP</b> (Niv.${lvl}), restaura <b style="color:#fde047;">+${spGain} SP</b>, congela <b style="color:#fde047;">${freezeMins} min</b> a tus Jefes y retrasa +45 min el desangrado nocturno hoy.`
        };
    }
    if (cmdId === 'iron') {
        let deflectGold = 10;
        let immMins = 15 + (bonus * 3);
        let spGain = Math.min(100, 35 + (bonus * 4));
        return {
            passive: `Absorbe el 75% del daño de jefes/mazmorras, anula el costo de huir de fisuras y al fallar un Corte tienes 40% de prob. de rebotar el golpe ganando <b style="color:#00ffcc;">+${deflectGold} G</b>.`,
            active: `Fuerza una Fisura Rango A con TRIPLE botín, restaura <b style="color:#fde047;">+${spGain} SP</b> y te vuelve 100% inmune a todo daño durante <b style="color:#fde047;">${immMins} minutos</b> (Niv.${lvl}).`
        };
    }
    if (cmdId === 'tusk') {
        let raidFast = 20;
        let spDisc = Math.min(55, 35 + (bonus * 2));
        let fallbackXp = 140 + (bonus * 25);
        let fallbackGold = 60 + (bonus * 12);
        return {
            passive: `Ralentiza 25% la aguja del Corte, acelera <b style="color:#00ffcc;">${raidFast}%</b> los relojes de mazmorra y reduce un <b style="color:#00ffcc;">${spDisc}% el costo de SP</b> de todas tus misiones diarias (Niv.${lvl}).`,
            active: `En Mazmorra: Incinera la fase actual al instante. En Tablón: Completa TODAS tus misiones paralelas con su EXP/Oro y atributos (o condensa <b style="color:#fde047;">+${fallbackXp} XP y +${fallbackGold} G</b> si ya estaban limpias).`
        };
    }
    if (cmdId === 'beru') {
        let statGain = (0.05 + (bonus * 0.01)).toFixed(2);
        let healOnKill = 15 + (bonus * 4);
        let regenPerMin = 2;
        let berserkMins = 45 + (bonus * 5);
        let goldBoost = 35 + (bonus * 3);
        let activeHeal = 40 + (bonus * 8);
        return {
            passive: `Al derrotar un Jefe/Mazmorra devora su núcleo (<b style="color:#00ffcc;">+${statGain} atributo permanente y +${healOnKill} HP</b>), y en campo te regenera <b style="color:#00ffcc;">+${regenPerMin} HP y +${regenPerMin} SP/min</b> (Niv.${lvl}).`,
            active: `Modo Berserker por <b style="color:#fde047;">${berserkMins} min</b>: Anula el requisito de tiempo en misiones, aumenta <b style="color:#fde047;">+${goldBoost}% todo el Oro</b> y te cura <b style="color:#fde047;">+${activeHeal} HP</b>.`
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
    let wId = (p && p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p && p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let tuskEquipped = p.equippedShadows && p.equippedShadows.includes('tusk');

    let bonusWidth = Math.min(14, Math.floor((agiVal - 1) * 3));
    if (tuskEquipped) bonusWidth += 8;
    if (wId === "eq_w_kim") bonusWidth += 4;
    if (aId === "eq_a_gloves_c") bonusWidth += 3;

    targetWidth = Math.min(50, 24 + bonusWidth);
    if (p.nextSlashWiden) {
        targetWidth = Math.min(62, targetWidth + 12);
        p.nextSlashWiden = false;
    }
    targetStart = Math.floor(Math.random() * (85 - targetWidth - 15)) + 15;

    let baseSpd = tuskEquipped ? 1.3 : 1.75;
    if (wId === "eq_w_baruka") baseSpd *= 0.80;
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
        systemNotify(`💧 Maná insuficiente para ordenar el Tajo Carmesí de Igris (Requiere ${cost} MP).`, "danger");
        return;
    }
    clearInterval(channelInterval);
    if (slashAnimFrame) cancelAnimationFrame(slashAnimFrame);
    closeModal('confirm-modal');

    p.sovereignCritDiscount = false;
    consumeMPFast(cost, () => {
        playCommanderUltCinematic('igris', () => {
            systemNotify("⚔️ ¡TAJO CARMESÍ DE IGRIS! Núcleo partido en dos con precisión absoluta.", "purple");
            executeSealSuccess(true);
        });
    });
}

function validateAndSeal() {
    if (slashAnimFrame) cancelAnimationFrame(slashAnimFrame);

    let hitEnd = targetStart + targetWidth;
    let igrisEquipped = p && p.equippedShadows && p.equippedShadows.includes('igris');
    let critRatio = igrisEquipped ? 0.45 : 0.35; // Igris ensancha +10% la zona de Crítico Perfecto
    let critMargin = targetWidth * critRatio;
    let critStart = targetStart + ((targetWidth - critMargin) / 2);
    let critEnd = critStart + critMargin;

    let wId = (p && p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p && p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p && p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";

    if (slashPos >= targetStart && slashPos <= hitEnd) {
        let isCrit = (wId === "eq_w_kamish") || (slashPos >= critStart && slashPos <= critEnd);
        executeSealSuccess(isCrit);
    } else {
        p._arcCritChain = 0;
        let ironEquipped = p && p.equippedShadows && p.equippedShadows.includes('iron');
        let dmg = (p.cryoBuffUntil && Date.now() < p.cryoBuffUntil) ? 2.5 : 5;
        if (ironEquipped) dmg = +(dmg * 0.25).toFixed(1);
        if (aId === "eq_a_leather") dmg = Math.max(1, dmg - 2);
        if (accId === "eq_acc_gate") dmg *= 0.5;
        if (p.ironImmunityUntil && Date.now() < p.ironImmunityUntil) dmg = 0;

        if (ironEquipped && Math.random() < 0.40) {
            p.gold += 10;
            systemNotify(`🛡️ ¡REBOTE DE BASTIÓN! Iron desvió el contraataque con su escudo y extrajo +10 G (Daño: -${dmg} HP).`, "gold");
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
    let currentDayStr = new Date().toDateString();
    let wId = (p.equipment && p.equipment.weapon) ? p.equipment.weapon.id : "";
    let aId = (p.equipment && p.equipment.armor) ? p.equipment.armor.id : "";
    let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";

    let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
    let maxMP = p.stats ? Math.floor(1000 + ((p.stats.int - 1) * 1000)) : 1000;

    if (!pendingReward || !p) return;

    let igrisActive = p.equippedShadows && p.equippedShadows.includes('igris');
    let igrisBuff = igrisActive ? 1 + ((p.shadowArmy.igris.level || 1) * 0.03) : 1;
    let critMult = isCrit ? 1.15 : 1.0;
    let voidMult = (p.voidXpBuffUntil && now < p.voidXpBuffUntil) ? 2.0 : 1.0;
    if (p._arcPrismUntil && now < p._arcPrismUntil) voidMult *= 1.5;
    if (p._arcEclipseActive && now < p._arcEclipseActive) voidMult *= 2.5;

    if (p.demonBloodUntil && now < p.demonBloodUntil) {
        voidMult *= 1.25;
        p.hp = Math.min(maxHP, p.hp + 25);
        p.mp = Math.min(maxMP, (p.mp || 0) + 200);
        systemNotify("👹 Frenesí de Sangre de Demonio Noble: +25 HP y +200 MP absorbidos.", "danger");
    }

    let beruLvl = (p.shadowArmy && p.shadowArmy.beru) ? (p.shadowArmy.beru.level || 1) : 1;
    let beruGoldMult = (p.beruSpeedUntil && now < p.beruSpeedUntil) ? (1 + ((35 + ((beruLvl - 1) * 3)) / 100)) : 1.0;
    let wolfGoldMult = (accId === "eq_acc_wolf") ? 1.10 : 1.0;
let copperFocusMult = (pendingReward.type === 'study' && accId === "eq_acc_copper") ? 1.25 : 1.0;
    let hasWolfTitle = Array.isArray(p.titles) && p.titles.some(t => t.id === 't_wolf_slayer');
    let wolfStudyXpMult = (pendingReward.type === 'study' && hasWolfTitle) ? 1.05 : 1.0;

    let finalXP = Math.floor((pendingReward.xp || 0) * igrisBuff * critMult * voidMult * copperFocusMult * wolfStudyXpMult);
    let finalGold = 0;

    if (p.starStreamNext && (pendingReward.gold || 0) > 0) {
        finalGold = Math.floor((pendingReward.gold || 0) * 3 * igrisBuff);
        p.starStreamNext = false;
        systemNotify("🌟 ¡Patrocinio del Star Stream consumido! Oro triplicado libre de impuestos.", "gold");
    } else {
        let taxRate = (p._arcGildedUntil && now < p._arcGildedUntil) ? 1.0 : GOLD_NERF;
        finalGold = Math.floor((pendingReward.gold || 0) * igrisBuff * beruGoldMult * wolfGoldMult * taxRate);
    }

    if (pendingReward.stat === 'str' && p.infantry && p.infantry.orcs > 0) {
        let orcMult = (accId === "eq_acc_metus") ? 4.5 : 3;
        finalGold += Math.floor(p.infantry.orcs * orcMult);
    }
    if (pendingReward.id && pendingReward.id.includes('traffic') && aId === "eq_a_serpento") {
    if (pendingReward.id === 'm_traffic_ida') {
                p.chorrosIdaFinishedAt = Date.now();
                saveData();
                setTimeout(() => {
                    if (typeof renderRoutine === "function") renderRoutine();
                    if (typeof systemNotify === "function") {
                        systemNotify("🛣️ Ruta Los Chorros (Retorno) ya está disponible en tu Tablón para tu viaje de regreso.", "info");
                    }
                }, 30100);
            }
        finalGold += 15;
    }
    if (pendingReward.type === 'routine' && accId === "eq_acc_silver") {
        finalGold += 10;
    }

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let isLate = (h === 21 && m >= 15) || h >= 22 || h < 4;
    
    if (isLate && p.nightPassActive !== currentDayStr && p.mercyActive !== currentDayStr && pendingReward.type !== 'penalty') {
        finalXP = 0;
        finalGold = 0;
        systemNotify("Maldición de Insomnio: Has quemado tu estamina en horario prohibido. +0 G, +0 XP.", "danger");
    }

    p.xp += finalXP;
    p.gold += finalGold;

    let mpGain = 45;
    if (pendingReward.type === 'study') {
        mpGain = (pendingReward.mins === 25) ? 110 : 35;
        if (hasWolfTitle) mpGain = Math.floor(mpGain * 1.40);
    } else if (pendingReward.mins && pendingReward.mins >= 40) {
        mpGain = 65;
    }
    if (isCrit) mpGain += 20;
    if (wId === "eq_w_scythe") {
        mpGain += 80;
        p.hp = Math.min(maxHP, p.hp + 8);
    }
    if (pendingReward.type === 'study' && accId === "eq_acc_copper") mpGain += 50;
    if (pendingReward.type === 'study' && p.sageTeaFocusMp) {
        mpGain += 180;
        p.sageTeaFocusMp = false;
        systemNotify("🍵 Infusión del Sabio asimilada: +180 MP extra canalizados por tu sesión de estudio.", "purple");
    }
    if (pendingReward.type === 'routine' && p.whiteTigerBounty) {
        p.gold += 110;
        p.whiteTigerBounty = false;
        systemNotify("🐯 Convenio Tigre Blanco liquidado: +110 G limpios transferidos a tu cuenta.", "gold");
    }
    if (p.shadowArmy.min && p.shadowArmy.min.usedForever) mpGain = Math.floor(mpGain * 1.05);
    p.mp = Math.min(maxMP, (p.mp || 0) + mpGain);
    if (isCrit) {
        p.sovereignCritDiscount = true;
        systemNotify(`⚡ ¡CORTE CRÍTICO PERFECTO! +15% EXP, +${mpGain} MP y la próxima Habilidad Activa de tus Sombras costará -50% MP.`, "gold");
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
                        name: '🕊️ Protección de las Almas Caídas',
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
                    systemNotify("🕊️ Has conseguido un logro oculto: Hacer 2 veces esta ruta desbloquea en tu siguiente nivel [Protección de las Almas Caídas]. Donde otros cayeron en el asfalto, Dios observa tu camino y te cuida (+80 Escudo de Gracia y 100% SP).", "dungeon_major");
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
                    systemNotify("🍵 Infusión del Sabio consumida: Ganancia de INT duplicada (+0.10 INT).", "purple");
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
                systemNotify("📜 ¡CONTRATO DE SANGRE CUMPLIDO AL 100%! Recibes +250 G limpios y +2 Cristales de Maná.", "gold");
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
                systemNotify(`🍵 Infusión del Sabio consumida: Ganancia de INT duplicada (+${intGain.toFixed(2)} INT).`, "purple");
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
            systemNotify("🪙 +35 G adicionales encontrados en la grieta.", "gold");
        } else if (rng > 0.35 && typeof rollLootDrop === "function") {
            rollLootDrop(false);
        } else {
            p.crystals = (p.crystals || 0) + 1;
            systemNotify("💠 +1 Cristal de Maná condensado.", "purple");
        }
    }
    
    while (p.xp >= p.maxXp) {
        p.level++;
        p.xp -= p.maxXp;
        p.maxXp = (typeof getRequiredXpForLevel === "function") ? getRequiredXpForLevel(p.level) : Math.floor(100 + (p.level - 1) * 18); 
        p.hp = maxHP;
        p.sp = 100;
        p.mp = maxMP;
        p.crystals = (p.crystals || 0) + 2;
    if(p.fallenSoulsPendingNextLvl) {
            p.fallenSoulsPendingNextLvl = false;
            p.phoenixFeatherActive = currentDayStr;
            p.arcticShield = (p.arcticShield || 0) + 120;
            systemNotify("🕊️ ¡BENDICIÓN DE NIVEL ACTIVADA [Protección de las Almas Caídas]! «Jehová guardará tu salida y tu entrada» (Salmos 121:8). Seguro de vida celestial activo hoy y +120 de Escudo de Gracia.", "dungeon_major");
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
    systemNotify(`🐜 ¡DEPREDACIÓN DE BERU (Niv.${beruLvl})! Devoró el núcleo enemigo: +${statGain} ${labels[pick]} permanente y +${hpGain} HP.`, "purple");
}

function attemptShadowExtraction(rank) {
    ensureShadowStructure();
    if (rank === 'S' || rank === 'SSS') {
        p.shadowArmy.beru.unlocked = true;
    }
    if (rank !== 'B' && rank !== 'A' && rank !== 'S' && rank !== 'SSS') return;

    let baseChance = (rank === 'S' || rank === 'SSS') ? 0.35 : (rank === 'A' ? 0.50 : 0.60); 
    let intBonus = p.stats ? (p.stats.int - 1) * 0.03 : 0;
    let totalChance = baseChance + intBonus;

    if (p.extractionBuffUntil && Date.now() < p.extractionBuffUntil) {
        totalChance *= 2;
    }

    totalChance = Math.min(0.92, totalChance);

    if (Math.random() <= totalChance) {
        p._arcFailAriseCount = 0;
        systemNotify("🗣️ ¡SURGE! Extracción Exitosa. La sombra se arrodilla ante tu voluntad.", "purple");
        let gain = (rank === 'S' || rank === 'SSS') ? 5 : (rank === 'A' ? 3 : 1);
        let accId = (p.equipment && p.equipment.accessory) ? p.equipment.accessory.id : "";
        let soldierGain = (accId === "eq_acc_metus") ? 2 : 1;

        p.crystals = (p.crystals || 0) + gain;
        p.infantry.soldiers = Math.min(25, (p.infantry.soldiers || 0) + soldierGain);
        systemNotify(`+${gain} Cristales de Maná y +${soldierGain} Soldado(s) de Sombra reclutado(s).`, "gold");
    } else {
        systemNotify("Extracción Fallida. El alma resistió el llamado y se desvaneció.", "danger");
        if (typeof _evalArcAriseFail === "function") _evalArcAriseFail();
    }
}

/* ==========================================================================
   7. SANTUARIO DEL MONARCA: VITRINA ARTICULADA Y SELLO DE ISLA DE JEJU
   ========================================================================== */
function renderShadowSanctuary() {
    ensureShadowStructure();
    let maxSlots = getMaxShadowSlots();
    let now = Date.now();

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

            // Inyectar la física de respiración única para este comandante específico
            let customIdleSvg = getCommanderSVG(activeCmdId).replace(/svg-torso-solid/g, `cmd-idle-${activeCmdId}`);

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
                <div class="commander-svg-stage">${customIdleSvg}</div>
                <div class="altar-info-bar">
                    <div style="font-size:1.15em; font-weight:700; color:${meta.color}; text-transform:uppercase; letter-spacing:1px;">
                        ${meta.name} • NIV. ${st.level || 1}
                    </div>
                    <div style="font-size:0.8em; color:#cbd5e1; margin:3px 0 8px 0;">
                        ${meta.title} (<span style="color:#f43f5e;">-${meta.mpDrain} MP/min base</span>)
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-gold" style="flex:1; padding:8px; font-size:0.8em;" onclick="castCommanderActive('${activeCmdId}')">⚡ ${meta.activeName} (-${effCost} MP)</button>
                        <button class="btn btn-red" style="flex:1; padding:8px; font-size:0.8em;" onclick="toggleEquipCommander('${activeCmdId}')">🌑 Regresar a mi Sombra</button>
                    </div>
                </div>`;
} else {
            // Trono 100% compacto: El botón ¡SURGE! permanece bloqueado hasta que desbloquees tu primera sombra
            altarEl.classList.add('resting-compact');
            let firstUnlockedCmd = Object.keys(COMMANDERS_META).find(k => p.shadowArmy[k] && p.shadowArmy[k].unlocked);
            let surgeBtnHtml = firstUnlockedCmd
                ? `<button class="btn btn-main" style="padding:8px 14px; font-size:0.78em; flex-shrink:0;" onclick="toggleEquipCommander('${firstUnlockedCmd}')">🗣️ ¡SURGE!</button>`
                : `<button class="btn btn-red" style="padding:8px 12px; font-size:0.72em; flex-shrink:0; opacity:0.5; cursor:not-allowed;" disabled>${getHoloLockSVG(12, "#ffffff")} SIN SOMBRAS (NIV.40)</button>`;

            altarEl.innerHTML = `
                <div class="altar-info-bar" style="margin-top:0; display:flex; justify-content:space-between; align-items:center; gap:10px; padding:10px 14px; width:100%;">
                    <div style="text-align:left;">
                        <div style="font-size:0.92em; font-weight:700; color:#94a3b8; letter-spacing:1px;">TRONO EN REPOSO ABSOLUTO</div>
                        <div style="font-size:0.74em; color:var(--success); font-family:'Share Tech Mono', monospace;">Consumo: 0 MP/min (Núcleo Estable)</div>
                    </div>
                    ${surgeBtnHtml}
                </div>`;
        }
    }

    for (let i = 1; i <= 3; i++) {
        let slotEl = document.getElementById(`slot-shadow-${i}`);
        if (!slotEl) continue;

        if (i > maxSlots) {
            slotEl.className = "shadow-slot locked-slot";
            let cond = (i === 2)
                ? `Niv.45 o STR+INT: ${Math.floor((p.stats.str + p.stats.int) * 10)}/500`
                : `Niv.75 + INT ${p.stats.int.toFixed(2)}/4.50`;
            slotEl.innerHTML = `<span class="lock-icon">${getHoloLockSVG(26, "#ff2a55")}</span><span class="slot-lock-text">RANURA ${i}</span><span class="slot-2-condition">${cond}</span>`;
        } else {
            let cmdId = p.equippedShadows[i - 1];
            if (cmdId && COMMANDERS_META[cmdId]) {
                let meta = COMMANDERS_META[cmdId];
                let cmdState = p.shadowArmy[cmdId];
                slotEl.className = "shadow-slot active-slot";
                slotEl.onclick = null;
                slotEl.innerHTML = `
                    <div style="width:62px; height:62px; margin:0 auto;" onclick="selectShowcaseCommander('${cmdId}')">${getCommanderSVG(cmdId)}</div>
                    <div style="color:${meta.color}; font-weight:700; font-size:0.82em;">${meta.name.toUpperCase()}</div>
                    <div style="font-size:0.7em; color:#f43f5e;">Niv.${cmdState.level || 1} (-${meta.mpDrain} MP/m)</div>
                    <button class="btn btn-red" style="width:100%; padding:5px 4px; font-size:0.65em; margin-top:4px;" onclick="toggleEquipCommander('${cmdId}')">🌑 Guardar</button>`;
            } else {
                slotEl.className = "shadow-slot";
                slotEl.onclick = null;
                slotEl.innerHTML = `<span class="slot-1-meta">[RANURA ${i} LIBRE]</span><span style="font-size:0.7em; color:var(--success); margin-top:4px;">0 MP/m</span><span style="font-size:0.65em; color:var(--text-muted);">Despliega abajo</span>`;
            }
        }
    }

    let minCont = document.getElementById('min-sanctuary-container');
    if (minCont) {
        let canSeeMin = (p.level >= 20) || (p.dungeonKeys && p.dungeonKeys.rankS > 0) || p.jejuCleared || (p.shadowArmy.min && p.shadowArmy.min.usedForever);
        if (!canSeeMin) {
            minCont.style.display = 'none';
            minCont.innerHTML = '';
        } else {
            minCont.style.display = 'block';
            if (p.shadowArmy.min && p.shadowArmy.min.usedForever) {
                minCont.innerHTML = `
                <div class="card" style="border-color:#10b981; border-left:5px solid #10b981; background:rgba(6, 78, 59, 0.2);">
                    <div class="card-body" style="padding-right:0;">
                        <div class="card-title" style="color:#00ffcc;">📗 MEMORIAL: MIN BYUNG-GYU <span class="card-tag E">EN PAZ ETERNA</span></div>
                        <div class="card-desc" style="margin-bottom:0; color:#a7f3d0;">Liberaste su alma tras obrar el milagro de resurrección. Su bendición (+5% regeneración de MP y +0.50 STR/INT) vive en tu perfil para siempre.</div>
                    </div>
                </div>`;
            } else if (!p.shadowArmy.min || !p.shadowArmy.min.unlocked) {
                minCont.innerHTML = `
                <div class="card" style="border-color:#334155; border-left:5px solid var(--color-s); flex-direction:column; align-items:stretch; background:rgba(4, 8, 20, 0.85); opacity:0.85;">
                    <div class="shadow-title" style="color:var(--color-s);">
                        <span>${getHoloLockSVG(16, "#38bdf8")} Alma Sellada: Min Byung-Gyu</span>
                        <span class="card-tag S">EXCLUSIVO: ISLA DE JEJU (RANGO S)</span>
                    </div>
                    <p class="shadow-desc" style="color:#94a3b8; margin-bottom:10px;">Sientes el eco de un Sanador de Rango S caído. Despeja la incursión <b>Isla de Jeju (Nido de la Reina Hormiga)</b> en el Sonar para desbloquear su único milagro de resurrección.</p>
                    <button class="btn btn-red" style="width:100%; opacity:0.5; cursor:not-allowed;" disabled>${getHoloLockSVG(14, "#ffffff")} BLOQUEADO (REQUIERE CONQUISTAR ISLA DE JEJU)</button>
                </div>`;
            } else {
                minCont.innerHTML = `
                <div class="card" style="border-color:#00ffcc; border-left:5px solid #00ffcc; flex-direction:column; align-items:stretch; background:linear-gradient(135deg, rgba(16,185,129,0.15), var(--bg-card));">
                    <div class="shadow-title" style="color:#00ffcc;">
                        <span>📗 Sombra Sagrada: Min Byung-Gyu</span>
                        <span class="card-tag E">1 ÚNICO USO</span>
                    </div>
                    <p class="shadow-desc" style="color:#d1fae5;">Sanador de Rango S de la Isla de Jeju. No ocupa ranura ni drena MP. Al invocar su Grimorio Holográfico Verde, cancela tu muerte o penalización, restaura tu HP/SP/MP al 200%, purga el Abismo, te otorga +0.50 STR/INT permanentes y su alma se libera para siempre dejando un título único en tu Perfil.</p>
                    <button class="btn btn-green" style="width:100%;" onclick="triggerMinByungGyuMiracle(false)">✨ INVOCAR GRIMORIO Y LIBERAR ALMA (1 USO EN LA PARTIDA)</button>
                </div>`;
            }
        }
    }

    let cmdCont = document.getElementById('commanders-list-container');
    if (cmdCont) {
        cmdCont.innerHTML = '';
        let discountBanner = p.sovereignCritDiscount
            ? `<div style="margin-bottom:12px; padding:8px 12px; background:rgba(0,210,255,0.14); border:1px solid #38bdf8; color:#7dd3fc; font-size:0.85em; font-weight:700; text-align:center;">⚡ AUTORIDAD DEL SOBERANO ACTIVA: ¡Tu próxima Habilidad Activa cuesta -50% de Maná por tu último Corte Crítico!</div>`
            : '';
        cmdCont.innerHTML += discountBanner;

        Object.keys(COMMANDERS_META).forEach(key => {
            let meta = COMMANDERS_META[key];
            let st = p.shadowArmy[key];
            let isEquipped = p.equippedShadows.includes(key);
            let isCooldown = (key === 'tank' && st.cooldownUntil && now < st.cooldownUntil);
            let effCost = getEffectiveActiveCost(key);

            let statusBadge = '';
            if (!st.unlocked) {
                statusBadge = `<span class="card-tag A">${getHoloLockSVG(11, "#38bdf8")} REQ: ${meta.reqText}</span>`;
            } else if (isCooldown) {
                let hrsLeft = Math.ceil((st.cooldownUntil - now) / 3600000);
                statusBadge = `<span class="card-tag C">🧊 HIBERNANDO (${hrsLeft}h)</span>`;
            } else if (isEquipped) {
                statusBadge = `<span class="card-tag B">⚡ EN CAMPO</span>`;
            } else {
                statusBadge = `<span class="card-tag E">EN LA SOMBRA (0 MP)</span>`;
            }

            let tankExtra = (key === 'tank' && st.unlocked)
                ? `<div style="color:#38bdf8; font-size:0.82em; margin-top:4px;">🛡️ Guardia Nocturna disponible: <b>${st.usesLeft !== undefined ? st.usesLeft : 2} / 2 noches</b> antes de hibernar 24h.</div>`
                : '';

            let actionsHtml = '';
            if (!st.unlocked) {
                actionsHtml = `<button class="btn btn-purple" style="width:100%;" onclick="unlockCommanderWithCrystals('${key}')">${getHoloLockSVG(14, "#ffffff")} Forzar Extracción Real (4 CM)</button>`;
            } else {
                let equipBtn = isCooldown
                    ? `<button class="btn btn-red" style="flex:1; opacity:0.5;" disabled>Hibernando (24h)</button>`
                    : `<button class="btn ${isEquipped ? 'btn-red' : 'btn-main'}" style="flex:1;" onclick="toggleEquipCommander('${key}')">${isEquipped ? '🌑 Regresar a mi Sombra' : '🗣️ ¡SURGE! (Desplegar)'}</button>`;

                let upCost = (key === 'igris') ? 1 : 2;
                actionsHtml = `
                <div style="display:flex; gap:8px; width:100%; margin-bottom:8px;">
                    ${equipBtn}
                    <button class="btn btn-purple" style="flex:1;" onclick="upgradeCommander('${key}')">⬆️ Subir Niv. (${upCost} CM)</button>
                </div>
                <button class="btn btn-gold" style="width:100%;" onclick="castCommanderActive('${key}')">⚡ ACTIVA: ${meta.activeName} (-${effCost} MP${p.sovereignCritDiscount ? ' • -50% CRIT' : ''})</button>`;
            }

            cmdCont.innerHTML += `
            <div class="card shadow-card" style="border-left-color:${meta.color};">
                <div style="display:flex; gap:12px; align-items:center; margin-bottom:8px;">
                    <div style="width:60px; height:60px; flex-shrink:0; background:rgba(0,0,0,0.65); border:1px solid ${meta.color}; border-radius:2px;">
                        ${getCommanderSVG(key)}
                    </div>
                    <div style="flex:1;">
                        <div class="shadow-title" style="color:${meta.color}; margin-bottom:2px;">
                            <span>${meta.name} (Niv. ${st.level || 1})</span>
                            ${statusBadge}
                        </div>
                        <div style="font-size:0.78em; color:var(--text-lore);">${meta.title}</div>
                    </div>
                </div>
                <div class="shadow-stats-box">
                    <div><strong style="color:var(--neon-main);">Pasiva (-${meta.mpDrain} MP/min):</strong> ${getCommanderDynamicText(key).passive}</div>
                    <div style="margin-top:4px;"><strong style="color:#38bdf8;">Activa (${effCost} MP):</strong> ${getCommanderDynamicText(key).active}</div>
                    ${tankExtra}
                </div>
                ${actionsHtml}
            </div>`;
        });
    }

    let infCont = document.getElementById('infantry-list-container');

    if (infCont) {
        if (!p.infantryDisabled) p.infantryDisabled = {};
        let hideTexts = !!p.hideInfantryDescriptions;

        infCont.innerHTML = `
        <div style="display:flex; justify-content:flex-end; margin-bottom:10px;">
            <button class="btn btn-blue" style="padding:5px 10px; font-size:0.74em;" onclick="p.hideInfantryDescriptions = !p.hideInfantryDescriptions; saveData(); renderShadowSanctuary();">
                ${hideTexts ? '👁️ Mostrar Textos de Infantería' : '🙈 Ocultar Textos de Infantería'}
            </button>
        </div>`;

        Object.keys(INFANTRY_META).forEach(k => {
            let inf = INFANTRY_META[k];
            let count = p.infantry[k] || 0;
            let isOff = !!p.infantryDisabled[k];
            infCont.innerHTML += `
            <div class="card rank-B" style="margin-bottom:10px; opacity:${isOff ? '0.5' : '1'};">
                <div class="card-body">
                    <div class="card-title">
                        ${inf.icon} ${inf.name} 
                        <span class="card-tag ${isOff ? 'A' : 'B'}">${count} / ${inf.max} ${isOff ? '(PAUSADO)' : ''}</span>
                    </div>
                    ${hideTexts ? '' : `<div class="card-desc" style="margin-bottom:0;">${inf.desc}</div>`}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn btn-purple" style="padding:8px 12px; font-size:0.8em;" onclick="recruitInfantry('${k}')">+1 (${inf.cost} CM)</button>
                    ${count > 0 ? `<button class="btn ${isOff ? 'btn-green' : 'btn-red'}" style="padding:5px 8px; font-size:0.68em;" onclick="toggleInfantryUnit('${k}')">${isOff ? 'Activar' : 'Desactivar'}</button>` : ''}
                </div>
            </div>`;
        });
    }
}

function toggleInfantryUnit(typeKey) {
    if (!p.infantryDisabled) p.infantryDisabled = {};
    p.infantryDisabled[typeKey] = !p.infantryDisabled[typeKey];
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    renderShadowSanctuary();
}

function toggleEquipCommander(cmdId) {
    ensureShadowStructure();
    let st = p.shadowArmy[cmdId];
    if (!st || !st.unlocked) return;

    if (cmdId === 'tank' && st.cooldownUntil && Date.now() < st.cooldownUntil) {
        let hrs = Math.ceil((st.cooldownUntil - Date.now()) / 3600000);
        systemNotify(`🧊 Tank está agotado tras protegerte 2 noches. Hibernación restante: ${hrs}h.`, "danger");
        return;
    }

    let idx = p.equippedShadows.indexOf(cmdId);
    if (idx !== -1) {
        p.equippedShadows.splice(idx, 1);
        st.active = false;
        systemNotify(`🌑 ${COMMANDERS_META[cmdId].name} ha regresado a tu sombra. Ya no consume Maná.`, "info");
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
        systemNotify(`🗣️ ¡SURGE! ${COMMANDERS_META[cmdId].name} se ha desplegado (-${COMMANDERS_META[cmdId].mpDrain} MP/min).`, "purple");
    }

    saveData();
    if (typeof updateHUD === "function") updateHUD();
    if (typeof renderMiniArenaUnits === "function") renderMiniArenaUnits();
}

function playAriseExtractionAnim(cmdId, isSuccess, chancePct, onFinish) {
    let meta = COMMANDERS_META[cmdId];
    let ov = document.createElement('div');
    ov.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:radial-gradient(circle, rgba(18,4,36,0.96) 0%, #010206 90%); z-index:12500; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:25px;';
    ov.innerHTML = `
        <div style="font-family:'Share Tech Mono', monospace; color:#d946ef; letter-spacing:4px; font-size:0.9em; margin-bottom:10px;">[ EXTRAYENDO ALMA DEL ABISMO • ${chancePct}% PROB. ]</div>
        <h1 style="font-size:2.6em; color:#00d2ff; text-shadow:0 0 25px #00d2ff, 0 0 45px #9d00ff; letter-spacing:3px; margin-bottom:18px; animation: popIn 0.35s ease-out;">🗣️ « ¡SURGE! »</h1>
        <div style="width:210px; height:210px; filter:brightness(0) drop-shadow(0 0 25px #9d00ff); transition:all 1.2s ease;" id="arise-silhouette-box">
            ${getCommanderSVG(cmdId)}
        </div>
        <p style="color:#cbd5e1; font-family:'Share Tech Mono', monospace; font-size:0.88em; margin-top:18px;" id="arise-status-txt">Extendiendo tu mano hacia la sombra de ${meta.name}...</p>
    `;
    document.body.appendChild(ov);
    if (typeof playSystemSound === "function") playSystemSound('purple');
    if (navigator.vibrate) navigator.vibrate([100, 60, 220]);

    setTimeout(() => {
        let sil = document.getElementById('arise-silhouette-box');
        let stTxt = document.getElementById('arise-status-txt');
        if (isSuccess) {
            if (sil) sil.style.filter = 'brightness(1) drop-shadow(0 0 30px #00d2ff)';
            if (stTxt) { stTxt.style.color = '#00ffcc'; stTxt.innerText = '¡EL ALMA SE ARRODILLA ANTE EL MONARCA!'; }
        } else {
            if (sil) { sil.style.filter = 'brightness(0) drop-shadow(0 0 25px #ff2a55)'; sil.style.transform = 'scale(0.75)'; sil.style.opacity = '0.25'; }
            if (stTxt) { stTxt.style.color = '#ff2a55'; stTxt.innerText = '¡EL ALMA RESISTIÓ EL LLAMADO Y SE DESVANECIÓ!'; }
        }
    }, 1150);

    setTimeout(() => {
        ov.remove();
        if (typeof onFinish === "function") onFinish();
    }, 2250);
}

function unlockCommanderWithCrystals(cmdId) {
    ensureShadowStructure();
    let st = p.shadowArmy[cmdId];
    let now = Date.now();

    const minCanonLvl = { igris: 40, tank: 45, iron: 50, tusk: 68, beru: 82 };
    if ((p.level || 1) < (minCanonLvl[cmdId] || 40)) {
        systemNotify(`🔒 Autoridad Insuficiente: Necesitas alcanzar al menos el Nivel ${minCanonLvl[cmdId]} en la historia antes de intentar extraer a [${COMMANDERS_META[cmdId].name}].`, "danger");
        return;
    }

    if (st.ariseCooldownUntil && now < st.ariseCooldownUntil) {
        let minsLeft = Math.ceil((st.ariseCooldownUntil - now) / 60000);
        systemNotify(`⏳ El alma de [${COMMANDERS_META[cmdId].name}] aún resiste tu autoridad. Espera ${minsLeft} min o despeja una Mazmorra para disipar su resistencia.`, "danger");
        return;
    }

    let attemptCost = 4;
    if ((p.crystals || 0) < attemptCost) {
        systemNotify(`Necesitas ${attemptCost} Cristales de Maná (CM) para intentar extraer a este Comandante.`, "danger");
        return;
    }

    p.crystals -= attemptCost;

    const baseRates = { tank: 0.40, iron: 0.35, tusk: 0.28, beru: 0.20, igris: 1.0 };
    let chance = baseRates[cmdId] || 0.35;
    let intBonus = p.stats ? Math.max(0, (p.stats.int - 1) * 0.05) : 0;
    chance += intBonus;

    let hasOrb = p.extractionBuffUntil && now < p.extractionBuffUntil;
    if (hasOrb) chance = Math.min(0.90, chance * 1.75);

    let isSuccess = Math.random() <= chance;
    let chancePct = Math.round(chance * 100);

    playAriseExtractionAnim(cmdId, isSuccess, chancePct, () => {
        if (isSuccess) {
            st.unlocked = true;
            st.ariseCooldownUntil = null;
            if (typeof playSystemSound === "function") playSystemSound('gold');
            systemNotify(`🗣️ ¡SURGE! (${chancePct}% prob.) El alma de [${COMMANDERS_META[cmdId].name}] ha jurado lealtad eterna.`, "purple");
        } else {
            st.ariseCooldownUntil = now + (3 * 3600000);
            if (typeof playSystemSound === "function") playSystemSound('danger');
            if (typeof _evalArcAriseFail === "function") _evalArcAriseFail();
            systemNotify(`💀 Extracción Fallida (${chancePct}% prob.). El alma de [${COMMANDERS_META[cmdId].name}] resistió el llamado y se ocultó por 3 Horas.`, "danger");
        }
        saveData();
        if (typeof updateHUD === "function") updateHUD();
    });
}

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

function recruitInfantry(typeKey) {
    ensureShadowStructure();
    let meta = INFANTRY_META[typeKey];
    if (!meta) return;
    if ((p.infantry[typeKey] || 0) >= meta.max) {
        systemNotify(`Tu batallón de ${meta.name} ya está en su capacidad máxima (${meta.max}).`, "info");
        return;
    }
    if ((p.crystals || 0) < meta.cost) {
        systemNotify(`Necesitas ${meta.cost} Cristales de Maná (CM) para reclutar esta unidad.`, "danger");
        return;
    }
    p.crystals -= meta.cost;
    p.infantry[typeKey] = (p.infantry[typeKey] || 0) + 1;
    if (typeof _evalArcInfantryFull === "function") _evalArcInfantryFull();
    saveData();
    if (typeof updateHUD === "function") updateHUD();
    systemNotify(`${meta.icon} +1 ${meta.name} incorporado a tu legión.`, "purple");
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
    let currentDayStr = new Date().toDateString();
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
                // Sistema Decreciente Diario de Oro de Igris: 50 G -> 25 G -> 15 G -> 0 G
                if (p.igrisGoldDay !== currentDayStr) {
                    p.igrisGoldDay = currentDayStr;
                    p.igrisGoldUses = 0;
                }
                let goldReward = getIgrisNextGoldReward();
                p.igrisGoldUses = (p.igrisGoldUses || 0) + 1;
                p.gold += goldReward;

                let skipMins = 25 + (bonus * 2);
                let goldMsg = goldReward > 0
                    ? `+${goldReward} G obtenidos (Cobro diario ${p.igrisGoldUses}/3)`
                    : `0 G (Límite de 3 cobros diarios alcanzado hoy)`;

                if (p.activeMissions && Object.keys(p.activeMissions).length > 0) {
                    Object.keys(p.activeMissions).forEach(k => {
                        p.activeMissions[k] -= (skipMins * 60000);
                    });
                    systemNotify(`⚔️ ¡TAJO CARMESÍ (Niv.${lvl})! Misiones activas adelantadas ${skipMins} min y ${goldMsg}.`, "purple");
                    if (typeof renderRoutine === "function") renderRoutine();
                } else {
                    if (goldReward > 0) {
                        p.xp += 45 + (bonus * 10);
                        systemNotify(`⚔️ Corte de entrenamiento de Igris: +${45 + (bonus * 10)} XP y ${goldMsg}.`, "purple");
                    } else {
                        systemNotify(`⚔️ Igris ejecutó un tajo al vacío. Despliega una misión para adelantarla (${goldMsg}).`, "info");
                    }
                }
            } else if (cmdId === 'tank') {
                let shieldAdd = 60 + (bonus * 12);
                let spAdd = Math.min(100, 30 + (bonus * 3));
                let freezeMins = 60 + (bonus * 10);
                p.arcticShield = (p.arcticShield || 0) + shieldAdd;
                p.tankCurfewDelayDay = currentDayStr;
                if (typeof animateSPChange === "function") animateSPChange(spAdd);
                else p.sp = Math.min(100, p.sp + spAdd);
                if (p.bosses && p.bosses.length > 0) {
                    p.bosses.forEach(b => { if (b.start) b.start += (freezeMins * 60000); });
                    if (typeof renderBosses === "function") renderBosses();
                }
                systemNotify(`🐻‍❄️ ¡ESTAMPIDA ÁRTICA (Niv.${lvl})! +${shieldAdd} Escudo, +${spAdd} SP, Jefes congelados ${freezeMins}m y desangrado retrasado +45m hoy.`, "info");
            } else if (cmdId === 'iron') {
                let immMins = 15 + (bonus * 3);
                let spAdd = Math.min(100, 35 + (bonus * 4));
                p.ironImmunityUntil = Date.now() + (immMins * 60000);
                if (typeof animateSPChange === "function") animateSPChange(spAdd);
                else p.sp = Math.min(100, p.sp + spAdd);
                systemNotify(`🛡️ ¡PROVOCACIÓN DE IRON (Niv.${lvl})! +${spAdd} SP, Inmunidad total por ${immMins} min y Fisura Rango A con DOBLE botín.`, "gold");
                if (typeof checkFissureSpawn === "function") checkFissureSpawn(true);
            } else if (cmdId === 'tusk') {
                let hasOrb = p.equipment && p.equipment.weapon && p.equipment.weapon.id === 'eq_w_kargalgan';
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
                        let fbXp = 140 + (bonus * 25);
                        let fbGold = 60 + (bonus * 12);
                        p.xp += fbXp;
                        p.gold += fbGold;
                        systemNotify(`🔥 ¡HIMNO DE KARGALGAN (Niv.${lvl})! Paralelas ya limpias; Tusk condensó +${fbXp} XP y +${fbGold} G.`, "gold");
                    } else {
                        systemNotify(`🔥 ¡HIMNO DE KARGALGAN! ${clearedCount} misiones paralelas incineradas y selladas con todos sus atributos${hasOrb ? ' (x2 EXP)' : ''}.`, "gold");
                    }
                    if (typeof renderRoutine === "function") renderRoutine();
                }
            } else if (cmdId === 'beru') {
                let bMins = 45 + (bonus * 5);
                let gBoost = 35 + (bonus * 3);
                let hHeal = 40 + (bonus * 8);
                p.beruSpeedUntil = Date.now() + (bMins * 60000);
                let maxHP = (typeof calculateHunterMaxHP === "function") ? calculateHunterMaxHP() : 100;
                p.hp = Math.min(maxHP, p.hp + hHeal);
                systemNotify(`🐜 ¡VELOCIDAD DEL REY (Niv.${lvl} • ${bMins}m)! Tiempo en misiones anulado, +${gBoost}% Oro y +${hHeal} HP curados.`, "purple");
                if (typeof renderRoutine === "function") renderRoutine();
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

        // Restaura tu vida al 100% sin cambiar el color rojo original de tu barra de HP para siempre
        p.hp = maxHP;
        p.sp = 100;
        p.mp = maxMP;
        p.magmaOverheal = false;
        p.arcticShield = (p.arcticShield || 0) + 100;

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

    // Si aún no se han cumplido las 4 rutas en 1 día, mantener en false y quitar el logro guardado antes con 2
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

    let html = '';
    p.titles.forEach(t => {
        html += `
        <div class="card rank-S" style="border-color:#00ffcc; border-left:5px solid #00ffcc;">
            <div class="card-body" style="padding-right:0;">
                <div class="card-title" style="color:#00ffcc;">${t.name}</div>
                <div class="card-desc" style="margin-bottom:0; color:#d1fae5;">${t.desc}</div>
            </div>
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