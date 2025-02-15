"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Step4Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
  const [background, setBackground] = useState("");

  const skillLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ];

  const handleNext = () => {
    console.log("Skill Level:", selectedSkillLevel);
    console.log("Background:", background);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-yellow-50 to-orange-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          What’s your current skill level and background? 📊📚
        </h2>
        {/* Skill Level Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Select your skill level:
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skillLevels.map((level) => (
              <label
                key={level}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  selectedSkillLevel === level
                    ? "border-orange-500 bg-orange-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => setSelectedSkillLevel(level)}
              >
                <input
                  type="radio"
                  name="skillLevel"
                  value={level}
                  checked={selectedSkillLevel === level}
                  onChange={() => setSelectedSkillLevel(level)}
                  className="form-radio size-5 text-orange-500"
                />
                <span className="font-medium text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Background Input */}
        <div className="mb-6">
          <label
            htmlFor="background"
            className="mb-2 block text-lg font-medium text-gray-700"
          >
            Share a bit about your background (optional):
          </label>
          <textarea
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="Describe your prior experience, educational background, or anything else you'd like us to know."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-orange-500 focus:ring-orange-500"
          ></textarea>
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
            disabled={!selectedSkillLevel}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              !selectedSkillLevel
                ? "cursor-not-allowed bg-gray-300"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step4Welcome;
