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
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import type React from 'react';
import './lib/i18n';
import { Toaster } from 'sonner';

import { AppNavigation } from './components/AppNavigation';
import { HomePartnerCard } from './components/HomePartnerCard';
import { AdminPanel } from './components/AdminPanel';
import { HeroScrollHint } from './components/HeroScrollHint';
import {
  GalleryLightbox,
  useGalleryLightboxState,
  type GalleryLightboxSlide,
} from './components/InspirationGalleryLightbox';
import { FACILITY_PRICING_HEADING_ID } from './components/pricing/FacilityPricingBlock';
import { BOOKING_URL } from './lib/booking';
import { VENUE_CONTACT_EMAIL } from './lib/contactEmail';
import { homeInspirationGallerySlides, inspirationSlideFileNumber } from './lib/inspirationGallery';
import { cn } from './lib/utils';
import { fireHomeHeroConfetti } from './lib/heroConfetti';
import { ROUTES } from './lib/routes';
import { FACILITIES_PAGE_ENABLED } from './lib/facilitiesPageAvailability';
import { HOME_PARTNER_KEYS } from './lib/homePartners';
import {
  SECTION_H2_CLASS,
  SECTION_H2_ON_DARK_CLASS,
  SECTION_H3_CLASS,
  SECTION_LEAD_CLASS,
} from './lib/typography';

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
    <div className="ui-page-shell">
      <section className="section-viewport flex min-h-[50vh] items-center justify-center px-4 py-20">
        <p className="text-center text-brand-600 dark:text-brand-400">{t('common.redirectingBooking')}</p>
      </section>
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
    img: '/concept-private-balloon-hexagon.png',
  },
  facilities: {
    path: `${ROUTES.priser}#${FACILITY_PRICING_HEADING_ID}`,
    img: '/facilities-hero-shuffleboard.png',
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
  'soundLight',
]);

const HOME_SERVICE_IMAGES: Record<HomeServiceKey, string> = {
  soundLight: '/home-service-sound-light.png',
  catering:
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  barDancefloor: '/home-service-bar-dancefloor.png',
  coordination: '/home-service-oppdekking.png',
  decoration: '/facilities-hero-shuffleboard.png',
  overnight: '/facilities-childcare-playroom.png',
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const heroConfettiCooldownRef = useRef(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const homeGalleryLightboxSlides = useMemo<GalleryLightboxSlide[]>(
    () =>
      homeInspirationGallerySlides.map((s) => ({
        src: s.src,
        alt: t('inspirationGallery.slideAlt', { n: inspirationSlideFileNumber(s.key) }),
      })),
    [t, i18n.language],
  );
  const { lightboxIndex, setLightboxIndex, closeLightbox, lightboxShowPrev, lightboxShowNext } =
    useGalleryLightboxState(homeInspirationGallerySlides.length);

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

  const handleHeroConfettiPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const now = Date.now();
    if (now - heroConfettiCooldownRef.current < 1400) return;
    heroConfettiCooldownRef.current = now;
    fireHomeHeroConfetti({ clientX: e.clientX, clientY: e.clientY });
  };

  return (
    <div className="flex flex-col">
      {/* Hero — full-bleed background image + cream wash for readable type */}
      <section className="home-hero section-viewport section-viewport-hero relative flex min-h-0 flex-col overflow-hidden border-b border-brand-800 bg-brand-950 text-white">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/hero-home-daylight-entrance.png"
            alt={t('homeHero.heroImageLightAlt')}
            width={1024}
            height={682}
            className="h-full w-full object-cover dark:hidden"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <img
            src="/hero-home-evening-lights.png"
            alt={t('homeHero.heroImageAlt')}
            width={1024}
            height={682}
            className="hidden h-full w-full object-cover dark:block"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/16 to-black/30 dark:from-black/24 dark:via-black/18 dark:to-black/32"
            aria-hidden
          />
        </div>
        <div className="section-viewport-scroll site-container relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden px-4 py-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            className="flex min-h-[min(38vh,15rem)] w-full max-w-6xl cursor-default flex-col items-center justify-center"
            onPointerEnter={handleHeroConfettiPointerEnter}
          >
            <h1 className="flex max-w-[min(98vw,54rem)] flex-col items-center gap-2.5 px-4 text-center sm:gap-3 md:gap-3.5">
              <span className="font-sans text-[1.0625rem] font-semibold tracking-[0.12em] text-white sm:text-lg md:text-xl">
                {t('homeHero.welcomeLine')}
              </span>
              <span className="font-serif whitespace-nowrap text-[clamp(1.45rem,calc(1.05rem+3.4vw),4.35rem)] font-normal italic leading-[1.05] text-white sm:text-[clamp(1.6rem,calc(0.95rem+3.1vw),4.45rem)] md:text-[clamp(1.85rem,calc(0.85rem+2.7vw),4.65rem)]">
                {t('homeHero.venueName')}
              </span>
            </h1>
          </motion.div>
        </div>

        <HeroScrollHint targetId="konsepter" ariaLabel={t('homeHero.scrollHintAria')} />
      </section>

      <section
        id="konsepter"
        aria-labelledby="konsepter-heading"
        className="ui-section-wash section-viewport scroll-mt-24 relative overflow-hidden"
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
          <div className="site-container flex w-full flex-col py-16 sm:py-20 md:py-24">
            <h2 id="konsepter-heading" className="sr-only">
              {t('homeConcepts.heading')}
            </h2>

            <div>
              <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 pl-0 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
                {HOME_CONCEPT_KEYS.map((key) => {
                  const { path, img } = HOME_CONCEPT_ROUTES[key];
                  const title = t(`homeConcepts.items.${key}.title`);
                  return (
                    <li key={key} className="min-w-0">
                      <Link
                        to={path}
                        className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl dark:focus-visible:ring-offset-brand-950"
                      >
                        <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[18rem] md:max-w-[19rem]">
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
                        </div>
                        <h3
                          className={cn(
                            SECTION_H3_CLASS,
                            'mt-7 max-w-[20rem] text-balance text-center transition-colors duration-300 group-hover:text-brand-800 sm:mt-8 dark:group-hover:text-brand-100',
                          )}
                        >
                          {title}
                        </h3>
                        <p className="mt-4 max-w-[24rem] text-balance text-[0.9375rem] leading-relaxed text-brand-900 sm:mt-5 sm:text-base md:text-[1.0625rem] md:leading-relaxed lg:text-lg lg:leading-relaxed dark:text-brand-100">
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
      <section className="section-viewport relative overflow-hidden bg-brand-900 text-white">
        <div className="section-viewport-scroll site-container relative z-10 py-14 sm:py-16 md:py-16">
          <header className="mb-7 w-full space-y-4 md:mb-8 md:space-y-5 lg:mb-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={SECTION_H2_ON_DARK_CLASS}
            >
              {t('homeServices.heading')}
            </motion.h2>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {HOME_SERVICE_KEYS.map((key, index) => {
              const title = t(`homeServices.items.${key}.title`);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="ds-media-card ds-media-card--dark"
                >
                  <img
                    src={HOME_SERVICE_IMAGES[key]}
                    alt={
                      HOME_SERVICE_IMAGE_ALT_KEYS.has(key)
                        ? t(`homeServices.items.${key}.imgAlt`)
                        : ''
                    }
                    referrerPolicy={
                      HOME_SERVICE_IMAGES[key].startsWith('http') ? 'no-referrer' : undefined
                    }
                  />
                  <div className="ds-media-card__scrim" aria-hidden />
                  <div className="ds-media-card__veil" aria-hidden />
                  <div className="ds-media-card__inner">
                    <h3 className="ds-media-card__title">{title}</h3>
                    <div className="ds-media-card__body">
                      <p className="ds-media-card__text">{t(`homeServices.items.${key}.description`)}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspirasjon og Galleri — blandet fra alle galleri-kategorier (ikke kun bryllup) */}
      <section
        id="inspirasjon-galleri"
        aria-labelledby="inspirasjon-galleri-heading"
        className="ui-section-solid-muted section-viewport relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-brand-100/20 blur-[150px] dark:bg-brand-400/10" aria-hidden />
        </div>

        <div className="section-viewport-scroll site-container relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 w-full"
          >
            <h2 id="inspirasjon-galleri-heading" className={SECTION_H2_CLASS}>
              {t('homeGallery.heading')}
            </h2>
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
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white dark:border-brand-500/40 dark:bg-brand-800/92 dark:text-brand-50 dark:hover:border-brand-400 dark:hover:bg-brand-700 dark:hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70 dark:border-brand-700 dark:bg-brand-900/55 dark:text-brand-600'
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
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white dark:border-brand-500/40 dark:bg-brand-800/92 dark:text-brand-50 dark:hover:border-brand-400 dark:hover:bg-brand-700 dark:hover:text-white'
                      : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70 dark:border-brand-700 dark:bg-brand-900/55 dark:text-brand-600'
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
              {homeInspirationGallerySlides.map((item, i) => {
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
                    className="group relative aspect-[6/7] min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%] dark:border-brand-600 dark:bg-brand-800"
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
              className="group inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 transition-all hover:border-brand-300 hover:shadow-md dark:border-brand-600 dark:bg-brand-800 dark:hover:border-brand-500 dark:hover:bg-brand-700"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-900 dark:text-brand-50">
                {t('homeGallery.ctaFullGallery')}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white transition-transform group-hover:translate-x-1 dark:bg-brand-100 dark:text-brand-900">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partnere — rutenett 3×2 (+ ev. siste rad); ingen horisontal marquee */}
      <section
        id="partnere"
        aria-labelledby="partnere-heading"
        className="ui-section-wash section-viewport scroll-mt-24 relative overflow-hidden border-t border-brand-200/80 dark:border-brand-800/90"
      >
        <div
          className="pointer-events-none absolute left-[6%] top-[10%] h-[min(44vw,26rem)] w-[min(44vw,26rem)] rounded-full bg-brand-300/20 blur-[90px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[6%] right-[4%] h-[min(36vw,22rem)] w-[min(36vw,22rem)] rounded-full bg-brand-500/12 blur-[75px]"
          aria-hidden
        />

        <div className="section-viewport-scroll site-container relative z-10 flex min-h-0 flex-col py-16 sm:py-20 md:py-24">
          <header className="w-full space-y-4 md:space-y-5">
            <h2 id="partnere-heading" className={SECTION_H2_CLASS}>
              {t('homePartners.heading')}
            </h2>
            <p className={SECTION_LEAD_CLASS}>{t('homePartners.intro')}</p>
          </header>

          <ul
            className="m-0 mt-10 grid list-none grid-cols-1 justify-items-center gap-6 p-0 sm:grid-cols-2 sm:gap-7 md:mt-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8"
            aria-label={t('homePartners.listAria')}
          >
            {HOME_PARTNER_KEYS.map((partnerId) => (
              <li key={partnerId} className="flex w-full justify-center">
                <HomePartnerCard partnerKey={partnerId} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GalleryLightbox
        slides={homeGalleryLightboxSlides}
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
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.querySelectorAll('.section-viewport-scroll').forEach((el) => {
      (el as HTMLElement).scrollTop = 0;
    });
  }, [pathname, hash]);

  return null;
};

const FOOTER_ADDRESS_LINE = 'Baneveien 290, 3410 SYLLING';
const footerMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FOOTER_ADDRESS_LINE)}`;

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const linkClass =
    'text-brand-300 transition-colors hover:text-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 rounded-sm';
  const labelClass = 'mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-500';

  return (
    <footer className="site-footer-silk border-t border-brand-800/90 bg-brand-900 pt-4 text-brand-100">
      <div className="site-container pb-2 pt-1 md:pb-[8px]">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-12">
          <div className="min-w-0 justify-self-center text-center lg:justify-self-start lg:text-left">
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5 lg:items-start">
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
            </div>
          </div>

          <div className="flex w-full max-w-full min-w-0 flex-col items-center justify-self-center text-center sm:items-start sm:text-left">
            <div className="mx-auto w-fit text-left sm:mx-0">
              <p className={labelClass}>{t('footer.contact')}</p>
              <ul className="m-0 flex list-none flex-col items-start justify-start gap-3 p-0 text-sm text-brand-300 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-5 sm:gap-y-2">
              <li className="shrink-0">
                <a
                  href="tel:+4796665001"
                  className={cn(linkClass, 'inline-flex items-center gap-2.5')}
                >
                  <span
                    className="flex h-[1.35em] w-5 shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    <Phone size={15} className="text-brand-500" />
                  </span>
                  <span>+47 96 66 50 01</span>
                </a>
              </li>
              <li className="min-w-0 shrink-0">
                <a
                  href={`mailto:${VENUE_CONTACT_EMAIL}`}
                  className={cn(linkClass, 'inline-flex max-w-full items-center gap-2.5')}
                >
                  <span
                    className="flex h-[1.35em] w-5 shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    <Mail size={15} className="text-brand-500" />
                  </span>
                  <span className="min-w-0 break-all sm:break-normal">{VENUE_CONTACT_EMAIL}</span>
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href={footerMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(linkClass, 'inline-flex items-center gap-2.5')}
                  aria-label={t('footer.openInMapsAria', { address: FOOTER_ADDRESS_LINE })}
                >
                  <span
                    className="flex h-[1.35em] w-5 shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    <MapPin size={15} className="text-brand-500" />
                  </span>
                  <span className="text-left">{FOOTER_ADDRESS_LINE}</span>
                </a>
              </li>
              </ul>
            </div>
          </div>

          <nav
            className="flex shrink-0 flex-row items-center justify-center gap-3 text-brand-500 lg:justify-self-end lg:justify-end"
            aria-label={t('footer.iconNavAriaLabel')}
          >
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm transition-colors hover:text-[#E1306C]"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm transition-colors hover:text-[#1877F2]"
              aria-label="Facebook"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm transition-colors hover:text-[#25F4EE]"
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
          </nav>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 border-t border-brand-800 pt-3 text-xs text-brand-500 md:flex-row md:items-center md:justify-between">
          <p className="m-0 text-center md:text-left">
            © {year} Rønningen Selskapslokale. {t('footer.rights')}.
          </p>
          <p className="m-0 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-brand-500 md:justify-end md:text-right">
            <span>{t('footer.developedBy')}</span>
            <a
              href="https://xala.no"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 rounded-sm opacity-90 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
              aria-label={t('footer.xalaLinkAria')}
            >
              <img
                src="/partners/xala-logo.png"
                alt=""
                decoding="async"
                className="h-6 w-auto mix-blend-lighten md:h-7"
              />
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
                {FACILITIES_PAGE_ENABLED ? (
                  <Route path={ROUTES.fasiliteter} element={<FacilitiesPage />} />
                ) : (
                  <Route path={ROUTES.fasiliteter} element={<Navigate to={ROUTES.home} replace />} />
                )}
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
                <Route
                  path="/facilities"
                  element={
                    <Navigate to={FACILITIES_PAGE_ENABLED ? ROUTES.fasiliteter : ROUTES.home} replace />
                  }
                />
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
