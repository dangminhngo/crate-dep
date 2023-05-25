import { renderWithProviders } from './lib/test-utils'
import HomePage from './pages/marketing/home'

test('should be equal to 4', () => {
  expect(2 + 2).toBe(4)
})

test('should render home page', () => {
  renderWithProviders(<HomePage />)
})
