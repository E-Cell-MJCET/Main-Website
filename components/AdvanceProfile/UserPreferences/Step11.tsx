"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

// Define the type for featured content
type FeaturedContent = {
  title: string;
  description: string;
};

const Step11Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  // State for featured content items
  const [featuredItems, setFeaturedItems] = useState<FeaturedContent[]>([
    { title: "", description: "" }
  ]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedFeaturedItems = localStorage.getItem(`${sessionId}_featured_items`);
      
      if (savedFeaturedItems && savedFeaturedItems !== "[]") {
        setFeaturedItems(JSON.parse(savedFeaturedItems));
      }
    }
  }, []);

  // Add a new featured item
  const handleAddFeatured = () => {
    setFeaturedItems([...featuredItems, { title: "", description: "" }]);
  };

  // Update a featured item
  const handleFeaturedChange = (index: number, field: keyof FeaturedContent, value: string) => {
    const updatedFeaturedItems = featuredItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFeaturedItems(updatedFeaturedItems);
  };

  // Remove a featured item
  const handleRemoveFeatured = (index: number) => {
    setFeaturedItems(featuredItems.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Filter out completely empty featured items
    const validFeaturedItems = featuredItems.filter(
      item => item.title || item.description
    );
    
    console.log("Featured Content:", validFeaturedItems);
    
    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(`${sessionId}_featured_items`, JSON.stringify(validFeaturedItems));
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
          Featured Content
        </h2>
        <div className="mb-6">
          <p className="mb-4 text-center text-gray-600">
            Add featured content to highlight at the top of your profile. 
            <span className="mt-1 block text-sm text-indigo-600">Note: Maximum of 3 items will be displayed.</span>
          </p>
          {/* Featured Content Input */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">Featured Items</h3>
            {featuredItems.map((item, index) => (
              <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => handleFeaturedChange(index, "title", e.target.value)}
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                  <button 
                    onClick={() => handleRemoveFeatured(index)} 
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove featured item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <textarea
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleFeaturedChange(index, "description", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  rows={4}
                />
              </div>
            ))}
            <button
              onClick={handleAddFeatured}
              className="rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600"
              disabled={featuredItems.length >= 3}
            >
              {featuredItems.length >= 3 ? "Maximum of 3 items" : "Add Featured Item"}
            </button>
          </div>
          {/* Preview section */}
          {featuredItems.some(item => item.title || item.description) && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-700">Preview</h3>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredItems.filter(item => item.title || item.description).slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-md"
                    >
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        {item.title || "Untitled"}
                      </h4>
                      <p className="mb-3 text-sm text-gray-600">
                        {item.description || "No description"}
                      </p>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-500 hover:text-indigo-700"
                      >
                        Read more
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
            className="rounded-lg bg-purple-500 px-6 py-3 font-semibold text-white hover:bg-purple-600"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step11Welcome;