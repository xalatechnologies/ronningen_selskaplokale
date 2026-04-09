import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ROUTES } from '../../lib/routes';
import { SECTION_H2_CLASS, SECTION_LEAD_CLASS } from '../../lib/typography';

const WEDDINGS_PACKAGE_IDS = ['basic', 'plus', 'premium'] as const;

const WEDDINGS_PACKAGE_FEATURE_COUNT: Record<(typeof WEDDINGS_PACKAGE_IDS)[number], number> = {
  basic: 3,
  plus: 6,
  premium: 4,
};

/** Stable id for in-page anchors and deep links from other pages. */
export const WEDDING_PACKAGES_HEADING_ID = 'wedding-packages-heading';

const tierCardBase =
  'relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border p-8 transition-[transform,box-shadow] duration-300 md:p-9 lg:rounded-3xl';

const tierCardLight =
  'border-brand-200/75 bg-white/92 text-brand-900 shadow-[0_28px_70px_-34px_rgba(33,24,22,0.38)] backdrop-blur-sm dark:border-brand-600/70 dark:bg-brand-800/50 dark:text-brand-50 dark:shadow-[0_28px_72px_-32px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_36px_80px_-30px_rgba(33,24,22,0.42)] dark:hover:shadow-[0_36px_84px_-28px_rgba(0,0,0,0.58)]';

const tierCardFeatured =
  'z-[1] border-brand-700/90 bg-brand-900 text-white shadow-[0_32px_80px_-32px_rgba(0,0,0,0.55)] ring-2 ring-amber-400/25 dark:ring-amber-300/20 hover:-translate-y-1 hover:shadow-[0_40px_90px_-28px_rgba(0,0,0,0.5)]';

export function WeddingPackagesBlock() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby={WEDDING_PACKAGES_HEADING_ID}
      className="ui-section-wash section-viewport relative overflow-hidden border-y border-brand-200/80 dark:border-brand-700/60"
    >
      <div
        className="pointer-events-none absolute left-[8%] top-[18%] h-[min(38vw,22rem)] w-[min(38vw,22rem)] rounded-full bg-brand-200/25 blur-[90px] dark:bg-brand-500/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[12%] right-[6%] h-[min(32vw,18rem)] w-[min(32vw,18rem)] rounded-full bg-brand-400/10 blur-[80px] dark:bg-brand-400/8"
        aria-hidden
      />

      <div className="section-viewport-scroll site-container relative z-10 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 w-full max-w-3xl md:mb-14"
        >
          <h2
            id={WEDDING_PACKAGES_HEADING_ID}
            className={cn(SECTION_H2_CLASS, 'scroll-mt-[calc(var(--site-nav-pad)+1rem)] mb-5')}
          >
            {t('weddingsPage.packagesSection.heading')}
          </h2>
          <p className={SECTION_LEAD_CLASS}>{t('weddingsPage.packagesSection.intro')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-7 xl:gap-8">
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
                className={cn(tierCardBase, isPlus ? tierCardFeatured : tierCardLight)}
              >
                {!isPlus ? (
                  <div
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/45 to-transparent dark:via-brand-500/35"
                    aria-hidden
                  />
                ) : null}

                {isPlus ? (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-amber-700/90 to-brand-800 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md">
                    {t('weddingsPage.packagesSection.popularBadge')}
                  </div>
                ) : null}

                <div className="relative mb-7 mt-1">
                  <p
                    className={cn(
                      'mb-2 text-xs font-semibold uppercase leading-relaxed tracking-[0.22em]',
                      isPlus
                        ? 'text-amber-100'
                        : 'text-brand-800 dark:text-brand-100',
                    )}
                  >
                    {t(`weddingsPage.packagesSection.items.${pkgId}.name`)}
                  </p>
                  <p
                    className={cn(
                      'font-serif text-3xl font-light tabular-nums tracking-tight md:text-[2.15rem] md:leading-[1.15]',
                      isPlus ? 'text-white' : 'text-brand-950 dark:text-brand-50',
                    )}
                  >
                    {t(`weddingsPage.packagesSection.items.${pkgId}.price`)}
                  </p>
                  <p
                    className={cn(
                      'mt-4 font-serif text-[1.0625rem] font-normal leading-relaxed md:text-lg',
                      isPlus ? 'text-brand-100' : 'text-brand-800 dark:text-brand-100',
                    )}
                  >
                    {t(`weddingsPage.packagesSection.items.${pkgId}.desc`)}
                  </p>
                </div>

                <div
                  className={cn(
                    'mb-6 h-px w-full bg-gradient-to-r from-transparent to-transparent',
                    isPlus ? 'via-brand-600' : 'via-brand-200 dark:via-brand-600',
                  )}
                />

                <ul className="mb-9 grow space-y-0 divide-y divide-brand-200/70 dark:divide-brand-600/60">
                  {Array.from({ length: featureCount }, (_, j) => (
                    <li key={`${pkgId}-f${j + 1}`} className="flex items-start gap-3.5 py-3 first:pt-0">
                      <div
                        className={cn(
                          'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                          isPlus ? 'bg-brand-800 text-amber-200' : 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300',
                        )}
                      >
                        <CheckCircle2 size={16} strokeWidth={2.25} aria-hidden />
                      </div>
                      <span
                        className={cn(
                          'text-[15px] leading-relaxed md:text-[0.98rem]',
                          isPlus ? 'text-brand-100' : 'text-brand-800 dark:text-brand-100',
                        )}
                      >
                        {t(`weddingsPage.packagesSection.items.${pkgId}.f${j + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={ROUTES.kontakt}
                  className={cn(
                    'mt-auto inline-flex min-h-[3.25rem] items-center justify-center rounded-full px-7 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.24em] transition-all',
                    isPlus
                      ? 'bg-white text-brand-900 shadow-lg shadow-black/15 hover:bg-brand-50 dark:bg-brand-100 dark:text-brand-900 dark:hover:bg-white'
                      : 'bg-brand-900 text-white shadow-md hover:bg-brand-800 dark:bg-brand-100 dark:text-brand-900 dark:shadow-none dark:hover:bg-white',
                  )}
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
