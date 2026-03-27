/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Phone, Mail, MapPin, Instagram, Facebook, ChevronDown, ChevronRight, ArrowRight, ArrowLeft, Music, Utensils, Camera, Sparkles, Wine, Truck, Calendar, Building2, Trees, Users, ShieldCheck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './lib/i18n';
import { Toaster } from 'sonner';

import { InquiryForm } from './components/InquiryForm';

import { AdminPanel } from './components/AdminPanel';

import { ContactPage } from './pages/ContactPage';

import { GalleryPage } from './pages/GalleryPage';

import { FAQPage } from './pages/FAQPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { WeddingsPage } from './pages/WeddingsPage';
import { CorporatePage } from './pages/CorporatePage';

const InquiryPage = () => {
  const { t } = useTranslation();
  return (
    <div className="py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif mb-4">{t('nav.inquiry')}</h1>
        <p className="text-brand-600">Tell us about your event and we will get back to you with a tailored offer.</p>
      </div>
      <InquiryForm />
    </div>
  );
};

import { PackageCard } from './components/PackageCard';

import { EventPage } from './components/EventPage';

const PrivatePage = () => {
  return (
    <EventPage 
      title="Private Selskaper"
      subtitle="Feir livets store begivenheter med dine nærmeste."
      description="Fra bursdager og jubileer til konfirmasjoner og slektstreff – Rønningen er det ideelle stedet å samle familie og venner. Vår varme atmosfære og personlige service gjør at hver feiring føles unik og spesiell."
      image="https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=2000"
      capacity={{ seated: 120, standing: 180 }}
      technical={[
        'Musikkanlegg med Bluetooth-tilkobling',
        'Barfasiliteter med kjøling',
        'Projektor for bildevisning',
        'WiFi for gjester',
        'Sluttvask er alltid inkludert'
      ]}
      features={[
        'Lokaler med sjel og historie',
        'Barnevennlige uteområder',
        'Fleksible løsninger for matservering',
        'Hjelp til pynting og dekorasjon',
        'God plass til dans og underholdning',
        'Personlig oppfølging hele veien'
      ]}
    />
  );
};
const PackagesPage = () => {
  const { t } = useTranslation();
  const packages = [
    {
      name: 'Basis Konsept',
      description: 'Ideelt for mindre møter, kurs eller enkle selskaper som krever minimalt med rigging.',
      price: 'Fra Kr. 450,-',
      features: [
        'Leie av lokale (inntil 12 timer)',
        'Standard møbeloppsett',
        'Grunnleggende lydanlegg & projektor',
        'Kaffe, te og vann inkludert',
        'Sluttvask inkludert'
      ]
    },
    {
      name: 'Full Pakke',
      description: 'Vårt mest populære valg for bryllup og firmafester. Vi tar hånd om det meste så du kan nyte dagen.',
      price: 'Fra Kr. 850,-',
      features: [
        'Leie av lokale (inntil 24 timer)',
        'Premium oppdekking med hvite duker',
        'Standard dekorasjonspakke',
        'Profesjonelt lyd- og lysanlegg',
        'Vertskap/personell (4 timer)',
        'Koordinering med caterer',
        'Sluttvask inkludert'
      ],
      isFeatured: true
    },
    {
      name: 'Eksklusiv Helaften',
      description: 'Den ultimate opplevelsen for de som ønsker full service fra start til slutt uten bekymringer.',
      price: 'Fra Kr. 1250,-',
      features: [
        'Full tilgang hele helgen',
        'Skreddersydd dekorasjon & blomster',
        'Fullt personell gjennom hele kvelden',
        'Eget mikrobryggeri-smaking (valgfritt)',
        'Dedikert prosjektleder',
        'Nattmat-servering inkludert',
        'Sluttvask inkludert'
      ]
    }
  ];

  return (
    <div className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-brand-400">Priser & Pakker</span>
          <h1 className="text-6xl font-serif text-brand-900">{t('nav.packages')}</h1>
          <p className="text-brand-600 max-w-2xl mx-auto text-lg font-light">
            Vi tilbyr fleksible konsepter tilpasset dine behov. Alle pakker kan skreddersys med tilleggstjenester som ølsmaking, underholdning og transport.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, i) => (
            <PackageCard key={i} {...pkg} />
          ))}
        </div>

        <div className="mt-24 p-12 bg-brand-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-serif">Trenger du noe helt unikt?</h3>
            <p className="text-brand-200 max-w-md">Vi skreddersyr gjerne et eget opplegg for din bedrift eller ditt selskap.</p>
          </div>
          <Link 
            to="/contact" 
            className="bg-white text-brand-900 px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-50 transition-all whitespace-nowrap"
          >
            Kontakt oss for tilbud
          </Link>
        </div>
      </div>
    </div>
  );
};
const Home = () => {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement>(null);
  const conceptsRef = useRef<HTMLDivElement>(null);
  
  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const [showConceptsLeft, setShowConceptsLeft] = useState(false);
  const [showConceptsRight, setShowConceptsRight] = useState(true);

  const handleGalleryScroll = () => {
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      const tol = 10;
      setGalleryHasOverflow(scrollWidth > clientWidth + tol);
      setShowGalleryLeft(scrollLeft > tol);
      setShowGalleryRight(scrollLeft < scrollWidth - clientWidth - tol);
    }
  };

  const handleConceptsScroll = () => {
    if (conceptsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = conceptsRef.current;
      setShowConceptsLeft(scrollLeft > 10);
      setShowConceptsRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const galleryContainer = galleryRef.current;
    const conceptsContainer = conceptsRef.current;

    if (galleryContainer) galleryContainer.addEventListener('scroll', handleGalleryScroll);
    if (conceptsContainer) conceptsContainer.addEventListener('scroll', handleConceptsScroll);
    
    handleGalleryScroll();
    handleConceptsScroll();
    
    window.addEventListener('resize', () => {
      handleGalleryScroll();
      handleConceptsScroll();
    });

    return () => {
      if (galleryContainer) galleryContainer.removeEventListener('scroll', handleGalleryScroll);
      if (conceptsContainer) conceptsContainer.removeEventListener('scroll', handleConceptsScroll);
      window.removeEventListener('resize', () => {
        handleGalleryScroll();
        handleConceptsScroll();
      });
    };
  }, []);

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const { clientWidth } = galleryRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollConcepts = (direction: 'left' | 'right') => {
    if (conceptsRef.current) {
      const { clientWidth } = conceptsRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      conceptsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Recipe 2 Inspired */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Venue Hero" 
            className="w-full h-full object-cover brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-xs uppercase tracking-[0.4em] font-bold opacity-70 block">Velkommen til Rønningen</span>
            <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-3xl font-light max-w-2xl mx-auto opacity-90 italic">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <Link 
                to="/inquiry" 
                className="bg-white text-brand-900 px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-50 transition-all shadow-2xl transform hover:-translate-y-1"
              >
                {t('hero.cta')}
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
              >
                Book a Viewing
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce opacity-50">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Konsept — venue showcase: tillit, kapasitet, tydelig neste steg */}
      <section
        id="konsept"
        aria-labelledby="konsept-heading"
        className="relative overflow-hidden bg-[#e8dfd6] py-20 md:py-28 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_center,rgba(67,48,43,0.055)_1px,transparent_1px)] bg-size-[26px_26px]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-[18%] top-[12%] h-[min(65vw,520px)] w-[min(65vw,520px)] rounded-full bg-brand-300/22 blur-[110px]" />
          <div className="absolute -left-[12%] bottom-[8%] h-[42%] w-[52%] rounded-full bg-brand-500/8 blur-[95px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.header
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16 lg:mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14"
          >
            <div className="lg:col-span-7">
              <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.42em] text-brand-600">
                <span className="h-px w-8 bg-brand-400/80" aria-hidden />
                Konseptet Rønningen
              </span>
              <h2
                id="konsept-heading"
                className="text-balance font-serif text-4xl leading-[0.98] tracking-tighter text-brand-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] xl:leading-[0.96]"
              >
                Skap minner i historiske omgivelser
              </h2>
            </div>
            <div className="lg:col-span-5 lg:border-l lg:border-brand-500/35 lg:pl-10 xl:pl-14">
              <p className="font-serif text-xl leading-snug text-brand-800 md:text-2xl lg:text-[1.6rem] lg:leading-relaxed">
                Hvorfor velge Rønningen til ditt neste arrangement?
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-brand-600 md:text-base">
                Lei hele gården med låve, utearealer og vertskap — én destinasjon for vielse, møte og fest, med oppfølging fra befaring til dere låser døren.
              </p>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[1.5rem] border border-brand-900/[0.08] bg-white shadow-[0_36px_100px_-36px_rgba(33,24,22,0.38)] md:rounded-[2rem]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Venstre: hero + tillitsstripe + sitat */}
              <div className="relative min-h-[min(68vh,680px)] lg:min-h-[620px]">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=88&w=1800"
                  alt="Låven og festlokalet på Rønningen Gård — klar til deres arrangement"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/92 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-brand-950/55 via-transparent to-transparent" />
                <div className="absolute left-6 top-6 md:left-8 md:top-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    <ShieldCheck size={14} className="text-brand-300" aria-hidden />
                    Lokale utleie · Personlig vertskap
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 lg:p-9 xl:p-10">
                  <div className="rounded-2xl border border-white/20 bg-black/45 p-5 shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-md md:rounded-3xl md:p-7 lg:p-8">
                    <dl className="grid grid-cols-3 gap-3 border-b border-white/20 pb-6 text-white md:gap-5 md:pb-7">
                      <div className="border-r border-white/20 pr-2 md:pr-4">
                        <dt className="sr-only">Kapasitet</dt>
                        <dd className="flex flex-col gap-1.5">
                          <Users className="h-4 w-4 text-brand-200 md:h-5 md:w-5" aria-hidden />
                          <span className="font-serif text-3xl font-medium tracking-tight tabular-nums md:text-4xl">120</span>
                          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/95">Sittende gjester</span>
                        </dd>
                      </div>
                      <div className="border-r border-white/20 px-1 md:px-2">
                        <dt className="sr-only">Eksklusivitet</dt>
                        <dd className="flex flex-col gap-1.5">
                          <Building2 className="h-4 w-4 text-brand-200 md:h-5 md:w-5" aria-hidden />
                          <span className="font-serif text-3xl font-medium tracking-tight md:text-4xl">100%</span>
                          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/95">Eksklusiv bruk</span>
                        </dd>
                      </div>
                      <div className="pl-1 md:pl-2">
                        <dt className="sr-only">Beliggenhet</dt>
                        <dd className="flex flex-col gap-1.5">
                          <MapPin className="h-4 w-4 text-brand-200 md:h-5 md:w-5" aria-hidden />
                          <span className="font-serif text-2xl font-medium leading-none tracking-tight md:text-3xl">Oslo</span>
                          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/95">& Drammen</span>
                        </dd>
                      </div>
                    </dl>
                    <blockquote className="mt-6 max-w-lg md:mt-7">
                      <p className="mb-3 font-serif text-xl italic leading-snug text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] md:text-2xl lg:text-[1.65rem]">
                        «En uforglemmelig opplevelse i vakre omgivelser.»
                      </p>
                      <footer className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-200">
                        Sarah & Thomas · Bryllup
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Høyre: historie + primær CTA + sekundær + fordeler */}
              <div className="relative flex flex-col overflow-hidden bg-linear-to-b from-brand-900 via-brand-900 to-[#16110e] text-white">
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <div className="absolute -right-[25%] -top-[10%] h-[min(100%,480px)] w-[min(100%,480px)] rounded-full bg-brand-500/16 blur-[110px]" />
                  <div className="absolute -bottom-[20%] -left-[15%] h-[50%] w-[60%] rounded-full bg-rose-900/15 blur-[100px]" />
                </div>
                <div className="relative flex flex-1 flex-col justify-center px-8 py-11 md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-14">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-brand-400">For arrangører som vil mer</p>
                  <p className="mb-6 max-w-xl text-[15px] font-light leading-[1.78] text-brand-100/95 md:text-[17px]">
                    Rønningen Gård er mer enn bare et lokale. Det er en destinasjon hvor tradisjon møter moderne komfort — med låve, hage og vertskap som lar dere eie dagen uten å bekymre dere for logistikken.
                  </p>
                  <p className="max-w-xl text-[15px] font-light leading-[1.78] text-brand-100/90 md:text-[17px]">
                    Bryllup, bedrift eller privat feiring: vi legger til rette for alt fra vielse og mingling til dans og overnatting i rolige omgivelser.
                  </p>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-900 shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-brand-50"
                    >
                      Book omvisning
                      <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
                    </Link>
                    <Link
                      to="/gallery"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10"
                    >
                      Se bildegalleri
                      <ChevronRight size={16} strokeWidth={2.25} aria-hidden />
                    </Link>
                  </div>
                </div>

                <div className="relative border-t border-white/10 bg-brand-50">
                  <p className="border-b border-brand-200/80 px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-brand-500 md:px-10">
                    Dette skiller oss når dere leier hos oss
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    {[
                      {
                        title: 'Eksklusiv bruk',
                        desc: 'Hele stedet for dere — personlig atmosfære uten fremmede gjester i bakgrunnen.',
                        Icon: Building2,
                      },
                      {
                        title: 'Landlig ro',
                        desc: 'Kulturlandskap og ro som gir bedre samtaler og mer nærvær.',
                        Icon: Trees,
                      },
                      {
                        title: 'Matopplevelser',
                        desc: 'Lokale råvarer og retter med sjel — tilpasset deres anledning.',
                        Icon: Utensils,
                      },
                      {
                        title: 'Enkel logistikk',
                        desc: 'Kort vei fra Oslo og Drammen, god parkering og tydelig plan for dagen.',
                        Icon: Truck,
                      },
                    ].map(({ title, desc, Icon }, i) => (
                      <div
                        key={title}
                        className={`group border-b border-brand-200/80 p-7 transition-colors last:border-b-0 hover:bg-white md:p-8 lg:p-9 ${
                          i % 2 === 0 ? 'sm:border-r sm:border-brand-200/80' : ''
                        } ${i < 2 ? 'sm:border-b sm:border-brand-200/80' : ''}`}
                      >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-brand-300/90 bg-white text-brand-800 shadow-sm transition-transform group-hover:scale-[1.04]">
                          <Icon size={19} strokeWidth={1.75} aria-hidden />
                        </div>
                        <h4 className="mb-1.5 font-serif text-lg text-brand-900 md:text-[1.15rem]">{title}</h4>
                        <p className="text-[13px] leading-relaxed text-brand-600 md:text-[14px]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Sections Preview — bred ramme, tydelig intro */}
      <section
        id="konsepter"
        aria-labelledby="konsepter-heading"
        className="overflow-hidden bg-gradient-to-b from-[#eef0f3] via-[#F3F4F6] to-brand-50/90 py-24 md:py-32"
      >
        <div className="mx-auto max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <header className="mb-12 max-w-3xl lg:mb-16">
            <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.38em] text-brand-500">
              Arrangementer
            </span>
            <h2
              id="konsepter-heading"
              className="text-balance font-serif text-4xl leading-[0.98] tracking-tighter text-brand-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] xl:leading-[0.96]"
            >
              Våre konsepter
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-600 md:text-lg md:leading-relaxed">
              Utforsk ulike typer selskap som passer låven og gårdsrommene våre — fra det intime til det storslåtte. Hvert konsept kan skreddersys med meny, dekor og plan for dagen.
            </p>
          </header>

          {/* Accordion Container */}
          <div 
            ref={conceptsRef}
            className="scrollbar-hide -mx-5 snap-x snap-mandatory overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:px-0"
          >
            <div 
              className="flex gap-4 h-[650px] w-[500%] md:w-[200%] transition-all duration-700"
            >
              {[
                { title: 'Bryllup', path: '/weddings', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200' },
                { title: 'Bedrift', path: '/corporate', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200' },
                { title: 'Private selskap', path: '/private', img: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=1200' },
                { title: 'Julebord', path: '/packages', img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1200' },
                { title: 'Konferanse', path: '/corporate', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200' },
                { title: 'Sommerfest', path: '/packages', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200' },
                { title: 'Kick-off', path: '/corporate', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200' },
                { title: 'Lansering', path: '/corporate', img: 'https://images.unsplash.com/photo-1540575861501-7c90b707a27d?auto=format&fit=crop&q=80&w=1200' },
              ].map((item, i) => (
                <Link 
                  key={i} 
                  to={item.path} 
                  className="relative h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-in-out flex-[1] md:hover:flex-[2.5] snap-start"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-5xl font-condensed text-white uppercase tracking-tight leading-none whitespace-nowrap">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex gap-3 mt-10">
            <button 
              onClick={() => scrollConcepts('left')}
              className={`w-12 h-12 rounded-full border border-brand-200 flex items-center justify-center bg-white transition-all hover:bg-brand-50 ${showConceptsLeft ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
              disabled={!showConceptsLeft}
            >
              <ArrowLeft size={20} className="text-brand-400" />
            </button>
            <button 
              onClick={() => scrollConcepts('right')}
              className={`w-12 h-12 rounded-full bg-[#C4B5FD] flex items-center justify-center transition-all hover:bg-[#B1A0F9] ${showConceptsRight ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}`}
              disabled={!showConceptsRight}
            >
              <ArrowRight size={20} className="text-brand-900" />
            </button>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-32 px-4 bg-[#F5F5F5] overflow-hidden relative">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] -right-[5%] w-[30%] h-[30%] bg-brand-200/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-brand-300/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-[1800px] mx-auto px-8 md:px-20 relative z-10">
          <div className="mb-16">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-sans text-brand-900 opacity-80 uppercase tracking-widest mb-4 block"
            >
              Våre tjenester
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-8xl font-serif text-brand-900 leading-[0.9] tracking-tighter"
            >
              Eksklusive <br /> Opplevelser
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm transition-all duration-500 cursor-pointer"
              >
                {/* Background Image */}
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Default Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                
                {/* Hover Overlay (Teal/Blue Gradient) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content Container */}
                <div className="absolute inset-0 p-10 flex flex-col h-full">
                  {/* Title - Repositions on hover */}
                  <h3 className="text-4xl font-display text-white uppercase tracking-wide transition-all duration-500 
                    group-hover:mt-0 mt-auto">
                    {service.title}
                  </h3>
                  
                  {/* Description - Appears on hover */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex-grow">
                    <p className="text-white text-lg leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Read More - Appears on hover at bottom */}
                  <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 flex items-center gap-3 group/btn">
                    <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center transition-colors group-hover/btn:bg-white group-hover/btn:text-[#4F9DA6]">
                      <ArrowRight size={18} />
                    </div>
                    <span className="text-white font-medium uppercase tracking-wider text-sm">Les mer</span>
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
        className="relative overflow-hidden bg-white py-32"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-brand-100/20 blur-[150px]" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto max-w-[1800px] px-8 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.3em] text-brand-500">Visuelt</span>
            <h2
              id="inspirasjon-galleri-heading"
              className="mb-6 font-serif text-5xl leading-[0.95] tracking-tight text-brand-900 md:text-7xl"
            >
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
                  className="group relative aspect-[4/5] min-w-[88%] overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm snap-center transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]"
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
        className="relative overflow-hidden border-t border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50 py-28 md:py-32"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200/60 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-[1800px] px-8 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
          >
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.32em] text-brand-500">Samarbeid</span>
            <h2 id="partnere-heading" className="mb-5 font-serif text-4xl tracking-tight text-brand-900 md:text-5xl lg:text-6xl">
              Våre partnere
            </h2>
            <p className="text-base leading-relaxed text-brand-600 md:text-lg">
              Vi jobber med anbefalte leverandører innen mat, dekor, foto og mer — slik at dere får ett koordinert team rundt arrangementet på Rønningen.
            </p>
          </motion.div>

          <div className="relative -mx-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:-mx-8 md:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="overflow-hidden py-2" aria-hidden>
              <div className="animate-marquee-slow flex w-max items-center gap-12 md:gap-20 lg:gap-24">
                {(
                  [
                    'Catering & kjøkken',
                    'Blomster & dekor',
                    'Foto & film',
                    'Lyd & lys',
                    'Bar & servering',
                    'Koordinering',
                  ] as const
                )
                  .concat(
                    [
                      'Catering & kjøkken',
                      'Blomster & dekor',
                      'Foto & film',
                      'Lyd & lys',
                      'Bar & servering',
                      'Koordinering',
                    ] as const
                  )
                  .map((label, i) => (
                    <span
                      key={`${label}-${i}`}
                      className="font-display text-2xl uppercase tracking-[0.12em] text-brand-800/35 transition-colors hover:text-brand-800/70 md:text-3xl lg:text-4xl"
                    >
                      {label}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-brand-500 md:mt-12">
            Ønsker dere egne leverandører? Det meste lar seg løse — ta det med oss i planleggingen.
          </p>
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
    { name: t('nav.packages'), path: '/packages' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="text-3xl font-serif font-bold text-brand-900 tracking-tight">
          Rønningen
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
          <Link 
            to="/inquiry" 
            className="bg-brand-900 text-white px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('nav.inquiry')}
          </Link>
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
              <Link 
                to="/inquiry" 
                onClick={() => setIsOpen(false)}
                className="bg-brand-900 text-white px-8 py-4 rounded-full text-center text-xs uppercase tracking-[0.3em] font-bold shadow-lg"
              >
                {t('nav.inquiry')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-brand-900 text-brand-100 py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif">Rønningen</h2>
          <p className="text-brand-300 font-light">
            A premium venue for life's most beautiful moments.
          </p>
          <div className="flex space-x-4">
            <Instagram className="cursor-pointer hover:text-white transition-colors" />
            <Facebook className="cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-widest mb-6 font-bold">{t('footer.contact')}</h4>
          <ul className="space-y-4 text-brand-300 font-light">
            <li className="flex items-center space-x-3">
              <Phone size={16} />
              <span>+47 123 45 678</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} />
              <span>post@ronningen.no</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin size={16} />
              <span>Rønningen Gård, 1234 Oslo</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest mb-6 font-bold">Quick Links</h4>
          <ul className="space-y-4 text-brand-300 font-light">
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest mb-6 font-bold">Newsletter</h4>
          <p className="text-brand-300 font-light mb-4">Stay updated on our events and news.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-brand-800 border-none rounded-l-md px-4 py-2 w-full focus:ring-1 focus:ring-brand-400"
            />
            <button className="bg-brand-700 px-4 py-2 rounded-r-md hover:bg-brand-600 transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-800 text-center text-brand-500 text-xs">
        © {new Date().getFullYear()} Rønningen Selskapslokale. {t('footer.rights')}.
      </div>
    </footer>
  );
};

// Utility function
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

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
              <Route path="/private" element={<PrivatePage />} />
              <Route path="/packages" element={<PackagesPage />} />
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
