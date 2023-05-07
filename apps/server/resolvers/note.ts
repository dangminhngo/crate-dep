import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { protectedProcedure } from '../trpc'

export const listNotes = protectedProcedure.query(async ({ ctx }) => {
  const notes = await prisma.note.findMany({
    where: {
      ownerId: ctx.user.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      tags: true,
      starred: true,
      trashed: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return notes
})

export const getNoteById = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const note = await prisma.note.findFirst({
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
        starred: true,
        trashed: true,
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

export const toggleStarred = protectedProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const note = await prisma.note.findUnique({
      where: { id: input },
    })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find a note with id ${input}`,
      })
    }

    if (note.ownerId !== ctx.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to access this note',
      })
    }

    const updateNote = await prisma.note.update({
      where: {
        id: input,
      },
      data: {
        starred: !note.starred,
      },
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

    return updateNote
  })

export const updateNoteById = protectedProcedure
  .input(
    z
      .object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        code: z.string(),
        tagIds: z.array(z.string()),
        starred: z.boolean(),
        trashed: z.boolean(),
      })
      .partial()
  )
  .mutation(async ({ ctx, input: { id, ...data } }) => {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${id}"`,
      })
    }

    if (note.ownerId !== ctx.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to access this note',
      })
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data,
    })

    return updateNote
  })

export const deleteNoteById = protectedProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const note = await prisma.note.findUnique({
      where: {
        id: input,
      },
    })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${input}"`,
      })
    }

    if (note.ownerId !== ctx.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to access this note',
      })
    }

    const deleteNote = await prisma.note.delete({
      where: { id: note.id },
    })

    return deleteNote
  })

export const emptyTrash = protectedProcedure.mutation(async ({ ctx }) => {
  const deleteNotes = await prisma.note.deleteMany({
    where: { ownerId: ctx.user.id, trashed: true },
  })

  return deleteNotes
})

export const searchNotes = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input: keyword }) => {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: ctx.user.id,
        OR: [
          {
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
        ],
        trashed: false,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return notes
  })

export const removeTag = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      tagId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return
  })
