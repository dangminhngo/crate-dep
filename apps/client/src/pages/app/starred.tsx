import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react'

import FilterAlt from '@/components/icons/filter-alt'
import Sort from '@/components/icons/sort'
import Star from '@/components/icons/star'
import NoteList from '@/components/notes/note-list'
import NotesSkeleton from '@/components/skeletons/notes-skeleton'
import IconButton from '@/components/ui/icon-button'
import { useNoteList } from '@/hooks'

export default function StarredPage() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <NotesSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const starredNotes = notes.filter((note) => note.starred && !note.trashed)

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
            >
              <Icon h={8} w={8} as={Star} />
              Starred
            </Heading>
            <Flex align="center" gap={6}>
              <Text color="slate.400">Last edited Apr 28</Text>
              <Text>{starredNotes.length} notes</Text>
              <Flex align="center" gap={2}>
                <IconButton icon={FilterAlt} tooltip="Filter" />
                <IconButton icon={Sort} tooltip="Sort" />
              </Flex>
            </Flex>
          </Flex>
          {starredNotes.length > 0 ? (
            <NoteList notes={starredNotes} />
          ) : (
            <Text textAlign="center">You have starred no notes</Text>
          )}
        </Flex>
      </Container>
    </Container>
  )
}
