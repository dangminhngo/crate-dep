import { forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '@/lib/helpers'

const chipVariants = cva(
  'rounded-full py-1 text-xs font-medium px-2 bg-slate-100 text-slate-900',
  {
    variants: {
      variant: {
        default: '',
        rounded: '',
      },
      size: {
        default: '',
        sm: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(chipVariants({ variant, size, className }))}
      {...props}
    />
  )
)

const ChipLabel = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn('', className)} {...props} />
))

const ChipDelete = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn('', className)} {...props}>
    <X />
  </button>
))

export { Chip, ChipLabel, ChipDelete }
