"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react"; 

// Define types for the data structure
type Honor = {
  title: string;
  description: string;
  image: string;
};

type Award = {
  title: string;
  description: string;
  image: string;
};

const Step10Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [honors, setHonors] = useState<Honor[]>([
    { title: "", description: "", image: "" }
  ]);
  const [awards, setAwards] = useState<Award[]>([
    { title: "", description: "", image: "" }
  ]);

  const handleAddHonor = () => {
    setHonors([...honors, { title: "", description: "", image: "" }]);
  };

  const handleAddAward = () => {
    setAwards([...awards, { title: "", description: "", image: "" }]);
  };

  const handleHonorChange = (index: number, field: keyof Honor, value: string) => {
    const updatedHonors = honors.map((honor, i) =>
      i === index ? { ...honor, [field]: value } : honor
    );
    setHonors(updatedHonors);
  };

  const handleAwardChange = (index: number, field: keyof Award, value: string) => {
    const updatedAwards = awards.map((award, i) =>
      i === index ? { ...award, [field]: value } : award
    );
    setAwards(updatedAwards);
  };

  const handleRemoveHonor = (index: number) => {
    setHonors(honors.filter((_, i) => i !== index));
  };

  const handleRemoveAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    console.log("Honors:", honors);
    console.log("Awards:", awards);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Honors & Awards Input
        </h2>
        {/* Honors Input */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">Honors</h3>
          {honors.map((honor, index) => (
            <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Title"
                  value={honor.title}
                  onChange={(e) => handleHonorChange(index, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button 
                  onClick={() => handleRemoveHonor(index)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove honor"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Description"
                value={honor.description}
                onChange={(e) => handleHonorChange(index, "description", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={honor.image}
                onChange={(e) => handleHonorChange(index, "image", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          ))}
          <button
            onClick={handleAddHonor}
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Add Honor
          </button>
        </div>
        {/* Awards Input */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">Awards</h3>
          {awards.map((award, index) => (
            <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Title"
                  value={award.title}
                  onChange={(e) => handleAwardChange(index, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button 
                  onClick={() => handleRemoveAward(index)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove award"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Description"
                value={award.description}
                onChange={(e) => handleAwardChange(index, "description", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={award.image}
                onChange={(e) => handleAwardChange(index, "image", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          ))}
          <button
            onClick={handleAddAward}
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Add Award
          </button>
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
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step10Welcome;