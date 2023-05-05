import React from 'react'
import ReactDOM from 'react-dom/client'

import { globalCss } from '@/stitches.config'
import App from './app'
import AuthProvider from './providers/auth'
import RouterProvider from './providers/router'
import ServiceProvider from './providers/service'
import StoreProvider from './providers/store'

const globals = globalCss({
  '*, *::before, *::after': {
    m: 0,
    p: 0,
    boxSizing: 'border-box',
  },
  body: {
    fontFamily: '$body',
    backgroundColor: '$slate900',
    color: '$slate200',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  button: {
    outline: 'none',
    border: 'none',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    backgroundColor: 'transparent',
    color: 'inherit',
  },
})

globals()

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
