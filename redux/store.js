import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'

export const store = configureStore({
  reducer: {

      modals:modalSlice
  },
})
// now i have access to the modal state everywhere