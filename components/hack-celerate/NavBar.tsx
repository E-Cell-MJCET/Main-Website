"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import sidelogo from "@/public/assets/Logo/hack-celerate.png";
import name from "@/public/assets/Logo/name-big-white.png";
import thirdImage from "@/public/assets/Logo/hack-celerate__2.png";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  "Home",
  "Dummy",
  "Timeline",
  "Run Of Show",
  "Judges",
  "Prizes",
  "Sponsors",
  "Organizers",
  "FAQ",
  "Contact",
  "Team",
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThirdImage, setShowThirdImage] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const thirdImageRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (self.progress > 0.7 && !showThirdImage) {
            setShowThirdImage(true);
            gsap.to(logoRef.current, {
              x: -100,
              opacity: 0,
              duration: 0.1,
              ease: "power2.inOut",
            });
            gsap.to(nameRef.current, {
              x: -100,
              opacity: 0,
              duration: 0.1,
              ease: "power2.inOut",
            });
            gsap.fromTo(
              thirdImageRef.current,
              { x: -100, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              }
            );
          } else if (self.progress <= 0.7 && showThirdImage) {
            setShowThirdImage(false);
            gsap.to(thirdImageRef.current, {
              x: -100,
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
            });
            gsap.to([logoRef.current, nameRef.current], {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        },
      });
    });
    return () => ctx.revert();
  }, [showThirdImage]);

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const id = section.replace(/\s+/g, "");
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="container min-w-screen top-0 bg-[#121212] z-50 px-4 py-4 sticky">
      <div className="flex items-center justify-between">
        {/* Logos */}
        <div className="flex items-center justify-center space-x-4 z-20 relative w-40 h-12">
          <div ref={logoRef} className="absolute top-0 left-0 w-12 h-12">
            <Image
              src={sidelogo}
              alt="Hack-celerate Logo"
              width={48}
              height={48}
              className="rounded-full shadow-2xl shadow-white hover:rotate-[360deg] hover:scale-150 transition-transform duration-500"
            />
          </div>
          <div ref={nameRef} className="absolute top-1 left-10 w-24 h-12">
            <Image src={name} alt="Secondary Logo" width={42} height={42} />
          </div>
          <div
            ref={thirdImageRef}
            className={`absolute top-0 -left-6 w-56 h-12 flex justify-center items-center ${
              showThirdImage ? "block" : "opacity-0 hidden invisible"
            }`}
          >
            <Image src={thirdImage} alt="Third Logo" width={200} />
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden z-20 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {sections.map((item) => {
              const id = item.replace(/\s+/g, "");
              const isActive = activeSection === item;
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    className={`text-sm lg:text-base transition-all duration-300 ${
                      isActive
                        ? "text-[#3A6695] font-bold underline underline-offset-4 scale-105"
                        : "text-white hover:text-gray-300"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-10 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="h-full flex flex-col items-center justify-center">
          <ul className="flex flex-col items-center space-y-6">
            {sections.map((item) => {
              const id = item.replace(/\s+/g, "");
              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    className="text-white hover:text-gray-300 font-medium text-xl"
                    onClick={toggleMenu}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
