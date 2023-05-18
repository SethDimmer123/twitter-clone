import { openCommentModal, setCommentTweet } from "@/redux/modalSlice"
import { ChartBarIcon, ChatIcon, HeartIcon, UploadIcon } from "@heroicons/react/outline"
import Moment from "react-moment"
import { useDispatch } from "react-redux"
export default function Tweet({ data,id }) {

    const dispatch = useDispatch()
    return (
        <div className="border-b border-gray-700">
            <TweetHeader
                username={data?.username}
                name={data?.name}
                timestamp={data?.timestamp?.toDate()}
                text={data?.tweet}
                photoUrl={data?.photoUrl}
            />
            <div className="p-3 ml-16 text-gray-500 flex space-x-14">
                {/* wrapping the chat icon in a div because when i add a comment i want to display how many comments there are. */}
                <div
                    onClick={() => {
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
                </div>
                <HeartIcon className="w-5 cursor-pointer hover:text-pink-400" />
                <ChartBarIcon className="w-5 cursor-not-allowed" />
                <UploadIcon className="w-5 cursor-not-allowed" />
            </div>
        </div>
    );
}

// modifying my tweets so i can display the data this is after i worked on displaying the tweets on postfeed.js
export function TweetHeader({ username, name, timestamp, text, photoUrl }) {//accepting props
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
            </div>
        </div>
    )

}