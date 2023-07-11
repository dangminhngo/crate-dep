import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { styled } from '~/stitches.config'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal
const TooltipArrow = TooltipPrimitive.Arrow

const TooltipContent = styled(TooltipPrimitive.Content, {
  px: '$2',
  py: '$1',
  fontSize: '$sm',
  br: '$sm',
  backgroundColor: '$tooltipBg',
  color: '$tooltipFg',
  zIndex: '$100',

  '& svg': {
    fill: '$tooltipBg',
  },
})

export {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  TooltipPortal,
  TooltipArrow,
}
