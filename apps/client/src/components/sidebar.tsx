import { useAuth0 } from '@auth0/auth0-react'
import {
  ChevronDown,
  LogOut,
  Search,
  Settings,
  Star,
  StickyNote,
  Tag,
  Trash,
  User,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Icon,
  SectionButton,
} from './ui'

export default function Sidebar() {
  const { user, logout } = useAuth0()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="flex min-w-[272px] flex-col items-stretch justify-between bg-slate-950 p-4">
      <div className="flex flex-col items-stretch gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-10 justify-between focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-[18px] w-[18px]">
                  <AvatarImage src={user?.picture} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div>
              <Icon as={ChevronDown} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="min-w-[240px]">
              <DropdownMenuItem className="flex items-center gap-4">
                <Icon as={User} />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-4 text-red-400"
                onClick={() => logout()}
              >
                <Icon as={LogOut} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
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
