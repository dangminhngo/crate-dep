import { Outlet } from 'react-router-dom'

import Header from '@/components/header'

export default function MarketingLayout() {
  return (
    <div className="flex flex-col items-stretch">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
