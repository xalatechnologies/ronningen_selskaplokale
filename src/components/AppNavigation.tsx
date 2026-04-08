/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, MessageCircle, SendHorizontal, X } from 'lucide-react';
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
  const [chatInput, setChatInput] = useState('');
  const [replyCount, setReplyCount] = useState(0);
  const [messages, setMessages] = useState<{ role: 'assistant' | 'user'; text: string }[]>(() => [
    { role: 'assistant', text: t('chat.welcomeMessage') },
  ]);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerPanelRef = useRef<HTMLElement>(null);
  const prevMenuOpen = useRef(false);

  const updateChatFabContrast = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const x = Math.max(4, window.innerWidth - 88);
    const y = Math.max(4, window.innerHeight - 32);
    const hit = document.elementFromPoint(x, y);
    setChatFabOnDark(isDarkSurfaceBehindChatFab(hit));
  }, []);

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
    'flex min-w-0 shrink-0 items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brand-900 focus-visible:ring-offset-2 rounded-sm md:gap-3';

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
                  ? 'border-brand-800 bg-brand-50/85 font-bold text-brand-900'
                  : 'border-transparent font-medium text-brand-700 hover:bg-brand-50/60 hover:text-brand-900'
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
      {/* Top bar: logo left; desktop inline nav; mobile hamburger → drawer (full list) */}
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 border-b border-brand-100 bg-white/95 shadow-sm backdrop-blur-md',
          TOP_NAV_H
        )}
      >
        <div
          className={cn(
            'site-container grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3'
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
              <span className="truncate font-serif text-lg font-bold tracking-tight text-brand-900 md:text-xl">
                {t('branding.navLine1')}
              </span>
              <span className="mt-0.5 block w-full -translate-x-[2px] text-center font-serif text-sm font-medium tracking-tight text-brand-600 md:text-base">
                {t('branding.navLine2')}
              </span>
            </span>
          </Link>

          <div className="flex min-w-0 justify-center">
            <nav
              className="hidden flex-wrap items-center justify-center gap-x-4 gap-y-1 md:flex lg:gap-x-6 xl:gap-x-8"
              aria-label={t('nav.menuLabel')}
            >
              {desktopNavLinks.map((link) => {
                const active = isNavActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'shrink-0 rounded-lg px-3 py-2 font-serif text-sm font-medium tracking-tight transition-colors lg:px-4 lg:text-[0.9375rem]',
                      active
                        ? 'bg-brand-50 font-semibold text-brand-900'
                        : 'text-brand-700 hover:bg-brand-50/80 hover:text-brand-900'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-2.5">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-brand-900 transition-colors hover:bg-brand-50 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="nav-menu-drawer"
              aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            >
              {menuOpen ? <X size={28} aria-hidden /> : <Menu size={28} aria-hidden />}
            </button>
            <Link
              to={kontaktSkjemaHash()}
              onClick={closeMenu}
              className="flex h-11 shrink-0 items-center justify-center rounded-full bg-brand-900 px-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-brand-800 hover:shadow-xl md:h-12 md:px-4 md:text-[11px] md:tracking-[0.24em]"
            >
              {t('nav.contactUs')}
            </Link>
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
                'fixed right-0 z-[46] flex w-[min(22rem,calc(100vw-1.5rem))] flex-col border-l border-brand-200 bg-white shadow-2xl',
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
        className={cn(
          'fixed bottom-5 right-5 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:-translate-y-0.5 md:bottom-6 md:right-6 md:h-14 md:w-14',
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
            className="fixed bottom-20 right-4 z-[60] w-[min(92vw,24rem)] overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-2xl md:bottom-24 md:right-6"
          >
            <div className="border-b border-brand-100 bg-brand-900 px-4 py-3 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">{t('chat.panelEyebrow')}</p>
              <h3 className="mt-1 font-serif text-lg leading-tight">{t('chat.panelHeading')}</h3>
            </div>
            <div
              ref={chatMessagesRef}
              className="max-h-[19rem] space-y-3 overflow-y-auto overflow-x-hidden bg-brand-50/40 px-4 py-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={cn(
                    'rounded-xl px-3 py-2 text-sm leading-relaxed',
                    msg.role === 'assistant'
                      ? 'border border-brand-100 bg-white text-brand-900'
                      : 'ml-8 bg-brand-900 text-white'
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="border-t border-brand-100 bg-white p-3">
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
                  className="h-10 flex-1 rounded-full border border-brand-200 bg-white px-4 text-sm text-brand-900 outline-none focus:border-brand-400"
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
                className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 hover:text-brand-900"
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
