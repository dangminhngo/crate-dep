import { useAuth0 } from '@auth0/auth0-react'

export default function Callback() {
  const { error } = useAuth0()

  if (error) {
    return <div>There was an error. {error.message}</div>
  }

  return <div>Redirecting to Crate app...</div>
}
