// creating my slices so i can open and close my Modals
// rxslice
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signupModalOpen: false

}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {//inside the reducers i have my actions
    openSignupModal: (state) => {//the first action is openSignupModal
        // this action makes the signUpModalOpen: true 
        state.signupModalOpen = true
    },
    closeSignupModal: (state) => {
        state.signupModalOpen = false
    }
  }
});

export const {openSignupModal,closeSignupModal} = modalSlice.actions
// exported the actions

export default modalSlice.reducer