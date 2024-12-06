"use client"
import React, { useEffect, useRef } from "react";
import ZoomParallax from "../ui/zoom-parallax";
import { div } from "framer-motion/client";
import HorizontalScroll from "./MobZoomParallax";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Dummy = () => {

    useGSAP(()=>{
      gsap.from(".ZoomParallaxDiv", {
        duration: 1,
        y: 50,
        opacity:0,
        delay:2.37
      });
    },[])

  return (
    <div className="bg-black">
      <div className="block sm:hidden">
        {/* <HorizontalScroll /> */}
        {/* <TwoWayParallaxDemo/> */}
        {/* <HorizontalScroll/> */}
      </div>
      <div className="hidden sm:block ZoomParallaxDiv">
        <ZoomParallax />
      </div>
    </div>
  );
};

export default Dummy;
