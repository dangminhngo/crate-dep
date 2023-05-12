import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

import { styled } from '@/stitches.config'
import Logo from './logo'
import MainNav from './main-nav'
import { Button, Container, Icon } from './primitive'

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

  const handleSignup = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/app',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup',
      },
    })
  }

  return (
    <StyledHeader>
      <Container className="container">
        <Link to="/" className="logo">
          <Icon as={Logo} size="xl" />
          <span>Crate</span>
        </Link>
        <MainNav />
        <div className="buttons">
          <Button variant="ghost" onClick={handleLogin}>
            Sign in
          </Button>
          <Button onClick={handleSignup}>Try for free</Button>
        </div>
      </Container>
    </StyledHeader>
  )
}

const StyledHeader = styled('header', {
  borderBottom: '1px solid $slate800',
  '.container': {
    py: '$4',
  },
  '.logo': {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
    fontSize: '$3xl',
    fontWeight: '$bold',
    fontFamily: '$heading',
    textTransform: 'uppercase',
    color: '$primary',
  },
  '.buttons': {
    ml: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },
})
