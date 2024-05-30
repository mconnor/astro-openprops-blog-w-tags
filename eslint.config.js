// ver 2.0.0

import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import markdown from 'eslint-plugin-markdown';
import tseslint from 'typescript-eslint';

// import regexpEslint from 'eslint-plugin-regexp';
import * as regexpPlugin from 'eslint-plugin-regexp';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  js.configs.recommended, // Recommended config applied to all files
  // Override the recommended config

  // ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...eslintPluginAstro.configs.recommended,

  regexpPlugin.configs['flat/recommended'],

  ...compat.extends('plugin:jsx-a11y/recommended'),
  ...compat.extends('plugin:lit/recommended'),
  ...compat.extends('plugin:wc/recommended'),

  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs', '**/*.astro'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: tseslint.parser,
        processor: eslintPluginAstro.processors.astro,
        project: ['./tsconfig.json'],
        tsconfigRootDir: './',
      },
    },
  },

  {
    plugins: {
      markdown,
    },
  },
  {
    files: ['**/*.md'],
    processor: "markdown/markdown",

  },
  {
    files: ['**/*.md'],
    rules: {
      ...markdown.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ['scr/web-components/**/*.js', 'src/astro-custom-layout-components/**/*.js'],
    rules: {
      'wc/no-constructor-attributes': 'off'
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },

  {
    // 1. Target ```js code blocks in .md files.
    files: ['**/*.md/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['tests/**'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
  {
    ignores: [
      '**/temp.js',
      'config/*',
      'pnpm-lock.yaml',
      '.astro/',
      'dist/',
      '**/test.ts',
      'my-custom-cache-directory',
      'src/env.d.ts',
      'src/components/Hamburger.astro',
      'src/pages/kitchensink.astro',
      'src/pages/splash.astro'

    ],
  },
  eslintConfigPrettier, // eslint-config-prettier last
);
