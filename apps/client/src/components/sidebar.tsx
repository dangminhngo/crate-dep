import { useEffect, useRef, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '~/stitches.config'

import SearchDialog from './dialogs/search-dialog'
import SettingsDialog from './dialogs/settings-dialog'
import {
  Delete,
  ExpandMore,
  Label,
  Logout,
  ManageAccounts,
  Star,
  StickyNote,
} from './icons'
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
} from './primitive'
import SectionButton from './shared/section-button'

export default function Sidebar() {
  const { user, logout } = useAuth0()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const [profileDropdownMenuWidth, setProfileDropdownMenuWidth] = useState(0)

  useEffect(() => {
    if (!profileButtonRef.current) return
    const { width } = profileButtonRef.current.getBoundingClientRect()
    setProfileDropdownMenuWidth(width)
  }, [])

  return (
    <StyledSidebar>
      <div className="top">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              ref={profileButtonRef}
              variant="outline"
              className="profile-button"
            >
              <div className="profile-button__user">
                <Avatar className="profile-button__avatar">
                  <AvatarImage src={user?.picture} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div>
              <Icon as={ExpandMore} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent css={{ w: `${profileDropdownMenuWidth}px` }}>
              <DropdownMenuItem>
                <Icon as={ManageAccounts} />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                css={{ color: '$red' }}
                onClick={() => logout()}
              >
                <Icon as={Logout} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
        <div>
          <SearchDialog />
          <SettingsDialog />
        </div>
        <div>
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
            icon={Label}
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
        <div>
          <SectionButton
            variant={
              pathname.startsWith('/app/trash') ? 'active' : 'destructive'
            }
            icon={Delete}
            tooltip="Your trash"
            onClick={() => navigate('/app/trash')}
          >
            Trash
          </SectionButton>
        </div>
      </div>
      <div className="bottom">Version: 0.0.1</div>
    </StyledSidebar>
  )
}

const StyledSidebar = styled('aside', {
  p: '$4',
  minW: '272px',
  backgroundColor: '$sidebarBg',
  color: '$sidebarFg',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',

  '.top, .bottom': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '$4',
  },

  '.top > div, .bottom > div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '$1',
  },

  '& .profile-button': {
    h: '$10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '& .profile-button__user': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  },
})
