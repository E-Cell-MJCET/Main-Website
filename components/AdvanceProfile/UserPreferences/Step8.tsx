"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2, Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import { supabase } from "@/utils/supabase";

// Define types for licenses and certifications
type License = {
  title: string;
  description: string;
  image: string; // Will store image as base64 string
};

type Certification = {
  title: string;
  description: string;
  image: string; // Will store image as base64 string
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

  const {user} = useUser();
  const [userData, setUserData] = useState<any | null>(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Initiating fetch for: ", user?.id); // Debugging line
        const { data, error } = await supabase
          .from("Team") // Assuming the table name is 'Team'
          .select("*")
          .eq("clerk_user_id", user?.id) // Querying by username in the 'Name' column
          .single(); // Expecting a single row

        if (error) {
          console.log("Error is :-> ", error);
        } else {
          setUserData(data);
        }
      } catch (err: any) {
        console.log(err);
        // setError(
        //   `An error occurred while fetching profile data: ${err.message}`
        // );
      } finally {
        // setLoading(false);
      }
    };
  
      fetchData();
    }, [user?.id]);
  
  // References to file inputs for licenses and certifications
  const licenseFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const certificationFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  // Update file input refs when arrays change
  useEffect(() => {
    licenseFileInputRefs.current = licenseFileInputRefs.current.slice(0, licenses.length);
  }, [licenses.length]);

  useEffect(() => {
    certificationFileInputRefs.current = certificationFileInputRefs.current.slice(0, certifications.length);
  }, [certifications.length]);

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

  // Convert file to base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle license image upload
  const handleLicenseImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
        handleLicenseChange(index, "image", base64Image);
      } catch (error) {
        console.error('Error converting license image:', error);
        alert('Failed to process image');
      }
    }
  };

  // Handle certification image upload
  const handleCertificationImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
        handleCertificationChange(index, "image", base64Image);
      } catch (error) {
        console.error('Error converting certification image:', error);
        alert('Failed to process image');
      }
    }
  };

  // Trigger license file input click
  const triggerLicenseFileInput = (index: number) => {
    if (licenseFileInputRefs.current[index]) {
      licenseFileInputRefs.current[index]?.click();
    }
  };

  // Trigger certification file input click
  const triggerCertificationFileInput = (index: number) => {
    if (certificationFileInputRefs.current[index]) {
      certificationFileInputRefs.current[index]?.click();
    }
  };

  // Clear license image
  const clearLicenseImage = (index: number) => {
    handleLicenseChange(index, "image", "");
    // Reset file input
    if (licenseFileInputRefs.current[index]) {
      licenseFileInputRefs.current[index]!.value = "";
    }
  };

  // Clear certification image
  const clearCertificationImage = (index: number) => {
    handleCertificationChange(index, "image", "");
    // Reset file input
    if (certificationFileInputRefs.current[index]) {
      certificationFileInputRefs.current[index]!.value = "";
    }
  };

  const handleNext = async () => {
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
    
    if (userData.Profile_Data_Created){
      // store data in supabase
      const { error } = await supabase
        .from("Team")
        .update({
          Licenses: validLicenses,
          Certifications: validCertifications,
        })
        .eq("clerk_user_id", user?.id); // Assuming the table name is 'Team'
        alert("Licenses and Certifications updated successfully!");
        if (error){
          console.log(error);
        }
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
                  placeholder="License Title"
                  value={license.title}
                  onChange={(e) => handleLicenseChange(index, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveLicense(index)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove license"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="License Description"
                value={license.description}
                onChange={(e) => handleLicenseChange(index, "description", e.target.value)}
                className="mb-4 w-full rounded-lg border border-gray-300 p-3"
                rows={3}
              />
              {/* License Image Input Section */}
              <div className="mb-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  License Image (Optional)
                </label>
                {/* License Image Preview */}
                {license.image ? (
                  <div className="mt-3 rounded-lg border border-gray-200 p-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Image Preview</h4>
                      <button 
                        type="button"
                        onClick={() => clearLicenseImage(index)}
                        className="rounded p-1 text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center overflow-hidden rounded-lg">
                      <Image
                        width={500}
                        height={500} 
                        src={license.image} 
                        alt={license.title || "License image"} 
                        className="max-h-48 object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  /* No Image Placeholder - Clickable Upload Area */
                  <div 
                    className="mt-3 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    onClick={() => triggerLicenseFileInput(index)}
                  >
                    <Upload size={36} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload license image</p>
                    <p className="mt-1 text-xs text-gray-400">Max size: 2MB</p>
                  </div>
                )}
                {/* Hidden file input for license */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => {
                    licenseFileInputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleLicenseImageUpload(index, e)}
                  className="hidden"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLicense}
            className="flex items-center rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
          >
            <Plus size={20} className="mr-2" />
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
                  placeholder="Certification Title"
                  value={certification.title}
                  onChange={(e) => handleCertificationChange(index, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveCertification(index)} 
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove certification"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Certification Description"
                value={certification.description}
                onChange={(e) => handleCertificationChange(index, "description", e.target.value)}
                className="mb-4 w-full rounded-lg border border-gray-300 p-3"
                rows={3}
              />
              {/* Certification Image Input Section */}
              <div className="mb-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Certification Image (Optional)
                </label>
                {/* Certification Image Preview */}
                {certification.image ? (
                  <div className="mt-3 rounded-lg border border-gray-200 p-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Image Preview</h4>
                      <button 
                        type="button"
                        onClick={() => clearCertificationImage(index)}
                        className="rounded p-1 text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center overflow-hidden rounded-lg">
                      <Image  
                        width={500}
                        height={500} 
                        src={certification.image} 
                        alt={certification.title || "Certification image"} 
                        className="max-h-48 object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  /* No Image Placeholder - Clickable Upload Area */
                  <div 
                    className="mt-3 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    onClick={() => triggerCertificationFileInput(index)}
                  >
                    <Upload size={36} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload certification image</p>
                    <p className="mt-1 text-xs text-gray-400">Max size: 2MB</p>
                  </div>
                )}
                {/* Hidden file input for certification */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => {
                    certificationFileInputRefs.current[index] = el;
                  }}
                  onChange={(e) => handleCertificationImageUpload(index, e)}
                  className="hidden"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCertification}
            className="flex items-center rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
          >
            <Plus size={20} className="mr-2" />
            Add Certification
          </button>
        </div>
        {/* Preview Section */}
        {(licenses.some(l => l.title || l.description || l.image) || 
          certifications.some(c => c.title || c.description || c.image)) && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-700">Preview</h3>
            {/* Licenses Preview */}
            {licenses.some(l => l.title || l.description || l.image) && (
              <div className="mb-4">
                <h4 className="text-md mb-2 font-medium text-gray-700">Licenses</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {licenses.filter(l => l.title || l.description || l.image).map((license, index) => (
                    <div key={index} className="rounded-lg bg-white p-4 shadow-md">
                      {license.image && (
                        <div className="mb-3 overflow-hidden rounded-lg">
                          <Image
                            width={500}
                            height={500}
                            src={license.image} 
                            alt={license.title || "License"} 
                            className="h-40 w-full object-cover"
                          />
                        </div>
                      )}
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        {license.title || "Untitled License"}
                      </h4>
                      {license.description && (
                        <p className="text-sm text-gray-600">
                          {license.description.length > 100 
                            ? `${license.description.substring(0, 100)}...` 
                            : license.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Certifications Preview */}
            {certifications.some(c => c.title || c.description || c.image) && (
              <div>
                <h4 className="text-md mb-2 font-medium text-gray-700">Certifications</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {certifications.filter(c => c.title || c.description || c.image).map((certification, index) => (
                    <div key={index} className="rounded-lg bg-white p-4 shadow-md">
                      {certification.image && (
                        <div className="mb-3 overflow-hidden rounded-lg">
                          <Image
                            width={500}
                            height={500} 
                            src={certification.image} 
                            alt={certification.title || "Certification"} 
                            className="h-40 w-full object-cover"
                          />
                        </div>
                      )}
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        {certification.title || "Untitled Certification"}
                      </h4>
                      {certification.description && (
                        <p className="text-sm text-gray-600">
                          {certification.description.length > 100 
                            ? `${certification.description.substring(0, 100)}...` 
                            : certification.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
            type="button"
          >
            {userData?.Profile_Data_Created ? "Save" : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step8Welcome;