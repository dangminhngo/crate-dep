import { inferProcedureInput } from '@trpc/server'
import type { Prisma } from 'database'

import { type CreateContextOptions } from '../context'
import { prismaMock } from '../prisma-mock'
import { defaultNoteSelect } from '../resolvers/note'
import { appRouter, type AppRouter } from './_app'

const testUser: CreateContextOptions['session']['user'] = {
  id: 'test-testUser.id',
  userId: 'test-user-testUser.id',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockReturnedNotes: Prisma.NoteGetPayload<{
  select: typeof defaultNoteSelect
}>[] = [
  {
    id: 'test-note-id-1',
    title: 'This is a test note 1',
    description: 'This is a test note description 1',
    code: 'Note sample code 2',
    tags: [],
    starred: false,
    trashed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'test-note-id-2',
    title: 'This is a test note 2',
    description: 'This is a test note description 2',
    code: 'Note sample code 2',
    tags: [],
    starred: true,
    trashed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
const singleNote = {
  ...mockReturnedNotes[0],
  ownerId: testUser.id,
  tagIds: mockReturnedNotes[0].tags.map(({ id }) => id),
}

const caller = appRouter.createCaller({
  session: {
    user: testUser,
    token: 'test-auth-token',
  },
  prisma: prismaMock,
})

test('should get a list of notes', async () => {
  prismaMock.note.findMany.mockResolvedValue(
    mockReturnedNotes.map((n) => ({
      ...n,
      ownerId: testUser.id,
      tagIds: n.tags.map(({ id }) => id),
    }))
  )

  const notes = await caller.note.list()
  expect(notes).toHaveLength(2)
})

test('should create and return a note', async () => {
  prismaMock.note.create.mockResolvedValue(singleNote)

  const input: inferProcedureInput<AppRouter['note']['create']> = {
    title: singleNote.title,
    description: singleNote.description,
  }

  const note = await caller.note.create(input)
  expect(note).toBeTruthy()
  expect(note).toMatchObject(input)
})

test('should return a note', async () => {
  prismaMock.note.findUnique.mockResolvedValue(singleNote)

  const note = await caller.note.byId(singleNote.id)
  expect(note).toMatchObject(singleNote)
})

test('should update and return a note', async () => {
  prismaMock.note.findUnique.mockResolvedValue(singleNote)

  const input: inferProcedureInput<AppRouter['note']['updateById']> = {
    id: singleNote.id,
    data: {
      title: 'Updated note title',
      description: 'Updated note description',
      code: 'Updated code',
      starred: true,
      trashed: true,
    },
  }
  prismaMock.note.update.mockResolvedValue({
    ...singleNote,
    ...input.data,
  })

  const note = await caller.note.updateById(input)
  expect(note).toMatchObject({ id: input.id, ...input.data })
})

test('should delete and return a note', async () => {
  prismaMock.note.findUnique.mockResolvedValue(singleNote)
  prismaMock.note.delete.mockResolvedValue(singleNote)
  const deleteNote = await caller.note.deleteById(singleNote.id)
  expect(deleteNote.id).toBe(singleNote.id)
})

test('should empty all trash notes', async () => {
  prismaMock.note.deleteMany.mockResolvedValue({
    count: mockReturnedNotes.filter((n) => n.trashed).length,
  })
  const deleteNotes = await caller.note.emptyTrash()
  expect(deleteNotes.count).toBe(1)
})
