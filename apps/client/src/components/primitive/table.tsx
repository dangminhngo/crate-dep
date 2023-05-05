import { styled } from '@/stitches.config'

const Table = styled('table', {
  borderCollapse: 'collapse',
  border: 'none',
  '& th': {
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '$xs',
    color: '$slate600',
  },
  '& th, & td': {
    px: '$4',
    py: '$3',
  },
  '& tr': {
    border: '1px solid',
  },
  'tbody tr': {
    transition: '$base',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '$slate800',
    },
  },
  variants: {
    variant: {
      default: {
        '& tr': {
          borderColor: '$slate800',
        },
      },
      destructive: {
        '& tr': {
          borderColor: '$red',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export { Table }
