"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 3 + 1;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Add a small delay before completing
      const timeout = setTimeout(() => {
        setIsComplete(true);
        if (onLoadingComplete) onLoadingComplete();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [progress, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Logo */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center md:flex-row">
              <div className="flex">
                {"HACK".split("").map((char, i) => (
                  <motion.div
                    key={i}
                    className="font-silkscreen text-5xl text-[#7BF1A7] md:text-6xl"
                    style={{
                      textShadow: "-4px -4px 0 #3A6695, -8px -8px 0 #3A6695",
                      display: "inline-block",
                    }}
                  >
                    {char}
                  </motion.div>
                ))}
              </div>
              <div className="flex">
                {"-CELERATE".split("").map((char, i) => (
                  <motion.div
                    key={`c-${i}`}
                    className="font-silkscreen text-5xl text-white md:text-6xl"
                    style={{
                      textShadow: "-4px -4px 0 #3A6695, -8px -8px 0 #3A6695",
                      display: "inline-block",
                    }}
                  >
                    {char}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            className="relative h-1 w-64 overflow-hidden rounded-full bg-white/10 md:w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#7BF1A7]"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.div>

          {/* Progress percentage */}
          <motion.div
            className="mt-4 font-silkscreen text-lg text-[#E0F7FF]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="mt-2 font-block text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            LOADING
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
