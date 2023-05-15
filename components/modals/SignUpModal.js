import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";

export default function SignupModal() {


    const isOpen = useSelector((state) => state.modals.signupModalOpen);
    // i am using the useDipsatch hook to use
    //  the handleClose functions i already made from useStates.
    const dispatch = useDispatch()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    async function handleSignUp(){
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
    }

    useEffect(() => {
        //listener checks of user is logged in or logged out if the user just created an 
        // account i want to log them in not log in again using the same email and password.
        // They should already be logged in.
        //onAuthStateChanged function has 2 parameters first one is auth 2nd arguement is a 
        // callback function in the function i accept an arguement called currentUser
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser) return//if currentUser does not exist then return
            // if i do have a current user i want to take all the information 
            // displayed in the console and put it in a redux slice so i can access
            // the information anywhere.
            console.log(currentUser);
            // handle redux actions

            // if the user does sign in i get the current user 
            // if i get the currentUser i want to call the setUser action
            // once that happens i get the currentUser 
            // and dispatch and pass in the setUser action
            // import the setUser from the userSlice.js
            // in the setUser action is pass in the object

            dispatch(setUser(//setUser action
            // the username will be currentUser.displayName but since
            // i am using an email and password the displayName property will
            // always be null.
            // i create a different username by getting the email and split
            // it at the @ and add an @ infront of the first @
            // with the first element from the array
                {
                    username:currentUser.email.split("@")[0],
                    name:null,//i am not using google sign in just email and password
                    // that is why i do not have a displayName available.
                    email:currentUser.email,
                    uid:currentUser.uid,
                    photoUrl:null,
                    // photoUrl will always be null in console.
                }
            ))
        })

        return unsubscribe// i am returning this because it turns off the
        // listener so i don't have the listener on at all times.
        // if i have my listener on at all times i will have website issues.
        // now i create my userSlice in redux
    }, [])
    return (
        <>
            <button
                className="bg-white  text-black
                w-[160px] rounded-full h-[40px]
                 hover:bg-[#cbd2d7]"
                onClick={() => dispatch(openSignupModal())}
            //  to open the modal i have a function with a dispatch hook
            >
                Sign Up</button>

            <Modal

                open={isOpen}
                onClose={() => dispatch(closeSignupModal())}
                // to close it i have a function with dispatch hook
                className="flex justify-center items-center"
            >
                <div className="w-[90%] h-[600px] bg-black text-white md:w-[560px]
                        md:h-[600px] border border-gray-700 rounded-lg
                        flex justify-center ">
                    <div className="w-[90%] mt-8 flex flex-col">
                        <button className="bg-white text-black w-full
                                font-bold text-lg p-2 rounded-md
                                ">Sign In as guest</button>
                        <h1 className="text-center mt-4 font-bold text-lg">or</h1>
                        <h1 className=" mt-4 font-bold text-4xl">Create your Account</h1>
                        <input placeholder="Full Name"
                            className="h-10 rounded-md bg-transparent border
                                 border-gray-700 p-6 mt-8"
                            type={"text"} />
                        <input placeholder="Email"
                            className="h-10 rounded-md bg-transparent border
                                 border-gray-700 p-6 mt-8"  
                                 type={"email"}
                                 onChange={e => setEmail(e.target.value)} />
                        <input placeholder="Password"
                            className="h-10 rounded-md bg-transparent border
                                 border-gray-700 p-6 mt-8" 
                                 type={"password"}
                                 onChange={e => setPassword(e.target.value)} />

                        <button className="bg-white text-black w-full
                                font-bold text-lg p-2 mt-8 rounded-md
                                "
                                onClick={handleSignUp}>Create Account</button>
                    </div>
                </div>


            </Modal>
        </>
    )
}