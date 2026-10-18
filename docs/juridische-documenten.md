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
