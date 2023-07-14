import {
  assignTag,
  createNote,
  deleteNoteById,
  emptyTrash,
  getNoteById,
  listNotes,
  removeTag,
  searchNotes,
  updateNoteById,
} from '../resolvers/note'
import { router } from '../trpc'

export const noteRouter = router({
  list: listNotes,
  byId: getNoteById,
  create: createNote,
  updateById: updateNoteById,
  deleteById: deleteNoteById,
  emptyTrash: emptyTrash,
  search: searchNotes,
  removeTag,
  assignTag,
})
