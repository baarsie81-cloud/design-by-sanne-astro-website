# Juridische documenten beheren

De PDF's in `public/documenten/` zijn de originele, inhoudelijk ongewijzigde bestanden. De datums in de bestandsnamen zijn versiedatums. De privacyverklaring is daarnaast letterlijk opgenomen in `src/pages/privacyverklaring.astro`; alleen PDF-paginanummers en herhaalde paginakoppen zijn weggelaten. Regel- en pagina-afbrekingen zijn samengevoegd.

## Een nieuwe versie toevoegen

1. Ontvang de definitieve, goedgekeurde PDF en controleer titel, versiedatum en eventuele revisie.
2. Voeg deze toe met een **nieuwe** bestandsnaam, bijvoorbeeld `algemene-voorwaarden-JJJJ-MM-DD.pdf` of `overeenkomsten-JJJJ-MM-DD-r3.pdf`. Overschrijf nooit een gepubliceerde versie en stuur oude PDF-URL's nooit door naar een nieuwe versie.
3. Werk het actuele document en de versiedatum in `src/pages/juridisch.astro` bij. Verplaats de vorige vermelding naar ‘Eerdere versies’ met de oorspronkelijke datum en vaste PDF-URL. Neem alleen daadwerkelijk gebruikte originele PDF's op.
4. Werk bij nieuwe voorwaarden ook `termsUrl` in `src/data/siteSettings.json` bij (het bestaande CMS-veld ‘Link algemene voorwaarden’). De footer gebruikt dit veld.
5. Neem bij een nieuwe privacyverklaring de volledige definitieve tekst letterlijk over in `src/pages/privacyverklaring.astro` en werk metadata, versiedatum en beide PDF-links bij. Controleer de tekst tegen de PDF, inclusief tekst over pagina-einden.
6. Voer de build uit. Controleer pagina's, mobiele weergave, footer, bekijken/downloaden en tekstvolledigheid. Vergelijk de toegevoegde PDF met het origineel via SHA-256.
7. Laat de wijziging onafhankelijk beoordelen en vraag afzonderlijk toestemming voor commit, push en publicatie.

## Bestaande verwijzingen behouden

Het originele bestand van 1 juni 2026 blijft ongewijzigd beschikbaar op `/assets/designbysanne/algemene-voorwaarden-design-by-sanne-1-juni-2026.pdf`. Dezelfde bytes staan ook onder `/documenten/algemene-voorwaarden-2026-06-01.pdf`. Beide URL's horen uitsluitend bij die eerdere versie. Offertes kunnen rechtstreeks naar een vaste versiegebonden PDF verwijzen.

Dit is handmatig versiebeheer met statische bestanden; er is geen database, CMS-uitbreiding of automatisch contractbeheer.

## Correctie aanduiding overeenkomstenbundel (17 oktober 2026)

De definitieve overeenkomstenbundel staat op `/documenten/overeenkomsten-2026-10-17.pdf`, met de aanduiding ‘Versie 17 oktober 2026’. Het aangeleverde definitieve bestand is ongewijzigd overgenomen. De eerder gepubliceerde revisieaanduiding is volgens bevestiging van de eigenaar nooit aan klanten verstrekt. Daarom wordt de oude URL `/documenten/overeenkomsten-2026-10-17-r2.pdf` bij deze eenmalige correctie permanent doorgestuurd naar de definitieve PDF via `vercel.json` (HTTP 308). De oude PDF is verwijderd; alleen de definitieve bundel wordt aangeboden.

Dit is een expliciet goedgekeurde uitzondering voor een gecorrigeerde aanduiding. De regel voor toekomstige inhoudelijke documentversies blijft gelden: nieuwe URL toevoegen en daadwerkelijk gebruikte contractversies bewaren. Een eenvoudige statische lokale bestandsserver voert de Vercel-redirect niet uit; controleer na een afzonderlijk goedgekeurde publicatie ook de HTTP-status en `Location`-header op de website.

## Correctie platformnamen (30 oktober 2026)

Op uitdrukkelijk verzoek van de eigenaar zijn in de overeenkomstenbundel twee algemene formuleringen aangebracht: op pagina 5 ‘het eigen dossierarchief’ in plaats van de genoemde Microsoft-omgeving, en op pagina 13 ‘Technische dienstverleners’ in plaats van de opsomming van platformnamen. De overige tekst blijft behouden. De eigenaar heeft voor deze eenmalige correctie expliciet dezelfde PDF-URL en versiedatum 17 oktober 2026 laten behouden. Het eerdere bestand is via Git-historie terug te vinden. Dit wijzigt niet de algemene werkwijze voor toekomstige inhoudelijke versies en daadwerkelijk overeengekomen klantdocumenten.
