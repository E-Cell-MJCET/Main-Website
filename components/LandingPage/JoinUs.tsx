"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
  const handleMouseEnter2 = (e:any) => {
    const letter = e.target;
    gsap.to(letter, {
      y: -20,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave2 = (e:any) => {
    const letter = e.target;
    gsap.to(letter, {
      y: 0,
      duration: 0.3,
      ease: "bounce.out",
    });
  };

  return (
    <div
      ref={parentRef}
      className="bg-black max-w-screen w-screen overflow-hidden flex-col h-[70vh] flex justify-center items-center relative z-10 cursor-none"
    >
      {inkCursorComponent}

      <div className="font-inter text-7xl joinUs text-yellow-50 hover:cursor-none">
        <p
          ref={textRef}
          className="font-inter text-4xl md:text-7xl text-yellow-50 hover:cursor-none"
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
        className="text-yellow-50 m-10 rounded-full p-5 px-10 border-white border-2 md:text-5xl text-3xl  hover:cursor-none "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Join us
      </button>
    </div>
  );
};

export default JoinUs;
