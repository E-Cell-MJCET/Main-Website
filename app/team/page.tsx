import React from "react";

import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import TeamsContainer from "@/components/teams/TeamsContainer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <TeamsContainer />
      <Footer />
    </div>
  );
};

export default Page;
