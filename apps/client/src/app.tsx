import { Navigate, Route, Routes } from 'react-router-dom'

import AuthGuard from './components/auth-guard'
import AppLayout from './routes/app/layout'
import Notes from './routes/app/notes'
import Starred from './routes/app/starred'
import Tags from './routes/app/tags'
import Trash from './routes/app/trash'
import Callback from './routes/auth/callback'
import Docs from './routes/marketing/docs'
import Features from './routes/marketing/features'
import Home from './routes/marketing/home'
import MarketingLayout from './routes/marketing/layout'
import Support from './routes/marketing/support'

export default function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/documentation" element={<Docs />} />
        <Route path="/support" element={<Support />} />
      </Route>
      <Route element={<AuthGuard component={AppLayout} />}>
        <Route path="/app" element={<Navigate to="/app/notes" />} />
        <Route path="/app/notes" element={<Notes />} />
        <Route path="/app/tags" element={<Tags />} />
        <Route path="/app/starred" element={<Starred />} />
        <Route path="/app/trash" element={<Trash />} />
      </Route>
      <Route path="/callback" element={<Callback />} />
    </Routes>
  )
}
