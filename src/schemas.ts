import { z, reference } from 'astro:content'

export const postSchema = z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),

    // Reference a single author from the `authors` collection by `id`
    author: reference('authors'),
    // Reference an array of related posts from the `blog` collection by `slug`
    relatedPosts: z.array(reference('blog')).optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
    image: z
        .object({
            url: z.string(),
            alt: z.string(),
            width: z.number().optional(),
            height: z.number().optional(),
        })
        .optional(),
    // updatedDate: z.coerce.date().optional(),
    // canonicalURL: z.string().url(),
})

export const authorSchema = z.object({
    name: z.string().default('Anonymous'),
    email: z.string().email().optional(),
    portfolio: z.string().url().optional(),
    bio: z.string().optional(),
})

export type PostSchemaType = z.infer<typeof postSchema>
export type AurthorSchemaType = z.infer<typeof authorSchema>
