import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username:null,
    name:null,
    email:null,
    uid:null,
    photoUrl:null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      // what i am doing in setUser is when the user logs in i set the user i pass in an object
      // the change all of the states from the initialState object from null to 
      // the properties of the object i am passing in(payload)

    //setUser is an action and a function that takes in the state and action
    // this time becuase i am passing in something.
    // an action is what i use to pass in arguements using redux.

    setUser: (state, action) => {
        state.username = action.payload.username,
        // the payload is the thing i am passing in which is an object
        // inside the object i will have all of the properties that
        // are in the intialState
        state.name = action.payload.name,
        state.email = action.payload.email,
        state.uid = action.payload.uid,// uid is important this is what i will be using to store information about the tweet.
        // without the uid i cannot add or edit documents in firebase
        state.photoUrl = action.payload.photoUrl
    },

    //when i am signing out i make all of the states null so the user is signed out.

    signOutUser : (state) => {
        state.username = null,
        state.name = null,
        state.email = null,
        state.uid = null,
        state.photoUrl = null
    }

  }
});

export const {setUser, signOutUser} = userSlice.actions

export default userSlice.reducer

// after all of this i need to put the slice INTO MY REDUX STORE store.js. 