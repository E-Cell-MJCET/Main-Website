/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Match Step10 data structure exactly
type HonorAwardContent = {
  title: string;
  issuer: string;
  date: string;
  description: string;
};

// Updated props interface to accept two separate arrays
interface HonorsAwardsProps {
  honors: HonorAwardContent[];
  awards: HonorAwardContent[];
}

const HonorsAwards: React.FC<HonorsAwardsProps> = ({ 
  honors = [], 
  awards = [] 
}) => {
  const [selectedItem, setSelectedItem] = useState<HonorAwardContent | null>(null);
  const [selectedType, setSelectedType] = useState<'honor' | 'award'>('honor');
  
  // Check if we have data to display
  const hasHonors = honors.length > 0;
  const hasAwards = awards.length > 0;
  const hasContent = hasHonors || hasAwards;
  
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
  const openDetail = (item: HonorAwardContent, type: 'honor' | 'award') => {
    setSelectedItem(item);
    setSelectedType(type);
  };
  
  // Handler for closing detail view
  const closeDetail = () => {
    setSelectedItem(null);
  };
  
  // Early return if no content at all
  if (!hasContent) {
    return null;
  }
  
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
            Honors & Awards
          </h2>
          <p className="mx-auto max-w-2xl text-amber-200">
            Recognition and achievements that highlight my professional journey.
          </p>
        </motion.div>
        {/* Honors Section - Only render if has items */}
        {hasHonors && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-8 bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-center text-3xl font-bold text-transparent md:text-left">
              Honors
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {honors.map((honor, index) => (
                <motion.div
                  key={`honor-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-amber-800/70 to-amber-950/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300"
                  onClick={() => openDetail(honor, 'honor')}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
                      {honor.date || "Date not specified"}
                    </span>
                    {/* Medal icon */}
                    <svg className="size-6 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 20H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-white group-hover:text-amber-300 md:text-2xl">
                    {honor.title}
                  </h4>
                  <p className="mb-3 text-sm font-medium text-amber-300">
                    {honor.issuer}
                  </p>
                  <p className="line-clamp-2 text-sm text-amber-100/80">
                    {honor.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-amber-400">
                    View details
                    <svg className="ml-1 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
        {/* Awards Section - Only render if has items */}
        {hasAwards && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: hasHonors ? 0.2 : 0 }}
          >
            <h3 className="mb-8 bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-center text-3xl font-bold text-transparent md:text-left">
              Awards
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {awards.map((award, index) => (
                <motion.div
                  key={`award-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-amber-800/70 to-amber-950/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300"
                  onClick={() => openDetail(award, 'award')}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
                      {award.date || "Date not specified"}
                    </span>
                    {/* Trophy icon for awards (different from honors) */}
                    <svg className="size-6 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 7L19.076 7.076C19.461 7.076 19.654 7.076 19.827 7.134C20.122 7.232 20.368 7.427 20.525 7.689C20.617 7.85 20.67 8.043 20.774 8.428L22 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M2 13L3.226 8.428C3.33 8.043 3.383 7.85 3.475 7.689C3.632 7.427 3.878 7.232 4.173 7.134C4.346 7.076 4.539 7.076 4.924 7.076L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M17.5 17H6.5C5.566 17 4.6 16.6706 3.8787 16.0828C2 14.672 2 12.6149 2 8.5C2 7.11929 3.11929 6 4.5 6H19.5C20.8807 6 22 7.11929 22 8.5C22 12.6149 22 14.672 20.1213 16.0828C19.4 16.6706 18.434 17 17.5 17Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-white group-hover:text-amber-300 md:text-2xl">
                    {award.title}
                  </h4>
                  <p className="mb-3 text-sm font-medium text-amber-300">
                    {award.issuer}
                  </p>
                  <p className="line-clamp-2 text-sm text-amber-100/80">
                    {award.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-amber-400">
                    View details
                    <svg className="ml-1 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
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
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-gradient-to-b from-amber-900 to-amber-950 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeDetail}
                className="absolute right-4 top-4 z-10 rounded-full bg-amber-700 bg-opacity-50 p-2 text-white hover:bg-opacity-70"
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Item type badge */}
              <div className="mb-2 flex justify-center">
                <span className="rounded-full bg-amber-500/30 px-4 py-1 text-xs font-medium uppercase tracking-wider text-amber-300">
                  {selectedType === 'honor' ? 'Honor' : 'Award'}
                </span>
              </div>
              {/* Icon - Different for Honor vs Award */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-amber-500/20 p-4">
                  {selectedType === 'honor' ? (
                    <svg className="size-12 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 20H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg className="size-12 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 7L19.076 7.076C19.461 7.076 19.654 7.076 19.827 7.134C20.122 7.232 20.368 7.427 20.525 7.689C20.617 7.85 20.67 8.043 20.774 8.428L22 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M2 13L3.226 8.428C3.33 8.043 3.383 7.85 3.475 7.689C3.632 7.427 3.878 7.232 4.173 7.134C4.346 7.076 4.539 7.076 4.924 7.076L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M17.5 17H6.5C5.566 17 4.6 16.6706 3.8787 16.0828C2 14.672 2 12.6149 2 8.5C2 7.11929 3.11929 6 4.5 6H19.5C20.8807 6 22 7.11929 22 8.5C22 12.6149 22 14.672 20.1213 16.0828C19.4 16.6706 18.434 17 17.5 17Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
              </div>
              {/* Item Details */}
              <h3 className="mb-2 text-center text-2xl font-bold text-white md:text-3xl">
                {selectedItem.title}
              </h3>
              <div className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
                <span className="text-lg font-medium text-amber-300">
                  {selectedItem.issuer}
                </span>
                {selectedItem.date && (
                  <>
                    <span className="hidden text-amber-500 md:inline">•</span>
                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-300">
                      {selectedItem.date}
                    </span>
                  </>
                )}
              </div>
              <div className="rounded-lg bg-amber-950/50 p-4">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-400">Description</h4>
                <p className="whitespace-pre-line text-amber-100">
                  {selectedItem.description || "No detailed description available."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HonorsAwards;