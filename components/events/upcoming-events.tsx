import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

import upcomingEventsData from "../../data/upcoming-events.json";

interface Event {
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

const UpcomingEvents = () => {
  const events: Event[] = upcomingEventsData;

  // Fallback UI when no upcoming events
  if (events.length === 0) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="relative p-12 text-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-1/4 size-32 animate-pulse rounded-full bg-purple-500/10 blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 size-24 animate-pulse rounded-full bg-blue-500/10 blur-xl delay-1000"></div>
          </div>
          {/* Main content */}
          <div className="relative z-10">
            <div className="mb-6 animate-bounce text-8xl">🍳</div>
            <h2 className="mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              We are cooking something amazing!
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Stay tuned for exciting events coming your way ✨
            </p>
            {/* Decorative elements */}
            <div className="flex justify-center space-x-4">
              <div className="size-2 animate-pulse rounded-full bg-purple-500"></div>
              <div className="size-2 animate-pulse rounded-full bg-pink-500 delay-300"></div>
              <div className="size-2 animate-pulse rounded-full bg-red-500 delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all duration-500 hover:scale-105 hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Image section */}
              <div className="relative overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 rounded-full bg-purple-600 px-3 py-1 text-sm font-semibold text-white">
                  {event.date}
                </div>
              </div>
              {/* Content section */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-purple-400">
                  {event.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-gray-300">
                  {event.description}
                </p>
                {/* CTA Button */}
                <a
                  href={event.link}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <span>Learn More</span>
                  <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 blur transition-opacity duration-500 group-hover:opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
