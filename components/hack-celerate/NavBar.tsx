"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import sidelogo from "@/public/assets/Logo/hack-celerate.png";
import name from "@/public/assets/Logo/name-big-white.png";
import thirdImage from "@/public/assets/Logo/hack-celerate__2.png";

import mjcet from "../../public/assets/hack/mjcet.png";
import india from "../../public/assets/hack/india.png";
import naac from "../../public/assets/hack/naac.png";
import nba from "../../public/assets/hack/nba.png";
import ou from "../../public/assets/hack/ou_logo.png";
import light from "../../public/assets/Logo/light.png";

gsap.registerPlugin(ScrollTrigger);

const sections = ["Home", "About", "Timeline", "FAQ", "Contact"];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThirdImage, setShowThirdImage] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const logosRef = useRef<HTMLDivElement>(null);

  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const thirdImageRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    gsap.to(logosRef.current, {
      opacity: 0,
      ease: "power4.in",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "top+=150 top",
        scrub: true,
      },
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (self.progress > 0.25 && !showThirdImage) {
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
          } else if (self.progress <= 0.2 && showThirdImage) {
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
    <header className="sticky top-0 z-50 bg-[#121212] p-4">
      <div className="flex items-center justify-around">
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
        <div
          ref={logosRef}
          className="ml-10 hidden flex-row items-center justify-center space-x-10 lg:flex"
        >
          <Image
            src={mjcet}
            className="h-12 w-fit"
            alt="MJCET"
            width={1000}
            height={1000}
          />
          <Image
            src={light}
            className="h-20 w-fit"
            alt="MJCET"
            width={1000}
            height={1000}
          />
          <Image
            src={naac}
            className="h-12 w-fit"
            alt="MJCET"
            width={1000}
            height={1000}
          />
          <Image
            src={india}
            className="h-12 w-fit"
            alt="MJCET"
            width={1000}
            height={1000}
          />
          <Image
            src={nba}
            className="h-12 w-fit"
            alt="MJCET"
            width={1000}
            height={1000}
          />
          <Image
            src={ou}
            className="h-12 w-fit"
            alt="MJCET"
            width={1000}
            height={1000}
          />
        </div>
        {/* Hamburger */}
        <button
          className="z-20 focus:outline-none lg:hidden"
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
        <nav className="hidden lg:flex">
          <ul className="flex space-x-10 px-5">
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
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
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
          isMenuOpen ? " translate-x-0" : "hidden translate-x-full"
        } lg:hidden`}
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
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth" });
                      toggleMenu();
                    }}
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
