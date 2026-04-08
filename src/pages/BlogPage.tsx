import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PAGE_H1_CLASS, SECTION_LEAD_CLASS, UI_EYEBROW_CLASS } from '../lib/typography';
import { cn } from '../lib/utils';

export const BlogPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="ui-page-shell">
      <section
        aria-labelledby="blog-heading"
        className="ui-route-hero-band section-viewport flex min-h-[min(72vh,52rem)] flex-col justify-center"
      >
        <div
          className="pointer-events-none absolute -right-[15%] top-[5%] h-[min(42vw,22rem)] w-[min(42vw,22rem)] rounded-full bg-brand-300/20 blur-[100px] dark:bg-brand-500/12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[10%] bottom-[10%] h-[min(36vw,18rem)] w-[min(36vw,18rem)] rounded-full bg-brand-500/10 blur-[90px] dark:bg-brand-600/10"
          aria-hidden
        />

        <div className="section-viewport-scroll site-container relative z-10 py-16 md:py-24">
          <header className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(UI_EYEBROW_CLASS, 'mb-5')}
            >
              {t('blogPage.heroEyebrow')}
            </motion.p>
            <motion.span
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mb-6 inline-flex items-center rounded-full border border-brand-300/80 bg-brand-50/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-800 shadow-sm dark:border-brand-600 dark:bg-brand-800/70 dark:text-brand-100"
            >
              {t('blogPage.comingSoonBadge')}
            </motion.span>
            <motion.h1
              id="blog-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className={cn(PAGE_H1_CLASS, 'mb-6 text-balance')}
            >
              {t('blogPage.comingSoonTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className={cn(SECTION_LEAD_CLASS, 'mx-auto max-w-xl text-balance')}
            >
              {t('blogPage.comingSoonBody')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-12 flex justify-center"
              aria-hidden
            >
              <Sparkles
                className="h-11 w-11 text-brand-600 dark:text-brand-400"
                strokeWidth={1.25}
              />
            </motion.div>
          </header>
        </div>
      </section>
    </div>
  );
};
