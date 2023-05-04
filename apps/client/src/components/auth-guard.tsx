import { withAuthenticationRequired } from '@auth0/auth0-react'

import SplashScreen from './splash-screen'

interface AuthGuardProps {
  component: React.ComponentType
}

export default function AuthGuard({ component }: AuthGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <SplashScreen />,
  })

  return <Component />
}
