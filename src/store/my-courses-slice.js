import { createSlice } from "@reduxjs/toolkit";

const purchasesSlice = createSlice({
  name: "purchases",
  initialState: {
    purchasedItems: [],
  },
  reducers: {
    addItemToPurchases(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItem = state.purchasedItems.find(
        (item) => item.itemId === newItem.itemId
      );
      if (!existingItem) {
        state.purchasedItems.push({
          itemId: newItem.itemId,
          price: newItem.price,
          title: newItem.title,
          description: newItem.description,
          imageLink: newItem.imageLink,
        });
      } else {
        console.log("item already exists");
      }
    },
  },
});

export const purchasesActions = purchasesSlice.actions;

export default purchasesSlice;
