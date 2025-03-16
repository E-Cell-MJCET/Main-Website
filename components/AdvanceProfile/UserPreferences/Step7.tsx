"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react"; // Importing a delete icon

// Define types for the data structure
type Project = {
  title: string;
  description: string;
  image: string;
};

const Step7Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [projects, setProjects] = useState<Project[]>([
    { title: "", description: "", image: "" }
  ]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedProjects = localStorage.getItem(`${sessionId}_projects`);
      
      if (savedProjects && savedProjects !== "[]") {
        setProjects(JSON.parse(savedProjects));
      }
    }
  }, []);

  const handleAddProject = () => {
    setProjects([...projects, { title: "", description: "", image: "" }]);
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Filter out completely empty project entries
    const validProjects = projects.filter(
      project => project.title || project.description || project.image
    );
    
    console.log("Projects:", validProjects);
    
    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(`${sessionId}_projects`, JSON.stringify(validProjects));
    }
    
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Project Input
        </h2>
        {/* Projects Input */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button 
                  onClick={() => handleRemoveProject(index)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove project"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={project.image}
                onChange={(e) => handleProjectChange(index, "image", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          ))}
          <button
            onClick={handleAddProject}
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-400"
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step7Welcome;