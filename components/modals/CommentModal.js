import { closeCommentModal } from "@/redux/modalSlice";
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
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
                <div className=" w-full h-full relative
                rounded-lg bg-black border border-gray-500
                sm:w-[600px] sm:h-[386px] text-white
                sm:p-10 p-4
                "
                >
                    <div className="absolute w-[2px] h-[50px] bg-gray-500 
                    left-[40px] top-[96px] sm:left-[64px] sm:top-[120px]"></div>
                    <div 
                    onClick={() => dispatch(closeCommentModal())}
                    className="absolute top-4 cursor-pointer">
                        <XIcon className="w-6"/>
                    </div>
                    <div className="mt-8">
                        <div className="flex space-x-3">
                            <img className="w-12 h-12 object-cover rounded-full"
                                src="/assets/kylie.png" />
                            <div>
                                <div className="flex space-x-1.5">
                                    <h1 className="font-bold">kylie</h1>
                                    <h1 className="text-gray-500">@kylie</h1>
                                </div>
                                <p className="mt-1">This is awesome</p>
                                <h1 className="text-gray-500 text-[15px] mt-2">
                                    Replying to <span className="text-[#1b9bf0]">@seth</span></h1>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex space-x-3">
                            <img className="w-12 h-12 object-cover rounded-full"
                                src="/assets/kylie.png" />
                            <div className="w-full">
                                <textarea
                                    placeholder="Tweet your reply"
                                    className="w-full text-lg outline-none
                                bg-transparent resize-none"/>

                                <div className="pt-4 flex justify-between border-t border-gray-700">
                                    <div className="flex space-x-0">
                                        <div className="iconAnimation">
                                            <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                                        </div>
                                        <div className="iconAnimation">
                                            <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
                                        </div>
                                        <div className="iconAnimation">
                                            <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
                                        </div>
                                        <div className="iconAnimation">
                                            <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
                                        </div>
                                        <div className="iconAnimation">
                                            <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
                                        </div>

                                    </div>
                                    <button
                                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 
                                    disabled:opacity-50">Tweet</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    )
}