import { ArrowUpDown, Filter, Star } from 'lucide-react'

import NoteList from '@/components/note-list'
import NotesSkeleton from '@/components/skeletons/notes-skeleton'
import { Icon, IconButton } from '@/components/ui'
import { useNoteList } from '@/hooks'

export default function StarredPage() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <NotesSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const starredNotes = notes.filter((note) => note.starred && !note.trashed)

  return (
    <div className="container flex flex-col items-stretch gap-12 py-48">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-3xl font-bold">
          <Icon size="xl" as={Star} />
          Starred
        </h3>
        <div className="flex items-center gap-6">
          <span className="text-slate-400">Last edited Apr 28</span>
          <span className="text-slate-400">{starredNotes.length} notes</span>
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
      {starredNotes.length > 0 ? (
        <NoteList notes={starredNotes} />
      ) : (
        <p>You have no notes</p>
      )}
    </div>
  )
}
