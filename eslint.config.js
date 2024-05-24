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

  regexpPlugin.configs['flat/recommended'],
  ...eslintPluginAstro.configs.recommended,
  ...compat.extends('plugin:lit/recommended'),
  ...compat.extends('plugin:wc/recommended'),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: './',
      },
    },
  },
  {
    files: ['src/astro-custom-layout-components/**/*.js'],
    rules: {
      '@typescript-eslint/unbound-method': 'warn',
      'wc/no-constructor-attributes': 'off',
    },
  },

  {
    files: ['scr/web-components/**/*.js'],
    rules: {
      '@typescript-eslint/unbound-method': 'warn',
      'wc/no-constructor-attributes': 'warn',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },

  {
    // disable type-aware linting on JS files
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // 1. Add the plugin
    plugins: {
      markdown,
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
    ],
  },
  eslintConfigPrettier, // eslint-config-prettier last
);
