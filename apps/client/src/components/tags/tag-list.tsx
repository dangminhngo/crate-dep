import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import type { TagListOutput } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'

interface TagListProps {
  tags: TagListOutput
}

export default function TagList({ tags }: TagListProps) {
  const navigate = useNavigate()

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Notes</Th>
            <Th>Created</Th>
            <Th>Edited</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tags.map(({ id, title, _count, createdAt, updatedAt }) => (
            <Tr
              key={id}
              onClick={() => navigate(`/app/tags/${id}`)}
              cursor="pointer"
              transitionProperty="color, background-color, border-color"
              transitionDuration="150ms"
              transitionTimingFunction="ease-out"
              _hover={{
                bg: 'slate.900',
              }}
            >
              <Td py={3}>{title}</Td>
              <Td>{_count.notes} notes</Td>
              <Td color="slate.300">
                {formatDateTime(createdAt, 'LLL dd, yyyy')}
              </Td>
              <Td color="slate.300">
                {formatDateTime(updatedAt, 'LLL dd, yyyy')}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
