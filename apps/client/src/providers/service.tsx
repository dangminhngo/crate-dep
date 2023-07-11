import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import config from '~/config/default'
import { trpc } from '~/lib/trpc'

export default function ServiceProvider({ children }: React.PropsWithChildren) {
  const { getAccessTokenSilently } = useAuth0()
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${config.apiServerURL}/trpc`,
          async headers() {
            const token = await getAccessTokenSilently({
              authorizationParams: {
                audience: config.auth0Audience,
                scope: 'read:current_user',
              },
            })
            return {
              Authorization: `Bearer ${token}`,
            }
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
