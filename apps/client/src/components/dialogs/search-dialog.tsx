import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSearchNote, useSearchTag } from '~/hooks'
import { styled } from '~/stitches.config'

import { Clear, Label, Search, StickyNote } from '../icons'
import {
  Dialog,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  Flex,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Icon,
  Input,
} from '../primitive'
import SectionButton from '../shared/section-button'

export default function SearchDialog() {
  const [keyword, setKeyword] = useState('')
  const searchNote = useSearchNote(keyword)
  const searchTag = useSearchTag(keyword)

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => setKeyword(e.target.value)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SectionButton icon={Search} tooltip="Search">
          Search
        </SectionButton>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <StyledSearchContainer>
            <Form>
              <FormField name="keyword">
                <Flex
                  css={{
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormLabel>Search</FormLabel>
                  <FormMessage match="valueMissing">
                    Please enter at least one character
                  </FormMessage>
                </Flex>
                <FormControl
                  asChild
                  onChange={handleSearchInputChange}
                  value={keyword}
                >
                  <Input type="text" required />
                </FormControl>
              </FormField>
            </Form>
            {searchNote.status === 'loading' ||
            searchTag.status === 'loading' ? (
              <div></div>
            ) : searchNote.status === 'error' ||
              searchTag.status === 'error' ? (
              <div>There was an error</div>
            ) : (
              <div className="search__result">
                <ul>
                  {searchNote.data.map((note) => (
                    <li key={note.id}>
                      <DialogClose asChild>
                        <Link to={`/app/notes/${note.id}`} className="note">
                          <h4 className="note__title">
                            <Icon as={StickyNote} />
                            {note.title}
                          </h4>
                          <p>{note.description}</p>
                        </Link>
                      </DialogClose>
                    </li>
                  ))}
                  {searchTag.data.map((tag) => (
                    <li key={tag.id}>
                      <DialogClose asChild>
                        <Link to={`/app/tags/${tag.id}`} className="tag">
                          <h4 className="tag__title">
                            <Icon as={Label} />
                            {tag.title}
                          </h4>
                          <p>{tag._count.notes} notes</p>
                        </Link>
                      </DialogClose>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </StyledSearchContainer>
          <DialogCloseButton>
            <Icon as={Clear} />
          </DialogCloseButton>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

const StyledSearchContainer = styled('div', {
  mt: '$8',
  fontSize: '$sm',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '$6',

  '.search__result': {
    maxH: '390px',
    overflow: 'auto',
  },

  '& ul': {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '$2',
  },

  '.note, .tag': {
    px: '$4',
    py: '$3',
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    border: '1px solid $slate800',
    br: '$base',
    transition: '$base',
    '&:hover': {
      backgroundColor: '$slate800',
    },
  },
  '.note__title, .tag__title': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
    fontWeight: '$semibold',
  },
})
