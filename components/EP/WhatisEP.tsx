import React from "react";

const WhatisEP = () => {
  return (
    <div className="flex flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-8 text-center font-silkscreen text-4xl font-extrabold tracking-wide text-[#f6e445]">
        What is EP?
      </h1>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:space-x-8">
        {/* Paragraph on the left */}
        <p className="text-left text-lg text-gray-400">
          The Entrepreneurship Program is designed to ignite creativity and
          empower aspiring innovators to transform bold ideas into impactful,
          real-world ventures. This dynamic program offers a comprehensive blend
          of interactive activities, hands-on workshops, and personalized
          mentorship to guide participants at every stage of their
          entrepreneurial journey.
          <p className="text-left text-lg text-gray-400">
            Participants will gain critical skills in idea generation, strategic
            planning, business development, and market validation. The program
            provides an environment that fosters innovation, collaboration, and
            resilience, enabling participants to refine their concepts, build
            actionable strategies, and overcome challenges in launching
            successful startups.
          </p>
          <p className="text-left text-lg text-gray-400">
            Whether you’re a first-time entrepreneur or looking to scale your
            business, this program equips you with the tools, insights, and
            networks needed to accelerate your path to success. Join a vibrant
            community of innovators and industry leaders, and take the first
            step toward making your vision a reality
          </p>
        </p>
      </div>
    </div>
  );
};

export default WhatisEP;
