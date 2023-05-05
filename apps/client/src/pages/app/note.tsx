import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useParams } from 'react-router-dom'

import Editor from '@/components/editor'
import {
  Delete,
  Download,
  Draw,
  Fullscreen,
  Recycling,
  Star,
  StickyNote,
  Visibility,
} from '@/components/icons'
import Preview from '@/components/preview'
import { Icon } from '@/components/primitive'
import IconButton from '@/components/shared/icon-button'
import { useNoteById, useUpdateNoteById } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'
import { trpc } from '@/lib/trpc'

export default function NotePage() {
  const params = useParams()
  const [preview, setPreview] = useState(false)
  const queryClient = useQueryClient()
  const { status, data: note } = useNoteById(params.id as string)
  const mutation = useUpdateNoteById({
    onMutate: async (data) => {
      const noteQueryKey = getQueryKey(trpc.note.byId)
      await queryClient.cancelQueries({ queryKey: noteQueryKey })
      const previousNote = queryClient.getQueryData(noteQueryKey)
      queryClient.setQueryData(noteQueryKey, () => data)
      return previousNote
    },
  })

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Loading...</div>

  return (
    <div>
      <div>
        <div>
          {preview ? (
            <Preview code={note.code} />
          ) : (
            <Editor
              code={note.code}
              setCode={(code) => mutation.mutate({ id: note.id, code })}
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
        <div>
          <div>
            <Icon as={StickyNote} />
            <span>{note.title}</span>
          </div>
          <div>
            <p>
              Edited at {formatDateTime(note.updatedAt, 'HH:MM')} on{' '}
              {formatDateTime(note.updatedAt, 'LLL dd, yyyy')}
            </p>
            <div>
              <IconButton
                variant={preview ? 'secondary' : 'default'}
                tooltip="Change mode"
                onClick={() => setPreview((preview) => !preview)}
              >
                <Icon as={preview ? Visibility : Draw} />
              </IconButton>
              <IconButton tooltip="Fullscreen">
                <Icon as={Fullscreen} />
              </IconButton>
              <IconButton tooltip="Download">
                <Icon as={Download} />
              </IconButton>
              <IconButton
                variant={note.starred ? 'secondary' : 'default'}
                tooltip={note.starred ? 'Unstar' : 'Star'}
                onClick={() =>
                  mutation.mutate({ id: note.id, starred: !note.starred })
                }
              >
                <Icon as={Star} />
              </IconButton>
              <IconButton
                variant={note.trashed ? 'destructive' : 'default'}
                tooltip="Delete"
                onClick={() =>
                  mutation.mutate({ id: note.id, trashed: !note.trashed })
                }
              >
                <Icon as={Delete} />
              </IconButton>
              <IconButton tooltip="Restore">
                <Icon as={Recycling} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
