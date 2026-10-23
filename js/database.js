/* ==========================================================================
   DATABASE.JS - BASE DE DATOS MAESTRA UNIFICADA (V4.2_TrueMonarch)
   ========================================================================== */

/* ==========================================================================
   1. MISIONES BASE DE RUTINA DIARIA
   ========================================================================== */
const baseMissions = [
    {
        id: "m_clean",
        title: "Zona Limpia",
        desc: "Mantenimiento táctico del cuarto y área personal.",
        type: "main",
        rank: "B",
        xp: 30,
        gold: 25,
        spCost: 10,
        stat: "str",
        mins: 30
    },
    {
        id: "m_traffic_ida",
        title: "Ruta Los Chorros (Descenso)",
        desc: "Tráfico de ida hacia la zona de labores manteniendo control mental.",
        type: "main",
        rank: "A",
        xp: 35,
        gold: 20,
        spCost: 20,
        stat: "agi",
        timeCat: "traffic",
        mins: 40
    },
    {
        id: "m_traffic_vuelta",
        title: "Ruta Los Chorros (Retorno)",
        desc: "Sobrevivir al tráfico pesado de regreso en hora pico.",
        type: "main",
        rank: "S",
        xp: 45,
        gold: 30,
        spCost: 30,
        stat: "agi",
        timeCat: "traffic",
        mins: 60
    },
    {
        id: "m_work",
        title: "Jornada Operativa / Deshuesadero",
        desc: "Cumple con las operaciones laborales, ventas y gestión del negocio.",
        type: "main",
        rank: "S",
        xp: 100,
        gold: 80,
        spCost: 40,
        stat: "int",
        timeCat: "work",
        mins: 240
    },
    {
        id: "m_workout",
        title: "Acondicionamiento Físico",
        desc: "Entrenamiento de fuerza y resistencia para fortalecer el receptáculo.",
        type: "main",
        rank: "A",
        xp: 60,
        gold: 40,
        spCost: 25,
        stat: "str",
        mins: 40
    },
    {
        id: "m_gf",
        title: "Vínculo Amoroso",
        desc: "Tiempo exclusivo, atención y calidad con tu pareja.",
        type: "sub",
        rank: "B",
        xp: 25,
        gold: 15,
        spCost: 5,
        stat: "int",
        mins: 120
    },
    {
        id: "m_phys",
        title: "Mecánica Serpento",
        desc: "Mantenimiento físico, limpieza y ajustes de la Naga Serpento 200R.",
        type: "sub",
        rank: "A",
        xp: 40,
        gold: 25,
        spCost: 15,
        stat: "str",
        mins: 45
    },
    {
        id: "m_creative",
        title: "Práctica Creativa / Doblaje",
        desc: "Dedica tiempo a grabar fandubs, editar en CapCut o ilustrar en Ibis Paint.",
        type: "sub",
        rank: "B",
        xp: 50,
        gold: 35,
        spCost: 15,
        stat: "int",
        mins: 30
    },
    {
        id: "m_hydration",
        title: "Recarga Biológica",
        desc: "Consume al menos 2 litros de agua pura durante la jornada.",
        type: "sub",
        rank: "C",
        xp: 25,
        gold: 15,
        spCost: 5,
        stat: "str",
        mins: 5
    }
];

/* ==========================================================================
   2. LOS 60 EVENTOS INESPERADOS (ANOMALÍAS DIARIAS)
   ========================================================================== */
const eventDB = [
    "Ev 1: Leer 1 capítulo de un libro técnico o de Relaciones Públicas de forma analítica.",
    "Ev 2: Meditar 5 minutos en completa oscuridad y silencio para estabilizar tu maná mental.",
    "Ev 3: Ejecutar una serie estricta de 20 flexiones de pecho para fortalecer el atributo STR.",
    "Ev 4: Consumir 1 litro de agua pura de golpe para purificar toxinas del cuerpo.",
    "Ev 5: Limpiar y ordenar profundamente tu escritorio de trabajo y espacio de edición.",
    "Ev 6: Escuchar con atención 'Invierno del 92' de Cuarteto de Nos analizando su lírica.",
    "Ev 7: Escuchar de forma inmersiva 'Heat Waves' de Glass Animals relajando los músculos.",
    "Ev 8: Inspeccionar visualmente la cadena, frenos y estado general de la Serpento 200R.",
    "Ev 9: Enviar un mensaje honesto de apoyo o motivación a tu novia en sus estudios médicos.",
    "Ev 10: Aislarte por completo de cualquier pantalla digital durante los próximos 15 minutos.",
    "Ev 11: Tomar una ducha con agua completamente fría para activar el sistema nervioso.",
    "Ev 12: Organizar meticulosamente tu mochila con los materiales necesarios para la universidad.",
    "Ev 13: Practicar de forma activa la pronunciación y fluidez en inglés (E4CC) por 10 minutos.",
    "Ev 14: Estudiar un video tutorial avanzado sobre técnicas de corte y transiciones en CapCut.",
    "Ev 15: Experimentar con una nueva técnica de sombreado o paleta de colores en Ibis Paint.",
    "Ev 16: Memorizar y poner en práctica un nuevo atajo de teclado complejo para optimizar el tiempo.",
    "Ev 17: Ejecutar una limpieza de archivos temporales y optimización de caché en la HP ZBook.",
    "Ev 18: Realizar estiramientos enfocados en la espalda baja y lumbar durante 3 minutos seguidos.",
    "Ev 19: Escuchar una pista enérgica de Stray Kids para inyectar motivación al atributo AGI.",
    "Ev 20: Monitorear el rendimiento y comentarios tácticos en tu cuenta de TikTok (crisppihm).",
    "Ev 21: Escribir detalladamente en una nota 3 eventos positivos que te hayan ocurrido hoy.",
    "Ev 22: Purgar y eliminar al menos 50 imágenes repetidas o capturas basura de tu Motorola.",
    "Ev 23: Mantener una posición estricta de plancha abdominal (plank) durante 1 minuto entero.",
    "Ev 24: Realizar la limpieza de los platos y utensilios de la cocina de forma proactiva.",
    "Ev 25: Redactar la estructura de un guion creativo para un video corto de tu marca personal.",
    "Ev 26: Mantener una disciplina mental absoluta: 2 horas seguidas sin emitir una sola queja.",
    "Ev 27: Limpiar físicamente con un paño adecuado las pantallas de tu laptop ZBook y tu celular.",
    "Ev 28: Ejecutar 30 sentadillas profundas manteniendo una postura impecable de entrenamiento.",
    "Ev 29: Tomarte un momento para llamar o conversar con tus abuelos y preguntar cómo están.",
    "Ev 30: Auditar tus finanzas y transacciones recientes en las aplicaciones de Banco Agrícola o Niu.",
    "Ev 31: Analizar un caso de estudio real sobre campañas de Publicidad o manejo de crisis de RP.",
    "Ev 32: Escuchar de forma analítica 'Lo Malo de Ser Bueno' de Cuarteto de Nos en un descanso.",
    "Ev 33: Estructurar y planificar el material didáctico para la próxima tutoría de matemáticas.",
    "Ev 34: Ejecutar una serie de 25 abdominales para activar el núcleo del cuerpo.",
    "Ev 35: Preparar y consumir una taza de café concentrado manteniéndote alejado del teléfono.",
    "Ev 36: Revisar tu cajón de aplicaciones y desinstalar de forma definitiva un software inútil.",
    "Ev 37: Plasmar en un papel o nota digital el objetivo prioritario e innegociable de esta semana.",
    "Ev 38: Realizar el mantenimiento preventivo y limpieza de la cadena de transmisión de la moto.",
    "Ev 39: Mirarte fijamente al espejo y sonreír forzadamente por 30 segundos para engañar al cerebro.",
    "Ev 40: Lavar y cepillar un par de zapatos o tenis que se encuentren sucios por el uso diario.",
    "Ev 41: Cerrar de forma masiva todas las pestañas inactivas que saturan el navegador Chrome.",
    "Ev 42: Estudiar a fondo el concepto y aplicaciones del 'Situational Model' de Art Graesser.",
    "Ev 43: Escuchar relajadamente la pista 'Gooey' de Glass Animals aislando tu mente de problemas.",
    "Ev 44: Intentar realizar una serie de 10 flexiones de pecho explosivas con aplauso incluido.",
    "Ev 45: Investigar métodos técnicos de optimización de rendimiento y texturas para Minecraft.",
    "Ev 46: Limpiar minuciosamente el polvo acumulado entre las teclas de tu teclado físico.",
    "Ev 47: Salir al entorno cercano y capturar una fotografía intentando aplicar la Regla de Tercios.",
    "Ev 48: Cuantificar y registrar con precisión matemática todos tus gastos hormiga del mes.",
    "Ev 49: Organizar de forma lógica la carpeta de descargas de tu PC moviendo archivos a su lugar.",
    "Ev 50: Verificar de forma manual los niveles de líquido de frenos y aceite de tu motocicleta.",
    "Ev 51: Repasar a conciencia los apuntes principales de la materia Teoría de la Comunicación.",
    "Ev 52: Desactivar por completo la conectividad WiFi y datos de tu smartphone durante 30 minutos.",
    "Ev 53: Realizar ejercicios de estiramiento y masaje en tus manos y muñecas para evitar el túnel carpiano.",
    "Ev 54: Dedicar 2 minutos de reloj a visualizar con precisión el día de tu graduación universitaria.",
    "Ev 55: Leer artículos sobre tendencias tecnológicas mundiales de diseño y publicidad por 5 minutos.",
    "Ev 56: Escuchar un tema del OST original de Solo Leveling imaginando tu avance como cazador.",
    "Ev 57: Realizar un escaneo de hardware a través del servicio en la nube de DriversCloud.",
    "Ev 58: Analizar críticamente tu marca Crisppi y escribir 3 debilidades urgentes que debes pulir.",
    "Ev 59: Ejecutar 15 repeticiones de fondos de tríceps utilizando el borde de una silla estable.",
    "Ev 60: Beber un vaso de agua fría inmediatamente al terminar de leer esta directiva del Sistema."
];

/* ==========================================================================
   3. FISURAS CONTEXTUALES Y DE EMERGENCIA
   ========================================================================== */
const fissureDB = {
    "Base": [
        { title: "Limpieza de Zona", desc: "El caos atrae a las bestias. Ordena tu escritorio o cama en menos de 5 minutos.", rank: "E", xp: 45, gold: 25 },
        { title: "Mantenimiento Mecánico", desc: "Revisa la tensión de la cadena y el nivel de aceite de la Naga Serpento.", rank: "C", xp: 75, gold: 40 },
        { title: "Purificación Doméstica", desc: "Lava los platos acumulados en la cocina antes de que mute la materia.", rank: "D", xp: 60, gold: 30 },
        { title: "Enjambre de Insectos", desc: "Haz 15 flexiones o sentadillas inmediatamente para disipar la energía mágica.", rank: "E", xp: 50, gold: 25 }
    ],
    "SunTrader": [
        { title: "Gestión de Inventario", desc: "Organiza tu área física de trabajo de forma táctica y limpia.", rank: "C", xp: 70, gold: 35 },
        { title: "Respiración Táctica", desc: "Toma 2 minutos para alejar la vista de las pantallas, hidratarte y estirar la espalda.", rank: "E", xp: 45, gold: 20 },
        { title: "Asesino de Sombras", desc: "Repasa un concepto clave o pendiente operativo sin tocar redes sociales por 5 minutos.", rank: "B", xp: 110, gold: 60 }
    ]
};

/* ==========================================================================
   4. MERCADO DEL MONARCA (140 ARTEFACTOS: BIO-SINCRONIZACIÓN Y PRIVILEGIOS V2)
   ========================================================================== */
const shopDB = [
    // ==================== SUBCARPETA 1: CONSUMIBLES (36 - 6 FILAS DE 6) ====================
    {
        id: "c_mercy",
        cat: "Consumibles",
        icon: "🪨",
        title: "Piedra de la Misericordia",
        desc: "Reliquia de compasión: Levanta la Zona de Penalización o restaura tu HP al 100%, envuelve tu barra de vida en un contorno Verde Esmeralda y extiende la caída nocturna suavemente hasta las 2:00 AM.",
        cost: 1450,
        rank: "S",
        type: "item"
    },
    {
        id: "c_magma_heart",
        cat: "Consumibles",
        icon: "❤️‍🔥",
        title: "Corazón de Magma de Vulcano",
        desc: "Sobrecarga Vital (Overheal): Rompe el límite biológico llevando tu HP al 140% de su capacidad máxima y tiñe tu barra de vida de Naranja Incandescente.",
        cost: 680,
        rank: "S",
        type: "item"
    },
    {
        id: "c_zero_serum",
        cat: "Consumibles",
        icon: "🧊",
        title: "Suero de Cero Absoluto",
        desc: "Sangre de Elfo de Hielo: Tiñe tu barra de vida de Azul Criogénico y reduce al 50% todo daño recibido por hemorragia nocturna, veneno o fallos de Corte durante 6 horas.",
        cost: 420,
        rank: "A",
        type: "item"
    },
    {
        id: "c_void_blood",
        cat: "Consumibles",
        icon: "🟣",
        title: "Sangre Corrupta del Monarca",
        desc: "Frenesí Abisal: Sacrifica -25 HP al beberla, pero tiñe tu barra de EXP de Púrpura Radiante y otorga +50% de experiencia (x1.5) durante 90 minutos.",
        cost: 640,
        rank: "S",
        type: "item"
    },
    {
        id: "c_hourglass",
        cat: "Consumibles",
        icon: "⏳",
        title: "Reloj de Arena de Ceniza",
        desc: "Inversión de Entropía: Tiñe tu barra de SP de Cian Temporal por 90 minutos. Mientras dure, desplegar misiones te REGENERA +8 SP en lugar de gastarlo.",
        cost: 720,
        rank: "S",
        type: "item"
    },
    {
        id: "c_star_drop",
        cat: "Consumibles",
        icon: "🌟",
        title: "Estrella Fugaz del Star Stream",
        desc: "Patrocinio de Constelación: Tu próxima misión o incursión sellada pagará el DOBLE de Oro neto (x2) libre del impuesto del Sistema.",
        cost: 490,
        rank: "A",
        type: "item"
    },
    {
        id: "c1",
        cat: "Consumibles",
        icon: "🩸",
        title: "Poción de Sangre Menor",
        desc: "Coagulante básico de la Asociación. Restaura +30 HP de forma inmediata sin efectos secundarios.",
        cost: 55,
        rank: "C",
        type: "item"
    },
    {
        id: "c_hp_mid",
        cat: "Consumibles",
        icon: "🍷",
        title: "Cáliz Carmesí de Vampiro",
        desc: "Sangre noble refinada: Restaura +60 HP al instante a cambio de consumir -10 SP de tu reserva física.",
        cost: 120,
        rank: "B",
        type: "item"
    },
    {
        id: "c_med",
        cat: "Consumibles",
        icon: "💨",
        title: "Incienso de Meditación",
        desc: "Estado Zen: Reduce el costo de SP a la mitad (50%) al iniciar misiones o sesiones de Focus durante 1 Hora.",
        cost: 85,
        rank: "C",
        type: "item"
    },
    {
        id: "c2",
        cat: "Consumibles",
        icon: "⚡",
        title: "Estamina Concentrada",
        desc: "Descarga eléctrica de emergencia: +55 SP inmediatos, pero bloquea tu ganancia del atributo INT durante 2 Horas.",
        cost: 90,
        rank: "B",
        type: "item"
    },
    {
        id: "c_sp_pure",
        cat: "Consumibles",
        icon: "🔋",
        title: "Celda de Plasma de Maná",
        desc: "Energía limpia de laboratorio: Restaura +60 SP al instante sin bloquear tu ganancia de Inteligencia.",
        cost: 210,
        rank: "A",
        type: "item"
    },
    {
        id: "c_mp_pot",
        cat: "Consumibles",
        icon: "💧",
        title: "Lágrima de Maná Puro",
        desc: "Condensación líquida de calabozo: Recarga +400 MP directamente en tu núcleo mágico.",
        cost: 110,
        rank: "C",
        type: "item"
    },
    {
        id: "c3",
        cat: "Consumibles",
        icon: "⚖️",
        title: "Balanza de Intercambio Equivalente",
        desc: "Ley alquímica de sacrificio: Consume el 50% de tu HP actual para restaurar tu barra de SP al 100%.",
        cost: 240,
        rank: "A",
        type: "item"
    },
    {
        id: "c_blood_pact",
        cat: "Consumibles",
        icon: "🫀",
        title: "Latido del Berserker",
        desc: "Conversión inversa: Quema 35 SP de tu estamina actual para reconstruir +65 HP de forma inmediata.",
        cost: 185,
        rank: "B",
        type: "item"
    },
    {
        id: "c_antidote",
        cat: "Consumibles",
        icon: "🧪",
        title: "Antídoto de Glándula de Kasaka",
        desc: "Purga biológica: Elimina la Resaca del Sistema por desvelo, limpia bloqueos de INT y restaura +20 HP.",
        cost: 150,
        rank: "B",
        type: "item"
    },
    {
        id: "c4",
        cat: "Consumibles",
        icon: "💊",
        title: "Píldora de Purificación",
        desc: "Indulto médico: Te saca de la Zona de Penalización con 25 HP y 0 SP (No funciona en muertes por Mazmorra o Medianoche).",
        cost: 460,
        rank: "A",
        type: "item"
    },
    {
        id: "c6",
        cat: "Consumibles",
        icon: "☕",
        title: "Café Expreso de Medianoche",
        desc: "Vigilia autorizada (Máx. 1 por semana): +35 HP, +35 SP y te permite sellar misiones después de las 9:15 PM hoy sin sufrir Maldición de Insomnio.",
        cost: 480,
        rank: "A",
        type: "item"
    },
    {
        id: "c5",
        cat: "Consumibles",
        icon: "🔮",
        title: "Orbe de Extracción de Almas",
        desc: "Resonancia abisal: Aumenta un +50% la probabilidad de extraer sombras (¡SURGE!) de los jefes durante 3 Horas.",
        cost: 590,
        rank: "S",
        type: "item"
    },
    {
        id: "c_rc_cells",
        cat: "Consumibles",
        icon: "🧬",
        title: "Mutágeno de Células RC (Ghoul)",
        desc: "Reacción al dolor extremo: Solo se activa si tienes menos de 35 HP; convierte tu agonía en un Escudo Carmesí de +110 HP y restaura +40 HP.",
        cost: 340,
        rank: "A",
        type: "item"
    },
    {
        id: "c_wisteria",
        cat: "Consumibles",
        icon: "🌸",
        title: "Incienso de Glicinas Purificadas",
        desc: "Protección de Cazador: Otorga inmunidad total al veneno, fuego y presión del Abismo dentro de mazmorras durante 2 Horas.",
        cost: 290,
        rank: "A",
        type: "item"
    },
    {
        id: "c_kandiaru_eye",
        cat: "Consumibles",
        icon: "🧿",
        title: "Elixir del Ojo de Kandiaru",
        desc: "Clarividencia del Arquitecto: Recarga +850 MP en tu núcleo y hace que tu próximo Corte Dimensional tenga una Zona Crítica el doble de ancha.",
        cost: 740,
        rank: "S",
        type: "item"
    },
    {
        id: "c_phoenix",
        cat: "Consumibles",
        icon: "🪶",
        title: "Pluma de Renacimiento del Fénix",
        desc: "Seguro de Vida Inmortal: Restaura +60 HP/+60 SP y activa un sello que intercepta tu próxima muerte hoy, reviviéndote con 50 HP sin perder oro.",
        cost: 1650,
        rank: "S",
        type: "item"
    },
    {
        id: "c_ambrosia",
        cat: "Consumibles",
        icon: "🍯",
        title: "Néctar de los Gobernantes",
        desc: "Banquete divino: Restaura 100% SP, +40 HP y hace que tus próximas 2 misiones no exijan el 90% del tiempo si ya llevas la mitad.",
        cost: 820,
        rank: "S",
        type: "item"
    },
    {
        id: "c7",
        cat: "Consumibles",
        icon: "✨",
        title: "Elixir del Agua de la Vida (Lágrima del Monarca)",
        desc: "Milagro absoluto del Piso 100: Restaura 100% HP, 100% SP, 100% MP, elimina todo Debuff, levanta castigos y purga la Maldición de la 6ta Capa.",
        cost: 2200,
        rank: "SS",
        type: "item"
    },
    // --- 12 CONSUMIBLES BIO-SINCRONIZADOS (ACCIÓN FÍSICA REAL, CERO STATS REGALADOS) ---
    {
        id: "c_posture",
        cat: "Consumibles",
        icon: "🧘",
        title: "Protocolo: Reajuste Vertebral",
        desc: "[ACCIÓN REAL: Endereza tu espalda, rota hombros y estira el cuello por 60s]. Elimina bloqueos de INT y otorga +18 SP.",
        cost: 25,
        rank: "C",
        type: "item"
    },
    {
        id: "c_breathing",
        cat: "Consumibles",
        icon: "🫁",
        title: "Respiración de Concentración Total",
        desc: "[ACCIÓN REAL: Haz 1 minuto de respiración profunda 4-4-4 cerrando los ojos]. Recarga +160 MP y ensancha +15% la Zona Vital de tu próximo Corte.",
        cost: 30,
        rank: "C",
        type: "item"
    },
    {
        id: "c_eye_drops",
        cat: "Consumibles",
        icon: "👁️‍🗨️",
        title: "Gotas Oculares del Vigía",
        desc: "[ACCIÓN REAL: Mira a un punto lejano por la ventana durante 30 segundos]. Garantiza golpe crítico (x2 daño) en tu próximo ataque directo a un Jefe.",
        cost: 35,
        rank: "C",
        type: "item"
    },
    {
        id: "c_cold_splash",
        cat: "Consumibles",
        icon: "🌊",
        title: "Choque Térmico Facial",
        desc: "[ACCIÓN REAL: Levántate a lavarte la cara y la nuca con agua fría]. Ralentiza la aguja de tu próximo Corte Dimensional un 35% y da +20 SP.",
        cost: 40,
        rank: "B",
        type: "item"
    },
    {
        id: "c_adrenaline",
        cat: "Consumibles",
        icon: "💉",
        title: "Descarga de Adrenalina Cinética",
        desc: "[ACCIÓN REAL: Haz 15 saltos de tijera de pie]. Otorga +15% de Evasión (Dodge) en mazmorras durante 1 Hora (acelera la aguja del Corte un 15%).",
        cost: 45,
        rank: "B",
        type: "item"
    },
    {
        id: "c_sage_tea",
        cat: "Consumibles",
        icon: "🍵",
        title: "Infusión del Sabio",
        desc: "[ACCIÓN REAL: Sírvete un vaso de agua, té o café antes de estudiar]. Tu próxima sesión en la Cámara de Focus otorgará +180 MP extra al sellarla.",
        cost: 50,
        rank: "B",
        type: "item"
    },
    {
        id: "c_cartenon_candle",
        cat: "Consumibles",
        icon: "🕯️",
        title: "Vela del Templo de Cartenon",
        desc: "[ACCIÓN REAL: Pon tu celular en No Molestar y boca abajo al trabajar]. Durante 90 min, los eventos narrativos de tus sombras en mazmorra ocurren al DOBLE de velocidad.",
        cost: 65,
        rank: "A",
        type: "item"
    },
    {
        id: "c_giant_serum",
        cat: "Consumibles",
        icon: "🏋️",
        title: "Suero del Rey de los Gigantes",
        desc: "[ACCIÓN REAL: Ejecuta 12 flexiones de pecho explosivas ahora mismo]. Otorga +45 de Escudo Físico para mazmorras y +20 HP de curación.",
        cost: 75,
        rank: "A",
        type: "item"
    },
    {
        id: "c_baran_drop",
        cat: "Consumibles",
        icon: "🌩️",
        title: "Destilado de Relámpago de Baran",
        desc: "[COMPROMISO DE VELOCIDAD: Termina tu tarea actual sin distraerte]. Adelanta 12 minutos los relojes de tus misiones activas actuales.",
        cost: 95,
        rank: "A",
        type: "item"
    },
    {
        id: "c_liquid_shadow",
        cat: "Consumibles",
        icon: "🖤",
        title: "Esencia de Sombra Líquida",
        desc: "Alquimia abisal: Tus Comandantes entran en resonancia con el vacío y consumen 0 MP/min durante los próximos 45 minutos.",
        cost: 360,
        rank: "A",
        type: "item"
    },
    {
        id: "c_demon_blood",
        cat: "Consumibles",
        icon: "👹",
        title: "Sangre de Demonio Noble",
        desc: "Vampirismo de Baran (90 min): Cada vez que sellas una misión o fase de mazmorra, absorbes +20 HP y +140 MP adicionales.",
        cost: 540,
        rank: "S",
        type: "item"
    },
    {
        id: "c_world_fruit",
        cat: "Consumibles",
        icon: "🌳",
        title: "Fruto del Árbol del Mundo",
        desc: "Reliquia Divina: Restaura tu HP y SP al 100%, te otorga +100 de Escudo Protector y hace que las habilidades activas de tus Sombras cuesten -50% MP hoy.",
        cost: 1180,
        rank: "SS",
        type: "item"
    },

    // ==================== SUBCARPETA 2: PERGAMINOS Y LLAVES (42 - 7 FILAS EXACTAS DE 6) ====================
    {
        id: "p1",
        cat: "Pergaminos",
        icon: "❄️",
        title: "Pergamino: Hielo Menor",
        desc: "Magia criogénica básica: Congela el cronómetro de deserción de tus Jefes Personales activos por +15 minutos.",
        cost: 65,
        rank: "C",
        type: "item"
    },
    {
        id: "p_extra_chorros",
        cat: "Pergaminos",
        icon: "🛣️",
        title: "Bitácora: Ruta Los Chorros (Viaje Extra)",
        desc: "Permiso de tránsito extraordinario: Habilita nuevamente en tu Tablón de hoy las misiones de Ruta Los Chorros (Ascenso y Descenso) para registrar un segundo viaje real.",
        cost: 25,
        rank: "B",
        type: "item"
    },
    {
        id: "p3",
        cat: "Pergaminos",
        icon: "🌨️",
        title: "Pergamino: Ventisca Mayor",
        desc: "Cero absoluto táctico: Congela el cronómetro de deserción de todos tus Jefes Personales activos por +45 minutos.",
        cost: 165,
        rank: "B",
        type: "item"
    },
    {
        id: "p_chrono",
        cat: "Pergaminos",
        icon: "⏩",
        title: "Pergamino: Aceleración de Taquiones",
        desc: "Compresión temporal: Adelanta 25 minutos en el cronómetro de todas tus misiones de rutina desplegadas actualmente.",
        cost: 240,
        rank: "A",
        type: "item"
    },
    {
        id: "p6",
        cat: "Pergaminos",
        icon: "🧠",
        title: "Pergamino: Bypass de Fatiga",
        desc: "Cortocircuito de cansancio: Permite iniciar tu próxima misión principal o sesión en la Cámara de Focus con 0 gasto de SP.",
        cost: 220,
        rank: "A",
        type: "item"
    },
    {
        id: "p_reroll",
        cat: "Pergaminos",
        icon: "🔄",
        title: "Pergamino: Rebobinado de Causalidad",
        desc: "Alteración de destino: Invoca o reemplaza inmediatamente tu Anomalía Diaria actual por otra nueva de las 60 disponibles.",
        cost: 110,
        rank: "B",
        type: "item"
    },
    {
        id: "p_xp_boost",
        cat: "Pergaminos",
        icon: "📘",
        title: "Grimorio del Arquitecto",
        desc: "Sabiduría prohibida: Inyecta +140 XP directos a tu barra de nivel al descifrar sus runas.",
        cost: 380,
        rank: "A",
        type: "item"
    },
    {
        id: "p_bloodlust",
        cat: "Pergaminos",
        icon: "👁️",
        title: "Pergamino: Intención Asesina [Bloodlust]",
        desc: "Habilidad del anime contra Kang Taeshik: Aniquila al primer Jefe de tu lista personal al instante, entregándote su XP y Oro sin combatir.",
        cost: 520,
        rank: "A",
        type: "item"
    },
    {
        id: "p_shadow_exchange",
        cat: "Pergaminos",
        icon: "👤",
        title: "Pergamino: Intercambio de Sombra",
        desc: "Teletransportación suprema: Te extrae inmediatamente de cualquier mazmorra activa (incluso Portal Rojo o El Abismo) sin perder HP ni sufrir maldiciones.",
        cost: 580,
        rank: "S",
        type: "item"
    },
    {
        id: "p_tusk_fire",
        cat: "Pergaminos",
        icon: "🔥",
        title: "Pergamino: Himno del Dragón de Fuego",
        desc: "Magia de Kargalgan: Si estás dentro de una mazmorra, incinera a las bestias reduciendo a la mitad (50%) el tiempo restante de la fase actual.",
        cost: 440,
        rank: "A",
        type: "item"
    },
    {
        id: "p_tank_shield",
        cat: "Pergaminos",
        icon: "🐻‍❄️",
        title: "Pergamino: Rugido Blindado de Tank",
        desc: "Otorga +75 de Escudo Ártico para mazmorras y restaura +1 noche de guardia nocturna a Tank si estaba en enfriamiento.",
        cost: 390,
        rank: "A",
        type: "item"
    },
    {
        id: "p7",
        cat: "Pergaminos",
        icon: "⚔️",
        title: "Pergamino: Dominio de Sombras",
        desc: "Despliegue de legión: Tu ejército sombrío completa automáticamente todas tus misiones paralelas (secundarias) de hoy entregándote su XP y Oro.",
        cost: 760,
        rank: "S",
        type: "item"
    },
    {
        id: "p_arise",
        cat: "Pergaminos",
        icon: "💠",
        title: "Decreto de Cristalización",
        desc: "Alquimia de sombras de alto rango: Condensa maná puro para entregarte +3 Cristales de Maná (CM) al instante.",
        cost: 890,
        rank: "S",
        type: "item"
    },
    {
        id: "p_dokkaebi",
        cat: "Pergaminos",
        icon: "🎰",
        title: "Contrato de Monedas del Dokkaebi",
        desc: "Apuesta del Star Stream: 50% de probabilidad de ganar +320 G al instante, o 50% de perder -80 G.",
        cost: 160,
        rank: "B",
        type: "item"
    },
    {
        id: "p_double_loot",
        cat: "Pergaminos",
        icon: "🧲",
        title: "Pergamino: Mano del Gobernante [Ruler's Authority]",
        desc: "Telequinesis dimensional del anime: Atrae y materializa inmediatamente 3 objetos o minerales de la matriz de botín directo a tu bolsa.",
        cost: 310,
        rank: "A",
        type: "item"
    },
    {
        id: "p_repair",
        cat: "Pergaminos",
        icon: "🛠️",
        title: "Runa de Reconstrucción de Artefactos",
        desc: "Restaura 1 objeto destruido en tu Muro de la Vergüenza y materializa un botín de Rango A o S en tu inventario.",
        cost: 490,
        rank: "A",
        type: "item"
    },
    {
        id: "key_e",
        cat: "Pergaminos",
        icon: "🔓",
        title: "Llave de Portal Rango E",
        desc: "Sello de apertura básico de la Asociación para grietas de Rango E.",
        cost: 25,
        rank: "E",
        keyRank: "rankE"
    },
    {
        id: "key_d",
        cat: "Pergaminos",
        icon: "🗝️",
        title: "Llave de Portal Rango D",
        desc: "Llave de hierro rúnico que permite abrir una grieta instanciada de Rango D.",
        cost: 60,
        rank: "D",
        keyRank: "rankD"
    },
    {
        id: "key_c",
        cat: "Pergaminos",
        icon: "🔑",
        title: "Llave de Portal Rango C",
        desc: "Llave de bronce encantado que permite abrir una grieta instanciada de Rango C.",
        cost: 130,
        rank: "C",
        keyRank: "rankC"
    },
    {
        id: "key_b",
        cat: "Pergaminos",
        icon: "⚜️",
        title: "Llave de Portal Rango B",
        desc: "Insignia real que permite abrir una grieta instanciada de Rango B.",
        cost: 260,
        rank: "B",
        keyRank: "rankB"
    },
    {
        id: "key_a",
        cat: "Pergaminos",
        icon: "🔱",
        title: "Llave de Portal Rango A",
        desc: "Reliquia carmesí que permite abrir un Portal Rojo o grieta peligrosa de Rango A.",
        cost: 520,
        rank: "A",
        keyRank: "rankA"
    },
    {
        id: "key_s",
        cat: "Pergaminos",
        icon: "🌌",
        title: "Llave de Portal Rango S / SSS",
        desc: "Núcleo dimensional supremo capaz de abrir Portales Rango S (Isla de Jeju) y la Capital de los No Devueltos (SSS).",
        cost: 1150,
        rank: "S",
        keyRank: "rankS"
    },
    {
        id: "p_box_b",
        cat: "Pergaminos",
        icon: "📦",
        title: "Caja de Suministros Rango B",
        desc: "Contenedor militar de la Asociación con consumibles tácticos aleatorios de Rango C y B.",
        cost: 190,
        rank: "B",
        type: "box"
    },
    {
        id: "p_box_s",
        cat: "Pergaminos",
        icon: "🎁",
        title: "Cofre Real del Monarca",
        desc: "Cofre de Rango S con probabilidad de reliquias mayores como Corazón de Magma, Sangre Corrupta o Piedra de la Misericordia.",
        cost: 850,
        rank: "S",
        type: "box"
    },
    {
        id: "p_box_ss",
        cat: "Pergaminos",
        icon: "⚰️",
        title: "Relicario del Trono de Sombras",
        desc: "Sarcófago abisal Rango SS: Al abrirse entrega 1 artefacto de Rango S/SS + 2 Cristales de Maná.",
        cost: 1480,
        rank: "SS",
        type: "box"
    },
    {
        id: "p_iron_trial",
        cat: "Pergaminos",
        icon: "🏋️‍♂️",
        title: "Pergamino: Misión de Castigo Físico",
        desc: "[RETO DEL ANIME: Haz 25 sentadillas y 20 flexiones ahora mismo]. Al cumplirlo conviertes tu sudor en +90 XP y +40 SP de adrenalina.",
        cost: 55,
        rank: "B",
        type: "item"
    },
    {
        id: "p_zone_purge",
        cat: "Pergaminos",
        icon: "🧹",
        title: "Pergamino: Purificación de Territorio",
        desc: "[RETO REAL INMEDIATO: Recoge o acomoda 5 objetos fuera de lugar en tu cuarto]. Recarga +220 MP y limpia bloqueos mentales.",
        cost: 45,
        rank: "C",
        type: "item"
    },
    {
        id: "p_transmute",
        cat: "Pergaminos",
        icon: "⚗️",
        title: "Pergamino: Transmutación de Chatarra",
        desc: "Alquimia de gremio: Funde todos los objetos de botín (chatarra/minerales) de tu bolsa al mismo tiempo y te paga un +30% de Oro extra sobre su valor.",
        cost: 60,
        rank: "C",
        type: "item"
    },
    {
        id: "p_blood_contract",
        cat: "Pergaminos",
        icon: "📜",
        title: "Contrato de Sangre del Arquitecto",
        desc: "Pacto de Disciplina: Si completas todas tus misiones del Tablón de hoy, recibes +280 G limpios y +2 CM. Si fallas al cerrar el día, pierdes -50 HP.",
        cost: 95,
        rank: "S",
        type: "item"
    },
    {
        id: "p_focus_reset",
        cat: "Pergaminos",
        icon: "⚡",
        title: "Pergamino: Sobrecarga de Enfoque",
        desc: "Reabre la Cámara de Focus si ya la habías completado hoy, permitiéndote realizar una segunda sesión de estudio.",
        cost: 120,
        rank: "B",
        type: "item"
    },
    {
        id: "p_kandiaru_dice",
        cat: "Pergaminos",
        icon: "🎲",
        title: "Dado de la Causalidad de Kandiaru",
        desc: "Tira un dado de 6 caras: (1) -20 HP, (2) +180 G, (3) +400 MP, (4) +1 Llave Rango A, (5) +2 Cristales de Maná, (6) +120 de Escudo Físico.",
        cost: 145,
        rank: "B",
        type: "item"
    },
    {
        id: "p_bounty_hunt",
        cat: "Pergaminos",
        icon: "🎯",
        title: "Decreto de Caza Mayor",
        desc: "Orden de exterminio: Aumenta en +75% la recompensa de EXP y Oro de todos los Jefes Personales que tengas activos ahora mismo en tu lista.",
        cost: 210,
        rank: "B",
        type: "item"
    },
    {
        id: "p_red_beacon",
        cat: "Pergaminos",
        icon: "📡",
        title: "Baliza de Sintonización Carmesí",
        desc: "Sobrecarga el Sonar Militar: Garantiza que el próximo barrido detecte Portales Rojos o de alto rango y activa Oro x2 en tu siguiente incursión.",
        cost: 290,
        rank: "A",
        type: "item"
    },
    {
        id: "p_hyper_time",
        cat: "Pergaminos",
        icon: "⌛",
        title: "Pergamino: Cámara del Tiempo Hiperbólica",
        desc: "Dilatación temporal: Reabre la Cámara de Focus hoy, activa 90 min de EXP x1.5 y recarga +250 MP.",
        cost: 350,
        rank: "A",
        type: "item"
    },
    {
        id: "p_imperial_march",
        cat: "Pergaminos",
        icon: "🚩",
        title: "Pergamino: Marcha Imperial",
        desc: "Autoridad del Monarca (3 Horas): Despliega inmediatamente en campo a TODOS tus Comandantes desbloqueados ignorando el límite de ranuras (+350 MP).",
        cost: 560,
        rank: "A",
        type: "item"
    },
    {
        id: "p_forced_arise",
        cat: "Pergaminos",
        icon: "⛓️",
        title: "Pergamino: Subyugación Forzada",
        desc: "Dominio absoluto: Recluta al instante +2 Soldados de Sombra, +1 Mago de Sombra y activa +50% probabilidad de extracción por 6 horas.",
        cost: 690,
        rank: "S",
        type: "item"
    },
    {
        id: "p_master_key",
        cat: "Pergaminos",
        icon: "🗝️",
        title: "Llavero Maestro de la Asociación",
        desc: "Suministro táctico de gremio: Añade inmediatamente +1 Llave Rango E, +1 Rango D, +1 Rango C, +1 Rango B y +1 Rango A a tu llavero.",
        cost: 790,
        rank: "S",
        type: "item"
    },
    // --- LOS 5 NUEVOS ÍTEMS CANON EXCLUSIVOS DEL ANIME DE SOLO LEVELING (COMPLETAN 42 EN 7 FILAS DE 6) ---
    {
        id: "p_stealth_rune",
        cat: "Pergaminos",
        icon: "🌫️",
        title: "Runa de Habilidad: Sigilo [Stealth]",
        desc: "[ANIME T1 EP.9 - KANG TAESHIK]: Oculta tu presencia física y mágica. En tu próxima mazmorra eres 100% inmune al daño ambiental y tu primer golpe al Jefe hace x2.5 de daño.",
        cost: 390,
        rank: "A",
        type: "item"
    },
    {
        id: "p_red_hearthstone",
        cat: "Pergaminos",
        icon: "💎",
        title: "Piedra de Retorno de Calabozo",
        desc: "[ANIME T1/T2 - RETORNO DE INSTANCIA]: Cristal de evacuación de la Asociación. Te permite salir de una mazmorra normal por emergencia sin sufrir los -20 HP de castigo y reembolsa +100 MP.",
        cost: 195,
        rank: "B",
        type: "item"
    },
    {
        id: "p_lycan_bandage",
        cat: "Pergaminos",
        icon: "🩹",
        title: "Vendaje de Colmillo Blanco (Hapjeong)",
        desc: "[ANIME T1 EP.5 - CACERÍA DE LYCANS]: Vendaje impregnado con maná de bestia. Congela y detiene la hemorragia nocturna durante 30 minutos y sella tus heridas (+30 HP).",
        cost: 175,
        rank: "B",
        type: "item"
    },
    {
        id: "p_white_tiger_pass",
        cat: "Pergaminos",
        icon: "🐯",
        title: "Permiso de Asalto: Gremio Tigre Blanco",
        desc: "[ANIME T2 - CONTRATO CON BAEK YOONHO]: Convenio oficial de compra de portales. Al despejar tu próxima mazmorra o misión principal, el Gremio te paga un bono extra de +110 G limpios.",
        cost: 75,
        rank: "A",
        type: "item"
    },
    {
        id: "p_high_mana_ore",
        cat: "Pergaminos",
        icon: "🔷",
        title: "Mineral de Maná de Alta Pureza (Mina Rango A)",
        desc: "[ANIME T2 EP.5 - ESCUADRÓN DE MINERÍA]: Cristal extraído del túnel del Jefe Gigante. Estabiliza el flujo de tus sombras reduciendo en -50% su consumo de MP/min durante 90 minutos.",
        cost: 280,
        rank: "A",
        type: "item"
    },

    // ==================== SUBCARPETA 3: ARMERÍA (40 PIEZAS CON PRECIOS DE ALTO RANGO BALANCEADOS) ====================
    // --- ARMAS (slot: "weapon") ---
    { id: "eq_w_kim", cat: "Armería", icon: "🗡️", title: "Espada de Acero de Kim Sangshik", desc: "Arma Rango E. Espada básica de cazador sobreviviente. Otorga +0.15 STR.", cost: 65, rank: "E", slot: "weapon", stats: { str: 0.15 } },
    { id: "eq_w_goblin", cat: "Armería", icon: "🔪", title: "Cuchillo de Explorador Duende", desc: "Arma Rango E. Hoja corta y ligera para ataques rápidos. Otorga +0.15 AGI.", cost: 70, rank: "E", slot: "weapon", stats: { agi: 0.15 } },
    { id: "eq_w_razor", cat: "Armería", icon: "🦴", title: "Daga de Colmillo de Lycan", desc: "Arma Rango D. Forjada con hueso de lobo de acero. Otorga +0.20 STR y +0.15 AGI.", cost: 140, rank: "D", slot: "weapon", stats: { str: 0.20, agi: 0.15 } },
    { id: "eq_w_iron_mace", cat: "Armería", icon: "🔨", title: "Maza Pesada de Hierro", desc: "Arma Rango D. Contundente e implacable contra escudos. Otorga +0.35 STR.", cost: 175, rank: "D", slot: "weapon", stats: { str: 0.35 } },
    { id: "eq_w_arachnid", cat: "Armería", icon: "🦂", title: "Aguijón de Reina Arácnida", desc: "Arma Rango C. Daga ligera con filo ácido perforante. Otorga +0.35 AGI y +0.15 STR.", cost: 280, rank: "C", slot: "weapon", stats: { str: 0.15, agi: 0.35 } },
    { id: "eq_w_bow", cat: "Armería", icon: "🏹", title: "Arco Compuesto de Francotirador", desc: "Arma Rango C. Precisión letal a larga distancia. Otorga +0.40 AGI y +0.15 INT.", cost: 320, rank: "C", slot: "weapon", stats: { agi: 0.40, int: 0.15 } },
    { id: "eq_w1", cat: "Armería", icon: "🐍", title: "Colmillo de Kasaka (Daga)", desc: "Arma Rango B. Daga de veneno azul paralizante y hemorrágico. Otorga +0.50 STR y +0.25 AGI.", cost: 450, rank: "B", slot: "weapon", stats: { str: 0.50, agi: 0.25 } },
    { id: "eq_w_killer", cat: "Armería", icon: "⚔️", title: "Asesina de Caballeros (Knight Killer)", desc: "Arma Rango B. Diseñada para desgarrar armaduras pesadas. Otorga +0.75 STR y +0.20 AGI.", cost: 560, rank: "B", slot: "weapon", stats: { str: 0.75, agi: 0.20 } },
    { id: "eq_w_halberd", cat: "Armería", icon: "🪓", title: "Alabarda de Guardia Real", desc: "Arma Rango B. Lanza pesada de caballería sangrienta. Otorga +0.85 STR.", cost: 620, rank: "B", slot: "weapon", stats: { str: 0.85 } },
    { id: "eq_w_baruka", cat: "Armería", icon: "🌪️", title: "Tanto de Baruka (Daga Hyakki)", desc: "Arma Rango A. Imbuida con magia de viento élfico veloz. Otorga +0.60 STR y +0.90 AGI.", cost: 850, rank: "A", slot: "weapon", stats: { str: 0.60, agi: 0.90 } },
    { id: "eq_w_kargalgan", cat: "Armería", icon: "🔴", title: "Orbe de Avaricia (Tusk)", desc: "Arma Rango A. Duplica el poder destructivo de la magia negra. Otorga +1.40 INT.", cost: 980, rank: "A", slot: "weapon", stats: { int: 1.40 } },
    { id: "eq_w_vulcan_club", cat: "Armería", icon: "🌋", title: "Garrote Ígneo de Vulcano", desc: "Arma Rango A. Fuerza colosal del demonio de fuego inferior. Otorga +1.55 STR.", cost: 1050, rank: "A", slot: "weapon", stats: { str: 1.55 } },
    { id: "eq_w_scythe", cat: "Armería", icon: "🌙", title: "Guadaña del Segador Sombrío", desc: "Arma Rango S. Cosecha almas en completo silencio. Otorga +1.10 STR, +1.00 AGI y +0.60 INT.", cost: 1450, rank: "S", slot: "weapon", stats: { str: 1.10, agi: 1.00, int: 0.60 } },
    { id: "eq_w_demon_daggers", cat: "Armería", icon: "⚡", title: "Dagas del Rey Demonio (Baran)", desc: "Arma Rango S. Dagas gemelas de relámpago blanco. Otorgan +1.20 STR y +1.30 AGI.", cost: 1680, rank: "S", slot: "weapon", stats: { str: 1.20, agi: 1.30 } },
    { id: "eq_w_demon_sword", cat: "Armería", icon: "🌩️", title: "Espada Larga del Rey Demonio", desc: "Arma Rango S. Desata la Tormenta de Llamas Blancas de Baran. Otorga +1.80 STR y +0.80 INT.", cost: 1890, rank: "S", slot: "weapon", stats: { str: 1.80, int: 0.80 } },
    { id: "eq_w_kamish", cat: "Armería", icon: "🐉", title: "Ira de Kamish (Dagas de Dragón)", desc: "Arma Rango SS. Forjadas con el colmillo de la mayor calamidad de la humanidad. Otorga +3.00 STR, +2.50 AGI y +1.50 INT.", cost: 3100, rank: "SS", slot: "weapon", stats: { str: 3.00, agi: 2.50, int: 1.50 } },

    // --- ARMADURAS (slot: "armor") ---
    { id: "eq_a_leather", cat: "Armería", icon: "🦺", title: "Chaleco Táctico de Cazador Rango E", desc: "Armadura Rango E. Cuero reforzado para incursiones menores. Otorga +0.20 STR.", cost: 65, rank: "E", slot: "armor", stats: { str: 0.20 } },
    { id: "eq_a_boots_e", cat: "Armería", icon: "🥾", title: "Botas de Marcha Forzada", desc: "Armadura Rango E. Calzado militar antideslizante. Otorga +0.20 AGI.", cost: 75, rank: "E", slot: "armor", stats: { agi: 0.20 } },
    { id: "eq_a_serpento", cat: "Armería", icon: "🧥", title: "Chaqueta Blindada de Ruta (Los Chorros)", desc: "Armadura Rango D. Protección contra el asfalto y la fatiga vial. Otorga +0.25 STR y +0.20 AGI.", cost: 160, rank: "D", slot: "armor", stats: { str: 0.25, agi: 0.20 } },
    { id: "eq_a_helm_d", cat: "Armería", icon: "🪖", title: "Casco de Acero de Vanguardia", desc: "Armadura Rango D. Protege el cráneo en derrumbes de mina. Otorga +0.35 STR.", cost: 185, rank: "D", slot: "armor", stats: { str: 0.35 } },
    { id: "eq_a_gloves_c", cat: "Armería", icon: "🧤", title: "Guanteletes de Escama de Serpiente", desc: "Armadura Rango C. Agarre firme y resistente al ácido. Otorga +0.30 STR y +0.30 AGI.", cost: 290, rank: "C", slot: "armor", stats: { str: 0.30, agi: 0.30 } },
    { id: "eq_a_assassin", cat: "Armería", icon: "🥷", title: "Manto de Sigilo de Kang Taeshik", desc: "Armadura Rango B. Tejido oscuro que camufla la presencia. Otorga +0.65 AGI y +0.25 INT.", cost: 480, rank: "B", slot: "armor", stats: { agi: 0.65, int: 0.25 } },
    { id: "eq_a_mage_b", cat: "Armería", icon: "👘", title: "Túnica Carmesí de Hechicero", desc: "Armadura Rango B. Amplifica la regeneración de maná. Otorga +0.85 INT.", cost: 540, rank: "B", slot: "armor", stats: { int: 0.85 } },
    { id: "eq_a1", cat: "Armería", icon: "🛡️", title: "Pechera del Caballero Rojo (Igris)", desc: "Armadura Rango A. Acero carmesí del comandante de sangre. Otorga +1.00 STR y +0.30 AGI.", cost: 790, rank: "A", slot: "armor", stats: { str: 1.00, agi: 0.30 } },
    { id: "eq_a_high_orc", cat: "Armería", icon: "👹", title: "Armadura de Guardia de Alto Orco", desc: "Armadura Rango A. Imbuida con sed de batalla salvaje. Otorga +1.35 STR.", cost: 920, rank: "A", slot: "armor", stats: { str: 1.35 } },
    { id: "eq_a_valkyrie", cat: "Armería", icon: "🪽", title: "Grebas Aladas de Cazador Rango S", desc: "Armadura Rango A. Velocidad supersónica en mazmorra. Otorga +1.40 AGI.", cost: 990, rank: "A", slot: "armor", stats: { agi: 1.40 } },
    { id: "eq_a_archlich", cat: "Armería", icon: "💀", title: "Túnica del Arquimago de la Muerte", desc: "Armadura Rango S. Canaliza el maná del abismo sin fricción. Otorga +1.80 INT y +0.50 AGI.", cost: 1490, rank: "S", slot: "armor", stats: { int: 1.80, agi: 0.50 } },
    { id: "eq_a_giant", cat: "Armería", icon: "🗿", title: "Coraza del Rey de los Gigantes (Legia)", desc: "Armadura Rango S. Defensa inquebrantable de nivel nacional. Otorga +2.30 STR.", cost: 1720, rank: "S", slot: "armor", stats: { str: 2.30 } },
    { id: "eq_a_beru", cat: "Armería", icon: "🐜", title: "Exoesqueleto del Rey Hormiga (Jeju)", desc: "Armadura Rango S. Quitina negra indestructible y ultraligera. Otorga +1.60 STR y +1.40 AGI.", cost: 1950, rank: "S", slot: "armor", stats: { str: 1.60, agi: 1.40 } },
    { id: "eq_a_ashborn", cat: "Armería", icon: "👑", title: "Manto Imperial de Ashborn (Monarca)", desc: "Armadura Rango SS. Tejida con oscuridad primigenia. Otorga +2.80 STR, +2.80 INT y +2.00 AGI.", cost: 3200, rank: "SS", slot: "armor", stats: { str: 2.80, int: 2.80, agi: 2.00 } },

    // --- ACCESORIOS (slot: "accessory") ---
    { id: "eq_acc_copper", cat: "Armería", icon: "💍", title: "Anillo de Enfoque de Cobre", desc: "Accesorio Rango E. Estabiliza la mente del estudiante. Otorga +0.20 INT.", cost: 70, rank: "E", slot: "accessory", stats: { int: 0.20 } },
    { id: "eq_acc_wolf", cat: "Armería", icon: "🦷", title: "Colgante de Colmillo Blanco", desc: "Accesorio Rango D. Instinto salvaje en combate cercano. Otorga +0.25 AGI y +0.15 STR.", cost: 155, rank: "D", slot: "accessory", stats: { agi: 0.25, str: 0.15 } },
    { id: "eq_acc_silver", cat: "Armería", icon: "🥈", title: "Sello de Plata de la Asociación", desc: "Accesorio Rango D. Insignia oficial de cazador verificado. Otorga +0.30 INT.", cost: 170, rank: "D", slot: "accessory", stats: { int: 0.30 } },
    { id: "eq_acc_cerberus", cat: "Armería", icon: "🐕", title: "Collar de Colmillo de Cerbero", desc: "Accesorio Rango C. El guardián del infierno fortalece tus reflejos. Otorga +0.30 STR y +0.30 AGI.", cost: 310, rank: "C", slot: "accessory", stats: { str: 0.30, agi: 0.30 } },
    { id: "eq_acc_gate", cat: "Armería", icon: "⛓️", title: "Grillete Rúnico de Mazmorra Doble", desc: "Accesorio Rango B. Sobreviviente del templo de Cartenon. Otorga +0.45 STR y +0.45 INT.", cost: 520, rank: "B", slot: "accessory", stats: { str: 0.45, int: 0.45 } },
    { id: "eq_acc_metus", cat: "Armería", icon: "📿", title: "Pendiente del Nigromante Metus", desc: "Accesorio Rango A. Amplifica el dominio mental sobre las sombras. Otorga +1.15 INT.", cost: 860, rank: "A", slot: "accessory", stats: { int: 1.15 } },
    { id: "eq_acc_kandiaru", cat: "Armería", icon: "💎", title: "Runa de Longevidad de Kandiaru", desc: "Accesorio Rango A. Bendición de cuerpo indestructible. Otorga +0.80 STR, +0.60 INT y +0.60 AGI.", cost: 1020, rank: "A", slot: "accessory", stats: { str: 0.80, int: 0.60, agi: 0.60 } },
    { id: "eq_acc_national", cat: "Armería", icon: "🎖️", title: "Insignia de Cazador de Nivel Nacional", desc: "Accesorio Rango S. Autoridad suprema sobre gremios. Otorga +1.60 STR y +1.20 AGI.", cost: 1780, rank: "S", slot: "accessory", stats: { str: 1.60, agi: 1.20 } },
    { id: "eq_acc_chalice", cat: "Armería", icon: "🏆", title: "Fragmento de la Copa del Renacimiento", desc: "Accesorio Rango S. Artefacto de los Gobernantes que altera el tiempo. Otorga +2.00 INT y +1.00 AGI.", cost: 1920, rank: "S", slot: "accessory", stats: { int: 2.00, agi: 1.00 } },
    { id: "eq_acc_black_heart", cat: "Armería", icon: "🖤", title: "El Corazón Negro (Núcleo del Arquitecto)", desc: "Accesorio Rango SS. Desbloquea el maná infinito del Monarca Sombrío. Otorga +3.50 INT, +1.50 STR y +1.50 AGI.", cost: 3000, rank: "SS", slot: "accessory", stats: { int: 3.50, str: 1.50, agi: 1.50 } },

    // ==================== SUBCARPETA 4: PRIVILEGIOS REALES (28 MECÁNICAS ÚNICAS Y SIN REGALAR STATS) ====================
    {
        id: "v_music",
        cat: "Privilegios Reales",
        icon: "🎧",
        title: "Sesión Musical Inmersiva",
        desc: "25 min para escuchar Cuarteto de Nos, Glass Animals o tu playlist. [EFECTO ÚNICO: +25 SP y +120 MP por resonancia rítmica].",
        cost: 65,
        rank: "C",
        type: "item"
    },
    {
        id: "v_hot_shower",
        cat: "Privilegios Reales",
        icon: "🚿",
        title: "Ducha Larga Regenerativa",
        desc: "Ducha sin prisa para liberar tensión muscular. [EFECTO ÚNICO: Purga la Resaca del Sistema, limpia bloqueos de INT y cura +30 HP].",
        cost: 75,
        rank: "C",
        type: "item"
    },
    {
        id: "v_retro_music",
        cat: "Privilegios Reales",
        icon: "🎸",
        title: "Clásicos: Los Temerarios / Bronco / MJ",
        desc: "Poner tus clásicos favoritos mientras descansas. [EFECTO ÚNICO: Reduce un 50% el costo de SP de tus misiones durante 1 Hora y da +20 HP].",
        cost: 85,
        rank: "C",
        type: "item"
    },
    {
        id: "v1",
        cat: "Privilegios Reales",
        icon: "📱",
        title: "Pase de Desconexión (TikTok / Redes)",
        desc: "30 minutos de Scroll libre de culpa. [EFECTO ÚNICO: Restaura +35 SP y ralentiza un 20% la aguja de tu próximo Corte Dimensional].",
        cost: 90,
        rank: "C",
        type: "item"
    },
    {
        id: "v_snack",
        cat: "Privilegios Reales",
        icon: "🍫",
        title: "Suministro Dulce / Snack",
        desc: "Permiso para disfrutar un postre, café helado o antojo. [EFECTO ÚNICO: Activa regeneración gradual de +30 SP (lunchRegen) y +15 HP].",
        cost: 95,
        rank: "C",
        type: "item"
    },
    {
        id: "v_brother",
        cat: "Privilegios Reales",
        icon: "🕹️",
        title: "Partidas / Código con Henry",
        desc: "Pasar tiempo jugando o programando con tu hermano. [EFECTO ÚNICO: Recluta +1 Soldado de Sombra para tu infantería y da +30 SP].",
        cost: 135,
        rank: "B",
        type: "item"
    },
    {
        id: "v_tech_tinker",
        cat: "Privilegios Reales",
        icon: "🤖",
        title: "Trasteo Técnico (Tasker / OS)",
        desc: "Automatizar el teléfono o ajustar hardware por gusto. [EFECTO ÚNICO: Recarga +320 MP en el núcleo y da descuento de -50% MP en tu próxima Activa].",
        cost: 150,
        rank: "B",
        type: "item"
    },
    {
        id: "v_nap",
        cat: "Privilegios Reales",
        icon: "🛌",
        title: "Siesta Táctica de Recuperación",
        desc: "40 minutos de descanso en cama a mitad del día. [EFECTO ÚNICO: Restaura +50 SP, +25 HP y salda tu deuda de sueño].",
        cost: 160,
        rank: "B",
        type: "item"
    },
    {
        id: "v_fandub",
        cat: "Privilegios Reales",
        icon: "🎙️",
        title: "Estudio Libre: Fandub / Doblaje",
        desc: "Grabar voces de anime por pura pasión. [EFECTO ÚNICO: Voz del Monarca reduce en -40% el drenaje de MP de tus sombras por 1 Hora y da +200 MP].",
        cost: 175,
        rank: "B",
        type: "item"
    },
    {
        id: "v_ibispaint",
        cat: "Privilegios Reales",
        icon: "✏️",
        title: "Lienzo Abierto en Ibis Paint",
        desc: "Ilustrar bocetos con trazos texturizados sin presión. [EFECTO ÚNICO: Ensancha +20% la Zona Vital de tu próximo Corte y recarga +180 MP].",
        cost: 175,
        rank: "B",
        type: "item"
    },
    {
        id: "v_capcut",
        cat: "Privilegios Reales",
        icon: "🎞️",
        title: "Laboratorio de Edición CapCut",
        desc: "Editar un video personal o motion graphics a tu ritmo. [EFECTO ÚNICO: Adelanta 20 min tus misiones activas actuales y da +120 MP].",
        cost: 190,
        rank: "B",
        type: "item"
    },
    {
        id: "v_mc",
        cat: "Privilegios Reales",
        icon: "⛏️",
        title: "Inmersión: Minecraft / Clash Royale",
        desc: "1 Hora de construcción o partidas rápidas autorizada. [EFECTO ÚNICO: Extrae 2 minerales de la matriz de botín directo a tu bolsa y da +25 SP].",
        cost: 195,
        rank: "B",
        type: "item"
    },
    {
        id: "v5",
        cat: "Privilegios Reales",
        icon: "🎨",
        title: "Pase de Creador (Crisppi)",
        desc: "Tiempo libre para idear contenido de tu marca personal. [EFECTO ÚNICO: Activa 45 min de Sincronización Prismática (EXP x1.5) y +150 MP].",
        cost: 220,
        rank: "B",
        type: "item"
    },
    {
        id: "v_pepakura",
        cat: "Privilegios Reales",
        icon: "📐",
        title: "Taller de Papercraft / Pepakura",
        desc: "Armar modelos 3D en papel desconectado del estrés. [EFECTO ÚNICO: Levanta un Escudo Poligonal de +55 HP para tu próxima mazmorra y da +25 SP].",
        cost: 210,
        rank: "B",
        type: "item"
    },
    {
        id: "v3",
        cat: "Privilegios Reales",
        icon: "🦋",
        title: "Inmersión: Hollow Knight",
        desc: "1 Hora de combate en Hallownest autorizada. [EFECTO ÚNICO: Otorga +20% de Evasión (Dodge) por 90 min y crítico garantizado al próximo Jefe].",
        cost: 230,
        rank: "B",
        type: "item"
    },
    {
        id: "v4",
        cat: "Privilegios Reales",
        icon: "🏎️",
        title: "Inmersión: Forza Horizon 5",
        desc: "1 Hora de conducción y tuning autorizada. [EFECTO ÚNICO: Activa Bypass de Fatiga (0 SP en tu próxima misión) y +35 SP inmediatos].",
        cost: 230,
        rank: "B",
        type: "item"
    },
    {
        id: "v_zelda",
        cat: "Privilegios Reales",
        icon: "🗺️",
        title: "Inmersión: Zelda BOTW",
        desc: "1 Hora de exploración libre en Hyrule. [EFECTO ÚNICO: Otorga +35 de Escudo Físico y añade +1 Llave de Portal Rango C a tu bolsa].",
        cost: 240,
        rank: "B",
        type: "item"
    },
    {
        id: "v_anime",
        cat: "Privilegios Reales",
        icon: "📺",
        title: "Maratón de Anime (3 Episodios)",
        desc: "Ver 3 capítulos seguidos de tu anime actual sin culpa. [EFECTO ÚNICO: +45 SP y congela los cronómetros de tus Jefes Personales por 90 minutos].",
        cost: 260,
        rank: "B",
        type: "item"
    },
    {
        id: "v_dance",
        cat: "Privilegios Reales",
        icon: "🕺",
        title: "Ensayo de Baile / Paseo Activo",
        desc: "Ir a ensayo de K-Pop o dar un paseo activo. [EFECTO ÚNICO: Restaura +55 SP, +30 HP y sella la misión paralela Recarga Biológica].",
        cost: 310,
        rank: "A",
        type: "item"
    },
    {
        id: "v_movie_night",
        cat: "Privilegios Reales",
        icon: "🎥",
        title: "Función Privada: Película Completa",
        desc: "Ver una película entera en la noche sin alertas del Sistema. [EFECTO ÚNICO: +40 SP, +150 MP y retrasa el inicio del desangrado nocturno hasta las 11:20 PM].",
        cost: 390,
        rank: "A",
        type: "item"
    },
    {
        id: "v_moto_ride",
        cat: "Privilegios Reales",
        icon: "🏍️",
        title: "Rodada Libre en la Serpento 200R",
        desc: "Salir a rodar por placer para despejar la mente. [EFECTO ÚNICO: Sella la misión paralela Mecánica Serpento hoy y restaura +45 SP].",
        cost: 360,
        rank: "A",
        type: "item"
    },
    {
        id: "v_fastfood",
        cat: "Privilegios Reales",
        icon: "🍔",
        title: "Banquete Real: Comida Favorita",
        desc: "Disfrutar tu plato rápido favorito sin remordimiento. [EFECTO ÚNICO: Lleva tu HP al 120% (Overheal) y restaura +65 SP].",
        cost: 420,
        rank: "A",
        type: "item"
    },
    {
        id: "v_late_wake",
        cat: "Privilegios Reales",
        icon: "🌅",
        title: "Mañana sin Despertador",
        desc: "Permiso para dormir hasta tarde y recuperar sueño profundo. [EFECTO ÚNICO: Purga la Resaca del Sistema, restaura 100% HP/SP y da +300 MP].",
        cost: 490,
        rank: "A",
        type: "item"
    },
    {
        id: "v6_creator",
        cat: "Privilegios Reales",
        icon: "🎬",
        title: "Impulso de Creador Mayor",
        desc: "Tarde dedicada a tus proyectos creativos. [EFECTO ÚNICO: Sella la misión Práctica Creativa / Doblaje de hoy y recarga +350 MP].",
        cost: 580,
        rank: "S",
        type: "item"
    },
    {
        id: "v6",
        cat: "Privilegios Reales",
        icon: "🍿",
        title: "Cita Especial / Ida al Cine",
        desc: "Salida especial o cine con tu novia 100% justificada. [EFECTO BALANCEADO: Sella Vínculo Amoroso, da +50 SP, +250 MP y retrasa el sangrado nocturno a las 11:30 PM].",
        cost: 880,
        rank: "S",
        type: "item"
    },
    {
        id: "v_streak_shield",
        cat: "Privilegios Reales",
        icon: "🛡️",
        title: "Decreto de Soberanía (Escudo de Racha)",
        desc: "Seguro para días de emergencia: Si hoy no logras terminar tus misiones diarias, mañana no perderás tu Racha Perfecta ni recibirás daño al iniciar el día.",
        cost: 960,
        rank: "S",
        type: "item"
    },
    {
        id: "v_shopping",
        cat: "Privilegios Reales",
        icon: "🛍️",
        title: "Adquisición de Gusto Personal",
        desc: "Autorización para comprarte un gusto en la vida real. [EFECTO ÚNICO: Restaura +60 SP y materializa 1 Caja de Suministros Rango B en tu bolsa].",
        cost: 790,
        rank: "S",
        type: "item"
    },
    {
        id: "v7",
        cat: "Privilegios Reales",
        icon: "🎟️",
        title: "Pase de Día Libre Absoluto",
        desc: "Descanso oficial del Monarca. [EFECTO BALANCEADO: Protege tu Racha Perfecta hoy sin exigir misiones, restaura +50% HP/SP y retrasa el toque de queda a las 12:30 AM].",
        cost: 1950,
        rank: "SS",
        type: "item"
    }
];

/* ==========================================================================
   5. MATRIZ DE BOTÍN Y EXTRACCIÓN (LOOTDB - 52 OBJETOS)
   ========================================================================== */
const lootDB = [
    /* Chatarra de Rango E (Venta rápida por Oro) */
    { t: "Tuerca Oxidada de Mazmorra", d: "Hierro inservible extraído de un calabozo. Véndelo por oro.", g: 2, rank: "E", icon: "🔩" },
    { t: "Cable Pelado de Cobre", d: "Residuo técnico de mantenimiento de la HP ZBook.", g: 3, rank: "E", icon: "🔌" },
    { t: "Engranaje de Golem Roto", d: "Pedazo de metal pesado y magullado.", g: 5, rank: "E", icon: "⚙️" },
    { t: "Plástico Fundido de Escombro", d: "Desecho derretido sin valor aparente.", g: 1, rank: "E", icon: "🧱" },
    { t: "Bujía Desgastada de Serpento", d: "Una bujía vieja cubierta de carbón de la 200R.", g: 6, rank: "E", icon: "🕯️" },
    { t: "Perno de Chasis Suelto", d: "Tornillo común extraído de una incursión.", g: 2, rank: "E", icon: "🔧" },
    { t: "Llave Doblada de Candado", d: "Ya no abre ninguna puerta dimensional.", g: 2, rank: "E", icon: "🗝️" },
    { t: "Goma de Neumático Quemada", d: "Residuo de asfalto caliente de Los Chorros.", g: 3, rank: "E", icon: "🛞" },
    { t: "Resorte de Embrague Tensor", d: "Un muelle mecánico cubierto de grasa.", g: 5, rank: "E", icon: "➰" },
    { t: "Filtro de Aire Obstruido", d: "Basura que reduce el rendimiento del motor.", g: 1, rank: "E", icon: "🧽" },
    { t: "Tornillo de Mariposa M8", d: "Pequeño componente de chatarra.", g: 4, rank: "E", icon: "📎" },
    { t: "Lata de Refresco Abollada", d: "Basura dejada por antiguos cazadores descuidados.", g: 1, rank: "E", icon: "🥫" },
    { t: "Placa Base Frita de Laptop", d: "Silicio quemado que huele a cortocircuito.", g: 8, rank: "E", icon: "📟" },
    { t: "Tapón de Válvula de Aire", d: "Chatarra de plástico de neumático.", g: 3, rank: "E", icon: "⚫" },
    { t: "Fusible de Filamento Quemado", d: "Pequeño vidrio roto inservible.", g: 2, rank: "E", icon: "💡" },
    { t: "Clavo Retorcido de Madera", d: "Metal común oxidado.", g: 1, rank: "E", icon: "📍" },
    { t: "Pedazo de Alambre Galvanizado", d: "Un trozo de cable flexible.", g: 3, rank: "E", icon: "〰️" },
    { t: "Arandela de Presión Deformada", d: "Pequeño anillo metálico inservible.", g: 2, rank: "E", icon: "⭕" },
    { t: "Carbón de Motor Desgastado", d: "Polvo negro que mancha las manos.", g: 4, rank: "E", icon: "🌑" },
    { t: "Tapa de Combustible Rompible", d: "Chatarra de plástico de desecho.", g: 2, rank: "E", icon: "⛽" },

    /* Minerales, Reliquias y Objetos de Valor Rango C/B/A/S (Oro Directo) */
    { t: "Cristal de Maná Opaco", d: "Gema sin refinar. Intercambiable por oro en la bolsa.", g: 10, rank: "C", icon: "🔹" },
    { t: "Fragmento de Espejo Ilusorio", d: "Refleja destellos púrpuras tenues.", g: 12, rank: "C", icon: "🪞" },
    { t: "Retazo de Cuero de Bestia", d: "Piel dura extraída de un licántropo.", g: 15, rank: "C", icon: "🦌" },
    { t: "Polvo de Esencia Mágica", d: "Residuo brillante que emite calor.", g: 18, rank: "C", icon: "✨" },
    { t: "Colmillo Afilado de Monstruo", d: "Diente largo de un lobo de colmillos de acero.", g: 22, rank: "C", icon: "🦷" },
    { t: "Esencia Destilada de Orco", d: "Frasco con un líquido verde espeso.", g: 25, rank: "C", icon: "🧪" },
    { t: "Fragmento de Núcleo de Golem", d: "Piedra rúnica que vibra sutilmente.", g: 28, rank: "B", icon: "🪨" },
    { t: "Moneda del Antiguo Imperio", d: "Moneda de oro desgastada por los siglos.", g: 35, rank: "B", icon: "🪙" },
    { t: "Anillo Simbólico de Cobre", d: "Accesorio común con grabados antiguos.", g: 40, rank: "B", icon: "💍" },
    { t: "Collar de Cuentas Manchado", d: "Amuleto de cazador de rango inferior.", g: 38, rank: "B", icon: "📿" },
    { t: "Reloj de Bolsillo Descompuesto", d: "Las agujas se mueven de atrás hacia adelante.", g: 50, rank: "B", icon: "🧭" },
    { t: "Cáliz de Plata de la Aristocracia", d: "Copa valiosa grabada con el blasón de un clan demonio.", g: 45, rank: "B", icon: "🏆" },
    { t: "Gema de Maná Inferior", d: "Piedra azulada con brillo intermitente.", g: 55, rank: "B", icon: "💠" },
    { t: "Pequeña Estatua de Duende", d: "Figura tallada en piedra preciosa verde.", g: 60, rank: "B", icon: "🗿" },
    { t: "Esquirla de Luz Divina", d: "Fragmento de mineral sagrado.", g: 65, rank: "A", icon: "🌟" },
    { t: "Gema de Maná Brillante", d: "Cristal pulido con alta densidad energética.", g: 70, rank: "A", icon: "💎" },
    { t: "Gema de Sangre de Licántropo", d: "Rubí oscuro que parece palpitar en tu palma.", g: 75, rank: "A", icon: "🩸" },
    { t: "Cofre de Monedas Pequeño", d: "Contenedor de madera con divisas del Sistema.", g: 85, rank: "A", icon: "🧰" },
    { t: "Escama Menor de Dragón", d: "Placa ósea impermeable al fuego.", g: 95, rank: "A", icon: "🐉" },
    { t: "Reliquia Perdida de Los Chorros", d: "Objeto rúnico desenterrado en la carretera.", g: 100, rank: "A", icon: "🏺" },
    { t: "Bolsa de Oro Pesada", d: "Saco de cuero repleto de monedas brillantes.", g: 120, rank: "A", icon: "💰" },
    { t: "Moneda de Platino Puro", d: "Divisa de intercambio de alto nivel.", g: 130, rank: "S", icon: "💿" },
    { t: "Lingote de Oro Macizo", d: "Metal refinado con el sello del Monarca.", g: 150, rank: "S", icon: "🧈" },
    { t: "Corona Fracturada del Monarca", d: "Reliquia de oro y diamantes oscuros.", g: 180, rank: "S", icon: "👑" },
    { t: "Esencia Pura de Rango S", d: "Fluido altamente concentrado en maná abisal.", g: 200, rank: "S", icon: "🌌" },

    /* Botines Legendarios Exclusivos de Eventos Ocultos */
    { t: "Lágrima del Monarca Sombrío", d: "Restaura el 100% de HP y SP.", it: "c7", rank: "SS", icon: "✨" }, 
    { t: "Pergamino: Dominio de Sombras", d: "Igris ejecuta tus tareas paralelas.", it: "p7", rank: "S", icon: "⚔️" },
    { t: "Pase de Día Libre Absoluto", d: "Inmunidad total a penalizaciones por 24h.", it: "v7", rank: "SS", icon: "🎟️" },
    { t: "Pase Premium: Cita Cinemark", d: "Justificación de gastos de salida real.", it: "v6", rank: "S", icon: "🍿" },
    { t: "Autorización: Comida Rápida", d: "Permiso para ordenar delivery real sin remordimiento.", priv: true, g: 90, rank: "S", icon: "🍔" },
    { t: "Reliquia del Tiempo Físico", d: "Añade una hora libre absoluta a tu día real.", priv: true, g: 140, rank: "SS", icon: "⏳" },
    { t: "Amuleto de Suerte Académica", d: "Garantiza enfoque y éxito en tu próxima evaluación.", priv: true, g: 110, rank: "S", icon: "🍀" }
];

/* ==========================================================================
   6. LAS 31 INCURSIONES INSTANCIADAS (MAZMORRAS DEL MULTIVERSO)
   ========================================================================== */
const dungeonDB = [
    {
        id: "dung_alpha", title: "Ruinas de Alpha (V1)", rank: "E", minLevel: 1, reqKey: null, isRedGate: false, biome: "default",
        phases: [
            { name: "Beatboxers Olvidados", desc: "Sombras que imitan ritmos básicos bloquean el paso.", durationMins: 2, autoNext: true },
            { name: "El Primer Coro", desc: "Las voces se unen. Debes resistir la resonancia sonora.", durationMins: 3, autoNext: false }
        ],
        rewards: { xp: 80, gold: 40 }
    },
    {
        id: "dung_e_1", title: "Estación de Metro Abandonada (Hapjeong)", rank: "E", minLevel: 1, reqKey: null, isRedGate: false, biome: "default", 
        phases: [
            { name: "Lobos de Acero (Manada)", durationMins: 15, autoNext: true, desc: "Despeja la entrada. Trabajo organizativo ligero." },
            { name: "Rey Lobo Lycan", durationMins: 10, autoNext: false, desc: "Jefe de la Estación. Requiere confirmación manual de ejecución." }
        ],
        rewards: { xp: 80, gold: 45, drops: ["c1"] }
    },
    {
        id: "child_birds", title: "Isla Cerdito (Angry Birds)", rank: "E", minLevel: 2, reqKey: null, isRedGate: false, biome: "retro-mobile",
        phases: [{ name: "Robo de Huevos", desc: "Estructuras inestables bloquean el paso. Derrúmbalas.", durationMins: 5, autoNext: false }],
        rewards: { xp: 45, gold: 25 }
    },
    {
        id: "child_city", title: "Colapso Cívico (Little Big City)", rank: "E", minLevel: 4, reqKey: null, isRedGate: false, biome: "retro-mobile",
        phases: [{ name: "Gestión de Alcaldía", desc: "La ciudad exige tu atención inmediata. Optimiza recursos.", durationMins: 10, autoNext: false }],
        rewards: { xp: 60, gold: 30 }
    },
    {
        id: "child_farm", title: "Cosecha Podrida (Green Farm 3)", rank: "E", minLevel: 6, reqKey: null, isRedGate: false, biome: "retro-mobile",
        phases: [{ name: "Plaga en los Cultivos", desc: "Trabajo agrícola manual bajo presión de tiempo.", durationMins: 15, autoNext: false }],
        rewards: { xp: 80, gold: 40 }
    },
    {
        id: "dr_1", title: "Zona de Trampas de Tierra", rank: "E", minLevel: 8, reqKey: null, isRedGate: false, biome: "trap-grid",
        phases: [{ name: "El Pozo Infinito", desc: "Supervivencia básica. Observa el patrón de los pinchos.", durationMins: 15, autoNext: false }],
        rewards: { xp: 70, gold: 35 }
    },
    {
        id: "gta_1", title: "Territorio Ballas (Grove Street)", rank: "E", minLevel: 10, reqKey: null, isRedGate: false, biome: "groove-st",
        phases: [{ name: "Drive-By Ciego", desc: "Sobrevive al tiroteo desde el coche.", durationMins: 10, autoNext: false }],
        rewards: { xp: 90, gold: 50 }
    },
    {
        id: "botw_1", title: "Meseta de los Albores", rank: "D", minLevel: 12, reqKey: null, isRedGate: false, biome: "shrine",
        phases: [{ name: "Santuario de Prueba", desc: "Resuelve el acertijo ancestral con precisión.", durationMins: 20, autoNext: false }],
        rewards: { xp: 120, gold: 60 }
    },
    {
        id: "child_clash", title: "Asedio de Ayuntamiento (CoC)", rank: "D", minLevel: 14, reqKey: null, isRedGate: false, biome: "retro-mobile",
        phases: [{ name: "Ataque de Dragones", desc: "Las defensas antiaéreas han caído. Repáralas.", durationMins: 20, autoNext: false }],
        rewards: { xp: 120, gold: 60 }
    },
    {
        id: "child_dragon", title: "Hábitat Inestable (Dragon Mania)", rank: "D", minLevel: 17, reqKey: null, isRedGate: false, biome: "retro-mobile",
        phases: [{ name: "Furia Elemental", desc: "Los dragones de fuego se han descontrolado. Apacígualos.", durationMins: 20, autoNext: false }],
        rewards: { xp: 130, gold: 65 }
    },
    {
        id: "orv_1", title: "Escenario Principal #1", rank: "D", minLevel: 20, reqKey: null, isRedGate: false, biome: "star-stream",
        phases: [{ name: "Vagón 3407", desc: "Demuestra tu valor ante el Dokkaebi.", durationMins: 15, autoNext: false }],
        rewards: { xp: 140, gold: 70 }
    },
    {
        id: "dung_c_1", title: "Pantano del Lagarto Venenoso (Kasaka)", rank: "C", minLevel: 22, reqKey: "rankC", isRedGate: false, biome: "poison", 
        phases: [
            { name: "Lodo Tóxico", durationMins: 20, autoNext: true, desc: "Inmersión inicial. El ambiente corroe tu vida." },
            { name: "Guardián de Escamas", durationMins: 25, autoNext: true, desc: "Desarrollo del núcleo de la tarea." },
            { name: "Kasaka, Veneno Azul", durationMins: 15, autoNext: false, desc: "Jefe del Pantano. Cierre de la tarea." }
        ],
        rewards: { xp: 240, gold: 120, drops: ["eq_w1"] }
    },
    {
        id: "child_kingdoms", title: "Invasión del Rey Oscuro (K&L)", rank: "C", minLevel: 25, reqKey: "rankC", isRedGate: false, biome: "retro-mobile",
        phases: [{ name: "Reagrupar el Ejército", desc: "Las tropas están dispersas. Lidera el contraataque.", durationMins: 25, autoNext: false }],
        rewards: { xp: 190, gold: 95 }
    },
    {
        id: "dung_sunrise", title: "Santuario Sunrise (V3)", rank: "C", minLevel: 27, reqKey: "rankC", isRedGate: false, biome: "fire",
        phases: [
            { name: "Canto Indígena", desc: "El calor aumenta con cada compás melódico.", durationMins: 10, autoNext: true },
            { name: "Espíritu del Sol", desc: "Un tótem gigante despierta envuelto en llamas.", durationMins: 15, autoNext: false }
        ],
        rewards: { xp: 210, gold: 105 }
    },
    {
        id: "kny_1", title: "Montaña Fujikasane (Selección Final)", rank: "C", minLevel: 29, reqKey: "rankC", isRedGate: false, biome: "blood-demon",
        phases: [
            { name: "Noches entre Glicinas", desc: "Sobrevive hasta el amanecer. Trabajo de resistencia constante.", durationMins: 25, autoNext: true },
            { name: "Demonio de las Manos", desc: "El terror del pasado. Respira profundo y corta el cuello.", durationMins: 15, autoNext: false }
        ],
        rewards: { xp: 250, gold: 130 }
    },
    {
        id: "gta_2", title: "Vías de Los Santos", rank: "C", minLevel: 31, reqKey: "rankC", isRedGate: false, biome: "groove-st",
        phases: [{ name: "Follow the Damn Train", desc: "Sigue el ritmo del tren sin fallar ni distraerte.", durationMins: 25, autoNext: false }],
        rewards: { xp: 220, gold: 110 }
    },
    {
        id: "dan_1", title: "Túnel de la Turbo Abuela", rank: "C", minLevel: 33, reqKey: "rankC", isRedGate: false, biome: "paranormal",
        phases: [{ name: "Carrera de Espíritus", desc: "Corre más rápido que la maldición. Concentración veloz.", durationMins: 25, autoNext: false }],
        rewards: { xp: 230, gold: 115 }
    },
    {
        id: "dr_2", title: "Altar del Mono de Piedra", rank: "C", minLevel: 35, reqKey: "rankC", isRedGate: false, biome: "trap-grid",
        phases: [
            { name: "Lluvia de Rocas", desc: "Esquiva los proyectiles del ídolo.", durationMins: 15, autoNext: true },
            { name: "Destrucción del Núcleo", desc: "Golpea el altar central sin fallar.", durationMins: 10, autoNext: false }
        ],
        rewards: { xp: 240, gold: 125 }
    },
    {
        id: "sss_1", title: "Torre (Piso 10)", rank: "C", minLevel: 36, reqKey: "rankC", isRedGate: false, biome: "tower",
        phases: [{ name: "Rey Demonio de la Lluvia Otoñal", desc: "Las llamas purifican el salón imperial. Resiste el dolor.", durationMins: 25, autoNext: false }],
        rewards: { xp: 250, gold: 125 }
    },
    {
        id: "tg_1", title: "Distrito 20 (Trampa de Rize)", rank: "C", minLevel: 37, reqKey: "rankC", isRedGate: true, biome: "ghoul",
        phases: [
            { name: "Callejón Oscuro", desc: "El instinto asesino te acorrala. Resiste.", durationMins: 10, autoNext: true },
            { name: "Vigas de Acero", desc: "Un accidente premeditado. Sobrevive al impacto.", durationMins: 15, autoNext: false }
        ],
        rewards: { xp: 260, gold: 130 }
    },
    {
        id: "dan_2", title: "Invasión Serpo", rank: "B", minLevel: 39, reqKey: "rankB", isRedGate: false, biome: "paranormal",
        phases: [
            { name: "Espacio Vacío", desc: "Los alienígenas bloquean la realidad circundante.", durationMins: 20, autoNext: true },
            { name: "Fusión Psíquica", desc: "Contraataca con poder espiritual sincronizado.", durationMins: 20, autoNext: false }
        ],
        rewards: { xp: 360, gold: 180 }
    },
    {
        id: "botw_2", title: "Bestia Divina Vah Ruta", rank: "B", minLevel: 42, reqKey: "rankB", isRedGate: false, biome: "shrine",
        phases: [
            { name: "Control de Hielo", desc: "Destruye los bloques criogénicos antes de que impacten.", durationMins: 15, autoNext: true },
            { name: "Ira del Agua de Ganon", desc: "Combate acuático pesado. La fatiga aumenta.", durationMins: 25, autoNext: false }
        ],
        rewards: { xp: 380, gold: 190 }
    },
    {
        id: "csm_1", title: "Hotel (Demonio de la Eternidad)", rank: "B", minLevel: 44, reqKey: "rankB", isRedGate: true, biome: "gore",
        phases: [
            { name: "Piso 8 Infinito", desc: "La claustrofobia aumenta. Tarea cíclica y monótona.", durationMins: 25, autoNext: true },
            { name: "Motor Perpetuo de Sangre", desc: "Tira de la cuerda en tu pecho y desgarra el tiempo.", durationMins: 15, autoNext: false }
        ],
        rewards: { xp: 400, gold: 200 }
    },
    {
        id: "dr_3", title: "Laberinto del Dragón Venenoso", rank: "B", minLevel: 46, reqKey: "rankB", isRedGate: false, biome: "trap-grid",
        phases: [
            { name: "Gas Corrosivo", desc: "El aire disuelve tus pulmones. Tarea de alta velocidad.", durationMins: 20, autoNext: true },
            { name: "El Babilon", desc: "El guía se ha convertido en enemigo.", durationMins: 20, autoNext: false }
        ],
        rewards: { xp: 420, gold: 210 }
    },
    {
        id: "orv_2", title: "Mazmorra del Teatro", rank: "B", minLevel: 48, reqKey: "rankB", isRedGate: false, biome: "star-stream",
        phases: [
            { name: "Guión Alterado", desc: "Actúa bajo la mirada de las Constelaciones.", durationMins: 20, autoNext: true },
            { name: "Amo del Teatro", desc: "Rompe la pantalla y reescribe el final.", durationMins: 20, autoNext: false }
        ],
        rewards: { xp: 440, gold: 220 }
    },
    {
        id: "dung_red_ice", title: "Dominio de los Elfos de Hielo (Portal Rojo)", rank: "A", minLevel: 50, reqKey: "rankA", isRedGate: true, biome: "ice", 
        phases: [
            { name: "Ventisca Mortal (Territorio de Tank)", durationMins: 30, autoNext: true, desc: "Sobrevive al frío extremo y lidera a los sobrevivientes." },
            { name: "Baruka, Líder Hyakki", durationMins: 20, autoNext: false, desc: "Jefe de Portal Rojo. Desbloquea la extracción de Tank." }
        ],
        rewards: { xp: 620, gold: 380, drops: ["eq_a1", "c7"] }
    },
    {
        id: "dung_dystopia", title: "Sector Dystopia (V8)", rank: "A", minLevel: 54, reqKey: "rankA", isRedGate: true, biome: "void",
        phases: [
            { name: "Drones de Vigilancia", desc: "El sistema te ha detectado. Sobrevive al escaneo.", durationMins: 15, autoNext: true },
            { name: "Terminal Cibernética", desc: "Pirateo neural en progreso. El aire es denso y pesado.", durationMins: 15, autoNext: true },
            { name: "El Ojo de Dystopia", desc: "El núcleo cibernético intenta asimilar tu alma.", durationMins: 15, autoNext: false }
        ],
        rewards: { xp: 640, gold: 350 }
    },
    {
        id: "kny_2", title: "Tren Infinito", rank: "A", minLevel: 58, reqKey: "rankA", isRedGate: true, biome: "blood-demon",
        phases: [
            { name: "Sueños Felices", desc: "Lucha contra la tentación de dormirte. Enmu ataca.", durationMins: 25, autoNext: true },
            { name: "Luna Superior Tres: Akaza", desc: "La aguja de la brújula apunta a tu espíritu de pelea.", durationMins: 30, autoNext: false }
        ],
        rewards: { xp: 680, gold: 370 }
    },
    {
        id: "gta_3", title: "Área 69 (Black Project)", rank: "A", minLevel: 62, reqKey: "rankA", isRedGate: true, biome: "groove-st",
        phases: [
            { name: "Infiltración Sigilosa", desc: "Luces de búsqueda activas. Cero margen de error.", durationMins: 30, autoNext: true },
            { name: "Robo del Jetpack", desc: "Los militares han abierto fuego. Huye hacia arriba.", durationMins: 20, autoNext: false }
        ],
        rewards: { xp: 700, gold: 390 }
    },
    {
        id: "tg_2", title: "Sala de Ocio de Yamori", rank: "A", minLevel: 65, reqKey: "rankA", isRedGate: true, biome: "ghoul",
        phases: [
            { name: "Inyección RC", desc: "El dolor nubla tus sentidos. Mantente enfocado.", durationMins: 25, autoNext: true },
            { name: "¿1000 menos 7?", desc: "Consciencia fragmentada. Rompe tus cadenas.", durationMins: 25, autoNext: false }
        ],
        rewards: { xp: 740, gold: 410 }
    },
    {
        id: "sss_2", title: "Torre (Piso 20: Murim)", rank: "A", minLevel: 68, reqKey: "rankA", isRedGate: true, biome: "tower",
        phases: [
            { name: "Horda Demoníaca", desc: "Miles de artistas marciales caídos. Flujo constante de trabajo.", durationMins: 30, autoNext: true },
            { name: "Líder del Culto Demoníaco", desc: "Soporta el corte de la Espada Celestial en la nieve.", durationMins: 20, autoNext: false }
        ],
        rewards: { xp: 780, gold: 440 }
    },
    {
        id: "botw_3", title: "Castillo de Hyrule", rank: "S", minLevel: 75, reqKey: "rankS", isRedGate: true, biome: "shrine",
        phases: [
            { name: "Patrulla de Guardianes", desc: "Esquiva los láseres de apuntado. Tarea de extrema concentración.", durationMins: 30, autoNext: true },
            { name: "Ganon, el Cataclismo", desc: "La esencia del odio puro. No hay escape.", durationMins: 45, autoNext: false }
        ],
        rewards: { xp: 1350, gold: 820 }
    },
    {
        id: "dung_evadare", title: "Callejón Evadare (Mod)", rank: "S", minLevel: 78, reqKey: "rankS", isRedGate: true, biome: "toxic",
        phases: [
            { name: "Jazz Letal", desc: "Música de ascensor, pero los instrumentos son armas de fuego.", durationMins: 20, autoNext: true },
            { name: "El Padrino", desc: "El líder de la mafia rítmica no perdona intrusos.", durationMins: 25, autoNext: false }
        ],
        rewards: { xp: 1400, gold: 850 }
    },
    {
        id: "jeju_island", title: "Isla de Jeju (Nido de la Reina Hormiga)", rank: "S", minLevel: 82, reqKey: "rankS", isRedGate: true, biome: "gore",
        phases: [
            { name: "Playa de Escombros", desc: "Aniquila a miles de hormigas soldado que bloquean la costa.", durationMins: 20, autoNext: true },
            { name: "Cámara de la Reina", desc: "Corta la cabeza de la Reina Hormiga antes de que llame a su guardia.", durationMins: 25, autoNext: true },
            { name: "El Rey Nacido en la Oscuridad (Beru)", desc: "Duelo a muerte por el alma de Min Byung-Gyu y el trono de Jeju.", durationMins: 30, autoNext: false }
        ],
        rewards: { xp: 2000, gold: 1150, drops: ["eq_a_beru", "c7"] }
    },
    {
        id: "csm_2", title: "El Infierno", rank: "S", minLevel: 86, reqKey: "rankS", isRedGate: true, biome: "gore",
        phases: [
            { name: "Puertas en el Cielo", desc: "Caída libre hacia la desesperación primigenia.", durationMins: 15, autoNext: true },
            { name: "Demonio de la Oscuridad", desc: "Los astronautas rezan en silencio. Todo fallo aquí es letal.", durationMins: 35, autoNext: false }
        ],
        rewards: { xp: 1650, gold: 950 }
    },
    {
        id: "sss_3", title: "El Mundo del Romance", rank: "S", minLevel: 90, reqKey: "rankS", isRedGate: true, biome: "tower",
        phases: [
            { name: "Infiltración Aristocrática", desc: "Política y engaños. Trabaja con extrema delicadeza.", durationMins: 35, autoNext: true },
            { name: "Dama de la Rosa", desc: "Repite el bucle hasta que la ejecución sea perfecta.", durationMins: 40, autoNext: false }
        ],
        rewards: { xp: 1750, gold: 1000 }
    },
    {
        id: "orv_3", title: "El Castillo Oscuro", rank: "S", minLevel: 95, reqKey: "rankS", isRedGate: true, biome: "star-stream",
        phases: [
            { name: "Escenario de Rango", desc: "Las constelaciones apuestan monedas por tu caída.", durationMins: 30, autoNext: true },
            { name: "Rey Demonio de la Salvación", desc: "El destino absoluto choca contra tu voluntad.", durationMins: 45, autoNext: false }
        ],
        rewards: { xp: 1900, gold: 1100 }
    },
    {
        id: "abyss_1", title: "Capital de los No Devueltos (Made in Abyss)", rank: "SSS", minLevel: 115, reqKey: "rankS", isRedGate: true, biome: "abyss",
        phases: [
            { name: "Capa 1 y 2 (El Borde)", desc: "Descenso inicial. Aún puedes respirar.", durationMins: 15, autoNext: true },
            { name: "Capa 3 (La Gran Falla)", desc: "Alucinaciones visuales. La gravedad es tu enemiga.", durationMins: 20, autoNext: true },
            { name: "Capa 4 (Cáliz de Gigantes)", desc: "Hemorragia activa si pierdes la concentración.", durationMins: 25, autoNext: true },
            { name: "Capa 5 (Mar de Cadáveres)", desc: "Pérdida de los sentidos. Bondrewd observa desde Ido Front.", durationMins: 30, autoNext: true },
            { name: "Capa 6 (Capital Sin Retorno)", desc: "Pérdida total de la humanidad si intentas huir. Sella o muta.", durationMins: 30, autoNext: false }
        ],
        rewards: { xp: 5500, gold: 2800 }
    }
];