/* eslint @typescript-eslint/no-var-requires: "off" */
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      primary: { DEFAULT: '#a4c76f', light: '#b9d491', dark: '#96bf5a' },
      slate: {
        50: '#f0f1f4',
        100: '#e2e4e9',
        200: '#c6cad2',
        300: '#a9afbc',
        400: '#8d95a5',
        500: '#707b8f',
        600: '#5a6372',
        700: '#434a56',
        800: '#2c313a',
        900: '#21252b',
        950: '#1b1f24',
      },
      red: colors.red,
      blue: colors.blue,
      amber: colors.amber,
    },
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    fontFamily: {
      body: ['Inter', ...fontFamily.sans],
      heading: ['Space Grotesk', ...fontFamily.sans],
      mono: ['JetBrains Mono', ...fontFamily.mono],
    },
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}
