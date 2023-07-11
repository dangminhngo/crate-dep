import {
  useDispatch as useStoreDispatch,
  useSelector as useStoreSelector,
  type TypedUseSelectorHook,
} from 'react-redux'
import type { AppDispatch, RootState } from '~/store'

export const useDispatch: () => AppDispatch = useStoreDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useStoreSelector
