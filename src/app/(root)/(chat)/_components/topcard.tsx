import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Plane, Hand, X } from "lucide-react"

interface TopicCardProps {
  icon: ReactNode
  title: string
  subtitle: string
}

export default function TopicCard() {
  return (
    <div className="max-w-[70%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <div className="bg-gray-800 p-2 rounded-lg">
          <Plane className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-sm">Wanderlust Destinations 2024</h3>
          <p className="text-xs text-gray-500">Must-Visit Places</p>
        </div>
      </div>
    </Card>
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <div className="bg-gray-800 p-2 rounded-lg">
          <Hand className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-sm">SayHalo AI: What Sets Us Apart</h3>
          <p className="text-xs text-gray-500">Key Differentiators</p>
        </div>
      </div>
    </Card>
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3">
        <div className="bg-gray-800 p-2 rounded-lg">
          <X className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-sm">Design Trends on TikTok 2024</h3>
          <p className="text-xs text-gray-500">Trending Now</p>
        </div>
      </div>
    </Card>
  </div>
  )
}