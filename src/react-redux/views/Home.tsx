import { PureComponent } from "react";
import { connect, type ConnectedProps } from "react-redux";

import type { Dispatch } from "redux";
import type { InitialState } from "../../react-redux/store/reducer";
import type { IncrementAction } from "../../react-redux/store/action";

function mapStateToProps(state: InitialState) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IncrementAction>) {
  return {
    add: (num: number) => dispatch({ type: "INCREMENT", payload: num }),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface HomeState {
  count: number;
}

class Home extends PureComponent<PropsFromRedux, HomeState> {
  constructor(props: PropsFromRedux) {
    super(props);
  }

  render() {
    const { counter, add } = this.props;

    function handleAdd(num: number) {
      add(num);
    }

    return (
      <div>
        <h1>home: {counter}</h1>
        <button onClick={() => handleAdd(5)}>add 5</button>
      </div>
    );
  }
}

const ConnectedHome = connector(Home);
export default ConnectedHome;
