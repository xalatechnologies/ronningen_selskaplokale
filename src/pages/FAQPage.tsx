import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    category: 'General',
    questions: [
      { q: 'What is the capacity of the venue?', a: 'Our venue can accommodate up to 120 guests for a seated dinner and up to 200 for a standing reception.' },
      { q: 'Is there parking available?', a: 'Yes, we have ample free parking for all your guests right outside the venue.' },
      { q: 'Can we bring our own alcohol?', a: 'Yes, we allow you to bring your own alcohol. We also offer bar service if preferred.' }
    ]
  },
  {
    category: 'Catering & Kitchen',
    questions: [
      { q: 'Do you provide catering?', a: 'We have several trusted catering partners we can recommend, or you can bring your own preferred caterer.' },
      { q: 'Is the kitchen fully equipped?', a: 'Yes, our professional kitchen includes ovens, stovetops, refrigerators, and a commercial dishwasher.' }
    ]
  },
  {
    category: 'Booking & Payment',
    questions: [
      { q: 'How do I book the venue?', a: 'You can start by sending an inquiry through our website. We will then contact you to discuss details and schedule a viewing.' },
      { q: 'What are the payment terms?', a: 'A deposit is required to secure your date. The remaining balance is typically due 30 days before the event.' }
    ]
  }
];

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-brand-200 last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand-700 transition-colors"
      >
        <span className="text-lg font-serif">{q}</span>
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
            <p className="pb-6 text-brand-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <section className="section-viewport">
        <div className="section-viewport-scroll mx-auto w-full max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-5xl">{t('nav.faq')}</h1>
            <p className="text-brand-600">Find answers to the most common questions about our venue and services.</p>
          </div>

          <div className="space-y-12">
            {faqData.map((section, i) => (
              <div key={i}>
                <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-400">{section.category}</h3>
                <div className="rounded-2xl border border-brand-200 bg-white px-8 shadow-sm">
                  {section.questions.map((item, j) => (
                    <FAQItem key={j} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
