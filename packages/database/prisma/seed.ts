import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const userOne = await prisma.user.upsert({
    where: { userId: 'github|123913864' },
    update: {},
    create: {
      userId: 'github|123913864',
      notes: {
        create: [
          {
            title: 'JavaScript asynchronous',
            description: 'Promise, callback, async/await',
            code: '# JavaScript asynchronous',
          },
          {
            title: 'React state hooks',
            description: 'useState, useReducer',
            code: '# React state hooks',
          },
        ],
      },
      tags: {
        create: [
          {
            title: 'React',
            description: 'React related notes',
          },
          {
            title: 'JavaScript',
            description: 'JS related notes',
          },
        ],
      },
    },
  })

  console.log({ userOne })
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
