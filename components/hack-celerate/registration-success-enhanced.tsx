"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function RegistrationSuccessEnhanced() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="animate-[fadeIn_0.5s_ease-in] font-silkscreen text-lg text-white sm:text-xl md:text-2xl">
          Registration Complete!
        </h3>
        <p className="mt-1 animate-[fadeIn_0.8s_ease-in] text-sm text-gray-400 sm:text-base">
          You&apos;re officially part of Hackcelerate 2025!
        </p>
        <p className="mt-2 animate-[fadeIn_1s_ease-in] text-sm text-green-400 sm:text-base">
          This is the confirmation that we have received your application — no
          worries, just chill! 🎉
        </p>
      </div>
      {/* Success Animation */}
      <div className="relative flex justify-center py-4">
        <div
          className={`relative flex size-24 items-center justify-center rounded-full border-4 border-[#7BF1A7] bg-[#323232]/50 sm:size-28 md:size-32 ${
            showAnimation
              ? "animate-[scaleIn_0.5s_cubic-bezier(0.17,0.67,0.83,0.67)]"
              : "scale-0 opacity-0"
          }`}
        >
          <Check className="size-12 animate-[bounceIn_1s_ease-in-out_0.5s] text-[#7BF1A7] sm:size-14 md:size-16" />
          <div
            className={`absolute inset-0 rounded-full border-4 border-[#7BF1A7] opacity-0 ${
              showAnimation
                ? "animate-[ping_1s_cubic-bezier(0,0,0.2,1)_0.8s]"
                : ""
            }`}
          ></div>
          <div
            className={`absolute inset-0 rounded-full bg-[#7BF1A7] opacity-0 blur-xl ${
              showAnimation ? "animate-[glow_2s_ease-in-out_1s_infinite]" : ""
            }`}
          ></div>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-8 flex animate-[fadeIn_1s_ease-in_1.2s_both] flex-col gap-4 sm:flex-row sm:justify-around">
        <Link
          href="https://chat.whatsapp.com/DOViTi8NHvH0LnapNsznoX"
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-700 px-6 py-3 font-silkscreen text-white transition-all hover:scale-105 hover:bg-gray-600 sm:w-auto"
        >
          <span>Join Community</span>
        </Link>
      </div>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes glow {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
