'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
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
  "Human Resource",
  "Events",
  "EC",
  "Design",
  "Editorial and Research",
  "Media",
  "Marketing",
  "Operations",
]

const teamMembers: TeamMember[] = [
  // Technical Department
  {
    name: "Aayan Sayed",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Aayan/Aayan.jpg",
    gif: "/assets/Team/Execom/Technical/Aayan/gif.gif"
  },
  {
    name: "Syed Abdul Muneeb",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    gif: "/assets/Team/Execom/Technical/Muneeb/Muneeb.gif"
  },
  {
    name: "Syed Adnan Ali",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Adnan/Adnan.jpg",
    gif: "/assets/Team/Execom/Technical/Adnan/Adnan.gif"
  },
  {
    name: "Neha Anjum",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Neha/Neha.jpg",
    gif: "/assets/Team/Execom/Technical/Neha/Neha.gif"
  },
  // Entrepreneurship Department
  {
    name: "Saifuddin Syed",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Saif/Saif.jpg",
    gif: "/assets/Team/Execom/Entrepreneurship/Saif/Saifuddin.webp"
  },
  {
    name: "Saleha Baseer",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Saleha/Saleha.jpg",
    gif: "/assets/Team/Execom/Entrepreneurship/Saleha/Saleha.webp"
  },
  {
    name: "Nooria Yousuf",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Nooria/Nooria.jpeg",
    gif: "/assets/Team/Execom/Entrepreneurship/Nooria/Nooria.webp"
  },
  {
    name: "Mohammed Rayyan Ali",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Rayyan/Rayyan.jpg",
    gif: "/assets/Team/Execom/Entrepreneurship/Rayyan/Rayyan.webp"
  },
  // Human Resource Department
  {
    name: "Afra Ahmed",
    role: "Human Resource Head",
    department: "Human Resource",
    image: "/assets/Team/Execom/HR/Afra/Afra.jpg",
    gif: "/assets/Team/Execom/HR/Afra/Afra.gif"
  },
  {
    name: "Md. Faizullah Shareef",
    role: "Human Resource Head",
    department: "Human Resource",
    image: "/assets/Team/Execom/HR/Faizullah/Faizullah.jpg",
    gif: "/assets/Team/Execom/HR/Faizullah/Faizullah.gif"
  },
  // Relations and Outreach Department
  {
    name: "Syed Alyan Ahmed",
    role: "Relations and Outreach Head",
    department: "Relations and Outreach",
    image: "/assets/Team/Execom/Relations/Alyan/Alyan.jpg",
    gif: "/assets/Team/Execom/Relations/Alyan/Alyan.gif"
  },
  {
    name: "Faiz Ali",
    role: "Relations and Outreach Head",
    department: "Relations and Outreach",
    image: "/assets/Team/Execom/Relations/Faiz/Faiz.jpg",
    gif: "/assets/Team/Execom/Relations/Faiz/Faiz.gif"
  },
  // Design Department
  {
    name: "Afzal Hashmi",
    role: "Design Head",
    department: "Design",
    image: "/assets/Team/Execom/Design/Afzal/Afzal2.jpg",
    gif: "/assets/Team/Execom/Design/Afzal/Afzal.gif"
  },
  {
    name: "Shafiya Khanam",
    role: "Design Head",
    department: "Design",
    image: "/assets/Team/Execom/Design/Shafiya/Shafiya.webp",
    gif: "/assets/Team/Execom/Design/Shafiya/Shafiya.gif"
  },
  {
    name: "Namirah Fathima",
    role: "Design Head",
    department: "Design",
    image: "/assets/Team/Execom/Design/Namirah/Namirah.jpg",
    gif: "/assets/Team/Execom/Design/Namirah/Namirah.gif"
  },
  // Editorial and Research Department
  {
    name: "Rukhaiya Begum",
    role: "Editorial and Research Head",
    department: "Editorial and Research",
    image: "/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.jpg",
    gif: "/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.gif"
  },
  {
    name: "Nazmeen Sultana",
    role: "Editorial and Research Head",
    department: "Editorial and Research",
    image: "/assets/Team/Execom/Editorial/Nazmeen/Nazmeen.jpg",
    gif: "/assets/Team/Execom/Editorial/Nazmeen/Nazmeen.gif"
  },
  // Media Department
  {
    name: "Noor Asad",
    role: "Media Head",
    department: "Media",
    image: "/assets/Team/Execom/Media/Noor/Noor.JPG",
    gif: "/assets/Team/Execom/Media/Noor/Noor.gif"
  },
  {
    name: "Abdul Rahman Hanzala",
    role: "Media Head",
    department: "Media",
    image: "/assets/Team/Execom/Media/Hanzala/Hanzala.heif",
    gif: "/assets/Team/Execom/Media/Hanzala/Hanzala.gif"
  },
  {
    name: "Farzeen Naveed",
    role: "Media Head",
    department: "Media",
    image: "/assets/Team/Execom/Media/Farzeen/Farzeen.jpg",
    gif: "/assets/Team/Execom/Media/Farzeen/Farzeen.gif"
  },
  // Marketing Department
  {
    name: "Safwan Nisar Ahmed",
    role: "Marketing Head",
    department: "Marketing",
    image: "/assets/Team/Execom/Marketing/Safwan/Safwan.jpeg",
    gif: "/assets/Team/Execom/Marketing/Safwan/Safwan.gif"
  },
  {
    name: "Abdur Raheem",
    role: "Marketing Head",
    department: "Marketing",
    image: "/assets/Team/Execom/Marketing/Raheem/Raheem.jpg",
    gif: "/assets/Team/Execom/Marketing/Raheem/Raheem.gif"
  },
  // Events Department
  {
    name: "Amena Wajiha",
    role: "Events Head",
    department: "Events",
    image: "/assets/Team/Execom/Events/Amena/Amena.jpg",
    gif: "/assets/Team/Execom/Events/Haseeb/Amena.gif"
  },
  {
    name: "Haseeb Rahman",
    role: "Events Head",
    department: "Events",
    image: "/assets/Team/Execom/Events/Haseeb/Haseeb.jpg",
    gif: "/assets/Team/Execom/Events/Haseeb/Haseeb.gif"
  },
  // Operations Department
  {
    name: "Md. Umar Salam",
    role: "Operations Head",
    department: "Operations",
    image: "/assets/Team/Execom/Operations/Umar/Umar.jpeg",
    gif: "/assets/Team/Execom/Operations/Umar/Umar.gif"
  },
  {
    name: "Aziz Ur Rahman",
    role: "Operations Head",
    department: "Operations",
    image: "/assets/Team/Execom/Operations/Aziz/Aziz.jpeg",
    gif: "/assets/Team/Execom/Operations/Aziz/Aziz.gif"
  }
]

export default function TeamComponent() {
  const [filter, setFilter] = useState<Category>("All")
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)
  const [showGif, setShowGif] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (hoveredMember) {
      setShowGif(true)
      interval = setInterval(() => {
        setShowGif(prev => !prev)
      }, 3000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
      setShowGif(false)
    }
  }, [hoveredMember])

  const handleMouseEnter = (name: string) => {
    setHoveredMember(name)
  }

  const handleMouseLeave = () => {
    setHoveredMember(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12 text-gray-100">
      <div className="mx-auto max-w-7xl">
        {/* Header Section with updated gradient effect */}
        <div className="mb-16 text-center">
          <h1 className="gradient-text mb-4 text-6xl font-bold tracking-tight">
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
                className={`rounded-full transition-all duration-300 ${
                  filter === category ? 'bg-blue-600 hover:bg-blue-700' : 'hover:bg-gray-400'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        {/* Team Members Grid */}
        <div className="gap-8 flex flex-wrap justify-center">
          {teamMembers
            .filter(member => filter === "All" || member.department === filter)
            .map((member) => (
              <div 
                key={member.name}
                className="gradient-card p-1 rounded-xl"
              >
                <div className="gradient-card-content rounded-lg overflow-hidden">
                  <div className="w-[280px]">
                    <div className="relative">
                      <Image
                        width={280}
                        height={320}
                        src={hoveredMember === member.name && showGif ? member.gif : member.image}
                        alt={member.name}
                        className="h-[320px] w-full object-cover"
                        onMouseEnter={() => handleMouseEnter(member.name)}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-4 p-6 bg-gray-800">
                      <h3 className="text-center text-xl font-semibold text-gray-100">
                        {member.name}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-600/20 px-2 py-1 text-center text-base text-blue-400 hover:bg-blue-600/30"
                      >
                        {member.department}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}