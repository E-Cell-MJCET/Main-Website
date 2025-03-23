/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { motion } from "framer-motion";

import { HoverEffect } from "@/components/ui/card-hover-effect";

import { RecommendationsThemeStyles,recommendationsThemeMap } from "../Themes/Recommendation.theme";

// Match Step9 data structure exactly
type Recommendation = {
  title: string;
  description: string;
  link: string;
};

// Updated props interface to match Step9 data structure
interface RecommendationsProps {
  recommendations: Recommendation[];
  theme?: string; // Added theme prop
}

export function Recommendations({ recommendations = [], theme = 'default' }: RecommendationsProps) {
  const styles: RecommendationsThemeStyles = recommendationsThemeMap[theme] || recommendationsThemeMap["Default"]; // Get styles based on theme

  // Convert data format to what HoverEffect component expects
  const formattedRecommendations = recommendations.map((item, index) => ({
    id: index, // Generate an id since Step9 data doesn't include it
    title: item.title || "Anonymous", // Fallback for empty titles
    description: item.description || "No description provided",
    link: item.link || "#"
  }));

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

  return (
    <div className={styles.container}> {/* Apply theme styles */}
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={styles.backgroundGlow1}></div>
        <div className={styles.backgroundGlow2}></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className={styles.heading}>Recommendations</h2> {/* Apply theme styles */}
          {recommendations.length > 0 ? (
            <p className={styles.description}>
              What others have to say about my work, skills, and collaborations.
            </p>
          ) : (
            <p className={styles.description}>
              No recommendations have been added yet.
            </p>
          )}
        </motion.div>
        {/* Display recommendations using HoverEffect or show empty state */}
        {recommendations.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-48 items-center justify-center rounded-lg bg-gray-800 bg-opacity-50 text-center text-gray-400"
          >
            <p>No recommendations to display. Check back later!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HoverEffect items={formattedRecommendations} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Alternative implementation without requiring HoverEffect
// This can be used if the HoverEffect component isn't available
export function RecommendationsAlternative({ recommendations = [], theme = 'Default' }: RecommendationsProps) {
  const styles: RecommendationsThemeStyles = recommendationsThemeMap[theme] || recommendationsThemeMap["Default"]; // Get styles based on theme

  if (!Array.isArray(recommendations)) {
    console.error('Recommendations data is not an array:', recommendations);
    
    return <div className="text-center text-red-600">Invalid recommendations data.</div>;
  }
  
  return (
    <div className={styles.container}> {/* Apply theme styles */}
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={styles.backgroundGlow1}></div>
        <div className={styles.backgroundGlow2}></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className={styles.heading}>Recommendations</h2> {/* Apply theme styles */}
          {recommendations.length > 0 ? (
            <p className={styles.description}>
              What others have to say about my work, skills, and collaborations.
            </p>
          ) : (
            <p className={styles.description}>
              No recommendations have been added yet.
            </p>
          )}
        </div>
        {recommendations.length === 0 ? (
          <div className="flex h-48 items-center justify-center rounded-lg bg-gray-800 bg-opacity-50 text-center text-gray-400">
            <p>No recommendations to display. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((recommendation, index) => (
              <div 
                key={index} 
                className={`group rounded-xl ${styles.recommendationCard.background} p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-gray-700/50`}
              >
                <h3 className={styles.recommendationCard.title}>{recommendation.title || "Anonymous"}</h3>
                <p className={styles.recommendationCard.description}>
                  {recommendation.description || "No description provided"}
                </p>
                {recommendation.link && (
                  <a 
                    href={recommendation.link} 
                    className={`inline-flex items-center text-sm font-medium ${styles.recommendationCard.badge}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View more
                    <svg className="ml-1 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}