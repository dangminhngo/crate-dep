import { styled } from '@/stitches.config'

const Chip = styled('div', {
  backgroundColor: '$slate100',
  color: '$slate900',
  fontWeight: '$medium',
  variants: {
    variant: {
      default: {
        br: '$sm',
      },
      rounded: {
        br: '$full',
      },
    },
    size: {
      default: {
        px: '$2',
        py: '$1',
        fontSize: '$xs',
      },
      lg: {
        px: '$3',
        py: '$2',
        fontSize: '$sm',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const ChipLabel = styled('span', {})

const ChipDeleteButton = styled('button', {})

export { Chip, ChipLabel, ChipDeleteButton }
