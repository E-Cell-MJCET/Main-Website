"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import ZoomParallax from "../ui/zoom-parallax";

const Dummy = () => {
  useGSAP(() => {
    gsap.from(".ZoomParallaxDiv", {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 2.37,
    });
  }, []);

  useGSAP(() => {
    gsap.from(".VideoDiv", {
      duration: 1,
      y: 100,
      opacity: 0,
      delay: 3.9,
    });
  }, []);

  return (
    <div className="bg-black">
      <div className="VideoDiv block sm:hidden">
        <video src="/assets/hero/mayhem.mp4" autoPlay loop muted />
      </div>
      <div className="ZoomParallaxDiv hidden sm:block">
        <ZoomParallax />
      </div>
    </div>
  );
};

export default Dummy;
