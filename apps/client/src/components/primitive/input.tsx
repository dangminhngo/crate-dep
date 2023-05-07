import { styled } from '@/stitches.config'

const inputStyles = {
  all: 'unset',
  boxSizing: 'border-box',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  br: '$base',
  fontSize: '$sm',
  color: 'white',
  backgroundColor: '$slate800',
  border: '1px solid $slate700',
  '&:hover': { boxShadow: `0 0 0 1px black` },
  '&:focus': { boxShadow: `0 0 0 2px black`, backgroundColor: '$slate800' },
  '&::selection': { backgroundColor: '$accent', color: '$slate800' },
}

const Input = styled('input', {
  ...inputStyles,
  h: '$10',
  px: '$4',
})

const Textarea = styled('textarea', {
  ...inputStyles,
  resize: 'none',
  p: '$3',
})

export { Input, Textarea }
