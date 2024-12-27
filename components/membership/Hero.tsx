"use client";
import React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

import { ShootingStars } from "../ui/shootingstars";
import { StarsBackground } from "../ui/starsbackground";

const Hero = () => {
  //3
  useGSAP(() => {
    gsap.from("span", {
      duration: 1,
      delay: 1.1,
      opacity: 0,
      stagger: 0.08,
    });
  });
  //2
  useGSAP(() => {
    gsap.from(".demo", {
      y: 15,
      duration: 0.3,
      delay: 0.8,
    });
  });
  //1
  useGSAP(() => {
    gsap.from(".demo1", {
      y: 20,
      duration: 0.3,
      delay: 0.5,
    });
  });
  //2
  useGSAP(() => {
    gsap.from(".btn", {
      y: -60,
      duration: 0.3,
      delay: 0.8,
    });
  });

  useGSAP(() => {
    gsap.to(".one", {
      y: -10,
      duration: 0.6,
      delay: 3.1,
      opacity: 0,
    });
  });
  //4
  useGSAP(() => {
    gsap.from(".two", {
      y: 10,
      duration: 0.6,
      delay: 3.7,
      opacity: 0,
    });
  });

  return (
    <div className="max-w-screen flex h-screen flex-col items-center justify-center overflow-hidden bg-black px-4">
      <Image
        src="/assets/Logo/ep-logo.png"
        alt="EP Logo"
        width={304}
        height={304}
        className="demo1 z-10 mb-4 size-40 bg-clip-text sm:size-48 lg:size-64"
      />
      <p className="demo z-10 hidden bg-clip-text font-silkscreen text-3xl font-extrabold text-white sm:block sm:text-5xl ">
        Entrepreneurship Cell
      </p>
      <p className="demo z-10 bg-clip-text font-silkscreen text-3xl font-extrabold text-white sm:hidden ">
        E-Cell MJCET
      </p>
      <h1
        className="z-10 mt-2 items-center justify-center gap-3 bg-clip-text
    text-center font-silkscreen text-2xl font-extrabold text-[#F6E445] sm:mt-6 sm:flex sm:flex-col sm:text-3xl lg:flex lg:flex-row lg:text-4xl"
      >
        <div>
          <span>I</span>
          <span>d</span>
          <span>e</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
          <span>.</span>
        </div>
        <div>
          <span>I</span>
          <span>n</span>
          <span>n</span>
          <span>o</span>
          <span>v</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
          <span>.</span>
        </div>
        <div>
          <span>I</span>
          <span>n</span>
          <span>c</span>
          <span>u</span>
          <span>b</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
          <span>.</span>
        </div>
      </h1>
      <div className="mt-12 flex w-96 flex-col items-center justify-center gap-5 sm:flex-row">
        <Link
          href={"https://forms.gle/ePeDHzKgrb9MUGTx6"}
          className="btn relative z-10 mt-12 flex h-12 w-52 items-center justify-center rounded bg-blue-700 px-4 py-3 text-center font-silkscreen text-sm text-white hover:cursor-pointer hover:bg-blue-600 sm:px-7 sm:py-4 sm:text-lg"
        >
          <div className="two absolute inset-0 flex items-center justify-center">
            Join us now
          </div>
          <div className="one absolute inset-0 flex flex-nowrap items-center justify-center text-sm">
            Become a Member
          </div>
        </Link>
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="btn relative z-10 flex h-12 w-52 items-center justify-center rounded border-2 border-[#F6E445] bg-black px-4 py-3 text-center font-silkscreen text-sm text-[#F6E445] hover:cursor-pointer sm:mt-4 sm:px-7 sm:py-4 sm:text-lg lg:mt-12"
        >
          <p>Know more</p>
        </button>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
};
//
export default Hero;
