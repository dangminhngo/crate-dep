import { Container, Flex, Spacer } from '@chakra-ui/react'

import Dashboard from './icons/dashboard'
import Delete from './icons/delete'
import Search from './icons/search'
import Settings from './icons/settings'
import Star from './icons/star'
import StickyNote from './icons/sticky-note'
import ProfileMenu from './sidebar/profile-menu'
import SectionButton from './sidebar/section-button'

export default function Sidebar() {
  return (
    <Container minW="256px" minH="100vh" bg="slate.900" fontSize="sm">
      <Flex h="100%" direction="column" align="stretch" py={8} px={4}>
        <Flex direction="column" align="stretch" gap={6}>
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
              onClick={() => console.log('search')}
            >
              Notes
            </SectionButton>
            <SectionButton
              icon={Dashboard}
              tooltip="Organize your tags"
              onClick={() => console.log('search')}
            >
              Tags
            </SectionButton>
            <SectionButton
              icon={Star}
              tooltip="Starred"
              onClick={() => console.log('search')}
            >
              Starred
            </SectionButton>
          </Flex>
          <Flex direction="column" align="stretch">
            <SectionButton
              variant="danger"
              icon={Delete}
              tooltip="Your trash"
              onClick={() => console.log('search')}
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
