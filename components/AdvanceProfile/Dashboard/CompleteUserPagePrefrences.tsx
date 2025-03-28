/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "@clerk/nextjs";

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

// Initialize Supabase client with a single instance to prevent multiple GoTrueClient warnings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
// Create a single instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function UserPagePrefrences_Dashboard() {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [customStepSequence, setCustomStepSequence] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [clerkUserId, setClerkUserId] = useState<string | null>(null);
  const [existingUserData, setExistingUserData] = useState<any>(null);

  // Base steps that are always included
  const FIXED_STEPS = [1, 3, 16];
  const DEFAULT_MAX_STEP = 16;
  
  // Function to load step sequence from localStorage
  const loadStepSequence = () => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedStepSequence = localStorage.getItem(`${sessionId}_step_sequence`);
      if (savedStepSequence) {
        // Create a complete sequence with fixed steps
        const parsedSequence = JSON.parse(savedStepSequence);
        const completeSequence = [
          FIXED_STEPS[0], // Step 1
          FIXED_STEPS[1], // Step 3
          ...parsedSequence,           // User-selected steps
          FIXED_STEPS[2]               // Final step (16)
        ];
        setCustomStepSequence(completeSequence);
        
        return completeSequence; // Return the sequence for immediate use
      }
    }
    
    // If no custom sequence, create a default one with just the fixed steps
    const defaultSequence = [FIXED_STEPS[0], FIXED_STEPS[1], FIXED_STEPS[2]];
    setCustomStepSequence(defaultSequence);
    
    return defaultSequence; // Return default sequence if no custom sequence found
  };

  // Load user's Clerk ID and check if they exist in the Team table
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isClerkLoaded || !user) {
        setIsLoading(false);
        
        return;
      }

      try {
        // Set the clerk user ID
        setClerkUserId(user.id);
        
        // Check if user exists in Team table
        const { data, error } = await supabase
          .from("Team")
          .select("*")
          .eq("clerk_user_id", user.id)
          .single();
        
        if (error && error.code !== "PGRST116") {
          console.error("Error fetching user data:", error);
          toast.error("Error loading your profile data");
        } else if (data) {
          // Store the existing user data
          setExistingUserData(data);
          console.log("Found existing user data:", data);
          
          // If username exists in data but not in localStorage, set it
          const sessionId = localStorage.getItem("personalized_session_id");
          if (sessionId && data.Username && !localStorage.getItem(`${sessionId}_username`)) {
            localStorage.setItem(`${sessionId}_username`, data.Username);
          }
        }
        
        // Load step sequence after checking user data
        loadStepSequence();
        setIsLoading(false);
      } catch (error) {
        console.error("Error in fetchUserData:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isClerkLoaded, user]);

  // Load user's selected sections and create a step sequence on component mount
  useEffect(() => {
    if (!isLoading) {
      loadStepSequence();
    }
  }, [isLoading]);

  // Convert from UI step index to actual step number
  const getStepNumber = (stepIndex: number): number => {
    if (customStepSequence.length > 0) {
      return stepIndex < customStepSequence.length ? customStepSequence[stepIndex] : DEFAULT_MAX_STEP;
    } else {
      return stepIndex + 1; // Default behavior if no custom sequence
    }
  };
  
  // Convert from actual step number to UI step index
  const getStepIndex = (stepNumber: number): number => {
    if (customStepSequence.length > 0) {
      const index = customStepSequence.indexOf(stepNumber);
      
      return index >= 0 ? index : customStepSequence.length - 1;
    } else {
      return stepNumber - 1; // Default behavior if no custom sequence
    }
  };
   
  // Special handler for Step3 completion
  const handleStep3Next = () => {
    // Reload the step sequence from localStorage
    const updatedSequence = loadStepSequence();
    
    // If we have a valid sequence, use it to determine the next step
    if (updatedSequence && updatedSequence.length > 2) {
      // Set to the first custom step after the fixed initial steps (1,3)
      setCurrentStep(updatedSequence.length > 2 ? updatedSequence[2] : FIXED_STEPS[2]);
    } else {
      // Fall back to default behavior
      setCurrentStep(16);
    }
  };
  
  const handleNext = () => {
    // If we're on step 3, use the special handler
    if (currentStep === 3) {
      handleStep3Next();
      
      return;
    }

    setCurrentStep((prev) => {
      const currentIndex = getStepIndex(prev);
      const nextIndex = currentIndex + 1;
      
      // Check if we're at the end of our sequence
      if (customStepSequence.length > 0) {
        if (nextIndex >= customStepSequence.length) {
          return FIXED_STEPS[2]; // Always go to step 16 as the final step
        }
        
        return customStepSequence[nextIndex];
      } else {
        // Default behavior if no custom sequence
        const nextStep = prev + 1;
        
        return nextStep > DEFAULT_MAX_STEP ? DEFAULT_MAX_STEP : nextStep;
      }
    });
  };

  // Collect all data from localStorage
  const getAllUserData = () => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (!sessionId) return null;

    // Object to hold all collected data
    const userData: Record<string, any> = {
      sessionId,
      createdAt: new Date().toISOString(),
      clerk_user_id: clerkUserId // Add the clerk user ID
    };

    // Basic preferences
    userData.fullName = localStorage.getItem(`${sessionId}_fullName`) || "";
    userData.username = localStorage.getItem(`${sessionId}_username`) || "";
    userData.tagline = localStorage.getItem(`${sessionId}_tagline`) || "";
    userData.about = localStorage.getItem(`${sessionId}_about`) || "";
    
    // Theme preferences
    userData.theme = localStorage.getItem(`${sessionId}_theme`) || "";
    userData.themeBackground = localStorage.getItem(`${sessionId}_theme_background`) || "";
    
    // Profile image header
    userData.profileHeaderImage = localStorage.getItem(`${sessionId}_profile_header_image`) || "";
    
    // Industry preferences
    userData.industryPreference = localStorage.getItem(`${sessionId}_industryPreference`) || "";
    userData.secondaryPreference = localStorage.getItem(`${sessionId}_secondaryPreference`) || "";
    
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
      { key: "volunteer_experiences", storageKey: `${sessionId}_volunteer_experiences` },
      { key: "products", storageKey: `${sessionId}_products` },
      { key: "services", storageKey: `${sessionId}_services` },
      { key: "test_scores", storageKey: `${sessionId}_test_scores` },
    ];

    // Process each JSON item
    jsonItems.forEach(item => {
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
      if (!userData.clerk_user_id) {
        throw new Error("No Clerk user ID found. Please sign in again.");
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
      const licenses = Array.isArray(userData.licenses) ? userData.licenses : [];

      // Process projects with their media content intact
      const projects = Array.isArray(userData.projects) ? userData.projects : [];

      // Ensure products and services have their media content intact
      const products = Array.isArray(userData.products) ? userData.products : [];
      const services = Array.isArray(userData.services) ? userData.services : [];

      // Get the session info from existing data or create new
      const sessionInfo = existingUserData?.session_Info || {};
      
      // Update session info with current session
      const updatedSessionInfo = {
        ...sessionInfo,
        last_updated: new Date().toISOString(),
        preferences_completed: true
      };

      // IMPORTANT: Create the exact data structure expected by your Supabase table
      // Map user data to the exact column names in the Team table
      const teamData = {
        clerk_user_id: userData.clerk_user_id,
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
        updated_at: new Date().toISOString()
      };

      // For debugging - show exactly what we're sending to the database
      setDebugInfo(JSON.stringify(teamData, null, 2));
      console.log("Saving team data:", teamData);

      let result;
      
      // Check if we need to update or insert
      if (existingUserData) {
        // Update existing record
        const { data, error } = await supabase
          .from('Team')
          .update(teamData)
          .eq('clerk_user_id', userData.clerk_user_id)
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
          .from('Team')
          .insert([teamData])
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
      // Check if user is logged in with Clerk
      if (!clerkUserId) {
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
    setCurrentStep((prev) => {
      const currentIndex = getStepIndex(prev);
      const prevIndex = currentIndex - 1;
      
      return getStepNumber(Math.max(prevIndex, 0));
    }); // Ensure we don't go below step 1
  };

  // Helper function to render the current step component
  const renderStepComponent = () => {
    if (isLoading) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
    
    // Always ensure Step16 is shown when we reach step 16
    if (currentStep === 16) {
      return <Step16Welcome onComplete={handleComplete} onPrevious={handlePrevious} />;
    }
    
    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={handleNext} />;
      case 3:
        return <Step3Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <Step4Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <Step5Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 6:
        return <Step6Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 7:
        return <Step7Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 8:
        return <Step8Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 9:
        return <Step9Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 10:
        return <Step10Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 11:
        return <Step11Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 12:
        return <Step12Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 13:
        return <Step13Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 14:
        return <Step14Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 15:
        return <Step15Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      default:
        console.warn(`Invalid step number: ${currentStep}, resetting to Step1`);
        setTimeout(() => setCurrentStep(1), 0);
        
        return <Step1Welcome onNext={handleNext} />;
    }
  };

  // Get loading message
  const getLoadingMessage = () => {
    return "Saving your profile data to the database...";
  };

  return (
    <div>
      {renderStepComponent()}
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
              <p className="mb-2 text-center text-xl font-medium">{getLoadingMessage()}</p>
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
          <pre className="text-xs">
            {debugInfo}
          </pre>
          <button 
            onClick={() => setDebugInfo("")}
            className="mt-2 rounded bg-gray-200 px-2 py-1 text-xs"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserPagePrefrences_Dashboard;