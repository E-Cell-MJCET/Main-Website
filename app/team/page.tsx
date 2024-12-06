import React from "react";

import GBComponent from "@/components/teams/gb";
import TeamComponent from "@/components/teams/execom";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <GBComponent />
      <TeamComponent />
      <Footer />
    </div>
  );
};

export default Page;
