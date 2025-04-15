"use client";
import { useState } from "react";

import DummyPage from "@/components/LandingPage/DummyPage";
import LandingPage from "@/components/LandingPage/LandingPage";
import Navbar from "@/components/LandingPage/Navbar";
import { SmoothScrollHero } from "@/components/LandingPage/NewHero";
import { LaJoker } from "@/components/LandingPage/LaJoker";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <div className="">
      <Navbar/>
      <div
        className={`fixed z-50 h-screen w-full ${
          loading ? "block" : "hidden"
        } `}
      >
        <DummyPage handleLoading={handleLoading} />
      </div>
      <SmoothScrollHero />
      <div className="overflow-hidden ">
        <LandingPage />
      </div>
      <div className="bg-black">
        <LaJoker/>
      </div>
    </div>
  );
}
