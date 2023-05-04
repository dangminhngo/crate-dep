import { theme as chakraTheme, extendBaseTheme } from '@chakra-ui/react'

import Alert from './components/alert'
import Button from './components/button'
import Menu from './components/menu'
import Table from './components/table'
import Tag from './components/tag'
import Tooltip from './components/tooltip'

const { Avatar, Heading, Skeleton } = chakraTheme.components

const palette = {
  transparent: 'transparent',
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
    900: '#242930',
    950: '#1d2026',
  },
  red: '#de6a6d',
  green: '#a4c76f',
  yellow: '#e3dd5f',
  blue: '#6090db',
  magenta: '#a57cde',
  cyan: '#66c5cc',
  teal: '#4dd6a4',
  orange: '#e8964f',
  pink: '#db70c6',
}

export const getTheme = () => {
  const theme = extendBaseTheme({
    styles: {
      global: {
        body: {
          color: 'slate.100',
          bg: 'slate.950',
          lineHeight: 'none',
        },
      },
    },
    colors: {
      ...palette,
      editor: {
        fg: palette.slate['200'],
        bg: palette.slate['800'],
      },
      editorCursor: {
        fg: palette.slate['900'],
        bg: palette.green,
      },
      editorSelection: {
        fg: palette.slate['100'],
        bg: palette.slate['600'],
      },
      editorPanel: {
        fg: palette.slate['200'],
        bg: palette.slate['900'],
        border: `1px solid ${palette.slate['700']}`,
      },
      editorSearchMatch: {
        fg: palette.slate['900'],
        bg: palette.green,
        border: 'none',
      },
      editorActiveLine: {
        fg: palette.slate['200'],
        bg: palette.slate['900'],
      },
      editorBracketMatch: {
        fg: palette.green,
        bg: palette.slate['600'],
      },
      editorGutter: {
        fg: palette.slate['600'],
        bg: palette.slate['800'],
        border: 'none',
      },
      editorActiveLineGutter: {
        fg: palette.green,
        bg: palette.slate['900'],
        border: 'none',
      },
      editorFoldPlaceholder: {
        fg: palette.slate['400'],
        bg: palette.transparent,
      },
      editorTooltip: {
        fg: palette.slate['200'],
        bg: palette.slate['900'],
        border: 'none',
      },
      languageTokens: {
        attribute: palette.yellow,
        boolean: palette.orange,
        builtin: palette.orange,
        comment: palette.slate['500'],
        constant: palette.orange,
        definition: palette.blue,
        delimiter: palette.teal,
        flow: palette.pink,
        function: palette.blue,
        heading: palette.red,
        invalid: palette.slate['300'],
        keyword: palette.magenta,
        link: palette.blue,
        number: palette.orange,
        operator: palette.magenta,
        parameter: palette.red,
        preproc: palette.magenta,
        property: palette.teal,
        punctuation: palette.yellow,
        string: palette.green,
        tag: palette.red,
        type: palette.yellow,
        variable: palette.slate['200'],
      },
    },
    fonts: {
      body: 'Inter, system-ui, sans-serif',
      heading: 'Space Grotesk, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    components: {
      Alert,
      Avatar,
      Button,
      Heading,
      Menu,
      Skeleton,
      Table,
      Tag,
      Tooltip,
    },
  })
  return theme
}

export type AppTheme = ReturnType<typeof getTheme>
