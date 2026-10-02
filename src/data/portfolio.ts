// Public portfolio fixtures only. Never import customer data or production queries here.
export const portfolioAssets = "/assets/designbysanne/project-visuals";

export const dashboardProjects = [
  {
    id: "leave",
    title: "Verlof- en overurendashboard",
    category: "Verlof & medewerkers",
    description: "Van overzicht naar aanvragen en medewerkerssaldi. Verlof, overuren en ziekte in één duidelijke werkwijze.",
    screens: ["Dashboard", "Aanvragen", "Medewerkersoverzicht"],
  },
  {
    id: "dbs",
    title: "DBS-dashboard",
    category: "Klanten & projecten",
    description: "Klanten, projecten en acties bij elkaar. Een korte blik op het overzicht, de klantenlijst en de lopende projecten.",
    screens: ["Overzicht", "Klanten", "Projecten"],
  },
  {
    id: "mortgage",
    title: "Hypothekendashboard",
    category: "Dossiers & voortgang",
    description: "Inzicht in hypotheekdossiers, adviseurs en voortgang. Van de kerncijfers naar dossiers in behandeling en een dossierdetail.",
    screens: ["Overzicht", "In behandeling", "Dossierdetail"],
  },
];

export type DashboardId = (typeof dashboardProjects)[number]["id"];

export const demoEmployees = [
  { name: "Lotte Meijer", email: "lotte@voorbeeldteam.example", team: "Planning", leave: "120 uur", overtime: "8 uur", status: "Aanwezig" },
  { name: "Noah Vermeer", email: "noah@voorbeeldteam.example", team: "Operations", leave: "96 uur", overtime: "4 uur", status: "Aanwezig" },
  { name: "Mila Bos", email: "mila@voorbeeldteam.example", team: "Support", leave: "88 uur", overtime: "0 uur", status: "Ziek" },
];

export const demoRequests = [
  { name: "Lotte Meijer", type: "Vakantie", period: "12–16 okt 2026", hours: "40 uur", status: "Open" },
  { name: "Noah Vermeer", type: "Overuren", period: "5 okt 2026", hours: "4 uur", status: "Open" },
];

export const demoCustomers = [
  { name: "Noordlicht Studio", person: "Eva Mulder", email: "eva@noordlicht.example", project: "Merkverhaal en website", fee: "€ 450", status: "Actief" },
  { name: "Rivier & Co", person: "Thomas Vos", email: "thomas@rivierco.example", project: "Website voor adviesbureau", fee: "€ 750", status: "Actief" },
  { name: "Studio Kompas", person: "Noor Bakker", email: "noor@studiokompas.example", project: "Voorjaarscampagne", fee: "€ 620", status: "Concept" },
  { name: "Groene Werf", person: "Lucas de Wit", email: "lucas@groenewerf.example", project: "SEO-optimalisatie", fee: "€ 480", status: "Actief" },
];

export const demoMortgages = [
  { id: "DEMO-001", name: "Elin van Dalen", email: "elin@voorbeeld.example", advisor: "Robin de Graaf", lender: "DemoBank Noord", amount: "€ 325.000", phase: "Documenten", deadline: "18 nov 2026" },
  { id: "DEMO-002", name: "Finn Jacobs", email: "finn@voorbeeld.example", advisor: "Alex van Veen", lender: "DemoBank Horizon", amount: "€ 410.000", phase: "Offerte", deadline: "24 nov 2026" },
  { id: "DEMO-003", name: "Tess van Hout", email: "tess@voorbeeld.example", advisor: "Robin de Graaf", lender: "DemoBank Noord", amount: "€ 285.000", phase: "Beoordeling", deadline: "30 nov 2026" },
];
