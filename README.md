# Design by Sanne Astro Website

Nieuwe Astro-site voor Design by Sanne.

## Ontwikkelen

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
```

## Keystatic

Lokaal is Keystatic bereikbaar via:

```bash
pnpm run dev
```

Daarna open je `/keystatic`.

Keystatic beheert de content van Home, Diensten, Over mij en Contact. Ook de
gedeelde contactgegevens, social links en link naar de algemene voorwaarden zijn
bewerkbaar via `Site-instellingen`.

Live gebruikt de site GitHub-modus via de bestaande Vercel-variabelen
`KEYSTATIC_MODE=github` en `PUBLIC_KEYSTATIC_MODE=github`. Wijzigingen die via
`/keystatic/` worden opgeslagen, komen in GitHub terecht en starten daarna een
nieuwe Vercel-deployment.
