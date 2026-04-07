import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { SECTION_H2_CLASS } from '../lib/typography';
import { cn } from '../lib/utils';

export const BlogPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <section className="section-viewport border-b border-brand-200/80 bg-linear-to-b from-white to-brand-50/50">
        <div className="section-viewport-scroll mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={cn(SECTION_H2_CLASS, 'mb-6')}
          >
            {t('blogPage.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mx-auto max-w-xl text-base leading-relaxed text-brand-600 md:text-lg"
          >
            {t('blogPage.intro')}
          </motion.p>
        </div>
      </section>
    </div>
  );
};
