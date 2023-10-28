import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, username: "", firstName: "" },
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = action.payload.loginState;
    },
    setUsername(state, action) {
      state.username = action.payload.email;
    },
    setFirstName(state, action) {
      state.firstName = action.payload.name;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
