import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

import { blogSchema } from '#schemas.ts';

export const tagCountTypeSchema = z.record(z.number());

const blogCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/content/blog',
  }),
  schema: blogSchema,
});

export const collections = { blogCollection };
