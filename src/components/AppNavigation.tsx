/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, MessageCircle, Moon, SendHorizontal, Sun, X } from 'lucide-react';
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react';
import { cn } from '../lib/utils';
import { ROUTES, kontaktSkjemaHash } from '../lib/routes';
import { appendConversation, detectLanguage } from '../lib/customerAssistant';

/** Top bar height — keep in sync with main `pt-24` and `--site-nav-pad`. */
const TOP_NAV_H = 'h-24';

const THEME_STORAGE_KEY = 'site-theme';

function readDomDark(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
}

function applyDomDark(next: boolean) {
  document.documentElement.classList.toggle('dark', next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light');
  } catch {
    /* ignore quota / private mode */
  }
}

/** Full footer height — chat FAB stays this far above the viewport bottom at all times (no scroll chasing). */
function footerReserveBottomPx(footer: HTMLElement): number {
  return footer.offsetHeight;
}

/** True when the main content behind the chat FAB reads as a dark surface → use a light FAB for contrast. */
function isDarkSurfaceBehindChatFab(hitTarget: Element | null): boolean {
  let node: Element | null = hitTarget;
  while (node && node !== document.documentElement) {
    if (node instanceof HTMLElement) {
      const tag = node.tagName;
      const c = typeof node.className === 'string' ? node.className : '';
      if (tag === 'SECTION') {
        if (c.includes('bg-brand-900') || c.includes('bg-brand-950')) return true;
        if (
          c.includes('section-viewport-hero') &&
          (c.includes('home-hero') || c.includes('hero-below-nav'))
        ) {
          return true;
        }
      }
      if (tag === 'FOOTER' && c.includes('bg-brand-900')) return true;
    }
    node = node.parentElement;
  }
  return false;
}

function useNavLinks() {
  const { t } = useTranslation();
  return [
    { name: t('nav.home'), path: ROUTES.home },
    { name: t('nav.weddings'), path: ROUTES.bryllup },
    { name: t('nav.corporate'), path: ROUTES.bedrift },
    { name: t('nav.private'), path: ROUTES.selskap },
    { name: t('nav.facilities'), path: ROUTES.fasiliteter },
    { name: t('nav.prices'), path: ROUTES.priser },
    { name: t('nav.gallery'), path: ROUTES.galleri },
    { name: t('nav.blog'), path: ROUTES.blogg },
  ];
}

/** Top bar (desktop): subset of routes shown inline — rest stay in the mobile drawer. */
const DESKTOP_HEADER_PATHS = new Set<string>([
  ROUTES.bryllup,
  ROUTES.bedrift,
  ROUTES.selskap,
  ROUTES.priser,
  ROUTES.galleri,
  ROUTES.blogg,
]);

export function AppNavigation() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const navLinks = useNavLinks();
  const desktopNavLinks = navLinks.filter((link) => DESKTOP_HEADER_PATHS.has(link.path));

  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatFabOnDark, setChatFabOnDark] = useState(false);
  const [chatFabBottomPx, setChatFabBottomPx] = useState(20);
  const [chatPanelBottomPx, setChatPanelBottomPx] = useState(80);
  const [chatInput, setChatInput] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; text: string }[]>(() => [
    { role: 'assistant', text: t('chat.welcomeMessage') },
  ]);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerPanelRef = useRef<HTMLElement>(null);
  const prevMenuOpen = useRef(false);

  const [isDark, setIsDark] = useState(readDomDark);

  const toggleTheme = useCallback(() => {
    const next = !readDomDark();
    applyDomDark(next);
    setIsDark(next);
  }, []);

  const updateChatFabContrast = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const md = window.matchMedia('(min-width: 768px)').matches;
    const fabH = md ? 56 : 48;
    const x = Math.max(4, window.innerWidth - 88);
    const y = Math.max(4, window.innerHeight - chatFabBottomPx - fabH / 2);
    const hit = document.elementFromPoint(x, y);
    setChatFabOnDark(isDarkSurfaceBehindChatFab(hit));
  }, [chatFabBottomPx]);

  useLayoutEffect(() => {
    if (!chatOpen) return;
    const el = chatMessagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, chatOpen]);

  useEffect(() => {
    updateChatFabContrast();
    const raf = requestAnimationFrame(updateChatFabContrast);
    const timer = window.setTimeout(updateChatFabContrast, 150);
    const onMove = () => updateChatFabContrast();
    window.addEventListener('scroll', onMove, { passive: true });
    document.addEventListener('scroll', onMove, { passive: true, capture: true });
    window.addEventListener('resize', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onMove);
      document.removeEventListener('scroll', onMove, { capture: true });
      window.removeEventListener('resize', onMove);
    };
  }, [location.pathname, chatOpen, updateChatFabContrast]);

  useLayoutEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || !(footer instanceof HTMLElement)) return;

    const updateInset = () => {
      const md = window.matchMedia('(min-width: 768px)').matches;
      const margin = md ? 24 : 20;
      const fabH = md ? 56 : 48;
      const stackGap = md ? 16 : 12;
      const reserve = footerReserveBottomPx(footer);
      setChatFabBottomPx(reserve + margin);
      setChatPanelBottomPx(reserve + margin + fabH + stackGap);
    };

    const ro = new ResizeObserver(updateInset);
    ro.observe(footer);
    window.addEventListener('resize', updateInset);
    const mq = window.matchMedia('(min-width: 768px)');
    mq.addEventListener('change', updateInset);
    updateInset();

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateInset);
      mq.removeEventListener('change', updateInset);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      const id = requestAnimationFrame(() => {
        const first = drawerPanelRef.current?.querySelector<HTMLElement>('nav a[href]');
        first?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (prevMenuOpen.current && !menuOpen) {
      menuButtonRef.current?.focus();
    }
    prevMenuOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const lng = (i18n.resolvedLanguage ?? i18n.language).startsWith('no') ? 'no' : 'en';
    document.documentElement.lang = lng;
  }, [i18n.language, i18n.resolvedLanguage]);

  const resolvedLang = i18n.resolvedLanguage ?? i18n.language;
  const isNorwegian = resolvedLang.startsWith('no');

  const siteChatLang = i18n.language === 'no' ? 'no' : 'en';

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setMessages((prev) => {
      const next = appendConversation(prev, text, replyCount, siteChatLang);
      setReplyCount(next.nextReplyCount);
      return next.nextMessages;
    });
    setChatInput('');
  };

  const isNavActive = (path: string) => {
    if (path === ROUTES.blogg) {
      return location.pathname === ROUTES.blogg || location.pathname.startsWith(`${ROUTES.blogg}/`);
    }
    const hashIdx = path.indexOf('#');
    if (hashIdx !== -1) {
      const p = path.slice(0, hashIdx);
      const h = path.slice(hashIdx + 1);
      return location.pathname === p && location.hash === `#${h}`;
    }
    return location.pathname === path;
  };

  const closeMenu = () => setMenuOpen(false);

  const navTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'tween' as const, duration: 0.32, ease: [0.32, 0.72, 0, 1] as const };

  const brandLinkClass =
    'flex min-w-0 shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm md:gap-3 dark:focus-visible:ring-brand-100 dark:focus-visible:ring-offset-brand-950';

  const menuPanelLinks = (
    <ul className="m-0 list-none space-y-1 p-0">
      {navLinks.map((link) => {
        const active = isNavActive(link.path);
        return (
          <li key={link.path}>
            <Link
              to={link.path}
              onClick={closeMenu}
              className={cn(
                'flex min-h-11 items-center border-r-2 rounded-l-xl py-3 pl-3 pr-4 font-serif text-lg tracking-tight transition-colors',
                active
                  ? 'border-brand-900 bg-brand-50/85 font-bold text-brand-950 dark:border-brand-300 dark:bg-brand-800/70 dark:text-brand-50'
                  : 'border-transparent font-semibold text-brand-900 hover:bg-brand-50/60 hover:text-brand-950 dark:text-brand-200 dark:hover:bg-brand-800/50 dark:hover:text-white'
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Top bar: grid on md+ (logo | nav+CTA); mobile hamburger → drawer (full list) */}
      <header
        className={cn(
          'site-header-silk fixed left-0 right-0 top-0 z-50 border-b border-brand-100 bg-white/95 shadow-sm backdrop-blur-md transition-colors dark:border-brand-800 dark:bg-brand-950/95',
          TOP_NAV_H
        )}
      >
        {/* Logo (left) | primary nav (center, md+) | language, theme, kontakt, menu (right). Shell: site-container (15px gutters). */}
        <div
          className={cn(
            'site-container flex h-full min-w-0 items-center justify-between gap-2',
            'md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:justify-items-stretch md:gap-3 lg:gap-4'
          )}
        >
          <Link to="/" onClick={closeMenu} className={cn(brandLinkClass, 'min-w-0 justify-self-start')}>
            <img
              src="/logo.png"
              alt=""
              width={120}
              height={120}
              className="h-11 w-auto shrink-0 object-contain object-left md:h-[3.25rem]"
              decoding="async"
            />
            <span className="flex min-w-0 flex-col items-start justify-center leading-none">
              <span className="truncate font-serif text-lg font-bold tracking-tight text-brand-900 md:text-xl dark:text-brand-50">
                {t('branding.navLine1')}
              </span>
              <span className="mt-0.5 block w-full -translate-x-[2px] text-center font-serif text-sm font-semibold tracking-tight text-brand-800 md:text-base dark:text-brand-200">
                {t('branding.navLine2')}
              </span>
            </span>
          </Link>

          <nav
            className="hidden min-w-0 flex-wrap items-center justify-center gap-x-5 gap-y-1 md:flex lg:gap-x-7 xl:gap-x-8"
            aria-label={t('nav.menuLabel')}
          >
            {desktopNavLinks.map((link) => {
              const active = isNavActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative shrink-0 py-2 text-[13px] uppercase tracking-[0.2em] transition-all duration-300',
                    active
                      ? 'font-bold text-brand-950 dark:text-brand-50'
                      : 'font-semibold text-brand-900 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white'
                  )}
                >
                  {link.name}
                  {active ? (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-950 dark:bg-brand-200"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-1 sm:gap-1.5 md:gap-2 md:justify-self-end lg:gap-2.5">
            <div
              role="group"
              aria-label={t('nav.language')}
              className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50/60 p-0.5 dark:border-brand-600 dark:bg-brand-800/50"
            >
              <button
                type="button"
                className={cn(
                  'rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors md:px-2.5',
                  isNorwegian
                    ? 'bg-brand-900 text-white dark:bg-brand-100 dark:text-brand-900'
                    : 'text-brand-800 hover:bg-brand-100 dark:text-brand-200 dark:hover:bg-brand-700/80'
                )}
                aria-pressed={isNorwegian}
                aria-label={t('nav.switchToNorwegian')}
                onClick={() => i18n.changeLanguage('no')}
              >
                {t('nav.languageNorwegianShort')}
              </button>
              <button
                type="button"
                className={cn(
                  'rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors md:px-2.5',
                  !isNorwegian
                    ? 'bg-brand-900 text-white dark:bg-brand-100 dark:text-brand-900'
                    : 'text-brand-800 hover:bg-brand-100 dark:text-brand-200 dark:hover:bg-brand-700/80'
                )}
                aria-pressed={!isNorwegian}
                aria-label={t('nav.switchToEnglish')}
                onClick={() => i18n.changeLanguage('en')}
              >
                {t('nav.languageEnglishShort')}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-brand-900 transition-colors hover:bg-brand-100 dark:text-brand-100 dark:hover:bg-brand-800/80 md:h-11 md:w-11"
              aria-label={isDark ? t('nav.themeSwitchToLight') : t('nav.themeSwitchToDark')}
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={22} aria-hidden /> : <Moon size={22} aria-hidden />}
            </button>

            <Link
              to={kontaktSkjemaHash()}
              onClick={closeMenu}
              className="flex h-10 shrink-0 items-center justify-center rounded-full bg-brand-900 px-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-brand-800 hover:shadow-xl dark:bg-brand-100 dark:text-brand-900 dark:hover:bg-white md:h-11 md:px-4 md:text-[11px] md:tracking-[0.24em]"
            >
              {t('nav.contact')}
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-brand-900 transition-colors hover:bg-brand-50 dark:text-brand-100 dark:hover:bg-brand-800/80 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="nav-menu-drawer"
              aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            >
              {menuOpen ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop + right drawer (all breakpoints) */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className={cn('fixed inset-x-0 bottom-0 z-[45] bg-black/35', 'top-24')}
              aria-hidden
              onClick={closeMenu}
            />
            <motion.aside
              ref={drawerPanelRef}
              id="nav-menu-drawer"
              key="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menuLabel')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={navTransition}
              className={cn(
                'fixed right-0 z-[46] flex w-[min(22rem,calc(100vw-1.5rem))] flex-col border-l border-brand-200 bg-white shadow-2xl dark:border-brand-700 dark:bg-brand-900',
                'top-24 h-[calc(100dvh-6rem)]'
              )}
            >
              <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-4">{menuPanelLinks}</nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {/* Chat launcher + panel */}
      <button
        type="button"
        aria-label={chatOpen ? t('chat.closeAssistant') : t('chat.openAssistant')}
        title={t('chat.launcherTitle')}
        onClick={() => setChatOpen((v) => !v)}
        style={{ bottom: chatFabBottomPx }}
        className={cn(
          'fixed right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-transform duration-300 hover:-translate-y-0.5 md:right-6 md:h-14 md:w-14',
          chatFabOnDark
            ? 'border border-white/25 bg-white/95 text-brand-900 shadow-brand-900/15 hover:border-white/50 hover:bg-white hover:shadow-2xl'
            : 'bg-brand-900 text-white hover:bg-brand-800 hover:shadow-2xl'
        )}
      >
        {chatOpen ? <X size={22} aria-hidden /> : <MessageCircle size={22} aria-hidden />}
      </button>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : undefined}
            style={{ bottom: chatPanelBottomPx }}
            className="fixed right-4 z-[60] w-[min(92vw,24rem)] overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-2xl dark:border-brand-600 dark:bg-brand-900 md:right-6"
          >
            <div className="border-b border-brand-100 bg-brand-900 px-4 py-3 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">{t('chat.panelEyebrow')}</p>
              <h3 className="mt-1 font-serif text-lg leading-tight">{t('chat.panelHeading')}</h3>
            </div>
            <div
              ref={chatMessagesRef}
              className="max-h-[19rem] space-y-3 overflow-y-auto overflow-x-hidden bg-brand-50/40 px-4 py-3 dark:bg-brand-950/50"
            >
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={cn(
                    'rounded-xl px-3 py-2 text-sm leading-relaxed',
                    msg.role === 'assistant'
                      ? 'border border-brand-100 bg-white text-brand-900 dark:border-brand-700 dark:bg-brand-800 dark:text-brand-100'
                      : 'ml-8 bg-brand-900 text-white dark:bg-brand-700'
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="border-t border-brand-100 bg-white p-3 dark:border-brand-700 dark:bg-brand-900">
              <div className="flex items-center gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') sendChat();
                  }}
                  placeholder={
                    detectLanguage(chatInput, siteChatLang) === 'no'
                      ? 'Skriv spørsmålet ditt …'
                      : 'Type your question…'
                  }
                  className="h-10 flex-1 rounded-full border border-brand-200 bg-white px-4 text-sm text-brand-900 outline-none focus:border-brand-400 dark:border-brand-600 dark:bg-brand-800 dark:text-brand-100 dark:placeholder:text-brand-400 dark:focus:border-brand-400"
                />
                <button
                  type="button"
                  onClick={sendChat}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-900 text-white transition hover:bg-brand-800"
                  aria-label={t('chat.sendMessage')}
                >
                  <SendHorizontal size={16} aria-hidden />
                </button>
              </div>
              <Link
                to={ROUTES.kontakt}
                className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-brand-900 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white"
              >
                {t('chat.directContact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
