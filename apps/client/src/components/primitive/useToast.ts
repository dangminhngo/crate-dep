import React from 'react'

import type { ToastActionElement, ToastProps } from './toast'

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
}

enum ActionType {
  ADD_TOAST = 'ADD_TOAST',
  UPDATE_TOAST = 'UPDATE_TOAST',
  DISMISS_TOAST = 'DISMISS_TOAST',
}

let count = 0

function generateToastId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type Action =
  | {
      type: ActionType.ADD_TOAST
      toast: ToasterToast
    }
  | {
      type: ActionType.UPDATE_TOAST
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType.DISMISS_TOAST
      id?: ToasterToast['id']
    }

interface ToastState {
  toasts: ToasterToast[]
}

export const reducer = (state: ToastState, action: Action): ToastState => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      }
    case ActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
    case ActionType.DISMISS_TOAST: {
      const { id } = action
      if (id) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== id),
        }
      }

      return {
        ...state,
        toasts: [],
      }
    }
    default:
      return state
  }
}

const listeners: Array<(state: ToastState) => void> = []
let memoryState: ToastState = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

interface Toast extends Omit<ToasterToast, 'id'> {}

function toast({ ...props }: Toast) {
  const id = generateToastId()
  const update = (props: ToasterToast) =>
    dispatch({
      type: ActionType.UPDATE_TOAST,
      toast: { ...props, id },
    })

  const dismiss = () => dispatch({ type: ActionType.DISMISS_TOAST, id })

  dispatch({
    type: ActionType.ADD_TOAST,
    toast: {
      id,
      ...props,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (id?: string) => dispatch({ type: ActionType.DISMISS_TOAST, id }),
  }
}

export { useToast, toast }
