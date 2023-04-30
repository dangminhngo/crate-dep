import { promisify } from 'util'
import { TRPCError, inferAsyncReturnType } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import {
  InvalidTokenError,
  UnauthorizedError,
  auth,
} from 'express-oauth2-jwt-bearer'

import config from './config/default'

const validateJwt = promisify(
  auth({
    issuerBaseURL: `https://${config.auth0Domain}`,
    audience: config.auth0Audience,
  })
)

export async function createContext({ req, res }: CreateExpressContextOptions) {
  try {
    await validateJwt(req, res)
    return { user: 1 }
  } catch (err) {
    console.log(err)
    if (err instanceof InvalidTokenError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Bad credentials',
        cause: err,
      })
    }

    if (err instanceof UnauthorizedError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Requires authentication',
        cause: err,
      })
    }

    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', cause: err })
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
