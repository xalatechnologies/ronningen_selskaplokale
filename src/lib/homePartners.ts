export const HOME_PARTNER_KEYS = [
  'cateringKitchen',
  'flowersDecor',
  'photoVideo',
  'soundLight',
  'barService',
  'digilist',
  'xala',
] as const;

export type HomePartnerKey = (typeof HOME_PARTNER_KEYS)[number];

export const HOME_PARTNER_LINKS: Record<HomePartnerKey, string | null> = {
  cateringKitchen: 'https://svensefjoset.no/',
  flowersDecor: 'https://osloeventshop.no/',
  photoVideo: 'https://villaboligstyling.no/',
  soundLight: 'https://festpartner.no/',
  barService: 'https://digilist.no/',
  digilist: 'https://xala.no/',
  xala: null,
};

/** Fallback initials when no favicon / URL (stable across locales). */
export const HOME_PARTNER_INITIALS: Record<HomePartnerKey, string> = {
  cateringKitchen: 'S',
  flowersDecor: 'O',
  photoVideo: 'V',
  soundLight: 'F',
  barService: 'D',
  digilist: 'X',
  xala: 'B',
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
