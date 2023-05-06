import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { styled } from '@/stitches.config'
import { Icon } from '.'
import { Check } from '../icons'

const Select = SelectPrimitive.Root
const SelectPortal = SelectPrimitive.Portal
const SelectGroup = SelectPrimitive.SelectGroup
const SelectValue = SelectPrimitive.SelectValue

const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  br: '$sm',
  padding: '0 15px',
  fontSize: '$sm',
  lineHeight: '$normal',
  h: '$8',
  gap: '$2',
  backgroundColor: '$slate800',
  color: '$slate200',
  '&:hover': { backgroundColor: '$slate700' },
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-placeholder]': { color: '$slate400' },
})

const SelectIcon = styled(SelectPrimitive.SelectIcon, {
  display: 'grid',
  placeItems: 'center',
  color: '$slate500',
})

const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: '$slate700',
  br: '$base',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

const SelectViewport = styled(SelectPrimitive.Viewport, {
  p: '$1',
})

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof StyledItem>
>(({ children, ...props }, ref) => {
  return (
    <StyledItem {...props} ref={ref}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <StyledItemIndicator>
        <Icon as={Check} size="xs" />
      </StyledItemIndicator>
    </StyledItem>
  )
})

const StyledItem = styled(SelectPrimitive.Item, {
  fontSize: '$sm',
  lineHeight: '$normal',
  color: '$slate200',
  br: '$sm',
  display: 'flex',
  alignItems: 'center',
  h: '$8',
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$slate400',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$slate800',
    color: '$accent',
  },
})

const SelectLabel = styled(SelectPrimitive.Label, {
  px: '$6',
  fontSize: '$xs',
  lineHeight: '$tall',
  color: '$slate200',
})

const SelectSeparator = styled(SelectPrimitive.Separator, {
  h: '1px',
  backgroundColor: '$slate600',
  m: '$4',
})

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  w: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$accent',
})

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  h: '$6',
  backgroundColor: '$slate800',
  color: '$slate200',
  cursor: 'default',
}

const SelectScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles
)

const SelectScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles
)

export {
  Select,
  SelectTrigger,
  SelectPortal,
  SelectIcon,
  SelectContent,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectLabel,
  SelectSeparator,
  SelectViewport,
  SelectItem,
  SelectGroup,
  SelectValue,
}
