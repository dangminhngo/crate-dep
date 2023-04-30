import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import Sidebar from '@/components/sidebar'
import { trpc } from '@/lib/trpc'

export default function AppLayout() {
  const { status, data } = trpc.user.list.useQuery()

  return (
    <Flex align="stretch" overflow="hidden" bg="slate.800">
      <Sidebar />
      <Outlet />
      <div>Status: {JSON.stringify(status)}</div>
      <div>Data: {JSON.stringify(data, null, 2)}</div>
    </Flex>
  )
}
