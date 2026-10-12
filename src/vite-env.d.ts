/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_FORMS_ENDPOINT?: string;
  readonly VITE_GOOGLE_FORMS_ENTRY_NAME?: string;
  readonly VITE_GOOGLE_FORMS_ENTRY_EMAIL?: string;
  readonly VITE_GOOGLE_FORMS_ENTRY_PHONE?: string;
  readonly VITE_GOOGLE_FORMS_ENTRY_BUSINESS?: string;
  readonly VITE_GOOGLE_FORMS_ENTRY_SERVICE?: string;
  readonly VITE_GOOGLE_FORMS_ENTRY_MESSAGE?: string;
  readonly VITE_GOOGLE_FORMS_ENTRY_BUDGET?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
