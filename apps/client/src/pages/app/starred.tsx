import { Suspense, lazy } from 'react'

import { FilterAlt, Sort, Star } from '@/components/icons'
import { Container, Icon } from '@/components/primitive'
import IconButton from '@/components/shared/icon-button'
import SectionSkeleton from '@/components/skeletons/section-skeleton'
import { useNoteList } from '@/hooks'
import { styled } from '@/stitches.config'

const NoteList = lazy(() => import('@/components/note-list'))

export default function StarredPage() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <SectionSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const starredNotes = notes.filter((note) => note.starred && !note.trashed)

  return (
    <StyledStarredPage>
      <Container className="container">
        <div className="titlebar">
          <div className="titlebar__left">
            <h3>
              <Icon size="xl" as={Star} />
              Starred
            </h3>
          </div>
          <div className="titlebar__right">
            <span>Last edited Apr 28</span>
            <span>{starredNotes.length} notes</span>
            <div className="buttons">
              <IconButton tooltip="Filter">
                <Icon as={FilterAlt} />
              </IconButton>
              <IconButton tooltip="Sort">
                <Icon as={Sort} />
              </IconButton>
            </div>
          </div>
        </div>
        {starredNotes.length > 0 ? (
          <Suspense fallback={<SectionSkeleton />}>
            <NoteList notes={starredNotes} />
          </Suspense>
        ) : (
          <p className="message">You have starred no notes</p>
        )}
      </Container>
    </StyledStarredPage>
  )
}

const StyledStarredPage = styled('div', {
  flex: 1,
  px: '$6',
  py: '$48',

  '.container': {
    maxW: '$lg',
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
