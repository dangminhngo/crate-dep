import { useNavigate } from 'react-router-dom'
import { formatDateTime } from '~/lib/helpers'
import type { RouterOutputs } from '~/lib/trpc'
import { styled } from '~/stitches.config'

import { Table } from './primitive'

interface TagListProps {
  tags: RouterOutputs['tag']['list']
}

export default function TagList({ tags }: TagListProps) {
  const navigate = useNavigate()

  return (
    <StyledTagList>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Notes</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          {tags.map(({ id, title, _count, createdAt, updatedAt }) => (
            <tr
              key={id}
              onClick={() => navigate(`/app/tags/${id}`)}
              className="cursor-pointer transition-colors duration-200 hover:bg-slate-800"
            >
              <td className="title">{title}</td>
              <td className="count">{_count.notes} notes</td>
              <td className="date">
                {formatDateTime(createdAt, 'LLL dd, yyyy')}
              </td>
              <td className="date">
                {formatDateTime(updatedAt, 'LLL dd, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledTagList>
  )
}

const StyledTagList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  '& .title': {
    fontWeight: '$medium',
  },
  '& .count': {
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
