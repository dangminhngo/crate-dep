import React from 'react'
import { styled } from '~/stitches.config'
import { SVGProps } from '~/types/shared'

import {
  Icon,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from '../primitive'

const StyledSectionButton = styled('button', {
  h: '$10',
  px: '$4',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '$4',
  br: '$base',
  cursor: 'pointer',
  fontSize: 'inherit',
  fontWeight: '$medium',
  transition: '$base',
  variants: {
    variant: {
      default: {
        backgroundColor: '$sectionButtonBg',
        color: '$sectionButtonFg',
        '&:hover': {
          backgroundColor: '$sectionButtonBgHover',
          color: '$sectionButtonFgHover',
        },
      },
      destructive: {
        backgroundColor: '$sectionButtonBg',
        color: '$sectionButtonFgDestructive',
        '&:hover': {
          backgroundColor: '$sectionButtonBgHover',
          color: '$sectionButtonFgDestructive',
        },
      },
      active: {
        backgroundColor: '$sectionButtonBgActive',
        color: '$sectionButtonFgActive',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface SectionButtonProps
  extends React.ComponentPropsWithoutRef<typeof StyledSectionButton> {
  icon: React.FC<SVGProps>
  tooltip?: string
}

const SectionButton = React.forwardRef<HTMLButtonElement, SectionButtonProps>(
  ({ icon, tooltip = 'Button', children, ...props }, ref) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <StyledSectionButton ref={ref} {...props}>
            <Icon as={icon} />
            <span>{children}</span>
          </StyledSectionButton>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent side="right">
            {tooltip}
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
)

export default SectionButton
