/**
 * Primary section <h2> scale — matches Home #konsepter-heading.
 * Use with `cn(SECTION_H2_CLASS, 'mb-6')` etc. for spacing.
 */
export const SECTION_H2_SIZE_CLASS =
  'text-balance font-serif text-4xl leading-[0.98] tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] xl:leading-[0.96]';

export const SECTION_H2_CLASS = `${SECTION_H2_SIZE_CLASS} text-brand-900 dark:text-brand-50`;

/** Dark sections (e.g. CTA on brand-900) */
export const SECTION_H2_ON_DARK_CLASS = `${SECTION_H2_SIZE_CLASS} text-white`;

/** Footer / dark band with muted headline */
export const SECTION_H2_FOOTER_CLASS = `${SECTION_H2_SIZE_CLASS} text-brand-100`;

/**
 * Lead paragraph under a section <h2> on light surfaces — Playfair Display, stepped scale (aligned with home hero serif).
 * Intended to span the full content width inside `site-container` (avoid max-w-* on the lead unless a layout truly needs it).
 */
export const SECTION_LEAD_CLASS =
  'w-full font-serif text-lg font-normal leading-relaxed text-pretty text-brand-900 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed dark:text-brand-100';

/** Same role as SECTION_LEAD_CLASS on dark (brand-900) bands */
export const SECTION_LEAD_ON_DARK_CLASS =
  'w-full font-serif text-lg font-normal leading-relaxed text-pretty text-brand-100 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed';

/** Page-level <h1> for inner routes (one clear title per page for SEO). */
export const PAGE_H1_CLASS =
  'font-serif text-4xl font-normal tracking-tighter text-balance text-brand-900 sm:text-5xl md:text-6xl dark:text-brand-50';

/** In-content <h3> for prose / cards (when not using display caps). */
export const SECTION_H3_CLASS =
  'font-serif text-2xl font-normal tracking-tight text-brand-950 md:text-3xl dark:text-brand-50';

/**
 * h3 on brand-900 / dark imagery (e.g. day timeline). Required on <h3> so base `h3 { text-brand-900; dark:text-brand-100 }`
 * does not override inherited `text-white` from the section.
 */
export const SECTION_H3_ON_DARK_CLASS =
  'font-serif text-3xl font-normal leading-none tracking-tight text-white md:text-3xl';

/**
 * Body / hover-reveal copy on dark imagery (e.g. day timeline). Serif + normal weight + solid white —
 * matches `.ds-media-card__text` so it does not read as default `font-sans` / `font-light`.
 */
export const PROSE_SECONDARY_ON_DARK_CLASS =
  'font-serif text-base font-normal leading-relaxed text-pretty text-white sm:text-lg md:text-xl md:leading-relaxed';

export const SECTION_H4_CLASS =
  'font-serif text-xl font-normal tracking-tight text-brand-950 md:text-2xl dark:text-brand-50';

export const SECTION_H5_CLASS =
  'font-serif text-lg font-normal tracking-tight text-brand-900 md:text-xl dark:text-brand-100';

/** Hero / listing eyebrow — uppercase meta line above H1. */
export const UI_EYEBROW_CLASS =
  'text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-600 dark:text-brand-400';

/** Secondary body copy on elevated surfaces (cards, sidebars). */
export const UI_BODY_SECONDARY_CLASS =
  'text-[15px] font-normal leading-relaxed text-brand-800 md:text-base dark:text-brand-200';

/** Muted caption (notes, footers on cards) — solid palette steps only; lighter than UI_BODY_SECONDARY. */
export const UI_CAPTION_CLASS =
  'text-xs leading-relaxed text-brand-700 dark:text-brand-300';
