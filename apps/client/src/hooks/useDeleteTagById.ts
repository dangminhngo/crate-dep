import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type DeleteTagByIdOptions = ReactQueryOptions['tag']['deleteById']
export type DeleteTagByIdInput = RouterInputs['tag']['deleteById']
export type DeleteTagByIdOutput = RouterOutputs['tag']['deleteById']

export function useDeleteTagById(options?: DeleteTagByIdOptions) {
  const utils = trpc.useContext()

  return trpc.tag.deleteById.useMutation({
    ...options,
    onSuccess(...a) {
      utils.tag.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(...a)
      }
    },
  })
}
