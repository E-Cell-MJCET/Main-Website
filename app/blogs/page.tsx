import React from "react";

import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import Blogs from "@/components/blogs/blogs";

const BlogPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full items-center justify-center">
        <Blogs />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
