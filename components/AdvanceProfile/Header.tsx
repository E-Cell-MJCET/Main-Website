"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
import Link from "next/link";

import ResumeDownload from "./ResumeDownload";
import Popup from "./ContactPopup";
// eslint-disable-next-line no-unused-vars, unused-imports/no-unused-imports
import { getThemeStyles, ThemeStyles } from "./Themes/HeaderTheme";

// Enhanced UserData interface to include all columns from the Team table
interface UserData {
  // Basic information
  Name: string;
  Username?: string;
  Tagline: string;
  Member_Type: string;
  Location: string;
  About: string;
  Portfolio: string;

  // Contact and social information
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

  // Profile and theme data
  ProfileImageHeader?: string;
  theme?: string;
  theme_feedback?: string;

  // Professional information
  IndustryPreference?: string;
  SecondaryPreference?: string;
  Technical_Info?: string;

  // Detailed data arrays
  Skills?: Array<any>;
  Experience?: Array<any>;
  Education?: Array<any>;
  Projects?: Array<any>;
  Projects_outdated?: Array<any>;
  Licenses?: Array<any>;
  Certifications?: Array<any>;
  Recommendations?: Array<any>;
  Honors?: Array<any>;
  Featured_Items?: Array<any>;
  Causes?: Array<any>;
  Products?: Array<any>;
  Services?: Array<any>;
  TestScores?: Array<any>;
  VolunteerExperience?: Array<any>;

  // Additional data that might be in the table
  selectedSections?: Array<string>;
  mediaGallery?: Array<any>;
}

// Create a helper function to format contact info properly
const formatContactInfo = (contactInfo: UserData["Contact_Info"]) => {
  if (!contactInfo) return {};

  // Format the phone number with country dial code if available
  let formattedPhone = contactInfo.phone || "";
  if (contactInfo.countryDialCode && contactInfo.phone) {
    formattedPhone = `${contactInfo.countryDialCode} ${contactInfo.phone}`;
  }

  // Return a properly formatted contact info object
  return {
    email: contactInfo.email || "",
    phone: formattedPhone,
    countryCode: contactInfo.countryCode || "",
    countryDialCode: contactInfo.countryDialCode || "",
    // Add a formatted display property for the popup
    phoneDisplay: formattedPhone,
  };
};

const Header: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Function to open the popup
  const openPopup = () => setIsPopupOpen(true);

  // Function to close the popup
  const closePopup = () => setIsPopupOpen(false);

  // Function to handle resume download
  const handleDownload = () => {
    setIsDownloading(true);
  };

  // Function to handle download completion
  const handleDownloadComplete = () => {
    setIsDownloading(false);
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 80]);

  // Default image path if none provided in userData
  const profileImage =
    userData.ProfileImageHeader ||
    "/assets/Team/Execom/Technical/Adnan/trial_logo.jpg";

  // Format the contact info
  const formattedContactInfo = formatContactInfo(userData.Contact_Info);

  // Ensure all userData fields are properly defined with fallbacks for PDF generation
  const completeUserData: UserData = {
    ...userData,
    // Ensure all required fields have defaults
    Name: userData.Name || "Unnamed",
    Tagline: userData.Tagline || "",
    Member_Type: userData.Member_Type || "",
    About: userData.About || "",
    Location: userData.Location || "",
    Portfolio: userData.Portfolio || "",
    Username: userData.Username || "",
    IndustryPreference: userData.IndustryPreference || "",
    SecondaryPreference: userData.SecondaryPreference || "",
    Technical_Info: userData.Technical_Info || "",
    theme: userData.theme || "",
    theme_feedback: userData.theme_feedback || "",
    // Ensure nested objects exist
    SocialLinks: userData.SocialLinks || {},
    Contact_Info: userData.Contact_Info || {},
    // Ensure arrays exist
    Skills: Array.isArray(userData.Skills) ? userData.Skills : [],
    Experience: Array.isArray(userData.Experience) ? userData.Experience : [],
    Education: Array.isArray(userData.Education) ? userData.Education : [],
    Projects: Array.isArray(userData.Projects) ? userData.Projects : [],
    Licenses: Array.isArray(userData.Licenses) ? userData.Licenses : [],
    Certifications: Array.isArray(userData.Certifications)
      ? userData.Certifications
      : [],
    Recommendations: Array.isArray(userData.Recommendations)
      ? userData.Recommendations
      : [],
    Honors: Array.isArray(userData.Honors) ? userData.Honors : [],
    Featured_Items: Array.isArray(userData.Featured_Items)
      ? userData.Featured_Items
      : [],
    Causes: Array.isArray(userData.Causes) ? userData.Causes : [],
    Products: Array.isArray(userData.Products) ? userData.Products : [],
    Services: Array.isArray(userData.Services) ? userData.Services : [],
    TestScores: Array.isArray(userData.TestScores) ? userData.TestScores : [],
    VolunteerExperience: Array.isArray(userData.VolunteerExperience)
      ? userData.VolunteerExperience
      : [],
    selectedSections: Array.isArray(userData.selectedSections)
      ? userData.selectedSections
      : [],
    mediaGallery: Array.isArray(userData.mediaGallery)
      ? userData.mediaGallery
      : [],
  };

  // Get theme styles based on the selected theme
  const themeStyles = useMemo(() => {
    const theme = userData.theme || "Default";

    return getThemeStyles(theme);
  }, [userData.theme]);

  return (
    <div className={themeStyles.container}>
      {/* Left Content Section */}
      <div className="flex w-full flex-col items-start space-y-4 md:w-1/2">
        <h1 className={themeStyles.headingText}>
          Hi! 👋
          <br /> I`m {userData.Name}
        </h1>
        <p className={themeStyles.taglineText}>{userData.Tagline}</p>
        <div className="flex items-center space-x-2">
          <span className={themeStyles.locationText}>{userData.Location}</span>
        </div>
        {/* Member Type and Portfolio Badges - Now displayed in a flex row */}
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
        <button onClick={openPopup} className={themeStyles.contactButton}>
          Show Contact Info
        </button>
        {/* Buttons Section */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleDownload}
            className={`${themeStyles.downloadButton} ${!isDownloading ? themeStyles.downloadButtonHover : ""}`}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <svg
                  className="-ml-1 mr-2 size-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              "Download Resume"
            )}
          </button>
          <div className="flex space-x-4">
            {/* Dynamically render social links based on what's available */}
            {userData.SocialLinks?.instagram && (
              <Link
                href={`https://instagram.com/${userData.SocialLinks.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
              >
                <FaInstagram size={24} />
              </Link>
            )}
            {userData.SocialLinks?.linkedin && (
              <Link
                href={`https://linkedin.com/in/${userData.SocialLinks.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
              >
                <FaLinkedin size={24} />
              </Link>
            )}
            {userData.SocialLinks?.github && (
              <Link
                href={`https://github.com/${userData.SocialLinks.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
              >
                <FaGithub size={24} />
              </Link>
            )}
            {userData.SocialLinks?.twitter && (
              <Link
                href={`https://x.com/${userData.SocialLinks.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
              >
                <FaTwitter size={24} />
              </Link>
            )}
            {userData.SocialLinks?.facebook && (
              <Link
                href={userData.SocialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
              >
                <FaFacebook size={24} />
              </Link>
            )}
            {userData.SocialLinks?.website && (
              <Link
                href={userData.SocialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
              >
                <FaGlobe size={24} />
              </Link>
            )}
            {userData.SocialLinks?.behance && (
              <Link
                href={userData.SocialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className={`${themeStyles.socialIcons} ${themeStyles.socialIconsHover}`}
              >
                <FaBehance size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Image Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className={`relative mt-8 w-full md:w-2/5 ${themeStyles.imageShadow}`}
        style={{ y }}
      >
        <div className="group w-full overflow-y-hidden">
          {/* Animated Border */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            className={themeStyles.imageCardBorder}
          />
          {/* Floating Animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={themeStyles.imageCardBackground}
          >
            <Image
              src={profileImage}
              alt={`${userData.Name}'s profile`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={themeStyles.locationOverlay}
            >
              <div className="text-2xl font-bold">
                Based in
                <motion.span
                  className={themeStyles.gradientText}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  {userData.Location}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      {/* Contact Info Popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        contact_info={formattedContactInfo}
      />
      {/* Resume Download Component - Only rendered when isDownloading is true */}
      {isDownloading && (
        <ResumeDownload
          userData={completeUserData}
          onComplete={handleDownloadComplete}
        />
      )}
    </div>
  );
};

export default Header;
