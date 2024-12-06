import React from "react";

import UpcomingEvents from "@/components/events/upcoming-events";
import PreviousEvents from "@/components/events/previous-events";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

const EventsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black p-8">
        <h1 className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-5xl font-extrabold text-transparent">
          Events
        </h1>
        <section className="mb-16 w-full text-center">
          <h2 className="mb-12 text-4xl font-semibold text-gray-800">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <UpcomingEvents />
        </section>
        <section className="w-full text-center">
          <h2 className="mb-12 text-4xl font-semibold text-gray-800">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Previous Events
            </span>
          </h2>
          <PreviousEvents />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
