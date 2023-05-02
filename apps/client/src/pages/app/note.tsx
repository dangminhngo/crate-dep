import { Container, Flex, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import Editor from '@/components/editor'
import { useNoteById } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'

export default function NotePage() {
  const params = useParams()
  const { status, data: note } = useNoteById(params.id as string)

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Loading...</div>

  return (
    <Container flex={1}>
      <Flex height="100%" direction="column" align="stretch">
        <Flex
          align="center"
          justify="space-between"
          bg="slate.950"
          px={6}
          py={3}
        >
          <Text fontWeight="medium">{note.title}</Text>
          <Text color="slate.400">
            Edited at {formatDateTime(note.updatedAt, 'HH:MM')} on{' '}
            {formatDateTime(note.updatedAt, 'LLL dd, yyyy')}
          </Text>
        </Flex>
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
      </Flex>
    </Container>
  )
}
