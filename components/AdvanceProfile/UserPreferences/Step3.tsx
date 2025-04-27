/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MdInfoOutline, MdFileUpload, MdEdit } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define a type for all possible section names
type SectionName =
  | "About"
  | "Education"
  | "Products"
  | "Services"
  | "Skills"
  | "Featured"
  | "Licenses & Certifications"
  | "Projects"
  | "Recommendations"
  | "Causes"
  | "Honors & Awards"
  | "Test & Scores"
  | "Volunteer Experience";

// Mapping between section names and step numbers
const sectionToStepMap: Record<SectionName, number> = {
  About: 4,
  Education: 5,
  Skills: 6,
  Projects: 7,
  "Licenses & Certifications": 8,
  Recommendations: 9,
  "Honors & Awards": 10,
  Featured: 11,
  Causes: 12,
  "Test & Scores": 14,
  "Volunteer Experience": 15,
  Products: 13, // Assuming this maps to a step
  Services: 13, // Assuming this maps to the same step as Products
};

const Step3Welcome = ({
  onNext,
  onPrevious,
  userId,
  profileCreated = false,
  userData = null,
  onSaveComplete,
}: {
  onNext: () => void;
  onPrevious: () => void;
  profileCreated?: boolean;
  userData?: any;
  userId: string | null;
  onSaveComplete?: () => void;
}) => {
  // State for selected sections in each category
  const [coreSelections, setCoreSelections] = useState<SectionName[]>([
    "About",
    "Education",
    "Skills",
  ]);
  const [recommendedSelections, setRecommendedSelections] = useState<
    SectionName[]
  >(["Projects", "Recommendations"]);
  const [additionalSelections, setAdditionalSelections] = useState<
    SectionName[]
  >([]);

  // State for profile image
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(
    null
  );
  const [showImageTooltip, setShowImageTooltip] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for saving data
  const [isSaving, setIsSaving] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isProfileCreated, setIsProfileCreated] =
    useState<boolean>(profileCreated);

  // Convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Effect to show initial tooltip
  useEffect(() => {
    // Auto-hide the tooltip after 15 seconds
    const timer = setTimeout(() => {
      setShowImageTooltip(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Effect to check if profile data is created in Supabase
  useEffect(() => {
    const checkProfileCreated = async () => {
      if (!userId) return;

      try {
        const { data, error } = await supabase
          .from("Team")
          .select("Profile_Data_Created")
          .eq("custom_auth_userID", userId)
          .single();

        if (data && !error) {
          setIsProfileCreated(!!data.Profile_Data_Created);
        }
      } catch (error) {
        console.error("Error checking profile status:", error);
      }
    };

    checkProfileCreated();
  }, [userId]);

  // Load data from userData or localStorage
  useEffect(() => {
    const loadData = async () => {
      if (dataLoaded) return;

      // First try to load from userData (for edit mode)
      if (userData) {
        // if (userData.CoreSections) setCoreSelections(userData.CoreSections);
        // if (userData.RecommendedSections) setRecommendedSelections(userData.RecommendedSections);
        // if (userData.AdditionalSections) setAdditionalSelections(userData.AdditionalSelections);
        if (userData.ProfileImageHeader)
          setProfileImageBase64(userData.ProfileImageHeader);

        setDataLoaded(true);

        return;
      }

      // If no userData, try to load from localStorage
      const sessionId = localStorage.getItem("personalized_session_id");
      if (sessionId) {
        // Load section selections
        // const savedCoreSelections = localStorage.getItem(`${sessionId}_core_sections`);
        // const savedRecommendedSelections = localStorage.getItem(`${sessionId}_recommended_sections`);
        // const savedAdditionalSelections = localStorage.getItem(`${sessionId}_additional_sections`);

        // if (savedCoreSelections) setCoreSelections(JSON.parse(savedCoreSelections));
        // if (savedRecommendedSelections) setRecommendedSelections(JSON.parse(savedRecommendedSelections));
        // if (savedAdditionalSelections) setAdditionalSelections(JSON.parse(savedAdditionalSelections));

        // Load profile header image
        const savedProfileImage = localStorage.getItem(
          `${sessionId}_profile_header_image`
        );
        if (savedProfileImage) {
          setProfileImageBase64(savedProfileImage);
        }

        setDataLoaded(true);
      }

      // If profileCreated is true but we have no data, fetch from Supabase
      if (profileCreated && userId && !dataLoaded) {
        try {
          const { data, error } = await supabase
            .from("Team")
            .select("ProfileImageHeader, Profile_Data_Created")
            .eq("custom_auth_userID", userId)
            .single();

          if (data && !error) {
            // if (data.CoreSections) setCoreSelections(data.CoreSections);
            // if (data.RecommendedSections) setRecommendedSelections(data.RecommendedSections);
            // if (data.AdditionalSections) setAdditionalSelections(data.AdditionalSelections);
            if (data.ProfileImageHeader)
              setProfileImageBase64(data.ProfileImageHeader);
            if (data.Profile_Data_Created !== undefined)
              setIsProfileCreated(!!data.Profile_Data_Created);

            setDataLoaded(true);
          }
        } catch (error) {
          console.error("Error fetching data from Supabase:", error);
        }
      }
    };

    loadData();
  }, [userData, profileCreated, userId, dataLoaded]);

  // Handle image file selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check if file is an image
      if (!file.type.match("image.*")) {
        alert("Please select an image file");

        return;
      }

      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should not exceed 2MB");

        return;
      }

      setProfileImage(file);

      try {
        // Convert to base64 for storage
        const base64Image = await convertToBase64(file);
        setProfileImageBase64(base64Image);
        setShowImageTooltip(false);
      } catch (error) {
        console.error("Error converting image to base64:", error);
        alert("Failed to process image");
      }
    }
  };

  // Clear selected image
  const clearImage = () => {
    setProfileImage(null);
    setProfileImageBase64(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Portfolio options by category
  const portfolioSections: Record<
    "core" | "recommended" | "additional",
    SectionName[]
  > = {
    core: ["About", "Education", "Products", "Services", "Skills"],
    recommended: [
      "Featured",
      "Licenses & Certifications",
      "Projects",
      "Recommendations",
    ],
    additional: [
      "Causes",
      "Honors & Awards",
      "Test & Scores",
      "Volunteer Experience",
    ],
  };

  // Section descriptions
  const sectionDescriptions: Record<SectionName, string> = {
    // Core
    About:
      "Your professional summary and personal bio to introduce yourself to visitors.",
    Education: "Your academic background, degrees, and certifications.",
    Products: "Products you've created or been involved with developing.",
    Services: "Professional services you offer or specialize in.",
    Skills: "Technical and soft skills that showcase your capabilities.",

    // Recommended
    Featured:
      "Highlight your best work, publications, or achievements at the top of your profile.",
    "Licenses & Certifications":
      "Professional licenses and certifications you've earned.",
    Projects: "Significant projects you've completed or contributed to.",
    Recommendations:
      "Testimonials and endorsements from colleagues and clients.",

    // Additional
    Causes:
      "Social causes, initiatives, or organizations you support or volunteer with.",
    "Honors & Awards": "Recognition and achievements you've received.",
    "Test & Scores": "Standardized test scores or professional assessments.",
    "Volunteer Experience":
      "Your history of volunteer work and community service.",
  };

  // Save to Supabase (for edit mode)
  const saveToSupabase = async () => {
    if (!userId) {
      alert("You must be logged in to save your profile");

      return;
    }

    setIsSaving(true);

    try {
      // Prepare data for Supabase update - only include Step3 form fields
      const updateData: any = {
        ProfileImageHeader: profileImageBase64 || null,
        // CoreSections: coreSelections,
        // RecommendedSections: recommendedSelections,
        // AdditionalSections: additionalSelections,
        // Set Profile_Data_Created to true if this is the first time saving
        Profile_Data_Created: true,
      };

      // Get the session ID for localStorage
      const sessionId = localStorage.getItem("personalized_session_id");

      // Update the Team table with only the Step3 fields
      const { data, error } = await supabase
        .from("Team")
        .update(updateData)
        .eq("custom_auth_userID", userId);

      if (error) {
        console.error("Error updating profile:", error);
        alert("Failed to save profile. Please try again.");
      } else {
        console.log("Profile updated successfully:", data);
        alert("Portfolio sections updated successfully!");

        // Save to localStorage as well to keep it in sync
        if (sessionId) {
          localStorage.setItem(
            `${sessionId}_core_sections`,
            JSON.stringify(coreSelections)
          );
          localStorage.setItem(
            `${sessionId}_recommended_sections`,
            JSON.stringify(recommendedSelections)
          );
          localStorage.setItem(
            `${sessionId}_additional_sections`,
            JSON.stringify(additionalSelections)
          );

          if (profileImageBase64) {
            localStorage.setItem(
              `${sessionId}_profile_header_image`,
              profileImageBase64
            );
          } else {
            localStorage.removeItem(`${sessionId}_profile_header_image`);
          }
        }

        // Call the onSaveComplete callback if provided (for EditUserProfile.tsx)
        if (onSaveComplete) {
          onSaveComplete();
        } else {
          onNext();
        }
      }
    } catch (error) {
      console.error("Error in saveToSupabase:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle next button click (for creation mode)
  const handleNext = () => {
    // If profile is already created, use saveToSupabase instead
    if (isProfileCreated) {
      saveToSupabase();

      return;
    }

    console.log("Profile Image:", profileImage ? "Selected" : "None");
    console.log("Core Selections:", coreSelections);
    console.log("Recommended Selections:", recommendedSelections);
    console.log("Additional Selections:", additionalSelections);

    // Get all selected sections and map them to step numbers
    const allSelections = [
      ...coreSelections,
      ...recommendedSelections,
      ...additionalSelections,
    ];
    const stepSequence = allSelections
      .map((section) => sectionToStepMap[section])
      .filter((step, index, self) => step && self.indexOf(step) === index) // Remove duplicates and undefined
      .sort((a, b) => a - b); // Sort in ascending order

    // Save to localStorage with the session ID
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(
        `${sessionId}_core_sections`,
        JSON.stringify(coreSelections)
      );
      localStorage.setItem(
        `${sessionId}_recommended_sections`,
        JSON.stringify(recommendedSelections)
      );
      localStorage.setItem(
        `${sessionId}_additional_sections`,
        JSON.stringify(additionalSelections)
      );
      localStorage.setItem(
        `${sessionId}_step_sequence`,
        JSON.stringify(stepSequence)
      );

      // Store profile header image as base64 string
      if (profileImageBase64) {
        localStorage.setItem(
          `${sessionId}_profile_header_image`,
          profileImageBase64
        );
      } else {
        // If the image was cleared, remove it from localStorage
        localStorage.removeItem(`${sessionId}_profile_header_image`);
      }
    }

    onNext();
  };

  // Function to render section information (not clickable)
  const renderSectionInfo = (
    category: "core" | "recommended" | "additional",
    title: string,
    bgColor: string
  ) => (
    <div className="mb-8">
      <h3 className="mb-3 text-xl font-semibold text-gray-800">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {portfolioSections[category].map((section) => (
          <div key={section} className={`bg- rounded-lg${bgColor} p-4 shadow`}>
            <h4 className="mb-2 font-semibold text-gray-800">{section}</h4>
            <p className="text-sm text-gray-700">
              {sectionDescriptions[section]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          {isProfileCreated || profileCreated
            ? "Portfolio Sections"
            : "Portfolio Sections Overview 📋"}
        </h2>
        {/* Profile Image Upload Section */}
        <div className="relative mb-10">
          <h3 className="mb-3 text-xl font-semibold text-gray-800">
            Profile Header Image
          </h3>
          <div className="flex flex-col items-center">
            {/* 4:3 Aspect Ratio Container */}
            <div className="relative mb-4 w-full max-w-lg">
              {/* The div below creates a 4:3 aspect ratio box using padding-bottom trick */}
              <div className="relative w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 pb-[75%]">
                {profileImageBase64 ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      width={800}
                      height={600}
                      src={profileImageBase64}
                      alt="Profile Header"
                      className="absolute inset-0 size-full object-cover"
                    />
                    <div className="absolute right-2 top-2 z-10 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
                        title="Change image"
                      >
                        <MdEdit size={20} className="text-gray-700" />
                      </button>
                      <button
                        type="button"
                        onClick={clearImage}
                        className="rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
                        title="Remove image"
                      >
                        <IoMdCloseCircle size={20} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <MdFileUpload className="size-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload a profile header image
                    </p>
                    <p className="text-xs text-gray-400">
                      4:3 aspect ratio recommended (800×600px)
                    </p>
                    {/* Visual aspect ratio guide */}
                    <div className="mt-3 grid w-20 grid-cols-4 gap-0.5">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-gray-300"
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {/* Only show the overlay button if no image is selected */}
                {!profileImageBase64 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 size-full cursor-pointer"
                    aria-label="Upload profile header image"
                  ></button>
                )}
              </div>
            </div>
            {/* Interactive tooltip that appears on first load */}
            {showImageTooltip && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-16 w-full max-w-md rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-lg"
              >
                <div className="flex items-start">
                  <MdInfoOutline
                    size={24}
                    className="mr-3 mt-0.5 shrink-0 text-blue-500"
                  />
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Make a great first impression!</strong> Your
                      profile header image is the first thing visitors will see.
                      Choose a 4:3 aspect ratio image that represents your
                      professional identity or showcases your work.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowImageTooltip(false)}
                      className="mt-2 text-sm text-blue-500 hover:underline"
                    >
                      Got it
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 size-4 -translate-x-1/2 translate-y-1/2 rotate-45 border-b border-r border-blue-200 bg-blue-50"></div>
              </motion.div>
            )}
          </div>
        </div>
        <p className="mb-6 text-center text-gray-600">
          Your portfolio is organized into the following sections. Each section
          helps showcase different aspects of your professional profile.
        </p>
        {/* Section Information (not clickable) */}
        {renderSectionInfo("core", "Core Sections", "blue-100")}
        {renderSectionInfo("recommended", "Recommended Sections", "green-100")}
        {renderSectionInfo("additional", "Additional Sections", "purple-100")}
        {/* Navigation Buttons - Conditional rendering based on profileCreated */}
        <div className="flex justify-between">
          {!profileCreated && !isProfileCreated ? (
            // Show Previous/Next buttons when creating a new profile
            <>
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
                className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                type="button"
              >
                Next
              </motion.button>
            </>
          ) : (
            // Show Cancel/Save buttons when editing an existing profile
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrevious}
                className="rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-400"
                type="button"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveToSupabase}
                disabled={isSaving}
                className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
                  isSaving
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                type="button"
              >
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Changes"
                )}
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Step3Welcome;
