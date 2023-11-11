import { defineCollection, z } from 'astro:content'


const postsCollection = defineCollection({
    type: 'content',
    schema:  z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string(),
        author: z.string(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()),
        image: z.object({
            url: z.string(),
            alt: z.string(),
        }),
        updatedDate: z.coerce.date().optional(),
    }),
})

// const authorCollection = defineCollection({
//     type: 'data',
//     schema: authorSchema,
//   });

// 3. Export multiple collections to register them
export const collections = {
    posts: postsCollection,
    // 'authors': authorCollection,
}
