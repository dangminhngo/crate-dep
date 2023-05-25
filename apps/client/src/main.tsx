import React from 'react'
import ReactDOM from 'react-dom/client'

import { globalCss } from '@/stitches.config'
import App from './app'
import Providers from './providers'

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
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
