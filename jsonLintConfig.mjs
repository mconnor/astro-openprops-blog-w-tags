import json from '@eslint/json';

export default [
  {
    ignores: [
      'dist/',
      '.astro/',
      'cache-directory/',
      '.vercel/',
      'test/',
      '**/*.js',
      '**/*.astro',
      '**/*.md',
      '**/*.mjs',
      '**/*.ts',
      '**/*.mts',
      '*lock.yaml',
    ],
  },
  {
    plugins: {
      json,
    },
  },

  // lint JSON files
  {
    files: ['**/*.json'],
    language: 'json/json',
    rules: {
      'json/no-duplicate-keys': 'error',
      'json/no-empty-keys': 'error',
    },
  },

  // lint JSONC files
  {
    files: ['**/*.jsonc', '.vscode/*.json'],
    language: 'json/jsonc',
    rules: {
      'json/no-duplicate-keys': 'error',
    },
  },

  // lint JSON5 files
  {
    files: ['**/*.json5'],
    language: 'json/json5',
    rules: {
      'json/no-duplicate-keys': 'error',
    },
  },
];
