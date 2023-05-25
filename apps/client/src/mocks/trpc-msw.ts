import type { AppRouter } from '@crate/server'
import { createTRPCMsw } from 'msw-trpc'

export const trpcMsw = createTRPCMsw<AppRouter>()

export const handlers = [
  trpcMsw.note.list.query((_, res, ctx) => res(ctx.status(200), ctx.data([]))),
]
