import { useNavigate } from 'react-router-dom'

import { formatDateTime } from '@/lib/helpers'
import type { RouterOutputs } from '@/lib/trpc'
import { styled } from '@/stitches.config'
import { Chip, ChipLabel, Table } from './primitive'

interface NoteListProps {
  notes: RouterOutputs['note']['list'] | RouterOutputs['tag']['byId']['notes']
}

export default function NoteList({ notes }: NoteListProps) {
  const navigate = useNavigate()

  return (
    <StyledNoteList>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(({ id, title, description, tags, updatedAt }) => (
            <tr key={id} onClick={() => navigate(`/app/notes/${id}`)}>
              <td className="title">{title}</td>
              <td className="desc">{description}</td>
              <td>
                <div className="tags">
                  {tags.map((tag) => (
                    <Chip key={tag.id}>
                      <ChipLabel>{tag.title}</ChipLabel>
                    </Chip>
                  ))}
                </div>
              </td>
              <td className="date">
                {formatDateTime(updatedAt, 'LLL dd, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledNoteList>
  )
}

const StyledNoteList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  '& .title': {
    fontWeight: '$medium',
  },
  '& .desc': {
    color: '$slate300',
  },
  '& .tags': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '$2',
  },
  '& .date': {
    color: '$slate500',
  },
})
