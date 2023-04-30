import { useAuth0 } from '@auth0/auth0-react'

import Loading from '@/components/loading'

export default function Callback() {
  const { error } = useAuth0()

  if (error) {
    return <div>There was an error. {error.message}</div>
  }

  return <Loading message="Redirecting..." />
}
