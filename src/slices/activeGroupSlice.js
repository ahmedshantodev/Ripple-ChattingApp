import { createSlice } from "@reduxjs/toolkit";

export const activeGroupSlice = createSlice({
  name: "group",
  initialState: {
    information: localStorage.getItem("activeGroup") ? JSON.parse(localStorage.getItem("activeGroup")) : null
  },
  reducers: {
    activeGroup: (state , actions) => {
      state.information = actions.payload
    },
  },
});

export const { activeGroup }  = activeGroupSlice.actions

export default activeGroupSlice.reducer