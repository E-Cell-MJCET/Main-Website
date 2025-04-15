"use client";
import React, { useEffect, useRef } from "react";
import { animate } from "animejs";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

import Image from "next/image";

import mjcet from "../../public/assets/hack/mjcet.png";
import india from "../../public/assets/hack/india.png";
import naac from "../../public/assets/hack/naac.png";
import nba from "../../public/assets/hack/nba.png";
import ou from "../../public/assets/hack/ou_logo.png";


const Footer = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const text = "Hackcelerate";

    const container = textRef.current;

    if (container) {
      container.innerHTML = "";

      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("inline-block");
        // Set color based on character position
        if (index < 4) {
          span.style.color = "#7BF1A7"; // Hack
        } else {
          span.style.color = "#ECECEC"; // -Celerate
        }
        container.appendChild(span);
      });

      // Animate each span using Anime.js
      animate("span", {
        y: [
          { to: "-2.75rem", ease: "outExpo", duration: 600 },
          { to: 0, ease: "outBounce", duration: 800, delay: 100 },
        ],
        rotate: {
          from: "-1turn",
          delay: 0,
        },
        delay: (_: any, i: any) => i * 50,
        ease: "inOutCirc",
        loopDelay: 1000,
        loop: true,
      });
    }
  }, []);

  return (
    <footer className="bg-[#0e0e0e] px-6 py-12 text-gray-300 md:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="flex flex-col">
          <div
            ref={textRef}
            className="font-block text-2xl font-bold sm:text-3xl md:text-4xl"
          >
            {/* Animation content will be inserted here by useEffect */}
          </div>
          <p className="mb-3 mt-4 text-sm">
            Accelerating innovation through collaborative hacking and creative
            problem-solving.
          </p>
          <div className="mt-1 flex space-x-4">
            <Link
              href="https://www.linkedin.com/company/e-cell-mjcet/"
              className="text-gray-300 transition-colors hover:text-white"
            >
              <FaLinkedinIn size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/ecellmjcet/"
              className="text-gray-300 transition-colors hover:text-white"
            >
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#Home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#About" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="#Timeline" className="hover:underline">
                Timeline
              </Link>
            </li>
            <li>
              <Link href="#FAQ" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#Contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Image
          src={mjcet}
          className="h-20 w-fit justify-center md:hidden"
          alt="MJCET"
          width={1000}
          height={1000}
        />
        <div className="flex flex-row items-start justify-between space-x-2 md:items-center md:space-x-10">
          <Image
            src={mjcet}
            className="hidden h-12 w-fit md:block"
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
        {/* <div>
          <h4 className="mb-4 font-semibold text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:underline">
                Venue Guide
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Hacker&apos;s Guide
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Code of Conduct
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Discord
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">Stay Updated</h4>
          <p className="mb-4 text-sm">
            Subscribe to our newsletter for updates and announcements.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-md border border-[#333] bg-[#1e1e1e] p-2 text-white outline-none"
            />
            <button className="rounded-r-md bg-red-500 px-4 text-white hover:bg-red-600">
              Subscribe
            </button>
          </div>
        </div> */}
      </div>
      <div className="mt-12 text-center text-xs text-gray-500">
        Designed with ❤️ by{" "}
        <Link href={"https://ecellmjcet.com"}> Tech Team </Link> of Ecell MJCET
        | Powered by innovation and creativity
      </div>
    </footer>
  );
};

export default Footer;
