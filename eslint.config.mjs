import globals from 'globals'
import js from '@eslint/js'

export default [
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  js.configs.recommended,
  {
    rules: {
      'indent': ['warn', 2, { 'SwitchCase': 0 }],
      'linebreak-style': ['warn', 'unix'],
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'never'],
      'max-len': ['warn', { 'code': 120 }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    }
  }
]
