import { promisify } from 'util'
import { TRPCError, inferAsyncReturnType } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { prisma, type Prisma, type PrismaClient } from 'database'
import {
  InvalidTokenError,
  UnauthorizedError,
  auth,
} from 'express-oauth2-jwt-bearer'

import config from './config/default'

export type CreateContextOptions = {
  session: {
    user: UserPayload
    token: string
  }
  prisma?: PrismaClient
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 */
export async function createInnerContext(opts: CreateContextOptions) {
  return {
    session: opts.session,
    prisma: opts.prisma || prisma,
  }
}

const userSelect = {
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect

type UserPayload = Prisma.UserGetPayload<{ select: typeof userSelect }>

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContext({ req, res }: CreateExpressContextOptions) {
  try {
    const validateJwt = promisify(
      auth({
        issuerBaseURL: `https://${config.auth0Domain}`,
        audience: config.auth0Audience,
      })
    )
    await validateJwt(req, res)
    const token = req.auth?.token
    const userId = req.auth?.payload.sub

    if (!token || !userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Missing token or payload user sub',
      })
    }

    const user = await prisma.user.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
      },
      select: userSelect,
    })

    return await createInnerContext({ session: { user, token } })
  } catch (err) {
    console.error(err)
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
