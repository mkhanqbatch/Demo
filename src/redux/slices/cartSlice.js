import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    resetCart: (state, action) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});
export const { setCartItems, setTotalPrice, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
