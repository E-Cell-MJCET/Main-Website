"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

// Define the type for causes
type CauseContent = {
  title: string;
  description: string;
  support: string;
};

const Step12Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  // State for causes items
  const [causes, setCauses] = useState<CauseContent[]>([
    { title: "", description: "", support: "" }
  ]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedCauses = localStorage.getItem(`${sessionId}_causes`);
      
      if (savedCauses && savedCauses !== "[]") {
        setCauses(JSON.parse(savedCauses));
      }
    }
  }, []);

  // Add a new cause entry
  const handleAddCause = () => {
    setCauses([...causes, { title: "", description: "", support: "" }]);
  };

  // Update a cause entry
  const handleCauseChange = (index: number, field: keyof CauseContent, value: string) => {
    const updatedCauses = causes.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setCauses(updatedCauses);
  };

  // Remove a cause entry
  const handleRemoveCause = (index: number) => {
    setCauses(causes.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Filter out completely empty cause entries
    const validCauses = causes.filter(
      cause => cause.title || cause.description || cause.support
    );
    
    console.log("Causes:", validCauses);
    
    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(`${sessionId}_causes`, JSON.stringify(validCauses));
    }
    
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Causes You Care About
        </h2>
        <div className="mb-6">
          <p className="mb-4 text-center text-gray-600">
            Share the causes you`re passionate about to showcase your values and interests outside of professional work.
          </p>
          {/* Causes Input */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">Your Causes</h3>
            {causes.map((item, index) => (
              <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Cause Name (e.g., Climate Change, Education, Poverty)"
                    value={item.title}
                    onChange={(e) => handleCauseChange(index, "title", e.target.value)}
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                  <button 
                    onClick={() => handleRemoveCause(index)} 
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove cause"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <textarea
                  placeholder="Why are you passionate about this cause?"
                  value={item.description}
                  onChange={(e) => handleCauseChange(index, "description", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  rows={3}
                />
                <textarea
                  placeholder="How have you supported this cause? (e.g., donations, volunteering, awareness campaigns)"
                  value={item.support}
                  onChange={(e) => handleCauseChange(index, "support", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  rows={2}
                />
              </div>
            ))}
            <button
              onClick={handleAddCause}
              className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-600"
            >
              Add Another Cause
            </button>
          </div>
          {/* Preview section */}
          {causes.some(item => item.title || item.description) && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-700">Preview</h3>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {causes.filter(item => item.title || item.description).map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-md"
                    >
                      <div className="mb-3">
                        <h4 className="mb-2 text-lg font-semibold text-cyan-700">
                          {item.title || "Untitled Cause"}
                        </h4>
                        {item.description && (
                          <p className="mb-3 text-sm text-gray-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {item.support && (
                        <div className="mt-auto">
                          <h5 className="mb-1 text-sm font-medium text-gray-700">How I`ve Helped:</h5>
                          <p className="text-sm italic text-gray-600">
                            {item.support}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step12Welcome;