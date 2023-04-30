import { createExpressMiddleware } from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Response } from 'express'

import config from './config/default'
import { createContext } from './context'
import { connectDb } from './lib/prisma'
import { userRouter } from './routers'
import { router } from './trpc'

connectDb()

export const appRouter = router({
  user: userRouter,
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

app.use('/', (_, res: Response) => {
  return res.status(200).json({ status: 'ok' })
})

app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port} ...`)
})
