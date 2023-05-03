import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import FilterAlt from '@/components/icons/filter-alt'
import Label from '@/components/icons/label'
import Sort from '@/components/icons/sort'
import NoteList from '@/components/notes/note-list'
import NotesSkeleton from '@/components/skeletons/notes-skeleton'
import IconButton from '@/components/ui/icon-button'
import { useTagById } from '@/hooks'

export default function TagPage() {
  const params = useParams()
  const { status, data: tag } = useTagById(params.id as string)

  if (status === 'loading') return <NotesSkeleton />

  if (status === 'error') return <div>There was an error</div>

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
              <Icon h={8} w={8} as={Label} />
              {tag.title}
            </Heading>
            <Flex align="center" gap={6}>
              <Text color="slate.400">Last edited Apr 28</Text>
              <Text>{tag.notes.length} notes</Text>
              <Flex align="center" gap={2}>
                <IconButton icon={FilterAlt} tooltip="Filter" />
                <IconButton icon={Sort} tooltip="Sort" />
              </Flex>
            </Flex>
          </Flex>
          <NoteList notes={tag.notes} />
        </Flex>
      </Container>
    </Container>
  )
}
