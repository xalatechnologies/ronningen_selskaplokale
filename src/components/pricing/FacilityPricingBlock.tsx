import { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SECTION_H2_CLASS, SECTION_LEAD_CLASS, UI_BODY_SECONDARY_CLASS } from '../../lib/typography';
import { FACILITY_CARD_IMAGES, FACILITY_PRICING_CARD_KEYS, type FacilityCardKey } from '../../lib/facilityCards';

export const FACILITY_PRICING_HEADING_ID = 'facility-pricing-heading';

const FACILITY_PRICING_LIST_ID = 'facility-pricing-list';

/** Two grid rows: 1×2 (default), 2×2 (sm), 3×2 (xl) — Tailwind sm/xl breakpoints */
function useInitialVisibleCount(): number {
  const [count, setCount] = useState(6);

  useLayoutEffect(() => {
    const mqXl = window.matchMedia('(min-width: 1280px)');
    const mqSm = window.matchMedia('(min-width: 640px)');
    const apply = () => {
      if (mqXl.matches) setCount(6);
      else if (mqSm.matches) setCount(4);
      else setCount(2);
    };
    apply();
    mqXl.addEventListener('change', apply);
    mqSm.addEventListener('change', apply);
    return () => {
      mqXl.removeEventListener('change', apply);
      mqSm.removeEventListener('change', apply);
    };
  }, []);

  return count;
}

export function FacilityPricingBlock() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const initialVisible = useInitialVisibleCount();
  const total = FACILITY_PRICING_CARD_KEYS.length;

  const visibleKeys = useMemo(() => {
    if (expanded) return [...FACILITY_PRICING_CARD_KEYS];
    return FACILITY_PRICING_CARD_KEYS.slice(0, Math.min(initialVisible, total));
  }, [expanded, initialVisible, total]);

  const hasHidden = total > initialVisible;
  const hiddenCount = total - initialVisible;

  return (
    <section
      aria-labelledby={FACILITY_PRICING_HEADING_ID}
      className="ui-section-solid-muted section-viewport relative overflow-hidden border-y border-brand-200/80 dark:border-brand-700/60"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        aria-hidden
      />

      <div className="section-viewport-scroll site-container relative z-10 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 w-full max-w-none"
        >
          <h2
            id={FACILITY_PRICING_HEADING_ID}
            className={cn(
              SECTION_H2_CLASS,
              'scroll-mt-[calc(var(--site-nav-pad)+1rem)] mb-5 text-balance !text-3xl sm:!text-4xl md:!text-5xl',
            )}
          >
            {t('pricesPage.facilityPricing.heading')}
          </h2>
          <p className={SECTION_LEAD_CLASS}>
            {t('pricesPage.facilityPricing.intro')}
          </p>
        </motion.div>

        <ul
          id={FACILITY_PRICING_LIST_ID}
          className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6"
        >
          {visibleKeys.map((key: FacilityCardKey, visibleIndex) => {
            const base = `facilitiesPage.introCardsSection.items.${key}`;
            const priceBase = `pricesPage.facilityPricing.items.${key}`;
            return (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(visibleIndex * 0.05, 0.25) }}
                className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-brand-200/85 bg-[#faf8f5] shadow-[0_28px_64px_-32px_rgba(33,24,22,0.38)] ring-1 ring-brand-900/[0.04] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_34px_72px_-28px_rgba(33,24,22,0.42)] dark:border-brand-600/75 dark:bg-brand-800/55 dark:shadow-[0_28px_68px_-30px_rgba(0,0,0,0.5)] dark:ring-brand-950/35 dark:hover:shadow-[0_36px_80px_-26px_rgba(0,0,0,0.55)] lg:rounded-3xl"
              >
                <div
                  className="pointer-events-none absolute inset-x-8 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-brand-400/45 to-transparent dark:via-brand-500/30"
                  aria-hidden
                />
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-brand-200/55 dark:border-brand-600/70">
                  <img
                    src={FACILITY_CARD_IMAGES[key]}
                    alt={t(`${base}.imgAlt`)}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 font-serif text-xl font-medium tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)] md:text-2xl md:leading-snug">
                    {t(`${base}.title`)}
                  </p>
                </div>
                <div className="relative flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                  <p className={cn(UI_BODY_SECONDARY_CLASS, 'mb-5')}>{t(`${base}.desc`)}</p>
                  <div className="mt-auto border-t border-brand-200/75 pt-5 dark:border-brand-600/70">
                    <p className="font-serif text-[1.35rem] font-normal tabular-nums leading-tight tracking-tight text-brand-950 md:text-2xl dark:text-brand-50">
                      {t(`${priceBase}.price`)}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {hasHidden && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={FACILITY_PRICING_LIST_ID}
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-brand-800 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 dark:border-brand-500 dark:bg-brand-800 dark:text-brand-50 dark:hover:bg-brand-700 dark:focus-visible:ring-brand-400 dark:focus-visible:ring-offset-brand-900"
            >
              {expanded ? t('pricesPage.facilityPricing.showLess') : t('pricesPage.facilityPricing.showMore', { count: hiddenCount })}
              <ChevronDown
                size={18}
                className={cn('shrink-0 transition-transform duration-300', expanded && 'rotate-180')}
                aria-hidden
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
