"use client"
import React, { useState } from 'react'
import Hero from './Hero';
import Dummy from './Dummy';
// import { Wobble } from './Wobble';
import JoinUs from './JoinUs';
import Footer from './Footer';

import About from './About';
import { BentoGridDemo } from './Bento';
const LandingPage = () => {
  const [loading,setLoading] = useState(false);
  const handleLoading = ()=>{
     setLoading(false);
  }
 
  return (
    <div className="max-w-screen overflow-hidden">
      <Dummy />
      <About />
      <BentoGridDemo/>
      <Hero />
      {/* <WoobleMobile/> */}
      <div className="bg-slate-500 h-fit joinUsBox">
        <JoinUs />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;