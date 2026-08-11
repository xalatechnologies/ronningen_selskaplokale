export const HOME_PARTNER_KEYS = [
  'smakslykke',
  'flowersDecor',
  'vmCatering',
  'rishiDecor',
  'barService',
  'digilist',
] as const;

export type HomePartnerKey = (typeof HOME_PARTNER_KEYS)[number];

export const HOME_PARTNER_LINKS: Record<HomePartnerKey, string | null> = {
  smakslykke: 'https://smakslykkecatering.no/pages/vare-menyer',
  flowersDecor: 'https://osloeventshop.no/',
  vmCatering: 'https://www.vmcatering.no/',
  rishiDecor: null,
  barService: 'https://digilist.no/',
  digilist: 'https://xala.no/',
};

/** Fallback initials when no favicon / URL (stable across locales). */
export const HOME_PARTNER_INITIALS: Record<HomePartnerKey, string> = {
  smakslykke: 'S',
  flowersDecor: 'O',
  vmCatering: 'V',
  rishiDecor: 'R',
  barService: 'D',
  digilist: 'X',
};

export function homePartnerFaviconUrl(href: string | null): string | null {
  if (!href) return null;
  try {
    const host = new URL(href).hostname;
    if (!host) return null;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
  } catch {
    return null;
  }
}
