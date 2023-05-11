import {
  deleteTagById,
  getTagById,
  listTags,
  searchTags,
  updateTagById,
} from '../resolvers/tag'
import { router } from '../trpc'

export const tagRouter = router({
  list: listTags,
  byId: getTagById,
  search: searchTags,
  updateById: updateTagById,
  deleteById: deleteTagById,
})
