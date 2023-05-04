import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type NoteByIdOptions = ReactQueryOptions['note']['byId']
export type NoteByIdInput = RouterInputs['note']['byId']
export type NoteByIdOutput = RouterOutputs['note']['byId']

export function useNoteById(input: NoteByIdInput, options?: NoteByIdOptions) {
  return trpc.note.byId.useQuery(input, options)
}
