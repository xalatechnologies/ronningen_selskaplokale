import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { SECTION_H2_ON_DARK_CLASS } from '../lib/typography';
import { BOOKING_URL } from '../lib/booking';

type GalleryCategory = 'wedding' | 'corporate' | 'private';

type GalleryItem = {
  id: string;
  url: string;
  category: GalleryCategory;
};

const IMG = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${w}`;

/** Uniform square cards — same size and shape for every image */
const galleryItems: GalleryItem[] = [
  { id: '1', url: IMG('photo-1519167758481-83f550bb49b3'), category: 'wedding' },
  { id: '2', url: IMG('photo-1519741497674-611481863552'), category: 'wedding' },
  { id: '3', url: IMG('photo-1511578314322-379afb476865'), category: 'corporate' },
  { id: '4', url: IMG('photo-1530103043960-ef38714abb15'), category: 'private' },
  { id: '5', url: IMG('photo-1469334031218-e382a71b716b'), category: 'wedding' },
  { id: '6', url: IMG('photo-1511795409834-ef04bbd61622'), category: 'corporate' },
  { id: '7', url: IMG('photo-1464366400600-7168b8af9bc3'), category: 'private' },
  { id: '8', url: IMG('photo-1519225421980-715cb0215aed'), category: 'wedding' },
  { id: '9', url: IMG('photo-1520854221050-0f4caff449fb'), category: 'wedding' },
  { id: '10', url: IMG('photo-1465495976277-4387d4b0b4c6'), category: 'corporate' },
  { id: '11', url: IMG('photo-1507003211169-0a1dd7228f2d'), category: 'private' },
  { id: '12', url: IMG('photo-1492684223066-81342ee5ff30'), category: 'wedding' },
];

const FILTERS = ['all', 'wedding', 'corporate', 'private'] as const;
type Filter = (typeof FILTERS)[number];

function categoryLabel(t: (k: string) => string, c: GalleryCategory) {
  switch (c) {
    case 'wedding':
      return t('galleryPage.filterWedding');
    case 'corporate':
      return t('galleryPage.filterCorporate');
    case 'private':
      return t('galleryPage.filterPrivate');
    default:
      return c;
  }
}

export const GalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);

  const categoryCounts = useMemo(() => {
    const counts = { wedding: 0, corporate: 0, private: 0 };
    for (const g of galleryItems) {
      counts[g.category]++;
    }
    return { all: galleryItems.length, ...counts };
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return galleryItems;
    return galleryItems.filter((img) => img.category === filter);
  }, [filter]);

  const lightboxIndex = useMemo(() => {
    if (!lightboxUrl) return -1;
    return filteredItems.findIndex((x) => x.url === lightboxUrl);
  }, [lightboxUrl, filteredItems]);

  const openLightbox = useCallback((url: string) => setLightboxUrl(url), []);
  const closeLightbox = useCallback(() => setLightboxUrl(null), []);

  const goPrev = useCallback(() => {
    if (lightboxIndex <= 0) return;
    setLightboxUrl(filteredItems[lightboxIndex - 1].url);
  }, [lightboxIndex, filteredItems]);

  const goNext = useCallback(() => {
    if (lightboxIndex < 0 || lightboxIndex >= filteredItems.length - 1) return;
    setLightboxUrl(filteredItems[lightboxIndex + 1].url);
  }, [lightboxIndex, filteredItems]);

  useEffect(() => {
    if (!lightboxUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxUrl, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    if (!lightboxUrl) return;
    if (!filteredItems.some((x) => x.url === lightboxUrl)) setLightboxUrl(null);
  }, [filteredItems, lightboxUrl]);

  const filterLabel = (f: Filter) => {
    if (f === 'all') return t('galleryPage.filterAll');
    return categoryLabel(t, f);
  };

  const motionDur = prefersReducedMotion ? 0 : 0.35;
  const motionStagger = prefersReducedMotion ? 0 : 0.045;

  return (
    <div className="flex flex-col bg-white">
      <section
        aria-labelledby="gallery-heading"
        className="section-viewport relative overflow-hidden bg-linear-to-b from-white via-brand-50/40 to-brand-50/70"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[15%] top-[5%] h-[min(45vw,24rem)] w-[min(45vw,24rem)] rounded-full bg-brand-200/20 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[10%] top-[40%] h-[min(35vw,18rem)] w-[min(35vw,18rem)] rounded-full bg-brand-400/10 blur-[90px]"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[min(92rem,calc(100vw-2.5rem))] px-5 pb-16 pt-12 sm:px-6 md:pb-28 md:pt-16 lg:pt-20">
          <header className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-600">
              Rønningen
            </p>
            <h1
              id="gallery-heading"
              className="font-serif text-4xl tracking-tight text-brand-950 sm:text-5xl md:text-6xl md:leading-[1.05]"
            >
              {t('nav.gallery')}
            </h1>
            <div className="mx-auto mt-5 h-px w-14 bg-brand-600/35" aria-hidden />
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-brand-800 md:text-lg">
              {t('galleryPage.intro')}
            </p>
            <p className="mt-4 text-sm font-medium tabular-nums text-brand-600">
              {t('galleryPage.photoCount', { count: categoryCounts.all })}
            </p>
          </header>

          <div
            className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
            role="tablist"
            aria-label={t('nav.gallery')}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all',
                  filter === f
                    ? 'bg-brand-900 text-white shadow-lg ring-2 ring-brand-900 ring-offset-2 ring-offset-[#faf8f5]'
                    : 'border border-brand-200/90 bg-white/95 text-brand-800 shadow-sm hover:border-brand-400 hover:bg-brand-50'
                )}
              >
                <span>{filterLabel(f)}</span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] tabular-nums',
                    filter === f ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-700'
                  )}
                  aria-hidden
                >
                  {categoryCounts[f]}
                </span>
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="mx-auto mt-16 max-w-md rounded-3xl border border-brand-200/90 bg-[#f5f2ed] px-8 py-12 text-center shadow-sm">
              <p className="font-serif text-xl text-brand-950">{t('galleryPage.emptyTitle')}</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-700">{t('galleryPage.emptyBody')}</p>
            </div>
          ) : (
            <motion.div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => (
                  <motion.button
                    type="button"
                    key={item.id}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 16 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: motionDur,
                      delay: Math.min(i * motionStagger, 0.4),
                    }}
                    className={cn(
                      'group relative aspect-square w-full overflow-hidden rounded-2xl border border-brand-200/80 bg-brand-100 text-left shadow-sm ring-1 ring-black/[0.03] transition-[box-shadow,transform] duration-300 hover:z-10 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'
                    )}
                    onClick={() => openLightbox(item.url)}
                    aria-label={`${t('galleryPage.expandHint')}: ${categoryLabel(t, item.category)}`}
                  >
                    <img
                      src={item.url}
                      alt={t('galleryPage.imageAlt', {
                        n: i + 1,
                        category: categoryLabel(t, item.category),
                      })}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="absolute inset-0 h-full w-full object-cover transition duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.045]"
                      loading={i < 4 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : undefined}
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-brand-950/15 to-transparent opacity-85 transition duration-300 group-hover:opacity-100" />
                    <div className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-900 opacity-0 shadow-md ring-1 ring-black/5 transition duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90 sm:right-3 sm:top-3 sm:h-10 sm:w-10">
                      <Expand size={16} strokeWidth={2} className="sm:h-[18px] sm:w-[18px]" aria-hidden />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-1.5 p-3 sm:gap-2 sm:p-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/95 drop-shadow-sm">
                        {categoryLabel(t, item.category)}
                      </span>
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-900 opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
                        {t('galleryPage.expandHint')}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA — same editorial block as Weddings final CTA */}
      <section className="section-viewport px-8 md:px-20">
        <div className="section-viewport-scroll py-8 md:py-10">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 1 }}
            className="relative mx-auto max-w-[1800px] overflow-hidden rounded-xl bg-brand-900 px-6 py-12 text-center text-white shadow-2xl sm:px-10 sm:py-14 md:px-14 md:py-16 lg:px-16 lg:py-20"
          >
            <div className="absolute inset-0 z-0 opacity-30">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000"
                alt=""
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/40 to-brand-900/90" />
            </div>

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-brand-400/20 blur-[120px]" />
              <div className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-rose-400/10 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl space-y-8 md:space-y-10">
              <div className="space-y-3 md:space-y-4">
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.05 }}
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-300"
                >
                  {t('galleryPage.ctaLine')}
                </motion.p>
                <motion.h2
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.12 }}
                  className={cn(SECTION_H2_ON_DARK_CLASS, 'm-0')}
                >
                  {t('galleryPage.ctaHeadingLine1')}
                  <br />
                  <span className="italic text-brand-400">{t('galleryPage.ctaHeadingAccent')}</span>
                </motion.h2>
              </div>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
                className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-brand-100 md:text-2xl"
              >
                {t('galleryPage.ctaBody')}
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
                className="flex flex-col items-center justify-center gap-5 pt-4 sm:flex-row sm:gap-6 sm:pt-6"
              >
                <Link
                  to="/contact"
                  className="w-full rounded-full bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-brand-900 shadow-xl transition-all hover:scale-[1.02] hover:bg-brand-50 active:scale-[0.98] sm:w-auto sm:px-14"
                >
                  {t('galleryPage.ctaLink')}
                </Link>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full border border-white/30 bg-transparent px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-white/10 sm:w-auto sm:px-14"
                >
                  {t('hero.bookNow')}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxUrl && lightboxIndex >= 0 && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.gallery')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-950/97 p-3 backdrop-blur-md sm:p-6 md:p-8"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
              const dx = endX - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(dx) < 48) return;
              if (dx > 0) goPrev();
              else goNext();
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              disabled={lightboxIndex <= 0}
              className="absolute left-2 top-1/2 z-[210] hidden -translate-y-1/2 rounded-full bg-white/12 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-white/22 disabled:cursor-not-allowed disabled:opacity-25 md:left-6 md:flex md:p-4 lg:left-10"
              aria-label={t('galleryPage.lightboxPrev')}
            >
              <ChevronLeft className="h-8 w-8" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              disabled={lightboxIndex >= filteredItems.length - 1}
              className="absolute right-2 top-1/2 z-[210] hidden -translate-y-1/2 rounded-full bg-white/12 p-3 text-white shadow-lg backdrop-blur-md transition hover:bg-white/22 disabled:cursor-not-allowed disabled:opacity-25 md:right-6 md:flex md:p-4 lg:right-10"
              aria-label={t('galleryPage.lightboxNext')}
            >
              <ChevronRight className="h-8 w-8" strokeWidth={1.75} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
              className="relative flex w-full max-w-5xl flex-col px-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand-950 shadow-2xl ring-1 ring-white/10"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={lightboxUrl}
                    src={lightboxUrl}
                    alt={t('galleryPage.imageAlt', {
                      n: lightboxIndex + 1,
                      category: categoryLabel(t, filteredItems[lightboxIndex].category),
                    })}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                    className="max-h-[min(82vh,1080px)] w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-brand-950/70 to-transparent" />
                <div className="absolute right-3 top-3 flex gap-2 sm:right-4 sm:top-4 md:hidden">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    disabled={lightboxIndex <= 0}
                    className="rounded-full bg-white/15 p-2.5 text-white backdrop-blur-md transition hover:bg-white/25 disabled:opacity-30"
                    aria-label={t('galleryPage.lightboxPrev')}
                  >
                    <ChevronLeft className="h-6 w-6" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    disabled={lightboxIndex >= filteredItems.length - 1}
                    className="rounded-full bg-white/15 p-2.5 text-white backdrop-blur-md transition hover:bg-white/25 disabled:opacity-30"
                    aria-label={t('galleryPage.lightboxNext')}
                  >
                    <ChevronRight className="h-6 w-6" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeLightbox();
                    }}
                    className="rounded-full bg-white/15 p-2.5 text-white backdrop-blur-md transition hover:bg-white/25"
                    aria-label={t('galleryPage.lightboxClose')}
                  >
                    <X className="h-6 w-6" strokeWidth={2} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                  className="absolute right-3 top-3 hidden rounded-full bg-white/15 p-3 text-white backdrop-blur-md transition hover:bg-white/25 md:right-4 md:top-4 md:flex"
                  aria-label={t('galleryPage.lightboxClose')}
                >
                  <X className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-1 px-1 text-center text-white/95 md:flex-row md:items-center md:justify-between md:text-left">
                <p className="text-sm font-medium tabular-nums tracking-wide">
                  {t('galleryPage.counter', {
                    current: lightboxIndex + 1,
                    total: filteredItems.length,
                  })}
                </p>
                <p className="text-sm font-medium text-white/75">
                  {categoryLabel(t, filteredItems[lightboxIndex].category)}
                </p>
              </div>
              <p className="mt-2 text-center text-xs text-white/50 md:hidden">{t('galleryPage.swipeHint')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
