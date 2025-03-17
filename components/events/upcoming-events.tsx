import React from "react";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const UpcomingEvents = () => {
  const events = [
    {
      title: "Hack Revolution 2025",
      date: "January 05, 2025",
      description:
        "Ecell and CSI are back again with Hack Revolution . This 15-hour journey is all about pushing boundaries, where teams come together to build something meaningful from the ground up. It’s not just an event; it’s an experience that challenges you to innovate with purpose and passion.",
      image: "/assets/events/hackrev.png", // replace with actual image URL
      link: "https://hackrevolution.in",
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
