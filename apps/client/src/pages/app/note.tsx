import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import Editor from '@/components/editor'
import {
  Delete,
  DeleteForever,
  Download,
  Draw,
  Fullscreen,
  Recycling,
  Star,
  StickyNote,
  Visibility,
} from '@/components/icons'
import Preview from '@/components/preview'
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
import Flex from '@/components/shared/flex'
import IconButton from '@/components/shared/icon-button'
import { useNoteById, useUpdateNoteById } from '@/hooks'
import { useDeleteNoteById } from '@/hooks/useDeleteNoteById'
import { downloadAsMd, formatDateTime } from '@/lib/helpers'
import { trpc } from '@/lib/trpc'
import { styled } from '@/stitches.config'

export default function NotePage() {
  const navigate = useNavigate()
  const params = useParams()
  const [preview, setPreview] = useState(false)
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
  })
  const { mutate: deleteNote } = useDeleteNoteById({
    onSuccess: () => {
      console.log('Note deleted')
      navigate(-1)
    },
  })

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>There was an error</div>

  return (
    <StyledNotePage>
      <div className="editor">
        {preview ? (
          <Preview code={note.code} />
        ) : (
          <Editor
            code={note.code}
            setCode={(code) => updateNote({ id: note.id, code })}
            config={{
              autocomplete: true,
              highlightActiveLine: true,
              lineNumbers: true,
              lineWrapping: true,
              tabSize: 2,
            }}
          />
        )}
      </div>
      <div className="toolbar">
        <div className="toolbar__left">
          <Icon as={StickyNote} />
          <span>{note.title}</span>
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
            <IconButton tooltip="Fullscreen">
              <Icon as={Fullscreen} />
            </IconButton>
            <IconButton
              tooltip="Download"
              onClick={() => downloadAsMd(note.title, note.code)}
            >
              <Icon as={Download} />
            </IconButton>
            <IconButton
              variant={note.starred ? 'active' : 'default'}
              tooltip={note.starred ? 'Unstar' : 'Star'}
              onClick={() =>
                updateNote({ id: note.id, starred: !note.starred })
              }
            >
              <Icon as={Star} />
            </IconButton>
            <IconButton
              variant={note.trashed ? 'active' : 'default'}
              tooltip={note.trashed ? 'Restore' : 'Delete'}
              onClick={() =>
                updateNote({ id: note.id, trashed: !note.trashed })
              }
            >
              <Icon as={note.trashed ? Recycling : Delete} />
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
    h: '$12',
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
    gap: '$2',
  },
})
