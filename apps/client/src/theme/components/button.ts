import { defineStyleConfig } from '@chakra-ui/react'

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'medium',
    borderRadius: 'base',
    transition: `all .15s ease-out`,
  },
  sizes: {
    md: {
      h: 9,
      fontSize: 'sm',
      px: 4,
    },
    lg: {
      h: 12,
      fontSize: 'md',
      px: 6,
    },
  },
  variants: {
    default: {
      bg: 'brand.primary',
      color: 'slate.950',
      _hover: {
        bg: 'brand.light',
      },
    },
    unstyled: {},
    text: {
      color: 'brand.primary',
      _hover: {
        color: 'brand.light',
        bg: 'slate.800',
      },
    },
    outline: {
      border: '1px solid',
      borderColor: 'brand.primary',
      color: 'brand.primary',
      _hover: {
        borderColor: 'brand.light',
        color: 'brand.light',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'default',
  },
})

export default Button
