import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type DeleteNoteByIdOptions = ReactQueryOptions['note']['deleteById']
export type DeleteNoteByIdInput = RouterInputs['note']['deleteById']
export type DeleteNoteByIdOutput = RouterOutputs['note']['deleteById']

export function useDeleteNoteById(options?: DeleteNoteByIdOptions) {
  const utils = trpc.useContext()

  return trpc.note.deleteById.useMutation({
    ...options,
    onSuccess(...a) {
      utils.note.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(...a)
      }
    },
  })
}
