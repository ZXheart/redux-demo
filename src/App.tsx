import { PureComponent } from 'react'
// import Home from "./views/Home"; // 1. redux 基本使用
// import Profile from "./views/Profile"; // 1. redux 基本使用

// import Home from './react-redux/views/Home' // 2. react-redux&redux-thunk
// import Profile from './react-redux/views/Profile' // 2. react-redux&redux-thunk

import Home from './react-RTK/views/counter' // 3. @reduxjs/toolkit&react-redux
import Profile from './react-RTK/views/product' // 3. @reduxjs/toolkit&react-redux

class App extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Home />
        <Profile />
      </div>
    )
  }
}

export default App
