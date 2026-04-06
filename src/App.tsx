/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Phone, Mail, MapPin, Instagram, Facebook, ArrowRight, ArrowLeft, MessageCircle, SendHorizontal } from 'lucide-react';
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import './lib/i18n';
import { Toaster } from 'sonner';

import { AdminPanel } from './components/AdminPanel';
import { HeroScrollHint } from './components/HeroScrollHint';
import {
  InspirationGalleryLightbox,
  useInspirationGalleryLightboxState,
} from './components/InspirationGalleryLightbox';
import { BOOKING_URL } from './lib/booking';
import { inspirationGallerySlides, inspirationSlideFileNumber } from './lib/inspirationGallery';
import { cn } from './lib/utils';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from './lib/typography';

import { ContactPage } from './pages/ContactPage';

import { GalleryPage } from './pages/GalleryPage';

import { FAQPage } from './pages/FAQPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { WeddingsPage } from './pages/WeddingsPage';
import { CorporatePage } from './pages/CorporatePage';
import { PrivatePage } from './pages/PrivatePage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { appendConversation, detectLanguage } from './lib/customerAssistant';

const InquiryPage = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.location.replace(BOOKING_URL);
  }, []);
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-20">
      <p className="text-center text-brand-600">{t('common.redirectingBooking')}</p>
    </div>
  );
};

const HOME_CONCEPT_KEYS = ['weddings', 'corporate', 'private', 'facilities'] as const;

type HomeConceptKey = (typeof HOME_CONCEPT_KEYS)[number];

const HOME_CONCEPT_ROUTES: Record<HomeConceptKey, { path: string; img: string }> = {
  weddings: {
    path: '/weddings',
    img: '/concept-weddings-confetti.png',
  },
  corporate: {
    path: '/corporate',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
  },
  private: {
    path: '/packages',
    img: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=1200',
  },
  facilities: {
    path: '/facilities',
    img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1200',
  },
};

const HOME_SERVICE_KEYS = [
  'catering',
  'decoration',
  'soundLight',
  'barDancefloor',
  'coordination',
  'overnight',
] as const;

type HomeServiceKey = (typeof HOME_SERVICE_KEYS)[number];

const HOME_SERVICE_IMAGES: Record<HomeServiceKey, string> = {
  soundLight:
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
  catering:
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  barDancefloor:
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
  coordination:
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800',
  decoration:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
  overnight:
    'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800',
};

const PARTNER_KEYS = [
  'cateringKitchen',
  'flowersDecor',
  'photoVideo',
  'soundLight',
  'barService',
  'coordination',
  'digilist',
  'xala',
  'hostingStaff',
  'commitcare',
] as const;

type PartnerKey = (typeof PARTNER_KEYS)[number];

const PARTNER_MARKS: Record<PartnerKey, string> = {
  cateringKitchen: 'CK',
  flowersDecor: 'BD',
  photoVideo: 'FF',
  soundLight: 'LL',
  barService: 'BS',
  coordination: 'KO',
  digilist: 'DG',
  xala: 'XT',
  hostingStaff: 'VP',
  commitcare: 'CC',
};

const Home = () => {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement>(null);

  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const { lightboxIndex, setLightboxIndex, closeLightbox, lightboxShowPrev, lightboxShowNext } =
    useInspirationGalleryLightboxState();

  const handleGalleryScroll = () => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      const tol = 10;
      setGalleryHasOverflow(scrollWidth > clientWidth + tol);
      setShowGalleryLeft(scrollLeft > tol);
      setShowGalleryRight(scrollLeft < scrollWidth - clientWidth - tol);
    }
  };

  useEffect(() => {
    const galleryContainer = galleryRef.current;

    if (galleryContainer) galleryContainer.addEventListener('scroll', handleGalleryScroll);

    handleGalleryScroll();

    const onResize = () => {
      handleGalleryScroll();
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (galleryContainer) galleryContainer.removeEventListener('scroll', handleGalleryScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const { clientWidth } = galleryRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero — full-bleed background image + cream wash for readable type */}
      <section className="home-hero section-viewport section-viewport-hero relative flex min-h-0 flex-col overflow-hidden border-b border-brand-800 bg-brand-950 text-white">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/hero-home-collage-user.png"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-black/65"
            aria-hidden
          />
        </div>
        <div className="section-viewport-scroll relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden px-4 py-6 text-center text-white sm:px-8 md:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="flex w-full max-w-6xl flex-col items-center space-y-7 md:space-y-9"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-5xl text-balance font-serif leading-[0.9] tracking-tighter text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.45)]"
            >
              <span className="block text-2xl font-normal tracking-wide text-white/90 sm:text-3xl md:text-4xl lg:text-5xl">
                {t('homeHero.welcomeLine')}
              </span>
              <span className="mt-2 block font-serif italic text-5xl text-brand-200 sm:mt-3 sm:text-6xl md:text-7xl lg:text-8xl">
                {t('homeHero.venueName')}
              </span>
            </motion.h1>
            <p className="mx-auto max-w-2xl text-xl font-light italic opacity-90 md:text-3xl [text-shadow:0_1px_24px_rgba(0,0,0,0.35)]">
              {t('homeHero.tagline')}
            </p>
          </motion.div>
        </div>

        <HeroScrollHint targetId="konsepter" ariaLabel={t('homeHero.scrollHintAria')} />
      </section>

      <section
        id="konsepter"
        aria-labelledby="konsepter-heading"
        className="section-viewport scroll-mt-24 relative overflow-hidden bg-gradient-to-b from-white to-brand-50/50"
      >
        <div
          className="pointer-events-none absolute left-[6%] top-[10%] h-[min(44vw,26rem)] w-[min(44vw,26rem)] rounded-full bg-brand-300/20 blur-[90px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[6%] right-[4%] h-[min(36vw,22rem)] w-[min(36vw,22rem)] rounded-full bg-brand-500/12 blur-[75px]"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 flex min-h-0 flex-col">
          <div className="mx-auto flex w-full max-w-[1920px] flex-col px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 xl:px-20">
            <header className="max-w-2xl space-y-4 md:space-y-5">
              <h2 id="konsepter-heading" className={SECTION_H2_CLASS}>
                {t('homeConcepts.heading')}
              </h2>
              <p className="text-base leading-relaxed text-brand-600 md:text-lg md:leading-relaxed">
                {t('homeConcepts.intro')}
              </p>
            </header>

            <div className="mt-10 md:mt-12">
              <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 pl-0 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
                {HOME_CONCEPT_KEYS.map((key) => {
                  const { path, img } = HOME_CONCEPT_ROUTES[key];
                  const title = t(`homeConcepts.items.${key}.title`);
                  return (
                    <li key={key} className="min-w-0">
                      <Link
                        to={path}
                        className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
                      >
                        <div className="relative mx-auto mb-7 w-full max-w-[17rem] sm:mb-8 sm:max-w-[18rem] md:max-w-[19rem]">
                          <div className="relative aspect-square overflow-hidden rounded-full border-[3px] border-white/90 shadow-[0_20px_50px_-12px_rgba(33,24,22,0.35)] ring-1 ring-brand-900/10 transition-[transform,box-shadow] duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_28px_60px_-8px_rgba(33,24,22,0.42)]">
                            <img
                              src={img}
                              alt={
                                key === 'weddings'
                                  ? t('homeConcepts.items.weddings.imgAlt')
                                  : ''
                              }
                              width={key === 'weddings' ? 682 : undefined}
                              height={key === 'weddings' ? 1024 : undefined}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div
                              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
                              aria-hidden
                            />
                          </div>
                          <h3 className="absolute bottom-0 left-1/2 z-10 w-[min(92%,15.5rem)] -translate-x-1/2 translate-y-1/2 rounded-sm border-2 border-[#c9a352] bg-[linear-gradient(180deg,#faf8f4_0%,#f3efe6_55%,#f0ebe0_100%)] px-4 py-2 text-center font-serif text-[11px] font-normal uppercase leading-snug tracking-[0.12em] text-brand-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55),inset_0_0_0_2px_rgba(169,132,66,0.35),0_4px_14px_rgba(33,24,22,0.12)] sm:px-5 sm:py-2.5 sm:text-xs md:text-[0.8125rem]">
                            {title}
                          </h3>
                        </div>
                        <p className="mt-5 max-w-[24rem] text-balance text-[0.9375rem] leading-relaxed text-brand-900 sm:text-base md:text-[1.0625rem] md:leading-relaxed lg:text-lg lg:leading-relaxed sm:mt-6">
                          {t(`homeConcepts.items.${key}.description`)}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Our Services — flat brand-900 (samme som bryllup «Slik kan dagen se ut») */}
      <section className="section-viewport relative overflow-hidden bg-brand-900 px-4 text-white">
        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[1800px] px-5 py-14 sm:px-8 sm:py-16 md:px-14 md:py-16 lg:px-16 xl:px-20">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={SECTION_H2_ON_DARK_CLASS}
            >
              {t('homeServices.heading')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {HOME_SERVICE_KEYS.map((key, index) => {
              const title = t(`homeServices.items.${key}.title`);
              return (
                <motion.div
                  key={key}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-white/28 outline-none transition-all duration-500 hover:border-white/45 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
                >
                  <img
                    src={HOME_SERVICE_IMAGES[key]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0 group-focus-within:opacity-0" />

                  <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />

                  <div className="absolute inset-0 flex h-full min-h-0 flex-col p-5 sm:p-6 md:p-7 lg:p-6">
                    <h3 className="mt-auto shrink-0 font-display text-2xl uppercase tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:mt-0 group-focus-within:mt-0 sm:text-3xl md:text-[1.85rem] lg:text-2xl lg:leading-tight xl:text-[1.75rem]">
                      {title}
                    </h3>

                    <div className="mt-3 flex-grow opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                      <p className="line-clamp-[10] whitespace-pre-line text-base font-normal leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] sm:text-lg md:text-[1.125rem] md:leading-relaxed lg:line-clamp-[9]">
                        {t(`homeServices.items.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspirasjon og Galleri — samme mål som på bryllupssiden (WeddingsPage §7) */}
      <section
        id="inspirasjon-galleri"
        aria-labelledby="inspirasjon-galleri-heading"
        className="section-viewport relative overflow-hidden bg-white"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-brand-100/20 blur-[150px]" aria-hidden />
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-24 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-3xl"
          >
            <h2 id="inspirasjon-galleri-heading" className={cn(SECTION_H2_CLASS, 'mb-6')}>
              {t('homeGallery.heading')}
            </h2>
            <p className="text-lg leading-relaxed text-brand-600 md:text-xl">
              {t('homeGallery.intro')}
            </p>
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
              className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 md:gap-8 md:pb-10 md:mx-0 md:px-0"
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
                    className="group relative aspect-[6/7] min-w-[88%] overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm snap-center transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]"
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
              to="/gallery"
              className="group inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 transition-all hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-900">
                {t('homeGallery.ctaFullGallery')}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partnere — kategorier vi kobler dere med */}
      <section
        id="partnere"
        aria-labelledby="partnere-heading"
        className="section-viewport relative overflow-hidden border-t border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200/60 to-transparent"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-20 md:px-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16 xl:gap-20">
            <header className="text-center lg:col-span-5 xl:col-span-4 lg:text-left">
              <h2 id="partnere-heading" className={cn(SECTION_H2_CLASS, 'mb-4 md:mb-5')}>
                {t('homePartners.heading')}
              </h2>
              <p className="mx-auto max-w-xl text-base leading-[1.65] text-brand-600 md:text-lg md:leading-relaxed lg:mx-0 lg:max-w-none">
                {t('homePartners.intro')}
              </p>
            </header>

            <ul
              className="m-0 grid list-none grid-cols-2 gap-x-1 gap-y-3 p-0 sm:grid-cols-5 sm:gap-x-1 sm:gap-y-3 md:gap-y-3.5 lg:col-span-7 xl:col-span-8 xl:gap-y-4"
              aria-label={t('homePartners.listAria')}
            >
              {PARTNER_KEYS.map((key) => (
                <li
                  key={key}
                  className={cn(
                    'min-w-0',
                    key === 'commitcare' && 'sm:col-start-5 sm:row-start-2',
                  )}
                >
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-full border-2 border-brand-200/90 bg-linear-to-b from-white to-brand-50/90 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-brand-800 shadow-[0_8px_24px_-12px_rgba(33,24,22,0.25)] ring-1 ring-brand-900/[0.06] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_12px_28px_-10px_rgba(33,24,22,0.3)] md:h-[4.75rem] md:w-[4.75rem] md:text-[0.75rem]">
                      {PARTNER_MARKS[key]}
                    </div>
                    <div className="min-w-0 max-w-[11rem]">
                      <p className="text-balance font-serif text-[0.98rem] leading-snug tracking-tight text-brand-950 md:text-[1.05rem]">
                        {t(`homePartners.items.${key}`)}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                        {t('homePartners.badge')}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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

/** SPA navigation keeps window scroll by default — reset window and section scrollers on each route. */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.querySelectorAll('.section-viewport-scroll').forEach((el) => {
      (el as HTMLElement).scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

/** True when the main content behind the chat FAB reads as a dark surface → use a light FAB for contrast. */
function isDarkSurfaceBehindChatFab(hitTarget: Element | null): boolean {
  let node: Element | null = hitTarget;
  while (node && node !== document.documentElement) {
    if (node instanceof HTMLElement) {
      const tag = node.tagName;
      const c = typeof node.className === 'string' ? node.className : '';
      if (tag === 'SECTION') {
        if (c.includes('bg-brand-900') || c.includes('bg-brand-950')) return true;
        if (
          c.includes('section-viewport-hero') &&
          (c.includes('home-hero') || c.includes('hero-below-nav'))
        ) {
          return true;
        }
      }
      if (tag === 'FOOTER' && c.includes('bg-brand-900')) return true;
    }
    node = node.parentElement;
  }
  return false;
}

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatFabOnDark, setChatFabOnDark] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; text: string }[]>(() => [
    { role: 'assistant', text: t('chat.welcomeMessage') },
  ]);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const updateChatFabContrast = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const x = Math.max(4, window.innerWidth - 88);
    const y = Math.max(4, window.innerHeight - 32);
    const hit = document.elementFromPoint(x, y);
    setChatFabOnDark(isDarkSurfaceBehindChatFab(hit));
  }, []);

  useLayoutEffect(() => {
    if (!chatOpen) return;
    const el = chatMessagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, chatOpen]);

  useEffect(() => {
    updateChatFabContrast();
    const raf = requestAnimationFrame(updateChatFabContrast);
    const t = window.setTimeout(updateChatFabContrast, 150);
    const onMove = () => updateChatFabContrast();
    window.addEventListener('scroll', onMove, { passive: true });
    document.addEventListener('scroll', onMove, { passive: true, capture: true });
    window.addEventListener('resize', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener('scroll', onMove);
      document.removeEventListener('scroll', onMove, { capture: true });
      window.removeEventListener('resize', onMove);
    };
  }, [location.pathname, chatOpen, updateChatFabContrast]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'no' ? 'en' : 'no';
    i18n.changeLanguage(newLang);
  };

  const siteChatLang = i18n.language === 'no' ? 'no' : 'en';

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setMessages((prev) => {
      const next = appendConversation(prev, text, replyCount, siteChatLang);
      setReplyCount(next.nextReplyCount);
      return next.nextMessages;
    });
    setChatInput('');
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.weddings'), path: '/weddings' },
    { name: t('nav.corporate'), path: '/corporate' },
    { name: t('nav.private'), path: '/packages' },
    { name: t('nav.facilities'), path: '/facilities' },
    { name: t('nav.gallery'), path: '/gallery' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 rounded-sm md:gap-3"
        >
          <img
            src="/logo.png"
            alt=""
            width={120}
            height={120}
            className="h-11 w-auto shrink-0 object-contain object-left md:h-[3.25rem]"
            decoding="async"
          />
          <span className="flex min-w-0 flex-col items-start justify-center leading-none">
            <span className="font-serif text-lg font-bold tracking-tight text-brand-900 md:text-xl">
              {t('branding.navLine1')}
            </span>
            <span className="mt-0.5 font-serif text-[10px] font-medium tracking-wide text-brand-600 md:text-[11px]">
              {t('branding.navLine2')}
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "text-[13px] uppercase tracking-[0.2em] transition-all duration-300 relative py-2",
                location.pathname === link.path 
                  ? "text-brand-900 font-bold" 
                  : "text-brand-700 hover:text-brand-900 font-medium"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-800"
                />
              )}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLanguage}
            className="ml-auto flex items-center space-x-2 text-brand-700 hover:text-brand-900 transition-colors"
          >
            <Globe size={16} />
            <span className="text-[11px] font-bold uppercase tracking-widest">{i18n.language}</span>
          </button>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-900 text-white px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('hero.bookNow')}
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center space-x-6">
          <button onClick={toggleLanguage} className="text-brand-700 hover:text-brand-900 transition-colors">
            <Globe size={22} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-brand-900 p-2 -mr-2">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-brand-100 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-xl font-serif transition-colors",
                    location.pathname === link.path ? "text-brand-900 font-bold" : "text-brand-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-brand-900 text-white px-8 py-4 rounded-full text-center text-xs uppercase tracking-[0.3em] font-bold shadow-lg"
              >
                {t('hero.bookNow')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
      <button
        type="button"
        aria-label={chatOpen ? t('chat.closeAssistant') : t('chat.openAssistant')}
        title={t('chat.launcherTitle')}
        onClick={() => setChatOpen((v) => !v)}
        className={cn(
          'fixed bottom-5 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:-translate-y-0.5 md:bottom-6 md:right-6 md:h-14 md:w-14',
          chatFabOnDark
            ? 'border border-white/25 bg-white/95 text-brand-900 shadow-brand-900/15 hover:border-white/50 hover:bg-white hover:shadow-2xl'
            : 'bg-brand-900 text-white hover:bg-brand-800 hover:shadow-2xl',
        )}
      >
        {chatOpen ? <X size={22} aria-hidden /> : <MessageCircle size={22} aria-hidden />}
      </button>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="fixed bottom-20 right-4 z-[60] w-[min(92vw,24rem)] overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-2xl md:bottom-24 md:right-6"
          >
            <div className="border-b border-brand-100 bg-brand-900 px-4 py-3 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">{t('chat.panelEyebrow')}</p>
              <h3 className="mt-1 font-serif text-lg leading-tight">{t('chat.panelHeading')}</h3>
            </div>
            <div
              ref={chatMessagesRef}
              className="max-h-[19rem] space-y-3 overflow-y-auto overflow-x-hidden bg-brand-50/40 px-4 py-3"
            >
              {messages.map((msg, i) => (
                <div key={`${msg.role}-${i}`} className={cn('rounded-xl px-3 py-2 text-sm leading-relaxed', msg.role === 'assistant' ? 'bg-white text-brand-900 border border-brand-100' : 'bg-brand-900 text-white ml-8')}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="border-t border-brand-100 bg-white p-3">
              <div className="flex items-center gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendChat();
                  }}
                  placeholder={
                    detectLanguage(chatInput, siteChatLang) === 'no'
                      ? 'Skriv spørsmålet ditt …'
                      : 'Type your question…'
                  }
                  className="h-10 flex-1 rounded-full border border-brand-200 bg-white px-4 text-sm text-brand-900 outline-none focus:border-brand-400"
                />
                <button
                  type="button"
                  onClick={sendChat}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white transition hover:bg-brand-800"
                  aria-label={t('chat.sendMessage')}
                >
                  <SendHorizontal size={16} aria-hidden />
                </button>
              </div>
              <Link to="/contact" className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 hover:text-brand-900">
                {t('chat.directContact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const linkClass =
    'text-brand-300 transition-colors hover:text-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 rounded-sm';
  const labelClass = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-500';

  return (
    <footer className="border-t border-brand-800/90 bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <img
                src="/logo.png"
                alt="Rønningen selskapslokale"
                className="h-11 w-auto max-h-14 shrink-0 rounded-md border border-gray-400/50 object-contain object-left md:h-14"
                decoding="async"
              />
              <h2 className="font-serif font-semibold tracking-tight text-brand-100">
                <span className="block text-3xl md:text-[2.125rem] md:leading-tight">{t('branding.navLine1')}</span>
                <span className="mt-1 block text-lg font-medium leading-tight text-brand-300 md:text-xl">
                  {t('footer.brandSubtitle')}
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-brand-400">{t('footer.tagline')}</p>
            <div className="flex flex-wrap items-center gap-3 text-brand-500">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-colors hover:text-brand-100"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-colors hover:text-brand-100"
                aria-label="Facebook"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-colors hover:text-brand-100"
                aria-label="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://digilist.no"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center rounded-sm"
                aria-label="Digilist"
              >
                <svg
                  viewBox="0 0 76 18"
                  className="h-5 w-[4.75rem] text-brand-500 transition-colors group-hover:text-brand-100"
                  fill="currentColor"
                  aria-hidden
                >
                  <text
                    x="0"
                    y="13.5"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontSize="12.5"
                    fontWeight="600"
                    letterSpacing="-0.02em"
                  >
                    Digilist
                  </text>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className={labelClass}>{t('footer.contact')}</p>
            <ul className="space-y-2.5 text-sm text-brand-300">
              <li>
                <a href="tel:+4796665001" className={linkClass}>
                  <span className="inline-flex items-center gap-2.5">
                    <Phone size={15} className="shrink-0 text-brand-500" aria-hidden />
                    +47 96 66 50 01
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:r.selskapslokale@gmail.com" className={linkClass}>
                  <span className="inline-flex items-center gap-2.5">
                    <Mail size={15} className="shrink-0 text-brand-500" aria-hidden />
                    r.selskapslokale@gmail.com
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-0.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-500" aria-hidden />
                <span>Baneveien 290, 3410 SYLLING</span>
              </li>
            </ul>
          </div>

          <div>
            <p className={labelClass}>{t('footer.quickLinks')}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/weddings" className={linkClass}>
                  {t('nav.weddings')}
                </Link>
              </li>
              <li>
                <Link to="/corporate" className={linkClass}>
                  {t('nav.corporate')}
                </Link>
              </li>
              <li>
                <Link to="/packages" className={linkClass}>
                  {t('nav.private')}
                </Link>
              </li>
              <li>
                <Link to="/facilities" className={linkClass}>
                  {t('nav.facilities')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className={linkClass}>
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-brand-800 pt-8 text-xs text-brand-500 md:flex-row md:items-center md:justify-between">
          <p className="m-0 text-center md:text-left">
            © {year} Rønningen Selskapslokale. {t('footer.rights')}.
          </p>
          <p className="m-0 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-brand-500 md:justify-end md:text-right">
            <img
              src="/partners/xala-logo.png"
              alt=""
              decoding="async"
              aria-hidden
              className="h-6 w-auto shrink-0 mix-blend-lighten md:h-7"
            />
            <span>{t('footer.techPartnerLead')}</span>{' '}
            <a
              href="https://xala.no"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-400 no-underline transition-colors hover:text-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 rounded-sm"
            >
              {t('footer.techPartnerName')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/weddings" element={<WeddingsPage />} />
              <Route path="/corporate" element={<CorporatePage />} />
              <Route path="/packages" element={<PrivatePage />} />
              <Route path="/private" element={<Navigate to="/packages" replace />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/inquiry" element={<InquiryPage />} />
              <Route path="/admin/*" element={<AdminPanel />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}
