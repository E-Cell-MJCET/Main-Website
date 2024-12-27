"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Category = string;

type TeamMember = {
  name: string;
  role: string;
  department: string;
  image: string;
  gif: string;
  link: string;
};

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
];

const teamMembers: TeamMember[] = [
  // Technical Department
  {
    name: "Aayan Sayed",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Aayan/Aayan.jpg",
    gif: "/assets/Team/Execom/Technical/Aayan/gif.gif",
    link: "",
  },
  {
    name: "Syed Abdul Muneeb",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    gif: "/assets/Team/Execom/Technical/Muneeb/Muneeb.gif",
    link: "",
  },
  {
    name: "Syed Adnan Ali",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Adnan/Adnan.jpg",
    gif: "/assets/Team/Execom/Technical/Adnan/Adnan.gif",
    link: "",
  },
  {
    name: "Neha Anjum",
    role: "Technical Team Head",
    department: "Technical",
    image: "/assets/Team/Execom/Technical/Neha/Neha.jpg",
    gif: "/assets/Team/Execom/Technical/Neha/Neha.gif",
    link: "",
  },
  // Entrepreneurship Department
  {
    name: "Saifuddin Syed",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Saif/Saif.jpg",
    gif: "/assets/Team/Execom/Entrepreneurship/Saif/Saifuddin.webp",
    link: "",
  },
  {
    name: "Saleha Baseer",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Saleha/Saleha.jpg",
    gif: "/assets/Team/Execom/Entrepreneurship/Saleha/Saleha.webp",
    link: "",
  },
  {
    name: "Nooria Yousuf",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Nooria/Nooria.jpeg",
    gif: "/assets/Team/Execom/Entrepreneurship/Nooria/Nooria.webp",
    link: "",
  },
  {
    name: "Mohammed Rayyan Ali",
    role: "Entrepreneurship Coordinator Head",
    department: "EC",
    image: "/assets/Team/Execom/Entrepreneurship/Rayyan/Rayyan.jpg",
    gif: "/assets/Team/Execom/Entrepreneurship/Rayyan/Rayyan.webp",
    link: "",
  },
  // Human Resource Department
  {
    name: "Afra Ahmed",
    role: "Human Resource Head",
    department: "Human Resource",
    image: "/assets/Team/Execom/HR/Afra/Afra.jpg",
    gif: "/assets/Team/Execom/HR/Afra/Afra.gif",
    link: "",
  },
  {
    name: "Md. Faizullah Shareef",
    role: "Human Resource Head",
    department: "Human Resource",
    image: "/assets/Team/Execom/HR/Faizullah/Faizullah.jpg",
    gif: "/assets/Team/Execom/HR/Faizullah/Faizullah.gif",
    link: "",
  },
  // Relations and Outreach Department
  {
    name: "Syed Alyan Ahmed",
    role: "Relations and Outreach Head",
    department: "Relations and Outreach",
    image: "/assets/Team/Execom/Relations/Alyan/Alyan.jpg",
    gif: "/assets/Team/Execom/Relations/Alyan/Alyan.gif",
    link: "",
  },
  {
    name: "Faiz Ali",
    role: "Relations and Outreach Head",
    department: "Relations and Outreach",
    image: "/assets/Team/Execom/Relations/Faiz/Faiz.jpg",
    gif: "/assets/Team/Execom/Relations/Faiz/Faiz.gif",
    link: "",
  },
  // Design Department
  {
    name: "Afzal Hashmi",
    role: "Design Head",
    department: "Design",
    image: "/assets/Team/Execom/Design/Afzal/Afzal2.jpg",
    gif: "/assets/Team/Execom/Design/Afzal/Afzal.gif",
    link: "",
  },
  {
    name: "Shafiya Khanam",
    role: "Design Head",
    department: "Design",
    image: "/assets/Team/Execom/Design/Shafiya/Shafiya.webp",
    gif: "/assets/Team/Execom/Design/Shafiya/Shafiya.gif",
    link: "",
  },
  {
    name: "Namirah Fathima",
    role: "Design Head",
    department: "Design",
    image: "/assets/Team/Execom/Design/Namirah/Namirah.jpg",
    gif: "/assets/Team/Execom/Design/Namirah/Namirah.gif",
    link: "",
  },
  // Editorial and Research Department
  {
    name: "Rukhaiya Begum",
    role: "Editorial and Research Head",
    department: "Editorial and Research",
    image: "/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.jpg",
    gif: "/assets/Team/Execom/Editorial/Rukhaiya/Rukhaiya.gif",
    link: "/profile/rukhaiya",
  },
  {
    name: "Nazmeen Sultana",
    role: "Editorial and Research Head",
    department: "Editorial and Research",
    image: "/assets/Team/Execom/Editorial/Nazmeen/Nazmeen.jpg",
    gif: "/assets/Team/Execom/Editorial/Nazmeen/Nazmeen.gif",
    link: "/profile/nazmeen",
  },
  // Media Department
  {
    name: "Noor Asad",
    role: "Media Head",
    department: "Media",
    image: "/assets/Team/Execom/Media/Noor/Noor.JPG",
    gif: "/assets/Team/Execom/Media/Noor/Noor.gif",
    link: "",
  },
  {
    name: "Farzeen Naveed",
    role: "Media Head",
    department: "Media",
    image: "/assets/Team/Execom/Media/Farzeen/Farzeen.jpg",
    gif: "/assets/Team/Execom/Media/Farzeen/Farzeen.gif",
    link: "",
  },
  // Marketing Department
  {
    name: "Safwan Nisar Ahmed",
    role: "Marketing Head",
    department: "Marketing",
    image: "/assets/Team/Execom/Marketing/Safwan/Safwan.jpeg",
    gif: "/assets/Team/Execom/Marketing/Safwan/Safwan.gif",
    link: "",
  },
  // Events Department
  {
    name: "Amena Wajiha",
    role: "Events Head",
    department: "Events",
    image: "/assets/Team/Execom/Events/Amena/Amena.jpg",
    gif: "/assets/Team/Execom/Events/Haseeb/Amena.gif",
    link: "",
  },
  {
    name: "Haseeb Rahman",
    role: "Events Head",
    department: "Events",
    image: "/assets/Team/Execom/Events/Haseeb/Haseeb.jpg",
    gif: "/assets/Team/Execom/Events/Haseeb/Haseeb.gif",
    link: "",
  },
  // Operations Department
  {
    name: "Md. Umar Salam",
    role: "Operations Head",
    department: "Operations",
    image: "/assets/Team/Execom/Operations/Umar/Umar.jpeg",
    gif: "/assets/Team/Execom/Operations/Umar/Umar.gif",
    link: "",
  },
]

export default function TeamComponent() {
  const [filter, setFilter] = useState<Category>("All");
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (hoveredMember) {
      setShowGif(true);
      interval = setInterval(() => {
        setShowGif((prev) => !prev);
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      setShowGif(false);
    };
  }, [hoveredMember]);

  const handleMouseEnter = (name: string) => {
    setHoveredMember(name);
  };

  const handleMouseLeave = () => {
    setHoveredMember(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#685797] px-4 py-12 text-gray-100">
      <div className="mx-auto max-w-7xl">
        {/* Header Section with updated gradient effect */}
        <div className="mb-16 text-center">
          <h1 className=" mb-4 text-6xl font-bold tracking-tight">Execom</h1>
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
                  filter === category
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "hover:bg-gray-400"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        {/* Team Members Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers
            .filter(
              (member) => filter === "All" || member.department === filter
            )
            .map((member) => (
              <Link
                href={member.link}
                key={member.name}
                className="rounded-xl p-1 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="overflow-hidden rounded-lg">
                  <div className="w-[280px]">
                    <div className="group relative">
                      <Image
                        width={280}
                        height={320}
                        unoptimized
                        src={
                          hoveredMember === member.name && showGif
                            ? member.gif
                            : member.image
                        }
                        alt={member.name}
                        className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onMouseEnter={() => handleMouseEnter(member.name)}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-4 bg-gray-800 p-6 transition-opacity duration-300 group-hover:opacity-90">
                      <h3 className="text-center text-xl font-semibold text-gray-100">
                        {member.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-blue-600/20 px-2 py-1 text-center text-base text-blue-400 transition-all duration-300 hover:scale-105 hover:bg-blue-600/50"
                      >
                        {member.department}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
