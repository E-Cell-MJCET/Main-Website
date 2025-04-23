"use client";
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React, { useEffect, useRef } from 'react';
import { BsMegaphone } from 'react-icons/bs';
import { FaUserPlus, FaUserSlash, FaQuestionCircle } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import { AiOutlineTrophy } from 'react-icons/ai';
import Link from 'next/link';

// Types
type CardColor = 'emerald' | 'teal';
type CardIcon = 'announcement' | 'register-open' | 'register-close' | 'quiz' | 'hackathon' | 'final';

interface TimelineItem {
  date: string;
  title: string;
  description: React.ReactNode;
  color: CardColor;
  icon: CardIcon;
  dayNumber: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    date: "14th April",
    title: "Announcement",
    description: "Hackcelerate is officially live!",
    color: "emerald" as CardColor,
    icon: "announcement" as CardIcon,
    dayNumber: "1",
  },
  {
    date: "17th April",
    title: "Registrations Open",
    description: "Submit your applications and project abstracts",
    color: "teal" as CardColor,
    icon: "register-open" as CardIcon,
    dayNumber: "2",
  },
  {
    date: "11th May",
    title: "Registrations Close",
    description: (
      <>
        Last day to register your team
        <br />
        (Shortlisting will follow immediately)
      </>
    ),
    color: "emerald" as CardColor,
    icon: "register-close" as CardIcon,
    dayNumber: "3",
  },
  {
    date: "14th May",
    title: "Quiz",
    description: "Test your knowledge — attendance is mandatory to qualify",
    color: "teal" as CardColor,
    icon: "quiz" as CardIcon,
    dayNumber: "4",
  },
  {
    date: "17th & 18th May",
    title: "24 Hour Online Hackathon",
    description: (
      <>
        Build your project in 24 hours
        <br />
        Build your project from scratch — collaborate virtually via <strong><Link href={"https://discord.com/download"} style={{ fontWeight: '900' }} >Discord</Link></strong>
      </>
    ),
    color: "emerald" as CardColor,
    icon: "hackathon" as CardIcon,
    dayNumber: "5",
  },
  {
    date: "31st May",
    title: "Final Round",
    description: (
      <>
        Pitch your project to top industry judges
        <br />
        Venue: Microsoft India Development Center (IDC), Hyderabad
      </>
    ),
    color: "teal" as CardColor,
    icon: "final" as CardIcon,
    dayNumber: "6",
  },
];

interface TimelineProps {
  data?: TimelineItem[];
}

const TimelineNW: React.FC<TimelineProps> = ({ data = TIMELINE_DATA }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Icon mapping with react-icons
  const getIcon = (icon: CardIcon) => {
    switch (icon) {
      case 'announcement':
        return <BsMegaphone className="size-6" />;
      case 'register-open':
        return <FaUserPlus className="size-6" />;
      case 'register-close':
        return <FaUserSlash className="size-6" />;
      case 'quiz':
        return <FaQuestionCircle className="size-6" />;
      case 'hackathon':
        return <BiCodeAlt className="size-6" />;
      case 'final':
        return <AiOutlineTrophy className="size-6" />;
      default:
        return null;
    }
  };

  // 3D effect handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.05)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)';
  };

  // Intersection Observer to handle animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <h1 className="mb-16 mt-8 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
        Hackcelerate Timeline
      </h1>
      <div ref={timelineRef} className="relative py-8">
        {/* Timeline vertical line */}
        <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-emerald-400 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.7)] md:block"></div>
        <div className="absolute inset-y-0 left-8 w-1 bg-gradient-to-b from-emerald-400 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.7)] md:hidden"></div>
        {/* Timeline items */}
        {data.map((item, index) => (
          <div
            key={index}
            className={`timeline-item relative mb-16 flex translate-y-8 opacity-0 transition-all duration-500 ease-out last:mb-0 ${
              index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
            } md:justify-center`}
          >
            {/* Day number circle */}
            <div 
              className={`absolute z-10 flex size-10 items-center justify-center rounded-full text-white 
                ${item.color === 'emerald' 
                  ? 'shadow-[0_0_10px_#10b981,0_0_20px_#10b981]' 
                  : 'shadow-[0_0_10px_#14b8a6,0_0_20px_#14b8a6]'} 
                border border-opacity-30 bg-gray-900 
                ${item.color === 'emerald' ? 'border-emerald-400' : 'border-teal-400'} 
                left-8 top-0 -translate-x-1/2 font-bold md:left-1/2 md:-translate-x-1/2`}
            >
              {item.dayNumber}
            </div>
            {/* Card */}
            <div 
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`ml-16 w-[calc(100%-4rem)] md:ml-0 md:w-5/12 lg:w-5/12
                ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} 
                rounded-lg border border-opacity-30 bg-gray-900 p-6 
                transition-all duration-300 ease-out
                ${item.color === 'emerald' ? 'border-emerald-400' : 'border-teal-400'} 
                ${item.color === 'emerald' 
                  ? 'shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                  : 'shadow-[0_0_10px_rgba(20,184,166,0.3)]'} 
                hover:${item.color === 'emerald' 
                  ? 'shadow-[0_0_15px_#10b981,0_0_20px_rgba(16,185,129,0.5)]' 
                  : 'shadow-[0_0_15px_#14b8a6,0_0_20px_rgba(20,184,166,0.5)]'} 
                group`}
              style={{ 
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden' 
              }}
            >
              {/* Card inner content with depth effect */}
              <div className="relative" style={{ transform: 'translateZ(20px)' }}>
                {/* Icon container */}
                <div 
                  className={`mb-4 flex size-12 items-center justify-center rounded-full 
                    ${item.color === 'emerald' 
                      ? 'border-emerald-500 bg-emerald-900 bg-opacity-20' 
                      : 'border-teal-500 bg-teal-900 bg-opacity-20'} 
                    border border-opacity-30
                    ${item.color === 'emerald' ? 'text-emerald-400' : 'text-teal-400'}`}
                >
                  {getIcon(item.icon)}
                </div>
                {/* Content */}
                <p className="mb-2 text-sm font-medium text-gray-400">{item.date}</p>
                <h3 
                  className={`mb-3 text-xl font-bold 
                    ${item.color === 'emerald' ? 'text-emerald-400' : 'text-teal-400'} 
                    group-hover: transition-colors
                    duration-300${item.color === 'emerald' ? 'text-emerald-300' : 'text-teal-300'}`}
                >
                  {item.title}
                </h3>
                <div className="text-base leading-relaxed text-gray-300">
                  {item.description}
                </div>
              </div>
              {/* Subtle glow effect around the card on hover */}
              <div 
                className={`absolute inset-0 -z-10 rounded-lg opacity-0 blur-md transition-opacity duration-300
                  ${item.color === 'emerald' ? 'bg-emerald-500' : 'bg-teal-500'} 
                  group-hover:opacity-20`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineNW;