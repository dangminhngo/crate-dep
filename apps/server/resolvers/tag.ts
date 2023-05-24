import { TRPCError } from '@trpc/server'
import type { Prisma } from 'database'
import { z } from 'zod'

import { protectedProcedure } from '../trpc'

export const defaultTagSelect = {
  id: true,
  title: true,
  color: true,
  notes: {
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
  },
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.TagSelect

export const listTags = protectedProcedure.query(
  async ({ ctx: { prisma, session } }) => {
    const tags = await prisma.tag.findMany({
      where: {
        ownerId: session.user.id,
      },
      select: {
        ...defaultTagSelect,
        notes: false,
        _count: {
          select: {
            notes: true,
          },
        },
      },
    })

    return tags
  }
)

export const getTagById = protectedProcedure
  .input(z.string())
  .query(async ({ ctx: { prisma, session }, input }) => {
    const tag = await prisma.tag.findFirstOrThrow({
      where: { id: input, ownerId: session.user.id },
      select: defaultTagSelect,
    })

    if (!tag) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find a tag with id ${input}`,
      })
    }

    return tag
  })

export const searchTags = protectedProcedure
  .input(z.string())
  .query(async ({ ctx: { prisma, session }, input: keyword }) => {
    const tags = await prisma.tag.findMany({
      where: {
        ownerId: session.user.id,
        title: { contains: keyword, mode: 'insensitive' },
      },
      select: {
        ...defaultTagSelect,
        notes: false,
        _count: { select: { notes: true } },
      },
    })

    return tags
  })

export const createTag = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      color: z.string().optional(),
    })
  )
  .mutation(async ({ ctx: { prisma, session }, input }) => {
    const tag = await prisma.tag.create({
      data: {
        ...input,
        ownerId: session.user.id,
      },
      select: defaultTagSelect,
    })

    return tag
  })

export const updateTagById = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      data: z.object({ title: z.string(), color: z.string() }).partial(),
    })
  )
  .mutation(async ({ ctx: { prisma, session }, input: { id, data } }) => {
    const tag = await prisma.tag.findUnique({ where: { id } })

    if (!tag) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find a tag with id ${id}`,
      })
    }

    if (tag.ownerId !== session.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to delete this tag',
      })
    }

    const updateTag = await prisma.tag.update({
      where: { id },
      data,
      select: defaultTagSelect,
    })

    return updateTag
  })

export const deleteTagById = protectedProcedure
  .input(z.string())
  .mutation(async ({ ctx: { prisma, session }, input }) => {
    const tag = await prisma.tag.findUnique({ where: { id: input } })

    if (!tag) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Cannot find a tag with id ${input}`,
      })
    }

    if (tag.ownerId !== session.user.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No privileges to delete this tag',
      })
    }

    const deleteTag = await prisma.tag.delete({ where: { id: input } })
    return deleteTag
  })
