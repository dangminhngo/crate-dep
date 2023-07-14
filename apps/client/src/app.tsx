import { Navigate, Route, Routes } from 'react-router-dom'

import AuthGuard from './components/auth-guard'
import config from './config/default'
import AppLayout from './pages/app/layout'
import NotePage from './pages/app/note'
import NotesPage from './pages/app/notes'
import StarredPage from './pages/app/starred'
import TagPage from './pages/app/tag'
import TagsPage from './pages/app/tags'
import TrashPage from './pages/app/trash'
import CallbackPage from './pages/auth/callback'
import DocsPage from './pages/marketing/docs'
import FeaturesPage from './pages/marketing/features'
import HomePage from './pages/marketing/home'
import MarketingLayout from './pages/marketing/layout'
import SupportPage from './pages/marketing/support'

export default function App() {
  console.log(config)
  return (
    <Routes>
      <Route path="/" element={<MarketingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="documentation" element={<DocsPage />} />
        <Route path="support" element={<SupportPage />} />
      </Route>
      <Route path="/app" element={<AuthGuard component={AppLayout} />}>
        <Route path="" element={<Navigate to="/app/notes" />} />
        <Route path="notes" element={<NotesPage />} />
        <Route path="notes/:id" element={<NotePage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="tags/:id" element={<TagPage />} />
        <Route path="starred" element={<StarredPage />} />
        <Route path="trash" element={<TrashPage />} />
      </Route>
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  )
}
