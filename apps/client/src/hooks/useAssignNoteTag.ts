import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type AssignNoteTagOptions = ReactQueryOptions['note']['assignTag']
export type AssignNoteTagInput = RouterInputs['note']['assignTag']
export type AssignNoteTagOutput = RouterOutputs['note']['assignTag']

export function useAssignNoteTag(options?: AssignNoteTagOptions) {
  const utils = trpc.useContext()

  return trpc.note.assignTag.useMutation({
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
