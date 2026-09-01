import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import { PAGE_H1_CLASS, SECTION_LEAD_CLASS, UI_EYEBROW_CLASS } from '../lib/typography';
import { VisningWizard } from '../components/VisningWizard';
import {
  VENUE_CONTACT_EMAIL,
  VENUE_CONTACT_PHONE_DISPLAY,
  VENUE_CONTACT_PHONE_HREF,
} from '../lib/contactEmail';
import { useRouteMeta } from '../lib/useRouteMeta';

export const VisningPage: React.FC = () => {
  const { t } = useTranslation();

  useRouteMeta(t('visningPage.metaTitle'), t('visningPage.metaDescription'));

  const trustItems = [
    t('visningPage.trustNoObligation'),
    t('visningPage.trustParking'),
    t('visningPage.trustFridays'),
    t('visningPage.trustLocation'),
  ];

  return (
    <div className="ui-page-shell">
      <section
        aria-labelledby="visning-heading"
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

        <div className="section-viewport-scroll site-container relative z-10 py-12 md:py-16 lg:py-20">
          <header className="mx-auto w-full max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(UI_EYEBROW_CLASS, 'mb-3')}
            >
              {t('visningPage.eyebrow')}
            </motion.p>
            <motion.h1
              id="visning-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
              className={cn(PAGE_H1_CLASS, 'md:text-[3.25rem] md:leading-[1.08]')}
            >
              {t('visningPage.heading')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className={cn(SECTION_LEAD_CLASS, 'mx-auto mt-5 max-w-2xl')}
            >
              {t('visningPage.lead')}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-brand-800 dark:text-brand-200"
            >
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-brand-600 dark:text-brand-400" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>
          </header>
        </div>
      </section>

      <section
        className="ui-section-wash section-viewport border-y border-brand-200/80 dark:border-brand-700/60"
        aria-label={t('visningPage.wizardAria')}
      >
        <div className="section-viewport-scroll site-container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <VisningWizard />
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-brand-200 bg-white p-5 dark:border-brand-600 dark:bg-brand-900/50 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">
              {t('visningPage.fallbackHeading')}
            </p>
            <p className="mt-2 text-sm text-brand-800 dark:text-brand-200">
              {t('visningPage.fallbackBody')}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href={VENUE_CONTACT_PHONE_HREF}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-950 underline decoration-brand-400 underline-offset-4 dark:text-brand-50"
              >
                <Phone size={16} aria-hidden />
                {VENUE_CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${VENUE_CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-950 underline decoration-brand-400 underline-offset-4 dark:text-brand-50"
              >
                <Mail size={16} aria-hidden />
                {VENUE_CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
