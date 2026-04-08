import { useReducedMotion } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Animation cycle length in seconds. */
  durationSec?: number;
};

/**
 * Horizontal infinite scroll strip (Magic UI–style marquee).
 * @see https://magicui.design/docs/components/marquee
 */
export function Marquee({
  className,
  reverse,
  pauseOnHover = true,
  durationSec = 45,
  children,
  ...props
}: MarqueeProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        className={cn(
          'flex w-full flex-wrap justify-center gap-5 px-0 py-1 md:justify-start md:gap-6',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn('group flex w-full overflow-hidden', className)}
      style={{ ['--marquee-duration' as string]: `${durationSec}s` }}
      {...props}
    >
      <div
        className={cn(
          'flex w-max shrink-0',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
      >
        <div className="flex shrink-0 gap-5 pr-5">{children}</div>
        <div className="flex shrink-0 gap-5 pr-5" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
