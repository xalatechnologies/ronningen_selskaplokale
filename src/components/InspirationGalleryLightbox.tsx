import { useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import {
  inspirationGallerySlides,
  inspirationSlideFileNumber,
} from '../lib/inspirationGallery';

export type GalleryLightboxSlide = { src: string; alt: string };

export function useGalleryLightboxState(slideCount: number) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const lightboxShowPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      const n = slideCount;
      if (n <= 0) return null;
      return (i - 1 + n) % n;
    });
  }, [slideCount]);

  const lightboxShowNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      const n = slideCount;
      if (n <= 0) return null;
      return (i + 1) % n;
    });
  }, [slideCount]);

  return { lightboxIndex, setLightboxIndex, closeLightbox, lightboxShowPrev, lightboxShowNext };
}

export function useInspirationGalleryLightboxState() {
  return useGalleryLightboxState(inspirationGallerySlides.length);
}

type GalleryLightboxProps = {
  slides: GalleryLightboxSlide[];
  activeIndex: number | null;
  onClose: () => void;
  onGoPrev: () => void;
  onGoNext: () => void;
};

export function GalleryLightbox({ slides, activeIndex, onClose, onGoPrev, onGoNext }: GalleryLightboxProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onGoPrev();
      if (e.key === 'ArrowRight') onGoNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, onClose, onGoPrev, onGoNext]);

  const slide = activeIndex !== null && slides[activeIndex] ? slides[activeIndex] : null;

  return (
    <AnimatePresence>
      {slide && (
        <motion.div
          key="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t('galleryPage.lightboxDialog')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-3 top-3 z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-5"
            aria-label={t('galleryPage.lightboxClose')}
          >
            <X size={22} strokeWidth={2} aria-hidden />
          </button>

          <div
            className="relative mx-auto flex max-h-[min(88vh,900px)] w-full max-w-[min(96vw,1200px)] items-center justify-center px-12 sm:px-14 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="max-h-[min(88vh,900px)] w-full max-w-full rounded-sm object-contain shadow-2xl"
              decoding="async"
            />
            <button
              type="button"
              onClick={onGoPrev}
              className="absolute left-0 top-1/2 z-[105] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12"
              aria-label={t('galleryPage.lightboxPrev')}
            >
              <ArrowLeft size={24} aria-hidden />
            </button>
            <button
              type="button"
              onClick={onGoNext}
              className="absolute right-0 top-1/2 z-[105] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12"
              aria-label={t('galleryPage.lightboxNext')}
            >
              <ArrowRight size={24} aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InspirationGalleryLightbox({
  activeIndex,
  onClose,
  onGoPrev,
  onGoNext,
}: Omit<GalleryLightboxProps, 'slides'>) {
  const { t, i18n } = useTranslation();
  const slides = useMemo(
    () =>
      inspirationGallerySlides.map((s) => ({
        ...s,
        alt: t('inspirationGallery.slideAlt', { n: inspirationSlideFileNumber(s.key) }),
      })),
    [t, i18n.language],
  );

  return (
    <GalleryLightbox
      slides={slides}
      activeIndex={activeIndex}
      onClose={onClose}
      onGoPrev={onGoPrev}
      onGoNext={onGoNext}
    />
  );
}
