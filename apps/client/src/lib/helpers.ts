import { format, parseISO } from 'date-fns'
import slugify from 'slugify'

import type { ArrayElementType } from '@/types'
import type { RouterOutputs } from './trpc'

export function formatDateTime(dateTime: string, fmt: string) {
  return format(parseISO(dateTime), fmt)
}

export function downloadAsMd(title: string, code: string) {
  const filename = slugify(title, { lower: true })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([code], { type: 'text/markdown' }))
  a.download = `${filename}.md`
  a.click()
  return `${filename}.md`
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min)
}

type NoteListOutput = RouterOutputs['note']['list']
type NoteKey = keyof ArrayElementType<NoteListOutput>
type SortInput = { [prop: string]: 'asc' | 'desc' }
function sort(notes: NoteListOutput, input?: SortInput): NoteListOutput {
  if (!input) return notes

  const keys = Object.keys(input) as NoteKey[]
  keys.forEach((key: NoteKey) => {
    notes.sort((a, b) => {
      if (a[key] > b[key]) return 1
      if (a[key] < b[key]) return -1
      return 0
    })
  })

  return notes
}

type FilterInput = Partial<{
  createdAt: { from: string; to: string }
  updatedAt: { from: string; to: string }
}>
function filter(notes: NoteListOutput, input?: FilterInput) {
  if (!input) return notes

  return notes
    .filter((note) => {
      if (
        input.createdAt &&
        note.createdAt > input.createdAt.from &&
        note.createdAt < input.createdAt.to
      ) {
        return true
      }

      return false
    })
    .filter((note) => {
      if (
        input.updatedAt &&
        note.updatedAt > input.updatedAt.from &&
        note.updatedAt < input.updatedAt.to
      ) {
        return true
      }

      return false
    })
}

export function getNotes(
  notes: NoteListOutput,
  input: {
    sort?: SortInput
    filter?: FilterInput
  }
): NoteListOutput {
  return sort(filter(notes, input.filter), input.sort)
}
