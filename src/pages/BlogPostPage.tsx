import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { BLOG_CARD_IMAGES, blogPostKeyFromSlug } from '../lib/blogPosts';
import { ROUTES } from '../lib/routes';
import type { BlogPostKey } from '../lib/blogPosts';
import { PAGE_H1_CLASS, SECTION_LEAD_CLASS } from '../lib/typography';
import { cn } from '../lib/utils';

function postBodyParagraphs(t: ReturnType<typeof useTranslation>['t'], key: BlogPostKey): string[] {
  const raw = t(`blogPage.posts.${key}.body`, { returnObjects: true });
  if (Array.isArray(raw)) {
    return raw.filter((p): p is string => typeof p === 'string');
  }
  return [];
}

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const key = blogPostKeyFromSlug(slug);

  if (!key) {
    return <Navigate to={ROUTES.blogg} replace />;
  }

  const title = t(`blogPage.posts.${key}.title`);
  const paragraphs = postBodyParagraphs(t, key);
  const imageAlt = t('blogPage.postImageAlt', { title });

  return (
    <div className="ui-page-shell">
      <nav
        aria-label={t('blogPage.backToBlog')}
        className="ui-blog-post-nav border-b border-brand-100 bg-brand-50/30 dark:border-brand-800 dark:bg-brand-950/40"
      >
        <div className="site-container py-4">
          <Link
            to={ROUTES.blogg}
            className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold uppercase tracking-[0.16em] text-brand-800 outline-none transition hover:text-brand-950 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:text-brand-200 dark:hover:text-brand-50 dark:focus-visible:ring-brand-400 dark:focus-visible:ring-offset-brand-950"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {t('blogPage.backToBlog')}
          </Link>
        </div>
      </nav>

      <article aria-labelledby="blog-post-heading">
        <header className="border-b border-brand-100 dark:border-brand-800">
          <div className="relative aspect-[21/9] min-h-[200px] w-full md:aspect-[24/9] md:min-h-[280px]">
            <img
              src={BLOG_CARD_IMAGES[key]}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-brand-950/30 to-transparent"
              aria-hidden
            />
          </div>
          <div className="site-container pb-10 pt-8 md:pb-12 md:pt-10">
            <div className="mx-auto w-full max-w-none">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-brand-600 md:text-sm dark:text-brand-400">
              <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 font-medium text-brand-800 dark:bg-brand-800/90 dark:text-brand-100">
                {t(`blogPage.posts.${key}.category`)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-brand-500 dark:text-brand-500">
                <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <time dateTime={t(`blogPage.posts.${key}.dateIso`)}>
                  {t(`blogPage.posts.${key}.date`)}
                </time>
              </span>
            </div>
            <motion.h1
              id="blog-post-heading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn(PAGE_H1_CLASS, 'text-brand-950')}
            >
              {title}
            </motion.h1>
            </div>
          </div>
        </header>

        <div className="section-viewport-scroll site-container py-12 md:py-16">
          <p className={cn(SECTION_LEAD_CLASS, 'font-medium')}>
            {t(`blogPage.posts.${key}.excerpt`)}
          </p>
          <div className="mx-auto mt-10 w-full max-w-3xl space-y-6 text-pretty text-base leading-relaxed text-brand-700 md:text-[1.0625rem] md:leading-relaxed dark:text-brand-200">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl border-t border-brand-100 pt-10 text-sm text-brand-500 dark:border-brand-800 dark:text-brand-500">
            <Link
              to={ROUTES.blogg}
              className="font-semibold text-brand-800 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-950 dark:text-brand-300 dark:decoration-brand-600 dark:hover:text-brand-50"
            >
              {t('blogPage.backToBlog')}
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
};
