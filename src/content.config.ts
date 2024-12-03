import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

// import authorJson from './data/authors/authors.json';
import { blogSchema } from './schemas';

const blog = defineCollection({
  // type: 'content',
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/data/blog',
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
