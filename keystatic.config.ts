import { config, fields, singleton } from "@keystatic/core";

const isGitHubMode = import.meta.env.PUBLIC_KEYSTATIC_MODE === "github";

const requiredText = (label: string, multiline = false) =>
  fields.text({
    label,
    multiline,
    validation: { isRequired: true },
  });

const pageImage = (label: string) =>
  fields.image({
    label,
    directory: "public/assets/designbysanne",
    publicPath: "/assets/designbysanne",
    validation: { isRequired: true },
  });

const numberedCards = (label: string) =>
  fields.array(
    fields.object({
      number: requiredText("Nummer"),
      title: requiredText("Titel"),
      text: requiredText("Tekst", true),
    }),
    { label },
  );

const steps = (label: string) =>
  fields.array(
    fields.object({
      label: requiredText("Staplabel"),
      title: requiredText("Titel"),
      text: requiredText("Tekst", true),
    }),
    { label },
  );

export default config({
  storage: isGitHubMode
    ? {
        kind: "github",
        repo:
          import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO ??
          "baarsie81-cloud/design-by-sanne-astro-website",
      }
    : {
        kind: "local",
      },
  ui: {
    brand: {
      name: "Design by Sanne CMS",
    },
    navigation: {
      Algemeen: ["siteSettings"],
      "Pagina's": ["home", "diensten", "overMij", "contact"],
    },
  },
  singletons: {
    siteSettings: singleton({
      label: "Site-instellingen",
      path: "src/data/siteSettings",
      format: { data: "json" },
      schema: {
        emailAddress: requiredText("E-mailadres"),
        calendlyUrl: fields.url({
          label: "Calendly-link",
          validation: { isRequired: true },
        }),
        instagramUrl: fields.url({
          label: "Instagram-link",
          validation: { isRequired: true },
        }),
        linkedinUrl: fields.url({
          label: "LinkedIn-link",
          validation: { isRequired: true },
        }),
        termsUrl: requiredText("Link algemene voorwaarden"),
      },
    }),
    home: singleton({
      label: "Homepage",
      path: "src/data/home",
      format: { data: "json" },
      schema: {
        seoTitle: requiredText("SEO titel"),
        seoDescription: requiredText("SEO omschrijving", true),
        ogDescription: requiredText("Omschrijving voor delen", true),
        heroKicker: requiredText("Kleine titel bovenaan"),
        heroTitle: requiredText("Hoofdtitel"),
        heroIntro: requiredText("Intro onder hoofdtitel", true),
        heroImage: pageImage("Hero-afbeelding"),
        primaryButtonLabel: requiredText("Tekst eerste knop"),
        secondaryButtonLabel: requiredText("Tekst tweede knop"),
        statementText: requiredText("Groene statementtekst", true),
        expertiseKicker: requiredText("Kleine titel dienstenblok"),
        expertiseTitle: requiredText("Titel dienstenblok"),
        expertiseIntro: requiredText("Intro dienstenblok", true),
        expertiseCards: numberedCards("Dienstenkaarten"),
        serviceTags: fields.array(requiredText("Dienst"), {
          label: "Diensten in het kort",
        }),
        aboutKicker: requiredText("Kleine titel Over Sanne"),
        aboutTitle: requiredText("Titel Over Sanne"),
        aboutText: requiredText("Tekst Over Sanne", true),
        aboutLinkLabel: requiredText("Tekst link Over mij"),
        proofItems: fields.array(
          fields.object({
            value: requiredText("Groot getal of woord"),
            text: requiredText("Uitleg", true),
          }),
          { label: "Bewijspunten" },
        ),
        logosKicker: requiredText("Kleine titel klantlogo's"),
        logosTitle: requiredText("Titel klantlogo's"),
        clientLogos: fields.array(
          fields.object({
            name: requiredText("Naam organisatie"),
            image: pageImage("Logo"),
            alt: requiredText("Alt-tekst logo"),
          }),
          { label: "Klantlogo's" },
        ),
        workKicker: requiredText("Kleine titel werkwijze"),
        workTitle: requiredText("Titel werkwijze"),
        workSteps: steps("Stappen werkwijze"),
        ctaKicker: requiredText("Kleine titel afsluiting"),
        ctaTitle: requiredText("Titel afsluiting"),
        ctaText: requiredText("Tekst afsluiting", true),
        ctaButtonLabel: requiredText("Tekst afsluitende knop"),
      },
    }),
    diensten: singleton({
      label: "Dienstenpagina",
      path: "src/data/diensten",
      format: { data: "json" },
      schema: {
        seoTitle: requiredText("SEO titel"),
        seoDescription: requiredText("SEO omschrijving", true),
        ogDescription: requiredText("Omschrijving voor delen", true),
        kicker: requiredText("Kleine titel bovenaan"),
        heroTitle: requiredText("Hoofdtitel"),
        heroIntro: requiredText("Intro onder hoofdtitel", true),
        heroButtonLabel: requiredText("Tekst hero-knop"),
        heroImage: pageImage("Hero-afbeelding"),
        heroImageAlt: requiredText("Alt-tekst hero-afbeelding"),
        statementText: requiredText("Groene statementtekst", true),
        overviewKicker: requiredText("Kleine titel dienstenoverzicht"),
        overviewTitle: requiredText("Titel dienstenoverzicht"),
        overviewIntro: requiredText("Intro dienstenoverzicht", true),
        services: fields.array(
          fields.object({
            number: requiredText("Nummer"),
            title: requiredText("Titel"),
            text: requiredText("Tekst", true),
            points: fields.array(requiredText("Punt"), {
              label: "Opsomming",
            }),
          }),
          { label: "Diensten" },
        ),
        processKicker: requiredText("Kleine titel werkwijze"),
        processTitle: requiredText("Titel werkwijze"),
        steps: steps("Stappen werkwijze"),
        ctaKicker: requiredText("Kleine titel afsluiting"),
        ctaTitle: requiredText("Titel afsluiting"),
        ctaText: requiredText("Tekst afsluiting", true),
        ctaButtonLabel: requiredText("Tekst afsluitende knop"),
      },
    }),
    overMij: singleton({
      label: "Over mij",
      path: "src/data/overMij",
      format: { data: "json" },
      schema: {
        seoTitle: requiredText("SEO titel"),
        seoDescription: requiredText("SEO omschrijving", true),
        ogDescription: requiredText("Omschrijving voor delen", true),
        kicker: requiredText("Kleine titel bovenaan"),
        heroTitleStart: requiredText("Hoofdtitel - begin"),
        heroTitleEmphasis: requiredText("Hoofdtitel - woord op één regel"),
        heroTitleEnd: requiredText("Hoofdtitel - einde"),
        heroIntro: requiredText("Intro onder hoofdtitel", true),
        heroButtonLabel: requiredText("Tekst hero-knop"),
        heroImage: pageImage("Portretfoto"),
        heroImageAlt: requiredText("Alt-tekst portretfoto"),
        statementText: requiredText("Groene statementtekst", true),
        storyKicker: requiredText("Kleine titel verhaal"),
        storyTitle: requiredText("Titel verhaal"),
        storyText: requiredText("Verhaal", true),
        proofItems: fields.array(
          fields.object({
            title: requiredText("Titel"),
            text: requiredText("Tekst", true),
          }),
          { label: "Kernwaarden" },
        ),
        strengthsKicker: requiredText("Kleine titel sterke punten"),
        strengthsTitle: requiredText("Titel sterke punten"),
        strengthsIntro: requiredText("Intro sterke punten", true),
        strengths: numberedCards("Sterke punten"),
        personalKicker: requiredText("Kleine titel persoonlijk blok"),
        personalTitle: requiredText("Titel persoonlijk blok"),
        personalText: requiredText("Persoonlijke tekst", true),
        testimonialsKicker: requiredText("Kleine titel testimonials"),
        testimonialsTitle: requiredText("Titel testimonials"),
        testimonialsIntro: requiredText("Intro testimonials", true),
        testimonials: fields.array(
          fields.object({
            quote: requiredText("Reactie", true),
            name: requiredText("Naam"),
            company: requiredText("Organisatie"),
          }),
          { label: "Testimonials" },
        ),
        ctaKicker: requiredText("Kleine titel afsluiting"),
        ctaTitle: requiredText("Titel afsluiting"),
        ctaText: requiredText("Tekst afsluiting", true),
        ctaButtonLabel: requiredText("Tekst afsluitende knop"),
      },
    }),
    contact: singleton({
      label: "Contactpagina",
      path: "src/data/contact",
      format: { data: "json" },
      schema: {
        seoTitle: requiredText("SEO titel"),
        seoDescription: requiredText("SEO omschrijving", true),
        kicker: requiredText("Kleine titel bovenaan"),
        heroTitle: requiredText("Hoofdtitel"),
        heroIntro: requiredText("Intro onder hoofdtitel", true),
        heroImage: pageImage("Contactfoto"),
        heroImageAlt: requiredText("Alt-tekst contactfoto"),
        statementText: requiredText("Groene statementtekst", true),
        optionsKicker: requiredText("Kleine titel contactkeuzes"),
        optionsTitle: requiredText("Titel contactkeuzes"),
        optionsIntro: requiredText("Tekst contactkeuzes", true),
        emailCardTitle: requiredText("Titel e-mailkaart"),
        emailCardText: requiredText("Tekst e-mailkaart", true),
        meetingCardTitle: requiredText("Titel kennismakingskaart"),
        meetingCardText: requiredText("Tekst kennismakingskaart", true),
      },
    }),
  },
});
