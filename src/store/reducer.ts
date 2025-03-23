import type { CounterState } from "./action";

const initialState = {
  counter: 66,
};

const reducer = (state = initialState, action: CounterState) => {
  switch (action.type) {
    case "INCREMENT":
      return { counter: state.counter + action.payload };
    case "DECREMENT":
      return { counter: state.counter - action.payload };
    default:
      return state;
  }
};

export default reducer;
