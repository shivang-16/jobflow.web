import { Search } from "lucide-react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plane } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search query:', query)
  }

  return (
    <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon" className="shrink-0">
            <span className="sr-only">Add attachment</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 5.5.5 7.9 1.4 2.2 3.9 3.6 6.7 3.6h8.7c.7 0 1.3-.2 1.9-.5" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0">
            <span className="sr-only">Add link</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </Button>
          <div className="relative flex-1">
            <Input className="pr-20" placeholder="Ask SayHalo anything..." type="text" />
            <Button className="absolute right-0 top-0 h-full px-4 bg-[#f97366] hover:bg-[#f86453] text-white">
              Send
              <Plane className="w-4 h-4 ml-2" />
            </Button>
          </div>
          </div>
  )
}