import { useNavigate } from 'react-router-dom'

import type { NoteListOutput, TagByIdOutput } from '@/hooks'
import { formatDateTime } from '@/lib/helpers'
import { Chip, ChipLabel, Table, Tbody, Td, Th, Thead, Tr } from './ui'

interface NoteListProps {
  notes: NoteListOutput | TagByIdOutput['notes']
}

export default function NoteList({ notes }: NoteListProps) {
  const navigate = useNavigate()

  return (
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
          <Tr
            key={id}
            onClick={() => navigate(`/app/notes/${id}`)}
            className="cursor-pointer transition-colors duration-200 hover:bg-slate-800"
          >
            <Td className="font-medium">{title}</Td>
            <Td className="text-slate-400">{description}</Td>
            <Td>
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                  <Chip key={tag.id}>
                    <ChipLabel>{tag.title}</ChipLabel>
                  </Chip>
                ))}
              </div>
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
