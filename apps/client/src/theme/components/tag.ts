import { defineStyleConfig } from '@chakra-ui/react'

const Tag = defineStyleConfig({
  baseStyle: {
    container: {
      py: 1,
      px: 2,
      bg: 'slate.100',
      color: 'slate.950',
      borderRadius: 'full',
      fontSize: 'xs',
      fontWeight: 'medium',
    },
  },
})

export default Tag
