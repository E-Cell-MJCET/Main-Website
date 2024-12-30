"use client";
import React, { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const DummyPage = ({ handleLoading }: { handleLoading?: any }) => {
  const [ideate, setIdeate] = useState(true);
  const [innovate, setInnovate] = useState(true);
  const [incubate, setIncubate] = useState(true);

  const [box] = useState(false);
  const [ideatemb, setIdeatemb] = useState(true);
  const [innovatemb, setInnovatemb] = useState(false);
  const [incubatemb, setIncubatemb] = useState(false);
  const [fineshmb, setFineshmb] = useState(false);
  const [boxmb] = useState(false);
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
      duration: 0.2,
      //  x: 2000,

      onComplete: () => {
        setIdeatemb(false);
        setInnovatemb(true);
      },
    });
    gsap.to(".twomb", {
      delay: 0.4,
      duration: 0.6,

      //  y: 2000,
      onComplete: () => {
        setIncubatemb(true);
        setInnovatemb(false);
      },
    });

    gsap.to(".threemb", {
      delay: 0.6,
      duration: 0.8,
      //  x: 2000,

      onComplete: () => {
        setIncubatemb(false);
        setIdeatemb(true);
        setFineshmb(true);
      },
    });

    gsap.to(".boxmb", {
      delay: 2,
      duration: 1.6,
      y: -2000,
      onComplete: () => {
        handleLoading();
      },
    });
  }, [fineshmb]);

  return (
    <>
      <div
        className={`max-w-screen box hidden h-screen flex-col items-center justify-center overflow-hidden bg-black  font-inter font-bold text-white sm:flex-row md:flex ${
          box ? "hidden" : "block"
        }`}
      >
        <p className="mb-4 w-full text-center text-4xl sm:mb-0 sm:mr-6 sm:w-2/5 sm:text-right md:text-6xl lg:text-7xl">
          We
        </p>
        <div className="relative flex h-full w-[66%] flex-col items-center text-center sm:w-3/5 sm:flex-row">
          <div
            className={`one ${
              ideate ? "block" : "hidden"
            } absolute left-0 top-0 z-30 flex size-full items-center bg-black text-left text-3xl text-white md:text-5xl lg:text-7xl`}
          >
            &middot; Ideate.
          </div>
          <div
            className={`two ${
              innovate ? "block" : "hidden"
            } absolute left-0 top-0 z-20 flex size-full items-center bg-white text-left text-3xl text-black md:text-5xl lg:text-7xl`}
          >
            &middot; Innovate.
          </div>
          <div
            className={`three ${
              incubate ? "block" : "hidden"
            } absolute left-0 top-0 z-10 flex size-full items-center bg-gray-950 text-left text-3xl md:text-5xl lg:text-7xl`}
          >
            &middot; Incubate.
          </div>
        </div>
      </div>
      <div
        className={`boxmb block h-screen w-screen md:hidden ${
          boxmb ? "hidden" : "block"
        }`}
      >
        <div className="z-50 flex h-screen w-screen items-center justify-center bg-black font-inter">
          <p className="font-inter text-5xl text-white ">We</p>
          <div
            className={`onemb ${
              ideatemb ? "block" : "hidden"
            } bg-black  text-left text-5xl text-white `}
          >
            &middot; Ideate.
          </div>
          <div
            className={`twomb ${
              innovatemb ? "block" : "hidden"
            } z-20 bg-black text-left text-5xl text-white `}
          >
            &middot; Innovate.
          </div>
          <div
            className={`threemb ${
              incubatemb ? "block" : "hidden"
            }  z-10  bg-gray-950 text-5xl text-white `}
          >
            &middot; Incubate.
          </div>
        </div>
      </div>
    </>
  );
};

export default DummyPage;
