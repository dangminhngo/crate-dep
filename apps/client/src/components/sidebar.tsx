import { Search, Settings, Star, StickyNote, Tag, Trash } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { SectionButton } from './ui'

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="flex min-w-[256px] flex-col items-stretch justify-between bg-slate-950 p-4">
      <div className="flex flex-col items-stretch gap-6">
        <div className="flex flex-col items-stretch gap-1">
          <SectionButton
            icon={Search}
            tooltip="Search notes"
            onClick={() => console.log('search')}
          >
            Search
          </SectionButton>
          <SectionButton
            icon={Settings}
            tooltip="Change your settings"
            onClick={() => console.log('search')}
          >
            Settings
          </SectionButton>
        </div>
        <div className="flex flex-col items-stretch gap-1">
          <SectionButton
            variant={pathname.startsWith('/app/notes') ? 'active' : 'default'}
            icon={StickyNote}
            tooltip="Your notes"
            onClick={() => navigate('/app/notes')}
          >
            Notes
          </SectionButton>
          <SectionButton
            variant={pathname.startsWith('/app/tags') ? 'active' : 'default'}
            icon={Tag}
            tooltip="Organize your tags"
            onClick={() => navigate('/app/tags')}
          >
            Tags
          </SectionButton>
          <SectionButton
            variant={pathname.startsWith('/app/starred') ? 'active' : 'default'}
            icon={Star}
            tooltip="Starred"
            onClick={() => navigate('/app/starred')}
          >
            Starred
          </SectionButton>
        </div>
        <div className="flex flex-col items-stretch gap-1">
          <SectionButton
            variant={
              pathname.startsWith('/app/trash')
                ? 'destructiveActive'
                : 'destructive'
            }
            icon={Trash}
            tooltip="Your trash"
            onClick={() => navigate('/app/trash')}
          >
            Trash
          </SectionButton>
        </div>
      </div>
      <div>Version: 0.1.1</div>
    </div>
  )
}
