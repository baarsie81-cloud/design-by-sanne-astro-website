import { config, fields, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "Design by Sanne CMS",
    },
    navigation: {
      "Pagina's": ["contact"],
    },
  },
  singletons: {
    contact: singleton({
      label: "Contactpagina",
      path: "src/data/contact",
      format: { data: "json" },
      schema: {
        seoTitle: fields.text({
          label: "SEO titel",
          validation: { isRequired: true },
        }),
        seoDescription: fields.text({
          label: "SEO omschrijving",
          multiline: true,
          validation: { isRequired: true },
        }),
        kicker: fields.text({
          label: "Kleine titel bovenaan",
          validation: { isRequired: true },
        }),
        heroTitle: fields.text({
          label: "Hoofdtitel",
          validation: { isRequired: true },
        }),
        heroIntro: fields.text({
          label: "Intro onder hoofdtitel",
          multiline: true,
          validation: { isRequired: true },
        }),
        emailAddress: fields.text({
          label: "E-mailadres",
          validation: { isRequired: true },
        }),
        calendlyUrl: fields.url({
          label: "Calendly-link",
          validation: { isRequired: true },
        }),
        heroImage: fields.image({
          label: "Contactfoto",
          directory: "public/assets/designbysanne",
          publicPath: "/assets/designbysanne",
          validation: { isRequired: true },
        }),
        heroImageAlt: fields.text({
          label: "Alt-tekst contactfoto",
          validation: { isRequired: true },
        }),
        statementText: fields.text({
          label: "Groene statementtekst",
          multiline: true,
          validation: { isRequired: true },
        }),
        optionsKicker: fields.text({
          label: "Kleine titel bij contactkeuzes",
          validation: { isRequired: true },
        }),
        optionsTitle: fields.text({
          label: "Titel bij contactkeuzes",
          validation: { isRequired: true },
        }),
        optionsIntro: fields.text({
          label: "Tekst bij contactkeuzes",
          multiline: true,
          validation: { isRequired: true },
        }),
        emailCardTitle: fields.text({
          label: "Titel e-mailkaart",
          validation: { isRequired: true },
        }),
        emailCardText: fields.text({
          label: "Tekst e-mailkaart",
          multiline: true,
          validation: { isRequired: true },
        }),
        meetingCardTitle: fields.text({
          label: "Titel kennismakingskaart",
          validation: { isRequired: true },
        }),
        meetingCardText: fields.text({
          label: "Tekst kennismakingskaart",
          multiline: true,
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
