import { styled } from '~/stitches.config'

const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  br: '$base',
  fontSize: '$sm',
  fontWeight: '$medium',
  transition: '$base',
  '&:disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  variants: {
    variant: {
      default: {
        background: '$primary',
        color: '$slate900',
        '&:hover': {
          background: '$primaryLight',
        },
      },
      destructive: {
        background: '$red',
        color: '$slate900',
      },
      outline: {
        background: 'transparent',
        color: '$slate200',
        border: '1px solid',
        borderColor: '$slate700',
        '&:hover': {
          background: '$slate800',
          color: '$primaryLight',
        },
      },
      ghost: {
        background: 'transparent',
        color: '$slate200',
        '&:hover': {
          background: '$slate800',
        },
      },
      link: {
        color: '$blue',
      },
    },
    size: {
      default: {
        px: '$5',
        h: '$9',
      },
      sm: {
        px: '$4',
        h: '$8',
      },
      lg: {
        px: '$8',
        h: '$12',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export { Button }
