"use client"
import React, { useRef, useEffect,useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import socail from "@/public/assets/social.png"
import achievements from "@/public/assets/achievements1.png"
import { useGSAP } from "@gsap/react";
import { Cursor } from "../ui/cursor";
import FollowCursorHideCursor from "../ui/simpleCursor";
const About = () => {
  useGSAP(()=>{
    gsap.from(".about", {
      y: 400,
      scrollTrigger: {
        trigger: ".about",
        scrub: true,
        start: "top-=20% bottom",
        end: "top-=20% bottom-=60%", 
      },
    });
  },[])

  return (
    <div className="w-screen h-screen bg-black font-inter text-white flex flex-col items-center justify-center p-6 py-16">
      <div className="w-full h-full bg-black font-inter text-white flex flex-col items-center justify-center p-6 about">
        <h1 className="text-3xl md:text-5xl font-[900] my-6 w-full text-center">
          About E-Cell MJCET
        </h1>
        <p className="text-center w-[90vw] md:w-[80vw] leading-6 md:leading-8 mb-6 font-inter text-sm md:text-base">
          For 15 years, E-Cell MJCET has championed an entrepreneurial ethos,
          guiding students with the expertise of venture capitalists and
          industry leaders. Our mission is to nurture 'CREATORS' transcending
          traditional education by promoting values of productivity, innovation,
          and independent thinking. E-Cell MJCET inspires 'CHANGE' by instilling
          out-of-the-box ideas and equipping individuals to be architects of
          transformation. We are dedicated to shaping engineers who actively
          contribute to a future defined by innovation and impact.
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-4xl gap-6">
          <div className="text-center">
            <Image
              src={socail}
              alt="Phone Icon"
              className="mx-auto w-20 md:w-32"
            />
            <AnimatedNumber1/>
            <p className="text-lg md:text-3xl font-semibold text-cyan-700">
              Social Reach
            </p>
          </div>
          <div className="text-center">
            <Image
              src={achievements}
              alt="achievements"
              className="mx-auto w-20 md:w-32"
            />
            <AnimatedNumber2/>
            <p className="text-lg md:text-3xl font-semibold text-cyan-700">
              Events Held
            </p>
          </div>
        </div>
      </div>
      <FollowCursorHideCursor/>
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

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return <span ref={observerRef}>{count.toLocaleString('en-IN')}</span>;
};

const AnimatedNumber1 = () => {
  return (
    <div style={{  fontWeight: "bold" }}>
      <h1 className="animate-gradient bg-gradient-to-r text-5xl md:text-6xl  from-white to-white bg-clip-text text-transparent"><AnimatedNumber target={20000} />+
      </h1>
    </div>
  );
};

const AnimatedNumber2 = () => {
  return (
    <div style={{ fontWeight: "bold" }}>
      <h1 className="animate-gradient bg-gradient-to-r text-5xl md:text-6xl  from-white to-white bg-clip-text text-transparent"> <AnimatedNumber target={50} />+ 
      </h1>
    </div>
  );
};


export default About;
