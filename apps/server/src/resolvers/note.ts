import { TRPCError } from '@trpc/server'
import { Prisma } from 'database'
import { z } from 'zod'

import { protectedProcedure } from '../trpc'

export const defaultNoteSelect = {
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
} satisfies Prisma.NoteSelect

export const listNotes = protectedProcedure.query(
  async ({ ctx: { prisma, session } }) => {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: session.user.id,
      },
      select: {
        ...defaultNoteSelect,
        tags: true,
        code: false,
      },
    })

    return notes
  }
)

export const getNoteById = protectedProcedure
  .input(z.string())
  .query(async ({ ctx: { prisma, session }, input }) => {
    const note = await prisma.note.findUnique({
      where: { id_ownerId: { id: input, ownerId: session.user.id } },
      select: defaultNoteSelect,
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
  .mutation(async ({ ctx: { prisma, session }, input }) => {
    const note = await prisma.note.create({
      data: {
        ...input,
        code: '',
        ownerId: session.user.id,
      },
      select: defaultNoteSelect,
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
  .mutation(async ({ ctx: { prisma, session }, input: { id, data } }) => {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${id}"`,
      })
    }

    if (note.ownerId !== session.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to access this note',
      })
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data,
      select: defaultNoteSelect,
    })

    return updateNote
  })

export const deleteNoteById = protectedProcedure
  .input(z.string())
  .mutation(async ({ ctx: { prisma, session }, input }) => {
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

    if (note.ownerId !== session.user.id) {
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
  async ({ ctx: { prisma, session } }) => {
    const deleteNotes = await prisma.note.deleteMany({
      where: { ownerId: session.user.id, trashed: true },
    })

    return deleteNotes
  }
)

export const searchNotes = protectedProcedure
  .input(z.string())
  .query(async ({ ctx: { prisma, session }, input: keyword }) => {
    const notes = await prisma.note.findMany({
      where: {
        ownerId: session.user.id,
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
        ...defaultNoteSelect,
        tags: false,
        code: false,
        starred: false,
        trashed: false,
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
  .mutation(async ({ ctx: { prisma, session }, input: { id, tagId } }) => {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${id}"`,
      })
    }

    if (note.ownerId !== session.user.id) {
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
      select: defaultNoteSelect,
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
  .mutation(async ({ ctx: { prisma, session }, input: { id, title } }) => {
    const note = await prisma.note.findUnique({ where: { id } })

    if (!note) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find the note with id "${id}"`,
      })
    }

    if (note.ownerId !== session.user.id) {
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
                  ownerId: session.user.id,
                },
              },
              create: {
                title,
                ownerId: session.user.id,
              },
            },
          ],
        },
      },
      select: defaultNoteSelect,
    })

    return updateNote
  })
