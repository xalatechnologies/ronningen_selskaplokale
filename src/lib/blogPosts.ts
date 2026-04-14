import { ROUTES } from './routes';

export const BLOG_POST_KEYS = [
  'pixlightWeddingReport',
  'springWedding',
  'corporateHost',
  'familyCelebration',
  'venueTour',
] as const;

export type BlogPostKey = (typeof BLOG_POST_KEYS)[number];

/** URL segment for each post (stable across languages). */
export const BLOG_POST_SLUG: Record<BlogPostKey, string> = {
  pixlightWeddingReport: 'bryllup-pixlight-reportasje',
  springWedding: 'spring-wedding',
  corporateHost: 'corporate-host',
  familyCelebration: 'family-celebration',
  venueTour: 'venue-tour',
};

const SLUG_TO_KEY = Object.fromEntries(
  (Object.entries(BLOG_POST_SLUG) as [BlogPostKey, string][]).map(([k, s]) => [s, k]),
) as Record<string, BlogPostKey>;

export function blogPostKeyFromSlug(slug: string | undefined): BlogPostKey | null {
  if (!slug) return null;
  return SLUG_TO_KEY[slug] ?? null;
}

export function blogPostPath(key: BlogPostKey): string {
  return `${ROUTES.blogg}/${BLOG_POST_SLUG[key]}`;
}

/** Local assets under `public/` so cards work offline and match site photography. */
export const BLOG_CARD_IMAGES: Record<BlogPostKey, string> = {
  pixlightWeddingReport: '/blog-pixlight-wedding-feature.png',
  springWedding: '/blog-spring-wedding-reception.png',
  corporateHost: '/blog-corporate-formal-dinner.png',
  familyCelebration: '/blog-family-celebration-aerial.png',
  venueTour: '/blog-venue-aerial-overview.png',
};
