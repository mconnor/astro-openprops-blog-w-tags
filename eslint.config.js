// @ts-check
// import astroEslintParser from 'astro-eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { builtinModules } from 'node:module';
import astro from 'eslint-plugin-astro';
import markdown from 'eslint-plugin-markdown';
import regexp from 'eslint-plugin-regexp';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';
// import jsxA11y from 'eslint-plugin-jsx-a11y';

import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// parsers
const typescriptParser = tseslint.parser;

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.stylistic,
  //If your project enables typed linting, we suggest enabling the recommended-type-checked
  // and stylistic-type-checked configurations to start:
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,

  ...astro.configs.recommended,
  // jsxA11y.flatConfigs.recommended,
  // ...markdown.configs.recommended,

  regexp.configs['flat/recommended'],
  wc.configs['flat/recommended'],
  lit.configs['flat/recommended'],
  {
    ignores: [
      '**/_*.*',
      '**/temp.js',
      '*lock.yaml',
      '.astro/',
      'dist/',
      'my-custom-cache-directory',
      'src/env.d.ts',
      '.vercel/',
    ],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.eslint.json',

        // For example, if you use a specific tsconfig.eslint.json for linting, you'd specify:
        tsconfigRootDir: import.meta.dirname,

        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        // ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'lit/no-invalid-html': 'warn',
    },
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      'wc/no-constructor-attributes': 'off',
    },
  },

  {
    plugins: {
      markdown,
      // jsxA11y,
    },
  },
  // {
  //   files: ['**/*.md'],
  //   processor: 'markdown/markdown',
  // },
  {
    files: ['**/*.md/*.js'],
    ...tseslint.configs.disableTypeChecked,
    // ...
    rules: {
      'no-console': 'off',
      'import/no-unresolved': 'off',
    },
  },

  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },

  eslintConfigPrettier,
);
