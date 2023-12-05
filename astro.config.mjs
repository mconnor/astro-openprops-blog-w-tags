import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// your configuration options here...
// https://docs.astro.build/en/reference/configuration-reference/
// import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'static',
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
  }
});