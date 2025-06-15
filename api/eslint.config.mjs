import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
    },
    extends: [eslintConfigPrettier],
    rules: {
      // Regras gerais
      'no-unused-vars': 'error',
      'no-console': 'off',
      'no-throw-literal': 'warn',

      // Regras de importação
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Regras de formatação relacionadas ao Prettier
      'prettier/prettier': 'error',

      // Regras de espaçamento e formatação
      'arrow-spacing': ['warn', { before: true, after: true }],
      'comma-spacing': ['warn', { before: false, after: true }],
      'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
      'keyword-spacing': ['warn', { before: true, after: true }],
      'object-curly-spacing': ['warn', 'always'],
      'semi-spacing': ['warn', { before: false, after: true }],
      'space-before-blocks': 'warn',
      'space-before-function-paren': [
        'warn',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'space-in-parens': ['warn', 'never'],
      'space-infix-ops': 'warn',
    },
  },
  tseslint.configs.recommended,
]);
