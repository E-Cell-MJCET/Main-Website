"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Step8Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [comfortZone, setComfortZone] = useState(3);
  const [ultimateGoal, setUltimateGoal] = useState("");
  const [learnerTypes, setLearnerTypes] = useState<string[]>([]);
  const [courseLength, setCourseLength] = useState("");

  const handleToggleLearnerType = (type: string) => {
    setLearnerTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleNext = () => {
    console.log("Comfort Zone Level:", comfortZone);
    console.log("Ultimate Goal:", ultimateGoal);
    console.log("Learner Types:", learnerTypes);
    console.log("Course Length:", courseLength);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-teal-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Let’s dive deeper into your preferences 🌟
        </h2>
        {/* Comfort Zone Question */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            How open are you to exploring new topics outside your comfort zone? 🌍
          </h3>
          <input
            type="range"
            min="1"
            max="5"
            value={comfortZone}
            onChange={(e) => setComfortZone(Number(e.target.value))}
            className="w-full"
          />
          <p className="mt-2 text-center text-gray-600">
            {comfortZone === 1
              ? "I prefer staying within my current interests."
              : comfortZone === 5
              ? "I’m highly curious about exploring new things."
              : `Level ${comfortZone}`}
          </p>
        </div>
        {/* Ultimate Goal Question */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            What is your ultimate goal with this domain? 🎯
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {["Learn for fun", "Build a side hustle", "Become a professional", "Academic interest", "Other"].map(
              (goal) => (
                <label
                  key={goal}
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                    ultimateGoal === goal
                      ? "border-green-500 bg-green-100"
                      : "border-gray-300 bg-gray-100"
                  }`}
                  onClick={() => setUltimateGoal(goal)}
                >
                  <input
                    type="radio"
                    name="ultimateGoal"
                    value={goal}
                    checked={ultimateGoal === goal}
                    onChange={() => setUltimateGoal(goal)}
                    className="form-radio size-5 text-green-500"
                  />
                  <span className="font-medium text-gray-700">{goal}</span>
                </label>
              )
            )}
          </div>
        </div>
        {/* Learner Type Question */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            What type of learner are you? 📚
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {["Hobbyist", "Aspiring professional", "Academic learner"].map(
              (type) => (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                    learnerTypes.includes(type)
                      ? "border-green-500 bg-green-100"
                      : "border-gray-300 bg-gray-100"
                  }`}
                  onClick={() => handleToggleLearnerType(type)}
                >
                  <input
                    type="checkbox"
                    name="learnerType"
                    value={type}
                    checked={learnerTypes.includes(type)}
                    onChange={() => handleToggleLearnerType(type)}
                    className="form-checkbox size-5 text-green-500"
                  />
                  <span className="font-medium text-gray-700">{type}</span>
                </label>
              )
            )}
          </div>
        </div>
        {/* Course Length Question */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            How long should your course be? ⏳
          </h3>
          <select
            value={courseLength}
            onChange={(e) => setCourseLength(e.target.value)}
            className="w-full rounded-lg border bg-gray-600 p-3 focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select duration
            </option>
            <option value="Short">Short (1-3 weeks)</option>
            <option value="Medium">Medium (1-3 months)</option>
            <option value="Long">Long (3+ months)</option>
          </select>
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
            disabled={
              !comfortZone || !ultimateGoal || learnerTypes.length === 0 || !courseLength
            }
            className={`rounded-lg px-6 py-3 font-semibold text-black transition ${
              !comfortZone || !ultimateGoal || learnerTypes.length === 0 || !courseLength
                ? "cursor-not-allowed bg-gray-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step8Welcome;
