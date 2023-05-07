import { NoteByIdOutput } from '@/hooks'
import { styled } from '@/stitches.config'
import { Clear, Label } from './icons'
import {
  Chip,
  ChipDeleteButton,
  ChipLabel,
  Icon,
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from './primitive'
import IconButton from './shared/icon-button'

export default function TagsPopover({ note }: { note: NoteByIdOutput }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton variant={'default'} tooltip="Tags">
          <Icon as={Label} />
        </IconButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent>
          <StyledTagsPopover>
            <p className="title">Tags</p>
            <div className="tags">
              {note.tags.map((tag) => (
                <Chip key={tag.id}>
                  <ChipLabel>{tag.title}</ChipLabel>
                  <ChipDeleteButton>
                    <Icon as={Clear} size="xs" />
                  </ChipDeleteButton>
                </Chip>
              ))}
            </div>
          </StyledTagsPopover>
          <PopoverClose>
            <Icon as={Clear} size="sm" />
          </PopoverClose>
          <PopoverArrow />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

const StyledTagsPopover = styled('div', {
  fontSize: '$sm',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '.title': {
    fontWeight: '$medium',
  },

  '.tags': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '$2',
  },
})
