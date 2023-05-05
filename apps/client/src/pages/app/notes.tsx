import { FilterAlt, Sort, StickyNote } from '@/components/icons'
import NoteList from '@/components/note-list'
import { Icon } from '@/components/primitive'
import IconButton from '@/components/shared/icon-button'
import SectionSkeleton from '@/components/skeletons/section-skeleton'
import { useNoteList } from '@/hooks'
import { styled } from '@/stitches.config'

export default function NotesPage() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <SectionSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const filteredNotes = notes.filter((note) => !note.trashed)

  return (
    <StyledNotesPage>
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
            <IconButton size="sm" tooltip="Filter">
              <Icon as={FilterAlt} />
            </IconButton>
            <IconButton size="sm" tooltip="Sort">
              <Icon as={Sort} />
            </IconButton>
          </div>
        </div>
      </div>
      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        <p>You have no notes</p>
      )}
    </StyledNotesPage>
  )
}

const StyledNotesPage = styled('div', {
  flex: 1,
  px: '$64',
  py: '$48',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '$8',

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
})
