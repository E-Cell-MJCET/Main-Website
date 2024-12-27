"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

import useInkCursor from "@/hooks/inkCursor";

const JoinUs = () => {
  const parentRef = useRef(null);

  const inkCursorComponent = useInkCursor(parentRef);

  useGSAP(() => {
    gsap.from(".joinUs", {
      y: -500,
      ease: "slow",
      scrollTrigger: {
        trigger: ".joinUs",
        scrub: true,
        start: "top+=700% bottom",
        end: "top+=700% center",
        // markers: true,
      },
    });
  }, []);

  const buttonRef = useRef(null);
  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: "#ffffff",
      color: "black",
      duration: 0.4,
      ease: "slow",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: "transparent",
      color: "white",
      duration: 0.4,
      ease: "slow",
    });
  };

  const textRef = useRef(null);
  const handleMouseEnter2 = (e: any) => {
    const letter = e.target;
    gsap.to(letter, {
      y: -20,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave2 = (e: any) => {
    const letter = e.target;
    gsap.to(letter, {
      y: 0,
      duration: 0.3,
      ease: "bounce.out",
    });
  };

  const router = useRouter();

  return (
    <div
      ref={parentRef}
      className="max-w-screen relative z-10 flex h-[70vh] w-screen cursor-none flex-col items-center justify-center overflow-hidden bg-black"
    >
      {inkCursorComponent}
      <div className="joinUs font-inter text-7xl text-yellow-50 hover:cursor-none">
        <p
          ref={textRef}
          className="font-inter text-4xl text-yellow-50 hover:cursor-none md:text-7xl"
          style={{ display: "flex", gap: "0.1em" }}
        >
          {"Launch dreams.".split("").map((char, index) => (
            <span
              key={index}
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>
      <button
        ref={buttonRef}
        onClick={() => {
          router.push("/membership");
        }}
        className="m-10 rounded-full border-2 border-white p-5 px-10 text-3xl text-yellow-50 hover:cursor-none  md:text-5xl "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Join us
      </button>
    </div>
  );
};

export default JoinUs;
