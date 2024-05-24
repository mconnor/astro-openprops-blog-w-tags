import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sentry from '@sentry/astro';
import lit from '@astrojs/lit';
import vercel from '@astrojs/vercel/static';
import * as dotenv from 'dotenv';

dotenv.config();
// import { visualizer } from 'rollup-plugin-visualizer';
// import myIntegration from './my-toolbar-app/my-integration.ts';

// var token = loadEnv(process.env.SENTRY_AUTH_TOKEN, process.cwd(), ''),
// pnpm does not allow you to import modules that are not directly installed in your project. If you are using pnpm, you will need to install vite to use the loadEnv helper.

// // https://astro.build/config

// https://astro.build/config
export default defineConfig({
  // your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
  output: 'static',
  adapter: vercel(),
  cacheDir: './my-custom-cache-directory',
  site: 'http://localhost:4321',
  image: {
    domains: ['astro.build', 'picsum.photos'],
  },
  markdown: {
    drafts: true,
  },
  integrations: [
    // myIntegration,
    lit(),
    mdx({
      drafts: true,
    }),
    sentry({
      dsn: import.meta.env.SENTRY_DSN,
      release: '1.0.0',
      environment: import.meta.env.MODE,
      sourceMapsUploadOptions: {
        org: 'mike-connor',
        project: 'astro-openprops-blog-w-tags',
        authToken: import.meta.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  vite: {
    // optimizeDeps: {
    //   include: ['linked-dep'],
    // },
    // plugins: [visualizer()],
    ssr: {
      noExternal: ['date-fns', 'open-props'],
    },
  },
  // cacheDir: './my-custom-cache-directory',
});
