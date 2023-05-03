import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type TagByIdOptions = ReactQueryOptions['tag']['byId']
export type TagByIdInput = RouterInputs['tag']['byId']
export type TagByIdOutput = RouterOutputs['tag']['byId']

export function useTagById(input: TagByIdInput, options?: TagByIdOptions) {
  return trpc.tag.byId.useQuery<TagByIdOutput, TagByIdOutput>(input, options)
}
