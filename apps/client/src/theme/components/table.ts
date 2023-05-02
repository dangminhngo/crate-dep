import { defineStyleConfig } from '@chakra-ui/react'

const Table = defineStyleConfig({
  baseStyle: {
    table: {
      w: '100%',
      borderCollapse: 'collapsed',
      textAlign: 'left',
    },
    th: {
      p: 2,
      fontSize: 'xs',
      textTransform: 'uppercase',
      color: 'slate.400',
    },
    td: {
      p: 2,
    },
  },
})

export default Table
