import About from "@/components/hack-celerate/About";
import FaqSection from "@/components/hack-celerate/faqs";
import Hero from "@/components/hack-celerate/Hero";
import Navbar from "@/components/hack-celerate/NavBar";
import SponsorUs from "@/components/hack-celerate/sponsor-contact-us";
import Cursor from "@/components/ui/cursor";
import Footer from "@/components/hack-celerate/Footer";
import GuidelinesRules from "@/components/hack-celerate/GuidelinesRules";
import TimelineNW from "@/components/hack-celerate/Tmnw";

export default function HackceleratePage() {
  return (
    <div className="bg-[#121212] ">
      <Cursor />
      <Navbar />
      <div id="Home">
        <Hero />
      </div>
      <div id="About">
        <About />
      </div>
      <div id="Timeline">
        <TimelineNW/>
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
    </div>
  );
}
