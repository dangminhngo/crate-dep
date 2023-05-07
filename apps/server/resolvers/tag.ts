import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { protectedProcedure } from '../trpc'

export const listTags = protectedProcedure.query(async ({ ctx }) => {
  const tags = await prisma.tag.findMany({
    where: {
      ownerId: ctx.user.id,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          notes: true,
        },
      },
    },
  })

  return tags
})

export const getTagById = protectedProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const tag = await prisma.tag.findFirstOrThrow({
      where: { id: input, ownerId: ctx.user.id },
      select: {
        id: true,
        title: true,
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
      },
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
  .query(async ({ ctx, input: keyword }) => {
    const tags = await prisma.tag.findMany({
      where: {
        ownerId: ctx.user.id,
        title: { contains: keyword, mode: 'insensitive' },
      },
      select: {
        id: true,
        title: true,
        color: true,
        _count: { select: { notes: true } },
        createdAt: true,
        updatedAt: true,
      },
    })

    return tags
  })
