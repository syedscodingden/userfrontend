import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPriceOfCart: 0,
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPriceOfCart = action.payload.totalPriceOfCart;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );
      if (!existingItem) {
        state.items.push({
          itemId: newItem.itemId,
          price: newItem.price,
          quantity: 1,
          title: newItem.title,
          description: newItem.description,
          imageLink: newItem.imageLink,
        });
        state.totalPriceOfCart += newItem.price;
        state.totalQuantity += 1;
      } else {
        console.log("item already exists");
      }
    },
    removeItemFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.itemId === id);
      state.totalQuantity -= 1;
      state.totalPriceOfCart -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.itemId !== id);
      }
    },
    emptyCart(state) {
      state.totalQuantity = 0;
      state.totalPriceOfCart = 0;
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
