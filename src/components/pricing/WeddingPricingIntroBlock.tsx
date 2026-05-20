import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import {
  PAGE_H1_CLASS,
  SECTION_LEAD_CLASS,
  UI_EYEBROW_CLASS,
} from '../../lib/typography';
import { WeddingPackagesBlock } from './WeddingPackagesBlock';

export function WeddingPricingIntroBlock() {
  const { t } = useTranslation();

  return (
    <>
      <section
        aria-labelledby="wedding-prices-heading"
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
            <h2
              id="wedding-prices-heading"
              className={cn(PAGE_H1_CLASS, 'md:leading-[1.05]')}
            >
              {t('weddingsPage.packagesSection.introHeading')}
            </h2>
            <div className="mx-auto mt-4 h-px w-14 bg-brand-600/35" aria-hidden />
            <p className={cn(SECTION_LEAD_CLASS, 'mt-5')}>
              {t('pricesPage.intro')}
            </p>
          </header>
        </div>
      </section>

      <WeddingPackagesBlock />
    </>
  );
}
