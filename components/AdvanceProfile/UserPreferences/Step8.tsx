"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react"; // Importing a delete icon

// Define types for licenses and certifications
type License = {
  title: string;
  description: string;
  image: string;
};

type Certification = {
  title: string;
  description: string;
  image: string;
};

const Step8Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  // Initialize with one empty license and certification
  const [licenses, setLicenses] = useState<License[]>([{ title: "", description: "", image: "" }]);
  const [certifications, setCertifications] = useState<Certification[]>([{ title: "", description: "", image: "" }]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedLicenses = localStorage.getItem(`${sessionId}_licenses`);
      const savedCertifications = localStorage.getItem(`${sessionId}_certifications`);
      
      if (savedLicenses && savedLicenses !== "[]") {
        setLicenses(JSON.parse(savedLicenses));
      }
      
      if (savedCertifications && savedCertifications !== "[]") {
        setCertifications(JSON.parse(savedCertifications));
      }
    }
  }, []);

  const handleAddLicense = () => {
    setLicenses([...licenses, { title: "", description: "", image: "" }]);
  };

  const handleAddCertification = () => {
    setCertifications([...certifications, { title: "", description: "", image: "" }]);
  };

  const handleLicenseChange = (index: number, field: keyof License, value: string) => {
    const updatedLicenses = licenses.map((license, i) =>
      i === index ? { ...license, [field]: value } : license
    );
    setLicenses(updatedLicenses);
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = certifications.map((certification, i) =>
      i === index ? { ...certification, [field]: value } : certification
    );
    setCertifications(updatedCertifications);
  };

  const handleRemoveLicense = (index: number) => {
    setLicenses(licenses.filter((_, i) => i !== index));
  };

  const handleRemoveCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Filter out completely empty entries
    const validLicenses = licenses.filter(
      license => license.title || license.description || license.image
    );
    
    const validCertifications = certifications.filter(
      cert => cert.title || cert.description || cert.image
    );
    
    console.log("Licenses:", validLicenses);
    console.log("Certifications:", validCertifications);
    
    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(`${sessionId}_licenses`, JSON.stringify(validLicenses));
      localStorage.setItem(`${sessionId}_certifications`, JSON.stringify(validCertifications));
    }
    
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-50 to-teal-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Licenses & Certifications
        </h2>
        {/* Licenses Input */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">Licenses</h3>
          {licenses.map((license, index) => (
            <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Title"
                  value={license.title}
                  onChange={(e) => handleLicenseChange(index, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button onClick={() => handleRemoveLicense(index)} className="ml-2 text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Description"
                value={license.description}
                onChange={(e) => handleLicenseChange(index, "description", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={license.image}
                onChange={(e) => handleLicenseChange(index, "image", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          ))}
          <button
            onClick={handleAddLicense}
            className="rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
          >
            Add License
          </button>
        </div>
        {/* Certifications Input */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">Certifications</h3>
          {certifications.map((certification, index) => (
            <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Title"
                  value={certification.title}
                  onChange={(e) => handleCertificationChange(index, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button onClick={() => handleRemoveCertification(index)} className="ml-2 text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Description"
                value={certification.description}
                onChange={(e) => handleCertificationChange(index, "description", e.target.value)}
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={certification.image}
                onChange={(e) => handleCertificationChange(index, "image", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          ))}
          <button
            onClick={handleAddCertification}
            className="rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
          >
            Add Certification
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
            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step8Welcome;