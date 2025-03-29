/* eslint-disable no-unused-vars */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";
import React, { useEffect, useState } from "react";
import { IoInformationCircleOutline, IoCheckmarkCircle } from "react-icons/io5";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";

import themeInfo from "../Themes/Info";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define modal component props
interface ThemeInfoModalProps {
  theme: string;
  onClose: () => void;
}

// Theme preview component props
interface ThemePreviewProps {
  theme: string;
  isSelected: boolean;
}

// Modal Component
const ThemeInfoModal: React.FC<ThemeInfoModalProps> = ({ theme, onClose }) => {
  const info = themeInfo[theme];
  
  if (!info) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">{theme}</h2>
          <p className="mb-4 text-gray-700">{info.description}</p>
          {info.idealFor && (
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Ideal For</h3>
              <p className="text-gray-700">{info.idealFor}</p>
            </div>
          )}
          {info.colorCombinations && (
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">Color Combinations</h3>
              <p className="text-gray-700">{info.colorCombinations}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Theme Preview Component
const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, isSelected }) => {
  // Generate preview based on theme type
  const renderPreview = () => {
    switch (theme) {
      case "Gradient Theme":
        return (
          <div className="h-32 w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="flex h-full flex-col justify-between p-3">
              <div className="rounded bg-white bg-opacity-20 p-2">
                <div className="h-2 w-16 rounded bg-white"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-24 rounded bg-white"></div>
                <div className="h-2 w-20 rounded bg-white"></div>
              </div>
            </div>
          </div>
        );
      case "Monochromatic Theme":
        return (
          <div className="h-32 w-full overflow-hidden rounded-lg bg-gray-200">
            <div className="flex h-full flex-col justify-between p-3">
              <div className="rounded bg-gray-400 p-2">
                <div className="h-2 w-16 rounded bg-gray-600"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-24 rounded bg-gray-500"></div>
                <div className="h-2 w-20 rounded bg-gray-500"></div>
              </div>
            </div>
          </div>
        );
      case "Dark Theme with accent colors":
        return (
          <div className="h-32 w-full overflow-hidden rounded-lg bg-gray-900">
            <div className="flex h-full flex-col justify-between p-3">
              <div className="rounded bg-gray-800 p-2">
                <div className="h-2 w-16 rounded bg-blue-500"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-24 rounded bg-gray-400"></div>
                <div className="h-2 w-20 rounded bg-gray-400"></div>
              </div>
            </div>
          </div>
        );
      case "Default":
      default:
        return (
          <div className="h-32 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex h-full flex-col justify-between p-3">
              <div className="rounded bg-blue-100 p-2">
                <div className="h-2 w-16 rounded bg-blue-600"></div>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-24 rounded bg-gray-700"></div>
                <div className="h-2 w-20 rounded bg-gray-700"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative rounded-lg ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}>
      {renderPreview()}
      {isSelected && (
        <div className="absolute -right-2 -top-2 rounded-full bg-white">
          <IoCheckmarkCircle className="size-6 text-indigo-600" />
        </div>
      )}
    </div>
  );
};

function Profile_Themes() {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [themeCustomization, setThemeCustomization] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("");
  const [saveStatus, setSaveStatus] = useState<null | "saving" | "saved" | "error">(null);
  const [isLoading, setIsLoading] = useState(true);

  const themesAvailable = [
    "Gradient Theme",
    "Monochromatic Theme",
    "Dark Theme with accent colors",
    "Default",
  ];

  // Load saved theme data from Supabase and localStorage on component mount
  useEffect(() => {
    const fetchUserTheme = async () => {
      if (!isClerkLoaded || !user) {
        setIsLoading(false);
        
return;
      }

      try {
        // First check Supabase for user theme
        const { data, error } = await supabase
          .from("Team")
          .select("theme")
          .eq("clerk_user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching user theme:", error);
          toast.error("Error loading your theme settings");
        } else if (data) {
          // Found theme data in Supabase
          if (data.theme) setSelectedTheme(data.theme);
          // if (data.ThemeCustomization) setThemeCustomization(data.ThemeCustomization);
        } else {
          // Fallback to localStorage if no data in Supabase
          const sessionId = localStorage.getItem("personalized_session_id");
          if (sessionId) {
            const savedTheme = localStorage.getItem(`${sessionId}_theme`);
            const savedBackground = localStorage.getItem(`${sessionId}_theme_background`);
            
            if (savedTheme) setSelectedTheme(savedTheme);
            if (savedBackground) setThemeCustomization(savedBackground);
          }
        }
      } catch (error) {
        console.error("Error in fetchUserTheme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTheme();
  }, [isClerkLoaded, user]);

  // Save theme data to Supabase and localStorage
  const saveThemeSettings = async () => {
    if (!user) {
      toast.error("You must be logged in to save theme settings");
      
return;
    }

    setSaveStatus("saving");
    
    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from("Team")
        .update({
          theme: selectedTheme,
          // updated_at: new Date().toISOString()
        })
        .eq("clerk_user_id", user.id);

      if (error) {
        console.error("Error saving theme to Supabase:", error);
        toast.error("Failed to save theme settings");
        setSaveStatus("error");
        
return;
      }

      // Also save to localStorage for redundancy
      const sessionId = localStorage.getItem("personalized_session_id");
      if (sessionId) {
        localStorage.setItem(`${sessionId}_theme`, selectedTheme);
        localStorage.setItem(`${sessionId}_theme_background`, themeCustomization);
      }
      
      setSaveStatus("saved");
      toast.success("Theme settings saved successfully!");
      
      // Reset status after showing success
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Error in saveThemeSettings:", error);
      setSaveStatus("error");
      toast.error("An unexpected error occurred");
    }
  };
  
  const openThemeInfo = (theme: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentTheme(theme);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Profile Theme Settings</h2>
        <button
          onClick={saveThemeSettings}
          disabled={saveStatus === "saving" || !user}
          className={`rounded-md px-4 py-2 font-medium text-white transition-colors ${
            !user 
              ? "cursor-not-allowed bg-gray-400"
              : saveStatus === "saving" 
                ? "bg-gray-400" 
                : saveStatus === "saved" 
                  ? "bg-green-500" 
                  : saveStatus === "error"
                    ? "bg-red-500"
                    : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {!user
            ? "Login Required"
            : saveStatus === "saving" 
              ? "Saving..." 
              : saveStatus === "saved" 
                ? "Saved!" 
                : saveStatus === "error"
                  ? "Error!"
                  : "Save Changes"}
        </button>
      </div>
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Select Theme</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {themesAvailable.map((theme) => (
            <div key={theme} className="space-y-2">
              <div 
                className={`cursor-pointer rounded-lg p-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedTheme === theme ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => setSelectedTheme(theme)}
              >
                <ThemePreview theme={theme} isSelected={selectedTheme === theme} />
              </div>
              <div className="flex items-center justify-between px-1">
                <label className="flex cursor-pointer items-center space-x-2">
                  <input
                    type="radio"
                    name="themeSelection"
                    value={theme}
                    checked={selectedTheme === theme}
                    onChange={() => setSelectedTheme(theme)}
                    className="form-radio size-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium">{theme}</span>
                </label>
                <button
                  onClick={(e) => openThemeInfo(theme, e)}
                  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                  aria-label={`Learn more about ${theme}`}
                >
                  <IoInformationCircleOutline size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="mb-3 text-lg font-medium">Theme Customization</h3>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
          <label
            htmlFor="themeCustomization"
            className="mb-2 block text-sm font-medium"
          >
            Custom color preferences or additional theme requests:
          </label>
          <textarea
            id="themeCustomization"
            value={themeCustomization}
            onChange={(e) => setThemeCustomization(e.target.value)}
            placeholder="Describe your preferred color combinations or specific theme elements you'd like to see in your profile."
            rows={4}
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          ></textarea>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Our design team will review your preferences and apply them to your profile theme.
          </p>
        </div>
      </div>
      {/* Theme Info Modal */}
      {showModal && (
        <ThemeInfoModal 
          theme={currentTheme}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Profile_Themes;