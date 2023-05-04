import { forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/helpers'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-slate-900 hover:bg-primary-light',
        destructive: 'bg-red-500 text-white hover:bg-red-500/90',
        outline: 'border border-slate-700 hover:bg-slate-800 hover:text-white',
        secondary: 'bg-slate-50 text-slate-900 hover:bg-slate-50/80',
        ghost: 'hover:bg-slate-800 hover:text-primary',
        link: 'underline-offset-4 hover:underline text-primary',
        unstyled: '',
      },
      size: {
        default: 'h-9 py-2 px-4',
        sm: 'h-8 px-3 rounded-md',
        lg: 'h-12 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantsProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)

export { Button }
