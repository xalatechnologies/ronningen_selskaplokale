import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import { PAGE_H1_CLASS, SECTION_H5_CLASS, SECTION_LEAD_CLASS, UI_EYEBROW_CLASS } from '../lib/typography';

const testimonials = [
  {
    name: 'Sarah & Thomas',
    event: 'Wedding',
    content:
      'Our wedding at Rønningen was absolutely magical. The venue is stunning, and the staff went above and beyond to make our day perfect.',
    rating: 5,
  },
  {
    name: 'Nordic Tech AS',
    event: 'Corporate Dinner',
    content:
      'A professional yet warm environment. Our team loved the atmosphere and the facilities were top-notch.',
    rating: 5,
  },
  {
    name: 'The Berg Family',
    event: '70th Birthday',
    content:
      'The perfect place for a family celebration. Flexible, spacious, and very welcoming. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Emma & Henrik',
    event: 'Wedding',
    content:
      "We couldn't have asked for a better venue. The outdoor area is beautiful for photos, and the indoor space is so elegant.",
    rating: 5,
  },
];

export const TestimonialsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="ui-page-shell">
      <section className="ui-route-hero-band section-viewport relative overflow-hidden" aria-labelledby="testimonials-heading">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply dark:opacity-[0.2]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-[15%] top-[5%] h-[min(45vw,24rem)] w-[min(45vw,24rem)] rounded-full bg-brand-200/20 blur-[100px] dark:bg-brand-500/12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[10%] top-[40%] h-[min(35vw,18rem)] w-[min(35vw,18rem)] rounded-full bg-brand-400/10 blur-[90px] dark:bg-brand-600/10"
          aria-hidden
        />

        <div className="section-viewport-scroll site-container relative z-10 pb-8 pt-10 md:pb-10 md:pt-12">
          <header className="mx-auto w-full text-center">
            <p className={cn(UI_EYEBROW_CLASS, 'mb-3')}>{t('testimonialsPage.heroEyebrow')}</p>
            <h1 id="testimonials-heading" className={cn(PAGE_H1_CLASS, 'md:leading-[1.05]')}>
              {t('testimonialsPage.title')}
            </h1>
            <div className="mx-auto mt-4 h-px w-14 bg-brand-600/35" aria-hidden />
            <p className={cn(SECTION_LEAD_CLASS, 'mt-5')}>{t('testimonialsPage.intro')}</p>
          </header>
        </div>
      </section>

      <section
        className="ui-section-wash section-viewport border-y border-brand-200/80 dark:border-brand-700/60"
        aria-label={t('testimonialsPage.title')}
      >
        <div className="section-viewport-scroll site-container py-16 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="ui-panel relative p-10"
              >
                <Quote className="absolute right-8 top-8 text-brand-200 dark:text-brand-800" size={48} />
                <div className="mb-6 flex space-x-1">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-brand-500 text-brand-500" />
                  ))}
                </div>
                <p className="mb-8 font-serif text-xl italic leading-relaxed text-brand-800 dark:text-brand-200">
                  &quot;{item.content}&quot;
                </p>
                <div>
                  <h2 className={cn(SECTION_H5_CLASS, 'font-semibold')}>{item.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-widest text-brand-400 dark:text-brand-500">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
