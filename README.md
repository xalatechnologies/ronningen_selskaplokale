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
| `VITE_WEB3FORMS_ACCESS_KEY` | Valgfritt — [Web3Forms](https://web3forms.com); mottaker settes i **Web3Forms-dashbordet**. |
| `VITE_VENUE_CONTACT_EMAIL` | Valgfritt — offentlig innboks (footer, kontaktside) og standard for [FormSubmit](https://formsubmit.co) når `VITE_CONTACT_NOTIFY_EMAIL` ikke er satt. Standard: `post@ronningenselskapslokale.no`. |
| `VITE_CONTACT_NOTIFY_EMAIL` | Valgfritt — overstyrer **kun** FormSubmit-mottaker (når Web3Forms ikke brukes). |
| `GEMINI_API_KEY` | Valgfritt — brukes ved bygg via Vite `define` hvis du bruker Gemini-funksjoner |
| `APP_URL` | Valgfritt — egen URL til appen dersom koden bruker den |

`vercel.json` sender ukjente stier til `index.html` slik at **React Router** fungerer ved direkte lenker og refresh.

## Kontaktskjema → e-post

Innsending lagres i **Supabase** (`inquiries`) når URL/nøkkel er satt, og en kopi sendes alltid via e-post (`src/lib/contactEmail.ts`):

- **Med** `VITE_WEB3FORMS_ACCESS_KEY`: [Web3Forms](https://web3forms.com) — sett mottaker-e-post i **Web3Forms-dashbordet** (samme som «den andre» innboksen din der).
- **Uten** den nøkkelen: [FormSubmit](https://formsubmit.co) til adressen fra `VENUE_CONTACT_EMAIL` (standard `post@ronningenselskapslokale.no`, eller `VITE_VENUE_CONTACT_EMAIL` / `VITE_CONTACT_NOTIFY_EMAIL` på Vercel). Første gang: åpne innboksen og klikk **Activate Form** i e-post fra FormSubmit.

Sjekk Network mot `api.web3forms.com` eller `formsubmit.co` ved feil.

Node-versjon: se `.nvmrc` (anbefalt 22 på Vercel via *Settings → General → Node.js Version* eller automatisk fra `.nvmrc` der det støttes).
