"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Step5Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [preferDeadlines, setPreferDeadlines] = useState(false);
  const [preferredDeadline, setPreferredDeadline] = useState("");

  const scheduleOptions = ["Morning", "Afternoon", "Evening", "Flexible"];
  const deadlineOptions = ["1 week", "2 weeks", "3 weeks", "1 month"];

  const handleNext = () => {
    console.log("Preferred Schedule:", preferredSchedule);
    console.log("Prefer Deadlines:", preferDeadlines);
    if (preferDeadlines) {
      console.log("Preferred Deadline:", preferredDeadline);
    }
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-50 to-teal-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          When do you prefer to learn? 📅
        </h2>
        {/* Preferred Schedule Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Select your preferred schedule:
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {scheduleOptions.map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  preferredSchedule === option
                    ? "border-teal-500 bg-teal-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => setPreferredSchedule(option)}
              >
                <input
                  type="radio"
                  name="preferredSchedule"
                  value={option}
                  checked={preferredSchedule === option}
                  onChange={() => setPreferredSchedule(option)}
                  className="form-radio size-5 text-teal-500"
                />
                <span className="font-medium text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Deadline Preference */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Do you prefer deadlines to stay on track and avoid procrastination?
          </h3>
          <div className="mb-2 flex space-x-4">
            <label
              className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                preferDeadlines
                  ? "border-teal-500 bg-teal-100"
                  : "border-gray-300 bg-gray-100"
              }`}
              onClick={() => setPreferDeadlines(true)}
            >
              <input
                type="radio"
                name="preferDeadlines"
                checked={preferDeadlines}
                onChange={() => setPreferDeadlines(true)}
                className="form-radio size-5 text-teal-500"
              />
              <span className="font-medium text-gray-700">Yes</span>
            </label>
            <label
              className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                !preferDeadlines
                  ? "border-teal-500 bg-teal-100"
                  : "border-gray-300 bg-gray-100"
              }`}
              onClick={() => setPreferDeadlines(false)}
            >
              <input
                type="radio"
                name="preferDeadlines"
                checked={!preferDeadlines}
                onChange={() => setPreferDeadlines(false)}
                className="form-radio size-5 text-teal-500"
              />
              <span className="font-medium text-gray-700">No</span>
            </label>
          </div>
          <p className="text-sm text-gray-600">
            Deadlines are dynamic and can be adjusted, but they encourage consistency and help you avoid procrastination.
          </p>
        </div>
        {/* Preferred Deadline Selection */}
        {preferDeadlines && (
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">
              Select your preferred deadline:
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {deadlineOptions.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                    preferredDeadline === option
                      ? "border-teal-500 bg-teal-100"
                      : "border-gray-300 bg-gray-100"
                  }`}
                  onClick={() => setPreferredDeadline(option)}
                >
                  <input
                    type="radio"
                    name="preferredDeadline"
                    value={option}
                    checked={preferredDeadline === option}
                    onChange={() => setPreferredDeadline(option)}
                    className="form-radio size-5 text-teal-500"
                  />
                  <span className="font-medium text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
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
              !preferredSchedule ||
              (preferDeadlines && !preferredDeadline)
            }
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              !preferredSchedule ||
              (preferDeadlines && !preferredDeadline)
                ? "cursor-not-allowed bg-gray-300"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step5Welcome;
