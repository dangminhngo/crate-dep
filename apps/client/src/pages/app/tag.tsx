import { ArrowUpDown, Filter, Tag } from 'lucide-react'
import { useParams } from 'react-router-dom'

import NoteList from '@/components/note-list'
import NotesSkeleton from '@/components/skeletons/notes-skeleton'
import { Icon, IconButton } from '@/components/ui'
import { useTagById } from '@/hooks'

export default function TagPage() {
  const params = useParams()
  const { status, data: tag } = useTagById(params.id as string)

  if (status === 'loading') return <NotesSkeleton />

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="container flex flex-col items-stretch gap-12 py-48">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-3xl font-bold">
          <Icon size="xl" as={Tag} />
          Tag: {tag.title}
        </h3>
        <div className="flex items-center gap-6">
          <span className="text-slate-400">Last edited Apr 28</span>
          <span className="text-slate-400">{tag.notes.length} notes</span>
          <div className="flex items-center gap-2">
            <IconButton variant="ghost" size="sm" tooltip="Filter">
              <Icon as={Filter} />
            </IconButton>
            <IconButton variant="ghost" size="sm" tooltip="Sort">
              <Icon as={ArrowUpDown} />
            </IconButton>
          </div>
        </div>
      </div>
      {tag.notes.length > 0 ? (
        <NoteList notes={tag.notes} />
      ) : (
        <p>You have no notes</p>
      )}
    </div>
  )
}
