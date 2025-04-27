"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

import { getAboutThemeStyles } from "../Themes/AboutTheme";

// Define the props interface
interface AboutProps {
  aboutText: string;
  theme?: string;
}

const About: React.FC<AboutProps> = ({ aboutText, theme = "Default" }) => {
  // Get theme-specific styles
  const themeStyles = useMemo(() => {
    return getAboutThemeStyles(theme);
  }, [theme]);

  // Create title words for the typewriter effect with theme-specific styles
  const titleWords = [
    { text: "About", className: themeStyles.title.primary },
    { text: "Me", className: themeStyles.title.secondary },
  ];

  return (
    <div className={themeStyles.container}>
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={themeStyles.backgroundGlow1}></div>
        <div className={themeStyles.backgroundGlow2}></div>
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
          <div className={themeStyles.contentWrapper}>
            {/* Decorative Quote Mark */}
            <div className={`${themeStyles.quoteMarks} -left-9 -top-4`}>❝</div>
            <div className={`${themeStyles.quoteMarks} -bottom-8 -right-8`}>
              ❞
            </div>
            {/* About Text with Line Height for Readability */}
            <p className={themeStyles.textContent}>{aboutText}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
