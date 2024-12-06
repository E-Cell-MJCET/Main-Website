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

  return (
    <div className="bg-black">
      <div className="block sm:hidden">
        {/* <HorizontalScroll /> */}
        {/* <TwoWayParallaxDemo/> */}
        {/* <HorizontalScroll/> */}
      </div>
      <div className="ZoomParallaxDiv hidden sm:block">
        <ZoomParallax />
      </div>
    </div>
  );
};

export default Dummy;
