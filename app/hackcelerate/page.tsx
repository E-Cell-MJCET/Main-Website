"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import About from "@/components/hack-celerate/About";
import FaqSection from "@/components/hack-celerate/faqs";
import Hero from "@/components/hack-celerate/Hero";
import Navbar from "@/components/hack-celerate/NavBar";
import SponsorUs from "@/components/hack-celerate/sponsor-contact-us";
import Cursor from "@/components/ui/cursor";
import Footer from "@/components/hack-celerate/Footer";
import GuidelinesRules from "@/components/hack-celerate/GuidelinesRules";
import Preloader from "@/components/hack-celerate/preloader";
import TimelineNW from "@/components/hack-celerate/Tmnw";

// import { Preloader } from "@/components/hack-celerate/preloader";

export default function HackceleratePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="bg-[#121212] ">
      <Cursor />
      <Preloader onLoadingComplete={handleLoadingComplete} />
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Navbar />
            <div id="Home">
              <Hero />
            </div>
            <div id="About">
              <About />
            </div>
            <div id="Timeline">
              <TimelineNW />
            </div>
            <div id="Guidelines">
              <GuidelinesRules />
            </div>
            <div id="FAQ">
              <FaqSection />
            </div>
            <div id="Contact">
              <SponsorUs />
            </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      {/* </Preloader> */}
    </div>
  );
}
