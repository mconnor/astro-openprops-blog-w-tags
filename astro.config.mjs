import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.mikeconnor.tech',
  image: {
    domains: ['astro.build', 'picsum.photos']
  },
  markdown: {
    drafts: true
  },
  integrations: [mdx({
    drafts: true
  }), sentry()],
  vite: {
    ssr: {
      noExternal: ['date-fns', 'open-props']
    }
  },
  cacheDir: './my-custom-cache-directory'
});