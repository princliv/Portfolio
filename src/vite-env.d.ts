/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID_FOLLOWUP?: string;
  readonly VITE_EMAILJS_RECEIVER_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
