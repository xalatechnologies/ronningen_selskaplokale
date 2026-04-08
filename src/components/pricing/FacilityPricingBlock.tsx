import { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SECTION_H2_CLASS, SECTION_LEAD_CLASS } from '../../lib/typography';
import { FACILITY_CARD_IMAGES, FACILITY_CARD_KEYS, type FacilityCardKey } from '../../lib/facilityCards';

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
  const total = FACILITY_CARD_KEYS.length;

  const visibleKeys = useMemo(() => {
    if (expanded) return [...FACILITY_CARD_KEYS];
    return FACILITY_CARD_KEYS.slice(0, Math.min(initialVisible, total));
  }, [expanded, initialVisible, total]);

  const hasHidden = total > initialVisible;
  const hiddenCount = total - initialVisible;

  return (
    <section
      aria-labelledby={FACILITY_PRICING_HEADING_ID}
      className="section-viewport relative overflow-hidden border-y border-brand-200/80 bg-white"
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
          <h2 id={FACILITY_PRICING_HEADING_ID} className={cn(SECTION_H2_CLASS, 'scroll-mt-24 mb-5 text-balance !text-3xl sm:!text-4xl md:!text-5xl')}>
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
                className="flex flex-col overflow-hidden rounded-2xl border border-brand-200/90 bg-[#faf8f5] shadow-[0_1px_0_rgba(28,22,19,0.04)] ring-1 ring-brand-900/[0.03]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-brand-200/60">
                  <img
                    src={FACILITY_CARD_IMAGES[key]}
                    alt={t(`${base}.imgAlt`)}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 font-serif text-xl font-medium tracking-tight text-white drop-shadow-md md:text-2xl">
                    {t(`${base}.title`)}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="mb-4 text-sm leading-relaxed text-brand-700">{t(`${base}.desc`)}</p>
                  <div className="mt-auto border-t border-brand-200/80 pt-4">
                    <p className="font-serif text-lg font-medium tabular-nums text-brand-950 md:text-xl">
                      {t(`${priceBase}.price`)}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-brand-600">{t(`${priceBase}.note`)}</p>
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
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-brand-800 bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-900 transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
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
