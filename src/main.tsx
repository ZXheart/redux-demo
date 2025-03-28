import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { StoreContext } from './HOC/StoreContext.ts'

import App from './App.tsx'
// import store from './react-redux/store' // 1. redux-react & redux-thunk
import store from './react-RTK/store/index.ts' // 2. redux-toolkit

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <StoreContext.Provider value={store}> */}
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Provider>
  </StrictMode>,
)
