import { Delete, DeleteForever, Sort } from '@/components/icons'
import NoteList from '@/components/note-list'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Icon,
} from '@/components/primitive'
import Container from '@/components/shared/container'
import Flex from '@/components/shared/flex'
import IconButton from '@/components/shared/icon-button'
import SectionSkeleton from '@/components/skeletons/section-skeleton'
import { useEmptyTrash, useNoteList } from '@/hooks'
import { styled } from '@/stitches.config'

export default function TrashPage() {
  const { status, data: notes } = useNoteList()
  const { mutate: emptyTrash } = useEmptyTrash({
    onSuccess: () => {
      console.log('Trash is empty')
    },
  })

  if (status === 'loading') return <SectionSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const trashedNotes = notes.filter((note) => note.trashed)

  return (
    <StyledTrashPage>
      <Container className="container">
        <div className="titlebar">
          <div className="titlebar__left">
            <h3>
              <Icon size="xl" as={Delete} />
              Trash
            </h3>
          </div>
          <div className="titlebar__right">
            <span>Last edited Apr 28</span>
            <span>{trashedNotes.length} notes</span>
            <div className="buttons">
              <IconButton size="sm" tooltip="Sort">
                <Icon as={Sort} />
              </IconButton>
            </div>
          </div>
        </div>
        {trashedNotes.length > 0 ? (
          <>
            <NoteList notes={trashedNotes} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  css={{ gap: '$2', alignSelf: 'end' }}
                >
                  <Icon as={DeleteForever} />
                  Empty trash
                </Button>
              </AlertDialogTrigger>
              <AlertDialogPortal>
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all notes in your trash.
                    </AlertDialogDescription>
                    <Flex css={{ justifyContent: 'flex-end', gap: '$2' }}>
                      <AlertDialogCancel>
                        <Button variant="outline">Cancel</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          variant="destructive"
                          onClick={() => emptyTrash()}
                        >
                          Yes, empty trash
                        </Button>
                      </AlertDialogAction>
                    </Flex>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialogPortal>
            </AlertDialog>
          </>
        ) : (
          <p className="message">You have no notes</p>
        )}
      </Container>
    </StyledTrashPage>
  )
}

const StyledTrashPage = styled('div', {
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
      color: '$red',
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
