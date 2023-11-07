import { createSlice } from "@reduxjs/toolkit";

const calculateTotalCost = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalCost: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.item_id === action.payload.item_id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, added: true, quantity: 1 });
      }
      state.totalCost = calculateTotalCost(state.items);
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find((item) => item.item_id === action.payload.item_id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          const indexToRemove = state.items.findIndex((item) => item.item_id === action.payload.item_id);
          if (indexToRemove !== -1) {
            state.items.splice(indexToRemove, 1);
          }
        }
        state.totalCost = calculateTotalCost(state.items);
      }
    },
    emptyCart: (state) => {
        state.items=[];
        state.totalCost=0;
    },
  },
});

export const { addItem, removeItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
