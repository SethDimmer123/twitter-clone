import {
    HomeIcon,
    HashtagIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    BellIcon,
    UserIcon,
    DotsCircleHorizontalIcon
    } from "@heroicons/react/outline"
    import Image from "next/image"
    
    export default function Sidebar() {
        return <>
        <div className="hidden sm:flex flex-col fixed">{/**sidebar will not move when i scroll */}
            {/**by default sidebar is hidden */}
            {/* when the screen reaches the min width of 640px the sidebar appears  */}
    
            <nav className="xl:space-y-1.5">
            <div className="flex justify-center xl:justify-start items-center py-3 xl:p-3">
                {/* the padding disappeared when transfer to smaller screen
                thats why i added py-3 since i am STARTING FROM SMALLER SCREEN */}
                <Image src={"/assets/twitter-logo.png"} width={34} height={34} />
    
            </div>
            {/**the space class adds margin to everything 
             * except for the first component which is home to fix it i added
             * my logo to my nav
             */}
                <SidebarLink Icon={HomeIcon} text={"Home"}/>
                <SidebarLink Icon={HashtagIcon} text={"Explore"}/>
                <SidebarLink Icon={BellIcon} text={"Notifications"}/>
                <SidebarLink Icon={InboxIcon} text={"Message"}/>
                <SidebarLink Icon={BookmarkIcon} text={"Bookmarks"}/>
                <SidebarLink Icon={UserIcon} text={"Profile"}/>
                <SidebarLink Icon={DotsCircleHorizontalIcon} text={"More"}/>
            <div>User</div>
            </nav>
        </div>
        </>
    }
    
    // making my own component for the sidebar links 
    // so i can have my links with any text i want.
    
    // for my icons i use a package called heroicons.
    function SidebarLink({text,Icon}){
        return(
            <li className=" hoverAnimation flex mb-3 xl:justify-start justify-center items-center text-xl space-x-3">
                <Icon className="h-7"/> 
                {/** icon needs to be a component because i cannot have objects */}
                <span className="hidden xl:inline">{text}</span>
                {/* wrapping text in a span since i want it to be hidden since 
                i am styling smaller screens first */}
                {/* when the screen is big the text appears 
                but when it is smaller than the xl breakpoint the text disappears */}
            </li>
        )
    }