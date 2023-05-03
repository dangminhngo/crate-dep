import { defineStyleConfig } from '@chakra-ui/react'

const Tooltip = defineStyleConfig({
  baseStyle: {
    px: 2,
    py: 1,
    bg: 'slate.200',
    color: 'slate.900',
    fontSize: 'sm',
    borderRadius: 'base',
    boxShadow: 'md',
  },
})

export default Tooltip
