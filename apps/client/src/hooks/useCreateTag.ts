import {
  trpc,
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
} from '@/lib/trpc'

export type CreateTagOptions = ReactQueryOptions['tag']['create']
export type CreateTagInput = RouterInputs['tag']['create']
export type CreateTagOutput = RouterOutputs['tag']['create']

export function useCreateTag(options?: CreateTagOptions) {
  const utils = trpc.useContext()

  return trpc.tag.create.useMutation({
    ...options,
    onSuccess(...a) {
      utils.tag.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(...a)
      }
    },
  })
}
