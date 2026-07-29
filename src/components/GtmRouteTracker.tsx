import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Pushes a virtual page_view into GTM's dataLayer on every React Router navigation.
 * Initial document load is still covered by the GTM snippet in index.html.
 */
export function GtmRouteTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      page_path: `${pathname}${search}`,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}
