/**
 * `/fasiliteter` is **off in production** unless the build sets
 * `VITE_ENABLE_FACILITIES_PAGE=true`. In development it is always on.
 *
 * When disabled: no nav entry, and `/fasiliteter` + `/facilities` redirect to home.
 */
export const FACILITIES_PAGE_ENABLED =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_FACILITIES_PAGE === 'true';
