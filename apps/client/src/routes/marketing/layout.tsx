import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import Header from '@/components/header'

export default function MarketingLayout() {
  return (
    <Flex direction="column" align="stretch">
      <Header />
      <main>
        <Outlet />
      </main>
    </Flex>
  )
}
