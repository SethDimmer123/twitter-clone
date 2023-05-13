import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function SignupModal() {


    const isOpen = useSelector((state) => state.modals.signupModalOpen);
    // i am using the useDipsatch hook to use
    //  the handleClose functions i already made from useStates.
    const dispatch = useDispatch()
    console.log(isOpen)
    return (
        <>
            <button
                className="bg-white  text-black
                w-[160px] rounded-full h-[40px]
                 hover:bg-[#cbd2d7]" 
                 onClick={() => dispatch(openSignupModal())}
                //  to open the modal i have a function with a dispatch hook
                 >
                    Signup</button>

                    <Modal
                    
                    open={isOpen}
                    onClose={() => dispatch(closeSignupModal())}
                    // to close it i have a function with dispatch hook
                    className="flex justify-center items-center"
                    >
                        <div className="w-[400px] h-[200px] bg-white">
                            Sign up over here
                        </div>


                    </Modal>
        </>
    )
}