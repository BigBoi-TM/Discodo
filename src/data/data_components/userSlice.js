import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, 
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.online = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.online = false;
    },
  },
});

export const { login, logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectOnline = (state) => state.user.online;
export default userSlice.reducer;