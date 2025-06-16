import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Regras de importação e exportação
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Regras gerais
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off', // Desativa a regra nativa em favor da versão do TypeScript
      'no-console': 'off',
      'no-throw-literal': 'warn',

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
);
