import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Tweet from "./Tweet";
import TweetInput from "./TweetInput";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostsFeed() {

    const [tweets, setTweets] = useState([])//i have this useState to store my tweets.

    // my tweets is an array full of my docs

    //WORKING ON DISPLAYING MY TWEETS
    // useEffect and snapShot to get all the posts from my collection.

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("timestamp","desc"))
        // gets all the posts and order them in descending order.
        // q is for query

        const unsubscribed = onSnapshot(q, (snapshot) => {
            //the snapshot has all the documents
            setTweets(snapshot.docs)
            //snapshot.docs is an array of all of my docs
            // i am setting setTweets to be the snapshot.docs array
        }) 

        return unsubscribed//this is so i do not always have the listener on. 
    }, [])


    return (//flex-grow makes sure the feed takes up most of the space
        <div className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow
        border-gray-700 border-x">
            {/* small breakpoint margin-left of 20
                extra large breakpoint margin-left 96
                max width of the feed to cap the width of the feed */}
                <div className="px-3 py-2 text-lg sm:text-xl font-bold
                border-b border-gray-700 sticky top-0 z-50">
                    Home
                </div>
                <TweetInput />

                {/* map the tweets */}

                {tweets.map(tweet => {
                    return (
                        // instead of returning the tweet like 
                        // before i wrap it with link component.
                        <Link href={tweet.id} key={tweet.id}>
                        <Tweet id={tweet.id} data={tweet.data()}/>
                        </Link>
                        //now when i click on the tweet i go to / the id of that tweet
                        // because of the context object from the context object i get the id
                        // const id = context.query.id in [id].js
                    )
                })}

                {/* <Tweet /> */}
        </div>
    )
}