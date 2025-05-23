import React from "react";

import GBComponent from "@/components/teams/gb";
import TeamComponent from "@/components/teams/execom";
import CoreTeamComponent from "@/components/teams/CoreTeamFixed";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <GBComponent />
      <TeamComponent />
      <CoreTeamComponent />
      <Footer />
    </div>
  );
};

export default Page;
