// @ts-check
import astroParser from 'astro-eslint-parser';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';

import markdown from '@eslint/markdown';
import regexp from 'eslint-plugin-regexp';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';

const config = tseslint.config(
  js.configs.recommended,
  // ...tseslint.configs.recommended,
  // ...tseslint.configs.stylistic,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...astro.configs.recommended,
  regexp.configs['flat/recommended'],
  wc.configs['flat/recommended'],
  lit.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        // ...globals.node,
      },
    },
  },
  {
    files: ['src/**/*.astro'],
    extends: [tseslint.configs.disableTypeChecked],
    // processor: astro.processors['client-side-ts'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        // allowDefaultProject: ['*.js'],

        extraFileExtensions: ['.astro'],
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },

  {
    files: ['**/*js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: [
      'src/custom-layout-components/astro-wc/**/*js',
      'src/custom-layout-components/lit-wc/**/*js',
    ],

    rules: {
      'no-unused-expressions': 'off',
      'wc/no-constructor-attributes': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['src/schemas/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
    },
  },

  {
    files: ['**/*.md/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'no-console': 'warn',
      'import/no-unresolved': 'warn',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
);

const mdConfig = {
  // Apply the Markdown processor to all .md files
  files: ['src/content/blog**/*.md'],
  plugins: {
    markdown,
  },
  processor: 'markdown/markdown', // Lint fenced code blocks in Markdown
  language: 'markdown/commonmark', // Or use "markdown/gfm" for GitHub-Flavored Markdown
  rules: {
    // Markdown rules
    'markdown/fenced-code-language': 'warn', // Enforce language specification in fenced code blocks
    'markdown/heading-increment': 'error', // Ensure heading levels increment by one
    'markdown/no-duplicate-headings': 'warn', // Disallow duplicate headings in the same document
    'markdown/no-empty-links': 'warn', // Disallow empty link elements
    'markdown/no-html': 'error', // Disallow HTML in Markdown
    'markdown/no-invalid-label-refs': 'error', // Disallow invalid label references
    'markdown/no-missing-label-refs': 'error', // Disallow missing label references
  },
};

export default [
  {
    ignores: [
      'node_modules/',
      '.frontmatter/',
      'stylelint.config.mjs',
      'dist',
      '.astro',
      '*.cjs',
      'src/env.d.ts',
      'src/components/_Hamburger.astro',
      'cache-directory/',
      '*.d.ts',
      '**/temp.js',
      '*lock.yaml',
      '.vercel/',
      'test/',
    ],
  },

  mdConfig,

  ...config,
  eslintConfigPrettier,
];
