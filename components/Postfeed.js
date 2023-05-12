import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

export default function PostsFeed() {
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

                <Tweet />
        </div>
    )
}