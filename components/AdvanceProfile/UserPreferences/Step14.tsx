"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

// Define the type for test scores
type TestScoresContent = {
  title: string;
  score: string;
  description: string;
};

const Step14Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  // State for test scores items
  const [testScores, setTestScores] = useState<TestScoresContent[]>([
    { title: "", score: "", description: "" }
  ]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedTestScores = localStorage.getItem(`${sessionId}_test_scores`);
      
      if (savedTestScores && savedTestScores !== "[]") {
        setTestScores(JSON.parse(savedTestScores));
      }
    }
  }, []);

  // Add a new test score entry
  const handleAddTestScore = () => {
    setTestScores([...testScores, { title: "", score: "", description: "" }]);
  };

  // Update a test score entry
  const handleTestScoreChange = (index: number, field: keyof TestScoresContent, value: string) => {
    const updatedTestScores = testScores.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setTestScores(updatedTestScores);
  };

  // Remove a test score entry
  const handleRemoveTestScore = (index: number) => {
    setTestScores(testScores.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Filter out completely empty test score entries
    const validTestScores = testScores.filter(
      score => score.title || score.score || score.description
    );
    
    console.log("Test Scores:", validTestScores);
    
    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(`${sessionId}_test_scores`, JSON.stringify(validTestScores));
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
          Test Scores
        </h2>
        <div className="mb-6">
          <p className="mb-4 text-center text-gray-600">
            Add your standardized test scores, certifications, or assessment results to showcase your academic achievements.
          </p>
          {/* Test Scores Input */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">Your Test Scores</h3>
            {testScores.map((item, index) => (
              <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Test Name (e.g., SAT, GRE, IELTS)"
                    value={item.title}
                    onChange={(e) => handleTestScoreChange(index, "title", e.target.value)}
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                  <button 
                    onClick={() => handleRemoveTestScore(index)} 
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove test score"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Score (e.g., 1450, 320, 7.5)"
                  value={item.score}
                  onChange={(e) => handleTestScoreChange(index, "score", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <textarea
                  placeholder="Additional details about your score or the test (optional)"
                  value={item.description}
                  onChange={(e) => handleTestScoreChange(index, "description", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  rows={3}
                />
              </div>
            ))}
            <button
              onClick={handleAddTestScore}
              className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600"
            >
              Add Test Score
            </button>
          </div>
          {/* Preview section */}
          {testScores.some(item => item.title || item.score) && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-700">Preview</h3>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {testScores.filter(item => item.title || item.score).map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-md"
                    >
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        {item.title || "Untitled Test"}
                      </h4>
                      <p className="text-md mb-2 font-medium text-amber-600">
                        Score: {item.score || "N/A"}
                      </p>
                      {item.description && (
                        <p className="mb-3 text-sm text-gray-600">
                          {item.description}
                        </p>
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