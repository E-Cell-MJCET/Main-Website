"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Step9Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [language, setLanguage] = useState<string>("");
  const [accessibilityNeeds, setAccessibilityNeeds] = useState<string[]>([]);

  const accessibilityOptions = [
    "High-Contrast Mode",
    "Screen Reader Support",
    "Captions/Subtitles",
    "Keyboard Navigation",
    "Reduced Animations",
  ];

  const handleToggleAccessibility = (option: string) => {
    setAccessibilityNeeds((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    console.log("Preferred Language:", language);
    console.log("Accessibility Needs:", accessibilityNeeds);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Accessibility and Language Preferences 🌍
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Let us know your preferred language and any accessibility needs for an
          optimized learning experience.
        </p>
        {/* Language Selection */}
        <div className="mb-6">
          <label
            htmlFor="language"
            className="mb-2 block text-lg font-medium text-gray-700"
          >
            Preferred Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Mandarin">Mandarin</option>
          </select>
        </div>
        {/* Accessibility Needs */}
        <div className="mb-6">
          <label className="mb-2 block text-lg font-medium text-gray-700">
            Accessibility Needs
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {accessibilityOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleToggleAccessibility(option)}
                className={`rounded-lg border p-4 text-center font-medium transition ${
                  accessibilityNeeds.includes(option)
                    ? "border-blue-500 bg-blue-100 text-blue-800"
                    : "border-gray-300 bg-gray-100 text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-400"
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!language}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              !language
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step9Welcome;
