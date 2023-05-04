import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div>
      <h2>Oops!</h2>
      <p>There was an unexpected error.</p>
    </div>
  )
}
