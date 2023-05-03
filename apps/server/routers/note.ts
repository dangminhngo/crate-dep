import { getNoteById, listNotes } from '../resolvers/note'
import { router } from '../trpc'

export const noteRouter = router({
  list: listNotes,
  byId: getNoteById,
})
