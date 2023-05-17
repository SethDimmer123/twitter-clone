// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// get auth is for when user can create an account and sign in
import {getAuth} from"firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ91dX1ezvcxS3Yta34XDec6WL5ZZ5Ncc",
  authDomain: "twitter-clone-good.firebaseapp.com",
  projectId: "twitter-clone-good",
  storageBucket: "twitter-clone-good.appspot.com",
  messagingSenderId: "321408656859",
  appId: "1:321408656859:web:6d16b067f2df9fd26773fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)//initialized for access to
//  firestore database for sending a tweet to firestore db
export const auth = getAuth(app)