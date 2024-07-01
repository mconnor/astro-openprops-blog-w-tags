import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sentry from '@sentry/astro';
import lit from '@astrojs/lit';
import vercel from '@astrojs/vercel/static';
import * as dotenv from 'dotenv';
import { process } from 'node';
// import vercel from "@astrojs/vercel/serverless";
dotenv.config();
// import { visualizer } from 'rollup-plugin-visualizer';
// import myIntegration from './my-toolbar-app/my-integration.ts';

// var token = loadEnv(process.env.SENTRY_AUTH_TOKEN, process.cwd(), ''),
// pnpm does not allow you to import modules that are not directly installed in your project. If you are using pnpm, you will need to install vite to use the loadEnv helper.

// // https://astro.build/config

// https://astro.build/config

export default defineConfig({
  redirects: {
    '/index': '/about',
  },

  // your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
  output: 'static',
  site: 'https://astro-openprops-blog-w-tags-git-staging-mike-connors-projects.vercel.app',
  image: {
    domains: [
      'kit.fontawesome.com',
      'astro.build',
      'picsum.photos',
      'https://doodleipsum.com',
    ],
  },
  markdown: {
    drafts: true,
  },
  scopedStyleStrategy: 'attribute',
  integrations: [
    // myIntegration,
    lit(),
    mdx({
      drafts: true,
    }),
    sentry({
      dsn: 'https://b620d87b24b1fda6b0064305d7ca46e2@o4506328206802944.ingest.us.sentry.io/4506770210291712',
      release: '1.0.0',
      environment: process.env.MODE,
      sourceMapsUploadOptions: {
        org: 'mike-connor',
        project: 'astro-openprops-blog-w-tags',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  experimental: {
    contentCollectionJsonSchema: true,
  },
  vite: {
    ssr: {
      noExternal: ['date-fns', 'open-props'],
    },
  },
  // cacheDir: './my-custom-cache-directory',
  adapter: vercel(),
});
