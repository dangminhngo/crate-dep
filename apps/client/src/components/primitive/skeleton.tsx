import { keyframes, styled } from '~/stitches.config'

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.6 },
})

const Skeleton = styled('div', {
  minH: '$6',
  minW: '$6',
  display: 'block',
  backgroundColor: '$slate700',
  br: '$sm',
  animation: `${pulse} 1.5s infinite`,
})

export { Skeleton }
