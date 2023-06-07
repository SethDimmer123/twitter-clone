import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsFeed() {

    const [tweets, setTweets] = useState([])




    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("timestamp","desc"))


        const unsubscribed = onSnapshot(q, (snapshot) => {
            setTweets(snapshot.docs)

        }) 

        return unsubscribed
    }, [])


    return (
        <div className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow
        border-gray-700 border-x">
                <div className="px-3 py-2 text-lg sm:text-xl font-bold
                border-b border-gray-700 sticky top-0 z-50">
                    Home
                </div>
                <TweetInput />

                {/* map the tweets */}

                {tweets.map(tweet => {
                    return (
                        <Tweet key={tweet.id} id={tweet.id} data={tweet.data()}/>
                    )
                })}

                {/* <Tweet /> */}
        </div>
    )
}