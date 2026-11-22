(() => {
  const { tramites: TRAMITES_DATA, hitos: HITOS_DATA, tourScenes: TOUR_SCENES } = window.PORTAL_DATA || {};
  if (!TRAMITES_DATA || !HITOS_DATA || !TOUR_SCENES) return;

  const TOTAL_TOUR_SECONDS = TOUR_SCENES.reduce((acc, scene) => acc + scene.duration, 0);
  const DEFAULT_HITO_FALLBACK = 'assets/img/hitos/placeholder-hito.svg';

  const state = {
    currentHito: 0,
    tourInterval: null,
    tourTimeouts: [],
    tourElapsed: 0,
    tourPaused: false,
    lastSceneIndex: -1
  };

  function setBodyScrollLocked(locked) {
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function toggleMobileMenu(forceState) {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu || !btn) return;
    const shouldOpen = typeof forceState === 'boolean' ? forceState : menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !shouldOpen);
    btn.setAttribute('aria-expanded', String(shouldOpen));
  }

  function filterTramites(category, activeBtn) {
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      const isSelected = btn === activeBtn;
      btn.classList.toggle('bg-patria-blue', isSelected);
      btn.classList.toggle('text-white', isSelected);
      btn.classList.toggle('bg-slate-100', !isSelected);
      btn.classList.toggle('text-slate-700', !isSelected);
    });

    document.querySelectorAll('.tramite-card').forEach((card) => {
      const matches = category === 'todos' || card.dataset.category === category;
      card.style.display = matches ? 'flex' : 'none';
    });
  }

  function openTramiteModal(key) {
    const data = TRAMITES_DATA[key];
    if (!data) return;

    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;

    const reqList = document.getElementById('modal-reqs');
    reqList.replaceChildren();
    data.reqs.forEach((reqText) => {
      const li = document.createElement('li');
      li.textContent = `• ${reqText}`;
      reqList.appendChild(li);
    });

    document.getElementById('tramite-modal').classList.remove('hidden');
    setBodyScrollLocked(true);
  }

  function closeTramiteModal() {
    const modal = document.getElementById('tramite-modal');
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      setBodyScrollLocked(false);
    }
  }

  function selectHito(index) {
    const safeIndex = ((index % HITOS_DATA.length) + HITOS_DATA.length) % HITOS_DATA.length;
    state.currentHito = safeIndex;
    const h = HITOS_DATA[safeIndex];

    document.getElementById('hito-badge').textContent = h.badge;
    document.getElementById('hito-title').textContent = h.title;
    document.getElementById('hito-subtitle').textContent = h.subtitle;
    document.getElementById('hito-desc').textContent = h.desc;
    document.getElementById('hito-edu').textContent = h.edu;

    const hitoImage = document.getElementById('hito-img');
    hitoImage.dataset.fallbackUsed = 'false';
    hitoImage.src = h.img;

    document.querySelectorAll('.map-pin').forEach((pin, idx) => {
      const badge = pin.querySelector('span:first-child');
      const isSelected = idx === safeIndex;

      pin.classList.toggle('bg-patria-blue', isSelected);
      pin.classList.toggle('text-white', isSelected);
      pin.classList.toggle('border-patria-yellow', isSelected);
      pin.classList.toggle('map-pin-active', isSelected);
      pin.classList.toggle('bg-white', !isSelected);
      pin.classList.toggle('text-patria-blue', !isSelected);
      pin.classList.toggle('border-patria-blue', !isSelected);

      if (badge) {
        badge.classList.toggle('bg-patria-yellow', isSelected);
        badge.classList.toggle('text-patria-blue', isSelected);
        badge.classList.toggle('bg-patria-blue', !isSelected);
        badge.classList.toggle('text-white', !isSelected);
      }
    });
  }

  // Los colores de las pestañas (Re) los controla el HTML con aria-selected
  // (clases aria-selected: y group-aria-selected: de Tailwind). Aquí solo se cambia ese atributo.
  function selectReTab(idx) {
    document.querySelectorAll('[data-re-tab]').forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === idx));
    });
    selectHito(idx);
  }

  function openImagePopup(imageSrc) {
    if (!imageSrc) return;
    const popup = document.getElementById('image-popup');
    const image = document.getElementById('image-popup-content');
    image.src = imageSrc;
    popup.classList.remove('hidden');
    popup.classList.add('flex');
    setBodyScrollLocked(true);
  }

  function closeImagePopup() {
    const popup = document.getElementById('image-popup');
    if (!popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
      popup.classList.remove('flex');
      document.getElementById('image-popup-content').src = '';
      setBodyScrollLocked(false);
    }
  }

  function clearTourTimers() {
    if (state.tourInterval) {
      clearInterval(state.tourInterval);
      state.tourInterval = null;
    }
    state.tourTimeouts.forEach((id) => clearTimeout(id));
    state.tourTimeouts = [];
  }

  function updatePauseButtonUI() {
    const btn = document.getElementById('tour-play-pause-btn');
    if (!btn) return;
    btn.innerHTML = state.tourPaused
      ? '<i class="fa-solid fa-play" aria-hidden="true"></i> <span>Reanudar</span>'
      : '<i class="fa-solid fa-pause" aria-hidden="true"></i> <span>Pausar</span>';
  }

  function runTourTick() {
    const pct = Math.min(100, (state.tourElapsed / TOTAL_TOUR_SECONDS) * 100);
    document.getElementById('tour-progress-bar').style.width = `${pct}%`;

    const sec = Math.floor(state.tourElapsed);
    const totalFormatted = `00:${TOTAL_TOUR_SECONDS < 10 ? '0' + TOTAL_TOUR_SECONDS : TOTAL_TOUR_SECONDS}`;
    document.getElementById('tour-timer').textContent = `00:${sec < 10 ? '0' + sec : sec} / ${totalFormatted}`;

    let acc = 0;
    let activeIdx = 0;
    for (let i = 0; i < TOUR_SCENES.length; i++) {
      acc += TOUR_SCENES[i].duration;
      if (state.tourElapsed < acc) {
        activeIdx = i;
        break;
      }
    }

    if (activeIdx !== state.lastSceneIndex) {
      state.lastSceneIndex = activeIdx;
      state.tourTimeouts.forEach((id) => clearTimeout(id));
      state.tourTimeouts = [];

      const scene = TOUR_SCENES[activeIdx];
      document.getElementById('tour-subtitle').textContent = scene.subtitle;
      document.getElementById('tour-step-label').textContent = scene.label;

      document.querySelectorAll('[data-tour-step]').forEach((el) => el.classList.remove('tour-highlight'));
      const targetEl = document.getElementById(scene.sectionId);
      if (targetEl) {
        targetEl.classList.add('tour-highlight');
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (scene.sectionId === 'ruta-patria') {
        state.tourTimeouts.push(setTimeout(() => selectHito(1), 3500));
        state.tourTimeouts.push(setTimeout(() => selectHito(2), 7000));
      }
    }
  }

  function startVideoTour() {
    clearTourTimers();
    document.getElementById('video-tour-player').classList.remove('hidden');
    state.tourElapsed = 0;
    state.tourPaused = false;
    state.lastSceneIndex = -1;
    updatePauseButtonUI();
    runTourTick();

    state.tourInterval = setInterval(() => {
      if (!state.tourPaused) {
        state.tourElapsed += 0.5;
        if (state.tourElapsed >= TOTAL_TOUR_SECONDS) {
          stopVideoTour();
          return;
        }
        runTourTick();
      }
    }, 500);
  }

  function stopVideoTour() {
    clearTourTimers();
    document.getElementById('video-tour-player').classList.add('hidden');
    document.querySelectorAll('[data-tour-step]').forEach((el) => el.classList.remove('tour-highlight'));
  }

  function bindImageFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach((img) => {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackUsed === 'true') return;
        img.dataset.fallbackUsed = 'true';
        img.src = img.dataset.fallback || DEFAULT_HITO_FALLBACK;
      });
    });
  }

  function bindEvents() {
    // Delegación global de clics
    document.addEventListener('click', (e) => {
      const tramiteTrigger = e.target.closest('[data-tramite]');
      if (tramiteTrigger) {
        openTramiteModal(tramiteTrigger.dataset.tramite);
        return;
      }

      if (e.target.closest('[data-close-tramite]') || e.target.id === 'tramite-modal') {
        closeTramiteModal();
        return;
      }

      const filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        filterTramites(filterBtn.dataset.filter, filterBtn);
        return;
      }

      const reTabBtn = e.target.closest('[data-re-tab]');
      if (reTabBtn) {
        selectReTab(Number(reTabBtn.dataset.reTab));
        return;
      }

      const hitoPin = e.target.closest('[data-hito]');
      if (hitoPin) {
        selectHito(Number(hitoPin.dataset.hito));
        return;
      }

      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        const { action } = actionBtn.dataset;
        if (action === 'start-tour') startVideoTour();
        if (action === 'next-hito') selectHito(state.currentHito + 1);
        return;
      }

      if (e.target.closest('[data-close-menu]')) {
        toggleMobileMenu(false);
      }
    });

    // Menú móvil
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => toggleMobileMenu());

    // Ampliar imagen de hito y cerrar visor
    document.getElementById('hito-img')?.addEventListener('click', (e) => openImagePopup(e.currentTarget.src));
    document.getElementById('close-image-popup-btn')?.addEventListener('click', closeImagePopup);
    document.getElementById('image-popup')?.addEventListener('click', (e) => {
      if (e.target.id === 'image-popup') closeImagePopup();
    });

    // Controles del reproductor de recorrido en video
    document.getElementById('tour-play-pause-btn')?.addEventListener('click', () => {
      state.tourPaused = !state.tourPaused;
      updatePauseButtonUI();
    });

    document.getElementById('tour-next-btn')?.addEventListener('click', () => {
      let acc = 0;
      for (let i = 0; i < TOUR_SCENES.length; i++) {
        if (state.tourElapsed < acc + TOUR_SCENES[i].duration) {
          state.tourElapsed = Math.min(TOTAL_TOUR_SECONDS - 1, acc + TOUR_SCENES[i].duration);
          state.lastSceneIndex = -1;
          runTourTick();
          break;
        }
        acc += TOUR_SCENES[i].duration;
      }
    });

    document.getElementById('tour-prev-btn')?.addEventListener('click', () => {
      let acc = 0;
      for (let i = 0; i < TOUR_SCENES.length; i++) {
        if (state.tourElapsed < acc + TOUR_SCENES[i].duration) {
          const prevStart = i > 0 ? acc - TOUR_SCENES[i - 1].duration : 0;
          state.tourElapsed = Math.max(0, prevStart);
          state.lastSceneIndex = -1;
          runTourTick();
          break;
        }
        acc += TOUR_SCENES[i].duration;
      }
    });

    document.getElementById('tour-progress-track')?.addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      state.tourElapsed = ratio * TOTAL_TOUR_SECONDS;
      state.lastSceneIndex = -1;
      runTourTick();
    });

    document.getElementById('tour-stop-btn')?.addEventListener('click', stopVideoTour);

    // Formularios
    document.getElementById('pedagogica-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fb = document.getElementById('pedagogica-feedback');
      fb.textContent =
        '¡Solicitud enviada a contacto@turismoelmonte.cl! Nuestro equipo educativo te contactará dentro de 24 horas para coordinar la Ruta de la Patria.';
      fb.classList.remove('hidden');
      e.target.reset();
    });

    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const randomCode = 'ELM-2026-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('ticket-number').textContent = randomCode;
      document.getElementById('contact-success').classList.remove('hidden');
      e.target.reset();
    });

    // Tecla Escape para cerrar overlays
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeImagePopup();
        closeTramiteModal();
        toggleMobileMenu(false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindImageFallbacks();
    bindEvents();
    selectHito(0);
  });
})();