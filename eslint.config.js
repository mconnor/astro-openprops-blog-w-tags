// @ts-check
// import astroEslintParser from 'astro-eslint-parser';
import { fixupConfigRules } from '@eslint/compat';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import markdown from 'eslint-plugin-markdown';
import regex from 'eslint-plugin-regexp';
import tseslint from 'typescript-eslint';

// import { FlatCompat } from '@eslint/eslintrc';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { configs as litConfig } from 'eslint-plugin-lit';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';

// mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname, // optional; default: process.cwd()
//   resolvePluginsRelativeTo: __dirname, // optional
//   recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
//   allConfig: js.configs.all, // optional unless you're using "eslint:all"
// });

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,
  // ...markdown.configs.recommended,
  ...fixupConfigRules(regex.configs['flat/recommended']),

  ...fixupConfigRules(wc.configs['flat/recommended']),
  ...fixupConfigRules(lit.configs['flat/recommended']),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
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
    files: [
      'scr/web-components/**/*.js',
      'src/astro-custom-layout-components/**/*.js',
    ],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      'wc/no-constructor-attributes': 'off',
    },
  },

  {
    plugins: {
      markdown,
    },
  },
  {
    files: ['**/*.md'],
    processor: 'markdown/markdown',
  },
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
  eslintConfigPrettier,
);
