/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './lib/i18n';
import { Toaster } from 'sonner';

import { AppNavigation } from './components/AppNavigation';
import { AdminPanel } from './components/AdminPanel';
import { HeroScrollHint } from './components/HeroScrollHint';
import {
  InspirationGalleryLightbox,
  useInspirationGalleryLightboxState,
} from './components/InspirationGalleryLightbox';
import { BOOKING_URL } from './lib/booking';
import { inspirationGallerySlides, inspirationSlideFileNumber } from './lib/inspirationGallery';
import { cn } from './lib/utils';
import { ROUTES } from './lib/routes';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from './lib/typography';

import { ContactPage } from './pages/ContactPage';

import { GalleryPage } from './pages/GalleryPage';

import { FAQPage } from './pages/FAQPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { WeddingsPage } from './pages/WeddingsPage';
import { CorporatePage } from './pages/CorporatePage';
import { PrivatePage } from './pages/PrivatePage';
import { PricesPage } from './pages/PricesPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';

function LegacyBlogPostRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`${ROUTES.blogg}/${slug ?? ''}`} replace />;
}

function LegacyPathRedirect({ to }: { to: string }) {
  const { hash } = useLocation();
  return <Navigate to={`${to}${hash}`} replace />;
}

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

const HOME_CONCEPT_IMAGE_ALT_KEYS = new Set<HomeConceptKey>([
  'weddings',
  'corporate',
  'private',
  'facilities',
]);

const HOME_CONCEPT_ROUTES: Record<HomeConceptKey, { path: string; img: string }> = {
  weddings: {
    path: ROUTES.bryllup,
    img: '/concept-weddings-cake.png',
  },
  corporate: {
    path: ROUTES.bedrift,
    img: '/concept-corporate-outdoor.png',
  },
  private: {
    path: ROUTES.selskap,
    img: '/concept-private-dessert-table.png',
  },
  facilities: {
    path: ROUTES.fasiliteter,
    img: '/concept-facilities-bar.png',
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

const HOME_SERVICE_IMAGE_ALT_KEYS = new Set<HomeServiceKey>([
  'barDancefloor',
  'coordination',
  'decoration',
  'overnight',
]);

const HOME_SERVICE_IMAGES: Record<HomeServiceKey, string> = {
  soundLight:
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
  catering:
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  barDancefloor: '/home-service-bar-dancefloor.png',
  coordination: '/home-service-coordination.png',
  decoration: '/home-service-decoration.png',
  overnight: '/home-service-overnight.png',
};

const PARTNER_KEYS = [
  'cateringKitchen',
  'flowersDecor',
  'photoVideo',
  'soundLight',
  'barService',
  'digilist',
  'xala',
] as const;

type PartnerKey = (typeof PARTNER_KEYS)[number];

const PARTNER_LINKS: Record<PartnerKey, string | null> = {
  cateringKitchen: 'https://svensefjoset.no/',
  flowersDecor: 'https://osloeventshop.no/',
  photoVideo: 'https://villaboligstyling.no/',
  soundLight: 'https://festpartner.no/',
  barService: 'https://digilist.no/',
  digilist: 'https://xala.no/',
  xala: null,
};

/** Single-letter marks for partner tiles (stable across locales). */
const PARTNER_INITIALS: Record<PartnerKey, string> = {
  cateringKitchen: 'S',
  flowersDecor: 'O',
  photoVideo: 'V',
  soundLight: 'F',
  barService: 'D',
  digilist: 'X',
  xala: 'B',
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
            src="/hero-wedding-venue-night.png"
            alt={t('homeHero.heroImageAlt')}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/35 to-black/45"
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
              className="max-w-5xl text-balance font-serif leading-[0.9] tracking-tighter text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.32)]"
            >
              <span className="block text-2xl font-normal tracking-wide text-white/90 sm:text-3xl md:text-4xl lg:text-5xl">
                {t('homeHero.welcomeLine')}
              </span>
              <span className="mt-2 block font-serif italic text-4xl text-brand-200 sm:mt-3 sm:text-5xl md:text-6xl lg:text-7xl">
                {t('homeHero.venueName')}
              </span>
            </motion.h1>
            <p className="mx-auto max-w-2xl text-xl font-light italic opacity-90 md:text-3xl [text-shadow:0_1px_20px_rgba(0,0,0,0.28)]">
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
                                HOME_CONCEPT_IMAGE_ALT_KEYS.has(key)
                                  ? t(`homeConcepts.items.${key}.imgAlt`)
                                  : ''
                              }
                              width={
                                key === 'weddings'
                                  ? 682
                                  : key === 'private'
                                    ? 768
                                    : key === 'facilities'
                                      ? 1024
                                      : undefined
                              }
                              height={
                                key === 'weddings' || key === 'private'
                                  ? 1024
                                  : key === 'facilities'
                                    ? 682
                                    : undefined
                              }
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              referrerPolicy={img.startsWith('http') ? 'no-referrer' : undefined}
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
                    alt={
                      HOME_SERVICE_IMAGE_ALT_KEYS.has(key)
                        ? t(`homeServices.items.${key}.imgAlt`)
                        : ''
                    }
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105"
                    referrerPolicy={
                      HOME_SERVICE_IMAGES[key].startsWith('http') ? 'no-referrer' : undefined
                    }
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
              to={ROUTES.galleri}
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

      {/* Partnere — curved arc + organic stagger (no rigid grid) */}
      <section
        id="partnere"
        aria-labelledby="partnere-heading"
        className="section-viewport relative overflow-hidden border-t border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200/60 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[20%] top-1/3 h-[min(70vw,28rem)] w-[min(70vw,28rem)] rounded-[44%_56%_52%_48%/48%_52%_46%_54%] bg-brand-300/12 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[15%] bottom-[15%] h-[min(55vw,20rem)] w-[min(55vw,22rem)] rounded-[56%_44%_48%_52%/52%_48%_54%_46%] bg-brand-400/10 blur-[90px]"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-20 md:px-20 md:py-28">
          <div className="flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-16 xl:gap-20">
            <header className="text-center lg:col-span-5 xl:col-span-4 lg:text-left">
              <h2 id="partnere-heading" className={cn(SECTION_H2_CLASS, 'mb-4 md:mb-5')}>
                {t('homePartners.heading')}
              </h2>
              <p className="mx-auto max-w-xl text-base leading-[1.65] text-brand-600 md:text-lg md:leading-relaxed lg:mx-0 lg:max-w-none">
                {t('homePartners.intro')}
              </p>
            </header>

            <div className="relative lg:col-span-7 xl:col-span-8">
              <div
                className="pointer-events-none absolute left-1/2 top-[8%] hidden h-[min(48vw,380px)] w-[min(100%,540px)] -translate-x-1/2 rounded-[42%_58%_48%_52%/55%_45%_50%_50%] bg-gradient-to-b from-brand-200/30 via-brand-100/15 to-transparent opacity-80 blur-2xl lg:block"
                aria-hidden
              />
              <ul
                className={cn(
                  'relative m-0 list-none p-0',
                  'flex flex-wrap justify-center gap-x-7 gap-y-12 px-1 py-4 sm:gap-x-10 sm:gap-y-14',
                  'lg:block lg:min-h-[min(42vw,300px)] lg:w-full lg:max-w-[52rem] lg:px-0 xl:min-h-[min(38vw,320px)] xl:max-w-[56rem]',
                )}
                aria-label={t('homePartners.listAria')}
              >
                {PARTNER_KEYS.map((key, i) => {
                  const href = PARTNER_LINKS[key];
                  const linkLabel = t('homePartners.websiteLabel');
                  const name = t(`homePartners.items.${key}.name`);
                  const desc = t(`homePartners.items.${key}.desc`);
                  const srId = `partner-sr-${key}`;
                  const n = PARTNER_KEYS.length;
                  const spread = 152;
                  const angleDeg = -spread / 2 + (spread / (n - 1)) * i;
                  const waveY =
                    i % 3 === 0
                      ? 'max-lg:translate-y-1'
                      : i % 3 === 1
                        ? 'max-lg:-translate-y-4 max-lg:sm:translate-y-2'
                        : 'max-lg:translate-y-5 max-lg:sm:-translate-y-1';
                  const waveTilt = i % 2 === 0 ? 'max-lg:-rotate-[3deg]' : 'max-lg:rotate-[3.5deg]';

                  return (
                    <li
                      key={key}
                      className={cn(
                        'group relative z-10 flex min-h-0 justify-center hover:z-30',
                        waveY,
                        waveTilt,
                        'lg:absolute lg:bottom-[11%] lg:left-1/2 lg:w-0 lg:-translate-x-1/2 lg:translate-y-0 lg:rotate-0',
                      )}
                      style={
                        {
                          '--partner-arc-a': `${angleDeg}deg`,
                          '--partner-arc-r': 'clamp(92px, 20vw, 188px)',
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="relative flex flex-col items-center lg:[transform-origin:center_bottom] lg:[transform:rotate(var(--partner-arc-a))_translateY(calc(-1*var(--partner-arc-r)))_rotate(calc(-1*var(--partner-arc-a)))]"
                      >
                        <span id={srId} className="sr-only">
                          {desc}
                          {href
                            ? ` ${linkLabel}: ${href}`
                            : ` ${t('homePartners.noWebsite')}`}
                        </span>
                        <button
                          type="button"
                          className={cn(
                            'relative z-10 flex h-[4rem] w-[4rem] shrink-0 items-center justify-center rounded-2xl border border-brand-300/80 sm:h-[4.25rem] sm:w-[4.25rem]',
                            'bg-linear-to-br from-white via-brand-50/90 to-[#f0e8d8] font-serif text-xl font-semibold tabular-nums text-brand-900',
                            'shadow-[0_8px_20px_-12px_rgba(33,24,22,0.4),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-brand-900/[0.06]',
                            'transition-transform duration-300 outline-none hover:scale-105 group-hover:scale-105 sm:rounded-[1.35rem]',
                            'focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
                            'md:h-[4.35rem] md:w-[4.35rem] md:text-[1.45rem]',
                          )}
                          aria-describedby={srId}
                          aria-label={name}
                        >
                          {PARTNER_INITIALS[key]}
                        </button>
                        <div className="absolute left-1/2 top-full z-20 -mt-2 w-[min(100vw-2rem,17.5rem)] -translate-x-1/2 pt-2">
                          <div
                            className={cn(
                              'pointer-events-none rounded-2xl border border-brand-200/90 bg-white p-4 text-center shadow-[0_12px_28px_-16px_rgba(33,24,22,0.4)]',
                              'opacity-0 transition-[opacity,transform] duration-200 translate-y-1',
                              'group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100',
                            )}
                          >
                            <p className="text-balance font-serif text-[0.99rem] font-semibold leading-snug tracking-tight text-brand-950 md:text-[1.05rem]">
                              {name}
                            </p>
                            <p className="mt-2 text-[11px] leading-relaxed text-brand-700 md:text-[12px]">
                              {desc}
                            </p>
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-900 underline decoration-brand-400/70 underline-offset-4 transition hover:text-brand-950"
                              >
                                {linkLabel}
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                              </a>
                            ) : (
                              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-500">
                                {t('homePartners.noWebsite')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
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
              <h2 className="font-serif font-semibold tracking-tight text-brand-100 text-center">
                <span className="block text-3xl md:text-[2.125rem] md:leading-tight">{t('branding.navLine1')}</span>
                <span className="mt-1 block text-lg font-medium leading-tight uppercase text-brand-300 md:text-xl">
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
                <Link to={ROUTES.bryllup} className={linkClass}>
                  {t('nav.weddings')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.bedrift} className={linkClass}>
                  {t('nav.corporate')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.selskap} className={linkClass}>
                  {t('nav.private')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.fasiliteter} className={linkClass}>
                  {t('nav.facilities')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.priser} className={linkClass}>
                  {t('nav.prices')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.galleri} className={linkClass}>
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.blogg} className={linkClass}>
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.kontakt} className={linkClass}>
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
      <div className="flex min-h-screen flex-col">
        <AppNavigation />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <main className="flex-grow pt-24">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path={ROUTES.bryllup} element={<WeddingsPage />} />
                <Route path={ROUTES.bedrift} element={<CorporatePage />} />
                <Route path={ROUTES.selskap} element={<PrivatePage />} />
                <Route path={ROUTES.priser} element={<PricesPage />} />
                <Route path={ROUTES.fasiliteter} element={<FacilitiesPage />} />
                <Route path={ROUTES.galleri} element={<GalleryPage />} />
                <Route path={`${ROUTES.blogg}/:slug`} element={<BlogPostPage />} />
                <Route path={ROUTES.blogg} element={<BlogPage />} />
                <Route path={ROUTES.ofteStilteSporsmal} element={<FAQPage />} />
                <Route path={ROUTES.anmeldelser} element={<TestimonialsPage />} />
                <Route path={ROUTES.kontakt} element={<ContactPage />} />
                <Route path={ROUTES.henvendelse} element={<InquiryPage />} />
                <Route path="/admin/*" element={<AdminPanel />} />
                {/* Legacy English URLs → Norwegian */}
                <Route path="/weddings" element={<Navigate to={ROUTES.bryllup} replace />} />
                <Route path="/corporate" element={<Navigate to={ROUTES.bedrift} replace />} />
                <Route path="/packages" element={<LegacyPathRedirect to={ROUTES.selskap} />} />
                <Route path="/private" element={<LegacyPathRedirect to={ROUTES.selskap} />} />
                <Route path="/prices" element={<Navigate to={ROUTES.priser} replace />} />
                <Route path="/facilities" element={<Navigate to={ROUTES.fasiliteter} replace />} />
                <Route path="/gallery" element={<Navigate to={ROUTES.galleri} replace />} />
                <Route path="/blog/:slug" element={<LegacyBlogPostRedirect />} />
                <Route path="/blog" element={<Navigate to={ROUTES.blogg} replace />} />
                <Route path="/faq" element={<Navigate to={ROUTES.ofteStilteSporsmal} replace />} />
                <Route path="/testimonials" element={<Navigate to={ROUTES.anmeldelser} replace />} />
                <Route path="/contact" element={<Navigate to={ROUTES.kontakt} replace />} />
                <Route path="/inquiry" element={<Navigate to={ROUTES.henvendelse} replace />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" duration={3200} />
      </div>
    </Router>
  );
}
