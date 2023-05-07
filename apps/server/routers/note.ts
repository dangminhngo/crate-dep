import {
  deleteNoteById,
  emptyTrash,
  getNoteById,
  listNotes,
  searchNotes,
  updateNoteById,
} from '../resolvers/note'
import { router } from '../trpc'

export const noteRouter = router({
  list: listNotes,
  byId: getNoteById,
  updateById: updateNoteById,
  deleteById: deleteNoteById,
  emptyTrash: emptyTrash,
  search: searchNotes,
})
