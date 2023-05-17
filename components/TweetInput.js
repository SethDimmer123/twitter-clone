import { db } from "@/firebase";
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon } from "@heroicons/react/outline";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TweetInput() {
    // writing the function to write the post to the firestore database.

    // getting user from redux store.
    const user = useSelector(state => state.user)

    // created a state for textarea so i can bind it and actually get my tweet.
    const [text, setText] = useState("")


    //i have the text but now i have to send it over to my firestore database. 
    async function sendTweet() {
        // adding documents to firebase this how i do it.
        const docRef = await addDoc(collection(db, "posts"), {
            //i pass in where i want the document to be in i use function called collection.
            // i pass in my database in the collection and name the collection "posts".
            // the 2nd arguement of addDoc is an object of what i want to put in the doc

            // in this case i want to out the tweet details 
            // who did the tweet 
            // what time 
            // the amount of likes and comments and so on.

            // i get the user from the redux store.

            username: user.username,
            name: user.name,
            photoUrl: user.photoUrl,
            uid: user.uid,
            // function i got from firebase gives me timestamp of when the document was uploaded
            timestamp: serverTimestamp(),
            likes: [],
            tweet:text//text is the actual tweet

        })
        setText("")// once i submit a tweet to firebase i want text to be set to an empty string again.
    }
    return (
        <div className="flex space-x-3 p-3 border-b border-gray-700">
            <img
                className="w-11 h-11 rounded-full object-cover" src="/assets/kylie.png" />

            <div className="w-full">{/**takes entire width of the div */}
                <textarea
                    placeholder="What's on your mind?"
                    className="bg-transparent resize-none outline-none w-full
                min-h-[50px] text-lg"
                    onChange={e => setText(e.target.value)}
                    value={text
                    // my value is now binded to the text useState
                    } />



                <div className="flex justify-between border-t border-gray-700 pt-4">
                    {/* ICONS DIV */}
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
                    onClick={sendTweet}
                    disabled={!text}//if there is nothing in the textarea then the tweet button is disabled.
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 
                    disabled:opacity-50">
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    )
}