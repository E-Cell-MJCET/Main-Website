"use client"
import DummyPage from "@/components/LandingPage/DummyPage";
import LandingPage from "@/components/LandingPage/LandingPage"
import Navbar from "@/components/LandingPage/Navbar";
import { useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const mainRef = useRef<HTMLElement | null>(null);

  const  handleLoading = ()=>{
    setLoading(false);
  }
  return (
    <div className="max-w-screen overflow-hidden">
      
       <Navbar/>
      <div
        className={`fixed w-full h-screen z-50 ${
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
