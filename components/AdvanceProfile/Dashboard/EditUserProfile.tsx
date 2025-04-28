/* eslint-disable no-unused-vars */
/* eslint-disable import/order */

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

// Import step components
import {
  MdPerson,
  MdSchool,
  MdBuild,
  MdCode,
  MdVerified,
  MdStar,
  MdFeaturedPlayList,
  MdVolunteerActivism,
  MdCardGiftcard,
  MdAssignment,
  MdShoppingCart,
} from "react-icons/md";

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
import { HandHeart } from "lucide-react";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define a type for the user data from Supabase
interface UserData {
  custom_auth_userID?: string;
  Username?: string;
  Name?: string;
  ProfileImageHeader?: string;
  Causes?: any[];
  Skills?: any[];
  Projects?: any[];
  Licenses?: any[];
  Certifications?: any[];
  Testimonials?: any[];
  Honors?: any[];
  Featured?: any[];
  TestScores?: any[];
  VolunteerExperience?: any[];
  Products?: any[];
  Services?: any[];
  Education?: any[];
  Experience?: any[];
  About?: string;
  Tagline?: string;
  Location?: any;
  Contact_Info?: any;
  SocialLinks?: any[];
  CoreSections?: string[];
  RecommendedSections?: string[];
  AdditionalSections?: string[];
  Profile_Data_Created?: boolean;
  [key: string]: any;
}

// Define section type
interface Section {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  localStorageKey?: string;
}

const EditUserProfile = ({ userID }: { userID: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [dataFetchedFromSupabase, setDataFetchedFromSupabase] = useState(false);

  // Define sections that correspond to steps 3-15
  const sections: Section[] = [
    {
      id: 3,
      title: "Portfolio Sections",
      description: "Choose which sections to display on your profile",
      icon: <MdFeaturedPlayList size={24} />,
      color: "bg-blue-500",
      localStorageKey: "_core_sections",
    },
    {
      id: 4,
      title: "Basic Info",
      description: "Name, tagline & about",
      icon: <MdPerson size={24} />,
      color: "bg-green-500",
      localStorageKey: "_about",
    },
    {
      id: 5,
      title: "Experience",
      description: "Work experience",
      icon: <MdSchool size={24} />,
      color: "bg-purple-500",
      localStorageKey: "_education",
    },
    {
      id: 6,
      title: "Skills",
      description: "Professional skills",
      icon: <MdBuild size={24} />,
      color: "bg-yellow-500",
      localStorageKey: "_skills",
    },
    {
      id: 7,
      title: "Projects",
      description: "Showcase your work and achievements",
      icon: <MdCode size={24} />,
      color: "bg-red-500",
      localStorageKey: "_projects",
    },
    {
      id: 8,
      title: "Certifications",
      description: "Certifications & licenses",
      icon: <MdVerified size={24} />,
      color: "bg-indigo-500",
      localStorageKey: "_licenses",
    },
    {
      id: 9,
      title: "Recommendations",
      description: "Testimonials from colleagues and clients",
      icon: <MdStar size={24} />,
      color: "bg-pink-500",
      localStorageKey: "_recommendations",
    },
    {
      id: 10,
      title: "Honors & Awards",
      description: "Recognition for your achievements",
      icon: <MdCardGiftcard size={24} />,
      color: "bg-teal-500",
      localStorageKey: "_honors",
    },
    {
      id: 11,
      title: "Featured",
      description: "Showcase your best work",
      icon: <MdFeaturedPlayList size={24} />,
      color: "bg-amber-500",
      localStorageKey: "_featured",
    },
    {
      id: 12,
      title: "Causes",
      description: "Social causes you support",
      icon: <MdVolunteerActivism size={24} />,
      color: "bg-cyan-500",
      localStorageKey: "_causes",
    },
    {
      id: 13,
      title: "Products & Services",
      description: "What you offer professionally",
      icon: <MdShoppingCart size={24} />,
      color: "bg-orange-500",
      localStorageKey: "_products",
    },
    {
      id: 14,
      title: "Tests & Scores",
      description: "Your standardized test results",
      icon: <MdAssignment size={24} />,
      color: "bg-lime-500",
      localStorageKey: "_test_scores",
    },
    {
      id: 15,
      title: "Volunteer Experiences",
      description: "Your volunteer and community engagement experiences",
      icon: <HandHeart size={24} />,
      color: "bg-lime-500",
      localStorageKey: "_volunteer_experiences",
    },
  ];

  // Function to generate or retrieve session ID (similar to Step1)
  const getOrGenerateSessionId = () => {
    if (typeof window === "undefined") return null;

    const existingSessionId = localStorage.getItem("personalized_session_id");
    if (existingSessionId) {
      console.log("Using existing Session ID:", existingSessionId);

      return existingSessionId;
    }

    // If no session ID exists, generate a new one (same logic as Step1)
    const newSessionId = Array.from({ length: 20 }, () =>
      Math.random().toString(36).charAt(2)
    ).join("");

    localStorage.setItem("personalized_session_id", newSessionId);
    console.log("Generated new Session ID:", newSessionId);

    return newSessionId;
  };

  // Function to fetch user data from Supabase
  const fetchUserData = async (
    clerkUserId: string
  ): Promise<UserData | null> => {
    try {
      const { data, error } = await supabase
        .from("Team")
        .select("*")
        .eq("custom_auth_userID", clerkUserId)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);

        return null;
      }

      return data as UserData;
    } catch (error) {
      console.error("Error in fetchUserData:", error);

      return null;
    }
  };

  // Function to save user data to localStorage using personalized_session_id
  const saveUserDataToLocalStorage = (
    personalizedSessionId: string,
    data: UserData
  ) => {
    try {
      // Save core sections data
      if (data.CoreSections) {
        localStorage.setItem(
          `${personalizedSessionId}_core_sections`,
          JSON.stringify(data.CoreSections)
        );
      }
      if (data.RecommendedSections) {
        localStorage.setItem(
          `${personalizedSessionId}_recommended_sections`,
          JSON.stringify(data.RecommendedSections)
        );
      }
      if (data.AdditionalSections) {
        localStorage.setItem(
          `${personalizedSessionId}_additional_sections`,
          JSON.stringify(data.AdditionalSections)
        );
      }

      // Save profile header image
      if (data.ProfileImageHeader) {
        localStorage.setItem(
          `${personalizedSessionId}_profile_header_image`,
          data.ProfileImageHeader
        );
      }

      // Save basic info (Step 4)
      if (data.Name)
        localStorage.setItem(`${personalizedSessionId}_fullName`, data.Name);
      if (data.Tagline)
        localStorage.setItem(`${personalizedSessionId}_tagline`, data.Tagline);
      if (data.Username)
        localStorage.setItem(
          `${personalizedSessionId}_username`,
          data.Username
        );
      if (data.About)
        localStorage.setItem(`${personalizedSessionId}_about`, data.About);
      if (data.SocialLinks)
        localStorage.setItem(
          `${personalizedSessionId}_socialLinks`,
          JSON.stringify(data.SocialLinks)
        );
      if (data.Contact_Info)
        localStorage.setItem(
          `${personalizedSessionId}_contactInfo`,
          JSON.stringify(data.Contact_Info)
        );
      if (data.Location)
        localStorage.setItem(
          `${personalizedSessionId}_locationInfo`,
          JSON.stringify(data.Location)
        );

      // Save education and experience (Step 5)
      if (data.Education)
        localStorage.setItem(
          `${personalizedSessionId}_education`,
          JSON.stringify(data.Education)
        );
      if (data.Experience)
        localStorage.setItem(
          `${personalizedSessionId}_experiences`,
          JSON.stringify(data.Experience)
        );

      // Save skills (Step 6)
      if (data.Skills)
        localStorage.setItem(
          `${personalizedSessionId}_skills`,
          JSON.stringify(data.Skills)
        );

      // Save projects (Step 7)
      if (data.Projects)
        localStorage.setItem(
          `${personalizedSessionId}_projects`,
          JSON.stringify(data.Projects)
        );

      // Save licenses and certifications (Step 8)
      if (data.Licenses)
        localStorage.setItem(
          `${personalizedSessionId}_licenses`,
          JSON.stringify(data.Licenses)
        );
      if (data.Certifications)
        localStorage.setItem(
          `${personalizedSessionId}_certifications`,
          JSON.stringify(data.Certifications)
        );

      // Save recommendations/testimonials (Step 9)
      if (data.Testimonials)
        localStorage.setItem(
          `${personalizedSessionId}_recommendations`,
          JSON.stringify(data.Testimonials)
        );

      // Save honors (Step 10)
      if (data.Honors)
        localStorage.setItem(
          `${personalizedSessionId}_honors`,
          JSON.stringify(data.Honors)
        );

      // Save featured (Step 11)
      if (data.Featured)
        localStorage.setItem(
          `${personalizedSessionId}_featured`,
          JSON.stringify(data.Featured)
        );

      // Save causes (Step 12)
      if (data.Causes)
        localStorage.setItem(
          `${personalizedSessionId}_causes`,
          JSON.stringify(data.Causes)
        );

      // Save products and services (Step 13)
      if (data.Products)
        localStorage.setItem(
          `${personalizedSessionId}_products`,
          JSON.stringify(data.Products)
        );
      if (data.Services)
        localStorage.setItem(
          `${personalizedSessionId}_services`,
          JSON.stringify(data.Services)
        );

      // Save test scores (Step 14)
      if (data.TestScores)
        localStorage.setItem(
          `${personalizedSessionId}_test_scores`,
          JSON.stringify(data.TestScores)
        );

      // Save volunteer experience (Step 15)
      if (data.VolunteerExperience)
        localStorage.setItem(
          `${personalizedSessionId}_volunteer_experience`,
          JSON.stringify(data.VolunteerExperience)
        );

      console.log(
        "User data saved to localStorage with personalized session ID:",
        personalizedSessionId
      );
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  };

  // Function to check if data exists in localStorage
  const checkLocalStorageData = (personalizedSessionId: string): boolean => {
    // Check for at least some essential data
    const hasCoreSections = localStorage.getItem(
      `${personalizedSessionId}_core_sections`
    );
    const hasName = localStorage.getItem(`${personalizedSessionId}_fullName`);

    return !!(hasCoreSections || hasName);
  };

  // Function to load data from localStorage
  const loadDataFromLocalStorage = (
    personalizedSessionId: string
  ): UserData | null => {
    try {
      const userData: UserData = {};

      // Load core sections
      const coreSections = localStorage.getItem(
        `${personalizedSessionId}_core_sections`
      );
      const recommendedSections = localStorage.getItem(
        `${personalizedSessionId}_recommended_sections`
      );
      const additionalSections = localStorage.getItem(
        `${personalizedSessionId}_additional_sections`
      );

      if (coreSections) userData.CoreSections = JSON.parse(coreSections);
      if (recommendedSections)
        userData.RecommendedSections = JSON.parse(recommendedSections);
      if (additionalSections)
        userData.AdditionalSections = JSON.parse(additionalSections);

      // Load profile header image
      const profileImage = localStorage.getItem(
        `${personalizedSessionId}_profile_header_image`
      );
      if (profileImage) userData.ProfileImageHeader = profileImage;

      // Load basic info
      const fullName = localStorage.getItem(
        `${personalizedSessionId}_fullName`
      );
      const tagline = localStorage.getItem(`${personalizedSessionId}_tagline`);
      const username = localStorage.getItem(
        `${personalizedSessionId}_username`
      );
      const about = localStorage.getItem(`${personalizedSessionId}_about`);
      const socialLinks = localStorage.getItem(
        `${personalizedSessionId}_socialLinks`
      );
      const contactInfo = localStorage.getItem(
        `${personalizedSessionId}_contactInfo`
      );
      const locationInfo = localStorage.getItem(
        `${personalizedSessionId}_locationInfo`
      );

      if (fullName) userData.Name = fullName;
      if (tagline) userData.Tagline = tagline;
      if (username) userData.Username = username;
      if (about) userData.About = about;
      if (socialLinks) userData.SocialLinks = JSON.parse(socialLinks);
      if (contactInfo) userData.Contact_Info = JSON.parse(contactInfo);
      if (locationInfo) userData.Location = JSON.parse(locationInfo);

      // Load other data
      const education = localStorage.getItem(
        `${personalizedSessionId}_education`
      );
      const experiences = localStorage.getItem(
        `${personalizedSessionId}_experiences`
      );
      const skills = localStorage.getItem(`${personalizedSessionId}_skills`);
      const projects = localStorage.getItem(
        `${personalizedSessionId}_projects`
      );
      const licenses = localStorage.getItem(
        `${personalizedSessionId}_licenses`
      );
      const certifications = localStorage.getItem(
        `${personalizedSessionId}_certifications`
      );
      const recommendations = localStorage.getItem(
        `${personalizedSessionId}_recommendations`
      );
      const honors = localStorage.getItem(`${personalizedSessionId}_honors`);
      const featured = localStorage.getItem(
        `${personalizedSessionId}_featured`
      );
      const causes = localStorage.getItem(`${personalizedSessionId}_causes`);
      const products = localStorage.getItem(
        `${personalizedSessionId}_products`
      );
      const services = localStorage.getItem(
        `${personalizedSessionId}_services`
      );
      const testScores = localStorage.getItem(
        `${personalizedSessionId}_test_scores`
      );
      const volunteerExperience = localStorage.getItem(
        `${personalizedSessionId}_volunteer_experience`
      );

      if (education) userData.Education = JSON.parse(education);
      if (experiences) userData.Experience = JSON.parse(experiences);
      if (skills) userData.Skills = JSON.parse(skills);
      if (projects) userData.Projects = JSON.parse(projects);
      if (licenses) userData.Licenses = JSON.parse(licenses);
      if (certifications) userData.Certifications = JSON.parse(certifications);
      if (recommendations) userData.Testimonials = JSON.parse(recommendations);
      if (honors) userData.Honors = JSON.parse(honors);
      if (featured) userData.Featured = JSON.parse(featured);
      if (causes) userData.Causes = JSON.parse(causes);
      if (products) userData.Products = JSON.parse(products);
      if (services) userData.Services = JSON.parse(services);
      if (testScores) userData.TestScores = JSON.parse(testScores);
      if (volunteerExperience)
        userData.VolunteerExperience = JSON.parse(volunteerExperience);

      // Set profile created flag
      userData.Profile_Data_Created = true;

      return userData;
    } catch (error) {
      console.error("Error loading data from localStorage:", error);

      return null;
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      if (!userID) {
        setIsLoading(false);

        return;
      }

      // Get or generate personalized session ID (same as Step1)
      const personalizedSessionId = getOrGenerateSessionId();
      if (!personalizedSessionId) {
        setIsLoading(false);

        return;
      }

      setSessionId(personalizedSessionId);

      // First check if data exists in localStorage
      if (checkLocalStorageData(personalizedSessionId)) {
        console.log(
          "Loading data from localStorage with personalized session ID:",
          personalizedSessionId
        );
        const localData = loadDataFromLocalStorage(personalizedSessionId);
        if (localData) {
          setUserData(localData);
          setIsLoading(false);

          return;
        }
      }

      // If no data in localStorage, fetch from Supabase
      console.log("Fetching data from Supabase");
      setIsLoading(true);
      const data = await fetchUserData(userID);
      setUserData(data);
      setDataFetchedFromSupabase(true);

      if (data) {
        // Save to localStorage using personalized session ID
        saveUserDataToLocalStorage(personalizedSessionId, data);
      }

      setIsLoading(false);
    };

    initializeData();
  }, [userID]);

  // Handle section click
  const handleSectionClick = (sectionId: number) => {
    setActiveSection(sectionId);
  };

  // Handle back button click
  const handleBackClick = () => {
    setActiveSection(null);
  };

  // Handle save complete (return to grid view)
  const handleSaveComplete = () => {
    setActiveSection(null);

    // Refresh data from Supabase to ensure we have the latest
    if (userID && sessionId) {
      fetchUserData(userID).then((data) => {
        if (data) {
          setUserData(data);
          saveUserDataToLocalStorage(sessionId, data);
        }
      });
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-white">Loading your profile data...</p>
        </div>
      </div>
    );
  }

  // Render login prompt if no user
  if (!userID) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Sign In Required
          </h2>
          <p className="mb-6 text-center text-gray-600">
            Please sign in to access your profile dashboard.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Render active section component
  if (activeSection !== null) {
    switch (activeSection) {
      case 3:
        return (
          <Step3Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            profileCreated={true}
            userData={userData}
            onSaveComplete={handleSaveComplete}
            userId={userID}
          />
        );
      case 4:
        return (
          <Step4Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 5:
        return (
          <Step5Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 6:
        return (
          <Step6Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 7:
        return (
          <Step7Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 8:
        return (
          <Step8Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 9:
        return (
          <Step9Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 10:
        return (
          <Step10Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 11:
        return (
          <Step11Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 12:
        return (
          <Step12Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 13:
        return (
          <Step13Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 14:
        return (
          <Step14Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      case 15:
        return (
          <Step15Welcome
            onNext={handleBackClick}
            onPrevious={handleBackClick}
            userId={userID}
            // profileCreated={true}
            // userData={userData}
            // onSaveComplete={handleSaveComplete}
          />
        );
      default:
        return null;
    }
  }

  // Render grid of sections
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            {userData?.Name ? `${userData.Name}'s Profile` : "Your Profile"}
          </h1>
          <p className="text-lg text-gray-300">
            {userData?.Tagline || "Customize your professional portfolio"}
          </p>
        </div>
        {userData?.ProfileImageHeader && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <div className="relative w-full pb-[30%]">
              <Image
                src={userData.ProfileImageHeader}
                alt="Profile Header"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            // Check if this section has data
            const hasData =
              userData &&
              section.localStorageKey &&
              localStorage.getItem(`${sessionId}${section.localStorageKey}`);

            return (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer rounded-lg bg-gray-800 p-6 shadow-lg transition hover:shadow-xl ${
                  hasData ? "border-l-4 border-green-500" : ""
                }`}
                onClick={() => handleSectionClick(section.id)}
              >
                <div
                  className={`mb-4 flex size-12 items-center justify-center rounded-full ${section.color}`}
                >
                  {section.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {section.title}
                </h3>
                <p className="text-gray-300">{section.description}</p>
                {hasData && (
                  <div className="mt-3 text-sm text-green-400">
                    ✓ Data added
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
