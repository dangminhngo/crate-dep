import { ClassValue, clsx } from 'clsx'
import { format, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function formatDateTime(dateTime: string, fmt: string) {
  return format(parseISO(dateTime), fmt)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
