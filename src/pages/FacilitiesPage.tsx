import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { facilitiesInspirationSlides } from '../lib/inspirationGallery';
import { HeroScrollHint } from '../components/HeroScrollHint';
import { GalleryLightbox, useGalleryLightboxState, type GalleryLightboxSlide } from '../components/InspirationGalleryLightbox';
import {
  FAQ_ANSWER_CLASS,
  SECTION_H2_CLASS,
  SECTION_H2_ON_DARK_CLASS,
  SECTION_LEAD_CLASS,
  SECTION_LEAD_ON_DARK_CLASS,
} from '../lib/typography';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { FACILITY_CARD_IMAGES, FACILITY_CARD_KEYS } from '../lib/facilityCards';

import { ROUTES, kontaktSkjemaHash } from '../lib/routes';
const GALLERY_EDGE_TOLERANCE = 2;

const FACILITIES_SHUFFLEBOARD_HERO_IMG = '/facilities-hero-shuffleboard.png';
const FACILITIES_CHILDCARE_PLAYROOM_IMG = '/facilities-childcare-playroom.png';
const FACILITIES_ANIMALS_GOATS_IMG = '/facilities-animals-goats.png';
const FACILITIES_COMMERCIAL_KITCHEN_IMG = '/facilities-commercial-kitchen.png';
const FACILITIES_BAR_EVENT_HALL_IMG = '/facilities-bar-event-hall.png';
const FACILITIES_VENUE_AERIAL_IMG = '/facilities-venue-aerial.png';
const FACILITIES_PARKING_COACHES_IMG = '/facilities-parking-coaches.png';
const FACILITIES_GUEST_LOUNGE_IMG = '/facilities-guest-lounge.png';
const FACILITIES_BRIDAL_SUITE_BEDROOM_IMG = '/facilities-bridal-suite-bedroom.png';
const FACILITIES_UNIVERSAL_DESIGN_HALLWAY_IMG = '/facilities-universal-design-hallway.png';
const FACILITIES_FAMILY_CELEBRATION_GROUP_IMG = '/facilities-usecase-family-celebration.png';
const FACILITIES_WEDDING_WEEKEND_MINI_IMG = '/facilities-usecase-wedding-weekend.png';
const FACILITIES_CORPORATE_EVENING_BANQUET_IMG = '/facilities-usecase-corporate-evening.png';
const FACILITIES_OUTDOORS_WATERFALL_IMG = '/facilities-usecase-outdoors-waterfall.png';

const USE_CASE_KEYS = [
  'familyCelebration',
  'weddingWeekend',
  'corporateEvening',
  'outdoorsIndoors',
  'weekendGuests',
  'livelyEvening',
] as const;

type UseCaseKey = (typeof USE_CASE_KEYS)[number];

const USE_CASE_IMAGES: Record<UseCaseKey, string> = {
  familyCelebration: FACILITIES_FAMILY_CELEBRATION_GROUP_IMG,
  weddingWeekend: FACILITIES_WEDDING_WEEKEND_MINI_IMG,
  corporateEvening: FACILITIES_CORPORATE_EVENING_BANQUET_IMG,
  outdoorsIndoors: FACILITIES_OUTDOORS_WATERFALL_IMG,
  weekendGuests: FACILITIES_GUEST_LOUNGE_IMG,
  livelyEvening: FACILITIES_BAR_EVENT_HALL_IMG,
};

const FACILITY_FAQ_KEYS = [
  'combineFacilities',
  'universalDesign',
  'parkingCharging',
  'howToBook',
] as const;

export const FacilitiesPage = () => {
  const { t, i18n } = useTranslation();
  const gallerySlides: GalleryLightboxSlide[] = useMemo(
    () =>
      facilitiesInspirationSlides.map((item, i) => ({
        src: item.src,
        alt: t('facilitiesPage.gallerySection.imageAlt', { number: i + 1 }),
      })),
    [t, i18n.language],
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const { lightboxIndex, setLightboxIndex, closeLightbox, lightboxShowPrev, lightboxShowNext } =
    useGalleryLightboxState(facilitiesInspirationSlides.length);

  const facilitiesRef = useRef<HTMLDivElement>(null);
  const [facilitiesHasOverflow, setFacilitiesHasOverflow] = useState(false);
  const [showFacilitiesLeft, setShowFacilitiesLeft] = useState(false);
  const [showFacilitiesRight, setShowFacilitiesRight] = useState(true);

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

  const handleFacilitiesScroll = () => {
    if (facilitiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = facilitiesRef.current;
      const hasOverflow = scrollWidth > clientWidth + GALLERY_EDGE_TOLERANCE;
      setFacilitiesHasOverflow(hasOverflow);
      setShowFacilitiesLeft(scrollLeft > GALLERY_EDGE_TOLERANCE);
      setShowFacilitiesRight(scrollLeft < scrollWidth - clientWidth - GALLERY_EDGE_TOLERANCE);
    }
  };

  useEffect(() => {
    const el = facilitiesRef.current;
    if (el) {
      el.addEventListener('scroll', handleFacilitiesScroll);
      handleFacilitiesScroll();
    }
    window.addEventListener('resize', handleFacilitiesScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleFacilitiesScroll);
      window.removeEventListener('resize', handleFacilitiesScroll);
    };
  }, []);

  const scrollFacilities = (direction: 'left' | 'right') => {
    if (!facilitiesRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = facilitiesRef.current;
    if (direction === 'left' && scrollLeft <= GALLERY_EDGE_TOLERANCE) return;
    if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - GALLERY_EDGE_TOLERANCE) return;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    facilitiesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    requestAnimationFrame(handleFacilitiesScroll);
    setTimeout(handleFacilitiesScroll, 320);
  };

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
      <section className="hero-below-nav section-viewport section-viewport-hero relative flex min-h-0 flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={FACILITIES_SHUFFLEBOARD_HERO_IMG}
            alt={t('facilitiesPage.heroImageAlt')}
            width={1024}
            height={682}
            className="h-full w-full object-cover brightness-[0.52] contrast-[1.03]"
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
              {t('facilitiesPage.heroTitleLine1')}
              {' '}
              <br className="hidden md:block" />
              {t('facilitiesPage.heroTitleLine2Prefix')}
              <span className="italic text-white/95">{t('facilitiesPage.heroTitleLine2Accent')}</span>
              {t('facilitiesPage.heroTitleLine2Rest')}
            </motion.h1>
            <p className="w-full max-w-none text-lg font-light italic opacity-90 sm:text-xl md:text-2xl [text-shadow:0_1px_20px_rgba(0,0,0,0.28)]">
              {t('facilitiesPage.heroTagline')}
            </p>
            <div className="flex w-full justify-center pt-8">
              <Link to={kontaktSkjemaHash()} className="cta-route-hero-primary">
                {t('hero.cta')}
              </Link>
            </div>
          </motion.div>
        </div>

        <HeroScrollHint targetId="facilities-intro" ariaLabel={t('facilitiesPage.heroScrollHintAria')} />
      </section>

      <section
        id="facilities-intro"
        aria-labelledby="facilities-cards-heading"
        className="ui-route-hero-band section-viewport scroll-mt-24"
      >
        <div className="section-viewport-scroll site-container py-14 md:py-20 lg:py-24">
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-5xl">
              <motion.h2
                id="facilities-cards-heading"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(SECTION_H2_CLASS, 'text-balance')}
              >
                {t('facilitiesPage.introCardsSection.headingBefore')}
                <span className="italic text-brand-700 dark:text-brand-300">{t('facilitiesPage.introCardsSection.headingAccent')}</span>
              </motion.h2>
            </div>
            {facilitiesHasOverflow && (
              <p className="shrink-0 text-xs font-medium uppercase tracking-[0.16em] text-brand-500 md:text-right">
                <span className="hidden sm:inline">{t('facilitiesPage.introCardsSection.scrollHintDesktop')}</span>
                <span className="sm:hidden">{t('facilitiesPage.introCardsSection.scrollHintMobile')}</span>
              </p>
            )}
          </div>
          <div className="relative" aria-labelledby="facilities-cards-heading">
              {facilitiesHasOverflow && (
                <>
                  <button
                    type="button"
                    onClick={() => scrollFacilities('left')}
                    disabled={!showFacilitiesLeft}
                    aria-label={t('facilitiesPage.introCardsSection.prevAria')}
                    className={cn(
                      'absolute left-0 top-[35%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg transition-colors md:left-1 md:h-14 md:w-14',
                      showFacilitiesLeft
                        ? 'border-brand-200 bg-white text-brand-900 hover:border-brand-800 hover:bg-brand-900 hover:text-white'
                        : 'cursor-not-allowed border-brand-200/60 bg-brand-50 text-brand-300 opacity-75',
                    )}
                  >
                    <ArrowLeft size={22} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollFacilities('right')}
                    disabled={!showFacilitiesRight}
                    aria-label={t('facilitiesPage.introCardsSection.nextAria')}
                    className={cn(
                      'absolute right-0 top-[35%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg transition-colors md:right-1 md:h-14 md:w-14',
                      showFacilitiesRight
                        ? 'border-brand-200 bg-white text-brand-900 hover:border-brand-800 hover:bg-brand-900 hover:text-white'
                        : 'cursor-not-allowed border-brand-200/60 bg-brand-50 text-brand-300 opacity-75',
                    )}
                  >
                    <ArrowRight size={22} strokeWidth={2} />
                  </button>
                </>
              )}
              <div
                ref={facilitiesRef}
                role="list"
                className="scrollbar-facilities site-carousel-bleed flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-[var(--site-gutter-x)] scroll-pr-[var(--site-gutter-x)] pb-4 pt-2 md:mx-0 md:gap-8 md:scroll-pl-8 md:scroll-pr-8 md:px-0 md:pb-5"
              >
                {FACILITY_CARD_KEYS.map((cardKey, i) => {
                  const itemBase = `facilitiesPage.introCardsSection.items.${cardKey}`;
                  const imgAlt = t(`${itemBase}.imgAlt`);
                  return (
                    <article
                      key={cardKey}
                      role="listitem"
                      className="group flex w-[min(100%,20.5rem)] shrink-0 snap-center snap-always flex-col overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm outline-none transition-shadow duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-brand-900/20 dark:border-brand-600 dark:bg-brand-800/40 dark:shadow-lg dark:shadow-black/25 sm:w-[min(100%,22rem)] md:w-[min(100%,24rem)] lg:w-[min(100%,26rem)]"
                    >
                      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-brand-100">
                        <img
                          src={FACILITY_CARD_IMAGES[cardKey]}
                          alt={imgAlt}
                          className="relative z-[1] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 416px, (min-width: 768px) 384px, min(100vw - 2.5rem, 328px)"
                          loading={i < 5 ? 'eager' : 'lazy'}
                          decoding="async"
                          referrerPolicy="no-referrer"
                          fetchPriority={i === 0 ? 'high' : undefined}
                        />
                      </div>
                      <div className="flex flex-1 flex-col border-t border-brand-100 bg-white px-5 py-5 dark:border-brand-700 dark:bg-brand-800/80 md:px-6 md:py-6">
                        <h4 className="font-serif text-xl leading-snug tracking-tight text-brand-950 md:text-[1.35rem] dark:text-brand-50">
                          {t(`${itemBase}.title`)}
                        </h4>
                        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-800 md:text-base md:leading-relaxed dark:text-brand-200">
                          {t(`${itemBase}.desc`)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
        </div>
      </section>

      <section aria-labelledby="facilities-usecases-heading" className="section-viewport relative overflow-hidden border-b border-brand-800 bg-brand-900 text-white">
        <div className="section-viewport-scroll site-container relative z-10 py-14 sm:py-16 md:py-16">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2 id="facilities-usecases-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={SECTION_H2_ON_DARK_CLASS}>
              {t('facilitiesPage.useCasesSection.headingBefore')}
              <span className="italic text-brand-400">{t('facilitiesPage.useCasesSection.headingAccent')}</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {USE_CASE_KEYS.map((useCaseKey, i) => {
              const itemBase = `facilitiesPage.useCasesSection.items.${useCaseKey}`;
              const imgAlt = t(`${itemBase}.imgAlt`);
              return (
              <motion.div
                key={useCaseKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="ds-media-card ds-media-card--dark"
              >
                <img
                  src={USE_CASE_IMAGES[useCaseKey]}
                  alt={imgAlt}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="ds-media-card__scrim" aria-hidden />
                <div className="ds-media-card__veil" aria-hidden />
                <div className="ds-media-card__inner">
                  <h3 className="ds-media-card__title">{t(`${itemBase}.title`)}</h3>
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

      <section
        aria-labelledby="facilities-gallery-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-100 bg-white dark:border-brand-800 dark:bg-brand-950"
      >
        <div className="section-viewport-scroll site-container relative z-10 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 w-full">
            <h2 id="facilities-gallery-heading" className={cn(SECTION_H2_CLASS, 'mb-6')}>
              {t('facilitiesPage.gallerySection.heading')}
            </h2>
            <p className={SECTION_LEAD_CLASS}>{t('facilitiesPage.gallerySection.intro')}</p>
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
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
            <div ref={galleryRef} className="scrollbar-hide site-carousel-bleed flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 md:mx-0 md:gap-8 md:px-0 md:pb-10">
              {gallerySlides.map((slide, i) => (
                <motion.div
                  key={facilitiesInspirationSlides[i]!.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="group relative aspect-6/7 min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl dark:border-brand-700 dark:bg-brand-900/50 md:min-w-[46%] lg:min-w-[34%]"
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
                    aria-label={t('facilitiesPage.gallerySection.openLargeImageAria', { alt: slide.alt })}
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
              to={`${ROUTES.galleri}?category=facilities`}
              className="group inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 transition-all hover:border-brand-300 hover:shadow-md dark:border-brand-600 dark:bg-brand-800 dark:hover:border-brand-500"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-900 dark:text-brand-50">
                {t('facilitiesPage.gallerySection.fullGalleryCta')}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white transition-transform group-hover:translate-x-1 dark:bg-brand-100 dark:text-brand-900">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="facilities-faq-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-100 bg-brand-50/50 dark:border-brand-800 dark:bg-brand-950/50"
      >
        <div className="section-viewport-scroll site-container relative z-10 py-12 md:py-16">
          <div className="mx-auto w-full max-w-3xl">
          <div className="mb-10 text-center md:mb-12">
            <motion.h2
              id="facilities-faq-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(SECTION_H2_CLASS, 'mb-4')}
            >
              {t('facilitiesPage.faqSection.headingBefore')}
              <span className="italic text-brand-600 dark:text-brand-400">{t('facilitiesPage.faqSection.headingAccent')}</span>
            </motion.h2>
            <div className="mx-auto h-px w-16 bg-brand-200 dark:bg-brand-700" />
          </div>
          <div className="space-y-3">
            {FACILITY_FAQ_KEYS.map((faqKey, i) => {
              const itemBase = `facilitiesPage.faqSection.items.${faqKey}`;
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
                        transition={{ duration: 0.5 }}
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

      <section aria-labelledby="facilities-closing-cta-heading" className="section-viewport">
        <div className="section-viewport-scroll site-container py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full overflow-hidden rounded-xl bg-brand-900 px-6 py-14 text-center text-white shadow-2xl sm:px-10 sm:py-16 md:px-14 md:py-20"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_40%,white_0%,transparent_35%),radial-gradient(circle_at_70%_60%,white_0%,transparent_35%)]" />
            </div>
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-100">
                  {t('facilitiesPage.closingCta.eyebrow')}
                </div>
              </div>
              <h3
                id="facilities-closing-cta-heading"
                className="mb-4 font-serif text-4xl leading-tight text-balance md:text-5xl lg:text-6xl"
              >
                {t('facilitiesPage.closingCta.headingLine1Before')}
                <span className="block italic text-brand-300">{t('facilitiesPage.closingCta.headingLine1Accent')}</span>
              </h3>
              <p className={cn(SECTION_LEAD_ON_DARK_CLASS, 'mb-8')}>
                {t('facilitiesPage.closingCta.body')}
              </p>
              <div className="flex w-full justify-center">
                <Link to={kontaktSkjemaHash()} className={cn('group', 'cta-brand-band-primary-md')}>
                  {t('hero.cta')}
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

