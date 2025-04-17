"use client";

import { useState, useEffect, useCallback } from "react";
import { FaInstagram } from "react-icons/fa";

import { RetroGrid } from "../ui/retro-grid";

export default function Hero() {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  // Target date: April 17th, 2025
  const targetDate = new Date("2025-04-17T18:00:00").getTime();

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d < 10 ? `0${d}` : `${d}`);
      setHours(h < 10 ? `0${h}` : `${h}`);
      setMinutes(m < 10 ? `0${m}` : `${m}`);
      setSeconds(s < 10 ? `0${s}` : `${s}`);
    }
  }, [targetDate]);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-[#121212] px-4 py-8 md:py-12 lg:py-16">
      {/* Hack-celerate Logo */}
      <RetroGrid />
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
      </div>
      <div className="mb-5 text-center font-block text-4xl text-white">
        Registrations Opens in
      </div>
      {/* Countdown Section */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        {[
          { label: "DAYS", value: days },
          { label: "HOURS", value: hours },
          { label: "MINUTES", value: minutes },
          { label: "SECONDS", value: seconds },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm"
          >
            <div className="text-xl font-medium text-white sm:text-2xl">
              {item.value}
            </div>
            <div className="mt-1 text-xs tracking-wide text-gray-400">
              {item.label}
            </div>
          </div>
        ))}
      </div>
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
}
