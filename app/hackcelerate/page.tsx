import About from "@/components/hack-celerate/About";
import FaqSection from "@/components/hack-celerate/faqs";
import Hero from "@/components/hack-celerate/Hero";
import Navbar from "@/components/hack-celerate/NavBar";
import SponsorUs from "@/components/hack-celerate/sponsor-contact-us";
import TimeLine1 from "@/components/hack-celerate/TimeLine1";
import Cursor from "@/components/ui/cursor";
import Footer from "@/components/hack-celerate/Footer";
import TimelineMB from "@/components/hack-celerate/TimeLineMB";

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
        <TimeLine1 />
        <TimelineMB />
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
