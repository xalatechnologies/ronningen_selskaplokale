export const BLOG_POST_KEYS = [
  'springWedding',
  'corporateHost',
  'familyCelebration',
  'venueTour',
  'seasonalGathering',
] as const;

export type BlogPostKey = (typeof BLOG_POST_KEYS)[number];

/** URL segment for each post (stable across languages). */
export const BLOG_POST_SLUG: Record<BlogPostKey, string> = {
  springWedding: 'spring-wedding',
  corporateHost: 'corporate-host',
  familyCelebration: 'family-celebration',
  venueTour: 'venue-tour',
  seasonalGathering: 'seasonal-gathering',
};

const SLUG_TO_KEY = Object.fromEntries(
  (Object.entries(BLOG_POST_SLUG) as [BlogPostKey, string][]).map(([k, s]) => [s, k]),
) as Record<string, BlogPostKey>;

export function blogPostKeyFromSlug(slug: string | undefined): BlogPostKey | null {
  if (!slug) return null;
  return SLUG_TO_KEY[slug] ?? null;
}

export function blogPostPath(key: BlogPostKey): string {
  return `/blog/${BLOG_POST_SLUG[key]}`;
}

const FEATURED_IMAGE =
  'https://images.unsplash.com/photo-1519167758481-83f29da45538?auto=format&fit=crop&q=85&w=1600';

export const BLOG_CARD_IMAGES: Record<BlogPostKey, string> = {
  springWedding: FEATURED_IMAGE,
  corporateHost:
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=900',
  familyCelebration:
    'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=900',
  venueTour:
    'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=900',
  seasonalGathering:
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=900',
};
