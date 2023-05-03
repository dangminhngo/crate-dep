import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react'

import FilterAlt from '@/components/icons/filter-alt'
import Label from '@/components/icons/label'
import Sort from '@/components/icons/sort'
import TagsSkeleton from '@/components/skeletons/tags-skeleton'
import TagList from '@/components/tags/tag-list'
import IconButton from '@/components/ui/icon-button'
import { useTagList } from '@/hooks'

export default function TagsPage() {
  const { status, data: tags } = useTagList()

  if (status === 'loading') return <TagsSkeleton />

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
              Tags
            </Heading>
            <Flex align="center" gap={6}>
              <Text color="slate.400">Last edited Apr 28</Text>
              <Text>{tags.length} tags</Text>
              <Flex align="center" gap={2}>
                <IconButton icon={FilterAlt} tooltip="Filter" />
                <IconButton icon={Sort} tooltip="Sort" />
              </Flex>
            </Flex>
          </Flex>
          {tags.length > 0 ? (
            <TagList tags={tags} />
          ) : (
            <Text textAlign="center">You have no tags.</Text>
          )}
        </Flex>
      </Container>
    </Container>
  )
}
