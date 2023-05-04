import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import Logo from './logo'
import MainNav from './main-nav'
import { Button, Icon } from './ui'

export default function Header() {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/app',
      },
      authorizationParams: {
        prompt: 'login',
      },
    })
  }

  return (
    <header className="border-b border-slate-800">
      <div className="container flex items-center gap-12 py-6">
        <Link to="/" className="text-primary flex items-center gap-4">
          <Icon as={Logo} className="h-8 w-8" />
          <span className="font-heading text-3xl font-bold uppercase">
            Crate
          </span>
        </Link>
        <MainNav />
        <div className="ml-auto flex gap-4">
          <Button variant="ghost" onClick={handleLogin}>
            Sign in
          </Button>
          <Button>Try for free</Button>
        </div>
      </div>
    </header>
  )
}
