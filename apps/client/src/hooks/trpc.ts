import { trpc, type ReactQueryOptions, type RouterInputs } from '@/lib/trpc'

function useCreateNote(options?: ReactQueryOptions['note']['create']) {
  const utils = trpc.useContext()

  return trpc.note.create.useMutation({
    ...options,
    onSuccess(...a) {
      utils.note.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(...a)
      }
    },
  })
}

function useCreateTag(options?: ReactQueryOptions['tag']['create']) {
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

function useDeleteNoteById(options?: ReactQueryOptions['note']['deleteById']) {
  const utils = trpc.useContext()

  return trpc.note.deleteById.useMutation({
    ...options,
    onSuccess(...a) {
      utils.note.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(...a)
      }
    },
  })
}

function useDeleteTagById(options?: ReactQueryOptions['tag']['deleteById']) {
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

function useEmptyTrash(options?: ReactQueryOptions['note']['emptyTrash']) {
  const utils = trpc.useContext()

  return trpc.note.emptyTrash.useMutation({
    ...options,
    onSuccess(data, ...rest) {
      utils.note.list.invalidate()
      if (options?.onSuccess) {
        options.onSuccess(data, ...rest)
      }
    },
  })
}

function useNoteById(
  input: RouterInputs['note']['byId'],
  options?: ReactQueryOptions['note']['byId']
) {
  return trpc.note.byId.useQuery(input, options)
}

function useNoteList(
  input: RouterInputs['note']['list'],
  options?: ReactQueryOptions['note']['list']
) {
  return trpc.note.list.useQuery(input, options)
}

function useAssignNoteTag(options?: ReactQueryOptions['note']['assignTag']) {
  const utils = trpc.useContext()

  return trpc.note.assignTag.useMutation({
    ...options,
    onSuccess(data, ...rest) {
      utils.note.list.invalidate()
      utils.note.byId.invalidate(data.id)
      if (options?.onSuccess) {
        options.onSuccess(data, ...rest)
      }
    },
  })
}

function useRemoveNoteTag(options?: ReactQueryOptions['note']['removeTag']) {
  const utils = trpc.useContext()

  return trpc.note.removeTag.useMutation({
    ...options,
    onSuccess(data, ...rest) {
      utils.note.list.invalidate()
      utils.note.byId.invalidate(data.id)
      if (options?.onSuccess) {
        options.onSuccess(data, ...rest)
      }
    },
  })
}

function useSearchNote(
  input: RouterInputs['note']['search'],
  options?: ReactQueryOptions['note']['search']
) {
  return trpc.note.search.useQuery(input, options)
}

function useSearchTag(
  input: RouterInputs['tag']['search'],
  options?: ReactQueryOptions['tag']['search']
) {
  return trpc.tag.search.useQuery(input, options)
}

function useTagById(
  input: RouterInputs['tag']['byId'],
  options?: ReactQueryOptions['tag']['byId']
) {
  return trpc.tag.byId.useQuery(input, options)
}

function useTagList(
  input?: RouterInputs['tag']['list'],
  options?: ReactQueryOptions['tag']['list']
) {
  return trpc.tag.list.useQuery(input, options)
}

function useUpdateNoteById(options?: ReactQueryOptions['note']['updateById']) {
  const utils = trpc.useContext()

  return trpc.note.updateById.useMutation({
    ...options,
    onSuccess(data, ...rest) {
      utils.note.list.invalidate()
      utils.note.byId.invalidate(data.id)
      if (options?.onSuccess) {
        options.onSuccess(data, ...rest)
      }
    },
  })
}

function useUpdateTagById(options?: ReactQueryOptions['tag']['updateById']) {
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

export {
  useCreateNote,
  useCreateTag,
  useDeleteNoteById,
  useDeleteTagById,
  useEmptyTrash,
  useNoteById,
  useNoteList,
  useAssignNoteTag,
  useRemoveNoteTag,
  useSearchNote,
  useSearchTag,
  useTagById,
  useTagList,
  useUpdateNoteById,
  useUpdateTagById,
}
