import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';


import {blogSchema } from '#schemas.ts';


// const zTags = z.array(strSC).nonempty();

// type ParserReturnType =
//   | Record<string, Record<string, unknown>>
//   | Record<string, unknown>[];

// relatedPosts: z.array(reference('blog')).optional(),

// Record<string, number>;

export const tagCountTypeSchema = z.record(z.number());

const blogCollection = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/content/blog',
  }),
  schema: blogSchema,
});


export const collections = { blogCollection };
