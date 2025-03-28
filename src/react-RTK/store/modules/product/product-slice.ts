import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = ["Apple", "Banana", "Cherry", "Date"];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    removeByIndex(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export type ProductState = typeof initialState;
export const { addProduct, removeByIndex } = productSlice.actions;
export default productSlice.reducer;
