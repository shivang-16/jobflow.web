// import Logo from './logo'
// import UserProfile from './user-profile'
"use client"
import SearchBar from './_components/searchbar'
import { Plane, Hand, Percent } from "lucide-react"
import TopicCard from './_components/topcard'

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#f3e8ff] via-[#fce7f3] to-white p-4">
      <header className="w-full flex gap-[20px] items-center mb-2">
      <img 
            src="/logo.png" // Replace with the path to your logo
            alt="Company Logo" 
            className="h-[40px] rounded-lg"
          />
          <h1 className='text-2xl text-gray-700 font-semibold '>JobFlow</h1>
        {/* <UserProfile /> */}
      </header>
      <div className="text-center mb-16">
          <div className="bg-gray-800 text-white p-3 rounded-xl inline-flex mb-6">
            <Hand className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-400">Hi, Username</h1>
          <h2 className="text-[40px] font-semibold text-gray-700 mb-2">Can I help you with Job Scouting ?</h2>
          <p className="text-gray-600 text-[16px] font-medium max-w-md mx-auto">
            Ready to assist you with Job Applications, from searching to Applying. Let's get
            started!
          </p>
        </div>
        <TopicCard/>
        <footer className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-[70%]">
  <SearchBar />
</footer>

    </div>
  )
}