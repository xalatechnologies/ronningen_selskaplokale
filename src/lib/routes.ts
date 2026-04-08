/**
 * Canonical public site paths (Norwegian URLs).
 * Legacy English paths redirect in App.tsx.
 */
export const ROUTES = {
  home: '/',
  bryllup: '/bryllup',
  bedrift: '/bedrift',
  selskap: '/selskap',
  fasiliteter: '/fasiliteter',
  priser: '/priser',
  galleri: '/galleri',
  blogg: '/blogg',
  ofteStilteSporsmal: '/ofte-stilte-sporsmal',
  anmeldelser: '/anmeldelser',
  kontakt: '/kontakt',
  henvendelse: '/henvendelse',
} as const;

export type RouteKey = keyof typeof ROUTES;

export function kontaktSkjemaHash(): string {
  return `${ROUTES.kontakt}#kontakt-skjema`;
}
