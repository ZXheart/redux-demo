import { PureComponent } from "react";

import store from "../store";

interface HomeState {
  count: number;
}

class Home extends PureComponent<object, HomeState> {
  private unsubscribe: (() => void) | undefined;

  constructor(props: HomeState) {
    super(props);

    this.state = {
      count: store.getState().counter,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().counter,
      });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { count } = this.state;

    function handleAdd(num: number) {
      store.dispatch({
        type: "INCREMENT",
        payload: num,
      });
    }

    return (
      <div>
        <h1>home: {count}</h1>
        <button onClick={() => handleAdd(5)}>add 5</button>
      </div>
    );
  }
}

export default Home;
