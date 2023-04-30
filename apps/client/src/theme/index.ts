import { theme as chakraTheme, extendBaseTheme } from '@chakra-ui/react'

import Button from './components/button'
import Icon from './components/icon'
import Menu from './components/menu'
import Tooltip from './components/tooltip'

const { Avatar } = chakraTheme.components

export const getTheme = () => {
  const theme = extendBaseTheme({
    styles: {
      global: {
        body: {
          color: 'slate.100',
          bg: 'slate.900',
          lineHeight: 'none',
        },
      },
    },
    colors: {
      brand: { primary: '#a4c76f', light: '#b9d491', dark: '#96bf5a' },
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
        900: '#1d2026',
      },
    },
    fonts: {
      body: 'Inter, system-ui, sans-serif',
      heading: 'Space Grotesk, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    components: {
      Avatar,
      Button,
      Icon,
      Menu,
      Tooltip,
    },
  })
  return theme
}
