"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

import socail from "@/public/assets/social.png";
import achievements from "@/public/assets/achievements1.png";

import FollowCursorHideCursor from "../ui/simpleCursor";

const About = () => {
  useGSAP(() => {
    gsap.from(".about", {
      y: 400,
      scrollTrigger: {
        trigger: ".about",
        scrub: true,
        start: "top-=20% bottom",
        end: "top-=20% bottom-=60%",
      },
    });
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black  py-16 font-inter text-white">
      <div className="about flex size-full flex-col items-center justify-center bg-black p-6 font-inter text-white">
        <h1 className="my-6 w-full text-center text-3xl font-[900] md:text-5xl">
          About E-Cell MJCET
        </h1>
        <p className="mb-6 w-[90vw] text-center font-inter text-sm leading-6 md:w-[80vw] md:text-base md:leading-8">
          For 15 years, E-Cell MJCET has championed an entrepreneurial ethos,
          guiding students with the expertise of venture capitalists and
          industry leaders. Our mission is to nurture &apos;CREATORS&apos;
          transcending traditional education by promoting values of
          productivity, innovation, and independent thinking. E-Cell MJCET
          inspires &apos;CHANGE&apos; by instilling out-of-the-box ideas and
          equipping individuals to be architects of transformation. We are
          dedicated to shaping engineers who actively contribute to a future
          defined by innovation and impact.
        </p>
        <div className="flex w-full max-w-4xl flex-col items-center justify-around gap-6 md:flex-row">
          <div className="text-center">
            <Image
              src={socail}
              alt="Phone Icon"
              className="mx-auto w-20 md:w-32"
            />
            <AnimatedNumber1 />
            <p className="text-lg font-semibold text-cyan-700 md:text-3xl">
              Social Reach
            </p>
          </div>
          <div className="text-center">
            <Image
              src={achievements}
              alt="achievements"
              className="mx-auto w-20 md:w-32"
            />
            <AnimatedNumber2 />
            <p className="text-lg font-semibold text-cyan-700 md:text-3xl">
              Events Held
            </p>
          </div>
        </div>
      </div>
      <FollowCursorHideCursor />
    </div>
  );
};

const AnimatedNumber = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const observerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVisible) return; // Stop counting if not visible

      setCount((prevCount) => {
        if (prevCount < target) {
          return prevCount + Math.ceil(target / 100);
        }
        clearInterval(interval);

        return target;
      });
    }, 30); // Adjust this time for speed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [target, isVisible]);

  // IntersectionObserver to track when the component enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting); // Update visibility state
      },
      { threshold: 0.5 } // Trigger when at least 50% of the element is in view
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return <span ref={observerRef}>{count.toLocaleString("en-IN")}</span>;
};

const AnimatedNumber1 = () => {
  return (
    <div style={{ fontWeight: "bold" }}>
      <h1 className="animate-gradient bg-gradient-to-r from-white to-white  bg-clip-text text-5xl text-transparent md:text-6xl">
        <AnimatedNumber target={20000} />+
      </h1>
    </div>
  );
};

const AnimatedNumber2 = () => {
  return (
    <div style={{ fontWeight: "bold" }}>
      <h1 className="animate-gradient bg-gradient-to-r from-white to-white  bg-clip-text text-5xl text-transparent md:text-6xl">
        {" "}
        <AnimatedNumber target={50} />+
      </h1>
    </div>
  );
};

export default About;
