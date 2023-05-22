import { Clear } from '../icons'
import IconButton from '../shared/icon-button'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast'
import { useToast } from './useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-2">
            {title && <ToastTitle variant={props.variant}>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose asChild>
            <IconButton size="sm" tooltip="Dismiss">
              <Clear />
            </IconButton>
          </ToastClose>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
