import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact, { rules } from 'eslint-plugin-react'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.jsx'],
    ...pluginReact.configs.recommended,
  },
]
