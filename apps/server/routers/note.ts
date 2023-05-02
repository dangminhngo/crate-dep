import { listUserNotes } from '../resolvers/note'
import { router } from '../trpc'

export const noteRouter = router({
  list: listUserNotes,
})
