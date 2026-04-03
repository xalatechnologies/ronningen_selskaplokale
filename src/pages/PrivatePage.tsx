import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { HeroScrollHint } from '../components/HeroScrollHint';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from '../lib/typography';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Gift,
  Heart,
  Sparkles,
} from 'lucide-react';

const CTA_PRIMARY = '/inquiry';
const CTA_SECONDARY = '/contact';

const quickFit = [
  {
    title: 'Bursdag',
    desc: 'Barnebursdag, runde år eller overraskelsesfest — plass til både mat, taler og dans.',
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=800',
  },
  {
    title: 'Konfirmasjon',
    desc: 'Samling etter kirken med rom til slekt, venner og den gode middagen.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=800',
  },
  {
    title: 'Dåp & Navnefest',
    desc: 'Rolig ramme etter kirken og feiring av nytt navn — kaffe, kaker og tid til nærmeste.',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=800',
  },
  {
    title: 'Minnestund',
    desc: 'Samling etter livets tunge dager — rolig, verdig, med plass til minneord og å være sammen.',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=800',
  },
  {
    title: 'Jubileum',
    desc: 'Sølvbryllup, runde dager og milepæler — feiring som føles ekte, ikke pyntet.',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=800',
  },
] as const;

const privateHighlights = [
  {
    icon: Heart,
    title: 'Nærhet',
    desc: 'Rom som føles personlige — ikke anonyme festlokaler. Her handler det om dere og gjestene.',
  },
  {
    icon: Gift,
    title: 'Deres tradisjon',
    desc: 'Opplegg tilpasset familie, gjester og høytider dere bryr dere om — uten ferdig mal fra oss.',
  },
  {
    icon: Sparkles,
    title: 'Samlet på ett sted',
    desc: 'Én destinasjon fra ankomst til siste klem: mindre stress, mer tid til å være til stede.',
  },
];

const eventTypes = [
  {
    title: 'Bursdag',
    tag: 'Feiring',
    desc: 'Fra barnebursdag med enkel servering til voksne selskap med middag og dans. Vi tilpasser kapasitet, lyd og tidsplan slik at dagen blir deres — ikke en ferdig mal.',
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Konfirmasjon',
    tag: 'Tradisjon',
    desc: 'Etter seremonien samles dere til fest med plass til slekt og venner. Vi hjelper med flyt, bord og tidsrom — slik at konfirmanten og familien kan være til stede, ikke styre logistikk.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Dåp & Navnefest',
    tag: 'Familie',
    desc: 'Rolig og varm ramme når dere vil samle nærmeste etter kirken — enten det gjelder dåp, navnefest eller begge deler i samme helg. Vi avklarer plass til barnestoler, kaffebord og taler i samme rom.',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Minnestund',
    tag: 'Verdig',
    desc: 'Samling etter livets tunge dager — en rolig ramme for minneord, kaffe og tid til å være sammen. Vi koordinerer diskret med dere om det dere trenger.',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Jubileum',
    tag: 'Milepæl',
    desc: 'Sølvbryllup, runde år eller langt ekteskap — vi legger til rette for taler, minner og fest som varer ut kvelden, uten at dere må tenke på alt selv.',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1200',
  },
];

const packages = [
  {
    name: 'Lokalleie',
    price: 'På forespørsel',
    detail: 'Tilbud etter samtale',
    fit: 'Dere velger selv catering og detaljer — vi stiller med rommet.',
    bullets: ['Eksklusiv bruk av avtalte lokaler', 'Grunnleggende bord og stoler', 'Avtalt tidsramme'],
  },
  {
    name: 'Fleksibelt opplegg',
    price: 'På forespørsel',
    detail: 'Tilpasses behov',
    fit: 'Lokale pluss praktisk støtte til familiefeiringer.',
    bullets: ['Tilpasset rigg og flyt', 'Koordinering med oss', 'Kan utvides med det dere trenger'],
    featured: true,
  },
  {
    name: 'Skreddersøm',
    price: 'Individuelt',
    detail: 'Etter omfang',
    fit: 'Fra idé til gjennomføring — når dere vil ha alt samlet.',
    bullets: ['Dialog om konsept og budsjett', 'Samarbeid med leverandører', 'Oppfølging på dagen'],
  },
];

const galleryImgs = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200',
];

const faqs = [
  {
    q: 'Hvilke private feiringer kan vi ha hos dere?',
    a: 'Blant annet bursdag, konfirmasjon, dåp og navnefest, minnestund og jubileum. Vi avklarer antall gjester, tidsrom og ønsket form i en uforpliktende prat.',
  },
  {
    q: 'Kan vi ta med egen mat og drikke?',
    a: 'Det avklarer vi ut fra valgt opplegg og lokale. Mange kombinerer egen kake og drikke med catering — vi hjelper dere å finne en ryddig løsning.',
  },
  {
    q: 'Passer det for både små og store selskap?',
    a: 'Ja. Vi tilpasser bordoppsett og rom etter antall gjester — fra intime samlinger til større familielag.',
  },
  {
    q: 'Hvordan booker vi?',
    a: 'Send forespørsel med dato, omtrentlig antall og type feiring. Vi kommer tilbake med forslag og neste steg.',
  },
];

const GALLERY_EDGE_TOLERANCE = 2;

export const PrivatePage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);

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
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000"
            alt=""
            className="h-full w-full scale-105 object-cover brightness-[0.42]"
            referrerPolicy="no-referrer"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/[0.62]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_20%,rgba(0,0,0,0.5)_100%)]"
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
              className="max-w-5xl font-serif text-6xl leading-[0.9] tracking-tighter text-balance md:text-9xl"
            >
              Livets feiringer samlet.
              <span className="mt-2 block font-serif italic text-brand-200 sm:mt-3">Hos oss.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="flex w-full flex-col items-stretch justify-center gap-4 pt-1 sm:flex-row sm:items-center sm:gap-6"
            >
              <Link
                to={CTA_SECONDARY}
                className="rounded-full bg-white px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-brand-900 shadow-xl transition hover:bg-brand-50"
              >
                Book nå
              </Link>
              <Link
                to={CTA_PRIMARY}
                className="rounded-full border-2 border-white/35 bg-white/5 px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-white backdrop-blur-[2px] transition hover:bg-white/10"
              >
                Send forespørsel
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <HeroScrollHint targetId="private-intro" />
      </section>

      {/* 2 — Verdi: editorial + panoramabilde + tre søyler + feiring-rutenett */}
      <section
        id="private-intro"
        aria-labelledby="private-value-heading"
        className="section-viewport scroll-mt-24 border-b border-brand-200/80 bg-linear-to-b from-white via-brand-50/50 to-brand-100/40"
      >
        <div className="section-viewport-scroll mx-auto w-full max-w-[1800px] px-5 py-14 md:px-10 md:py-20 lg:px-14 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-600 md:text-xs md:tracking-[0.32em]"
            >
              Privat hos Rønningen
            </motion.p>
            <motion.h2
              id="private-value-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className={cn(SECTION_H2_CLASS, 'mt-5 text-balance')}
            >
              Der feiringen får <span className="italic text-brand-700">personlighet</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-pretty text-base leading-relaxed text-brand-800 md:text-lg md:leading-relaxed"
            >
              Bursdag, konfirmasjon, dåp og navnefest, minnestund og jubileum — dere samles i lokaler med sjel, der det handler om mennesker og tradisjoner, ikke om standard oppsett fra en katalog.
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
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=2000"
              alt="Feststemning og dekkede bord i selskapslokalet"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/75 via-brand-950/15 to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-5 left-5 right-5 max-w-xl text-left text-sm font-light leading-relaxed text-white/95 md:bottom-8 md:left-8 md:text-base">
              Lys, treverk og plass til både taler og latter — en ramme som lar dagen puste.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-16 md:gap-6 lg:gap-8">
            {privateHighlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col rounded-2xl border border-brand-200/90 bg-white/90 p-6 shadow-[0_1px_0_rgba(28,22,19,0.05)] backdrop-blur-sm md:p-7"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-200/80 bg-brand-50 text-brand-800">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl tracking-tight text-brand-950 md:text-[1.35rem]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-brand-700 md:text-base">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 md:mt-20" aria-labelledby="private-quickfit-heading">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <h3
                id="private-quickfit-heading"
                className="font-serif text-2xl tracking-tight text-brand-950 md:text-3xl"
              >
                Eksempler på feiringer
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-brand-600 md:text-[15px]">
                Fem utgangspunkt — kombiner gjerne flere i samme helg eller kveld.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-5">
              {quickFit.map((c, i) => (
                <motion.article
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.06, 0.18) }}
                  tabIndex={0}
                  aria-label={`${c.title}. ${c.desc}`}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-200/90 shadow-md outline-none transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  <img
                    src={c.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <h4 className="font-display text-lg uppercase tracking-wide text-white md:text-xl">{c.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-brand-100/95 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:text-[15px]">
                      {c.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Anledninger: samme grid som bedrift */}
      <section
        aria-labelledby="private-events-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-800 bg-brand-900 px-4 text-white"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute -right-[5%] top-[10%] h-[30%] w-[30%] rounded-full bg-brand-400/10 blur-[100px]" />
          <div className="absolute -left-[5%] bottom-[10%] h-[30%] w-[30%] rounded-full bg-white/[0.07] blur-[100px]" />
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[1800px] px-5 py-14 sm:px-8 sm:py-16 md:px-14 md:py-16 lg:px-16 xl:px-20">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2
              id="private-events-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={SECTION_H2_ON_DARK_CLASS}
            >
              Anledninger vi ofte <span className="italic text-brand-400">skaper sammen</span>
            </motion.h2>
            <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-brand-200 md:text-lg md:leading-relaxed">
              Fra bursdag og konfirmasjon til dåp og navnefest, minnestund og jubileum — utgangspunkter dere kan blande og tilpasse. Vi lander detaljene i dialog med dere.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {eventTypes.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-white/28 transition-all duration-500 hover:border-white/45"
              >
                <img
                  src={e.img}
                  alt={e.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 flex h-full min-h-0 flex-col p-5 sm:p-6 md:p-7 lg:p-6">
                  <h3 className="mt-auto shrink-0 font-display text-2xl uppercase tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:mt-0 sm:text-3xl md:text-[1.85rem] lg:text-2xl lg:leading-tight xl:text-[1.75rem]">
                    {e.title}
                  </h3>

                  <div className="mt-3 flex-grow opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                    <p className="line-clamp-6 text-sm font-normal leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] sm:text-base md:text-[1.0625rem] md:leading-relaxed lg:line-clamp-7">
                      {e.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Pakker (samme uttrykk som bryllupspakker) */}
      <section
        aria-labelledby="private-packages-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50"
      >
        <div
          className="pointer-events-none absolute left-[8%] top-[18%] h-[min(38vw,22rem)] w-[min(38vw,22rem)] rounded-full bg-brand-200/25 blur-[90px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[12%] right-[6%] h-[min(32vw,18rem)] w-[min(32vw,18rem)] rounded-full bg-brand-400/10 blur-[80px]"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-5 py-16 sm:px-8 sm:py-20 md:px-14 md:py-24 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 max-w-2xl space-y-4 md:mb-12 md:space-y-5"
          >
            <h2 id="private-packages-heading" className={cn(SECTION_H2_CLASS, 'mb-5 text-balance')}>
              Våre private pakker
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-brand-700 md:text-lg md:leading-relaxed">
              Tre utgangspunkt — vi tilpasser i dialog med dere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-3 lg:gap-8">
            {packages.map((pkg, i) => {
              const featured = 'featured' in pkg && pkg.featured;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    'relative flex h-full flex-col rounded-2xl border p-8 md:p-9',
                    featured
                      ? 'z-[1] border-brand-800 bg-brand-900 text-white shadow-2xl shadow-brand-900/30 ring-2 ring-brand-400/20'
                      : 'border-brand-200/90 bg-white/95 text-brand-900 shadow-[0_1px_0_rgba(28,22,19,0.04)] ring-1 ring-brand-900/[0.04]',
                  )}
                >
                  {featured && (
                    <div className="absolute right-4 top-4 rounded-full bg-brand-700 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                      Mest populær
                    </div>
                  )}

                  <div className="mb-6">
                    <p
                      className={cn(
                        'mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]',
                        featured ? 'text-brand-400' : 'text-brand-500',
                      )}
                    >
                      {pkg.detail}
                    </p>
                    <h3
                      className={cn(
                        'font-serif text-2xl tracking-tight md:text-[1.65rem]',
                        featured ? 'text-white' : 'text-brand-950',
                      )}
                    >
                      {pkg.name}
                    </h3>
                    <p className={cn('mt-3 font-serif text-2xl md:text-3xl', featured ? 'text-brand-100' : 'text-brand-900')}>
                      {pkg.price}
                    </p>
                    <p className={cn('mt-4 text-[15px] leading-relaxed md:text-base', featured ? 'text-brand-100' : 'text-brand-700')}>
                      {pkg.fit}
                    </p>
                  </div>

                  <div className={cn('mb-6 h-px w-full', featured ? 'bg-brand-700' : 'bg-brand-200')} />

                  <ul className="mb-8 grow space-y-3.5">
                    {pkg.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <div className={cn('mt-0.5 shrink-0', featured ? 'text-brand-400' : 'text-brand-600')}>
                          <CheckCircle2 size={18} strokeWidth={2.25} aria-hidden />
                        </div>
                        <span className={cn('text-[15px] leading-relaxed', featured ? 'text-brand-100' : 'text-brand-800')}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={CTA_PRIMARY}
                    className={cn(
                      'mt-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors',
                      featured ? 'bg-white text-brand-900 hover:bg-brand-100' : 'bg-brand-900 text-white hover:bg-brand-800',
                    )}
                  >
                    Be om tilbud
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm italic text-brand-500">
            Priser er veiledende — endelig tilbud etter samtale.
          </p>
        </div>
      </section>

      {/* 5 — Galleri (samme uttrykk som bryllup) */}
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
            <h2 className={cn(SECTION_H2_CLASS, 'mb-6')}>Stemning fra lokalet</h2>
            <p className="text-lg leading-relaxed text-brand-600 md:text-xl">
              Fest, samvær og kveldsstemning — et glimt av hvordan private selskap kan ta form hos oss.
            </p>
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
                  aria-label="Forrige bilde"
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
                  aria-label="Neste bilde"
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
              {galleryImgs.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}
                  className="group relative aspect-[6/7] min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]"
                >
                  <img
                    src={src}
                    alt={`Stemning fra lokalet ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/75 via-brand-900/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-85" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <p className="font-serif text-lg text-white md:text-xl">Privat selskap {i + 1}</p>
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

      {/* 6 — FAQ (samme mål og uttrykk som bryllup) */}
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
              Ofte stilte <span className="italic text-brand-600">spørsmål</span>
            </motion.h2>
            <div className="mx-auto h-px w-16 bg-brand-200" />
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
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
                    {faq.q}
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
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Avsluttende CTA (samme uttrykk som galleri) */}
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
            <div className="relative z-10 mx-auto max-w-3xl space-y-6 md:space-y-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-300">Neste steg</p>
              <h2 className={cn(SECTION_H2_ON_DARK_CLASS, 'm-0')}>
                Lyst å <span className="italic text-brand-400">planlegge</span>
                <br />
                feiringen hos oss?
              </h2>
              <p className="text-lg font-light leading-relaxed text-brand-100 md:text-xl">
                Fortell kort hva dere feirer og når — så foreslår vi ramme og opplegg som passer familie og gjester.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row sm:gap-5">
                <Link
                  to={CTA_PRIMARY}
                  className="w-full rounded-full bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.28em] text-brand-900 shadow-xl transition hover:bg-brand-50 sm:w-auto"
                >
                  Send forespørsel
                </Link>
                <Link
                  to={CTA_SECONDARY}
                  className="w-full rounded-full border border-white/30 px-10 py-5 text-xs font-bold uppercase tracking-[0.28em] text-white transition hover:bg-white/10 sm:w-auto"
                >
                  Book nå
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
