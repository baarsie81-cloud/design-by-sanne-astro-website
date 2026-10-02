// These presentations contain local fixtures only: no requests, auth or persistence.
export function initializePortfolioMotion() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const galleries = Array.from(document.querySelectorAll<HTMLElement>("[data-portfolio-gallery]")).filter(gallery => !gallery.dataset.initialized);
  if (!galleries.length) return;
  // One presentation per category. Website and dashboard teasers can both run;
  // neither steals playback from the other when they share the homepage collage.
  const visibility = new Map<HTMLElement, number>();
  const updates = new Map<HTMLElement, (active: boolean) => void>();

  const updateVisibility = () => {
    const winners = new Map<string, { gallery: HTMLElement; ratio: number }>();
    for (const [gallery, ratio] of visibility) {
      const kind = gallery.dataset.portfolioKind || "dashboards";
      if (ratio > .2 && ratio > (winners.get(kind)?.ratio || 0)) winners.set(kind, { gallery, ratio });
    }
    updates.forEach((update, gallery) => update(gallery === winners.get(gallery.dataset.portfolioKind || "dashboards")?.gallery && !document.hidden));
  };

  galleries.forEach((gallery) => {
    if (gallery.dataset.initialized) return;
    gallery.dataset.initialized = "true";
    const stage = gallery.querySelector<HTMLElement>("[data-portfolio-stage]")!;
    const projects = Array.from(gallery.querySelectorAll<HTMLElement>("[data-portfolio-project]"));
    const selections = Array.from(gallery.querySelectorAll<HTMLButtonElement>("[data-portfolio-select]"));
    const toggle = gallery.querySelector<HTMLButtonElement>("[data-portfolio-toggle]")!;
    const duration = Number(gallery.dataset.duration) || 7500;
    const websites = gallery.dataset.portfolioKind === "websites";
    const screenTimes = websites ? [2000, 4000, 6000] : [2500, 5100];
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
    let preloadedProject = -1;
    let requestedProject = -1;

    const app = () => projects[projectIndex].querySelector<HTMLElement>("[data-demo-app]")!;
    const running = () => visible && !paused && !hovering && !focused && !reduced;
    const websiteMobile = () => window.matchMedia("(max-width: 620px)").matches && gallery.dataset.compact !== "true";

    function loadWebsiteAssets(index: number, all = true) {
      if (!websites) return;
      const project = projects[index];
      if (all && project.dataset.websiteLoaded === "true" && (!websiteMobile() || project.dataset.websiteMenusLoaded === "true")) return;
      project.querySelectorAll<HTMLSourceElement>("[data-website-mobile-src]").forEach(source => {
        if (all || source.closest("picture")?.matches("[data-demo-view]:first-child, .website-scroll-picture, .website-sticky-header")) {
          if (source.getAttribute("srcset") !== source.dataset.websiteMobileSrc) source.srcset = source.dataset.websiteMobileSrc!;
        }
      });
      project.querySelectorAll<HTMLImageElement>("[data-website-src]").forEach(image => {
        if (all || image.closest("picture")?.matches("[data-demo-view]:first-child, .website-scroll-picture, .website-sticky-header")) {
          image.loading = "eager";
          if (image.getAttribute("src") !== image.dataset.websiteSrc) image.src = image.dataset.websiteSrc!;
        }
      });
      if (all && websiteMobile()) {
        project.querySelectorAll<HTMLImageElement>("[data-website-menu-src]").forEach(menu => { menu.loading = "eager"; menu.src = menu.dataset.websiteMenuSrc!; });
        project.dataset.websiteMenusLoaded = "true";
      }
      if (all) project.dataset.websiteLoaded = "true";
    }

    function updateWebsiteScroll() {
      const demo = app();
      const scroll = demo.querySelector<HTMLElement>("[data-website-scroll]");
      const view = demo.querySelectorAll<HTMLElement>("[data-demo-view]")[currentScreen];
      if (scroll && view) scroll.style.transform = `translateY(-${websiteMobile() ? view.dataset.mobileOffset : view.dataset.desktopOffset}%)`;
    }

    function showScreen(screen: number) {
      if (screen === currentScreen) return;
      currentScreen = screen;
      app().dataset.screen = String(screen);
      if (websites) app().dataset.menu = "false";
      app().querySelectorAll<HTMLElement>("[data-demo-view]").forEach((view, index) => {
        if (websites && view.matches(".website-shot")) {
          view.hidden = false;
          view.classList.toggle("is-current", index === screen);
        } else view.hidden = index !== screen;
      });
      app().querySelectorAll<HTMLElement>("[data-demo-nav], [data-demo-mobile-nav]").forEach((item) => {
        item.classList.toggle("is-selected", Number(item.dataset.demoNav ?? item.dataset.demoMobileNav) === screen);
      });
      if (websites) updateWebsiteScroll();
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
      if (websites && manual) {
        requestedProject = index;
        loadWebsiteAssets(index, !reduced);
        const image = projects[index].querySelector<HTMLImageElement>("[data-website-src]");
        if (image && (!image.complete || !image.naturalWidth)) {
          gallery.querySelector<HTMLElement>("[data-portfolio-announcement]")!.textContent = "Websitevoorbeeld wordt geladen.";
          image.decode().then(() => { if (requestedProject === index) selectProject(index, true); }).catch(() => {
            gallery.querySelector<HTMLElement>("[data-portfolio-announcement]")!.textContent = "Dit voorbeeld kon niet laden. Probeer het nogmaals.";
          });
          return;
        }
      }
      projectIndex = index;
      elapsed = 0;
      currentScreen = -1;
      movingTo = -1;
      clickedScreen = -1;
      preloadedProject = -1;
      projects.forEach((project, itemIndex) => {
        project.classList.toggle("is-active", itemIndex === index);
        project.setAttribute("aria-hidden", String(itemIndex !== index));
      });
      selections.forEach((button, itemIndex) => button.setAttribute("aria-pressed", String(itemIndex === index)));
      gallery.querySelectorAll<HTMLElement>("[data-portfolio-title]").forEach((title) => title.textContent = projects[index].dataset.title!);
      const description = gallery.querySelector<HTMLElement>("[data-portfolio-description]");
      if (description) description.textContent = projects[index].dataset.description!;
      if (websites) {
        gallery.querySelectorAll<HTMLElement>("[data-portfolio-category]").forEach(label => label.textContent = projects[index].dataset.category!);
        const note = gallery.querySelector<HTMLElement>("[data-portfolio-note]");
        if (note) note.textContent = projects[index].dataset.note!;
        if (visible || manual) loadWebsiteAssets(index, !reduced);
      }
      if (manual) gallery.querySelector<HTMLElement>("[data-portfolio-announcement]")!.textContent = `${projects[index].dataset.title}. ${projects[index].dataset.note}`;
      const scroll = app().querySelector<HTMLElement>("[data-website-scroll]");
      if (scroll) scroll.style.transition = "none";
      showScreen(0);
      resetCursor();
      if (scroll) scroll.style.transition = "";
      gallery.style.setProperty("--portfolio-progress", "0%");
    }

    function tick(time: number) {
      frame = 0;
      if (!running()) { lastTime = 0; return; }
      if (lastTime) elapsed += Math.min(time - lastTime, 100);
      lastTime = time;
      if (websites && elapsed >= duration - 1500 && preloadedProject !== (projectIndex + 1) % projects.length) {
        preloadedProject = (projectIndex + 1) % projects.length;
        loadWebsiteAssets(preloadedProject);
      }
      if (elapsed >= duration) {
        const next = (projectIndex + 1) % projects.length;
        // Keep the current visual until the next project's first image is ready.
        const image = projects[next].querySelector<HTMLImageElement>("[data-website-src]");
        if (!websites || (image?.complete && image.naturalWidth)) selectProject(next);
      }
      const nextTarget = screenTimes.filter(time => elapsed >= time - 650).length;
      if (nextTarget && nextTarget !== movingTo) {
        movingTo = nextTarget;
        if (websites && websiteMobile()) app().dataset.menu = nextTarget === 3 && app().dataset.mobileContactDirect ? "false" : "true";
        positionCursor(nextTarget);
      }
      const nextScreen = screenTimes.filter(time => elapsed >= time).length;
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
      if (websites && visible) loadWebsiteAssets(projectIndex, !reduced);
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
      if (websites) { updateWebsiteScroll(); if (visible) loadWebsiteAssets(projectIndex, !reduced); }
      if (movingTo > 0) positionCursor(movingTo); else resetCursor();
    });
    resize.observe(stage);
    updates.set(gallery, (active) => { visible = active; if (active) loadWebsiteAssets(projectIndex, !reduced); syncPlayback(); });
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
