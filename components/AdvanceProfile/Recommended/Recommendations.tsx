/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import {motion} from "framer-motion"

import { HoverEffect } from "@/components/ui/card-hover-effect";

// Match Step9 data structure exactly
type Recommendation = {
  title: string;
  description: string;
  link: string;
};

// Updated props interface to match Step9 data structure
interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations = [] }: RecommendationsProps) {
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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 size-64 rounded-full bg-purple-600 opacity-5 blur-3xl"></div>
        <div className="absolute right-1/4 top-60 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Recommendations
          </h2>
          {recommendations.length > 0 ? (
            <p className="mx-auto max-w-2xl text-gray-400">
              What others have to say about my work, skills, and collaborations.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-gray-400">
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
export function RecommendationsAlternative({ recommendations = [] }: RecommendationsProps) {
  if (!Array.isArray(recommendations)) {
    console.error('Recommendations data is not an array:', recommendations);
    
return <div className="text-center text-red-600">Invalid recommendations data.</div>;
  }
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 size-64 rounded-full bg-purple-600 opacity-5 blur-3xl"></div>
        <div className="absolute right-1/4 top-60 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Recommendations
          </h2>
          {recommendations.length > 0 ? (
            <p className="mx-auto max-w-2xl text-gray-400">
              What others have to say about my work, skills, and collaborations.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-gray-400">
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
                className="group rounded-xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-gray-700/50"
              >
                <h3 className="mb-3 text-xl font-bold text-white">{recommendation.title || "Anonymous"}</h3>
                <p className="mb-4 text-gray-300">
                  `{recommendation.description || "No description provided"}`
                </p>
                {recommendation.link && (
                  <a 
                    href={recommendation.link} 
                    className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300"
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