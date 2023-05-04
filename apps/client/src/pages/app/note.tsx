import { useState } from 'react'
import { Container, Flex, Icon, Text, useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useParams } from 'react-router-dom'

import Editor from '@/components/editor'
import Delete from '@/components/icons/delete'
import Download from '@/components/icons/download'
import Draw from '@/components/icons/draw'
import Fullscreen from '@/components/icons/fullscreen'
import Recycling from '@/components/icons/recycling'
import Star from '@/components/icons/star'
import StickyNote from '@/components/icons/sticky-note'
import Visibility from '@/components/icons/visibility'
import Preview from '@/components/preview'
import IconButton from '@/components/ui/icon-button'
import { useNoteById, useUpdateNoteById } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'
import { trpc } from '@/lib/trpc'

export default function NotePage() {
  const params = useParams()
  const [preview, setPreview] = useState(false)
  const toast = useToast()
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
    <Container flex={1} maxH="100vh">
      <Flex h="full" direction="column" align="stretch" overflow="hidden">
        <Flex
          direction="column"
          maxH="calc(100vh-36px)"
          flex="1"
          overflow="hidden"
        >
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
        </Flex>
        <Flex align="center" justify="space-between" pl={4} bg="slate.950">
          <Flex align="center" gap={2}>
            <Icon h={5} w={5} as={StickyNote} />
            <Text fontWeight="medium">{note.title}</Text>
          </Flex>
          <Flex align="center" gap={4}>
            <Text color="slate.400">
              Edited at {formatDateTime(note.updatedAt, 'HH:MM')} on{' '}
              {formatDateTime(note.updatedAt, 'LLL dd, yyyy')}
            </Text>
            <Flex align="center">
              <IconButton
                variant={preview ? 'highlight' : 'default'}
                icon={preview ? Visibility : Draw}
                tooltip="Change mode"
                onClick={() => setPreview((preview) => !preview)}
              />
              <IconButton icon={Fullscreen} tooltip="Fullscreen" />
              <IconButton icon={Download} tooltip="Download" />
              <IconButton
                variant={note.starred ? 'highlight' : 'default'}
                icon={Star}
                tooltip={note.starred ? 'Unstar' : 'Star'}
                onClick={() => {
                  mutation.mutate({ id: note.id, starred: !note.starred })
                  toast({
                    title: note.starred ? 'Unstarred' : 'Starred',
                    description: `"${note.title}" has been ${
                      note.starred ? 'unstarred' : 'starred'
                    }.`,
                    status: 'success',
                    duration: null,
                    isClosable: true,
                  })
                }}
              />
              <IconButton
                variant={note.trashed ? 'danger' : 'default'}
                icon={Delete}
                tooltip="Delete"
                onClick={() =>
                  mutation.mutate({ id: note.id, trashed: !note.trashed })
                }
              />
              <IconButton icon={Recycling} tooltip="Restore" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
