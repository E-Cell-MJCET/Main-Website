"use client";
import React from "react";
import { motion } from "framer-motion";

import { getTestScoreThemeStyles } from "../Themes/TestScoreTheme";

// Match Step14 data structure exactly
type TestScoresContent = { title: string; score: string; description: string };

// Updated props interface to include theme
interface TestScoresProps {
  testScores: TestScoresContent[]; // Direct array with no nesting
  theme?: string; // Optional theme parameter
}

const TestScores: React.FC<TestScoresProps> = ({
  testScores = [],
  theme = "Default", // Default theme if none provided
}) => {
  // Early return if no test scores
  if (!testScores?.length) {
    return null;
  }

  // Get theme styles
  const styles = getTestScoreThemeStyles(theme);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={`${styles.container} ${styles.backgroundGradient}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute left-1/4 top-20 size-64 rounded-full ${styles.decorativeElement1}`}
        ></div>
        <div
          className={`absolute right-1/4 top-60 size-80 rounded-full ${styles.decorativeElement2}`}
        ></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            className={`mb-4 ${styles.mainHeading} text-4xl font-bold md:text-5xl`}
          >
            Test Scores
          </h2>
          <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
            Standardized test results and assessment scores demonstrating my
            academic abilities.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid ${styles.cardContainer}`}
        >
          {testScores.map((score, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className={`group overflow-hidden rounded-xl ${styles.card} p-6 shadow-xl backdrop-blur-sm transition-all duration-300`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3
                  className={`text-xl font-bold ${styles.cardTitle} ${styles.cardTitleHover} md:text-2xl`}
                >
                  {score.title || "Untitled Test"}
                </h3>
                {/* Test icon */}
                <svg
                  className={`size-6 ${styles.cardIcon}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3H16M8 8H16M8 12H12M3 3L3 21L8 18L16 21L21 18V3L16 6L8 3L3 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div
                    className={`mr-3 text-sm font-medium uppercase ${styles.scoreLabel}`}
                  >
                    Score:
                  </div>
                  <div
                    className={`rounded-full ${styles.scoreValueBg} px-4 py-1 text-xl font-bold ${styles.scoreValue}`}
                  >
                    {score.score || "N/A"}
                  </div>
                </div>
              </div>
              {score.description && (
                <div className={`mt-4 rounded-lg ${styles.descriptionBox} p-3`}>
                  <p className={`text-sm ${styles.descriptionText}`}>
                    {score.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestScores;
