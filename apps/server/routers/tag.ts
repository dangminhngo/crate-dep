import { getTagById, listTags, searchTags } from '../resolvers/tag'
import { router } from '../trpc'

export const tagRouter = router({
  list: listTags,
  byId: getTagById,
  search: searchTags,
})
