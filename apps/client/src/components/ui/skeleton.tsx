import { cn } from '@/lib/helpers'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('h-6 w-full animate-pulse bg-slate-800', className)}
      {...props}
    />
  )
}

export { Skeleton }
