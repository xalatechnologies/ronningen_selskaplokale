import type { MouseEvent } from 'react';
import { cn } from '../lib/utils';

export type HeroScrollHintProps = {
  /** Element `id` to scroll to (next section below the hero). */
  targetId: string;
  ariaLabel?: string;
  className?: string;
};

export function HeroScrollHint({
  targetId,
  ariaLabel = 'Scroll ned til neste seksjon',
  className,
}: HeroScrollHintProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={cn(
        'pointer-events-auto absolute bottom-[max(0.25rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center p-3 opacity-[0.92] transition-opacity duration-300 hover:opacity-100 md:bottom-6',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        className,
      )}
      aria-label={ariaLabel}
    >
      <span
        className="relative flex h-11 w-6 shrink-0 items-start justify-center overflow-hidden rounded-full border border-white/45 pt-2.5"
        aria-hidden
      >
        <span className="hero-scroll-hint-wheel block h-2 w-1 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
      </span>
    </a>
  );
}
