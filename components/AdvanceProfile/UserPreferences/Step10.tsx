"use client";
import React from "react";
import { motion } from "framer-motion";

const Step10Welcome = ({
  onPrevious,
  onComplete,
}: {
  onPrevious: () => void;
  onComplete: () => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-50 to-teal-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Welcome to Your Learning Journey! 🎉
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Thank you for providing your preferences! Based on the information
          you`ve shared, we`ll create a personalized learning plan tailored
          specifically to your needs and goals.
        </p>
        {/* Summary Section */}
        <div className="mb-6 rounded-lg bg-gray-100 p-4">
          <h3 className="mb-4 text-lg font-medium text-gray-800">
            Here`s a quick summary of your preferences:
          </h3>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li><strong>Interests and Goals:</strong> Custom data placeholder</li>
            <li><strong>Learning Preferences:</strong> Custom data placeholder</li>
            <li><strong>Skill Level:</strong> Custom data placeholder</li>
            <li><strong>Schedule:</strong> Custom data placeholder</li>
            <li><strong>Accessibility Needs:</strong> Custom data placeholder</li>
            <li><strong>Language Preference:</strong> Custom data placeholder</li>
          </ul>
        </div>
        <p className="mb-8 text-center text-gray-600">
          You’re all set! Click below to start exploring your personalized
          learning journey.
        </p>
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
            onClick={onComplete}
            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600"
          >
            Complete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step10Welcome;
