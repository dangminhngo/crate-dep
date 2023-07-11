import React from 'react'
import { styled } from '~/stitches.config'

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
  display: 'grid',
  placeItems: 'center',
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
      destructive: {
        backgroundColor: '$iconButtonBg',
        color: '$iconButtonFgDestructive',
        '&:hover': {
          backgroundColor: '$iconButtonBgHover',
        },
      },
    },
    size: {
      default: {
        h: '$9',
        w: '$9',
        '& svg': {
          h: '$5',
          w: '$5',
        },
      },
      sm: {
        h: '$7',
        w: '$7',
        '& svg': {
          h: '$4',
          w: '$4',
        },
      },
      lg: {
        h: '$11',
        w: '$11',
        '& svg': {
          h: '$6',
          w: '$6',
        },
      },
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

interface IconButtonProps
  extends React.ComponentPropsWithoutRef<typeof StyledIconButton> {
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
