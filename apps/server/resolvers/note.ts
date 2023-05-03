import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { protectedProcedure } from '../trpc'

export const listNotes = protectedProcedure
  .input(
    z
      .object({
        starred: z.boolean(),
      })
      .partial()
  )
  .query(async ({ ctx, input }) => {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: ctx.user.id,
        ...(input.starred ? { starred: true } : {}),
      },
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return notes
  })

export const getNoteById = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const note = await prisma.note.findFirstOrThrow({
      where: { id: input, ownerId: ctx.user.id },
      select: {
        id: true,
        title: true,
        description: true,
        tags: {
          select: {
            id: true,
            title: true,
            color: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        code: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find a note with id ${input}`,
      })
    }

    return note
  })
