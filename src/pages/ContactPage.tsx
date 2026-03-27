import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col">
      <section className="section-viewport">
        <div className="section-viewport-scroll mx-auto w-full max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-serif mb-4">{t('nav.contact')}</h1>
          <p className="text-brand-600 max-w-2xl mx-auto">
            We are here to help you plan your perfect event. Reach out to us for any questions or to schedule a viewing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="flex items-start space-x-6">
              <div className="bg-brand-100 p-4 rounded-2xl text-brand-800">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif mb-1">Phone</h4>
                <p className="text-brand-600">+47 123 45 678</p>
                <p className="text-xs text-brand-400 mt-1">Mon-Fri: 09:00 - 17:00</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-brand-100 p-4 rounded-2xl text-brand-800">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif mb-1">Email</h4>
                <p className="text-brand-600">post@ronningen.no</p>
                <p className="text-xs text-brand-400 mt-1">We typically reply within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-brand-100 p-4 rounded-2xl text-brand-800">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif mb-1">Location</h4>
                <p className="text-brand-600">Rønningen Gård, 1234 Oslo</p>
                <p className="text-xs text-brand-400 mt-1">Easily accessible by car and public transport.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-brand-100 p-4 rounded-2xl text-brand-800">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif mb-1">Viewing Hours</h4>
                <p className="text-brand-600">By appointment only.</p>
                <p className="text-xs text-brand-400 mt-1">Contact us to schedule your visit.</p>
              </div>
            </div>
          </div>

          <div className="h-[min(500px,45dvh)] min-h-[200px] overflow-hidden rounded-2xl border border-brand-200 shadow-sm">
            {/* Placeholder for Map */}
            <div className="w-full h-full bg-brand-100 flex items-center justify-center text-brand-400 font-serif italic">
              Interactive Map Coming Soon
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};
