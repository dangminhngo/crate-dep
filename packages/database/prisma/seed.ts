import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { userId: 'github|123913864' },
    update: {},
    create: {
      userId: 'github|123913864',
    },
  })

  await prisma.note.create({
    data: {
      title: 'JavaScript history',
      description: 'JavaScript history',
      code: '# JavaScript history',
      ownerId: user.id,
      tags: {
        create: [
          {
            title: 'JavaScript',
            ownerId: user.id,
          },
          {
            title: 'React',
            ownerId: user.id,
          },
        ],
      },
    },
  })
  await prisma.note.create({
    data: {
      title: 'Next.js data fetching',
      description: 'Data fetching in Next.js',
      code: '# Next.js data fetching',
      ownerId: user.id,
      tags: {
        create: [
          {
            title: 'Next',
            ownerId: user.id,
          },
        ],
      },
    },
  })

  const notes = await prisma.note.findMany({ where: { ownerId: user.id } })
  const tags = await prisma.tag.findMany({ where: { ownerId: user.id } })

  return { user, notes, tags }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit()
  })
