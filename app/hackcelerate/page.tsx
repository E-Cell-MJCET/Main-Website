import About from "@/components/hack-celerate/About";
import FaqSection from "@/components/hack-celerate/faqs";
import Hero from "@/components/hack-celerate/Hero";
import Navbar from "@/components/hack-celerate/NavBar";
import Organisers from "@/components/hack-celerate/organisers";
import SponsorUs from "@/components/hack-celerate/sponsor-contact-us";
import TimeLine1 from "@/components/hack-celerate/TimeLine1";
import Cursor from "@/components/ui/cursor";

export default function HackceleratePage() {
  return (
    <div>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <TimeLine1 />
      <Organisers />
      <SponsorUs />
      <FaqSection />
    </div>
  );
}
