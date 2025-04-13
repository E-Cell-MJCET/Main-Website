"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils"; // Utility for classNames. Adjust if necessary.

// Modified InfiniteMovingCards component that supports images:
const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    image: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      // Set CSS variable for direction. Your CSS keyframes can use this variable.
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      // Set CSS variable for duration (e.g., "20s", "40s", "80s")
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-full overflow-hidden px-4 sm:px-6",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-2 sm:gap-4 py-2 sm:py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[280px] max-w-full shrink-0 overflow-hidden rounded-2xl sm:w-[350px]"
          >
            <div className="relative size-full">
              <Image
                src={item.image}
                alt={item.name}
                className="h-[200px] w-full object-cover sm:h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                <h3 className="text-base font-bold text-[#7BF1A7] sm:text-lg">
                  {item.name}
                </h3>
                <p className="text-xs text-white sm:text-sm">{item.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// First set of organizers
const organisers1 = [
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Alex Morgan",
    title: "Lead Organizer",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Jamie Smith",
    title: "Technical Lead",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Casey Johnson",
    title: "Outreach Coordinator",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Taylor Williams",
    title: "Event Manager",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Jordan Lee",
    title: "Marketing Lead",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Riley Brown",
    title: "Sponsorship Director",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Quinn Davis",
    title: "Design Lead",
  },
];

// Second set of organizers
const organisers2 = [
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Morgan Chen",
    title: "Community Manager",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Sam Rodriguez",
    title: "Stage Manager",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Dana Kim",
    title: "Content Creator",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Avery Thompson",
    title: "Speaker Coordinator",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Ellis Cooper",
    title: "Volunteer Lead",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Harper Patel",
    title: "Social Media Manager",
  },
  {
    image: "/assets/Team/Execom/Technical/Muneeb/Muneeb.jpeg",
    name: "Blake Washington",
    title: "Logistics Coordinator",
  },
];

const Organisers = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="mb-8 text-center sm:mb-16">
          <h1 className="mb-4 font-block text-4xl text-[#7BF1A7] sm:text-6xl">
            Welcome to Our Platform
          </h1>
          <p className="mx-auto max-w-3xl px-4 text-base text-[#7BF1A7] sm:text-lg">
            Meet the incredible team behind this event, working tirelessly to
            make everything possible
          </p>
          <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-[#7BF1A7] sm:mt-8 sm:w-24"></div>
        </div>
        {/* First set - Organizers (left direction) */}
        <div className="mb-4">
          <InfiniteMovingCards
            items={organisers1}
            direction="left"
            speed="slow"
            className="py-4"
          />
        </div>
        {/* Second set - More Organizers (right direction) */}
        <div className="mb-16">
          <InfiniteMovingCards
            items={organisers2}
            direction="right"
            speed="slow"
            className="py-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Organisers;
