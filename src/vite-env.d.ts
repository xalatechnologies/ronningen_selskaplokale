/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  /** Optional: Web3Forms access key — preferred path when set. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** Optional: overrides FormSubmit recipient only (Web3Forms still uses dashboard inbox). */
  readonly VITE_CONTACT_NOTIFY_EMAIL?: string;
  /** Optional: public + FormSubmit inbox; defaults to post@ronningenselskapslokale.no when unset. */
  readonly VITE_VENUE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
