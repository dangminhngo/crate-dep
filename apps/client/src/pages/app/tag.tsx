import { useParams } from 'react-router-dom'

import { FilterAlt, Label, Sort } from '@/components/icons'
import NoteList from '@/components/note-list'
import { Icon } from '@/components/primitive'
import Container from '@/components/shared/container'
import IconButton from '@/components/shared/icon-button'
import SectionSkeleton from '@/components/skeletons/section-skeleton'
import { useTagById } from '@/hooks'
import { styled } from '@/stitches.config'

export default function TagPage() {
  const params = useParams()
  const { status, data: tag } = useTagById(params.id as string)

  if (status === 'loading') return <SectionSkeleton />

  if (status === 'error') return <div>There was an error</div>

  return (
    <StyledTagPage>
      <Container className="container">
        <div className="titlebar">
          <div className="titlebar__left">
            <h3>
              <Icon size="xl" as={Label} />
              Tag: {tag.title}
            </h3>
          </div>
          <div className="titlebar__right">
            <span>Last edited Apr 28</span>
            <span>{tag.notes.length} notes</span>
            <div className="buttons">
              <IconButton size="sm" tooltip="Filter">
                <Icon as={FilterAlt} />
              </IconButton>
              <IconButton size="sm" tooltip="Sort">
                <Icon as={Sort} />
              </IconButton>
            </div>
          </div>
        </div>
        {tag.notes.length > 0 ? (
          <NoteList notes={tag.notes} />
        ) : (
          <p className="message">You have no notes with tag "{tag.title}"</p>
        )}
      </Container>
    </StyledTagPage>
  )
}

const StyledTagPage = styled('div', {
  flex: 1,
  px: '$6',

  '.container': {
    maxW: '$lg',
    py: '$48',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '$8',
  },

  '.titlebar': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '.titlebar__left': {
    '& h3': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '$2xl',
      gap: '$2',
    },
  },

  '.titlebar__right': {
    display: 'flex',
    alignItems: 'center',
    gap: '$6',
    '& span': {
      color: '$slate400',
    },
  },

  '.titlebar__right .buttons': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },

  '.message': {
    textAlign: 'center',
  },
})
