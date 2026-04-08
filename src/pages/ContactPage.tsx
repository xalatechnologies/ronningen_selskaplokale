import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, ArrowUpRight, ExternalLink, type LucideIcon } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { ContactMap } from '../components/ContactMap';

type ContactItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  href?: string;
  external?: boolean;
};

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (hash !== '#kontakt-skjema') return;
    const el = document.getElementById('kontakt-skjema');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t('contactPage.addressValue'))}`;

  const items: ContactItem[] = [
    {
      icon: Phone,
      label: t('contactPage.phoneLabel'),
      value: t('contactPage.phoneValue'),
      hint: t('contactPage.phoneHint'),
      href: 'tel:+4796665001',
    },
    {
      icon: Mail,
      label: t('contactPage.emailLabel'),
      value: t('contactPage.emailValue'),
      hint: t('contactPage.emailHint'),
      href: `mailto:${t('contactPage.emailValue')}`,
    },
    {
      icon: MapPin,
      label: t('contactPage.addressLabel'),
      value: t('contactPage.addressValue'),
      hint: t('contactPage.addressHint'),
      href: mapsSearchUrl,
      external: true,
    },
    {
      icon: Clock,
      label: t('contactPage.hoursLabel'),
      value: t('contactPage.hoursValue'),
      hint: t('contactPage.hoursHint'),
    },
  ];

  return (
    <div className="flex flex-col bg-white">
      <section
        aria-labelledby="contact-heading"
        className="section-viewport relative overflow-hidden bg-linear-to-b from-white via-brand-50/35 to-brand-50/60"
      >
        <div
          className="pointer-events-none absolute -right-[18%] top-[8%] h-[min(48vw,26rem)] w-[min(48vw,26rem)] rounded-full bg-brand-200/25 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[12%] bottom-[5%] h-[min(38vw,20rem)] w-[min(38vw,20rem)] rounded-full bg-brand-400/10 blur-[90px]"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[min(92rem,calc(100vw-2.5rem))] px-5 py-12 sm:px-6 md:py-16 lg:py-20">
          {/* Page intro — same scroll context as everything below */}
          <header className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-600"
            >
              Rønningen
            </motion.p>
            <motion.h1
              id="contact-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
              className="font-serif text-4xl tracking-tight text-brand-950 sm:text-5xl md:text-[3.25rem] md:leading-[1.08]"
            >
              {t('nav.contact')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-brand-800 md:text-lg"
            >
              {t('contactPage.intro')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg transition hover:bg-brand-800"
              >
                {t('hero.bookNow')}
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
              </button>
              <a
                href="tel:+4796665001"
                className="inline-flex items-center justify-center rounded-full border border-brand-300 bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-900 transition hover:border-brand-400 hover:bg-brand-50"
              >
                {t('contactPage.ctaRing')}
              </a>
            </motion.div>
          </header>

          {/* Single panel: row1 = contact | form · row2 = full-width map */}
          <div className="mt-12 rounded-3xl border border-brand-300/80 bg-[#f5f2ed] p-5 text-brand-900 shadow-[0_1px_0_rgba(28,22,19,0.06)] sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col gap-10 lg:gap-12">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
                {/* Left: how to reach us + cards */}
                <div className="flex flex-col gap-8 lg:col-span-4">
                  <h2 className="font-serif text-xl tracking-tight text-brand-950 md:text-2xl">
                    {t('contactPage.sectionHeading')}
                  </h2>
                  <div className="mt-3 h-px w-12 bg-brand-600/50" aria-hidden />

                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {items.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-30px' }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                        >
                          <div className="flex gap-4 rounded-2xl border border-brand-200 bg-white p-4 shadow-sm transition hover:border-brand-300 md:p-5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-200/80 bg-brand-50 text-brand-900">
                              <Icon size={20} strokeWidth={1.75} aria-hidden />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                                {item.label}
                              </p>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                  className="mt-1 inline-flex items-center gap-1.5 font-semibold text-brand-950 underline decoration-brand-400/90 underline-offset-4 transition hover:decoration-brand-600"
                                >
                                  <span className="wrap-break-word">{item.value}</span>
                                  {item.external ? (
                                    <ExternalLink size={14} className="shrink-0 text-brand-700" aria-hidden />
                                  ) : null}
                                </a>
                              ) : (
                                <p className="mt-1 font-semibold text-brand-950">{item.value}</p>
                              )}
                              <p className="mt-1.5 text-sm leading-relaxed text-brand-800">{item.hint}</p>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Right: kontakt skjema — wider column */}
                <div
                  id="kontakt-skjema"
                  className="scroll-mt-28 lg:col-span-8 lg:min-h-0"
                >
                  <h3
                    id="contact-form-heading"
                    className="font-serif text-xl tracking-tight text-brand-950 md:text-2xl">
                    {t('contactPage.formSectionTitle')}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-800 md:text-lg">
                    {t('contactPage.formSectionIntro')}
                  </p>
                  <div className="mt-8">
                    <ContactForm embedded />
                  </div>
                </div>
              </div>

              {/* Full-width map below both columns */}
              <div className="border-t border-brand-200/80 pt-10">
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {t('contactPage.mapTitle')}
                  </p>
                </div>
                <ContactMap
                  pillLabel={t('contactPage.mapPillLabel')}
                  ariaLabel={t('contactPage.mapTitle')}
                />
                <p className="mt-3 text-center text-sm font-medium text-brand-800 sm:text-left">
                  {t('contactPage.mapAddressLine')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
