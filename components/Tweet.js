import { db } from "@/firebase"
import { openCommentModal, openLoginModal, setCommentTweet } from "@/redux/modalSlice"
import { ChartBarIcon, ChatIcon, HeartIcon, TrashIcon, UploadIcon } from "@heroicons/react/outline"
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/solid"
import { arrayRemove, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux"

export default function Tweet({ data, id }) {

    const dispatch = useDispatch()
    const router = useRouter()
    const user  = useSelector(state => state.user)


    const [likes,setLikes] = useState([])
    const [comments,setComments] = useState([]);

    async function deleteTweet(e){
        e.stopPropagation()
        await deleteDoc(doc(db,"posts" ,id))
    }

    // added liking and getting number of likes in the comments and displaying it 
    // and unliking it.

    async function likeComment(e) {
        e.stopPropagation()
        // checking if uid is in the likes array
        // .includes function checks if an element is an array or not
        // i pass in the element user.uid which is a string in this case 
        // if it is in the array it will return true 
        // if it isn't it will return false

        // when i am not signed in and i try to like or comment i DO 
        // NOT WANT THE COMMENT MODAL TO SHOW UP
        // I WANT THE SIGN IN MODAL TO POP UP

        if(!user.username){
            dispatch(openLoginModal())
            return
        }



        if(likes.includes(user.uid)) {
            // if i want to unlike (remove my uid from the likes array)
            await updateDoc(doc(db, "posts", id), {
                //  i am using the arrayRemove method to 
                // remove an element from the array.
                // removing my uid in this case
                likes: arrayRemove(user.uid)

            })
        }
        else {
            await updateDoc(doc(db, "posts", id), {
                // 2nd arguement is what i want to update in this case 
                // i want to update the likes array. 
                likes:arrayUnion(user.uid)
                //  i use the arrayUnion method to add likes
        })

        }
    }

    // functionaility for unliking a post
    //check if the uid is in the likes array if it is then i unlike it (in firebase)
    // if the uid is not in the likes array then i like it
    // i need to use a useEffect
    useEffect(() => {

        if (!id) return
        const unsubscribe = onSnapshot(doc(db,"posts",id),(doc) =>{
            setLikes(doc.data()?.likes)
            setComments(doc.data()?.comments)
        });

        return unsubscribe
    }, [])


    return (
        <div className="border-b border-gray-700 cursor-pointer">
            <TweetHeader
                username={data?.username}
                name={data?.name}
                timestamp={data?.timestamp?.toDate()}
                text={data?.tweet}
                photoUrl={data?.photoUrl}
                image={data?.image}
            />
            <div
            onClick={() => router.push("/" + id)}//i am pushing the id of the tweet.
            className="p-3 ml-16 text-gray-500 flex space-x-14">
                {/* wrapping the chat icon in a div because when i add a comment i want to display how many comments there are. */}
                <div className="flex justify-center items-center space-x-2"
                    onClick={(e) => {
                        e.stopPropagation()//when i press the comment icon i dont get navigated to the comments page

                        if (!user.username){
                            dispatch(openLoginModal())
                            return
                        }
                        dispatch(setCommentTweet({
                            id: id,
                            tweet: data?.tweet,
                            photoUrl: data?.photoUrl,
                            name: data?.name,
                            username: data?.username,
                        }))
                        dispatch(openCommentModal());
                    }}
                >
                    <ChatIcon className="w-5 cursor-pointer hover:text-green-400" />
                    {comments?.length > 0 && <span>{comments.length}</span>}
                </div>

                <div className="flex justify-center items-center space-x-2"
                onClick={likeComment}
                >
                    {/* condititonally rendering the heart icon */}
                    {likes.includes(user.uid) ? (
                    <FilledHeartIcon className="w-5 text-pink-500"/> 
                    ) : ( 
                <HeartIcon className="w-5 cursor-pointer hover:text-pink-400" />
                    )}
                    {/* if likes is more than 0 display the like number */}
                    {likes.length > 0 && <span>{likes.length}</span>}
                </div>
                {user.uid === data?.uid && (<div
                
                className="cursor-pointer hover:text-red-600"
                onClick={deleteTweet}>
                    <TrashIcon className="w-5"/>
                </div>)}
                <ChartBarIcon className="w-5 cursor-not-allowed" />
                <UploadIcon className="w-5 cursor-not-allowed" />
            </div>
        </div>
    );
}

// modifying my tweets so i can display the data this is after i worked on displaying the tweets on postfeed.js
export function TweetHeader({ username, name, timestamp, text, photoUrl, image }) {//accepting props
    //custom component to reuse this component.
    //  exporting it so i can reuse it in other components.
    return (
        <div className="flex space-x-3 p-3  border-gray-700">
            <img className="w-11 h-11 rounded-full object-cover"
                src={photoUrl}
            />
            <div>
                <div className="flex space-x-2 text-gray-500 items-center mb-1">
                    <h1 className="text-white font-bold">{name}</h1>
                    <span>@{username}</span>
                    <div className=" w-1 h-1 bg-gray-500 rounded-full"></div>
                    <Moment fromNow>
                        {timestamp}
                    </Moment>
                </div>

                <span>{text}</span>
                {/* shows me the image in the tweet from tweetInput.js added image prop to TweetHeader  */}

                {/* conditionally rendered image if the image is there */}
                {image
                 && <img className="object-cover rounded-md mt-3 max-h-80 border border-gray-700" src={image} />}
            </div>
        </div>
    )

}


