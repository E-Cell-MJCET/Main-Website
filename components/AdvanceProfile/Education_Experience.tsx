/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable no-unused-vars */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import { ParticleCanvas } from "@/hooks/particle";

// Experience item structure from Step5
interface ExperienceItem {
  title: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking?: boolean;
  description: string;
}

// Education item structure from Step5
interface EducationItem {
  degree: string;
  school: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrentlyStudying?: boolean;
  description: string;
}

// Props for the HistorySection component
interface HistorySectionProps {
  experienceData: ExperienceItem[];
  educationData: EducationItem[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ experienceData, educationData }) => {
  // State to toggle between experience and education
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>(
    experienceData.length > 0 ? 'experience' : 'education'
  );

  // Group experiences by company
  const experiencesByCompany = experienceData.reduce((acc: Record<string, ExperienceItem[]>, exp: ExperienceItem) => {
    const companyKey = `${exp.company || 'Other'}`;
    if (!acc[companyKey]) {
      acc[companyKey] = [];
    }
    acc[companyKey].push(exp);
    
return acc;
  }, {});

  // Group education by institution
  const educationByInstitution = educationData.reduce((acc: Record<string, EducationItem[]>, edu: EducationItem) => {
    const institutionKey = `${edu.school || 'Other'}`;
    if (!acc[institutionKey]) {
      acc[institutionKey] = [];
    }
    acc[institutionKey].push(edu);
    
return acc;
  }, {});

  // Parse description if it's a JSON string
  const parseDescription = (description: string) => {
    if (!description) return [];
    
    try {
      const parsed = JSON.parse(description);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      
return [description]; // Not an array, just return as single item
    } catch (e) {
      // If parsing fails, just use the raw text
      return [description];
    }
  };

  // Calculate duration for either education or experience
  const calculateDuration = (startDate: string, endDate: string, isCurrent?: boolean) => {
    if (!startDate) return '';
    
    try {
      const start = new Date(startDate);
      const end = isCurrent ? new Date() : (endDate ? new Date(endDate) : new Date());
      
      const diffYears = end.getFullYear() - start.getFullYear();
      const diffMonths = end.getMonth() - start.getMonth();
      
      let years = diffYears;
      let months = diffMonths;
      
      if (diffMonths < 0) {
        years--;
        months += 12;
      }
      
      const yearText = years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';
      const monthText = months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : '';
      
      if (yearText && monthText) {
        return `${yearText}, ${monthText}`;
      }
      
      return yearText || monthText || 'Less than a month';
    } catch (error) {
      return 'Date error';
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-gradient-to-b from-black to-gray-700 py-12">
      {/* Particle Canvas Background */}
      {/* <ParticleCanvas /> */}
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-white">Professional History</h1>
        <div className="mx-auto mt-2 h-1 w-32 bg-blue-500"></div>
      </motion.div>
      {/* Tabs for Experience/Education */}
      {educationData.length > 0 && experienceData.length > 0 && (
        <div className="relative z-10 mx-auto mb-8 flex justify-center">
          <div className="flex overflow-hidden rounded-lg bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'experience'
                  ? 'rounded-md bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'education'
                  ? 'rounded-md bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Education
            </button>
          </div>
        </div>
      )}
      {/* Timeline Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 mx-auto w-11/12 max-w-4xl"
          >
            {Object.keys(experiencesByCompany).length === 0 ? (
              <div className="text-center text-gray-400">No experience data available</div>
            ) : (
              Object.entries(experiencesByCompany).map(([companyKey, experiences], companyIndex) => (
                <motion.div 
                  key={companyKey}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: companyIndex * 0.1 }}
                  className="mb-10"
                >
                  {/* Company Card Header */}
                  <div className="mb-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center">
                      <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                        {companyKey.charAt(0) || '?'}
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-bold text-white">{companyKey}</h2>
                      </div>
                    </div>
                  </div>
                  {/* Roles at the Company */}
                  <div className="ml-6 border-l-2 border-blue-500 pl-6">
                    {experiences.map((experience, index) => {
                      const responsibilities = parseDescription(experience.description || '');
                      const duration = calculateDuration(
                        experience.startDate, 
                        experience.endDate, 
                        experience.isCurrentlyWorking
                      );
                      
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                          className="relative mb-6"
                        >
                          {/* Timeline Node */}
                          <div className="absolute -left-9 mt-1 size-5 rounded-full bg-blue-500"></div>
                          {/* Role Details */}
                          <div className="rounded-lg bg-gray-800 bg-opacity-70 p-5 backdrop-blur-sm">
                            <div className="mb-2 flex flex-wrap items-start justify-between">
                              <h3 className="text-lg font-semibold text-white md:text-xl">{experience.jobTitle || 'Untitled Position'}</h3>
                              <div className="mt-1 flex flex-wrap items-center space-x-2 text-sm text-gray-300 md:mt-0">
                                <span>
                                  {experience.startDate || 'N/A'} - {experience.isCurrentlyWorking ? 'Present' : (experience.endDate || 'N/A')}
                                </span>
                                {duration && (
                                  <span className="rounded-full bg-blue-900 px-3 py-1 text-xs">
                                    {duration}
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Responsibilities */}
                            {responsibilities.length > 0 && (
                              <ul className="ml-4 list-disc space-y-1 text-gray-300">
                                {responsibilities.map((resp, respIndex) => (
                                  <li key={respIndex} className="text-sm md:text-base">{resp}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
        {activeTab === 'education' && (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 mx-auto w-11/12 max-w-4xl"
          >
            {Object.keys(educationByInstitution).length === 0 ? (
              <div className="text-center text-gray-400">No education data available</div>
            ) : (
              Object.entries(educationByInstitution).map(([institutionKey, educations], institutionIndex) => (
                <motion.div 
                  key={institutionKey || `institution-${institutionIndex}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: institutionIndex * 0.1 }}
                  className="mb-10"
                >
                  {/* Institution Card Header */}
                  <div className="mb-4 rounded-lg bg-gradient-to-r from-indigo-900 to-purple-900 p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center">
                      <div className="flex size-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                        {(institutionKey && institutionKey.charAt(0)) || 'E'}
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-bold text-white">{institutionKey || 'Educational Institution'}</h2>
                        {educations[0]?.location && (
                          <p className="text-indigo-300">{educations[0].location}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Degrees at the Institution */}
                  <div className="ml-6 border-l-2 border-indigo-500 pl-6">
                    {educations.map((education, index) => {
                      const details = parseDescription(education.description || '');
                      const duration = calculateDuration(
                        education.startDate, 
                        education.endDate, 
                        education.isCurrentlyStudying
                      );
                      
return (
  <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                          className="relative mb-6"
                        >
    {/* Timeline Node */}
    <div className="absolute -left-9 mt-1 size-5 rounded-full bg-indigo-500"></div>
    {/* Degree Details */}
    <div className="rounded-lg bg-gray-800 bg-opacity-70 p-5 backdrop-blur-sm">
      <div className="mb-2 flex flex-wrap items-start justify-between">
        <h3 className="text-lg font-semibold text-white md:text-xl">
          {education.degree || 'Education Program'}
        </h3>
        <div className="mt-1 flex flex-wrap items-center space-x-2 text-sm text-gray-300 md:mt-0">
          <span>
            {education.startDate || 'N/A'} - {education.isCurrentlyStudying ? 'Present' : (education.endDate || 'N/A')}
          </span>
          {duration && (
          <span className="rounded-full bg-indigo-900 px-3 py-1 text-xs">
            {duration}
          </span>
                                )}
        </div>
      </div>
      {/* Education Details */}
      {details && details.length > 0 && (
      <ul className="ml-4 list-disc space-y-1 text-gray-300">
        {details.map((detail, detailIndex) => (
          <li key={detailIndex} className="text-sm md:text-base">{detail}</li>
                                ))}
      </ul>
                            )}
    </div>
  </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistorySection;