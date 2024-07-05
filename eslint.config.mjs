import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fixupConfigRules, includeIgnoreFile } from '@eslint/compat'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

// https://eslint.org/docs/latest/use/configure/ignore#including-gitignore-files
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  includeIgnoreFile(gitignorePath),
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  eslintConfigPrettier,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      // Not supported: https://github.com/import-js/eslint-plugin-import/issues/2948#issuecomment-2148832701
      // "@typescript-eslint/consistent-type-imports": "error",
      // "@typescript-eslint/consistent-type-exports": "error",
    },
  },
]
