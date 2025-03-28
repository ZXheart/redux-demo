import { configureStore, type Middleware } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import counterReducer from './modules/counter/counter-slice'
import productReducer from './modules/product/product-slice'

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log(`dispatching`, action)
  if (typeof action === 'function') {
    console.log(`action is a function`)
    return action(store.dispatch, store.getState)
  }
  const result = next(action)
  console.log(`next state`, store.getState())
  return result
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(loggerMiddleware)
  },
})

// logger
function logger() {
  const next = store.dispatch
  // monkey patching
  store.dispatch = ((action: PayloadAction): any => {
    console.log('dispatching', action)
    next(action)
    console.log(`next state`, store.getState())
  }) as typeof store.dispatch
}

// logger()

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
