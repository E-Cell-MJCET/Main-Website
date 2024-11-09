'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Category = string

type TeamMember = {
  name: string
  role: string
  department: string
  image: string
  gif: string
}

const categories: Category[] = [
  "All",
  "Technical",
  "Relations and Outreach",
  "HR",
  "Events",
  "Entrepreneurship Coordinator",
  "Design",
  "Editorial and Research",
  "Media",
  "Marketing",
  "Outreach"
]

const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "Lead Developer",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Aayan/Aayan.jpg",
    gif: "/assets/Team/Execom/Technical/Aayan/gif.gif"
  },
  {
    name: "Sarah Miller",
    role: "PR Manager",
    department: "Relations and Outreach",
    image: "/api/placeholder/240/320",
    gif: "/api/gif/240/320"
  },
  {
    name: "James Wilson",
    role: "Design Lead",
    department: "Design",
    image: "/api/placeholder/240/320",
    gif: "/api/gif/240/320"
  },
  {
    name: "Maria Garcia",
    role: "Marketing Director",
    department: "Marketing",
    image: "/api/placeholder/240/320",
    gif: "/api/gif/240/320"
  }
]

const TeamComponent = () => {
  const [filter, setFilter] = useState<Category>("All")
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const handleMouseEnter = (name: string) => {
    setHoveredMember(name)
    setTimeout(() => setHoveredMember(null), 7000) // Reset after 3 seconds
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12 text-gray-100">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent">
            Exe-Com
          </h1>
          <p className="text-xl text-gray-400">
            These are the people that make the magic happen.
          </p>
        </div>
        {/* Filter Buttons */}
        <div className="mb-16 flex flex-wrap justify-center gap-2">
          <div className="flex flex-wrap justify-center gap-2 rounded-lg bg-gray-800/50 p-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "secondary"}
                className={`rounded-full transition-all duration-300 ${filter === category ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-400'}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers
            .filter(member => filter === "All" || member.department === filter)
            .map((member) => (
              <Card 
                key={member.name}
                className="overflow-hidden border-0 bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="p-0">
                  <Image
                    width={240}
                    height={320}
                    src={hoveredMember === member.name ? member.gif : member.image}
                    alt={member.name}
                    className="h-[320px] w-full object-cover"
                    onMouseEnter={() => handleMouseEnter(member.name)}
                    onMouseLeave={() => setHoveredMember(null)}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-100">{member.name}</h3>
                  <p className="mb-3 text-gray-400">{member.role}</p>
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                  >
                    {member.department}
                  </Badge>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
export default TeamComponent