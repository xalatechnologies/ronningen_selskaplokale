import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  Building2,
  CheckCircle2,
  Heart,
  Lightbulb,
  Sparkles,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ROUTES } from '../../lib/routes';

export type EventPackagePageKey = 'weddingsPage' | 'corporatePage' | 'privatePage';
export type EventPackageType = 'wedding' | 'corporate' | 'private';

type PackageTier = 'basic' | 'standard' | 'premium';

export const PACKAGE_HEADING_IDS: Record<EventPackageType, string> = {
  wedding: 'wedding-packages-heading',
  corporate: 'corporate-packages-heading',
  private: 'private-packages-heading',
};

const PACKAGE_TIERS = ['basic', 'standard', 'premium'] as const;

const PACKAGE_ICONS: Record<PackageTier, LucideIcon> = {
  basic: Building2,
  standard: Sparkles,
  premium: Heart,
};

const PACKAGE_CONFIG: Record<
  EventPackageType,
  {
    pageKey: EventPackagePageKey;
    featuredTier: PackageTier;
    featureCounts: Record<PackageTier, number>;
    hasAddOns?: boolean;
    hasNotice?: boolean;
  }
> = {
  wedding: {
    pageKey: 'weddingsPage',
    featuredTier: 'premium',
    featureCounts: { basic: 3, standard: 6, premium: 4 },
    hasAddOns: true,
  },
  corporate: {
    pageKey: 'corporatePage',
    featuredTier: 'standard',
    featureCounts: { basic: 7, standard: 5, premium: 7 },
    hasNotice: true,
  },
  private: {
    pageKey: 'privatePage',
    featuredTier: 'standard',
    featureCounts: { basic: 3, standard: 6, premium: 5 },
    hasNotice: true,
  },
};

const tierCardBase =
  'relative flex h-full flex-col overflow-hidden rounded-xl border p-6 transition-[transform,box-shadow] duration-300 sm:p-7 lg:p-8';

const tierCardLight =
  'border-white/70 bg-white/90 text-brand-900 shadow-[0_24px_70px_-34px_rgba(33,24,22,0.5)] backdrop-blur-md dark:border-brand-600/70 dark:bg-brand-800/70 dark:text-brand-50 dark:shadow-[0_28px_72px_-32px_rgba(0,0,0,0.55)] hover:-translate-y-1 hover:shadow-[0_36px_80px_-30px_rgba(33,24,22,0.44)]';

const tierCardFeatured =
  'z-[1] border-amber-500/70 bg-brand-950 text-white shadow-[0_34px_90px_-28px_rgba(0,0,0,0.62)] ring-1 ring-amber-300/55 hover:-translate-y-1 hover:shadow-[0_42px_95px_-24px_rgba(0,0,0,0.56)] lg:scale-[1.03]';

type EventPackagesBlockProps = {
  type: EventPackageType;
};

export function EventPackagesBlock({ type }: EventPackagesBlockProps) {
  const { t } = useTranslation();
  const config = PACKAGE_CONFIG[type];
  const { pageKey } = config;
  const headingId = PACKAGE_HEADING_IDS[type];

  return (
    <section
      aria-labelledby={headingId}
      className="section-viewport relative overflow-hidden border-y border-brand-200/80 bg-brand-50 dark:border-brand-700/60 dark:bg-brand-950"
    >
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-30 blur-[1px] dark:opacity-[0.18]"
        style={{ backgroundImage: 'url(/blog-spring-wedding-reception.png)' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.88),rgba(250,245,236,0.78)_44%,rgba(231,216,190,0.64))] dark:bg-[radial-gradient(circle_at_center,rgba(33,24,22,0.7),rgba(18,12,10,0.92))]" aria-hidden />
      <div
        className="pointer-events-none absolute left-[4%] top-[12%] h-[min(38vw,22rem)] w-[min(38vw,22rem)] rounded-full bg-white/55 blur-[90px] dark:bg-brand-500/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[8%] right-[3%] h-[min(34vw,19rem)] w-[min(34vw,19rem)] rounded-full bg-brand-100/55 blur-[80px] dark:bg-brand-400/8"
        aria-hidden
      />

      <div className="section-viewport-scroll site-container relative z-10 py-14 sm:py-16 md:py-20">
        <h2 id={headingId} className="sr-only scroll-mt-[calc(var(--site-nav-pad)+1rem)]">
          {t(`${pageKey}.packagesSection.introHeading`)}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-7 xl:gap-8">
          {PACKAGE_TIERS.map((tier, i) => {
            const isFeatured = tier === config.featuredTier;
            const PackageIcon = PACKAGE_ICONS[tier];
            const featureCount = config.featureCounts[tier];
            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(tierCardBase, isFeatured ? tierCardFeatured : tierCardLight)}
              >
                {isFeatured ? (
                  <div className="absolute inset-x-8 top-0 flex h-9 -translate-y-px items-center justify-center rounded-b-lg bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 px-4 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-950 shadow-md">
                    <Star className="mr-3 h-3.5 w-3.5 fill-current" aria-hidden />
                    {t(`${pageKey}.packagesSection.popularBadge`)}
                    <Star className="ml-3 h-3.5 w-3.5 fill-current" aria-hidden />
                  </div>
                ) : null}

                <div className={cn('relative mb-5 text-center', isFeatured ? 'mt-8' : 'mt-1')}>
                  <PackageIcon
                    className={cn(
                      'mx-auto mb-4 h-12 w-12 stroke-[1.35]',
                      isFeatured ? 'text-amber-300' : 'text-amber-700 dark:text-amber-300',
                    )}
                    aria-hidden
                  />
                  <p
                    className={cn(
                      'mb-2 text-sm font-bold uppercase leading-relaxed tracking-[0.35em]',
                      isFeatured ? 'text-amber-200' : 'text-brand-950 dark:text-brand-50',
                    )}
                  >
                    {t(`${pageKey}.packagesSection.items.${tier}.name`)}
                  </p>
                  <p
                    className={cn(
                      'font-serif text-4xl font-semibold tabular-nums tracking-tight md:text-[2.7rem] md:leading-[1.08]',
                      isFeatured ? 'text-white' : 'text-brand-950 dark:text-brand-50',
                    )}
                  >
                    {t(`${pageKey}.packagesSection.items.${tier}.price`)}
                  </p>
                  <p
                    className={cn(
                      'mx-auto mt-4 max-w-[18rem] text-sm leading-relaxed md:text-[0.96rem]',
                      isFeatured ? 'text-brand-100' : 'text-brand-800 dark:text-brand-100',
                    )}
                  >
                    {t(`${pageKey}.packagesSection.items.${tier}.desc`)}
                  </p>
                </div>

                <div
                  className={cn(
                    'mb-5 h-px w-full bg-gradient-to-r from-transparent to-transparent',
                    isFeatured ? 'via-brand-600' : 'via-brand-200 dark:via-brand-600',
                  )}
                />

                <p
                  className={cn(
                    'mb-3 text-xs font-bold uppercase tracking-[0.2em]',
                    isFeatured ? 'text-amber-200' : 'text-brand-950 dark:text-brand-50',
                  )}
                >
                  {t(`${pageKey}.packagesSection.includedLabel`)}
                </p>
                <ul className="mb-9 grow space-y-0 divide-y divide-brand-200/70 dark:divide-brand-600/60">
                  {Array.from({ length: featureCount }, (_, j) => (
                    <li key={`${tier}-f${j + 1}`} className="flex items-start gap-3.5 py-3 first:pt-0">
                      <div
                        className={cn(
                          'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                          isFeatured
                            ? 'bg-brand-800 text-amber-200'
                            : 'bg-brand-100 text-amber-700 dark:bg-brand-950 dark:text-amber-300',
                        )}
                      >
                        <CheckCircle2 size={15.5} strokeWidth={2} aria-hidden />
                      </div>
                      <span
                        className={cn(
                          'text-[15px] leading-relaxed md:text-[0.98rem]',
                          isFeatured ? 'text-brand-100' : 'text-brand-800 dark:text-brand-100',
                        )}
                      >
                        {t(`${pageKey}.packagesSection.items.${tier}.f${j + 1}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={ROUTES.kontakt}
                  className={cn(
                    'mt-auto inline-flex min-h-[3.1rem] items-center justify-center rounded-full px-7 py-3.5 text-center text-[11px] font-bold uppercase tracking-[0.24em] transition-all',
                    isFeatured
                      ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-brand-950 shadow-lg shadow-black/15 hover:from-amber-300 hover:to-amber-500'
                      : 'bg-brand-950 text-white shadow-md hover:bg-brand-800 dark:bg-brand-100 dark:text-brand-900 dark:shadow-none dark:hover:bg-white',
                  )}
                >
                  {t(`${pageKey}.packagesSection.ctaQuote`)}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {config.hasAddOns ? <PackageAddOns pageKey={pageKey} /> : null}
        {config.hasNotice ? <PackageNotice pageKey={pageKey} /> : null}
      </div>
    </section>
  );
}

function PackageAddOns({ pageKey }: { pageKey: EventPackagePageKey }) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 rounded-xl border border-white/70 bg-white/[0.86] p-5 shadow-[0_22px_65px_-42px_rgba(33,24,22,0.5)] backdrop-blur-md dark:border-brand-700/70 dark:bg-brand-900/70 md:mt-10 md:p-6 lg:p-7">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
            {t(`${pageKey}.packagesSection.addOns.eyebrow`)}
          </p>
          <h3 className="mt-2 font-serif text-2xl tracking-tight text-brand-950 dark:text-brand-50 md:text-3xl">
            {t(`${pageKey}.packagesSection.addOns.heading`)}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-700 dark:text-brand-200 md:text-base">
            {t(`${pageKey}.packagesSection.addOns.body`)}
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" role="list">
          {[1, 2, 3].map((n) => (
            <li key={n} className="flex items-start gap-3 rounded-lg border border-brand-200/70 bg-white/75 p-4 text-sm font-semibold text-brand-900 dark:border-brand-700 dark:bg-brand-950/30 dark:text-brand-100">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
              <span>{t(`${pageKey}.packagesSection.addOns.item${n}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PackageNotice({ pageKey }: { pageKey: EventPackagePageKey }) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 flex gap-4 rounded-xl border border-amber-700/25 bg-white/[0.88] p-5 shadow-[0_22px_65px_-42px_rgba(33,24,22,0.45)] backdrop-blur-md dark:border-amber-300/25 dark:bg-brand-900/70 md:mt-10 md:p-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-300/15 dark:text-amber-200">
        <Lightbulb className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <h3 className="font-serif text-2xl tracking-tight text-brand-950 dark:text-brand-50">
          {t(`${pageKey}.packagesSection.notice.heading`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-700 dark:text-brand-200 md:text-base">
          {t(`${pageKey}.packagesSection.notice.body`)}
        </p>
      </div>
    </div>
  );
}
