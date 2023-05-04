import { forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/helpers'

const tableVariants = cva('', {
  variants: {
    variant: {
      default: '',
      destructive: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ variant, className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn('border-collapse', tableVariants({ variant, className }))}
      {...props}
    />
  )
)

interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('', className)} {...props} />
  )
)

interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('', className)} {...props} />
  )
)

interface TfootProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

const Tfoot = forwardRef<HTMLTableSectionElement, TfootProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('', className)} {...props} />
  )
)

interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {}

const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-y border-slate-700', className)}
      {...props}
    />
  )
)

interface ThProps extends React.HTMLAttributes<HTMLTableCellElement> {}

const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3 text-left text-xs uppercase text-slate-500',
        className
      )}
      {...props}
    />
  )
)

interface TdProps extends React.HTMLAttributes<HTMLTableCellElement> {}

const Td = forwardRef<HTMLTableCellElement, TdProps>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3', className)} {...props} />
  )
)

export { Table, Thead, Tbody, Tfoot, Tr, Th, Td }
