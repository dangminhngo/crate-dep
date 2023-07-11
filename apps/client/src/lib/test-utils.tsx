/*
 * @link https://redux.js.org/usage/writing-tests
 */

import { type PreloadedState } from '@reduxjs/toolkit'
import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore, type AppStore, type RootState } from '~/store'

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
