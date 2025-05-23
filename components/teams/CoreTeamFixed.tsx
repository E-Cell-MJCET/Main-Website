"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type CoreTeamMember = {
  name: string;
  role: string;
  image: string;
  color: string;
};

// Core team members data with real images and information
const coreTeamMembers: CoreTeamMember[] = [
  {
    name: "Mohammed Aqib Khan",
    role: "Technical",
    image: "/assets/Team/Core/1.jpeg",
    color: "from-yellow-200 to-yellow-100",
  },
  {
    name: "Mohammad AbdulBaseer",
    role: "Technical",
    image: "/assets/Team/Core/2.jpg",
    color: "from-pink-200 to-pink-100",
  },
  {
    name: "Sadia Fatima",
    role: "Technical",
    image: "/assets/Team/Core/3.jpg",
    color: "from-blue-200 to-blue-100",
  },
  {
    name: "Juwairiyyah Ahmed",
    role: "Design",
    image: "/assets/Team/Core/4.jpg",
    color: "from-orange-200 to-orange-100",
  },
  {
    name: "Sobia Amena Aijaz",
    role: "Design",
    image: "/assets/Team/Core/5.jpg",
    color: "from-purple-200 to-purple-100",
  },
  {
    name: "Mohammed Imran",
    role: "Media",
    image: "/assets/Team/Core/6.jpg",
    color: "from-green-200 to-green-100",
  },
  {
    name: "Mohammed Omer",
    role: "Media",
    image: "/assets/Team/Core/7.jpeg",
    color: "from-red-200 to-red-100",
  },
  {
    name: "Rida Ahmed",
    role: "Media",
    image: "/assets/Team/Core/8.jpeg",
    color: "from-teal-200 to-teal-100",
  },
  {
    name: "Syeda Shahakaar",
    role: "Marketing",
    image: "/assets/Team/Core/9.jpg",
    color: "from-indigo-200 to-indigo-100",
  },
  {
    name: "Omar Alam Gir",
    role: "Marketing",
    image: "/assets/Team/Core/10.jpeg",
    color: "from-amber-200 to-amber-100",
  },
  {
    name: "Mohammed Farhan",
    role: "Editorial and Research",
    image: "/assets/Team/Core/11.jpg",
    color: "from-cyan-200 to-cyan-100",
  },
  {
    name: "Hajrah Tahreem",
    role: "Human Resources",
    image: "/assets/Team/Core/12.jpg",
    color: "from-lime-200 to-lime-100",
  },
  {
    name: "Rehmath Unnisa",
    role: "Events",
    image: "/assets/Team/Core/13.jpg",
    color: "from-fuchsia-200 to-fuchsia-100",
  },
  {
    name: "Syed Usaid Minhaj",
    role: "Entrepreneurship Coordinator",
    image: "/assets/Team/Core/14.jpg",
    color: "from-rose-200 to-rose-100",
  },
];

const CoreTeamCard = ({ member }: { member: CoreTeamMember }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Extract solid color from gradient for top part
  const solidColor = member.color.includes("yellow")
    ? "bg-yellow-100"
    : member.color.includes("pink")
      ? "bg-pink-100"
      : member.color.includes("blue")
        ? "bg-blue-100"
        : member.color.includes("orange")
          ? "bg-orange-100"
          : member.color.includes("purple")
            ? "bg-purple-100"
            : member.color.includes("green")
              ? "bg-green-100"
              : member.color.includes("red")
                ? "bg-red-100"
                : member.color.includes("teal")
                  ? "bg-teal-100"
                  : member.color.includes("indigo")
                    ? "bg-indigo-100"
                    : member.color.includes("amber")
                      ? "bg-amber-100"
                      : member.color.includes("cyan")
                        ? "bg-cyan-100"
                        : member.color.includes("lime")
                          ? "bg-lime-100"
                          : member.color.includes("fuchsia")
                            ? "bg-fuchsia-100"
                            : member.color.includes("rose")
                              ? "bg-rose-100"
                              : "bg-gray-100";

  return (
    <div
      className="relative mx-auto h-[400px] w-full cursor-pointer"
      style={{
        maxWidth: "250px",
        borderRadius: "100px",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative size-full"
        style={{ borderRadius: "100px", overflow: "hidden" }}
      >
        {/* Top element with name and role - only visible on hover */}
        <motion.div
          className={`absolute top-0 z-10 ${solidColor} text-center`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "105px" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{
            overflow: "hidden",
            transformOrigin: "top",
            borderTopLeftRadius: "100px",
            borderTopRightRadius: "100px",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
            marginBottom: "-1px",
            width: "100%",
            left: "0",
            right: "0",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center px-3">
            <h3 className="text-md px-1 font-semibold leading-tight text-gray-800">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{member.role}</p>
          </div>
        </motion.div>
        {/* Image container */}
        <motion.div
          className="absolute top-0 overflow-hidden"
          animate={{
            scale: isHovered ? 1 : 1,
            y: isHovered ? "105px" : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          style={{
            width: "100%",
            borderRadius: "100px",
            borderTopLeftRadius: isHovered ? "0" : "100px",
            borderTopRightRadius: isHovered ? "0" : "100px",
            marginTop: "-1px",
            left: "0",
            right: "0",
          }}
        >
          <div
            className="relative aspect-[1/1.6] w-full overflow-hidden"
            style={{
              borderRadius: "100px",
              borderTopLeftRadius: isHovered ? "0" : "100px",
              borderTopRightRadius: isHovered ? "0" : "100px",
              marginTop: "0",
              lineHeight: "0",
              width: "100%",
            }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
              style={{
                borderRadius: "inherit",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function CoreTeamComponent() {
  return (
    <div className="min-h-screen bg-black px-4 py-12 text-gray-100">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">Core Team</h1>
          <p className="text-xl text-gray-300">
            Meet our dedicated core team members who drive our initiatives
            forward.
          </p>
        </div>
        {/* Team Members Grid - Updated to always show 5 columns at larger screens with increased spacing */}
        <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          {coreTeamMembers.map((member, index) => (
            <div key={index} className="flex justify-center px-2">
              <CoreTeamCard member={member} />
            </div>
          ))}
        </div>
        {/* Add some spacing at the bottom */}
        <div className="h-24"></div>
      </div>
    </div>
  );
}
