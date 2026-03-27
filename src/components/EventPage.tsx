import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Users, Monitor, Utensils, Car, ShieldCheck } from 'lucide-react';

interface EventPageProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  capacity?: {
    seated: number;
    standing: number;
  };
  technical?: string[];
}

export const EventPage: React.FC<EventPageProps> = ({ title, subtitle, description, image, features, capacity, technical }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif mb-6 tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl font-light italic opacity-90"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-32 bg-brand-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-xs uppercase tracking-[0.4em] font-bold opacity-60">Konseptet</span>
              <h2 className="text-5xl font-serif leading-tight">En atmosfære preget av historie og sjel</h2>
              <p className="text-brand-200 text-lg leading-relaxed font-light">
                Vi tror på at de beste øyeblikkene skapes i omgivelser som føles ekte. Rønningen er ikke bare et lokale, det er en destinasjon hvor hver krik og krok forteller en historie. 
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <ShieldCheck size={24} className="text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-bold">Eksklusivitet</h4>
                    <p className="text-sm text-brand-300">Hele gården er deres under arrangementet.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Utensils size={24} className="text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-bold">Skreddersøm</h4>
                    <p className="text-sm text-brand-300">Vi tilpasser alt fra meny til dekorasjon.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600" alt="Atmosphere 1" className="rounded-2xl aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600" alt="Atmosphere 2" className="rounded-2xl aspect-square object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4 pt-12">
                  <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600" alt="Atmosphere 3" className="rounded-2xl aspect-square object-cover" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600" alt="Atmosphere 4" className="rounded-2xl aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-400/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Content */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
            <h2 className="text-4xl font-serif text-brand-900 leading-tight">Create Unforgettable Moments</h2>
            <p className="text-brand-700 leading-relaxed text-xl font-light">
              {description}
            </p>

          {capacity && (
            <div className="grid grid-cols-2 gap-8 bg-brand-50 p-8 rounded-2xl border border-brand-100">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-brand-800 font-bold uppercase tracking-widest text-xs">
                  <Users size={16} />
                  <span>Seated</span>
                </div>
                <p className="text-4xl font-serif text-brand-900">{capacity.seated}</p>
                <p className="text-sm text-brand-500">Guests for dinner</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-brand-800 font-bold uppercase tracking-widest text-xs">
                  <Users size={16} />
                  <span>Standing</span>
                </div>
                <p className="text-4xl font-serif text-brand-900">{capacity.standing}</p>
                <p className="text-sm text-brand-500">Guests for reception</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-3 text-brand-800">
                <CheckCircle2 className="text-brand-600 mt-1 flex-shrink-0" size={18} />
                <span className="font-medium leading-tight">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/inquiry" 
              className="bg-brand-800 text-white px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Request a Quote
            </Link>
            <Link 
              to="/contact" 
              className="bg-white text-brand-800 border-2 border-brand-800 px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-50 transition-all"
            >
              Book a Viewing
            </Link>
          </div>
        </div>
        
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000" 
                alt="Detail 1" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6 pt-12">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-square transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500" 
                  alt="Detail 2" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-square transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=500" 
                  alt="Detail 3" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {technical && (
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-brand-100 space-y-8">
              <h3 className="text-2xl font-serif text-brand-900">Technical & Facilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <Monitor className="text-brand-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-brand-900 mb-1">AV & Tech</h4>
                    <p className="text-sm text-brand-600">Full sound system, projectors, and high-speed WiFi.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Utensils className="text-brand-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-brand-900 mb-1">Kitchen</h4>
                    <p className="text-sm text-brand-600">Professional catering kitchen with all amenities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Car className="text-brand-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-brand-900 mb-1">Parking</h4>
                    <p className="text-sm text-brand-600">Ample free parking for all your guests.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ShieldCheck className="text-brand-400 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-brand-900 mb-1">Exclusive</h4>
                    <p className="text-sm text-brand-600">The entire venue is yours for the duration.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
