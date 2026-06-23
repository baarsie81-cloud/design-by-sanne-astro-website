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

Live blijft Keystatic standaard uit. Zet in Vercel pas `KEYSTATIC_MODE=github` en `PUBLIC_KEYSTATIC_MODE=github` wanneer de GitHub-login en Keystatic environment variables zijn ingesteld. Voor nu is alleen de contactpagina bewerkbaar gemaakt.
