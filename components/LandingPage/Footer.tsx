"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import Image from "next/image";
import ecell from "@/public/assets/Logo/logo-big-white.png";
import Insta from "@/public/assets/SM-logo/Insta.jpeg";
import Facebook from "@/public/assets/SM-logo/Facebook.png";
import Reddit from "@/public/assets/SM-logo/Reddit.png";
import Twitter from "@/public/assets/SM-logo/X.png";
import LinkTree from "@/public/assets/SM-logo/LinkTree.png";
import Email from "@/public/assets/SM-logo/gmail.png";
import faiz from "@/public/assets/faiz.jpeg";
import irfan from "@/public/assets/irfan.jpeg";import Link from "next/link";
const Footer = () => {
  const people = [
    {
      id: 1,
      name: "Instagram",
      designation: "https://www.instagram.com/ecellmjcet/",
      image: Insta,
    },
    {
      id: 2,
      name: "Facebook",
      designation: "https://www.facebook.com/groups/ecellmj/",
      image: Facebook,
    },
    {
      id: 3,
      name: "Reddit",
      designation: "https://www.reddit.com/r/ECellMJCET/?rdt=42519",
      image: Reddit,
    },
    {
      id: 4,
      name: "\u00A0\u00A0\u00A0\u00A0\u00A0X\u00A0\u00A0\u00A0\u00A0\u00A0   ",
      designation: "https://x.com/mjcet_ecell",
      image: Twitter,
    },
    {
      id: 5,
      name: "LinkTree",
      designation: "https://linktr.ee/ecellmjcet",
      image: LinkTree,
    },
    {
      id: 6,
      name: "E-Mail",
      designation: "mailto:ecellmjcet@mjcollege.ac.in",
      image: Email,
    },
  ];
  const contacts = [
    {
      id: 1,
      name: "Faiz R&O",
      Number: "tel:+919182571088",
      designation: "R&O",
      image: faiz,
    },
    {
      id: 2,
      name: "Irfan CIO",
      Number: "tel:+918919163391",
      designation: "CIO",
      image: irfan,
    },
  ];

  return (
    <footer className="bg-[#685797] md:p-0 pt-10 text-white flex flex-col w-full">
      <div className="flex flex-col md:flex-row h-auto md:h-[60vh]">
        <div className="w-full md:w-1/4 flex justify-center items-center p-4 md:p-0">
          <Image src={ecell} className="w-40 md:w-60 h-auto" alt="ecell" />
        </div>
        {/* Quick Access Section */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-start p-5 md:p-10">
          <h2 className="font-semibold mb-5 text-2xl md:text-3xl font-inter">
            Quick Access
          </h2>
          <ul className="text-lg md:text-2xl grid grid-cols-3 gap-4 md:flex md:flex-wrap md:gap-x-8">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#events" className="hover:underline">
                Events
              </a>
            </li>
            <li>
              <a href="#team" className="hover:underline">
                Team
              </a>
            </li>
            <li>
              <a href="#sponsors" className="hover:underline">
                Sponsors
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Follow Us Section */}
        <div className="w-full md:w-1/4 flex flex-col justify-center items-center p-4 md:p-0">
          <p className="text-xl md:text-3xl font-bold font-inter mb-2">
            Follow Us
          </p>
          <div className="flex">
            <AnimatedTooltip items={people} />
          </div>
        </div>
        {/* Contact Us Section */}
        <div className="w-full md:w-1/4 text-sm md:text-2xl flex justify-center flex-col gap-4 items-center p-4 md:p-0">
          <h2 className="font-semibold md:mb-4 text-lg md:text-2xl">
            Contact Us
          </h2>
          <ul className="text-xs md:text-sm font-semibold space-y-2">
            <li>
              <a
                href="mailto:ecellmjcet@mjcollege.ac.in"
                className="hover:underline"
              >
                ecellmjcet@mjcollege.ac.in
              </a>
            </li>
            <li>Beside Veg Canteen, MJCET</li>
            <li>8-2-249, Banjara Hills</li>
            <li>Hyderabad, Telangana 500034</li>
          </ul>
          <div className="flex gap-1 flex-col">
            {contacts.map((ele,idx) => {
              return (
                <Link
                  href={ele.Number}
                  key={idx}
                  className="flex items-center rounded-md bg-gray-950 p-1 justify-center gap-1"
                >
                  <Image
                    src={ele.image}
                    alt="image"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="w-44 text-sm  border-black">
                    <p>{ele.name}</p>
                    <p>{ele.designation}</p>
                    <p>{ele.Number}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-white w-full"></div>
      <div className="flex flex-col md:flex-row items-center h-auto md:h-[10vh] justify-between mx-5 px-5 py-4 md:py-0">
        <p className="text-sm md:text-base">© Copyright E-Cell MJCET.</p>
        <p className="text-sm md:text-base">All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
