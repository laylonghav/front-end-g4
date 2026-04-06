import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addItemToCart: (state, actions) => {
      const item = actions.payload;
      const existing = state.find((i) => i?.id === item?.id);

      if (existing) {
        existing.qty += 1;
        // existing.qty = existing.qty + 1;
      } else {
        state.push({ ...item, qty: 1 });
      }
    },

    // Decrement item cart
    decrementItemCart: (state, actions) => {
      const item = actions.payload;
      const existing = state.find((i) => i?.id === item?.id);
      if (existing.qty > 1) {
        existing.qty -= 1;
        // existing.qty = existing.qty - 1;
      } else {
        return state.filter((i) => i?.id !== item?.id);
      }
    },

    // Clear item cart
    clearItemCart: (state, actions) => {
      const item = actions.payload;
      return state.filter((i) => i?.id !== item?.id);
    },

    // Clear all item cart
    clearAllItemCart: () => initialState,
  },
});

export const {
  addItemToCart,
  decrementItemCart,
  clearItemCart,
  clearAllItemCart,
} = cartSlice.actions;
export default cartSlice.reducer;
