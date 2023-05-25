import AuthProvider from './auth'
import RouterProvider from './router'
import ServiceProvider from './service'
import StoreProvider from './store'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <RouterProvider>
      <AuthProvider>
        <ServiceProvider>
          <StoreProvider>{children}</StoreProvider>
        </ServiceProvider>
      </AuthProvider>
    </RouterProvider>
  )
}
