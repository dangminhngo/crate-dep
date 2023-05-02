import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react'

import FilterAlt from '@/components/icons/filter-alt'
import Sort from '@/components/icons/sort'
import StickyNote from '@/components/icons/sticky-note'
import NoteList from '@/components/notes/note-list'
import IconButton from '@/components/ui/icon-button'
import { useNoteList } from '@/hooks'

export default function Notes() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <div>Loading...</div>

  if (status === 'error') return <div>There was an error</div>

  return (
    <Container flex={1} px={4} py={32}>
      <Container maxW="1024px" mx="auto">
        <Flex direction="column" align="stretch">
          <Flex align="center" justify="space-between">
            <Heading
              as="h3"
              size="lg"
              fontFamily="body"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon h={8} w={8} as={StickyNote} />
              Notes
            </Heading>
            <Flex align="center" gap={6}>
              <Text color="slate.400">Last edited Apr 28</Text>
              <Text>2 notes</Text>
              <Flex align="center" gap={2}>
                <IconButton icon={FilterAlt} tooltip="Filter" />
                <IconButton icon={Sort} tooltip="Sort" />
              </Flex>
            </Flex>
          </Flex>
          <NoteList notes={notes} />
        </Flex>
      </Container>
    </Container>
  )
}
