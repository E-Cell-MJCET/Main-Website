import React from "react";
import Image from "next/image";

import why from "../../public/assets/membership/why.jpg";

const WhyMembership = () => {
  return (
    <div className="flex flex-col items-center bg-black p-6 text-white">
      <h1 className="mb-8 text-center font-silkscreen text-4xl font-extrabold tracking-wide text-[#f6e445]">
        Why Membership?
      </h1>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:space-x-8">
        {/* Paragraph on the left */}
        <p className="text-center text-lg text-gray-400">
          As an E-Cell member, you&apos;ll engage in discussions with
          accomplished entrepreneurs through informal chats, Q&A sessions, or
          mentorship meetings. We will also host seminars where successful
          entrepreneurs share their insights and experiences. These interactions
          offer valuable knowledge, guidance, and inspiration to help shape your
          entrepreneurial journey.
        </p>
        <Image
          src={why}
          alt="why membership"
          width={500}
          height={300}
          className="mt-10 rounded-xl"
        />
      </div>
    </div>
  );
};

export default WhyMembership;
