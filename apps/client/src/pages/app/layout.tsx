import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import Sidebar from '@/components/sidebar'

export default function AppLayout() {
  return (
    <Flex align="stretch" overflow="hidden" bg="slate.800" fontSize="sm">
      <Sidebar />
      <Outlet />
    </Flex>
  )
}
