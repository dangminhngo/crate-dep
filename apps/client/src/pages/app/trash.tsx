import { ArrowUpDown, Trash } from 'lucide-react'

import NoteList from '@/components/note-list'
import NotesSkeleton from '@/components/skeletons/notes-skeleton'
import { Icon, IconButton } from '@/components/ui'
import { useNoteList } from '@/hooks'

export default function TrashPage() {
  const { status, data: notes } = useNoteList()

  if (status === 'loading') return <NotesSkeleton />

  if (status === 'error') return <div>There was an error</div>

  const trashedNotes = notes.filter((note) => note.trashed)

  return (
    <div className="container flex flex-col items-stretch gap-12 py-48">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-3xl font-bold text-red-400">
          <Icon size="xl" as={Trash} />
          Trash
        </h3>
        <div className="flex items-center gap-6">
          <span className="text-slate-400">Last edited Apr 28</span>
          <span className="text-slate-400">{trashedNotes.length} notes</span>
          <div className="flex items-center gap-2">
            <IconButton variant="ghost" size="sm" tooltip="Sort">
              <Icon as={ArrowUpDown} />
            </IconButton>
          </div>
        </div>
      </div>
      {trashedNotes.length > 0 ? (
        <NoteList notes={trashedNotes} />
      ) : (
        <p>You have no notes</p>
      )}
    </div>
  )
}
