import { Route, Routes } from 'react-router-dom'

import AuthGuard from './components/auth-guard'
import AppLayout from './routes/app/layout'
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
      <Route path="/app" element={<AuthGuard component={AppLayout} />}></Route>
      <Route path="/callback" element={<Callback />} />
    </Routes>
  )
}
