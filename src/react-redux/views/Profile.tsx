import { PureComponent } from "react";
import { connect, type ConnectedProps } from "react-redux";

import { fetchSubNumber } from "../../react-redux/store/action";

import type { ThunkDispatch } from "redux-thunk";
import type { InitialState } from "../../react-redux/store/reducer";
import type { DecrementAction } from "../../react-redux/store/action";

function mapStateToProps(state: InitialState) {
  return {
    counter: state.counter,
  };
}

// async action
function mapDispatchToProps(
  dispatch: ThunkDispatch<InitialState, unknown, DecrementAction>,
) {
  return {
    asyncSub: () => {
      dispatch(fetchSubNumber());
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface HomeState {
  count: number;
}

class Profile extends PureComponent<PropsFromRedux, HomeState> {
  constructor(props: PropsFromRedux) {
    super(props);
  }

  render() {
    const { counter, asyncSub } = this.props;

    function handleSub() {
      asyncSub();
    }

    return (
      <div style={{ border: "1px solid red" }}>
        <h1>Profile:{counter}</h1>

        <button onClick={handleSub}>sub random</button>
      </div>
    );
  }
}

const ConnectedProfile = connector(Profile);

export default ConnectedProfile;
