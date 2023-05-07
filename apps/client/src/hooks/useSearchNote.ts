import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type SearchNoteOptions = ReactQueryOptions['note']['search']
export type SearchNoteInput = RouterInputs['note']['search']
export type SearchNoteOutput = RouterOutputs['note']['search']

export function useSearchNote(
  input: SearchNoteInput,
  options?: SearchNoteOptions
) {
  return trpc.note.search.useQuery(input, options)
}
