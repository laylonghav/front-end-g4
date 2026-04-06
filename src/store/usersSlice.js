import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add user
    addUser: (state, actions) => {
      if (!Array.isArray(state)) return [actions.payload];
      state.push(actions.payload);
    },

    // Update user by id
    updateUser: (state, actions) => {
      const { id, data } = actions.payload;
      const index = state.findIndex((item) => item?.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },

    // delete user by id
    deleteUser: (state, actions) => {
      return state.filter((item) => item?.id !== actions.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
