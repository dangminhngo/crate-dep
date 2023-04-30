import { withAuthenticationRequired } from '@auth0/auth0-react'

import Loading from './loading'

interface AuthGuardProps {
  component: React.ComponentType
}

export default function AuthGuard({ component }: AuthGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  })

  return <Component />
}
