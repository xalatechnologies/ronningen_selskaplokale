import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { HeroScrollHint } from '../components/HeroScrollHint';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from '../lib/typography';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

const CTA_PRIMARY = '/inquiry';
const CTA_SECONDARY = '/contact';

const whyThree = [
  'Personlig ramme — ikke anonym konferansesal',
  'Opplegg tilpasset dato, format og antall gjester',
  'Koordinering på stedet — færre parallelle tråder for dere å holde i',
];

const eventTypes = [
  {
    title: 'Konferanse & seminar',
    tag: 'Faglig',
    desc: 'Gode fasiliteter for faglig innhold, med rom for både presentasjoner og pauser i rolige omgivelser.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Teambuilding',
    tag: 'Fellesskap',
    desc: 'Skap samhold gjennom aktiviteter og gode opplevelser – både inne og ute, tilpasset deres behov.',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Julebord',
    tag: 'Festlig',
    desc: 'Samle kollegaene til en hyggelig kveld med god stemning, mat og fest i lune omgivelser.',
    img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Sommerfest',
    tag: 'Sosialt',
    desc: 'Nyt sommeren med kollegaer i åpne og grønne omgivelser, med god plass til både aktiviteter og avslapning.',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Workshop & kickoff',
    tag: 'Energi',
    desc: 'Start nye prosjekter eller samle teamet med fokus og energi i inspirerende omgivelser.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Firmamiddag',
    tag: 'Representativt',
    desc: 'Inviter til en stilfull middag med gode rammer for både samtaler, feiring og relasjonsbygging.',
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1200',
  },
];

const packages = [
  {
    name: 'Lokalleie',
    price: 'På forespørsel',
    detail: 'Tilbud etter samtale',
    fit: 'Dere styrer leverandører selv.',
    bullets: ['Eksklusiv bruk av avtalte lokaler', 'Grunnleggende bord og stoler', 'Avtalt tidsramme'],
  },
  {
    name: 'Fleksibelt opplegg',
    price: 'På forespørsel',
    detail: 'Tilpasses behov',
    fit: 'Sted pluss utvalgt støtte fra oss.',
    bullets: ['Tilpasset rigg og plan', 'Koordinering med oss', 'Kan utvides'],
    featured: true,
  },
  {
    name: 'Skreddersøm',
    price: 'Individuelt',
    detail: 'Etter omfang',
    fit: 'Helheten fra idé til gjennomføring.',
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
    q: 'Hvilke typer bedriftsarrangement passer?',
    a: 'Kortene viser typiske former — fra konferanser, teambuilding og workshop til julebord, sommerfest og firmamiddag. Kapasitet og detaljer i opplegget avklarer vi ut fra dato, antall og hva dere vil oppnå.',
  },
  {
    q: 'Kan opplegget tilpasses?',
    a: 'Ja — dato, antall gjester og ønsket form styrer hvordan vi setter opp lokaler og praktisk rundt arrangementet.',
  },
  {
    q: 'Kan vi komme på omvisning?',
    a: 'Ja. Ta kontakt så finner vi et tidspunkt som passer.',
  },
  {
    q: 'Hvordan sender vi forespørsel?',
    a: 'Bruk skjemaet vårt med dato, omtrentlig antall og plan. Vi tar kontakt med forslag.',
  },
];

const GALLERY_EDGE_TOLERANCE = 2;

export const CorporatePage = () => {
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
              Fra julebord til kick-off.
              <span className="mt-2 block font-serif italic text-brand-200 sm:mt-3">Alt på ett sted.</span>
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

        <HeroScrollHint targetId="corporate-intro" />
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
                  className="relative mx-auto aspect-[7/8] w-full max-w-md overflow-hidden rounded-2xl border border-brand-200/80 shadow-lg lg:mx-0 lg:max-w-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1600"
                    alt="Selskapslokale med varmt lys og dekket til fest — stemning som passer bedriftsarrangement hos Rønningen"
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
                    Der profesjon møter <span className="italic text-brand-700">varme</span>
                  </h2>
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-brand-800 md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed">
                    Vertskap som kjenner både formelle og uformelle bedriftskvelder — og lokaler som kan tones opp eller ned etter anledningen.
                  </p>
                </motion.header>

                <div className="mt-6 border-t border-brand-200/90 pt-6 md:mt-8 md:pt-8">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-500 md:mb-4 md:text-base md:tracking-[0.22em]">
                    Tre tydelige fordeler
                  </p>
                  <ul className="space-y-3 md:space-y-3.5" role="list">
                    {whyThree.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-base leading-snug text-brand-800 md:gap-3.5 md:text-lg md:leading-relaxed"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 md:mt-1 md:h-6 md:w-6"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span>{line}</span>
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
              Typiske bedriftsarrangement <span className="italic text-brand-400">hos oss</span>
            </motion.h2>
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
        aria-labelledby="corporate-packages-heading"
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
            <h2 id="corporate-packages-heading" className={cn(SECTION_H2_CLASS, 'mb-5 text-balance')}>
              Våre bedriftspakker
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
              Selskap, mingling og kveld — ikke bare tomme rom. Bla gjennom et utvalg av stemning fra arrangement hos oss.
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
                Klar for å <span className="italic text-brand-400">planlegge</span>
                <br />
                bedriftens dag hos oss?
              </h2>
              <p className="text-lg font-light leading-relaxed text-brand-100 md:text-xl">
                Kort fortalt hva dere tenker på — så foreslår vi opplegg som passer team og gjester.
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
