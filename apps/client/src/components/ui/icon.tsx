import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/helpers'
import { SVGProps } from '@/types/shared'

const iconVariants = cva('aspect-[1/1]', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      base: 'h-[18px] w-[18px]',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

interface IconProps extends SVGProps, VariantProps<typeof iconVariants> {
  as: React.FC<SVGProps>
}

function Icon({ as: Component, className, size, ...props }: IconProps) {
  return (
    <Component className={cn(iconVariants({ size, className }))} {...props} />
  )
}

export { Icon }
