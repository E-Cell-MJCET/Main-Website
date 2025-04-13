"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <header className="min-w-screen container sticky top-0 z-50 bg-[#121212] p-4">
      <div className="flex items-center justify-between">
        {/* Logos */}
        <div className="relative z-20 flex h-12 w-40 items-center justify-center space-x-4">
          <main ref={logoRef} className="absolute left-0 top-0 size-12">
            <Image
              id="LOGO"
              src={sidelogo}
              alt="Hack-celerate Logo"
              width={48}
              height={48}
              className="rounded-full shadow-2xl shadow-white transition-transform duration-500 hover:rotate-[360deg] hover:scale-150"
            />
          </main>
          <div ref={nameRef} className="absolute left-10 top-1 h-12 w-24">
            <Image src={name} alt="Secondary Logo" width={42} height={42} />
          </div>
          <div
            ref={thirdImageRef}
            className={`absolute -left-6 top-0 flex h-12 w-56 items-center justify-center ${
              showThirdImage ? "block" : "invisible hidden opacity-0"
            }`}
          >
            <Image src={thirdImage} alt="Third Logo" width={200} />
          </div>
        </div>
        {/* Hamburger */}
        <button
          className="z-20 focus:outline-none md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="size-6 text-white" />
          ) : (
            <Menu className="size-6 text-white" />
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
                    className={`text-sm transition-all duration-300 lg:text-base ${
                      isActive
                        ? "scale-105 font-bold text-[#3A6695] underline underline-offset-4"
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
        className={`fixed inset-0 z-10 bg-black/90 transition-transform duration-300 ease-in-out${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="flex h-full flex-col items-center justify-center">
          <ul className="flex flex-col items-center space-y-6">
            {sections.map((item) => {
              const id = item.replace(/\s+/g, "");

              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    className="text-xl font-medium text-white hover:text-gray-300"
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
