import { createContext } from 'react'

import type { Store } from 'redux'

export const StoreContext = createContext<Store<any, any, any> | null>(null)
