import { useMemo, useRef, useState } from 'react'

import {
  useAssignNoteTag,
  useOnClickOutside,
  useRemoveNoteTag,
  useSearchTag,
} from '@/hooks'
import type { RouterOutputs } from '@/lib/trpc'
import { styled } from '@/stitches.config'
import { AddBox, Clear, Label } from '../icons'
import {
  Chip,
  ChipDeleteButton,
  ChipLabel,
  Flex,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  useToast,
} from '../primitive'
import IconButton from '../shared/icon-button'

export default function TagsPopover({
  note,
}: {
  note: RouterOutputs['note']['byId']
}) {
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [isSearchVisible, setSearchVisible] = useState(false)
  const { mutate: removeTag } = useRemoveNoteTag({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Remove Tag Error',
        description: error.message,
      })
    },
  })
  const { mutate: assignTag } = useAssignNoteTag({
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Assign Tag Error',
        description: error.message,
      })
    },
  })
  const { data: searchTags } = useSearchTag(title)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLUListElement>(null)

  const tags = useMemo(
    () => searchTags?.filter((st) => !note.tags.includes(st)) ?? [],
    [searchTags, note.tags]
  )

  useOnClickOutside(searchRef, () => setSearchVisible(false))

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }

  const handleAssignTag = (input: { id: string; title: string }) => {
    assignTag(input)
    setSearchVisible(false)
    setTitle('')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton variant={'default'} tooltip="Tags">
          <Icon as={Label} />
        </IconButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent css={{ mb: '$2', maxW: '300px' }}>
          <StyledTagsPopover>
            <div className="field">
              <Form>
                <FormField name="tag">
                  <Flex
                    css={{
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormLabel>Tags</FormLabel>
                    <FormMessage match="valueMissing">
                      Please enter at least one character
                    </FormMessage>
                  </Flex>
                  <FormControl asChild>
                    <Input
                      ref={inputRef}
                      type="text"
                      required
                      placeholder="Search a tag"
                      autoComplete="false"
                      autoCorrect="false"
                      value={title}
                      onChange={handleInputChange}
                      onFocus={() => setSearchVisible(true)}
                      autoFocus={false}
                      tabIndex={-1}
                    />
                  </FormControl>
                </FormField>
              </Form>
              {isSearchVisible && (
                <ul ref={searchRef} className="search">
                  {title !== '' &&
                    !tags
                      .map((t) => t.title.toLowerCase())
                      .includes(title.toLowerCase().trim()) && (
                      <li
                        onClick={() => handleAssignTag({ id: note.id, title })}
                      >
                        <Icon as={AddBox} size="sm" />
                        Create <strong>{title}</strong>
                      </li>
                    )}
                  {tags.map((t) => (
                    <li
                      key={t.id}
                      onClick={() =>
                        handleAssignTag({ id: note.id, title: t.title })
                      }
                    >
                      <Icon as={Label} size="sm" />
                      {t.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="tags">
              {note.tags.map((tag) => (
                <Chip key={tag.id}>
                  <ChipLabel>{tag.title}</ChipLabel>
                  <ChipDeleteButton
                    onClick={() => removeTag({ id: note.id, tagId: tag.id })}
                  >
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

  '.field': {
    position: 'relative',
  },

  '.search': {
    mt: '$1',
    position: 'absolute',
    top: '$full',
    left: 0,
    w: '$full',
    listStyle: 'none',
    backgroundColor: '$slate800',
    br: '$base',
    overflow: 'hidden',
    fontSize: '$xs',
    fontWeight: '$medium',
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)',
    '& > li': {
      py: '$2',
      px: '$4',
      display: 'flex',
      alignItems: 'center',
      gap: '$2',
      transition: '$base',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '$slate700',
        color: '$slate100',
      },
    },
  },

  '.tags': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '$3',
  },
})
