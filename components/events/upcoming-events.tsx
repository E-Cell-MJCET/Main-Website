import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const UpcomingEvents = () => {
  const events = [
    {
      title: "Hack-Celerate",
      date: "May 11, 2025",
      description:
        "Hackcelerate 2025 by E-Cell MJCET is a high-energy tech hackathon that brings developers, designers, and entrepreneurs together to innovate, solve real-world problems, and build scalable, revenue-generating solutions.",
      image: "/assets/hackcel_banner_site.png", // replace with actual image URL
      link: "https://ecellmjcet.com/hackcelerate",
    },
  ];

  return (
    <div className="mt-10 flex items-center justify-center bg-black">
      <div className="flex flex-wrap justify-center gap-6 p-5">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-black-200 w-full rounded-lg border border-[#0b5db0] p-[3px] transition duration-300 hover:scale-105 hover:border-[#ff403c] sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={300}
              height={200}
              className="h-[190px] w-full object-cover"
            />
            <div className="flex flex-col justify-between p-4 text-left">
              <div>
                <h2 className="mb-2 text-xl font-bold text-white">
                  {event.title}
                </h2>
                <p className="mb-2 text-sm text-gray-200">{event.date}</p>
                <p className="mb-4 text-white">{event.description}</p>
              </div>
              <a
                href={event.link}
                className="mt-4 flex items-center justify-between rounded-md bg-purple-400 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
              >
                Learn more <FaArrowRightLong />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
