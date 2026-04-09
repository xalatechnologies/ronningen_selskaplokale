import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  HOME_PARTNER_INITIALS,
  HOME_PARTNER_LINKS,
  homePartnerFaviconUrl,
  type HomePartnerKey,
} from '../lib/homePartners';
import { kontaktSkjemaHash } from '../lib/routes';
import { cn } from '../lib/utils';

type Props = {
  partnerKey: HomePartnerKey;
  className?: string;
};

export const HomePartnerCard: FC<Props> = ({ partnerKey, className }) => {
  const { t } = useTranslation();
  const [faviconFailed, setFaviconFailed] = useState(false);
  const href = HOME_PARTNER_LINKS[partnerKey];
  const name = t(`homePartners.items.${partnerKey}.name`);
  const desc = t(`homePartners.items.${partnerKey}.desc`);
  const faviconUrl = homePartnerFaviconUrl(href);
  const initial = HOME_PARTNER_INITIALS[partnerKey];
  const linkLabel = t('homePartners.websiteLabel');
  const showLogo = Boolean(faviconUrl) && !faviconFailed;

  const body = (
    <article
      className={cn(
        'flex h-full w-full flex-col rounded-2xl border border-brand-200/90 bg-white p-4 shadow-[0_8px_28px_-18px_rgba(33,24,22,0.35)] transition-[box-shadow,transform,border-color] duration-300',
        'dark:border-brand-600 dark:bg-brand-800/95 dark:shadow-[0_12px_36px_-16px_rgba(0,0,0,0.45)]',
        'group-hover:-translate-y-0.5 group-hover:border-brand-300 group-hover:shadow-[0_16px_40px_-20px_rgba(33,24,22,0.45)] dark:group-hover:border-brand-500',
        className,
      )}
    >
      <div className="flex gap-3">
        <div
          className={cn(
            'flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-200/90 bg-linear-to-br from-white to-brand-50/90 sm:h-14 sm:w-14 dark:border-brand-600 dark:from-brand-900 dark:to-brand-800',
          )}
        >
          {showLogo ? (
            <img
              src={faviconUrl!}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              loading="lazy"
              decoding="async"
              onError={() => setFaviconFailed(true)}
            />
          ) : (
            <span className="font-serif text-lg font-semibold tabular-nums text-brand-900 sm:text-xl dark:text-brand-100">
              {initial}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base font-semibold leading-snug tracking-tight text-brand-950 sm:text-[1.0625rem] dark:text-brand-50">
            {name}
          </h3>
          <p className="mt-1.5 text-left text-sm leading-snug text-brand-800 dark:text-brand-200">
            {desc}
          </p>
        </div>
      </div>
      <div className="mt-3 border-t border-brand-100 pt-2.5 dark:border-brand-600">
        {href ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-900 dark:text-brand-100">
            {linkLabel}
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-900 dark:text-brand-100">
            {t('homePartners.noWebsite')}
            <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
          </span>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      to={kontaktSkjemaHash()}
      className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      {body}
    </Link>
  );
};
