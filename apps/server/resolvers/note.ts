import { prisma } from '../lib/prisma'
import { protectedProcedure } from '../trpc'

export const listUserNotes = protectedProcedure.query(async ({ ctx }) => {
  const notes = await prisma.note.findMany({
    where: {
      ownerId: ctx.user.id,
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
