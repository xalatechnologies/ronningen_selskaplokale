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
