import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export const prerender = true
export async function GET() {
    const posts = await getCollection('posts')
    return rss({
        title: 'Mike Connor | Blog',
        description:
            'My personal blog about Astro, Svelte, and other web development topics.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/posts/${post.slug}/`,
        })),
        customData: `<language>en-us</language>`,
    })
}
