import { z } from 'astro:content'

const postSchema = z.object({
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
})

export type PostSchemaType = z.infer<typeof postSchema>
