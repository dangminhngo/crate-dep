import AuthProvider from './auth'
import RouterProvider from './router'
import ServiceProvider from './service'
import StoreProvider from './store'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider>
      <RouterProvider>
        <AuthProvider>
          <ServiceProvider>{children}</ServiceProvider>
        </AuthProvider>
      </RouterProvider>
    </StoreProvider>
  )
}
