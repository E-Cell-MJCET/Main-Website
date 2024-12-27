"use client";
import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Shuja from "@/public/assets/GB/Shuja.png";
import Abid from "@/public/assets/GB/Abid.png";
import Ayesha from "@/public/assets/GB/Ayesha.png";
import Irfan from "@/public/assets/GB/Irfan.png";
import Maleha from "@/public/assets/GB/Maleha.png";

import { Spotlight } from "../ui/spotlight";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    gsap.from(".gb", {
      scrollTrigger: {
        trigger: ".gb",
        start: "top bottom+=10%",
        end: "top center+=10%",
        scrub: true,
        // markers: true,
      },
      scale: 0.5,
      y: 300,
    });
  });

  useGSAP(() => {
    gsap.to(".abid", {
      scrollTrigger: {
        trigger: ".abid",
        start: "top bottom",
        end: "top center-=35%",
        scrub: true,
      },
      x: 210,
    });
  });

  useGSAP(() => {
    gsap.to(".ayesha", {
      scrollTrigger: {
        trigger: ".ayesha",
        start: "top bottom",
        end: "top center-=30%",
        scrub: true,
      },
      x: -130,
    });
  });

  useGSAP(() => {
    gsap.to(".maleha", {
      scrollTrigger: {
        trigger: ".maleha",
        start: "top bottom",
        end: "top center-=30%",
        scrub: true,
      },
      x: 130,
    });
  });

  useGSAP(() => {
    gsap.to(".irfan", {
      scrollTrigger: {
        trigger: ".irfan",
        start: "top bottom",
        end: "top center-=30%",
        scrub: true,
      },
      x: -190,
    });
  });
  useGSAP(() => {
    gsap.from(".irfanmb", {
      scrollTrigger: {
        trigger: ".irfanmb",
        start: "top bottom",
        end: "top center+=10%",
        scrub: true,
        // markers:true
      },
      x: 190,
    });
    gsap.from(".malehamb", {
      scrollTrigger: {
        trigger: ".malehamb",
        start: "top bottom",
        end: "top center+=10%",
        scrub: true,
      },
      x: -130,
    });

    gsap.from(".ayeshamb", {
      scrollTrigger: {
        trigger: ".ayeshamb",
        start: "top bottom",
        end: "top center+=10%",
        scrub: true,
      },
      x: 130,
    });

    gsap.from(".abidmb", {
      scrollTrigger: {
        trigger: ".abidmb",
        start: "top bottom",
        end: "top center+=10%",
        scrub: true,
      },
      x: -190,
    });
  });

  return (
    <div className="relative h-[65vh] w-screen cursor-none overflow-hidden bg-gray-950  md:h-[700px]">
      <Spotlight
        className="bg-zinc-700 blur-2xl"
        size={100}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
      <div className="relative flex h-full flex-col justify-end">
        <div className="relative z-10 hidden w-full cursor-none flex-nowrap items-end justify-center md:flex ">
          <Image
            src={Abid}
            alt="Abid"
            className="abid relative z-10 h-[300px] w-fit translate-x-[-190px]"
          />
          <Image
            src={Maleha}
            alt="Maleha"
            className="maleha z-20 h-[300px] w-fit translate-x-[-150px]"
          />
          <Image
            src={Shuja}
            alt="Shuja"
            className="shuja z-30 h-[350px] w-fit"
          />
          <Image
            src={Ayesha}
            alt="Ayesha"
            className="ayesha z-20 h-[300px] w-fit translate-x-[150px]"
          />
          <Image
            src={Irfan}
            alt="Irfan"
            className="irfan z-10 h-[300px] w-fit translate-x-[250px]"
          />
        </div>
        <div className="relative z-10 flex w-full flex-nowrap items-end justify-center md:hidden">
          <Image
            src={Abid}
            alt="Abid"
            className="abidmb relative z-10 h-[200px] w-fit translate-x-44"
          />
          <Image
            src={Maleha}
            alt="Maleha"
            className="malehamb z-20 h-[200px] w-fit translate-x-24"
          />
          <Image src={Shuja} alt="Shuja" className="z-30 h-[250px] w-fit " />
          <Image
            src={Ayesha}
            alt="Ayesha"
            className="ayeshamb z-20 h-[200px] w-fit -translate-x-24"
          />
          <Image
            src={Irfan}
            alt="Irfan"
            className="irfanmb z-10 h-[200px] w-fit -translate-x-44"
          />
        </div>
        {/* Governing Body text */}
        <div className="gb absolute inset-0 z-0 flex items-start justify-center md:items-baseline">
          <p className="mt-48 -translate-y-24 cursor-none text-start font-doto text-[10vw] font-extrabold text-white md:text-center">
            Governing Body
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
