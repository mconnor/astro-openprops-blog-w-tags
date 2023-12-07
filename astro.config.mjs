import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: 'server',
  site: 'https://www.mikeconnor.tech',
  image: {
    domains: ['astro.build'],
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  markdown: {
    drafts: true
  },
  integrations: [mdx({
    drafts: true
  })],
  vite: {
    ssr: {
      noExternal: ['open-props']
    }
  },
  adapter: vercel()
});