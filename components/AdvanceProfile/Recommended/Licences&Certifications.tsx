/* eslint-disable no-unused-vars */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Match Step8 data structure exactly
type License = {
  title: string;
  description: string;
  image: string; // Base64 or URL
};

type Certification = {
  title: string;
  description: string;
  image: string; // Base64 or URL
};

// Updated interface to accept two separate props
interface LicencesCertificationsProps {
  licenses: License[];
  certifications: Certification[];
}

const LicencesCertifications: React.FC<LicencesCertificationsProps> = ({ 
  licenses = [], // Default to empty array if not provided
  certifications = [] 
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'licenses' | 'certifications'>(
    licenses.length > 0 ? 'licenses' : 'certifications'
  );
  
  // State for detailed view modal
  const [selectedItem, setSelectedItem] = useState<License | Certification | null>(null);
  
  // Count totals
  const licenseCount = licenses.length;
  const certificationCount = certifications.length;
  const totalCount = licenseCount + certificationCount;
  
  // Determine if we should show tabs (only if both types exist)
  const shouldShowTabs = licenseCount > 0 && certificationCount > 0;
  
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
  
  // Handler for opening the detail modal
  const openDetailModal = (item: License | Certification) => {
    setSelectedItem(item);
  };
  
  // Handler for closing the detail modal
  const closeDetailModal = () => {
    setSelectedItem(null);
  };
  
  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 size-64 rounded-full bg-green-500 opacity-5 blur-3xl"></div>
        <div className="absolute right-1/4 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Credentials & Achievements
          </h2>
          {totalCount > 0 ? (
            <p className="mx-auto max-w-2xl text-gray-400">
              Showcasing my formal qualifications, licenses, and professional certifications.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-gray-400">
              No credentials have been added yet.
            </p>
          )}
        </motion.div>
        {/* Tabs for Licenses/Certifications */}
        {shouldShowTabs && (
          <div className="relative z-10 mx-auto mb-10 flex justify-center">
            <div className="flex overflow-hidden rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setActiveTab('licenses')}
                className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 md:text-base ${
                  activeTab === 'licenses'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Licenses ({licenseCount})
                {activeTab === 'licenses' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-x-0 bottom-0 h-full rounded-md bg-blue-600"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 md:text-base ${
                  activeTab === 'certifications'
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Certifications ({certificationCount})
                {activeTab === 'certifications' && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-x-0 bottom-0 h-full rounded-md bg-green-600"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </div>
        )}
        {/* Gallery Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'licenses' && (
            <motion.div
              key="licenses"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={containerVariants}
              className="min-h-[200px]"
            >
              {licenses.length === 0 ? (
                <motion.div 
                  className="flex h-48 items-center justify-center rounded-lg bg-gray-800 bg-opacity-50 text-center text-gray-400"
                  variants={itemVariants}
                >
                  <p>No licenses have been added.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {licenses.map((license, index) => (
                    <CredentialCard 
                      key={`license-${index}`}
                      item={license}
                      index={index}
                      onClick={() => openDetailModal(license)}
                      color="blue"
                      variants={itemVariants}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={containerVariants}
              className="min-h-[200px]"
            >
              {certifications.length === 0 ? (
                <motion.div 
                  className="flex h-48 items-center justify-center rounded-lg bg-gray-800 bg-opacity-50 text-center text-gray-400"
                  variants={itemVariants}
                >
                  <p>No certifications have been added.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {certifications.map((certification, index) => (
                    <CredentialCard 
                      key={`certification-${index}`}
                      item={certification}
                      index={index}
                      onClick={() => openDetailModal(certification)}
                      color="green"
                      variants={itemVariants}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm"
            onClick={closeDetailModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-gray-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeDetailModal}
                className="absolute right-4 top-4 z-10 rounded-full bg-gray-900 bg-opacity-50 p-2 text-white hover:bg-opacity-70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative h-80 w-full md:h-auto md:w-1/2">
                  {selectedItem.image ? (
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-24 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  <h3 className="mb-4 text-2xl font-bold text-white">{selectedItem.title}</h3>
                  <p className="whitespace-pre-line text-gray-300">{selectedItem.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Separate card component for reusability
interface CredentialCardProps {
  item: License | Certification;
  index: number;
  onClick: () => void;
  color: 'blue' | 'green';
  variants: any;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ item, index, onClick, color, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="group cursor-pointer overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
    >
      {/* Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        {item.image ? (
          <>
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70`}></div>
          </>
        ) : (
          <div className={`bg- flex size-full items-center justify-center${color}-900 bg-opacity-20`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="size-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
        {/* Badge */}
        <div className={`bg- absolute right-3 top-3 rounded-full${color}-600 px-3 py-1 text-xs font-medium text-white`}>
          {color === 'blue' ? 'License' : 'Certification'}
        </div>
      </div>
      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-blue-400">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-gray-400">
          {item.description}
        </p>
        {/* View details button */}
        <div className={`text- mt-4 inline-flex items-center text-sm font-medium${color}-400`}>
          View details
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default LicencesCertifications;