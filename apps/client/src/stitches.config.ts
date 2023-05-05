import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

const p = {
  primary: '#a4c76f',
  primaryDark: '#96bf5a',
  primaryLight: '#b9d491',
  slate50: '#f0f1f4',
  slate100: '#e2e4e9',
  slate200: '#c6cad2',
  slate300: '#a9afbc',
  slate400: '#8d95a5',
  slate500: '#707b8f',
  slate600: '#5a6372',
  slate700: '#434a56',
  slate800: '#2c313a',
  slate900: '#21252b',
  slate950: '#1b1f24',
  accent: '#a4c76f',
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
  theme: {
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
  },
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
  },
  prefix: 'crate',
})

export type Theme = typeof theme
export type CSS = Stitches.CSS<typeof config>
