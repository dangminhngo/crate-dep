import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type CreateNoteOptions = ReactQueryOptions['note']['create']
export type CreateNoteInput = RouterInputs['note']['create']
export type CreateNoteOutput = RouterOutputs['note']['create']

export function useCreateNote(options?: CreateNoteOptions) {
  const utils = trpc.useContext()

  return trpc.note.create.useMutation({
    ...options,
    onSuccess(...a) {
      utils.note.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(...a)
      }
    },
  })
}
