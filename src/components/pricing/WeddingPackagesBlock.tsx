import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ROUTES } from '../../lib/routes';
import { SECTION_H2_CLASS } from '../../lib/typography';

const WEDDINGS_PACKAGE_IDS = ['basic', 'plus', 'premium'] as const;

const WEDDINGS_PACKAGE_FEATURE_COUNT: Record<(typeof WEDDINGS_PACKAGE_IDS)[number], number> = {
  basic: 3,
  plus: 4,
  premium: 6,
};

/** Stable id for in-page anchors and deep links from other pages. */
export const WEDDING_PACKAGES_HEADING_ID = 'wedding-packages-heading';

export function WeddingPackagesBlock() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby={WEDDING_PACKAGES_HEADING_ID}
      className="section-viewport relative overflow-hidden border-y border-brand-200/80 bg-gradient-to-b from-white to-brand-50/50"
    >
      <div
        className="pointer-events-none absolute left-[8%] top-[18%] h-[min(38vw,22rem)] w-[min(38vw,22rem)] rounded-full bg-brand-200/25 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[6%] h-[min(32vw,18rem)] w-[min(32vw,18rem)] rounded-full bg-brand-400/10 blur-[80px]"
        aria-hidden
      />

      <div className="section-viewport-scroll relative z-10 mx-auto max-w-[1800px] px-5 py-16 sm:px-8 sm:py-20 md:px-14 md:py-24 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-2xl md:mb-12"
        >
          <h2 id={WEDDING_PACKAGES_HEADING_ID} className={cn(SECTION_H2_CLASS, 'scroll-mt-24 mb-5')}>
            {t('weddingsPage.packagesSection.heading')}
          </h2>
          <p className="text-base leading-relaxed text-brand-700 md:text-lg md:leading-relaxed">
            {t('weddingsPage.packagesSection.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-3 lg:gap-8">
          {WEDDINGS_PACKAGE_IDS.map((pkgId, i) => {
            const isPlus = pkgId === 'plus';
            const featureCount = WEDDINGS_PACKAGE_FEATURE_COUNT[pkgId];
            return (
              <motion.div
                key={pkgId}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex h-full flex-col rounded-2xl border p-8 md:p-9 ${
                  isPlus
                    ? 'z-[1] border-brand-800 bg-brand-900 text-white shadow-2xl shadow-brand-900/30 ring-2 ring-brand-400/20'
                    : 'border-brand-200/90 bg-white/95 text-brand-900 shadow-[0_1px_0_rgba(28,22,19,0.04)] ring-1 ring-brand-900/[0.04]'
                }`}
              >
                {isPlus && (
                  <div className="absolute right-4 top-4 rounded-full bg-brand-700 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                    {t('weddingsPage.packagesSection.popularBadge')}
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`font-serif text-2xl tracking-tight md:text-[1.65rem] ${isPlus ? 'text-white' : 'text-brand-950'}`}
                  >
                    <span className="block">{t(`weddingsPage.packagesSection.items.${pkgId}.name`)}</span>
                    <span
                      className={`mt-2 block text-[1.35rem] font-light tabular-nums tracking-tight md:text-2xl ${
                        isPlus ? 'text-brand-200' : 'text-brand-600'
                      }`}
                    >
                      {t(`weddingsPage.packagesSection.items.${pkgId}.price`)}
                    </span>
                  </h3>
                  <p
                    className={`mt-4 text-[15px] leading-relaxed md:text-base ${isPlus ? 'text-brand-100' : 'text-brand-700'}`}
                  >
                    {t(`weddingsPage.packagesSection.items.${pkgId}.desc`)}
                  </p>
                </div>

                <div className={`mb-6 h-px w-full ${isPlus ? 'bg-brand-700' : 'bg-brand-200'}`} />

                <ul className="mb-8 grow space-y-3.5">
                  {Array.from({ length: featureCount }, (_, j) => (
                    <li key={`${pkgId}-f${j + 1}`} className="flex items-start gap-3">
                      <div className={`mt-0.5 shrink-0 ${isPlus ? 'text-brand-400' : 'text-brand-600'}`}>
                        <CheckCircle2 size={18} strokeWidth={2.25} aria-hidden />
                      </div>
                      <span className={`text-[15px] leading-relaxed ${isPlus ? 'text-brand-100' : 'text-brand-800'}`}>
                        {t(`weddingsPage.packagesSection.items.${pkgId}.f${j + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={ROUTES.kontakt}
                  className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                    isPlus
                      ? 'bg-white text-brand-900 hover:bg-brand-100'
                      : 'bg-brand-900 text-white hover:bg-brand-800'
                  }`}
                >
                  {t('weddingsPage.packagesSection.ctaQuote')}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
