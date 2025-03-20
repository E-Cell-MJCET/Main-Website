'use client';
import React from 'react';
import { motion } from 'framer-motion';

// Match Step14 data structure exactly
type TestScoresContent = {
  title: string;
  score: string;
  description: string;
};

// Match exact prop name from Step14
interface TestScoresProps {
  testScores: TestScoresContent[]; // Direct array with no nesting
}

const TestScores: React.FC<TestScoresProps> = ({ testScores = [] }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };
  
  return (
    <div className="relative bg-gradient-to-b from-amber-900 via-amber-800 to-amber-950 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 size-64 rounded-full bg-amber-500 opacity-10 blur-3xl"></div>
        <div className="absolute right-1/4 top-60 size-80 rounded-full bg-yellow-500 opacity-10 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Test Scores
          </h2>
          {testScores.length > 0 ? (
            <p className="mx-auto max-w-2xl text-amber-200">
              Standardized test results and assessment scores demonstrating my academic abilities.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-amber-200">
              No test scores have been added yet.
            </p>
          )}
        </motion.div>
        {testScores.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-48 items-center justify-center rounded-lg bg-amber-800/50 text-center text-amber-200"
          >
            <p>No test scores to display yet.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testScores.map((score, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group overflow-hidden rounded-xl bg-gradient-to-br from-amber-800/70 to-amber-950/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 md:text-2xl">
                    {score.title || "Untitled Test"}
                  </h3>
                  {/* Test icon */}
                  <svg className="size-6 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3H16M8 8H16M8 12H12M3 3L3 21L8 18L16 21L21 18V3L16 6L8 3L3 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="mr-3 text-sm font-medium uppercase text-amber-300">Score:</div>
                    <div className="rounded-full bg-amber-500/20 px-4 py-1 text-xl font-bold text-white">
                      {score.score || "N/A"}
                    </div>
                  </div>
                </div>
                {score.description && (
                  <div className="mt-4 rounded-lg bg-amber-950/50 p-3">
                    <p className="text-sm text-amber-100/80">
                      {score.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestScores;