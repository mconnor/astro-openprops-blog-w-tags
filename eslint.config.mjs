// @ts-check
import js from '@eslint/js';
// import vercelNode from '@vercel/style-guide/eslint/node';
// import vercelTypeScript from '@vercel/style-guide/eslint/typescript';
import markdown from '@eslint/markdown';
import * as astroParser from 'astro-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import lit from 'eslint-plugin-lit';
import * as regexpPlugin from 'eslint-plugin-regexp';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import wc from 'eslint-plugin-wc';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import { fixupPluginRules } from '@eslint/compat';

// const compat = new FlatCompat();

// const { browser } = globals;
// const { document, customElements } = browser;

const config = tseslint.config(
  js.configs.recommended,
  // ...compat.env(vercelNode.env),
  // ...fixupConfigRules(compat.config(vercelTypeScript)),
  // ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,

  regexpPlugin.configs['flat/recommended'],

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
        JSX: true,
        // ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  {
    files: ['**/*.astro'],
    extends: [
      ...astro.configs.recommended,
      tseslint.configs.disableTypeChecked,
    ],
    // processor: astro.processors['client-side-ts'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        project: true,
        jsx: false,
        extraFileExtensions: ['.astro'],
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
    ...wc.configs['flat/recommended'],
    ...lit.configs['flat/recommended'],
    files: [
      'src/lit-web-components/**/*.ts',
      'src/custom-layout-components/lit-wc/**/*.ts',
    ],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  {
    files: ['**/*js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: ['src/custom-layout-components/astro-wc/**/*js'],

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
      'cache-directory/',
      '.vercel/',
      'test/',
      'stylelint.config.mjs',
      'dist/',
      '.astro',
      '**/temp.js',
      '*lock.yaml',
      '.turbo/**/*',
    ],
  },
  mdConfig,
  ...config,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  eslintConfigPrettier,
];
