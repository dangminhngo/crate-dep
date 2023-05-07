import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type SearchTagOptions = ReactQueryOptions['tag']['search']
export type SearchTagInput = RouterInputs['tag']['search']
export type SearchTagOutput = RouterOutputs['tag']['search']

export function useSearchTag(
  input: SearchTagInput,
  options?: SearchTagOptions
) {
  return trpc.tag.search.useQuery(input, options)
}
