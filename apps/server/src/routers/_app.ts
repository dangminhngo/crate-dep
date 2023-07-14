import { router } from '../trpc'
import { noteRouter } from './note'
import { tagRouter } from './tag'

export const appRouter = router({
  note: noteRouter,
  tag: tagRouter,
})

export type AppRouter = typeof appRouter
