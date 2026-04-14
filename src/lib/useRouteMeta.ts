import { useEffect } from 'react';

/**
 * Sets `document.title` and `<meta name="description">` for the current view.
 * Restores previous values on unmount (SPA-friendly).
 * Pass `null` to skip (e.g. invalid route slug before redirect).
 */
export function useRouteMeta(title: string | null, description: string | null) {
  useEffect(() => {
    if (title == null || description == null || !title.trim() || !description.trim()) {
      return;
    }

    const prevTitle = document.title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const hadMeta = !!meta;
    const prevDesc = meta?.getAttribute('content') ?? '';
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    document.title = title;

    return () => {
      document.title = prevTitle;
      if (hadMeta) meta!.setAttribute('content', prevDesc);
      else meta!.remove();
    };
  }, [title, description]);
}
