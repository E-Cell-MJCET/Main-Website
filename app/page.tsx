"use client";
import { useState } from "react";

import DummyPage from "@/components/LandingPage/DummyPage";
import LandingPage from "@/components/LandingPage/LandingPage";
import Navbar from "@/components/LandingPage/Navbar";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <div className="max-w-screen overflow-hidden">
      <Navbar />
      <div
        className={`fixed z-50 h-screen w-full ${
          loading ? "block" : "hidden"
        } `}
      >
        <DummyPage handleLoading={handleLoading} />
      </div>
      <div className="overflow-hidden ">
        <LandingPage />
      </div>
    </div>
  );
}
