import {
  Flex,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import type { NoteListOutput } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'

interface NoteListProps {
  notes: NoteListOutput
}

export default function NoteList({ notes }: NoteListProps) {
  const navigate = useNavigate()
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Tags</Th>
            <Th>Edited</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notes.map(({ id, title, description, tags, updatedAt }) => (
            <Tr key={id} onClick={() => navigate(`/app/notes/${id}`)}>
              <Td>{title}</Td>
              <Td>{description}</Td>
              <Td>
                <Flex gap={1}>
                  {tags.map((tag) => (
                    <Tag key={tag.id}>{tag.title}</Tag>
                  ))}
                </Flex>
              </Td>
              <Td>{formatDateTime(updatedAt, 'LLL dd, yyyy')}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
