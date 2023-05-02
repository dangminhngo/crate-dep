import { defineStyleConfig } from '@chakra-ui/react'

const Table = defineStyleConfig({
  baseStyle: {
    table: {
      w: '100%',
      borderCollapse: 'collapsed',
      textAlign: 'left',
    },
    th: {
      px: 4,
      py: 3,
      fontSize: 'xs',
      textTransform: 'uppercase',
      color: 'slate.400',
      border: `1px solid`,
      borderColor: 'slate.700',
    },
    td: {
      px: 4,
      py: 2,
      border: `1px solid`,
      borderColor: 'slate.700',
    },
  },
})

export default Table
