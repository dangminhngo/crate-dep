import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type UpdateNoteByIdOptions = ReactQueryOptions['note']['updateById']
export type UpdateNoteByIdInput = RouterInputs['note']['updateById']
export type UpdateNoteByIdOutput = RouterOutputs['note']['updateById']

export function useUpdateNoteById(options?: UpdateNoteByIdOptions) {
  const utils = trpc.useContext()

  return trpc.note.updateById.useMutation({
    ...options,
    onSuccess(input) {
      utils.note.list.invalidate()
      utils.note.byId.invalidate(input.id)
    },
  })
}