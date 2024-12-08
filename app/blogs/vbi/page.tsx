import React from "react";

import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { VBI } from "@/components/blogs/vbi";

const VBI_Page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full items-center justify-center">
        <VBI />
      </div>
      <Footer />
    </div>
  );
};

export default VBI_Page;
