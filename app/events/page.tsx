import React from "react";

import UpcomingEvents from "@/components/events/upcoming-events";
import PreviousEvents from "@/components/events/previous-events";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

const EventsPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Global synchronized animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 size-64 animate-pulse rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 size-48 animate-pulse rounded-full bg-blue-500/5 blur-3xl delay-1000"></div>
        <div className="bg-pink-500/3 delay-2000 absolute left-1/2 top-1/2 size-32 animate-pulse rounded-full blur-2xl"></div>
        <div className="bg-cyan-500/4 delay-3000 absolute left-3/4 top-1/3 size-40 animate-pulse rounded-full blur-3xl"></div>
        <div className="bg-violet-500/3 delay-4000 absolute bottom-1/3 left-1/3 size-56 animate-pulse rounded-full blur-3xl"></div>
      </div>
      <Navbar />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden pb-20 pt-32">
          <div className="container mx-auto px-6 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent md:text-7xl">
              Events
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Discover our exciting upcoming events and relive the moments from
              our amazing past events
            </p>
          </div>
        </div>
        {/* Upcoming Events Section */}
        <section className="relative">
          <div className="container mx-auto px-6 pb-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Upcoming Events
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
            </div>
          </div>
          <UpcomingEvents />
        </section>
        {/* Previous Events Section */}
        <section className="relative pt-16">
          <div className="container mx-auto px-6 pb-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Previous Events
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
            </div>
          </div>
          <PreviousEvents />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
