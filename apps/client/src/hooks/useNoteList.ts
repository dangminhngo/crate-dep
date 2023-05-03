import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type NoteListOptions = ReactQueryOptions['note']['list']
export type NoteListInput = RouterInputs['note']['list']
export type NoteListOutput = RouterOutputs['note']['list']

export function useNoteList(input: NoteListInput, options?: NoteListOptions) {
  return trpc.note.list.useQuery<NoteListOutput, NoteListOutput>(input, options)
}
