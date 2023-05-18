import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Moment from "react-moment";
import { useSelector } from "react-redux";

// getting information for the tweet in the server using getServersideprops() function

export async function getServerSideProps(context) {
    //from the context i can get the id of the query
    // i need to get the info from that id
    // i am getting the id by using the context object
    const id = context.query.id// i need to use this to get the tweet info from firebase.

    // with the id above i fetch the data FROM FIREBASE 
    // and get the information of the tweet so i can display it in the component

    // fetching tweet document
    const docRef = doc(db, "posts", id)
    const docSnap = await getDoc(docRef)
    // awaiting cause of asynchronus action
    // accessing data of the docSnap
    const data = docSnap.data()
    // .data is a function in the docSnap that will give me the data

    // now that i have the data i need to format 
    // it BEFORE SENDING IT AS PROPS.
    // because the data has a timestamp that is an object
    // i CANNOT PASS objects in as components that is why it needs to 
    // be formatted before i can pass it down.
    const formattedData = {
        username: data.username,
        name: data.name,
        photoUrl: data.photoUrl,
        text: data.tweet,
        comments: data.comments || null,
        // sometimes when the comments do not exist i want it to be null
        timestamp: JSON.stringify(data.timestamp.toDate())
        //i essentially turned the timestamp into a format 
        //  that moment JS can turn it into the twitter timeStamp 
        // (a few seconds ago)
    }
    return {
        props: {
            tweetData: formattedData
        }
    }

}

//created dynamic route for post page
export default function CommentPage({ tweetData }) {

    //used useSelector hook to get current user image
    const user = useSelector(state => state.user)// for tweet reply bit

    return (
        <div>
            <div className="bg-black min-h-screen text-[#E7E9EA]
    max-w-[1400px] mx-auto flex">
                {/* mx-auto centers my bg-black also ml-auto mr-auto */}
                {/* min-h-screen lets me have my entire background be black  */}
                {/* if i increase the size of screen to 1440px  */}
                {/*  the sidebar is not affected by flex because the sidebar has a position
      of fixed if i have a position of fixed the component doesnt get affected by flex */}
                <Sidebar />

                <div className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow
        border-gray-700 border-x">
                    {/* small breakpoint margin-left of 20
                extra large breakpoint margin-left 96
                max width of the feed to cap the width of the feed */}
                    <div className="px-3 py-2 text-lg sm:text-xl font-bold
                border-b border-gray-700 sticky top-0 z-50 space-x-2 flex">
                        <Link href={"/"}>
                            <ArrowLeftIcon className="w-7 cursor-pointer" />
                        </Link>
                        <h1>
                            Tweet
                        </h1>
                    </div>

                    <div className="border-b border-gray-700">
                        <div className="flex space-x-3 p-3  border-gray-700">
                            <img className="w-11 h-11 rounded-full object-cover"
                                src={tweetData.photoUrl}
                            />
                            <div>
                                <div className="flex space-x-2 text-gray-500 items-center mb-1">
                                    <h1 className="text-white font-bold">{tweetData?.name}</h1>
                                    <span>@{tweetData.username}</span>
                                    <div className=" w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <Moment fromNow>{JSON.parse(tweetData.timestamp)}</Moment>
                                    {/* // the timestamp said invalid date 
                                    because the tweetData.timestamp is
                                    suppose to be an object but it is ACTUALLY A STRING.
                                    so i parse the tweetData.timestamp into an object */}
                                </div>

                                <span className="text-2xl">{tweetData.text}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 p-2">
                        <div className="flex justify-center items-center p-1 space-x-2">
                            <img className="w-12 h-12 rounded-full object-cover" src={user.photoUrl} />
                            <h1 className="text-2xl text-gray-500">Tweet your reply</h1>
                        </div>

                        <button 
                    disabled={true}
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 
                    disabled:opacity-50">
                        Tweet
                    </button>
                    </div>
                </div>

                {/* </div> */}
                <Trending />
            </div>
        </div>
    )
}