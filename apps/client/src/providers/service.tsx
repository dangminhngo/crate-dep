import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'

import secrets from '@/lib/secrets'
import { trpc } from '@/lib/trpc'

export default function ServiceProvider({ children }: React.PropsWithChildren) {
  const { getAccessTokenSilently } = useAuth0()
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${secrets.API_SERVER_URL}/trpc`,
          async headers() {
            const token = await getAccessTokenSilently()
            console.log(token)
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
