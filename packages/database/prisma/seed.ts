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
      code: `# JavaScript history
JavaScript was invented by Brendan Eich in 1995. It was developed for Netscape 2, and became the ECMA-262 standard in 1997.
After Netscape handed JavaScript over to ECMA, the Mozilla foundation continued to develop JavaScript for the Firefox browser.

This is JavaScript code

\`\`\`javascript
function sum(a, b) {
  return a + b
}
\`\`\`


This is React code

\`\`\`jsx
import { useState } from 'react'

export default function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div className="App">
      <p>{counter}</p>
      <button onClick={() => setCounter(c => c + 1)}>Increase</button>
    </div>
  )
}
\`\`\`
`,
      ownerId: user.id,
      starred: true,
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
      code: `# Next.js data fetching

## Fetch API

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

## Data Fetching

If you export a function called \`getStaticProps\` (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by \`getStaticProps\`.
`,
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
  await prisma.note.create({
    data: {
      title: 'This a deleted note',
      description: 'This note has been deleted',
      code: `# Deleted 

## Fetch API

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

## Data Fetching

If you export a function called \`getStaticProps\` (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by \`getStaticProps\`.
`,
      ownerId: user.id,
      starred: true,
      trashed: true,
      tags: {
        create: [
          {
            title: 'CSS',
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
