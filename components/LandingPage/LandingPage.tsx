"use client";
import React from "react";

import Hero from "./Hero";
import Dummy from "./Dummy";
// import { Wobble } from './Wobble';
import JoinUs from "./JoinUs";
import Footer from "./Footer";
import About from "./About";
import { BentoGridDemo } from "./Bento";

const LandingPage = () => {
  return (
    <div className="max-w-screen overflow-hidden">
      <Dummy />
      <About />
      <BentoGridDemo />
      <Hero />
      {/* <WoobleMobile/> */}
      <div className="joinUsBox h-fit bg-slate-500">
        <JoinUs />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
