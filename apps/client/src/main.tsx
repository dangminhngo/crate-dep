import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app'
import AuthProvider from './providers/auth'
import ChakraProvider from './providers/chakra'
import RouterProvider from './providers/router'
import ServiceProvider from './providers/service'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider>
      <AuthProvider>
        <ServiceProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </ServiceProvider>
      </AuthProvider>
    </RouterProvider>
  </React.StrictMode>
)
