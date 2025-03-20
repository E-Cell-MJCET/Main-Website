/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Match Step7 data structure exactly
type Project = {
  title: string;
  description: string;
  image: string; // Base64 or URL
};

// Update props to match Step7 data structure directly
interface ProjectsProps {
  projects: Project[]; // Direct array instead of nested object
}

const Projects: React.FC<ProjectsProps> = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  if (!Array.isArray(projects)) {
    console.error('Projects data is not an array:', projects);
    
return <div className="text-center text-red-600">Invalid projects data.</div>;
  }

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-40 size-64 rounded-full bg-purple-600 opacity-10 blur-3xl"></div>
        <div className="absolute right-1/4 top-60 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl"></div>
      </div>
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Projects
          </h2>
          {projects.length > 0 ? (
            <p className="mx-auto max-w-2xl text-gray-400">
              Explore my portfolio of projects that showcase my skills and passion.
            </p>
          ) : (
            <p className="mx-auto max-w-2xl text-gray-400">
              No projects have been added yet.
            </p>
          )}
        </motion.div>
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-48 items-center justify-center rounded-lg bg-gray-800 bg-opacity-50 text-center text-gray-400"
          >
            <p>No projects to display. Check back later!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group cursor-pointer overflow-hidden rounded-xl bg-gray-800 shadow-xl transition-all duration-300"
                onClick={() => openProjectDetails(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    </>
                  ) : (
                    <div className="flex size-full items-center justify-center bg-gradient-to-r from-purple-900 to-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0h10a2 2 0 010 4H7a2 2 0 010-4z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-white group-hover:text-purple-400 md:text-2xl">
                    {project.title || "Untitled Project"}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-gray-400">
                    {project.description || "No description available"}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-purple-400">
                    View details
                    <svg className="ml-2 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl bg-gray-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={closeProjectDetails}
                className="absolute right-4 top-4 z-10 rounded-full bg-gray-900 bg-opacity-70 p-2 text-white shadow-lg transition-all hover:bg-opacity-100"
                aria-label="Close details"
              >
                <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              {/* Project Image */}
              {selectedProject.image ? (
                <div className="relative aspect-video w-full">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              ) : (
                <div className="relative aspect-video w-full bg-gradient-to-r from-purple-900 to-gray-800">
                  <div className="flex size-full items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0h10a2 2 0 010 4H7a2 2 0 010-4z" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Project Details */}
              <div className="p-6 md:p-8">
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                  {selectedProject.title || "Untitled Project"}
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-line text-gray-300">
                    {selectedProject.description || "No description available for this project."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;