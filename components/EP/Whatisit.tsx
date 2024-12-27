import React from "react";

const Whatisit = () => {
  return (
    <div className="flex flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-8 text-center font-silkscreen text-4xl font-extrabold tracking-wide text-[#f6e445]">
        Who is it for?
      </h1>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:space-x-8">
        {/* Paragraph on the left */}
        <p className="text-center text-lg text-gray-400">
          The Entrepreneurship Program is for:
          <p className="text-left text-lg text-gray-400">
            1. Aspiring Entrepreneurs: Individuals with a business idea who want
            to turn it into a viable venture.
          </p>
          <p className="text-left text-lg text-gray-400">
            2. Early-Stage Startups: Founders looking to refine their
            strategies, validate their ideas, or scale their businesses.
          </p>
          <p className="text-left text-lg text-gray-400">
            3. Students and Recent Graduates: Young innovators eager to explore
            entrepreneurship and gain practical experience.
          </p>
          <p className="text-left text-lg text-gray-400">
            4. Professionals and Career Switchers: Those seeking to transition
            into entrepreneurship or apply innovative thinking to their
            industries.
          </p>
          <p className="text-left text-lg text-gray-400">
            5. Creatives and Innovators: People passionate about solving
            problems, creating impact, or building innovative solutions. If
            you’re driven, curious, and ready to embrace the entrepreneurial
            journey, this program is tailored to help you succeed!
          </p>
        </p>
      </div>
    </div>
  );
};

export default Whatisit;
