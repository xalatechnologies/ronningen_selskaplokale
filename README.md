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
| `VITE_WEB3FORMS_ACCESS_KEY` | [Web3Forms](https://web3forms.com) access key — kontaktskjema sender e-post til adressen du velger i Web3Forms-dashbordet (f.eks. `r.selskapslokale@gmail.com`). |
| `GEMINI_API_KEY` | Valgfritt — brukes ved bygg via Vite `define` hvis du bruker Gemini-funksjoner |
| `APP_URL` | Valgfritt — egen URL til appen dersom koden bruker den |

`vercel.json` sender ukjente stier til `index.html` slik at **React Router** fungerer ved direkte lenker og refresh.

## Kontaktskjema → e-post (Web3Forms)

Innsending lagres i **Supabase** (`inquiries`) og en kopi sendes via [Web3Forms](https://web3forms.com) (`src/lib/contactEmail.ts`), på samme måte som et vanlig skjema med `access_key` — her kommer nøkkelen fra **`VITE_WEB3FORMS_ACCESS_KEY`** (`.env` lokalt og Vercel → Environment Variables).

1. Opprett nøkkel på web3forms.com og sett **mottaker-e-post** der (f.eks. `r.selskapslokale@gmail.com`).
2. Lim inn nøkkelen i `VITE_WEB3FORMS_ACCESS_KEY` og deploy / start `npm run dev` på nytt.
3. Test fra `/contact` og bekreft at e-post kommer; **svar** i klienten bruker besøkendes adresse (`replyto`).

Uten satt nøkkel hopper appen over e-poststeget (ingen feil), men Supabase-lagring skjer som før.

Ved feil: sjekk Network-kallet til `api.web3forms.com` og eventuell advarseltoast (`contactPage.formEmailNotifyError`).

Node-versjon: se `.nvmrc` (anbefalt 22 på Vercel via *Settings → General → Node.js Version* eller automatisk fra `.nvmrc` der det støttes).
