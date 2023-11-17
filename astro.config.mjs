import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

// https://astro.build/config
// your configuration options here...
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
    site: 'https://www.mikeconnor.tech',
    image: {
        domains: ['astro.build'],
        remotePatterns: [{ protocol: 'https' }],
    },
    markdown: {
        drafts: true,
    },
    integrations: [
        mdx({
            drafts: true,
        }),
    ],
    vite: {
        ssr: {
            noExternal: ['open-props'],
        },
    }
})
