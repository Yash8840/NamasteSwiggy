import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // Same item already exists
        existingItem.quantity += 1;
      } else {
        // New item
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // Add one item's price to total
      state.totalPrice += action.payload.price;
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalPrice += existingItem.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload,
      );
      if (existingItem) {
        existingItem.quantity -= 1;
        state.totalPrice -= existingItem.price;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
        }
      }
    },
    clearCart: (state) => {
      state.items = []; //wont work if we do state = {items: []} because it will create a new object and not change the existing state object. So we need to mutate the existing state object.
      state.totalPrice = 0;
    },
  },
});

export const { addItem, increaseQuantity, clearCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
