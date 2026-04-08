import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { HeroScrollHint } from '../components/HeroScrollHint';
import { GalleryLightbox, useGalleryLightboxState, type GalleryLightboxSlide } from '../components/InspirationGalleryLightbox';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from '../lib/typography';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

import { ROUTES } from '../lib/routes';

const CTA_PRIMARY = ROUTES.henvendelse;
const CTA_SECONDARY = ROUTES.kontakt;

const CORPORATE_INTRO_BENEFIT_KEYS = ['item1', 'item2', 'item3'] as const;

const CORPORATE_EVENT_KEYS = [
  'conference',
  'teambuilding',
  'christmasParty',
  'summerParty',
  'workshopKickoff',
  'companyDinner',
] as const;

type CorporateEventKey = (typeof CORPORATE_EVENT_KEYS)[number];

const CORPORATE_EVENT_IMAGES: Record<CorporateEventKey, string> = {
  conference:
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=85&w=1200',
  teambuilding:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1200',
  christmasParty: '/corporate-event-christmas.png',
  summerParty: '/corporate-event-summer.png',
  workshopKickoff:
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=85&w=1200',
  companyDinner:
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1200',
};

const galleryImgs = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200',
];

const CORPORATE_FAQ_KEYS = ['eventTypes', 'tailored', 'viewing', 'howToInquire'] as const;

const GALLERY_EDGE_TOLERANCE = 2;

export const CorporatePage = () => {
  const { t, i18n } = useTranslation();
  const gallerySlides = useMemo<GalleryLightboxSlide[]>(
    () =>
      galleryImgs.map((src, i) => ({
        src,
        alt: t('corporatePage.gallerySection.slideAlt', { n: i + 1 }),
      })),
    [t, i18n.language],
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const { lightboxIndex, setLightboxIndex, closeLightbox, lightboxShowPrev, lightboxShowNext } =
    useGalleryLightboxState(galleryImgs.length);

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
    <div className="flex flex-col bg-white">
      {/* 1 — Hero */}
      <section className="hero-below-nav section-viewport section-viewport-hero relative flex min-h-0 flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/corporate-hero.png"
            alt={t('corporatePage.heroImageAlt')}
            width={1024}
            height={682}
            className="h-full w-full object-cover brightness-[0.52] contrast-[1.03]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent"
            aria-hidden
          />
        </div>
        <div className="section-viewport-scroll relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-6 text-center text-white">
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
              {t('corporatePage.heroTitleLine1')}
              {' '}
              <br className="hidden md:block" />
              {t('corporatePage.heroTitleLine2Prefix')}
              <span className="italic text-white/95">{t('corporatePage.heroTitleLine2Accent')}</span>
              {t('corporatePage.heroTitleLine2Rest')}
            </motion.h1>
            <p className="mx-auto max-w-2xl text-lg font-light italic opacity-90 sm:text-xl md:text-2xl [text-shadow:0_1px_20px_rgba(0,0,0,0.28)]">
              {t('corporatePage.heroTagline')}
            </p>
            <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
              <Link
                to={CTA_SECONDARY}
                className="w-full rounded-full bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-brand-900 shadow-2xl transition-all hover:-translate-y-1 hover:bg-brand-50 sm:w-auto"
              >
                {t('hero.bookNow')}
              </Link>
              <Link
                to={CTA_PRIMARY}
                className="w-full rounded-full border-2 border-white bg-transparent px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                {t('hero.cta')}
              </Link>
            </div>
          </motion.div>
        </div>

        <HeroScrollHint targetId="corporate-intro" ariaLabel={t('corporatePage.heroScrollHintAria')} />
      </section>

      {/* 2 — Verdi: bilde venstre + kompakt innhold (samme informasjon) */}
      <section
        id="corporate-intro"
        aria-labelledby="corporate-value-heading"
        className="section-viewport scroll-mt-24 border-b border-brand-100 bg-linear-to-b from-white via-brand-50/30 to-brand-50/50"
      >
        <div className="section-viewport-scroll mx-auto w-full max-w-[min(92rem,calc(100vw-2.5rem))] px-5 py-12 md:px-8 md:py-16 lg:py-20">
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
              <div className="flex flex-col lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  className="relative mx-auto aspect-[7/8] w-full max-w-md overflow-hidden rounded-lg border border-brand-200/80 shadow-lg lg:mx-0 lg:max-w-none"
                >
                  <img
                    src="/corporate-intro-dinner.png"
                    alt={t('corporatePage.introSection.figureAlt')}
                    width={1024}
                    height={682}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10"
                    aria-hidden
                  />
                </motion.div>
              </div>

              <div className="flex flex-col lg:col-span-7">
                <motion.header
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 md:space-y-5"
                >
                  <h2
                    id="corporate-value-heading"
                    className={cn(SECTION_H2_CLASS, 'text-balance')}
                  >
                    {t('corporatePage.introSection.headingBefore')}
                    <span className="italic text-brand-700">{t('corporatePage.introSection.headingAccent')}</span>
                  </h2>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-brand-800 md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed">
                    {t('corporatePage.introSection.intro')}
                  </p>
                </motion.header>

                <div className="mt-6 border-t border-brand-200/90 pt-6 md:mt-8 md:pt-8">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 md:mb-4 md:text-base md:tracking-[0.22em]">
                    {t('corporatePage.introSection.benefitsEyebrow')}
                  </p>
                  <ul className="space-y-3 md:space-y-3.5" role="list">
                    {CORPORATE_INTRO_BENEFIT_KEYS.map((key) => (
                      <li
                        key={key}
                        className="flex gap-3 text-base leading-snug text-brand-800 md:gap-3.5 md:text-lg md:leading-relaxed"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 md:mt-1 md:h-6 md:w-6"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span>{t(`corporatePage.introSection.benefits.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Arrangementer: flat brand-900 (samme som bryllup «Slik kan dagen se ut») */}
      <section
        aria-labelledby="corporate-events-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-800 bg-brand-900 px-4 text-white"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute -right-[5%] top-[10%] h-[30%] w-[30%] rounded-full bg-brand-400/10 blur-[100px]" />
          <div className="absolute -left-[5%] bottom-[10%] h-[30%] w-[30%] rounded-full bg-white/[0.07] blur-[100px]" />
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[1800px] px-5 py-14 sm:px-8 sm:py-16 md:px-14 md:py-16 lg:px-16 xl:px-20">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2
              id="corporate-events-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={SECTION_H2_ON_DARK_CLASS}
            >
              {t('corporatePage.eventsSection.headingBefore')}
              <span className="italic text-brand-400">{t('corporatePage.eventsSection.headingAccent')}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {CORPORATE_EVENT_KEYS.map((eventKey, i) => {
              const eventTitle = t(`corporatePage.eventsSection.items.${eventKey}.title`);
              const eventImageSrc = CORPORATE_EVENT_IMAGES[eventKey];
              const eventImageAlt = t(`corporatePage.eventsSection.items.${eventKey}.imgAlt`);
              return (
                <motion.div
                  key={eventKey}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-white/28 outline-none transition-all duration-500 hover:border-white/45 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
                >
                  <img
                    src={eventImageSrc}
                    alt={eventImageAlt}
                    width={
                      eventKey === 'christmasParty'
                        ? 960
                        : eventKey === 'summerParty'
                          ? 819
                          : undefined
                    }
                    height={
                      eventKey === 'christmasParty'
                        ? 720
                        : eventKey === 'summerParty'
                          ? 1024
                          : undefined
                    }
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy={eventImageSrc.startsWith('http') ? 'no-referrer' : undefined}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0 group-focus-within:opacity-0" />

                  <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />

                  <div className="absolute inset-0 flex h-full min-h-0 flex-col p-5 sm:p-6 md:p-7 lg:p-6">
                    <h3 className="mt-auto shrink-0 font-display text-2xl uppercase tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:mt-0 group-focus-within:mt-0 sm:text-3xl md:text-[1.85rem] lg:text-2xl lg:leading-tight xl:text-[1.75rem]">
                      {eventTitle}
                    </h3>

                    <div className="mt-3 flex-grow opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                      <p className="line-clamp-[10] whitespace-pre-line text-base font-normal leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] sm:text-lg md:text-[1.125rem] md:leading-relaxed lg:line-clamp-[9]">
                        {t(`corporatePage.eventsSection.items.${eventKey}.desc`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 — Galleri (samme uttrykk som bryllup) */}
      <section className="section-viewport relative overflow-hidden border-b border-brand-100 bg-white">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-brand-100/20 blur-[150px]" />
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-24 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-3xl"
          >
            <h2 className={cn(SECTION_H2_CLASS)}>{t('corporatePage.gallerySection.heading')}</h2>
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
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70',
                  )}
                  aria-label={t('corporatePage.gallerySection.prevImageAria')}
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
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70',
                  )}
                  aria-label={t('corporatePage.gallerySection.nextImageAria')}
                  aria-disabled={!showGalleryRight}
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}

            <div
              ref={galleryRef}
              className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 md:mx-0 md:gap-8 md:px-0 md:pb-10"
            >
              {gallerySlides.map((slide, i) => (
                <motion.div
                  key={slide.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="group relative aspect-[6/7] min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]"
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="absolute inset-0 z-10 cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                    aria-label={t('corporatePage.gallerySection.openLargeImage', { caption: slide.alt })}
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
              to={`${ROUTES.galleri}?category=corporate`}
              className="group inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 transition-all hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-900">
                {t('corporatePage.gallerySection.fullGalleryCta')}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5 — FAQ (samme mål og uttrykk som bryllup) */}
      <section className="section-viewport relative overflow-hidden border-b border-brand-100 bg-brand-50/50">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute left-[5%] top-[10%] h-[20%] w-[20%] rounded-full bg-brand-200/10 blur-[100px]" />
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-10 text-center md:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(SECTION_H2_CLASS, 'mb-4')}
            >
              {t('corporatePage.faqSection.headingBefore')}
              <span className="italic text-brand-600">{t('corporatePage.faqSection.headingAccent')}</span>
            </motion.h2>
            <div className="mx-auto h-px w-16 bg-brand-200" />
          </div>

          <div className="space-y-3">
            {CORPORATE_FAQ_KEYS.map((faqKey, i) => {
              const itemBase = `corporatePage.faqSection.items.${faqKey}`;
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
                      ? 'border-brand-200 bg-white shadow-md'
                      : 'border-brand-100 bg-white/40 hover:border-brand-200 hover:bg-white/60',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-4"
                  >
                    <span
                      className={cn(
                        'font-serif text-lg transition-colors duration-300 md:text-xl',
                        openFaq === i ? 'text-brand-900' : 'text-brand-800 group-hover:text-brand-900',
                      )}
                    >
                      {t(`${itemBase}.q`)}
                    </span>
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                        openFaq === i
                          ? 'rotate-180 border-brand-900 bg-brand-900 text-white'
                          : 'border-brand-200 text-brand-400 group-hover:border-brand-400 group-hover:text-brand-900',
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
                        <div className="px-5 pb-5 text-[15px] font-light leading-relaxed text-brand-600 md:px-6 md:pb-6 md:text-base">
                          <div className="mb-3 h-px w-10 bg-brand-100" />
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
      </section>

      {/* 6 — Avsluttende CTA (samme uttrykk som galleri) */}
      <section className="section-viewport px-8 md:px-20">
        <div className="section-viewport-scroll py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-[1800px] overflow-hidden rounded-xl bg-brand-900 px-6 py-14 text-center text-white shadow-2xl sm:px-10 sm:py-16 md:px-14 md:py-20"
          >
            <div className="absolute inset-0 z-0 opacity-30">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
                alt={t('corporatePage.closingCta.bgImageAlt')}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/40 to-brand-900/90" />
            </div>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-brand-400/20 blur-[120px]" />
              <div className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-rose-400/10 blur-[120px]" />
            </div>
            <div className="relative z-10 mx-auto max-w-3xl space-y-6 md:space-y-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-300">
                {t('corporatePage.closingCta.eyebrow')}
              </p>
              <h2 className={cn(SECTION_H2_ON_DARK_CLASS, 'm-0')}>
                {t('corporatePage.closingCta.headingLine1Before')}
                <span className="italic text-brand-400">{t('corporatePage.closingCta.headingLine1Accent')}</span>
                <br />
                {t('corporatePage.closingCta.headingLine2')}
              </h2>
              <p className="text-lg font-light leading-relaxed text-brand-100 md:text-xl">
                {t('corporatePage.closingCta.body')}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:gap-5">
                <Link
                  to={CTA_PRIMARY}
                  className="w-full rounded-full bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.28em] text-brand-900 shadow-xl transition hover:bg-brand-50 sm:w-auto"
                >
                  {t('hero.cta')}
                </Link>
                <Link
                  to={CTA_SECONDARY}
                  className="w-full rounded-full border border-white/30 px-10 py-5 text-xs font-bold uppercase tracking-[0.28em] text-white transition hover:bg-white/10 sm:w-auto"
                >
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
