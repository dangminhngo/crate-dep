/*
 * @link https://redux.js.org/usage/writing-tests
 */

import type { AppRouter } from '@crate/server'
import { type PreloadedState } from '@reduxjs/toolkit'
import { render, type RenderOptions } from '@testing-library/react'
import { createTRPCMsw } from 'msw-trpc'
import { Provider } from 'react-redux'

import { setupStore, type AppStore, type RootState } from '@/store'

export const trpcMsw = createTRPCMsw<AppRouter>()

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  component: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: React.PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) }
}
