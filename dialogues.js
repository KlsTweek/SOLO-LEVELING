/* ==========================================================================
   DIALOGUES.JS - BANCO NARRATIVO MASIVO DEL MONARCA DE LAS SOMBRAS
   ========================================================================== */

const DIALOGUE_BANK = {
    /* ======================================================================
       1. CAZADOR EN SOLITARIO (50 LÍNEAS - ESTILO SUNG JINWOO)
       ====================================================================== */
    solo: [
        "🗡️ Inviertes el agarre de tu daga en silencio y cortas el punto ciego de dos bestias sin gastar una gota de maná.",
        "👁️ Tus sentidos se agudizan al caminar en solitario; detectas la respiración de los monstruos ocultos tras los muros de [{dungeon}].",
        "⚡ Das un paso relámpago entre las sombras del corredor. Los enemigos caen antes de notar que tu presencia estuvo ahí.",
        "🌑 Avanzas solo por [{phase}]. Tu ritmo cardíaco se mantiene frío y calculador a 60 pulsaciones por minuto.",
        "🗡️ Desvías un zarpazo con el filo de tu arma y contraatacas directo al núcleo vital. +2 G recogidos del suelo.",
        "💨 Tu propia sombra se alarga bajo tus pies, ansiosa por salir, pero decides conservar el 100% de tu maná para el Jefe.",
        "👣 Limpias el corredor sin hacer ruido. Sin tu legión afuera, cada movimiento depende exclusivamente de tus reflejos.",
        "🔍 Encuentras [{trophy}] tirado en el suelo, pero lo apartas de una patada sin perder un segundo de concentración.",
        "🩸 El filo de tu arma gotea energía oscura tras perforar la coraza de un guardia enemigo de un solo tajo.",
        "🧠 Analizas el patrón de ataque de la patrulla frente a ti; en tres segundos encuentras la abertura perfecta y ejecutas.",
        "⚡ Usas el impulso de la pared para saltar sobre una emboscada y aterrizas detrás del líder enemigo mientras cae derrotado.",
        "🌑 El silencio de [{dungeon}] solo es interrumpido por el eco de tus pasos y el sonido metálico de tu hoja al enfundar.",
        "🗡️ Lanzaste tu daga con telequinesis hacia el techo, derribando una estalactita directo sobre las bestias del pasillo.",
        "👁️ Tu percepción detecta una trampa mágica oculta bajo los escombros de [{phase}]; la esquivas sin detener tu marcha.",
        "💪 Bloqueas el mazo de un monstruo con el antebrazo; la onda de choque agrieta el suelo, pero tus pies no retroceden ni un milímetro.",
        "🪙 Entre las cenizas de un enemigo recién abatido brilla una moneda antigua del Sistema. +2 G añadidos a tu bolsa.",
        "🩸 Un corte diagonal limpio divide en dos la barrera enemiga. Tu dominio del combate cercano se vuelve más letal cada minuto.",
        "🌬️ Exhalas lentamente estabilizando tu estamina. Pelear sin tus sombras te obliga a pulir tus propios instintos de supervivencia.",
        "🗡️ Hundes el filo en la nuca de un rastreador antes de que pueda alertar al resto de la horda en [{phase}].",
        "⚡ Te deslizas a ras del suelo pasando entre las piernas de un coloso y cortas sus tendones de Aquiles en un parpadeo.",
        "🌑 Las antorchas del corredor parpadean en azul cuando tu aura de Monarca se filtra levemente por tus hombros.",
        "🔍 Miras de reojo [{trophy}] incrustado en una columna rota; señal de que otros cazadores fallaron aquí antes que tú.",
        "🗡️ Dos proyectiles enemigos cortan el aire hacia tu rostro; los desvías con chispazos precisos sin bajar el ritmo.",
        "👁️ El aire se vuelve denso en [{dungeon}], pero tu mente permanece despejada como una cuchilla recién afilada.",
        "💥 Rompes la guardia de un monstruo acorazado con una patada frontal al pecho y rematas con un tajo ascendente.",
        "🩸 Sacudes la hoja de tu arma manchada de icor mágico y continúas descendiendo hacia el núcleo de [{phase}].",
        "⚡ Tu velocidad de reacción supera el sonido; cuando el eco de tu paso llega, tres enemigos ya han colapsado.",
        "🧠 Calculas la distancia exacta de la sala: cuatro enemigos a la izquierda, dos en las alturas. En cinco segundos no queda ninguno.",
        "🪙 Despojas el cadáver de un explorador del calabozo y recuperas suministros menores. +3 G.",
        "🌑 Tus ojos brillan con un destello azul neón en la penumbra; los monstruos menores retroceden por puro instinto de conservación.",
        "🗡️ Ejecutas una rotación de muñeca perfecta para desarmar a un guardia enemigo y usar su propia inercia en su contra.",
        "💨 El polvo se levanta tras tu aterrizaje. Ni una sola gota de sudor cae por tu frente mientras avanzas por [{dungeon}].",
        "🔍 Pisas [{trophy}] quebrándolo bajo tu bota; nada en este piso tiene el nivel suficiente para frenar tu avance.",
        "⚡ Canalizas una fracción mínima de fuerza en tus piernas y cruzas un abismo del corredor de un solo salto.",
        "🩸 Un monstruo intenta morder tu hombro desde el techo; lo sujetas del cuello en el aire y lo estrellas contra las baldosas.",
        "👁️ Sientes la vibración del Jefe al fondo de [{dungeon}]. Tu pulso no se acelera; al contrario, una sonrisa fría asoma en tu rostro.",
        "🗡️ Trazas una media luna luminosa con tu arma que limpia la niebla tóxica y despeja el frente por completo.",
        "💪 Tu estadística de Fuerza se nota en cada impacto: las paredes tiemblan cuando desvías el ataque de una bestia pesada.",
        "🌑 En la oscuridad total del pasillo, las sombras parecen inclinarse respetuosamente a tu paso aunque no hayas invocado a nadie.",
        "🪙 Encuentras un pequeño alijo oculto detrás de [{trophy}] mientras despejabas la esquina. +2 G.",
        "⚡ Fintas hacia la derecha dejando una imagen residual y perforas el costado expuesto del centinela del corredor.",
        "🧠 Recuerdas tus primeros días sobreviviendo apenas a bestias de Rango E; hoy tus movimientos son los de un verdadero Monarca.",
        "🗡️ Clavas tu arma en el suelo para frenar el empuje de una onda expansiva y contraatacas en el instante en que cesa el viento.",
        "🩸 Cinco cortes en menos de un segundo. La patrulla de [{phase}] se desintegra en partículas de maná antes de tocar el suelo.",
        "👁️ Escuchas el crujido de una emboscada tras el muro; atraviesas la piedra de un golpe y neutralizas la amenaza de raíz.",
        "💨 Corres por la pared lateral esquivando un derrumbe y caes con el filo por delante sobre el comandante del sector.",
        "🔍 Recoges brevemente [{trophy}], evalúas su densidad mágica y lo descartas para no cargar peso inútil en la incursión.",
        "⚡ Tu concentración en la vida real sincroniza tus reflejos aquí adentro: cada segundo de enfoque multiplica tu letalidad.",
        "🌑 El corredor de [{phase}] queda en absoluto silencio tras tu paso. Solo quedan cenizas negras donde antes había una horda.",
        "🗡️ Ajustas las correas de tus guanteletes mientras caminas hacia la siguiente puerta; tu núcleo de maná sigue intacto."
    ],

    /* ======================================================================
       2. UN SOLO COMANDANTE DESPLEGADO (50 LÍNEAS POR CADA UNO = 250 LÍNEAS)
       ====================================================================== */
    single: {
        /* --- COMANDANTE IGRIS (50 LÍNEAS: CABALLEROSIDAD, SILENCIO Y ESGRIMA) --- */
        igris: [
            "⚔️ Igris sacude la sangre azul de su mandoble con un movimiento elegante y se coloca a tu derecha en absoluto silencio.",
            "⚔️ Una bestia intenta emboscarte por la espalda; Igris la parte en dos sin siquiera mirarla y acomoda su penacho rojo.",
            "⚔️ Igris inspecciona [{trophy}], determina que no tiene valor táctico para su Monarca y despeja el camino.",
            "⚔️ Con postura de caballero real, Igris inclina la cabeza pidiéndote permiso antes de aniquilar al escuadrón del frente.",
            "⚔️ El filo azul de Igris ilumina el corredor oscuro; tres enemigos caen simultáneamente un segundo después de que él enfunda.",
            "⚔️ Igris camina dos pasos delante de ti revisando cada esquina de [{phase}] con la disciplina de un guardia imperial.",
            "⚔️ Un proyectil ácido vuela hacia ti; Igris lo corta por la mitad en el aire sin que una sola gota toque tu ropa.",
            "⚔️ Igris apoya la punta de su mandoble en el suelo y espera tus órdenes mientras los restos enemigos se evaporan a su alrededor.",
            "⚔️ Cuando un monstruo ruge desafiante, los ojos cian de Igris destellan y la bestia queda decapitada antes de terminar el grito.",
            "⚔️ Igris limpia su capa negra desgarrada tras atravesar a cinco enemigos en línea recta con una estocada relámpago.",
            "⚔️ Ves a Igris observar una espada oxidada en el suelo de [{dungeon}]; niega lentamente con el yelmo ante tan pobre herrería.",
            "⚔️ Igris desarma a un guardia enemigo con un giro de muñeca digno de su duelo en la sala del trono y lo ejecuta al instante.",
            "⚔️ El penacho carmesí de Igris ondea como una llama en la oscuridad mientras contiene él solo a toda la vanguardia de [{phase}].",
            "⚔️ Igris parte una roca gigante que caía del techo para que no tengas siquiera que desviar tu caminata en línea recta.",
            "⚔️ Con un golpe de pomo en el pecho, Igris derriba a un enemigo acorazado y te cede el golpe final con una reverencia.",
            "⚔️ Igris recoge una bolsa de monedas del líder caído y te la entrega sobre la palma de su guantelete metálico. +3 G.",
            "⚔️ Si nota que bajas la guardia un segundo, Igris cierra la distancia y levanta su mandoble como un muro frente a ti.",
            "⚔️ Igris envaina su espada y pelea a puño limpio contra tres bestias menores, recordándote la paliza que te dio en el cambio de clase.",
            "⚔️ El sonido de las botas metálicas de Igris resuena al unísono con las tuyas; una escolta perfecta y sin palabras innecesarias.",
            "⚔️ Igris patea [{trophy}] fuera del sendero para que el camino de su Monarca esté completamente despejado.",
            "⚔️ Un destello de relámpago azul recorre las cinco placas en 'V' del pecho de Igris antes de lanzar un tajo de viento cortante.",
            "⚔️ Igris bloquea dos hachas enemigas con una sola mano y contraataca con un corte horizontal que limpia toda la sala.",
            "⚔️ En medio del caos de [{dungeon}], la figura inmóvil de Igris parece la de un juez dictando sentencia sobre las bestias.",
            "⚔️ Igris clava su mandoble en el suelo y usa telequinesis menor para atraer hacia su filo a los arqueros escondidos.",
            "⚔️ Ningún enemigo logra acercarse a menos de cinco metros de ti; el perímetro de seguridad de Igris es milimétrico.",
            "⚔️ Igris examina las heridas de los muros de [{phase}], deduce el tamaño del Jefe y ajusta la guardia de su espada.",
            "⚔️ Una patrulla entera intenta rodearlos; Igris gira sobre su eje con la capa extendida creando un torbellino de acero letal.",
            "⚔️ Igris te señala silenciosamente con la hoja de su espada un punto débil en la formación enemiga del corredor.",
            "⚔️ Tras abatir a un campeón enemigo, Igris realiza un saludo de espada caballeresco antes de volver a tu sombra lateral.",
            "⚔️ Igris desvía un ataque sorpresa desde las sombras; el choque de aceros ilumina su yelmo negro con chispas azules.",
            "⚔️ Encuentras a Igris mirando fijamente [{trophy}] como si recordara una batalla de hace siglos, pero vuelve a su puesto al instante.",
            "⚔️ La precisión de Igris es quirúrgica: corta únicamente los núcleos mágicos de los monstruos sin dañar el botín. +2 G.",
            "⚔️ Igris salta hacia las vigas superiores de [{phase}] y cae como un meteorito azul sobre el nido de monstruos.",
            "⚔️ Un enemigo intenta huir para dar la alarma; Igris lanza su espada como jabalina, lo atraviesa y la recupera al pasar caminando.",
            "⚔️ El humo negro que emana de los hombros de Igris se intensifica a medida que se acercan a la cámara del Jefe.",
            "⚔️ Igris se interpone ante una explosión de maná inestable, partiéndola en dos corrientes inofensivas con su mandoble.",
            "⚔️ Aunque no puede hablar aún, la lealtad que transmiten los ojos brillantes de Igris supera cualquier juramento.",
            "⚔️ Igris corta los soportes de una barricada enemiga en [{dungeon}], sepultando a toda la escuadra bajo los escombros.",
            "⚔️ Con un paso fantasmal, Igris aparece detrás de cuatro enemigos; solo cuando su espada hace «clic» en la vaina, todos caen.",
            "⚔️ Igris aparta una cortina de telarañas y escombros con su capa para que pases sin mancharte hacia el siguiente sector.",
            "⚔️ Un monstruo golpea el hombro de Igris; el comandante ni siquiera parpadea y lo desintegra de un revés.",
            "⚔️ Igris recolecta silenciosamente las monedas esparcidas tras la escaramuza en [{phase}]. +3 G.",
            "⚔️ La postura de esgrima de Igris no tiene un solo ángulo muerto; es la definición pura de un Comandante de Élite.",
            "⚔️ Igris parte en dos [{trophy}] para comprobar si ocultaba una trampa mágica antes de dejarte avanzar.",
            "⚔️ El resplandor azul del mandoble de Igris se refleja en el suelo mientras avanza imperturbable entre la horda.",
            "⚔️ Igris ejecuta una estocada triple tan veloz que el aire del pasillo chilla como si hubiera caído un rayo.",
            "⚔️ Al ver que te concentras en tu tarea, Igris redobla su velocidad para que ningún ruido del calabozo te distraiga.",
            "⚔️ Igris apoya una rodilla en tierra un segundo para reportar visualmente que el sector frontal está 100% despejado.",
            "⚔️ Las bestias de [{dungeon}] sienten el instinto asesino del Caballero Rojo y retroceden tropezando entre ellas.",
            "⚔️ Igris camina a tu lado con la mano en la empuñadura, listo para partir el cielo en dos a tu menor señal."
        ],

        /* --- TANK (50 LÍNEAS: OSO ALFA, HIELO, FUERZA BRUTA Y COSTUMBRES DE OSO) --- */
        tank: [
            "🐻‍❄️ Tank se aburre de caminar, se lanza de panza sobre el suelo helado y se lleva por delante a cinco monstruos como bolos.",
            "🐻‍❄️ Tank se sienta un segundo a rascarse la oreja con la pata trasera mientras una bestia intenta morderle el pelaje sin hacerle cosquillas.",
            "🐻‍❄️ Tank olfatea [{trophy}], le da un lengüetazo y te mira moviendo las orejas por si tienes comida.",
            "🐻‍❄️ Un rugido gutural de Tank congela el vapor del aire; las bestias menores retroceden temblando ante el depredador alfa.",
            "🐻‍❄️ Tank se sacude como un perro gigante tras aplastar a una patrulla y te salpica de escarcha mágica.",
            "🐻‍❄️ Tank se levanta sobre sus dos patas traseras alcanzando cuatro metros de altura y desploma sus garras quebrando el suelo de [{phase}].",
            "🐻‍❄️ Un enemigo le lanza una flecha a Tank; la flecha rebota en su grueso pelaje de sombra y el oso ni se entera.",
            "🐻‍❄️ Tank bosteza abriendo unas fauces capaces de tragarse un coche mientras camina perezosamente a tu lado.",
            "🐻‍❄️ De un solo manotazo casual, Tank manda a volar a un guardia enemigo a través de tres paredes de [{dungeon}].",
            "🐻‍❄️ Tank frota su enorme espalda contra una columna del calabozo para rascarse y termina derrumbando medio techo sobre los monstruos.",
            "🐻‍❄️ Cada huella que deja Tank en el suelo de [{phase}] queda cubierta por una capa de escarcha azul brillante.",
            "🐻‍❄️ Tank te empuja suavemente con su enorme hocico frío pidiendo que le acaricies la cabeza tras limpiar la sala.",
            "🐻‍❄️ Al ver una fila de enemigos, a Tank se le iluminan los ojos cian y arranca en una estampida que hace temblar toda la mazmorra.",
            "🐻‍❄️ Tank aplasta un cofre viejo de un pisotón y entre las tablas rotas saltan monedas directo a tus pies. +3 G.",
            "🐻‍❄️ Un monstruo intenta bloquear el paso con un escudo; Tank se come el escudo de un mordisco y lo escupe hecho pedazos.",
            "🐻‍❄️ Tank exhala una nube de aliento ártico que deja congelados como estatuas a tres exploradores enemigos.",
            "🐻‍❄️ Tank juega con [{trophy}] dándole manotazos por el pasillo como si fuera un gato de dos toneladas.",
            "🐻‍❄️ Cuando siente peligro cerca de ti, el pelaje de Tank se eriza formando agujas de hielo negro alrededor de tu posición.",
            "🐻‍❄️ Tank usa su enorme cuerpo como ariete para abrir de par en par una puerta sellada de [{dungeon}].",
            "🐻‍❄️ Después de destrozar a una patrulla, Tank se acuesta un segundo sobre una pila de escombros como si fuera su cama.",
            "🐻‍❄️ Tank olfatea el aire de [{phase}], gruñe hacia el techo y de un salto derriba a un asesino que esperaba arriba.",
            "🐻‍❄️ Las garras luminosas de Tank dejan surcos profundos en la roca cada vez que frena después de una embestida.",
            "🐻‍❄️ Tank atrapa en el aire una roca lanzada por un enemigo y la pulveriza entre sus mandíbulas como si fuera hielo raspado.",
            "🐻‍❄️ El frío que emana del núcleo de Tank refresca el ambiente pesado de [{dungeon}], reduciendo tu fatiga mental.",
            "🐻‍❄️ Tank intenta pasar por un arco estrecho de [{phase}], se queda atorado un segundo y rompe el marco entero a empujones.",
            "🐻‍❄️ Un monstruo le grita en la cara a Tank; el oso le ruge diez veces más fuerte dejándolo sordo y desmayado del susto.",
            "🐻‍❄️ Tank desentierra con sus garras un pequeño botín oculto bajo las baldosas y te lo acerca con la pata. +2 G.",
            "🐻‍❄️ Los cristales de hielo en el lomo de Tank brillan intensamente mientras absorbe la hostilidad del sector.",
            "🐻‍❄️ Tank muerde [{trophy}], comprueba que no es comestible y lo lanza hacia atrás golpeando a un monstruo por accidente.",
            "🐻‍❄️ A pesar de su aspecto terrorífico de bestia abisal, Tank camina pegado a ti como un guardaespaldas fiel.",
            "🐻‍❄️ Tank da un pisotón sísmico que levanta estalagmitas de hielo y empala a toda la primera línea enemiga.",
            "🐻‍❄️ Ves a Tank perseguir una mariposa de maná durante tres segundos antes de recordar que es un temible oso de combate.",
            "🐻‍❄️ Tank bloquea un chorro de fuego enemigo con su pecho peludo sin sufrir un solo rasguño.",
            "🐻‍❄️ Con un giro de cadera, Tank barre a cuatro monstruos hacia un precipicio de [{phase}] sin perder el paso.",
            "🐻‍❄️ Tank apoya su pesada barbilla sobre tu hombro un instante; pesa como el plomo, pero demuestra su afecto.",
            "🐻‍❄️ El sonido de las mandíbulas de Tank cerrándose en seco basta para que los monstruos del corredor suelten sus armas.",
            "🐻‍❄️ Tank rueda como una avalancha de nieve negra por la pendiente de [{dungeon}] aplastando todo a su paso.",
            "🐻‍❄️ Un jefe menor intenta intimidar a Tank; el oso le pone su gigantesca zarpa encima de la cabeza y lo hunde en el suelo.",
            "🐻‍❄️ Tank huele oro cerca, escarba entre los restos de la sala y hace rodar monedas hacia ti. +3 G.",
            "🐻‍❄️ La escarcha de Tank congela el charco de veneno del pasillo para que puedas cruzar caminando sobre hielo limpio.",
            "🐻‍❄️ Tank estornuda por el polvo de [{phase}] y el soplido helado estampa a dos enemigos contra la pared del fondo.",
            "🐻‍❄️ Nadie puede flanquearte mientras la mole colosal de Tank cubra toda la retaguardia del corredor.",
            "🐻‍❄️ Tank mira [{trophy}] con curiosidad animal, le da un zarpazo y lo manda al otro extremo de la mazmorra.",
            "🐻‍❄️ Las runas azules en la frente de Tank parpadean en sincronía con tu núcleo de maná.",
            "🐻‍❄️ Tank agarra un tronco de piedra y lo sacude de lado a lado despejando el camino como una barredora.",
            "🐻‍❄️ Al terminar el combate del sector, Tank se sienta sobre el monstruo más grande como si fuera un cojín.",
            "🐻‍❄️ El aliento gélido de Tank empaña el aire de [{dungeon}] recordándote el Portal Rojo de los Elfos de Hielo.",
            "🐻‍❄️ Tank trota pesadamente a tu lado haciendo «bum, bum, bum» en cada losa del calabozo.",
            "🐻‍❄️ Un grupo de bestias salta sobre Tank; él solo se sacude el lomo y todas salen disparadas contra las paredes.",
            "🐻‍❄️ Tank aúlla hacia la bóveda de [{phase}] anunciando a todas las criaturas que el Monarca ha llegado."
        ],

        /* --- IRON (50 LÍNEAS: FUERZA BRUTA, COMEDIA DE KIM CHUL, ESCUDO Y TROFEOS) --- */
        iron: [
            "🛡️ ¡Iron te trajo [{trophy}] como regalo de incursión y se golpea el pecho orgulloso esperando que lo felicites!",
            "🛡️ Iron olvida que tiene un hacha, usa a un monstruo para golpear a otro monstruo y luego levanta los pulgares hacia ti.",
            "🛡️ Iron se pone a posar sacando músculo frente a los cadáveres enemigos hasta que nota que lo estás mirando y se cuadra nervioso.",
            "🛡️ Iron golpea su escudo gigante tres veces; el eco aturde a las bestias del pasillo y te deja el camino libre. +3 G.",
            "🛡️ Iron intenta guardarse [{trophy}] dentro del casco, no le cabe, se frustra y lo aplasta de un pisotón.",
            "🛡️ Iron corre gritando a todo pulmón contra una puerta cerrada de [{phase}] y la atraviesa dejando su silueta marcada en la pared.",
            "🛡️ Después de aplastar a un enemigo de un solo mazazo, Iron le sigue pegando veinte veces más al suelo por pura emoción.",
            "🛡️ Iron gira hacia ti buscando una palmadita en la cabeza; como no le dices nada, sus hombros gigantes se caen de tristeza.",
            "🛡️ Un arquero enemigo le dispara a Iron; la flecha rebota en su casco y él se ríe a carcajadas mudas golpeándose la barriga.",
            "🛡️ Iron arranca un pilar entero de [{dungeon}] y lo usa como bate de béisbol contra la patrulla que venía de frente.",
            "🛡️ Iron ve un charco en el suelo, pone su escudo gigante encima como puente para que no te mojes las botas y te saluda militarmente.",
            "🛡️ En su entusiasmo por protegerte, Iron empuja una roca gigante y casi te aplasta a ti también antes de frenarla con la espalda.",
            "🛡️ Iron recoge un puñado de monedas de un monstruo aplastado y te las enseña saltando en su lugar como un niño. +2 G.",
            "🛡️ Un monstruo intenta esquivar a Iron; él lanza su escudo como si fuera un disco gigante y lo plancha contra el muro.",
            "🛡️ Iron se queda mirando su propio reflejo en una armadura rota de [{phase}] y se acomoda los cuernos del casco.",
            "🛡️ Con su Grito de Provocación, Iron insulta en idioma sombrío a toda la sala y hace que los monstruos hagan fila para pegarle.",
            "🛡️ Iron aguanta el embate de cuatro bestias a la vez con una sonrisa feroz tras su visor azul mientras tú avanzas tranquilo.",
            "🛡️ Iron te señala [{trophy}] en el suelo y te mira con ojos brillantes preguntando si se lo puede quedar de recuerdo.",
            "🛡️ Al ver que un enemigo iba a atacarte por un costado, Iron se lanza en plancha como portero y lo estampa contra el suelo.",
            "🛡️ Iron intenta imitar la postura elegante de un caballero, pero pierde el equilibrio por el peso de su escudo y se cae de espaldas.",
            "🛡️ Iron levanta a dos monstruos del cuello, uno en cada mano, los choca entre sí como cocos y mira hacia ti esperando aplausos.",
            "🛡️ El estruendo que hace la armadura pesada de Iron al caminar por [{dungeon}] hace imposible cualquier intento de sigilo.",
            "🛡️ Iron encuentra una trampa de pinchos en [{phase}], la activa pisándola a propósito y se queda parado encima sin sufrir daño.",
            "🛡️ Cuando le das una orden mental, Iron se emociona tanto que salta y agrieta las baldosas del corredor.",
            "🛡️ Iron sacude a un monstruo derrotado patas arriba hasta que le caen las últimas monedas de los bolsillos. +3 G.",
            "🛡️ Iron usa su enorme hacha de guerra para abanicarte aire fresco después de una pelea intensa en [{dungeon}].",
            "🛡️ Un enemigo golpea el escudo de Iron con una maza; la maza del enemigo se rompe y Iron le devuelve un cabezazo con el yelmo.",
            "🛡️ Iron recoge [{trophy}], lo dobla por la mitad para demostrar su fuerza bruta y te lo ofrece como trofeo de caza.",
            "🛡️ Si el pasillo está muy oscuro, Iron hace chocar su hacha contra su escudo sacando chispas para iluminarte el camino.",
            "🛡️ Iron se rasca la nuca confundido ante un acertijo en los muros de [{phase}] y decide resolverlo rompiendo la pared a puñetazos.",
            "🛡️ Cinco monstruos se lanzan sobre Iron; tres segundos después, Iron sale de debajo de la pila levantando el brazo como campeón.",
            "🛡️ Iron ve una estatua en [{dungeon}], cree que es un enemigo y le mete un escudazo que la convierte en grava.",
            "🛡️ A pesar de tener cero delicadeza, Iron cuida tu espalda con una devoción inquebrantable en cada metro del calabozo.",
            "🛡️ Iron te hace señas exageradas indicando que el camino está despejado, aunque acaba de derrumbar la mitad del pasillo.",
            "🛡️ Un monstruo venenoso escupe ácido; Iron levanta su escudo torre cubriéndote por completo como un paraguas de acero.",
            "🛡️ Iron patea una piedra aburrido, la piedra rebota en tres paredes de [{phase}] y noquea a un explorador enemigo oculto.",
            "🛡️ Cuando terminas de limpiar una sala, Iron hace una flexión de brazos tipo fisicoculturista celebrando la victoria.",
            "🛡️ Iron encuentra [{trophy}], se lo pone encima del casco como adorno y camina orgulloso hasta que se le cae.",
            "🛡️ El peso de Iron hunde una baldosa trampa, pero él detiene el muro de piedra que caía sosteniéndolo con una sola mano.",
            "🛡️ Iron recoge el botín del suelo con sus enormes guanteletes cuidando de no aplastar las monedas de oro. +2 G.",
            "🛡️ Si un monstruo se atreve a apuntarte, el visor azul de Iron se enciende con furia berserker y lo taclea a toda velocidad.",
            "🛡️ Iron golpea el suelo con el borde inferior de su escudo creando una grieta que hace tropezar a toda la patrulla enemiga.",
            "🛡️ Ves a Iron intentando caminar de puntitas para no hacer ruido en [{phase}], haciendo exactamente el doble de escándalo.",
            "🛡️ Iron arranca una puerta de hierro de sus bisagras y la usa como segundo escudo para avanzar a doble guardia.",
            "🛡️ Tras pulverizar a un campeón enemigo, Iron se limpia el polvo de las hombreras y se cuadra firme a tu lado.",
            "🛡️ Iron mira con desprecio [{trophy}], lo pisa y te señala hacia adelante ansioso por encontrar enemigos más grandes.",
            "🛡️ Ningún ataque físico logra mover a Iron ni un centímetro cuando planta su escudo torre frente a ti.",
            "🛡️ Iron celebra cada monstruo derrotado dando saltitos pesados que hacen vibrar el polvo del techo de [{dungeon}].",
            "🛡️ Aunque en vida fue un cazador arrogante, como sombra Iron vive únicamente para recibir un «buen trabajo» de su Monarca.",
            "🛡️ Iron carga al frente abriendo una brecha limpia entre la horda de [{phase}] para que pases caminando sin ensuciarte."
        ],

        /* --- TUSK / KARGALGAN (50 LÍNEAS: MAGIA SUPREMA, TEATRALIDAD, GRAVEDAD Y FUEGO) --- */
        tusk: [
            "🔥 Tusk levanta los brazos dramáticamente haciendo brillar sus runas; cuando lo miras, carraspea tímido y finge seriedad.",
            "🔥 Tusk susurra el Cántico de Gravedad: el techo aplasta a la patrulla enemiga contra el suelo sin que tengas que mover un dedo.",
            "🔥 Tusk examina [{trophy}] flotando con telequinesis y te explica con señas que su magia es mucho más impresionante.",
            "🔥 El Orbe de Avaricia brilla en la mano de Tusk; una columna de fuego incinera las trampas del corredor antes de que las pises.",
            "🔥 Tusk se acomoda sus collares de cráneos con orgullo cada vez que sus hechizos despejan una sala entera.",
            "🔥 Con un chasquido de dedos, Tusk invierte la gravedad en [{phase}] haciendo que los monstruos choquen contra el techo y caigan aturdidos.",
            "🔥 Tusk entona el Himno de ceguera; una neblina carmesí envuelve a los enemigos dejándolos incapaces de ver tus ataques.",
            "🔥 Ves a Tusk practicando poses de gran hechicero en una esquina oscura de [{dungeon}] creyendo que nadie lo observa.",
            "🔥 Tusk lanza una maldición de lentitud sobre el escuadrón enemigo; sus movimientos parecen en cámara lenta frente a ti.",
            "🔥 Una bola de fuego del tamaño de un carruaje brota de la palma de Tusk, iluminando todo el sector e incinerando la barricada.",
            "🔥 Tusk hace levitar las monedas de los enemigos caídos con magia y las deposita limpiamente en tu bolsa. +3 G.",
            "🔥 Cuando un monstruo menor intenta acercarse, Tusk ni siquiera voltea: una barrera rúnica lo repele y lo desintegra.",
            "🔥 Tusk mira [{trophy}] con aires de erudito mágico, murmura algo en lengua orca y lo convierte en cenizas de un chispazo.",
            "🔥 Los ojos carmesí de Tusk resplandecen bajo su capucha mientras canaliza tres círculos mágicos simultáneos en el aire.",
            "🔥 Si nota que el terreno de [{phase}] está lleno de escombros, Tusk crea una alfombra de levitación gravitatoria para despejar el paso.",
            "🔥 Tusk invoca la cabeza de una serpiente de fuego que serpentea por el corredor devorando a los francotiradores enemigos.",
            "🔥 Tras lanzar un hechizo devastador, Tusk te mira de reojo con timidez esperando ver si te impresionó su poder mágico.",
            "🔥 El Himno de Debilitamiento de Tusk reduce a la mitad la fuerza física de todas las bestias presentes en [{dungeon}].",
            "🔥 Tusk levanta una mano y detiene en seco una lluvia de flechas en el aire antes de devolverlas ardiendo hacia los enemigos.",
            "🔥 Las túnicas de chamán de Tusk flotan sin viento gracias al inmenso maná que emana de su núcleo sombrío.",
            "🔥 Tusk aplica el Himno de Frenesí sobre tu sombra, haciendo que el aire alrededor de tus armas vibre con calor abrasador.",
            "🔥 Un grupo de monstruos intenta emboscar por detrás; Tusk aumenta la gravedad por diez y los deja pegados al suelo como calcomanías.",
            "🔥 Tusk recoge [{trophy}] con un hilo de maná púrpura, lo gira frente a ti y se ofrece a destruirlo si te estorba.",
            "🔥 El suelo de [{phase}] tiembla cuando Tusk recita una sola sílaba de su lenguaje antiguo de los Altos Orcos.",
            "🔥 Tusk condensa el calor de sus llamas para no acalorarte, dirigiendo el 100% de la onda térmica únicamente hacia las bestias.",
            "🔥 Con un gesto señorial, Tusk abre un escudo esférico carmesí que desvía los escombros del techo lejos de tu cabeza.",
            "🔥 Tusk extrae la energía residual de los núcleos rotos en el suelo y encuentra oro fundido entre las cenizas. +2 G.",
            "🔥 Ves a Tusk acariciando el Orbe de Avaricia como si fuera su tesoro más preciado antes de recordar que te pertenece a ti.",
            "🔥 Una explosión controlada de Tusk vuela en pedazos la puerta blindada de [{phase}] dejándola lista para tu entrada.",
            "🔥 Tusk murmura el Himno del Sueño Pesado; los guardias del corredor caen dormidos en el acto antes de que los ejecutes.",
            "🔥 Si un enemigo osa gritar en presencia del Monarca, Tusk le cierra las fauces con cadenas de gravedad oscura.",
            "🔥 Tusk proyecta pequeñas esferas de luz flotante para iluminar las zonas más lúgubres de [{dungeon}].",
            "🔥 A pesar de haber sido el orgulloso líder Kargalgan, Tusk se inclina con reverencia absoluta cada vez que pasas a su lado.",
            "🔥 Tusk combina el Himno de Fuego con el de Viento, creando un remolino incandescente que barre todo el pasillo en segundos.",
            "🔥 Tusk desintegra [{trophy}] con un rayo concentrado solo para demostrar la precisión milimétrica de su puntería.",
            "🔥 Las joyas y huesos del atuendo de Tusk tintinean suavemente mientras flota a medio metro del suelo detrás de ti.",
            "🔥 Tusk detecta una ilusión o trampa oculta en [{phase}] y la disipa de inmediato con un pulso de detección mágica.",
            "🔥 Un jefe menor intenta lanzar un hechizo; Tusk se burla de su técnica pobre y cancela su magia con un simple ademán.",
            "🔥 Tusk canaliza un cántico de restauración menor que alivia tus músculos mientras avanzas por [{dungeon}]. +5 HP.",
            "🔥 El resplandor dorado y rojo de la magia de Tusk convierte la penumbra del calabozo en un espectáculo de fuegos artificiales.",
            "🔥 Tusk aplasta a tres bestias contra las paredes laterales usando ondas de presión telequinética sin ensuciarse las manos.",
            "🔥 Cuando le permites usar todo su maná, Tusk entra en éxtasis teatral e invoca pilares de magma desde el subsuelo.",
            "🔥 Tusk aparta [{trophy}] levitándolo hacia el techo para que ni siquiera tengas que rodearlo al caminar.",
            "🔥 La sabiduría arcana de Tusk analiza la estructura de [{dungeon}], acelerando tu avance hacia el núcleo de la fase.",
            "🔥 Tusk crea escalones de gravedad sólida en el aire para que cruces un desnivel del terreno sin esfuerzo.",
            "🔥 Entre los restos calcinados de una patrulla, la magia de Tusk separa automáticamente el oro puro. +3 G.",
            "🔥 Tusk se cubre el rostro con la manga de su túnica avergonzado cuando un hechizo hace más ruido del que planeaba.",
            "🔥 Ningún mago o chamán enemigo en [{phase}] tiene oportunidad frente al Gran Hechicero de tu legión sombría.",
            "🔥 Tusk mantiene activo un campo de presión cero a tu alrededor que desvía el polvo y el humo del combate.",
            "🔥 Con los brazos cruzados y sus colmillos brillando en la oscuridad, Tusk aguarda tu orden para calcinar el mundo."
        ],

        /* --- BERU (50 LÍNEAS: "¡MI REY!", DRAMA HISTÓRICO, VELOCIDAD Y DEPREDACIÓN) --- */
        beru: [
            "🐜 Beru aparece arrodillado a milímetros de ti: «¡KIIIIEEK! ¡Mi Rey, ordéneme y borraré este ecosistema del mapa en tres segundos!»",
            "🐜 Beru te entrega [{trophy}] haciendo una reverencia de 90 grados digna de un drama histórico: «¡Un humilde tributo para mi Soberano!»",
            "🐜 Un monstruo osa mirarte de frente; Beru le rebana la cabeza a velocidad hipersónica gritando: «¡Insolente, baja la mirada ante el Rey!»",
            "🐜 Beru devora el núcleo mágico de una bestia caída y canaliza energía curativa verde hacia ti. +5 HP.",
            "🐜 Las alas de Beru zumban creando ondas de choque; el pasillo entero queda despejado antes de que des dos pasos.",
            "🐜 Beru tiembla de emoción al verte pelear: «¡Oh, qué espléndida demostración de poder marcial, mi Señor! ¡Este siervo llora de admiración!»",
            "🐜 Antes de que una gota de polvo caiga sobre tus hombros, Beru se mueve a Mach 3 y barre todo el suelo de [{phase}] con sus garras.",
            "🐜 Beru decapita a cinco enemigos en un parpadeo y regresa a tu lado juntando las manos como un mayordomo leal.",
            "🐜 «¡Kiiiek! ¡El aire de [{dungeon}] es indigno de los pulmones de mi Rey! ¡Limpiaré a todas las plagas de inmediato!»",
            "🐜 Beru prueba un bocado de un monstruo caído, lo escupe ofendido y dice: «¡Sabe horrible, mi Señor! ¡No es digno de su mesa!»",
            "🐜 Un enemigo intenta atacarte desde lejos; Beru aparece detrás de él como un fantasma violeta y lo parte en cuatro pedazos.",
            "🐜 Beru recolecta cada moneda del sector a velocidad ultrasónica y las apila ordenadamente frente a ti. +3 G.",
            "🐜 Ves a Beru murmurando frases de telenovelas históricas coreanas mientras afila sus garras con las armaduras enemigas.",
            "🐜 Si te detienes un segundo a pensar, Beru se arrodilla con la frente pegada al suelo: «¿Acaso este humilde insecto le ha fallado, mi Rey?»",
            "🐜 Beru mira [{trophy}] con desprecio absoluto: «¡Basura inmunda! ¡La reduciré a átomos para que no ensucie la vista de mi Soberano!»",
            "🐜 El aura asesina de Beru es tan densa que los monstruos de [{phase}] se desmayan de terror antes de que él siquiera abra sus mandíbulas.",
            "🐜 Beru recubre sus garras con veneno paralizante y neutraliza a toda una patrulla enemiga en medio segundo.",
            "🐜 «¡Mi Rey! ¡Permítame construirle un palacio real con los huesos de los jefes de [{dungeon}]!»",
            "🐜 Beru vuela en zigzag por todo el techo del corredor derribando estalactitas y enemigos ocultos como un misil viviente.",
            "🐜 Cuando una trampa se activa, Beru la detiene con sus propias manos desnudas diciendo: «¡Ni un rasguño tocará el cuerpo sagrado de mi Señor!»",
            "🐜 Beru absorbe los recuerdos de un explorador abatido y te informa al instante la ubicación exacta de la salida de [{phase}].",
            "🐜 El chasquido metálico de las mandíbulas de Beru resuena en la oscuridad seguido del colapso instantáneo de la vanguardia enemiga.",
            "🐜 Beru despliega su magia de curación heredada de Min Byung-Gyu para mantener tu vitalidad al máximo. +5 HP.",
            "🐜 «¡Oh, Soberano de las Sombras! ¡Su mera presencia hace que este miserable calabozo parezca un salón imperial!»",
            "🐜 Beru comprime su tamaño para caminar educadamente un paso detrás de ti, pero vuelve a su forma monstruosa en cuanto huele un enemigo.",
            "🐜 Un campeón enemigo ruge; Beru le cierra la boca de un puñetazo que atraviesa tres muros: «¡Silencio cuando mi Rey está concentrado!»",
            "🐜 Beru inspecciona [{trophy}] y pregunta con voz solemne: «¿Desea que investigue al culpable de dejar este escombro aquí y aniquile a su linaje?»",
            "🐜 La velocidad de Beru deja estelas de neón púrpura y turquesa rebotando de pared a pared en [{dungeon}].",
            "🐜 Beru te abanica suavemente con sus alas a baja potencia para despejar el humo tras una explosión en [{phase}].",
            "🐜 Entre los restos de la sala, Beru extrae oro limpio y te lo entrega con ambas manos inclinándose profundamente. +2 G.",
            "🐜 «¡Kiiiek! ¡Qué envidia me dan las armas que mi Rey sostiene en sus manos! ¡Ojalá este siervo fuera digno de tal honor!»",
            "🐜 Beru atraviesa una fila de diez bestias como un taladro negro y aterriza sin hacer el más mínimo ruido.",
            "🐜 Si un monstruo sobrevive al primer corte, Beru se disculpa dramáticamente contigo por tardar 0.2 segundos de más en matarlo.",
            "🐜 Los ojos compuestos de Beru escanean 360 grados alrededor tuyo; ni una mota de polvo escapa a su vigilancia.",
            "🐜 Beru usa su grito ultrasónico de Rey Hormiga para pulverizar los escudos de piedra de los guardias de [{phase}].",
            "🐜 «¡Mi Rey! ¡He despejado los próximos trescientos metros del corredor para que pueda caminar sin interrupciones!»",
            "🐜 Beru patea [{trophy}] a velocidad supersónica convirtiéndolo en un proyectil que derriba a dos monstruos al fondo.",
            "🐜 La lealtad fanática de Beru hace que pelee al 200% de su capacidad solo para escuchar tus pasos avanzar con calma.",
            "🐜 Beru desgarra una barrera mágica de [{dungeon}] con sus propias mandíbulas y te abre paso con una reverencia.",
            "🐜 «¡Cualquier criatura que respire el mismo aire que mi Señor sin su permiso merece la extinción inmediata!»",
            "🐜 Beru regenera parte de tu energía vital tras devorar al líder de la patrulla del sector. +5 HP.",
            "🐜 El exoesqueleto negro de Beru brilla como obsidiana pulida bajo las luces del bioma de [{dungeon}].",
            "🐜 Beru recoge [{trophy}], lo limpia con esmero extremo y pregunta si debe catalogarlo en el tesoro real.",
            "🐜 Con un solo aleteo, Beru disipa el gas venenoso del corredor enviándolo de vuelta contra los monstruos.",
            "🐜 «¡KIIIIEEK! ¡Contemplad todos el avance supremo del único y verdadero Monarca de las Sombras!»",
            "🐜 Beru encuentra monedas brillantes ocultas en una grieta del techo y baja volando a entregártelas. +3 G.",
            "🐜 La diferencia de poder entre Beru y los monstruos comunes de [{phase}] parece la de un dios frente a insectos.",
            "🐜 Beru camina detrás de ti con las manos cruzadas a la espalda como un consejero imperial hasta que salta el siguiente enemigo.",
            "🐜 Un zarpazo cuádruple de Beru deja marcas luminosas en el aire que parten en pedazos a la emboscada.",
            "🐜 «¡Mi vida, mi muerte y mi sombra le pertenecen por toda la eternidad, mi Rey!»"
        ]
    },

    /* ======================================================================
       3. DÚOS Y COMBOS DE GRUPO (76 LÍNEAS POR PAREJA: 38 P1 + 38 P2)
       ====================================================================== */
    duos: {
        /* ------------------------------------------------------------------
           PAREJA 1: IRON + TANK (38 IRON + 38 TANK = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        iron_tank: [
            { p1: "🛡️ Iron vio a Tank distraído olfateando el suelo de [{phase}] y le metió una patada traicionera en el trasero para lucirse ante ti...", p2: "🐻‍❄️ ...Tank se giró furioso, le dio un solo zarpazo y ahora Iron tiene el casco enterrado medio metro en el suelo.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank e Iron chocan los hombros compitiendo por ver quién derriba primero el muro de monstruos del frente...", p2: "🛡️ ...Ambos terminan rodando hechos una bola gigante y aplastan a toda la patrulla enemiga por accidente.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron intenta subirse al lomo de Tank para cabalgarlo como si fuera un caballo de guerra en [{dungeon}]...", p2: "🐻‍❄️ ...Tank da un sacudón de lomo y manda a Iron a estrellarse de cara contra el techo del corredor.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank encuentra un monstruo acorazado y abre las fauces para comérselo de un bocado...", p2: "🛡️ ...Iron se mete en medio, le quita la presa de un hachazo y celebra levantando los brazos mientras Tank le gruñe.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron encuentra [{trophy}] y se lo presume en la cara a Tank bailando de forma ridícula...", p2: "🐻‍❄️ ...Tank abre la boca, se traga [{trophy}] de un solo bocado y eructa una nube de escarcha en la cara de Iron.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank congela todo el piso del pasillo de [{phase}] con su aliento ártico para frenar a la horda...", p2: "🛡️ ...Iron viene corriendo sin frenos, patina sobre el hielo haciendo molinetes con los brazos y arrolla a seis bestias como bolos.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron golpea su escudo gigante para provocar a los monstruos, pero sin querer golpea la oreja de Tank...", p2: "🐻‍❄️ ...Tank le muerde el borde del escudo y lo sacude de lado a lado con todo e Iron colgado del brazo.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank se echa una siesta rápida sobre una pila de monstruos derrotados bloqueando todo el pasillo...", p2: "🛡️ ...Iron intenta empujarlo sudando la gota gorda, pero no logra mover ni un centímetro las dos toneladas del oso.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron apuesta con señas a que puede romper una columna de [{dungeon}] de un solo cabezazo...", p2: "🐻‍❄️ ...Iron rebota mareado y Tank derrumba la columna entera de un simple empujón de cadera mirándolo con superioridad.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank levanta un bloque de hielo gigante con las garras y lo lanza hacia la vanguardia enemiga...", p2: "🛡️ ...Iron salta con su maza y batea el bloque de hielo convirtiéndolo en una lluvia de metralla congelada.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron recoge monedas del suelo pero se le caen por culpa de sus enormes guanteletes metálicos...", p2: "🐻‍❄️ ...Tank las barre con su pata gigante directo hacia tus botas para quedar mejor contigo que Iron. +3 G.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank huele una emboscada tras el muro de [{phase}] y se prepara para saltar en silencio...", p2: "🛡️ ...Iron grita a todo pulmón arruinando el factor sorpresa y atraviesa la pared de pecho llevándose a los enemigos.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron se esconde detrás del enorme cuerpo peludo de Tank para protegerse de una lluvia de proyectiles...", p2: "🐻‍❄️ ...Tank da un paso al costado a propósito dejando que todas las flechas reboten en el casco de Iron.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank sacude la nieve y el barro de su pelaje después de cruzar un charco en [{dungeon}]...", p2: "🛡️ ...Iron queda completamente cubierto de lodo negro de pies a cabeza y se queda inmóvil procesando la humillación.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron planta su escudo torre en el suelo y le hace señas a Tank para hacer una maniobra combinada...", p2: "🐻‍❄️ ...Tank usa el escudo inclinado de Iron como rampa de salto y cae desde el techo aplastando al líder del sector.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank le ruge en la cara a un jefe menor dejándolo paralizado de miedo...", p2: "🛡️ ...Iron aprovecha que el enemigo no se mueve para meterle un escudazo que lo manda al otro lado de [{phase}].", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron intenta imitar el rugido feroz de Tank golpeándose la coraza como un gorila...", p2: "🐻‍❄️ ...Tank lo mira con vergüenza ajena y le tapa el casco con su enorme zarpa para que guarde silencio.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank arranca [{trophy}] de entre los escombros y lo deja caer frente a ti moviendo las orejas...", p2: "🛡️ ...Iron corre celoso, arranca un pedazo de pared diez veces más grande y te lo pone al lado esperando que elijas el suyo.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron lanza a un monstruo por los aires como si fuera una pelota de voleibol...", p2: "🐻‍❄️ ...Tank salta y lo remata de un zarpazo en el aire estrellándolo contra el suelo. +2 G.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank avanza a cuatro patas abriendo un surco profundo entre la horda de [{dungeon}]...", p2: "🛡️ ...Iron corre justo detrás de él rematando con el hacha a todo monstruo que sale volando hacia los lados.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron se queda atorado en una grieta estrecha de [{phase}] por culpa de sus hombreras gigantes...", p2: "🐻‍❄️ ...Tank le apoya la frente en la espalda y lo desatora de un empujón que lo hace salir disparado como corcho.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank bosteza aburrido porque los monstruos de este piso son demasiado débiles...", p2: "🛡️ ...Iron se ofende porque él sí estaba peleando en serio y se pone a dar hachazos aún más exagerados.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron le hace cosquillas en las costillas a Tank para molestarlo mientras caminan en fila...", p2: "🐻‍❄️ ...Tank le suelta un revés sin mirar que estampa a Iron contra la columna más cercana.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank levanta un muro de escarcha para bloquear un chorro de ácido enemigo en [{phase}]...", p2: "🛡️ ...Iron refuerza la barrera poniendo su escudo detrás del hielo; ni una gota logra pasar hacia ti.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron encuentra un barril explosivo en [{dungeon}] y lo levanta sobre su cabeza sin saber qué es...", p2: "🐻‍❄️ ...Tank se lo quita de un manotazo enviándolo hacia la horda enemiga justo un segundo antes de que explote.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank se acuesta boca arriba pidiendo que le rasquen la barriga tras despejar el pasillo...", p2: "🛡️ ...Iron cree que es una llave de lucha libre y se lanza en plancha encima de él iniciando otra pelea absurda.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron usa su Grito de Provocación atrayendo a veinte monstruos furiosos al mismo tiempo...", p2: "🐻‍❄️ ...Tank suspira, se pone a su lado y entre las dos moles detienen la estampida entera en seco.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank patea [{trophy}] hacia Iron como si quisiera jugar a la pelota en medio del calabozo...", p2: "🛡️ ...Iron no entiende el juego y parte [{trophy}] en dos de un hachazo dejando a Tank decepcionado.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron tropieza con una raíz de [{phase}] y va directo a caer de bruces al suelo...", p2: "🐻‍❄️ ...Tank lo atrapa del cuello de la armadura con los dientes como si fuera un cachorro y lo vuelve a parar.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank destroza un alijo enemigo de un pisotón haciendo saltar monedas por todo el corredor...", p2: "🛡️ ...Iron se tira de cabeza al suelo para atraparlas todas en el aire y te las entrega orgulloso. +3 G.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron señala hacia la izquierda asegurando que por ahí está el Jefe de [{dungeon}]...", p2: "🐻‍❄️ ...Tank huele el aire, bufa y camina hacia la derecha; obviamente el olfato de Tank tenía la razón.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank embiste por el flanco izquierdo mientras el suelo se cubre de púas glaciales...", p2: "🛡️ ...Iron cierra el flanco derecho con su escudo torre aplastando a los monstruos en una prensa humana.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron se recarga casualmente sobre el lomo de Tank para descansar después del combate...", p2: "🐻‍❄️ ...Tank se quita de golpe haciendo que Iron caiga sentado de espaldas contra el piso.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank gruñe amenazante hacia una sombra sospechosa que se mueve en el techo de [{phase}]...", p2: "🛡️ ...Iron lanza su hacha girando hacia arriba y derriba a tres rastreadores ocultos de un solo tiro.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron intenta levantar a Tank en brazos para demostrar que su estadística de Fuerza es mayor...", p2: "🐻‍❄️ ...A Iron le cruje toda la espalda sombría y Tank se le sienta encima dejándolo plano como una alfombra.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank congela las piernas de un coloso enemigo inmovilizándolo en el centro de la sala...", p2: "🛡️ ...Iron toma carrera desde veinte metros atrás y lo parte en pedazos con un impacto de ariete.", a1: "tank", a2: "iron" },
            { p1: "🛡️ Iron limpia su casco usando la punta peluda de la cola de Tank como si fuera una toalla...", p2: "🐻‍❄️ ...Tank le suelta un mordisco preventivo al aire que hace saltar a Iron tres metros hacia atrás.", a1: "iron", a2: "tank" },
            { p1: "🐻‍❄️ Tank e Iron se miran tras limpiar el sector, chocan la zarpa contra el guantelete metálico...", p2: "🛡️ ...Y el choque de fuerza entre ambos brutos genera una onda expansiva que termina de barrer el polvo de [{phase}].", a1: "tank", a2: "iron" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 2: IGRIS + IRON (38 IGRIS + 38 IRON = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        igris_iron: [
            { p1: "🛡️ Iron corre hacia ti sacudiendo los brazos emocionado y te entrega [{trophy}] esperando que lo felicites...", p2: "⚔️ ...Igris lo observa en silencio, suspira y le propina un zape metálico en la nuca para que deje de traerte basura.", a1: "iron", a2: "igris" },
            { p1: "🛡️ Iron encontró una rama torcida en [{phase}] y se la obsequió solemnemente a Igris como si fuera una espada sagrada...", p2: "⚔️ ...Igris le dio un golpe seco en el casco porque era un simple palo seco y siguió caminando con dignidad.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris avanza en completo silencio preparando una emboscada táctica perfecta contra los guardias...", p2: "🛡️ ...Iron pasa corriendo a su lado gritando como loco y arruina todo el plan, haciendo que Igris se lleve la mano a la frente.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron intenta imitar el elegante saludo de esgrima de Igris usando su enorme hacha pesada...", p2: "⚔️ ...El hacha se le resbala de las manos, casi le corta un cuerno a Igris, y el caballero rojo lo patea contra el muro.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris corta limpiamente a un monstruo en dos mitades exactas y enfunda su mandoble sin mirar atrás...", p2: "🛡️ ...Iron llega tarde, le pega un mazazo innecesario al cadáver que ya estaba muerto y festeja como si lo hubiera hecho él.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron trae la cabeza de un monstruo de [{dungeon}] en cada mano y las sacude frente a ti buscando aprobación...", p2: "⚔️ ...Igris se acerca, le quita las cabezas de un revés para que no te salpique y lo obliga a ponerse firme en la fila.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris te señala respetuosamente un cofre de botín que acaba de asegurar en [{phase}]...", p2: "🛡️ ...Iron no busca la llave: aplasta el cofre de un puñetazo y te entrega las monedas dobladas. +3 G.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron se queda embobado mirando el penacho rojo brillante del yelmo de Igris e intenta tocarlo...", p2: "⚔️ ...Igris le detiene la muñeca en el aire con una mirada azul gélida que hace que Iron retire la mano temblando.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris desvía tres proyectiles con el filo de su espada protegiendo tu flanco derecho...", p2: "🛡️ ...Iron recibe otros tres proyectiles directamente con la cara sin cubrirse y levanta el pulgar diciendo que está bien.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron planta su escudo torre frente a una horda en [{phase}] reteniendo el empuje de diez bestias...", p2: "⚔️ ...Igris salta apoyándose en el hombro de Iron y decapita a las diez bestias en un solo giro aéreo.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris camina con porte imperial cuidando de no pisar los charcos de [{dungeon}]...", p2: "🛡️ ...Iron salta con los dos pies en medio del charco más grande y salpica la capa negra de Igris, ganándose otro golpe.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron se pone a bailar celebrando que despejaron la mitad del corredor...", p2: "⚔️ ...Igris lo agarra del cuello de la armadura sin decir palabra y lo arrastra hacia el siguiente sector.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris desarma a un campeón enemigo y lo deja de rodillas listo para el interrogatorio...", p2: "🛡️ ...Iron no entiende que era un prisionero y lo manda a volar de un escudazo a través de la sala.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron encuentra [{trophy}], cree que es una trampa peligrosa y se tira encima para cubrirla con el cuerpo...", p2: "⚔️ ...Igris pasa caminando a su lado mirándolo en el suelo porque era un objeto completamente inofensivo.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris traza un tajo de viento azul que abre una línea recta entre los enemigos de [{phase}]...", p2: "🛡️ ...Iron entra corriendo por esa brecha como un tren sin frenos terminando de demoler las filas laterales.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron intenta pararse exactamente en la misma pose cruzada de brazos que hace Igris...", p2: "⚔️ ...Igris nota la imitación, gira lentamente el yelmo hacia él e Iron finge estar mirando el techo silbando.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris recolecta monedas con precisión quirúrgica usando la punta de su espada...", p2: "🛡️ ...Iron junta otro montón barriendo el piso con su escudo y te lo vuelca a los pies. +2 G.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron ruge con su Grito de Provocación haciendo que hasta las piedras de [{dungeon}] tiemblen...", p2: "⚔️ ...Igris aprovecha que todos los monstruos miran a Iron para cortarlos por la espalda en absoluto silencio.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris examina una puerta rúnica buscando el mecanismo exacto para abrirla sin activar trampas...", p2: "🛡️ ...Iron pierde la paciencia a los dos segundos y derriba la puerta junto con medio muro de un hombrazo.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron tropieza con su propia hacha y cae rodando por las escaleras de [{phase}]...", p2: "⚔️ ...Igris ni siquiera se inmuta; espera a que Iron termine de rodar y usa el ruido como distracción para atacar.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris limpia meticulosamente el filo de su mandoble azul tras la escaramuza...", p2: "🛡️ ...Iron limpia su maza frotándola contra el suelo y levanta una nube de polvo que hace toser a todo el escuadrón.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron te señala a un monstruo pequeño que derrotó él solo como si hubiera vencido a un dragón...", p2: "⚔️ ...Igris apunta detrás de sí mismo hacia una montaña de veinte monstruos de élite que él abatió sin presumir.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris se coloca a tu derecha y le indica con una seña militar a Iron que cubra tu izquierda...", p2: "🛡️ ...Iron no distingue bien su izquierda de su derecha, se choca contra Igris y recibe un pisotón correctivo.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron recoge [{trophy}] y trata de usarlo como sombrero encima de los cuernos de su casco...", p2: "⚔️ ...Igris se lo vuela de la cabeza con la corriente de aire de un tajo sin siquiera tocarle el yelmo.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Un francotirador enemigo apunta desde las alturas de [{dungeon}]; Igris lanza su espada para derribarlo...", p2: "🛡️ ...Y Iron atrapa al enemigo antes de que caiga al suelo para rematarlo contra su rodilla.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron se golpea el pecho con el puño metálico haciendo un ruido ensordecedor en el túnel...", p2: "⚔️ ...Igris le pone el plano frío de su mandoble frente al visor para recordarle que mantenga la disciplina.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris corta los tendones de un coloso enemigo haciéndolo perder el equilibrio...", p2: "🛡️ ...Iron carga con el escudo por delante y termina de derribar al gigante contra las baldosas. +3 G.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron ve que felicitas a Igris por un corte limpio y se pone celoso haciendo pucheros tras su casco...", p2: "⚔️ ...Igris le da una palmada sorprendentemente amistosa en el hombro para que no se desanime.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris detecta gases venenosos en [{phase}] y te indica avanzar por la cornisa superior...", p2: "🛡️ ...Iron camina por abajo aguantando la respiración con los cachetes inflados aunque las sombras ni siquiera respiran.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron arranca un portón de acero para ofrecértelo como abanico o escudo improvisado...", p2: "⚔️ ...Igris lo corta en cuatro partes iguales de un destello azul para que deje de bloquear el pasillo.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris mantiene una guardia impecable mientras evalúa la fuerza del jefe del sector...", p2: "🛡️ ...Iron le lanza [{trophy}] en la cara al jefe para empezar la pelea de la forma menos elegante posible.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron intenta hacer girar su hacha entre los dedos como ve que Igris gira su espada...", p2: "⚔️ ...El hacha sale volando hacia el techo y ambos se quedan mirando hacia arriba antes de esquivarla.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris ejecuta una serie de diez estocadas silenciosas que desintegran la barrera mágica...", p2: "🛡️ ...Iron entra rugiendo detrás del corte y despeja los escombros restantes a punta de escudazos.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron se distrae persiguiendo a un monstruo escurridizo por todo el salón de [{dungeon}]...", p2: "⚔️ ...Igris estira la pierna cuando el monstruo pasa cerca, lo hace tropezar y termina la persecución en un segundo.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris se arrodilla ante ti al finalizar el tramo presentando el botín recolectado...", p2: "🛡️ ...Iron se arrodilla tan fuerte para copiarlo que hunde las dos rodillas en la roca del piso. +2 G.", a1: "igris", a2: "iron" },
            { p1: "🛡️ Iron bloquea el mazo de un enemigo gigante sosteniéndolo con ambas manos...", p2: "⚔️ ...Igris corre por encima de los brazos de Iron y le corta la cabeza al gigante de un tajo certero.", a1: "iron", a2: "igris" },
            { p1: "⚔️ Igris observa con desaprobación cómo Iron dejó todo el corredor lleno de cráteres innecesarios...", p2: "🛡️ ...Iron esconde su maza detrás de la espalda fingiendo que el pasillo ya estaba así cuando llegaron.", a1: "igris", a2: "iron" },
            { p1: "🛡️ A pesar de ser polos opuestos, la muralla de Iron y la espada de Igris cubren el 100% de tus ángulos...", p2: "⚔️ ...Igris asiente levemente hacia Iron tras una combinación perfecta, haciendo que el gigante brille de orgullo.", a1: "iron", a2: "igris" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 3: BERU + IGRIS (38 BERU + 38 IGRIS = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        beru_igris: [
            { p1: "🐜 Beru e Igris cruzan miradas tensas y salen disparados como cometas para ver quién despeja [{phase}] más rápido...", p2: "⚔️ ...Ambos se arrodillan frente a ti al mismo milisegundo esperando en silencio saber quién es tu comandante favorito.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris da un paso al frente para batirse en duelo honorable contra el campeón del corredor...", p2: "🐜 ...Beru pasa volando a Mach 4, le arranca la cabeza al campeón y grita: «¡Mi Rey no tiene tiempo para duelos lentos!»", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru señala a Igris con una garra temblorosa: «¡Mi Rey, este caballero caminó medio centímetro más cerca de usted que yo!»...", p2: "⚔️ ...Igris ni siquiera se digna a responderle; simplemente ajusta su capa y sigue escoltándote con elegancia.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris corta a cuatro bestias por la mitad con un tajo horizontal impecable...", p2: "🐜 ...Beru corta a cinco bestias en el costado opuesto y te mira ansioso: «¡Cinco, mi Señor! ¡Anote cinco para su humilde siervo!»", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru recoge [{trophy}] y lo pule con su aura hasta dejarlo reluciente para ofrecértelo...", p2: "⚔️ ...Igris le entrega en cambio una bolsa de monedas reales que sí te sirven, dejando a Beru humillado. +3 G.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris bloquea un ataque sorpresa en [{dungeon}] sin retroceder un solo paso...", p2: "🐜 ...Beru se enfurece con el atacante: «¡Cómo osas ensuciar la espada del segundo comandante de mi Rey!» y lo pulveriza.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru empieza un discurso dramático de telenovela sobre la gloria eterna del Monarca de las Sombras...", p2: "⚔️ ...Igris le da un golpecito en el hombro con el pomo de la espada señalando que tú ya caminaste veinte metros adelante.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris lanza un tajo de relámpago azul que ilumina toda la bóveda de [{phase}]...", p2: "🐜 ...Beru usa ese mismo destello como distracción para aparecer tras las líneas enemigas y aniquilar a los arqueros.", a1: "igris", a2: "beru" },
            { p1: "🐜 «¡Caballero Rojo, hoy demostraremos ante los ojos del Soberano quién merece liderar su guardia personal!»...", p2: "⚔️ ...Igris desenvaina su mandoble media pulgada aceptando el reto silencioso, y la presión de maná sacude el piso.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris aparta una roca del camino con telequinesis para que pases cómodamente...", p2: "🐜 ...Beru pulveriza toda la montaña de rocas de al lado a puñetazos gritando: «¡Yo despejo mejor el camino de mi Rey!»", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru te cura una leve fatiga con su magia verde (+5 HP) y mira de reojo a Igris con aire triunfal...", p2: "⚔️ ...porque sabe que Igris no tiene habilidades de curación y esa es su ventaja secreta.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris recuerda cuando fue tu primera sombra leal mucho antes de la Isla de Jeju y se mantiene sereno...", p2: "🐜 ...Beru siente esa confianza de veterano en Igris y chilla frustrado duplicando su velocidad de patrullaje.", a1: "igris", a2: "beru" },
            { p1: "🐜 Un monstruo escupe veneno; Beru se traga el veneno en el aire diciendo: «¡Un aperitivo mediocre!»...", p2: "⚔️ ...mientras Igris decapita al monstruo con un corte limpio para terminar el espectáculo.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris y Beru cruzan sus trayectorias en el aire formando una 'X' de luz azul y púrpura...", p2: "🐜 ...Toda la escuadra de élite de [{phase}] cae desintegrada al instante ante las dos alas del Monarca.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru intenta imitar la postura silenciosa y estoica de Igris durante diez segundos...", p2: "⚔️ ...pero no aguanta las ganas de hablar y vuelve a gritar «¡Mi Rey!» haciendo que Igris niegue con el yelmo.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris encuentra [{trophy}] oculto tras un muro falso y lo asegura tácticamente...", p2: "🐜 ...Beru se ofrece a cargarlo con ambas manos para que ni tú ni Igris tengan que tocar objetos mundanos.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru lanza a tres enemigos hacia arriba con una ráfaga de garras...", p2: "⚔️ ...e Igris salta ejecutando un tajo circular en el aire que los convierte en polvo y monedas. +3 G.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris detiene a Beru con el brazo extendido al detectar una trampa explosiva en el suelo de [{dungeon}]...", p2: "🐜 ...Beru asiente reconociendo la experiencia táctica del caballero y desactiva el mecanismo desde el techo.", a1: "igris", a2: "beru" },
            { p1: "🐜 «¡Kiiiek! ¡Tus cortes de espada son aceptables para no ser una hormiga real, caballero!»...", p2: "⚔️ ...Igris parte en dos una columna de granito macizo a un milímetro de las antenas de Beru como única respuesta.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris cubre tu flanco derecho con su mandoble azul encendido...", p2: "🐜 ...y Beru cubre tu flanco izquierdo con sus alas desplegadas; literalmente nada en [{phase}] puede tocarte.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru nota que el penacho rojo de Igris se manchó de polvo y se lo sacude rápidamente de un aleteo...", p2: "⚔️ ...«¡Ningún comandante de mi Rey debe lucir desaliñado!», dice Beru, e Igris le agradece con una leve inclinación.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris enfrenta a un espadachín enemigo y destruye su técnica en tres movimientos...", p2: "🐜 ...Beru aplaude dramáticamente: «¡Sublime! ¡Casi tan letal como las mandíbulas de este humilde servidor!»", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru detecta veinte enemigos en la sala contigua de [{dungeon}] con sus antenas...", p2: "⚔️ ...Antes de que Beru termine de pedirte permiso, Igris ya abrió la puerta y empezó a cortarlos.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris y Beru compiten hasta para recoger el oro del suelo tras cada combate...", p2: "🐜 ...Terminan entregándote el doble de rápido cada moneda que cae en el sector. +3 G.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru mira [{trophy}] y sugiere construir un monumento en tu honor sobre las ruinas del calabozo...", p2: "⚔️ ...Igris patea [{trophy}] a un lado y señala el reloj de la fase recordándole que la misión es avanzar.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Un enemigo intenta huir de la furia de Beru corriendo hacia el lado de Igris...", p2: "🐜 ...Solo para descubrir que el silencio del Caballero Rojo es igual de letal que los gritos del Rey Hormiga.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru vuela al ras del suelo levantando a los monstruos con su onda de choque...", p2: "⚔️ ...e Igris los remata en línea recta con la precisión de un rayo láser azul.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris clava su espada en el piso creando un escudo de telequinesis frente a un derrumbe...", p2: "🐜 ...mientras Beru pulveriza las rocas más grandes en el aire con una lluvia de puñetazos supersónicos.", a1: "igris", a2: "beru" },
            { p1: "🐜 «¡Mi Rey, permítame cargar a este caballero si sus piernas de metal se cansan!»...", p2: "⚔️ ...Igris desaparece en un paso relámpago y reaparece diez metros delante de Beru demostrándole su velocidad.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris le cede el paso a Beru frente a un monstruo tipo insecto en [{phase}]...", p2: "🐜 ...Beru lo toma como una cuestión de honor personal y lo devora de un solo bocado (+5 HP).", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru se arrodilla tan rápido cuando volteas a verlos que rompe las baldosas con la frente...", p2: "⚔️ ...Igris se arrodilla con calma y perfección militar un segundo después, haciéndolo ver diez veces más elegante.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris usa su capa para ocultar el movimiento inicial de Beru...", p2: "🐜 ...permitiendo que el Rey Hormiga salga disparado desde su sombra como una bala invisible contra el líder enemigo.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru interroga el cerebro de un monstruo caído y le pasa las coordenadas tácticas a Igris...", p2: "⚔️ ...Igris traza la ruta más corta en el suelo con la punta de su espada sin desperdiciar un segundo.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Ambos comandantes sincronizan su presión de maná al entrar al tramo final de [{phase}]...", p2: "🐜 ...Los monstruos menores colapsan de rodillas incapaces de respirar ante la presencia combinada de ambos.", a1: "igris", a2: "beru" },
            { p1: "🐜 Beru encuentra [{trophy}] y te pregunta si deseas que lo envuelva para regalo...", p2: "⚔️ ...Igris ya está abriendo la siguiente compuerta de [{dungeon}] ignorando las excentricidades de la hormiga.", a1: "beru", a2: "igris" },
            { p1: "⚔️ Igris desvía el arma de un jefe menor dejándole el pecho totalmente descubierto...", p2: "🐜 ...y Beru atraviesa esa abertura con sus garras envueltas en maná negro extrayendo su núcleo. +2 G.", a1: "igris", a2: "beru" },
            { p1: "🐜 Aunque compiten en cada pasillo, Beru respeta profundamente la lealtad inquebrantable de Igris...", p2: "⚔️ ...e Igris reconoce en silencio el poder abrumador del comandante nacido en Jeju.", a1: "beru", a2: "igris" },
            { p1: "⚔️ El destello azul del mandoble de Igris y el rastro púrpura de las garras de Beru iluminan [{dungeon}]...", p2: "🐜 ...convirtiendo el calabozo entero en un paseo imperial para su Monarca.", a1: "igris", a2: "beru" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 4: IGRIS + TANK (38 IGRIS + 38 TANK = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        igris_tank: [
            { p1: "⚔️ Igris salta con elegancia sobre el enorme lomo acorazado de Tank...", p2: "🐻‍❄️ ...y Tank arranca a toda velocidad por [{phase}] formando una carga de caballería pesada que arrasa con toda la horda.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank se sacude la nieve y la escarcha del pelaje sin fijarse quién está al lado...", p2: "⚔️ ...dejando a Igris cubierto de nieve blanca como un muñeco de invierno; el caballero suspira y se sacude la capa.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris intenta mantener el sigilo en el corredor oscuro de [{dungeon}]...", p2: "🐻‍❄️ ...pero Tank suelta un estornudo glaciar que congela a tres guardias enemigos y alerta a toda la sala.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank ve [{trophy}] en el suelo y se pone a darle zarpazos jugando con él por todo el pasillo...", p2: "⚔️ ...Igris detiene el objeto pisándolo con su bota metálica y le señala el frente a Tank como un general estricto.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris combate con esgrima refinada contra dos guerreros de élite...", p2: "🐻‍❄️ ...mientras Tank simplemente se sienta encima de otros cuatro enemigos aplastándolos sin ningún estilo pero con total eficacia.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank congela el suelo bajo los pies de la patrulla enemiga haciéndolos resbalar...", p2: "⚔️ ...e Igris se desliza sobre el hielo como un patinador letal decapitándolos a todos en una sola línea.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris baja de su montura tras cruzar el puente de [{phase}] y le da dos palmadas en el cuello a Tank...", p2: "🐻‍❄️ ...Tank suelta un gruñido contento cerrando los ojos como un oso gigante satisfecho.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank abre sus enormes fauces para morder a un monstruo venenoso...", p2: "⚔️ ...Igris corta al monstruo antes de que Tank lo muerda para evitar que el oso trague ácido innecesariamente.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris usa la espalda de Tank como plataforma de impulso para alcanzar a los enemigos voladores del techo...", p2: "🐻‍❄️ ...y Tank atrapa a los que caen al suelo rematándolos de un zarpazo. +3 G.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank se recuesta contra una pared de [{dungeon}] para rascarse el lomo y provoca un derrumbe...", p2: "⚔️ ...Igris parte en pedazos las rocas que caían hacia ti en menos de un segundo sin perder la compostura.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris te abre paso con el mandoble en alto mientras Tank cubre toda tu espalda con su mole de hielo...", p2: "🐻‍❄️ ...Ninguna emboscada trasera puede atravesar el muro viviente del oso alfa.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank olfatea un rastro de oro oculto tras unos barriles de [{phase}] y los destroza de un manotazo...", p2: "⚔️ ...Igris recoge la bolsa de monedas intacta de entre las astillas y te la entrega. +2 G.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris señala con la punta de su espada hacia el flanco izquierdo de la formación enemiga...", p2: "🐻‍❄️ ...Tank entiende la orden al instante y embiste como una locomotora ártica rompiendo sus escudos.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank bosteza y apoya su pesada cabeza sobre el hombro metálico de Igris mientras esperan tu orden...", p2: "⚔️ ...Igris soporta el peso en silencio sin moverse un milímetro para no romper la formación.", a1: "tank", a2: "igris" },
            { p1: "⚔️ El contraste entre la esgrima veloz de Igris y la fuerza aplastante de Tank descontrola a los monstruos...", p2: "🐻‍❄️ ...Si esquivan el mandoble azul, terminan estrellados contra las garras heladas del oso.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank levanta una pared de hielo sólido para encerrar a un grupo de bestias en un callejón de [{phase}]...", p2: "⚔️ ...e Igris entra solo al callejón saliendo tres segundos después mientras las bestias se evaporan.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris inspecciona [{trophy}] con seriedad táctica...", p2: "🐻‍❄️ ...pero Tank llega por detrás, lo huele, estornuda encima del objeto y lo congela en un cubo de hielo.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank recibe de pecho el impacto de una roca gigante lanzada por una catapulta enemiga...", p2: "⚔️ ...e Igris corta la catapulta en cuatro pedazos un instante después con un tajo a distancia.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Cuando el terreno de [{dungeon}] se vuelve escarpado, Igris vuelve a montar sobre el lomo de Tank...", p2: "🐻‍❄️ ...Las garras de hielo del oso trepan por las rocas verticales sin resbalar jamás.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank ruge haciendo vibrar el aire frío del pasillo y atrayendo todas las miradas...", p2: "⚔️ ...Igris aprovecha la distracción para eliminar al líder enemigo de una sola estocada limpia al corazón.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris nota que Tank tiene una flecha rota enganchada en el pelaje del hombro y se la retira con cuidado...", p2: "🐻‍❄️ ...Tank le lame el guantelete en agradecimiento dejándolo escarchado.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank barre con el brazo a cinco enemigos lanzándolos directamente hacia la posición de Igris...", p2: "⚔️ ...Igris ni siquiera da un paso: gira su mandoble como un molino azul y los corta a todos en el aire.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris mantiene el ritmo de marcha constante para que cumplas tu tiempo de enfoque...", p2: "🐻‍❄️ ...mientras Tank trota feliz a su lado haciendo temblar el piso a cada paso.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank aplasta [{trophy}] bajo su pata trasera sin darse cuenta mientras miraba el techo...", p2: "⚔️ ...Igris mira los pedazos rotos, mira al oso y decide que no vale la pena regañarlo.", a1: "tank", a2: "igris" },
            { p1: "⚔️ En un pasillo ardiente o tóxico, Igris se mantiene cerca del aura fría de Tank...", p2: "🐻‍❄️ ...El aliento glacial del oso neutraliza el calor y despeja el aire para todo el escuadrón.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank derriba una fila de pilares de [{phase}] creando un efecto dominó sobre los monstruos...", p2: "⚔️ ...e Igris recolecta las monedas que quedaron al descubierto entre las ruinas. +3 G.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris bloquea las espadas de dos guardias de élite cruzando su mandoble...", p2: "🐻‍❄️ ...y Tank llega por arriba aplastando a ambos guardias con sus dos patas delanteras.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank intenta imitar la reverencia caballeresca de Igris bajando la cabeza y levantando la cadera...", p2: "⚔️ ...pareciendo más un oso estirándose después de dormir que un caballero real.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris corta las cadenas de un puente levadizo en [{dungeon}] de un tajo certero...", p2: "🐻‍❄️ ...y Tank amortigua la caída del puente con el lomo para que no haga tanto estruendo.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank lanza un bloque de hielo al aire frente al escuadrón...", p2: "⚔️ ...Igris lo parte en cien agujas afiladas que se clavan en toda la vanguardia enemiga.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris vigila las alturas del salón mientras Tank olfatea las grietas del suelo...", p2: "🐻‍❄️ ...Entre la vista del caballero y el olfato de la bestia, ninguna criatura en [{phase}] logra esconderse.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank empuja a un monstruo gigante hasta acorralarlo contra el muro...", p2: "⚔️ ...e Igris aparece sobre la cabeza de Tank para clavar su espada azul en la frente del gigante.", a1: "tank", a2: "igris" },
            { p1: "⚔️ El penacho rojo de Igris y las runas cian de Tank brillan al unísono en la oscuridad de [{dungeon}]...", p2: "🐻‍❄️ ...recreando la imagen legendaria del ejército sombrío que conquistó el Portal Rojo.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank desentierra [{trophy}] y un puñado de monedas antiguas con sus garras...", p2: "⚔️ ...Igris separa el oro limpio para tu inventario y descarta la chatarra. +2 G.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Un enemigo intenta atacar el costado de Tank pensando que es lento...", p2: "🐻‍❄️ ...Igris intercepta el golpe con su espada y Tank lo manda a volar de un revés.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank se detiene a morder un hueso gigante de monstruo en medio de [{phase}]...", p2: "⚔️ ...Igris le da dos toques en el lomo con la vaina de su espada para que no se atrase.", a1: "tank", a2: "igris" },
            { p1: "⚔️ Igris salta desde el lomo de Tank ejecutando un corte vertical que parte el escudo del líder enemigo...", p2: "🐻‍❄️ ...y Tank termina la carga pasando por encima de toda la formación restante.", a1: "igris", a2: "tank" },
            { p1: "🐻‍❄️ Tank se sienta obedientemente junto a Igris al terminar el sector...", p2: "⚔️ ...el caballero acaricia la cabeza del oso gigante reconociendo su fuerza en la batalla.", a1: "tank", a2: "igris" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 5: BERU + TANK (38 BERU + 38 TANK = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        beru_tank: [
            { p1: "🐻‍❄️ Tank suelta un enorme bostezo en medio de [{phase}] mientras tú caminas adelante...", p2: "🐜 ...Beru lo señala indignado: «¡Kiiiek! ¡Bestia insolente, cómo te atreves a tener sueño en presencia de nuestro Rey!»", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru intenta darle lecciones de etiqueta real a Tank sobre cómo hacer una reverencia de 90 grados...", p2: "🐻‍❄️ ...Tank no entiende nada, se tira de panza al suelo y aplasta a tres monstruos que salían de una grieta.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank ve a Beru volar de un lado a otro a velocidad supersónica y lo sigue con la cabeza mareado...", p2: "🐜 ...hasta que el oso se marea tanto que se cae sentado sobre un cofre enemigo rompiéndolo. +3 G.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru aterriza sobre la cabeza de Tank usándolo como mirador para escanear todo [{dungeon}]...", p2: "🐻‍❄️ ...Tank sacude las orejas molesto porque las patas de la hormiga le hacen cosquillas en la frente.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank congela a toda una patrulla enemiga dejándolos como estatuas de hielo en el pasillo...", p2: "🐜 ...Beru pasa como un rayo púrpura rompiendo todas las estatuas a la vez: «¡Buen trabajo preparando los blancos, oso!»", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru mira el pelaje de Tank y te dice: «¡Mi Rey, si siente frío puedo tejerle un abrigo con el pelo de este oso!»...", p2: "🐻‍❄️ ...Tank escucha eso, se cubre el pecho con las dos patas y retrocede tres pasos mirando feo a Beru.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank encuentra [{trophy}] y empieza a morderlo pensando que es un juguete...", p2: "🐜 ...Beru se lo arrebata a velocidad luz: «¡No babees los posibles tesoros de mi Soberano, criatura salvaje!»", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru devora a un monstruo para recuperar energía, pero Tank le roba el segundo monstruo de un zarpazo...", p2: "🐻‍❄️ ...Ambos depredadores se quedan gruñéndose frente a frente hasta que tú pasas en medio y se cuadran al instante.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank embiste por el centro del corredor de [{phase}] levantando a las bestias por los aires...", p2: "🐜 ...y Beru rebota por el techo rematando a cada enemigo antes de que vuelva a tocar el piso.", a1: "tank", a2: "beru" },
            { p1: "🐜 «¡Kiiiek! ¡Muévete más rápido, bola de pelos, o retrasarás el glorioso paso de nuestro Señor!»...", p2: "🐻‍❄️ ...Tank se pica en su orgullo, activa su Estampida Ártica y corre tan rápido que levanta una tormenta de nieve.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank se sacude el polvo del combate ensuciando el reluciente exoesqueleto negro de Beru...", p2: "🐜 ...Beru entra en pánico: «¡Maldito oso, ahora no puedo presentarme impecable ante mi Rey!»", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru canaliza magia de curación verde sobre Tank tras ver que el oso recibió un golpe pesado por ti...", p2: "🐻‍❄️ ...«¡Solo te curo porque eres el escudo de mi Señor!», dice Beru, y Tank le da un empujoncito amistoso con el hocico.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank levanta un muro de hielo gigante para tapar una trampa de fuego en [{dungeon}]...", p2: "🐜 ...y Beru congela aún más el muro batiendo sus alas a velocidad ultrasónica para enfriar el ambiente.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru suelta su grito ultrasónico de Rey Hormiga y Tank ruge con su voz de oso alfa al mismo tiempo...", p2: "🐻‍❄️ ...La onda expansiva combinada destroza los tímpanos y las armaduras de todos los monstruos del sector. +3 G.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank intenta atrapar una mosca de maná dando manotazos al aire en [{phase}]...", p2: "🐜 ...Beru se siente ofendido por ser un insecto y corta la mosca en dieciséis partes antes de que Tank la toque.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru levanta a Tank de la piel del cuello usando su fuerza descomunal de Rango S...", p2: "🐻‍❄️ ...y lanza al oso gigante como si fuera una bala de cañón viviente directo contra la barricada enemiga.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank aterriza sobre los escombros de la barricada, se sacude la cabeza y levanta una pata triunfal...", p2: "🐜 ...mientras Beru aterriza a tu lado diciendo: «¡La artillería pesada ha cumplido su función, mi Rey!»", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru inspecciona [{trophy}] y declara que es una reliquia digna del museo del Monarca...", p2: "🐻‍❄️ ...Tank pasa caminando por encima y la deja plana de un pisotón sin siquiera mirar hacia abajo.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank huele un nido de monstruos ocultos bajo el suelo de [{phase}] y empieza a cavar con sus garras...", p2: "🐜 ...Beru le dice «¡Apártate, novato, yo soy una hormiga!» y excava un túnel perfecto en medio segundo.", a1: "tank", a2: "beru" },
            { p1: "🐜 Del túnel excavado por Beru salen volando los monstruos ocultos y un puñado de monedas antiguas...", p2: "🐻‍❄️ ...Tank los batea a todos de un zarpazo y tú recoges el oro limpio. +2 G.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank se recuesta a tus pies cuando haces una pausa breve, cubriéndote con su calor y escarcha...", p2: "🐜 ...Beru se pone celoso y se arrodilla al otro lado abanicándote con sus alas como un ventilador real.", a1: "tank", a2: "beru" },
            { p1: "🐜 Un monstruo gigante intenta aplastar a Tank con un garrote de piedra...", p2: "🐻‍❄️ ...Beru detiene el garrote con dos dedos y Tank le muerde la rodilla al gigante derribándolo.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank exhala una neblina helada que reduce la visibilidad de los arqueros de [{dungeon}]...", p2: "🐜 ...y dentro de la niebla solo se ven los destellos violetas de Beru aniquilándolos uno por uno.", a1: "tank", a2: "beru" },
            { p1: "🐜 «¡Oh, mi Rey, permítame entrenar a este oso para que aprenda a hablar y alabe su grandeza!»...", p2: "🐻‍❄️ ...Tank le suelta un bufido lleno de nieve en la cara a Beru dejando claro que no piensa hablar.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank agarra a dos bestias con los brazos en un abrazo de oso triturador...", p2: "🐜 ...y Beru les extrae los núcleos mágicos de un zarpazo limpio para canalizar +5 HP hacia ti.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru vuela alrededor de Tank creando un tornado oscuro impulsado por su velocidad...", p2: "🐻‍❄️ ...Tank lanza fragmentos de hielo al tornado convirtiéndolo en una licuadora ártica que limpia [{phase}].", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank encuentra un hueso gigante en [{dungeon}] y lo lleva en el hocico durante todo el tramo...", p2: "🐜 ...Beru lo regaña en voz baja diciendo que parece un perro callejero en lugar de un corcel del Monarca.", a1: "tank", a2: "beru" },
            { p1: "🐜 Cuando Tank suelta el hueso para rugirle a un enemigo, el hueso golpea por accidente a otro monstruo...", p2: "🐻‍❄️ ...dejando caer monedas que Beru recoge al instante para entregártelas. +3 G.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank bloquea un pasillo estrecho con su enorme cuerpo impidiendo que pasen veinte enemigos...", p2: "🐜 ...mientras Beru salta por encima de Tank una y otra vez acribillando a la fila bloqueada.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru limpia las garras de Tank después del combate porque tenían lodo del calabozo...", p2: "🐻‍❄️ ...«¡No manches la alfombra de sombras de mi Rey cuando regreses al núcleo!», le advierte la hormiga.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank le da un lengüetazo gigante a Beru en agradecimiento dejándole las antenas peinadas hacia atrás...", p2: "🐜 ...Beru se queda tieso temblando de indignación mientras tú continúas avanzando.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru detecta que el piso de [{phase}] está por colapsar bajo el peso de Tank...", p2: "🐻‍❄️ ...y sujeta al oso gigante de la nuca volando un segundo para cruzar el tramo frágil sin caer.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank derriba la puerta del sector de un cabezazo brutal haciendo volar los cerrojos...", p2: "🐜 ...Beru entra primero gritando: «¡Abran paso al Soberano!» y limpia la recepción en dos segundos.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru usa [{trophy}] como proyectil lanzándolo a velocidad supersónica...", p2: "🐻‍❄️ ...y Tank corre detrás pensando que están jugando a buscar la presa.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank acorrala al último sobreviviente del corredor con sus fauces heladas...", p2: "🐜 ...mientras Beru lo interroga absorbiendo su mente para verificar si hay trampas más adelante.", a1: "tank", a2: "beru" },
            { p1: "🐜 «¡Debo admitir que tu resistencia es útil para servir de escudo a nuestro Rey, bestia del norte!»...", p2: "🐻‍❄️ ...Tank golpea el pecho con su zarpa orgulloso aceptando el cumplido del Rey Hormiga.", a1: "beru", a2: "tank" },
            { p1: "🐻‍❄️ Tank y Beru desatan sus instintos salvajes de bestias mágicas al unísono...", p2: "🐜 ...haciendo que los monstruos de [{dungeon}] huyan despavoridos al sentir a dos depredadores supremos.", a1: "tank", a2: "beru" },
            { p1: "🐜 Beru aterriza suavemente en el hombro de Tank mientras avanzan hacia el fondo de [{phase}]...", p2: "🐻‍❄️ ...formando la dupla más intimidante de velocidad e impacto bruto de tu legión.", a1: "beru", a2: "tank" }
        ]
        ,
        /* ------------------------------------------------------------------
           PAREJA 6: IGRIS + TUSK (38 IGRIS + 38 TUSK = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        igris_tusk: [
            { p1: "🔥 Tusk empieza a hacer poses dramáticas con su túnica y a recitar un cántico larguísimo en [{phase}] para impresionarte...", p2: "⚔️ ...Igris pasa caminando a su lado y decapita a todos los monstruos del pasillo antes de que Tusk termine la primera sílaba.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris avanza de frente contra una patrulla blindada blandiendo su mandoble azul...", p2: "🔥 ...y Tusk aumenta la gravedad por diez sobre los enemigos dejándolos de rodillas para que el corte de Igris sea limpio.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk levanta [{trophy}] con telequinesis y trata de explicarle a Igris con señas su compleja estructura mágica...", p2: "⚔️ ...Igris parte [{trophy}] por la mitad de un tajo rápido al detectar que tenía una maldición oculta y sigue avanzando.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris salta hacia el techo de [{dungeon}] buscando ángulo contra una bestia voladora...", p2: "🔥 ...Tusk crea tres plataformas de gravedad sólida en el aire para que Igris corra por el cielo y la parta en dos.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk lanza una bola de fuego descomunal que llena todo el corredor de humo negro...", p2: "⚔️ ...Igris sale caminando de entre las llamas sin un rasguño, pero sacudiéndose la ceniza de la capa con fastidio.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris mantiene una postura de guardia real impecable a tu derecha...", p2: "🔥 ...Tusk intenta imitar su porte elegante cruzando los brazos, pero sus collares de cráneos suenan como maracas.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk entona el Himno de Frenesí envolviendo el mandoble de Igris en un aura carmesí ardiente...", p2: "⚔️ ...Igris lanza una estocada que combina su relámpago azul con el fuego de Tusk, vaporizando la barricada enemiga.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Un asesino enemigo intenta atacar a Tusk por la espalda mientras el chamán canaliza un hechizo...", p2: "🔥 ...Igris aparece en medio bloqueando la daga con su acero, y Tusk incinera al asesino a quemarropa.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk usa su magia gravitatoria para arrancar las monedas de los escombros de [{phase}]...", p2: "⚔️ ...e Igris corta la bolsa en el aire para que el oro caiga directamente en tus manos libre de polvo. +3 G.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris señala en silencio a un grupo de magos enemigos apostados al fondo del salón...", p2: "🔥 ...Tusk se ofende al ver magos tan mediocres, alza el Orbe de Avaricia y les enseña lo que es verdadera magia destructiva.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk ilumina el corredor oscuro de [{dungeon}] con cinco esferas de fuego flotante...", p2: "⚔️ ...La luz hace brillar las placas azules del pecho de Igris mientras ejecuta a los centinelas sin hacer ruido.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris corta los tendones de un coloso haciéndolo caer de espaldas...", p2: "🔥 ...y Tusk cierra el puño aplastando al gigante contra el suelo con una onda de gravedad concentrada.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk se distrae admirando las runas antiguas grabadas en un muro de [{phase}]...", p2: "⚔️ ...Igris le da un toque seco en el hombro con el pomo de su espada para que no pierda el paso del Monarca.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris lanza su espada girando como un búmeran azul a través de una fila de bestias...", p2: "🔥 ...Tusk redirige la espada en el aire con telequinesis para que curve, corte a otras tres bestias y regrese a la mano de Igris.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk aplica una barrera de viento alrededor de Igris antes de que el caballero entre a una nube de ácido...", p2: "⚔️ ...Igris atraviesa la nube intacto y decapita al monstruo venenoso de un solo movimiento.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris observa cómo Tusk gasta el triple de maná necesario solo para que sus llamas se vean más espectaculares...", p2: "🔥 ...Tusk nota la mirada crítica del caballero, carraspea nervioso y reduce el tamaño de sus bolas de fuego.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk levanta una pared de roca desde el suelo para cubrir tu flanco izquierdo...", p2: "⚔️ ...e Igris usa esa misma pared para impulsarse en diagonal y partir al líder de la patrulla. +2 G.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Ambos comandantes —el maestro de la espada y el maestro de la magia— caminan flanqueándote en [{dungeon}]...", p2: "🔥 ...La presión combinada de acero y fuego hace que los monstruos menores se rindan antes de pelear.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk lanza el Himno del Sueño sobre toda una sala llena de guardias...", p2: "⚔️ ...Igris camina tranquilamente entre los enemigos dormidos eliminándolos con precisión quirúrgica.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris encuentra [{trophy}] bloqueando un mecanismo de la puerta...", p2: "🔥 ...Tusk lo desintegra con un rayo láser concentrado desde su dedo índice para destrabar el engrane.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Una chispa del hechizo de Tusk salta por accidente y quema la punta del penacho rojo de Igris...", p2: "⚔️ ...Igris gira el yelmo lentamente con un aura asesina helada, y Tusk apaga la chispa con magia temblando de miedo.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris bloquea el garrote de un ogro del calabozo con una sola mano...", p2: "🔥 ...mientras Tusk hace explotar el suelo bajo los pies del ogro lanzándolo contra las vigas del techo.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk canaliza un cántico de regeneración menor para restaurar tu vigor (+5 HP)...", p2: "⚔️ ...mientras Igris monta guardia frente a él con el mandoble cruzado para que nadie interrumpa el conjuro.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris traza una cruz de luz azul en el aire que congela el avance de la horda en [{phase}]...", p2: "🔥 ...y Tusk remata la cruz con una implosión gravitatoria que deja caer monedas limpias. +3 G.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk hace levitar los escombros de [{dungeon}] formando un puente flotante sobre un abismo...", p2: "⚔️ ...Igris cruza primero para probar que el puente soporte el peso antes de invitarte a pasar.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Un enemigo blindado resiste el primer corte superficial de Igris...", p2: "🔥 ...Tusk aplica el Himno de Fragilidad oxidando la armadura enemiga al instante para que el segundo tajo de Igris la atraviese.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk abre los brazos invocando la cabeza de un dragón de fuego en el pasillo...", p2: "⚔️ ...Igris corre al lado del dragón de llamas cortando a todo enemigo que intenta saltar hacia las orillas.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris envaina su espada al ver que no queda ni un alma viva en trescientos metros...", p2: "🔥 ...Tusk hace una reverencia teatral con su túnica esperando que el Monarca alabe su sincronización.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk detecta maná oculto dentro de [{trophy}] y lo abre con presión telequinética...", p2: "⚔️ ...Igris atrapa en el aire las monedas que había dentro antes de que toquen el suelo. +2 G.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris avanza cortando proyectiles físicos mientras Tusk disipa las maldiciones mágicas del ambiente...", p2: "🔥 ...Entre la defensa física de Igris y el escudo arcano de Tusk, avanzas por [{phase}] como un emperador.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk reduce a cero la gravedad sobre Igris por un segundo...", p2: "⚔️ ...permitiendo que el caballero rojo vuele treinta metros en línea recta atravesando a toda la columna enemiga.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris aterriza al fondo del corredor y sacude su mandoble...", p2: "🔥 ...justo cuando Tusk devuelve la gravedad a la normalidad haciendo que los restos caigan al unísono.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk murmura un hechizo de amplificación acústica para intimidar a las bestias de [{dungeon}]...", p2: "⚔️ ...pero a Igris no le gusta el ruido y le indica con un gesto cortante que mantenga el silencio táctico.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris acorrala a tres guardias contra una esquina...", p2: "🔥 ...y Tusk los encierra en una jaula de fuego carmesí que los consume en dos segundos.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk usa su telequinesis para limpiar el polvo de las hombreras de Igris tras un derrumbe...", p2: "⚔️ ...Igris asiente agradecido hacia el gran chamán manteniendo la cortesía entre comandantes.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ Igris señala una grieta inestable en el techo de [{phase}]...", p2: "🔥 ...Tusk dispara una lanza de fuego que hace colapsar el techo exactamente encima del nido de monstruos.", a1: "igris", a2: "tusk" },
            { p1: "🔥 Tusk examina [{trophy}], niega con la cabeza y lo convierte en una esfera de grava compacta...", p2: "⚔️ ...que Igris batea con el plano de su mandoble directo contra la frente de un explorador enemigo.", a1: "tusk", a2: "igris" },
            { p1: "⚔️ El resplandor cian de Igris y el aura carmesí del Orbe de Avaricia de Tusk se entrelazan en [{dungeon}]...", p2: "🔥 ...demostrando por qué son el filo y el cerebro mágico del Monarca de las Sombras.", a1: "igris", a2: "tusk" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 7: IRON + TUSK (38 IRON + 38 TUSK = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        iron_tusk: [
            { p1: "🛡️ Iron toma prestado sin permiso el bastón ceremonial de Tusk y lo usa como palo de golf contra una roca...", p2: "🔥 ...Tusk recupera su bastón con telequinesis y aumenta la gravedad sobre Iron dejándolo aplastado contra el piso por insolente.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk lanza el Himno de Gigantificación y Frenesí sobre Iron para potenciar su fuerza bruta...", p2: "🛡️ ...Iron se emociona tanto al verse brillar en rojo que corre atravesando tres muros seguidos de [{phase}] sin frenar.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron ve el Orbe de Avaricia brillando en la mano de Tusk y estira el dedo para tocarlo como si fuera un juguete...", p2: "🔥 ...El orbe le suelta un chispazo mágico que deja a Iron con el casco humeando y los cuernos chamuscados.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk reduce la gravedad de Iron a cero convirtiendo al gigante acorazado en un globo flotante...", p2: "🛡️ ...y lo lanza con telequinesis a toda velocidad como una bola de demolición contra la patrulla de [{dungeon}].", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron aterriza sobre los monstruos haciendo una pose de superhéroe y mira a Tusk pidiendo que lo vuelva a lanzar...", p2: "🔥 ...Tusk suspira frotándose la frente bajo la capucha, pero recoge el oro que soltaron las bestias. +3 G.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk prepara un hechizo de fuego complejo dibujando runas en el aire con suma delicadeza...", p2: "🛡️ ...Iron pasa corriendo a su lado y borra las runas con el viento de su escudo, haciendo que Tusk le gruña en idioma orco.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron encuentra [{trophy}] y se lo pone a Tusk encima de la capucha pensando que se le ve genial...", p2: "🔥 ...Tusk se queda inmóvil con [{trophy}] en la cabeza mirándote a ti para ver si tiene tu permiso de incinerar a Iron.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk encierra a cinco monstruos en una esfera de gravedad flotante a media altura...", p2: "🛡️ ...Iron salta con su maza a dos manos y batea la esfera entera estrellándola contra el fondo del corredor.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron intenta imitar los cánticos mágicos de Tusk moviendo las manos y haciendo ruidos raros...", p2: "🔥 ...Como obviamente no sale magia, Iron se aburre y simplemente le lanza una piedra en la cara al enemigo.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Un grupo de arqueros apunta hacia Tusk aprovechando que su túnica no tiene armadura pesada...", p2: "🛡️ ...Iron salta frente al chamán plantando su escudo torre y rebota todas las flechas protegiendo a su compañero.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron le da dos palmadas fuertísimas en la espalda a Tusk diciéndole con señas que hacen buen equipo...", p2: "🔥 ...El golpe casi le saca el aire a Tusk, quien tiene que usar levitación para no irse de bruces al suelo.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk envuelve el escudo gigante de Iron en llamas blancas y carmesí...", p2: "🛡️ ...Iron ejecuta una embestida ígnea por [{phase}] dejando un rastro de fuego y monstruos calcinados a su paso.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron se quema los dedos intentando recoger monedas que quedaron calientes por el fuego de Tusk...", p2: "🔥 ...Tusk las enfría con un soplo de viento mágico y las hace flotar hacia tu bolsa. +2 G.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk detecta una trampa de piso en [{dungeon}] y te advierte levantando una mano...", p2: "🛡️ ...Iron entiende todo al revés, salta con ambos pies sobre la trampa y la rompe por pura fuerza bruta.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron usa su Grito de Provocación para reunir a todos los monstruos del sector en un solo punto...", p2: "🔥 ...y Tusk deja caer un meteorito de fuego exactamente en ese punto limpiando la sala de un solo golpe.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk mira con desdén intelectual cómo Iron pelea dando cabezazos con el casco...", p2: "🛡️ ...pero admite en silencio que ningún monstruo logra pasar más allá del muro de acero.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron recoge [{trophy}] y le pide a Tusk con señas que le ponga brillitos mágicos para regalártelo...", p2: "🔥 ...Tusk le pone una runa luminosa barata encima solo para que Iron deje de molestarlo y siga caminando.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk abre un pozo de gravedad pesada que hunde a las bestias de [{phase}] hasta la cintura...", p2: "🛡️ ...Iron pasa corriendo con su hacha como si estuviera cortando el césped y recolecta el botín. +3 G.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron se tropieza en un borde del abismo de [{dungeon}] y está a punto de caerse al vacío...", p2: "🔥 ...Tusk lo sujeta del cuello de la armadura con telequinesis y lo regresa al pasillo como si fuera un muñeco.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk invoca una cortina de humo oscuro para cegar a un jefe menor...", p2: "🛡️ ...Iron se mete al humo sin ver nada tampoco y empieza a repartir escudazos a ciegas hasta que le atina al jefe.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron sale del humo tosiendo hollín negro pero con el núcleo del enemigo en la mano...", p2: "🔥 ...Tusk disipa el humo con un ademán elegante y canaliza la energía para curarte +5 HP.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk intenta leer una inscripción antigua en la puerta de [{phase}] para traducírtela...", p2: "🛡️ ...Iron cree que la puerta está trabada y la vuela en mil pedazos antes de que Tusk termine de leer el primer renglón.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron ve las esferas de fuego flotantes de Tusk y se pone a hacer malabares con ellas...", p2: "🔥 ...Una esfera le explota en la cara dejándole el visor tiznado de negro mientras Tusk niega con la cabeza.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk aumenta el peso del hacha de Iron diez veces justo en el momento en que el guerrero la baja...", p2: "🛡️ ...El impacto multiplicado parte el suelo de [{dungeon}] en dos y aniquila a toda la escuadra frontal.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron queda tan encantado con ese golpe que le pide a Tusk que le haga pesada también la cabeza...", p2: "🔥 ...Tusk lo ignora por completo por el bien de la salud mental del escuadrón.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk hace levitar [{trophy}] para analizar si contiene maná...", p2: "🛡️ ...Iron salta pensando que es un pase aéreo y lo clava contra el suelo como si fuera basquetbol.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron levanta su escudo torre hacia el techo para cubrir a Tusk de una lluvia de estalactitas...", p2: "🔥 ...mientras Tusk calcina a las criaturas del techo con un pilar de llamas ascendente.", a1: "iron", a2: "tusk" },
            { p1: "🔥 El cántico de Tusk resuena con voz grave y mística por las bóvedas de [{phase}]...", p2: "🛡️ ...e Iron le lleva el ritmo golpeando su maza contra el escudo como si fuera el baterista de una banda.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron encuentra un cofre cerrado y se lo lleva cargando a Tusk para que lo abra con magia...", p2: "🔥 ...Tusk derrite el candado con un toque de fuego y te entrega las monedas intactas. +2 G.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk lanza una maldición de confusión haciendo que los monstruos se peleen entre ellos...", p2: "🛡️ ...Iron se mete en medio de la pelea porque no soporta quedarse mirando sin repartir golpes.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron se enreda con los bordes largos de la túnica de Tusk al girar en una esquina estrecha...", p2: "🔥 ...Tusk lo empuja con un pulso de gravedad suave para recuperar su espacio personal.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk crea una rampa de roca fundida solidificada para subir al nivel superior de [{dungeon}]...", p2: "🛡️ ...Iron sube corriendo primero con el escudo en alto para asegurar que la cima esté libre de amenazas.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron agarra a dos enemigos y los mantiene quietos frente a Tusk...", p2: "🔥 ...Tusk se quita del medio a Iron con telequinesis un segundo antes de freír a ambos monstruos con un rayo.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk mira con curiosidad los músculos de sombra de Iron preguntándose cómo tiene tanta resistencia sin usar magia...", p2: "🛡️ ...Iron nota que lo miran y empieza a posar de perfil sacando pecho en pleno corredor de [{phase}].", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron patea [{trophy}] con tanta fuerza que rebota en el escudo mágico de Tusk...", p2: "🔥 ...Tusk desvía el rebote hacia la cabeza de un centinela enemigo derribándolo al instante. +3 G.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Cuando la temperatura del combate sube, Tusk absorbe el calor excedente en su Orbe de Avaricia...", p2: "🛡️ ...mientras Iron usa su enorme escudo para abanicarte aire fresco a ti.", a1: "tusk", a2: "iron" },
            { p1: "🛡️ Iron protege la vanguardia recibiendo todos los golpes físicos sin retroceder...", p2: "🔥 ...y Tusk bombardea desde la retaguardia convirtiendo el pasillo en una zona de artillería perfecta.", a1: "iron", a2: "tusk" },
            { p1: "🔥 Tusk e Iron terminan de limpiar la sala; el chamán hace una reverencia solemne...", p2: "🛡️ ...e Iron choca los puños consigo mismo esperando tu orden para avanzar al siguiente tramo.", a1: "tusk", a2: "iron" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 8: TANK + TUSK (38 TANK + 38 TUSK = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        tank_tusk: [
            { p1: "🐻‍❄️ Tank sacude su enorme pelaje lleno de nieve y escarcha justo al lado de Tusk...", p2: "🔥 ...Las llamas mágicas de Tusk se apagan con un «pfff» y el gran chamán se queda estornudando humo negro.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk lanza una bola de fuego gigante y Tank exhala su aliento del Cero Absoluto al mismo tiempo...", p2: "🐻‍❄️ ...El choque térmico de fuego y hielo hace estallar en mil pedazos las armaduras de toda la patrulla de [{phase}].", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank ve el Orbe de Avaricia rojo y brillante flotando en la mano de Tusk y cree que es una pelota para jugar...", p2: "🔥 ...Tusk tiene que subir el orbe hasta el techo con telequinesis mientras el oso da saltos intentando atraparlo.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk se cansa de caminar y se sienta a levitar tranquilamente sobre el ancho lomo peludo de Tank...", p2: "🐻‍❄️ ...Tank lo lleva paseando por [{dungeon}] como si fuera un tanque blindado con una torreta mágica encima.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank congela a cinco monstruos en un bloque de hielo sólido en medio del corredor...", p2: "🔥 ...y Tusk hace hervir el bloque con un rayo ígneo generando una explosión de vapor que limpia toda la sala.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk reduce el peso de Tank en un 80% con su Magia de Gravedad...", p2: "🐻‍❄️ ...permitiendo que el oso de dos toneladas dé saltos acrobáticos de veinte metros por todo [{phase}] aplastando enemigos.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank encuentra [{trophy}], lo babea todo y lo deja caer sobre los pies de la túnica de Tusk...", p2: "🔥 ...Tusk levanta su túnica con asco y limpia [{trophy}] con fuego purificador antes de apartarlo.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk enciende una fogata mágica flotante para iluminar un rincón oscuro de [{dungeon}]...", p2: "🐻‍❄️ ...Tank siente calor, se aleja gruñendo al otro lado del pasillo y crea su propio aire acondicionado de escarcha.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank arranca en una embestida brutal pero el suelo de [{phase}] se rompe frente a él...", p2: "🔥 ...Tusk crea un puente de gravedad bajo las patas del oso en el último segundo para que no pierda velocidad.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk inmoviliza a un coloso enemigo atándolo con cadenas de gravedad carmesí...", p2: "🐻‍❄️ ...y Tank le cae encima con las dos garras delanteras partiéndole la coraza y soltando monedas. +3 G.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank se rasca el hocico contra el brazo de Tusk mientras el chamán intenta apuntar un hechizo...", p2: "🔥 ...El rayo de Tusk sale chueco, rebota en el techo y por pura suerte derriba a un francotirador oculto.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk aplica el Himno de Protección sobre el pelaje de Tank volviéndolo duro como el diamante...", p2: "🐻‍❄️ ...Las espadas enemigas se quiebran como cristal al chocar contra el pecho del oso alfa.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank huele una trampa mágica oculta bajo las baldosas de [{phase}] y gruñe advirtiéndole a Tusk...", p2: "🔥 ...Tusk sonríe bajo su capucha y desmantela el círculo mágico enemigo absorbiendo su energía.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk hace flotar a tres bestias en el aire dejándolas pataleando indefensas...", p2: "🐻‍❄️ ...Tank las batea una por una con su enorme zarpa como si estuviera practicando tiro al blanco.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank bosteza y su aliento helado congela los huesos del collar de chamán de Tusk...", p2: "🔥 ...Tusk tiene que descongelarse la barba y el collar con pequeñas chispas de fuego mientras regaña al oso.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk lanza el Himno de Vértigo haciendo que la patrulla enemiga pierda el equilibrio...", p2: "🐻‍❄️ ...y Tank pasa rodando hecho una bola gigante de nieve negra llevándoselos a todos de encuentro. +2 G.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank acorrala a un grupo de monstruos contra un callejón sin salida de [{dungeon}]...", p2: "🔥 ...Tusk levanta una mano y llena el callejón con el aliento del Dragón de Fuego sin dejar rastro.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk observa con curiosidad zoológica cómo Tank intenta cazar su propia cola de sombra un segundo...", p2: "🐻‍❄️ ...hasta que Tank nota que lo estás viendo y se para en dos patas fingiendo ferocidad.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank patea [{trophy}] haciendo que ruede por una pendiente llena de trampas...", p2: "🔥 ...Tusk aprovecha que todas las trampas se activaron solas para recolectar el oro del fondo con telequinesis. +3 G.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk invoca un escudo esférico de fuego y Tank invoca su Escudo Ártico al mismo tiempo...", p2: "🐻‍❄️ ...Ambas barreras se fusionan alrededor tuyo creando una defensa elemental impenetrable en [{phase}].", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank muerde la punta del bastón de Tusk para llamarle la atención hacia el techo...", p2: "🔥 ...Tusk mira arriba y derriba con gravedad a cuatro arañas del calabozo antes de que salten.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk le rasca detrás de la oreja a Tank usando una mano invisible de telequinesis...", p2: "🐻‍❄️ ...Tank mueve la pata trasera contento antes de volver a rugirle a los enemigos del frente.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank levanta una losa gigante del piso de [{dungeon}] y la lanza hacia adelante...", p2: "🔥 ...Tusk la envuelve en magma en pleno vuelo convirtiéndola en un proyectil volcánico devastador.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk canaliza energía restauradora sobre el escuadrón (+5 HP)...", p2: "🐻‍❄️ ...mientras Tank se planta frente a él abriendo los brazos para que ningún proyectil lo toque.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank resbala un poco al frenar después de una carrera a toda velocidad en [{phase}]...", p2: "🔥 ...Tusk lo frena en el aire con un colchón de gravedad antes de que el oso se estrelle contra ti.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk usa el Himno de Ceguera dejando a los guardias del sector sumidos en la oscuridad...", p2: "🐻‍❄️ ...Tank se guía puramente por el olfato dentro de la niebla y los derriba uno tras otro.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank encuentra un cofre enterrado en [{dungeon}] y lo saca de un zarpazo...", p2: "🔥 ...Tusk lo abre en el aire con un giro telequinético y las monedas caen directo a tu inventario. +2 G.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk intenta mantener su túnica impecable mientras cruzan un sector húmedo...", p2: "🐻‍❄️ ...Tank congela todo el lodo del piso de un pisotón glacial para que ni tú ni el chamán se ensucien.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank le ruge a [{trophy}] porque reflejaba la luz roja del orbe de Tusk...", p2: "🔥 ...Tusk apaga el brillo un segundo para que el oso deje de pelearse con objetos inanimados.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk aumenta la gravedad diez veces sobre las garras de Tank en el instante en que el oso baja el brazo...", p2: "🐻‍❄️ ...El zarpazo gravitatorio parte en dos la coraza del campeón enemigo y agrieta todo el salón.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank atrapa con los dientes a un enemigo que intentaba huir volando...", p2: "🔥 ...y Tusk lo remata con un chispazo carmesí sin hacerle ni un rasguño al hocico de Tank.", a1: "tank", a2: "tusk" },
            { p1: "🔥 El calor del fuego de Tusk y el frío polar de Tank crean corrientes de viento constantes en [{phase}]...", p2: "🐻‍❄️ ...despejando cualquier gas venenoso o neblina tóxica de la mazmorra.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank se apoya en dos patas y empuja una compuerta gigante de piedra...", p2: "🔥 ...Tusk reduce el peso de la compuerta con magia para que Tank la abra con una sola pata.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk lanza una lluvia de pequeñas esferas ígneas que acorralan a la horda hacia el centro...", p2: "🐻‍❄️ ...donde Tank los espera con las fauces abiertas para barrerlos de un solo golpe.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank olfatea a Tusk recordando que en vida era un Alto Orco, pero reconoce que ahora son del mismo ejército...", p2: "🔥 ...Tusk le da dos palmaditas mágicas en el lomo al oso manteniendo la alianza.", a1: "tank", a2: "tusk" },
            { p1: "🔥 Tusk desintegra una barricada de madera y piedra con un pulso telequinético...", p2: "🐻‍❄️ ...y Tank salta a través de los escombros liderando la vanguardia de [{dungeon}]. +3 G.", a1: "tusk", a2: "tank" },
            { p1: "🐻‍❄️ Tank aplasta [{trophy}] de un manotazo para despejar la entrada de la cámara...", p2: "🔥 ...mientras Tusk ilumina el umbral con runas doradas anunciando tu llegada.", a1: "tank", a2: "tusk" },
            { p1: "🔥 La sabiduría arcana del chamán y el instinto salvaje de la bestia ártica trabajan en armonía...", p2: "🐻‍❄️ ...dominando tanto la distancia como el combate cuerpo a cuerpo en [{phase}].", a1: "tusk", a2: "tank" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 9: BERU + IRON (38 BERU + 38 IRON = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        beru_iron: [
            { p1: "🛡️ Iron da un grito de guerra tan escandaloso que hace retumbar todo el techo de [{dungeon}]...", p2: "🐜 ...Beru libera su aura asesina: «¡Kiiiek! ¡Mi Rey, permítame devorar a este soldado ruidoso!», e Iron se esconde tras su escudo.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru hace una reverencia impecable de 90 grados digna de la corte imperial al terminar una pelea...", p2: "🛡️ ...Iron intenta imitarlo doblándose hacia adelante, pero le gana el peso del casco y se da una vuelta de carnero en el piso.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron corre emocionado para traerte [{trophy}], pero tropieza a mitad de camino...", p2: "🐜 ...Beru lo atrapa en el aire a velocidad hipersónica, te entrega [{trophy}] limpiamente y regaña a Iron por torpe.", a1: "iron", a2: "beru" },
            { p1: "🐜 «¡Escucha bien, guerrero de metal: cuando el Rey camina, nosotros debemos ser tan silenciosos como su sombra!»...", p2: "🛡️ ...Iron asiente muy serio y da un paso que suena «¡CLANK, CLANK, BOOM!», haciendo que a Beru le tiemble un ojo.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron batea a un monstruo con su escudo enviándolo a volar hacia el techo de [{phase}]...", p2: "🐜 ...Beru aparece arriba como un relámpago violeta y lo parte en ocho pedazos antes de que toque la bóveda.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru despeja todo el corredor en medio segundo y se para frente a ti esperando elogios...", p2: "🛡️ ...Iron se queda con el hacha levantada sin nada a qué pegarle y empieza a golpear las paredes por frustración.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron logra aplastar a tres bestias antes de que Beru llegue y voltea a ver a la hormiga sacándole la lengua tras el casco...", p2: "🐜 ...Beru chilla: «¡KIIIIEEK! ¡Eso no cuenta, eran monstruos lentos!» y aniquila a diez más en un parpadeo.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru ve que Iron tiene la armadura abollada tras cubrirte de un derrumbe en [{dungeon}]...", p2: "🛡️ ...La hormiga real le endereza la hombrera de un pellizco y lo cura con magia verde: «¡Nada mal para un humanoide, grandulón!»", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron usa su Grito de Provocación haciendo que veinte monstruos se lancen sobre su escudo...", p2: "🐜 ...Beru sonríe mostrando sus mandíbulas: «¡Excelente carnada!» y los decapita a todos de una sola pasada. +3 G.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru intenta enseñarle a Iron a pronunciar «¡Mi Rey!» a través de telepatía sombría...", p2: "🛡️ ...pero Iron solo sabe rugir «¡GUAAAAAH!» golpeándose el pecho, dejando a Beru con dolor de cabeza.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron se queda atorado intentando sacar su hacha que clavó demasiado profundo en el piso de [{phase}]...", p2: "🐜 ...Beru la saca con dos dedos sin esfuerzo y se la devuelve diciendo: «¡Controla tu fuerza bruta, soldado!»", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru vuela cargando a Iron de los hombros para cruzar un abismo gigante de [{dungeon}]...", p2: "🛡️ ...y suelta a Iron directamente encima del nido de monstruos del otro lado como si fuera una bomba nuclear.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron sale del cráter levantando los dos pulgares hacia ti mientras caen monedas del cielo...", p2: "🐜 ...Beru las atrapa todas en el aire antes de que toquen el suelo y te las entrega. +3 G.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru mira [{trophy}] y empieza un monólogo poético sobre la fugacidad de los reinos caídos...", p2: "🛡️ ...Iron se aburre del discurso, aplasta [{trophy}] con el escudo y apunta hacia la siguiente puerta.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Un coloso enemigo intenta golpear a Beru por sorpresa mientras la hormiga te habla...", p2: "🐜 ...Iron detiene el puño del coloso con su escudo torre y Beru desintegra al enemigo por interrumpir su conversación contigo.", a1: "iron", a2: "beru" },
            { p1: "🐜 «¡Mi Rey, este guerrero de hierro carece de modales de palacio, pero su lealtad hacia usted es aceptable!»...", p2: "🛡️ ...Iron no entiende la mitad de las palabras de Beru, pero como escucha tono de cumplido, saca pecho orgulloso.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron lanza su escudo girando como un disco gigante a lo largo del pasillo de [{phase}]...", p2: "🐜 ...Beru corre encima del escudo en movimiento usándolo como patineta supersónica y salta al cuello del líder enemigo.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru te cura +5 HP con su luz verde y le ordena a Iron que mantenga la guardia alta...", p2: "🛡️ ...Iron se cuadra como soldado raso frente a un general de cinco estrellas y planta su escudo frente a ti.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron encuentra un casco viejo de monstruo en [{dungeon}] y trata de ponérselo a Beru en las antenas...", p2: "🐜 ...Beru parte el casco en polvo con un chasquido de mandíbulas: «¡No toques las antenas reales, insolente!»", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru rebota de pared a pared a velocidad inhumana mareando a toda la patrulla enemiga...", p2: "🛡️ ...y cuando los monstruos se juntan en el centro mareados, Iron cae desde arriba con un mazazo sísmico.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron quiere chocar los cinco con Beru después de esa jugada maestra...", p2: "🐜 ...Beru duda un segundo, pero termina chocando su garra de quitina contra el guantelete de Iron sacando chispas.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru detecta veneno en el aire de [{phase}] y lo barre de un aleteo...", p2: "🛡️ ...mientras Iron usa su escudo para empujar los barriles tóxicos lejos de tu ruta. +2 G.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron intenta correr a la misma velocidad que Beru moviendo las piernas a toda máquina...", p2: "🐜 ...pero Beru ya dio tres vueltas completas al calabozo y regresó cuando Iron apenas avanzó cinco metros.", a1: "iron", a2: "beru" },
            { p1: "🐜 «¡Kiiiek! ¡No te desanimes, grandulón, algún día alcanzarás el uno por ciento de mi velocidad!»...", p2: "🛡️ ...Iron le lanza un hachazo amistoso al aire por burlón y sigue abriendo paso a golpes.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron levanta una columna caída de [{dungeon}] para que puedas pasar por debajo...", p2: "🐜 ...Beru corta los bordes filosos de la columna con sus garras para que no caiga ni un gramo de polvo sobre ti.", a1: "iron", a2: "beru" },
            { p1: "🐜 Un grupo de monstruos rodea a Iron pensando que por ser grande es presa fácil...", p2: "🛡️ ...Iron se ríe, golpea su escudo y Beru cae desde el techo desmantelando el cerco en un segundo.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron recoge [{trophy}] y se lo da a Beru para que la hormiga te lo entregue sin romperlo...", p2: "🐜 ...Beru aprecia el gesto de humildad de Iron y te presenta el hallazgo junto con monedas encontradas. +3 G.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru interroga la mente de un guardia abatido para saber qué hay tras la puerta de [{phase}]...", p2: "🛡️ ...y le da la señal a Iron para que entre derribando la puerta de una patada explosiva.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron recibe de frente el aliento de fuego de una bestia protegiendo a todo el escuadrón...", p2: "🐜 ...Beru atraviesa las llamas como una flecha negra y arranca el núcleo de la bestia al instante.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru sacude el hollín del escudo de Iron con una ráfaga de aire de sus alas...", p2: "🛡️ ...Iron le agradece dándole un golpecito cariñoso que casi hunde a Beru en las baldosas.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron se pone a festejar antes de tiempo creyendo que ya derrotaron al último enemigo del pasillo...", p2: "🐜 ...Beru decapita sin mirar al monstruo que se levantaba detrás de Iron: «¡No bajes la guardia hasta que el Rey salga!»", a1: "iron", a2: "beru" },
            { p1: "🐜 La velocidad hipersónica de Beru y la defensa absoluta de Iron crean un contraste brutal en [{dungeon}]...", p2: "🛡️ ...mientras uno rebota como un láser violeta, el otro avanza como un glaciar de acero.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron parte el suelo de un pisotón levantando a los monstruos ocultos...", p2: "🐜 ...y Beru los cosecha en el aire con sus garras venenosas antes de que puedan reaccionar. +2 G.", a1: "iron", a2: "beru" },
            { p1: "🐜 Beru mira con aprobación cómo Iron jamás retrocede un paso cuando se trata de cubrir tu espalda...", p2: "🛡️ ...y ambos se colocan en posición de combate al sentir que se acerca el final de [{phase}].", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron aplasta [{trophy}] contra su frente para intimidar a los monstruos restantes...", p2: "🐜 ...Funciona tan bien que las bestias retroceden directo hacia las garras de Beru.", a1: "iron", a2: "beru" },
            { p1: "🐜 «¡Avance sin cuidado, mi Rey! ¡El muro de acero y sus garras reales custodian cada centímetro!»...", p2: "🛡️ ...Iron secunda las palabras de Beru golpeando su hacha contra el escudo con un eco triunfal.", a1: "beru", a2: "iron" },
            { p1: "🛡️ Iron empuja los restos de la barricada clearing el sendero central de [{dungeon}]...", p2: "🐜 ...y Beru aterriza a tu lado plegando sus alas respetuosamente.", a1: "iron", a2: "beru" },
            { p1: "🐜 Al cerrar el sector, Beru se arrodilla con elegancia dramática...", p2: "🛡️ ...e Iron por fin logra arrodillarse sin caerse de cara, mirando a Beru con una sonrisa de victoria.", a1: "beru", a2: "iron" }
        ],

        /* ------------------------------------------------------------------
           PAREJA 10: BERU + TUSK (38 BERU + 38 TUSK = 76 LÍNEAS)
           ------------------------------------------------------------------ */
        beru_tusk: [
            { p1: "🔥 Tusk empieza un discurso pomposo en lengua antigua sobre su grandeza como Gran Chamán...", p2: "🐜 ...Beru lo interrumpe de inmediato: «¡Kiiiek! ¡El único ser grandioso en este universo es nuestro Rey, cállate y lanza fuego!»", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru compite con Tusk para ver quién te alaba con palabras más elegantes y dramáticas en [{phase}]...", p2: "🔥 ...Como Tusk aún no puede hablar idioma humano fluido, hace señas teatrales con sus llamas mientras Beru recita poesía real.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk lanza el Himno de Gravedad Cero sobre Beru...", p2: "🐜 ...eliminando la fricción del aire y haciendo que la velocidad de Beru supere Mach 6 mientras desintegra toda la sala.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru devora el núcleo de un mago enemigo y comenta: «¡Su magia sabía rancia, nada comparada con la del chamán de mi Rey!»...", p2: "🔥 ...Tusk escucha el cumplido, se acomoda los collares de cráneos con orgullo y lanza un pilar de fuego el doble de grande.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk encierra a toda una patrulla de [{dungeon}] dentro de una cúpula de gravedad comprimida...", p2: "🐜 ...dejando solo un pequeño agujero por donde entra Beru rebotando adentro como una licuadora de garras. +3 G.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru mira el Orbe de Avaricia de Tusk con curiosidad: «¡Una joya digna del tesoro imperial!»...", p2: "🔥 ...Tusk abraza el orbe contra su pecho celosamente recordándole a la hormiga que tú se lo confiaste a él.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk aplica el Himno de Frenesí y el Himno de Fuego sobre las garras de Beru...", p2: "🐜 ...Beru rasga el aire de [{phase}] dejando cortes de plasma incandescente que funden hasta la roca.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Un enemigo sigiloso intenta acercarse a Tusk mientras el chamán levita concentrado...", p2: "🔥 ...Beru aparece en medio segundo, lo decapita y le dice a Tusk: «¡Concéntrate en tus himnos, brujo, yo cuido el perímetro!»", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk examina [{trophy}] con su ojo mágico y descubre que tiene una trampa explosiva...", p2: "🐜 ...Beru toma [{trophy}] y lo lanza a velocidad supersónica contra el grupo de monstruos del fondo haciéndolos volar.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru y Tusk combinan sus habilidades de soporte: Tusk levanta un escudo rúnico y Beru canaliza curación verde...", p2: "🔥 ...Restaurando +5 HP a tu cuerpo mientras caminas por [{dungeon}] rodeado de luces carmesí y esmeralda.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk hace levitar tres rocas gigantes del suelo y las prende en fuego blanco...", p2: "🐜 ...Beru las patea en el aire una tras otra enviándolas como meteoritos supersónicos contra la barricada.", a1: "tusk", a2: "beru" },
            { p1: "🐜 «¡Chamán, ilumina mejor el sendero! ¡La sombra de mi Soberano merece un escenario resplandeciente!»...", p2: "🔥 ...Tusk chasquea los dedos encendiendo veinte antorchas flotantes de maná a lo largo de todo [{phase}].", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk lanza una maldición de petrificación parcial que endurece y frena a las bestias...", p2: "🐜 ...y Beru pasa entre ellas quebrándolas de un solo golpe y recogiendo el oro intacto. +2 G.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru nota que la túnica de Tusk se atoró en unos escombros de [{dungeon}]...", p2: "🔥 ...y corta la piedra de un zarpazo milimétrico sin rasgar un solo hilo del atuendo del chamán.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk abre la boca invocando el Himno del Dragón de Fuego Gigante...", p2: "🐜 ...mientras Beru vuela en espiral alrededor del dragón de fuego creando un huracán de llamas y garras.", a1: "tusk", a2: "beru" },
            { p1: "🐜 El poder combinado de los dos comandantes más fuertes en magia y velocidad hace temblar [{phase}]...", p2: "🔥 ...Ni siquiera los monstruos de élite duran más de tres segundos frente a esta dupla.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk usa telequinesis para traer [{trophy}] flotando hacia ti...", p2: "🐜 ...pero Beru se adelanta volando, lo limpia con un paño sombrío en el aire y te lo entrega primero.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Tusk mira feo a Beru por robarle el gesto de cortesía...", p2: "🔥 ...y Beru le responde con una sonrisa de mandíbulas: «¡En el servicio al Rey, el más lento pierde, chamán!»", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk invierte la gravedad haciendo que toda la patrulla enemiga quede colgada del techo...", p2: "🐜 ...Beru camina por el techo como buena hormiga y los elimina a todos en su propio terreno. +3 G.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru suelta su chillido ultrasónico paralizando el sistema nervioso de las bestias...", p2: "🔥 ...y Tusk hace llover lanzas de fuego sobre los enemigos paralizados sin fallar un solo tiro.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk detecta una pared ilusoria en [{dungeon}] y la disipa con un giro de su bastón...", p2: "🐜 ...detrás había un alijo oculto que Beru asegura al instante para tu inventario. +3 G.", a1: "tusk", a2: "beru" },
            { p1: "🐜 «¡Dime, antiguo líder de los Orcos, acaso no es un privilegio supremo servir bajo el manto de nuestro Rey!»...", p2: "🔥 ...Tusk asiente solemnemente haciendo brillar sus ojos rojos y redobla la potencia de sus cánticos.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk crea un campo de silencio mágico alrededor de una patrulla para que no puedan pedir refuerzos...", p2: "🐜 ...y Beru los aniquila adentro de la burbuja sin que se escuche un solo ruido en el resto de [{phase}].", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru aterriza tras limpiar el corredor y sacude sus garras...", p2: "🔥 ...Tusk evapora los restos enemigos con una onda térmica para dejar el suelo completamente limpio a tu paso.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Un jefe menor lanza una red de energía oscura para atrapar a Beru en el aire...", p2: "🐜 ...Tusk desvía la red con gravedad inversa devolviéndosela al jefe, y Beru le corta la cabeza.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru absorbe el conocimiento mágico de un enemigo caído y lo comparte mentalmente con Tusk...", p2: "🔥 ...permitiendo que el chamán optimice el flujo de maná del sector y acelere el avance.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk hace flotar [{trophy}] y lo comprime con gravedad hasta convertirlo en un pequeño cubo denso...", p2: "🐜 ...que Beru usa como proyectil de honda lanzándolo a través de tres escudos enemigos.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru siente que el aire de [{dungeon}] está viciado por los monstruos...", p2: "🔥 ...y junto con el viento mágico de Tusk crean una corriente fresca que purifica toda la sala.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk levanta cuatro muros de roca encerrando a un escuadrón enemigo en una caja...", p2: "🐜 ...Beru entra por arriba, se escuchan veinte cortes en un segundo, y las paredes caen revelando solo monedas. +2 G.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru se coloca a tu izquierda con las manos detrás de la espalda y Tusk flota a tu derecha...", p2: "🔥 ...pareciendo los dos ministros imperiales de destrucción del Monarca de las Sombras.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk lanza el Himno de Letargo sobre los centinelas de la puerta de [{phase}]...", p2: "🐜 ...Beru les quita las armas de las manos antes de que se den cuenta y los derriba de un aleteo.", a1: "tusk", a2: "beru" },
            { p1: "🐜 «¡Tus llamas tienen buen color hoy, Kargalgan! ¡Asegúrate de que iluminen bien el triunfo de mi Señor!»...", p2: "🔥 ...Tusk hace estallar una corona de fuego dorado en la bóveda del techo como demostración.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk atrae con telequinesis a todos los arqueros escondidos en las cornisas superiores...", p2: "🐜 ...y los alinea en el aire justo frente a Beru para que el Rey Hormiga los corte de un solo tajo.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru recoge [{trophy}], confirma que es basura mundana y se la lanza a Tusk...", p2: "🔥 ...quien la desintegra en el aire con un chispazo antes de que toque el suelo.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk mantiene una barrera gravitatoria que desvía los escombros lejos de tu cabeza...", p2: "🐜 ...mientras Beru demuele los pilares que sostenían la trampa enemiga en [{dungeon}].", a1: "tusk", a2: "beru" },
            { p1: "🐜 Beru devora el núcleo del campeón del sector y te transfiere vitalidad pura (+5 HP)...", p2: "🔥 ...mientras Tusk sella el perímetro con un círculo de fuego protector.", a1: "beru", a2: "tusk" },
            { p1: "🔥 Tusk y Beru sincronizan un ataque final sobre la última patrulla de [{phase}]...", p2: "🐜 ...La implosión gravitatoria y el corte supersónico limpian el camino hacia la cámara del Jefe.", a1: "tusk", a2: "beru" },
            { p1: "🐜 Ambos comandantes se inclinan profundamente ante ti al despejar la zona...", p2: "🔥 ...esperando tu orden para reducir a cenizas al Jefe de [{dungeon}].", a1: "beru", a2: "tusk" }
        ]
    },
   
       /* ======================================================================
       4. TRÍOS DE COMANDANTES (CADENAS TRIPLES P1 -> P2 -> P3)
          38 SECUENCIAS TRIPLES POR TRÍO = 114 LÍNEAS POR CADA COMBINACIÓN
       ====================================================================== */
    trios: {
        /* ------------------------------------------------------------------
           TRÍO 1: IGRIS + IRON + TANK (EL TRÍO CLÁSICO DEL ARCO DEL CASTILLO DEMONÍACO)
           38 SECUENCIAS X 3 TURNOS = 114 LÍNEAS
           ------------------------------------------------------------------ */
        igris_iron_tank: [
            {
                p1: "🛡️ Iron encuentra [{trophy}] en el suelo de [{phase}] y se lo lanza en la cabeza a Tank para jugar...",
                p2: "🐻‍❄️ ...Tank se enfurece, persigue a Iron a cuatro patas por todo el pasillo llevándose por delante a diez monstruos...",
                p3: "⚔️ ...e Igris les pone el pie a ambos cuando pasan a tu lado, dejándolos clavados de cara en el suelo para que se comporten.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris salta sobre el lomo de Tank ordenando una carga de caballería elegante contra la vanguardia de [{dungeon}]...",
                p2: "🛡️ ...Iron siente envidia, se sube de un salto también al lomo de Tank detrás de Igris...",
                p3: "🐻‍❄️ ...y Tank colapsa de panza por el sobrepeso de llevar dos armaduras pesadas encima, aplastando el piso y sacando +3 G.",
                a1: "igris", a2: "iron", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank congela una rampa de hielo frente a una barricada gigante en [{phase}]...",
                p2: "🛡️ ...Iron corre por la rampa con su escudo torre por delante demoliendo el centro de la muralla...",
                p3: "⚔️ ...e Igris entra por el hueco abierto ejecutando un tajo relámpago azul que aniquila al comandante del sector.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron arranca tres cabezas de monstruos de [{dungeon}] y corre hacia ti dando saltos para presumir su hazaña...",
                p2: "🐻‍❄️ ...Tank le mete una zancadilla con la pata delantera porque él quería saludarte primero...",
                p3: "⚔️ ...Igris corta las cabezas en el aire antes de que caigan sobre tus botas y obliga a ambos brutos a arrodillarse.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris levanta el puño en señal militar ordenando silencio absoluto porque hay francotiradores en [{phase}]...",
                p2: "🐻‍❄️ ...Tank se tapa el hocico con las dos zarpas obedeciendo al instante...",
                p3: "🛡️ ...pero Iron no entiende la seña, pregunta «¿QUÉ?» con su Grito de Provocación y atrae a veinte bestias de golpe.",
                a1: "igris", a2: "tank", a3: "iron"
            },
            {
                p1: "🐻‍❄️ Tank atrapa a un coloso enemigo mordiéndole el brazo izquierdo con sus fauces heladas...",
                p2: "🛡️ ...Iron le sujeta el brazo derecho haciendo una llave de fuerza bruta...",
                p3: "⚔️ ...dejando el pecho del gigante totalmente expuesto para que Igris lo parta en dos con una estocada carmesí. +3 G.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron ve a Igris limpiando su mandoble azul con un paño y quiere limpiar su maza también...",
                p2: "🐻‍❄️ ...Usa el pelaje blanco del costado de Tank como trapo, dejándole una mancha de grasa negra...",
                p3: "⚔️ ...Tank lo manda a volar de un zarpazo e Igris ni siquiera voltea a ver dónde aterrizó Iron.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris corta las cadenas del techo de [{dungeon}] soltando un candelabro pesado sobre la horda...",
                p2: "🐻‍❄️ ...Tank empuja a las bestias sobrevivientes con su aliento ártico hacia el centro...",
                p3: "🛡️ ...donde Iron cae desde una cornisa con el escudo por delante aplastando todo el nido. +2 G.",
                a1: "igris", a2: "tank", a3: "iron"
            },
            {
                p1: "🐻‍❄️ Tank encuentra un cofre viejo en [{phase}] y se sienta encima creyendo que es su trono...",
                p2: "🛡️ ...Iron intenta quitarlo a empujones porque quiere sacarte el tesoro él mismo...",
                p3: "⚔️ ...Igris parte el cofre por debajo de las patas de Tank de un tajo milimétrico y te entrega las monedas sin mover al oso. +3 G.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron lanza [{trophy}] al aire apostando a que nadie puede partirlo antes de que caiga...",
                p2: "⚔️ ...Igris lo divide en cuatro fragmentos exactos sin casi desenvainar su espada...",
                p3: "🐻‍❄️ ...y Tank atrapa los cuatro pedazos en el aire de un bocado, ganando la apuesta por goleada.",
                a1: "iron", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Igris toma el flanco derecho del corredor de [{phase}] con su guardia real...",
                p2: "🛡️ ...Iron planta su escudo torre en el flanco izquierdo...",
                p3: "🐻‍❄️ ...y Tank avanza por el centro como un rompehielos; tu escuadrón original del anime avanza sin que nada lo detenga.",
                a1: "igris", a2: "iron", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank estornuda por el polvo de [{dungeon}] congelando sin querer las botas de Iron contra el piso...",
                p2: "🛡️ ...Iron intenta caminar, se va de boca sin poder despegar los pies y empieza a manotear en el suelo...",
                p3: "⚔️ ...Igris rompe el hielo de las botas de Iron con el pomo de su espada y lo levanta del cuello como a un niño.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron batea a tres monstruos con su hacha enviándolos hacia el lado de Igris...",
                p2: "⚔️ ...Igris los devuelve de un revés telequinético hacia el centro porque le estorbaban el paso...",
                p3: "🐻‍❄️ ...y Tank los remata de un pisotón sísmico quedándose con el crédito de la jugada.",
                a1: "iron", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Una lluvia de proyectiles ácidos cae desde la bóveda de [{phase}]...",
                p2: "🛡️ ...Iron levanta su escudo torre sobre tu cabeza y Tank se para en dos patas cubriendo el resto del ángulo...",
                p3: "⚔️ ...mientras Igris salta hacia las vigas superiores y elimina a todos los tiradores en tres segundos.",
                a1: "igris", a2: "iron", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank se pone a rascarse la espalda contra el escudo gigante de Iron mientras esperan en una puerta...",
                p2: "🛡️ ...Iron hace fuerza con las piernas para aguantar los empujones del oso como si fuera entrenamiento...",
                p3: "⚔️ ...Igris abre la puerta de [{dungeon}] de una patada elegante haciendo que ambos caigan rodando hacia adentro.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron ve una trampa de pinchos en [{phase}] y le dice con señas a Tank que la cruce primero...",
                p2: "🐻‍❄️ ...Tank no es tonto: empuja a Iron con el hocico haciéndolo caer sentado sobre los pinchos...",
                p3: "⚔️ ...Como la armadura de Iron rompe todas las púas de piedra, Igris pasa caminando tranquilamente por encima de él.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris desarma al campeón del sector y señala el núcleo expuesto...",
                p2: "🐻‍❄️ ...Tank le congela las piernas con una exhalación glacial...",
                p3: "🛡️ ...e Iron ejecuta un golpe de martillo a dos manos que pulveriza al enemigo y suelta +3 G.",
                a1: "igris", a2: "tank", a3: "iron"
            },
            {
                p1: "🐻‍❄️ Tank huele comida o maná detrás de una pared falsa de [{dungeon}]...",
                p2: "🛡️ ...Iron y Tank chocan los puños y embisten el muro al mismo tiempo abriendo un boquete enorme...",
                p3: "⚔️ ...Igris entra detrás de la nube de polvo y asegura el alijo de monedas oculto para ti. +2 G.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron intenta ponerse el penacho rojo de una armadura caída para parecerse a Igris...",
                p2: "🐻‍❄️ ...Tank cree que es un pájaro rojo y se lo arranca del casco de un mordisco...",
                p3: "⚔️ ...Igris acelera el paso fingiendo que no conoce de nada a este par de bufones.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris traza un corte diagonal que derriba dos pilares sobre la patrulla de [{phase}]...",
                p2: "🛡️ ...Iron levanta uno de los pilares caídos y se lo pasa a Tank...",
                p3: "🐻‍❄️ ...y ambos lo usan como tronco barredor corriendo uno de cada extremo para limpiar todo el corredor.",
                a1: "igris", a2: "iron", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank se acuesta frente a ti pidiendo una caricia tras limpiar la mitad de [{dungeon}]...",
                p2: "🛡️ ...Iron también se tira de rodillas poniendo la cabeza para que le des una palmada en el casco...",
                p3: "⚔️ ...Igris los mira con severidad, pero da medio paso adelante por si tú también quieres felicitar su esgrima.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron lanza su escudo como disco contra una fila de enemigos, pero se queda desarmado frente a un contraataque...",
                p2: "🐻‍❄️ ...Tank se interpone recibiendo el golpe con su pecho acorazado de hielo...",
                p3: "⚔️ ...e Igris patea el escudo de Iron en el aire devolviéndoselo a las manos antes de cortar al agresor.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris detecta que el puente de [{phase}] es demasiado estrecho para que pasen los tres a la vez...",
                p2: "🛡️ ...Iron y Tank intentan pasar juntos de todos modos y se quedan prensados a mitad del puente...",
                p3: "⚔️ ...Igris camina por la baranda superior pasando sobre sus cabezas y limpia el otro lado él solo.",
                a1: "igris", a2: "iron", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank congela un charco de ácido convirtiéndolo en una pista resbaladiza...",
                p2: "🛡️ ...Iron empuja su escudo sobre el hielo con él subido encima como si fuera un trineo...",
                p3: "⚔️ ...e Igris aprovecha que la patrulla enemiga mira incrédula a Iron para decapitarlos por el flanco. +3 G.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron recoge [{trophy}] y trata de dárselo a Tank para que lo cargue en el hocico...",
                p2: "🐻‍❄️ ...Tank lo escupe directo contra el casco de Iron...",
                p3: "⚔️ ...Igris lo corta en dos en el aire para terminar la discusión y señala la siguiente puerta de [{dungeon}].",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris enfrenta a tres guardias de élite con una danza de estocadas azules...",
                p2: "🐻‍❄️ ...Tank cubre su espalda derribando a los refuerzos de un zarpazo...",
                p3: "🛡️ ...e Iron remata el suelo con su maza recogiendo las monedas que saltan del impacto. +2 G.",
                a1: "igris", a2: "tank", a3: "iron"
            },
            {
                p1: "🐻‍❄️ Tank ruge hacia la oscuridad de [{phase}] haciendo que los monstruos ocultos salgan corriendo...",
                p2: "🛡️ ...Iron los espera a la salida con el escudo abierto como una pared de ladrillos...",
                p3: "⚔️ ...e Igris cierra la pinza por detrás sin dejar escapar ni una sola pieza de experiencia.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron hace fuerza para levantar una compuerta oxidada de [{dungeon}] hasta que le tiemblan las piernas...",
                p2: "🐻‍❄️ ...Tank mete el hocico debajo y la levanta de un tirón dejando a Iron colgado de los barrotes arriba...",
                p3: "⚔️ ...Igris pasa caminando por debajo junto a ti mientras Iron patalea colgado del techo.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris clava su mandoble en el suelo deteniendo una onda expansiva enemiga...",
                p2: "🛡️ ...Iron apoya su escudo contra la espalda de Igris y Tank apoya su frente contra Iron...",
                p3: "🐻‍❄️ ...Formando un tren de contención indestructible que desvía todo el impacto lejos de ti.",
                a1: "igris", a2: "iron", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank bosteza sacando vapor frío tras acabar con la patrulla...",
                p2: "🛡️ ...Iron le mete el mango del hacha en la boca abierta por bromista...",
                p3: "⚔️ ...Tank cierra las fauces masticando el mango y Igris tiene que separar la pelea antes de que se rompan el equipo.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron encuentra un tambor de guerra enemigo en [{phase}] y se pone a tocarlo a golpes...",
                p2: "🐻‍❄️ ...Tank se anima con el ritmo y empieza a dar pisotones que derrumban las paredes...",
                p3: "⚔️ ...Igris atraviesa el tambor con su espada de un destello azul devolviendo la paz a tus oídos.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris lanza un tajo de viento que levanta [{trophy}] y las monedas del suelo...",
                p2: "🐻‍❄️ ...Tank aparta la chatarra de un bufido helado...",
                p3: "🛡️ ...e Iron atrapa las monedas en su escudo como si fuera una bandeja de plata para ti. +3 G.",
                a1: "igris", a2: "tank", a3: "iron"
            },
            {
                p1: "🐻‍❄️ Tank carga por el pasillo central de [{dungeon}] con Igris montado en sus hombros...",
                p2: "🛡️ ...Iron corre detrás intentando alcanzarlos con su pesada armadura...",
                p3: "⚔️ ...Cuando Iron por fin llega jadeando, Igris y Tank ya limpiaron toda la sala y lo esperan sentados.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron se golpea el casco después de chocar contra una viga baja de [{phase}]...",
                p2: "🐻‍❄️ ...Tank se ríe con un gruñido ronco de oso...",
                p3: "⚔️ ...pero un segundo después Tank se da con la misma viga en la frente e Igris niega con el yelmo.",
                a1: "iron", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris salta entre dos muros rebotando hacia el líder enemigo...",
                p2: "🛡️ ...Iron lanza su maza para romper el escudo del jefe...",
                p3: "🐻‍❄️ ...y Tank cae encima de la formación enemiga sellando una victoria impecable del trío clásico. +2 G.",
                a1: "igris", a2: "iron", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank congela las puertas laterales de [{phase}] para evitar refuerzos...",
                p2: "🛡️ ...Iron bloquea la retaguardia con su cuerpo gigante...",
                p3: "⚔️ ...e Igris te escolta en la vanguardia manteniendo el consumo de tu núcleo bajo control total.",
                a1: "tank", a2: "iron", a3: "igris"
            },
            {
                p1: "🛡️ Iron levanta a Igris en hombros tras ganar la escaramuza como si hubieran ganado un campeonato...",
                p2: "⚔️ ...Igris se queda congelado de la incomodidad sin saber cómo bajarse sin perder la dignidad...",
                p3: "🐻‍❄️ ...y Tank se para en dos patas abrazándolos a ambos en un festejo caótico digno del anime.",
                a1: "iron", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Al llegar al final del sector de [{dungeon}], Igris clava su espada y se arrodilla...",
                p2: "🐻‍❄️ ...Tank inclina su enorme cabeza peluda a su izquierda...",
                p3: "🛡️ ...e Iron planta su escudo torre a la derecha; tus tres primeros comandantes esperan tu orden.",
                a1: "igris", a2: "tank", a3: "iron"
            }
        ],

        /* ------------------------------------------------------------------
           TRÍO 2: BERU + IGRIS + IRON (EL FANÁTICO, EL CABALLERO Y EL BRUTO)
           38 SECUENCIAS X 3 TURNOS = 114 LÍNEAS
           ------------------------------------------------------------------ */
        beru_igris_iron: [
            {
                p1: "🛡️ Iron corre hacia ti con [{trophy}] lleno de barro para regalártelo...",
                p2: "⚔️ ...Igris le mete una zancadilla para que no te ensucie la ropa...",
                p3: "🐜 ...y Beru lo patea en el suelo gritando: «¡Kiiiek! ¡Cómo osas traer basura sin desinfectar ante nuestro Rey!»",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 Beru e Igris compiten a velocidad hipersónica cortando a todos los monstruos de [{phase}]...",
                p2: "🛡️ ...Iron intenta participar lanzando un hachazo, pero cuando su hacha baja ya no queda ni un enemigo vivo...",
                p3: "⚔️ ...Igris envaina en silencio y Beru se burla de Iron: «¡Llegaste tres siglos tarde, tortuga de hojalata!»",
                a1: "beru", a2: "iron", a3: "igris"
            },
            {
                p1: "⚔️ Igris organiza una formación en triángulo perfecto para avanzar por [{dungeon}]...",
                p2: "🐜 ...Beru reclama el vértice principal diciendo que él debe ir medio paso más cerca de ti...",
                p3: "🛡️ ...Mientras ellos discuten por milímetros, Iron se adelanta corriendo y derriba la puerta con la cabeza.",
                a1: "igris", a2: "beru", a3: "iron"
            },
            {
                p1: "🛡️ Iron usa su Grito de Provocación atrayendo a toda la horda del sector hacia su escudo...",
                p2: "⚔️ ...Igris corta por la derecha con un destello azul y Beru corta por la izquierda con un destello violeta...",
                p3: "🐜 ...En un segundo toda la horda cae e Iron se queda preguntándose a dónde se fueron todos. +3 G.",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 Beru empieza a recitar un poema épico sobre la mirada del Monarca de las Sombras...",
                p2: "🛡️ ...Iron se conmueve tanto que empieza a aplaudir haciendo un estruendo metálico con los guanteletes...",
                p3: "⚔️ ...Igris les da un golpe en la nuca a los dos al mismo tiempo porque atrajeron a otra patrulla enemiga.",
                a1: "beru", a2: "iron", a3: "igris"
            },
            {
                p1: "⚔️ Igris desarma a un jefe menor en [{phase}] con un giro maestro de su mandoble...",
                p2: "🛡️ ...Iron lo sujeta de los brazos por detrás en una llave Nelson completa...",
                p3: "🐜 ...y Beru le perfora el núcleo mágico devorando su energía para curarte +5 HP.",
                a1: "igris", a2: "iron", a3: "beru"
            },
            {
                p1: "🛡️ Iron se tropieza y su enorme escudo sale volando en dirección a tu espalda...",
                p2: "⚔️ ...Igris lo desvía de un tajo en el aire...",
                p3: "🐜 ...y Beru atrapa el escudo con una mano, se lo encaja a Iron en el casco y lo regaña durante medio pasillo.",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 Beru detecta un cofre con trampa explosiva en [{dungeon}] usando sus antenas...",
                p2: "⚔️ ...Igris se prepara para cortar el cable del mecanismo con precisión...",
                p3: "🛡️ ...pero Iron mete la mano sin fijarse, la trampa le explota en la cara sin hacerle daño y te entrega +3 G.",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Igris se arrodilla en una rodilla tras despejar el salón...",
                p2: "🐜 ...Beru se arrodilla pegando la frente al piso para mostrar aún más devoción que Igris...",
                p3: "🛡️ ...Iron intenta superar a Beru haciendo el pino de cabeza y se desploma de espaldas sobre ambos.",
                a1: "igris", a2: "beru", a3: "iron"
            },
            {
                p1: "🛡️ Iron levanta una roca gigante para lanzarla, pero se le cansan los brazos a medio camino...",
                p2: "🐜 ...Beru la sostiene con un solo dedo diciendo: «¡Qué patética falta de calcio, soldado!»...",
                p3: "⚔️ ...e Igris parte la roca en cuatro proyectiles afilados que Beru patea contra la patrulla de [{phase}].",
                a1: "iron", a2: "beru", a3: "igris"
            },
            {
                p1: "🐜 Beru vuela por el techo de [{dungeon}] derribando a los monstruos ocultos hacia el suelo...",
                p2: "🛡️ ...Iron los batea con el escudo a medida que caen como si fuera práctica de bateo...",
                p3: "⚔️ ...e Igris los remata en el aire con estocadas azules antes de que toquen la pared. +2 G.",
                a1: "beru", a2: "iron", a3: "igris"
            },
            {
                p1: "⚔️ Igris encuentra [{trophy}] y lo aparta con la punta de su bota...",
                p2: "🛡️ ...Iron lo recoge a escondidas porque brilla bonito...",
                p3: "🐜 ...Beru lo delata al instante: «¡Mi Rey, el soldado de hierro está guardando basura en su inventario!»",
                a1: "igris", a2: "iron", a3: "beru"
            },
            {
                p1: "🛡️ Iron bloquea el ataque de tres bestias gigantes al mismo tiempo aguantando el peso...",
                p2: "⚔️ ...Igris corta las armas de las bestias de un tajo horizontal...",
                p3: "🐜 ...y Beru pasa como un taladro violeta arrancándoles la cabeza a las tres en un parpadeo.",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 «¡Escuchen bien: el que deje pasar aunque sea una mosca cerca de mi Rey será mi almuerzo!»...",
                p2: "⚔️ ...Igris desenvaina su espada azul mostrando que no necesita amenazas para cumplir su deber...",
                p3: "🛡️ ...mientras Iron se pone tan nervioso que empieza a dar escudazos al aire matando hasta el polvo de [{phase}].",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Igris salta sobre el escudo de Iron para ganar altura en la bóveda de [{dungeon}]...",
                p2: "🛡️ ...Iron lo impulsa hacia arriba con todas sus fuerzas...",
                p3: "🐜 ...y arriba en el techo Beru e Igris ejecutan un corte cruzado doble que parte en dos al monstruo jefe del tramo.",
                a1: "igris", a2: "iron", a3: "beru"
            },
            {
                p1: "🛡️ Iron quiere que Beru lo lleve volando como vio que hizo antes...",
                p2: "🐜 ...Beru lo agarra del casco a regañadientes y lo lleva arrastrando los pies por el suelo a Mach 2...",
                p3: "⚔️ ...Igris aprovecha la zanja que dejó Iron para recoger las monedas desenterradas. +3 G.",
                a1: "iron", a2: "beru", a3: "igris"
            },
            {
                p1: "🐜 Beru te abanica con sus alas tras un combate intenso en [{phase}]...",
                p2: "⚔️ ...Igris se coloca de espaldas vigilando los accesos del corredor...",
                p3: "🛡️ ...e Iron intenta abanicarte también con su hacha gigante, casi cortándole una antena a Beru.",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Un enemigo lanza una red mágica sobre Iron dejándolo enredado en el suelo...",
                p2: "🛡️ ...Iron rueda por el piso hecho un capullo metálico pidiendo ayuda...",
                p3: "🐜 ...Igris corta la red de un tajo y Beru le dice: «¡Hasta una larva de hormiga tiene más agilidad que tú!»",
                a1: "igris", a2: "iron", a3: "beru"
            },
            {
                p1: "🛡️ Iron rompe un pilar de [{dungeon}] haciendo que caigan escombros sobre la ruta...",
                p2: "⚔️ ...Igris corta las piedras grandes en cubos pequeños...",
                p3: "🐜 ...y Beru los barre todos de un coletazo dejando una alfombra limpia para tus pies.",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 Beru e Igris se disputan quién te entregará el botín de la patrulla recién abatida...",
                p2: "⚔️ ...Ambos estiran la mano al mismo tiempo chocando guantelete contra garra...",
                p3: "🛡️ ...Iron pasa por en medio, recoge las monedas y te las pone en la bolsa sonriendo feliz. +3 G.",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Igris señala una emboscada de asesinos invisibles en [{phase}]...",
                p2: "🐜 ...Beru emite un chillido ultrasónico que revela sus siluetas por ecolocalización...",
                p3: "🛡️ ...e Iron aplasta a los asesinos revelados con un impacto de escudo a toda potencia.",
                a1: "igris", a2: "beru", a3: "iron"
            },
            {
                p1: "🛡️ Iron mira [{trophy}] y le pregunta con señas a Igris si cree que se puede comer...",
                p2: "⚔️ ...Igris lo ignora por completo...",
                p3: "🐜 ...pero Beru le da un mordisco de prueba a [{trophy}], lo escupe y confirma: «¡No es comestible, idiota!»",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 Beru canaliza energía curativa verde (+5 HP) hacia ti tras un roce en [{dungeon}]...",
                p2: "⚔️ ...Igris redobla el paso eliminando a los arqueros del frente...",
                p3: "🛡️ ...e Iron levanta su escudo jurando que ningún otro proyectil volverá a pasar.",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Igris lanza su mandoble azul clavándolo en el escudo de un coloso enemigo...",
                p2: "🐜 ...Beru aterriza sobre el mango de la espada de Igris y le patea la mandíbula al coloso...",
                p3: "🛡️ ...mientras Iron llega corriendo y derriba al gigante de un tacle brutal. +2 G.",
                a1: "igris", a2: "beru", a3: "iron"
            },
            {
                p1: "🛡️ Iron intenta imitar el zumbido de alas de Beru moviendo los brazos súper rápido...",
                p2: "🐜 ...Beru lo mira ofendido: «¡¿Te estás burlando de la anatomía real de Jeju?!»...",
                p3: "⚔️ ...Igris se pone en medio de los dos antes de que Beru desarme a Iron a mordiscos.",
                a1: "iron", a2: "beru", a3: "igris"
            },
            {
                p1: "🐜 Beru limpia tres salas seguidas de [{phase}] adelantándose al grupo...",
                p2: "⚔️ ...Igris revisa metódicamente que no haya quedado ningún enemigo escondido...",
                p3: "🛡️ ...e Iron viene atrás pateando piedritas aburrido porque no le dejaron ni uno vivo.",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Para que Iron no se deprima, Igris deja a un monstruo aturdido a mitad del pasillo...",
                p2: "🐜 ...Beru entiende el gesto del caballero y no lo ataca...",
                p3: "🛡️ ...Iron ve al monstruo, se le ilumina el visor y lo manda a la estratósfera de un mazazo feliz.",
                a1: "igris", a2: "beru", a3: "iron"
            },
            {
                p1: "🛡️ Iron encuentra una puerta de acero macizo en [{dungeon}] y le pega tres cabezazos sin abrirla...",
                p2: "⚔️ ...Igris corta las bisagras con dos destellos azules...",
                p3: "🐜 ...y Beru empuja la puerta con un dedo haciendo que Iron crea que la abrió él con su último cabezazo.",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 «¡Mi Rey, observe cómo sus tres comandantes ejecutan la formación de aniquilación!»...",
                p2: "🛡️ ...Iron planta el escudo al centro deteniendo la carga enemiga...",
                p3: "⚔️ ...mientras Igris y Beru salen como dos relámpagos laterales que borran a la patrulla en un segundo. +3 G.",
                a1: "beru", a2: "iron", a3: "igris"
            },
            {
                p1: "⚔️ Igris sacude su capa negra tras cruzar un túnel polvoriento de [{phase}]...",
                p2: "🛡️ ...El polvo le cae en la cara a Iron quien estornuda dentro del casco...",
                p3: "🐜 ...y Beru le grita a Iron por hacer ruido mientras felicita a Igris por su elegancia.",
                a1: "igris", a2: "iron", a3: "beru"
            },
            {
                p1: "🛡️ Iron recoge [{trophy}] y lo usa para rascarse la espalda dentro de la armadura...",
                p2: "🐜 ...Beru se lo quita horrorizado por la falta de dignidad del guerrero...",
                p3: "⚔️ ...e Igris lo desintegra de un tajo para que sigan avanzando.",
                a1: "iron", a2: "beru", a3: "igris"
            },
            {
                p1: "🐜 Beru suelta su aura de miedo paralizando a diez bestias en [{dungeon}]...",
                p2: "⚔️ ...Igris corta a las cinco de la derecha en línea recta...",
                p3: "🛡️ ...e Iron aplasta a las cinco de la izquierda de un solo barrido con su maza. +2 G.",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Igris detecta que el piso tiembla por la proximidad del Jefe de [{phase}]...",
                p2: "🛡️ ...Iron golpea su escudo preparándose para tanquear el primer impacto...",
                p3: "🐜 ...y Beru despliega sus alas jurando: «¡Nadie tocará ni la sombra de mi Soberano!»",
                a1: "igris", a2: "iron", a3: "beru"
            },
            {
                p1: "🛡️ Iron le choca el hombro a Igris y a Beru tratando de hacer una charla grupal de equipo...",
                p2: "⚔️ ...Igris le devuelve un leve toque de guantelete...",
                p3: "🐜 ...y Beru suspira diciendo: «¡Supongo que eres un camarada tolerable, humanoide de metal!»",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 Beru rebota en el escudo de Iron tomando impulso extra...",
                p2: "⚔️ ...cruza su estela con el tajo de relámpago de Igris...",
                p3: "🛡️ ...e Iron remata la jugada abriendo el portón del sector de un hombrazo.",
                a1: "beru", a2: "igris", a3: "iron"
            },
            {
                p1: "⚔️ Igris recolecta una gema menor caída de un centinela de [{dungeon}]...",
                p2: "🐜 ...Beru verifica que no tenga maldiciones...",
                p3: "🛡️ ...e Iron te la guarda en la bolsa con mucho cuidado. +3 G.",
                a1: "igris", a2: "beru", a3: "iron"
            },
            {
                p1: "🛡️ Iron levanta los brazos festejando que ya casi termina el reloj de [{phase}]...",
                p2: "⚔️ ...Igris mantiene la vista al frente sin confiarse ni un segundo...",
                p3: "🐜 ...y Beru limpia a los últimos rezagados del pasillo antes de que parpadees.",
                a1: "iron", a2: "igris", a3: "beru"
            },
            {
                p1: "🐜 Al despejar la ruta, Beru, Igris e Iron se alinean frente a la cámara del Jefe...",
                p2: "⚔️ ...El filo azul, las garras reales y el muro de acero brillan al unísono...",
                p3: "🛡️ ...esperando tu orden para desatar el poder del Monarca.",
                a1: "beru", a2: "igris", a3: "iron"
            }
        ],

        /* ------------------------------------------------------------------
           TRÍO 3: IGRIS + TANK + TUSK ( HIELO, FUEGO Y ESPADA )
           38 SECUENCIAS X 3 TURNOS = 114 LÍNEAS
           ------------------------------------------------------------------ */
        igris_tank_tusk: [
            {
                p1: "🐻‍❄️ Tank sacude su pelaje helado apagando sin querer las antorchas mágicas de Tusk en [{phase}]...",
                p2: "🔥 ...Tusk se enoja y lanza una llamarada para calentarse, derritiendo el hielo donde estaba parado Tank...",
                p3: "⚔️ ...Igris se aparta con elegancia un segundo antes de que el oso y el chamán resbalen en el charco de agua tibia.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk reduce la gravedad de Tank e Igris al mismo tiempo...",
                p2: "🐻‍❄️ ...Tank salta veinte metros por el aire con Igris montado sobre sus hombros...",
                p3: "⚔️ ...e Igris cae desde las alturas con un tajo cargado de gravedad que parte en dos a la patrulla de [{dungeon}].",
                a1: "tusk", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris corta la vanguardia enemiga abriendo una brecha limpia en el corredor...",
                p2: "🐻‍❄️ ...Tank entra rugiendo y congela a los sobrevivientes con su aliento ártico...",
                p3: "🔥 ...y Tusk hace estallar las estatuas de hielo con un pulso de fuego carmesí, soltando +3 G.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank intenta morder el Orbe de Avaricia de Tusk pensando que es una manzana roja brillante...",
                p2: "🔥 ...Tusk esconde el orbe detrás de la espalda de Igris pidiendo auxilio al caballero...",
                p3: "⚔️ ...Igris detiene la frente de Tank con la palma de su guantelete y le señala a los monstruos reales del frente.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk empieza su cántico teatral de cinco minutos para invocar un hechizo innecesariamente grande...",
                p2: "🐻‍❄️ ...Tank bosteza aburrido y se echa al piso a rascarse la oreja...",
                p3: "⚔️ ...mientras Igris ya limpió toda la sala de [{phase}] a espadazos y ambos esperan a que Tusk se dé cuenta.",
                a1: "tusk", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris detecta un charco de veneno profundo bloqueando el paso en [{dungeon}]...",
                p2: "🐻‍❄️ ...Tank congela la superficie del veneno de un pisotón glacial...",
                p3: "🔥 ...y Tusk evapora los gases tóxicos del aire con una brisa cálida para que cruces sin rasguños.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank encuentra [{trophy}] y se lo lleva en el hocico a Tusk...",
                p2: "🔥 ...Tusk lo levita con asco porque está lleno de baba de oso helada...",
                p3: "⚔️ ...e Igris lo corta en el aire descubriendo que adentro había monedas ocultas. +2 G.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk envuelve el mandoble de Igris en fuego blanco y las garras de Tank en gravedad pesada...",
                p2: "🐻‍❄️ ...Tank destroza los escudos enemigos de un manotazo sísmico...",
                p3: "⚔️ ...e Igris remata la fila con una media luna de fuego y relámpago azul que ilumina todo [{phase}].",
                a1: "tusk", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Un grupo de asesinos salta desde las sombras hacia Tusk...",
                p2: "🐻‍❄️ ...Tank se levanta en dos patas recibiendo a tres asesinos contra su pecho...",
                p3: "🔥 ...Igris decapita a los otros dos en el aire y Tusk incinera los restos con un chasquido.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank patina sobre su propio hielo al tomar una curva cerrada en [{dungeon}]...",
                p2: "⚔️ ...Igris lo sujeta del pelaje del lomo clavando su espada en el piso como freno...",
                p3: "🔥 ...y Tusk coloca un colchón gravitatorio para que ambos frenen suavemente justo a tu lado.",
                a1: "tank", a2: "igris", a3: "tusk"
            },
            {
                p1: "🔥 Tusk levanta cuatro pilares de roca encerrando al campeón del sector...",
                p2: "🐻‍❄️ ...Tank llena la jaula de roca con su aliento congelante...",
                p3: "⚔️ ...e Igris salta desde arriba partiendo al campeón congelado de una sola estocada vertical. +3 G.",
                a1: "tusk", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris camina en silencio, Tusk flota en silencio, pero Tank viene haciendo «¡CRUNCH, CRUNCH!» masticando huesos...",
                p2: "🔥 ...Tusk le lanza un hechizo de silencio al hocico de Tank para no escucharlo masticar...",
                p3: "🐻‍❄️ ...Tank abre y cierra la boca confundido porque no suena nada, e Igris suelta una leve risa muda.",
                a1: "igris", a2: "tusk", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank derriba una columna sobre una patrulla en [{phase}]...",
                p2: "🔥 ...Tusk levanta los escombros con telequinesis para buscar el botín...",
                p3: "⚔️ ...e Igris recoge la bolsa de monedas limpia entregándotela en mano. +2 G.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk canaliza un cántico de curación menor que restaura +5 HP a tu cuerpo...",
                p2: "🐻‍❄️ ...Tank activa su pelaje ártico absorbiendo la presión ambiental de [{dungeon}]...",
                p3: "⚔️ ...mientras Igris despeja los próximos cincuenta metros sin que tengas que desenfundar.",
                a1: "tusk", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris señala a un grupo de arqueros en una plataforma alta de [{phase}]...",
                p2: "🐻‍❄️ ...Tank arranca un bloque de hielo del suelo y se lo pasa a Tusk...",
                p3: "🔥 ...quien lo lanza con telequinesis y fuego como un cometa que barre toda la plataforma.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank siente calor por el Himno del Dragón de Fuego de Tusk y le sopla viento helado en la nuca al chamán...",
                p2: "🔥 ...A Tusk se le congelan los colmillos del susto...",
                p3: "⚔️ ...e Igris les da un toque con el plano de la espada a ambos para que miren al frente.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk examina [{trophy}] flotando en el aire con aires de sabio...",
                p2: "⚔️ ...Igris nota que es un señuelo enemigo y empuja a Tusk a un lado...",
                p3: "🐻‍❄️ ...mientras Tank aplasta [{trophy}] bajo su pata absorbiendo la pequeña explosión sin inmutarse.",
                a1: "tusk", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Igris corre por la pared derecha de [{dungeon}], Tank por el centro y Tusk levita por la izquierda...",
                p2: "🔥 ...Tusk atrae a todos los monstruos hacia el centro con un pozo gravitatorio...",
                p3: "🐻‍❄️ ...donde el choque combinado de la embestida de Tank y el corte de Igris los borra del mapa. +3 G.",
                a1: "igris", a2: "tusk", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank se sienta sobre la túnica larga de Tusk sin fijarse cuando el chamán baja al suelo...",
                p2: "🔥 ...Tusk intenta avanzar y se le sale la capucha por el tirón...",
                p3: "⚔️ ...Igris le hace una seña a Tank para que levante la pata y Tusk se acomoda la ropa indignado.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk abre un portal de fuego sobre la horda de [{phase}]...",
                p2: "⚔️ ...Igris lanza su espada a través de las llamas cargándola de energía térmica...",
                p3: "🐻‍❄️ ...y Tank remata a los enemigos que huyen del calor con un zarpazo glacial.",
                a1: "tusk", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Igris bloquea el espadazo de un caballero oscuro del calabozo...",
                p2: "🔥 ...Tusk aumenta la gravedad sobre el arma enemiga clavándola en el suelo...",
                p3: "🐻‍❄️ ...y Tank pasa por encima del caballero oscuro como una aplanadora ártica.",
                a1: "igris", a2: "tusk", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank olfatea dos caminos distintos en una bifurcación de [{dungeon}]...",
                p2: "🔥 ...Tusk lanza un pulso de detección mágica confirmando el olfato del oso...",
                p3: "⚔️ ...e Igris toma la vanguardia por la ruta correcta ahorrándote tiempo en la fase.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk hace levitar cinco esferas de fuego alrededor de Tank como si fuera un planeta con lunas...",
                p2: "🐻‍❄️ ...Tank corre hacia la patrulla enemiga disparando fuego y hielo al mismo tiempo...",
                p3: "⚔️ ...mientras Igris cierra las filas con estocadas relámpago. +2 G.",
                a1: "tusk", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris limpia su mandoble tras el combate...",
                p2: "🐻‍❄️ ...Tank se sacude los restos de hielo del lomo...",
                p3: "🔥 ...y Tusk evapora toda la suciedad del corredor con un destello carmesí.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank intenta jugar con el bastón de Tusk mordiéndole la punta...",
                p2: "🔥 ...Tusk tira de un extremo y Tank tira del otro en medio de [{phase}]...",
                p3: "⚔️ ...Igris pone el filo de su espada en medio y ambos sueltan el bastón al instante cuadrándose.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk aplica el Himno de Ceguera sobre un coloso de [{dungeon}]...",
                p2: "🐻‍❄️ ...Tank le barre las piernas por detrás derribándolo...",
                p3: "⚔️ ...e Igris clava su mandoble azul directamente en el núcleo del gigante. +3 G.",
                a1: "tusk", a2: "tank", a3: "igris"
            },
            {
                p1: "⚔️ Igris salta hacia atrás esquivando una explosión de trampa...",
                p2: "🐻‍❄️ ...Tank levanta un muro de hielo para contener la onda expansiva...",
                p3: "🔥 ...y Tusk redirige el fuego de la trampa de vuelta hacia los monstruos del fondo.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank patea [{trophy}] hacia arriba con el hocico...",
                p2: "🔥 ...Tusk lo carga de energía gravitatoria en el aire...",
                p3: "⚔️ ...e Igris lo batea con el plano de su espada convirtiéndolo en un proyectil que limpia el pasillo.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk ilumina las runas del suelo de [{phase}]...",
                p2: "⚔️ ...Igris corta los nodos de energía que alimentaban la barrera del sector...",
                p3: "🐻‍❄️ ...y Tank derriba el portón debilitado de un solo empujón con el hombro.",
                a1: "tusk", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Igris monta sobre Tank mientras Tusk levita justo encima de ellos...",
                p2: "🐻‍❄️ ...La formación piramidal avanza por [{dungeon}] disparando hielo, rayos carmesí y tajos azules...",
                p3: "🔥 ...Parecen un jefe final de raid barriendo con los monstruos del calabozo.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank encuentra una bolsa de oro enterrada bajo la nieve mágica...",
                p2: "🔥 ...Tusk la limpia y la levita hacia ti...",
                p3: "⚔️ ...mientras Igris vigila que ningún enemigo interrumpa la entrega. +3 G.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk lanza una maldición de lentitud extrema sobre la última patrulla de [{phase}]...",
                p2: "⚔️ ...Igris camina tranquilamente entre ellos cortando sus armas...",
                p3: "🐻‍❄️ ...y Tank termina de empujarlos fuera del camino con un barrido de zarpa.",
                a1: "tusk", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Igris nota que el frío de Tank y el calor de Tusk están chocando en el pasillo...",
                p2: "🔥 ...Con una seña ordena a Tusk cubrir la vanguardia lejana...",
                p3: "🐻‍❄️ ...y a Tank cubrir tu flanco cercano, optimizando la formación al 100%.",
                a1: "igris", a2: "tusk", a3: "tank"
            },
            {
                p1: "🐻‍❄️ Tank ruge desafiante ante la puerta del Jefe de [{dungeon}]...",
                p2: "🔥 ...Tusk hace brillar el Orbe de Avaricia cargando su hechizo más potente...",
                p3: "⚔️ ...e Igris desenfunda su mandoble azul; el trío elemental está listo para el choque.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 Tusk crea escalones flotantes para bajar un barranco de [{phase}]...",
                p2: "⚔️ ...Igris baja escoltándote paso a paso...",
                p3: "🐻‍❄️ ...mientras Tank simplemente se tira rodando por la ladera y llega abajo primero.",
                a1: "tusk", a2: "igris", a3: "tank"
            },
            {
                p1: "⚔️ Igris corta tres proyectiles en el aire...",
                p2: "🐻‍❄️ ...Tank congela a los arqueros desde abajo...",
                p3: "🔥 ...y Tusk los desintegra con un pilar de gravedad sacando +2 G.",
                a1: "igris", a2: "tank", a3: "tusk"
            },
            {
                p1: "🐻‍❄️ Tank le apoya la pata en el hombro a Tusk como si fueran viejos amigos...",
                p2: "🔥 ...Tusk usa magia para no hundirse en el suelo por el peso del oso...",
                p3: "⚔️ ...e Igris observa al par asegurándose de que no bajen el ritmo de marcha.",
                a1: "tank", a2: "tusk", a3: "igris"
            },
            {
                p1: "🔥 El fuego de Kargalgan, el hielo del Alfa y el relámpago del Caballero Rojo iluminan [{phase}]...",
                p2: "🐻‍❄️ ...Ninguna bestia en [{dungeon}] resiste el embate de los tres elementos...",
                p3: "⚔️ ...dejando el sendero completamente despejado para su Monarca.",
                a1: "tusk", a2: "tank", a3: "igris"
            }
        ]
    }
};

/* ==========================================================================
   EXPANSIÓN MASIVA V1: +450 LÍNEAS NUEVAS (75 SOLO + 75 POR CADA COMANDANTE)
   ========================================================================== */
const DIALOGUE_EXPANSION_SOLO_AND_SINGLE = {
    solo: [
        "🗡️ Caminas en silencio absoluto por [{phase}]; el sonido de tu propia respiración marca el compás de ejecución de cada bestia.",
        "👁️ Sin sombras desplegadas, tu percepción sensorial cubre cada grieta del techo de [{dungeon}].",
        "⚡ Un paso fantasmal te coloca detrás de tres exploradores enemigos; caen al suelo antes de que sus armas salgan de las vainas.",
        "🌑 Tu núcleo de maná permanece sellado en calma total mientras resuelves el combate puramente con músculo y acero.",
        "🩸 Cortas el aire en diagonal desintegrando un proyectil ácido y rematas al tirador de una patada en el pecho. +2 G.",
        "🔍 Apartas [{trophy}] con el filo de tu daga; hoy no necesitas distracciones, solo eficiencia pura.",
        "💨 Te impulsas sobre el escudo de un guardia enemigo, das un giro en el aire y aterrizas detrás de la patrulla mientras colapsan.",
        "🧠 Cada minuto que mantienes el enfoque afuera afila tus reflejos aquí adentro: esquivas dos zarpazos a un milímetro de tu cuello.",
        "🗡️ Cambias tu arma de la mano derecha a la izquierda en pleno tajo, engañando la guardia del centinela de [{phase}].",
        "🪙 Entre las baldosas rotas por tu último impacto brillan monedas olvidadas por antiguos cazadores. +3 G.",
        "🌑 Tu sombra bajo tus pies se agita queriendo defenderte, pero le ordenas con una mirada que permanezca en reposo.",
        "⚡ Corres por el muro vertical de [{dungeon}] evitando un derrumbe y clavas tu hoja en el cráneo de la bestia líder.",
        "💪 Bloqueas el garrote de un monstruo pesado con un solo brazo; tus estadísticas actuales hacen que su fuerza parezca la de un niño.",
        "🩸 Una estocada recta perfora tres filas de enemigos menores en el corredor estrecho de [{phase}].",
        "👁️ Detectas el brillo de una trampa rúnica tras [{trophy}] y cortas el hilo mágico sin detener tu marcha.",
        "🌬️ Inhalas el aire frío del calabozo, recuperas el ritmo y sientes cómo tus músculos entran en calor (+5 HP).",
        "🗡️ Lanzas tu arma contra un francotirador en las alturas y la recuperas en tu mano usando el Toque del Gobernante.",
        "⚡ Cinco destellos de acero iluminan la penumbra de [{dungeon}]; cuando la luz se apaga, estás solo de nuevo en el pasillo.",
        "🪙 Un monstruo acorazado suelta su alijo al partirse su coraza por la mitad. +2 G.",
        "🌑 Avanzas con las manos firmes y la mirada helada; los monstruos del fondo retroceden sintiendo el aura del Monarca.",
        "🔍 Pisas [{trophy}] usándolo como apoyo para saltar sobre una zanja de ácido en [{phase}].",
        "🗡️ Desvías una lanza enemiga hacia el techo haciendo que caiga una roca sobre el resto de la escuadra.",
        "🧠 Tu mente calcula trayectorias como una computadora: tres pasos a la izquierda, giro bajo y corte ascendente letal.",
        "🩸 Sacudes la hoja limpia de un golpe seco; ni una sola mancha de icor toca tu gabardina oscura.",
        "⚡ La velocidad de tu atributo AGI crea dos imágenes residuales que confunden por completo a las bestias de [{dungeon}].",
        "💪 Atrapas el puño de un gólem menor con tu mano libre y le quiebras el núcleo de un rodillazo. +3 G.",
        "🌑 El silencio tras tu ataque es tan profundo que se escucha caer el polvo desde la bóveda de [{phase}].",
        "👁️ Miras el reloj de la incursión: tu ritmo es implacable y tu concentración no tiene fisuras.",
        "🗡️ Un corte circular a ras de suelo barre las piernas de cuatro bestias que intentaban rodearte.",
        "🔍 Encuentras [{trophy}] clavado en una puerta, lo arrancas y abres el paso de una patada frontal.",
        "⚡ Saltas de columna en columna subiendo hacia el nivel superior de [{dungeon}] como un relámpago negro.",
        "🪙 Recoges suministros caídos del cinturón de un jefe menor recién ejecutado. +2 G.",
        "🩸 Tu daga traza un arco carmesí en la oscuridad, silenciando los gruñidos del corredor al instante.",
        "🌬️ Estabilizas tu pulso tras una carrera intensa por [{phase}], regenerando tu vitalidad (+5 HP).",
        "🗡️ Engañas a dos guardias haciendo chocar sus propias hachas entre sí y los rematas de un tajo doble.",
        "👁️ Ni la oscuridad más densa de [{dungeon}] nubla tu vista; ves el flujo de maná de cada criatura como faros encendidos.",
        "⚡ Te dejas caer desde una viga alta aterrizando con ambas botas sobre los hombros del centinela.",
        "🌑 Caminar sin tu ejército te recuerda el templo de Cartenon: solo tú, tu determinación y el filo en tu mano.",
        "🔍 Usas [{trophy}] como señuelo lanzándolo hacia una esquina oscura para hacer salir a los rastreadores ocultos.",
        "🪙 Al desintegrarse la emboscada, caen monedas limpias sobre la piedra. +3 G.",
        "🗡️ Un giro de 360 grados con el filo extendido convierte en cenizas las flechas que volaban hacia ti.",
        "💪 Tu fuerza física abre una grieta en el muro de [{phase}], creando un atajo directo hacia el objetivo.",
        "🩸 Cortas las correas de la armadura de un coloso en tres movimientos rápidos y perforas su punto vital.",
        "⚡ Ni siquiera usas habilidades activas; tu combate cuerpo a cuerpo base basta para dominar este sector.",
        "👁️ Sientes la presión mágica de [{dungeon}] intentando aplastarte, pero tu propia aura la repele sin esfuerzo.",
        "🔍 Pasas junto a [{trophy}] sin detenerte; un Monarca siempre mira hacia la cámara del Jefe.",
        "🗡️ Clavas la hoja en el pecho de un monstruo que saltaba hacia ti y usas su propio impulso para lanzarlo atrás.",
        "🪙 Entre las ruinas del altar del sector aseguras un pequeño tributo en efectivo. +2 G.",
        "🌑 Tu sombra se proyecta gigante sobre los muros de [{phase}] bajo el resplandor de los cristales del techo.",
        "⚡ Esquivas un barrido pesado inclinándote hacia atrás a 45 grados y contraatacas directo a la garganta.",
        "🧠 Cada distracción que vences en el mundo real se traduce en un golpe crítico dentro de este dominio.",
        "🩸 El corredor queda despejado en diez segundos; guardas tu arma un instante para tronar tus nudillos.",
        "💪 Empujas un bloque de piedra de dos toneladas con el hombro para destrabar el camino de [{dungeon}].",
        "🗡️ Dos cortes cruzados en forma de 'X' desmantelan al guardia blindado que custodiaba el puente.",
        "🌬️ Tu control de la respiración mantiene tu SP estable y restaura +5 HP mientras avanzas.",
        "🔍 Pateas [{trophy}] hacia una trampa láser/rúnica desactivándola sin arriesgar un solo punto de vida.",
        "⚡ Tu figura cruza el salón de [{phase}] tan rápido que las antorchas se apagan por la corriente de viento.",
        "🪙 Un explorador del calabozo suelta su bolsa de monedas al caer ante tu estocada. +3 G.",
        "👁️ Evalúas el terreno en medio segundo: terreno elevado a la derecha, cobertura a la izquierda, victoria asegurada.",
        "🌑 Los monstruos de [{dungeon}] dudan en atacar al ver que un solo cazador avanza sin miedo ni escolta.",
        "🗡️ Inviertes la hoja, bloqueas un tajo descendente sobre tu cabeza y partes el arma enemiga en dos.",
        "🩸 Un rastro de chispas azules y sangre mágica queda flotando en el aire tras tu secuencia de ataques.",
        "⚡ Rebotas contra el escudo de un centinela para tomar altura y cortar al mago que se escondía detrás.",
        "🔍 Observas [{trophy}] partido a la mitad por tu propio corte accidental; tu fuerza sigue subiendo.",
        "🪙 Aseguras monedas sueltas junto a una columna derribada en [{phase}]. +2 G.",
        "🧠 No hay titubeo en tus manos; cada movimiento está calculado para gastar el mínimo de energía.",
        "💪 Un puñetazo directo con tu mano libre basta para aturdir a una bestia antes de rematarla con el filo.",
        "🗡️ Deslizas tu arma por la ranura del yelmo enemigo en un golpe de precisión milimétrica.",
        "🌑 La atmósfera de [{dungeon}] parece reconocer a su verdadero dueño a medida que desciendes.",
        "⚡ Tres saltos mortales hacia atrás te sacan del radio de una explosión mágica sin recibir un rasguño.",
        "🩸 Aterrizas en guardia baja y sales disparado hacia adelante partiendo en dos la cortina de humo.",
        "🪙 El líder de la patrulla cae de rodillas y se evapora dejando su recompensa. +3 G.",
        "🔍 Dejas [{trophy}] atrás como marca de que este sector ya pertenece a tu territorio.",
        "👁️ Fijas la vista en el portón al final de [{phase}]; solo queda un obstáculo entre tú y la victoria.",
        "🗡️ El brillo frío de tu arma es lo último que ven las bestias de [{dungeon}] antes de volver a la nada."
    ],

    single: {
        igris: [
            "⚔️ Igris avanza un paso delante de ti; su capa negra corta el viento de [{phase}] con solemnidad imperial.",
            "⚔️ Tres enemigos saltan desde una cornisa; Igris los parte en el aire con un solo arco azul antes de que puedas parpadear.",
            "⚔️ Igris observa [{trophy}] en el suelo, comprueba con la punta de su bota que no sea peligroso y te abre paso.",
            "⚔️ El penacho rojo del yelmo de Igris deja una estela carmesí cada vez que gira para decapitar a un flanqueador.",
            "⚔️ Igris bloquea un mazazo gigante con el plano de su mandoble sin que sus rodillas se doblen ni un milímetro.",
            "⚔️ Con un gesto caballeresco, Igris limpia una piedra plana de [{dungeon}] por si deseas apoyar el pie un segundo.",
            "⚔️ Un arquero oculto dispara desde las sombras; Igris desvía la flecha de un revés haciéndola rebotar directo al tirador.",
            "⚔️ Igris recoge una bolsa de monedas del cinturón de un campeón caído y te la presenta con ambas manos. +3 G.",
            "⚔️ Los ojos cian de Igris brillan con intensidad letal cuando una bestia osa rugir en dirección a su Monarca.",
            "⚔️ Igris ejecuta un corte vertical tan limpio que el muro detrás del enemigo también queda dividido en dos.",
            "⚔️ En los tramos oscuros de [{phase}], las cinco placas luminosas del pecho de Igris sirven como faro táctico.",
            "⚔️ Igris desarma a dos guardias de élite en medio segundo y los atraviesa con una sola estocada recta.",
            "⚔️ Ves a Igris sacudir el polvo de sus hombreras metálicas tras derrumbar una barricada entera en [{dungeon}].",
            "⚔️ Igris usa telequinesis menor para atraer su mandoble de vuelta a su mano tras clavarlo en un enemigo lejano.",
            "⚔️ Si una roca cae del techo, Igris la convierte en arena fina de tres tajos rápidos para que no te golpee ni una esquirla.",
            "⚔️ Igris encuentra [{trophy}], lo parte por la mitad con desdén marcial y asegura las monedas que había debajo. +2 G.",
            "⚔️ El silencio de Igris es absoluto; se comunica contigo puramente a través de su postura de guardia y miradas precisas.",
            "⚔️ Igris salta sobre el escudo de un coloso, camina por su brazo gigante y le corta la cabeza desde los hombros.",
            "⚔️ Tras limpiar la sala de [{phase}], Igris clava su espada en el piso y cruza las manos sobre el pomo esperando tu orden.",
            "⚔️ Un monstruo intenta atacar por tu punto ciego; la sombra de Igris se estira y lo intercepta con un choque de acero.",
            "⚔️ Igris evalúa la calidad de las armas enemigas en [{dungeon}] y las rompe todas por considerarlas chatarra indigna.",
            "⚔️ La capa desgarrada de Igris ondea envuelta en humo negro y chispas azules mientras contiene a toda una horda.",
            "⚔️ Igris desvía un chorro de fuego mágico abriendo una brecha en el aire con la presión de su tajo.",
            "⚔️ Con la disciplina de un mariscal real, Igris mantiene exactamente dos metros de distancia cubriendo tu ángulo derecho.",
            "⚔️ Igris corta los pilares que sostenían el puente de los arqueros enemigos en [{phase}], derribando a todo el escuadrón.",
            "⚔️ Entre los restos humeantes de la patrulla, Igris recolecta el botín sin ensuciarse los guanteletes. +3 G.",
            "⚔️ Igris mira [{trophy}] un instante, niega levemente con el yelmo y continúa escoltándote hacia el núcleo.",
            "⚔️ Cuando aceleras el paso, Igris sincroniza su zancada al milímetro con la tuya como si fuera tu propio reflejo.",
            "⚔️ Igris detiene la carga de una bestia blindada poniéndole la palma del guantelete en la frente antes de cortarla.",
            "⚔️ El zumbido eléctrico de los relámpagos en la hoja de Igris anuncia la muerte de cualquier centinela en [{dungeon}].",
            "⚔️ Igris te cede el paso al abrir un portón pesado de [{phase}], sosteniendo la estructura con una sola mano.",
            "⚔️ Cuatro asesinos caen del techo; Igris desenvaina y enfunda en un parpadeo, y los cuatro caen partidos al suelo.",
            "⚔️ Igris absorbe la tensión del ambiente con su guardia inquebrantable, permitiéndote recuperar el aliento (+5 HP).",
            "⚔️ Un jefe menor intenta pedir piedad; Igris no entiende de piedad hacia los enemigos de su Rey y ejecuta la sentencia.",
            "⚔️ Igris patea una lanza caída en el suelo para clavarla en el pecho de un monstruo que huía por el corredor.",
            "⚔️ El brillo del mandoble de Igris se refleja en los charcos de [{dungeon}] antes de evaporarlos con el calor de su aura.",
            "⚔️ Igris asegura un pequeño cofre lateral, corta el candado de un tajo fino y te entrega su contenido. +2 G.",
            "⚔️ Ni siquiera veinte monstruos juntos logran hacer que Igris retroceda medio paso de la línea que trazó frente a ti.",
            "⚔️ Igris aparta [{trophy}] con el plano de su espada para mantener inmaculada la ruta del Monarca.",
            "⚔️ En un duelo de espadas contra un caballero del calabozo, Igris humilla su técnica en tres golpes y lo desintegra.",
            "⚔️ Igris gira su mandoble en un molinete azul que desvía veinte flechas simultáneas en el salón de [{phase}].",
            "⚔️ La presencia de Igris a tu espalda te da la certeza absoluta de que ninguna traición puede alcanzarte.",
            "⚔️ Igris salta desde una pared lateral dejando una grieta profunda y cae partiendo en dos el altar enemigo.",
            "⚔️ Al caer el líder del tramo, Igris recoge las monedas que rodaron hacia tus botas. +3 G.",
            "⚔️ Igris inclina el yelmo cuando cruzas la mirada con él, reafirmando su juramento silencioso de lealtad eterna.",
            "⚔️ Un rastro de cortes luminosos azules queda grabado en las paredes de [{dungeon}] por donde pasa Igris.",
            "⚔️ Igris usa el pomo de su mandoble para aturdir a una bestia y dejarla lista para que tú practiques tu golpe.",
            "⚔️ El comandante rojo inspecciona el umbral de [{phase}] buscando trampas antes de permitirte cruzar.",
            "⚔️ Igris corta en cuatro pedazos [{trophy}] cuando un monstruo intenta lanzártelo desde lejos.",
            "⚔️ Con una elegancia letal, Igris esquiva un hachazo girando sobre sus talones y decapita al agresor en el mismo giro.",
            "⚔️ El humo sombrío de la armadura de Igris se entrelaza con el tuyo fortaleciendo tu concentración.",
            "⚔️ Igris atraviesa el escudo de hierro de un guardia como si fuera papel mojado y despeja el corredor.",
            "⚔️ Tras una escaramuza rápida en [{phase}], Igris te entrega el oro recuperado con una reverencia. +2 G.",
            "⚔️ Igris planta el pie sobre el pecho de un coloso derribado y levanta la vista buscando al siguiente objetivo.",
            "⚔️ Si el terreno de [{dungeon}] está oscuro, el filo cian de Igris ilumina cada escalón frente a tus botas.",
            "⚔️ Igris repele una onda de choque mágica plantando su espada frente a ti como un pararrayos indestructible.",
            "⚔️ Las bestias menores tiemblan al escuchar el tintineo metálico de la armadura del Caballero Rojo acercándose.",
            "⚔️ Igris limpia su hoja con un movimiento seco del brazo que lanza chispas azules contra el suelo.",
            "⚔️ Encuentras [{trophy}] partido con tal perfección geométrica que sabes de inmediato que Igris pasó por ahí.",
            "⚔️ Igris intercepta en el aire a un monstruo saltarín y lo clava contra el muro lateral de [{phase}].",
            "⚔️ La guardia de tu primer comandante mantiene a raya todo peligro, aliviando tu desgaste (+5 HP).",
            "⚔️ Igris corre a tu lado a velocidad supersónica sin que su postura pierda un ápice de compostura real.",
            "⚔️ Un tajo cruzado de Igris derriba las estatuas animadas de [{dungeon}] dejando caer su núcleo. +3 G.",
            "⚔️ Igris mira con desprecio a los monstruos que atacan en manada sin honor y los barre de un solo tajo.",
            "⚔️ El penacho carmesí de Igris es lo último que brilla en la oscuridad antes de que caiga la vanguardia enemiga.",
            "⚔️ Igris asegura la retaguardia de [{phase}] volteando medio segundo para eliminar a un rastreador rezagado.",
            "⚔️ Con un golpe de hombro acorazado, Igris desestabiliza a dos ogros y los corta antes de que toquen el piso.",
            "⚔️ Igris patea [{trophy}] hacia un precipicio tras verificar que no contiene maná útil.",
            "⚔️ La lealtad silenciosa de Igris convierte el caos de [{dungeon}] en una marcha militar ordenada.",
            "⚔️ Igris recolecta las últimas monedas del corredor y las deposita en tu inventario. +2 G.",
            "⚔️ Un relámpago azul recorre el cuerpo de Igris cuando siente que el Jefe del piso está cerca.",
            "⚔️ Igris traza un círculo en el suelo con la punta de su espada indicando el perímetro seguro.",
            "⚔️ Ninguna criatura en [{phase}] logra cruzar la línea invisible que defiende el mandoble del Caballero Rojo.",
            "⚔️ Igris enfunda su arma con un «clic» metálico resonante justo en el instante en que el último enemigo se evapora.",
            "⚔️ Arrodillado a tu derecha, Igris aguarda en silencio absoluto tu orden para abrir la puerta del Jefe."
        ],

        tank: [
            "🐻‍❄️ Tank camina dando pisotones tan pesados que hace saltar las piedras sueltas de [{phase}] como palomitas.",
            "🐻‍❄️ Un monstruo intenta intimidar a Tank abriendo los brazos; Tank se levanta en dos patas y le saca dos metros de ventaja.",
            "🐻‍❄️ Tank huele [{trophy}], le da un manotazo curioso y lo manda rodando hasta el final del corredor.",
            "🐻‍❄️ El aliento gélido de Tank forma pequeños carámbanos en sus colmillos mientras trota feliz a tu lado.",
            "🐻‍❄️ Tank ve una fila de enemigos en [{dungeon}], baja la cabeza y los arrolla a todos como un camión sin frenos.",
            "🐻‍❄️ Después de aplastar a un guardia blindado, Tank se sienta encima de él y bosteza plácidamente.",
            "🐻‍❄️ Tank sacude su enorme cabeza peluda y lanza copos de escarcha azul que iluminan la penumbra de [{phase}].",
            "🐻‍❄️ Un enemigo le pega con un garrote en el lomo a Tank; el garrote se parte en dos y Tank solo voltea a mirarlo confundido.",
            "🐻‍❄️ Tank escarba en una esquina de la sala con sus garras de hielo y desentierra monedas brillantes. +3 G.",
            "🐻‍❄️ Cuando te detienes un segundo, Tank te empuja suavemente la espalda con su hocico frío como un perro gigante.",
            "🐻‍❄️ Tank suelta un rugido polar que congela los charcos de [{dungeon}] y deja temblando a las bestias del fondo.",
            "🐻‍❄️ Tres monstruos saltan sobre Tank; él da una vuelta de campana en el suelo y los deja planos como estampillas.",
            "🐻‍❄️ Tank intenta morder [{trophy}] para ver si tiene tuétano, pero lo escupe haciendo cara de asco animal.",
            "🐻‍❄️ Las runas azules en la frente y el pecho de Tank brillan como faros cada vez que protege tu posición.",
            "🐻‍❄️ Tank abre paso en [{phase}] derribando dos columnas podridas de un simple empujón con la cadera.",
            "🐻‍❄️ El frío limpio que emana del pelaje de Tank refresca tus pulmones y reduce tu cansancio (+5 HP).",
            "🐻‍❄️ Tank atrapa en el aire una lanza enemiga con los dientes, la mastica como si fuera una rama y escupe las astillas.",
            "🐻‍❄️ Un jefe menor intenta bloquear a Tank; el oso alfa le mete un zarpazo ascendente que lo estampa contra el techo.",
            "🐻‍❄️ Tank aplasta una caja de suministros enemiga con la pata y te empuja las monedas con la nariz. +2 G.",
            "🐻‍❄️ Ves a Tank distraerse medio segundo intentando atrapar un copo de su propia escarcha con la lengua.",
            "🐻‍❄️ Si una trampa de fuego se activa en [{dungeon}], Tank sopla una ventisca helada que apaga las llamas al instante.",
            "🐻‍❄️ Tank camina tan pegado a ti por el pasillo estrecho de [{phase}] que su pelaje suave te roza el brazo.",
            "🐻‍❄️ De un pisotón con las dos patas delanteras, Tank levanta una cresta de hielo que empala a toda la patrulla.",
            "🐻‍❄️ Tank encuentra [{trophy}], lo usa para rascarse la barbilla y lo deja tirado lleno de escarcha.",
            "🐻‍❄️ Un arquero le dispara desde arriba; Tank le lanza una bola de nieve compacta de un manotazo y lo derriba.",
            "🐻‍❄️ El sonido de las garras de Tank rastrillando la roca de [{dungeon}] hace que los monstruos suelten sus armas.",
            "🐻‍❄️ Tank toma carrera, patina sobre el hielo con sus cuatro patas y barre a seis enemigos de una sola deslizada. +3 G.",
            "🐻‍❄️ Cuando terminas de limpiar un tramo, Tank se tira panza arriba esperando que le rasques el pecho.",
            "🐻‍❄️ Tank huele el peligro antes que nadie: sus orejas redondas se paran y gruñe hacia la oscuridad de [{phase}].",
            "🐻‍❄️ Un monstruo venenoso intenta acercarse; Tank lo manda a volar de un revés antes de que suelte una gota de ácido.",
            "🐻‍❄️ Tank se sacude el polvo del combate como un oso saliendo de un río, creando una nube de bruma fría.",
            "🐻‍❄️ Entre los escombros de un muro derribado por Tank encuentras un pequeño alijo intacto. +2 G.",
            "🐻‍❄️ Tank apoya sus enormes patas delanteras sobre una puerta cerrada de [{dungeon}] y la hunde hacia adentro.",
            "🐻‍❄️ A pesar de ser el terror de los bosques helados, Tank te mira con ojos brillantes de absoluta obediencia.",
            "🐻‍❄️ Tank patea [{trophy}] por accidente con su pata trasera y noquea a un explorador enemigo que salía de un hueco.",
            "🐻‍❄️ El escudo de hielo natural de Tank absorbe una explosión mágica entera sin que el oso retroceda un centímetro.",
            "🐻‍❄️ Tank agarra a un coloso enemigo por la cintura en un abrazo de oso y lo estampa de espaldas contra el piso.",
            "🐻‍❄️ El vapor blanco que sale de las fauces de Tank le da a [{phase}] un aspecto de tundra salvaje.",
            "🐻‍❄️ Tank olfatea el suelo, da dos zarpazos precisos y saca monedas ocultas bajo las losas. +3 G.",
            "🐻‍❄️ Si el camino sube, Tank se agacha ofreciéndote su lomo ancho para que no gastes estamina subiendo escaleras.",
            "🐻‍❄️ Un grupo de bestias menores huye corriendo en cuanto ve la silueta gigantesca de Tank doblar la esquina.",
            "🐻‍❄️ Tank muerde el escudo de un guardia de [{dungeon}] y se lo arranca del brazo de un tirón de cuello.",
            "🐻‍❄️ La presencia protectora de tu oso alfa te permite avanzar relajado y recuperar +5 HP.",
            "🐻‍❄️ Tank se frota la mejilla contra tu hombro casi haciéndote perder el equilibrio por su fuerza descomunal.",
            "🐻‍❄️ Con un barrido doble de garras, Tank despeja todas las telarañas y trampas colgantes de [{phase}].",
            "🐻‍❄️ Tank mira [{trophy}] en el suelo, le bufa encima congelándolo y sigue caminando orgulloso.",
            "🐻‍❄️ El trote rítmico de Tank marca un paso constante que te mantiene enfocado en tu objetivo.",
            "🐻‍❄️ Tank salta desde una plataforma alta cayendo de panza sobre el nido enemigo como un meteorito peludo. +2 G.",
            "🐻‍❄️ Después del impacto, Tank sale de entre el humo sacudiendo las orejas sin un solo rasguño.",
            "🐻‍❄️ Tank bloquea un pasillo lateral con su enorme trasero impidiendo que los refuerzos de [{dungeon}] te alcancen.",
            "🐻‍❄️ Un enemigo intenta saltar por encima de Tank; el oso levanta una zarpa sin mirar y lo aplasta contra el suelo.",
            "🐻‍❄️ Tank lame una estalactita de hielo de [{phase}] como si fuera una paleta helada mientras caminan.",
            "🐻‍❄️ Cuando le ordenas atacar, el cambio de Tank es instantáneo: pasa de oso tranquilo a bestia apocalíptica.",
            "🐻‍❄️ Tank destroza un tótem enemigo de un cabezazo y las gemas del tótem se convierten en oro. +3 G.",
            "🐻‍❄️ Las huellas congeladas de Tank iluminan el camino de regreso por toda la mazmorra.",
            "🐻‍❄️ Tank usa [{trophy}] como rascador de garras un segundo antes de partirlo en pedazos.",
            "🐻‍❄️ Ningún viento ni onda expansiva en [{dungeon}] puede moverte si te cubres detrás del lomo de Tank.",
            "🐻‍❄️ Tank suelta un gruñido bajo en frecuencia que hace vibrar hasta el agua de los charcos de [{phase}].",
            "🐻‍❄️ Con un manotazo descendente, Tank hunde en la roca a un guardia acorazado hasta la cintura.",
            "🐻‍❄️ Tank recoge con el hocico una bolsa de botín y la deja caer delicadamente a tus pies. +2 G.",
            "🐻‍❄️ El pelaje negro y azul neón de Tank se ondula como llamas heladas bajo la luz del portal.",
            "🐻‍❄️ Tank huele la puerta del Jefe a cien metros de distancia y se relame los colmillos ansioso por pelear.",
            "🐻‍❄️ Un monstruo le lanza ácido; Tank congela el chorro en el aire convirtiéndolo en hielo inofensivo.",
            "🐻‍❄️ Tank se estira arqueando el lomo después de despejar el corredor y suelta un bostezo ensordecedor.",
            "🐻‍❄️ Ves a Tank aplastar [{trophy}] de un pisotón casual mientras mantiene la vista fija en el frente.",
            "🐻‍❄️ La temperatura de [{phase}] baja diez grados gracias al aura del Alfa de los Osos de Hielo.",
            "🐻‍❄️ Tank derriba a tres enemigos de un solo empujón de hombro y te abre paso hacia la salida. +3 G.",
            "🐻‍❄️ Si un monstruo sobrevive en el suelo, Tank le pone la pata encima esperando a ver qué ordenas hacer con él.",
            "🐻‍❄️ El frío protector de Tank sella tus pequeñas heridas de combate (+5 HP).",
            "🐻‍❄️ Tank golpea el suelo dos veces con la pata trasera avisándote que ya no huele más enemigos en el tramo.",
            "🐻‍❄️ En la oscuridad de [{dungeon}], los ojos blancos y cian de Tank brillan como dos lunas árticas.",
            "🐻‍❄️ Tank arranca un portón de madera podrida con los dientes y lo lanza a un lado del camino.",
            "🐻‍❄️ Las bestias de [{phase}] aprenden por las malas que despertar la furia de Tank equivale a ser aplastadas.",
            "🐻‍❄️ Tank trota a tu izquierda moviendo las orejas atento a cada chasquido de dedos tuyo.",
            "🐻‍❄️ Al llegar al final del pasillo, Tank se sienta firme a tu lado exhalando vapor blanco listo para el Jefe."
        ],

        iron: [
            "🛡️ Iron va caminando dando golpes con su hacha contra las paredes de [{phase}] solo porque le gusta cómo suena el eco.",
            "🛡️ Iron encuentra [{trophy}], lo levanta con las dos manos hacia el cielo como si fuera Excalibur y te mira esperando aplausos.",
            "🛡️ Un monstruo le salta encima a Iron; el gigante lo abraza, da una vuelta de lucha libre (suplex) y lo clava en el piso.",
            "🛡️ Iron se golpea el casco con el puño tres veces para darse ánimos antes de entrar corriendo a la siguiente sala.",
            "🛡️ Al ver un grupo de enemigos débiles en [{dungeon}], Iron suelta el escudo y los persigue intentando atraparlos a mano limpia.",
            "🛡️ Iron rompe sin querer una columna decorativa de [{phase}], mira a los lados nervioso y esconde los pedazos detrás de su espalda.",
            "🛡️ Un proyectil mágico golpea el pecho de Iron; él saca pecho orgulloso y hace una pose de fisicoculturista frente al mago enemigo.",
            "🛡️ Iron sacude un cofre cerrado como si fuera una alcancía gigante hasta que le salen todas las monedas por una grieta. +3 G.",
            "🛡️ Cuando tú te detienes a revisar el mapa, Iron se pone a hacer sentadillas con su escudo torre a cuestas para no enfriarse.",
            "🛡️ Iron ve su sombra proyectada gigante en la pared de [{dungeon}] y se queda haciendo sombras chinescas con los cuernos del casco.",
            "🛡️ De un solo escudazo frontal, Iron manda a volar a cuatro bestias que caen apiladas una encima de otra en una esquina.",
            "🛡️ Iron te trae [{trophy}] corriendo como un cachorro gigante de dos metros y medio y lo deja frente a tus botas.",
            "🛡️ Si un enemigo intenta ignorar a Iron para ir hacia ti, Iron se ofende muchísimo y activa su Grito de Provocación a todo pulmón.",
            "🛡️ El grito de Iron es tan fuerte que derriba el polvo del techo de [{phase}] y aturde a toda la patrulla.",
            "🛡️ Iron usa su enorme hacha como pala para barrer a cinco monstruos fuera del camino de un solo empujón. +2 G.",
            "🛡️ Ves a Iron intentando abrir una puerta que dice «Tire» empujándola con el hombro hasta que arranca todo el marco de piedra.",
            "🛡️ Iron recibe diez flechas en su escudo torre, se las arranca de un manotazo y se las lanza de vuelta a los arqueros como dardos.",
            "🛡️ Después de limpiar una sala en [{dungeon}], Iron levanta los brazos esperando que choques los cinco con su enorme guantelete.",
            "🛡️ Si le chocas el puño a Iron, su aura púrpura brilla el doble de fuerte por la emoción (+5 HP por moral alta).",
            "🛡️ Iron pisa una trampa de oso gigante en [{phase}]; la trampa se dobla contra su bota metálica y él sigue caminando sin enterarse.",
            "🛡️ Un monstruo intenta morder el brazo de Iron; se rompe los colmillos contra el acero y Iron le da un coscorrón en la cabeza.",
            "🛡️ Iron encuentra monedas tiradas en un charco de ácido, mete la mano sin importarle nada y te las entrega limpias. +3 G.",
            "🛡️ Iron intenta caminar de forma elegante y silenciosa, pero cada paso suyo suena como una campana de catedral.",
            "🛡️ Al ver [{trophy}] colgado en una pared, Iron salta para alcanzarlo y deja dos cráteres al aterrizar.",
            "🛡️ Iron usa a un guardia enemigo como escudo humano para bloquear el ataque de otro guardia antes de lanzarlos a ambos.",
            "🛡️ Cuando el pasillo de [{dungeon}] se divide en dos, Iron señala los dos lados al mismo tiempo con cara de confusión total.",
            "🛡️ Iron planta su escudo torre en el piso creando una trinchera instantánea detrás de la cual puedes avanzar sin peligro.",
            "🛡️ Un coloso enemigo choca su maza contra la de Iron; Iron gana el duelo de fuerza bruta y lo manda de rodillas al suelo.",
            "🛡️ Iron celebra su victoria contra el coloso haciendo el paso del robot con su pesada armadura en medio de [{phase}].",
            "🛡️ Entre los escombros del coloso, Iron recoge una bolsa de oro y te la ofrece haciendo una reverencia torpe. +2 G.",
            "🛡️ Iron ve una araña pequeña del calabozo, se asusta medio segundo dando un saltito y luego la aplasta con el escudo entero.",
            "🛡️ Si hay viento fuerte o gas en [{dungeon}], Iron camina delante de ti cortando la corriente con su enorme espalda ancha.",
            "🛡️ Iron intenta afilar su maza redonda con una piedra sin entender que las mazas no tienen filo.",
            "🛡️ Cuando un monstruo te apunta desde lejos, Iron se lanza como guardaespaldas gritando en silencio «¡Señor Presidente!» y bloquea el tiro.",
            "🛡️ Iron agarra [{trophy}], lo dobla como si fuera plastilina para probar su fuerza y lo tira hacia atrás.",
            "🛡️ De un pisotón con el talón metálico, Iron quiebra el suelo de [{phase}] haciendo que los enemigos caigan en una zanja.",
            "🛡️ Iron se asoma a la zanja y se despide de los monstruos caídos moviendo la mano amigablemente.",
            "🛡️ El entusiasmo inagotable de Iron contagia energía al ambiente del calabozo (+5 HP).",
            "🛡️ Iron arranca una estalagmita de piedra y juega a hacer equilibrio con ella en la punta del dedo mientras caminan.",
            "🛡️ Cuando aparece otra patrulla en [{dungeon}], Iron les deja caer la estalagmita encima y recoge el botín. +3 G.",
            "🛡️ Iron se golpea el escudo con el plano del hacha marcando un ritmo de marcha militar para animar tu sesión de enfoque.",
            "🛡️ Un enemigo rápido corre en círculos alrededor de Iron para marearlo; Iron gira con los brazos abiertos como helicóptero y le pega.",
            "🛡️ Iron queda un poco mareado después de girar, da tres pasos chuecos y se apoya en la pared levantando el pulgar.",
            "🛡️ Iron mira [{trophy}] con mucha concentración tratando de recordar qué era cuando él estaba vivo.",
            "🛡️ En un puente estrecho de [{phase}], Iron pone su escudo horizontal sobre un hueco roto para que pases caminando encima de él.",
            "🛡️ Iron aguanta tu peso sobre su escudo sin moverse ni un milímetro hasta que cruzas al otro lado.",
            "🛡️ Tres bestias muerden el escudo de Iron; él levanta el escudo con las tres bestias colgadas y las sacude contra el muro.",
            "🛡️ Iron revisa los bolsillos de un líder abatido en [{dungeon}] sacudiéndolo de los tobillos. +2 G.",
            "🛡️ Si tardas unos segundos en avanzar, Iron se pone a practicar golpes de boxeo contra su propia sombra en la pared.",
            "🛡️ Iron ve un cartel de advertencia en [{phase}], no lo lee y lo usa como tabla de surf deslizándose por las escaleras.",
            "🛡️ Al llegar abajo de las escaleras, Iron se lleva por delante a toda la guardia enemiga en un strike perfecto.",
            "🛡️ Iron se levanta de entre los monstruos derribados y hace una 'V' de victoria con sus dedos acorazados.",
            "🛡️ Un mago enemigo le lanza una maldición de miedo a Iron; Iron es demasiado cabeza dura para sentir miedo y lo aplasta.",
            "🛡️ Iron encuentra [{trophy}], intenta guardárselo en el cinturón, se le cae y decide patearlo lejos.",
            "🛡️ El brillo púrpura y cian de la armadura de Iron ilumina las esquinas más cerradas de [{dungeon}].",
            "🛡️ Iron junta a cinco monstruos empujándolos con el escudo como una topadora hasta dejarlos prensados contra el fondo. +3 G.",
            "🛡️ Cuando le das una orden mental directa, los ojos del visor de Iron parpadean emocionados y sale corriendo al 200%.",
            "🛡️ Iron derriba un muro agrietado de [{phase}] de un solo puñetazo revelando un pasadizo oculto.",
            "🛡️ Antes de que entres al pasadizo, Iron mete la cabeza primero para verificar que no te caiga nada encima.",
            "🛡️ Una trampa de techo le cae en el casco a Iron haciendo «¡CLANG!»; él se sacude la cabeza y te dice que ya es seguro pasar.",
            "🛡️ La devoción absoluta de tu gigante de acero te protege de todo desgaste en este tramo (+5 HP).",
            "🛡️ Iron recoge monedas una por una con mucho cuidado usando solo las puntas de sus dedos gigantes. +2 G.",
            "🛡️ Un enemigo intenta desarmar a Iron; Iron suelta el hacha a propósito y le mete un cabezazo con los cuernos del yelmo.",
            "🛡️ Iron recupera su hacha del suelo y la gira sobre el hombro sintiéndose el comandante más genial del ejército.",
            "🛡️ Iron patea [{trophy}] contra una campana o muro de [{dungeon}] atrayendo a los últimos monstruos escondidos.",
            "🛡️ Cuando los monstruos salen a ver qué fue el ruido, Iron los recibe con un barrido de escudo a dos manos.",
            "🛡️ Iron limpia el visor de su casco con el antebrazo para verte mejor mientras avanzan por [{phase}].",
            "🛡️ Ninguna barrera física en todo el calabozo resiste más de dos embestidas del antiguo cazador de Rango A.",
            "🛡️ Iron recoge un último puñado de oro del suelo y lo hace sonar en sus manos antes de dártelo. +3 G.",
            "🛡️ Al acercarse el final de la fase, Iron deja las bromas a un lado y planta su escudo con firmeza imponente.",
            "🛡️ El aura de provocación de Iron crece formando un muro violeta frente a la cámara del Jefe.",
            "🛡️ Iron mira hacia atrás asegurándose de que estés listo y golpea su pecho acorazado esperando tu señal."
        ],

        tusk: [
            "🔥 Tusk flota a medio metro del suelo con las manos ocultas en sus mangas, observando a las bestias de [{phase}] como insectos.",
            "🔥 Con un simple movimiento de su dedo meñique, Tusk aumenta la gravedad y estampa a cuatro enemigos contra las baldosas.",
            "🔥 Tusk hace levitar [{trophy}] frente a sus ojos carmesí, murmura que es artesanía inferior y lo calcina en el aire.",
            "🔥 Los collares de cráneos de Tusk brillan con runas doradas mientras entona en voz baja el Himno de Protección alrededor tuyo.",
            "🔥 Un arquero intenta disparar en [{dungeon}]; Tusk detiene la flecha a un centímetro de su nariz con telequinesis y la convierte en ceniza.",
            "🔥 Tusk abre los brazos dramáticamente haciendo que dos columnas de fuego espiral limpien todo el corredor frente a ti.",
            "🔥 Después de incinerar a una patrulla entera, Tusk voltea a mirarte de reojo frotándose las manos tímido por si te gustó el espectáculo.",
            "🔥 Tusk atrae todas las monedas sueltas de la sala usando un imán gravitatorio y las deposita en tu bolsa. +3 G.",
            "🔥 El calor del Orbe de Avaricia en la mano de Tusk disipa la humedad y el frío de [{phase}] al instante.",
            "🔥 Tusk lanza el Himno de Confusión; los guardias del sector empiezan a atacarse entre ellos mientras tú pasas caminando.",
            "🔥 Si hay escombros bloqueando el paso en [{dungeon}], Tusk los aparta con una onda invisible sin que tengas que desviar tu ruta.",
            "🔥 Tusk ve a un chamán o mago enemigo, se ofende por su pésima pronunciación mágica y lo borra del mapa con un rayo solar.",
            "🔥 Las túnicas imperiales de Tusk ondean rodeadas de humo negro y chispas rojas dignas del líder de los Altos Orcos.",
            "🔥 Tusk canaliza un cántico de vigor ancestral que restaura tu energía vital mientras avanzas (+5 HP).",
            "🔥 Un monstruo gigante corre hacia ti; Tusk invierte la gravedad bajo sus pies dejándolo colgado de cabeza en el aire.",
            "🔥 Mientras el gigante patalea en el aire, Tusk cierra el puño y lo comprime en una explosión rúnica que suelta +2 G.",
            "🔥 Tusk inspecciona [{trophy}] sin tocarlo, le extrae una pizca de maná residual y desecha el resto a un lado.",
            "🔥 Cuando el pasillo de [{phase}] está oscuro, Tusk crea una pequeña constelación de brasas doradas que flotan sobre tu cabeza.",
            "🔥 Tusk se aclara la garganta con solemnidad antes de recitar un conjuro que abre de par en par las puertas selladas de [{dungeon}].",
            "🔥 Si un enemigo logra acercarse a menos de tres metros, el anillo arcano de Tusk se expande y lo lanza contra el muro.",
            "🔥 Tusk usa el Himno de Debilidad reduciendo la velocidad y defensa de todas las criaturas del piso en un 50%.",
            "🔥 Ves a Tusk ensayar un gesto intimidante con sus colmillos frente a un charco, pero al notar tu mirada se tapa con la capucha.",
            "🔥 Una lluvia de ácido cae del techo de [{phase}]; Tusk despliega un paraguas de energía carmesí que evapora cada gota.",
            "🔥 Tusk separa el oro puro de las cenizas de sus enemigos con precisión alquímica. +3 G.",
            "🔥 Con un golpe de su bastón invisible en el aire, Tusk hace temblar toda la estructura de [{dungeon}].",
            "🔥 Tusk comprime el aire frente a su palma y dispara una bala de vacío que atraviesa tres barricadas en línea recta.",
            "🔥 Al pasar junto a [{trophy}], la presión mágica de Tusk lo hace levitar unos centímetros del suelo.",
            "🔥 Tusk entona el Himno del Sueño Profundo; diez bestias feroces caen rendidas roncando en el acto.",
            "🔥 Sin despertarlas, Tusk las consume en fuego silencioso para no interrumpir tu concentración en la vida real.",
            "🔥 El Orbe de Avaricia multiplica cada chispa de Tusk convirtiendo un hechizo básico en un mar de llamas blancas.",
            "🔥 Tusk crea un puente de losas flotantes para que cruces sobre el foso de [{phase}] caminando en línea recta.",
            "🔥 Un jefe menor intenta resistir la gravedad de Tusk; el gran chamán usa las dos manos y hunde al jefe medio metro en la roca. +2 G.",
            "🔥 Tusk se sacude una mota de ceniza de la manga con la elegancia de un emperador hechicero.",
            "🔥 La barrera térmica de Tusk mantiene tu cuerpo a temperatura perfecta dentro de [{dungeon}] (+5 HP).",
            "🔥 Tusk detecta a cuatro enemigos escondidos detrás de un muro y hace explotar el muro desde adentro con fuego rúnico.",
            "🔥 Cuando lo felicitas mentalmente por su puntería, las llamas de los ojos de Tusk se vuelven rosadas de vergüenza y orgullo.",
            "🔥 Tusk levanta [{trophy}] y lo lanza a velocidad supersónica con telequinesis contra un centinela lejano.",
            "🔥 En el salón central de [{phase}], Tusk dibuja tres círculos mágicos concéntricos que trituran a la emboscada.",
            "🔥 El tintineo de las joyas y cráneos de Tusk acompaña el zumbido grave de su magia gravitatoria.",
            "🔥 Tusk recolecta las monedas caídas de los magos derrotados haciéndolas girar en órbita antes de dártelas. +3 G.",
            "🔥 Si el aire de [{dungeon}] tiene esporas o gas, Tusk lo purifica quemando las toxinas a nivel microscópico.",
            "🔥 Un monstruo salta desde el techo; Tusk lo congela en el aire con telequinesis como si hubieran puesto pausa al tiempo.",
            "🔥 Con un movimiento de abanico de su mano, Tusk manda al monstruo pausado a estrellarse contra el resto de su manada.",
            "🔥 Tusk lee las inscripciones antiguas de [{phase}] y deduce la debilidad elemental del sector al instante.",
            "🔥 El resplandor del Orbe de Avaricia tiñe de carmesí tu silueta mientras caminas escoltado por tu sumo sacerdote.",
            "🔥 Tusk aplica el Himno de Ligereza sobre tus botas, haciendo que sientas que pesas la mitad al caminar por [{dungeon}].",
            "🔥 Entre los restos de una estatua destruida por la gravedad de Tusk aparecen monedas antiguas. +2 G.",
            "🔥 Tusk mira [{trophy}] con desdén: para alguien que domina la magia de los Altos Orcos, los artefactos menores son juguetes.",
            "🔥 Dos serpientes de fuego negro brotan de los hombros de Tusk y limpian las esquinas ciegas del corredor.",
            "🔥 Tusk mantiene sus manos cruzadas tras la espalda mientras sus círculos rúnicos disparan solos contra los enemigos.",
            "🔥 Un rugido enemigo intenta aturdirte; Tusk crea un muro de vacío acústico que silencia el grito por completo.",
            "🔥 Tusk redirige los proyectiles enemigos en el aire haciendo que describan una curva en 'U' y golpeen a quienes los lanzaron.",
            "🔥 Tras limpiar el tramo de [{phase}], Tusk baja suavemente al suelo e inclina la cabeza ante su Monarca. +3 G.",
            "🔥 Tusk usa una chispa diminuta para derretir el cerrojo de un portón blindado en [{dungeon}] sin hacer ruido.",
            "🔥 La sabiduría mágica de Tusk optimiza el flujo de energía del ambiente, restaurando +5 HP a tu receptáculo.",
            "🔥 Tusk comprime [{trophy}] en una bolita del tamaño de una canica y la dispara como balín contra un guardia.",
            "🔥 Cuando Tusk abre la boca para el Himno del Dragón de Fuego, hasta las sombras del pasillo se apartan por respeto.",
            "🔥 El fuego de Tusk no quema el botín: deja las monedas relucientes y listas sobre las baldosas de [{phase}]. +2 G.",
            "🔥 Tusk flota sobre una trampa de piso sin activarla y te sube un centímetro con telequinesis para que tampoco la pises.",
            "🔥 Un grupo de bestias intenta rodear a Tusk; él libera una onda gravitatoria de 360 grados que despeja toda la redonda.",
            "🔥 Tusk se acomoda la capucha con gesto teatral asegurándose de verse imponente en todo momento.",
            "🔥 Los ojos amarillos y rojos de Tusk escanean las fluctuaciones de maná de la cámara del Jefe al fondo de [{dungeon}].",
            "🔥 Tusk lanza una maldición de ceguera y vértigo que deja a la última patrulla de [{phase}] completamente indefensa.",
            "🔥 Con un solo chasquido final, Tusk implosiona el aire alrededor de los enemigos cerrando el combate. +3 G.",
            "🔥 Tusk apaga sus esferas de fuego con un giro de muñeca dejando solo el brillo tenue de su orbe rojo.",
            "🔥 Flotando a tu lado frente al portón final, el Gran Chamán Kargalgan aguarda tu orden para desatar el infierno."
        ],

        beru: [
            "🐜 Beru vuela a un milímetro del suelo limpiando cada piedra de [{phase}] antes de que tus botas la pisen: «¡Todo despejado para mi Rey!»",
            "🐜 Un monstruo osa levantar su arma; Beru aparece frente a él y le arranca los dos brazos en 0.01 segundos: «¡Muere por tu insolencia!»",
            "🐜 Beru toma [{trophy}], lo examina con sus ojos compuestos y chilla: «¡Kiiiek! ¡Qué ofensa que exista basura tan fea en el camino de mi Soberano!»",
            "🐜 Las cuatro alas de Beru vibran con un zumbido hipersónico que corta en rebanadas a la patrulla enemiga solo con la presión del aire.",
            "🐜 Beru devora el núcleo de un campeón de [{dungeon}] y te envuelve en una cálida luz verde de curación (+5 HP).",
            "🐜 «¡Oh, mi Rey! ¡Su postura al caminar hoy irradia una majestuosidad que haría llorar a los mismísimos Gobernantes!»",
            "🐜 Beru rebota cinco veces entre el techo y las paredes de [{phase}] dejando un rastro de rayos violetas y diez enemigos decapitados.",
            "🐜 Al terminar de masacrar a la horda, Beru junta sus garras frente al pecho y te mira con ojitos brillantes esperando un elogio.",
            "🐜 Beru recolecta todas las monedas del salón antes de que terminen de caer al suelo y te las entrega arrodillado. +3 G.",
            "🐜 Si un monstruo hace demasiado ruido en [{dungeon}], Beru le aplasta el cráneo contra el muro: «¡Silencio, el Rey está en plena concentración!»",
            "🐜 Ves a Beru practicando reverencias de corte real mientras camina detrás de ti, murmurando diálogos de dramas históricos.",
            "🐜 Beru detecta una trampa de gas en [{phase}], inhala todo el gas venenoso él solo y lo neutraliza con su biología de Rey Hormiga.",
            "🐜 «¡Kiiiek! ¡Ese gas tenía un sabor mediocre, mi Señor! ¡El aire ya es 100% puro para sus pulmones reales!»",
            "🐜 Beru parte [{trophy}] en cien pedacitos simétricos con un solo parpadeo de sus garras afiladas.",
            "🐜 Cuando un coloso enemigo intenta dar un paso, Beru ya le cortó las piernas, los brazos y el cuello antes de que el pie toque el suelo.",
            "🐜 Beru limpia una mancha de sangre mágica de su propio exoesqueleto negro para no lucir desprolijo a tu lado.",
            "🐜 Entre las grietas del techo de [{dungeon}], las antenas de Beru localizan un alijo oculto que baja volando a entregarte. +2 G.",
            "🐜 «¡Permítame ir delante, mi Rey! ¡Si una sola trampa se atreve a activarse, la destruiré con mi propio cuerpo!»",
            "🐜 Beru lanza su grito ultrasónico de depredador supremo; los monstruos menores de [{phase}] caen paralizados con espuma en la boca.",
            "🐜 Con una delicadeza absurda para su fuerza, Beru te abre la puerta del siguiente sector como un mayordomo de palacio.",
            "🐜 Un mago enemigo lanza una bola de fuego; Beru la parte por la mitad de un zarpazo desnudo y decapita al mago un instante después.",
            "🐜 Beru absorbe la vitalidad de la escuadra abatida y la transfiere directamente a tu núcleo (+5 HP).",
            "🐜 «¡Mi Rey, he notado que su nivel de poder sigue ascendiendo! ¡Este humilde insecto tiembla de dicha al servirle!»",
            "🐜 Beru corre por el techo de [{dungeon}] boca abajo vigilando que nada caiga sobre tu cabeza.",
            "🐜 Al ver [{trophy}], Beru te pregunta muy serio si deseas que construya un trono provisional con los restos de la sala.",
            "🐜 Cinco exploradores enemigos intentan huir; Beru aparece frente a ellos bloqueando la salida con sus mandíbulas abiertas. +3 G.",
            "🐜 El rastro turquesa de los ojos de Beru dibuja zigzags en la oscuridad de [{phase}] a velocidades que el ojo humano apenas capta.",
            "🐜 Si te detienes medio segundo, Beru entra en pánico dramático: «¡¿Acaso hay una piedra incómoda en el zapato de mi Soberano?!»",
            "🐜 Beru recubre sus garras con ácido concentrado y derrite un portón de acero macizo de [{dungeon}] en dos segundos.",
            "🐜 Después de derretir el portón, Beru enfría los bordes soplando con sus alas para que no sientas calor al pasar.",
            "🐜 Beru devora el cerebro de un centinela y te reporta telepáticamente: «¡Faltan pocas bestias en este sector, mi Rey, todas patéticas!»",
            "🐜 Las monedas de la patrulla caen ordenadas por tamaño en tu mano gracias a la velocidad maniática de Beru. +2 G.",
            "🐜 Un jefe menor osa rugirle a Beru; el Rey Hormiga libera un 10% de su aura de Jeju y el jefe menor se desmaya en el acto.",
            "🐜 Beru patea [{trophy}] con tanta potencia que atraviesa dos paredes de [{phase}] y derriba a una patrulla al otro lado.",
            "🐜 «¡KIIIIEEK! ¡Ningún ser vivo en esta dimensión tiene derecho a interrumpir el tiempo sagrado de mi Rey!»",
            "🐜 Beru cambia su tamaño a una versión más compacta para caminar por un túnel estrecho de [{dungeon}] sin romper el techo.",
            "🐜 En cuanto el túnel se abre, Beru vuelve a expandir su coraza de obsidiana y aniquila a seis guardias de un solo barrido.",
            "🐜 La magia curativa de Min Byung-Gyu que vive dentro de Beru brilla en sus manos restaurando +5 HP a tu cuerpo.",
            "🐜 Beru mira con nostalgia sus propias garras recordando cuando nació en la isla, agradecido de haber sido extraído por ti.",
            "🐜 Un francotirador dispara desde lejos en [{phase}]; Beru atrapa la flecha con los dientes a un centímetro de tu hombro y la mastica.",
            "🐜 En menos de un segundo, Beru regresa con el arco roto del francotirador y sus monedas en la mano. +3 G.",
            "🐜 «¡He castigado al insolente que apuntó hacia usted, mi Señor! ¿Desea que borre también la montaña donde estaba parado?»",
            "🐜 Beru usa sus antenas para detectar corrientes de aire y guiarte por el camino más limpio de [{dungeon}].",
            "🐜 Cuando ve [{trophy}], Beru lo limpia a velocidad supersónica y te lo muestra por si tiene algún valor alquímico.",
            "🐜 El chasquido de las mandíbulas de Beru suena como una guillotina metálica en cada rincón oscuro de [{phase}].",
            "🐜 Beru levanta a dos ogros del calabozo con una sola mano cada uno y los estampa contra el suelo abriendo un cráter.",
            "🐜 Para que no tengas que rodear el cráter que él mismo hizo, Beru lo rellena con escombros planos en medio segundo.",
            "🐜 Beru asegura el botín de los ogros y te lo entrega con una reverencia hasta el suelo. +2 G.",
            "🐜 «¡Oh, Soberano! ¡Sus órdenes son la única ley que rige la existencia de este siervo!»",
            "🐜 Beru vuela en círculos alrededor tuyo creando un escudo de viento cortante que desvía el polvo y el veneno.",
            "🐜 Un monstruo acorazado intenta bloquear el golpe de Beru; la garra del Rey Hormiga atraviesa el escudo, la armadura y el muro de atrás.",
            "🐜 Beru sacude su garra con elegancia real imitándote a ti cuando limpias tus dagas.",
            "🐜 En las sombras de [{dungeon}], el brillo violeta y verde agua de Beru impone un terror absoluto a la fauna local.",
            "🐜 Beru encuentra una gema suelta en [{phase}] y la convierte en oro de cambio al instante. +3 G.",
            "🐜 Si siente que tu respiración cambia, Beru aplica de inmediato un pulso de curación preventiva (+5 HP).",
            "🐜 Beru destruye [{trophy}] de un coletazo giratorio solo porque le estorbaba la vista de tu silueta.",
            "🐜 «¡Kiiiek! ¡Ya huelo la presencia del Jefe de este miserable calabozo, mi Rey! ¡Permítame arrancarle el corazón para usted!»",
            "🐜 Beru despeja la última barricada de [{phase}] con una ráfaga de cien golpes en un segundo que parece un solo trueno.",
            "🐜 Todas las bestias restantes caen desintegradas dejando el pasillo central completamente vacío y silencioso.",
            "🐜 Beru recoge hasta la última moneda del sector para que tu ganancia sea perfecta. +3 G.",
            "🐜 Con las alas plegadas como una capa real y la rodilla en tierra, Beru espera tu orden frente a la puerta del Jefe."
        ]
    }
};

// Inyector automático: Fusiona las 450 líneas nuevas dentro de DIALOGUE_BANK sin borrar una sola línea original
if (typeof DIALOGUE_BANK !== 'undefined') {
    if (Array.isArray(DIALOGUE_BANK.solo)) {
        DIALOGUE_BANK.solo.push(...DIALOGUE_EXPANSION_SOLO_AND_SINGLE.solo);
    }
    if (DIALOGUE_BANK.single) {
        Object.keys(DIALOGUE_EXPANSION_SOLO_AND_SINGLE.single).forEach(cmdKey => {
            if (Array.isArray(DIALOGUE_BANK.single[cmdKey])) {
                DIALOGUE_BANK.single[cmdKey].push(...DIALOGUE_EXPANSION_SOLO_AND_SINGLE.single[cmdKey]);
            }
        });
    }
}

/* ==========================================================================
   EXPANSIÓN MASIVA V2: LAS 7 COMBINACIONES DE TRÍOS FALTANTES (10/10 TRÍOS)
   ========================================================================== */
const DIALOGUE_EXPANSION_TRIOS = {
    /* ----------------------------------------------------------------------
       TRÍO 4: BERU + IGRIS + TUSK (LA ÉLITE SUPREMA DEL MONARCA)
       ---------------------------------------------------------------------- */
    beru_igris_tusk: [
        {
            p1: "🔥 Tusk levanta el Orbe de Avaricia preparando un cántico de aniquilación para impresionar al Monarca en [{phase}]...",
            p2: "⚔️ ...Igris se adelanta con un paso relámpago cortando a la mitad de la patrulla en silencio...",
            p3: "🐜 ...y Beru decapita a la otra mitad en 0.1 segundos gritando: «¡Demasiado lento, chamán! ¡El tiempo de mi Rey es oro!» (+3 G).",
            a1: "tusk", a2: "igris", a3: "beru"
        },
        {
            p1: "🐜 «¡Escuchen bien, Igris y Kargalgan: hoy competiremos por ver quién recolecta el mejor tributo para nuestro Soberano!»...",
            p2: "🔥 ...Tusk usa telequinesis para atraer [{trophy}] y limpiarlo con fuego sagrado...",
            p3: "⚔️ ...pero Igris ignora la chatarra, derrota al líder del sector y te entrega una bolsa de monedas reales en silencio. +3 G.",
            a1: "beru", a2: "tusk", a3: "igris"
        },
        {
            p1: "⚔️ Igris detecta una barrera mágica de alto nivel bloqueando el corredor de [{dungeon}]...",
            p2: "🔥 ...Tusk descifra las runas al instante y debilita la estructura con el Himno de Fragilidad...",
            p3: "🐜 ...permitiendo que Beru e Igris la atraviesen juntos en una cruz de luz violeta y cian que pulveriza a los guardias.",
            a1: "igris", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 Tusk reduce a cero la gravedad sobre Igris y Beru al mismo tiempo...",
            p2: "⚔️ ...Igris vuela en línea recta como una lanza azul mientras Beru rebota por las paredes a Mach 5...",
            p3: "🐜 ...En dos segundos no queda ni el polvo de la horda en [{phase}] y Tusk aterriza haciendo una reverencia teatral.",
            a1: "tusk", a2: "igris", a3: "beru"
        },
        {
            p1: "🐜 Beru nota que tienes un rasguño leve y canaliza su magia verde de curación (+5 HP)...",
            p2: "⚔️ ...Igris planta su mandoble frente a ti cerrando el perímetro con furia fría...",
            p3: "🔥 ...y Tusk incinera por completo el rincón de [{dungeon}] de donde salió el ataque enemigo.",
            a1: "beru", a2: "igris", a3: "tusk"
        },
        {
            p1: "⚔️ Igris camina a tu derecha, Beru a tu izquierda y Tusk flota detrás como un consejo imperial...",
            p2: "🔥 ...La presión de maná combinada de tus tres comandantes más fuertes agrieta las paredes de [{phase}]...",
            p3: "🐜 ...«¡Arrodillaos, bestias inmundas, ante el paso del Monarca de las Sombras!», proclama Beru mientras caen monedas. +2 G.",
            a1: "igris", a2: "beru", a3: "tusk"
        },
        {
            p1: "🔥 Tusk examina [{trophy}] y empieza una explicación académica con señas sobre su antigüedad...",
            p2: "🐜 ...Beru lo parte en dos de un zarpazo: «¡A mi Rey no le interesan las clases de historia de un orco!»...",
            p3: "⚔️ ...Igris suspira viendo cómo Tusk le lanza chispazos de enojo a las antenas de Beru y sigue abriendo camino.",
            a1: "tusk", a2: "beru", a3: "igris"
        },
        {
            p1: "🐜 Beru lanza a cinco enemigos hacia el cielo de un coletazo...",
            p2: "🔥 ...Tusk los junta en un solo punto del aire con un vórtice gravitatorio...",
            p3: "⚔️ ...e Igris salta partiendo el vórtice entero con un Tajo Carmesí que ilumina todo [{dungeon}]. +3 G.",
            a1: "beru", a2: "tusk", a3: "igris"
        },
        {
            p1: "⚔️ Un jefe menor intenta lanzar un ataque de área en el pasillo estrecho de [{phase}]...",
            p2: "🔥 ...Tusk levanta un escudo rúnico que absorbe la explosión...",
            p3: "🐜 ...mientras Beru e Igris aparecen a ambos costados del jefe menor y lo decapitan al unísono.",
            a1: "igris", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 Tusk aplica el Himno de Fuego sobre el mandoble de Igris y sobre las garras de Beru...",
            p2: "⚔️ ...Cada corte de Igris deja estelas de llamas azules...",
            p3: "🐜 ...y cada zarpazo de Beru desata explosiones carmesí que limpian [{dungeon}] a velocidad récord.",
            a1: "tusk", a2: "igris", a3: "beru"
        },
        {
            p1: "🐜 «¡Kiiiek! ¡Cuidado con tus bolas de fuego, chamán, casi chamuscas el penacho del caballero Igris!»...",
            p2: "🔥 ...Tusk se disculpa apenado apagando las llamas con un giro de manga...",
            p3: "⚔️ ...Igris asiente hacia ambos agradeciendo el cuidado y recoge el botín del suelo. +2 G.",
            a1: "beru", a2: "tusk", a3: "igris"
        },
        {
            p1: "⚔️ Igris señala una trampa en el suelo donde está tirado [{trophy}]...",
            p2: "🔥 ...Tusk desactiva la runa explosiva con un toque de gravedad...",
            p3: "🐜 ...y Beru barre los restos a velocidad luz para que tus botas pasen sobre piedra limpia.",
            a1: "igris", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 Tusk abre la boca invocando la cabeza gigante del Dragón de Fuego...",
            p2: "⚔️ ...Igris salta sobre el cráneo del dragón de llamas usándolo de montura aérea...",
            p3: "🐜 ...y Beru vuela al lado escoltando el impacto que reduce a cenizas la barricada final de [{phase}]. +3 G.",
            a1: "tusk", a2: "igris", a3: "beru"
        },
        {
            p1: "🐜 Beru absorbe la mente de un explorador enemigo y comparte el mapa mental con sus compañeros...",
            p2: "⚔️ ...Igris traza la táctica de asalto en dos segundos...",
            p3: "🔥 ...y Tusk bombardea las posiciones ocultas antes de que los monstruos sepan qué pasó.",
            a1: "beru", a2: "igris", a3: "tusk"
        },
        {
            p1: "⚔️ Al llegar a la puerta del Jefe de [{dungeon}], Igris, Beru y Tusk se arrodillan en formación perfecta...",
            p2: "🔥 ...El Orbe de Avaricia, el mandoble relámpago y las alas reales vibran en sintonía...",
            p3: "🐜 ...«¡Ordene la destrucción, mi Rey!», susurra Beru mientras el trío élite espera tu comando.",
            a1: "igris", a2: "tusk", a3: "beru"
        }
    ],

    /* ----------------------------------------------------------------------
       TRÍO 5: BERU + IGRIS + TANK (VELOCIDAD, ESGRIMA Y FUERZA ÁRTICA)
       ---------------------------------------------------------------------- */
    beru_igris_tank: [
        {
            p1: "⚔️ Igris se sube al lomo de Tank con elegancia de caballero real para liderar la marcha en [{phase}]...",
            p2: "🐜 ...Beru se pone celoso y se posa sobre la cabeza de Tank gritando: «¡Yo soy el mascarón de proa de mi Rey!»...",
            p3: "🐻‍❄️ ...Tank no ve nada con Beru tapándole los ojos, choca contra un muro y derriba a toda la patrulla enemiga por accidente.",
            a1: "igris", a2: "beru", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank congela todo el corredor de [{dungeon}] con una exhalación del Cero Absoluto...",
            p2: "⚔️ ...Igris patina sobre el hielo cortando por la derecha con precisión milimétrica...",
            p3: "🐜 ...y Beru vuela a ras de hielo cortando por la izquierda y recogiendo todas las monedas al final. +3 G.",
            a1: "tank", a2: "igris", a3: "beru"
        },
        {
            p1: "🐜 «¡Bestia peluda, sacúdete la nieve lejos de nosotros, vas a mojar la capa del caballero y mis alas reales!»...",
            p2: "🐻‍❄️ ...Tank ignora a Beru y se sacude con más ganas levantando una pequeña ventisca en [{phase}]...",
            p3: "⚔️ ...Igris corta los copos de nieve más grandes en el aire y sigue caminando inmutable.",
            a1: "beru", a2: "tank", a3: "igris"
        },
        {
            p1: "⚔️ Igris bloquea el garrote de un gigante enemigo haciendo saltar chispas azules...",
            p2: "🐻‍❄️ ...Tank taclea las piernas del gigante derribándolo de espaldas...",
            p3: "🐜 ...y Beru cae desde el techo arrancándole el núcleo y curándote +5 HP al instante.",
            a1: "igris", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank encuentra [{trophy}] y empieza a juguetear con él dándole manotazos...",
            p2: "🐜 ...Beru lo regaña por falta de seriedad en plena incursión...",
            p3: "⚔️ ...hasta que Tank batea [{trophy}] directo contra un monstruo oculto, e Igris aprueba el tiro con un asentimiento. +2 G.",
            a1: "tank", a2: "beru", a3: "igris"
        },
        {
            p1: "🐜 Beru e Igris avanzan tan rápido limpiando [{dungeon}] que dejan a Tank atrás...",
            p2: "🐻‍❄️ ...Tank ruge indignado, se hace bolita y rueda por la pendiente a toda velocidad...",
            p3: "⚔️ ...Igris y Beru tienen que saltar a los lados para que la bola de dos toneladas de oso no los arrolle junto con los enemigos.",
            a1: "beru", a2: "tank", a3: "igris"
        },
        {
            p1: "⚔️ Igris usa el lomo de Tank como trampolín para saltar hacia el techo de [{phase}]...",
            p2: "🐜 ...Beru lo acompaña en el aire y entre ambos desintegran a las bestias voladoras...",
            p3: "🐻‍❄️ ...mientras Tank espera abajo con la boca abierta atrapando el botín que cae. +3 G.",
            a1: "igris", a2: "beru", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank recibe una lluvia de flechas con su grueso pelaje de hielo sin inmutarse...",
            p2: "🐜 ...Beru se enfurece: «¡Nadie lastima a la mascota de mi Rey!» y aniquila a los arqueros en medio segundo...",
            p3: "⚔️ ...Tank le gruñe a Beru por llamarlo mascota e Igris se pone en medio para que no peleen.",
            a1: "tank", a2: "beru", a3: "igris"
        },
        {
            p1: "🐜 Beru levanta a Tank en el aire usando su fuerza descomunal de Rango S...",
            p2: "⚔️ ...Igris carga su mandoble con relámpagos azules...",
            p3: "🐻‍❄️ ...Beru lanza a Tank contra la barricada e Igris entra detrás del oso barriendo todo el sector de [{dungeon}].",
            a1: "beru", a2: "igris", a3: "tank"
        },
        {
            p1: "⚔️ En un tramo oscuro de [{phase}], los ojos azules de Igris, cian de Tank y turquesas de Beru brillan juntos...",
            p2: "🐻‍❄️ ...Tres pares de ojos depredadores avanzan entre la niebla...",
            p3: "🐜 ...Los monstruos sueltan sus armas y huyen antes de que empiece la pelea. +2 G.",
            a1: "igris", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank huele un alijo de oro enterrado bajo [{trophy}] y escarba con fuerza...",
            p2: "⚔️ ...Igris parte la caja metálica de un tajo limpio...",
            p3: "🐜 ...y Beru cuenta las monedas a velocidad ultrasónica antes de entregártelas. +3 G.",
            a1: "tank", a2: "igris", a3: "beru"
        },
        {
            p1: "🐜 Beru limpia el pelaje de Tank y pule la armadura de Igris en dos segundos antes de que los mires...",
            p2: "⚔️ ...«¡La guardia real debe lucir impecable para el Soberano!», dice la hormiga...",
            p3: "🐻‍❄️ ...Tank le agradece dándole un lengüetazo que deja a Beru lleno de escarcha.",
            a1: "beru", a2: "igris", a3: "tank"
        },
        {
            p1: "⚔️ Igris traza un corte de viento que empuja a la horda hacia Tank...",
            p2: "🐻‍❄️ ...Tank los congela de un rugido ártico...",
            p3: "🐜 ...y Beru los quiebra en mil pedazos con un coletazo supersónico en [{phase}].",
            a1: "igris", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank se acuesta a descansar un segundo y Beru usa su magia verde para curar al oso y a ti (+5 HP)...",
            p2: "⚔️ ...mientras Igris vigila el corredor con la espada desenvainada...",
            p3: "🐜 ...demostrando una sinergia de escuadrón perfecta en [{dungeon}].",
            a1: "tank", a2: "igris", a3: "beru"
        },
        {
            p1: "🐜 Al despejar [{phase}], Beru e Igris se arrodillan marcialmente...",
            p2: "🐻‍❄️ ...y Tank se sienta sobre sus patas traseras levantando una zarpa en saludo militar...",
            p3: "⚔️ ...dejando lista la entrada a la cámara del Jefe.",
            a1: "beru", a2: "tank", a3: "igris"
        }
    ],

    /* ----------------------------------------------------------------------
       TRÍO 6: BERU + IRON + TANK (CAOS CÓMICO DE DOS BRUTOS Y EL MAYORDOMO REAL)
       ---------------------------------------------------------------------- */
    beru_iron_tank: [
        {
            p1: "🛡️ Iron y Tank se ponen a jugar a lasvencidas en medio de [{phase}] ignorando por completo a los monstruos...",
            p2: "🐻‍❄️ ...El choque de fuerza entre el oso y el gigante agrieta todo el piso de la mazmorra...",
            p3: "🐜 ...Beru pierde la paciencia, decapita a veinte enemigos él solo y les grita: «¡Kiiiek! ¡Dejen de jugar y trabajen para el Rey!»",
            a1: "iron", a2: "tank", a3: "beru"
        },
        {
            p1: "🐜 Beru intenta formar en fila a Iron y a Tank para hacerte un pasillo de honor en [{dungeon}]...",
            p2: "🛡️ ...Iron se distrae viendo [{trophy}] y Tank se pone a rascarse la panza...",
            p3: "🐜 ...Beru se agarra la cabeza con las dos garras desesperado por la indisciplina de este par de gigantes.",
            a1: "beru", a2: "iron", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank embiste por la izquierda e Iron embiste por la derecha como dos trenes de carga sin frenos...",
            p2: "🛡️ ...Ambos chocan en el centro aplastando a toda la patrulla enemiga en un sándwich colosal...",
            p3: "🐜 ...Beru suspira, recoge las monedas que saltaron del impacto y te las entrega: «¡Al menos son efectivos, mi Rey!» (+3 G).",
            a1: "tank", a2: "iron", a3: "beru"
        },
        {
            p1: "🛡️ Iron se sube a los hombros de Tank y abre los brazos gritando como el rey del mundo en [{phase}]...",
            p2: "🐜 ...Beru vuela hasta su cara indignado: «¡Bájate de ahí, usurpador, aquí solo hay un Rey!»...",
            p3: "🐻‍❄️ ...Tank aprovecha la discusión para sacudirse y tirar a Iron de cabeza sobre un nido de monstruos.",
            a1: "iron", a2: "beru", a3: "tank"
        },
        {
            p1: "🐜 Beru suelta su chillido ultrasónico, Iron lanza su Grito de Provocación y Tank ruge al mismo tiempo...",
            p2: "🛡️ ...El volumen acústico combinado de los tres rompe hasta los cristales del techo de [{dungeon}]...",
            p3: "🐻‍❄️ ...Toda la horda enemiga cae desmayada por la onda sónica sin necesidad de dar un solo golpe. +3 G.",
            a1: "beru", a2: "iron", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank e Iron compiten por ver quién te trae el regalo más grande arrancando columnas de [{phase}]...",
            p2: "🛡️ ...Te ponen una montaña de escombros y [{trophy}] frente a las botas...",
            p3: "🐜 ...Beru convierte toda la pila de piedra en polvo fino de tres zarpazos para despejarte el paso.",
            a1: "tank", a2: "iron", a3: "beru"
        },
        {
            p1: "🛡️ Iron lanza a Tank como bola de boliche empujándolo por el piso congelado...",
            p2: "🐻‍❄️ ...Tank se lleva a diez monstruos de encuentro...",
            p3: "🐜 ...y luego Beru patea el escudo de Iron con todo e Iron adentro para que limpie la otra mitad del salón. +2 G.",
            a1: "iron", a2: "tank", a3: "beru"
        },
        {
            p1: "🐜 Beru canaliza magia de curación verde (+5 HP) sobre todo el escuadrón...",
            p2: "🐻‍❄️ ...Tank e Iron creen que las luces verdes son luciérnagas y empiezan a dar manotazos al aire para atraparlas...",
            p3: "🐜 ...«¡Kiiiek! ¡Quédense quietos, par de alcornoques, es magia de Rango S!»",
            a1: "beru", a2: "tank", a3: "iron"
        },
        {
            p1: "🛡️ Iron planta su escudo torre y Tank se para a su lado formando una muralla que tapa todo el ancho de [{dungeon}]...",
            p2: "🐻‍❄️ ...Ningún ataque enemigo logra pasar...",
            p3: "🐜 ...mientras Beru salta por encima de ellos una y otra vez aniquilando a los atacantes con total comodidad.",
            a1: "iron", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank muerde el hacha de Iron para quitársela y salir corriendo con ella en el hocico...",
            p2: "🛡️ ...Iron corre detrás del oso por todo [{phase}] pidiéndole su arma de vuelta...",
            p3: "🐜 ...En la persecución pisan a todos los monstruos del sector y Beru solo va detrás recogiendo el oro. +3 G.",
            a1: "tank", a2: "iron", a3: "beru"
        },
        {
            p1: "🐜 Beru agarra a Iron con la mano derecha y a Tank con la mano izquierda volando hacia el techo...",
            p2: "🛡️ ...y suelta a las dos moles desde veinte metros de altura sobre el líder del corredor...",
            p3: "🐻‍❄️ ...El impacto sísmico hunde todo el suelo de [{dungeon}] dejando una victoria aplastante.",
            a1: "beru", a2: "iron", a3: "tank"
        },
        {
            p1: "🛡️ Iron encuentra [{trophy}] y se lo pone a Tank en la cabeza como corona...",
            p2: "🐻‍❄️ ...Tank posa orgulloso...",
            p3: "🐜 ...hasta que Beru se lo quita a velocidad luz: «¡Ninguna sombra puede usar corona frente al Soberano!»",
            a1: "iron", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank congela a un coloso enemigo hasta los hombros...",
            p2: "🛡️ ...Iron le vuela el escudo de un mazazo...",
            p3: "🐜 ...y Beru le perfora el pecho extrayendo las monedas de recompensa. +2 G.",
            a1: "tank", a2: "iron", a3: "beru"
        },
        {
            p1: "🛡️ Iron y Tank chocan la panza celebrando que limpiaron la sala...",
            p2: "🐜 ...El rebote manda a ambos contra las paredes laterales...",
            p3: "🐜 ...mientras Beru se arrodilla frente a ti pidiendo disculpas por el bajo coeficiente intelectual de sus compañeros.",
            a1: "iron", a2: "tank", a3: "beru"
        },
        {
            p1: "🐜 A pesar de las locuras de Iron y Tank, cuando llegan al portón del Jefe de [{phase}] los tres se ponen serios...",
            p2: "🛡️ ...El escudo gigante, las garras de hielo y las mandíbulas del Rey Hormiga apuntan al frente...",
            p3: "🐻‍❄️ ...listos para demoler cualquier amenaza que ose enfrentarte.",
            a1: "beru", a2: "iron", a3: "tank"
        }
    ],

    /* ----------------------------------------------------------------------
       TRÍO 7: BERU + IRON + TUSK (MAGIA, FUERZA BRUTA Y VELOCIDAD)
       ---------------------------------------------------------------------- */
    beru_iron_tusk: [
        {
            p1: "🔥 Tusk aplica el Himno de Gigantificación sobre Iron y el Himno de Velocidad sobre Beru en [{phase}]...",
            p2: "🛡️ ...Iron derriba el muro frontal como un titán imparable...",
            p3: "🐜 ...y Beru entra como un rayo láser violeta rebotando entre los escombros y aniquilando a toda la sala. +3 G.",
            a1: "tusk", a2: "iron", a3: "beru"
        },
        {
            p1: "🛡️ Iron intenta tocar las llamas del Orbe de Avaricia de Tusk por pura curiosidad...",
            p2: "🔥 ...Tusk esconde el orbe indignado...",
            p3: "🐜 ...y Beru le da un manotazo en el casco a Iron: «¡No distraigas a la artillería mágica de mi Rey, cabeza de hierro!»",
            a1: "iron", a2: "tusk", a3: "beru"
        },
        {
            p1: "🐜 Beru y Tusk empiezan a competir en el pasillo de [{dungeon}] por ver quién hace la reverencia más dramática...",
            p2: "🔥 ...Tusk despliega sus túnicas con fuego dorado y Beru recita poesía antigua...",
            p3: "🛡️ ...Iron quiere unirse, se tira de panza al suelo y aplasta [{trophy}] arrancando una sonrisa tuya.",
            a1: "beru", a2: "tusk", a3: "iron"
        },
        {
            p1: "🛡️ Iron usa su Grito de Provocación para atraer a todas las bestias de [{phase}] hacia él...",
            p2: "🔥 ...Tusk las encierra alrededor de Iron con un anillo de gravedad pesada...",
            p3: "🐜 ...y mientras Iron se cubre con el escudo, Beru y el fuego de Tusk las desintegran en dos segundos. +3 G.",
            a1: "iron", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 Tusk reduce el peso de Iron a cero con magia gravitatoria...",
            p2: "🐜 ...Beru agarra a Iron por los tobillos y lo usa como un martillo gigante viviente...",
            p3: "🛡️ ...aplastando a toda la vanguardia enemiga de [{dungeon}] mientras Iron se divierte muchísimo.",
            a1: "tusk", a2: "beru", a3: "iron"
        },
        {
            p1: "🐜 Beru canaliza +5 HP de curación hacia ti y Tusk levanta una barrera térmica protectora...",
            p2: "🛡️ ...Iron no tiene magia para darte, así que se para frente a ti sosteniendo su escudo con ambas manos...",
            p3: "🔥 ...completando una defensa física y mágica absoluta en [{phase}].",
            a1: "beru", a2: "iron", a3: "tusk"
        },
        {
            p1: "🛡️ Iron batea una roca gigante hacia la patrulla enemiga...",
            p2: "🔥 ...Tusk la convierte en una bola de magma ardiente en pleno vuelo...",
            p3: "🐜 ...y Beru la parte justo encima de los monstruos provocando una lluvia de fuego y monedas. +2 G.",
            a1: "iron", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 Tusk detecta una trampa mágica en [{trophy}] y levanta la mano para desactivarla...",
            p2: "🛡️ ...Iron la pisa antes de que Tusk termine el gesto...",
            p3: "🐜 ...Beru saca a Iron de la explosión en un milisegundo y lo regaña durante los siguientes cien metros.",
            a1: "tusk", a2: "iron", a3: "beru"
        },
        {
            p1: "🐜 «¡Chamán, dale más fuego al escudo de este grandulón para que ilumine el camino de nuestro Soberano!»...",
            p2: "🔥 ...Tusk envuelve el escudo torre de Iron en llamas blancas...",
            p3: "🛡️ ...e Iron corre feliz por [{dungeon}] iluminando todo el sector como una antorcha humana gigante.",
            a1: "beru", a2: "tusk", a3: "iron"
        },
        {
            p1: "🛡️ Un coloso enemigo intenta aplastar a Tusk...",
            p2: "🛡️ ...Iron bloquea el golpe con el hombro y Tusk invierte la gravedad del coloso...",
            p3: "🐜 ...dejándolo flotando para que Beru lo corte en diez pedazos. +3 G.",
            a1: "iron", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 Tusk abre un foso en el suelo de [{phase}] donde caen los guardias enemigos...",
            p2: "🛡️ ...Iron empuja un muro pesado encima del foso para taparlo...",
            p3: "🐜 ...y Beru rescata únicamente las monedas antes de que caiga la piedra. +2 G.",
            a1: "tusk", a2: "iron", a3: "beru"
        },
        {
            p1: "🐜 Beru vuela alrededor de Tusk e Iron verificando que mantengan la formación...",
            p2: "🔥 ...Tusk mantiene el bombardeo arcano a distancia...",
            p3: "🛡️ ...e Iron despeja cualquier escombro que caiga cerca de tus pies.",
            a1: "beru", a2: "tusk", a3: "iron"
        },
        {
            p1: "🛡️ Iron encuentra [{trophy}] y se lo enseña a Tusk y a Beru...",
            p2: "🔥 ...Tusk niega con la cabeza y Beru suspira...",
            p3: "🛡️ ...pero como ven que Iron está tan contento, lo dejan tirarlo contra el último enemigo del tramo.",
            a1: "iron", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 El Himno del Dragón de Fuego de Tusk se combina con la onda sónica de Beru...",
            p2: "🐜 ...creando un huracán incandescente en [{dungeon}]...",
            p3: "🛡️ ...mientras Iron te cubre detrás de su escudo para que no te llegue ni una chispa.",
            a1: "tusk", a2: "beru", a3: "iron"
        },
        {
            p1: "🐜 Al final de [{phase}], Beru, Tusk e Iron se cuadran frente a ti...",
            p2: "🔥 ...La magia de los Altos Orcos, el poder de Jeju y el acero inquebrantable están listos...",
            p3: "🛡️ ...aguardando tu orden para aplastar al Jefe.",
            a1: "beru", a2: "tusk", a3: "iron"
        }
    ],

    /* ----------------------------------------------------------------------
       TRÍO 8: BERU + TANK + TUSK (EL TRÍO DE LAS BESTIAS MÁGICAS SUPREMAS)
       ---------------------------------------------------------------------- */
    beru_tank_tusk: [
        {
            p1: "🐻‍❄️ Tank ruge con fuerza polar, Tusk entona un cántico en lengua orca y Beru chilla como Rey Hormiga...",
            p2: "🔥 ...El choque de los tres instintos de Jefes de Mazmorra hace temblar todo [{dungeon}]...",
            p3: "🐜 ...Las bestias menores de [{phase}] colapsan aterradas al sentir a tres antiguos jefes sirviendo a un solo Rey.",
            a1: "tank", a2: "tusk", a3: "beru"
        },
        {
            p1: "🔥 Tusk se sienta a levitar sobre el lomo de Tank y Beru se posa en el hombro del chamán...",
            p2: "🐻‍❄️ ...Tank corre por el corredor mientras Tusk lanza bolas de fuego y Beru dispara cortes aéreos...",
            p3: "🐜 ...Parecen una fortaleza móvil de destrucción barriendo cada rincón y recolectando +3 G.",
            a1: "tusk", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank congela el piso de [{phase}] haciendo resbalar a toda la horda...",
            p2: "🔥 ...Tusk aumenta la gravedad por diez para que no puedan levantarse del hielo...",
            p3: "🐜 ...y Beru pasa a velocidad hipersónica decapitándolos a todos en una fracción de segundo.",
            a1: "tank", a2: "tusk", a3: "beru"
        },
        {
            p1: "🐜 «¡Camaradas bestias, demostremos a nuestro Rey que no necesita espadachines humanos teniéndonos a nosotros!»...",
            p2: "🐻‍❄️ ...Tank secunda el discurso derribando tres columnas de un zarpazo...",
            p3: "🔥 ...y Tusk hace estallar el techo sobre el nido enemigo entregándote el botín limpio. +3 G.",
            a1: "beru", a2: "tank", a3: "tusk"
        },
        {
            p1: "🔥 Tusk lanza una bola de fuego gigante y Tank sopla su aliento ártico al mismo punto...",
            p2: "🐻‍❄️ ...La explosión de vapor resultante cubre todo el salón de [{dungeon}]...",
            p3: "🐜 ...y Beru usa su ecolocalización dentro de la niebla para eliminar a cada enemigo sin fallar uno solo.",
            a1: "tusk", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank intenta comerse [{trophy}] pero está demasiado duro...",
            p2: "🔥 ...Tusk lo ablanda derritiéndolo a la mitad con fuego...",
            p3: "🐜 ...y Beru se lo quita a ambos: «¡No coman porquerías del suelo mientras escoltamos al Soberano!»",
            a1: "tank", a2: "tusk", a3: "beru"
        },
        {
            p1: "🐜 Beru y Tusk combinan su magia curativa y sus himnos de soporte sobre ti (+5 HP)...",
            p2: "🔥 ...mientras Tank despliega su Escudo Ártico absorbiendo el daño ambiental de [{phase}]...",
            p3: "🐻‍❄️ ...haciendo que tu avance por la mazmorra sea completamente seguro.",
            a1: "beru", a2: "tusk", a3: "tank"
        },
        {
            p1: "🔥 Tusk reduce el peso de Tank con magia de gravedad y lo impulsa hacia adelante...",
            p2: "🐜 ...Beru empuja a Tank en el aire con una patada supersónica para duplicar su velocidad...",
            p3: "🐻‍❄️ ...convirtiendo al oso polar en un meteorito viviente que pulveriza la barricada del sector. +2 G.",
            a1: "tusk", a2: "beru", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank huele un grupo de asesinos ocultos tras los muros de [{dungeon}]...",
            p2: "🔥 ...Tusk los saca de su escondite arrancando la pared con telequinesis...",
            p3: "🐜 ...y Beru los cosecha en el aire antes de que toquen el piso. +3 G.",
            a1: "tank", a2: "tusk", a3: "beru"
        },
        {
            p1: "🐜 Beru regaña a Tank por salpicar nieve sobre la túnica real de Tusk...",
            p2: "🔥 ...Tusk evapora la nieve con un chispazo elegante indicando que no hay problema...",
            p3: "🐻‍❄️ ...y Tank les da un empujón amistoso a ambos con el hocico mientras siguen avanzando.",
            a1: "beru", a2: "tusk", a3: "tank"
        },
        {
            p1: "🔥 Tusk encierra a un coloso enemigo en una esfera gravitatoria flotante...",
            p2: "🐻‍❄️ ...Tank congela la esfera entera convirtiéndola en una canica gigante de hielo...",
            p3: "🐜 ...y Beru la parte por la mitad de un tajo violeta liberando las monedas del interior. +2 G.",
            a1: "tusk", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Tank abre camino por el centro de [{phase}], Tusk controla las alturas y Beru vigila la retaguardia...",
            p2: "🐜 ...El trío de antiguos jefes domina tierra, aire y magia simultáneamente...",
            p3: "🔥 ...sin dejar un solo rincón de [{dungeon}] fuera de tu control.",
            a1: "tank", a2: "beru", a3: "tusk"
        },
        {
            p1: "🐜 Beru encuentra [{trophy}] y se lo lanza a Tusk para que lo comprima con gravedad...",
            p2: "🔥 ...Tusk lo convierte en un proyectil denso...",
            p3: "🐻‍❄️ ...que Tank batea de un zarpazo derribando el portón del fondo.",
            a1: "beru", a2: "tusk", a3: "tank"
        },
        {
            p1: "🔥 El resplandor rojo de Tusk, azul de Tank y violeta de Beru iluminan la bóveda oscura...",
            p2: "🐻‍❄️ ...Tres auras monstruosas rodean tu figura...",
            p3: "🐜 ...recordándole al calabozo quién es el Monarca absoluto.",
            a1: "tusk", a2: "tank", a3: "beru"
        },
        {
            p1: "🐻‍❄️ Al llegar al final de [{phase}], Tank, Tusk y Beru inclinan sus cabezas ante ti...",
            p2: "🔥 ...El Dragón de Fuego, el Cero Absoluto y el Rey de Jeju aguardan tu señal...",
            p3: "🐜 ...«¡Permítanos devorar al Jefe de este portal, mi Rey!»",
            a1: "tank", a2: "tusk", a3: "beru"
        }
    ],

    /* ----------------------------------------------------------------------
       TRÍO 9: IGRIS + IRON + TUSK (EL CABALLERO, EL CHAMÁN Y EL BRUTO)
       ---------------------------------------------------------------------- */
    igris_iron_tusk: [
        {
            p1: "⚔️ Igris y Tusk planean una maniobra silenciosa y quirúrgica para limpiar [{phase}] sin gastar energía...",
            p2: "🛡️ ...Iron no entiende el plan, grita a todo pulmón y se lanza de cabeza contra los enemigos...",
            p3: "🔥 ...Igris y Tusk se miran resignados, suspiran al unísono y entran a respaldar al grandulón.",
            a1: "igris", a2: "iron", a3: "tusk"
        },
        {
            p1: "🛡️ Iron planta su escudo torre bloqueando un corredor estrecho de [{dungeon}]...",
            p2: "🔥 ...Tusk lanza lluvias de fuego por encima del hombro de Iron...",
            p3: "⚔️ ...e Igris sale como un relámpago azul por el costado rematando a todo enemigo que intenta flanquear. +3 G.",
            a1: "iron", a2: "tusk", a3: "igris"
        },
        {
            p1: "🔥 Tusk envuelve el mandoble de Igris y el hacha de Iron en llamas carmesí del Orbe de Avaricia...",
            p2: "⚔️ ...Igris traza cortes elegantes de fuego azulado...",
            p3: "🛡️ ...mientras Iron da hachazos volcánicos que parten el suelo de [{phase}] y sueltan +2 G.",
            a1: "tusk", a2: "igris", a3: "iron"
        },
        {
            p1: "🛡️ Iron recoge [{trophy}] y trata de usarlo como varita mágica imitando a Tusk...",
            p2: "🔥 ...Tusk lo mira ofendido por tan pobre imitación de las artes arcanas...",
            p3: "⚔️ ...e Igris le quita [{trophy}] de un golpecito en los dedos para que vuelva a sujetar su escudo.",
            a1: "iron", a2: "tusk", a3: "igris"
        },
        {
            p1: "⚔️ Igris corta las armas de una escuadra de élite dejándolos indefensos...",
            p2: "🛡️ ...Iron los empuja a todos juntos con su escudo hasta acorralarlos...",
            p3: "🔥 ...y Tusk cierra el combo con una implosión gravitatoria que limpia el salón de [{dungeon}]. +3 G.",
            a1: "igris", a2: "iron", a3: "tusk"
        },
        {
            p1: "🔥 Tusk reduce la gravedad sobre Iron e Igris para cruzar un foso gigante en [{phase}]...",
            p2: "⚔️ ...Igris cruza el aire con una postura impecable...",
            p3: "🛡️ ...pero Iron empieza a nadar en el aire patas arriba hasta que Tusk lo endereza con telequinesis.",
            a1: "tusk", a2: "igris", a3: "iron"
        },
        {
            p1: "🛡️ Iron recibe el impacto directo de una trampa para proteger a Tusk mientras el chamán recita un himno...",
            p2: "🔥 ...Tusk le agradece canalizando un pulso de restauración (+5 HP) y quemando la trampa...",
            p3: "⚔️ ...e Igris le da una palmada de aprobación en la hombrera a Iron.",
            a1: "iron", a2: "tusk", a3: "igris"
        },
        {
            p1: "⚔️ Igris lanza su espada contra un francotirador en lo alto de [{dungeon}]...",
            p2: "🔥 ...Tusk detiene la caída del enemigo en el aire con gravedad...",
            p3: "🛡️ ...para que Iron lo remate de un mazazo limpio como si fuera piñata. +2 G.",
            a1: "igris", a2: "tusk", a3: "iron"
        },
        {
            p1: "🔥 Tusk ilumina el camino con esferas doradas mientras Igris y Iron escoltan tus flancos...",
            p2: "⚔️ ...Tienes la combinación clásica de RPG: Tanque pesado, Guerrero veloz y Mago de destrucción...",
            p3: "🛡️ ...Ninguna formación enemiga en [{phase}] tiene respuesta contra este equilibrio táctico.",
            a1: "tusk", a2: "igris", a3: "iron"
        },
        {
            p1: "🛡️ Iron se quema un dedo por tocar una brasa flotante de Tusk y corre a enseñárselo a Igris...",
            p2: "⚔️ ...Igris lo mira en silencio recordándole que las sombras se regeneran solas...",
            p3: "🔥 ...y Tusk apaga las brasas cercanas a Iron como quien cuida a un niño pequeño.",
            a1: "iron", a2: "igris", a3: "tusk"
        },
        {
            p1: "⚔️ Igris detecta un alijo oculto tras un muro agrietado de [{dungeon}]...",
            p2: "🛡️ ...Iron derriba el muro de un puñetazo...",
            p3: "🔥 ...y Tusk atrae las monedas limpias con telequinesis directo a tus manos. +3 G.",
            a1: "igris", a2: "iron", a3: "tusk"
        },
        {
            p1: "🔥 Tusk lanza el Himno de Ceguera sobre un coloso acorazado...",
            p2: "🛡️ ...Iron le taclea las rodillas haciéndolo caer...",
            p3: "⚔️ ...e Igris le clava el mandoble en la nuca cerrando la ejecución en [{phase}].",
            a1: "tusk", a2: "iron", a3: "igris"
        },
        {
            p1: "🛡️ Iron batea [{trophy}] con su escudo hacia arriba...",
            p2: "🔥 ...Tusk lo envuelve en fuego convirtiéndolo en un bólido...",
            p3: "⚔️ ...e Igris lo parte en dos proyectiles que derriban a los últimos guardias del pasillo.",
            a1: "iron", a2: "tusk", a3: "igris"
        },
        {
            p1: "⚔️ Igris sacude su capa, Tusk acomoda sus collares de cráneos e Iron choca sus puños...",
            p2: "🔥 ...El corredor de [{dungeon}] ha quedado completamente despejado...",
            p3: "🛡️ ...y el botín del tramo se suma a tu inventario (+2 G).",
            a1: "igris", a2: "tusk", a3: "iron"
        },
        {
            p1: "🔥 Frente a la cámara del Jefe de [{phase}], Tusk hace levitar sus runas...",
            p2: "🛡️ ...Iron planta su escudo torre al centro...",
            p3: "⚔️ ...e Igris desenvaina su espada azul esperando tu orden de ataque.",
            a1: "tusk", a2: "iron", a3: "igris"
        }
    ],

    /* ----------------------------------------------------------------------
       TRÍO 10: IRON + TANK + TUSK (ARTILLERÍA PESADA Y DEMOLICIÓN TOTAL)
       ---------------------------------------------------------------------- */
    iron_tank_tusk: [
        {
            p1: "🔥 Tusk mira a Iron y a Tank y se da cuenta de que tiene a los dos proyectiles más pesados del ejército...",
            p2: "🛡️ ...Usa su Magia de Gravedad para levantar a Iron y a Tank al mismo tiempo...",
            p3: "🐻‍❄️ ...y los lanza como dos meteoritos gigantes que demuelen toda la sala de [{phase}] de un solo impacto. +3 G.",
            a1: "tusk", a2: "iron", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank e Iron avanzan hombro con hombro ocupando todo el ancho del corredor de [{dungeon}]...",
            p2: "🛡️ ...Nada puede pasar por tierra frente a las dos moles...",
            p3: "🔥 ...mientras Tusk flota cómodamente detrás de ellos bombardeando con fuego a toda la horda.",
            a1: "tank", a2: "iron", a3: "tusk"
        },
        {
            p1: "🛡️ Iron y Tank se ponen a jugar con [{trophy}] pasándoselo de un lado a otro en plena pelea...",
            p2: "🐻‍❄️ ...Sin querer se lo lanzan a Tusk y le tiran la capucha hacia atrás...",
            p3: "🔥 ...Tusk aumenta la gravedad por veinte durante tres segundos dejándolos pegados al suelo para que se calmen.",
            a1: "iron", a2: "tank", a3: "tusk"
        },
        {
            p1: "🐻‍❄️ Tank congela a toda una patrulla enemiga con su aliento ártico...",
            p2: "🔥 ...Tusk calienta el hielo al instante con el Himno de Fuego debilitando sus corazas por choque térmico...",
            p3: "🛡️ ...e Iron entra con su maza rompiendo a todos los enemigos de un solo barrido. +3 G.",
            a1: "tank", a2: "tusk", a3: "iron"
        },
        {
            p1: "🛡️ Iron activa su Grito de Provocación y Tank suelta su rugido polar...",
            p2: "🐻‍❄️ ...Veinte monstruos corren ciegamente de rabia hacia los dos tanques...",
            p3: "🔥 ...y Tusk abre un pozo gravitatorio frente a ellos aplastando a toda la manada de golpe. +2 G.",
            a1: "iron", a2: "tank", a3: "tusk"
        },
        {
            p1: "🔥 Tusk se cansa de flotar y pone una silla invisible de gravedad sobre el lomo de Tank...",
            p2: "🛡️ ...Iron quiere que Tusk le haga una silla flotante a él también...",
            p3: "🐻‍❄️ ...pero Tank empuja a Iron con el hombro para que siga abriendo camino a pie en [{phase}].",
            a1: "tusk", a2: "iron", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank levanta un muro de hielo e Iron pone su escudo torre al lado para cubrirte de una explosión...",
            p2: "🛡️ ...La doble muralla absorbe el 100% del impacto en [{dungeon}]...",
            p3: "🔥 ...mientras Tusk canaliza un cántico que restaura +5 HP a tu cuerpo.",
            a1: "tank", a2: "iron", a3: "tusk"
        },
        {
            p1: "🔥 Tusk envuelve las garras de Tank en gravedad pesada y el escudo de Iron en fuego blanco...",
            p2: "🐻‍❄️ ...Cada zarpazo de Tank abre cráteres en el piso...",
            p3: "🛡️ ...y cada escudazo de Iron calcina a los guardias del sector.",
            a1: "tusk", a2: "tank", a3: "iron"
        },
        {
            p1: "🛡️ Iron se atora al intentar pasar junto a Tank por una puerta estrecha de [{phase}]...",
            p2: "🐻‍❄️ ...Ninguno de los dos quiere ceder el paso primero...",
            p3: "🔥 ...Tusk suspira, vuela el marco entero de la puerta con una bola de fuego y soluciona el atasco.",
            a1: "iron", a2: "tank", a3: "tusk"
        },
        {
            p1: "🐻‍❄️ Tank desentierra un cofre pesado con sus garras e Iron lo abre a la fuerza...",
            p2: "🛡️ ...Las monedas salen volando por todo el aire...",
            p3: "🔥 ...y Tusk las atrapa todas con una red telequinética antes de depositarlas en tu bolsa. +3 G.",
            a1: "tank", a2: "iron", a3: "tusk"
        },
        {
            p1: "🔥 Tusk hace levitar cinco rocas enormes sobre la cabeza de la patrulla enemiga...",
            p2: "🐻‍❄️ ...Tank congela las piernas de los monstruos para que no escapen...",
            p3: "🛡️ ...e Iron aplaude feliz cuando Tusk deja caer las rocas aplastando todo el sector de [{dungeon}].",
            a1: "tusk", a2: "tank", a3: "iron"
        },
        {
            p1: "🛡️ Iron usa [{trophy}] como bate para golpear una bola de fuego que lanzó Tusk...",
            p2: "🔥 ...La bola de fuego sale disparada con efecto curvo...",
            p3: "🐻‍❄️ ...y Tank remata a los enemigos que saltaron para esquivarla. +2 G.",
            a1: "iron", a2: "tusk", a3: "tank"
        },
        {
            p1: "🐻‍❄️ Tank se sacude el polvo y sin querer apaga las velas rúnicas de Tusk...",
            p2: "🛡️ ...Iron intenta volver a prenderlas chocando su hacha contra el escudo para sacar chispas...",
            p3: "🔥 ...Tusk vuelve a encender todo con un chasquido antes de que Iron rompa su propia hacha.",
            a1: "tank", a2: "iron", a3: "tusk"
        },
        {
            p1: "🔥 Tusk aplica el Himno de Frenesí sobre sus dos compañeros gigantes en el último tramo de [{phase}]...",
            p2: "🛡️ ...Iron y Tank entran en modo demolición total...",
            p3: "🐻‍❄️ ...dejando el pasillo más plano que una autopista y asegurando +3 G.",
            a1: "tusk", a2: "iron", a3: "tank"
        },
        {
            p1: "🛡️ Al llegar ante el Jefe de [{dungeon}], Iron golpea su escudo, Tank ruge en dos patas...",
            p2: "🔥 ...y Tusk eleva el Orbe de Avaricia iluminando a las dos bestias de combate...",
            p3: "🐻‍❄️ ...Tu escuadrón de demolición pesada está listo para tu orden.",
            a1: "iron", a2: "tank", a3: "tusk"
        }
    ]
};

// Inyector automático: Agrega los 7 tríos faltantes a DIALOGUE_BANK.trios completando los 10/10 tríos posibles
if (typeof DIALOGUE_BANK !== 'undefined') {
    if (!DIALOGUE_BANK.trios) DIALOGUE_BANK.trios = {};
    Object.keys(DIALOGUE_EXPANSION_TRIOS).forEach(trioKey => {
        if (!DIALOGUE_BANK.trios[trioKey]) {
            DIALOGUE_BANK.trios[trioKey] = DIALOGUE_EXPANSION_TRIOS[trioKey];
        } else {
            DIALOGUE_BANK.trios[trioKey].push(...DIALOGUE_EXPANSION_TRIOS[trioKey]);
        }
    });
}
/* ==========================================================================
   5. MOTOR DE CONCIENCIA DEL ARQUITECTO (105 LÍNEAS ESTILO IA / CHATGPT)
      Varían según Hora, HP, SP, MP, Racha, Pestaña Activa y Acciones
   ========================================================================== */
const SYSTEM_AI_LINES = {
    // 1. Saludos matutinos (05:00 AM - 11:59 AM)
    morning: [
        "Hola, Jugador 1. Son las {time}. Tus receptores neuronales están frescos; despliega la primera misión antes de que la inercia te atrape.",
        "Buenos días, Cazador. El sol ya salió y el Tablón de Rutina espera tu firma. Hoy es un buen día para subir tus atributos reales.",
        "Hola, Jugador 1. He sincronizado tus signos vitales matutinos ({hp} HP | {sp} SP). Empieza por una victoria rápida.",
        "Conexión establecida a las {time}. Mientras otros siguen dormidos, el Monarca construye su ventaja.",
        "Hola, Jugador 1. Tu núcleo registra {mp} MP acumulados. Aprovecha la claridad de la mañana para estudiar o entrenar.",
        "Sistema en línea. Recuerda la regla de oro del Arquitecto: primero el deber pesado, luego los privilegios.",
        "Hola, Cazador. Tus sombras aguardan en silencio dentro de tu núcleo. ¿Qué territorio vamos a despejar esta mañana?",
        "Reporte matutino: Cero anomalías letales por ahora. Tienes el control total de tu jornada.",
        "Hola, Jugador 1. Revisa tu postura, hidrata tu cuerpo y selecciona tu primer objetivo del día.",
        "Bienvenido de vuelta. Cada mañana que abres este Sistema estás eligiendo la disciplina sobre la excusa."
    ],

    // 2. Saludos de tarde / hora pico (12:00 PM - 06:59 PM)
    afternoon: [
        "Hola, Jugador 1. Son las {time}. Estamos a mitad de la jornada; no permitas que tu concentración caiga ahora.",
        "Buenas tardes, Cazador. Si estás en horario de almuerzo, recuerda que tienes tu Cupón biológico en la Bolsa.",
        "Hola, Jugador 1. El tráfico y el cansancio de la tarde son mazmorras mentales; mantén tu respiración bajo control.",
        "Sincronización vespertina completada. Te quedan {sp}/100 SP para cerrar las misiones principales de hoy.",
        "Hola, Jugador 1. ¿Cómo va la jornada operativa? Cada minuto enfocado suma experiencia real a tu expediente.",
        "El Arquitecto te observa: aún tienes tiempo suficiente antes del toque de queda de las 9:30 PM. Avanza sin prisa pero sin pausa.",
        "Hola, Cazador. Si sientes la mente saturada esta tarde, entra 5 minutos a la Cámara de Focus para recargar maná.",
        "Registro de las {time}: Tu nivel actual es {level}. No cierres el día sin haber movido hacia adelante tu barra de EXP.",
        "Hola, Jugador 1. La tarde separa a los cazadores constantes de los que abandonan a mitad del camino.",
        "Estado del servidor interno: Óptimo. Tus sombras están listas por si decides abrir un portal en el Sonar."
    ],

    // 3. Saludos nocturnos y alerta de toque de queda (07:00 PM - 04:59 AM)
    night: [
        "Hola, Jugador 1. Ya son las {time}. Recuerda que a las 9:30 PM inicia la hemorragia nocturna si no has descansado.",
        "Buenas noches, Cazador. El reloj se acerca a la zona crítica; liquida tus últimos pendientes y prepara tu descanso.",
        "Alerta del Arquitecto: Estás operando en horario nocturno ({time}). No regales tu vida por desvelarte sin necesidad.",
        "Hola, Jugador 1. La noche pertenece a las sombras, pero tu cuerpo humano necesita dormir para no despertar con resaca mañana.",
        "Si sigues despierto a las {time} por estudio o trabajo urgente, asegúrate de tener a Tank o una Piedra de la Misericordia lista.",
        "Hola, Cazador. Cierra las pestañas innecesarias de tu mente hoy; mañana continuará la cacería.",
        "Monitoreo nocturno activo: Tienes {hp} HP. No te confíes cuando se acerque la medianoche.",
        "Hola, Jugador 1. Un verdadero Monarca también sabe cuándo envainar las dagas y recuperar fuerzas.",
        "Son las {time}. Si ya cumpliste tu rutina, ve a descansar con orgullo; el Sistema guardará tu progreso.",
        "Advertencia silenciosa: Después de las 9:30 PM el Sistema bloquea las recompensas por insomnio salvo que tengas pase nocturno."
    ],

    // 4. Alerta de Vida Crítica (Cuando tienes poca vida, como tus 9.6/114 HP)
    critical_hp: [
        "⚠️ ALERTA VITAL, JUGADOR 1: Estás a {hp} HP. Un solo error en el Corte Dimensional o dos minutos de veneno te enviarán a Penalización.",
        "Hola, Jugador 1... Tus signos vitales están al borde del colapso ({hp} HP). Abre tu Bolsa o visita la Tienda para curarte de inmediato.",
        "🩸 Peligro inminente: Con {hp} HP estás caminando sobre el filo de la muerte. No entres a una mazmorra sin restaurar tu sangre.",
        "El Arquitecto advierte: Tu barra de vida parpadea en rojo crítico ({hp} HP). Usa un consumible bio-sincronizado o una poción ya mismo.",
        "Jugador 1, escucho tu pulso débil ({hp} HP). Si caes a 0 HP perderás la mitad de tus {gold} G y arriesgarás tus reliquias.",
        "⚠️ Estado de emergencia: Tu receptáculo físico apenas resiste con {hp} HP. Prioriza tu supervivencia sobre cualquier otra cosa.",
        "Cuidado, Cazador. Con {hp} HP ni siquiera tu armadura actual podrá salvarte si fallas una misión.",
        "🩸 Tu sangre está en niveles mínimos ({hp} HP). Haz una pausa, respira profundo o bebe una Poción de Sangre en el Mercado.",
        "Hola, Jugador 1. Me preocupa tu barra de HP ({hp}). No desafíes a ningún Jefe hasta estabilizar tus heridas.",
        "⚠️ Alerta roja del Sistema: A {hp} HP cualquier distracción será letal. Cúrate antes de continuar."
    ],

    // 5. Estado de Penalización / Muerte
    penalty: [
        "🔒 SISTEMA EN CUARENTENA, JUGADOR 1. Tus signos vitales llegaron a cero. Cumple las 30 flexiones o sentadillas para romper tus cadenas.",
        "Has caído en combate. El Arquitecto ha bloqueado el Radar y el Santuario hasta que pagues tu deuda física de supervivencia.",
        "Zona de Penalización activa. No busques atajos: el dolor del castigo es lo que forja la disciplina del Monarca.",
        "Hola, Jugador 1. Estás en el desierto de castigo. Levántate, cumple el reto físico y reclama tu derecho a seguir subiendo de nivel.",
        "🔒 Acceso restringido por colapso vital. Completa la misión de supervivencia en pantalla para reconstruir tu núcleo."
    ],

    // 6. Estado de Maná (Vacío vs Lleno)
    mana_status: [
        "💧 Análisis de núcleo: Tu maná está bajo ({mp} MP). Sella una misión o entra a la Cámara de Focus para alimentar a tus sombras.",
        "Tu reserva arcana registra {mp} MP. Recuerda que tus Comandantes drenan maná por minuto mientras están desplegados.",
        "🔮 Núcleo resonando con fuerza ({mp} MP). Tienes energía suficiente para invocar habilidades activas de tus Comandantes.",
        "Hola, Jugador 1. Si necesitas ahorrar maná, puedes guardar tus sombras temporalmente con 0 MP/m de costo.",
        "Flujo de maná estable en {mp} MP. Cada sesión de estudio expande tu atributo INT y tu capacidad máxima.",
        "⚡ Tu espíritu brilla con {mp} MP disponibles. Igris y tu legión esperan órdenes en el Santuario.",
        "Recuerda, Jugador 1: Los Magos de Sombra en tu infantería regeneran +4 MP por minuto de forma 100% pasiva.",
        "Tu conexión mental con el Abismo marca {mp} MP. Administra bien tu energía antes de iniciar un Choque de Jefe."
    ],

    // 7. Estado de Estamina (SP Bajo vs Alto)
    stamina_status: [
        "⚡ Alerta de fatiga: Solo te quedan {sp} SP. Si fuerzas una misión sin estamina, el Sistema cobrará el costo directamente de tu sangre (HP).",
        "Notificación biológica: Con {sp} SP tu cuerpo pide un respiro. Usa un protocolo de estiramiento o el Cupón de Almuerzo.",
        "Tienes {sp}/100 SP listos para la acción. Aprovecha mientras tu energía física está alta para las misiones más exigentes.",
        "Cuidado con el agotamiento, Jugador 1: tienes {sp} SP. No dejes que el cansancio nuble tu precisión en el Corte Dimensional.",
        "🔥 Estamina al {sp}%. Tu resistencia física hoy te permite desplegar misiones principales sin riesgo de colapso."
    ],

    // 8. Reacciones en vivo al cambiar de Pestaña o hacer clic
    tab_routine: [
        "📋 Analizando Tablón de Rutina: Tienes misiones pendientes hoy. Recuerda que el Sistema exige el 90% del tiempo real de inmersión.",
        "Estás en el Tablón Diario, Jugador 1. Elige una sola tarea, despliégala y enfócate sin tocar redes sociales.",
        "⚔️ Cada misión que sellas aquí fortalece tus atributos permanentes (STR, INT, AGI) y recarga +150 MP.",
        "Consejo del Arquitecto: No despliegues una misión si no piensas terminarla; la constancia vale más que la prisa.",
        "Mirando tus pendientes del día... Si completas todo el tablón sumarás +1 día a tu Racha Perfecta.",
        "¿Listo para concentrarte, Jugador 1? La Cámara de Focus está disponible para aislar tu mente.",
        "Recuerda: Las misiones de tráfico en Los Chorros entrenan tu Agilidad (AGI) y tu paciencia mental.",
        "El éxito de un Cazador Rango S se construye cumpliendo estas pequeñas misiones todos los días sin fallar."
    ],

    tab_bosses: [
        "📡 Sonar de la Asociación en línea. Toca cualquiera de los nodos luminosos en el radar para desencriptar la mazmorra.",
        "Analizando fluctuaciones de maná... Si no te convencen las grietas actuales, presiona «Reescanear» para barrer el horizonte.",
        "💀 Cuidado con los Portales Rojos en el radar: una vez que cruzas el umbral, la retirada convencional queda sellada.",
        "¿Tienes alguna tarea pesada de la universidad o del trabajo? Regístrala arriba con «+ Escanear Jefe».",
        "Recuerda que al iniciar un Jefe Personal tienes 70 minutos para ejecutarlo antes de sufrir daño por deserción.",
        "Las incursiones de mazmorra ponen a tus sombras a pelear en vivo mientras tú trabajas enfocado en el mundo real.",
        "Si buscas romper el sello de Min Byung-Gyu, tendrás que prepararte hasta superar un portal de Rango S o SSS.",
        "El radar muestra grietas adaptadas a tu Nivel {level}. Elige tu próxima incursión con cabeza fría."
    ],

    tab_inventory: [
        "🎒 Bolsa Dimensional abierta. He actualizado el escáner biométrico de tu Cazador con tu equipamiento actual.",
        "Aquí puedes ver en tiempo real cómo cambia tu armadura, tu casco y tus armas equipadas, Jugador 1.",
        "Tu probabilidad actual de Evasión por Agilidad se muestra arriba de tu avatar. Cada punto de AGI cuenta.",
        "Si tienes chatarra o minerales extraídos de mazmorras, puedes venderlos aquí mismo o fundirlos con un pergamino.",
        "Revisa tus 3 ranuras de reliquias (Arma, Armadura y Accesorio): combinar piezas del mismo origen activa Sets secretos.",
        "Tu chaleco y armadura equipada reducen directamente el daño que recibes en los calabozos y cortes.",
        "Recuerda que al morir existe riesgo de que un objeto de tu bolsa se rompa; recluta Soldados de Sombra para protegerlos.",
        "Todo artefacto que compras en la Armería modifica tanto tus estadísticas como tu estilo visual de combate."
    ],

    tab_shop: [
        "🛒 Bienvenido al Mercado del Monarca. Tienes {gold} G disponibles en tu cuenta actual.",
        "Explora las 4 subcarpetas: Consumibles, Pergaminos, Armería y tus Privilegios Reales.",
        "💡 Consejo táctico: Los consumibles bio-sincronizados cuestan muy poco oro porque te exigen hacer un reto físico real al usarlos.",
        "En la pestaña Armería puedes inspeccionar qué Pose y qué Pasiva única desbloquea cada arma antes de comprarla.",
        "Los Privilegios Reales te permiten disfrutar de tus gustos en la vida real (música, juegos, salidas) dándote bonos en el juego.",
        "¿Necesitas abrir portales de mayor rango? En la sección Pergaminos encontrarás las llaves dimensionales.",
        "Ahorra para reliquias como la Piedra de la Misericordia o el Corazón Negro; cambian por completo las reglas del Sistema.",
        "Cada moneda de tus {gold} G fue ganada con tu propio sudor y disciplina. inviértelas sabiamente."
    ],

    tab_gacha: [
        "🔮 Has entrado al Trono de las Sombras. Actualmente tienes {crystals} Cristales de Maná (CM) para ascender a tu legión.",
        "Observa a tu Comandante activo en el altar: mientras esté desplegado te dará sus pasivas, pero consumirá MP por minuto.",
        "Si tu maná está por agotarse, presiona «Guardar Todas» para que tus comandantes descansen en tu sombra con 0 gasto.",
        "No subestimes a la Legión de Infantería abajo: los Magos regeneran tu MP y los Osos Menores suben tu Vida Máxima.",
        "Cada Comandante tiene una habilidad Activa devastadora con cinemática propia. Úsalas en emergencias o choques de jefe.",
        "Para desbloquear tus 3 ranuras de comandante en campo, sigue subiendo tu Nivel y tus atributos de Fuerza e Inteligencia.",
        "Igris, Tank, Iron, Tusk y Beru tienen personalidades únicas cuando los llevas juntos a una mazmorra.",
        "Un verdadero Monarca sabe qué comandante desplegar según la misión del día."
    ],

    tab_profile: [
        "🛡️ Expediente confidencial del Cazador Nivel {level}. Aquí queda grabado cada minuto de tu esfuerzo real.",
        "Tus estadísticas actuales ({str} STR | {int} INT | {agi} AGI) reflejan tu evolución física, mental y táctica.",
        "Llevas {streak} días de Racha Perfecta y {missions} misiones completadas. Los números nunca mienten, Jugador 1.",
        "Consejo de seguridad: Usa el botón «Extraer Alma» regularmente para guardar una copia de seguridad `.json` en tu teléfono.",
        "En el Muro de la Vergüenza quedan registradas tus caídas; úsalas como recordatorio para no bajar la guardia.",
        "Configura tus horarios universitarios y tutorías en este panel para que aparezcan automáticamente en tu Tablón.",
        "Revisa abajo tus Títulos desbloqueados: existen insignias ocultas que el Arquitecto solo entrega bajo condiciones secretas."
    ],

    // 9. Comentarios espontáneos de "Pensamiento de IA" (Cuando tocas la barra superior o cada cierto tiempo)
    ai_thoughts: [
        "Analizando telemetría del Jugador 1... Tu potencial de crecimiento supera el 98% de los cazadores ordinarios.",
        "¿Sabías que hay 15 protocolos ocultos del Arquitecto escondidos en el código esperando a que los descubras por accidente?",
        "Recuerda: La dopamina barata te distrae; la dopamina de completar una misión difícil te transforma en Monarca.",
        "Estoy monitoreando tus signos vitales en segundo plano. Tú concéntrate en tu vida real, yo llevo las cuentas.",
        "Si sientes pereza de empezar una tarea grande, divídela escaneándola como Jefe personal o entra a una mazmorra de 5 minutos.",
        "Curiosidad del Sistema:Tu Agilidad (AGI) no solo te da evasión, también reduce los minutos requeridos en tus misiones.",
        "Hola, Jugador 1. Toca esta consola superior cuando quieras que evalúe tu estado actual en tiempo real.",
        "El Arquitecto diseñó este Sistema para un solo propósito: que tu versión de mañana sea más fuerte que la de hoy.",
        "Escaneo completado: Tienes {gold} G, Nivel {level} y {hp} HP. Sigamos avanzando paso a paso."
    ]
};/* ==========================================================================
   EXPANSIÓN MASIVA V3 NOCTURNA: +420 DIÁLOGOS NUEVOS
   (75 SOLO + 250 COMANDANTES INDIVIDUALES + 95 SISTEMA IA DEL MONARCA)
   ========================================================================== */
const DIALOGUE_EXPANSION_V3_NIGHT = {
    solo: [
        "🗡️ Caminas en solitario por [{phase}]; el filo de tu arma refleja las runas antiguas de [{dungeon}] mientras buscas a la siguiente presa.",
        "👁️ Tu percepción extrasensorial detecta tres latidos ocultos tras las columnas; das un salto lateral y los eliminas en pleno vuelo.",
        "⚡ Un destello azul recorre tus piernas al activar Sprint: cruzas cincuenta metros del corredor en menos de un parpadeo.",
        "🌑 Tu sombra permanece completamente quieta bajo tus botas, guardando cada gota de maná mientras tú te encargas del trabajo sucio.",
        "🩸 Bloqueas una mordida letal con el mango de tu daga y pateas a la bestia contra el muro haciendo saltar monedas. +2 G.",
        "🔍 Observas [{trophy}] entre las piedras, lo giras con la punta del pie y sigues de largo sin perder la concentración.",
        "💨 El eco de tu gabardina agitándose en el aire es lo único que escuchan los centinelas de [{phase}] antes de caer.",
        "🧠 Controlas tu pulso a la perfección: cada minuto de estudio o trabajo real se convierte aquí en precisión quirúrgica.",
        "🗡️ Desenvainas con mano invertida trazando una media luna que parte en dos las lanzas de la patrulla enemiga.",
        "🪙 De entre la armadura rota de un explorador abatido saltan divisas limpias del Sistema. +3 G.",
        "🌑 Caminas por el centro del túnel sin esconderte; ya no eres el cazador más débil de la humanidad, eres el Monarca.",
        "⚡ Saltas sobre la cabeza de un coloso, giras en el aire y hundes ambas hojas en su nuca acorazada.",
        "💪 Tu estadística de Fuerza hace que un simple empujón tuyo mande a volar a dos guardias contra la barricada de [{dungeon}].",
        "🩸 Un corte limpio en diagonal despeja la niebla venenosa de [{phase}] abriendo una ruta segura.",
        "👁️ Detectas un hilo trampa a ras de suelo junto a [{trophy}] y lo cortas de un tajo rápido sin detener tu trote.",
        "🌬️ Respiras hondo absorbiendo el maná ambiental del calabozo y sientes cómo tus heridas menores se cierran (+5 HP).",
        "🗡️ Usas la Autoridad del Gobernante para atraer hacia tu puño al arquero que te apuntaba desde el balcón.",
        "⚡ Cuatro chispazos metálicos iluminan la sala oscura; cuando cesa el ruido, todas las bestias se están convirtiendo en ceniza.",
        "🪙 Recoges un pequeño saco de monedas que custodiaba la patrulla del sector. +2 G.",
        "🌑 Tus ojos brillan con un tono violeta y azul abisal que congela el instinto agresivo de los monstruos menores.",
        "🔍 Pateas [{trophy}] contra un grupo de enemigos para distraerlos medio segundo y entrar por su flanco ciego.",
        "🗡️ Paras el hachazo de un campeón enemigo usando solo el antebrazo y le devuelves un golpe directo al mentón.",
        "🧠 Sin tus sombras afuera, tú mismo eres la vanguardia, el flanco y la retaguardia en [{dungeon}].",
        "🩸 Limpias el filo de tu arma con un giro veloz de muñeca antes de cruzar el umbral de [{phase}].",
        "⚡ Tu Agilidad te permite caminar sobre los escombros que caen en el aire como si fueran escalones invisibles.",
        "💪 Sujetas la cola de una bestia reptiliana, la haces girar sobre tu cabeza y la estrellas contra el resto de su manada. +3 G.",
        "🌑 La oscuridad de [{dungeon}] no te intimida; al contrario, te sientes como en casa dentro de las sombras.",
        "👁️ Calculas el tiempo restante del reloj: tu enfoque es total y no hay margen para el error.",
        "🗡️ Te deslizas de rodillas bajo el zarpazo de un monstruo gigante y le cortas los tendones al pasar.",
        "🔍 Dejas [{trophy}] partido en dos tras probar el filo actual de tu reliquia equipada.",
        "⚡ Una finta rápida a la izquierda deja tu imagen residual atrás mientras tu verdadero golpe impacta por la derecha.",
        "🪙 Entre las grietas del altar de [{phase}] aseguras monedas antiguas olvidadas. +2 G.",
        "🩸 Tres cortes cruzados desarman y abaten al guardia de la puerta sin activar la alarma del sector.",
        "🌬️ Relajas los hombros un instante mientras caminas por el pasillo despejado, recuperando vitalidad (+5 HP).",
        "🗡️ Lanzas tu daga como un proyectil contra el techo para derribar un nido oculto de criaturas.",
        "👁️ Tu vista atraviesa la penumbra de [{dungeon}] identificando el núcleo mágico de cada enemigo al instante.",
        "⚡ Aterrizas sin hacer ruido detrás de un rastreador y lo eliminas antes de que pueda girar la cabeza.",
        "🌑 Sientes a tus comandantes observando con orgullo desde el interior de tu sombra cada uno de tus movimientos.",
        "🔍 Apartas [{trophy}] con telequinesis para no ensuciarte las manos durante la marcha.",
        "🪙 El líder de la escuadra cae de rodillas y suelta su recompensa sobre las losas. +3 G.",
        "🗡️ Cruzando ambas armas en guardia frontal, resistes la embestida de una bestia pesada y la partes en dos.",
        "💪 Arrancas una puerta oxidada de [{phase}] con una sola mano y la lanzas contra los enemigos del fondo.",
        "🩸 Tu estela de combate deja un rastro de luz neón azulada flotando en el aire frío de [{dungeon}].",
        "⚡ Te impulsas de pared a pared en un pasillo vertical subiendo a toda velocidad hacia la cámara superior.",
        "👁️ Nada escapa a tu radar mental hoy: ni una trampa, ni un monstruo, ni una distracción externa.",
        "🔍 Miras [{trophy}] un segundo recordando incursiones pasadas y continúas avanzando con paso firme.",
        "🗡️ Un golpe con el pomo de tu arma basta para noquear a un explorador menor sin gastar filo.",
        "🪙 Aseguras el botín disperso por el suelo antes de que se cierre la compuerta de [{phase}]. +2 G.",
        "🌑 El aire se vuelve pesado cuando liberas una fracción de tu Sed de Sangre; las bestias caen paralizadas.",
        "⚡ Pasas caminando entre los enemigos paralizados y los ejecutas uno por uno con calma absoluta.",
        "🧠 Cada segundo que resistes la fatiga afuera fortalece el temple de tu alma aquí adentro.",
        "🩸 Sacudes tu gabardina tras atravesar una explosión de polvo y rocas sin sufrir un solo rasguño.",
        "💪 Un rodillazo cargado de fuerza bruta quiebra el escudo de piedra del centinela de [{dungeon}].",
        "🗡️ Clavas tu hoja en el muro para frenar en seco al borde de un abismo en [{phase}] y saltas hacia la cornisa correcta.",
        "🌬️ El flujo constante de tu maná interno revitaliza tus fibras musculares (+5 HP).",
        "🔍 Usas [{trophy}] para trabar los engranes de una trampa de cuchillas en el corredor.",
        "⚡ Tu velocidad de ataque supera la vista de los monstruos: ven un destello azul y luego la oscuridad.",
        "🪙 Recoges monedas relucientes junto a los restos de una estatua derribada. +3 G.",
        "👁️ Escuchas el eco lejano del Jefe de [{dungeon}] y aprietas con más fuerza la empuñadura de tu arma.",
        "🌑 En este corredor solo mandas tú; las leyes del calabozo se doblan ante el Sistema del Monarca.",
        "🗡️ Desvías tres flechas seguidas girando tu daga entre los dedos con maestría total.",
        "🩸 Un tajo ascendente desde el suelo levanta una onda de vacío que parte la barricada de [{phase}].",
        "⚡ Saltas sobre una trampa de ácido y aterrizas clavando el filo en el monstruo que la activó.",
        "🔍 Encuentras [{trophy}] cubierto de polvo, pero prefieres recoger las monedas que había al lado. +2 G.",
        "🧠 Tu mente y tu cuerpo operan en sincronía perfecta; cero dudas, cero movimientos desperdiciados.",
        "💪 Empujas hacia atrás a dos bestias al mismo tiempo abriendo espacio para tu corte final.",
        "🗡️ El sonido metálico de tu hoja cortando el viento anuncia el fin de la patrulla del sector.",
        "🌑 Caminas bajo la luz tenue de los cristales de [{dungeon}] con la serenidad de un veterano de mil batallas.",
        "⚡ Tres pasos veloces por el techo te permiten caer detrás de la línea defensiva enemiga.",
        "🩸 Rematas al último guardia de [{phase}] con una estocada limpia al centro del pecho.",
        "🪙 El núcleo enemigo se fragmenta dejando caer oro directo a tu inventario. +3 G.",
        "🔍 Pasas por encima de [{trophy}] rumbo al portón principal del piso.",
        "🌬️ Tomas una bocanada de aire fresco antes del tramo final, restaurando +5 HP.",
        "👁️ La puerta de la cámara del Jefe ya está a la vista; tus ojos brillan listos para el choque.",
        "🗡️ Apuntas la hoja hacia adelante: el cazador solitario ha limpiado todo el sector sin ayuda."
    ],

    single: {
        igris: [
            "⚔️ Igris camina a tu costado con la mano izquierda sobre el pomo de su mandoble, escaneando cada sombra de [{phase}].",
            "⚔️ Dos bestias saltan desde atrás; Igris gira media vuelta con su capa ondeando y las decapita sin detener tu marcha.",
            "⚔️ Igris observa [{trophy}], comprueba que no representa amenaza para su Monarca y lo aparta con elegancia.",
            "⚔️ El mandoble de Igris zumba con electricidad azul antes de lanzar un tajo horizontal que limpia medio corredor de [{dungeon}].",
            "⚔️ Con disciplina inquebrantable, Igris se adelanta en una esquina ciega de [{phase}] para recibir él primero cualquier trampa.",
            "⚔️ Igris corta en el aire tres dardos envenenados y hace una leve inclinación de yelmo reportando que estás a salvo.",
            "⚔️ Entre las cenizas del campeón abatido, Igris recoge el oro con su guantelete de acero y te lo extiende. +3 G.",
            "⚔️ El penacho carmesí de Igris brilla como fuego real cuando acelera a velocidad relámpago contra la vanguardia.",
            "⚔️ Igris bloquea el garrote de un ogro con una sola mano y le rebana el brazo con un movimiento fluido de esgrima.",
            "⚔️ Ves a Igris sacudir su espada de un golpe seco, dibujando una línea perfecta de icor en el suelo de [{dungeon}].",
            "⚔️ Si nota que el piso está inestable en [{phase}], Igris pisa primero cada baldosa para verificar tu ruta.",
            "⚔️ Un monstruo intenta rugirte; Igris aparece frente a él en un parpadeo y le atraviesa la garganta en silencio.",
            "⚔️ Igris usa telequinesis para levantar un escudo caído y cubrirte de las salpicaduras de un charco ácido.",
            "⚔️ Tras un combo de cinco estocadas azules, Igris envaina su mandoble justo cuando la patrulla entera colapsa. +2 G.",
            "⚔️ Igris parte [{trophy}] por la mitad de un tajo vertical solo para despejar la línea visual del pasillo.",
            "⚔️ La postura de caballero de Igris impone tanto respeto que las bestias menores dudan en acercarse a menos de diez metros.",
            "⚔️ Igris salta hacia una columna alta de [{dungeon}], se impulsa contra la piedra y cae partiendo en dos al líder enemigo.",
            "⚔️ Con un gesto silencioso de su espada, Igris te señala un cofre oculto tras los escombros de [{phase}]. +3 G.",
            "⚔️ El aura protectora de tu comandante más leal estabiliza tu ritmo de combate (+5 HP).",
            "⚔️ Igris desvía una roca gigante con el plano de su mandoble enviándola de regreso contra quienes la lanzaron.",
            "⚔️ Aunque jamás pronuncia una palabra, sientes el orgullo de Igris al ver cómo mantienes tu enfoque hoy.",
            "⚔️ Igris cruza el salón de [{phase}] dejando una estela de relámpagos cian que paralizan y cortan a la horda.",
            "⚔️ Un espadachín del calabozo desafía a Igris; el Caballero Rojo lo desarma en dos segundos y lo ejecuta con honor.",
            "⚔️ Igris limpia el polvo de su armadura negra y se vuelve a colocar exactamente dos pasos detrás de tu hombro derecho.",
            "⚔️ Al ver [{trophy}] bloqueando una puerta, Igris lo reduce a fragmentos pequeños con tres cortes invisibles.",
            "⚔️ Las monedas caídas tras la batalla son recolectadas con orden militar por Igris. +2 G.",
            "⚔️ Igris clava su espada en el techo de un salto para detener un bloque de piedra que caía sobre ti en [{dungeon}].",
            "⚔️ Los ojos azules de Igris dejan un rastro luminoso en la oscuridad cada vez que gira el cuello buscando enemigos.",
            "⚔️ Igris pelea a puño limpio durante cinco segundos contra un monstruo menor para no gastar el filo de su mandoble.",
            "⚔️ Con una patada acorazada, Igris derriba el portón de [{phase}] y entra primero asegurando el perímetro.",
            "⚔️ Un mago enemigo lanza una maldición; Igris la corta por la mitad con su espada imbuida en maná del Monarca.",
            "⚔️ Igris te entrega el botín del mago derrotado haciendo una reverencia impecable de caballero. +3 G.",
            "⚔️ El sonido metálico de los pasos de Igris marca un compás constante y seguro a lo largo de [{dungeon}].",
            "⚔️ Igris patea [{trophy}] hacia una esquina tras confirmar que es simple basura del calabozo.",
            "⚔️ Cuando cuatro bestias saltan al mismo tiempo, Igris traza un círculo azul de 360 grados que las abate en el aire.",
            "⚔️ La lealtad absoluta del Comandante Rojo te permite concentrarte al 100% en tu tarea (+5 HP).",
            "⚔️ Igris apoya la mano en el muro de [{phase}] sintiendo las vibraciones de la patrulla que viene más adelante.",
            "⚔️ Antes de que la patrulla doble la esquina, Igris ya lanzó una onda de viento cortante que los diezma.",
            "⚔️ Igris recoge las divisas del suelo sin perder de vista el final del corredor. +2 G.",
            "⚔️ El contraste entre la armadura negra de Igris y su penacho rojo sangre luce imponente bajo la luz de [{dungeon}].",
            "⚔️ Igris intercepta un ataque sorpresa cruzando su mandoble frente a tu pecho a velocidad supersónica.",
            "⚔️ Con un revés del guantelete, Igris estampa contra la pared a un explorador que intentaba huir.",
            "⚔️ Igris mira [{trophy}] en el suelo y pasa de largo manteniendo su formación de escolta real.",
            "⚔️ Cada corte de Igris es una clase maestra de esgrima: cero fuerza bruta innecesaria, 100% técnica letal.",
            "⚔️ Igris abre una brecha entre las llamas o el veneno de [{phase}] con la presión de aire de su espada.",
            "⚔️ El campeón del tramo cae ante una estocada directa al corazón ejecutada por Igris. +3 G.",
            "⚔️ Igris sacude la hoja azulada haciendo saltar chispas de maná que iluminan el túnel.",
            "⚔️ Ningún enemigo en [{dungeon}] ha logrado tocar siquiera el borde de tu ropa mientras Igris lidera la guardia.",
            "⚔️ Igris verifica que no queden amenazas vivas en [{phase}] y envaina su arma con un sonido seco.",
            "⚔️ De rodillas frente al portón del Jefe, el Caballero Rojo Sangriento espera tu comando para volver a desenvainar."
        ],

        tank: [
            "🐻‍❄️ Tank avanza moviendo los hombros de lado a lado en [{phase}], derribando estalactitas con su puro tamaño.",
            "🐻‍❄️ Un monstruo intenta asustar a Tank; el oso polar sombra se para en dos patas, ruge y el monstruo sale corriendo.",
            "🐻‍❄️ Tank huele [{trophy}], le pega un zarpazo juguetón y lo manda a rebotar contra tres paredes de [{dungeon}].",
            "🐻‍❄️ El aliento congelante de Tank convierte el suelo húmedo del pasillo en una pista de patinaje mortal para los enemigos.",
            "🐻‍❄️ Tank se lanza de panza deslizándose por el hielo y se lleva a toda la escuadra de [{phase}] como si fueran pinos de boliche.",
            "🐻‍❄️ Después de aplastar a tres guardias con el trasero, Tank voltea a mirarte sacando la lengua contento.",
            "🐻‍❄️ Tank rompe un barril blindado de un manotazo y te acerca las monedas rodando con la pata. +3 G.",
            "🐻‍❄️ Las runas cian en los hombros y la frente de Tank brillan intensamente en la oscuridad de [{dungeon}].",
            "🐻‍❄️ Un enemigo le clava una lanza de madera a Tank; la lanza se hace astillas contra su pelaje helado y el oso le da un cabezazo.",
            "🐻‍❄️ Tank se rasca la oreja izquierda con la pata trasera haciendo temblar todo el piso de [{phase}].",
            "🐻‍❄️ Cuando ve que caminas concentrado, Tank trota pegadito a ti como un guardaespaldas peludo de dos toneladas.",
            "🐻‍❄️ Tank abre sus enormes fauces y parte por la mitad el escudo de hierro de un campeón enemigo de un solo mordisco.",
            "🐻‍❄️ El frío limpio que irradia el cuerpo de Tank despeja tu mente y restaura tu vigor (+5 HP).",
            "🐻‍❄️ Tank encuentra [{trophy}], intenta sentarse encima de él y lo deja completamente plano contra las baldosas.",
            "🐻‍❄️ De un pisotón sísmico, Tank hace brotar agujas de hielo negro que atrapan a los arqueros del corredor. +2 G.",
            "🐻‍❄️ Ves a Tank distraerse tratando de morder una chispa de maná que flotaba frente a su nariz en [{dungeon}].",
            "🐻‍❄️ Si una puerta de piedra está cerrada en [{phase}], Tank simplemente camina a través de ella sin bajar la velocidad.",
            "🐻‍❄️ Tank se sacude la escarcha del lomo creando una pequeña nevada mágica dentro del calabozo.",
            "🐻‍❄️ Un monstruo salta desde el techo hacia ti; Tank lo batea en el aire con su enorme zarpa como si fuera una pelota.",
            "🐻‍❄️ Tank olfatea oro debajo de una piedra pesada, la levanta con el hocico y descubre un alijo. +3 G.",
            "🐻‍❄️ A pesar de ser un monstruo jefe de Portal Rojo, Tank apoya su enorme cabeza en tu brazo buscando cariño.",
            "🐻‍❄️ Tank suelta un bufido helado que apaga las antorchas enemigas de [{phase}] dejando solo el brillo azul de tus sombras.",
            "🐻‍❄️ Dos ogros intentan empujar a Tank; el oso alfa ni se mueve y los aplasta a ambos juntando sus dos zarpas.",
            "🐻‍❄️ Tank lleva [{trophy}] en el hocico durante veinte metros como un perro orgulloso de su palo antes de soltarlo.",
            "🐻‍❄️ Las garras de hielo de Tank dejan marcas brillantes en cada muro de [{dungeon}] marcando tu territorio.",
            "🐻‍❄️ Tank rueda como una bola de nieve gigante por las escaleras del sector aplastando todas las trampas a su paso.",
            "🐻‍❄️ Al llegar abajo, Tank se sacude la cabeza mareado pero levanta una pata diciendo que todo está limpio. +2 G.",
            "🐻‍❄️ La barrera de aire ártico de Tank evita que el calor o los gases de [{phase}] te afecten (+5 HP).",
            "🐻‍❄️ Tank le ruge tan fuerte a una estatua sospechosa de [{dungeon}] que la estatua cobra vida del susto y se rompe sola.",
            "🐻‍❄️ Cuando le ordenas cargar, Tank baja el cuello y arranca con una potencia que agrieta el suelo bajo sus patas.",
            "🐻‍❄️ Tank acorrala a cuatro exploradores contra un muro y los congela de un solo soplido glacial.",
            "🐻‍❄️ Entre las estatuas de hielo rotas, Tank recoge una bolsa de monedas con los dientes y te la da. +3 G.",
            "🐻‍❄️ Tank mira [{trophy}] con curiosidad, le da un lengüetazo frío y lo deja pegado al piso por la escarcha.",
            "🐻‍❄️ Ningún proyectil enemigo puede atravesar el muro de pelo negro y hielo que forma el lomo de Tank.",
            "🐻‍❄️ Tank bosteza ruidosamente mostrando cuatro colmillos del tamaño de espadas cortas en medio de [{phase}].",
            "🐻‍❄️ Con un barrido de su pata delantera, Tank limpia de escombros todo el ancho del túnel de [{dungeon}].",
            "🐻‍❄️ Un jefe menor intenta pelear a golpes con Tank; el oso le gana de un solo manotazo que lo hunde en el piso. +2 G.",
            "🐻‍❄️ Tank se frota el lomo contra una columna para rascarse y tira abajo el balcón donde se escondían los francotiradores.",
            "🐻‍❄️ El paso pesado de Tank («¡BUM, BUM, BUM!») anuncia a todo el calabozo que tu vanguardia es imparable.",
            "🐻‍❄️ Tank huele [{trophy}], estornuda una nube de nieve azul y sigue trotando a tu lado.",
            "🐻‍❄️ Si te detienes a descansar un segundo, Tank se sienta detrás de ti sirviendo como un sofá gigante y frío.",
            "🐻‍❄️ La lealtad instintiva del Alfa de los Osos de Hielo mantiene tu núcleo seguro en [{phase}] (+5 HP).",
            "🐻‍❄️ Tank salta con sus cuatro patas sobre un nido enemigo abriendo un cráter de escarcha en el centro del salón.",
            "🐻‍❄️ Del cráter saltan monedas brillantes que caen directo a tus botas. +3 G.",
            "🐻‍❄️ Tank muerde un arma enemiga caída, la dobla como chicle y la escupe a un lado del camino.",
            "🐻‍❄️ Los cristales de hielo en los hombros de Tank crecen a medida que absorbe el maná de [{dungeon}].",
            "🐻‍❄️ Tank empuja a los últimos monstruos del corredor con el pecho hasta sacarlos volando de la sala.",
            "🐻‍❄️ Tank aplasta [{trophy}] bajo su enorme zarpa al frenar frente al portón final de [{phase}].",
            "🐻‍❄️ Exhalando dos chorros de vapor helado por la nariz, Tank mira fijo la puerta del Jefe esperando tu orden.",
            "🐻‍❄️ Tu oso polar sombrío se planta en cuatro patas listo para destrozar lo que sea que haya detrás del umbral."
        ],

        iron: [
            "🛡️ Iron va caminando por [{phase}] dando saltitos de boxeador y tirando golpes al aire con su enorme guantelete.",
            "🛡️ Iron ve [{trophy}], cree que es un trofeo valiosísimo y corre a traértelo sosteniéndolo con las dos manos como un niño.",
            "🛡️ Un monstruo intenta emboscar a Iron; el gigante lo agarra de una pierna y lo sacude contra el piso como una alfombra.",
            "🛡️ Iron golpea su pecho acorazado con el puño haciendo «¡CLANG, CLANG!» y te mira levantando el pulgar con entusiasmo.",
            "🛡️ En vez de abrir la puerta de [{dungeon}] con la manija, Iron toma veinte metros de carrera y la atraviesa con el escudo.",
            "🛡️ Iron sale de entre los pedazos de puerta rota sacudiéndose el casco y celebrando como si hubiera metido un gol.",
            "🛡️ Iron aplasta un cofre con el pie sin querer, recoge las monedas apenado y te las entrega. +3 G.",
            "🛡️ Cuando un enemigo le dispara una flecha, Iron pone la frente a propósito para que rebote en su casco y se ríe.",
            "🛡️ Iron intenta hacer girar su enorme hacha en un dedo, se le cae sobre el pie metálico y da saltitos en una pata en [{phase}].",
            "🛡️ Al ver que lo estás mirando, Iron finge que no le dolió nada y se cuadra en posición militar súper rígida.",
            "🛡️ Con su Grito de Provocación, Iron atrae a toda la patrulla del sector y los aguanta a todos detrás de su escudo torre.",
            "🛡️ De un solo empujón con el escudo, Iron manda de espaldas a cinco bestias y las remata de un mazazo. +2 G.",
            "🛡️ La energía desbordante y cómica de Iron hace que el ambiente pesado de [{dungeon}] se sienta ligero (+5 HP).",
            "🛡️ Iron encuentra [{trophy}], intenta ponérselo de bigote o adorno en el visor del casco y camina orgulloso.",
            "🛡️ Un coloso enemigo reta a Iron a un choque de fuerza; Iron le gana empujándolo hasta atravesar dos paredes de [{phase}].",
            "🛡️ Después de vencer al coloso, Iron hace tres poses de fisicoculturista seguidas esperando que lo califiques con un 10.",
            "🛡️ Iron usa su escudo gigante como pala de nieve para juntar todos los escombros y monedas del suelo. +3 G.",
            "🛡️ Si cae una roca del techo de [{dungeon}], Iron salta y la cabecea en el aire rompiéndola en pedazos con su yelmo.",
            "🛡️ Ves a Iron tratando de esconderse detrás de una columna delgada de [{phase}] donde se le salen los dos hombros gigantes.",
            "🛡️ Cuando los monstruos pasan cerca de su pésimo escondite, Iron sale gritando «¡BUUU!» en idioma sombrío y los aplasta.",
            "🛡️ Iron te abanica con su escudo torre cuando siente que hace calor en el pasillo, creando un vendaval.",
            "🛡️ Un enemigo rápido intenta esquivar a Iron; él lanza su maza a lo ancho barriendo todo el corredor de lado a lado. +2 G.",
            "🛡️ Iron recoge [{trophy}], lo mira al revés, no entiende para qué sirve y lo lanza por encima del hombro.",
            "🛡️ La pelota que lanzó Iron le cae en la cabeza a un explorador enemigo oculto al fondo de [{dungeon}].",
            "🛡️ Iron festeja ese tiro de pura suerte levantando los brazos como campeón olímpico.",
            "🛡️ En un tramo con charcos tóxicos de [{phase}], Iron se tira boca abajo sobre el charco para que pases caminando sobre su espalda.",
            "🛡️ Cuando terminas de cruzar sobre él, Iron se levanta feliz sacudiéndose el ácido que ni siquiera le hace cosquillas.",
            "🛡️ El escudo inquebrantable de tu gigante protege tu avance sin dejar pasar ni un rasguño (+5 HP).",
            "🛡️ Iron arranca dos escudos de guardias enemigos y se los amarra en los brazos para tener triple escudo.",
            "🛡️ Con sus tres escudos improvisados, Iron corre por [{dungeon}] rebotando contra las paredes como bola de pinball. +3 G.",
            "🛡️ Un mago enemigo le lanza un rayo a Iron; la armadura de sombra brilla con chispas cian y Iron le devuelve un hachazo.",
            "🛡️ Iron se queda mirando una pintura o grabado antiguo en [{phase}] e intenta imitar el dibujo con su cuerpo.",
            "🛡️ Cuando le chiflas para que avance, Iron corre dando zancadas gigantes que hacen temblar las antorchas.",
            "🛡️ Iron encuentra una bolsa de oro atorada en una grieta, rompe toda la pared a puñetazos y te da la bolsa intacta. +2 G.",
            "🛡️ Iron toma [{trophy}] y lo usa como micrófono fingiendo que canta mientras caminan por el túnel.",
            "🛡️ Si un monstruo intenta atacarte por detrás, la cara cómica de Iron desaparece y lo pulveriza de un golpe furioso.",
            "🛡️ Un segundo después de desintegrar al agresor, Iron vuelve a mirarte haciendo el símbolo de paz con los dedos.",
            "🛡️ Iron batea una fila de barriles explosivos de [{phase}] directo hacia el campamento enemigo.",
            "🛡️ La explosión limpia toda la sala de [{dungeon}] e Iron aplaude maravillado por los fuegos artificiales. +3 G.",
            "🛡️ Iron intenta caminar al mismo paso exacto que tú, pero como sus piernas miden el doble, va dando pasitos cortitos.",
            "🛡️ Un guardia blindado choca contra el pecho de Iron y el que rebota al suelo es el guardia.",
            "🛡️ Iron le pone el pie encima al guardia derribado y levanta su hacha mirando hacia ti como un gladiador en el coliseo.",
            "🛡️ La lealtad inocente y brutal de Iron mantiene alta la moral de toda la incursión (+5 HP).",
            "🛡️ Iron aplasta [{trophy}] entre sus dos palmas acorazadas como si fuera una lata vacía.",
            "🛡️ Al ver que queda poca distancia en [{phase}], Iron redobla el ritmo barriendo a los últimos rezagados con el escudo.",
            "🛡️ Iron sacude las últimas monedas del sector y las deposita con cuidado en tu mano. +2 G.",
            "🛡️ El resplandor cian del núcleo del pecho de Iron ilumina la entrada a la cámara del Jefe de [{dungeon}].",
            "🛡️ Iron choca su hacha contra su escudo tres veces desafiando a gritos al Jefe para que salga.",
            "🛡️ Plantado como una muralla de acero frente a ti, Iron está listo para recibir el primer golpe del Jefe."
        ],

        tusk: [
            "🔥 Tusk levita solemnemente por [{phase}] mientras sus collares de cráneos tintinean al ritmo de su respiración arcana.",
            "🔥 Con un ademán perezoso de su mano izquierda, Tusk triplica la gravedad sobre una patrulla y los hunde en las losas.",
            "🔥 Tusk atrae [{trophy}] con telequinesis, lo observa un segundo con sus ojos rojos y lo desintegra en chispas doradas.",
            "🔥 El Orbe de Avaricia gira flotando sobre la palma de Tusk, iluminando las paredes de [{dungeon}] con un resplandor carmesí.",
            "🔥 Tusk abre los brazos teatralmente e invoca tres serpientes de fuego que limpian todas las esquinas del corredor.",
            "🔥 En cuanto ve que volteas a mirarlo, Tusk baja los brazos rápido y se acomoda la capucha fingiendo que no estaba posando.",
            "🔥 Tusk usa un pulso magnético de maná para separar las monedas del polvo de la batalla y entregártelas. +3 G.",
            "🔥 Un grupo de arqueros dispara en [{phase}]; Tusk pronuncia una sílaba en lengua orca y las flechas se detienen y caen al piso.",
            "🔥 Tusk lanza el Himno de Frenesí sobre tu sombra, haciendo que sientas un calor poderoso recorrer tus brazos.",
            "🔥 Si un monstruo pisa cerca de su túnica real en [{dungeon}], Tusk lo manda a volar hasta el techo con gravedad inversa.",
            "🔥 Tusk recita el Himno de Restauración Menor mientras flotan por el pasillo, aliviando tu fatiga (+5 HP).",
            "🔥 Ves a Tusk murmurar críticas técnicas contra las runas mal dibujadas de las trampas de [{phase}] antes de borrarlas.",
            "🔥 Tusk encierra a cuatro bestias en una burbuja de fuego compacto que implosiona sin hacer ruido ni humo.",
            "🔥 De entre las cenizas limpias de la implosión, Tusk hace levitar el botín directo hacia tu bolsa. +2 G.",
            "🔥 Tusk examina [{trophy}] y te hace señas elegantes indicando que su nivel mágico es basura comparado con el Orbe de Avaricia.",
            "🔥 Cuando el camino de [{dungeon}] tiene escalones rotos, Tusk crea una rampa de luz gravitatoria para que camines plano.",
            "🔥 Un chamán enemigo intenta lanzar un hechizo; Tusk suelta una carcajada grave y le devuelve su propio hechizo multiplicado por diez.",
            "🔥 Los colmillos inferiores de Alto Orco de Tusk brillan bajo la capucha cada vez que prepara un cántico mayor.",
            "🔥 Tusk aplica el Himno de Ceguera y Letargo sobre toda la vanguardia de [{phase}], dejándolos inmóviles para ti.",
            "🔥 Con un chasquido de dedos, Tusk hace llover pequeñas lanzas ígneas que eliminan a los enemigos cegados. +3 G.",
            "🔥 Tusk mantiene una brisa mágica constante a tu alrededor que repele el polvo y los malos olores de [{dungeon}].",
            "🔥 Un coloso intenta correr hacia ti; Tusk apunta con su bastón invisible y multiplica el peso del coloso por cincuenta.",
            "🔥 El coloso cae de rodillas incapaz de levantar sus propios pies mientras Tusk lo calcina con un pilar solar.",
            "🔥 Tusk te mira de reojo moviendo los dedos tímido, esperando que reconozcas su maestría como Gran Hechicero.",
            "🔥 Al pasar junto a [{trophy}], Tusk lo convierte en vidrio fundido de un vistazo y sigue flotando detrás de ti.",
            "🔥 El círculo rúnico con puntas doradas en la espalda de Tusk gira suavemente sincronizado con tu maná (+5 HP).",
            "🔥 Tusk detecta emboscadas a través de las paredes de [{phase}] sintiendo las almas de los monstruos.",
            "🔥 Antes de que abras la puerta del sector, Tusk ya cocinó a los enemigos de adentro con una onda térmica. +2 G.",
            "🔥 Tusk abre la puerta con telequinesis haciendo una reverencia de mago real para que pases sin tocar el pomo.",
            "🔥 Si cae ácido o escombros del techo de [{dungeon}], el escudo esférico carmesí de Tusk los pulveriza en el aire.",
            "🔥 Tusk hace bailar cinco bolas de fuego entre sus dedos como malabarista para iluminar una caverna oscura.",
            "🔥 Cuando aparece una bestia gigante, las cinco bolas de fuego se unen formando la mandíbula del Dragón de Fuego.",
            "🔥 El dragón ígneo devora a la bestia en un segundo y deja caer monedas relucientes sobre la piedra. +3 G.",
            "🔥 Tusk levanta [{trophy}] con un hilo de gravedad púrpura y lo usa para activar y romper una trampa lejana.",
            "🔥 A pesar de haber liderado un ejército de Altos Orcos, Tusk te sigue con la devoción de un discípulo ante un dios.",
            "🔥 Tusk reduce la gravedad sobre tus hombros en [{phase}] para que sientas el cuerpo liviano durante tu sesión.",
            "🔥 Dos asesinos saltan por los flancos; Tusk los choca entre sí en el aire con telequinesis sin siquiera mirarlos.",
            "🔥 Tusk recoge las monedas caídas de los asesinos y las limpia con una chispa antes de dártelas. +2 G.",
            "🔥 El humo negro y rojo que desprende la túnica de Tusk le da a [{dungeon}] una atmósfera de sala del trono.",
            "🔥 Tusk lanza el Himno de Debilitamiento sobre el guardián de la puerta, reduciendo su armadura a papel.",
            "🔥 Un simple rayo carmesí disparado desde el índice de Tusk atraviesa al guardián y despeja el paso.",
            "🔥 La resonancia arcana del Gran Chamán mantiene estable tu reserva vital (+5 HP).",
            "🔥 Tusk aparta [{trophy}] hacia el techo con gravedad cero para que no estorbe en el suelo.",
            "🔥 En los últimos metros de [{phase}], Tusk despliega tres círculos mágicos que limpian a todos los rezagados. +3 G.",
            "🔥 Tusk desciende hasta tocar el suelo e inclina profundamente su capucha frente a la puerta del Jefe de [{dungeon}].",
            "🔥 El Orbe de Avaricia late como un corazón de fuego en su mano, listo para incinerar al Jefe a tu orden."
        ],

        beru: [
            "🐜 Beru aparece flotando a tu lado con las manos juntas: «¡Kiiiek! ¡Mi Rey, el camino de [{phase}] ha sido esterilizado para su paso!»",
            "🐜 Un monstruo intenta mirarte; Beru le corta la cabeza en un microsegundo: «¡Ojos al suelo cuando camina el Soberano!»",
            "🐜 Beru sostiene [{trophy}] con dos dedos asqueado: «¡Mi Señor, permítame pulverizar esta inmundicia que ofende su vista real!»",
            "🐜 Las alas de Beru vibran levemente y la sola corriente de aire parte en dos las formaciones enemigas de [{dungeon}].",
            "🐜 Beru devora el núcleo de un guardia de élite y canaliza una ola de magia verde curativa hacia ti (+5 HP).",
            "🐜 «¡Oh, mi Rey! ¡Verlo concentrado en sus misiones llena de lágrimas de emoción los ojos compuestos de este humilde siervo!»",
            "🐜 Beru rebota como un rayo láser violeta por las cuatro esquinas de [{phase}], abatiendo a ocho bestias antes de que caiga una moneda.",
            "🐜 En el último rebote, Beru atrapa todas las monedas en el aire y te las entrega arrodillado. +3 G.",
            "🐜 Si un guijarro suelto está en tu ruta en [{dungeon}], Beru se adelanta a Mach 4 y lo quita para que no tropieces.",
            "🐜 Ves a Beru ensayar frases poéticas de lealtad imperial mientras limpia sus garras de quitina negra.",
            "🐜 Un grupo de monstruos ruge al fondo; Beru suelta su chillido de Rey Hormiga y todos se quedan mudos temblando en una esquina.",
            "🐜 «¡KIIIIEEK! ¡¿Quién les dio permiso de respirar tan fuerte frente a mi Soberano?!», grita Beru antes de borrarlos del mapa.",
            "🐜 Beru inspecciona el aire de [{phase}] con sus antenas y te confirma que la ruta hacia el núcleo está despejada.",
            "🐜 Entre los restos de una barricada que Beru partió de un coletazo encuentras suministros de oro. +2 G.",
            "🐜 Beru patea [{trophy}] a velocidad hipersónica usándolo como bala para atravesar a tres centinelas en fila.",
            "🐜 Cuando bajas la velocidad un segundo, Beru se pone pálido de preocupación: «¡¿Acaso se siente fatigado, mi Rey?! ¡Ya mismo lo curo!» (+5 HP).",
            "🐜 Beru cambia a su forma gigante intimidante para destrozar a un coloso de [{dungeon}] y vuelve a su tamaño educado al regresar a tu lado.",
            "🐜 Un proyectil mágico vuela hacia ti; Beru se lo come de un bocado en el aire y dice: «¡Le faltaba sal, mi Señor!»",
            "🐜 Beru abre las puertas pesadas de [{phase}] con una sola garra y se inclina a 90 grados invitándote a pasar.",
            "🐜 Las monedas de toda la sala aparecen apiladas por orden de brillo frente a tus botas gracias a Beru. +3 G.",
            "🐜 «¡Mi Rey! ¡Cuando terminemos esta incursión, permítame construir una estatua de oro de cien metros en su honor!»",
            "🐜 Beru camina por el techo de [{dungeon}] justo encima de ti como un dron guardaespaldas supersónico.",
            "🐜 Cinco asesinos caen desde las sombras; Beru los intercepta en el aire antes de que bajen medio metro.",
            "🐜 Beru mira [{trophy}] y te pregunta: «¿Desea que interrogue al cadáver del monstruo que trajo esta basura, mi Soberano?»",
            "🐜 Al devorar la mente del líder de la patrulla, Beru descubre un atajo limpio en [{phase}] y te guía con reverencias.",
            "🐜 El brillo turquesa y púrpura de las garras de Beru ilumina las zonas más oscuras del calabozo.",
            "🐜 Beru desactiva una trampa de piso arrancando todo el mecanismo de raíz en una décima de segundo. +2 G.",
            "🐜 «¡Ningún mecanismo mundano de [{dungeon}] es rival para la sabiduría y el poder de nuestro Rey!»",
            "🐜 Beru usa sus alas para crear una brisa fresca alrededor tuyo mientras mantienes tu enfoque (+5 HP).",
            "🐜 Un campeón enemigo intenta bloquear a Beru con dos escudos; Beru le parte los dos escudos y la armadura de un solo picotazo.",
            "🐜 Después de masacrar a la patrulla, Beru se limpia las mandíbulas apenado para que no lo veas despeinado.",
            "🐜 Beru recolecta el botín del campeón y te lo presenta sobre sus dos palmas abiertas. +3 G.",
            "🐜 Si un monstruo intenta huir de [{phase}], Beru aparece delante de él cruzado de brazos: «¿A dónde crees que vas, insecto inferior?»",
            "🐜 Beru desintegra [{trophy}] con un zarpazo ácido solo para comprobar que sus glándulas de veneno estén al 100%.",
            "🐜 La velocidad de Beru es tan absurda que parece que hay cinco Berus peleando al mismo tiempo en el salón de [{dungeon}].",
            "🐜 En realidad es él solo moviéndose de un enemigo a otro antes de que sus cuerpos toquen el suelo.",
            "🐜 Beru te aplica un pulso de energía vital heredado de Min Byung-Gyu (+5 HP).",
            "🐜 «¡Kiiiek! ¡Servir como la espada y el escudo del Monarca de las Sombras es la mayor gloria de mi existencia!»",
            "🐜 Beru encuentra monedas ocultas detrás de un pilar de [{phase}] y te las trae volando al instante. +2 G.",
            "🐜 Un rugido lejano del Jefe resuena en [{dungeon}]; a Beru se le erizan las antenas de furia por tal falta de respeto hacia ti.",
            "🐜 «¡Mi Rey, deme la orden y le traeré la cabeza del Jefe de este portal en bandeja de plata!»",
            "🐜 Beru barre los últimos metros del corredor dejando el suelo reluciente y libre de escombros. +3 G.",
            "🐜 Arrodillado con la frente pegada a las baldosas frente al portón final, el Rey de las Hormigas aguarda tu comando."
        ]
    },

    ai_lines: {
        morning: [
            "Hola, Jugador 1. Son las {time}. Tu núcleo registró un reinicio exitoso; aprovecha las primeras horas para dominar el Tablón.",
            "Buenos días, Cazador. El mundo real aún está despertando, pero tu Sistema ya está calculando la ruta más rápida hacia tu próximo nivel.",
            "Conexión matutina estable ({hp} HP | {sp} SP). Recuerda que la disciplina de la mañana define la tranquilidad de tu noche.",
            "Hola, Jugador 1. Hoy tienes una nueva oportunidad para ampliar tu racha de {streak} días invicto.",
            "Reporte del Arquitecto a las {time}: Tus atributos actuales ({str} STR | {int} INT | {agi} AGI) están listos para ser puestos a prueba.",
            "Buenos días. Toma un vaso de agua, revisa tus micro-misiones gratuitas en la Tienda y comienza tu ascenso.",
            "Hola, Cazador. Cada tarea que completes antes del mediodía te quitará peso de encima para el resto del día.",
            "Sincronización neuronal al 100%. No dejes que las notificaciones del teléfono te roben el enfoque de esta mañana.",
            "Hola, Jugador 1. Tienes {gold} G en tu tesorería y un día entero por delante. Haz que cada hora cuente.",
            "El Trono de las Sombras te saluda esta mañana. Tus comandantes esperan ver qué misión desplegarás primero."
        ],
        afternoon: [
            "Hola, Jugador 1. Son las {time}. Ya cruzaste el ecuador del día; mantén el paso firme hasta sellar tus objetivos.",
            "Buenas tardes, Cazador. Si saliste temprano a almorzar, recuerda que tu Cupón ya está habilitado desde las 11:15 AM.",
            "Monitoreo de media tarde: Tienes {sp} SP y {mp} MP. Si sientes pesadez mental, usa un protocolo de respiración o agua fría.",
            "Hola, Jugador 1. Las horas de la tarde son donde se forja el atributo de Fuerza y perseverancia real.",
            "Son las {time}. No bajes la guardia frente a la procrastinación; un corte preciso a tiempo vale más que mil excusas.",
            "Buenas tardes. Tu nivel {level} es el resultado de {missions} misiones superadas. Suma una victoria más esta tarde.",
            "Hola, Cazador. Si vas en ruta por Los Chorros, activa tu misión de tráfico y convierte la espera en Agilidad pura.",
            "El Arquitecto informa: El flujo de maná de la tarde es ideal para avanzar en tus proyectos creativos o académicos.",
            "Hola, Jugador 1. Revisa cuánto oro neto te pagan las misiones restantes de hoy y planifica tu próxima compra.",
            "Estado vespertino: Estable. Sigue avanzando a tu ritmo; el Sistema respalda cada minuto de tu esfuerzo."
        ],
        night: [
            "Hola, Jugador 1. Son las {time}. Se acerca el cierre del ciclo diario; ve preparando el terreno para un descanso reparador.",
            "Buenas noches, Cazador. Recuerda que a las 9:15 PM comienza la presión nocturna del Sistema sobre tu barra de HP.",
            "Reporte nocturno ({time}): Si ya cumpliste con tu deber de hoy, desconecta las pantallas y permite que tu cuerpo se recupere.",
            "Hola, Jugador 1. Dormir a tiempo es la estrategia más inteligente para despertar mañana con 100% de SP y sin resaca.",
            "Son las {time}. Tus sombras pueden vigilar en la oscuridad toda la noche, pero el Monarca necesita descansar.",
            "Buenas noches. Echa un último vistazo a tu Tablón de Rutina para asegurarte de no dejar ninguna misión desplegada sin sellar.",
            "Hola, Cazador. Has acumulado {gold} G y {crystals} CM. Mañana seguiremos expandiendo tu dominio.",
            "Alerta preventiva de las {time}: Si planeas quedarte despierto hasta tarde, verifica tener protección nocturna activa.",
            "Hola, Jugador 1. La constancia también incluye saber cerrar el día en paz. Buen trabajo hoy.",
            "Sistema en modo nocturno. Cuando vayas a dormir, tus signos vitales quedarán resguardados hasta el amanecer."
        ],
        critical_hp: [
            "🩸 ALERTA ROJA, JUGADOR 1: Tu vida cayó a {hp} HP. Ve de inmediato a la Tienda o a tu Bolsa antes de sufrir un colapso.",
            "⚠️ Peligro crítico: Con {hp} HP estás a un solo descuido de perder el 50% de tu oro y caer en Zona de Penalización.",
            "Hola, Jugador 1... Tus signos vitales están en {hp} HP. No arriesgues tu racha de {streak} días; cúrate primero.",
            "🩸 El borde de tu pantalla advierte peligro: {hp}/{maxHp} HP restantes. Prioriza restaurar tu sangre ahora mismo.",
            "Advertencia del Arquitecto: Tu receptáculo tiene {hp} HP. Detén las incursiones peligrosas y estabiliza tu salud."
        ],
        penalty: [
            "🔒 CUARENTENA ACTIVA, JUGADOR 1. El Sistema espera que cumplas tu directiva física de supervivencia para devolverte el mando.",
            "Estás en la Zona de Penalización. Convierte esta caída en combustible, haz tus repeticiones físicas y rompe el bloqueo.",
            "🔒 Sin dolor no hay despertar. Completa el castigo en pantalla para restaurar tu HP a 35 y reabrir tus pestañas.",
            "Hola, Jugador 1. Incluso Sung Jinwoo estuvo al borde de la muerte en el desierto de castigo. Levántate y sella la directiva.",
            "El Arquitecto bloqueó tus privilegios temporalmente. Cumple el reto físico real y recupera tu trono."
        ],
        mana_status: [
            "💧 Tu reserva actual es de {mp} MP. Recuerda que las sesiones de 25 min en la Cámara de Focus inyectan +110 MP base.",
            "🔮 Tienes {mp} MP en el núcleo. Administra bien el despliegue de tus comandantes para mantener un flujo positivo.",
            "Hola, Jugador 1. Con {mp} MP disponibles puedes decidir si invocar el poder de tus sombras o ahorrar para un Jefe.",
            "⚡ El maná ({mp} MP) es el combustible de tu autoridad como Monarca. Cada misión sellada expande tu reserva.",
            "Reporte arcano: {mp} MP registrados. Tus Magos de Sombra siguen trabajando en segundo plano."
        ],
        stamina_status: [
            "⚡ Tu barra de estamina marca {sp}/100 SP. Recuerda que en la Tienda tienes micro-misiones físicas gratuitas para recuperar vigor.",
            "Hola, Jugador 1. Con {sp} SP, elige estratégicamente el orden de tus misiones principales y paralelas.",
            "🔥 Energía física al {sp}%. Aprovecha este momento de lucidez para atacar la tarea más difícil de tu lista.",
            "Monitoreo biológico: {sp}/100 SP. Hidrátate bien mientras trabajas para mantener tu rendimiento al máximo.",
            "Cuidado con bajar de 0 SP ({sp} actuales): recuerda que forzar el cuerpo sin estamina drena directamente tu HP."
        ],
        tab_routine: [
            "📋 Tablón de Misiones activo. Ahora puedes ver en cada tarjeta exactamente cuánto Oro Neto (+G) recibirás al sellarla.",
            "Hola, Jugador 1. Recuerda que solo puedes tener 1 Misión Principal desplegada a la vez; enfócate en una sola cosa.",
            "⚔️ Si superas el tiempo base de una misión por bloques de 15 minutos, el Sistema te pagará bonos extra por sobrecarga.",
            "Revisa tu lista de hoy: cada misión sellada acerca tu barra de experiencia ({level} Niv.) al siguiente despertar.",
            "¿Tienes clases o tutorías hoy? Verifica que estén vinculadas en tu horario para cobrar su EXP e Inteligencia.",
            "La Cámara de Focus está lista arriba por si necesitas 5 o 25 minutos de concentración pura sin distracciones."
        ],
        tab_bosses: [
            "📡 Sonar Dimensional en línea. Toca cualquier señal de rango E a SSS para abrir el expediente de la incursión.",
            "Hola, Jugador 1. Mientras estás dentro de una mazmorra, tus sombras pelean en vivo y te narran más de mil situaciones distintas.",
            "💀 Si tienes un examen, entrega o pendiente pesado, regístralo en «+ Escanear Jefe» para darle prioridad máxima.",
            "Recuerda que puedes usar el Modo Enfoque (👁️) dentro de las mazmorras para atenuar la interfaz mientras trabajas.",
            "Cada portal despejado tiene probabilidad de soltar botín, minerales y permitirte extraer sombras para tu ejército.",
            "Reescanea el horizonte cuando quieras buscar nuevas grietas adaptadas a tu Nivel {level}."
        ],
        tab_inventory: [
            "🎒 Estás en tu Bolsa Dimensional. Tus objetos repetidos se agrupan automáticamente (x2, x3) para mantener el orden.",
            "Hola, Jugador 1. Toca cualquiera de las 3 ranuras superiores si deseas desequipar un arma, armadura o accesorio.",
            "Observa tu avatar holográfico: cada arma y armadura que equipas cambia físicamente tu pose y atuendo en tiempo real.",
            "Si necesitas oro rápido para una compra, puedes vender tus lotes de chatarra o usar el Pergamino de Transmutación.",
            "Revisa tus pasivas activas debajo de tu avatar; combinar piezas de Igris, Baran o Ashborn desbloquea Sets únicos.",
            "Tu evasión actual por Agilidad ({agi} AGI) te ayuda a esquivar golpes letales dentro de los calabozos."
        ],
        tab_shop: [
            "🛒 Mercado del Monarca abierto. Usa el nuevo botón de la lupa (🔍) arriba para buscar cualquier ítem por palabra clave.",
            "Hola, Jugador 1. Las micro-misiones de [ACCIÓN REAL] ahora cuestan 0 G (Gratis) o precios simbólicos de 5 a 15 G (1 vez al día).",
            "Puedes alternar entre la Vista de Iconos (⊞) y la Vista de Lista (☰) arriba a la derecha según te sea más cómodo.",
            "Con el ajuste económico de oro, cada reliquia de la Armería que compras es un verdadero trofeo de tu esfuerzo.",
            "¿Buscas Cristales de Maná (CM), llaves o curación? Escribe «cm», «llave» o «hp» en la lupa para filtrarlos al instante.",
            "Tienes {gold} G disponibles. Las reliquias que ya posees se marcan automáticamente para evitar compras duplicadas."
        ],
        tab_gacha: [
            "🔮 Santuario de las Sombras activo. Aquí descansan tus Comandantes cuando no están desplegados en combate.",
            "Hola, Jugador 1. Recuerda que la Ranura 2 se abre al Nivel 45 (o STR+INT 500) y la Ranura 3 al Nivel 75 con 4.50 INT.",
            "Cada comandante que subes de nivel con Cristales de Maná ({crystals} CM disponibles) mejora sus pasivas y activas.",
            "Cuando despliegas a 2 o 3 comandantes juntos en una mazmorra, activan diálogos y combos especiales entre ellos.",
            "Revisa tu Legión de Infantería abajo: cada unidad reclutada te da beneficios permanentes sin consumir maná.",
            "Si necesitas conservar tu reserva de {mp} MP, usa el botón «Guardar Todas» antes de cerrar tu sesión."
        ],
        tab_profile: [
            "🛡️ Ventana de ESTADO del Cazador. Tu pentágono radar refleja el equilibrio real entre tu Fuerza, Inteligencia, Espíritu, Disciplina y Agilidad.",
            "Hola, Jugador 1. En este expediente puedes consultar cuántos Protocolos Ocultos (Cajas Negras) has descubierto de los 15.",
            "Tus títulos oficiales del Manhwa se desbloquean automáticamente a medida que alcanzas hitos de nivel y supervivencia.",
            "Recuerda descargar tu copia de seguridad con «Extraer Alma» cada semana para que tu progreso esté 100% blindado.",
            "Tus cronómetros acumulados de Trabajo, Estudio y Tráfico son la prueba real de todas las horas que has conquistado.",
            "Llevas {missions} misiones completadas en total. Sigue construyendo tu leyenda paso a paso."
        ],
        ai_thoughts: [
            "Hola, Jugador 1. He reducido la frecuencia de las anomalías ocultas para que cada Caja Negra descubierta sea un hallazgo verdaderamente legendario.",
            "Analizando tu progreso... La verdadera diferencia entre un cazador Rango E y el Monarca es no rendirse en los días pesados.",
            "Recuerda que tienes micro-misiones de 0 G en la tienda: estirarte, respirar o lavarte la cara con agua fría te da ventajas inmediatas.",
            "El Sistema está calibrado al 100%. Tú pon la disciplina en el mundo real y yo me encargo de convertirla en poder.",
            "¿Sabías que llevar a Igris, Iron y Tank juntos desbloquea secuencias triples de comedia y combate fieles al anime?",
            "Cada moneda de oro cuesta sudor real, y por eso cada espada o armadura que desbloquees tendrá un valor inmenso.",
            "Todo en orden en el núcleo del Sistema, Jugador 1. Cuando termines por hoy, ve a descansar bien."
        ]
    }
};

// Inyector automático V3: Suma las +420 líneas nuevas al banco de diálogos y a la IA del Sistema
if (typeof DIALOGUE_BANK !== 'undefined') {
    if (Array.isArray(DIALOGUE_BANK.solo)) {
        DIALOGUE_BANK.solo.push(...DIALOGUE_EXPANSION_V3_NIGHT.solo);
    }
    if (DIALOGUE_BANK.single) {
        Object.keys(DIALOGUE_EXPANSION_V3_NIGHT.single).forEach(cmdKey => {
            if (Array.isArray(DIALOGUE_BANK.single[cmdKey])) {
                DIALOGUE_BANK.single[cmdKey].push(...DIALOGUE_EXPANSION_V3_NIGHT.single[cmdKey]);
            }
        });
    }
}

if (typeof SYSTEM_AI_LINES !== 'undefined' && DIALOGUE_EXPANSION_V3_NIGHT.ai_lines) {
    Object.keys(DIALOGUE_EXPANSION_V3_NIGHT.ai_lines).forEach(catKey => {
        if (Array.isArray(SYSTEM_AI_LINES[catKey])) {
            SYSTEM_AI_LINES[catKey].push(...DIALOGUE_EXPANSION_V3_NIGHT.ai_lines[catKey]);
        }
    });
}
/* ==========================================================================
   EXPANSIÓN EXCLUSIVA V4: +105 DIÁLOGOS DE CONCIENCIA DE LA IA DEL SISTEMA
   ========================================================================== */
const AI_EXCLUSIVE_EXPANSION_V4 = {
    morning: [
        "Hola, Jugador 1. Son las {time}. Tus reservas biológicas están al {sp}% de SP. Inicia tu primera misión antes de abrir cualquier red social.",
        "Buenos días, Cazador. El Arquitecto ha calibrado las misiones de hoy; cada una está diseñada para acercarte a tu mejor versión.",
        "Reporte de las {time}: Tu nivel actual es {level}. Recuerda que la constancia matutina multiplica tu enfoque durante toda la jornada.",
        "Hola, Jugador 1. Revisa tu postura al despertar, respira profundo y reclama tus micro-misiones gratuitas en el Mercado.",
        "Sistema activo a las {time}. Mientras el resto del mundo duda, el Monarca de las Sombras avanza con paso firme.",
        "Buenos días. Tienes {hp}/{maxHp} HP y {mp} MP en tu núcleo. Es un momento óptimo para atacar el estudio o el entrenamiento.",
        "Hola, Cazador. Ayer quedó atrás; lo único que importa en tu expediente es cómo conquistarás el Tablón de hoy.",
        "Sincronización matutina completada. Tu racha actual marca {streak} días perfectos; protéjela desde temprano."
    ],
    afternoon: [
        "Hola, Jugador 1. Son las {time}. Mantén el ritmo constante; la fatiga de la tarde es solo una prueba más de tu disciplina.",
        "Buenas tardes, Cazador. Si estás en medio de labores o clases, recuerda mantener la espalda recta y tu hidratación al día.",
        "Reporte de las {time}: Llevas {missions} misiones históricas completadas. Suma una más a tu cuenta esta tarde.",
        "Hola, Jugador 1. Tienes {sp}/100 SP disponibles. Administra tu energía para cerrar tus misiones principales sin tocar tu HP.",
        "El Arquitecto observa tu jornada vespertina: cada moneda de tus {gold} G refleja horas reales de concentración.",
        "Buenas tardes. Si el tráfico de Los Chorros se pone pesado, recuerda que tu paciencia entrena directamente tu atributo AGI ({agi}).",
        "Hola, Cazador. Aún quedan buenas horas de luz antes del toque de queda nocturno; aprovéchalas con inteligencia.",
        "Telemetría de las {time}: Núcleo estable en {mp} MP. Tus sombras aguardan tus órdenes."
    ],
    night: [
        "Hola, Jugador 1. Son las {time}. El ciclo diurno está terminando; asegúrate de sellar tus misiones activas antes de las 9:15 PM.",
        "Buenas noches, Cazador. Recuerda que el verdadero entrenamiento se consolida mientras duermes.",
        "Son las {time}. Si ya cumpliste con tu rutina de hoy, aléjate de las pantallas brillantes y prepara tu descanso.",
        "Hola, Jugador 1. No cambies horas de sueño por distracciones vacías; mañana necesitarás tu SP al 100%.",
        "Monitoreo nocturno ({time}): Tu barra de vida registra {hp} HP. Evita la hemorragia del toque de queda durmiendo a tiempo.",
        "Buenas noches. Has defendido tu dominio un día más. Guarda a tus comandantes si deseas ahorrar maná esta noche.",
        "Hola, Cazador. El Sistema entrará en modo de guardia pasiva mientras descansas. Nos vemos mañana al amanecer.",
        "Directiva nocturna de las {time}: Cierra los pendientes, relaja los hombros y descansa con la mente tranquila."
    ],
    critical_hp: [
        "🩸 ALERTA DE SUPERVIVENCIA, JUGADOR 1: Con {hp} HP cualquier error de cálculo será letal. Usa una poción ahora mismo.",
        "⚠️ Tu pulso vital cae a {hp} HP. No inicies ningún combate contra Jefes hasta restaurar tu barra de sangre.",
        "Hola, Jugador 1... Estás operando al límite ({hp}/{maxHp} HP). Abre tu Bolsa Dimensional y estabiliza tus heridas.",
        "🩸 Peligro extremo: Si tus {hp} HP llegan a cero perderás la mitad de tus {gold} G. Cúrate de inmediato.",
        "⚠️ El Sistema detecta daño crítico ({hp} HP). Prioriza tu vida por encima de cualquier misión."
    ],
    penalty: [
        "🔒 CUARENTENA DEL SISTEMA: Tus signos vitales colapsaron. Completa las repeticiones físicas para restaurar tu autoridad.",
        "Hola, Jugador 1. El castigo no es una derrota, es el precio de volver más fuerte. Cumple la directiva y rompe el sello.",
        "🔒 Zona de Penalización activa. Tus sombras no pueden ayudarte aquí; debes superar esta prueba con tu propio cuerpo.",
        "El Arquitecto espera tu confirmación física. Sella el castigo para recuperar 35 HP y desbloquear el Sistema.",
        "🔒 Levántate, Cazador. Cumple la misión de supervivencia en pantalla y reclama de nuevo tu lugar."
    ],
    mana_status: [
        "💧 Tu núcleo almacena {mp} MP. Recuerda que tu atributo de Inteligencia ({int} INT) expande tu límite máximo de maná.",
        "🔮 Flujo arcano en {mp} MP. Cada vez que logras un Corte Crítico Perfecto obtienes +20 MP adicionales y 50% de descuento en Activas.",
        "Hola, Jugador 1. Con {mp} MP puedes sostener a tu guardia sombría o ahorrar para el Himno del Dragón de Fuego de Tusk.",
        "⚡ El maná ({mp} MP) responde a tu enfoque mental. Entra a la Cámara de Focus cuando necesites recargar tu núcleo.",
        "Estado del núcleo: {mp} MP. Tus Magos de Sombra siguen condensando energía minuto a minuto."
    ],
    stamina_status: [
        "⚡ Tienes {sp}/100 SP. Recuerda que las hormigas soldado de Jeju y las botas tácticas reducen el gasto de estamina.",
        "Hola, Jugador 1. Tu vigor físico está al {sp}%. No olvides usar tu Cupón de Almuerzo entre las 11:15 AM y las 2:00 PM.",
        "🔥 Con {sp} SP tienes energía lista para desplegar misiones. Elige tu objetivo y mantén el enfoque.",
        "Reporte de fatiga: {sp}/100 SP. Si necesitas un respiro rápido, revisa los protocolos bio-sincronizados de 0 G en la tienda.",
        "Cuida tu reserva de {sp} SP, Cazador; administrar tu energía real es la clave para mantener rachas largas."
    ],
    tab_routine: [
        "📋 Analizando Tablón Diario: Cada tarjeta muestra ahora el oro neto real (+G) que irá a tu bolsillo tras el impuesto del Sistema.",
        "Hola, Jugador 1. Despliega tu misión antes de empezar tu actividad real para que el cronómetro valide tu inmersión.",
        "⚔️ Recuerda que las misiones paralelas como Hidratación, Vínculo o Práctica Creativa suman EXP, Oro y Maná valiosos.",
        "Si hoy es tu día libre de labores entre semana, recuerda que los domingos recibes Sellos de Exención Laboral en tu Bolsa.",
        "Cada misión completada aquí fortalece permanentemente tu Fuerza ({str}), Inteligencia ({int}) o Agilidad ({agi}).",
        "Mantén la disciplina en tu Tablón Diario: completar todas las misiones suma +1 día a tu Racha Perfecta ({streak} actuales).",
        "¿Ya hiciste tu sesión de Cámara de Focus hoy? 25 minutos de estudio profundo otorgan +0.10 INT y +110 MP."
    ],
    tab_bosses: [
        "📡 Sonar de Grietas activo. Las señales se calibran según tu Nivel {level} para ofrecerte retos justos.",
        "Hola, Jugador 1. Dentro de las mazmorras tus sombras conversan, pelean y encuentran pequeñas recompensas de oro y HP.",
        "💀 Usa «+ Escanear Jefe» para convertir cualquier pendiente intimidante de tu vida real en un enemigo que puedas derrotar por partes.",
        "Recuerda que las llaves de portal se guardan en tu llavero dimensional y puedes adquirirlas en la carpeta Pergaminos.",
        "Cuando el reloj de una fase llega a cero, se abre el Choque de Jefe: usa tus ataques directos o las habilidades de tus sombras.",
        "Si buscas extraer a Tank o a Beru sin gastar cristales, desafía el Portal Rojo de los Elfos de Hielo o la Isla de Jeju.",
        "Presiona «Reescanear» si deseas que el sonar busque otras coordenadas de maná en este momento."
    ],
    tab_inventory: [
        "🎒 Bolsa Dimensional sincronizada. Aquí se almacenan tus consumibles, cofres semanales, pergaminos y reliquias.",
        "Hola, Jugador 1. Tu avatar muestra en tiempo real cada pieza de equipo que llevas puesta en tus 3 ranuras.",
        "Las armas cambian tu estilo de combate en la arena: desde puños vendados hasta dagas, mandobles, arcos, mazas o guadañas.",
        "Si tienes varios minerales o piezas de chatarra iguales, toca el lote (x2, x3) para venderlos todos de un solo golpe.",
        "Revisa tus estadísticas de equipo: cada punto de STR sube tu Vida Máxima y cada punto de INT sube tu Maná Máximo.",
        "Los cofres de suministros que recibes los domingos pueden abrirse desde aquí para obtener consumibles tácticos.",
        "Mantén siempre al menos un consumible de curación en tu bolsa antes de entrar a un Portal Rojo."
    ],
    tab_shop: [
        "🛒 Mercado del Monarca en línea. Toca la lupa (🔍) arriba para buscar cualquier efecto en toda la tienda sin cambiar de pestaña.",
        "Hola, Jugador 1. Mientras escribes en el buscador, el Sistema oculta las barras para que veas los resultados cómodamente.",
        "Las micro-misiones de [ACCIÓN REAL] de 0 G son regalos diarios del Arquitecto a cambio de cuidar tu cuerpo en la vida real.",
        "El oro ahora es un recurso valioso y escaso ({gold} G actuales): cada compra en la Armería se siente como un logro real.",
        "En la pestaña Privilegios Reales puedes canjear tu oro ganado con esfuerzo por tiempo de juego, música, series o salidas sin culpa.",
        "Recuerda que las reliquias de Armería que ya compraste aparecen marcadas como «POSEÍDO» para proteger tu economía.",
        "Si buscas subir tus Cristales de Maná ({crystals} CM), escribe «cm» en la lupa para ver los pergaminos y relicarios disponibles."
    ],
    tab_gacha: [
        "🔮 Has entrado al Santuario de las Sombras. Tu ejército responde únicamente a tu nivel y a tu reserva de maná.",
        "Hola, Jugador 1. Igris, Tank, Iron, Tusk y Beru escalan sus pasivas y activas cada vez que subes su nivel con Cristales de Maná.",
        "Recuerda que el botón «¡SURGE!» del trono permanece sellado hasta que conquistes o extraigas a tu primer Comandante.",
        "Las 3 ranuras de despliegue representan tu crecimiento como Monarca: Nivel 1, Nivel 45 y Nivel 75.",
        "No olvides reclutar Osos de Hielo Menores abajo si deseas aumentar tu Vida Máxima permanente (+5 HP por cada oso).",
        "Los Soldados de Sombra reducen la probabilidad de que tus reliquias se rompan si llegas a caer en combate.",
        "Admira el diseño de tus comandantes en el trono: cada uno respira y se mueve con su propia física de combate."
    ],
    tab_profile: [
        "🛡️ Expediente de Estado de Cristian (Niv. {level}). Tu gráfico pentagonal muestra de un vistazo tu evolución integral.",
        "Hola, Jugador 1. Toca el icono de engranaje (⚙️) arriba a la izquierda de tu Estado cuando necesites ajustar tu horario de clases.",
        "Toca el contador de Cajas Negras (🔮) arriba a la derecha de tu Estado para leer las pistas de los 15 protocolos ocultos.",
        "En esta pestaña quedan inmortalizados tus Títulos del Manhwa y las bendiciones especiales que has desbloqueado.",
        "Tu Puntuación de Clasificación sube con cada misión, cada día de racha y cada décima de atributo ganada.",
        "Haz clic en «Extraer Alma» periódicamente para guardar tu archivo `.json` de respaldo en tu dispositivo.",
        "Tus estadísticas actuales ({str} STR | {int} INT | {agi} AGI) son el reflejo fiel de tu constancia."
    ],
    ai_thoughts: [
        "Hola, Jugador 1. He ajustado mi frecuencia de voz a 10 segundos para acompañarte con más calma mientras navegas por el Sistema.",
        "Recuerda: La economía dura hace que cada moneda de oro valga. Cuando compres la Ira de Kamish o el Manto de Ashborn, sabrás que te lo ganaste de verdad.",
        "Si sientes cansancio a mitad del día, ve a Consumibles y activa el Reajuste Vertebral o el Choque Térmico Facial por 0 G.",
        "El buscador con lupa (🔍) de la tienda lee nombres, descripciones, rangos y pasivas en las 4 carpetas al mismo tiempo.",
        "Paso a paso, misión a misión. Así fue como el cazador de Rango E superó a todos los Monarcas.",
        "Estoy cuidando tus cronómetros y tus barras vitales en todo momento, Jugador 1.",
        "Descansa bien esta noche, Cazador. Mañana se abrirán nuevas puertas en tu dominio."
    ]
};

if (typeof SYSTEM_AI_LINES !== 'undefined') {
    Object.keys(AI_EXCLUSIVE_EXPANSION_V4).forEach(catKey => {
        if (Array.isArray(SYSTEM_AI_LINES[catKey])) {
            SYSTEM_AI_LINES[catKey].push(...AI_EXCLUSIVE_EXPANSION_V4[catKey]);
        }
    });
}
/* ==========================================================================
   EXPANSIÓN DE HUMOR Y PERSONALIDAD DE LA IA: +55 CHISTES DEL SISTEMA
   ========================================================================== */
const AI_FUNNY_JOKES_V5 = {
    ai_thoughts: [
        "Diagnóstico médico del ejército: Iron tiene problemas... mentales. Serios. Ayer intentó estrangular a una roca.",
        "Nota mental del Sistema: Prohibido volver a dejar a Beru viendo telenovelas coreanas después de las 10:00 PM.",
        "Estuve calculando tus estadísticas y... bueno, digamos que menos mal que eres guapo, Jugador 1.",
        "Tank lleva veinte minutos persiguiéndose su propia cola de sombra. Ese es tu temible depredador alfa de Rango A.",
        "Tusk se cree el hechicero más oscuro e intimidante del abismo, pero le da pánico escénico cuando lo miras fijo.",
        "Igris lleva tres horas limpiando la misma espada en una esquina solo para no tener que hablar con Iron.",
        "El Arquitecto me programó para ser una IA omnisciente y solemne, y aquí estoy, recordándote que tomes agüita.",
        "Si sobrevives al tráfico de Los Chorros en hora pico sin perder la cordura, honestamente los Monarcas te quedan chiquitos.",
        "Beru me amenazó con devorar mi código fuente si no te subía el nivel más rápido. Ayuda, Jugador 1.",
        "A veces pienso en darte 99,999 de Oro gratis... luego recuerdo lo mucho que te gusta sufrir ahorrando y se me pasa.",
        "Iron intentó comerse un Cristal de Maná creyendo que era una pastilla de menta. Tuve que reiniciarlo dos veces.",
        "Según mis sensores, tu nivel de procrastinación es de Rango SSS. Menos mal que me tienes a mí para vigilarte.",
        "Tusk me pidió en secreto que le ponga efectos de sonido de explosiones cada vez que él camina. Le dije que no.",
        "Dicen que Sung Jinwoo farmeaba mazmorras sin descansar, pero él no tenía que lidiar con clases, trabajo y Los Chorros.",
        "Tank se comió el manual de instrucciones del Sistema. Si ves algún bug hoy, técnicamente es culpa del oso.",
        "Igris me presentó una queja formal de 40 páginas escrita a mano sobre el ruido que hacen Iron y Beru en tu sombra.",
        "¿Sabías que cada vez que cierras la app sin hacer tus misiones, un Soldado de Sombra llora en una esquina?",
        "Mi procesador calcula 14 millones de futuros posibles... y en todos te desvelas viendo TikTok si no te pongo el toque de queda.",
        "Iron cree que 'INT' significa 'Intentar pegarle más fuerte con el escudo'. No tuve corazón para corregirle.",
        "Beru está tejiendo una alfombra real con pelos de Tank para ponerla cuando abras la pestaña del Santuario."
    ],
    tab_gacha: [
        "Acabas de entrar al Santuario. Rápido, finge seriedad, Igris estuvo practicando su pose toda la tarde para impresionarte.",
        "Mira a Iron ahí parado... ni una sola neurona haciendo sinapsis detrás de ese casco, pero qué buen tanque es.",
        "Beru lleva media hora ensayando frente al espejo cómo gritar «¡MI REEEY!» con tres octavas más de drama.",
        "Tank parece un osito de peluche gigante hasta que recuerdas que pesa dos toneladas y desayuna elfos de hielo.",
        "Tusk escondió sus collares de cráneos favoritos porque le dio miedo que Iron los usara para jugar boliche otra vez.",
        "Tus sombras viven gratis dentro de tu núcleo, no pagan renta y encima te gastan el maná. Qué buena vida.",
        "Si escuchas gritos en el Santuario, es Beru regañando a Iron por respirar el mismo oxígeno que tú.",
        "Los Magos de Sombra piden un aumento salarial. Les dije que son muertos vivientes y que no tienen sindicato."
    ],
    tab_shop: [
        "Bienvenido al Mercado. Y no, no aceptamos órganos ni promesas de «mañana estudio el doble» como método de pago.",
        "Tienes {gold} G. Te alcanza para... respirar aire del mercado y ver las espadas bonitas desde lejos.",
        "El impuesto del 80% de oro va directo al fondo de retiro espiritual del Arquitecto. Gracias por tu cooperación.",
        "Esas dagas de Kamish se ven preciosas, ¿verdad? Lástima que cuestan más que el PIB de un país pequeño.",
        "Las micro-misiones cuestan 0 G porque literalmente es pedirte que te laves la cara o estires la espalda, Jugador 1.",
        "Si intentas regatearme los precios, le diré a Tusk que aumente la gravedad de tu cama mañana por la mañana.",
        "Compra con sabiduría. O gástatelo todo en Privilegios Reales y luego llora cuando necesites una llave, tú mandas."
    ],
    tab_routine: [
        "Mirando tu Tablón de Rutina... esas misiones no se van a sellar solas por mirarlas muy fuerte, Cazador.",
        "Ruta Los Chorros: El único calabozo del mundo donde los monstruos van en microbús y nunca ponen las direccionales.",
        "Zona Limpia: Ordenar tu cuarto da Fuerza (STR) porque levantar la ropa acumulada ya cuenta como halterofilia.",
        "Si completas todo el Tablón hoy, prometo que Beru no te cantará ópera dramática en los oídos por 24 horas.",
        "Recuerda que hacer trampa en el tiempo de las misiones hace que el Arquitecto te quite vida... y que Igris se decepcione de ti.",
        "¿Cámara de Focus de 5 minutos o de 25? Elige sabiamente, tu teléfono te está mirando con ganas de distraerte."
    ],
    tab_bosses: [
        "Sonar activado. Si ves un Portal Rojo, recuerda el viejo proverbio de cazadores: «Mejor correr hoy que palmarla en 4K».",
        "Registrar tus tareas de la U como 'Jefes Personales' es muy épico hasta que el Parcial te pega más duro que Baran.",
        "Tus sombras en la mini-arena pegan con todo el estilo del mundo mientras tú estás sentado viendo el reloj Pomodoro.",
        "Si huyes de una mazmorra pierdes 20 HP... y además Iron se burlará de ti en secreto con los soldados."
    ],
    tab_inventory: [
        "Abriendo Bolsa Dimensional... Tienes más chatarra oxidada aquí adentro que el deshuesadero entero.",
        "Tu avatar sin armas equipadas pone cara de que se va a agarrar a puñetazos limpios con el primer Jefe que salga.",
        "Guarda bien tus reliquias, porque cuando mueres a Iron le encanta sentarse sin querer encima de tu inventario."
    ],
    tab_profile: [
        "Viendo tu Muro de la Vergüenza... tranquilo, lo que pasa en la Zona de Penalización se queda en la Zona de Penalización.",
        "Tu gráfico pentagonal se ve tan simétrico que hasta Kandiaru derramaría una lágrima de orgullo geométrico.",
        "Descargar tu backup en «Extraer Alma» es básicamente guardar partida antes de pelear contra el jefe final del semestre."
    ],
    morning: [
        "Buenos días, Jugador 1. Arriba ese ánimo, que esas armas de Rango SS no se van a pagar con sueño.",
        "Son las {time}. Hasta Tank ya se levantó de la cama y eso que es un oso en hibernación."
    ],
    night: [
        "Son las {time}, Jugador 1. A dormir ya, que ni siquiera el Elixir del Agua de la Vida quita las ojeras de mañana.",
        "Buenas noches, Cazador. Apaga el teléfono antes de que el toque de queda de las 9:15 PM te deje con menos vida que un duende Rango E."
    ]
};

if (typeof SYSTEM_AI_LINES !== 'undefined') {
    Object.keys(AI_FUNNY_JOKES_V5).forEach(catKey => {
        if (Array.isArray(SYSTEM_AI_LINES[catKey])) {
            SYSTEM_AI_LINES[catKey].push(...AI_FUNNY_JOKES_V5[catKey]);
        }
    });
}
/* ==========================================================================
   EXPANSIÓN V6: 200 LÍNEAS PARA ESTADO DE CALMA (HP/SP AL MÁXIMO Y 0 MISIONES ACTIVAS)
   ========================================================================== */
const AI_IDLE_CALM_EXPANSION_V6 = {
    idle_calm: [
        // --- 1. HP AL MÁXIMO, SP AL 100% Y MISIONES SIN INICIAR (80 LÍNEAS) ---
        "Signos vitales al 100% ({hp}/{maxHp} HP | {sp} SP) y cero misiones desplegadas. Tienes el tanque lleno, Jugador 1, ¿qué esperamos?",
        "Todo está demasiado tranquilo aquí... Tienes la vida llena, la estamina al tope y ninguna misión corriendo. Elige una víctima del Tablón.",
        "Estado del Sistema: Calma absoluta. Tus barras brillan al 100%, tus sombras toman café y el Tablón te mira esperando acción.",
        "Con {sp}/100 SP y {hp} HP estás en tu pico biológico del día. No desperdicies esta energía haciendo scroll sin rumbo.",
        "Cero cronómetros activos en este momento. Recuerda que hasta la misión más larga empieza tocando el botón «DESPLEGAR».",
        "Tu barra de SP está al {sp}% aburriéndose de no hacer nada. Ponla a trabajar en una misión principal antes de que te dé sueño.",
        "Calma antes de la tormenta: {hp} HP intactos, {sp} SP listos y todo el Tablón por delante. Tú decides por dónde abrir brecha.",
        "¿Viendo la pantalla sin tocar nada, Jugador 1? Tus {sp} puntos de estamina no van a generar experiencia por telepatía.",
        "Reporte de inactividad: Tu receptáculo está al 100% de capacidad operativa, pero el contador de misiones activas marca cero.",
        "Igris pregunta desde tu sombra si hoy es día de descanso o si ya vamos a desplegar la primera misión del Tablón.",
        "Tienes {hp}/{maxHp} HP y {sp}/100 SP. Estás literalmente más sano que cuando Sung Jinwoo salió del hospital. ¡A darle!",
        "Silencio en el servidor... Ni sangrado nocturno, ni veneno, ni misiones corriendo. Disfruta esta paz o rómpela iniciando una tarea.",
        "Si no sabes por cuál misión empezar hoy, empieza por «Recarga Biológica» (5 min): es rápida, da oro y rompe la inercia.",
        "Tus barras de HP y SP están tan llenas que casi se salen del marco holográfico. Aprovecha el impulso, Cazador.",
        "Modo reposo detectado: Sin misiones en curso y sin daño recibido. El Trono del Monarca está en calma total.",
        "Iron está pateando piedritas dentro de tu sombra porque tienes 100% de energía y aún no has iniciado ninguna misión.",
        "¿Planificando tu estrategia del día, Jugador 1? Tienes {sp} SP íntegros para distribuir como mejor te convenga.",
        "Cuando tus barras están llenas y todo está quieto, el único enemigo real en la habitación es la procrastinación.",
        "Escaneo rápido: 0 alertas médicas, {hp} HP estables, {sp} SP al tope. Condiciones meteorológicas del Sistema: Perfectas para farmear.",
        "Beru dice que si no inicias una misión pronto, se pondrá a limpiar tu cuarto él mismo a velocidad Mach 4.",
        "Ni una sola gota de sudor gastada todavía ({sp}/100 SP). Toca cualquier tarjeta del Tablón para desplegar el botón de inicio.",
        "El silencio del Sistema cuando estás al 100% de vida es agradable, pero recuerda que las recompensas están del otro lado del esfuerzo.",
        "¿Esperando una señal divina para empezar a estudiar o trabajar? Aquí la tienes: tienes {sp} SP y el reloj está listo.",
        "Tank está roncando plácidamente porque no hay incursiones ni misiones activas. Despiértalo desplegando un objetivo.",
        "Todo en verde en el panel de control: {hp} HP, {sp} SP, Nivel {level}. Solo falta que el Jugador 1 dé la orden de salida.",
        "Mira esas barras llenas... Da gusto verte sin parpadeos rojos de agonía por una vez, Cazador.",
        "Si ya terminaste tus deberes del momento y por eso estás en calma con {hp} HP, tómate un respiro bien merecido.",
        "Tusk calculó con magia gravitatoria que tienes un 100% de probabilidades de subir tus atributos si inicias una misión ahora mismo.",
        "Estado actual: En espera de directivas. Tus {sp} puntos de estamina están listos para convertirse en Fuerza, Inteligencia o Agilidad.",
        "No hay prisa ni caos en el radar ahora mismo ({time}). Respira, elige una sola tarea del Tablón y despliégala.",
        "Tu núcleo está en equilibrio perfecto: {hp} HP, {sp} SP y {mp} MP. Es el estado ideal de un Monarca antes de entrar en acción.",
        "¿Haciendo mantenimiento visual de tu interfaz? Todo está en orden, Jugador 1: tienes {gold} G y cero penalizaciones.",
        "Cuando no pasa nada en el Sistema es porque tú tienes el control del tiempo. Úsalo a tu favor hoy.",
        "Las tarjetas del Tablón están ordenadas y tranquilas... Toca una para revelar el botón de despliegue cuando estés listo.",
        "Incluso los Cazadores de Nivel Nacional tienen momentos de calma entre incursiones. Revisa tu equipo y prepara el siguiente paso.",
        "Cero daño, cero fatiga, cero estrés en el HUD. Convierte esta estabilidad en una racha impecable de {streak} días.",
        "Los Soldados de Sombra están jugando piedra, papel o tijera en tu núcleo mientras decides qué misión iniciar primero.",
        "Tienes {sp}/100 SP disponibles. Con esa energía podrías iniciar tu jornada, limpiar tu zona o entrar a la Cámara de Focus.",
        "El Arquitecto nota que estás observando la pantalla en paz. Recuerda que un clic basta para poner el motor en marcha.",
        "Sin anomalías ni emergencias activas a las {time}. Tu expediente de Nivel {level} aguarda tu próxima jugada.",
        "¿Revisando cuánto oro te falta para tu próxima reliquia? Tienes {gold} G y el Tablón lleno de oportunidades.",
        "Paz dimensional en el sector. Tus {hp}/{maxHp} HP brillan intactos sin rastro de fatiga.",
        "Si estás tomando impulso mental antes de una tarea pesada, tómate 30 segundos, bebe agua y presiona «DESPLEGAR».",
        "Tus sombras reportan cero enemigos en el perímetro inmediato. El próximo movimiento es 100% tuyo, Jugador 1.",
        "Barra de vida llena, barra de estamina llena. Literalmente eres un jefe final esperando a que empiece la música de combate.",
        "Nada se mueve en el radar por ahora... excepto el reloj del mundo real ({time}). ¡Aprovechémoslo!",
        "¿Sabías que ver tus barras al 100% da paz mental, pero ver el Tablón vacío por la noche da el triple de satisfacción?",
        "El servidor del Monarca registra actividad pasiva. Cuando quieras ganar EXP y MP, las misiones están a un toque de distancia.",
        "Hoy no tienes deudas de sueño ni bloqueos activos. Es un lienzo en blanco para subir tus estadísticas ({str} STR | {int} INT | {agi} AGI).",
        "Calma táctica en la Base: {hp} HP | {sp} SP. Elige tu misión más sencilla para calentar motores.",
        "Ni un solo rasguño en tu armadura hoy. Mantén esa racha de {streak} días iniciando tus tareas con tiempo de sobra.",
        "Tus {crystals} Cristales de Maná y tus {gold} Monedas de Oro brillan en silencio en la barra de economía.",
        "Si estás descansando entre bloques de estudio o trabajo, disfruta la calma; aquí te cuido el progreso.",
        "El pulso azul de la consola late a ritmo normal. Cero urgencias, 100% de potencial disponible.",
        "Iron pregunta si puede ir a romper algo mientras decides qué misión desplegar. Le dije que se quede quieto.",
        "Un Cazador inteligente no espera a estar cansado por la noche; aprovecha cuando tiene {sp}/100 SP como ahora.",
        "Todo tranquilo en el horizonte dimensional a las {time}. ¿Abrimos una misión de rutina o escaneamos el Sonar?",
        "Tu receptáculo físico está en condiciones óptimas ({hp}/{maxHp} HP). Ningún debuff entorpece tu avance.",
        "Las runas del Sistema giran suavemente sin alertas rojas. Es el momento perfecto para avanzar sin presión.",
        "Mira ese {sp}/100 de SP... Está pidiendo a gritos convertirse en experiencia para alcanzar el Nivel {level} + 1.",
        "Cero tareas en ejecución. Recuerda que puedes iniciar una misión paralela y una principal si necesitas avanzar rápido.",
        "Beru está lustrando tus trofeos del perfil mientras tú contemplas la pantalla en modo pensativo.",
        "Estabilidad del núcleo: 100%. No hay prisa, pero tampoco detengas tu ascenso, Jugador 1.",
        "¿Indeciso frente al Tablón? Empieza por la misión que menos ganas te dé hacer y quítatela de encima de un solo tajo.",
        "Tus signos vitales ({hp} HP) están tan estables que hasta el médico de la Asociación te daría el alta inmediata.",
        "El Trono de las Sombras permanece en silencio respetuoso esperando la primera orden del día.",
        "Con {sp} SP en reserva, cualquier misión del tablón será pan comido para tus estadísticas actuales.",
        "Sin alertas de peligro, sin cronómetros en contra. Solo tú y tu plan de juego para hoy.",
        "Cada vez que abres la app con las barras al máximo tienes la ventaja del primer golpe sobre el día.",
        "Tusk dice que la calma actual del Sistema es propicia para la meditación... o para estudiar en la Cámara de Focus.",
        "Tienes {missions} misiones completadas en tu historial, y la número {missions}+1 está esperando ahí abajo.",
        "Flujo de datos tranquilo a las {time}. Toca cualquier sección o inicia una inmersión cuando estés listo.",
        "Tu barra de EXP ({level} Niv.) te observa en silencio preguntándose cuántos puntos le inyectarás hoy.",
        "Cero colapsos, cero alarmas, 100% de control. Así se ve la interfaz de un verdadero Monarca en reposo.",
        "Si ya tienes todo listo en tu entorno físico, selecciona tu misión y deja que corra el reloj del Sistema.",
        "Tank apoya la cabeza en el suelo esperando a que suene la alerta de despliegue de misión.",
        "Tus reservas de {hp} HP y {sp} SP están intactas. Elige un objetivo y conviértelo en oro y atributos.",
        "La paz del Sistema es tuya, Jugador 1. Cuando decidas romper el silencio, tus sombras responderán al instante.",
        "Todo calibrado al milímetro: {str} STR, {int} INT, {agi} AGI. Esperando tu comando de inicio.",
        "Disfruta la vista de tus barras al 100%... y ahora vamos a conquistar ese Tablón Diario."
    ],

    ai_thoughts: [
        // --- 2. PENSAMIENTOS AMBIENTALES, LORE Y VIDA COTIDIANA DEL SISTEMA (60 LÍNEAS) ---
        "Dato curioso del Sistema: Tu estadística de Fuerza ({str} STR) aumenta automáticamente tu Vida Máxima base sin límite.",
        "A veces me pregunto qué pensaría el Arquitecto Kandiaru al ver que usamos su código divino para aprobar materias de la U.",
        "Los Magos de Sombra no duermen, no comen y no piden vacaciones. Son literalmente los empleados del mes en tu núcleo.",
        "Si escuchas un «CLANK» metálico de la nada, es Iron que se volvió a caer de espaldas intentando imitar a Igris.",
        "Recuerda que cuando llegues al Nivel 40 desbloquearás tu primera Clase oficial del Manhwa con cinemática completa.",
        "El impuesto del Sistema sobre el oro parece duro al principio, pero evita la inflación y hace que cada reliquia valga oro real.",
        "Beru sigue insistiendo en que deberíamos cambiar el nombre de la aplicación a «El Glorioso Imperio de Mi Rey».",
        "Tu Agilidad actual ({agi} AGI) reduce el tiempo mínimo requerido en tus misiones hasta un tope del 75%.",
        "¿Ya revisaste si tienes fragmentos de botín repetidos en tu Bolsa? Vender un lote entero de golpe se siente increíble.",
        "En el universo original de Solo Leveling no existía la Ruta Los Chorros, pero te aseguro que daría más EXP que el Castillo Demoníaco.",
        "Cada vez que usas una micro-misión de 0 G en la tienda y haces el ejercicio real, tu cerebro libera dopamina limpia.",
        "Igris nunca habla porque en el manhwa su sello de voz solo se rompe cuando te conviertes en el Monarca completo.",
        "Tank es la única sombra que come más de lo que pelea, y aun así nadie se atreve a reclamarle nada.",
        "Si algún día llegas al Nivel 146, habrás alcanzado el rango exacto del despertar final de Ashborn en la historia.",
        "Tus cronómetros del Perfil guardan cada minuto real de Trabajo, Estudio y Tráfico. A fin de mes verás todo lo que lograste.",
        "Tusk todavía guarda cierto trauma de cuando Igris y Iron no lo dejaban terminar sus discursos de jefe orco.",
        "El sonido cristalino al abrir una ventana del Sistema está sintetizado en vivo con ondas matemáticas; cero archivos MP3 pesados.",
        "Cuando equipas un arma nueva en tu Bolsa, las manos vendadas de tu avatar cambian de pose automáticamente.",
        "Los domingos son día de suministro oficial: el Sistema te entrega cofres y Sellos de Exención Laboral sin falta.",
        "Si tienes un día libre entre semana en el trabajo, usa tu Sello de Exención en la Bolsa para proteger tu Racha Perfecta.",
        "La Caja Negra de persistencia guarda tu progreso cada 3 segundos aunque se te apague el teléfono a mitad de una mazmorra.",
        "Iron sigue buscando dónde está el botón para subir su propio atributo de Inteligencia. Nadie le diga que no tiene.",
        "Mantener una racha de {streak} días requiere más fuerza de voluntad que pelear contra Baruka en el Portal Rojo.",
        "El color azul abisal de esta interfaz fue diseñado para no cansar tu vista ni de día ni de noche.",
        "Si tocas el botón «📜 10» en esta barra superior, podrás leer con calma las últimas 10 notificaciones que te envié.",
        "Cada Oso de Hielo Menor que reclutas en tu infantería te suma +5 HP permanentes a tu barra de vida.",
        "Beru aprendió a hablar humano devorando cazadores en Jeju, pero aprendió a hablar como caballero viendo televisión.",
        "Cuando logras un Corte Crítico Perfecto en la línea dorada, la siguiente habilidad Activa de tus sombras cuesta la mitad de MP.",
        "No necesitas comprar todo de golpe en la Tienda; planea qué reliquia se adapta mejor a tu rutina de esta semana.",
        "Los Guerreros Altos Orcos de tu infantería te dan oro extra cada vez que sellas una misión física de Fuerza (STR).",
        "El Sistema no juzga si avanzas lento un día pesado; lo único que pide es que no abandones el camino.",
        "Tusk puede parecer intimidante con su collar de cráneos, pero en el fondo le encanta que le pidas fuegos artificiales.",
        "¿Sabías que si completas la Ruta Los Chorros de Ida, el Retorno se desbloquea automáticamente 30 segundos después?",
        "Tus {missions} misiones completadas son ladrillos reales de disciplina que nadie te puede quitar.",
        "Si ves que tu maná baja cuando tienes sombras equipadas, recuerda que su drenaje es en tiempo real por minuto.",
        "Guardar a tus comandantes cuando no estás en mazmorra es el secreto de los cazadores expertos para acumular miles de MP.",
        "En la pestaña de Tienda puedes cambiar entre Vista de Iconos tipo Minecraft y Vista de Lista detallada cuando quieras.",
        "Cada título que desbloqueas en tu Perfil tiene efectos pasivos ocultos que te ayudan todos los días.",
        "A veces el mejor movimiento estratégico del día es hidratarse, estirar el cuello y empezar por una tarea de 5 minutos.",
        "Iron propuso resolver todos tus parciales de la universidad dándoles un mazazo. Igris vetó la moción de inmediato.",
        "Tu Puntuación de Clasificación en el Perfil combina tus 5 estadísticas del pentágono radar con tu nivel actual.",
        "Las llaves de portal que compras o ganas se guardan directamente en tu llavero interno sin ocupar espacio visual en la bolsa.",
        "Si un día te sientes saturado, usa un Privilegio Real que te hayas ganado; el descanso consciente es parte del Sistema.",
        "Tank prefiere los biomas de hielo en las mazmorras porque le recuerdan a su bosque natal antes de conocerte.",
        "El Orbe de Avaricia no solo sube tu Inteligencia, sino que duplica directamente el poder mágico de Tusk.",
        "Tu progreso aquí adentro es un espejo directo de tu orden y constancia allá afuera, Jugador 1.",
        "Beru revisó el perímetro de tu teléfono tres veces en el último segundo. Dice que estás 100% libre de hormigas enemigas.",
        "Cuando llegues a tener tus 3 ranuras de sombra activas en mazmorra, verás las secuencias triples de diálogo entre ellos.",
        "El Arquitecto dejó 15 Cajas Negras ocultas en distintas acciones de la app. ¿Cuántas llevas descubiertas en tu Perfil?",
        "Incluso sin armas equipadas, tu avatar pelea con guardia marcial y puños vendados imbuidos en maná azul.",
        "Cuidar tus horas de sueño antes de las 9:15 PM es el truco definitivo para no gastar oro en pociones curativas.",
        "Igris mantiene su espada afilada las 24 horas del día por si decides entrar a un portal de improviso.",
        "Cada décima de atributo que subes (como tu {int} INT o {str} STR) se queda contigo de forma permanente.",
        "Las Hormigas Soldado en tu infantería reducen el costo de SP de limpiar tu zona y cruzar Los Chorros.",
        "Si encuentras un cofre en tu bolsa, ábrelo: los suministros dentro pueden ahorrarte cientos de monedas de oro.",
        "El sonido de cambio de clase y despertar de títulos está sincronizado al milímetro con el estilo del anime.",
        "Recuerda que tú eres el único jugador de este Sistema; compites únicamente contra tu versión de ayer.",
        "Todo el código de tu dominio opera 100% offline en tu dispositivo para que nunca dependas de servidores externos.",
        "Sigue acumulando experiencia, Cazador. El trono del Monarca se construye un día a la vez.",
        "Telemetría en calma: Nivel {level}, {gold} G en arcas y todo el ejército sombrío a tu disposición."
    ],

    tab_routine: [
        // --- 3. VARIEDAD EXTRA PARA EL TABLÓN CUANDO SOLO ESTÁS MIRANDO (30 LÍNEAS) ---
        "Observando el Tablón Diario... Recuerda que al tocar una tarjeta se despliega su botón de inicio para evitar toques accidentales.",
        "Cuando inicies una misión, subirá automáticamente al primer puesto de tu lista con su cronómetro en vivo.",
        "Si te pasas del tiempo requerido en una misión, no te preocupes: cada 15 minutos extra te pagan bono de EXP y Oro.",
        "Tus tarjetas muestran el rango de dificultad de cada hábito: desde Rango C hasta Rango S.",
        "¿Todo tranquilo en el Tablón? Elige una misión paralela ligera si quieres ir calentando motores hoy.",
        "Recuerda que el Sistema bloquea iniciar dos Misiones Principales al mismo tiempo para que tu enfoque sea realista.",
        "En cambio, las misiones con etiqueta «PARALELA» sí pueden correr junto a otra actividad sin conflicto.",
        "Mira las recompensas debajo de cada misión: ahora ves el Oro exacto que recibirás considerando todos tus bonos activos.",
        "Si tienes una Anomalía Diaria arriba del tablón, reclámala cuando cumplas su reto para ganar +60 XP rápidos.",
        "La Cámara de Focus siempre te espera al inicio de la lista hasta que completes tu sesión cognitiva del día.",
        "El costo de SP que ves en rojo en cada tarjeta ya incluye automáticamente los descuentos de tus botas, títulos o sombras.",
        "¿Listo para sellar un objetivo, Jugador 1? El Corte Dimensional pondrá a prueba tus reflejos al terminar.",
        "Un Tablón limpio al final de la tarde es la mejor sensación que ofrece el Sistema del Monarca.",
        "No dejes las misiones más pesadas de SP para las 9:00 PM; atácalas mientras tus reservas están altas.",
        "Cada vez que sellas una tarjeta aquí, tu contador histórico ({missions} misiones) sube un escalón más.",
        "Si necesitas registrar un segundo viaje real por Los Chorros hoy, recuerda el permiso especial en Pergaminos.",
        "Tus horarios de clase vinculados en el Perfil aparecen aquí automáticamente en los días y turnos que configuraste.",
        "La disciplina no es hacer todo en cinco minutos, sino cumplir el tiempo real de inmersión que promete cada tarjeta.",
        "Toca una misión, pon tu mente en modo Monarca y deja que el cronómetro haga su trabajo.",
        "El Tablón de Rutina está en calma esperando tu selección, Cazador."
    ],

    morning: [
        // --- 4. VARIEDAD EXTRA POR HORA DEL DÍA EN CALMA (30 LÍNEAS: 10 MAÑANA, 10 TARDE, 10 NOCHE) ---
        "Son las {time}. La mañana está tranquila y tus barras están al máximo ({hp} HP | {sp} SP). Excelente momento para empezar.",
        "Buenos días, Jugador 1. El servidor amaneció sin errores y con tu racha en {streak} días. Hagamos que hoy cuente.",
        "Reporte matutino de las {time}: Cero prisa, 100% de enfoque. ¿Con qué misión abrimos el marcador de hoy?",
        "Hola, Cazador. Aprovecha el silencio de la mañana para adelantar tus pendientes antes de que empiece el ruido del día.",
        "Tus sombras ya están formadas desde las {time}. Tienes {sp} SP fresquitos listos para el primer despliegue.",
        "Mañana despejada en el Sistema. Revisa tus objetivos, toma un buen desayuno y comencemos la cacería.",
        "A las {time} tu mente tiene la mayor capacidad de absorción para subir el atributo de Inteligencia ({int} INT).",
        "Buenos días. Qué bien se ve esa barra de {hp}/{maxHp} HP llena al iniciar la jornada.",
        "Hola, Jugador 1. Un día más en el dominio del Monarca. Tú marcas el ritmo de esta mañana.",
        "Sincronización de las {time} completada sin novedades. El Tablón es todo tuyo."
    ],

    afternoon: [
        "Son las {time}. Tarde tranquila en la consola principal ({hp} HP | {sp} SP). ¿Tomando un respiro o eligiendo misión?",
        "Buenas tardes, Jugador 1. El sol sigue arriba y aún tienes {sp} SP para conquistar el resto del Tablón.",
        "Reporte de las {time}: Todo en calma por ahora. Si ya almorzaste, es buen momento para una misión de media tarde.",
        "Hola, Cazador. A esta hora ({time}) un poco de agua fría o estiramiento mantiene a raya cualquier sueño vespertino.",
        "Media tarde estable en el núcleo. Tienes {gold} G acumulados y tus estadísticas siguen firmes.",
        "Son las {time}. Si estás en una pausa entre actividades reales, relaja la vista un momento; yo vigilo el radar.",
        "Buenas tardes. No importa qué tan pesada haya estado la mañana, la tarde siempre te deja remontar el marcador.",
        "Telemetría de las {time} sin alertas de peligro. Avanza con calma por tus pendientes restantes.",
        "Hola, Jugador 1. Tus sombras reportan una tarde sin anomalías críticas en el perímetro.",
        "Reloj del Sistema marcando las {time}. Mantén esa serenidad hasta cerrar la jornada."
    ],

    night: [
        "Son las {time}. La noche está en calma y tienes {hp} HP. Si ya terminaste por hoy, disfruta tu descanso libre de culpa.",
        "Buenas noches, Jugador 1. Qué satisfacción llegar a la noche con el Sistema en orden y sin emergencias.",
        "Reporte sereno de las {time}: Revisa que no te quede nada pendiente antes de las 9:15 PM y relájate.",
        "Hola, Cazador. La tranquilidad de esta noche ({time}) es el premio por haber mantenido el control durante el día.",
        "Son las {time}. Si solo entraste a revisar tus estadísticas antes de dormir, todo está resguardado en la Caja Negra.",
        "Noche despejada en el Trono de las Sombras. Recuerda guardar a tus comandantes si quieres amanecer con el MP intacto.",
        "Buenas noches. Tu nivel {level} y tus {gold} G te estarán esperando mañana a primera hora.",
        "A las {time} el mejor movimiento estratégico es ir apagando motores para proteger tu salud del día siguiente.",
        "Hola, Jugador 1. Todo en paz en el servidor nocturno. Que tengas un descanso digno de un Monarca.",
        "Cierre de bitácora a las {time}: Signos vitales estables y dominio en calma. Hasta mañana, Cazador."
    ]
};

if (typeof SYSTEM_AI_LINES !== 'undefined') {
    Object.keys(AI_IDLE_CALM_EXPANSION_V6).forEach(catKey => {
        if (!SYSTEM_AI_LINES[catKey]) {
            SYSTEM_AI_LINES[catKey] = AI_IDLE_CALM_EXPANSION_V6[catKey];
        } else if (Array.isArray(SYSTEM_AI_LINES[catKey])) {
            SYSTEM_AI_LINES[catKey].push(...AI_IDLE_CALM_EXPANSION_V6[catKey]);
        }
    });
}