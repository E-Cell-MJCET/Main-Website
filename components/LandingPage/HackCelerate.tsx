import React from "react";
import { FaInstagram } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import github from "../../public/assets/Logo/github.png";

const HackCelerate = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-black px-4 py-8 md:py-12 lg:py-16">
      {/* Hack-celerate Logo */}
      <div className="mb-12 text-center md:mb-16">
        <h6 className="text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          <div className="flex flex-col space-x-1 md:flex-row">
            <div>
              {"HACK".split("").map((char, i) => (
                <h6
                  key={i}
                  className="cursor-pointer font-silkscreen text-[#7BF1A7] transition-all duration-300 hover:-rotate-3 hover:scale-105 hover:text-[#A0F0FF]"
                  style={{
                    textShadow: "-4px -4px 0 #3A6695, -8px -8px 0 #3A6695",
                    display: "inline-block",
                  }}
                >
                  {char}
                </h6>
              ))}
            </div>
            <div>
              {"-CELERATE".split("").map((char, i) => (
                <h6
                  key={`c-${i}`}
                  className="cursor-pointer font-silkscreen text-white transition-all duration-300 hover:rotate-3 hover:scale-105 hover:text-[#E0F7FF]"
                  style={{
                    textShadow: "-4px -4px 0 #3A6695, -8px -8px 0 #3A6695",
                    display: "inline-block",
                  }}
                >
                  {char}
                </h6>
              ))}
            </div>
          </div>
        </h6>
        <div className="mt-2 flex items-end justify-end gap-5">
          <h1 className="font-block text-3xl text-white">Powered by</h1>
          <Image
            src={github}
            width={150}
            height={150}
            alt="Github Logo"
            id="github"
          />
        </div>
      </div>
      <Link
        href={"/hackcelerate"}
        onClick={() => {}}
        className="rounded-xl bg-[#7BF1A7] px-5 py-2 font-block shadow-[0_0_15px_#7BF1A7] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#7BF1A7]"
      >
        Know more
      </Link>
      {/* Follow us section */}
      <div className="mt-20 flex flex-col items-center space-y-3">
        <p className="text-center font-silkscreen text-xl tracking-wide text-white">
          For latest updates follow
        </p>
        <a
          href="https://www.instagram.com/ecellmjcet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-transform duration-200 hover:scale-110"
        >
          <div className="flex flex-row items-center justify-center space-x-2">
            <FaInstagram className="size-8 text-[#7BF1A7]" />
            <p className="font-block text-xl underline">@ecellmjcet</p>
          </div>
        </a>
      </div>
      <div className="mt-20 flex flex-col items-center space-y-3 md:-mb-36">
        <p className="text-center font-silkscreen text-2xl tracking-wide text-white md:text-3xl">
          Cash prizes will be announced soon
        </p>
      </div>
    </section>
  );
};

export default HackCelerate;
