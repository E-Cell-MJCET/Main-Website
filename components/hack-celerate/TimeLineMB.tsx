"use client";
import React, { useEffect, useRef } from "react";
import {
  FaCalendarAlt,
  FaRegLightbulb,
  FaUserPlus,
  FaUserTimes,
  FaClipboardCheck,
  FaLaptopCode,
  FaTrophy,
} from "react-icons/fa";

// Define available colors and icons as literal types
type CardColor = "cyan" | "purple";
type CardIcon =
  | "announcement"
  | "register-open"
  | "register-close"
  | "quiz"
  | "hackathon"
  | "final"
  | "default";
type CardPosition = "left" | "right";

type TimelineCardProps = {
  date: string;
  title: string;
  description: string;
  color: CardColor;
  icon: CardIcon;
  position: CardPosition;
  dayNumber: string;
  index: number;
};

// Configuration map for colors
const COLOR_CONFIGS = {
  cyan: {
    dotBg: "bg-[#7BF1A7]",
    borderColor: "border-[#ececec]/30",
    shadowColor: "shadow-[#ececec]/30",
    textColor: "text-[#ececec]",
    dateBg: "bg-[#7BF1A7]/60",
    iconBg: "bg-black/30",
    hoverBorderColor: "hover:border-[#7BF1A7]",
    dayBg: "bg-[#7BF1A7]",
    cardBg: "bg-gray-900/90",
  },
  purple: {
    dotBg: "bg-[#7BF1A7]",
    borderColor: "border-[#ececec]/30",
    shadowColor: "shadow-[#ececec]/30",
    textColor: "text-[#ececec]",
    dateBg: "bg-[#7BF1A7]/60",
    iconBg: "bg-black/30",
    hoverBorderColor: "hover:border-[#7BF1A7]",
    dayBg: "bg-[#7BF1A7]",
    cardBg: "bg-gray-900/90",
  },
};

// Map icons to components
const ICON_COMPONENTS = {
  announcement: FaRegLightbulb,
  "register-open": FaUserPlus,
  "register-close": FaUserTimes,
  quiz: FaClipboardCheck,
  hackathon: FaLaptopCode,
  final: FaTrophy,
  default: FaCalendarAlt,
};

function TimelineCard({
  date,
  title,
  description,
  color,
  icon,
  position,
  dayNumber,
}: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const currentConfig = COLOR_CONFIGS[color];
  const IconComponent = ICON_COMPONENTS[icon] || ICON_COMPONENTS.default;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || typeof window === "undefined") return;

    // Only apply effects if device supports hover
    if (!window.matchMedia("(hover: hover)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = "transform 0.1s ease";
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      card.style.transition = "transform 0.3s ease";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on unmount
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`relative w-full md:w-5/12 ${
        position === "left" ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
      }`}
    >
      {/* Day circle - positioned differently for mobile vs desktop */}
      <div
        className={`
          absolute 
          ${
            position === "left"
              ? "left-0 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2"
              : "left-0 -translate-x-1/2 md:translate-x-1/2"
          }
          top-0 flex
          size-10 -translate-y-1/2 items-center
          justify-center rounded-full 
          ${currentConfig.dayBg}
          z-20 border-4 
          border-black
          shadow-lg
        `}
      >
        <div className="text-sm font-bold text-black">{dayNumber}</div>
      </div>
      {/* Main card with improved mobile layout */}
      <div
        ref={cardRef}
        className={`
          ml-6 border-2
          md:ml-0 ${currentConfig.borderColor}
          ${currentConfig.cardBg}
          rounded-lg p-4 shadow-lg
          md:p-5 ${currentConfig.shadowColor}
          mb-12 backdrop-blur-sm
          transition-all
          duration-300 hover:shadow-xl md:mb-16
        `}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div>
          {/* Header with icon - responsive sizing */}
          <div className="mb-3 flex items-center gap-2 md:gap-3">
            <div
              className={`rounded-lg ${currentConfig.iconBg} p-2 text-xl md:text-2xl`}
            >
              <IconComponent className="text-[#7BF1A7]" />
            </div>
            <div
              className={`${currentConfig.textColor} line-clamp-2 text-lg font-bold md:text-xl lg:text-2xl`}
            >
              {title}
            </div>
          </div>
          {/* Date badge with improved visibility */}
          <div
            className={`
            inline-block rounded-full 
            px-3 py-1 
            ${currentConfig.dateBg} 
            ${currentConfig.textColor} 
            mb-3 font-mono 
            text-xs font-semibold 
            md:mb-4
          `}
          >
            {date}
          </div>
          {/* Description with gradient border and improved spacing */}
          <div
            className="
            mt-2 
            border-l-2 border-gray-700 
            py-1 pl-3 
            text-sm text-gray-200 
            transition-all duration-300 hover:border-l-2 
            hover:border-l-[#7BF1A7] md:py-2 
            md:pl-4 md:text-base
          "
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline data defined once and typed properly
const TIMELINE_DATA = [
  {
    date: "14th April",
    title: "Announcement",
    description: "Hackcelerate officially announced",
    color: "cyan" as CardColor,
    icon: "announcement" as CardIcon,
    dayNumber: "1",
  },
  {
    date: "17th April",
    title: "Registrations Open",
    description: "Start submitting your applications and abstracts",
    color: "purple" as CardColor,
    icon: "register-open" as CardIcon,
    dayNumber: "2",
  },
  {
    date: "11th May",
    title: "Registrations Close",
    description: "Last day to register your team",
    color: "cyan" as CardColor,
    icon: "register-close" as CardIcon,
    dayNumber: "3",
  },
  {
    date: "14th May",
    title: "Quiz",
    description: "Test your technical knowledge",
    color: "purple" as CardColor,
    icon: "quiz" as CardIcon,
    dayNumber: "4",
  },
  {
    date: "17th & 18th May",
    title: "24 Hour Online Hackathon",
    description: "Build your project in 24 hours",
    color: "cyan" as CardColor,
    icon: "hackathon" as CardIcon,
    dayNumber: "5",
  },
  {
    date: "24th/31st May",
    title: "Final Round",
    description: "Present your projects to the judges",
    color: "purple" as CardColor,
    icon: "final" as CardIcon,
    dayNumber: "6",
  },
];

function TimelineMB() {
  return (
    <div className="block min-h-screen overflow-hidden bg-black px-4 py-12 md:hidden md:px-8">
      {/* Heading section with improved responsive sizing */}
      <div className="mx-auto mb-12 w-fit md:mb-16">
        <h1 className="mb-2 text-center font-block text-3xl font-bold text-[#7BF1A7] md:text-4xl lg:text-5xl">
          Hack<span className="text-[#ececec]">celerate</span> Timeline
        </h1>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#ececec] to-[#7BF1A7]"></div>
      </div>
      {/* Timeline container with improved mobile layout */}
      <div className="relative mx-auto max-w-5xl pb-12 md:pb-20">
        {/* Center line with gradient - repositioned for mobile */}
        <div
          className="
          absolute 
          inset-y-0 
          left-4 z-10 
          w-1 
          bg-gradient-to-b 
          from-[#ececec] to-[#7BF1A7] md:left-1/2
          md:-translate-x-1/2
        "
        ></div>
        {/* Timeline items */}
        <div className="relative z-10">
          {TIMELINE_DATA.map((item, index) => (
            <div key={index} className="flex justify-start md:justify-center">
              <TimelineCard
                {...item}
                position={index % 2 === 0 ? "left" : "right"}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimelineMB;
