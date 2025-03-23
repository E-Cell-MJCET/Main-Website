/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { getVolunteerExperienceThemeStyles } from '../Themes/VolunteerExper.theme';

// Match Step15 data structure exactly
type VolunteerContent = {
  title: string;
  description: string;
};

// Updated interface to include theme parameter
interface VolunteerExperienceProps {
  volunteerExperiences: VolunteerContent[]; // Note prop name matches Step15
  theme?: string; // Optional theme parameter
}

const VolunteerExperience: React.FC<VolunteerExperienceProps> = ({ 
  volunteerExperiences = [],
  theme = "Default" // Default theme if none provided
}) => {
  const [selectedItem, setSelectedItem] = useState<VolunteerContent | null>(null);
  
  // Get theme styles
  const styles = getVolunteerExperienceThemeStyles(theme);
  
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
    <div className={`${styles.container} ${styles.backgroundGradient}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute left-1/4 top-20 size-64 rounded-full ${styles.decorativeElement1}`}></div>
        <div className={`absolute right-1/4 top-60 size-80 rounded-full ${styles.decorativeElement2}`}></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className={`mb-4 ${styles.mainHeading} text-4xl font-bold md:text-5xl`}>
            Volunteer Experience
          </h2>
          {volunteerExperiences.length > 0 ? (
            <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
              Community involvement and social impact through volunteer work.
            </p>
          ) : (
            <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
              No volunteer experiences have been added yet.
            </p>
          )}
        </motion.div>
        {volunteerExperiences.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex h-48 items-center justify-center rounded-lg ${styles.emptyContainer} text-center ${styles.emptyText}`}
          >
            <p>No volunteer experiences to display yet.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${styles.cardContainer}`}
          >
            {volunteerExperiences.map((volunteer, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`group cursor-pointer overflow-hidden rounded-xl ${styles.card} p-6 shadow-xl backdrop-blur-sm transition-all duration-300`}
                onClick={() => openDetail(volunteer)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${styles.cardTitle} ${styles.cardTitleHover} md:text-2xl`}>
                    {volunteer.title || "Untitled Experience"}
                  </h3>
                  {/* Volunteer icon */}
                  <svg className={`size-6 ${styles.cardIcon}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16.5 11.5C16.5 7.5 12.5 7 12 9C11.5 11 16.5 10.5 16.5 14.5C16.5 16.5 14.5 17.5 12.5 17.5C10.5 17.5 8.5 16 8.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className={`mt-3 line-clamp-3 text-sm ${styles.cardDescription}`}>
                  {volunteer.description || "No description provided."}
                </p>
                <div className={`mt-4 inline-flex items-center text-sm font-medium ${styles.cardLink}`}>
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
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${styles.modalOverlay}`}
            onClick={closeDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl ${styles.modalContainer} p-8 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeDetail}
                className={`absolute right-4 top-4 z-10 rounded-full p-2 text-white ${styles.closeButton}`}
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Volunteer icon */}
              <div className="mb-6 flex justify-center">
                <div className={`rounded-full p-4 ${styles.modalIconContainer}`}>
                  <svg className={`size-12 ${styles.modalIconColor}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16.5 11.5C16.5 7.5 12.5 7 12 9C11.5 11 16.5 10.5 16.5 14.5C16.5 16.5 14.5 17.5 12.5 17.5C10.5 17.5 8.5 16 8.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 6V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              {/* Volunteer Details */}
              <h3 className={`mb-4 text-center text-2xl font-bold ${styles.modalTitle} md:text-3xl`}>
                {selectedItem.title || "Untitled Experience"}
              </h3>
              <div className={`rounded-lg p-4 ${styles.modalDescriptionBox}`}>
                <h4 className={`mb-2 text-sm font-semibold uppercase tracking-wider ${styles.modalDescriptionTitle}`}>Description</h4>
                <p className={`whitespace-pre-line ${styles.modalDescriptionText}`}>
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