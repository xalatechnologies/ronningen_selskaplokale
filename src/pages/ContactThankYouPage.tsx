import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { PAGE_H1_CLASS, SECTION_LEAD_CLASS, UI_EYEBROW_CLASS } from '../lib/typography';
import { ROUTES } from '../lib/routes';
import { useRouteMeta } from '../lib/useRouteMeta';

export const ContactThankYouPage: React.FC = () => {
  const { t } = useTranslation();
  const trackedRef = useRef(false);

  useRouteMeta(t('contactThankYou.title'), t('contactThankYou.metaDescription'));

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_submit',
      form_name: 'contact',
    });
  }, []);

  return (
    <div className="ui-page-shell">
      <section
        aria-labelledby="contact-thank-you-heading"
        className="ui-route-hero-band section-viewport"
      >
        <div
          className="pointer-events-none absolute -right-[18%] top-[8%] h-[min(48vw,26rem)] w-[min(48vw,26rem)] rounded-full bg-brand-200/25 blur-[100px] dark:bg-brand-500/12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[12%] bottom-[5%] h-[min(38vw,20rem)] w-[min(38vw,20rem)] rounded-full bg-brand-400/10 blur-[90px] dark:bg-brand-600/10"
          aria-hidden
        />

        <div className="section-viewport-scroll site-container relative z-10 flex min-h-[min(70vh,36rem)] flex-col items-center justify-center py-16 md:py-24">
          <header className="mx-auto w-full max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(UI_EYEBROW_CLASS, 'mb-3')}
            >
              Rønningen
            </motion.p>
            <motion.h1
              id="contact-thank-you-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
              className={cn(PAGE_H1_CLASS, 'md:text-[3.25rem] md:leading-[1.08]')}
            >
              {t('contactThankYou.heading')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className={cn(SECTION_LEAD_CLASS, 'mx-auto mt-5 max-w-xl')}
            >
              {t('contactThankYou.body')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-10"
            >
              <Link
                to={ROUTES.home}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-900 px-8 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:bg-brand-800 hover:shadow-xl dark:bg-brand-100 dark:text-brand-900 dark:hover:bg-white"
              >
                {t('contactThankYou.backHome')}
              </Link>
            </motion.div>
          </header>
        </div>
      </section>
    </div>
  );
};
