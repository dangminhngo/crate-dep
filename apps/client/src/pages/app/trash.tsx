import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react'

import Delete from '@/components/icons/delete'
import Sort from '@/components/icons/sort'
import NoteList from '@/components/notes/note-list'
import NotesSkeleton from '@/components/skeletons/notes-skeleton'
import IconButton from '@/components/ui/icon-button'
import { useNoteList } from '@/hooks'

export default function TrashPage() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <NotesSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const trashedNotes = notes.filter((note) => note.trashed)

  return (
    <Container flex={1} px={4} py={32}>
      <Container maxW="1024px" mx="auto">
        <Flex direction="column" align="stretch" gap={12}>
          <Flex align="center" justify="space-between">
            <Heading
              as="h3"
              size="lg"
              fontFamily="body"
              display="flex"
              alignItems="center"
              gap={2}
              color="red"
            >
              <Icon h={8} w={8} as={Delete} />
              Trash
            </Heading>
            <Flex align="center" gap={6}>
              <Text color="slate.400">Last edited Apr 28</Text>
              <Text>{trashedNotes.length} notes</Text>
              <Flex align="center" gap={2}>
                <IconButton icon={Sort} tooltip="Sort" />
              </Flex>
            </Flex>
          </Flex>
          {trashedNotes.length > 0 ? (
            <NoteList notes={trashedNotes} />
          ) : (
            <Text textAlign="center">Your trash is empty</Text>
          )}
        </Flex>
      </Container>
    </Container>
  )
}
