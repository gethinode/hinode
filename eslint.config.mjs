import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  js.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    arrowParens: false,
    braceStyle: '1tbs',
    commaDangle: 'never'
  }),
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      // Match neostandard/StandardJS conventions
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      '@stylistic/max-statements-per-line': 'off',
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true }]
    }
  },
  {
    files: ['assets/js/critical/sidebar-active.js'],
    languageOptions: {
      globals: {
        bootstrap: 'readonly'
      }
    }
  },
  {
    ignores: [
      'assets/js/vendor/**',
      'node_modules/**'
    ]
  }
]
