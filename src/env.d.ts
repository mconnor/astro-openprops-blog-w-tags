/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly SENTRY_DSN: string;
  readonly SENTRY_AUTH_TOKEN: string;
  readonly ESLINT_USE_FLAT_CONFIG: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
