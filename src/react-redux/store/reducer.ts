import type { CounterState } from "./action";

const initialState = {
  counter: 66,
  otherState: "others",
};

export type InitialState = typeof initialState;

const reducer = (state = initialState, action: CounterState) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + action.payload };
    case "DECREMENT":
      return { ...state, counter: state.counter - action.payload };
    case "OTHER":
      return { ...state, otherState: action.payload };
    default:
      return state;
  }
};

export default reducer;
