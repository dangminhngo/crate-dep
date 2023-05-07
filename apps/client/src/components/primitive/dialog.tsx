import * as DialogPrimitive from '@radix-ui/react-dialog'

import { keyframes, styled } from '@/stitches.config'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = styled(DialogPrimitive.Overlay, {
  bgAlpha: ['$slate900', 0.8],
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const DialogContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$slate900',
  br: '$base',
  border: '1px solid $slate800',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  w: '90vw',
  maxW: '600px',
  maxH: '60vh',
  minH: '60vh',
  p: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  overflow: 'hidden',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
})

const DialogTitle = styled(DialogPrimitive.Title, {
  m: 0,
  fontWeight: '$semibold',
  color: '$slate200',
  fontSize: '$base',
})

const DialogDescription = styled(DialogPrimitive.Description, {
  color: '$slate400',
  fontSize: '$sm',
  lineHeight: '$base',
})

const DialogCloseButton = styled(DialogPrimitive.Close, {
  all: 'unset',
  fontFamily: 'inherit',
  br: '$full',
  h: '$6',
  w: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$slate200',
  position: 'absolute',
  top: '$2',
  right: '$2',

  '&:hover': { backgroundColor: '$slate700' },
  '&:focus': { boxShadow: `0 0 0 2px $slate900` },
})

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogCloseButton,
}
