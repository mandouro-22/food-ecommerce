import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {},
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
