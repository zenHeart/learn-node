import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
 {
   ignores: [
     '**/node_modules/*',
     '**/test-results/*',
     '**/playwright-report/*',
   ],
   files: ['**/*.js'],
   plugins: {
     'simple-import-sort': simpleImportSort,
   },
   rules: {
     'simple-import-sort/imports': 'error',
     'simple-import-sort/exports': 'error',
   },
 },
 eslint.configs.recommended,
 eslintPluginPrettierRecommended,
];