// These presentations contain local fixtures only: no requests, auth or persistence.
export function initializePortfolioMotion() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const galleries = Array.from(document.querySelectorAll<HTMLElement>("[data-portfolio-gallery]"));
  // Only the most visible presentation runs, including when a gallery and teaser coexist.
  const visibility = new Map<HTMLElement, number>();
  const updates = new Map<HTMLElement, (active: boolean) => void>();

  const updateVisibility = () => {
    let winner: HTMLElement | undefined;
    let highest = 0.2;
    for (const [gallery, ratio] of visibility) {
      if (ratio > highest) { highest = ratio; winner = gallery; }
    }
    updates.forEach((update, gallery) => update(gallery === winner && !document.hidden));
  };

  galleries.forEach((gallery) => {
    if (gallery.dataset.initialized) return;
    gallery.dataset.initialized = "true";
    const stage = gallery.querySelector<HTMLElement>("[data-portfolio-stage]")!;
    const projects = Array.from(gallery.querySelectorAll<HTMLElement>("[data-portfolio-project]"));
    const selections = Array.from(gallery.querySelectorAll<HTMLButtonElement>("[data-portfolio-select]"));
    const toggle = gallery.querySelector<HTMLButtonElement>("[data-portfolio-toggle]")!;
    const duration = Number(gallery.dataset.duration) || 7500;
    let projectIndex = 0;
    let elapsed = 0;
    let lastTime = 0;
    let frame = 0;
    let visible = false;
    let paused = false;
    let hovering = false;
    let focused = false;
    let reduced = reducedMotion.matches;
    let currentScreen = -1;
    let movingTo = -1;
    let clickedScreen = -1;

    const app = () => projects[projectIndex].querySelector<HTMLElement>("[data-demo-app]")!;
    const running = () => visible && !paused && !hovering && !focused && !reduced;

    function showScreen(screen: number) {
      if (screen === currentScreen) return;
      currentScreen = screen;
      app().dataset.screen = String(screen);
      app().querySelectorAll<HTMLElement>("[data-demo-view]").forEach((view, index) => {
        view.hidden = index !== screen;
      });
      app().querySelectorAll<HTMLElement>("[data-demo-nav], [data-demo-mobile-nav]").forEach((item) => {
        item.classList.toggle("is-selected", Number(item.dataset.demoNav ?? item.dataset.demoMobileNav) === screen);
      });
    }

    function positionCursor(targetScreen: number, clicked = false) {
      const demo = app();
      const cursor = demo.querySelector<SVGElement>("[data-demo-cursor]")!;
      const isMobile = window.matchMedia("(max-width: 620px)").matches && gallery.dataset.compact !== "true";
      const target = demo.querySelector<HTMLElement>(isMobile ? `[data-mobile-target="${targetScreen}"]` : `[data-demo-target="${targetScreen}"]`);
      const rect = demo.getBoundingClientRect();
      const scale = rect.width / demo.offsetWidth;
      const targetRect = target?.getBoundingClientRect();
      const x = targetRect ? (targetRect.left + targetRect.width * .65 - rect.left) / scale : demo.offsetWidth * .64;
      const y = targetRect ? (targetRect.top + targetRect.height * .6 - rect.top) / scale : demo.offsetHeight * .72;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      if (clicked) {
        const ring = demo.querySelector<HTMLElement>("[data-demo-click-ring]")!;
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
        ring.classList.remove("is-clicking");
        void ring.offsetWidth;
        ring.classList.add("is-clicking");
      }
    }

    function resetCursor() {
      const demo = app();
      const cursor = demo.querySelector<SVGElement>("[data-demo-cursor]")!;
      cursor.style.transition = "none";
      cursor.style.transform = `translate(${demo.offsetWidth * .68}px, ${demo.offsetHeight * .7}px)`;
      void demo.offsetWidth;
      cursor.style.transition = "";
    }

    function selectProject(index: number, manual = false) {
      projectIndex = index;
      elapsed = 0;
      currentScreen = -1;
      movingTo = -1;
      clickedScreen = -1;
      projects.forEach((project, itemIndex) => {
        project.classList.toggle("is-active", itemIndex === index);
        project.setAttribute("aria-hidden", String(itemIndex !== index));
      });
      selections.forEach((button, itemIndex) => button.setAttribute("aria-pressed", String(itemIndex === index)));
      gallery.querySelectorAll<HTMLElement>("[data-portfolio-title]").forEach((title) => title.textContent = projects[index].dataset.title!);
      const description = gallery.querySelector<HTMLElement>("[data-portfolio-description]");
      if (description) description.textContent = projects[index].dataset.description!;
      if (manual) gallery.querySelector<HTMLElement>("[data-portfolio-announcement]")!.textContent = `${projects[index].dataset.title}. Demonstratie met fictieve gegevens.`;
      showScreen(0);
      resetCursor();
      gallery.style.setProperty("--portfolio-progress", "0%");
    }

    function tick(time: number) {
      frame = 0;
      if (!running()) { lastTime = 0; return; }
      if (lastTime) elapsed += Math.min(time - lastTime, 100);
      lastTime = time;
      if (elapsed >= duration) selectProject((projectIndex + 1) % projects.length);
      const nextTarget = elapsed >= 4450 ? 2 : elapsed >= 1850 ? 1 : 0;
      if (nextTarget && nextTarget !== movingTo) { movingTo = nextTarget; positionCursor(nextTarget); }
      const nextScreen = elapsed >= 5100 ? 2 : elapsed >= 2500 ? 1 : 0;
      if (nextScreen && nextScreen !== clickedScreen) {
        clickedScreen = nextScreen;
        // The click ring is positioned before changing the tab or replacing its row.
        positionCursor(nextScreen, true);
        showScreen(nextScreen);
      }
      gallery.style.setProperty("--portfolio-progress", `${Math.min(100, elapsed / duration * 100)}%`);
      frame = requestAnimationFrame(tick);
    }

    function syncPlayback() {
      gallery.dataset.playing = String(running());
      gallery.dataset.reduced = String(reduced);
      const manuallyStopped = paused || reduced;
      toggle.setAttribute("aria-label", manuallyStopped ? "Speel de demonstratie af" : "Pauzeer de demonstratie");
      toggle.setAttribute("aria-pressed", String(manuallyStopped));
      toggle.querySelector<HTMLElement>("[data-pause-icon]")!.hidden = manuallyStopped;
      toggle.querySelector<HTMLElement>("[data-play-icon]")!.hidden = !manuallyStopped;
      const status = gallery.querySelector<HTMLElement>("[data-portfolio-status]");
      if (status) status.textContent = manuallyStopped ? "Presentatie gepauzeerd" : hovering || focused ? "Rustig kijken · tijdelijk gepauzeerd" : "Automatische demonstratie";
      if (!running() && frame) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
      if (running() && !frame) { lastTime = 0; frame = requestAnimationFrame(tick); }
    }

    toggle.addEventListener("click", () => {
      if (reduced) reduced = false; // Explicit playback is permitted; autoplay stays disabled by default.
      else paused = !paused;
      syncPlayback();
    });
    selections.forEach((button, index) => button.addEventListener("click", () => selectProject(index, true)));
    stage.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") { hovering = true; syncPlayback(); } });
    stage.addEventListener("pointerleave", () => { hovering = false; syncPlayback(); });
    // A touch on the visual pauses/resumes it; the demo itself has no usable controls.
    stage.addEventListener("click", (event) => { if (!(event.target as Element).closest("button") && window.matchMedia("(hover: none)").matches) { paused = !paused; syncPlayback(); } });
    // The play/pause control must still work while it has keyboard or touch focus.
    gallery.addEventListener("focusin", (event) => { focused = event.target !== toggle; syncPlayback(); });
    gallery.addEventListener("focusout", (event) => { if (!gallery.contains(event.relatedTarget as Node)) { focused = false; syncPlayback(); } });
    reducedMotion.addEventListener("change", () => { reduced = reducedMotion.matches; syncPlayback(); });

    const resize = new ResizeObserver(() => {
      if (gallery.dataset.compact === "true") gallery.style.setProperty("--demo-scale", String(stage.clientWidth / 1120));
      if (movingTo > 0) positionCursor(movingTo); else resetCursor();
    });
    resize.observe(stage);
    updates.set(gallery, (active) => { visible = active; syncPlayback(); });
    selectProject(0);
    syncPlayback();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => visibility.set(entry.target as HTMLElement, entry.intersectionRatio));
    updateVisibility();
  }, { threshold: [0, .2, .4, .6, .8, 1] });
  galleries.forEach((gallery) => observer.observe(gallery));
  document.addEventListener("visibilitychange", updateVisibility);
}
