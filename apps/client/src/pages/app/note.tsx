import { Suspense, lazy, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { throttle } from 'throttle-debounce'
import NoteFormDialog from '~/components/dialogs/note-form-dialog'
import {
  Delete,
  DeleteForever,
  Download,
  Draw,
  Recycling,
  Star,
  StickyNote,
  Visibility,
} from '~/components/icons'
import TagsPopover from '~/components/popovers/tags-popover'
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
  Flex,
  Icon,
  useToast,
} from '~/components/primitive'
import IconButton from '~/components/shared/icon-button'
import { useDeleteNoteById, useNoteById, useUpdateNoteById } from '~/hooks'
import { downloadAsMd, formatDateTime } from '~/lib/helpers'
import { trpc } from '~/lib/trpc'
import { styled } from '~/stitches.config'

const Editor = lazy(() => import('~/components/editor'))

const Preview = lazy(() => import('~/components/preview'))

export default function NotePage() {
  const navigate = useNavigate()
  const params = useParams()
  const [preview, setPreview] = useState(false)

  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { status, data: note } = useNoteById(params.id as string)

  const { mutate: updateNote } = useUpdateNoteById({
    onMutate: async (data) => {
      const noteQueryKey = getQueryKey(trpc.note.byId)
      await queryClient.cancelQueries({ queryKey: noteQueryKey })
      const previousNote = queryClient.getQueryData(noteQueryKey)
      queryClient.setQueryData(noteQueryKey, () => data)
      return previousNote
    },
    onSuccess: (_, variables) => {
      if (variables.data.trashed === true) {
        toast({
          variant: 'destructive',
          title: 'Trash Updated',
          description: 'A note has been trashed.',
        })
        return
      }

      if (variables.data.trashed === false) {
        toast({
          variant: 'success',
          title: 'Note Restored',
          description: 'A note has been restored.',
        })
      }
    },
  })
  const throttleUpdateNote = throttle(1500, updateNote)

  const { mutate: deleteNote } = useDeleteNoteById({
    onSuccess: () => {
      toast({
        variant: 'destructive',
        title: 'Note Deleted',
        description: 'A note has been permanently deleted.',
      })
      navigate(-1)
    },
  })

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>There was an error</div>

  return (
    <StyledNotePage>
      <Suspense fallback={'loading...'}>
        <div className="editor">
          {preview ? (
            <Preview code={note.code} />
          ) : (
            <Editor
              code={note.code}
              setCode={(code) =>
                throttleUpdateNote({ id: note.id, data: { code } })
              }
            />
          )}
        </div>
      </Suspense>
      <div className="toolbar">
        <div className="toolbar__left">
          <Icon as={StickyNote} />
          <span>{note.title}</span>
          <NoteFormDialog note={note} />
        </div>
        <div className="toolbar__right">
          <p>
            Edited at {formatDateTime(note.updatedAt, 'HH:mm')} on{' '}
            {formatDateTime(note.updatedAt, 'LLL dd, yyyy')}
          </p>
          <div className="toolbar__buttons">
            <IconButton
              variant={preview ? 'active' : 'default'}
              tooltip={preview ? 'Markdown' : 'Preview'}
              onClick={() => setPreview((preview) => !preview)}
            >
              <Icon as={preview ? Visibility : Draw} />
            </IconButton>
            <TagsPopover note={note} />
            <IconButton
              tooltip="Download"
              onClick={() => {
                const filename = downloadAsMd(note.title, note.code)
                toast({
                  title: 'Note Downloaded',
                  description: `A note downloaded as "${filename}"`,
                })
              }}
            >
              <Icon as={Download} />
            </IconButton>
            <IconButton
              variant={note.starred ? 'active' : 'default'}
              tooltip={note.starred ? 'Unstar' : 'Star'}
              onClick={() =>
                updateNote({ id: note.id, data: { starred: !note.starred } })
              }
            >
              <Icon as={Star} />
            </IconButton>
            {note.trashed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <IconButton
                    variant="destructive"
                    tooltip="Delete permanently"
                  >
                    <Icon as={DeleteForever} />
                  </IconButton>
                </AlertDialogTrigger>
                <AlertDialogPortal>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this note.
                      </AlertDialogDescription>
                      <Flex css={{ justifyContent: 'flex-end', gap: '$2' }}>
                        <AlertDialogCancel>
                          <Button variant="outline">Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            variant="destructive"
                            onClick={() => deleteNote(note.id)}
                          >
                            Yes, delete
                          </Button>
                        </AlertDialogAction>
                      </Flex>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialogPortal>
              </AlertDialog>
            )}
            <IconButton
              variant={note.trashed ? 'active' : 'default'}
              tooltip={note.trashed ? 'Restore' : 'Move to trash'}
              onClick={() =>
                updateNote({ id: note.id, data: { trashed: !note.trashed } })
              }
            >
              <Icon as={note.trashed ? Recycling : Delete} />
            </IconButton>
          </div>
        </div>
      </div>
    </StyledNotePage>
  )
}

const StyledNotePage = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',

  '.editor': {
    flex: 1,
    overflow: 'hidden',
  },

  '.toolbar': {
    h: '$10',
    px: '$4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '.toolbar__left': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
    fontWeight: '$semibold',
  },

  '.toolbar__right': {
    display: 'flex',
    alignItems: 'center',
    gap: '$8',

    '& > p': {
      color: '$slate400',
    },
  },

  '.toolbar__buttons': {
    display: 'flex',
    alignItems: 'center',
    gap: '$1',
  },
})
