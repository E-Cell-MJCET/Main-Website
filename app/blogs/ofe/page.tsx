import React from "react";

import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { OFE } from "@/components/blogs/ofe";

const OFE_Page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full items-center justify-center">
        <OFE />
      </div>
      <Footer />
    </div>
  );
};

export default OFE_Page;
