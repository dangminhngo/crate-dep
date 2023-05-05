import { Outlet } from 'react-router-dom'

import Header from '@/components/header'
import { styled } from '@/stitches.config'

export default function MarketingLayout() {
  return (
    <StyledMarketingLayout>
      <Header />
      <main>
        <Outlet />
      </main>
    </StyledMarketingLayout>
  )
}

const StyledMarketingLayout = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
})
