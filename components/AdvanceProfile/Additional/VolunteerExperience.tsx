/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Match Step15 data structure exactly
type VolunteerContent = {
  title: string;
  description: string;
};

// Match the exact prop name from Step15
interface VolunteerExperienceProps {
  volunteerExperiences: VolunteerContent[]; // Note prop name matches Step15
}

const VolunteerExperience: React.FC<VolunteerExperienceProps> = ({ 
  volunteerExperiences = [] 
}) => {
  const [selectedItem, setSelectedItem] = useState<VolunteerContent | null>(null);
  
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
  
  // Handler for opening detail view
  const openDetail = (item: VolunteerContent) => {
    setSelectedItem(item);
  };
  
  // Handler for closing detail view
  const closeDetail = () => {
    setSelectedItem(null);
  };
  
  return (
    <div className="relative bg-gradient-to-b from-rose-900 via-rose-800 to-rose-950 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 size-64 rounded-full bg-pink-500 opacity-10 blur-3xl"></div>
        <div className="absolute right-1/4 top-60 size-80 rounded-full bg-rose-500 opacity-10 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Volunteer Experience
          </h2>
          {volunteerExperiences.length > 0 ? (
            <p className="mx-auto max-w-2xl text-rose-200">
              Community involvement and social impact through volunteer work.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-rose-200">
              No volunteer experiences have been added yet.
            </p>
          )}
        </motion.div>
        {volunteerExperiences.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-48 items-center justify-center rounded-lg bg-rose-800/50 text-center text-rose-200"
          >
            <p>No volunteer experiences to display yet.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {volunteerExperiences.map((volunteer, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-rose-800/70 to-rose-950/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300"
                onClick={() => openDetail(volunteer)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-pink-300 md:text-2xl">
                    {volunteer.title || "Untitled Experience"}
                  </h3>
                  {/* Volunteer icon */}
                  <svg className="size-6 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16.5 11.5C16.5 7.5 12.5 7 12 9C11.5 11 16.5 10.5 16.5 14.5C16.5 16.5 14.5 17.5 12.5 17.5C10.5 17.5 8.5 16 8.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-rose-100/80">
                  {volunteer.description || "No description provided."}
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-pink-400">
                  Read more
                  <svg className="ml-1 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm"
            onClick={closeDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-gradient-to-b from-rose-900 to-rose-950 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeDetail}
                className="absolute right-4 top-4 z-10 rounded-full bg-rose-700 bg-opacity-50 p-2 text-white hover:bg-opacity-70"
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Volunteer icon */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-pink-500/20 p-4">
                  <svg className="size-12 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16.5 11.5C16.5 7.5 12.5 7 12 9C11.5 11 16.5 10.5 16.5 14.5C16.5 16.5 14.5 17.5 12.5 17.5C10.5 17.5 8.5 16 8.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              {/* Volunteer Details */}
              <h3 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
                {selectedItem.title || "Untitled Experience"}
              </h3>
              <div className="rounded-lg bg-rose-950/50 p-4">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-pink-400">Description</h4>
                <p className="whitespace-pre-line text-rose-100">
                  {selectedItem.description || "No detailed description available for this volunteer experience."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VolunteerExperience;