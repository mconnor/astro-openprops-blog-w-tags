import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function get() {
  return rss({
    title: 'Mike Connor | Blog',
    description:
      'My personal blog about Astro, Svelte, and other web development topics.',
    site: 'https://astro-blog-mike.netlify.app/',
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`
  })
}
