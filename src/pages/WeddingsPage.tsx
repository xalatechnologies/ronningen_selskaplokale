import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Utensils,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  GlassWater,
  PartyPopper,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { inspirationGallerySlides, inspirationSlideFileNumber } from '../lib/inspirationGallery';
import { ROUTES } from '../lib/routes';
import {
  SECTION_H2_CLASS,
  SECTION_H2_ON_DARK_CLASS,
  SECTION_LEAD_CLASS,
  SECTION_LEAD_ON_DARK_CLASS,
} from '../lib/typography';
import { HeroScrollHint } from '../components/HeroScrollHint';
import {
  InspirationGalleryLightbox,
  useInspirationGalleryLightboxState,
} from '../components/InspirationGalleryLightbox';

const WEDDINGS_ATMOSPHERE_WHY_KEYS = ['item1', 'item2', 'item3', 'item4'] as const;
const WEDDINGS_ATMOSPHERE_WHY_NUMBERS = ['01', '02', '03', '04'] as const;

const WEDDINGS_DAY_TIMELINE_KEYS = ['item1', 'item2', 'item3', 'item4'] as const;

const WEDDINGS_DAY_TIMELINE_IMAGES = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000',
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000',
  '/weddings/day-timeline-coffee-dessert.png',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
] as const;

const WEDDINGS_DAY_TIMELINE_ICONS = [Users, Utensils, GlassWater, PartyPopper] as const;

const WEDDINGS_SERVICE_KEYS = [
  'kitchen',
  'photography',
  'decoration',
  'bar',
  'soundLight',
  'tableSetting',
] as const;

const WEDDINGS_SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  '/weddings/service-photography-waterfall.png',
  '/weddings/service-decoration-tables.png',
  '/home-service-bar-dancefloor.png',
  'https://images.unsplash.com/photo-1758550445795-278c5867493d?auto=format&fit=crop&q=80&w=1200',
  '/weddings/service-table-setting-banquet-hall.png',
] as const;

const WEDDINGS_FAQ_KEYS = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'] as const;

export const WeddingsPage = () => {
  const GALLERY_EDGE_TOLERANCE = 2;
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const { lightboxIndex, setLightboxIndex, closeLightbox, lightboxShowPrev, lightboxShowNext } =
    useInspirationGalleryLightboxState();

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
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      if (direction === 'left' && scrollLeft <= GALLERY_EDGE_TOLERANCE) return;
      if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - GALLERY_EDGE_TOLERANCE) return;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      requestAnimationFrame(handleGalleryScroll);
      setTimeout(handleGalleryScroll, 320);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero */}
      <section className="hero-below-nav section-viewport section-viewport-hero relative flex min-h-0 flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/weddings/hero-weddings-bouquet.png"
            alt={t('weddingsPage.heroImageAlt')}
            className="h-full w-full object-cover brightness-[0.64] contrast-[1.03]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/28 via-black/5 to-transparent"
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
              {t('weddingsPage.heroTitleLine1')}
              {' '}
              <br className="hidden md:block" />
              <span className="italic text-white/95">
                {t('weddingsPage.heroTitleLine2Accent')}
              </span>
              {t('weddingsPage.heroTitleLine2Rest')}
            </motion.h1>
            <p className="w-full max-w-none text-lg font-light italic opacity-90 sm:text-xl md:text-2xl [text-shadow:0_1px_20px_rgba(0,0,0,0.28)]">
              {t('weddingsPage.heroTagline')}
            </p>
            <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
              <Link
                to={ROUTES.kontakt}
                className="w-full rounded-full bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-brand-900 shadow-2xl transition-all hover:-translate-y-1 hover:bg-brand-50 sm:w-auto"
              >
                {t('hero.bookNow')}
              </Link>
              <Link
                to={ROUTES.kontakt}
                className="w-full rounded-full border-2 border-white bg-transparent px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                {t('hero.cta')}
              </Link>
            </div>
          </motion.div>
        </div>

        <HeroScrollHint targetId="atmosfaeren" ariaLabel={t('weddingsPage.heroScrollHintAria')} />
      </section>

      {/* Atmosfæren — samme bakgrunn og typografi som forsiden «Våre konsepter» for tydelig kontrast */}
      <section
        id="atmosfaeren"
        aria-labelledby="atmosfaeren-heading"
        className="section-viewport scroll-mt-24 relative overflow-hidden border-y border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50"
      >
        <div
          className="pointer-events-none absolute left-[6%] top-[10%] h-[min(44vw,26rem)] w-[min(44vw,26rem)] rounded-full bg-brand-300/20 blur-[90px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[6%] right-[4%] h-[min(36vw,22rem)] w-[min(36vw,22rem)] rounded-full bg-brand-500/12 blur-[75px]"
          aria-hidden
        />

        <div className="section-viewport-scroll site-container relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-20 items-start">
            <div className="order-2 lg:order-1 w-full min-w-0">
              <h2 id="atmosfaeren-heading" className={cn(SECTION_H2_CLASS, 'mb-6 text-balance')}>
                {t('weddingsPage.atmosphere.headingLine1')} <br /> {t('weddingsPage.atmosphere.headingLine2')}
              </h2>
              <div className="space-y-5 md:space-y-6">
                <p className={SECTION_LEAD_CLASS}>{t('weddingsPage.atmosphere.intro1')}</p>
              </div>
            </div>

            <figure className="order-1 lg:order-2 m-0 w-full">
              <div
                className={cn(
                  'relative w-full overflow-hidden rounded-md border border-brand-100 bg-brand-50 shadow-lg',
                  'min-h-[min(56vw,320px)] sm:min-h-[min(52vw,380px)] md:min-h-[420px]',
                  'lg:min-h-[min(50vh,480px)] xl:min-h-[min(52vh,560px)] 2xl:min-h-[min(52vh,620px)]',
                )}
              >
                <img
                  src="/weddings/atmosphere-sparkler-sendoff.png"
                  alt={t('weddingsPage.atmosphere.figureAlt')}
                  width={1024}
                  height={682}
                  decoding="async"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            </figure>
          </div>

          <ul className="mt-16 md:mt-20 grid list-none grid-cols-1 gap-10 border-t border-brand-200/90 pt-12 sm:grid-cols-2 sm:gap-12 md:pt-14 lg:gap-14 m-0 p-0">
            {WEDDINGS_ATMOSPHERE_WHY_KEYS.map((whyKey, i) => (
              <li key={whyKey} className="flex gap-5 md:gap-6">
                <span
                  className="w-11 shrink-0 pt-0.5 text-right font-serif text-3xl tabular-nums leading-none text-brand-400 md:w-12 md:text-4xl"
                  aria-hidden
                >
                  {WEDDINGS_ATMOSPHERE_WHY_NUMBERS[i]}
                </span>
                <div className="min-w-0 border-l border-brand-300/90 pl-5 md:pl-6">
                  <h3 className="mb-2 font-serif text-xl tracking-tight text-brand-950 md:text-2xl md:leading-snug">
                    {t(`weddingsPage.atmosphere.why.${whyKey}.title`)}
                  </h3>
                  <p className="text-base leading-[1.7] text-brand-800 md:text-[17px]">
                    {t(`weddingsPage.atmosphere.why.${whyKey}.desc`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. What your day can look like - Visual Timeline */}
      <section className="section-viewport relative overflow-hidden bg-brand-900 text-white">
        <div className="section-viewport-scroll site-container relative z-10 py-20">
          <header className="relative mb-16">
            <div className="flex max-w-4xl flex-col gap-5 md:gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(SECTION_H2_ON_DARK_CLASS, 'm-0')}
              >
                <span className="block">{t('weddingsPage.dayTimeline.headingLine1')}</span>
                <span className="mt-1 block pl-6 italic text-brand-400 sm:pl-10 md:pl-14 lg:pl-16">
                  {t('weddingsPage.dayTimeline.headingLine2')}
                </span>
              </motion.h2>
            </div>
          </header>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 z-0 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {WEDDINGS_DAY_TIMELINE_KEYS.map((stepKey, i) => {
                const Icon = WEDDINGS_DAY_TIMELINE_ICONS[i];
                const stepTitle = t(`weddingsPage.dayTimeline.${stepKey}.title`);
                const stepImageSrc = WEDDINGS_DAY_TIMELINE_IMAGES[i];
                const stepImageAlt = t(`weddingsPage.dayTimeline.${stepKey}.imgAlt`, {
                  defaultValue: stepTitle,
                });
                return (
                  <motion.div
                    key={stepKey}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="group relative h-[min(600px,50dvh)] min-h-[260px] overflow-hidden rounded-lg border border-white/28 transition-all duration-500 hover:border-white/45"
                  >
                    <div className="absolute inset-0 z-0">
                      <img
                        src={stepImageSrc}
                        alt={stepImageAlt}
                        className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
                        referrerPolicy={stepImageSrc.startsWith('http') ? 'no-referrer' : undefined}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-brand-950/50 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-75" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-12">
                      <div className="flex items-start justify-end">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-brand-200 backdrop-blur-md transition-all duration-500 group-hover:border-white/40 group-hover:bg-white group-hover:text-brand-900">
                          <Icon size={32} />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="font-serif text-3xl leading-none tracking-tight">{stepTitle}</h3>
                        <p className="translate-y-8 text-base font-light leading-relaxed text-white/80 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                          {t(`weddingsPage.dayTimeline.${stepKey}.desc`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5: Services — samme rutenett og kortformat som forsiden «Eksklusive Opplevelser» */}
      <section className="section-viewport relative overflow-hidden bg-[var(--ds-surface-subtle)]">
        {/* Subtle Background Glows */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute top-[10%] -right-[5%] w-[30%] h-[30%] bg-brand-200/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-brand-300/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="section-viewport-scroll site-container relative z-10 py-14 sm:py-16 md:py-16">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={SECTION_H2_CLASS}
            >
              {t('weddingsPage.servicesSection.headingBefore')}
              <span className="italic text-brand-800">
                {t('weddingsPage.servicesSection.headingAccent')}
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {WEDDINGS_SERVICE_KEYS.map((serviceKey, i) => {
              const serviceTitle = t(`weddingsPage.servicesSection.items.${serviceKey}.title`);
              const serviceImageAlt = t(`weddingsPage.servicesSection.items.${serviceKey}.imgAlt`);
              const serviceImageSrc = WEDDINGS_SERVICE_IMAGES[i];
              return (
                <motion.div
                  key={serviceKey}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="ds-media-card ds-media-card--light"
                >
                  <img
                    src={serviceImageSrc}
                    alt={serviceImageAlt}
                    width={
                      serviceKey === 'photography' || serviceKey === 'bar'
                        ? 1024
                        : serviceKey === 'tableSetting'
                          ? 1024
                          : serviceKey === 'decoration'
                            ? 852
                            : serviceKey === 'soundLight'
                              ? 800
                              : undefined
                    }
                    height={
                      serviceKey === 'photography' || serviceKey === 'bar'
                        ? 682
                        : serviceKey === 'decoration'
                          ? 1024
                          : serviceKey === 'soundLight'
                            ? 600
                            : serviceKey === 'tableSetting'
                              ? 737
                              : undefined
                    }
                    decoding="async"
                    loading="lazy"
                    referrerPolicy={serviceImageSrc.startsWith('http') ? 'no-referrer' : undefined}
                  />
                  <div className="ds-media-card__scrim" aria-hidden />
                  <div className="ds-media-card__veil" aria-hidden />
                  <div className="ds-media-card__inner">
                    <h3 className="ds-media-card__title">{serviceTitle}</h3>
                    <div className="ds-media-card__body">
                      <p className="ds-media-card__text">
                        {t(`weddingsPage.servicesSection.items.${serviceKey}.desc`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Gallery - Editorial Style */}
      <section className="section-viewport relative overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-brand-100/20 blur-[150px] rounded-full"></div>
        </div>

        <div className="section-viewport-scroll site-container relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 w-full"
          >
            <h2 className={cn(SECTION_H2_CLASS, 'mb-6')}>{t('weddingsPage.gallerySection.heading')}</h2>
            <p className={SECTION_LEAD_CLASS}>{t('weddingsPage.gallerySection.intro')}</p>
          </motion.div>

          <div className="relative">
            {galleryHasOverflow && (
              <>
                <button
                  type="button"
                  onClick={() => scrollGallery('left')}
                  disabled={!showGalleryLeft}
                  className={`absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors md:left-4 md:h-12 md:w-12 ${
                    showGalleryLeft
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70'
                  }`}
                  aria-label={t('galleryPage.lightboxPrev')}
                  aria-disabled={!showGalleryLeft}
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollGallery('right')}
                  disabled={!showGalleryRight}
                  className={`absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors md:right-4 md:h-12 md:w-12 ${
                    showGalleryRight
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70'
                  }`}
                  aria-label={t('galleryPage.lightboxNext')}
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
              {inspirationGallerySlides.map((item, i) => {
                const slideDescription = t('inspirationGallery.slideAlt', {
                  n: inspirationSlideFileNumber(item.key),
                });
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.7 }}
                    className="group relative aspect-[6/7] min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]"
                  >
                    <img
                      src={item.src}
                      alt={slideDescription}
                      className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={i > 4 ? 'lazy' : 'eager'}
                      decoding="async"
                    />
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="absolute inset-0 z-10 cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                      aria-label={t('inspirationGallery.openImageAria', {
                        description: slideDescription,
                      })}
                    />
                  </motion.div>
                );
              })}
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
              to={`${ROUTES.galleri}?category=wedding`}
              className="group inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 transition-all hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-900">
                {t('weddingsPage.gallerySection.ctaFullGallery')}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>



      {/* 8. FAQ - Editorial Style */}
      <section className="section-viewport relative overflow-hidden bg-brand-50/50">
        {/* Background Decorative Elements */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-[20%] h-[20%] bg-brand-200/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="section-viewport-scroll site-container relative z-10 py-12 md:py-16">
          <div className="mx-auto w-full max-w-3xl">
          <div className="text-center mb-10 md:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(SECTION_H2_CLASS, 'mb-4')}
            >
              {t('weddingsPage.faqSection.headingBefore')}
              <span className="italic text-brand-600">{t('weddingsPage.faqSection.headingAccent')}</span>
            </motion.h2>
            <div className="h-px w-16 bg-brand-200 mx-auto"></div>
          </div>

          <div className="space-y-3">
            {WEDDINGS_FAQ_KEYS.map((faqKey, i) => (
              <motion.div
                key={faqKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-md overflow-hidden border transition-all duration-500
                  ${openFaq === i
                    ? 'bg-white border-brand-200 shadow-md'
                    : 'bg-white/40 border-brand-100 hover:border-brand-200 hover:bg-white/60'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left group md:px-6 md:py-4"
                  aria-expanded={openFaq === i}
                >
                  <span
                    className={`font-serif text-lg transition-colors duration-300 md:text-xl ${openFaq === i ? 'text-brand-900' : 'text-brand-800 group-hover:text-brand-900'}`}
                  >
                    {t(`weddingsPage.faqSection.items.${faqKey}.q`)}
                  </span>
                  <div className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500
                    ${openFaq === i 
                      ? 'bg-brand-900 border-brand-900 text-white rotate-180' 
                      : 'border-brand-200 text-brand-400 group-hover:border-brand-400 group-hover:text-brand-900'
                    }`}
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
                      <div className="px-5 pb-5 text-[15px] font-light leading-relaxed text-brand-600 md:px-6 md:pb-6 md:text-base">
                        <div className="mb-3 h-px w-10 bg-brand-100"></div>
                        {t(`weddingsPage.faqSection.items.${faqKey}.a`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA - Editorial Style */}
      <section className="section-viewport">
        <div className="section-viewport-scroll site-container py-8 md:py-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full overflow-hidden rounded-xl bg-brand-900 px-6 py-12 text-center text-white shadow-2xl sm:px-10 sm:py-14 md:px-14 md:py-16 lg:px-16 lg:py-20"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000"
              alt={t('weddingsPage.finalCta.bgImageAlt')}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/40 to-brand-900/90"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-400/20 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-rose-400/10 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-none space-y-8 md:space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={SECTION_H2_ON_DARK_CLASS}
            >
              {t('weddingsPage.finalCta.headingLine1')} <br />
              <span className="italic text-brand-400">{t('weddingsPage.finalCta.headingLine2')}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={SECTION_LEAD_ON_DARK_CLASS}
            >
              {t('weddingsPage.finalCta.body')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-5 pt-4 sm:flex-row sm:gap-6 sm:pt-6"
            >
              <Link
                to={ROUTES.kontakt}
                className="w-full rounded-full bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-brand-900 shadow-xl transition-all hover:scale-[1.02] hover:bg-brand-50 active:scale-[0.98] sm:w-auto sm:px-14"
              >
                {t('hero.bookNow')}
              </Link>
              <Link
                to={ROUTES.kontakt}
                className="w-full rounded-full border border-white/30 bg-transparent px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-white/10 sm:w-auto sm:px-14"
              >
                {t('hero.cta')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </section>

      <InspirationGalleryLightbox
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onGoPrev={lightboxShowPrev}
        onGoNext={lightboxShowNext}
      />
    </div>
  );
};
