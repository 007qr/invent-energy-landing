/// <reference types="vinxi/types/client" />

interface ImportMetaEnv {
  DATABASE_URL: string;
  DATABASE_AUTH_TOKEN: string;
  SITE_NAME: string;
  SESSION_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
