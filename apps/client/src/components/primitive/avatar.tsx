import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { styled } from '@/stitches.config'

const Avatar = styled(AvatarPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  height: '$6',
  width: '$6',
  flexShrink: 0,
  overflow: 'hidden',
  borderRadius: '$full',
})

const AvatarImage = styled(AvatarPrimitive.Image, {
  aspectRatio: 1,
  height: '$full',
  width: '$full',
})

const AvatarFallback = styled(AvatarPrimitive.Fallback, {
  display: 'flex',
  height: '$full',
  width: '$full',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '$full',
  background: '$primary',
  color: '$slate900',
})

export { Avatar, AvatarImage, AvatarFallback }
