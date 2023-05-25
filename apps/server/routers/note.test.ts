import { inferProcedureInput } from '@trpc/server'
import type { Prisma } from 'database'

import { type CreateContextOptions } from '../context'
import { prismaMock } from '../mocks'
import { defaultNoteSelect } from '../resolvers/note'
import { appRouter, type AppRouter } from './_app'

const mockSession: CreateContextOptions['session'] = {
  user: {
    id: 'test-user-id',
    userId: 'test-user-user-id',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  token: 'test-token-string',
}

type NoteSelectPayload = Prisma.NoteGetPayload<{
  select: typeof defaultNoteSelect
}>
const mockNotes: NoteSelectPayload[] = [
  {
    id: 'test-note-id-1',
    title: 'This is a test note 1',
    description: 'This is a test note description 1',
    code: 'Note sample code 2',
    tags: [
      {
        id: 'test-tag-id-1',
        title: 'test tag 1',
        color: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'test-tag-id-2',
        title: 'test tag 2',
        color: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
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
    tags: [
      {
        id: 'test-tag-id-1',
        title: 'test tag 1',
        color: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'test-tag-id-2',
        title: 'test tag 2',
        color: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    starred: true,
    trashed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockNote = {
  ...mockNotes[0],
  ownerId: mockSession.user.id,
  tagIds: mockNotes[0].tags.map(({ id }) => id),
}

const mockTag: Prisma.TagGetPayload<typeof defaultNoteSelect.tags> = {
  id: 'test-tag-id',
  title: 'test-tag',
  color: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const caller = appRouter.createCaller({
  session: mockSession,
  prisma: prismaMock,
})

test('should get a list of notes', async () => {
  prismaMock.note.findMany.mockResolvedValue(
    mockNotes.map((n) => ({
      ...n,
      ownerId: mockSession.user.id,
      tagIds: n.tags.map(({ id }) => id),
    }))
  )

  const notes = await caller.note.list()
  expect(notes).toHaveLength(2)
})

test('should create and return a note', async () => {
  prismaMock.note.create.mockResolvedValue(mockNote)

  const input: inferProcedureInput<AppRouter['note']['create']> = {
    title: mockNote.title,
    description: mockNote.description,
  }

  const note = await caller.note.create(input)
  expect(note).toBeTruthy()
  expect(note).toMatchObject(input)
})

test('should return a note', async () => {
  prismaMock.note.findUnique.mockResolvedValue(mockNote)

  const note = await caller.note.byId(mockNote.id)
  expect(note).toMatchObject(mockNote)
})

test('should update and return a note', async () => {
  prismaMock.note.findUnique.mockResolvedValue(mockNote)

  const input: inferProcedureInput<AppRouter['note']['updateById']> = {
    id: mockNote.id,
    data: {
      title: 'Updated note title',
      description: 'Updated note description',
      code: 'Updated code',
      starred: true,
      trashed: true,
    },
  }
  prismaMock.note.update.mockResolvedValue({
    ...mockNote,
    ...input.data,
  })

  const note = await caller.note.updateById(input)
  expect(note).toMatchObject({ id: input.id, ...input.data })
})

test('should delete and return a note', async () => {
  prismaMock.note.findUnique.mockResolvedValue(mockNote)
  prismaMock.note.delete.mockResolvedValue(mockNote)
  const deleteNote = await caller.note.deleteById(mockNote.id)
  expect(deleteNote.id).toBe(mockNote.id)
})

test('should empty all trash notes', async () => {
  prismaMock.note.deleteMany.mockResolvedValue({
    count: mockNotes.filter((n) => n.trashed).length,
  })
  const deleteNotes = await caller.note.emptyTrash()
  expect(deleteNotes.count).toBe(1)
})

test('should return all notes whose title contains "note 1"', async () => {
  prismaMock.note.findMany.mockResolvedValue([mockNote])
  const searchNotes = await caller.note.search('note 1')
  expect(searchNotes).toHaveLength(1)
  expect(searchNotes).toContain(mockNote)
})

// FIXME: fix update.mockResolvedValue
//
// test('should assign a tag to a note', async () => {
//   prismaMock.note.findUnique.mockResolvedValue(mockNote)
//   prismaMock.note.update.mockResolvedValue({
//     ...mockNote,
//     tagIds: [...mockNote.tagIds, mockTag.id],
//   })
//   const note = await caller.note.assignTag({
//     id: mockNote.id,
//     title: mockTag.title,
//   })
//   expect(note.tags).toHaveLength(2)
// })
//
// test('should remove a tag from a note', async () => {
//   prismaMock.note.findUnique.mockResolvedValue(mockNote)
//   prismaMock.note.update.mockResolvedValue({
//     ...mockNote,
//     tagIds: mockNote.tagIds.filter((id) => id !== mockNote.tagIds[0]),
//   })
//   const note = await caller.note.assignTag({
//     id: mockNote.id,
//     title: mockTag.title,
//   })
//   expect(note.tags).not.toContain(mockNote.tagIds[0])
// })
