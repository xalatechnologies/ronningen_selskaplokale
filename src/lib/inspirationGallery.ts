import { inspirationGalleryExtraSlides } from './inspirationGalleryExtras.gen';

/** Local assets under `/public/gallery/inspirasjon-XX.png` (Rønningen photos). */
export const INSPIRATION_GALLERY_COUNT = 47;

/** Slides omitted from carousels (home / bryllup); still listed on /gallery. */
const EXCLUDED_INSPIRATION_KEYS = new Set(['inspirasjon-02', 'inspirasjon-24']);

export type InspirationSlide = {
  key: string;
  src: string;
  alt: string;
};

/** File number from `inspirasjon-{n}` (e.g. `inspirasjon-05` → 5, `inspirasjon-301` → 301). */
export function inspirationSlideFileNumber(key: string): number {
  const m = /^inspirasjon-(\d+)$/.exec(key);
  return m ? parseInt(m[1], 10) : 1;
}

/** Shown first in home / weddings carousels (first “page” of scroll). */
const LEAD_INSPIRATION_KEYS = [
  'inspirasjon-26',
  'inspirasjon-27',
  'inspirasjon-28',
] as const;

const inspirationGallerySlidesBase: InspirationSlide[] = Array.from(
  { length: INSPIRATION_GALLERY_COUNT },
  (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      key: `inspirasjon-${n}`,
      src: `/gallery/inspirasjon-${n}.png`,
      alt: `Bryllupsinspirasjon ${i + 1}`,
    };
  },
).filter((slide) => !EXCLUDED_INSPIRATION_KEYS.has(slide.key));

/** Home + bryllup carousels only (original set, minus excluded lead). */
export const inspirationGallerySlides: InspirationSlide[] = (() => {
  const leadSet = new Set<string>(LEAD_INSPIRATION_KEYS);
  const lead: InspirationSlide[] = [];
  for (const key of LEAD_INSPIRATION_KEYS) {
    const slide = inspirationGallerySlidesBase.find((s) => s.key === key);
    if (slide) lead.push(slide);
  }
  const rest = inspirationGallerySlidesBase.filter((s) => !leadSet.has(s.key));
  const ordered = [...lead, ...rest];

  // Keep legacy ordering, but swap these two specific slides in the carousel.
  const firstKey = 'inspirasjon-27';
  const secondKey = 'inspirasjon-45';
  const firstIndex = ordered.findIndex((slide) => slide.key === firstKey);
  const secondIndex = ordered.findIndex((slide) => slide.key === secondKey);
  if (firstIndex >= 0 && secondIndex >= 0) {
    [ordered[firstIndex], ordered[secondIndex]] = [ordered[secondIndex], ordered[firstIndex]];
  }

  return ordered;
})();

export type GalleryPageCategory = 'wedding' | 'corporate' | 'private' | 'facilities';

export type GalleryPageItem = {
  id: string;
  url: string;
  category: GalleryPageCategory;
};

/**
 * Categories for legacy slides (rest = wedding).
 * 0-based index = file number − 1 (inspirasjon-01 → 0).
 */
const FACILITIES_INDEX = new Set([12, 24, 29]);
const PRIVATE_INDEX = new Set([41]);
const CORPORATE_INDEX = new Set([35, 38, 39, 42, 43]);

function categoryForLegacyGalleryIndex(zeroBasedFileIndex: number): GalleryPageCategory {
  if (FACILITIES_INDEX.has(zeroBasedFileIndex)) return 'facilities';
  if (PRIVATE_INDEX.has(zeroBasedFileIndex)) return 'private';
  if (CORPORATE_INDEX.has(zeroBasedFileIndex)) return 'corporate';
  return 'wedding';
}

function zeroBasedIndexFromSlideKey(key: string): number {
  const m = /^inspirasjon-(\d+)$/.exec(key);
  return m ? parseInt(m[1], 10) - 1 : 0;
}

const CATEGORY_SORT_ORDER: Record<GalleryPageCategory, number> = {
  wedding: 0,
  facilities: 1,
  private: 2,
  corporate: 3,
};

function sortGalleryPageItems(items: GalleryPageItem[]): GalleryPageItem[] {
  return [...items].sort((a, b) => {
    const byCat = CATEGORY_SORT_ORDER[a.category] - CATEGORY_SORT_ORDER[b.category];
    if (byCat !== 0) return byCat;
    return inspirationSlideFileNumber(a.id) - inspirationSlideFileNumber(b.id);
  });
}

const legacyGalleryPageItems: GalleryPageItem[] = inspirationGallerySlidesBase.map((slide) => ({
  id: slide.key,
  url: slide.src,
  category: categoryForLegacyGalleryIndex(zeroBasedIndexFromSlideKey(slide.key)),
}));

const extraGalleryPageItems: GalleryPageItem[] = inspirationGalleryExtraSlides.map((slide) => ({
  id: slide.key,
  url: slide.src,
  category: slide.category,
}));

/** Full /gallery grid: legacy + uploaded batch, grouped by category then image number. */
export const inspirationGalleryPageItems: GalleryPageItem[] = sortGalleryPageItems([
  ...legacyGalleryPageItems,
  ...extraGalleryPageItems,
]);
