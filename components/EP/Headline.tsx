import React from "react";

const Headline = () => {
  return (
    <div className="flex flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-8 text-center font-silkscreen text-4xl font-serif tracking-wide text-[#20ebda]">
        Empower Your Entrepreneurial Journey.
      </h1>
      <h1 className="mb-8 text-center font-silkscreen text-4xl font-serif tracking-wide text-[#1a6099]">
        Join our world-class entrepreneurship program designed to help
        innovators, creators, and dreamers succeed.
      </h1>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:space-x-8">
        {/* Paragraph on the left */}
        <p className="text-center text-lg text-gray-400">
          Apply Now,Learn More,Start Your Journey.
        </p>
      </div>
    </div>
  );
};

export default Headline;
