import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import Sidebar from '@/components/sidebar'
import { trpc } from '@/lib/trpc'

export default function AppLayout() {
  const { status: usersStatus, data: usersData } = trpc.user.list.useQuery()
  const { status, data } = trpc.user.protectedList.useQuery()

  return (
    <Flex align="stretch" overflow="hidden" bg="slate.800">
      <Sidebar />
      <Outlet />
      <div>
        List: {JSON.stringify(usersStatus)} -{' '}
        {JSON.stringify(usersData, null, 2)}
      </div>
      <div>
        Protected List: {JSON.stringify(status)} -{' '}
        {JSON.stringify(data, null, 2)}
      </div>
    </Flex>
  )
}
