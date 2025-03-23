import { PureComponent } from "react";
// import Home from "./views/Home"; // 1. redux 基本使用
// import Profile from "./views/Profile"; // 1. redux 基本使用

import Home from "./react-redux/views/Home";
import Profile from "./react-redux/views/Profile";

class App extends PureComponent {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Home />
        <Profile />
      </div>
    );
  }
}

export default App;
