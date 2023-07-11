import { Provider } from 'react-redux'
import { setupStore } from '~/store'

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const store = setupStore()
  return <Provider store={store}>{children}</Provider>
}
