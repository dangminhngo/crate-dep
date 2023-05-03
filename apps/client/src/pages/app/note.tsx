import { Container, Flex, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import Editor from '@/components/editor'
import Delete from '@/components/icons/delete'
import Download from '@/components/icons/download'
import Fullscreen from '@/components/icons/fullscreen'
import Recycling from '@/components/icons/recycling'
import Star from '@/components/icons/star'
import Visibility from '@/components/icons/visibility'
import IconButton from '@/components/ui/icon-button'
import { useNoteById } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'

export default function NotePage() {
  const params = useParams()
  const { status, data: note } = useNoteById(params.id as string)

  if (status === 'loading') return <div>Loading@/components.</div>
  if (status === 'error') return <div>Loading@/components.</div>

  return (
    <Container flex={1}>
      <Flex height="100%" direction="column" align="stretch">
        <Editor
          code={note.code}
          setCode={(c) => console.log(c)}
          config={{
            autocomplete: true,
            highlightActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
          }}
        />
        <Flex align="center" justify="space-between" bg="slate.950">
          <Text fontWeight="medium">{note.title}</Text>
          <Flex align="center" gap={4}>
            <Text color="slate.400">
              Edited at {formatDateTime(note.updatedAt, 'HH:MM')} on{' '}
              {formatDateTime(note.updatedAt, 'LLL dd, yyyy')}
            </Text>
            <Flex align="center">
              <IconButton icon={Visibility} tooltip="Change mode" />
              <IconButton icon={Fullscreen} tooltip="Fullscreen" />
              <IconButton icon={Download} tooltip="Download as JSON" />
              <IconButton icon={Star} tooltip="Star" />
              <IconButton icon={Delete} tooltip="Delete" />
              <IconButton icon={Recycling} tooltip="Restore" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
