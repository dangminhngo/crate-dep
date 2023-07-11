import { Suspense, lazy } from 'react'
import NoteFormDialog from '~/components/dialogs/note-form-dialog'
import { FilterAlt, Sort, StickyNote } from '~/components/icons'
import { Container, Icon } from '~/components/primitive'
import IconButton from '~/components/shared/icon-button'
import SectionSkeleton from '~/components/skeletons/section-skeleton'
import { useNoteList } from '~/hooks'
import { styled } from '~/stitches.config'

const NoteList = lazy(() => import('~/components/note-list'))

export default function NotesPage() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <SectionSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const filteredNotes = notes.filter((note) => !note.trashed)

  return (
    <StyledNotesPage>
      <Container className="container">
        <div className="titlebar">
          <div className="titlebar__left">
            <h3>
              <Icon size="xl" as={StickyNote} />
              Notes
            </h3>
          </div>
          <div className="titlebar__right">
            <span>Last edited Apr 28</span>
            <span>{filteredNotes.length} notes</span>
            <div className="buttons">
              <NoteFormDialog />
              <IconButton tooltip="Filter">
                <Icon as={FilterAlt} />
              </IconButton>
              <IconButton tooltip="Sort">
                <Icon as={Sort} />
              </IconButton>
            </div>
          </div>
        </div>
        {filteredNotes.length > 0 ? (
          <Suspense fallback={<SectionSkeleton />}>
            <NoteList notes={filteredNotes} />
          </Suspense>
        ) : (
          <p className="message">You have no notes</p>
        )}
      </Container>
    </StyledNotesPage>
  )
}

const StyledNotesPage = styled('div', {
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
