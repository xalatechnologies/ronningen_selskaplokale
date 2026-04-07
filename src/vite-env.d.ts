/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  /** Optional: Web3Forms access key — preferred path when set. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** Optional: FormSubmit inbox when Web3Forms key is unset (default r.selskapslokale@gmail.com). */
  readonly VITE_CONTACT_NOTIFY_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
