import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

// https://astro.build/config
// your configuration options here...
// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
    image: {
        domains: ['doodleipsum.com', 'picsum.photos'],
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
    },
})
