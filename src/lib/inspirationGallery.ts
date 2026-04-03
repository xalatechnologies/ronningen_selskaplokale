/** Local assets under `/public/gallery/inspirasjon-XX.png` (Rønningen photos). */
export const INSPIRATION_GALLERY_COUNT = 47;

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
);

export type GalleryPageCategory = 'wedding' | 'corporate' | 'private' | 'facilities';

export type GalleryPageItem = {
  id: string;
  url: string;
  category: GalleryPageCategory;
};

/** Categories for full gallery filters (rest = wedding). Indices match `inspirationGallerySlides` order. */
const FACILITIES_INDEX = new Set([12, 24, 29]); // garden, drone, lokale
const PRIVATE_INDEX = new Set([41]); // IMG_6031
const CORPORATE_INDEX = new Set([35, 38, 39, 42, 43]); // lokale/hall & seremoni-oppsett

function categoryForGalleryIndex(i: number): GalleryPageCategory {
  if (FACILITIES_INDEX.has(i)) return 'facilities';
  if (PRIVATE_INDEX.has(i)) return 'private';
  if (CORPORATE_INDEX.has(i)) return 'corporate';
  return 'wedding';
}

export const inspirationGalleryPageItems: GalleryPageItem[] = inspirationGallerySlides.map(
  (slide, i) => ({
    id: slide.key,
    url: slide.src,
    category: categoryForGalleryIndex(i),
  }),
);
