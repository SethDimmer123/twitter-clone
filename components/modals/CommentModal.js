import { closeCommentModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";

export default function CommentModal() {
    //passing in my state and returning 
    const isOpen = useSelector(state => state.modals.commentModalOpen)
    const dispatch = useDispatch()
    return (
        // after importing the modal i need to create 
        // the state and actions to open and close the Modal.
        // in the redux store (modalSlice.js)
        <>
            {/* i get the 2 props from my slices which are CommentModalOpen */}
            <Modal 
            className="flex justify-center items-center"
            open={isOpen} onClose={() => dispatch(closeCommentModal())}>
                <div className="bg-white w-[500px] h-[500px]">
                    This is the comment modal</div>
            </Modal>
        </>
    )
}