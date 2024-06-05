import { configureStore } from '@reduxjs/toolkit'
import activeUserSlice from './slices/activeUserSlice'
import activeGroupSlice from './slices/activeGroupSlice'


export default configureStore({
  reducer: {
    user: activeUserSlice,
    activeGroup: activeGroupSlice
  },
})