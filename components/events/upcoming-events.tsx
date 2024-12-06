import React from 'react';
import Image from 'next/image';
import { FaArrowRightLong } from "react-icons/fa6";

const UpcomingEvents = () => {
  const events = [
    {
      title: 'Market Mayhem',
      date: 'October 29',
      description: 'Round 1. Guess the Price: Estimate the prices of various products Round 2. Guess the Brand Using Emojis: Identify brands based on emoji clues. Round 3. Debate: Teams engage in a marketing-related debate. Round 4. Surprise Round: A mystery challenge revealed on the spot. Participants: Duo: ₹60 Teams of up to 4 members: ₹100 Free for E-cell members',
      image: '/assets/events/market-mayhem.png', // replace with actual image URL
      link: '#',
    },

  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-wrap justify-center gap-6 p-5">
        {events.map((event, index) => (
          <div key={index}
            className="bg-black-200 h-[600px] max-w-sm rounded-lg border border-[#0b5db0] p-[3px] transition duration-300 hover:scale-105 hover:border-[#ff403c]">
            <Image
              src={event.image}
              alt={event.title}
              width={300}
              height={200}
              className="h-[190px] w-full object-cover"
            />
            <div className="flex h-[410px] flex-col justify-between p-4 text-left">
              <div>
                <h2 className="mb-2 text-xl font-bold text-white">{event.title}</h2>
                <p className="mb-2 text-sm text-gray-500">{event.date}</p>
                <p className="text-white-700 mb-4 text-ellipsis ">{event.description}</p>
              </div>
              <a href={event.link} className="mb-2 mt-10 flex flex-row items-center justify-between rounded-md bg-purple-400 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
                Learn more <FaArrowRightLong/>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
