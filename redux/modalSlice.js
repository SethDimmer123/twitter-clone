// creating my slices so i can open and close my Modals
// rxslice
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signupModalOpen: false,
    loginModalOpen:false,
    commentModalOpen:false,
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
    },
    openLoginModal: (state) => {//the first action is openLoginModal
        // this action makes the loginModalOpen: true 
        state.loginModalOpen = true
    },
    closeLoginModal: (state) => {
        state.loginModalOpen = false
    },
    openCommentModal: (state) => {
        state.commentModalOpen = true
    },
    closeCommentModal: (state) => {
        state.commentModalOpen = false;
    },
  },
});

export const {
    openSignupModal,
    closeSignupModal,
    openLoginModal, 
    closeLoginModal,
    openCommentModal,
    closeCommentModal,
} = modalSlice.actions
// exported the actions

export default modalSlice.reducer;