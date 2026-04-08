import React, { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import {
  PAGE_H1_CLASS,
  SECTION_H2_ON_DARK_CLASS,
  SECTION_LEAD_CLASS,
  SECTION_LEAD_ON_DARK_CLASS,
  UI_EYEBROW_CLASS,
} from '../lib/typography';
import { WeddingPackagesBlock, WEDDING_PACKAGES_HEADING_ID } from '../components/pricing/WeddingPackagesBlock';
import { FacilityPricingBlock, FACILITY_PRICING_HEADING_ID } from '../components/pricing/FacilityPricingBlock';
import { ROUTES } from '../lib/routes';

const PRICES_HASH_IDS = new Set([WEDDING_PACKAGES_HEADING_ID, FACILITY_PRICING_HEADING_ID]);

export const PricesPage: React.FC = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash || hash.length < 2) return;
    const id = hash.slice(1);
    if (!PRICES_HASH_IDS.has(id)) return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div className="ui-page-shell">
      {/* Gallery-style hero — compact so pricing starts quickly */}
      <section
        aria-labelledby="prices-page-heading"
        className="ui-route-hero-band section-viewport"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-multiply"
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
            <p className={cn(UI_EYEBROW_CLASS, 'mb-3')}>
              {t('pricesPage.heroEyebrow')}
            </p>
            <h1
              id="prices-page-heading"
              className={cn(PAGE_H1_CLASS, 'md:leading-[1.05]')}
            >
              {t('pricesPage.title')}
            </h1>
            <div className="mx-auto mt-4 h-px w-14 bg-brand-600/35" aria-hidden />
            <p className={cn(SECTION_LEAD_CLASS, 'mt-5')}>
              {t('pricesPage.intro')}
            </p>
          </header>
        </div>
      </section>

      <WeddingPackagesBlock />

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
              <div className="mb-4 h-px w-12 bg-brand-400/70" aria-hidden />
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
                className="inline-flex w-full min-w-[12rem] items-center justify-center rounded-full bg-white px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-brand-900 shadow-lg transition-all hover:scale-[1.02] hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 sm:w-auto sm:px-10"
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
