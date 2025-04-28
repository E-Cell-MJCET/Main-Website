/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Step1Welcome from "@/components/AdvanceProfile/UserPreferences/Step1";
import Step3Welcome from "@/components/AdvanceProfile/UserPreferences/Step3";
import Step4Welcome from "@/components/AdvanceProfile/UserPreferences/Step4";
import Step5Welcome from "@/components/AdvanceProfile/UserPreferences/Step5";
import Step6Welcome from "@/components/AdvanceProfile/UserPreferences/Step6";
import Step7Welcome from "@/components/AdvanceProfile/UserPreferences/Step7";
import Step8Welcome from "@/components/AdvanceProfile/UserPreferences/Step8";
import Step9Welcome from "@/components/AdvanceProfile/UserPreferences/Step9";
import Step10Welcome from "@/components/AdvanceProfile/UserPreferences/Step10";
import Step11Welcome from "@/components/AdvanceProfile/UserPreferences/Step11";
import Step12Welcome from "@/components/AdvanceProfile/UserPreferences/Step12";
import Step13Welcome from "@/components/AdvanceProfile/UserPreferences/Step13";
import Step14Welcome from "@/components/AdvanceProfile/UserPreferences/Step14";
import Step15Welcome from "@/components/AdvanceProfile/UserPreferences/Step15";
import Step16Welcome from "@/components/AdvanceProfile/UserPreferences/Step16";

import EditUserProfile from "./EditUserProfile";

// Initialize Supabase client with a single instance to prevent multiple GoTrueClient warnings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
// Create a single instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Updated STEP_INFO with all steps
const STEP_INFO: Record<number, { title: string; description: string }> = {
  1: { title: "Welcome", description: "Get started with your profile" },
  3: { title: "Sections", description: "Choose profile sections" },
  4: { title: "Basic Info", description: "Name, tagline & about" },
  5: { title: "Experience", description: "Work experience" },
  6: { title: "Skills", description: "Professional skills" },
  7: { title: "Projects", description: "Portfolio projects" },
  8: { title: "Certifications", description: "Certifications & licenses" },
  9: { title: "Recommendation", description: "Input your recommendations" },
  10: { title: "Honors", description: "Honors & Awards" },
  11: { title: "Featured", description: "Showcase your best work" },
  12: { title: "Causes", description: "What's the causes you have made " },
  13: {
    title: "Products & Services",
    description: "Add your Services or Products",
  },
  14: { title: "Test & Scores", description: "Add Test Scores" },
  15: {
    title: "Vounteer Experience",
    description: "Your Voulunteer experience",
  },
  16: { title: "Complete", description: "Finalize your profile" },
};

// Define the fixed step sequence with all steps
const ALL_STEPS = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function UserPagePrefrences_Dashboard({ userId }: { userId: string }) {
  console.log("User ID from props:", userId); // Debugging line
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [userID, setUserID] = useState<string | null>(null);
  const [existingUserData, setExistingUserData] = useState<any>(null);
  const [showStepper, setShowStepper] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleStepClick = (stepNumber: number) => {
    // Don't allow jumping to step 16 (final step) directly
    if (stepNumber === 16) {
      toast.info("Please complete all previous steps first");

      return;
    }

    setCurrentStep(stepNumber);
    setShowStepper(false); // Hide stepper after selection
  };

  // Load user ID and check if they exist in the Team table
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserID(userId);

        // Check if user exists in Team table
        const { data, error } = await supabase
          .from("Team")
          .select("*")
          .eq("custom_auth_userID", userId)
          .single();

        console.log("Fetched user data:", data);
        if (error && error.code !== "PGRST116") {
          console.error("Error fetching user data:", error);
          toast.error("Error loading your profile data");
        } else if (data) {
          // Store the existing user data
          setExistingUserData(data);
          if (data.Profile_Data_Created) {
            setIsEditable(true);
          }
          console.log("Found existing user data:", data);

          // If username exists in data but not in localStorage, set it
          const sessionId = localStorage.getItem("personalized_session_id");
          if (
            sessionId &&
            data.Username &&
            !localStorage.getItem(`${sessionId}_username`)
          ) {
            localStorage.setItem(`${sessionId}_username`, data.Username);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);

  const handleNext = () => {
    // Special case for Step 3 (section selection)
    // Now we just move to the next step in the sequence
    if (currentStep === 3) {
      setCurrentStep(4);

      return;
    }

    // Find current step index in ALL_STEPS array
    const currentIndex = ALL_STEPS.indexOf(currentStep);

    // Move to next step if not at the end
    if (currentIndex < ALL_STEPS.length - 1) {
      setCurrentStep(ALL_STEPS[currentIndex + 1]);
    }
  };

  // Collect all data from localStorage
  const getAllUserData = () => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (!sessionId) return null;

    // Object to hold all collected data
    const userData: Record<string, any> = {
      sessionId,
      createdAt: new Date().toISOString(),
      custom_auth_userID: userID,
    };

    // Basic preferences
    userData.fullName = localStorage.getItem(`${sessionId}_fullName`) || "";
    userData.username = localStorage.getItem(`${sessionId}_username`) || "";
    userData.tagline = localStorage.getItem(`${sessionId}_tagline`) || "";
    userData.about = localStorage.getItem(`${sessionId}_about`) || "";

    // Theme preferences
    userData.theme = localStorage.getItem(`${sessionId}_theme`) || "";
    userData.themeBackground =
      localStorage.getItem(`${sessionId}_theme_background`) || "";

    // Profile image header
    userData.profileHeaderImage =
      localStorage.getItem(`${sessionId}_profile_header_image`) || "";

    // Industry preferences
    userData.industryPreference =
      localStorage.getItem(`${sessionId}_industryPreference`) || "";
    userData.secondaryPreference =
      localStorage.getItem(`${sessionId}_secondaryPreference`) || "";

    // Get structured data stored as JSON
    const jsonItems = [
      { key: "socialLinks", storageKey: `${sessionId}_socialLinks` },
      { key: "contactInfo", storageKey: `${sessionId}_contactInfo` },
      { key: "locationInfo", storageKey: `${sessionId}_locationInfo` },
      { key: "experiences", storageKey: `${sessionId}_experiences` },
      { key: "education", storageKey: `${sessionId}_education` },
      { key: "skills", storageKey: `${sessionId}_skills` },
      { key: "projects", storageKey: `${sessionId}_projects` },
      { key: "licenses", storageKey: `${sessionId}_licenses` },
      { key: "certifications", storageKey: `${sessionId}_certifications` },
      { key: "recommendations", storageKey: `${sessionId}_recommendations` },
      { key: "honors_awards", storageKey: `${sessionId}_honors_awards` },
      { key: "featured_items", storageKey: `${sessionId}_featured_items` },
      { key: "causes", storageKey: `${sessionId}_causes` },
      {
        key: "volunteer_experiences",
        storageKey: `${sessionId}_volunteer_experiences`,
      },
      { key: "products", storageKey: `${sessionId}_products` },
      { key: "services", storageKey: `${sessionId}_services` },
      { key: "test_scores", storageKey: `${sessionId}_test_scores` },
    ];

    // Process each JSON item
    jsonItems.forEach((item) => {
      try {
        const value = localStorage.getItem(item.storageKey);
        if (value) {
          userData[item.key] = JSON.parse(value);
        }
      } catch (error) {
        console.error(`Error parsing ${item.key}:`, error);
        userData[item.key] = null;
      }
    });

    return userData;
  };

  // Save all user data to Supabase Team table
  const saveUserData = async (userData: Record<string, any>) => {
    try {
      if (!userId) {
        throw new Error("No user ID found. Please sign in again.");
      }

      // Format location as a single string "City, State"
      let locationString = "";
      if (userData.locationInfo) {
        const city = userData.locationInfo.city || "";
        const state = userData.locationInfo.state || "";
        if (city && state) {
          locationString = `${city}, ${state}`;
        } else if (city) {
          locationString = city;
        } else if (state) {
          locationString = state;
        }
      }

      // Use only licenses since the column has changed
      const licenses = Array.isArray(userData.licenses)
        ? userData.licenses
        : [];

      // Process projects with their media content intact
      const projects = Array.isArray(userData.projects)
        ? userData.projects
        : [];

      // Ensure products and services have their media content intact
      const products = Array.isArray(userData.products)
        ? userData.products
        : [];
      const services = Array.isArray(userData.services)
        ? userData.services
        : [];

      // Get the session info from existing data or create new
      const sessionInfo = existingUserData?.session_Info || {};

      // Update session info with current session
      const updatedSessionInfo = {
        ...sessionInfo,
        last_updated: new Date().toISOString(),
        preferences_completed: true,
      };

      // IMPORTANT: Create the exact data structure expected by your Supabase table
      // Map user data to the exact column names in the Team table
      const teamData = {
        // custom_auth_userID: userId,
        Username: userData.username || "",
        Name: userData.fullName || "",
        Member_Type: userData.industryPreference || "",
        About: userData.about || "",
        Tagline: userData.tagline || "",
        Location: locationString,
        Contact_Info: userData.contactInfo || {},
        Experience: userData.experiences || [],
        Education: userData.education || [],
        Skills: userData.skills || [],
        Awards: userData.honors_awards || [],
        Certifications: userData.certifications || [],
        Portfolio: userData.secondaryPreference || "",
        Availability: "Available", // Default value
        Service_Info: userData.services || [],
        Licenses: licenses,
        Projects: projects,
        Testimonials: userData.recommendations || [],
        Featured: userData.featured_items || [],
        Honors: userData.honors_awards || [],
        TestScores: userData.test_scores || [],
        VolunteerExperience: userData.volunteer_experiences || [],
        SocialLinks: userData.socialLinks || {},
        theme: userData.theme || "",
        Causes: userData.causes || [],
        Products: products,
        Services: services,
        theme_feedback: userData.themeBackground || "",
        ProfileImageHeader: userData.profileHeaderImage || "",
        session_Info: updatedSessionInfo,
        Profile_Data_Created: true,
        updated_at: new Date().toISOString(),
      };

      // For debugging - show exactly what we're sending to the database
      setDebugInfo(JSON.stringify(teamData, null, 2));
      console.log("Saving team data:", teamData);

      let result;

      // Check if we need to update or insert
      if (existingUserData) {
        // Update existing record
        const { data, error } = await supabase
          .from("Team")
          .update(teamData)
          .eq("custom_auth_userID", userId)
          .select();

        if (error) {
          console.error("Supabase update error:", error);
          throw new Error(`Database update error: ${error.message}`);
        }

        console.log("Successfully updated data:", data);
        result = data;
      } else {
        // Insert new record if somehow the user doesn't exist
        const { data, error } = await supabase
          .from("Team")
          .update([teamData])
          .eq("custom_auth_userID", userId)
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          throw new Error(`Database insert error: ${error.message}`);
        }

        console.log("Successfully inserted data:", data);
        result = data;
      }

      return result;
    } catch (error) {
      // More explicit error handling
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Error saving data:", errorMessage);
      throw new Error(`Failed to save data: ${errorMessage}`);
    }
  };

  const handleComplete = async () => {
    try {
      if (!userId) {
        toast.error("You must be logged in to save your profile");

        return;
      }

      setIsSaving(true);
      setSaveSuccess(null);

      // First, get all user data from localStorage
      const userDataObj = getAllUserData();
      if (!userDataObj) {
        throw new Error("No session data found");
      }

      toast.info("Saving your profile data to Team database...", {
        autoClose: 2000,
      });

      // Save to database
      await saveUserData(userDataObj);

      // Success!
      setSaveSuccess(true);
      await supabase
        .from("Team")
        .update({ Profile_Data_Created: true })
        .eq("custom_auth_userID", userId);
      toast.success("Profile data saved successfully!", {
        autoClose: 5000,
      });

      // Redirect to profile page after a short delay
      setTimeout(() => {
        // Replace with your actual profile page URL
        window.location.href = `/profile/${userDataObj.username}`;
      }, 5000);
    } catch (error) {
      // Enhanced error handling with more specific information
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setSaveSuccess(false);
      toast.error(`Error: ${errorMessage}`, {
        autoClose: false, // Keep the error visible until user dismisses
      });

      console.error("Save process error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrevious = () => {
    // Find current step index in ALL_STEPS array
    const currentIndex = ALL_STEPS.indexOf(currentStep);

    // Move to previous step if not at the beginning
    if (currentIndex > 0) {
      setCurrentStep(ALL_STEPS[currentIndex - 1]);
    }
  };

  // Get loading message
  const getLoadingMessage = () => {
    return "Saving your profile data to the database...";
  };

  // Helper function to render the current step component
  const renderStepComponent = () => {
    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    // Always ensure Step16 is shown when we reach step 16
    if (currentStep === 16) {
      return (
        <Step16Welcome
          onComplete={handleComplete}
          onPrevious={handlePrevious}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={handleNext} />;
      case 3:
        return (
          <Step3Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userData={null}
            userId={userID}
          />
        );
      case 4:
        return (
          <Step4Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 5:
        return (
          <Step5Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 6:
        return (
          <Step6Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 7:
        return (
          <Step7Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 8:
        return (
          <Step8Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 9:
        return (
          <Step9Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 10:
        return (
          <Step10Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 11:
        return (
          <Step11Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 12:
        return (
          <Step12Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 13:
        return (
          <Step13Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 14:
        return (
          <Step14Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      case 15:
        return (
          <Step15Welcome
            onNext={handleNext}
            onPrevious={handlePrevious}
            userId={userID}
          />
        );
      default:
        console.warn(`Invalid step number: ${currentStep}, resetting to Step1`);
        setTimeout(() => setCurrentStep(1), 0);

        return <Step1Welcome onNext={handleNext} />;
    }
  };

  // Toggle stepper visibility
  const toggleStepper = () => {
    setShowStepper((prev) => !prev);
  };

  return (
    <div className="relative">
      {isEditable && userID ? (
        <EditUserProfile userID={userID} />
      ) : (
        <>
          {/* Main content */}
          <div className="relative">{renderStepComponent()}</div>
          {/* Stepper navigation */}
          <div
            className={`fixed left-0 top-0 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ${showStepper ? "translate-x-0" : "-translate-x-full"}`}
            style={{ zIndex: 1000 }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
                <button
                  onClick={toggleStepper}
                  className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
                  aria-label="Close navigation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {ALL_STEPS.map((step, index) => (
                  <div
                    key={index}
                    onClick={() => handleStepClick(step)}
                    className={`mb-3 cursor-pointer rounded-lg p-3 transition-colors ${
                      currentStep === step
                        ? "bg-teal-100 text-teal-800"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          currentStep === step
                            ? "bg-teal-500 text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">
                          {STEP_INFO[step]?.title || `Step ${step}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {STEP_INFO[step]?.description ||
                            "Complete this section"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Toggle button for stepper */}
          <button
            onClick={toggleStepper}
            className="fixed bottom-4 left-4 rounded-full bg-teal-500 p-3 text-white shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            style={{ zIndex: 999 }}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Overlay to close stepper when clicked outside */}
          {showStepper && (
            <div
              className="fixed inset-0 bg-black bg-opacity-20"
              style={{ zIndex: 990 }}
              onClick={() => setShowStepper(false)}
            />
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Overlay for saving state */}
          {isSaving && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded-lg bg-white p-8 shadow-xl">
                <div className="flex flex-col items-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600"></div>
                  <p className="mb-2 text-center text-xl font-medium">
                    {getLoadingMessage()}
                  </p>
                  <p className="text-center text-sm text-gray-500">
                    Please wait while we save your information...
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Debug info panel for developers - helpful for troubleshooting */}
          {debugInfo && saveSuccess === false && (
            <div className="fixed bottom-4 right-4 max-h-72 max-w-lg overflow-auto rounded-lg bg-white p-4 shadow-lg">
              <h3 className="mb-2 font-bold">Debug Info</h3>
              <pre className="text-xs">{debugInfo}</pre>
              <button
                onClick={() => setDebugInfo("")}
                className="mt-2 rounded bg-gray-200 px-2 py-1 text-xs"
              >
                Clear
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserPagePrefrences_Dashboard;
