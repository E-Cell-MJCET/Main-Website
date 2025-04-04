/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/nextjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaBehance,
  FaUserTie,
  FaUsers,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaLaptopCode,
} from "react-icons/fa";

import { getThemeStyles } from "../Themes/HeaderTheme";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the user data interface
interface UserData {
  Name: string;
  Username?: string;
  Tagline: string;
  Member_Type: string;
  Location: string;
  About: string;
  Portfolio: string;
  ProfileImageHeader?: string;
  SocialLinks?: {
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    behance?: string;
  };
  Contact_Info: {
    email?: string;
    phone?: string;
    countryCode?: string;
    countryDialCode?: string;
  };
}

const HeaderDashboard = () => {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<null | "saving" | "saved" | "error">(null);
  const [profileImage, setProfileImage] = useState<string>("/assets/Team/Execom/Technical/Adnan/trial_logo.jpg");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // User data state
  const [userData, setUserData] = useState<UserData>({
    Name: "",
    Username: "",
    Tagline: "",
    Member_Type: "Member",
    Location: "",
    About: "",
    Portfolio: "",
    SocialLinks: {
      website: "",
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
      facebook: "",
      behance: "",
    },
    Contact_Info: {
      email: "",
      phone: "",
      countryCode: "",
      countryDialCode: "",
    }
  });

  // Selected theme for preview
  const [selectedTheme, setSelectedTheme] = useState("Default");

  // Load user data from Supabase and localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isClerkLoaded || !user) {
        setIsLoading(false);
        
return;
      }

      try {
        // First check Supabase for user data
        const { data, error } = await supabase
          .from("Team")
          .select("*")
          .eq("clerk_user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching user data:", error);
          toast.error("Error loading your profile data");
        } else if (data) {
          // Found data in Supabase
          setUserData({
            Name: data.Name || "",
            Username: data.Username || "",
            Tagline: data.Tagline || "",
            Member_Type: data.Member_Type || "Member",
            Location: data.Location || "",
            About: data.About || "",
            Portfolio: data.Portfolio || "",
            ProfileImageHeader: data.ProfileImageHeader || "",
            SocialLinks: data.SocialLinks || {
              website: "",
              linkedin: "",
              github: "",
              twitter: "",
              instagram: "",
              facebook: "",
              behance: "",
            },
            Contact_Info: data.Contact_Info || {
              email: "",
              phone: "",
              countryCode: "",
              countryDialCode: "",
            }
          });
          
          if (data.ProfileImageHeader) {
            setProfileImage(data.ProfileImageHeader);
          }
          
          if (data.theme) {
            setSelectedTheme(data.theme);
          }
        } else {
          // Fallback to localStorage if no data in Supabase
          const sessionId = localStorage.getItem("personalized_session_id");
          if (sessionId) {
            // Load personal information
            const savedFullName = localStorage.getItem(`${sessionId}_fullName`);
            const savedTagline = localStorage.getItem(`${sessionId}_tagline`);
            const savedUsername = localStorage.getItem(`${sessionId}_username`);
            const savedAbout = localStorage.getItem(`${sessionId}_about`);
            const savedIndustryPreference = localStorage.getItem(`${sessionId}_industryPreference`);
            const savedSecondaryPreference = localStorage.getItem(`${sessionId}_secondaryPreference`);
            
            // Load social media links
            const savedSocialLinks = localStorage.getItem(`${sessionId}_socialLinks`);
            
            // Load contact info
            const savedContactInfo = localStorage.getItem(`${sessionId}_contactInfo`);
            
            // Load location info
            const savedLocationInfo = localStorage.getItem(`${sessionId}_locationInfo`);
            
            // Load theme
            const savedTheme = localStorage.getItem(`${sessionId}_theme`);
            
            // Set state with saved values
            if (savedFullName) setUserData(prev => ({ ...prev, Name: savedFullName }));
            if (savedTagline) setUserData(prev => ({ ...prev, Tagline: savedTagline }));
            if (savedUsername) setUserData(prev => ({ ...prev, Username: savedUsername }));
            if (savedAbout) setUserData(prev => ({ ...prev, About: savedAbout }));
            if (savedIndustryPreference) setUserData(prev => ({ ...prev, IndustryPreference: savedIndustryPreference }));
            if (savedSecondaryPreference) setUserData(prev => ({ ...prev, SecondaryPreference: savedSecondaryPreference }));
            
            if (savedSocialLinks) {
              setUserData(prev => ({ 
                ...prev, 
                SocialLinks: JSON.parse(savedSocialLinks) 
              }));
            }
            
            if (savedContactInfo) {
              setUserData(prev => ({ 
                ...prev, 
                Contact_Info: JSON.parse(savedContactInfo) 
              }));
            }
            
            if (savedLocationInfo && JSON.parse(savedLocationInfo).city) {
              const locationInfo = JSON.parse(savedLocationInfo);
              setUserData(prev => ({ 
                ...prev, 
                Location: `${locationInfo.city}, ${locationInfo.country}` 
              }));
            }
            
            if (savedTheme) setSelectedTheme(savedTheme);
          }
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isClerkLoaded, user]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserData],
          [child]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Save user data to Supabase and localStorage
  const saveUserData = async () => {
    if (!user) {
      toast.error("You must be logged in to save profile settings");
      
return;
    }

    setSaveStatus("saving");
    
    try {
      let profileImageUrl = userData.ProfileImageHeader;
      
      // Upload image if a new one was selected
      if (imageFile) {
        const fileName = `${user.id}_profile_${Date.now()}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(fileName, imageFile);
          
        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          toast.error("Failed to upload profile image");
        } else {
          // Get the public URL for the uploaded image
          const { data: urlData } = await supabase.storage
            .from('profile-images')
            .getPublicUrl(fileName);
            
          if (urlData) {
            profileImageUrl = urlData.publicUrl;
          }
        }
      }
      
      // Prepare data for Supabase
      const dataToSave = {
        Name: userData.Name,
        Username: userData.Username,
        Tagline: userData.Tagline,
        Member_Type: userData.Member_Type,
        Location: userData.Location,
        About: userData.About,
        Portfolio: userData.Portfolio,
        ProfileImageHeader: profileImageUrl,
        SocialLinks: userData.SocialLinks,
        Contact_Info: userData.Contact_Info,
        updated_at: new Date().toISOString()
      };
      
      // Check if user exists in the database
      const { data: existingUser, error: checkError } = await supabase
        .from("Team")
        .select("*")
        .eq("clerk_user_id", user.id)
        .single();
        
      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking user existence:", checkError);
        setSaveStatus("error");
        toast.error("Failed to save profile settings");
        
return;
      }
      
      let saveError;
      
      if (existingUser) {
        // Update existing user
        const { error } = await supabase
          .from("Team")
          .update(dataToSave)
          .eq("clerk_user_id", user.id);
          
        saveError = error;
      } else {
        // Insert new user
        const { error } = await supabase
          .from("Team")
          .insert([{
            ...dataToSave,
            clerk_user_id: user.id
          }]);
          
        saveError = error;
      }
      
      if (saveError) {
        console.error("Error saving data to Supabase:", saveError);
        setSaveStatus("error");
        toast.error("Failed to save profile settings");
        
return;
      }
      
      // Also save to localStorage for redundancy
      const sessionId = localStorage.getItem("personalized_session_id") || 
        (() => {
          const newId = `session_${Date.now()}`;
          localStorage.setItem("personalized_session_id", newId);
          
return newId;
        })();
        
      localStorage.setItem(`${sessionId}_fullName`, userData.Name);
      localStorage.setItem(`${sessionId}_tagline`, userData.Tagline);
      localStorage.setItem(`${sessionId}_username`, userData.Username || "");
      localStorage.setItem(`${sessionId}_about`, userData.About);
      localStorage.setItem(`${sessionId}_socialLinks`, JSON.stringify(userData.SocialLinks));
      localStorage.setItem(`${sessionId}_contactInfo`, JSON.stringify(userData.Contact_Info));
      
      // Update the profile image in state if it was changed
      if (profileImageUrl && profileImageUrl !== userData.ProfileImageHeader) {
        setProfileImage(profileImageUrl);
        setUserData(prev => ({
          ...prev,
          ProfileImageHeader: profileImageUrl
        }));
      }
      
      setSaveStatus("saved");
      toast.success("Profile settings saved successfully!");
      
      // Reset status after showing success
      setTimeout(() => {
        setSaveStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Error in saveUserData:", error);
      setSaveStatus("error");
      toast.error("An unexpected error occurred");
    }
  };

  // Get theme styles for preview
  const themeStyles = getThemeStyles(selectedTheme);

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
        <h2 className="text-xl font-bold">Profile Header Settings</h2>
        <button
          onClick={saveUserData}
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
      {/* Form and Preview Container */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="Name" className="mb-1 block text-sm font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={userData.Name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="Username" className="mb-1 block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="Username"
                  name="Username"
                  value={userData.Username}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="Tagline" className="mb-1 block text-sm font-medium">
                  Tagline *
                </label>
                <input
                  type="text"
                  id="Tagline"
                  name="Tagline"
                  value={userData.Tagline}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="Member_Type" className="mb-1 block text-sm font-medium">
                  Member Type
                </label>
                <select
                  id="Member_Type"
                  name="Member_Type"
                  value={userData.Member_Type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Member">Member</option>
                  <option value="Executive">Executive Member</option>
                  <option value="Governing Body">Governing Body</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>
              <div>
                <label htmlFor="Location" className="mb-1 block text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="Location"
                  name="Location"
                  value={userData.Location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="Portfolio" className="mb-1 block text-sm font-medium">
                  Portfolio
                </label>
                <input
                  type="text"
                  id="Portfolio"
                  name="Portfolio"
                  value={userData.Portfolio}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="About" className="mb-1 block text-sm font-medium">
                  About
                </label>
                <textarea
                  id="About"
                  name="About"
                  value={userData.About}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Profile Image</h3>
            <div className="mb-4 flex items-center space-x-4">
              <div className="relative size-24 overflow-hidden rounded-full border-2 border-gray-300">
                <Image
                  src={imagePreview || profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Social Links</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="SocialLinks.website" className="mb-1 block text-sm font-medium">
                  Website
                </label>
                <input
                  type="url"
                  id="SocialLinks.website"
                  name="SocialLinks.website"
                  value={userData.SocialLinks?.website || ""}
                  onChange={handleInputChange}
                  placeholder="https://ecellmjcet.com"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="SocialLinks.linkedin" className="mb-1 block text-sm font-medium">
                  LinkedIn Username
                </label>
                <input
                  type="text"
                  id="SocialLinks.linkedin"
                  name="SocialLinks.linkedin"
                  value={userData.SocialLinks?.linkedin || ""}
                  onChange={handleInputChange}
                  placeholder="username"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="SocialLinks.github" className="mb-1 block text-sm font-medium">
                  GitHub Username
                </label>
                <input
                  type="text"
                  id="SocialLinks.github"
                  name="SocialLinks.github"
                  value={userData.SocialLinks?.github || ""}
                  onChange={handleInputChange}
                  placeholder="username"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="SocialLinks.twitter" className="mb-1 block text-sm font-medium">
                  Twitter Username
                </label>
                <input
                  type="text"
                  id="SocialLinks.twitter"
                  name="SocialLinks.twitter"
                  value={userData.SocialLinks?.twitter || ""}
                  onChange={handleInputChange}
                  placeholder="username"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="SocialLinks.instagram" className="mb-1 block text-sm font-medium">
                  Instagram Username
                </label>
                <input
                  type="text"
                  id="SocialLinks.instagram"
                  name="SocialLinks.instagram"
                  value={userData.SocialLinks?.instagram || ""}
                  onChange={handleInputChange}
                  placeholder="username"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="Contact_Info.email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="Contact_Info.email"
                  name="Contact_Info.email"
                  value={userData.Contact_Info?.email || ""}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="Contact_Info.phone" className="mb-1 block text-sm font-medium">
                  Phone Number
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="Contact_Info.countryDialCode"
                    name="Contact_Info.countryDialCode"
                    value={userData.Contact_Info?.countryDialCode || ""}
                    onChange={handleInputChange}
                    placeholder="+91"
                    className="w-20 rounded-l-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <input
                    type="tel"
                    id="Contact_Info.phone"
                    name="Contact_Info.phone"
                    value={userData.Contact_Info?.phone || ""}
                    onChange={handleInputChange}
                    className="w-full rounded-r-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Preview Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Profile Header Preview</h3>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-md">
            <div className={themeStyles.container + " max-h-[500px] overflow-auto"}>
              {/* Left Content Section */}
              <div className="flex w-full flex-col items-start space-y-4 md:w-1/2">
                <h1 className={themeStyles.headingText}>
                  Hi! 👋
                  <br /> I`m {userData.Name || "Your Name"}
                </h1>
                <p className={themeStyles.taglineText}>{userData.Tagline || "Your Tagline"}</p>
                <div className="flex items-center space-x-2">
                  <span className={themeStyles.locationText}>{userData.Location || "Your Location"}</span>
                </div>
                {/* Member Type and Portfolio Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={themeStyles.memberTypeBadge}>
                    {userData.Member_Type === "Executive" ? (
                      <>
                        <FaUserTie className="mr-1" /> Executive Member
                      </>
                    ) : userData.Member_Type === "Governing Body" ? (
                      <>
                        <FaUsers className="mr-1" /> Governing Body
                      </>
                    ) : (
                      <>
                        <FaUserTie className="mr-1" /> {userData.Member_Type}
                      </>
                    )}
                  </span>
                  {/* Portfolio Badge */}
                  {userData.Portfolio && (
                    <span className={themeStyles.portfolioBadge}>
                      <FaLaptopCode className="mr-1" /> {userData.Portfolio}
                    </span>
                  )}
                </div>
                {/* Show Contact Info Button */}
                <button className={themeStyles.contactButton}>
                  Show Contact Info
                </button>
                {/* Buttons Section */}
                <div className="mt-4 flex space-x-4">
                  <button
                    className={`${themeStyles.downloadButton} ${themeStyles.downloadButtonHover}`}
                  >
                    Download Resume
                  </button>
                  <div className="flex space-x-4">
                    {/* Dynamically render social links based on what's available */}
                    {userData.SocialLinks?.instagram && (
                      <a
                        href="#"
                        className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
                      >
                        <FaInstagram size={24} />
                      </a>
                    )}
                    {userData.SocialLinks?.linkedin && (
                      <a
                        href="#"
                        className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
                      >
                        <FaLinkedin size={24} />
                      </a>
                    )}
                    {userData.SocialLinks?.github && (
                      <a
                        href="#"
                        className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
                      >
                        <FaGithub size={24} />
                      </a>
                    )}
                    {userData.SocialLinks?.twitter && (
                      <a
                        href="#"
                        className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
                      >
                        <FaTwitter size={24} />
                      </a>
                    )}
                    {userData.SocialLinks?.facebook && (
                      <a
                        href="#"
                        className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
                      >
                        <FaFacebook size={24} />
                      </a>
                    )}
                    {userData.SocialLinks?.website && (
                      <a
                        href="#"
                        className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
                      >
                        <FaGlobe size={24} />
                      </a>
                    )}
                    {userData.SocialLinks?.behance && (
                      <a
                        href="#"
                        className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
                      >
                        <FaBehance size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {/* Image Card */}
              <motion.div
                className={`relative mt-8 w-full md:w-2/5 ${themeStyles.imageShadow}`}
              >
                <div className="group w-full overflow-y-hidden">
                  {/* Animated Border */}
                  <div className={themeStyles.imageCardBorder} />
                  {/* Image Container */}
                  <div className={themeStyles.imageCardBackground}>
                    <div className="relative h-64 w-full">
                      <Image
                        src={imagePreview || profileImage}
                        alt={`${userData.Name || "User"}'s profile`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={themeStyles.locationOverlay}>
                      <div className="text-2xl font-bold">
                        Based in
                        <span className={themeStyles.gradientText}>
                          {userData.Location || "Your Location"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Theme Selection */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
            <h3 className="mb-4 text-lg font-medium">Theme Selection</h3>
            <p className="mb-4 text-sm text-gray-600">
              Select a theme to see how your profile header will look. You can change this anytime.
            </p>
            <div className="space-y-3">
              {["Default", "Gradient Theme", "Monochromatic Theme", "Dark Theme with accent colors"].map((theme) => (
                <div key={theme} className="flex items-center">
                  <input
                    type="radio"
                    id={`theme-${theme}`}
                    name="theme"
                    value={theme}
                    checked={selectedTheme === theme}
                    onChange={() => setSelectedTheme(theme)}
                    className="size-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`theme-${theme}`} className="ml-2 block text-sm font-medium text-gray-700">
                    {theme}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Preview Notes */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-2 font-medium">Preview Notes:</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
              <li>This is a simplified preview of how your profile header will appear.</li>
              <li>Interactive elements like buttons are not functional in the preview.</li>
              <li>The actual header may have slight variations based on screen size and device.</li>
              <li>Save your changes to see the updated header on your profile page.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashboard;