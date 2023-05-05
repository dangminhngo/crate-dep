import React from 'react'
import type { VariantProps } from '@stitches/react'

import { styled } from '@/stitches.config'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from '../primitive'

const StyledIconButton = styled('button', {
  transition: '$base',
  cursor: 'pointer',
  br: '$base',
  variants: {
    variant: {
      default: {
        backgroundColor: '$iconButtonBg',
        color: '$iconButtonFg',
        '&:hover': {
          backgroundColor: '$iconButtonBgHover',
          color: '$iconButtonFgHover',
        },
      },
      active: {
        backgroundColor: '$iconButtonBgActive',
        color: '$iconButtonFgActive',
        '&:hover': {
          backgroundColor: '$iconButtonBgHover',
          color: '$iconButtonFgActive',
        },
      },
    },
    size: {
      default: {
        h: '$10',
        w: '$10',
      },
      sm: {
        h: '$9',
        w: '$9',
      },
      lg: {
        h: '$12',
        w: '$12',
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof StyledIconButton> {
  tooltip?: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, tooltip = 'Click me', ...props }, ref) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <StyledIconButton ref={ref} {...props}>
            {children}
          </StyledIconButton>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent side="top">
            {tooltip}
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
)

export default IconButton
