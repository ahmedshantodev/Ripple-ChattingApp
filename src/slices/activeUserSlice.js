import { createSlice } from "@reduxjs/toolkit";

export const activeUserSlice = createSlice({
  name: "user",
  initialState: {
    information: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  },
  reducers: {
    activeUser: (state , actions) => {
      state.information = actions.payload
    },
  },
});

export const { activeUser }  = activeUserSlice.actions

export default activeUserSlice.reducer