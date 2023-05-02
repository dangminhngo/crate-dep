import { createExpressMiddleware } from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Request, Response } from 'express'

import config from './config/default'
import { createContext } from './context'
import { noteRouter } from './routers'
import { router } from './trpc'

export const appRouter = router({
  note: noteRouter,
})

export type AppRouter = typeof appRouter

const app = express()

app.use(
  cors({
    origin: [config.clientOriginUrl],
    credentials: true,
  })
)

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.use('/', (_: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' })
})

app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port} ...`)
})
