import { PureComponent } from 'react'

import store from '../store'

interface HomeState {
  count: number
}

class Profile extends PureComponent<object, HomeState> {
  unsubscribe: (() => void) | undefined

  constructor(props: object) {
    super(props)
    this.state = {
      count: store.getState().counter,
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ count: store.getState().counter })
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  render() {
    const { count } = this.state

    function handleSub(num: number) {
      store.dispatch({
        type: 'DECREMENT',
        payload: num,
      })
    }

    return (
      <div style={{ border: '1px solid red' }}>
        <h1>Profile:{count}</h1>

        <button onClick={() => handleSub(5)}>sub 5</button>
      </div>
    )
  }
}

export default Profile
