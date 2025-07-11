import React from "react";
import { BsLightbulbFill } from "react-icons/bs";
import { FaFlagCheckered, FaAward } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";

const About = () => {
  return (
    <div className="mx-auto w-full">
      {" "}
      <div className="max-w-screen bg-black px-6 py-16 md:px-12">
        <h2 className="mb-10 text-center font-block text-4xl font-bold text-[#7BF1A7]">
          About Hack<span className="text-[#ebebeb]">celerate</span>
        </h2>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left Paragraph Section */}
          <div className="space-y-6 text-left md:w-1/2">
            <p className="font-block text-3xl text-gray-300">
              Hackcelerate – Brought to you by E-Cell MJCET
            </p>
            <p className="text-lg text-gray-300">
              In a world driven by ideas, it is not just about thinking big it
              is about building fast. As innovation becomes the currency of the
              future, the need for agile, impact-driven problem solvers is more
              important than ever. That’s where we come in.
            </p>
            <p className="text-lg text-gray-300">
              Hackcelerate is a high-energy hackathon by E-Cell MJCET, where
              innovation meets execution. It&apos;s a space for developers,
              designers, and problem-solvers to create solutions that can make a
              difference. Participants can build with the potential to launch
              real solutions, potentially earning, scaling, and sustaining. The
              event also offers opportunities to explore how projects can evolve
              into revenue-generating products or businesses.
            </p>
          </div>
          {/* Stat Boxes Section */}
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-2 md:w-1/2">
            {[
              {
                value: "Build",
                label: "Real World Projects",
                icon: <BsLightbulbFill className="size-8 text-[#7BF1A7]" />,
              },
              {
                value: "1 TO 6",
                label: "Per Team",
                icon: <RiTeamFill className="size-8 text-[#7BF1A7]" />,
              },
              {
                value: "Win",
                label: "Exciting Prizes",
                icon: <FaAward className="size-8 text-[#7BF1A7]" />,
              },
              {
                value: "3",
                label: "Rounds",
                icon: <FaFlagCheckered className="size-8 text-[#7BF1A7]" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex h-48 w-full flex-col items-center justify-center rounded-xl border border-gray-600 bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="w">{item.icon}</div>
                <h3 className="mt-3 text-xl font-bold text-white md:text-4xl">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm font-medium text-gray-300 md:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
