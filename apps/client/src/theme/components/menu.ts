import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const helpers = createMultiStyleConfigHelpers(['menu', 'list', 'item'])

const Menu = helpers.defineMultiStyleConfig({
  baseStyle: {
    menu: {
      color: 'slate.300',
      bg: 'slate.800',
    },
    list: {
      bg: 'slate.800',
      borderRadius: 'base',
      boxShadow: 'lg',
      overflow: 'hidden',
      zIndex: 1000,
    },
    item: {
      px: 4,
      py: 2,
      color: 'slate.200',
      display: 'flex',
      alignItems: 'center',
      transitionProperty: 'color, background-color, border-color',
      transitionDuration: '0.15s',
      transitionTimingFunction: 'ease-out',
      _hover: {
        color: 'slate.100',
        bg: 'slate.700',
      },
      '& svg': {
        h: 5,
        w: 5,
      },
    },
  },
})

export default Menu
