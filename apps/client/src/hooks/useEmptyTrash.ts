import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type EmptyTrashOptions = ReactQueryOptions['note']['emptyTrash']
export type EmptyTrashInput = RouterInputs['note']['emptyTrash']
export type EmptyTrashOutput = RouterOutputs['note']['emptyTrash']

export function useEmptyTrash(options?: EmptyTrashOptions) {
  const utils = trpc.useContext()

  return trpc.note.emptyTrash.useMutation({
    ...options,
    onSuccess(data, ...rest) {
      utils.note.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(data, ...rest)
      }
    },
  })
}
