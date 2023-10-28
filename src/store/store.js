import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user-auth";
import coursesSlice from "./courses-slice";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
import purchasesSlice from "./my-courses-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    courses: coursesSlice.reducer,
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    purchases: purchasesSlice.reducer,
  },
});

export default store;
