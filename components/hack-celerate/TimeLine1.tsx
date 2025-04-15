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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
type TimelineCardProps = {
  date: string;
  title: string;
  description: string;
  color: "cyan" | "purple";
  icon: string;
  position: "left" | "right";
  dayNumber: string;
  index: number;
};

function TimelineCard({
  date,
  title,
  description,
  color,
  icon,
  position,
  dayNumber,
  index,
}: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isCyan = color === "cyan";

  // Color configurations
  const configs = {
    cyan: {
      dotBg: "bg-[#7BF1A7]",
      dotShadow: "shadow-cyan-500/50",
      borderColor: "border-[#ececec]/30",
      shadowColor: "shadow-[#ececec]/30",
      textColor: "text-[#ececec]",
      dateBg: "bg-[#7BF1A7]/60",
      glowColor: "bg-[#ececec]",
      dayBg: "bg-[#7BF1A7]",
    },
    purple: {
      dotBg: "bg-[#7BF1A7]",
      dotShadow: "shadow-cyan-500/50",
      borderColor: "border-[#ececec]/30",
      shadowColor: "shadow-[#ececec]/30",
      textColor: "text-[#ececec]",
      dateBg: "bg-[#7BF1A7]/60",
      glowColor: "bg-[#ececec]",
      dayBg: "bg-[#7BF1A7]",
    },
  };

  const currentConfig = isCyan ? configs.cyan : configs.purple;

  // Icon selector based on prop
  const IconComponent = () => {
    switch (icon) {
      case "announcement":
        return <FaRegLightbulb className="text-[#7BF1A7]" />;
      case "register-open":
        return <FaUserPlus className="text-[#7BF1A7]" />;
      case "register-close":
        return <FaUserTimes className="text-[#7BF1A7]" />;
      case "quiz":
        return <FaClipboardCheck className="text-[#7BF1A7]" />;
      case "hackathon":
        return <FaLaptopCode className="text-[#7BF1A7]" />;
      case "final":
        return <FaTrophy className="text-[#7BF1A7]" />;
      default:
        return <FaCalendarAlt className="text-[#7BF1A7]" />;
    }
  };

  useEffect(() => {
    if (
      cardRef.current &&
      contentRef.current &&
      typeof window !== "undefined"
    ) {
      // Different initial positions based on index for varied effects
      const initialStates = [
        {
          x: position === "left" ? -300 : 300,
          y: -100,
          z: -500,
          rotationY: position === "left" ? -45 : 45,
          rotationX: -30,
        },
        {
          x: position === "left" ? -200 : 200,
          y: 200,
          z: -300,
          rotationY: position === "left" ? 30 : -30,
          rotationX: 45,
        },
        {
          x: position === "left" ? -400 : 400,
          y: -50,
          z: -200,
          rotationY: position === "left" ? -60 : 60,
          rotationX: 15,
        },
        {
          x: position === "left" ? -150 : 150,
          y: 150,
          z: -400,
          rotationY: position === "left" ? 20 : -20,
          rotationX: -40,
        },
        {
          x: position === "left" ? -350 : 350,
          y: -200,
          z: -250,
          rotationY: position === "left" ? -35 : 35,
          rotationX: 25,
        },
        {
          x: position === "left" ? -250 : 250,
          y: 100,
          z: -350,
          rotationY: position === "left" ? 50 : -50,
          rotationX: -20,
        },
      ];

      const initialState = initialStates[index % initialStates.length];

      // Set initial state with dramatic 3D positioning
      gsap.set(cardRef.current, {
        opacity: 0,
        x: initialState.x,
        y: initialState.y,
        z: initialState.z,
        rotationY: initialState.rotationY,
        rotationX: initialState.rotationX,
        transformPerspective: 1500,
        transformOrigin: "center center",
      });

      // Content elements fade in separately for staggered effect
      gsap.set(contentRef.current.children, {
        opacity: 0,
        y: 10,
      });

      // Create cinematic entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top-=100 bottom-=100",
          end: "bottom center+=100",
          toggleActions: "play none none none",
          scrub: 1,
          // markers: true,
        },
      });

      // Card flies in from 3D space
      tl.to(cardRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 2,
        ease: "power3.out",
      })

        // Content elements fade in with stagger
        .to(
          contentRef.current.children,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );

      // Hover effect with 3D rotation
      if (window.matchMedia("(hover: hover)").matches) {
        cardRef.current.addEventListener("mousemove", (e) => {
          const card = cardRef.current;
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateY = ((x - centerX) / centerX) * 10;
          const rotateX = ((centerY - y) / centerY) * 10;

          gsap.to(card, {
            rotationY: rotateY,
            rotationX: rotateX,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        cardRef.current.addEventListener("mouseleave", () => {
          gsap.to(cardRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }
    }
  }, [position, index]);

  return (
    <div
      className={`w-full md:w-5/12 ${position === "left" ? "md:mr-auto" : "md:ml-auto"} relative`}
    >
      {/* Day circle - positioned at the "connector line" */}
      <div
        className={`absolute top-0 ${position === "left" ? "right-0 translate-x-1/2 md:right-0" : "left-0 -translate-x-1/2 md:left-0"} size-10 -translate-y-1/2 ${currentConfig.dayBg} shadow- rounded-full border-4 border-black shadow-lg${color}-500/50 z-20 flex items-center justify-center`}
      >
        <div className="text-sm font-bold text-black">{dayNumber}</div>
      </div>
      {/* Main card */}
      <div
        ref={cardRef}
        className={`border-2 bg-gray-900/90 ${currentConfig.borderColor} rounded-lg p-5 shadow-lg ${currentConfig.shadowColor} preserve-3d mb-16 backdrop-blur-sm`}
        style={{ willChange: "transform" }}
      >
        {/* Card top glowing line */}
        {/* <div
          className={`h-1 w-1/2 ${currentConfig.glowColor} absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm`}
        ></div> */}
        <div ref={contentRef}>
          {/* Header with icon */}
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-lg bg-black/30 p-2 text-2xl">
              <IconComponent />
            </div>
            <div
              className={`${currentConfig.textColor} text-xl font-bold md:text-2xl`}
            >
              {title}
            </div>
          </div>
          {/* Date badge */}
          <div
            className={`inline-block rounded-full px-3 py-1 ${currentConfig.dateBg} ${currentConfig.textColor} mb-4 font-mono text-xs`}
          >
            {date}
          </div>
          {/* Description with gradient border */}
          <div className="mt-2 border-l-2 border-gray-700 py-2 pl-4 text-gray-200 transition-all duration-300 group-hover:border-l-2 group-hover:border-l-cyan-400">
            {description}
          </div>
        </div>
        {/* Bottom glow effect */}
        <div
          className={`absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2${currentConfig.glowColor} rounded-full blur-sm`}
        ></div>
      </div>
    </div>
  );
}

function TimeLine1() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const centerLineRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Cinematic heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: "power3.out",
      });

      // Ensure the timeline container has enough padding at the bottom
      if (timelineRef.current) {
        const paddingBottom = window.innerHeight * 0.5;
        timelineRef.current.style.paddingBottom = `${paddingBottom}px`;
      }

      // Animate the center line with a sci-fi scanning effect
      if (centerLineRef.current) {
        // Initial state
        gsap.set(centerLineRef.current, {
          height: 0,
          opacity: 0.3,
        });

        // Scanning pulse animation
        gsap.to(centerLineRef.current, {
          height: "100%",
          opacity: 1,
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top bottom",
            end: "bottom center+=100",
            scrub: true,
            // markers: true,
          },
        });

        // Add pulsing glow effect
        gsap.to(centerLineRef.current, {
          boxShadow: "0 0 15px 3px rgba(139, 92, 246, 0.8)",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
        });
      }

      // Create a parallax scrolling effect for the entire timeline
      gsap.to(timelineRef.current, {
        y: (i: any, el: any) => -(el.offsetHeight * 0.1),
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const timelineData = [
    {
      date: "14th April",
      title: "Announcement",
      description: "Hackcelerate officially announced",
      color: "cyan",
      icon: "announcement",
      dayNumber: "1",
    },
    {
      date: "17th April",
      title: "Registrations Open",
      description: "Start submitting your applications and abstracts",
      color: "purple",
      icon: "register-open",
      dayNumber: "2",
    },
    {
      date: "11th May",
      title: "Registrations Close",
      description: "Last day to register your team",
      color: "cyan",
      icon: "register-close",
      dayNumber: "3",
    },
    {
      date: "14th May",
      title: "Quiz",
      description: "Test your technical knowledge",
      color: "purple",
      icon: "quiz",
      dayNumber: "4",
    },
    {
      date: "17th & 18th May",
      title: "24 Hour Online Hackathon",
      description: "Build your project in 24 hours",
      color: "cyan",
      icon: "hackathon",
      dayNumber: "5",
    },
    {
      date: "24th/31st May",
      title: "Final Round",
      description: "Present your projects to the judges",
      color: "purple",
      icon: "final",
      dayNumber: "6",
    },
  ] as const;

  return (
    <div
      className="min-h-screen overflow-hidden bg-black px-4 py-12 md:px-8"
      id="Timeline"
    >
      {/* Add some floating particles in the background for sci-fi effect */}
      {/* <div className="pointer-events-none fixed inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute size-1 rounded-full ${i % 2 === 0 ? "bg-cyan-500" : "bg-purple-500"} opacity-70`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${5 + Math.random() * 10}px ${i % 2 === 0 ? "#06b6d4" : "#a855f7"}`,
              animation: `float ${5 + Math.random() * 15}s linear infinite`,
            }}
          />
        ))}
      </div> */}
      {/* Heading with glowing effect */}
      <div
        ref={headingRef}
        className="perspective-1000 relative mx-auto mb-16 w-fit"
      >
        <h1 className="mb-2 text-center font-block text-4xl font-bold text-[#7BF1A7] md:text-5xl">
          Hack<span className="text-[#ececec]">celerate</span> Timeline
        </h1>
        {/* <div className="mx-auto h-1 w-1/2 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div> */}
        {/* <div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl"></div> */}
      </div>
      {/* Timeline container */}
      <div
        ref={timelineRef}
        className="perspective-1000 relative mx-auto max-w-5xl pb-32"
      >
        {/* Center line with gradient */}
        <div
          ref={centerLineRef}
          className="absolute inset-y-0 left-0 z-10 w-1 bg-gradient-to-b from-[#ececec]  to-[#7BF1A7] md:left-1/2 md:translate-x-2/4"
        ></div>
        {/* Timeline items */}
        <div className="relative z-10">
          {timelineData.map((item, index) => (
            <div key={index} className="flex justify-center">
              <TimelineCard
                date={item.date}
                title={item.title}
                description={item.description}
                color={item.color}
                icon={item.icon}
                dayNumber={item.dayNumber}
                position={index % 2 === 0 ? "left" : "right"}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Add global styles for 3D animations */}
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(20px);
          }
          66% {
            transform: translateY(20px) translateX(-20px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default TimeLine1;
