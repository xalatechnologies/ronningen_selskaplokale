import { inspirationGalleryExtraSlides } from './inspirationGalleryExtras.gen';

/** Local assets under `/public/gallery/inspirasjon-XX.png` (Rønningen photos). */
export const INSPIRATION_GALLERY_COUNT = 47;

/** Slides omitted from carousels (home / bryllup); still listed on /gallery. */
const EXCLUDED_INSPIRATION_KEYS = new Set(['inspirasjon-02', 'inspirasjon-24']);
/** Slides omitted from /gallery grid. */
const EXCLUDED_GALLERY_PAGE_KEYS = new Set([
  'inspirasjon-196',
  'inspirasjon-249',
  'inspirasjon-253',
  'inspirasjon-281',
  'inspirasjon-282',
  'inspirasjon-283',
]);

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

/** Temporarily empty until new category folders are provided. */
export const inspirationGallerySlides: InspirationSlide[] = [];

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

const extraGalleryPageItems: GalleryPageItem[] = inspirationGalleryExtraSlides
  .filter((slide) => !EXCLUDED_GALLERY_PAGE_KEYS.has(slide.key))
  .map((slide) => ({
    id: slide.key,
    url: slide.src,
    category: slide.category,
  }));

/** Temporarily empty until new category folders are provided. */
export const inspirationGalleryPageItems: GalleryPageItem[] = [];
