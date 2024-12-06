import React from "react";
import Head from "next/head";
import { Metadata } from "next";

import Hero from "@/components/membership/Hero";
import Navbar from "@/components/membership/NavbarMem";
import { Perks } from "@/components/membership/perks";
import Story from "@/components/membership/Story/story";
import WhyMembership from "@/components/membership/why-membership";
import Faq from "@/components/membership/Faq";
import Footer from "@/components/LandingPage/Footer";

export const metadata: Metadata = {
  title: "E-Cell Membership | Unlock Exclusive Tech & Startup Perks",
  description:
    "Join E-Cell and gain exclusive access to startup acceleration, networking with industry leaders, tech events, mentorship, and skill-building opportunities. Elevate your entrepreneurial journey today!",
};

const MembershipPage = () => {
  return (
    <>
      <Head>
        <title>E-Cell Membership | Unlock Exclusive Tech & Startup Perks</title>
        <meta
          name="description"
          content="Join E-Cell and gain exclusive access to startup acceleration, networking with industry leaders, tech events, mentorship, and skill-building opportunities. Elevate your entrepreneurial journey today!"
        />
        <meta
          name="keywords"
          content="E-Cell, tech club membership, startup acceleration, networking events, entrepreneurship, tech help desk, soft skills, pitch events, resume building"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="E-Cell Membership | Unlock Exclusive Tech & Startup Perks"
        />
        <meta
          property="og:description"
          content="Join E-Cell and gain exclusive access to startup acceleration, networking with industry leaders, tech events, mentorship, and skill-building opportunities. Elevate your entrepreneurial journey today!"
        />
        <meta
          property="og:image"
          content="https://ecellmjcet.com/assets/Logo/logo-big-colour.png"
        />
        <meta property="og:url" content="https://ecellmjcet.com/membership" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="E-Cell Membership | Unlock Exclusive Tech & Startup Perks"
        />
        <meta
          name="twitter:description"
          content="Join E-Cell and gain exclusive access to startup acceleration, networking with industry leaders, tech events, mentorship, and skill-building opportunities."
        />
        <meta
          name="twitter:image"
          content="https://ecellmjcet.com/assets/Logo/logo-big-colour.png"
        />
        <link rel="canonical" href="https://ecellmjcet.com/membership" />
      </Head>
      <div className="max-w-screen overflow-hidden">
        <Navbar />
        <Hero />
        <WhyMembership />
        <Perks />
        <Story />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default MembershipPage;
