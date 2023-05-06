import * as SwitchPrimitive from '@radix-ui/react-switch'

import { styled } from '@/stitches.config'

const Switch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  w: '$10',
  h: '$5',
  backgroundColor: '$slate600',
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&[data-state="checked"]': { backgroundColor: '$accent' },
})

const SwitchThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  w: '$4',
  h: '$4',
  backgroundColor: '$accent',
  borderRadius: '9999px',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': {
    transform: 'translateX(21px)',
    backgroundColor: '$slate900',
  },
})

export { Switch, SwitchThumb }
