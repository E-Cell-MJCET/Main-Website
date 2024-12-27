import React from "react";

import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import LoginForm from "@/components/contactus/login-form";

const ContactUsPage = () => {
  return (
    <div>
      <Navbar />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
