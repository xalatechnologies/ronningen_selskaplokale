/**
 * Home hero confetti — same underlying library as Magic UI Confetti ([Magic UI docs](https://magicui.design/docs/components/confetti)).
 */
import confetti from 'canvas-confetti';

/** Warm palette aligned with site brand tokens (`index.css` @theme). */
const HERO_CONFETTI_COLORS = ['#fdf8f6', '#f2e8e5', '#eaddd7', '#d2bab0', '#bfa094', '#ffffff'];

export function fireHomeHeroConfetti(pointer?: { clientX: number; clientY: number }) {
  const origin =
    pointer != null
      ? {
          x: pointer.clientX / window.innerWidth,
          y: pointer.clientY / window.innerHeight,
        }
      : { x: 0.5, y: 0.42 };

  void confetti({
    particleCount: 100,
    spread: 64,
    startVelocity: 36,
    ticks: 110,
    gravity: 0.9,
    origin,
    colors: HERO_CONFETTI_COLORS,
    zIndex: 200,
    disableForReducedMotion: true,
  });
}
