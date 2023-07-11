import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { keyframes, styled } from '~/stitches.config'

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
const DropdownMenuShortcut = styled(`span`, {})

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const contentStyles = {
  mt: '$1',
  minW: '$48',
  backgroundColor: '$slate800',
  br: '$base',
  boxShadow: '$base',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  overflow: 'hidden',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
}

const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, contentStyles)
const DropdownMenuSubContent = styled(
  DropdownMenuPrimitive.SubContent,
  contentStyles
)

const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: '$slate800',
})

const itemStyles = {
  all: 'unset',
  cursor: 'pointer',
  px: '$4',
  h: '$10',
  fontSize: '$sm',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  color: '$slate200',
  backgroundColor: 'transparent',

  '&[data-disabled]': {
    color: '$slate400',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: '$slate700',
  },
}

const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, itemStyles)
const DropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  itemStyles
)
const DropdownMenuRadioItem = styled(
  DropdownMenuPrimitive.RadioItem,
  itemStyles
)
const DropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: '$slate800',
    color: '$slate200',
  },
  ...itemStyles,
})

const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, {
  paddingLeft: '$4',
  fontSize: '$xs',
  lineHeight: '$tall',
  color: '$slate200',
})

const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  h: '1px',
  backgroundColor: '$slate200',
  my: '$1',
})

const DropdownMenuItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  w: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuItemIndicator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
