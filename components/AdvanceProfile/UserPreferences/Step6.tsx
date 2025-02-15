"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdInfoOutline } from "react-icons/md";

const Step6Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [ageGroup, setAgeGroup] = useState("");
  const [culturalPreference, setCulturalPreference] = useState("");
  const [motivationalFactor, setMotivationalFactor] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const ageGroups = ["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"];
  const culturalPreferences = ["Western", "Eastern", "Global", "Local"];
  const motivationalFactors = [
    "Achieving a goal",
    "Gaining recognition",
    "Personal growth",
    "Curiosity",
  ];

  const handleNext = () => {
    console.log("Age Group:", ageGroup);
    console.log("Cultural Preference:", culturalPreference);
    console.log("Motivational Factor:", motivationalFactor);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-50 to-red-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Let’s understand more about you 🌟
        </h2>
        {/* Age Group Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Select your age group:
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ageGroups.map((group) => (
              <label
                key={group}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  ageGroup === group
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => setAgeGroup(group)}
              >
                <input
                  type="radio"
                  name="ageGroup"
                  value={group}
                  checked={ageGroup === group}
                  onChange={() => setAgeGroup(group)}
                  className="form-radio size-5 text-red-500"
                />
                <span className="font-medium text-gray-700">{group}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Cultural Preference Selection */}
        <div className="relative mb-6">
          <h3 className="mb-3 flex items-center text-lg font-medium text-gray-700">
            What’s your cultural preference?{" "}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="ml-2 text-gray-500 hover:text-gray-700"
              aria-label="Learn about cultural preferences"
            >
              <MdInfoOutline />
            </button>
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {culturalPreferences.map((preference) => (
              <label
                key={preference}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  culturalPreference === preference
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => setCulturalPreference(preference)}
              >
                <input
                  type="radio"
                  name="culturalPreference"
                  value={preference}
                  checked={culturalPreference === preference}
                  onChange={() => setCulturalPreference(preference)}
                  className="form-radio size-5 text-red-500"
                />
                <span className="font-medium text-gray-700">{preference}</span>
              </label>
            ))}
          </div>
          {/* Info Popup */}
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full mt-2 w-full rounded-lg border border-gray-300 bg-white p-4 shadow-lg sm:w-2/3"
            >
              <p className="text-sm text-gray-700">
                <strong>Cultural preference</strong> helps us understand your
                background and tailor the content to resonate with your values,
                traditions, and interests. It’s important because it ensures
                the learning experience feels more relevant and engaging for
                you.
              </p>
              <button
                onClick={() => setShowInfo(false)}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
        {/* Motivational Factors Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            What motivates you the most?
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {motivationalFactors.map((factor) => (
              <label
                key={factor}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  motivationalFactor === factor
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => setMotivationalFactor(factor)}
              >
                <input
                  type="radio"
                  name="motivationalFactor"
                  value={factor}
                  checked={motivationalFactor === factor}
                  onChange={() => setMotivationalFactor(factor)}
                  className="form-radio size-5 text-red-500"
                />
                <span className="font-medium text-gray-700">{factor}</span>
              </label>
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
            disabled={!ageGroup || !culturalPreference || !motivationalFactor}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              !ageGroup || !culturalPreference || !motivationalFactor
                ? "cursor-not-allowed bg-gray-300"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step6Welcome;
