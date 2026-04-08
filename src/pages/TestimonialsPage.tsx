import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import { PAGE_H1_CLASS, SECTION_H5_CLASS, SECTION_LEAD_CLASS } from '../lib/typography';

const testimonials = [
  {
    name: 'Sarah & Thomas',
    event: 'Wedding',
    content: 'Our wedding at Rønningen was absolutely magical. The venue is stunning, and the staff went above and beyond to make our day perfect.',
    rating: 5
  },
  {
    name: 'Nordic Tech AS',
    event: 'Corporate Dinner',
    content: 'A professional yet warm environment. Our team loved the atmosphere and the facilities were top-notch.',
    rating: 5
  },
  {
    name: 'The Berg Family',
    event: '70th Birthday',
    content: 'The perfect place for a family celebration. Flexible, spacious, and very welcoming. Highly recommended!',
    rating: 5
  },
  {
    name: 'Emma & Henrik',
    event: 'Wedding',
    content: 'We couldn\'t have asked for a better venue. The outdoor area is beautiful for photos, and the indoor space is so elegant.',
    rating: 5
  }
];

export const TestimonialsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
    <section className="section-viewport">
      <div className="section-viewport-scroll site-container py-16">
      <div className="mb-12 text-center">
        <h1 className={cn(PAGE_H1_CLASS, 'mb-4 text-brand-950')}>{t('testimonialsPage.title')}</h1>
        <p className={SECTION_LEAD_CLASS}>
          {t('testimonialsPage.intro')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-sm border border-brand-200 relative"
          >
            <Quote className="absolute top-8 right-8 text-brand-100" size={48} />
            <div className="flex space-x-1 mb-6">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-brand-500 text-brand-500" />
              ))}
            </div>
            <p className="text-xl font-serif text-brand-800 mb-8 leading-relaxed italic">
              "{item.content}"
            </p>
            <div>
              <h4 className={cn(SECTION_H5_CLASS, 'font-semibold')}>{item.name}</h4>
              <p className="text-xs uppercase tracking-widest text-brand-400 mt-1">{item.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
    </div>
  );
};
