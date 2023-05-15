import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import PostFeed from '@/components/Postfeed'
import Trending from '@/components/Trending'
import Bottombanner from '@/components/BottomBanner'
import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const username = useSelector(state => state.user.username)
  console.log(username)
  {
/* this div below is the parent of my components 
that is why display flex works  */}
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
        <PostFeed />
        <Trending />
      </div>

      {!username && <Bottombanner />}
      {/* i only want to display this banner if the username is null */}
      {/* if the username does not exist only then do i want to show the bottom banner to show */}
    </div>
  )
}

// for tailwind css i always make for mobile first meaning make the smaller-screen
// then the bigger screen