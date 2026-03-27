import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BOOKING_URL } from '../lib/booking';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  LayoutGrid,
  MapPin,
  MessageSquare,
  PartyPopper,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  Utensils,
} from 'lucide-react';

const CTA_PRIMARY = '/inquiry';
const CTA_SECONDARY = '/contact';

export const CorporatePage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [gLeft, setGLeft] = useState(false);
  const [gRight, setGRight] = useState(true);
  const [occasionSlide, setOccasionSlide] = useState(0);
  const [occasionCols, setOccasionCols] = useState(1);

  useEffect(() => {
    const updateCols = () => {
      if (typeof window === 'undefined') return;
      if (window.matchMedia('(min-width: 1024px)').matches) setOccasionCols(3);
      else if (window.matchMedia('(min-width: 768px)').matches) setOccasionCols(2);
      else setOccasionCols(1);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  useEffect(() => {
    const el = galleryRef.current;
    const onScroll = () => {
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const t = 8;
      setGLeft(scrollLeft > t);
      setGRight(scrollLeft < scrollWidth - clientWidth - t);
    };
    el?.addEventListener('scroll', onScroll);
    onScroll();
    window.addEventListener('resize', onScroll);
    return () => {
      el?.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollGallery = (dir: 'left' | 'right') => {
    if (!galleryRef.current) return;
    const w = galleryRef.current.clientWidth;
    galleryRef.current.scrollBy({ left: dir === 'left' ? -w * 0.85 : w * 0.85, behavior: 'smooth' });
  };

  const quickFit = [
    {
      title: 'Julebord',
      desc: 'En kveld kollegene faktisk gleder seg til: varm stemning, tydelig flyt og plass til både tradisjon og litt ekstra på desserten.',
      icon: Sparkles,
    },
    {
      title: 'Teambuilding',
      desc: 'Ut av møterommet og inn i et sted der folk senker skuldrene — ideelt når dere vil bygge tillit og fellesskap, ikke bare agenda.',
      icon: Users,
    },
    {
      title: 'Firmamiddag',
      desc: 'Vertskap og lokaler med sjel — når dere vil vise frem bedriften uten at det føles som «enda en konferansemiddag».',
      icon: Utensils,
    },
    {
      title: 'Feiringer',
      desc: 'Jubileum, milepæl eller intern høytid: vi legger til rette for taler, latter og fest — slik at dagen føles som deres, ikke en mal.',
      icon: PartyPopper,
    },
  ];

  const whyPoints = [
    'Personlig ramme fremfor hotell og anonyme konferansesaler',
    'Opplegg som tilpasses dato, format og antall gjester',
    'Like naturlig til middag og mingling som til mer formelle sammenkomster',
    'Rolige omgivelser som løfter både fokus og feststemning',
    'Én destinasjon — fra ankomst til siste toast',
    'Vertskap som gjør det enklere å lykkes på dagen',
  ];

  const eventTypes = [
    {
      title: 'Julebord',
      tag: 'Festlig',
      headline: 'Der tradisjon møter fellesskap',
      desc: 'Tradisjon og varme i historiske lokaler.',
      img: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=85&w=1200',
    },
    {
      title: 'Sommerfest',
      tag: 'Sosialt',
      headline: 'Sommerstemning — ute og inne',
      desc: 'Ute og inne — en hel dag eller kveld.',
      img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=85&w=1200',
    },
    {
      title: 'Kick-off',
      tag: 'Energi',
      headline: 'Start året med oversikt og driv',
      desc: 'Start året eller prosjektet med oversikt og driv.',
      img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=85&w=1200',
    },
    {
      title: 'Teamdag',
      tag: 'Fleksibelt',
      headline: 'Samlet utenfor kontorveggen',
      desc: 'Mingling, workshop og mat i ett løp.',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1200',
    },
    {
      title: 'Firmamiddag',
      tag: 'Formelt',
      headline: 'Middag som gjør inntrykk',
      desc: 'Representativt når det trengs — varmt når dere vil.',
      img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1200',
    },
    {
      title: 'Ledersamling',
      tag: 'Konfidensielt',
      headline: 'Ro til fokus og gode beslutninger',
      desc: 'Ro til fokus og gode samtaler.',
      img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200',
    },
    {
      title: 'Kundeevent',
      tag: 'Profesjonelt',
      headline: 'Vertskap som bærer merkevaren deres',
      desc: 'Vertskap som støtter deres merkevare.',
      img: 'https://images.unsplash.com/photo-1540575861501-7c90b707a27d?auto=format&fit=crop&q=85&w=1200',
    },
    {
      title: 'Jubileum',
      tag: 'Minneverdig',
      headline: 'Feiring som står til anledningen',
      desc: 'Feiring som matcher anledningen.',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1200',
    },
  ];

  const occasionNext = () => {
    setOccasionSlide((i) => (i + 1) % eventTypes.length);
  };

  const corporateFacilities = [
    {
      title: 'Barnrom',
      description:
        'Rom til lek for barn som er med på arrangementet — nær hovedlokalene slik at foreldre slipper lange avstander. Tilgjengelighet og opplegg avklares ved booking.',
      img: 'https://images.unsplash.com/photo-1587654780294-95205e9b8adb?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'AV og Wi‑Fi',
      description:
        'Storskjerm til presentasjoner og felles visning, lyd for tale og musikk. Trådløst nett. Utvidet utstyr etter avtale.',
      img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Kjøkken',
      description: 'Profesjonelt kjøkken for caterer: ovner, kjøl, oppvask og benkeplass.',
      img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Parkering',
      description: 'Parkering for gjester og leverandører ved lokalet.',
      img: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Uteplass',
      description: 'Uteareal ved godt vær. Toaletter tilpasset større grupper.',
      img: 'https://images.unsplash.com/photo-1464366400608-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Spill og møte',
      description:
        'Rom for lek og spill ved teamdag og mingling — også ute når det passer. Flipover, notat og enkel workshop-rigg etter avtale.',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const processSteps = [
    {
      n: '01',
      title: 'Send forespørsel',
      desc: 'Fortell om dato, antall og type arrangement.',
    },
    {
      n: '02',
      title: 'Vi avklarer opplegget',
      desc: 'Sammen finner vi format som passer gruppen.',
    },
    {
      n: '03',
      title: 'Planlegg detaljer',
      desc: 'Timing, rombruk og praktiske behov på plass.',
    },
    {
      n: '04',
      title: 'Gjennomfør trygt',
      desc: 'Dere møter et gjennomtenkt sted — klart for gjester.',
    },
  ];

  const packages = [
    {
      name: 'Lokalleie',
      price: 'På forespørsel',
      priceDetail: 'Tilbud etter samtale',
      fit: 'For dere som vil styre leverandører selv.',
      bullets: ['Eksklusiv bruk av avtalte lokaler', 'Grunnleggende bord og stoler', 'Avtalt tidsramme'],
    },
    {
      name: 'Fleksibelt opplegg',
      price: 'På forespørsel',
      priceDetail: 'Tilpasses behov',
      fit: 'Når dere ønsker sted pluss utvalgt støtte.',
      bullets: ['Tilpasset rigg og plan', 'Koordinering med oss', 'Kan utvides etter behov'],
      featured: true,
    },
    {
      name: 'Skreddersøm',
      price: 'Individuelt',
      priceDetail: 'Etter omfang',
      fit: 'Når alt skal på plass rundt arrangementet.',
      desc: 'Vi hjelper med helheten — fra idé til gjennomføring.',
      bullets: ['Dialog om konsept og budsjett', 'Samarbeid med leverandører', 'Oppfølging på dagen'],
    },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1600',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1200',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=85&w=1200',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=85&w=1200',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200',
  ];

  const practical = [
    {
      label: 'Kapasitet',
      value:
        'Inntil ca. 120 gjester ved selskap i låven — vi avklarer oppsett, flyt og tekniske behov sammen med dere.',
      Icon: Users,
    },
    {
      label: 'Opplegg',
      value:
        'Fleksibel bruk av låve, uteområder og sosiale soner — fra mingling og middag til taler og fest.',
      Icon: LayoutGrid,
    },
    {
      label: 'Parkering',
      value: 'God plass til biler på området — enkelt for kolleger, gjester og leverandører.',
      Icon: Car,
    },
    {
      label: 'Beliggenhet',
      value: 'Rolig gårdsramme med kort kjørevei fra Oslo og Drammen — destinasjon i én pakke.',
      Icon: MapPin,
    },
    {
      label: 'Omvisning',
      value: 'Vi viser dere lokalet og gjennomgår muligheter og praktisk — uforpliktende og tilpasset deres behov.',
      Icon: Eye,
    },
    {
      label: 'Tilpasning',
      value: 'Dato, varighet, rigg og vertskap tilpasses deres format og budsjett — ikke ferdig «hotellpakke».',
      Icon: SlidersHorizontal,
    },
  ] as const;

  const trust = [
    {
      title: 'Tydelig dialog',
      desc: 'Dere vet hva som gjelder — før, under og etter.',
    },
    {
      title: 'Fleksibel rigg',
      desc: 'Opplegg som kan skaleres etter type selskap.',
    },
    {
      title: 'Minneverdig sted',
      desc: 'Gjester husker mer enn «enda et møterom».',
    },
  ];

  const faqs = [
    {
      q: 'Hvilke typer bedriftsarrangement passer stedet for?',
      a: 'Blant annet julebord, sommerfest, kick-off, teamdag, firmamiddag, ledersamling, kundearrangement og feiringer. Vi avklarer kapasitet og format i dialog med dere.',
    },
    {
      q: 'Passer det for julebord?',
      a: 'Ja. Mange velger oss nettopp for julebord — god plass, tydelig flyt og varm atmosfære.',
    },
    {
      q: 'Kan opplegget tilpasses vårt arrangement?',
      a: 'Ja. Vi setter opp rom, tid og praktiske detaljer ut fra type selskap og antall gjester.',
    },
    {
      q: 'Kan vi komme på omvisning?',
      a: 'Absolutt. Ta kontakt så finner vi et tidspunkt som passer.',
    },
    {
      q: 'Hvordan sender vi forespørsel?',
      a: 'Bruk skjemaet vårt — beskriv dato, omtrentlig antall og hva dere planlegger. Vi tar kontakt med forslag.',
    },
    {
      q: 'Kan alt skreddersømmes?',
      a: 'Vi tilbyr alt fra ren lokalleie til mer helhetlig opplegg. Dere bestemmer nivået.',
    },
    {
      q: 'Er det parkering?',
      a: 'Ja, det er gode parkeringsmuligheter i tilknytning til gården.',
    },
    {
      q: 'Hva skjer etter at vi har meldt interesse?',
      a: 'Vi bekrefter mottak, avklarer behov og foreslår neste steg — ofte samtale eller omvisning.',
    },
  ];

  return (
    <div className="flex flex-col bg-[#faf9f7]">
      {/* 1 Hero — samme mønster som WeddingsPage: fullskjerm, bilde, gradient, sentrert innhold */}
      <section className="section-viewport section-viewport-hero relative flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=2000"
            alt="Bedriftsarrangement på Rønningen"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-900/60 via-brand-900/20 to-brand-900/70" />
          <div className="absolute inset-0 z-10 bg-brand-400/10 mix-blend-overlay" />
        </div>
        <div className="section-viewport-scroll relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 py-6 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-block font-sans text-lg uppercase tracking-widest text-white/80 md:text-xl"
          >
            Bedrift
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-display text-4xl uppercase leading-[1.05] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl"
          >
            En bedre ramme for <br className="hidden sm:block" />
            bedriftens arrangementer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="mx-auto mb-12 max-w-2xl font-sans text-lg font-light leading-relaxed opacity-90 md:text-xl md:leading-relaxed"
          >
            Fra julebord og teamdager til firmamiddager og feiringer — et sted som oppleves varmt, profesjonelt og minneverdig.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mb-16 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <Link
              to={CTA_PRIMARY}
              className="w-full rounded-full bg-white px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-brand-900 shadow-xl transition-all hover:bg-brand-50 sm:w-auto"
            >
              Send forespørsel
            </Link>
            <Link
              to={CTA_SECONDARY}
              className="w-full rounded-full border-2 border-white/30 bg-transparent px-10 py-5 text-center text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Book omvisning
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-[0.3em] opacity-75 md:gap-x-14 md:text-xs"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} aria-hidden />
              Ideelt til julebord
            </span>
            <span className="flex items-center gap-2">
              <Target size={14} aria-hidden />
              Fleksibelt opplegg
            </span>
            <span className="flex items-center gap-2">
              <MessageSquare size={14} aria-hidden />
              Personlig oppfølging
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} aria-hidden />
              Vakre omgivelser
            </span>
          </motion.div>
        </div>
      </section>

      {/* Fit + why — editorial: white field, one framed split, calm why block */}
      <section aria-labelledby="corporate-fit-why-heading" className="section-viewport border-b border-brand-100 bg-white">
        <div className="section-viewport-scroll mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28 xl:px-16">
          <div className="mb-10 grid grid-cols-1 items-start gap-10 lg:mb-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <motion.header
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[40rem] lg:max-w-none lg:pt-2"
            >
              <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80">
                Derfor Rønningen
              </span>
              <h2
                id="corporate-fit-why-heading"
                className="text-balance font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-6xl lg:text-7xl xl:text-8xl"
              >
                Der teamet og merkevaren møtes — <br className="hidden md:block" />
                tydelig kvalitet, ekte atmosfære
              </h2>
              <p className="mt-6 font-sans text-lg font-light leading-relaxed text-brand-600">
                Dere slipper anonyme konferansesaler og generiske pakker. Hos oss får dere én destinasjon der møte, mingling og fest henger naturlig sammen — med fleksibel plan, trygg gjennomføring og vertskap som gjør at både kolleger og gjester føler seg ivaretatt.
              </p>
            </motion.header>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full"
            >
              <figure className="relative overflow-hidden rounded-2xl border border-brand-200/70 bg-brand-100 shadow-[0_28px_70px_-32px_rgba(33,24,22,0.35)] lg:rounded-[1.25rem]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-auto lg:min-h-[min(72vh,36rem,50dvh)] xl:min-h-[min(70vh,40rem,50dvh)]">
                  <img
                    src="https://images.unsplash.com/photo-1424847659532-6b64aba09edf?auto=format&fit=crop&q=85&w=1600"
                    alt="Selskapsmiddag og mingling — stemning egnet til bedriftsarrangement"
                    className="absolute inset-0 h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" aria-hidden />
                </div>
              </figure>
            </motion.div>
          </div>

          {/* Én ramme: bilde | bruksmåter (profesjonell split, ingen «to separate cards») */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-brand-200/70 bg-[#faf9f7] shadow-[0_1px_0_rgba(33,24,22,0.04)] lg:grid lg:grid-cols-2 lg:items-stretch lg:rounded-[1.25rem]"
          >
            <figure className="relative min-h-[17rem] sm:min-h-[22rem] lg:min-h-0 lg:h-full">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1800"
                alt="Selskapsmiddag og feststemning i lokalet"
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
                <p className="font-serif text-xl text-white md:text-2xl">Ett sted, én helhet</p>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/85">
                  Vi tilpasser rom, tid og flyt til deres arrangement — fra ankomst til siste kveld.
                </p>
              </figcaption>
            </figure>

            <div className="flex min-h-0 flex-col border-t border-brand-200/80 bg-white lg:border-l lg:border-t-0">
              <div className="border-b border-brand-100 px-6 py-5 md:px-8 md:py-6 lg:px-10">
                <h3 className="font-serif text-lg text-brand-900 md:text-xl">Fire anledninger — mange muligheter</h3>
                <p className="mt-2 max-w-md text-[13px] leading-[1.65] text-brand-600 md:text-[14px]">
                  Dette er ofte utgangspunktet når bedrifter kontakter oss. Dere står fritt til å kombinere, forkorte eller bygge noe helt eget rundt det.
                </p>
              </div>
              <ul className="flex flex-1 flex-col divide-y divide-brand-100" role="list">
                {quickFit.map((c, i) => (
                  <motion.li
                    key={c.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-10px' }}
                    transition={{ delay: i * 0.04, duration: 0.35 }}
                    className="group flex gap-4 px-6 py-5 transition-colors hover:bg-brand-50/60 md:gap-5 md:px-8 md:py-6 lg:px-10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-brand-200/90 bg-[#faf9f7] text-brand-800 transition group-hover:border-brand-300">
                      <c.icon size={18} strokeWidth={1.65} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="font-serif text-[1.05rem] leading-snug text-brand-900 md:text-lg">{c.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-brand-600 md:text-[15px]">{c.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 lg:mt-20"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-brand-950 px-6 py-8 text-white md:px-9 md:py-9 lg:rounded-[1.25rem] lg:px-11 lg:py-10">
              <header className="max-w-[42rem] border-b border-white/[0.08] pb-7 md:pb-8 lg:max-w-[46rem]">
                <p className="font-sans text-xl uppercase tracking-widest text-brand-400/90">Hvorfor Rønningen</p>
                <h3
                  id="corporate-why-heading"
                  className="mt-4 font-serif text-3xl leading-[0.95] tracking-tight text-white md:text-4xl lg:text-5xl"
                >
                  Mer enn et lokale — en helhet dere og gjestene deres merker
                </h3>
                <div className="mt-4 space-y-2.5 font-sans md:mt-5 md:space-y-3">
                  <p className="text-[15px] font-normal leading-snug text-white md:text-[1rem] md:leading-snug">
                    Vi bygger arrangement rundt dere — ikke omvendt.
                  </p>
                  <p className="text-[14px] font-light leading-[1.62] text-brand-100/82 md:text-[15px] md:leading-[1.65]">
                    Dere slipper generiske saler og stiv form. I stedet får dere ro, varme og tydelig oppfølging, tilpasset alt fra julebord og teamdag til ledersamling.
                  </p>
                </div>
              </header>
              <div role="region" aria-labelledby="corporate-why-list-heading" className="pt-7 md:pt-8">
                <h4
                  id="corporate-why-list-heading"
                  className="font-sans text-sm font-medium uppercase tracking-widest text-brand-400/90"
                >
                  Dette får dere hos oss
                </h4>
                <ul
                  className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-2.5"
                  role="list"
                >
                  {whyPoints.map((line) => (
                    <li key={line} className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-[15px] w-[15px] shrink-0 text-brand-400/90"
                        strokeWidth={1.85}
                        aria-hidden
                      />
                      <span className="text-[13px] leading-[1.45] text-brand-100/85 md:text-[14px] md:leading-snug">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bedriftsanledninger — referanse-inspirert karusell (portrettkort, pil = neste) */}
      <section
        aria-labelledby="corporate-occasions-heading"
        className="section-viewport border-b border-brand-100 bg-[#f2efe8]"
      >
        <div className="section-viewport-scroll mx-auto max-w-[1800px] px-5 py-16 md:px-10 md:py-24 lg:px-14 lg:py-24 xl:px-16">
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 max-w-2xl md:mb-12 lg:mb-14"
          >
            <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80">
              Bedriftsanledninger
            </span>
            <h2
              id="corporate-occasions-heading"
              className="font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-8xl"
            >
              Passer til ulike <br className="hidden sm:block" />
              bedriftsanledninger
            </h2>
            <p className="mt-6 font-sans text-lg font-light leading-relaxed text-brand-600">
              Bla for neste forslag — hvert kort er et utgangspunkt vi kan tilpasse sammen med dere.
            </p>
          </motion.header>

          <div className="flex items-stretch gap-3 md:gap-5 lg:gap-6">
            <button
              type="button"
              onClick={occasionNext}
              className="group flex shrink-0 flex-col items-center justify-center self-center rounded-none border-0 bg-transparent px-1 py-8 text-brand-800 transition hover:text-brand-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900 md:px-2"
              aria-label="Vis neste anledning"
            >
              <span className="flex h-px w-8 items-center bg-brand-800 transition group-hover:w-10 md:w-10" aria-hidden />
              <ArrowLeft
                className="-mt-px h-8 w-8 stroke-[1.15] md:h-9 md:w-9"
                strokeWidth={1.15}
                aria-hidden
              />
            </button>

            <div className="relative min-h-[min(72vw,22rem,45dvh)] min-w-0 flex-1 overflow-hidden md:min-h-[min(50vw,26rem,45dvh)] lg:min-h-[min(28rem,42dvh)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={occasionSlide}
                  role="group"
                  aria-roledescription="carousel"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{
                    duration: 1.4,
                    ease: [0.33, 0.65, 0.2, 1],
                  }}
                  className="absolute inset-0 grid h-full w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5"
                >
                  {Array.from({ length: occasionCols }, (_, j) => {
                    const e = eventTypes[(occasionSlide + j) % eventTypes.length];
                    return (
                      <article
                        key={`${occasionSlide}-${j}-${e.title}`}
                        className="relative aspect-3/5 min-h-[min(72vw,22rem,45dvh)] overflow-hidden rounded-sm shadow-sm md:min-h-[min(50vw,26rem,45dvh)] lg:min-h-[min(28rem,42dvh)]"
                      >
                        <img
                          src={e.img}
                          alt={e.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/45"
                          aria-hidden
                        />
                        <div className="absolute inset-x-0 top-0 p-5 md:p-6 lg:p-7">
                          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.38em] text-white/95 md:text-[11px]">
                            {e.tag}
                          </p>
                          <h3 className="mt-3 max-w-[14rem] font-serif text-2xl leading-[1.12] tracking-tight text-white md:mt-4 md:max-w-[16rem] md:text-3xl md:leading-[1.1]">
                            {e.headline}
                          </h3>
                          <p className="mt-3 max-w-[17rem] text-[13px] leading-relaxed text-white/80 md:text-sm">{e.desc}</p>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6 pt-16 md:pb-7 md:pt-20">
                          <Link
                            to={CTA_PRIMARY}
                            className="inline-flex min-w-[10rem] items-center justify-center bg-[#94856e] px-7 py-3.5 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-[#857660] md:min-w-[11rem] md:px-8 md:text-[11px]"
                          >
                            {e.title.toUpperCase()}
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Facilities — samme mønster som forsiden «Våre tjenester» (bildekort, hover) */}
      <section
        aria-labelledby="corporate-facilities-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-100/80 bg-[#F5F5F5] px-4"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] -right-[5%] h-[30%] w-[30%] rounded-full bg-brand-200/10 blur-[100px]" />
          <div className="absolute bottom-[10%] -left-[5%] h-[30%] w-[30%] rounded-full bg-brand-300/10 blur-[100px]" />
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-24 md:px-20">
          <div className="mb-12">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80"
            >
              Våre tjenester
            </motion.span>
            <motion.h2
              id="corporate-facilities-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-8xl"
            >
              Fasiliteter for bedrift
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-brand-600"
            >
              Hva som inngår følger avtalen — under er hovedpunktene for bedriftsarrangement hos oss.
            </motion.p>
          </div>

          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" role="list">
            {corporateFacilities.map((service, index) => (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-4/5 cursor-pointer overflow-hidden rounded-xl shadow-sm transition-all duration-500"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 flex h-full flex-col p-10">
                  <h3 className="mt-auto font-display text-4xl uppercase tracking-wide text-white transition-all duration-500 group-hover:mt-0">
                    {service.title}
                  </h3>

                  <div className="mt-6 flex-grow opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                    <p className="text-lg font-light leading-relaxed text-white">{service.description}</p>
                  </div>

                  <div className="mt-auto flex items-center gap-3 opacity-0 transition-opacity delay-200 duration-500 group-hover:opacity-100 group/btn">
                    <Link to={CTA_PRIMARY} className="contents">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 transition-colors group-hover/btn:bg-white group-hover/btn:text-[#4F9DA6]">
                        <ArrowRight size={18} aria-hidden />
                      </div>
                      <span className="text-sm font-medium uppercase tracking-wider text-white">Les mer</span>
                    </Link>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 Process */}
      <section className="section-viewport border-b border-brand-100 bg-white">
        <div className="section-viewport-scroll mx-auto max-w-[1800px] px-6 py-16 md:px-12 md:py-24 lg:px-16 xl:px-20">
          <header className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
            <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80">
              Prosessen
            </span>
            <h2 className="font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-8xl">
              Slik fungerer det
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-2xl border border-brand-200/80 bg-[#faf9f7] p-6 md:p-7"
              >
                {i < processSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-brand-200 lg:block" aria-hidden />
                )}
                <span className="font-serif text-3xl text-brand-300">{s.n}</span>
                <h3 className="mt-3 font-serif text-xl text-brand-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Packages — samme mønster som WeddingsPage «Våre Bryllupspakker» */}
      <section className="section-viewport relative overflow-hidden border-y border-brand-200/80 bg-gradient-to-b from-brand-100/70 via-brand-50 to-brand-100/50">
        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-24 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-3xl"
          >
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.3em] text-brand-500">Investeringen</span>
            <h2 className="mb-6 font-serif text-5xl leading-[0.95] tracking-tight text-brand-900 md:text-7xl">
              Våre bedriftspakker
            </h2>
            <p className="text-lg leading-relaxed text-brand-600 md:text-xl">
              Velg utgangspunktet som passer dere. Hver løsning kan tilpasses — slik at arrangementet blir enkelt og gjennomførbart for team og gjester.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {packages.map((pkg, i) => {
              const featured = !!pkg.featured;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex h-full flex-col rounded-xl border p-8 md:p-10 ${
                    featured
                      ? 'z-[1] border-brand-800 bg-brand-900 text-white shadow-2xl shadow-brand-900/35 ring-2 ring-brand-400/25'
                      : 'border-2 border-brand-300/90 bg-white text-brand-900 shadow-lg shadow-brand-900/[0.06] ring-1 ring-brand-900/[0.04]'
                  }`}
                >
                  {featured && (
                    <div className="absolute right-5 top-5 rounded-full bg-brand-700 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                      Mest populær
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className={`mb-3 font-serif text-2xl md:text-3xl ${featured ? 'text-white' : 'text-brand-900'}`}>
                      {pkg.name}
                    </h3>
                    <div className="mb-4 flex items-end gap-2">
                      <span className={`font-display text-4xl leading-none ${featured ? 'text-brand-100' : 'text-brand-900'}`}>
                        {pkg.price}
                      </span>
                      <span className={`text-xs uppercase tracking-[0.16em] ${featured ? 'text-brand-200' : 'text-brand-500'}`}>
                        {pkg.priceDetail}
                      </span>
                    </div>
                    <p className={`text-base leading-relaxed ${featured ? 'text-brand-100' : 'text-brand-700'}`}>{pkg.fit}</p>
                    {pkg.desc && (
                      <p className={`mt-2 text-sm leading-relaxed ${featured ? 'text-brand-200' : 'text-brand-600'}`}>{pkg.desc}</p>
                    )}
                  </div>

                  <div className={`mb-7 h-px w-full ${featured ? 'bg-brand-700' : 'bg-brand-300/80'}`} />

                  <ul className="mb-8 grow space-y-4">
                    {pkg.bullets.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`mt-0.5 shrink-0 ${featured ? 'text-brand-300' : 'text-brand-600'}`}>
                          <CheckCircle2 size={18} strokeWidth={2.25} />
                        </div>
                        <span className={`text-[15px] leading-relaxed ${featured ? 'text-brand-100' : 'text-brand-800'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors ${
                      featured ? 'bg-white text-brand-900 hover:bg-brand-100' : 'bg-brand-900 text-white hover:bg-brand-800'
                    }`}
                  >
                    Book nå
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm italic text-brand-500">
              * Priser er veiledende. Endelig tilbud utarbeides etter en uforpliktende samtale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8 Gallery */}
      <section className="section-viewport border-b border-brand-100 bg-white">
        <div className="section-viewport-scroll mx-auto max-w-[1800px] px-6 py-16 md:px-12 md:py-24 lg:px-16 xl:px-20">
          <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80">
                Galleri
              </span>
              <h2 className="font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-6xl lg:text-7xl xl:text-8xl">
                Se lokalet i bruk
              </h2>
              <p className="mt-6 max-w-xl font-sans text-lg font-light leading-relaxed text-brand-600">
                Stemning fra selskap, mingling og kveld — ikke bare «tomme rom».
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollGallery('left')}
                disabled={!gLeft}
                className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm md:h-12 md:w-12 ${
                  gLeft ? 'border-brand-200 bg-white hover:bg-brand-900 hover:text-white' : 'cursor-not-allowed opacity-40'
                }`}
                aria-label="Forrige"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => scrollGallery('right')}
                disabled={!gRight}
                className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-sm md:h-12 md:w-12 ${
                  gRight ? 'border-brand-200 bg-white hover:bg-brand-900 hover:text-white' : 'cursor-not-allowed opacity-40'
                }`}
                aria-label="Neste"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              ref={galleryRef}
              className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:gap-6"
            >
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className={`shrink-0 snap-center overflow-hidden rounded-2xl border border-brand-100 bg-brand-50 shadow-sm ring-1 ring-brand-900/5 ${
                    i === 0 ? 'w-[min(92vw,720px)] md:w-[56%]' : 'w-[min(78vw,380px)] md:w-[32%]'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className={`w-full object-cover ${i === 0 ? 'aspect-[16/10] min-h-[220px] md:min-h-[340px]' : 'aspect-[4/5] lg:aspect-[3/4]'}`}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-brand-500">
            <Link to="/gallery" className="font-semibold text-brand-900 underline decoration-brand-300 underline-offset-4 hover:text-brand-700">
              Åpne fullt bildegalleri
            </Link>
          </p>
        </div>
      </section>

      {/* 9 Practical */}
      <section className="section-viewport relative overflow-hidden border-b border-brand-100 bg-[#faf9f7]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          aria-hidden
        >
          <div className="absolute -right-[20%] top-[20%] h-[min(50vw,28rem)] w-[min(50vw,28rem)] rounded-full bg-brand-200/25 blur-[100px]" />
          <div className="absolute -left-[15%] bottom-[10%] h-[35%] w-[45%] rounded-full bg-brand-100/60 blur-[90px]" />
        </div>
        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-6 py-16 md:px-12 md:py-24 lg:px-16 xl:px-20">
          <header className="mb-8 max-w-3xl md:mb-10">
            <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80">
              Praktisk
            </span>
            <h2 className="font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-7xl lg:text-8xl">
              Praktisk informasjon
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-600 md:mt-6 md:text-lg">
              Det dere trenger å vite før dere booker — kort, tydelig og tilpasset bedriftsarrangement hos oss.
            </p>
          </header>
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-5 lg:grid-cols-3" role="list">
            {practical.map((row, i) => {
              const ItemIcon = row.Icon;
              return (
              <motion.li
                key={row.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-brand-200/90 bg-white/90 p-5 shadow-[0_1px_0_rgba(33,24,22,0.04)] backdrop-blur-[2px] transition-shadow duration-300 hover:border-brand-300/90 hover:shadow-md md:p-6"
              >
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-200/80 bg-brand-50 text-brand-800 transition-colors group-hover:border-brand-300 group-hover:bg-white">
                    <ItemIcon size={22} strokeWidth={1.65} aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-500">{row.label}</p>
                    <p className="mt-2 text-[15px] leading-[1.65] text-brand-800 md:text-[15.5px]">{row.value}</p>
                  </div>
                </div>
              </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 10 Trust */}
      <section className="section-viewport border-b border-brand-100 bg-white">
        <div className="section-viewport-scroll mx-auto max-w-[1800px] px-6 py-16 md:px-12 md:py-20 lg:px-16 xl:px-20">
          <header className="mx-auto mb-10 max-w-4xl text-center md:mb-12">
            <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80">
              Trygghet
            </span>
            <h2 className="font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-8xl">
              Det bedrifter ofte vektlegger
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {trust.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-brand-100 bg-[#faf9f7] p-8 text-center"
              >
                <MessageSquare className="mx-auto mb-4 h-8 w-8 text-brand-600 opacity-80" />
                <h3 className="font-serif text-xl text-brand-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-600">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 FAQ */}
      <section className="section-viewport border-b border-brand-100 bg-[#f3f1ee]">
        <div className="section-viewport-scroll mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
          <header className="mb-10 text-center md:mb-12">
            <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-brand-900 opacity-80">
              FAQ
            </span>
            <h2 className="font-serif text-4xl leading-[0.9] tracking-tighter text-brand-900 md:text-6xl lg:text-7xl">
              Ofte stilte spørsmål
            </h2>
          </header>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="overflow-hidden rounded-xl border border-brand-200/80 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-brand-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={20} className="shrink-0 text-brand-500" /> : <ChevronDown size={20} className="shrink-0 text-brand-500" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-brand-100 px-5 py-4 text-sm leading-relaxed text-brand-600">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Final CTA */}
      <section className="section-viewport bg-brand-900 text-white">
        <div className="section-viewport-scroll mx-auto max-w-3xl px-6 py-16 text-center md:px-8 md:py-24">
          <span className="mb-4 block font-sans text-xl uppercase tracking-widest text-white/70">
            Neste steg
          </span>
          <h2 className="font-serif text-4xl leading-[0.9] tracking-tighter md:text-6xl lg:text-7xl">
            Planlegger dere bedriftsarrangement?
          </h2>
          <p className="mt-6 font-sans text-lg font-light leading-relaxed text-brand-200">
            Fortell kort hva dere tenker på — så hjelper vi dere med riktig opplegg for team, gjester eller kunder.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={CTA_PRIMARY}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-900 shadow-lg transition hover:bg-brand-50 sm:w-auto"
            >
              Send forespørsel
            </Link>
            <Link
              to={CTA_SECONDARY}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/35 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white/10 sm:w-auto"
            >
              Book omvisning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
