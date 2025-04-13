import React from "react";

import Dummy from "@/components/hack-celerate/Dummy";
import Hero from "@/components/hack-celerate/Hero";
import Navbar from "@/components/hack-celerate/NavBar";
import Cursor from "@/components/ui/cursor";

const page = () => {
  return (
    <div className="text-clip bg-[#121212] ">
      <Cursor />
      <Navbar />
      <Hero />
      <Dummy />
    </div>
  );
};

export default page;
