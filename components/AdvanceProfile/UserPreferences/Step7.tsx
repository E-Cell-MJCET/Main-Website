"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Step7Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [shortTermGoals, setShortTermGoals] = useState("");
  const [longTermGoals, setLongTermGoals] = useState("");
  const [industryPreference, setIndustryPreference] = useState("");

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Arts and Entertainment",
    "Other",
  ];

  const handleNext = () => {
    console.log("Short-Term Goals:", shortTermGoals);
    console.log("Long-Term Goals:", longTermGoals);
    console.log("Industry Preference:", industryPreference);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Let’s talk about your career goals 🎯
        </h2>
        {/* Short-Term Goals Input */}
        <div className="mb-6">
          <label htmlFor="shortTermGoals" className="mb-3 block text-lg font-medium text-gray-700">
            What are your short-term goals?
          </label>
          <textarea
            id="shortTermGoals"
            rows={4}
            placeholder="E.g., Learn Python, build a portfolio project..."
            value={shortTermGoals}
            onChange={(e) => setShortTermGoals(e.target.value)}
            className="w-full rounded-lg border p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        {/* Long-Term Goals Input */}
        <div className="mb-6">
          <label htmlFor="longTermGoals" className="mb-3 block text-lg font-medium text-gray-700">
            What are your long-term goals?
          </label>
          <textarea
            id="longTermGoals"
            rows={4}
            placeholder="E.g., Become a software engineer, start my own business..."
            value={longTermGoals}
            onChange={(e) => setLongTermGoals(e.target.value)}
            className="w-full rounded-lg border p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        {/* Industry Preference Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Which industry interests you the most?
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {industryOptions.map((industry) => (
              <label
                key={industry}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  industryPreference === industry
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => setIndustryPreference(industry)}
              >
                <input
                  type="radio"
                  name="industryPreference"
                  value={industry}
                  checked={industryPreference === industry}
                  onChange={() => setIndustryPreference(industry)}
                  className="form-radio size-5 text-blue-500"
                />
                <span className="font-medium text-gray-700">{industry}</span>
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
            disabled={!shortTermGoals || !longTermGoals || !industryPreference}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              !shortTermGoals || !longTermGoals || !industryPreference
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

export default Step7Welcome;
