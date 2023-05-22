import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { protectedProcedure } from '../trpc'

export const listNotes = protectedProcedure.query(
  async ({ ctx: { prisma, user } }) => {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: user.id,
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
  }
)

export const getNoteById = protectedProcedure
  .input(z.string())
  .query(async ({ ctx: { prisma, user }, input }) => {
    const note = await prisma.note.findFirst({
      where: { id: input, ownerId: user.id },
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

export const createNote = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .mutation(async ({ ctx: { prisma, user }, input }) => {
    const note = await prisma.note.create({
      data: {
        ...input,
        code: '',
        ownerId: user.id,
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
        starred: true,
        trashed: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return note
  })

export const updateNoteById = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      data: z
        .object({
          title: z.string(),
          description: z.string(),
          code: z.string(),
          tagIds: z.array(z.string()),
          starred: z.boolean(),
          trashed: z.boolean(),
        })
        .partial(),
    })
  )
  .mutation(async ({ ctx: { prisma, user }, input: { id, data } }) => {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${id}"`,
      })
    }

    if (note.ownerId !== user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to access this note',
      })
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data,
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

    return updateNote
  })

export const deleteNoteById = protectedProcedure
  .input(z.string())
  .mutation(async ({ ctx: { prisma, user }, input }) => {
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

    if (note.ownerId !== user.id) {
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

export const emptyTrash = protectedProcedure.mutation(
  async ({ ctx: { prisma, user } }) => {
    const deleteNotes = await prisma.note.deleteMany({
      where: { ownerId: user.id, trashed: true },
    })

    return deleteNotes
  }
)

export const searchNotes = protectedProcedure
  .input(z.string())
  .query(async ({ ctx: { prisma, user }, input: keyword }) => {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: user.id,
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
  .mutation(async ({ ctx: { prisma, user }, input: { id, tagId } }) => {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${id}"`,
      })
    }

    if (note.ownerId !== user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to access this note',
      })
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data: {
        tags: { disconnect: { id: tagId } },
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

export const assignTag = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z
        .string()
        .min(1, { message: 'Tag title is at least one character' })
        .trim(),
    })
  )
  .mutation(async ({ ctx: { prisma, user }, input: { id, title } }) => {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${id}"`,
      })
    }

    if (note.ownerId !== user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to access this note',
      })
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data: {
        tags: {
          connectOrCreate: [
            {
              where: {
                title_ownerId: {
                  title,
                  ownerId: user.id,
                },
              },
              create: {
                title,
                ownerId: user.id,
              },
            },
          ],
        },
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
