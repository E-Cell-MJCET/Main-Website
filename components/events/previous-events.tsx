import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

import previousEventsData from "../../data/previous-events.json";

interface Event {
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

const PreviousEvents = () => {
  const events: Event[] = previousEventsData;

  if (events.length === 0) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="relative p-12 text-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-1/4 size-32 animate-pulse rounded-full bg-blue-500/10 blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 size-24 animate-pulse rounded-full bg-purple-500/10 blur-xl delay-1000"></div>
          </div>
          {/* Main content */}
          <div className="relative z-10">
            <div className="mb-6 text-8xl">📅</div>
            <h2 className="mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              No previous events yet
            </h2>
            <p className="mb-8 text-xl text-gray-300">
              Check back later for our amazing event history! 🎉
            </p>
            {/* Decorative elements */}
            <div className="flex justify-center space-x-4">
              <div className="size-2 animate-pulse rounded-full bg-blue-500"></div>
              <div className="size-2 animate-pulse rounded-full bg-purple-500 delay-300"></div>
              <div className="size-2 animate-pulse rounded-full bg-pink-500 delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all duration-500 hover:scale-105 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              {/* Image section */}
              <div className="relative overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={220}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {event.date}
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
                  Past Event
                </div>
              </div>
              {/* Content section */}
              <div className="p-5">
                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
                  {event.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm text-gray-300">
                  {event.description}
                </p>
                {/* CTA Button */}
                <a
                  href={event.link}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span>View Details</span>
                  <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 blur transition-opacity duration-500 group-hover:opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousEvents;
