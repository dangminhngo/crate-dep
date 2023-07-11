import { useAuth0 } from '@auth0/auth0-react'
import { Button, Container } from '~/components/primitive'
import { styled } from '~/stitches.config'

export default function HomePage() {
  const { loginWithRedirect } = useAuth0()

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
    <StyledHomePage>
      <Container className="container">
        <div className="hero__content">
          <h2>Changes the way a developer</h2>
          <h1>writes markdown</h1>
        </div>
        <div className="hero__buttons">
          <Button size="lg" onClick={handleSignup}>
            Try Now (v0.0.1)
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open('https://github.com/dangminhngo/crate', '_blank')
            }
          >
            Github Repository
          </Button>
        </div>
      </Container>
    </StyledHomePage>
  )
}

const StyledHomePage = styled('div', {
  '.container': {
    pt: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '$8',
  },
  '.hero__content': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '$heading',
    '& h1': {
      fontSize: '$8xl',
      color: '$primary',
    },
    '& h2': {
      fontSize: '$4xl',
    },
  },
  '.hero__buttons': {
    display: 'flex',
    alignItems: 'center',
    gap: '$6',
  },
})
