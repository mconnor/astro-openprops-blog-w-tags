import rss, { pagesGlobToRssItems } from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET() {
    const posts = await getCollection('posts')
    return rss({
        title: 'Mike Connor | Blog',
        description:
            'My personal blog about Astro, Svelte, and other web development topics.',
        site: 'https://astro-blog-mike.netlify.app/',
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.slug}/`,
        })),
        customData: `<language>en-us</language>`,
    })
}
