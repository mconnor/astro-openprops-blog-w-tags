import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export const prerender = true;

export async function GET(context) {
  const posts = await getCollection('blogs');
  return rss({
    title: 'Mike Connor | Blog',
    description:
      'My personal blog about Astro, Svelte, and other web development topics.',
    site: context.site,
    items: posts.map((post) => ({
      link: `/posts/${post.slug}/`,
      // Note: this will not process components or JSX expressions in MDX files.
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
