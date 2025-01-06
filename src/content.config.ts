import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
const urlSchema = z.string().url();
// const urlSchemaOptional = urlSchema.optional();
const strSC = z.string();
// const strSCOptional = strSC.optional();
// const emailSchema = z.string().email();
// const emailSchemaOptional = emailSchema.optional();

const imageSrcSchema = z.object({ src: urlSchema, alt: strSC });

// const refSchema = z.string(reference(['authors']));

const dateLike = z.union([z.number(), z.string(), z.date()]);
const dateLikeToDate = dateLike.pipe(z.coerce.date());

// export const authorSchema = z.object({
//   id: z.string(),
//   name: strSC.default('Anonymous'),
//   email: emailSchemaOptional,
//   portfolio: urlSchemaOptional,
//   bio: strSCOptional,
// });

const blogSchema = z.object({
  title: strSC,
  pubDate: dateLikeToDate,
  description: strSC,
  author: strSC,
  // author: reference('authors'),
  draft: z.boolean().optional(),
  tags: z.array(strSC),
  cover: imageSrcSchema,
});

// relatedPosts: z.array(reference('blog')).optional(),

export const zTags = z.array(strSC).nonempty();

// Record<string, number>;

export const tagCountTypeSchema = z.record(z.number());

const blog = defineCollection({
  // type: 'content',
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/content/blog',
  }),
  schema: blogSchema,
});

// const authors = defineCollection({
//   loader: async () => {
//     const response = authorJson;
//     const data = await response.json();
//     // Must return an array of entries with an id property
//     // or an object with IDs as keys and entries as values
//     return data.map((author) => ({
//       id: author.id,
//       ...author,
//     }));
//   },

//   schema: authorSchema,
// });

// const dogs = defineCollection({
//   loader: file("src/data/authors.toml", { parser: (text) => parseToml(text).dogs }),
//   schema: /* ... */
// })

// const countries = defineCollection({
// 	loader: async () => {
// 	  const response = await fetch("https://restcountries.com/v3.1/all");
// 	  const data = await response.json();
// 	  // Must return an array of entries with an id property
// 	  // or an object with IDs as keys and entries as values
// 	  return data.map((country) => ({
// 		id: country.cca3,
// 		...country,
// 	  }));
// 	},
// 	schema: /* ... */
//   });

export const collections = { blog };
