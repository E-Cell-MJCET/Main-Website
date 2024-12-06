"use client";
import React, { useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const DummyPage = ({ handleLoading }: { handleLoading?: any }) => {
  const [ideate, setIdeate] = useState(true);
  const [innovate, setInnovate] = useState(true);
  const [incubate, setIncubate] = useState(true);
  const [finesh, setFinesh] = useState(false);
  const [box, setBox] = useState(false);
   const [ideatemb, setIdeatemb] = useState(true);
   const [innovatemb, setInnovatemb] = useState(false);
   const [incubatemb, setIncubatemb] = useState(false);
   const [fineshmb, setFineshmb] = useState(false);
   const [boxmb, setBoxmb] = useState(false);
  useGSAP(() => {
    gsap.to(".one", {
      delay: 0.5,
      duration: 2,
      x: 2000,

      onComplete: () => {
        setIdeate(false);
        setInnovate(true);
      },
    });
  }, []);
  useGSAP(() => {
    gsap.to(".two", {
      delay: 1.3,
      duration: 2,
      y: 2000,
      onComplete: () => {
        setIncubate(true);
        setInnovate(false);
      },
    });
  }, []);

  useGSAP(() => {
    gsap.to(".box", {
      delay: 2,
      duration: 2,
      y: -2000,
      onComplete: () => {
        handleLoading();
      },
    });
  });
  
  useGSAP(() => {
    
    gsap.to(".onemb", {
      delay: 0.2,
      duration: 0.3,
      //  x: 2000,
      
      onComplete: () => {
        setIdeatemb(false);
        setInnovatemb(true);
      },
    });
    gsap.to(".twomb", {
      delay: 0.5,
      duration: 0.3,

      //  y: 2000,
      onComplete: () => {
        setIncubatemb(true);
        setInnovatemb(false);
      },
    });
    
    gsap.to(".threemb", {
      delay: 0.8,
      duration: 0.3,
      //  x: 2000,

      onComplete: () => {
        setIncubatemb(false);
        setIdeatemb(true);
        setFineshmb(true);
      },
    });

    gsap.to(".boxmb", {
      delay: 2,
      duration: 2,
      y: -2000,
      onComplete: () => {
        handleLoading();
      },
    });

  }, [fineshmb]);
  return (
    <>
      <div
        className={`max-w-screen md:flex hidden font-inter font-bold overflow-hidden h-screen bg-black text-white  flex-col sm:flex-row justify-center items-center box ${
          box ? "hidden" : "block"
        }`}
      >
        <p className="mb-4 sm:mb-0 sm:mr-6 w-full sm:w-[40%] text-center sm:text-right text-4xl md:text-6xl lg:text-7xl">
          We
        </p>
        <div className="w-[66%] sm:w-[60%] h-full text-center flex flex-col sm:flex-row items-center relative">
          <div
            className={`one ${
              ideate ? "block" : "hidden"
            } text-left items-center bg-black text-white flex h-full w-full absolute top-0 left-0 z-30 text-3xl md:text-5xl lg:text-7xl`}
          >
            &middot; Ideate.
          </div>
          <div
            className={`two ${
              innovate ? "block" : "hidden"
            } text-black bg-white text-left items-center flex h-full w-full absolute top-0 left-0 z-20 text-3xl md:text-5xl lg:text-7xl`}
          >
            &middot; Innovate.
          </div>
          <div
            className={`three ${
              incubate ? "block" : "hidden"
            } text-left items-center bg-gray-950 flex h-full w-full absolute top-0 left-0 z-10 text-3xl md:text-5xl lg:text-7xl`}
          >
            &middot; Incubate.
          </div>
        </div>
      </div>
      <div className={`md:hidden block w-screen h-screen boxmb ${
          boxmb ? "hidden" : "block"
        }`}>
        <div className="w-screen h-screen flex justify-center items-center bg-black font-inter z-50">
          <p className="text-white text-5xl font-inter ">We</p>
          <div
            className={`onemb ${
              ideatemb ? "block" : "hidden"
            } text-left  bg-black text-white text-5xl `}
          >
            &middot; Ideate.
          </div>
          <div
            className={`twomb ${
              innovatemb ? "block" : "hidden"
            } text-white bg-black text-left z-20 text-5xl `}
          >
            &middot; Innovate.
          </div>
          <div
            className={`threemb ${
              incubatemb ? "block" : "hidden"
            }  bg-gray-950  text-white z-10 text-5xl `}
          >
            &middot; Incubate.
          </div>
        </div>
      </div>
    </>
  );
};

export default DummyPage;
