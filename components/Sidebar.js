import { auth } from "@/firebase"
import { signOutUser } from "@/redux/userSlice"
import {
    HomeIcon,
    HashtagIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    BellIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon
} from "@heroicons/react/outline"
import { signOut } from "firebase/auth"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"

export default function Sidebar() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)// this makes the username dynamic

    async function handleSignOut() {
        await signOut(auth)
        dispatch(signOutUser())
    }



    return <>
        <div className=" h-full hidden sm:flex flex-col fixed xl:ml-24">{/**sidebar will not move when i scroll */}
            {/* h-full helps me make sidebar take up 100% of the height of the page puts the user at bottom of page */}
            {/**by default sidebar is hidden */}
            {/* when the screen reaches the min width of 640px the sidebar appears  */}

            <nav className="h-full relative xl:space-y-1.5">
                {/* h-full means making the height 100% of the div on line 15 */}
                <div className="flex justify-center xl:justify-start items-center py-3 xl:p-3">
                    {/* the padding disappeared when transfer to smaller screen
                thats why i added py-3 since i am STARTING FROM SMALLER SCREEN */}
                    <Image src={"/assets/twitter-logo.png"} width={34} height={34} />

                </div>
                {/**the space class adds margin to everything 
             * except for the first component which is home to fix it i added
             * my logo to my nav
             */}
                <SidebarLink Icon={HomeIcon} text={"Home"} />
                <SidebarLink Icon={HashtagIcon} text={"Explore"} />
                <SidebarLink Icon={BellIcon} text={"Notifications"} />
                <SidebarLink Icon={InboxIcon} text={"Message"} />
                <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"} />
                <SidebarLink Icon={UserIcon} text={"Profile"} />
                <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"} />
                <button className=" hidden xl:inline bg-[#1d9bf0] 
                rounded-full h-[52px] mt-2 w-[200px] text-lg font-bold">
                    {/* in large breakpoint i see the button */}
                    Tweet
                </button>
                <div
                
                onClick={handleSignOut}
                className="
                bottom-0
                hover:bg-white hover:bg-opacity-10 rounded-full cursor-pointer
                absolute xl:p-3 flex justify-center items-center space-x-3">
                    <img className="w-10 h-10 rounded-full object-cover" src={user.photoUrl|| "/assets/kylie.png"} />
                    <div className="hidden xl:inline">
                        <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
                        {/* if the name is too big the name 
                        will not start a new line just take up the whole space. */}
                        <h1 className="text-gray-500">@{user.username}</h1>
                    </div>
                    <DotsHorizontalIcon className="h-5 hidden xl:inline" />
                </div>
            </nav>
        </div>
    </>
}

// making my own component for the sidebar links 
// so i can have my links with any text i want.

// for my icons i use a package called heroicons.
function SidebarLink({ text, Icon }) {
    return (
        <li className=" hoverAnimation flex mb-3 xl:justify-start justify-center items-center text-xl space-x-3">
            <Icon className="h-7" />
            {/** icon needs to be a component because i cannot have objects */}
            <span className="hidden xl:inline">{text}</span>
            {/* wrapping text in a span since i want it to be hidden since 
                i am styling smaller screens first */}
            {/* when the screen is big the text appears 
                but when it is smaller than the xl breakpoint the text disappears */}
        </li>
    )
}