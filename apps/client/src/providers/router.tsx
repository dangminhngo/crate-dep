import { BrowserRouter } from 'react-router-dom'

export default function RouterProvider({ children }: React.PropsWithChildren) {
  return <BrowserRouter>{children}</BrowserRouter>
}
