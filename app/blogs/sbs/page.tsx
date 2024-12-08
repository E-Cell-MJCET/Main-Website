import React from "react";

import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { SBS } from "@/components/blogs/sbs";

const SBS_Page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full items-center justify-center">
        <SBS />
      </div>
      <Footer />
    </div>
  );
};

export default SBS_Page;
