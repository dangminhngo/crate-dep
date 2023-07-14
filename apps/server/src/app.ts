import { createExpressMiddleware } from '@trpc/server/adapters/express'
import cors from 'cors'
import express, { Request, Response } from 'express'

import config from './config/default'
import { createContext } from './context'
import { appRouter, type AppRouter } from './routers/_app'

export { appRouter, type AppRouter }

const app = express()

console.log(config)

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
