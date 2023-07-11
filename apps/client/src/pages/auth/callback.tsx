import { useAuth0 } from '@auth0/auth0-react'
import SplashScreen from '~/components/splash-screen'

export default function CallbackPage() {
  const { error } = useAuth0()

  if (error) {
    return <div>There was an error. {error.message}</div>
  }

  return <SplashScreen message="Redirecting..." />
}
