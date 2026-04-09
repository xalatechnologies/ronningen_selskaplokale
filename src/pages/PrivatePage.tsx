import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { INQUIRY_CTA_PATH } from '../lib/privatePackageConfig';
import { privateInspirationSlides } from '../lib/inspirationGallery';
import { ROUTES } from '../lib/routes';
import { HeroScrollHint } from '../components/HeroScrollHint';
import { GalleryLightbox, useGalleryLightboxState, type GalleryLightboxSlide } from '../components/InspirationGalleryLightbox';
import {
  FAQ_ANSWER_CLASS,
  SECTION_H2_CLASS,
  SECTION_H2_ON_DARK_CLASS,
  SECTION_LEAD_CLASS,
  SECTION_LEAD_ON_DARK_CLASS,
} from '../lib/typography';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Gift,
  Heart,
  Sparkles,
} from 'lucide-react';

const CTA_SECONDARY = ROUTES.kontakt;

const PRIVATE_INTRO_HIGHLIGHT_CONFIG = [
  { key: 'proximity', icon: Heart },
  { key: 'tradition', icon: Gift },
  { key: 'gathered', icon: Sparkles },
] as const;

const PRIVATE_EVENT_KEYS = [
  'birthday',
  'confirmation',
  'baptismNaming',
  'babyShower',
  'anniversary',
  'memorial',
] as const;

type PrivateEventKey = (typeof PRIVATE_EVENT_KEYS)[number];

const PRIVATE_EVENT_IMAGES: Record<PrivateEventKey, string> = {
  birthday:
    'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=85&w=1200',
  confirmation: '/private-event-confirmation.png',
  baptismNaming:
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=85&w=1200',
  babyShower:
    'https://images.unsplash.com/photo-1746309135204-25b148b4375a?auto=format&fit=crop&q=85&w=1200',
  anniversary:
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=85&w=1200',
  memorial:
    'https://images.unsplash.com/photo-1598288103147-6bc615cb464c?auto=format&fit=crop&q=85&w=1200',
};

const PRIVATE_FAQ_KEYS = ['celebrations', 'ownFoodDrink', 'capacity', 'howToBook'] as const;

const GALLERY_EDGE_TOLERANCE = 2;

export const PrivatePage = () => {
  const { t, i18n } = useTranslation();
  const { hash } = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (hash !== '#private-packages-heading') return;
    navigate(ROUTES.priser, { replace: true });
  }, [hash, navigate]);

  const gallerySlides = useMemo<GalleryLightboxSlide[]>(
    () =>
      privateInspirationSlides.map((item, i) => ({
        src: item.src,
        alt: t('privatePage.gallerySection.slideAlt', { n: i + 1 }),
      })),
    [t, i18n.language],
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const { lightboxIndex, setLightboxIndex, closeLightbox, lightboxShowPrev, lightboxShowNext } =
    useGalleryLightboxState(privateInspirationSlides.length);

  const handleGalleryScroll = () => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      const hasOverflow = scrollWidth > clientWidth + GALLERY_EDGE_TOLERANCE;
      setGalleryHasOverflow(hasOverflow);
      setShowGalleryLeft(scrollLeft > GALLERY_EDGE_TOLERANCE);
      setShowGalleryRight(scrollLeft < scrollWidth - clientWidth - GALLERY_EDGE_TOLERANCE);
    }
  };

  useEffect(() => {
    const galleryContainer = galleryRef.current;
    if (galleryContainer) {
      galleryContainer.addEventListener('scroll', handleGalleryScroll);
      handleGalleryScroll();
    }
    window.addEventListener('resize', handleGalleryScroll);
    return () => {
      if (galleryContainer) galleryContainer.removeEventListener('scroll', handleGalleryScroll);
      window.removeEventListener('resize', handleGalleryScroll);
    };
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
    if (direction === 'left' && scrollLeft <= GALLERY_EDGE_TOLERANCE) return;
    if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - GALLERY_EDGE_TOLERANCE) return;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
    galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    requestAnimationFrame(handleGalleryScroll);
    setTimeout(handleGalleryScroll, 320);
  };

  return (
    <div className="ui-page-shell">
      {/* 1 — Hero */}
      <section className="hero-below-nav section-viewport section-viewport-hero relative flex min-h-0 flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/private-hero-celebration.png"
            alt={t('privatePage.heroImageAlt')}
            width={960}
            height={640}
            className="h-full w-full object-cover object-center brightness-[0.52] contrast-[1.03]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent"
            aria-hidden
          />
        </div>
        <div className="section-viewport-scroll site-container relative z-10 flex w-full flex-col items-center justify-center py-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="flex w-full flex-col items-center space-y-7 md:space-y-9"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-5xl text-balance font-serif text-4xl leading-[0.92] tracking-tighter text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.32)] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t('privatePage.heroTitleLine1')}
              {' '}
              <br className="hidden md:block" />
              {t('privatePage.heroTitleLine2Prefix')}
              <span className="italic text-white/95">{t('privatePage.heroTitleLine2Accent')}</span>
              {t('privatePage.heroTitleLine2Rest')}
            </motion.h1>
            <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
              <Link to={CTA_SECONDARY} className="cta-route-hero-primary">
                {t('hero.bookNow')}
              </Link>
              <Link to={INQUIRY_CTA_PATH} className="cta-route-hero-secondary">
                {t('hero.cta')}
              </Link>
            </div>
          </motion.div>
        </div>

        <HeroScrollHint targetId="private-intro" ariaLabel={t('privatePage.heroScrollHintAria')} />
      </section>

      {/* 2 — Verdi: editorial + panoramabilde + tre søyler + feiring-rutenett */}
      <section
        id="private-intro"
        aria-labelledby="private-value-heading"
        className="ui-route-hero-band section-viewport scroll-mt-24"
      >
        <div className="section-viewport-scroll site-container py-14 md:py-20 lg:py-24">
          <div className="mx-auto w-full text-center">
            <motion.h2
              id="private-value-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className={cn(SECTION_H2_CLASS, 'text-balance')}
            >
              {t('privatePage.introSection.headingBefore')}
              <span className="italic text-brand-700 dark:text-brand-300">{t('privatePage.introSection.headingAccent')}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={cn(SECTION_LEAD_CLASS, 'mt-6')}
            >
              {t('privatePage.introSection.intro')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto mt-12 max-h-[min(52vh,480px)] w-full overflow-hidden rounded-2xl border border-brand-200/90 shadow-[0_24px_60px_-20px_rgba(33,24,22,0.35)] md:mt-16 aspect-[16/10] md:aspect-[21/9]"
          >
            <img
              src="/private-intro-panorama-night.png"
              alt={t('privatePage.introSection.panoramaAlt')}
              width={1024}
              height={460}
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-16 md:gap-6 lg:gap-8">
            {PRIVATE_INTRO_HIGHLIGHT_CONFIG.map((item, i) => {
              const Icon = item.icon;
              const base = `privatePage.introSection.highlights.${item.key}`;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col rounded-2xl border border-brand-200/90 bg-white/90 p-6 shadow-[0_1px_0_rgba(28,22,19,0.05)] backdrop-blur-sm dark:border-brand-600 dark:bg-brand-800/75 md:p-7"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200/80 bg-brand-50 text-brand-800 dark:border-brand-600 dark:bg-brand-950/35 dark:text-brand-200">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl tracking-tight text-brand-950 md:text-[1.35rem] dark:text-brand-50">
                    {t(`${base}.title`)}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-brand-700 md:text-base dark:text-brand-200">{t(`${base}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 — Anledninger: samme grid som bedrift */}
      <section
        aria-labelledby="private-events-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-800 bg-brand-900 text-white"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute -right-[5%] top-[10%] h-[30%] w-[30%] rounded-full bg-brand-400/10 blur-[100px]" />
          <div className="absolute -left-[5%] bottom-[10%] h-[30%] w-[30%] rounded-full bg-white/[0.07] blur-[100px]" />
        </div>

        <div className="section-viewport-scroll site-container relative z-10 py-14 sm:py-16 md:py-16">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2
              id="private-events-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={SECTION_H2_ON_DARK_CLASS}
            >
              {t('privatePage.eventsSection.headingBefore')}
              <span className="italic text-brand-400">{t('privatePage.eventsSection.headingAccent')}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {PRIVATE_EVENT_KEYS.map((eventKey, i) => {
              const itemBase = `privatePage.eventsSection.items.${eventKey}`;
              const eventTitle = t(`${itemBase}.title`);
              const eventImageSrc = PRIVATE_EVENT_IMAGES[eventKey];
              const eventImageAlt = t(`${itemBase}.imgAlt`);
              return (
                <motion.div
                  key={eventKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="ds-media-card ds-media-card--dark"
                >
                  <img
                    src={eventImageSrc}
                    alt={eventImageAlt}
                    width={
                      eventKey === 'birthday' || eventKey === 'baptismNaming'
                        ? 768
                        : eventKey === 'confirmation' || eventKey === 'babyShower'
                          ? 1024
                          : eventKey === 'anniversary'
                            ? 960
                            : undefined
                    }
                    height={
                      eventKey === 'birthday' || eventKey === 'baptismNaming'
                        ? 1024
                        : eventKey === 'confirmation'
                          ? 683
                          : eventKey === 'babyShower'
                            ? 768
                            : eventKey === 'anniversary'
                              ? 719
                              : undefined
                    }
                    loading="lazy"
                    decoding="async"
                    referrerPolicy={eventImageSrc.startsWith('http') ? 'no-referrer' : undefined}
                  />
                  <div className="ds-media-card__scrim" aria-hidden />
                  <div className="ds-media-card__veil" aria-hidden />
                  <div className="ds-media-card__inner">
                    <h3 className="ds-media-card__title">{eventTitle}</h3>
                    <div className="ds-media-card__body">
                      <p className="ds-media-card__text">{t(`${itemBase}.desc`)}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 — Galleri (samme uttrykk som bryllup) */}
      <section className="section-viewport relative overflow-hidden border-b border-brand-100 bg-white dark:border-brand-800 dark:bg-brand-950">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-brand-100/20 blur-[150px] dark:bg-brand-600/12" />
        </div>

        <div className="section-viewport-scroll site-container relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 w-full"
          >
            <h2 className={cn(SECTION_H2_CLASS)}>{t('privatePage.gallerySection.heading')}</h2>
          </motion.div>

          <div className="relative">
            {galleryHasOverflow && (
              <>
                <button
                  type="button"
                  onClick={() => scrollGallery('left')}
                  disabled={!showGalleryLeft}
                  className={cn(
                    'absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors md:left-4 md:h-12 md:w-12',
                    showGalleryLeft
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white dark:border-brand-600 dark:bg-brand-800/95 dark:text-brand-50 dark:hover:border-brand-500 dark:hover:bg-brand-700 dark:hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70 dark:border-brand-700 dark:bg-brand-900/55 dark:text-brand-600',
                  )}
                  aria-label={t('privatePage.gallerySection.prevImageAria')}
                  aria-disabled={!showGalleryLeft}
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollGallery('right')}
                  disabled={!showGalleryRight}
                  className={cn(
                    'absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors md:right-4 md:h-12 md:w-12',
                    showGalleryRight
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white dark:border-brand-600 dark:bg-brand-800/95 dark:text-brand-50 dark:hover:border-brand-500 dark:hover:bg-brand-700 dark:hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70 dark:border-brand-700 dark:bg-brand-900/55 dark:text-brand-600',
                  )}
                  aria-label={t('privatePage.gallerySection.nextImageAria')}
                  aria-disabled={!showGalleryRight}
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}

            <div
              ref={galleryRef}
              className="scrollbar-hide site-carousel-bleed flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 md:mx-0 md:gap-8 md:px-0 md:pb-10"
            >
              {gallerySlides.map((slide, i) => (
                <motion.div
                  key={privateInspirationSlides[i]!.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="group relative aspect-[6/7] min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl dark:border-brand-700 dark:bg-brand-900/50 md:min-w-[46%] lg:min-w-[34%]"
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i > 4 ? 'lazy' : 'eager'}
                    decoding="async"
                    referrerPolicy={slide.src.startsWith('http') ? 'no-referrer' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="absolute inset-0 z-10 cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:focus-visible:ring-brand-400 dark:focus-visible:ring-offset-brand-950"
                    aria-label={t('privatePage.gallerySection.openLargeImage', { caption: slide.alt })}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-center md:mt-12"
          >
            <Link
              to={`${ROUTES.galleri}?category=private`}
              className="group inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 transition-all hover:border-brand-300 hover:shadow-md dark:border-brand-600 dark:bg-brand-800 dark:hover:border-brand-500"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-900 dark:text-brand-50">
                {t('privatePage.gallerySection.fullGalleryCta')}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white transition-transform group-hover:translate-x-1 dark:bg-brand-100 dark:text-brand-900">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5 — FAQ (samme mål og uttrykk som bryllup) */}
      <section className="section-viewport relative overflow-hidden border-b border-brand-100 bg-brand-50/50 dark:border-brand-800 dark:bg-brand-950/50">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute left-[5%] top-[10%] h-[20%] w-[20%] rounded-full bg-brand-200/10 blur-[100px] dark:bg-brand-600/10" />
        </div>

        <div className="section-viewport-scroll site-container relative z-10 py-12 md:py-16">
          <div className="mx-auto w-full max-w-3xl">
          <div className="mb-10 text-center md:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(SECTION_H2_CLASS, 'mb-4')}
            >
              {t('privatePage.faqSection.headingBefore')}
              <span className="italic text-brand-600 dark:text-brand-400">{t('privatePage.faqSection.headingAccent')}</span>
            </motion.h2>
            <div className="mx-auto h-px w-16 bg-brand-200 dark:bg-brand-700" />
          </div>

          <div className="space-y-3">
            {PRIVATE_FAQ_KEYS.map((faqKey, i) => {
              const itemBase = `privatePage.faqSection.items.${faqKey}`;
              return (
                <motion.div
                  key={faqKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'overflow-hidden rounded-md border transition-all duration-500',
                    openFaq === i
                      ? 'border-brand-200 bg-white shadow-md dark:border-brand-600 dark:bg-brand-800/95 dark:shadow-lg dark:shadow-black/30'
                      : 'border-brand-100 bg-white/40 hover:border-brand-200 hover:bg-white/60 dark:border-brand-700 dark:bg-brand-900/35 dark:hover:border-brand-600 dark:hover:bg-brand-900/55',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-4"
                  >
                    <span
                      className={cn(
                        'min-w-0 flex-1 text-balance font-serif text-lg transition-colors duration-300 md:text-xl',
                        openFaq === i
                          ? 'text-brand-900 dark:text-brand-50'
                          : 'text-brand-800 group-hover:text-brand-900 dark:text-brand-200 dark:group-hover:text-brand-50',
                      )}
                    >
                      {t(`${itemBase}.q`)}
                    </span>
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                        openFaq === i
                          ? 'rotate-180 border-brand-900 bg-brand-900 text-white dark:border-brand-100 dark:bg-brand-100 dark:text-brand-900'
                          : 'border-brand-200 text-brand-400 group-hover:border-brand-400 group-hover:text-brand-900 dark:border-brand-600 dark:text-brand-500 dark:group-hover:border-brand-400 dark:group-hover:text-brand-200',
                      )}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className={cn(FAQ_ANSWER_CLASS, 'px-5 pb-5 md:px-6 md:pb-6')}>
                          <div className="mb-3 h-px w-10 bg-brand-100 dark:bg-brand-700" />
                          {t(`${itemBase}.a`)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      {/* 6 — Avsluttende CTA (samme uttrykk som galleri) */}
      <section className="section-viewport">
        <div className="section-viewport-scroll site-container py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full overflow-hidden rounded-xl bg-brand-900 px-6 py-14 text-center text-white shadow-2xl sm:px-10 sm:py-16 md:px-14 md:py-20"
          >
            <div className="absolute inset-0 z-0 opacity-30">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
                alt={t('privatePage.closingCta.bgImageAlt')}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/40 to-brand-900/90" />
            </div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-brand-400/20 blur-[120px]" />
              <div className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-rose-400/10 blur-[120px]" />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-none space-y-6 md:space-y-8">
              <h2 className={cn(SECTION_H2_ON_DARK_CLASS, 'm-0')}>
                {t('privatePage.closingCta.headingLine1Before')}
                <span className="italic text-brand-400">{t('privatePage.closingCta.headingLine1Accent')}</span>
                <br />
                {t('privatePage.closingCta.headingLine2')}
              </h2>
              <p className={SECTION_LEAD_ON_DARK_CLASS}>
                {t('privatePage.closingCta.body')}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:gap-5">
                <Link to={INQUIRY_CTA_PATH} className="cta-brand-band-primary">
                  {t('hero.cta')}
                </Link>
                <Link to={CTA_SECONDARY} className="cta-brand-band-secondary">
                  {t('hero.bookNow')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <GalleryLightbox
        slides={gallerySlides}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onGoPrev={lightboxShowPrev}
        onGoNext={lightboxShowNext}
      />
    </div>
  );
};
