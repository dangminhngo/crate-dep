import { format, parseISO } from 'date-fns'

export function formatDateTime(dateTime: string, fmt: string) {
  return format(parseISO(dateTime), fmt)
}
