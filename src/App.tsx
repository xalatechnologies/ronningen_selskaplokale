/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Phone, Mail, MapPin, Instagram, Facebook, ChevronDown, ChevronRight, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './lib/i18n';
import { Toaster } from 'sonner';

import { AdminPanel } from './components/AdminPanel';
import { BOOKING_URL } from './lib/booking';
import { cn } from './lib/utils';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from './lib/typography';

import { ContactPage } from './pages/ContactPage';

import { GalleryPage } from './pages/GalleryPage';

import { FAQPage } from './pages/FAQPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { WeddingsPage } from './pages/WeddingsPage';
import { CorporatePage } from './pages/CorporatePage';
import { PrivatePage } from './pages/PrivatePage';

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

const HOME_KONSEPT_ITEMS = [
  {
    title: 'Bryllup',
    description: 'Vielse, fest og mingling på ett sted — vi hjelper dere med helhetsplan fra ønskeliste til siste dans.',
    path: '/weddings',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Bedrift',
    description: 'Møter, middager og lanseringer med profesjonelt vertskap, teknisk utstyr og fleksible romløsninger.',
    path: '/corporate',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Private selskap',
    description: 'Jubileer, konfirmasjon og familieselskap med plass til barn og voksne — rolige, hjemlige omgivelser på gården.',
    path: '/packages',
    img: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Julebord',
    description: 'Tradisjonsrik julemiddag med meny tilpasset gruppen — perfekt for kollegaer eller vennegjengen.',
    path: '/packages',
    img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Konferanse',
    description: 'Dagseminar eller heldagsmøte med pauserom, lyd, projeksjon og bevertning som holder dagen i flyt.',
    path: '/corporate',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Sommerfest',
    description: 'Ute og inne på gården — grill, mingling og lange kvelder når lyset og stemningen er på sitt beste.',
    path: '/packages',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
  },
] as const;

const PARTNER_CATEGORIES = [
  'Catering & kjøkken',
  'Blomster & dekor',
  'Foto & film',
  'Lyd & lys',
  'Bar & servering',
  'Koordinering',
  'Digilist',
  'Xala technologies',
  'CommitCare',
] as const;

const Home = () => {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement>(null);

  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);

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
      {/* Hero Section - Recipe 2 Inspired */}
      <section className="section-viewport section-viewport-hero relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Venue Hero" 
            className="w-full h-full object-cover brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="section-viewport-scroll relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-4 py-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter">
              Velkommen til Rønningen selskapslokale
            </h1>
            <p className="text-xl md:text-3xl font-light max-w-2xl mx-auto opacity-90 italic">
              Alt du trenger for en vellykket feiring – på ett sted
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white animate-bounce opacity-50">
          <ChevronDown size={32} />
        </div>
      </section>

      <section
        id="konsepter"
        aria-labelledby="konsepter-heading"
        className="section-viewport relative overflow-hidden bg-gradient-to-b from-white to-brand-50/50"
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
            <header className="mx-auto max-w-2xl space-y-4 text-center md:space-y-5">
              <h2 id="konsepter-heading" className={SECTION_H2_CLASS}>
                Våre konsepter
              </h2>
              <p className="text-base leading-relaxed text-brand-600 md:text-lg md:leading-relaxed">
                Her starter de beste feiringene - omgitt av natur
              </p>
            </header>

            <div className="mt-10 md:mt-12">
              <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 pl-0 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
                {HOME_KONSEPT_ITEMS.map((item) => (
                  <li key={item.title} className="min-w-0">
                    <Link
                      to={item.path}
                      className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
                    >
                      <div className="relative mx-auto aspect-square w-full max-w-[15rem] overflow-hidden rounded-full border-[3px] border-white/90 shadow-[0_20px_50px_-12px_rgba(33,24,22,0.35)] ring-1 ring-brand-900/10 transition-[transform,box-shadow] duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_28px_60px_-8px_rgba(33,24,22,0.42)] sm:max-w-[16rem] md:max-w-[17.5rem]">
                        <img
                          src={item.img}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent"
                          aria-hidden
                        />
                        <h3 className="absolute inset-x-0 bottom-0 px-3 pb-4 pt-16 text-center font-display text-sm font-normal uppercase leading-tight tracking-[0.07em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.95),0_1px_3px_rgba(0,0,0,0.9)] sm:pb-5 sm:text-base md:pt-20 md:text-lg">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-5 max-w-[24rem] text-balance text-[0.9375rem] font-medium leading-[1.65] text-brand-900 md:text-base md:leading-relaxed sm:mt-6">
                        {item.description}
                      </p>
                      <span className="mt-4 inline-flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-brand-900">
                        Les mer
                        <ChevronRight size={18} strokeWidth={2.25} className="text-brand-700" aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}
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
              Eksklusive Opplevelser
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {[
              {
                title: "Catering",
                description: "Vårt samarbeid med anerkjente kokker sikrer uovertruffen kvalitet og skreddersøm for hvert arrangement. Du får tilgang til kulinarisk ekspertise som bringer din visjon til live.",
                img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Event management",
                description: "Fra konseptutvikling til gjennomføring, vi håndterer alle aspekter av ditt arrangement. Våre erfarne prosjektledere sørger for at alt går knirkefritt.",
                img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Production",
                description: "Vi leverer toppmoderne tekniske løsninger innen lyd, lys og bilde. Vårt produksjonsteam skaper visuelt slående miljøer som forsterker budskapet.",
                img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Dekorasjon",
                description: "Våre stylister forvandler ethvert lokale til en unik opplevelse. Vi kombinerer blomster, møbler og dekor for å skape en atmosfære som reflekterer ditt merke.",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Bar & Servering",
                description: "Profesjonell service er ryggraden i ethvert vellykket arrangement. Våre bartendere og servitører er håndplukket for sin kompetanse og evne til å yte det lille ekstra.",
                img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Logistikk",
                description: "Vi tar oss av den komplekse logistikken bak kulissene. Fra transport og lagring til rigging og rydding, sørger vi for en effektiv og sømløs prosess.",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-white/28 transition-all duration-500 hover:border-white/45"
              >
                {/* Background Image */}
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Default Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />
                
                {/* Hover Overlay (Teal/Blue Gradient) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Content Container */}
                <div className="absolute inset-0 flex h-full min-h-0 flex-col p-5 sm:p-6 md:p-7 lg:p-6">
                  {/* Title - Repositions on hover */}
                  <h3 className="mt-auto shrink-0 font-display text-2xl uppercase tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:mt-0 sm:text-3xl md:text-[1.85rem] lg:text-2xl lg:leading-tight xl:text-[1.75rem]">
                    {service.title}
                  </h3>
                  
                  {/* Description - Appears on hover */}
                  <div className="mt-3 flex-grow opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                    <p className="line-clamp-5 text-sm font-normal leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] sm:text-base md:text-[1.0625rem] md:leading-relaxed lg:line-clamp-4">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Read More - Appears on hover at bottom */}
                  <div className="mt-auto flex items-center gap-3 opacity-0 transition-opacity delay-200 duration-500 group-hover:opacity-100 group/btn">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-black/10 backdrop-blur-[2px] transition-colors group-hover/btn:bg-white group-hover/btn:text-[#4F9DA6] sm:h-11 sm:w-11">
                      <ArrowRight size={20} strokeWidth={2.25} />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] sm:text-base">
                      Les mer
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Galleri
            </h2>
            <p className="text-lg leading-relaxed text-brand-600 md:text-xl">
              Et kuratert utvalg fra bryllup hos oss. Bla gjennom og se hvordan ulike uttrykk, farger og stemninger kan tilpasses deres dag.
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
                  aria-label="Forrige bilde"
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
                  aria-label="Neste bilde"
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
              {[
                {
                  src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
                  alt: 'Bryllup i låven — fest og stemning',
                },
                {
                  src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
                  alt: 'Bryllupsmiddag og servering',
                },
                {
                  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
                  alt: 'Bryllupsdekor og bord',
                },
                {
                  src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
                  alt: 'Utendørs bryllup og natur',
                },
                {
                  src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
                  alt: 'Bryllup i hagen',
                },
                {
                  src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200',
                  alt: 'Detaljer fra bryllupsdagen',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.alt}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="group relative aspect-[6/7] min-w-[88%] overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm snap-center transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/75 via-brand-900/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-85" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <div className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/85">
                      <Sparkles size={12} aria-hidden />
                      Galleri
                    </div>
                    <p className="font-serif text-lg text-white md:text-xl">Bryllupsinspirasjon {i + 1}</p>
                  </div>
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
              to="/gallery"
              className="group inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 transition-all hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-900">Se hele galleriet</span>
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
                Våre partnere
              </h2>
              <p className="mx-auto max-w-xl text-base leading-[1.65] text-brand-600 md:text-lg md:leading-relaxed lg:mx-0 lg:max-w-none">
                Vi jobber med anbefalte leverandører innen mat, dekor, foto og mer — slik at dere får ett koordinert team rundt arrangementet på Rønningen.
              </p>
            </header>

            <ul
              className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4 lg:col-span-7 xl:col-span-8 xl:grid-cols-3 xl:gap-4"
              aria-label="Partnerkategorier"
            >
              {PARTNER_CATEGORIES.map((label) => (
                <li key={label}>
                  <div className="flex min-h-[4.25rem] items-center justify-center rounded-lg border border-brand-200/90 bg-white/90 px-4 py-3.5 text-center shadow-[0_1px_0_rgba(28,22,19,0.04)] backdrop-blur-[2px] md:min-h-[4.5rem] md:px-5">
                    <span className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-900 sm:text-sm">
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'no' ? 'en' : 'no';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.weddings'), path: '/weddings' },
    { name: t('nav.corporate'), path: '/corporate' },
    { name: t('nav.private'), path: '/packages' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
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
        <div className="hidden md:flex items-center space-x-10">
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
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-brand-700 hover:text-brand-900 transition-colors"
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
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-brand-100 md:text-[2.125rem] md:leading-tight">
              Rønningen
            </h2>
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
                <a href="tel:+4712345678" className={linkClass}>
                  <span className="inline-flex items-center gap-2.5">
                    <Phone size={15} className="shrink-0 text-brand-500" aria-hidden />
                    +47 123 45 678
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:post@ronningen.no" className={linkClass}>
                  <span className="inline-flex items-center gap-2.5">
                    <Mail size={15} className="shrink-0 text-brand-500" aria-hidden />
                    post@ronningen.no
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
                <Link to="/packages" className={linkClass}>
                  {t('nav.private')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className={linkClass}>
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className={linkClass}>
                  {t('nav.faq')}
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

        <div className="mt-12 border-t border-brand-800 pt-8 text-center text-xs text-brand-500 md:text-left">
          © {year} Rønningen Selskapslokale. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <Router>
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
