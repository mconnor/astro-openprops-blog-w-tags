import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'



// https://astro.build/config
// your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  markdown: {
    drafts: true
  },
  integrations: [
    mdx({
      drafts: true
    }),
    react()
  ],

  experimental: {
    assets: true
  }
})
