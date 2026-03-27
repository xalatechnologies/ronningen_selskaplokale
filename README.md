# ronningen_selskaplokale

Frontend for Rønningen selskapslokale (Vite + React + TypeScript).

## Kjør lokalt

**Krav:** Node.js

1. `npm install`
2. Kopier `.env.example` til `.env` og fyll inn nøkler etter behov
3. `npm run dev`

## Bygg

```bash
npm run build
```

Utdata: `dist/` (brukes av Vercel).

## Deploy på Vercel

1. Importer repoet i [Vercel](https://vercel.com/new) (koble til GitHub `xalatechnologies/ronningen_selskaplokale`).
2. **Framework preset:** Vite (oppdages vanligvis automatisk).
3. **Build command:** `npm run build` · **Output directory:** `dist`
4. Under **Settings → Environment Variables**, legg inn (Production + Preview etter behov):

| Variabel | Beskrivelse |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase-prosjekt-URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `GEMINI_API_KEY` | Valgfritt — brukes ved bygg via Vite `define` hvis du bruker Gemini-funksjoner |
| `APP_URL` | Valgfritt — egen URL til appen dersom koden bruker den |

`vercel.json` sender ukjente stier til `index.html` slik at **React Router** fungerer ved direkte lenker og refresh.

Node-versjon: se `.nvmrc` (anbefalt 22 på Vercel via *Settings → General → Node.js Version* eller automatisk fra `.nvmrc` der det støttes).
