import Modal from "@mui/material/Modal"
import { useState } from "react"

export default function SignupModal() {


// THE PROBLEM WITH USING USESTATE FOR MODALS IS I CAN ONLY CONTROL
// MODAL FROM THE SIGNUP BUTTON AND NOWHERE ELSE.

// I WANT TO CONTROL THE MODAL GLOBALLY(FROM ANYWHERE)
// so i use redux and make the MODALS AVAILABLE GLOBALLY
    const [isOpen, setIsopen] = useState(false)
    // if initially the isOpen is true then the onClose 
    // will accept a function that turns the true intially to false
    const handleClose = () => setIsopen(false)

    const handleOpen = () => setIsopen(true)
    //when i click the signUp button the modal pops up
    return (
        <>
            <button
                className="bg-white  text-black
                w-[160px] rounded-full h-[40px]
                 hover:bg-[#cbd2d7]" onClick={handleOpen}>
                    Signup</button>
                    {/* my modal is getting an error 
                    because it needs props */}
                    {/* open prop takes a boolean value
                    onClose takes in a function and 
                    changes the state of the open prop.
                    */}

                    <Modal
                    
                    open={isOpen}
                    onClose={handleClose}
                    className="flex justify-center items-center"
                    >
                        <div className="w-[400px] h-[200px] bg-white">
                            Sign up over here
                        </div>


                    </Modal>
        </>
    )
}