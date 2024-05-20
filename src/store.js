import { configureStore } from '@reduxjs/toolkit'
import activeUserSlice from './slices/activeUserSlice'

export default configureStore({
  reducer: {
    user: activeUserSlice
  },
})