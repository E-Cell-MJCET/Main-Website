import React from "react";

import { SBS } from "@/components/blogs/sbs";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

const BlogPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full items-center justify-center">
        {/* <TRE /> */}
        {/* <VBI/> */}
        {/* <OFE/> */}
        <SBS />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
