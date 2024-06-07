import { configureStore } from '@reduxjs/toolkit'
import activeUserSlice from './slices/activeUserSlice'
import activeGroupSlice from './slices/activeGroupSlice'
import activeChatSlice from './slices/activeChatSlice'


export default configureStore({
  reducer: {
    user: activeUserSlice,
    activeGroup: activeGroupSlice,
    activeChat: activeChatSlice
  },
})