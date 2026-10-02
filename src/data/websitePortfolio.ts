// Captured portfolio visuals only. No customer-site scripts or form endpoints.
export const websiteMotionAssets = "/assets/designbysanne/project-visuals/website-motion";
export const websiteProjects = [
  {
    id: "lifeline",
    title: "Life Line Trainingen",
    category: "Websiteontwerp & nieuwbouw",
    description: "Een complete nieuwe website met een heldere route naar het trainingsaanbod. Van de homepage naar Zwembaden en Hulpverleners, met een contactformulier als volgende stap.",
    note: "Presentatie van het nieuwe websiteontwerp.",
    screens: ["Homepage", "Zwembaden", "Hulpverleners", "Contactformulier"],
    desktopTargets: [{ x: 33.53, y: 4.99 }, { x: 47.02, y: 4.99 }, { x: 64.12, y: 4.99 }],
    // The last mobile step uses the visible “Hulp bij kiezen” contact CTA.
    mobileTargets: [{ x: 62.94, y: 17.19 }, { x: 62.94, y: 60.3 }, { x: 60, y: 78.7 }],
    scroll: false,
  },
  {
    id: "verrijkje",
    title: "VerRijkje",
    category: "Website-upgrade · WordPress",
    description: "Een bestaande WordPress-site gericht vernieuwd in uitstraling en inhoud. De demonstratie loopt van de homepage via Therapie & meer en Bokstherapie naar de contactpagina.",
    note: "Gerichte vernieuwing van een bestaande website.",
    screens: ["Homepage", "Therapie & meer", "Bokstherapie", "Contact"],
    desktopTargets: [{ x: 37.82, y: 2.89 }, { x: 44.54, y: 2.89 }, { x: 72.89, y: 2.89 }],
    mobileTargets: [{ x: 57.2, y: 18.38 }, { x: 57.2, y: 24.85 }, { x: 57.2, y: 57.2 }],
    scroll: false,
  },
  {
    id: "mova",
    title: "MOVA Training",
    category: "Ontwerpconcept · fictief merk",
    description: "Een landingpage-concept voor een fictief trainingsmerk. De navigatie beweegt naar Trainingen, Werkwijze en Contact op één pagina. Zo kan ook een compacte website een compleet verhaal vertellen.",
    note: "Ontwerpconcept voor een fictief merk; geen klantcase.",
    screens: ["Homepage", "Trainingen", "Werkwijze", "Contactformulier"],
    desktopTargets: [{ x: 77.75, y: 3.85 }, { x: 83.77, y: 3.85 }, { x: 89.33, y: 3.85 }],
    mobileTargets: [{ x: 58.15, y: 17.5 }, { x: 58.15, y: 26.32 }, { x: 58.15, y: 35.15 }],
    scroll: true,
  },
] as const;
export type WebsiteProject = (typeof websiteProjects)[number];

// Scroll positions correspond to the captured page, not a live customer site.
export const movaScroll = {
  desktop: [0, 889 / 2782 * 100, 1476.390625 / 2782 * 100, 1892 / 2782 * 100],
  mobile: [0, 1157.390625 / 3631 * 100, 1700.171875 / 3631 * 100, 2916.546875 / 3631 * 100],
};
