import { Tag as ChakraTag, Flex, Spacer, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Tag } from '@/types'

interface TagListProps {
  tags: Tag[]
}

export default function TagList({ tags }: TagListProps) {
  return (
    <Flex direction="column" align="stretch">
      {tags.map((tag) => (
        <Link key={tag.id} to={`/tags/${tag.id}`}>
          <ChakraTag>{tag.title}</ChakraTag>
          <Spacer />
          <Text>{tag.notes.length} notes</Text>
        </Link>
      ))}
    </Flex>
  )
}
