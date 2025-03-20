/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { useState} from "react";
import {motion,AnimatePresence} from "framer-motion";
// Match Step12 data structure exactly

type CauseContent = {
  title: string;
  description: string;
  support: string;
};

// Updated props interface to match Step12 data structure
interface CausesProps {
  causes: CauseContent[];
}

const Causes: React.FC<CausesProps> = ({ causes = [] }) => {
  const [selectedCause, setSelectedCause] = useState<CauseContent | null>(null);
  
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
    <div className="relative bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 size-64 rounded-full bg-green-500 opacity-10 blur-3xl"></div>
        <div className="absolute right-1/4 top-60 size-80 rounded-full bg-teal-500 opacity-10 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Causes I Care About
          </h2>
          {causes.length > 0 ? (
            <p className="mx-auto max-w-2xl text-emerald-200">
              The social issues and causes I`m passionate about, reflecting my values and interests beyond professional work.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-emerald-200">
              No causes have been added yet.
            </p>
          )}
        </motion.div>
        {causes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-48 items-center justify-center rounded-lg bg-emerald-800/50 text-center text-emerald-200"
          >
            <p>No causes to display yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {causes.map((cause, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-emerald-800/70 to-emerald-950/70 shadow-xl backdrop-blur-sm transition-all duration-300"
              >
                {/* Cause Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center">
                    {/* Heart Icon */}
                    <div className="mr-3 rounded-full bg-green-500/20 p-2">
                      <svg className="size-5 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 12.5725L12 20L4.5 12.5725C3.76139 11.8553 3.32857 10.8697 3.31112 9.83831C3.29367 8.80687 3.69249 7.80782 4.4069 7.06927C5.12132 6.33073 6.11386 5.9151 7.14406 5.91224C8.17427 5.90938 9.16904 6.31951 9.8895 7.054L12 9.1385L14.1105 7.054C14.831 6.31951 15.8257 5.90938 16.8559 5.91224C17.8861 5.9151 18.8787 6.33073 19.5931 7.06927C20.3075 7.80782 20.7063 8.80687 20.6889 9.83831C20.6714 10.8697 20.2386 11.8553 19.5 12.5725Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-green-400 md:text-2xl">
                      {cause.title}
                    </h3>
                  </div>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm text-emerald-200">
                    {cause.description}
                  </p>
                  {/* How I've Helped */}
                  {cause.support && (
                    <div className="mb-4 rounded-lg bg-emerald-900/50 p-3">
                      <h4 className="mb-1 text-xs font-semibold uppercase text-emerald-300">How I`ve Helped:</h4>
                      <p className="line-clamp-2 text-sm italic text-emerald-100">
                        {cause.support}
                      </p>
                    </div>
                  )}
                  {/* Action Button */}
                  <button
                    onClick={() => toggleCauseDetail(cause)}
                    className="mt-auto w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:from-green-700 hover:to-emerald-700"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm"
            onClick={() => toggleCauseDetail(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-xl bg-gradient-to-b from-emerald-900 to-emerald-950 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => toggleCauseDetail(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-emerald-700 bg-opacity-50 p-2 text-white hover:bg-opacity-70"
                aria-label="Close details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Cause Icon */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-500/20 p-4">
                  <svg className="size-12 text-green-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 12.5725L12 20L4.5 12.5725C3.76139 11.8553 3.32857 10.8697 3.31112 9.83831C3.29367 8.80687 3.69249 7.80782 4.4069 7.06927C5.12132 6.33073 6.11386 5.9151 7.14406 5.91224C8.17427 5.90938 9.16904 6.31951 9.8895 7.054L12 9.1385L14.1105 7.054C14.831 6.31951 15.8257 5.90938 16.8559 5.91224C17.8861 5.9151 18.8787 6.33073 19.5931 7.06927C20.3075 7.80782 20.7063 8.80687 20.6889 9.83831C20.6714 10.8697 20.2386 11.8553 19.5 12.5725Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {/* Cause Details */}
              <h3 className="mb-6 text-center text-2xl font-bold text-white md:text-3xl">
                {selectedCause.title}
              </h3>
              {/* Description */}
              <div className="mb-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-300">Why I`m Passionate About This Cause</h4>
                <div className="rounded-lg bg-emerald-950/50 p-4">
                  <p className="whitespace-pre-line text-emerald-100">
                    {selectedCause.description}
                  </p>
                </div>
              </div>
              {/* Support */}
              {selectedCause.support && (
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-300">How I`ve Helped</h4>
                  <div className="rounded-lg bg-emerald-950/50 p-4">
                    <p className="whitespace-pre-line text-emerald-100">
                      {selectedCause.support}
                    </p>
                  </div>
                </div>
              )}
              {/* Call to Action */}
              <div className="mt-8 text-center">
                <p className="mb-4 text-emerald-200">
                  Interested in joining me to support this cause?
                </p>
                <button
                  className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-bold text-white transition-all hover:from-green-700 hover:to-emerald-700"
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