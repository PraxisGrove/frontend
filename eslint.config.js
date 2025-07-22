import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      '.storybook/**',
      'storybook-static/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
];

export default eslintConfig;
