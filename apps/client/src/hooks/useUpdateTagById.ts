import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type UpdateTagByIdOptions = ReactQueryOptions['tag']['updateById']
export type UpdateTagByIdInput = RouterInputs['tag']['updateById']
export type UpdateTagByIdOutput = RouterOutputs['tag']['updateById']

export function useUpdateTagById(options?: UpdateTagByIdOptions) {
  const utils = trpc.useContext()

  return trpc.tag.updateById.useMutation({
    ...options,
    onSuccess(data, ...rest) {
      utils.tag.list.invalidate()
      utils.tag.byId.invalidate(data.id)
      if (options?.onSuccess) {
        options.onSuccess(data, ...rest)
      }
    },
  })
}
