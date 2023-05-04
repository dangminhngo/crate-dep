import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type TagListOptions = ReactQueryOptions['tag']['list']
export type TagListInput = RouterInputs['tag']['list']
export type TagListOutput = RouterOutputs['tag']['list']

export function useTagList(input?: TagListInput, options?: TagListOptions) {
  return trpc.tag.list.useQuery(input, options)
}
