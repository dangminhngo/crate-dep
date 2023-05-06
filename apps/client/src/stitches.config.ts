import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

import { clamp } from './lib/helpers'

const p = {
  primary: 'hsl(84, 44%, 61%)',
  primaryDark: 'hsl(84, 44%, 55%)',
  primaryLight: 'hsl(84, 44%, 70%)',
  slate50: 'hsl(225, 15%, 95%)',
  slate100: 'hsl(219, 14%, 90%)',
  slate200: 'hsl(219, 14%, 82%)',
  slate300: 'hsl(219, 14%, 73%)',
  slate400: 'hsl(219, 14%, 64%)',
  slate500: 'hsl(219, 14%, 56%)',
  slate600: 'hsl(219, 14%, 44%)',
  slate700: 'hsl(219, 14%, 32%)',
  slate800: 'hsl(219, 14%, 20%)',
  slate900: 'hsl(219, 14%, 16%)',
  slate950: 'hsl(219, 14%, 12%)',
  accent: 'hsl(84, 44%, 61%)',
  red: 'hsl(358, 64%, 64%)',
  green: 'hsl(84, 44%, 61%)',
  yellow: 'hsl(57, 70%, 63%)',
  blue: 'hsl(217, 63%, 62%)',
  magenta: 'hsl(265, 60%, 68%)',
  cyan: 'hsl(184, 50%, 60%)',
  teal: 'hsl(158, 63%, 57%)',
  orange: 'hsl(28, 77%, 61%)',
  pink: 'hsl(312, 60%, 65%)',
}

const tokens = {
  colors: {
    ...p,
    fg: p.slate200,
    bg: p.slate900,
    sidebarFg: p.slate200,
    sidebarBg: p.slate950,
    profileButtonFg: p.slate400,
    profileButtonBg: 'transparent',
    profileButtonFgHover: p.slate200,
    profileButtonBgHover: p.slate900,
    sectionButtonFg: p.slate300,
    sectionButtonBg: 'transparent',
    sectionButtonFgHover: p.slate200,
    sectionButtonBgHover: p.slate900,
    sectionButtonFgActive: p.primary,
    sectionButtonBgActive: p.slate800,
    sectionButtonFgDestructive: p.red,
    tooltipFg: p.slate900,
    tooltipBg: p.slate100,
    menuFg: p.slate300,
    menuBg: p.slate800,
    menuSeparator: p.slate700,
    menuItemFg: p.slate300,
    menuItemBg: 'transparent',
    menuItemFgHover: p.slate200,
    menuItemBgHover: p.slate700,
    menuItemFgDanger: p.red,
    menuItemBgDanger: 'transparent',
    iconButtonFg: p.slate300,
    iconButtonBg: 'transparent',
    iconButtonFgHover: p.slate100,
    iconButtonBgHover: p.slate800,
    iconButtonFgActive: p.accent,
    iconButtonBgActive: 'transparent',
    iconButtonFgDestructive: p.red,
    buttonFg: p.slate300,
    buttonBg: 'transparent',
    buttonSecondaryFg: p.slate300,
    buttonSecondaryBg: p.accent,
    buttonDestructiveFg: p.slate900,
    buttonDestructiveBg: p.red,
    buttonOutlineFg: p.slate200,
    buttonOutlineBg: 'transparent',
    buttonOutlineBorder: p.slate800,
    barFg: p.slate300,
    barBg: p.slate900,
    // editor
    editorFg: p.slate200,
    editorBg: p.slate800,
    editorCursorFg: p.slate900,
    editorCursorBg: p.green,
    editorSelectionFg: p.slate100,
    editorSelectionBg: p.slate600,
    editorPanelFg: p.slate200,
    editorPanelBg: p.slate900,
    editorPanelBorder: p.slate700,
    editorSearchMatchFg: p.slate900,
    editorSearchMatchBg: p.green,
    editorActiveLineFg: p.slate200,
    editorActiveLineBg: p.slate900,
    editorBracketMatchFg: p.green,
    editorBracketMatchBg: p.slate600,
    editorGutterFg: p.slate600,
    editorGutterBg: p.slate800,
    editorGutterBorder: 'transparent',
    editorActiveLineGutterFg: p.green,
    editorActiveLineGutterBg: p.slate900,
    editorActiveLineGutterBorder: 'transparent',
    editorFoldPlaceholderFg: p.slate400,
    editorFoldPlaceholderBg: 'transparent',
    editorTooltipFg: p.slate900,
    editorTooltipBg: p.slate100,
    // language tokens
    tokenAttribute: p.yellow,
    tokenBoolean: p.orange,
    tokenBuiltin: p.orange,
    tokenComment: p.slate500,
    tokenConstant: p.orange,
    tokenDefinition: p.blue,
    tokenDelimiter: p.teal,
    tokenFlow: p.pink,
    tokenFunction: p.blue,
    tokenHeading: p.red,
    tokenInvalid: p.slate300,
    tokenKeyword: p.magenta,
    tokenLink: p.blue,
    tokenNumber: p.orange,
    tokenOperator: p.magenta,
    tokenParameter: p.red,
    tokenPreproc: p.magenta,
    tokenProperty: p.teal,
    tokenPunctuation: p.yellow,
    tokenString: p.green,
    tokenTag: p.red,
    tokenType: p.yellow,
    tokenVariable: p.slate200,
  },
  space: {
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    4.5: '18px',
    5: '20px',
    5.5: '22px',
    6: '24px',
    6.5: '26px',
    7: '28px',
    7.5: '30px',
    8: '32px',
    8.5: '34px',
    9: '36px',
    9.5: '38px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    18: '72px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    64: '256px',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
    '5xl': '64px',
    '6xl': '72px',
    '7xl': '88px',
    '8xl': '96px',
  },
  fonts: {
    heading: 'Space Grotesk, apple-system, sans-serif',
    body: 'Inter, apple-system, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    normal: 'normal',
    short: 1.375,
    tall: 1.625,
  },
  sizes: {
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    4.5: '18px',
    5: '20px',
    5.5: '22px',
    6: '24px',
    6.5: '26px',
    7: '28px',
    7.5: '30px',
    8: '32px',
    8.5: '34px',
    9: '36px',
    9.5: '38px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    18: '72px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    64: '256px',
    sm: '560px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    '3xl': '1600px',
    full: '100%',
    screenX: '100vw',
    screenY: '100vh',
  },
  borderWidths: {
    default: '1px',
    lg: '2px',
    xl: '4px',
  },
  radii: {
    sm: '4px',
    base: '6px',
    lg: '8px',
    xl: '10px',
    full: '100%',
  },
  zIndices: {
    1: '10',
    2: '20',
    3: '30',
    4: '40',
    5: '50',
    6: '60',
    7: '70',
    8: '80',
    9: '90',
    10: '100',
  },
  transitions: {
    base: 'all 150ms ease-out',
  },
}

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: tokens,
  utils: {
    maxW: (value: Stitches.PropertyValue<'maxWidth'>) => ({
      maxWidth: value,
    }),
    maxH: (value: Stitches.PropertyValue<'maxHeight'>) => ({
      maxHeight: value,
    }),
    minW: (value: Stitches.PropertyValue<'minWidth'>) => ({
      minWidth: value,
    }),
    minH: (value: Stitches.PropertyValue<'minHeight'>) => ({
      minHeight: value,
    }),
    h: (value: Stitches.PropertyValue<'height'>) => ({
      height: value,
    }),
    w: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
    }),
    // Abbreviated margin properties
    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    // A property for applying width/height together
    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),

    // A property to apply linear gradient
    linearGradient: (value: string) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    // An abbreviated property for border-radius
    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),

    // background color with alpha
    bgAlpha: ([key, alpha]: [`$${keyof typeof tokens.colors}`, number]) => {
      const cleanKey = key.replace('$', '')
      const color = tokens.colors[cleanKey as keyof typeof tokens.colors]

      if (!color.startsWith('hsl'))
        return {
          backgroundColor: 'transparent',
        }

      return {
        backgroundColor: `hsla(${color
          .replace('hsl(', '')
          .replace(')', '')}, ${clamp(alpha, 0, 1)})`,
      }
    },
  },
  prefix: 'crate',
})

export type Theme = typeof theme
export type CSS = Stitches.CSS<typeof config>
