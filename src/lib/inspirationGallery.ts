/** Local assets under `/public/gallery/inspirasjon-XX.png` (Rønningen photos). */
export const INSPIRATION_GALLERY_COUNT = 47;

/** Slides omitted from carousels / full gallery (file numbers still used for category indices below). */
const EXCLUDED_INSPIRATION_KEYS = new Set(['inspirasjon-02']);

export type InspirationSlide = {
  key: string;
  src: string;
  alt: string;
};

export const inspirationGallerySlides: InspirationSlide[] = Array.from(
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

export type GalleryPageCategory = 'wedding' | 'corporate' | 'private' | 'facilities';

export type GalleryPageItem = {
  id: string;
  url: string;
  category: GalleryPageCategory;
};

/**
 * Categories for full gallery filters (rest = wedding).
 * Values are 0-based indices matching the original `inspirasjon-XX` file number: XX = i + 1.
 */
const FACILITIES_INDEX = new Set([12, 24, 29]); // garden, drone, lokale
const PRIVATE_INDEX = new Set([41]); // IMG_6031
const CORPORATE_INDEX = new Set([35, 38, 39, 42, 43]); // lokale/hall & seremoni-oppsett

function categoryForGalleryIndex(zeroBasedFileIndex: number): GalleryPageCategory {
  if (FACILITIES_INDEX.has(zeroBasedFileIndex)) return 'facilities';
  if (PRIVATE_INDEX.has(zeroBasedFileIndex)) return 'private';
  if (CORPORATE_INDEX.has(zeroBasedFileIndex)) return 'corporate';
  return 'wedding';
}

function zeroBasedIndexFromSlideKey(key: string): number {
  const m = /^inspirasjon-(\d+)$/.exec(key);
  return m ? parseInt(m[1], 10) - 1 : 0;
}

export const inspirationGalleryPageItems: GalleryPageItem[] = inspirationGallerySlides.map((slide) => ({
  id: slide.key,
  url: slide.src,
  category: categoryForGalleryIndex(zeroBasedIndexFromSlideKey(slide.key)),
}));
