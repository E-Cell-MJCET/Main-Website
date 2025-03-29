"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2, Upload, X, Plus } from "lucide-react";
import Image from "next/image";

// Define types for the data structure
type Project = {
  title: string;
  description: string;
  image: string; // Will store image as base64 string
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
  
  // References to file inputs for each project
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Update file input refs when projects array changes
  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, projects.length);
  }, [projects.length]);

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

  // Convert file to base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image file upload
  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        
        return;
      }
      
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        
        return;
      }
      
      try {
        const base64Image = await convertToBase64(file);
        handleProjectChange(index, "image", base64Image);
      } catch (error) {
        console.error('Error converting image:', error);
        alert('Failed to process image');
      }
    }
  };

  // Trigger file input click
  const triggerFileInput = (index: number) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]?.click();
    }
  };

  // Clear image
  const clearImage = (index: number) => {
    handleProjectChange(index, "image", "");
    // Reset file input
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = "";
    }
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Project Portfolio
        </h2>
        <p className="mb-4 text-center text-gray-600">
          Showcase your best projects with descriptions and images
        </p>
        {/* Projects Input */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">Your Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="mb-6 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Project Title"
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
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                className="mb-4 w-full rounded-lg border border-gray-300 p-3"
                rows={3}
              />
              {/* Image Input Section */}
              <div className="mb-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Project Image (Optional)
                </label>
                {/* Image Preview */}
                {project.image ? (
                  <div className="mt-3 rounded-lg border border-gray-200 p-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Image Preview</h4>
                      <button 
                        onClick={() => clearImage(index)}
                        className="rounded p-1 text-red-500 hover:bg-red-50"
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center overflow-hidden rounded-lg">
                      <Image 
                        width={500}
                        height={500}
                        src={project.image} 
                        alt={project.title || "Project image"} 
                        className="max-h-48 object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  /* No Image Placeholder - Clickable Upload Area */
                  <div 
                    className="mt-3 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    onClick={() => triggerFileInput(index)}
                  >
                    <Upload size={36} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload an image</p>
                    <p className="mt-1 text-xs text-gray-400">Max size: 2MB</p>
                  </div>
                )}
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleImageUpload(index, e)}
                  className="hidden"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddProject}
            className="flex items-center rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            <Plus size={20} className="mr-2" />
            Add Another Project
          </button>
        </div>
        {/* Preview section */}
        {projects.some(p => p.title || p.description || p.image) && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-700">Project Preview</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {projects.filter(p => p.title || p.description || p.image).map((project, index) => (
                <div key={index} className="rounded-lg bg-white p-4 shadow-md">
                  {project.image && (
                    <div className="mb-3 overflow-hidden rounded-lg">
                      <Image
                        width={500}
                        height={500} 
                        src={project.image} 
                        alt={project.title || "Project"} 
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  )}
                  <h4 className="mb-2 text-lg font-semibold text-gray-800">
                    {project.title || "Untitled Project"}
                  </h4>
                  {project.description && (
                    <p className="text-sm text-gray-600">
                      {project.description.length > 100 
                        ? `${project.description.substring(0, 100)}...` 
                        : project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-400"
            type="button"
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
            type="button"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step7Welcome;