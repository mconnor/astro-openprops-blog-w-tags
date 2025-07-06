import { z } from 'astro:schema';

const strSC = z.string();



const dateLike = z.union([z.number(), z.string(), z.date()]);
const dateLikeToDate = dateLike.pipe(z.coerce.date());

// export const blogSchema = z.object({
//   title: strSC,
//   pubDate: dateLikeToDate,
//   description: strSC,
//   // author: strSC,
//   // author: reference('authors'),
//   draft: z.boolean().optional(),
//   tags: z.array(strSC),
//   cover: imageSrcSchema,
// });

export const blogSchema = z.object({
  title: z.string(),
  pubDate: dateLikeToDate.optional(),
  description: z.string(),
  // author: reference('authorsCollection').optional(),
  // relatedPosts: z.array(reference('blogCollection')).optional(),
  draft: z.boolean().optional().default(false),
  tags: z.array(z.string()).default([]),
  cover: z.object({ src: z.string().url(), alt: z.string() }).optional(),
});


export const tagCountTypeSchema = z.record(z.number());

export const zTags = z.array(strSC).nonempty();
