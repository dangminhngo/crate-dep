import { inferProcedureInput } from '@trpc/server'
import type { Prisma } from 'database'

import { type CreateContextOptions } from '../context'
import { prismaMock } from '../mocks'
import { defaultTagSelect } from '../resolvers/tag'
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

type TagSelectPayload = Prisma.TagGetPayload<{
  select: typeof defaultTagSelect
}>
const mockTags: TagSelectPayload[] = [
  {
    id: 'test-tag-id-1',
    title: 'test tag 1',
    notes: [],
    color: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'test-tag-id-2',
    title: 'test tag 2',
    color: '#ffffff',
    notes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockTag = {
  ...mockTags[0],
  ownerId: mockSession.user.id,
  noteIds: mockTags[0].notes.map(({ id }) => id),
}

const caller = appRouter.createCaller({
  session: mockSession,
  prisma: prismaMock,
})

test('should return all tags', async () => {
  prismaMock.tag.findMany.mockResolvedValue(
    mockTags.map((t) => ({
      ...t,
      ownerId: mockSession.user.id,
      noteIds: t.notes.map(({ id }) => id),
    }))
  )

  const tags = await caller.tag.list()
  expect(tags).toHaveLength(2)
})

test('should return a tag', async () => {
  prismaMock.tag.findUnique.mockResolvedValue(mockTag)
  const tag = await caller.tag.byId(mockTag.id)
  expect(tag).toMatchObject(mockTag)
})

test('should return tags whose title contains "1"', async () => {
  prismaMock.tag.findMany.mockResolvedValue([mockTag])
  const searchTags = await caller.tag.search('1')
  expect(searchTags).toHaveLength(1)
  expect(searchTags).toContain(mockTag)
})

test('should create and return a tag', async () => {
  prismaMock.tag.create.mockResolvedValue(mockTag)
  const input: inferProcedureInput<AppRouter['tag']['create']> = {
    title: mockTag.title,
    color: mockTag.color ?? undefined,
  }
  const tag = await caller.tag.create(input)
  expect(tag).toMatchObject({
    ...input,
    color: input.color ?? null,
  })
})

test('should update and return a tag', async () => {
  const input: inferProcedureInput<AppRouter['tag']['updateById']> = {
    id: mockTag.id,
    data: {
      title: 'Update tag title',
      color: '#000000',
    },
  }
  prismaMock.tag.findUnique.mockResolvedValue(mockTag)
  prismaMock.tag.update.mockResolvedValue({
    ...mockTag,
    ...input.data,
  })

  const updateTag = await caller.tag.updateById(input)
  expect(updateTag).toMatchObject({ id: input.id, ...input.data })
})

test('should delete and return a tag', async () => {
  prismaMock.tag.findUnique.mockResolvedValue(mockTag)
  prismaMock.tag.delete.mockResolvedValue(mockTag)
  const deleteTag = await caller.tag.deleteById(mockTag.id)
  expect(deleteTag).toMatchObject(mockTag)
})
