import { useNavigate } from 'react-router-dom'

import type { TagListOutput } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'
import { Table, Tbody, Td, Th, Thead, Tr } from './ui'

interface TagListProps {
  tags: TagListOutput
}

export default function TagList({ tags }: TagListProps) {
  const navigate = useNavigate()

  return (
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
            className="cursor-pointer transition-colors duration-200 hover:bg-slate-800"
          >
            <Td className="font-medium">{title}</Td>
            <Td className="text-slate-400">{_count.notes} notes</Td>
            <Td className="text-slate-400">
              {formatDateTime(createdAt, 'LLL dd, yyyy')}
            </Td>
            <Td className="text-slate-400">
              {formatDateTime(updatedAt, 'LLL dd, yyyy')}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
