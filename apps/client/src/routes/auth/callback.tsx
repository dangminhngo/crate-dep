import { useAuth0 } from '@auth0/auth0-react'

export default function Callback() {
  const { error } = useAuth0()
  console.error(error)

  if (error) {
    return <div>There was an error. {error.message}</div>
  }

  return <div>Callback Page</div>
}
