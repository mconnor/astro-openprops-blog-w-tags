import { z, reference } from 'astro:content';

const urlSchema = z.string().url();
const urlSchemaOptional = urlSchema.optional();
const strSC = z.string();
const strSCOptional = strSC.optional();
const emailSchema = z.string().email();
const emailSchemaOptional = emailSchema.optional();

const imageSrcSchema = z.object({ src: urlSchema, alt: strSC });

const refSchema = z.string(reference(['authors']));

const myDateSchema = z.date({
  required_error: 'Please select a date and time',
  invalid_type_error: "That's not a date!",
});

export const authorSchema = z.object({
  id: strSC,
  name: strSC.default('Anonymous'),
  email: emailSchemaOptional,
  portfolio: urlSchemaOptional,
  bio: strSCOptional,
});

export const blogSchema = z.object({
  title: strSC,
  pubDate: myDateSchema,
  description: strSC,
  author: reference(['authors']),
  draft: z.boolean().optional(),
  tags: z.array(strSC).optional(),
  cover: imageSrcSchema,
});

// relatedPosts: z.array(reference('blog')).optional(),

export type AurthorSchemaType = z.infer<typeof authorSchema>;
export type BlogSchemaType = z.infer<typeof blogSchema>;
