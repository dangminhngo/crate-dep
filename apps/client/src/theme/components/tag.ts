import { defineStyleConfig } from '@chakra-ui/react'

const Tag = defineStyleConfig({
  baseStyle: {
    container: {
      py: 1.5,
      px: 3,
      bg: 'slate.100',
      color: 'slate.900',
      borderRadius: 'full',
      fontSize: 'xs',
      fontWeight: 'medium',
    },
  },
})

export default Tag
