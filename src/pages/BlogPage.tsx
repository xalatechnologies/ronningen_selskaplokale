import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { SECTION_H2_CLASS } from '../lib/typography';
import { cn } from '../lib/utils';
import { BLOG_CARD_IMAGES, blogPostPath, type BlogPostKey } from '../lib/blogPosts';
import { kontaktSkjemaHash } from '../lib/routes';
import { useRouteMeta } from '../lib/useRouteMeta';

/** Editorial order: featured first, then newest-oriented flow. */
const BLOG_LIST_ORDER: BlogPostKey[] = [
  'pixlightWeddingReport',
  'springWedding',
  'corporateHost',
  'familyCelebration',
  'venueTour',
];

export const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  useRouteMeta(t('blogPage.metaTitle'), t('blogPage.metaDescription'));

  return (
    <div className="ui-page-shell">
      <section
        aria-labelledby="blog-latest-heading"
        className="section-viewport relative overflow-hidden border-b border-brand-100 bg-white dark:border-brand-800 dark:bg-brand-950"
      >
        <div
          className="pointer-events-none absolute right-0 top-[20%] h-[min(50vw,28rem)] w-[min(50vw,28rem)] translate-x-1/4 rounded-full bg-brand-100/35 blur-[120px] dark:bg-brand-800/20"
          aria-hidden
        />

        <div className="section-viewport-scroll site-container relative z-10 py-16 md:py-20 lg:py-24">
          <div className="mb-12 max-w-2xl md:mb-14 lg:mb-16">
            <h1 id="blog-latest-heading" className={cn(SECTION_H2_CLASS, 'mb-4 text-balance')}>
              {t('blogPage.latestHeading')}
            </h1>
            <p className="font-sans text-base leading-relaxed text-brand-600 md:text-lg dark:text-brand-300">
              {t('blogPage.latestSub')}
            </p>
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-7 p-0 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-9">
            {BLOG_LIST_ORDER.map((key, i) => {
              const title = t(`blogPage.posts.${key}.title`);
              const excerpt = t(`blogPage.posts.${key}.excerpt`);
              const category = t(`blogPage.posts.${key}.category`);
              const date = t(`blogPage.posts.${key}.date`);
              const dateIso = t(`blogPage.posts.${key}.dateIso`);
              const imgAlt = t('blogPage.postImageAlt', { title });
              const href = blogPostPath(key);
              const isFeatured = i === 0;

              return (
                <motion.li
                  key={key}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: reduceMotion ? 0 : i * 0.06 }}
                  className={cn(isFeatured && 'md:col-span-2 lg:col-span-2')}
                >
                  <Link
                    to={href}
                    className={cn(
                      'group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-brand-200/90 bg-white shadow-sm ring-1 ring-black/[0.02] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-xl dark:border-brand-700 dark:bg-brand-900/35 dark:ring-white/[0.04] dark:hover:border-brand-500 dark:hover:bg-brand-900/55',
                    )}
                    aria-label={`${t('blogPage.readMore')}: ${title}`}
                  >
                    <div
                      className={cn(
                        'relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-brand-100 dark:bg-brand-800/60',
                        isFeatured && 'lg:aspect-[21/9]',
                      )}
                    >
                      <img
                        src={BLOG_CARD_IMAGES[key]}
                        alt={imgAlt}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                        loading={i < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        referrerPolicy={BLOG_CARD_IMAGES[key].startsWith('http') ? 'no-referrer' : undefined}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-950/45 via-brand-950/5 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"
                        aria-hidden
                      />
                      {isFeatured ? (
                        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-900 shadow-sm dark:bg-brand-950/90 dark:text-brand-50">
                          {t('blogPage.featuredBadge')}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-brand-500 dark:text-brand-400">
                        <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-brand-800 dark:bg-brand-800/90 dark:text-brand-100">
                          {category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                          <time dateTime={dateIso}>{date}</time>
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-normal leading-snug tracking-tight text-brand-950 md:text-2xl dark:text-brand-50">
                        <span className="transition-colors group-hover:text-brand-800 dark:group-hover:text-brand-100">
                          {title}
                        </span>
                      </h3>
                      {excerpt.trim() ? (
                        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-brand-600 dark:text-brand-300 md:text-[0.9375rem]">
                          {excerpt}
                        </p>
                      ) : (
                        <div className="min-h-0 flex-1" aria-hidden />
                      )}
                      <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-700 transition group-hover:gap-2 dark:text-brand-300">
                        {t('blogPage.readMore')}
                        <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mx-auto mt-16 max-w-2xl rounded-2xl border border-brand-200/90 bg-brand-50/60 px-8 py-10 text-center dark:border-brand-700 dark:bg-brand-900/40 md:mt-20 md:px-10 md:py-12"
          >
            <h3 className="font-serif text-2xl font-normal tracking-tight text-brand-950 dark:text-brand-50 md:text-3xl">
              {t('blogPage.ctaHeading')}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-brand-600 dark:text-brand-300 md:text-lg">
              {t('blogPage.ctaBody')}
            </p>
            <Link
              to={kontaktSkjemaHash()}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-900 px-8 py-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-white shadow-lg transition hover:bg-brand-800 hover:shadow-xl dark:bg-brand-100 dark:text-brand-900 dark:hover:bg-white"
            >
              {t('blogPage.ctaButton')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
