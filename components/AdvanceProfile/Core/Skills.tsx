/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";
import React, { useState } from 'react';
import { motion,AnimatePresence } from 'framer-motion';

type SkillCategory = "Technical" | "Soft Skills" | "Languages" | "Tools" | "Other";
type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsOfExperience?: number;
}

interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsOfExperience?: number;
}

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Group skills by category for better organization
  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    
    return acc;
  }, {});

  const categories = Object.keys(skillsByCategory);
  
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Determine if we should show the "View All" button
  const totalSkillCount = skills.length;
  const shouldShowViewAll = totalSkillCount > 12;

  // Function to get the proficiency percentage
  const getProficiencyPercentage = (proficiency: ProficiencyLevel): number => {
    switch (proficiency) {
      case 'Beginner': return 25;
      case 'Intermediate': return 50;
      case 'Advanced': return 75;
      case 'Expert': return 100;
      default: return 0;
    }
  };

  // Function to get proficiency color
  const getProficiencyColor = (proficiency: ProficiencyLevel): string => {
    switch (proficiency) {
      case 'Beginner': return 'from-green-300 to-green-500';
      case 'Intermediate': return 'from-blue-300 to-blue-600';
      case 'Advanced': return 'from-purple-300 to-purple-600';
      case 'Expert': return 'from-red-300 to-red-600';
      default: return 'from-gray-300 to-gray-500';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Filter skills for the current view
  const filteredSkills = activeCategory 
    ? skillsByCategory[activeCategory]?.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    : [];

  // Filtered skills for the modal (all categories)
  const allFilteredSkills = searchTerm 
    ? skills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : skills;

  return (
    <div className="relative overflow-hidden  bg-gradient-to-b from-gray-900 via-gray-800 to-black px-4 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl"></div>
        <div className="absolute right-20 top-60 size-60 rounded-full bg-purple-500 opacity-5 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 size-40 rounded-full bg-red-500 opacity-5 blur-2xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Skills & Expertise</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Showcasing my technical proficiency and expertise across various domains.
          </p>
        </motion.div>
        {/* Category Selection + Search & View Controls */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <motion.div
            className="scrollbar-hide flex gap-2 overflow-x-auto pb-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition duration-200 md:text-base ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
          {/* Search and View Controls */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
            />
            <div className="flex rounded-full bg-gray-800 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-full p-2 ${viewMode === 'grid' ? 'bg-gray-700' : ''}`}
                title="Grid view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-full p-2 ${viewMode === 'list' ? 'bg-gray-700' : ''}`}
                title="List view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[200px]"
          >
            {filteredSkills.length === 0 ? (
              <motion.div 
                className="flex h-48 items-center justify-center text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {searchTerm 
                  ? "No skills match your search." 
                  : "No skills in this category."}
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "space-y-3"
                }
              >
                {filteredSkills.slice(0, 12).map((skill, index) => (
                  <SkillCard 
                    key={`${skill.name}-${index}`} 
                    skill={skill} 
                    viewMode={viewMode} 
                    getProficiencyPercentage={getProficiencyPercentage}
                    getProficiencyColor={getProficiencyColor}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        {/* View All Button (only if needed) */}
        {shouldShowViewAll && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 md:text-base"
            >
              View All Skills ({totalSkillCount})
            </button>
          </motion.div>
        )}
      </div>
      {/* Full Skills Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
                <h3 className="text-xl font-semibold text-white">All Skills</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                {/* Search in Modal */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search all skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Categories in Modal */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {/* Skills Grid in Modal */}
                <div className="scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-500 max-h-[50vh] overflow-y-auto pr-2">
                  {activeCategory ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {skillsByCategory[activeCategory]
                        ?.filter(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((skill, index) => (
                          <SkillCard 
                            key={`modal-${skill.name}-${index}`} 
                            skill={skill} 
                            viewMode="grid"
                            getProficiencyPercentage={getProficiencyPercentage}
                            getProficiencyColor={getProficiencyColor}
                            isCompact={true}
                          />
                        ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {allFilteredSkills.map((skill, index) => (
                        <SkillCard 
                          key={`modal-all-${skill.name}-${index}`} 
                          skill={skill} 
                          viewMode="grid"
                          getProficiencyPercentage={getProficiencyPercentage}
                          getProficiencyColor={getProficiencyColor}
                          isCompact={true}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Separate SkillCard component for reusability
interface SkillCardProps {
  skill: Skill;
  viewMode: 'grid' | 'list';
  getProficiencyPercentage: (level: ProficiencyLevel) => number;
  getProficiencyColor: (level: ProficiencyLevel) => string;
  isCompact?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  skill, 
  viewMode, 
  getProficiencyPercentage, 
  getProficiencyColor,
  isCompact = false 
}) => {
  const percentage = getProficiencyPercentage(skill.proficiency);
  const colorClass = getProficiencyColor(skill.proficiency);
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4 } 
    },
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-lg bg-gray-800 bg-opacity-60 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-opacity-80"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-white">{skill.name}</h3>
            <p className="mt-1 text-xs text-gray-400">
              {skill.proficiency}
              {skill.yearsOfExperience && ` • ${skill.yearsOfExperience} ${skill.yearsOfExperience === 1 ? 'year' : 'years'}`}
            </p>
          </div>
          <div className="ml-4 w-32">
            <div className="h-2 w-full rounded-full bg-gray-700">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${colorClass}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Grid view
  return (
    <motion.div
      variants={itemVariants}
      className={`group relative overflow-hidden rounded-lg ${
        isCompact ? 'bg-gray-700 p-3' : 'bg-gray-800 bg-opacity-60 p-4 shadow-lg backdrop-blur-sm'
      } transition-all duration-200 hover:bg-opacity-80 hover:shadow-xl`}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-medium text-white ${isCompact ? 'text-sm' : 'text-lg'}`}>{skill.name}</h3>
          <span className={`rounded-full bg-blue-900 ${isCompact ? 'px-2 py-1 text-xs' : 'px-2.5 py-1 text-xs'} font-medium text-blue-200`}>
            {skill.category}
          </span>
        </div>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className={`text-gray-400 ${isCompact ? 'text-xs' : 'text-sm'}`}>{skill.proficiency}</span>
            {skill.yearsOfExperience && (
              <span className={`text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
              </span>
            )}
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
            <motion.div 
              className={`h-2 rounded-full bg-gradient-to-r ${colorClass}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;