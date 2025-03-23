type counterType = "INCREMENT" | "DECREMENT";

export interface CounterState {
  type: counterType;
  payload: number;
}
