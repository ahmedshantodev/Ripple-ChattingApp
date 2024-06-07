import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "chat",
  initialState: {
    information: localStorage.getItem("activeChat") ? JSON.parse(localStorage.getItem("activeChat")) : null
  },
  reducers: {
    activeChat: (state , actions) => {
      state.information = actions.payload
    },
  },
});

export const { activeChat }  = activeChatSlice.actions

export default activeChatSlice.reducer