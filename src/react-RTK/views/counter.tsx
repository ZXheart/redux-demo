import { PureComponent } from "react";
import { connect, type ConnectedProps } from "react-redux";

import type { RootState } from "../store";

import {
  add,
  subtract,
  fetchAddCount,
} from "../store/modules/counter/counter-slice";

class Counter extends PureComponent<PropsFromRedux, RootState> {
  constructor(props: PropsFromRedux) {
    super(props);
  }

  render() {
    const { add, subtract, fetchAddCount, count } = this.props;

    return (
      <div>
        <h1>Counter: {count}</h1>
        <button onClick={() => add(5)}>+ 5</button>
        <button onClick={() => subtract(8)}>- 8</button>
        <button onClick={() => fetchAddCount(33)}>add random</button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  count: state.counter,
});

const mapDispatchToProps = {
  add,
  subtract,
  fetchAddCount,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedCounter = connector(Counter);

export default ConnectedCounter;
