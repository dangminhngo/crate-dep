import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { keyframes, styled } from '~/stitches.config'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal
const AlertDialogCancel = AlertDialogPrimitive.Cancel
const AlertDialogAction = AlertDialogPrimitive.Action

const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay, {
  bgAlpha: ['$slate900', 0.8],
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})

const AlertDialogContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: '$slate900',
  borderRadius: '$base',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  w: '90vw',
  maxW: '500px',
  maxH: '85vh',
  p: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '&:focus': { outline: 'none' },
})

const AlertDialogTitle = styled(AlertDialogPrimitive.Title, {
  m: 0,
  color: '$slate200',
  fontSize: '$base',
  fontWeight: '$medium',
})

const AlertDialogDescription = styled(AlertDialogPrimitive.Description, {
  color: '$slate400',
  fontSize: '$sm',
  lineHeight: '$tall',
})

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
