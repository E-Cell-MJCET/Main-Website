"use client";
import React from 'react';
import { motion } from "framer-motion";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

// Define the props interface
interface AboutProps {
  aboutText: string;
}

const About: React.FC<AboutProps> = ({ aboutText }) => {
  // Create title words for the typewriter effect
  const titleWords = [
    {
      text: "About",
      className: "text-blue-500 text-2xl dark:text-blue-500 font-bold",
    },
    {
      text: "Me",
      className: "text-2xl"
    }
  ];
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-300 to-blue-50 py-5 dark:from-gray-900 dark:to-blue-900">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-16 -top-16 size-64 rounded-full bg-blue-600 opacity-10 blur-3xl"></div>
        <div className="absolute right-10 top-20 size-48 rounded-full bg-indigo-500 opacity-15 blur-3xl"></div>
      </div>
      <div className="container relative z-20 mx-auto flex flex-col items-center justify-center px-4 py-12">
        {/* Title with TypeWriter Effect */}
        <div className="mb-8 text-center text-2xl">
          <TypewriterEffectSmooth words={titleWords} />
        </div>
        {/* About Text Content */}
        <motion.div 
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative rounded-xl bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:bg-gray-800/70">
            {/* Decorative Quote Mark */}
            <div className="absolute -left-9 -top-4 font-serif text-6xl text-blue-400 opacity-20">❝</div>
            <div className="absolute -bottom-8 -right-8 font-serif text-6xl text-blue-400 opacity-20">❞</div>
            {/* About Text with Line Height for Readability */}
            <p className="relative z-10 text-lg leading-relaxed text-gray-700 dark:text-blue-50">
              {aboutText}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;