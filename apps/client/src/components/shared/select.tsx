import { ExpandMore } from '../icons'
import {
  Icon,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectPortal,
  Select as SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '../primitive'

interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectRoot> {
  placeholder?: string
  items: { value: string; label: string }[]
}

export default function Select({
  placeholder = 'Select an item',
  items,
  ...props
}: SelectProps) {
  return (
    <SelectRoot {...props}>
      <SelectTrigger aria-label="Food">
        <SelectValue placeholder={placeholder} />
        <SelectIcon>
          <Icon as={ExpandMore} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectScrollUpButton>
            <Icon as={ExpandMore} css={{ rotate: '180deg' }} />
          </SelectScrollUpButton>
          <SelectViewport>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectViewport>
          <SelectScrollDownButton>
            <Icon as={ExpandMore} />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  )
}
