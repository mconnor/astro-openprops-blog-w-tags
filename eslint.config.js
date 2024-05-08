// ver 2.0.0

import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { builtinModules } from 'node:module';



import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'
import markdown from 'eslint-plugin-markdown'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc';
import regexpEslint from 'eslint-plugin-regexp';
// parsers
const typescriptParser = tseslint.parser;
const typescriptEslint = tseslint.plugin;

// import tsPlugin from '@typescript-eslint/eslint-plugin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ref: https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config
// mimic CommonJS variables -- not needed if using CommonJS
const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  //  ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...eslintPluginAstro.configs.recommended,
  	...compat.extends('plugin:regexp/recommended'),
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
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
			'@typescript-eslint': typescriptEslint,
			// 'no-only-tests': noOnlyTestsEslint,
			regexp: regexpEslint,
    },
    rules: {

      // These off/configured-differently-by-default rules fit well for us
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			// 'no-only-tests/no-only-tests': 'error',
			'@typescript-eslint/no-shadow': 'error',
			'no-console': 'warn',

			// Todo: do we want these?
			'@typescript-eslint/array-type': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/class-literal-property-style': 'off',
			'@typescript-eslint/consistent-indexed-object-style': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/dot-notation': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/no-this-alias': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unnecessary-type-assertion': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/prefer-optional-chain': 'off',
			'@typescript-eslint/prefer-string-starts-ends-with': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/restrict-plus-operands': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/sort-type-constituents': 'off',
			'@typescript-eslint/unbound-method': 'off',
			'@typescript-eslint/no-explicit-any': 'off',

			// Enforce separate type imports for type-only imports to avoid bundling unneeded code
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					fixStyle: 'separate-type-imports',
					disallowTypeAnnotations: false,
				},
			],

			// These rules enabled by the preset configs don't work well for us
			'@typescript-eslint/await-thenable': 'off',
			'prefer-const': 'off',

			// In some cases, using explicit letter-casing is more performant than the `i` flag
			'regexp/use-ignore-case': 'off',
    }
  },
   {

        linterOptions: {
            reportUnusedDisableDirectives: "warn"
        }
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
    files: ['src/**/*.md'],

    processor: 'markdown/markdown',
    rules: {
      // ...
    },
  },
  {
    // 1. Target ```js code blocks in .md files.
    files: ['**/*.md/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier, // eslint-config-prettier last
]
