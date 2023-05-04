module.exports = {
  env: { browser: true, es2020: true },
  extends: ['plugin:react-hooks/recommended', 'plugin:tailwindcss/recommended'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/jsx-key': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'error',
  },
  settings: {
    tailwindcss: {
      callees: ['cn'],
      config: 'tailwind.config.js',
    },
  },
}
