import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" };
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
