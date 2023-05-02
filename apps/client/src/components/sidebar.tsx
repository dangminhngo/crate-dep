import { Container, Flex, Spacer } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import Delete from './icons/delete'
import Label from './icons/label'
import Search from './icons/search'
import Settings from './icons/settings'
import Star from './icons/star'
import StickyNote from './icons/sticky-note'
import ProfileMenu from './sidebar/profile-menu'
import SectionButton from './sidebar/section-button'

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <Container minW="256px" minH="100vh" bg="slate.950" fontSize="sm">
      <Flex h="100%" direction="column" align="stretch" p={4}>
        <Flex direction="column" align="stretch" gap={4}>
          <ProfileMenu />
          <Flex direction="column" align="stretch">
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
          </Flex>
          <Flex direction="column" align="stretch">
            <SectionButton
              icon={StickyNote}
              tooltip="Your notes"
              onClick={() => navigate('/app/notes')}
            >
              Notes
            </SectionButton>
            <SectionButton
              icon={Label}
              tooltip="Organize your tags"
              onClick={() => navigate('/app/tags')}
            >
              Tags
            </SectionButton>
            <SectionButton
              icon={Star}
              tooltip="Starred"
              onClick={() => navigate('/app/starred')}
            >
              Starred
            </SectionButton>
          </Flex>
          <Flex direction="column" align="stretch">
            <SectionButton
              variant="danger"
              icon={Delete}
              tooltip="Your trash"
              onClick={() => navigate('/app/trash')}
            >
              Trash
            </SectionButton>
          </Flex>
        </Flex>
        <Spacer />
        <Flex direction="column" align="stretch">
          Version: 0.1.1
        </Flex>
      </Flex>
    </Container>
  )
}
