/* ==========================================================================
   EVENTS.JS - MOTOR DE FISURAS RARAS (MÁX 1 DIARIA) Y PROVOCACIÓN DE IRON
   ========================================================================== */

let lastFissureCheck = 0;

function checkFissureSpawn(forcedByIron = false) {
    if (!p || p.penaltyActive || (typeof activeDungeon !== 'undefined' && activeDungeon) || activeFissure) return;

    let now = Date.now();
    let todayKey = new Date().toDateString();

    if (!forcedByIron) {
        // 1. Tope estricto: Máximo 1 fisura sorpresa natural por día
        if (p.lastNaturalFissureDay === todayKey) return;

        // 2. Enfriamiento de 90 minutos reales entre chequeos de radar
        if (now - lastFissureCheck < 90 * 60000) return;
        lastFissureCheck = now;

        // 3. Probabilidad reducida drásticamente al 3.5% (Verdadera sorpresa)
        if (Math.random() > 0.035) return;

        p.lastNaturalFissureDay = todayKey;
        if (typeof saveData === "function") saveData();
    }

    let zoneKey = (p.currentZone && typeof fissureDB !== 'undefined' && fissureDB[p.currentZone]) ? p.currentZone : "Base";
    let pool = (typeof fissureDB !== 'undefined' && fissureDB[zoneKey]) ? fissureDB[zoneKey] : [
        { title: "Enjambre de Insectos", desc: "Haz 15 flexiones o sentadillas inmediatamente para disipar la energía mágica.", rank: "E", xp: 50, gold: 25 }
    ];

    let picked = pool[Math.floor(Math.random() * pool.length)];
    let mult = forcedByIron ? 3 : 1;

    activeFissure = {
        title: forcedByIron ? `[PROVOCADA POR IRON] ${picked.title}` : `Fisura Rango ${picked.rank}: ${picked.title}`,
        desc: picked.desc,
        rank: forcedByIron ? "A" : (picked.rank || "C"),
        xp: (picked.xp || 60) * mult,
        gold: (picked.gold || 30) * mult,
        ironProtected: forcedByIron
    };

    let titleEl = document.querySelector('.fissure-content .modal-title');
    if (titleEl) titleEl.innerHTML = `⚠️ FISURA DETECTADA: RANGO ${activeFissure.rank}`;

    let descEl = document.getElementById('fissure-desc');
    if (descEl) {
        descEl.innerHTML = `<strong style="color:var(--neon-main); display:block; margin-bottom:8px;">${activeFissure.title}</strong>${activeFissure.desc}<br><br><span style="color:var(--text-gold); font-size:0.9em;">Recompensa: +${activeFissure.xp} XP | +${activeFissure.gold} G Base</span>`;
    }

    if (typeof playSystemSound === "function") playSystemSound('danger');
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    if (typeof openModal === "function") openModal('fissure-modal');
}

function acceptFissure() {
    if (!activeFissure) return;
    let reward = {
        type: 'fissure',
        xp: activeFissure.xp,
        gold: activeFissure.gold
    };
    activeFissure = null;
    closeModal('fissure-modal');
    if (typeof openSealModal === "function") {
        openSealModal(reward);
    }
}

function postponeFissure() {
    if (!activeFissure) return;
    p.activeEvent = {
        id: "fiss_" + Date.now(),
        title: activeFissure.title,
        desc: activeFissure.desc,
        xp: activeFissure.xp,
        gold: activeFissure.gold
    };
    activeFissure = null;
    closeModal('fissure-modal');
    saveData();
    if (typeof renderRoutine === "function") renderRoutine();
    if (typeof systemNotify === "function") {
        systemNotify("⚡ Fisura sellada temporalmente en tu Tablón de Misiones.", "gold");
    }
}

function fleeFissure() {
    let wasIronProtected = activeFissure && activeFissure.ironProtected;
    let ironEquipped = p.equippedShadows && p.equippedShadows.includes('iron');

    activeFissure = null;
    closeModal('fissure-modal');

    if (wasIronProtected || ironEquipped) {
        systemNotify("🛡️ Iron golpeó su escudo y contuvo a las bestias mientras te retirabas. 0 SP perdidos.", "info");
    } else {
        p.sp = Math.max(0, p.sp - 10);
        saveData();
        if (typeof updateHUD === "function") updateHUD();
        systemNotify("Has huido de la fisura. Tu espíritu se debilita: -10 SP.", "danger");
    }
}
