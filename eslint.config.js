// ver 1.0.0
import astro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import markdown from 'eslint-plugin-markdown';

export default tseslint.config(
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
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...astro.configs['flat/recommended'],
      // ...astro.configs['flat/jsx-a11y-recommended'],
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
      'astro/no-unused-css-selector': 'warn',
      'astro/missing-client-only-directive-value': 'warn',
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
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier, // eslint-config-prettier last
);
