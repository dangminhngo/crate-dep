import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/globals.css'
import App from './app'
import AuthProvider from './providers/auth'
import RouterProvider from './providers/router'
import ServiceProvider from './providers/service'
import StoreProvider from './providers/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider>
      <AuthProvider>
        <ServiceProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </ServiceProvider>
      </AuthProvider>
    </RouterProvider>
  </React.StrictMode>
)
