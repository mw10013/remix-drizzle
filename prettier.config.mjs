// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    semi: false,
    singleQuote: true,
    bracketSameLine: true,
    bracketSpacing: true,
    arrowParens: 'always',
    trailingComma: 'es5',
  
    // https://github.com/IanVS/prettier-plugin-sort-imports
    importOrder: [
      '<TYPES>^(node:)',
      '<TYPES>',
      '<TYPES>^[.]',
      '^(react/(.*)$)|^(react$)',
      '<THIRD_PARTY_MODULES>',
      '^~/(.*)$',
      '^[./]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '5.3.3',
  
    // https://github.com/prettier/prettier-vscode/issues/3248: "prettier.documentSelectors": ["**/*.sql"]
    // https://github.com/tailwindlabs/prettier-plugin-tailwindcss
    // https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/59
    tailwindConfig: './functions/app/tailwind.config.ts',
    plugins: [
      'prettier-plugin-sql',
      '@ianvs/prettier-plugin-sort-imports',
      'prettier-plugin-tailwindcss',
    ],
    tailwindFunctions: ['tv'],
  }
  
  export default config
  