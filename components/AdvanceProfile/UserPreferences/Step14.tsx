"use client";
import React from 'react';
import { motion } from "framer-motion";

const Step14Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const handleNext = () => {
    console.log("Step 14 completed");
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-amber-50 to-yellow-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Step 14
        </h2>
        <div className="mb-6">
          <p className="text-center text-gray-600">
            14 is here
          </p>
          {/* Add your form content here */}
          <div className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <p className="text-center text-gray-500">This section is under construction</p>
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
            className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step14Welcome;