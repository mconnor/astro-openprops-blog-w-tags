// @ts-check
import astroParser from 'astro-eslint-parser';
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';


const extraFileExtensions = ['.astro', '.md', '.mdx']
export default tseslint.config(
  {
    ignores: [
      'dist/',
      'tsup.config.ts',
      '.vercel/',
      '.wrangler',
      'cache-directory/',
      '.svelte-kit/',
      '.next/',
      'build/',
      '.env.*',
      '.DS_Store',
      '.turbo/',
      'Thumbs.db',
      '.astro/',
      '.prettierrc.mjs',
      'test/*.ts',
      '.turbo/',
      '*.svg',
      '*-lock.yaml',
      'package-lock.json',
      '.frontmatter',
      'test/',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  {
    name: '[*] TS Rules',
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        projectService: {
          allowDefaultProject: ['*.js'],
        },
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'capitalized-comments': 'off',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/array-type': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
    },
  },

  {
    name: '[*] Astro Files',
    files: ['*.astro'],
    extends: [
      eslintPluginAstro.configs.recommended,
      tseslint.configs.disableTypeChecked,
    ],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        allowDefaultProject: ['*.astro'],
        ecmaFeatures: {
          jsx: false,
        },
        extraFileExtensions,
      },
    },
  },

  {
    name: '[*] Type Definition Files',
    files: ['*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'warn',
    },
  },

  {
    name: '[*] Action Files',
    files: ['actions/*.ts'],
    rules: {
      '@typescript-eslint/no-misused-promises': 'warn',
    },
  },

  {
    name: '[*] JavaScript Files',
    files: ['*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  eslintConfigPrettier,
);
