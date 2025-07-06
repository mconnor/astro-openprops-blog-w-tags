// @ts-check
import eslint from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/.astro',
      '**/.github',
      '**/.changeset',
      '**/.vercel',
      '**/.frontmatter',
      'test/',
    ],
  },

  // Global config
  // JavaScript
  eslint.configs.recommended,
  // TypeScript
  ...tseslint.configs.recommendedTypeChecked,

  // ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  // Allow triple-slash references in `*.d.ts` files.
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['**/*.astro'],
    extends: [
      ...eslintPluginAstro.configs.recommended,
      tseslint.configs.disableTypeChecked,
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Astro
);
