import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sentry from '@sentry/astro'
import { loadEnv } from 'vite'

const { SECRET_TOKEN } = loadEnv(
  process.env.SENTRY_AUTH_TOKEN,
  process.cwd(),
  '',
)

// var token = loadEnv(process.env.SENTRY_AUTH_TOKEN, process.cwd(), ''),
// pnpm does not allow you to import modules that are not directly installed in your project. If you are using pnpm, you will need to install vite to use the loadEnv helper.

// // https://astro.build/config
export default defineConfig({
  // your configuration options here...
  // https://docs.astro.build/en/reference/configuration-reference/
  output: 'static',
  site: 'https://www.mikeconnor.tech',
  image: {
    domains: ['astro.build', 'picsum.photos'],
  },
  markdown: {
    drafts: true,
  },
  integrations: [
    mdx({
      drafts: true,
    }),
    sentry({
      dsn: 'https://b620d87b24b1fda6b0064305d7ca46e2@o4506328206802944.ingest.sentry.io/4506770210291712',
      release: '1.0.0',
      environment: import.meta.env.MODE,
      sourceMapsUploadOptions: {
        org: 'mike-connor',
        project: 'astro-openprops-blog-w-tags',
        authToken: SECRET_TOKEN,
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['date-fns', 'open-props'],
    },
  },
  cacheDir: './my-custom-cache-directory',
})
