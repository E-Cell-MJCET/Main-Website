"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import ecell from "@/public/assets/Logo/logo-big-white.png";
import Insta from "@/public/assets/SM-logo/Insta.jpeg";
import Facebook from "@/public/assets/SM-logo/Facebook.png";
import Reddit from "@/public/assets/SM-logo/Reddit.png";
import Twitter from "@/public/assets/SM-logo/X.png";
import LinkTree from "@/public/assets/SM-logo/LinkTree.png";
import Email from "@/public/assets/SM-logo/gmail.png";
import faiz from "@/public/assets/faiz.jpeg";
import irfan from "@/public/assets/irfan.jpeg";

import { AnimatedTooltip } from "../ui/animated-tooltip";

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
      Number: "+919182571088",
      designation: "R&O",
      image: faiz,
    },
    {
      id: 2,
      name: "Irfan CIO",
      Number: "+918919163391",
      designation: "CIO",
      image: irfan,
    },
  ];

  return (
    <footer className=" flex w-full flex-col bg-[#685797] pt-10 text-white md:p-0">
      <div className="flex h-auto flex-col md:h-[60vh] md:flex-row">
        <div className="flex w-full items-center justify-center p-4 md:w-1/4 md:p-0">
          <Image src={ecell} className="h-auto w-40 md:w-60" alt="ecell" />
        </div>
        {/* Quick Access Section */}
        <div className="flex w-full flex-col items-center justify-center p-5 md:w-1/3 md:items-start md:p-10">
          <h2 className="mb-5 font-inter text-2xl font-semibold md:text-3xl">
            Quick Access
          </h2>
          <ul className="grid grid-cols-3 gap-4 text-lg md:flex md:flex-wrap md:gap-x-8 md:text-2xl">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:underline">
                Team
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:underline">
                Blogs
              </Link>
            </li>
            <li className="hidden md:block">
              <Link href="/aboutus" className="hidden hover:underline md:flex">
                About us
              </Link>
            </li>
            <li className="md:hidden">
              <Link href="/membership" className="hover:underline ">
                Membership
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:underline">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow Us Section */}
        <div className="flex w-full flex-col items-center justify-center p-4 md:w-1/4 md:p-0">
          <p className="mb-2 font-inter text-xl font-bold md:text-3xl">
            Follow Us
          </p>
          <div className="flex">
            <AnimatedTooltip items={people} />
          </div>
        </div>
        {/* Contact Us Section */}
        <div className="flex w-full flex-col items-center justify-center gap-4 p-4 text-sm md:w-1/4 md:p-0 md:text-2xl">
          <h2 className="text-lg font-semibold md:mb-4 md:text-2xl">
            Contact Us
          </h2>
          <ul className="space-y-2 text-xs font-semibold md:text-sm">
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
          <div className="flex flex-col gap-1">
            {contacts.map((ele, idx) => {
              return (
                <Link
                  href={`tel:${ele.Number}`}
                  key={idx}
                  className="flex items-center justify-center gap-1 rounded-md bg-[#8b76c6] p-1"
                >
                  <Image
                    src={ele.image}
                    alt="image"
                    className="size-12 rounded-full"
                  />
                  <div className="w-44 border-black  text-sm">
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
      <div className="h-px w-full bg-white"></div>
      <div className="mx-5 flex h-auto flex-col items-center justify-between px-5 py-4 md:h-[10vh] md:flex-row md:py-0">
        <p className="text-sm md:text-base">© Copyright E-Cell MJCET.</p>
        <p className="text-sm md:text-base">All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
