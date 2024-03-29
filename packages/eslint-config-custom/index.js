module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'turbo',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react-refresh'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/jsx-key': 'off',
    // @link https://stackoverflow.com/questions/76457373/cannot-read-properties-of-undefined-reading-gettokens-occurred-while-linting
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
}
