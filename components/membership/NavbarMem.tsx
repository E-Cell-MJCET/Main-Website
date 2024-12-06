"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi"; // Importing the hamburger icon
import { AiOutlineClose } from "react-icons/ai"; // Importing the close icon
import Link from "next/link";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Monitor scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust the value based on your hero section height
      setIsVisible(scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-50 w-full backdrop-blur-md transition-opacity duration-500 ${
        isVisible ? "bg-black/40" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div>
            <Image
              src="/assets/Logo/logo-big-white.png"
              alt="Logo"
              width={100}
              height={40}
              className="hidden h-auto md:block"
            />
            <Image
              src="/assets/Logo/logo-small-white.png"
              alt="Logo"
              width={50}
              height={32}
              className="h-auto md:hidden"
            />
          </div>
          <div className="hidden items-center space-x-7 md:flex">
            <Link href="/" className="text-lg text-white hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/events"
              className="text-lg text-white hover:text-blue-600"
            >
              Events
            </Link>
            <Link
              href="/team"
              className="text-lg text-white hover:text-blue-600"
            >
              Team
            </Link>
            <Link
              href="/gallery"
              className="text-lg text-white hover:text-blue-600"
            >
              Gallery
            </Link>
            <Link
              href="/contactus"
              className="text-lg text-white hover:text-blue-600"
            >
              Contact
            </Link>
            <Link
              className="rounded-md bg-blue-600 px-4 py-2 font-silkscreen font-bold text-white"
              href={"https://forms.gle/ePeDHzKgrb9MUGTx6"}
            >
              Get Membership
            </Link>
          </div>
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              className="rounded-md bg-blue-600 px-4 py-2 font-silkscreen font-bold text-white"
              href={"https://forms.gle/ePeDHzKgrb9MUGTx6"}
            >
              Get Membership
            </Link>
            <button onClick={toggleMenu} className="h-8 w-8 px-1 text-white">
              {isMenuOpen ? (
                <AiOutlineClose size={34} />
              ) : (
                <GiHamburgerMenu size={34} />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className={`mt-2 transition-opacity duration-500  md:hidden ${
              isVisible ? "bg-black/40" : "opacity-0"
            }`}
          >
            <ul className="flex flex-col space-y-4 py-2">
              <li>
                <Link href="/" className="block px-4 py-2 text-lg text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="block px-4 py-2 text-lg text-white"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="block px-4 py-2 text-lg text-white"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="block px-4 py-2 text-lg text-white"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus"
                  className="block px-4 py-2 text-lg text-white"
                >
                  Contact
                </Link>
              </li>
              <br />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
