import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-[#E7E9EA]
    max-w-[1400px] mx-auto">
      {/* mx-auto centers my bg-black also ml-auto mr-auto */}
      {/* min-h-screen lets me have my entire background be black  */}
      {/* if i increase the size of screen to 1440px  */}
    <Sidebar/>
    {/* <PostsFeed/> */}
    {/* <Trending/> */}
    </div>
  )
}

// for tailwind css i always make for mobile first meaning make the smaller-screen
// then the bigger screen