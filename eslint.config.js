// @ts-check
import astroParser from 'astro-eslint-parser';

// import jestPlugin from 'eslint-plugin-jest';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { builtinModules } from 'node:module';
import astro from 'eslint-plugin-astro';
import markdown from 'eslint-plugin-markdown';
import regexp from 'eslint-plugin-regexp';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';
import tsEslintParser from '@typescript-eslint/parser';
// import jsxA11y from 'eslint-plugin-jsx-a11y';

import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
// import tsParser from '@typescript-eslint/parser';

// // parsers
// const typescriptParser = tseslint.parser;

export default tseslint.config(
  js.configs.recommended,

  ...tseslint.configs.recommended,
  // ...tseslint.configs.strict,
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,

  // ...tseslint.configs.stylistic,

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
      ' src/components/_Hamburger.astro',
      'cache-directory/',
      '*.d.ts',
      '**/temp.js',
      '*lock.yaml',
      '.astro/',
      'dist/',
      'my-custom-cache-directory',
      'src/env.d.ts',
      '.vercel/',
      '.astro/',
      '*.config.*',
      ' test/',
    ],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // parser: tseslint.parser,
      // parser: tsEslintParser,
      parserOptions: {
        // projectService: {
        //   allowDefaultProject: ['*.js'],
        //   defaultProject: './tsconfig.json',
        // },
        projectService: true,
        // import.meta.dirname is only present for ESM files in Node.js >=20.11.0 / >= 21.2.0.
        tsconfigRootDir: import.meta.dirname,

        // ecmaFeatures: {
        //   jsx: true,
        // },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // {
  //   rules: {
  //     'no-unused-vars': 'off',
  //     '@typescript-eslint/no-unused-expressions': 'warn',
  //     '@typescript-eslint/no-explicit-any': 'off',
  //     '@typescript-eslint/no-unused-vars': [
  //       'warn',
  //       {
  //         argsIgnorePattern: '^_',
  //         destructuredArrayIgnorePattern: '^_',
  //       },
  //     ],
  //     'lit/no-invalid-html': 'warn',
  //   },
  // },
  // {
  //   files: ['**/*.js'],
  //   ...tseslint.configs.disableTypeChecked,
  // },
  {
    files: [
      'src/astro-custom-layout-components/**/*js',
      'src/astro-web-component/**/*js',
    ],
    ...tseslint.configs.disableTypeChecked,

    rules: {
      'no-unused-expressions': 'off',
      'wc/no-constructor-attributes': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  {
    files: ['src/**/*.astro'],
    ...tseslint.configs.disableTypeChecked,

    languageOptions: {
      parser: astroParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  //   rules: {
  //     '@typescript-eslint/no-unused-vars': 'off',
  //   },
  // },

  // {
  //   // enable jest rules on test files
  //   files: ['test/**'],
  //   ...jestPlugin.configs['flat/recommended'],
  // },

  {
    plugins: {
      markdown,
      // astro,
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
