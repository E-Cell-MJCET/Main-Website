import React from "react";

import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { TRE } from "@/components/blogs/tre";

const TRE_Page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full items-center justify-center">
        <TRE />
      </div>
      <Footer />
    </div>
  );
};

export default TRE_Page;
