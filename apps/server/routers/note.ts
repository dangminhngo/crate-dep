import { getNoteById, listNotes, updateNoteById } from '../resolvers/note'
import { router } from '../trpc'

export const noteRouter = router({
  list: listNotes,
  byId: getNoteById,
  updateById: updateNoteById,
})
