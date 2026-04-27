/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GODINEZ_STUDIO_CHECKOUT_URL?: string;
  readonly VITE_GODINEZ_AI_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
