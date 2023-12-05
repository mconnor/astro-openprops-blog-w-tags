import { defineCollection } from 'astro:content'
import { postSchema, authorSchema } from '../schemas'

const postsCollection = defineCollection({
    type: 'content',
    schema: postSchema,
})

const authorCollection = defineCollection({
    type: 'data',
    schema: authorSchema,
})

// 3. Export multiple collections to register them
export const collections = {
    posts: postsCollection,
    authors: authorCollection,
}
