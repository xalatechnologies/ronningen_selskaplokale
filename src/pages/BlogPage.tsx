import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { BLOG_CARD_IMAGES, BLOG_POST_KEYS, blogPostPath } from '../lib/blogPosts';
import { SECTION_H2_CLASS } from '../lib/typography';
import { cn } from '../lib/utils';

export const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [featuredKey, ...gridKeys] = BLOG_POST_KEYS;

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section
        aria-labelledby="blog-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-200/80 bg-linear-to-b from-white via-brand-50/40 to-brand-50/70"
      >
        <div
          className="pointer-events-none absolute -right-[15%] top-[5%] h-[min(42vw,22rem)] w-[min(42vw,22rem)] rounded-full bg-brand-300/20 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[10%] bottom-[10%] h-[min(36vw,18rem)] w-[min(36vw,18rem)] rounded-full bg-brand-500/10 blur-[90px]"
          aria-hidden
        />

        <div className="section-viewport-scroll relative z-10 mx-auto w-full max-w-[min(92rem,calc(100vw-2.5rem))] px-5 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-16 lg:pt-20">
          <header className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-600"
            >
              {t('blogPage.heroEyebrow')}
            </motion.p>
            <motion.h1
              id="blog-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.04 }}
              className={cn(SECTION_H2_CLASS, 'mb-6')}
            >
              {t('blogPage.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-brand-700 md:text-lg md:leading-relaxed"
            >
              {t('blogPage.intro')}
            </motion.p>
          </header>
        </div>
      </section>

      {/* Featured + grid */}
      <section
        className="section-viewport border-b border-brand-100 bg-white"
        aria-labelledby="blog-latest-heading"
      >
        <div className="section-viewport-scroll mx-auto w-full max-w-[min(92rem,calc(100vw-2.5rem))] px-5 py-14 sm:px-6 md:py-16 lg:py-20">
          <div className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
            <h2
              id="blog-latest-heading"
              className="font-serif text-2xl tracking-tight text-brand-950 md:text-3xl"
            >
              {t('blogPage.latestHeading')}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-brand-600 md:text-base">
              {t('blogPage.latestSub')}
            </p>
          </div>

          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <Link
              to={blogPostPath(featuredKey)}
              className="block overflow-hidden rounded-2xl border border-brand-200/90 bg-brand-50/30 shadow-[0_20px_50px_-24px_rgba(33,24,22,0.25)] outline-none transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_24px_56px_-22px_rgba(33,24,22,0.3)] focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 md:rounded-3xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-0">
                <div className="relative aspect-4/3 min-h-[220px] lg:col-span-7 lg:aspect-auto lg:min-h-[340px]">
                  <img
                    src={BLOG_CARD_IMAGES[featuredKey]}
                    alt={t('blogPage.postImageAlt', {
                      title: t(`blogPage.posts.${featuredKey}.title`),
                    })}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-brand-950/55 via-brand-950/10 to-transparent lg:bg-linear-to-r lg:from-brand-950/40 lg:via-transparent lg:to-transparent"
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-900 shadow-sm md:left-6 md:top-6 md:text-[11px]">
                    {t('blogPage.featuredBadge')}
                  </span>
                </div>
                <div className="flex flex-col justify-center border-t border-brand-200/80 bg-white p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-10 xl:p-12">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-brand-600 md:text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-0.5 font-medium text-brand-800">
                      {t(`blogPage.posts.${featuredKey}.category`)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-brand-500">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {t(`blogPage.posts.${featuredKey}.date`)}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight tracking-tight text-brand-950 md:text-3xl">
                    {t(`blogPage.posts.${featuredKey}.title`)}
                  </h3>
                  <p className="mt-4 text-pretty text-base leading-relaxed text-brand-700 md:text-[1.0625rem]">
                    {t(`blogPage.posts.${featuredKey}.excerpt`)}
                  </p>
                  <span
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-900"
                    aria-hidden
                  >
                    {t('blogPage.readMore')}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Grid */}
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {gridKeys.map((key, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.24) }}
              >
                <Link
                  to={blogPostPath(key)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-200/90 bg-white shadow-[0_12px_36px_-20px_rgba(33,24,22,0.2)] outline-none transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-18px_rgba(33,24,22,0.28)] focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={BLOG_CARD_IMAGES[key]}
                      alt={t('blogPage.postImageAlt', {
                        title: t(`blogPage.posts.${key}.title`),
                      })}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      className="absolute inset-0 bg-linear-to-t from-brand-950/25 to-transparent opacity-80"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-brand-600 md:text-xs">
                      <span className="font-medium text-brand-800">
                        {t(`blogPage.posts.${key}.category`)}
                      </span>
                      <span className="text-brand-400">·</span>
                      <time dateTime={t(`blogPage.posts.${key}.dateIso`)}>
                        {t(`blogPage.posts.${key}.date`)}
                      </time>
                    </div>
                    <h3 className="font-serif text-xl leading-snug tracking-tight text-brand-950 md:text-[1.35rem]">
                      {t(`blogPage.posts.${key}.title`)}
                    </h3>
                    <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-brand-700 md:text-base">
                      {t(`blogPage.posts.${key}.excerpt`)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-900">
                      {t('blogPage.readMore')}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
