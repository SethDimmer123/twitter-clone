import { db, storage } from "@/firebase";
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, XIcon } from "@heroicons/react/outline";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function TweetInput() {
    // writing the function to write the post to the firestore database.

    // getting user from redux store.
    const user = useSelector(state => state.user)

    // created a state for textarea so i can bind it and actually get my tweet.
    const [text, setText] = useState("")

    // adding images to tweets with firebase storage
    // i upload image to storage once its applied to 
    // storage then i display it in my twitter
    const [image, setImage] = useState(null)
    // if a user selects an image then i make the image true
    // if my image state is true then i want to display the
    // image in our div.
    
    // i am using a useRef hook to reference 
    // my input on line() to select a file.
    const filePickerRef = useRef(null)

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
        // checking if the image was uploaded or not.
        // creating a reference to the image and upload it to firebase storage
        if(image){
            // create image ref
            const imageRef = ref(storage, `tweetImages/${docRef.id}`)
                                // passing in 2 arguements storage, 
                                // and a string which is the path to my image in the storage.
                                // using backticks because it is dynamic id of my doc

            // now i have the image ref i need to 
            // upload the image to the firebase storage.

         const uploadImage = await uploadString(imageRef, image, "data_url")
                                    // i use uploadString function
                                    // i pass in 3 things
                                    // imageRef
                                    // image
                                    // and what data format

                // once the image is uploaded to my storage 
         // i want to get the download url of that image to show it in my tweet

         const downloadURL = await getDownloadURL(imageRef)
                                // i pass in my image ref

            // i now want to display it in my tweet 
            // i need to update the sendTweet function 
            // so i can have the image inside the sendTweet function

            await updateDoc(doc(db,"posts", docRef.id), {
                image: downloadURL
            })

        



        }

        setText("")// once i submit a tweet to firebase i want text to be set to an empty string again.

    }
    // this is how i actually select a file and display it on the tweet
    
            function addImagetoTweet(e){
                // i need to open a file reader and 
                // read the image the user just opened and turn it into a URL
                // to display it 
                const reader = new FileReader()
                // i need to check if the user did select a file
                if(e.target.files[0]){
            // if the file does exist then i want to read it as a URL
                    reader.readAsDataURL(e.target.files[0])
                    // choosing the first element from the array.
    
                    // after doing all of this i need to set the URL 
                    // to my image
                }
                reader.addEventListener("load", e =>{
                    setImage(e.target.result)
                })
    }
    return (
        <div className="flex space-x-3 p-3 border-b border-gray-700">
            <img
                className="w-11 h-11 rounded-full object-cover" src={user.photoUrl || "/assets/twitter-logo.png"} />

            <div className="w-full">{/**takes entire width of the div */}
                <textarea
                    placeholder="What's on your mind?"
                    className="bg-transparent resize-none outline-none w-full
                min-h-[50px] text-lg"
                    onChange={e => setText(e.target.value)}
                    value={text
                    // my value is now binded to the text useState
                    } />
            {/* conditionally rendering image if my image is true */}
            {/* if the image is true then i want to show the image */}
                    {image && (
                        <div className=" relative mb-4">
                            <div  onClick={() => setImage(null)}
                            className="absolute top-1 left-1
                                bg-[#272c26] rounded-full w-8 h-8 flex 
                                justify-center items-center cursor-pointer
                                 hover:bg-white hover:bg-opacity-10">
                                <XIcon className="h-5"/>
                            </div>

                            <img 
                            className="rounded-2xl max-h-80 object-contain"
                            src={image} 
                            />
                        </div>
                    )}



                <div className="flex justify-between border-t border-gray-700 pt-4">
                    {/* ICONS DIV */}
                    <div className="flex space-x-0">
                        <div
                        //the onLcick is if i click the input file
                        // have a function then reference the filePicker
                        // .current is for the property inside 
                        // .click is a function so i need to call it
                        onClick={() => filePickerRef.current.click()}
                        className="iconAnimation">
                            <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                        </div>
                        <input 
                        ref={filePickerRef}//ref to reference my useRef hook.
                        onChange={addImagetoTweet}
                        hidden type="file"/>
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
                    //if there is nothing in the textarea then the tweet button is disabled.
                    disabled={!text && !image}//if there is no image the tweet button is disabled
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 
                    disabled:opacity-50">
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    )
}