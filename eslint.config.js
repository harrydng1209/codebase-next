import jsLint from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import reactLint from 'eslint-plugin-react';
import globals from 'globals';
import tsLint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/.git/',
      '**/.husky/',
      '**/dist/',
      '**/node_modules/',
      '**/pnpm-lock.yaml',
      'src/@types/',
    ],
  },

  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  reactLint.configs.flat.recommended,
  reactLint.configs.flat['jsx-runtime'],
  perfectionist.configs['recommended-natural'],
  configPrettier,

  {
    files: ['**/*.{cjs,cts,mjs,mts,js,jsx,ts,tsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: tsLint.parser,
        sourceType: 'module',
      },
    },

    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'eol-last': ['error', 'always'],

      'no-console': [
        'warn',
        {
          allow: ['error', 'info'],
        },
      ],

      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],

      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
