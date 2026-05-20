import React, { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import {
  SECTION_H2_ON_DARK_CLASS,
  SECTION_LEAD_ON_DARK_CLASS,
} from '../lib/typography';
import { FacilityPricingBlock, FACILITY_PRICING_HEADING_ID } from '../components/pricing/FacilityPricingBlock';
import { ROUTES } from '../lib/routes';

const PRICES_HASH_IDS = new Set([FACILITY_PRICING_HEADING_ID]);

export const PricesPage: React.FC = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash || hash.length < 2) return;
    const id = hash.slice(1);
    if (!PRICES_HASH_IDS.has(id)) return;

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const nav = document.querySelector('header');
      const navHeight = nav instanceof HTMLElement ? Math.ceil(nav.getBoundingClientRect().height) : 0;
      /* Luft under fast header + multi-line H2 (Playfair); målt etter layout/motion. */
      const breathingPx = 40;
      const rect = el.getBoundingClientRect();
      const y = rect.top + window.scrollY - navHeight - breathingPx;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTarget);
    });
  }, [hash]);

  return (
    <div className="ui-page-shell">
      <FacilityPricingBlock />

      <section className="border-t border-brand-200/80 bg-brand-50/50 dark:border-brand-800/85 dark:bg-brand-950/55">
        <div className="section-viewport-scroll site-container py-12 md:py-16">
          <div className="relative overflow-hidden rounded-2xl bg-brand-900 px-8 py-12 text-white shadow-2xl sm:px-10 sm:py-14 md:flex md:items-center md:justify-between md:gap-12 md:px-14 md:py-16 lg:px-16 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-800/90 via-brand-900 to-brand-950"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute -left-[15%] -top-[30%] h-[min(55%,22rem)] w-[min(55%,28rem)] rounded-full bg-brand-500/20 blur-[100px]" />
              <div className="absolute -bottom-[25%] -right-[10%] h-[min(50%,20rem)] w-[min(50%,24rem)] rounded-full bg-brand-400/15 blur-[90px]" />
            </div>

            <div className="relative z-10 w-full max-w-none">
              <h2
                className={cn(
                  SECTION_H2_ON_DARK_CLASS,
                  'mb-4 text-balance !text-3xl !leading-[1.08] sm:!text-4xl md:!mb-5 md:!text-[2.75rem] lg:!text-5xl',
                )}
              >
                {t('pricesPage.bottomCta.heading')}
              </h2>
              <p className={SECTION_LEAD_ON_DARK_CLASS}>
                {t('pricesPage.bottomCta.body')}
              </p>
            </div>

            <div className="relative z-10 mt-8 shrink-0 md:mt-0">
              <Link
                to={ROUTES.kontakt}
                className="cta-prices-band-primary"
              >
                {t('pricesPage.bottomCta.primary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
