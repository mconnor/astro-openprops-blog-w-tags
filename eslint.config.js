// ver 1.0.0
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import markdown from 'eslint-plugin-markdown';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    ignores: [
      'pnpm-lock.yaml',
      '.astro/',
      'dist/',
      '**/test.ts',
      'my-custom-cache-directory',
      'src/env.d.ts',
    ],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: true,
      },
    },
    rules: {
      // add more rules here
      // 'no-console': 'off',
      'astro/no-unused-css-selector': 'warn',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
    },
  },

  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ['src/**/*.md'],
    plugins: {
      markdown,
    },
    processor: 'markdown/markdown',
    rules: {
      // ...
    },
  },
  {
    // 1. Target ```js code blocks in .md files.
    files: ['**/*.md/*.js'],
    rules: {
      // 2. Disable other rules.
      // 'no-console': 'off',
      // 'import/no-unresolved': 'off',
    },
  },
  eslintConfigPrettier, // eslint-config-prettier last
);
