import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/primitive'
import Sidebar from '@/components/sidebar'
import { styled } from '@/stitches.config'

export default function AppLayout() {
  return (
    <>
      <StyledAppLayout>
        <Sidebar />
        <Outlet />
      </StyledAppLayout>
      <Toaster />
    </>
  )
}

const StyledAppLayout = styled('div', {
  minW: '$screenX',
  minH: '$screenY',
  w: '$screenX',
  h: '$screenY',
  display: 'flex',
  alignItems: 'stretch',
  fontSize: '$sm',
})
