import { Flex, Spacer, Tag, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Note } from '@/types'

interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <Flex direction="column" align="stretch">
      {notes.map((note) => (
        <Link key={note.id} to={`/notes/${note.id}`}>
          <Flex align="center">
            <Text>{note.title}</Text>
            <Spacer />
            <Flex gap={2}>
              {note.tags.map((tag) => (
                <Tag key={tag.id}>{tag.title}</Tag>
              ))}
            </Flex>
          </Flex>
        </Link>
      ))}
    </Flex>
  )
}
