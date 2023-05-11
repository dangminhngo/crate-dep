import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type RemoveNoteTagOptions = ReactQueryOptions['note']['removeTag']
export type RemoveNoteTagInput = RouterInputs['note']['removeTag']
export type RemoveNoteTagOutput = RouterOutputs['note']['removeTag']

export function useRemoveNoteTag(options?: RemoveNoteTagOptions) {
  const utils = trpc.useContext()

  return trpc.note.removeTag.useMutation({
    ...options,
    onSuccess(data, ...rest) {
      utils.note.list.invalidate()
      utils.note.byId.invalidate(data.id)
      if (options?.onSuccess) {
        options.onSuccess(data, ...rest)
      }
    },
  })
}
