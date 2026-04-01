import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from '../lib/typography';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

const CTA_PRIMARY = '/inquiry';
const CTA_SECONDARY = '/contact';
const GALLERY_EDGE_TOLERANCE = 2;

const FACILITY_CARDS = [
  {
    title: 'Barnepass',
    desc: 'Trygt opplegg for de minste, slik at foreldre kan være til stede i feiringen uten å bekymre seg for logistikken.',
    img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Barn som leker sammen — illustrerer barnepass og familieselskap',
  },
  {
    title: 'Overnatting',
    desc: 'Gjester som kommer langveisfra kan bli natten over — enkelt å samle hele helgen på samme sted.',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Rolig soverom — overnatting for gjester',
  },
  {
    title: 'Brudesuite',
    desc: 'Rom for forberedelser, ro og private øyeblikk før vielse og fest — et naturlig knutepunkt for bruden og følget.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Elegant detalj — forberedelser og brudesuite',
  },
  {
    title: 'Aktiviteter',
    desc: 'Mulighet for opplegg som engasjerer ulike aldre og gir pauser og energi gjennom dagen.',
    img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Uteområde og natur — aktiviteter og pauser',
  },
  {
    title: 'Samvær med dyr',
    desc: 'Nærhet til dyr og uteområder som gir en avslappende og særegen ramme rundt arrangementet.',
    img: 'https://images.unsplash.com/photo-1464226184882-fedb00660135?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Dyr på landet — naturlig ramme for arrangement',
  },
  {
    title: 'Bar & Dansegulv',
    desc: 'Naturlig flyt fra middag til kveld med plass til musikk, toastmaster og dans uten å skifte lokasjon.',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Stemning fra fest og bar',
  },
  {
    title: 'Storkjøkken',
    desc: 'Godt utstyrt kjøkken som gjør det enkelt for catering, buffét og servering i større skala.',
    img: 'https://images.unsplash.com/photo-1556912173-046c9c372425?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Profesjonelt kjøkken til catering og servering',
  },
  {
    title: 'Universel utformet',
    desc: 'Tilrettelagt slik at gjester med ulike behov kan komme seg inn, delta og føle seg velkomne.',
    img: 'https://images.unsplash.com/photo-1580757469898-295dedbdb3c2?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Tilgjengelighet og universell utforming',
  },
  {
    title: 'Gratis parkering (mulighet til å lade eller la bilen stå igjen)',
    desc: 'God plass til biler, lademuligheter og mulighet til å avtale at bilen kan stå — praktisk for alle som kjører.',
    img: 'https://images.unsplash.com/photo-1506521781263-d8422e82fd27?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Parkering og ankomst for gjester',
  },
  {
    title: 'Låve',
    desc: 'Hovedrommet med autentisk stemning — ideelt til middag, taler, dans og fellesskap under samme tak.',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=900',
    imgAlt: 'Festlokale og feststemning i låve eller selskapslokale',
  },
] as const;

const useCases = [
  {
    title: 'Familiefeiring',
    tag: 'Privat',
    desc: 'Kombiner låve, barnepass og aktivitetsflater for et opplegg som fungerer for alle aldre.',
    img: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Bryllupshelg',
    tag: 'Bryllup',
    desc: 'Brudesuite, overnatting og bar/dansegulv gir en helhetlig feiring fra ankomst til siste dans.',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Bedriftskveld',
    tag: 'Bedrift',
    desc: 'Storkjøkken, teknisk oppsett og rom med fleksibel møblering gjør gjennomføringen enkel og tydelig.',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Ute + inne',
    tag: 'Aktivitet',
    desc: 'Samvær med dyr og uteområder kan kombineres med middag og program inne i låven.',
    img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Helg med gjester',
    tag: 'Overnatting',
    desc: 'Når gjester kommer langveisfra, kan dere samle alt i ett løp med overnatting og parkering.',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=85&w=1200',
  },
  {
    title: 'Kveld med energi',
    tag: 'Sosialt',
    desc: 'Bar og dansegulv gir naturlig flyt fra middag til sosial kveld uten skifte av lokasjon.',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=85&w=1200',
  },
] as const;

const packages = [
  {
    name: 'Basis fasiliteter',
    price: 'På forespørsel',
    detail: 'Tilbud etter samtale',
    fit: 'Et tydelig grunnoppsett med de viktigste rammene på plass.',
    bullets: ['Låve', 'Storkjøkken', 'Universel utformet', 'Gratis parkering (mulighet til å lade eller la bilen stå igjen)'],
  },
  {
    name: 'Komfort + opphold',
    price: 'På forespørsel',
    detail: 'Tilpasses behov',
    fit: 'Når dere ønsker mer komfort for vertskap og gjester over tid.',
    bullets: ['Overnatting', 'Brudesuite', 'Bar & Dansegulv', 'Aktiviteter'],
    featured: true,
  },
  {
    name: 'Komplett familiesett',
    price: 'Individuelt',
    detail: 'Etter omfang',
    fit: 'For dere som ønsker et helhetlig oppsett for både barn og voksne.',
    bullets: ['Barnepass', 'Samvær med dyr', 'Aktiviteter', 'Tilpasset flyt mellom ute og inne'],
  },
] as const;

const galleryImgs = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1600',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=85&w=1200',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=85&w=1200',
] as const;

const faqs = [
  {
    q: 'Kan vi kombinere flere fasiliteter i samme opplegg?',
    a: 'Ja. Vi setter sammen et løp som passer dagen deres, og kombinerer fasiliteter etter behov og budsjett.',
  },
  {
    q: 'Er lokalet universelt utformet?',
    a: 'Ja, vi legger vekt på at lokalet skal være tilgjengelig for gjester med ulike behov.',
  },
  {
    q: 'Har dere parkering og lademuligheter?',
    a: 'Ja, vi har gratis parkering og mulighet til å lade. Det kan også avtales å la bilen stå igjen.',
  },
  {
    q: 'Hvordan booker vi fasiliteter hos dere?',
    a: 'Send forespørsel med dato, type arrangement og antall gjester. Vi følger opp med forslag.',
  },
] as const;

export const FacilitiesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryHasOverflow, setGalleryHasOverflow] = useState(false);
  const [showGalleryLeft, setShowGalleryLeft] = useState(false);
  const [showGalleryRight, setShowGalleryRight] = useState(true);

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
    <div className="flex flex-col bg-white">
      <section className="section-viewport section-viewport-hero relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=2000"
            alt=""
            className="h-full w-full scale-105 object-cover brightness-[0.42]"
            referrerPolicy="no-referrer"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/[0.62]" aria-hidden />
        </div>
        <div className="section-viewport-scroll relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-6 text-center text-white">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75 }} className="flex w-full flex-col items-center space-y-7 md:space-y-9">
            <div className="flex flex-col items-center gap-4">
              <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.45em] text-white/75 md:text-xs">
                <span className="h-px w-8 bg-white/40" aria-hidden />
                Fasiliteter
                <span className="h-px w-8 bg-white/40" aria-hidden />
              </span>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-5xl font-serif text-6xl leading-[0.9] tracking-tighter text-balance md:text-9xl">
                Alt på ett sted.
                <span className="mt-2 block font-serif italic text-brand-200 sm:mt-3">For hele feiringen.</span>
              </motion.h1>
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.45 }} className="flex w-full flex-col items-stretch justify-center gap-4 pt-1 sm:flex-row sm:items-center sm:gap-6">
              <Link to={CTA_SECONDARY} className="rounded-full bg-white px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-brand-900 shadow-xl transition hover:bg-brand-50">
                Book nå
              </Link>
              <Link to={CTA_PRIMARY} className="rounded-full border-2 border-white/35 bg-white/5 px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-white backdrop-blur-[2px] transition hover:bg-white/10">
                Send forespørsel
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section aria-labelledby="facilities-cards-heading" className="section-viewport border-b border-brand-200/80 bg-linear-to-b from-white via-brand-50/50 to-brand-100/40">
        <div className="section-viewport-scroll mx-auto w-full max-w-[1800px] px-5 py-14 md:px-10 md:py-20 lg:px-14 lg:py-24">
          <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-5xl">
              <motion.h2
                id="facilities-cards-heading"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(SECTION_H2_CLASS, 'text-balance')}
              >
                Fra forberedelser til siste dans —{' '}
                <span className="italic text-brand-700">én plass, mange muligheter.</span>
              </motion.h2>
            </div>
            {facilitiesHasOverflow && (
              <p className="shrink-0 text-xs font-medium uppercase tracking-[0.16em] text-brand-500 md:text-right">
                <span className="hidden sm:inline">Piler eller sveip</span>
                <span className="sm:hidden">Sveip</span>
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
                    aria-label="Forrige fasiliteter"
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
                    aria-label="Neste fasiliteter"
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
                className="scrollbar-facilities -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-5 scroll-pr-5 px-5 pb-4 pt-2 md:mx-0 md:gap-8 md:scroll-pl-8 md:scroll-pr-8 md:px-8 md:pb-5"
              >
                {FACILITY_CARDS.map((item, i) => (
                  <motion.article
                    key={item.title}
                    role="listitem"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.04, 0.24) }}
                    className="group flex w-[min(100%,20.5rem)] shrink-0 snap-center snap-always flex-col overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm outline-none transition-shadow duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-brand-900/20 sm:w-[min(100%,22rem)] md:w-[min(100%,24rem)] lg:w-[min(100%,26rem)]"
                  >
                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-brand-100">
                      <img
                        src={item.img}
                        alt={item.imgAlt}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-1 flex-col border-t border-brand-100 bg-white px-5 py-5 md:px-6 md:py-6">
                      <h4 className="font-serif text-xl leading-snug tracking-tight text-brand-950 md:text-[1.35rem]">{item.title}</h4>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-800 md:text-base md:leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
        </div>
      </section>

      <section aria-labelledby="facilities-usecases-heading" className="section-viewport relative overflow-hidden border-b border-brand-800 bg-brand-900 px-4 text-white">
        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[1800px] px-5 py-14 sm:px-8 sm:py-16 md:px-14 md:py-16 lg:px-16 xl:px-20">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2 id="facilities-usecases-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={SECTION_H2_ON_DARK_CLASS}>
              Slik kan fasilitetene <span className="italic text-brand-400">brukes i praksis</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {useCases.map((u, i) => (
              <motion.div key={u.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-4/3 overflow-hidden rounded-lg border border-white/28">
                <img src={u.img} alt={u.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-65 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-linear-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex h-full min-h-0 flex-col p-5 sm:p-6">
                  <div className="mb-5 inline-flex w-fit rounded-full border border-white/25 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">{u.tag}</span>
                  </div>
                  <h3 className="mt-auto shrink-0 font-display text-2xl uppercase tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]">{u.title}</h3>
                  <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-white/95 opacity-0 transition-all duration-500 group-hover:opacity-100">{u.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="facilities-packages-heading" className="section-viewport relative overflow-hidden border-b border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50">
        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-5 py-16 sm:px-8 sm:py-20 md:px-14 md:py-24 lg:px-16 xl:px-20">
          <div className="mb-10 max-w-2xl space-y-4 md:mb-12 md:space-y-5">
            <h2 id="facilities-packages-heading" className={cn(SECTION_H2_CLASS, 'text-balance')}>Velg nivå for fasiliteter</h2>
            <p className="max-w-2xl text-base leading-relaxed text-brand-700 md:text-lg md:leading-relaxed">Tre utgangspunkt som justeres i dialog med dere.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3 lg:items-stretch">
            {packages.map((pkg, i) => {
              const featured = Boolean(pkg.featured);
              return (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className={cn('flex h-full flex-col rounded-2xl border p-6 shadow-[0_14px_34px_-24px_rgba(33,24,22,0.45)] md:p-8', featured ? 'border-brand-800 bg-brand-900 text-white' : 'border-brand-200/90 bg-white text-brand-900')}>
                  <p className={cn('mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]', featured ? 'text-brand-400' : 'text-brand-500')}>{pkg.detail}</p>
                  <h3 className={cn('font-serif text-2xl tracking-tight md:text-[1.65rem]', featured ? 'text-white' : 'text-brand-950')}>{pkg.name}</h3>
                  <p className={cn('mt-3 font-serif text-2xl md:text-3xl', featured ? 'text-brand-100' : 'text-brand-900')}>{pkg.price}</p>
                  <p className={cn('mt-4 text-[15px] leading-relaxed md:text-base', featured ? 'text-brand-100' : 'text-brand-700')}>{pkg.fit}</p>
                  <div className={cn('my-6 h-px w-full', featured ? 'bg-brand-700' : 'bg-brand-200')} />
                  <ul className="m-0 grow space-y-3 pl-0">
                    {pkg.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className={cn('mt-0.5 shrink-0', featured ? 'text-brand-400' : 'text-brand-600')} aria-hidden />
                        <span className={cn('text-[15px] leading-relaxed', featured ? 'text-brand-100' : 'text-brand-800')}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-viewport relative overflow-hidden border-b border-brand-100 bg-white">
        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-24 md:px-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-3xl">
            <h2 className={cn(SECTION_H2_CLASS, 'mb-6')}>Fasiliteter i bilder</h2>
            <p className="text-lg leading-relaxed text-brand-600 md:text-xl">Et lite innblikk i rom, stemning og muligheter hos oss.</p>
          </motion.div>
          <div className="relative">
            {galleryHasOverflow && (
              <>
                <button type="button" onClick={() => scrollGallery('left')} disabled={!showGalleryLeft} className={cn('absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors md:left-4 md:h-12 md:w-12', showGalleryLeft ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white' : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70')}>
                  <ArrowLeft size={20} />
                </button>
                <button type="button" onClick={() => scrollGallery('right')} disabled={!showGalleryRight} className={cn('absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition-colors md:right-4 md:h-12 md:w-12', showGalleryRight ? 'border-white/60 bg-white/85 text-brand-900 hover:border-brand-900 hover:bg-brand-900 hover:text-white' : 'cursor-not-allowed border-brand-200/80 bg-white/50 text-brand-300 opacity-70')}>
                  <ArrowRight size={20} />
                </button>
              </>
            )}
            <div ref={galleryRef} className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 md:mx-0 md:gap-8 md:px-0 md:pb-10">
              {galleryImgs.map((src, i) => (
                <motion.div key={src} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }} className="group relative aspect-6/7 min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]">
                  <img src={src} alt={`Fasiliteter ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-900/75 via-brand-900/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-85" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <div className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/85">
                      <Sparkles size={12} aria-hidden />
                      Galleri
                    </div>
                    <p className="font-serif text-lg text-white md:text-xl">Fasiliteter {i + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-viewport relative overflow-hidden border-b border-brand-100 bg-brand-50/50">
        <div className="section-viewport-scroll relative z-10 mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="mb-10 text-center md:mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={cn(SECTION_H2_CLASS, 'mb-4')}>
              Ofte stilte <span className="italic text-brand-600">spørsmål</span>
            </motion.h2>
            <div className="mx-auto h-px w-16 bg-brand-200" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq.q} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={cn('overflow-hidden rounded-md border transition-all duration-500', openFaq === i ? 'border-brand-200 bg-white shadow-md' : 'border-brand-100 bg-white/40 hover:border-brand-200 hover:bg-white/60')}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-4">
                  <span className={cn('font-serif text-lg transition-colors duration-300 md:text-xl', openFaq === i ? 'text-brand-900' : 'text-brand-800 group-hover:text-brand-900')}>{faq.q}</span>
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500', openFaq === i ? 'rotate-180 border-brand-900 bg-brand-900 text-white' : 'border-brand-200 text-brand-400 group-hover:border-brand-400 group-hover:text-brand-900')}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5 }}>
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

      <section className="section-viewport px-8 md:px-20">
        <div className="section-viewport-scroll py-8 md:py-12">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative mx-auto max-w-[1800px] overflow-hidden rounded-xl bg-brand-900 px-6 py-14 text-center text-white shadow-2xl sm:px-10 sm:py-16 md:px-14 md:py-20">
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_40%,white_0%,transparent_35%),radial-gradient(circle_at_70%_60%,white_0%,transparent_35%)]" />
            </div>
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-100">Fasiliteter</div>
              </div>
              <h3 className="mb-4 font-serif text-4xl leading-tight text-balance md:text-5xl lg:text-6xl">
                Klar for å se hva som
                <span className="block italic text-brand-300">passer deres dag?</span>
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-brand-100 md:text-lg">
                Fortell oss hva dere planlegger, så setter vi sammen et opplegg med riktige fasiliteter.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Link to={CTA_PRIMARY} className="group rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-brand-900 transition-all hover:bg-brand-50 hover:shadow-xl">
                  Send forespørsel
                </Link>
                <Link to={CTA_SECONDARY} className="rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10">
                  Se kontakt
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

