import React, {
  PureComponent,
  useContext,
  useEffect,
  useState,
  ContextType,
} from 'react'
import type { Store } from 'redux'

// import store from '../react-redux/store'
import { StoreContext } from './StoreContext'

/**
 * @description 类组件的connect；类组件+ts用起来真是吃了屎了
 * @param mapStateToProps
 * @param mapDispatchToProps
 * @returns
 */
export function connect(mapStateToProps: any, mapDispatchToProps?: any) {
  return function <P extends object>(WrappedComponent: React.ComponentType<P>) {
    return class extends PureComponent<P> {
      static contextType = StoreContext
      private unsubscribe: (() => void) | undefined
      declare context: ContextType<typeof StoreContext>

      constructor(props: P, context: ContextType<typeof StoreContext>) {
        super(props)

        this.state = this.getPropsFromStore(context!)
      }

      getPropsFromStore = (store: Store<any, any, any>) => {
        if (!store) {
          throw new Error(
            'Store is not found. Make sure you wrapped the component with <StoreProvider>',
          )
        }
        return {
          ...mapStateToProps(store.getState()),
          ...(mapDispatchToProps ? mapDispatchToProps(store.dispatch) : {}),
        }
      }

      componentDidMount() {
        const store = this.context

        if (!store) {
          throw new Error(
            'Store is not found. Make sure you wrapped the component with <StoreProvider>',
          )
        }
        this.unsubscribe = store.subscribe(() => {
          this.setState(mapStateToProps(store.getState()))
          console.log(this.state)
        })
      }

      componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe()
        }
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state} />
      }
    }
  }
}

/**
 * @description 函数组件的connect
 * @param mapstateToProps
 * @param mapDispatchToProps
 * @returns
 */
export function connectFn(mapstateToProps: any, mapDispatchToProps: any) {
  return function (WrappedComponent: any) {
    return function (props: any) {
      const store = useContext(StoreContext)
      if (!store) {
        throw new Error('StoreContext.Provider is not found')
      }

      const [state, setState] = useState(store.getState())

      useEffect(() => {
        const unsubscribe = store.subscribe(() => {
          setState(store.getState())
        })
        return () => {
          unsubscribe()
        }
      }, [store])

      const states = mapstateToProps(state)
      const dispatches = mapDispatchToProps(store.dispatch)
      return <WrappedComponent {...props} {...states} {...dispatches} />
    }
  }
}
