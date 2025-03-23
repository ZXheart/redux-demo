import type { ThunkAction } from "redux-thunk";

import type { InitialState } from "./reducer";

export interface IncrementAction {
  type: "INCREMENT";
  payload: number;
}

export interface DecrementAction {
  type: "DECREMENT";
  payload: number;
}

export interface OtherAction {
  type: "OTHER";
  payload: string;
}

export type CounterState = IncrementAction | DecrementAction | OtherAction;

export type AsyncDecrementAction = ThunkAction<
  Promise<void>,
  InitialState,
  unknown,
  DecrementAction
>;

export const fetchSubNumber = (): AsyncDecrementAction => {
  return async (dispatch, getState) => {
    console.log(getState());
    const random = Math.floor(Math.random() * 8 - 1 + 2);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${random}`,
    );
    const data = await response.json();
    dispatch({ type: "DECREMENT", payload: data.id });
  };
};
