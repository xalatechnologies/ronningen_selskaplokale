/**
 * Primary section <h2> scale — matches Home #konsepter-heading.
 * Use with `cn(SECTION_H2_CLASS, 'mb-6')` etc. for spacing.
 */
export const SECTION_H2_SIZE_CLASS =
  'text-balance font-serif text-4xl leading-[0.98] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] xl:leading-[0.96]';

export const SECTION_H2_CLASS = `${SECTION_H2_SIZE_CLASS} text-brand-900`;

/** Dark sections (e.g. CTA on brand-900) */
export const SECTION_H2_ON_DARK_CLASS = `${SECTION_H2_SIZE_CLASS} text-white`;

/** Footer / dark band with muted headline */
export const SECTION_H2_FOOTER_CLASS = `${SECTION_H2_SIZE_CLASS} text-brand-100`;

/**
 * Lead paragraph under a section <h2> on light surfaces — Playfair Display, stepped scale (aligned with home hero serif).
 * Intended to span the full content width inside `site-container` (avoid max-w-* on the lead unless a layout truly needs it).
 */
export const SECTION_LEAD_CLASS =
  'w-full font-serif text-lg font-normal leading-relaxed text-pretty text-brand-900 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed';

/** Same role as SECTION_LEAD_CLASS on dark (brand-900) bands */
export const SECTION_LEAD_ON_DARK_CLASS =
  'w-full font-serif text-lg font-normal leading-relaxed text-pretty text-brand-100/95 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed';

/** Page-level <h1> for inner routes (one clear title per page for SEO). */
export const PAGE_H1_CLASS =
  'font-serif text-4xl font-normal tracking-tighter text-balance text-brand-900 sm:text-5xl md:text-6xl';

/** In-content <h3> for prose / cards (when not using display caps). */
export const SECTION_H3_CLASS =
  'font-serif text-2xl font-normal tracking-tight text-brand-950 md:text-3xl';

export const SECTION_H4_CLASS =
  'font-serif text-xl font-normal tracking-tight text-brand-950 md:text-2xl';

export const SECTION_H5_CLASS =
  'font-serif text-lg font-normal tracking-tight text-brand-900 md:text-xl';
