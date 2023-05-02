import { useAuth0 } from '@auth0/auth0-react'
import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import ExpandMore from '../icons/expand-more'
import Logout from '../icons/logout'
import ManageAccounts from '../icons/manage-accounts'

export default function ProfileMenu() {
  const { user, logout } = useAuth0()

  return (
    <Menu isLazy>
      <MenuButton
        px={4}
        py={2.5}
        color="slate.200"
        borderRadius="base"
        border="1px solid"
        borderColor="slate.800"
        transitionProperty="color, background-color, border-color"
        transitionDuration="0.15s"
        transitionTimingFunction="ease-out"
        _hover={{
          color: 'slate.100',
        }}
        _expanded={{ borderColor: 'slate.700', bg: 'slate.800' }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Avatar
              h={5}
              w={5}
              size="xs"
              name={user?.name}
              src={user?.picture}
            />
            {user?.name}
          </Flex>
          <Icon as={ExpandMore} h={4} w={4} />
        </Flex>
      </MenuButton>
      <MenuList minW="224px">
        <MenuItem icon={<ManageAccounts />}>Account</MenuItem>
        <MenuItem
          color="red"
          _hover={{ color: 'red', bg: 'slate.700' }}
          icon={<Logout />}
          onClick={() => logout()}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
