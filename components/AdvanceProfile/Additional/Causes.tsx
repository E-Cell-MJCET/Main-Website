/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { getCausesThemeStyles } from "../Themes/Causes.Theme";

// Match Step12 data structure exactly
type CauseContent = {
  title: string;
  description: string;
  support: string;
};

// Updated props interface to include theme parameter
interface CausesProps {
  causes: CauseContent[];
  theme?: string; // Optional theme parameter
}

const Causes: React.FC<CausesProps> = ({ 
  causes = [],
  theme = "Default" // Default theme if none provided
}) => {
  const [selectedCause, setSelectedCause] = useState<CauseContent | null>(null);
  
  // Get theme styles
  const styles = getCausesThemeStyles(theme);
  
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
  
  // Handler for opening/closing cause detail
  const toggleCauseDetail = (cause: CauseContent | null) => {
    setSelectedCause(cause);
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
            Causes I Care About
          </h2>
          {causes.length > 0 ? (
            <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
              The social issues and causes I`m passionate about, reflecting my values and interests beyond professional work.
            </p>
          ) : (
            <p className={`mx-auto max-w-2xl ${styles.mainDescription}`}>
              No causes have been added yet.
            </p>
          )}
        </motion.div>
        {causes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex h-48 items-center justify-center rounded-lg ${styles.emptyContainer} text-center ${styles.emptyText}`}
          >
            <p>No causes to display yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${styles.cardContainer}`}
          >
            {causes.map((cause, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group flex h-full flex-col overflow-hidden rounded-xl ${styles.card} shadow-xl backdrop-blur-sm transition-all duration-300`}
              >
                {/* Cause Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center">
                    {/* Heart Icon */}
                    <div className={`mr-3 rounded-full ${styles.cardIconContainer} p-2`}>
                      <svg className={`size-5 ${styles.cardIcon}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 12.5725L12 20L4.5 12.5725C3.76139 11.8553 3.32857 10.8697 3.31112 9.83831C3.29367 8.80687 3.69249 7.80782 4.4069 7.06927C5.12132 6.33073 6.11386 5.9151 7.14406 5.91224C8.17427 5.90938 9.16904 6.31951 9.8895 7.054L12 9.1385L14.1105 7.054C14.831 6.31951 15.8257 5.90938 16.8559 5.91224C17.8861 5.9151 18.8787 6.33073 19.5931 7.06927C20.3075 7.80782 20.7063 8.80687 20.6889 9.83831C20.6714 10.8697 20.2386 11.8553 19.5 12.5725Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className={`text-xl font-bold ${styles.cardTitle} ${styles.cardTitleHover} md:text-2xl`}>
                      {cause.title}
                    </h3>
                  </div>
                  <p className={`mb-4 line-clamp-3 flex-1 text-sm ${styles.cardDescription}`}>
                    {cause.description}
                  </p>
                  {/* How I've Helped */}
                  {cause.support && (
                    <div className={`mb-4 rounded-lg ${styles.supportBox} p-3`}>
                      <h4 className={`mb-1 text-xs font-semibold uppercase ${styles.supportTitle}`}>How I`ve Helped:</h4>
                      <p className={`line-clamp-2 text-sm italic ${styles.supportText}`}>
                        {cause.support}
                      </p>
                    </div>
                  )}
                  {/* Action Button */}
                  <button
                    onClick={() => toggleCauseDetail(cause)}
                    className={`mt-auto w-full rounded-lg ${styles.actionButton} px-4 py-2 text-center text-sm font-medium transition-all ${styles.actionButtonHover}`}
                  >
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {/* Cause Detail Modal */}
      <AnimatePresence>
        {selectedCause && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${styles.modalOverlay}`}
            onClick={() => toggleCauseDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl ${styles.modalContainer} p-8 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => toggleCauseDetail(null)}
                className={`absolute right-4 top-4 z-10 rounded-full ${styles.closeButton} p-2 ${styles.closeButtonHover}`}
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Cause Icon */}
              <div className="mb-6 flex justify-center">
                <div className={`rounded-full ${styles.modalIconContainer} p-4`}>
                  <svg className={`size-12 ${styles.modalIcon}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 12.5725L12 20L4.5 12.5725C3.76139 11.8553 3.32857 10.8697 3.31112 9.83831C3.29367 8.80687 3.69249 7.80782 4.4069 7.06927C5.12132 6.33073 6.11386 5.9151 7.14406 5.91224C8.17427 5.90938 9.16904 6.31951 9.8895 7.054L12 9.1385L14.1105 7.054C14.831 6.31951 15.8257 5.90938 16.8559 5.91224C17.8861 5.9151 18.8787 6.33073 19.5931 7.06927C20.3075 7.80782 20.7063 8.80687 20.6889 9.83831C20.6714 10.8697 20.2386 11.8553 19.5 12.5725Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* Cause Details */}
              <h3 className={`mb-6 text-center text-2xl font-bold ${styles.modalTitle} md:text-3xl`}>
                {selectedCause.title}
              </h3>
              {/* Description */}
              <div className="mb-6">
                <h4 className={`mb-2 text-sm font-semibold uppercase tracking-wider ${styles.modalSectionTitle}`}>Why I`m Passionate About This Cause</h4>
                <div className={`rounded-lg ${styles.modalContentBox} p-4`}>
                  <p className={`whitespace-pre-line ${styles.modalContentText}`}>
                    {selectedCause.description}
                  </p>
                </div>
              </div>
              {/* Support */}
              {selectedCause.support && (
                <div className="mb-6">
                  <h4 className={`mb-2 text-sm font-semibold uppercase tracking-wider ${styles.modalSectionTitle}`}>How I`ve Helped</h4>
                  <div className={`rounded-lg ${styles.modalContentBox} p-4`}>
                    <p className={`whitespace-pre-line ${styles.modalContentText}`}>
                      {selectedCause.support}
                    </p>
                  </div>
                </div>
              )}
              {/* Call to Action */}
              <div className="mt-8 text-center">
                <p className={`mb-4 ${styles.modalCalloutText}`}>
                  Interested in joining me to support this cause?
                </p>
                <button
                  className={`rounded-lg ${styles.modalCtaButton} px-6 py-3 font-bold transition-all ${styles.modalCtaButtonHover}`}
                >
                  Get Involved
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Causes;