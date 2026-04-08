import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  FAQ_ANSWER_CLASS,
  PAGE_H1_CLASS,
  SECTION_LEAD_CLASS,
  UI_EYEBROW_CLASS,
} from '../lib/typography';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is the capacity of the venue?',
        a: 'Our venue can accommodate up to 120 guests for a seated dinner and up to 200 for a standing reception.',
      },
      {
        q: 'Is there parking available?',
        a: 'Yes, we have ample free parking for all your guests right outside the venue.',
      },
      {
        q: 'Can we bring our own alcohol?',
        a: 'Yes, we allow you to bring your own alcohol. We also offer bar service if preferred.',
      },
    ],
  },
  {
    category: 'Catering & Kitchen',
    questions: [
      {
        q: 'Do you provide catering?',
        a: 'We have several trusted catering partners we can recommend, or you can bring your own preferred caterer.',
      },
      {
        q: 'Is the kitchen fully equipped?',
        a: 'Yes, our professional kitchen includes ovens, stovetops, refrigerators, and a commercial dishwasher.',
      },
    ],
  },
  {
    category: 'Booking & Payment',
    questions: [
      {
        q: 'How do I book the venue?',
        a: 'You can start by sending an inquiry through our website. We will then contact you to discuss details and schedule a viewing.',
      },
      {
        q: 'What are the payment terms?',
        a: 'A deposit is required to secure your date. The remaining balance is typically due 30 days before the event.',
      },
    ],
  },
];

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-brand-200 last:border-none dark:border-brand-600">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-brand-700 dark:hover:text-brand-200"
      >
        <span className="font-serif text-lg">{q}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className={cn(FAQ_ANSWER_CLASS, 'pb-6')}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="ui-page-shell">
      <section className="ui-route-hero-band section-viewport relative overflow-hidden" aria-labelledby="faq-heading">
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
            <p className={cn(UI_EYEBROW_CLASS, 'mb-3')}>{t('faqPage.heroEyebrow')}</p>
            <h1 id="faq-heading" className={cn(PAGE_H1_CLASS, 'md:leading-[1.05]')}>
              {t('nav.faq')}
            </h1>
            <div className="mx-auto mt-4 h-px w-14 bg-brand-600/35" aria-hidden />
            <p className={cn(SECTION_LEAD_CLASS, 'mt-5')}>{t('faqPage.intro')}</p>
          </header>
        </div>
      </section>

      <section
        className="ui-section-wash section-viewport border-y border-brand-200/80 dark:border-brand-700/60"
        aria-label={t('nav.faq')}
      >
        <div className="section-viewport-scroll site-container py-16 md:py-20">
          <div className="mx-auto w-full max-w-4xl">
            <div className="space-y-12">
              {faqData.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-400 dark:text-brand-500">
                    {section.category}
                  </h2>
                  <div className="ui-panel px-8">
                    {section.questions.map((item, j) => (
                      <FAQItem key={j} {...item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
