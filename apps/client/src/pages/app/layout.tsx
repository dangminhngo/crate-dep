import { Outlet } from 'react-router-dom'

import Sidebar from '@/components/sidebar'

export default function AppLayout() {
  return (
    <div className="flex h-screen max-h-screen items-stretch text-sm">
      <Sidebar />
      <Outlet />
    </div>
  )
}
