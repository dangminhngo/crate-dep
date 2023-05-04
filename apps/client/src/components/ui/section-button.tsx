import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/helpers'
import { SVGProps } from '@/types/shared'
import { Icon } from './icon'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

const sectionButtonVariants = cva(
  'inline-flex items-center gap-4 py-2.5 px-4 text-sm font-medium rounded-md transition-colors duration-300 hover:bg-slate-800 focus:outline-none',
  {
    variants: {
      variant: {
        default: 'text-slate-300 hover:text-slate-100',
        destructive: 'text-red-400',
        active: 'text-primary bg-slate-800',
        destructiveActive: 'text-red-400 bg-slate-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface SectionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sectionButtonVariants> {
  icon: React.FC<SVGProps>
  tooltip?: string
}

const SectionButton = React.forwardRef<HTMLButtonElement, SectionButtonProps>(
  (
    { icon, tooltip = 'Button', variant, className, children, ...props },
    ref
  ) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            ref={ref}
            className={cn(sectionButtonVariants({ variant, className }))}
            {...props}
          >
            <Icon as={icon} />
            <span>{children}</span>
          </button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent side="right">
            {tooltip}
            <TooltipArrow className="fill-slate-100" />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
)

export { SectionButton }
