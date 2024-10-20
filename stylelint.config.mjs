/** @type {import('stylelint').Config} */
import stylelintConfig from 'stylelint-config-html';
import prettier from 'stylelint-prettier';

export default {
  extends: [stylelintConfig, prettier],

  rules: {
    'block-no-empty': true,
    'color-function-notation': ['modern'],
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected custom property name to be kebab-case',
      },
    ],
  },
};
