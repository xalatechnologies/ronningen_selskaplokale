import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Users, Heart, Sparkles, Camera, 
  Music, Utensils, Clock,
  ArrowRight, ArrowLeft, HelpCircle, MessageSquare,
  Wine, Car, ChevronDown, ChevronUp,
  GlassWater, PartyPopper
} from 'lucide-react';
import { cn } from '../lib/utils';
import { inspirationGallerySlides } from '../lib/inspirationGallery';
import { SECTION_H2_CLASS, SECTION_H2_ON_DARK_CLASS } from '../lib/typography';
import { HeroScrollHint } from '../components/HeroScrollHint';

export const WeddingsPage = () => {
  const GALLERY_EDGE_TOLERANCE = 2;
  const { t } = useTranslation();
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
    if (galleryRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
      if (direction === 'left' && scrollLeft <= GALLERY_EDGE_TOLERANCE) return;
      if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - GALLERY_EDGE_TOLERANCE) return;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      requestAnimationFrame(handleGalleryScroll);
      setTimeout(handleGalleryScroll, 320);
    }
  };

  const whyUs = [
    {
      number: "01",
      title: "Sjel & Atmosfære",
      desc: "En intim og autentisk ramme der historiske vegger møter moderne varme, og skaper en følelse av å komme hjem."
    },
    {
      number: "02",
      title: "Naturlig Idyll",
      desc: "Omgitt av et levende kulturlandskap som skaper en tidløs og organisk kulisse for deres mest dyrebare minner."
    },
    {
      number: "03",
      title: "Uendelig Fleksibilitet",
      desc: "Fra drømmende hageseremonier til storslåtte låvefester – vi former rommet og detaljene etter deres unike visjon."
    },
    {
      number: "04",
      title: "Skapt for Øyeblikk",
      desc: "Hver detalj er lagt til rette for at dere skal kunne senke skuldrene, være tilstede og feire kjærligheten fullt ut."
    }
  ];

  const dayFlow = [
    {
      title: "Vielse & fotografering",
      desc: "Vielse i hage eller låve, og tid til portretter i fint lys og fine omgivelser.",
      icon: <Users size={32} />
    },
    {
      title: "Middag & taler",
      desc: "Festmiddag med lokale råvarer og god plass til taler og toasts.",
      icon: <Utensils size={32} />
    },
    {
      title: "Kaffe & dessert",
      desc: "Kaffe og dessert i rolige fellesområder før kvelden tar over.",
      icon: <GlassWater size={32} />
    },
    {
      title: "Dans & feiring",
      desc: "Drikke og dans med god stemning utover kvelden.",
      icon: <PartyPopper size={32} />
    }
  ];

  const services = [
    {
      title: "Storkjøkken & catering",
      desc: `Dere står fritt til å ta med egen mat eller benytte vårt fullt utstyrte storkjøkken.

Vi samarbeider også med lokale cateringaktører som kan levere ferdig mat, eller stå for matlaging på stedet med erfarne kokker og serveringspersonell.`,
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      icon: <Utensils size={24} />
    },
    {
      title: "Fotografering",
      desc: "Anbefalte fotografer som kjenner både lyset og rommene her — fra portretter og vielse til fest og små øyeblikk dere vil huske.",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800",
      icon: <Camera size={24} />
    },
    {
      title: "Dekorasjon",
      desc: "Vi tilbyr fleksible dekorasjonsløsninger som kan tilpasses deres stil og uttrykk. Sammen med våre samarbeidspartnere kan vi skape en helhetlig og gjennomført atmosfære – fra bordpynt til dekorasjon av hele lokalet.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      icon: <Sparkles size={24} />
    },
    {
      title: "Bar & dansegulv",
      desc: "Dere står fritt til å ta med egen drikke og bruke barområdet. Med eget dansegulv ligger alt til rette for god stemning gjennom hele kvelden.",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
      icon: <Wine size={24} />
    },
    {
      title: "Lyd & Lys",
      desc: "Vi har et kraftig lydanlegg som passer perfekt til fest og musikk, kombinert med belysning som skaper riktig stemning gjennom hele arrangementet.",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
      icon: <Music size={24} />
    },
    {
      title: "Oppdekking & bordpynt",
      desc: "Ferdig oppdekket med duker, stoltrekk, servise, glass og det dere trenger på bordet — pluss bordpynt, menykort og små detaljer som binder det hele sammen. Vi avstemmer uttrykket med stilen på dagen deres, så gjestene møter komplette bord fra første minutt.",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      icon: <Utensils size={24} />
    }
  ];

  const packages = [
    {
      name: 'Lokalleie',
      tag: 'Grunnleggende',
      desc: 'For dere som ønsker å styre det meste selv og leie kun lokalene.',
      features: ['Eksklusiv tilgang hele helgen', 'Bord og stoler inkludert', 'Sluttrengjøring', 'Eget vertskap'],
    },
    {
      name: 'Fleksibel bryllupspakke',
      tag: 'Utvidet',
      desc: 'En solid grunnpakke som kan utvides med de tjenestene dere trenger.',
      features: ['Alt i lokalleie', 'Oppdekking og servise', 'Lyd og lys-pakke', 'Prosjektleder'],
    },
    {
      name: 'Skreddersydd løsning',
      tag: 'Full service',
      desc: 'Vi hjelper dere med alt fra A til Å for en trygg og bekymringsfri feiring.',
      features: ['Full planlegging', 'Catering og servering', 'Blomster og dekor', 'Koordinering på dagen'],
    },
  ];

  const faqs = [
    {
      q: "Har dere overnattingsmuligheter?",
      a: "Vi har ikke overnatting på selve gården, men det finnes flere hoteller og overnattingssteder kun 10-15 minutter unna."
    },
    {
      q: "Kan vi ta med egen drikke og mat?",
      a: "Ja. Vi har ingen korkavgift, så dere kan ta med egne drikkevarer. Mat og catering avklarer vi sammen med dere — enten via våre anbefalte samarbeidspartnere eller andre løsninger etter avtale."
    },
    {
      q: "Hvor mange gjester er det plass til?",
      a: "Vi har plass til inntil 250 gjester og muligheter for 200 ekstra i partitelt og bryllupslåve.",
    },
    {
      q: "Er det mulig med vielse på gården?",
      a: "Absolutt! Vi har flere vakre steder utendørs som egner seg perfekt for vielse, samt mulighet for innendørs vielse i låven."
    },
    {
      q: "Når får vi tilgang til lokalet?",
      a: "Ved helgeleie får dere normalt tilgang fra fredag formiddag for rigging og pynting."
    },
    {
      q: "Har dere mulighet for helikopterlanding i forbindelse med bryllup?",
      a: "Ja. Det kan avtales helikopterlanding hos oss i forbindelse med bryllup. Ta kontakt i god tid, så avklarer vi praktiske forhold, sikkerhet og eventuelle tillatelser sammen med dere og operatøren."
    }
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero */}
      <section className="hero-below-nav section-viewport section-viewport-hero relative flex min-h-0 flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-wedding-venue-night.png"
            alt="Selskapslokale om kvelden med varmt lys, stjernehimmel og feststemning"
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
              className="max-w-5xl text-balance font-serif text-6xl leading-[0.9] tracking-tighter text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.45)] md:text-9xl"
            >
              Bryllup i vakre og <br className="hidden md:block" /> unike omgivelser
            </motion.h1>
            <p className="mx-auto max-w-2xl text-xl font-light italic opacity-90 md:text-3xl [text-shadow:0_1px_24px_rgba(0,0,0,0.35)]">
              Skap en feiring som føles personlig, varm og minneverdig.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
              <Link
                to="/contact"
                className="w-full rounded-full bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-brand-900 shadow-2xl transition-all hover:-translate-y-1 hover:bg-brand-50 sm:w-auto"
              >
                Book nå
              </Link>
              <Link
                to="/contact"
                className="w-full rounded-full border-2 border-white bg-transparent px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                Send forespørsel
              </Link>
            </div>
          </motion.div>
        </div>

        <HeroScrollHint targetId="atmosfaeren" />
      </section>

      {/* Atmosfæren — samme bakgrunn og typografi som forsiden «Våre konsepter» for tydelig kontrast */}
      <section
        id="atmosfaeren"
        aria-labelledby="atmosfaeren-heading"
        className="section-viewport scroll-mt-24 relative overflow-hidden border-y border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50"
      >
        <div
          className="pointer-events-none absolute left-[6%] top-[10%] h-[min(44vw,26rem)] w-[min(44vw,26rem)] rounded-full bg-brand-300/20 blur-[90px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-[6%] right-[4%] h-[min(36vw,22rem)] w-[min(36vw,22rem)] rounded-full bg-brand-500/12 blur-[75px]"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-24 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-20 items-start">
            <div className="order-2 lg:order-1 max-w-3xl">
              <h2 id="atmosfaeren-heading" className={cn(SECTION_H2_CLASS, 'mb-6 text-balance')}>
                Vielse og fest <br /> på samme sted
              </h2>
              <p className="text-pretty text-base leading-relaxed text-brand-800/95 md:text-lg md:leading-relaxed">
                Historisk låv og lokaler med komfort og utstyr som holder i dag. Samme sted til vielse, mat og fest. Dere bestemmer rekkefølgen og stilen. Rolige omgivelser i kulturlandskap, kort vei mellom seremoni og dans. Vi hjelper dere med planlegging og gjennomføring slik at dere kan konsentrere dere om hverandre. Ta kontakt for omvisning og en prat om hvordan dagen kan legges opp hos oss.
              </p>
            </div>

            <figure className="order-1 lg:order-2 m-0 w-full">
              <div className="aspect-[3/4] w-full rounded-md border border-brand-100 bg-brand-50 shadow-lg sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-auto xl:h-[min(78vh,720px,50dvh)] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1600"
                  alt="Feiring og stemning på Rønningen — lokalet og omgivelsene"
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </figure>
          </div>

          <ul className="mt-16 md:mt-20 grid list-none grid-cols-1 gap-10 border-t border-brand-200/90 pt-12 sm:grid-cols-2 sm:gap-12 md:pt-14 lg:gap-14 m-0 p-0">
            {whyUs.map((item, i) => (
              <li key={i} className="flex gap-5 md:gap-6">
                <span
                  className="w-11 shrink-0 pt-0.5 text-right font-serif text-3xl tabular-nums leading-none text-brand-400 md:w-12 md:text-4xl"
                  aria-hidden
                >
                  {item.number}
                </span>
                <div className="min-w-0 border-l border-brand-300/90 pl-5 md:pl-6">
                  <h3 className="mb-2 font-serif text-xl tracking-tight text-brand-950 md:text-2xl md:leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-base leading-[1.7] text-brand-800 md:text-[17px]">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. What your day can look like - Visual Timeline */}
      <section className="section-viewport relative overflow-hidden bg-brand-900 text-white">
        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-20 md:px-20">
          <header className="relative mb-16">
            <div className="flex max-w-4xl flex-col gap-5 md:gap-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(SECTION_H2_ON_DARK_CLASS, 'm-0')}
              >
                <span className="block">Slik kan</span>
                <span className="mt-1 block pl-6 italic text-brand-400 sm:pl-10 md:pl-14 lg:pl-16">
                  dagen se ut
                </span>
              </motion.h2>
            </div>
          </header>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 z-0 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {dayFlow.map((item, i) => {
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="group relative h-[min(600px,50dvh)] min-h-[260px] overflow-hidden rounded-lg border border-white/28 transition-all duration-500 hover:border-white/45"
                  >
                    {/* Visual Background */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={i === 0 ? "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000" : 
                             i === 1 ? "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000" :
                             i === 2 ? "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000" :
                             "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000"} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-brand-950/50 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-75" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full p-12 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className="text-6xl font-serif tabular-nums text-brand-200 [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] transition-colors duration-500 group-hover:text-brand-100">
                            0{i + 1}
                          </span>
                          <div className="mt-4 h-px w-12 bg-brand-300/70 opacity-90 transition-all duration-500 group-hover:w-24 group-hover:bg-brand-200/80" />
                        </div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-brand-200 backdrop-blur-md transition-all duration-500 group-hover:border-white/40 group-hover:bg-white group-hover:text-brand-900">
                          {item.icon}
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="text-3xl font-serif tracking-tight leading-none">{item.title}</h3>
                        <p className="text-white/80 text-base font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5: Services — samme rutenett og kortformat som forsiden «Eksklusive Opplevelser» */}
      <section className="section-viewport relative overflow-hidden bg-[#F5F5F5] px-4">
        {/* Subtle Background Glows */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute top-[10%] -right-[5%] w-[30%] h-[30%] bg-brand-200/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-brand-300/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[1800px] px-5 py-14 sm:px-8 sm:py-16 md:px-14 md:py-16 lg:px-16 xl:px-20">
          <div className="mb-7 md:mb-8 lg:mb-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={SECTION_H2_CLASS}
            >
              {'Tilpasset deres '}
              <span className="italic text-brand-800">ønsker</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-5">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-black/10 transition-all duration-500 hover:border-black/20"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute inset-0 bg-gradient-to-br from-[#4F9DA6]/90 to-[#7B96A8]/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 flex h-full min-h-0 flex-col p-5 sm:p-6 md:p-7 lg:p-6">
                  <h3 className="mt-auto shrink-0 font-display text-2xl uppercase tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:mt-0 sm:text-3xl md:text-[1.85rem] lg:text-2xl lg:leading-tight xl:text-[1.75rem]">
                    {service.title}
                  </h3>

                  <div className="mt-3 flex-grow opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                    <p className="line-clamp-[10] whitespace-pre-line text-base font-normal leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.65)] sm:text-lg md:text-[1.125rem] md:leading-relaxed lg:line-clamp-[9]">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pakker — uten priser, tydelig tilbud etter samtale */}
      <section
        aria-labelledby="bryllupspakker-heading"
        className="section-viewport relative overflow-hidden border-y border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50"
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
            className="mb-10 max-w-2xl md:mb-12"
          >
            <h2 id="bryllupspakker-heading" className={cn(SECTION_H2_CLASS, 'mb-5')}>
              Våre bryllupspakker
            </h2>
            <p className="text-base leading-relaxed text-brand-700 md:text-lg md:leading-relaxed">
              Tre tydelige utgangspunkt — tilpasset dagen, ønskene og budsjettet deres.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-3 lg:gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex h-full flex-col rounded-2xl border p-8 md:p-9 ${
                  i === 1
                    ? 'z-[1] border-brand-800 bg-brand-900 text-white shadow-2xl shadow-brand-900/30 ring-2 ring-brand-400/20'
                    : 'border-brand-200/90 bg-white/95 text-brand-900 shadow-[0_1px_0_rgba(28,22,19,0.04)] ring-1 ring-brand-900/[0.04]'
                }`}
              >
                {i === 1 && (
                  <div className="absolute right-4 top-4 rounded-full bg-brand-700 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                    Mest populær
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      i === 1 ? 'text-brand-400' : 'text-brand-500'
                    }`}
                  >
                    {pkg.tag}
                  </p>
                  <h3 className={`font-serif text-2xl tracking-tight md:text-[1.65rem] ${i === 1 ? 'text-white' : 'text-brand-950'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mt-4 text-[15px] leading-relaxed md:text-base ${i === 1 ? 'text-brand-100' : 'text-brand-700'}`}>
                    {pkg.desc}
                  </p>
                </div>

                <div className={`mb-6 h-px w-full ${i === 1 ? 'bg-brand-700' : 'bg-brand-200'}`} />

                <ul className="mb-8 grow space-y-3.5">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`mt-0.5 shrink-0 ${i === 1 ? 'text-brand-400' : 'text-brand-600'}`}>
                        <CheckCircle2 size={18} strokeWidth={2.25} aria-hidden />
                      </div>
                      <span className={`text-[15px] leading-relaxed ${i === 1 ? 'text-brand-100' : 'text-brand-800'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                    i === 1
                      ? 'bg-white text-brand-900 hover:bg-brand-100'
                      : 'bg-brand-900 text-white hover:bg-brand-800'
                  }`}
                >
                  Be om tilbud
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Gallery - Editorial Style */}
      <section className="section-viewport relative overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-full overflow-hidden">
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-brand-100/20 blur-[150px] rounded-full"></div>
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-8 py-24 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-3xl"
          >
            <h2 className={cn(SECTION_H2_CLASS, 'mb-6')}>Inspirasjon og Galleri</h2>
            <p className="text-lg leading-relaxed text-brand-600 md:text-xl">
              Et lite utvalg fra tidligere bryllup hos oss.
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
              {inspirationGallerySlides.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.7 }}
                  className="group relative aspect-[6/7] min-w-[88%] snap-center overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl md:min-w-[46%] lg:min-w-[34%]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i > 4 ? 'lazy' : 'eager'}
                    decoding="async"
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



      {/* 8. FAQ - Editorial Style */}
      <section className="section-viewport relative overflow-hidden bg-brand-50/50">
        {/* Background Decorative Elements */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-[20%] h-[20%] bg-brand-200/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="section-viewport-scroll relative z-10 mx-auto max-w-3xl px-6 py-12 sm:px-8 md:py-16">
          <div className="text-center mb-10 md:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(SECTION_H2_CLASS, 'mb-4')}
            >
              Ofte stilte{' '}
              <span className="italic text-brand-600">spørsmål</span>
            </motion.h2>
            <div className="h-px w-16 bg-brand-200 mx-auto"></div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-md overflow-hidden border transition-all duration-500
                  ${openFaq === i 
                    ? 'bg-white border-brand-200 shadow-md' 
                    : 'bg-white/40 border-brand-100 hover:border-brand-200 hover:bg-white/60'
                  }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 md:px-6 md:py-4 flex items-center justify-between gap-4 text-left group"
                >
                  <span className={`font-serif text-lg md:text-xl transition-colors duration-300 ${openFaq === i ? 'text-brand-900' : 'text-brand-800 group-hover:text-brand-900'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500
                    ${openFaq === i 
                      ? 'bg-brand-900 border-brand-900 text-white rotate-180' 
                      : 'border-brand-200 text-brand-400 group-hover:border-brand-400 group-hover:text-brand-900'
                    }`}
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
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-brand-600 text-[15px] md:text-base font-light leading-relaxed">
                        <div className="h-px w-10 bg-brand-100 mb-3"></div>
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

      {/* 9. Final CTA - Editorial Style */}
      <section className="section-viewport px-8 md:px-20">
        <div className="section-viewport-scroll py-8 md:py-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mx-auto max-w-[1800px] overflow-hidden rounded-xl bg-brand-900 px-6 py-12 text-center text-white shadow-2xl sm:px-10 sm:py-14 md:px-14 md:py-16 lg:px-16 lg:py-20"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000" 
              alt="CTA BG" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/40 to-brand-900/90"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-400/20 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-rose-400/10 blur-[120px] rounded-full"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl space-y-8 md:space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={SECTION_H2_ON_DARK_CLASS}
            >
              Skal vi skape <br />
              <span className="italic text-brand-400">magi sammen?</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-brand-100 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
            >
              Ta kontakt for en uforpliktende samtale eller for å avtale en privat visning på gården. Vi gleder oss til å høre deres historie.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-5 pt-4 sm:flex-row sm:gap-6 sm:pt-6"
            >
              <Link 
                to="/contact" 
                className="w-full rounded-full bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-brand-900 shadow-xl transition-all hover:scale-[1.02] hover:bg-brand-50 active:scale-[0.98] sm:w-auto sm:px-14"
              >
                Book nå
              </Link>
              <Link 
                to="/contact" 
                className="w-full rounded-full border border-white/30 bg-transparent px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-white/10 sm:w-auto sm:px-14"
              >
                Send forespørsel
              </Link>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </section>
    </div>
  );
};
