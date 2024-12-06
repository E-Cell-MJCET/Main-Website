"use client"
import React from "react";
import Image from "next/image";
import Shuja from "@/public/assets/GB/Shuja.png";
import Abid from "@/public/assets/GB/Abid.png";
import Ayesha from "@/public/assets/GB/Ayesha.png";
import Irfan from "@/public/assets/GB/Irfan.png";
import Maleha from "@/public/assets/GB/Maleha.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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
      scale: .5,
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
       x:-130,
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
    <div className="w-screen relative overflow-hidden md:h-[700px] h-[65vh] bg-gray-950  overflow-x-hidden cursor-none">
      <Spotlight
        className="bg-zinc-700 blur-2xl"
        size={100}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
      <div className="flex justify-end flex-col relative h-full">
        <div className="hidden cursor-none md:flex flex-nowrap justify-center items-end w-full relative z-10 ">
          <Image
            src={Abid}
            alt="Abid"
            className="abid relative h-[300px] w-fit z-10 transform -translate-x-[190px]"
          />
          <Image
            src={Maleha}
            alt="Maleha"
            className="maleha h-[300px] w-fit z-20 transform -translate-x-[150px]"
          />
          <Image
            src={Shuja}
            alt="Shuja"
            className="shuja z-30 w-fit h-[350px]"
          />
          <Image
            src={Ayesha}
            alt="Ayesha"
            className="ayesha h-[300px] translate-x-[150px] w-fit z-20 transform"
          />
          <Image
            src={Irfan}
            alt="Irfan"
            className="irfan z-10 h-[300px] w-fit transform translate-x-[250px]"
          />
        </div>
        <div className="md:hidden flex flex-nowrap justify-center items-end w-full relative z-10">
          <Image
            src={Abid}
            alt="Abid"
            className="abidmb relative h-[200px] w-fit z-10 translate-x-44 transform "
          />
          <Image
            src={Maleha}
            alt="Maleha"
            className="h-[200px] w-fit z-20 translate-x-24 malehamb transform "
          />
          <Image src={Shuja} alt="Shuja" className="z-30 w-fit h-[250px] " />
          <Image
            src={Ayesha}
            alt="Ayesha"
            className="ayeshamb h-[200px] w-fit z-20 -translate-x-24 transform"
          />
          <Image
            src={Irfan}
            alt="Irfan"
            className="irfanmb z-10 h-[200px] w-fit -translate-x-44"
          />
        </div>
        {/* Governing Body text */}
        <div className="absolute inset-0 flex justify-center md:items-baseline items-start gb z-0">
          <p className="text-white font-extrabold font-doto text-[10vw] md:text-center text-start -translate-y-24 mt-48 cursor-none">
            Governing Body
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
