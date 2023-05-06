import { format, parseISO } from 'date-fns'
import slugify from 'slugify'

export function formatDateTime(dateTime: string, fmt: string) {
  return format(parseISO(dateTime), fmt)
}

export function downloadAsMd(title: string, code: string) {
  const filename = slugify(title, { lower: true })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([code], { type: 'text/markdown' }))
  a.download = `${filename}.md`
  a.click()
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min)
}
