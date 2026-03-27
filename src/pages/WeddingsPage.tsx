import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Users, Heart, Sparkles, Camera, 
  Music, Utensils, Calendar, Clock,
  ArrowRight, ArrowLeft, HelpCircle, MessageSquare,
  Wine, Car, ChevronDown, ChevronUp,
  GlassWater, PartyPopper
} from 'lucide-react';

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
      title: "Vielse / ankomst",
      desc: "Start dagen med en stemningsfull seremoni i hagen eller på låven.",
      icon: <Users size={32} />
    },
    {
      title: "Middag og taler",
      desc: "Nyt en festmiddag med lokale råvarer i historiske omgivelser.",
      icon: <Utensils size={32} />
    },
    {
      title: "Kaffe og kaker",
      desc: "Senk skuldrene med kaffe og kaker i våre hyggelige fellesområder.",
      icon: <GlassWater size={32} />
    },
    {
      title: "Dans og feiring",
      desc: "Avslutt kvelden med musikk, dans og god stemning på låven.",
      icon: <PartyPopper size={32} />
    }
  ];

  const services = [
    {
      title: "Catering & Menyer",
      desc: "Vi samarbeider med de beste kokkene for å levere alt fra rustikke buffetløsninger til elegante 5-retters middager.",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      icon: <Utensils size={24} />
    },
    {
      title: "Fotografering",
      desc: "Våre anbefalte fotografer kjenner lyset og de beste vinklene på gården, og fanger de ekte øyeblikkene.",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800",
      icon: <Camera size={24} />
    },
    {
      title: "Blomster & Dekor",
      desc: "Våre dekoratører hjelper dere med å skape den perfekte atmosfæren, fra brudebukett til borddekorasjoner.",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      icon: <Sparkles size={24} />
    },
    {
      title: "Drikke & Bar",
      desc: "Ta med egne drikkevarer uten korkavgift. Vi kan bistå med profesjonelle bartendere og barutstyr.",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
      icon: <Wine size={24} />
    },
    {
      title: "Lyd & Lys",
      desc: "Vi har profesjonelt utstyr for både tale og dans, samt stemningsbelysning som fremhever låvens arkitektur.",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
      icon: <Music size={24} />
    },
    {
      title: "Planlegging",
      desc: "Vi kan ta oss av all koordinering med leverandører, slik at dere kan nyte dagen fullt ut.",
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      icon: <Calendar size={24} />
    }
  ];

  const packages = [
    {
      name: "Lokalleie",
      price: "Fra 45.000,-",
      desc: "For dere som ønsker å styre alt selv og leie kun lokalene.",
      features: ["Eksklusiv tilgang hele helgen", "Bord og stoler inkludert", "Sluttrengjøring", "Eget vertskap"]
    },
    {
      name: "Fleksibel Bryllupspakke",
      price: "Fra 75.000,-",
      desc: "En god grunnpakke som kan utvides med de tjenestene dere trenger.",
      features: ["Alt i Lokalleie", "Oppdekking & servise", "Lyd & Lys-pakke", "Prosjektleder"]
    },
    {
      name: "Skreddersydd Løsning",
      price: "Pris på forespørsel",
      desc: "Vi hjelper dere med alt fra A til Å for en helt bekymringsfri feiring.",
      features: ["Full planlegging", "Catering & servering", "Blomster & dekor", "Koordinering på dagen"]
    }
  ];

  const faqs = [
    {
      q: "Kan vi ta med egen drikke?",
      a: "Ja, vi har ingen korkavgift. Dere står fritt til å ta med egne drikkevarer til hele arrangementet."
    },
    {
      q: "Hvor mange gjester er det plass til?",
      a: "Vi har plass til inntil 120 sittende gjester ved langbord eller runde bord i låven."
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
      q: "Har dere overnattingsmuligheter?",
      a: "Vi har ikke overnatting på selve gården, men det finnes flere hoteller og overnattingssteder kun 10-15 minutter unna."
    }
  ];

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=2000" 
            alt="Wedding Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 via-brand-900/20 to-brand-900/70 z-10"></div>
          <div className="absolute inset-0 bg-brand-400/10 mix-blend-overlay z-10"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display uppercase tracking-tight mb-6"
          >
            Bryllup i vakre og <br className="hidden md:block" /> unike omgivelser
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl font-light mb-12 max-w-2xl mx-auto opacity-90"
          >
            Skap en feiring som føles personlig, varm og minneverdig.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link to="/contact" className="bg-white text-brand-900 px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-50 transition-all shadow-xl w-full sm:w-auto">
              Book nå
            </Link>
            <Link to="/contact" className="bg-transparent text-white border-2 border-white/30 px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
              Send forespørsel
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold opacity-70"
          >
            <span className="flex items-center gap-2"><Sparkles size={14} /> Unike omgivelser</span>
            <span className="flex items-center gap-2"><Calendar size={14} /> Fleksible løsninger</span>
            <span className="flex items-center gap-2"><Heart size={14} /> Personlig oppfølging</span>
          </motion.div>
        </div>
      </section>

      {/* Atmosfæren — samme etikett + h2 som «Våre tjenester» / Alt dere trenger */}
      <section
        id="atmosfaeren"
        aria-labelledby="atmosfaeren-heading"
        className="scroll-mt-24 py-32 bg-white border-y border-brand-100 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[35%] -right-[8%] w-[42%] h-[42%] bg-brand-100/25 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1800px] mx-auto px-8 md:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-20 items-start">
            <div className="order-2 lg:order-1 max-w-3xl">
              <span className="text-xl font-sans text-brand-900 opacity-80 uppercase tracking-widest mb-4 block">
                Atmosfæren
              </span>
              <h2
                id="atmosfaeren-heading"
                className="text-4xl md:text-8xl font-serif text-brand-900 leading-[0.9] tracking-tighter mb-6"
              >
                Vielse og fest <br /> på samme sted
              </h2>
              <p className="text-brand-600 text-lg md:text-xl leading-relaxed">
                Historisk låv og lokaler med komfort og utstyr som holder i dag. Samme sted til vielse, mat og fest. Dere bestemmer rekkefølgen og stilen. Rolige omgivelser i kulturlandskap, kort vei mellom seremoni og dans. Vi hjelper dere med planlegging og gjennomføring slik at dere kan konsentrere dere om hverandre. Ta kontakt for omvisning og en prat om hvordan dagen kan legges opp hos oss.
              </p>
            </div>

            <figure className="order-1 lg:order-2 m-0 w-full">
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] xl:h-[min(78vh,720px)] xl:aspect-auto w-full rounded-md overflow-hidden border border-brand-100 bg-brand-50 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=85&w=1600"
                  alt="Feiring og stemning på Rønningen — lokalet og omgivelsene"
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </figure>
          </div>

          <ul className="mt-16 md:mt-20 pt-12 md:pt-14 border-t border-brand-200 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12 lg:gap-14 list-none m-0 p-0">
            {whyUs.map((item, i) => (
              <li key={i} className="flex gap-5 md:gap-6">
                <span
                  className="font-serif text-3xl md:text-4xl text-brand-200 tabular-nums shrink-0 w-11 md:w-12 pt-0.5 leading-none text-right"
                  aria-hidden
                >
                  {item.number}
                </span>
                <div className="min-w-0 border-l border-brand-200 pl-5 md:pl-6">
                  <h3 className="font-serif text-xl md:text-2xl text-brand-900 mb-2 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-brand-700/95 text-base md:text-[17px] leading-[1.7]">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. What your day can look like - Visual Timeline */}
      <section className="py-24 text-white overflow-hidden relative bg-gradient-to-b from-[#1c1613] via-brand-900 to-[#0e0a08]">
        {/* Abstract Background Glows — warm depth aligned with brand */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-400/14 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-600/12 blur-[120px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] bg-brand-800/8 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-[1800px] mx-auto px-8 md:px-20 relative z-10">
          <header className="relative mb-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start">
            {/* Floating Vertical Text */}
            <div className="absolute top-1/2 -right-48 -translate-y-1/2 rotate-90 hidden 2xl:block pointer-events-none opacity-10">
              <span className="text-[140px] font-serif text-white select-none whitespace-nowrap leading-none tracking-tighter">
                Deres historie
              </span>
            </div>

            <div className="lg:col-span-7 xl:col-span-6 flex flex-col gap-5 md:gap-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="m-0 text-[10px] uppercase tracking-[0.6em] font-bold text-brand-400"
              >
                Opplevelsen
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="m-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.92] tracking-tighter text-balance"
              >
                <span className="block">Slik kan</span>
                <span className="mt-1 block pl-6 italic text-brand-400 sm:pl-10 md:pl-14 lg:pl-16">
                  dagen se ut
                </span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="m-0 lg:col-span-5 xl:col-span-5 text-brand-200 text-lg sm:text-xl font-light leading-relaxed border-l border-brand-800 pl-6 sm:pl-8 lg:max-w-lg lg:pt-2"
            >
              Hvert bryllup er unikt, men her er en oversikt over hvordan en typisk feiring hos oss kan utfolde seg.
            </motion.p>
          </header>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 z-0 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {dayFlow.map((item, i) => {
                const colors = [
                  { bg: 'from-amber-900/80', accent: 'text-amber-400', border: 'border-amber-400/30' },
                  { bg: 'from-rose-900/80', accent: 'text-rose-400', border: 'border-rose-400/30' },
                  { bg: 'from-emerald-900/80', accent: 'text-emerald-400', border: 'border-emerald-400/30' },
                  { bg: 'from-blue-900/80', accent: 'text-blue-400', border: 'border-blue-400/30' }
                ];
                const color = colors[i % colors.length];
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="group relative h-[600px] rounded-lg overflow-hidden shadow-2xl"
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
                      <div className={`absolute inset-0 bg-gradient-to-t ${color.bg} via-brand-900/45 to-transparent opacity-90 group-hover:opacity-70 transition-colors duration-700`}></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full p-12 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <span className={`text-6xl font-serif ${color.accent} opacity-40 group-hover:opacity-100 transition-colors duration-500`}>0{i + 1}</span>
                          <div className={`h-px w-12 ${color.accent} opacity-30 mt-4 group-hover:w-24 transition-all duration-500`}></div>
                        </div>
                        <div className={`w-14 h-14 rounded-full bg-white/10 border ${color.border} flex items-center justify-center ${color.accent} backdrop-blur-md group-hover:bg-white group-hover:text-brand-900 transition-all duration-500`}>
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

      {/* 5: Services & Partners - Matched to Home "Våre tjenester" style */}
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
              Alt dere trenger <br /> på ett sted
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/5] rounded-md overflow-hidden shadow-sm transition-all duration-500 cursor-pointer"
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
                  <h3 className="text-4xl font-display text-white uppercase tracking-wide transition-all duration-500 group-hover:mt-0 mt-auto">
                    {service.title}
                  </h3>
                  
                  {/* Description - Appears on hover */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex-grow">
                    <p className="text-white text-lg leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </div>
                  
                  {/* Read More - Appears on hover at bottom */}
                  <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 flex items-center gap-3 group/btn">
                    <Link to="/contact" className="contents">
                      <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center transition-colors group-hover/btn:bg-white group-hover/btn:text-[#4F9DA6]">
                        <ArrowRight size={18} />
                      </div>
                      <span className="text-white font-medium uppercase tracking-wider text-sm">Les mer</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Booking/package model */}
      <section className="py-32 bg-gradient-to-b from-brand-100/70 via-brand-50 to-brand-100/50 overflow-hidden relative border-y border-brand-200/80">
        <div className="max-w-[1800px] mx-auto px-8 md:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-500 font-bold mb-5 block">Investeringen</span>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-900 mb-6 tracking-tight leading-[0.95]">
              Våre Bryllupspakker
            </h2>
            <p className="text-brand-600 text-lg md:text-xl leading-relaxed">
              Velg pakken som passer dere best. Hver løsning kan tilpasses slik at feiringen oppleves personlig, enkel og gjennomført.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-xl border p-8 md:p-10 h-full flex flex-col ${
                  i === 1
                    ? 'bg-brand-900 text-white border-brand-800 shadow-2xl shadow-brand-900/35 ring-2 ring-brand-400/25 z-[1]'
                    : 'bg-white text-brand-900 border-2 border-brand-300/90 shadow-lg shadow-brand-900/[0.06] ring-1 ring-brand-900/[0.04]'
                }`}
              >
                {i === 1 && (
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-brand-700 text-[10px] uppercase tracking-[0.18em] font-bold">
                    Mest populær
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-2xl md:text-3xl font-serif mb-3 ${i === 1 ? 'text-white' : 'text-brand-900'}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className={`text-4xl font-display leading-none ${i === 1 ? 'text-brand-100' : 'text-brand-900'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-xs uppercase tracking-[0.16em] ${i === 1 ? 'text-brand-200' : 'text-brand-500'}`}>
                      inkl. mva
                    </span>
                  </div>
                  <p className={`${i === 1 ? 'text-brand-100' : 'text-brand-700'} text-base leading-relaxed`}>
                    {pkg.desc}
                  </p>
                </div>

                <div className={`h-px w-full mb-7 ${i === 1 ? 'bg-brand-700' : 'bg-brand-300/80'}`}></div>

                <ul className="space-y-4 mb-8 grow">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`mt-0.5 shrink-0 ${i === 1 ? 'text-brand-300' : 'text-brand-600'}`}>
                        <CheckCircle2 size={18} strokeWidth={2.25} />
                      </div>
                      <span className={`${i === 1 ? 'text-brand-100' : 'text-brand-800'} text-[15px] leading-relaxed`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-4 text-[11px] uppercase tracking-[0.24em] font-semibold transition-colors ${
                    i === 1
                      ? 'bg-white text-brand-900 hover:bg-brand-100'
                      : 'bg-brand-900 text-white hover:bg-brand-800'
                  }`}
                >
                  Velg denne pakken
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-brand-500 text-sm italic">
              * Alle priser er veiledende. Endelig tilbud utarbeides etter en uforpliktende samtale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. Gallery - Editorial Style */}
      <section className="py-32 bg-white overflow-hidden relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-brand-100/20 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-[1800px] mx-auto px-8 md:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-500 font-bold mb-5 block">Visuelt</span>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-900 mb-6 tracking-tight leading-[0.95]">
              Inspirasjon og Galleri
            </h2>
            <p className="text-brand-600 text-lg md:text-xl leading-relaxed">
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
                  className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center shadow-md transition-colors backdrop-blur-sm ${
                    showGalleryLeft
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:bg-brand-900 hover:text-white hover:border-brand-900'
                      : 'border-brand-200/80 bg-white/50 text-brand-300 cursor-not-allowed opacity-70'
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
                  className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center shadow-md transition-colors backdrop-blur-sm ${
                    showGalleryRight
                      ? 'border-white/60 bg-white/85 text-brand-900 hover:bg-brand-900 hover:text-white hover:border-brand-900'
                      : 'border-brand-200/80 bg-white/50 text-brand-300 cursor-not-allowed opacity-70'
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
              className="flex gap-6 md:gap-8 overflow-x-auto pb-8 md:pb-10 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
            >
              {[
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200",
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
              "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200",
              "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200",
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200"
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="min-w-[88%] md:min-w-[46%] lg:min-w-[34%] aspect-[4/5] relative group overflow-hidden rounded-md border border-brand-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 snap-center"
              >
                <img
                  src={img}
                  alt={`Bryllupsinspirasjon ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/75 via-brand-900/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <div className="inline-flex items-center gap-2 text-white/85 text-[11px] uppercase tracking-[0.2em] mb-2">
                    <Sparkles size={12} />
                    Galleri
                  </div>
                  <p className="text-white text-lg md:text-xl font-serif">Bryllupsinspirasjon {i + 1}</p>
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
            className="mt-10 md:mt-12 text-center"
          >
            <Link
              to="/gallery"
              className="inline-flex items-center gap-4 rounded-full border border-brand-200 bg-white px-7 py-3 group hover:border-brand-300 hover:shadow-md transition-all"
            >
              <span className="text-xs uppercase tracking-[0.28em] font-semibold text-brand-900">Se hele galleriet</span>
              <div className="w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>



      {/* 8. FAQ - Editorial Style */}
      <section className="py-16 md:py-20 bg-brand-50/50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[20%] h-[20%] bg-brand-200/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.35em] text-brand-400 font-bold mb-3 block"
            >
              Informasjon
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-serif text-brand-900 mb-4 tracking-tighter leading-[0.95]"
            >
              Ofte stilte <br />
              <span className="italic text-brand-600 ml-6 sm:ml-10">spørsmål</span>
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
      <section className="py-32 px-8 md:px-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-[1800px] mx-auto bg-brand-900 rounded-xl p-16 md:p-32 text-center text-white relative overflow-hidden shadow-2xl"
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

          <div className="relative z-10 space-y-12 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.6em] font-bold text-brand-300 block"
            >
              Neste steg
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-serif leading-[0.85] tracking-tighter"
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
              className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12"
            >
              <Link 
                to="/contact" 
                className="bg-white text-brand-900 px-16 py-7 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-50 transition-all shadow-2xl hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Book visning
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent text-white border border-white/30 px-16 py-7 rounded-full text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                Send forespørsel
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
