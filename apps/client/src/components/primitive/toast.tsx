import * as ToastPrimitive from '@radix-ui/react-toast'
import { keyframes, styled } from '~/stitches.config'

const { Provider: ToastProvider, Close: ToastClose } = ToastPrimitive

const VIEWPORT_PADDING = 16

const ToastViewport = styled(ToastPrimitive.Viewport, {
  position: 'fixed',
  zIndex: '$10',
  bottom: 0,
  right: 0,
  p: VIEWPORT_PADDING,
  m: 0,
  maxW: '$screenX',
  display: 'flex',
  listStyle: 'none',
  outline: 'none',
})

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: 'translateX(0)' },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
})

const Toast = styled(ToastPrimitive.Root, {
  minW: '20vw',
  backgroundColor: '$slate950',
  border: '1px solid $slate700',
  borderRadius: '$base',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  padding: '$4',
  display: 'grid',
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: 'auto max-content',
  columnGap: 15,
  alignItems: 'center',

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${hide} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: 'translateX(var(--radix-toast-swipe-move-x))',
  },
  '&[data-swipe="cancel"]': {
    transform: 'translateX(0)',
    transition: 'transform 200ms ease-out',
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },

  variants: {
    variant: {
      success: {},
      destructive: {},
    },
  },
  defaultVariants: {
    variant: 'success',
  },
})

const ToastTitle = styled(ToastPrimitive.Title, {
  gridArea: 'title',
  marginBottom: '$2',
  fontWeight: '$semibold',
  fontSize: '$sm',
  variants: {
    variant: {
      success: {
        color: '$accent',
      },
      destructive: {
        color: '$red',
      },
    },
  },
  defaultVariants: {
    variant: 'success',
  },
})

const ToastDescription = styled(ToastPrimitive.Description, {
  gridArea: 'description',
  margin: 0,
  color: '$slate400',
  fontSize: '$sm',
  fontWeight: '$medium',
  lineHeight: '$short',
})

const ToastAction = styled(ToastPrimitive.Action, {
  gridArea: 'action',
})

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
  type ToastProps,
  type ToastActionElement,
}
