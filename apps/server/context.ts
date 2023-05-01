import { promisify } from 'util'
import { TRPCError, inferAsyncReturnType } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { ManagementClient } from 'auth0'
import {
  InvalidTokenError,
  UnauthorizedError,
  auth,
} from 'express-oauth2-jwt-bearer'

import config from './config/default'
import prisma from './lib/prisma'

const validateJwt = promisify(
  auth({
    issuerBaseURL: `https://${config.auth0Domain}`,
    audience: config.auth0Audience,
  })
)

export async function createContext({ req, res }: CreateExpressContextOptions) {
  try {
    await validateJwt(req, res)
    const token = req.auth?.token
    const userId = req.auth?.payload.sub

    if (!token || !userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing token or payload user sub',
      })
    }
    const management = new ManagementClient({
      token: config.auth0ManagementApiToken,
      domain: config.auth0Domain,
    })
    const profile = await management.getUser({ id: userId })

    if (
      typeof profile.email_verified === 'boolean' &&
      !profile.email_verified
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Email not verified',
      })
    }

    if (!profile.user_id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing user_id field',
      })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        userId: profile.user_id,
      },
    })

    if (existingUser) {
      return { user: existingUser }
    }

    const newUser = await prisma.user.create({
      data: {
        userId: profile.user_id,
      },
    })
    return { user: newUser }
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
