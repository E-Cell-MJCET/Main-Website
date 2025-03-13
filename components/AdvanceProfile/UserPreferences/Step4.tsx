"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FaInstagram, FaLinkedinIn, FaGithub, FaFacebookF, 
  FaYoutube, FaMediumM, FaDribbble, FaBehance, FaChevronDown
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiCodechef, SiCodingninjas, SiGeeksforgeeks } from "react-icons/si";
import { IoGlobeOutline, IoLocationOutline, IoSearch, IoClose } from "react-icons/io5";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import {ReactCountryFlag} from 'react-country-flag';

// Define types for social media
type SocialMediaPlatform = {
  name: string;
  icon: JSX.Element;
  placeholder: string;
  prefix?: string;
};

// Define country interface
interface Country {
  code: string;
  dial_code: string;
  name: string;
}

// Define type for contact information
interface ContactInfo {
  email: string;
  phone: string;
  countryCode: string;
  countryDialCode: string;
}

// Define type for location information
interface LocationInfo {
  city: string;
  state: string;
}

// Countries list
const countries: Country[] = [
  { code: "IN", dial_code: "+91", name: "India" },
  { code: "US", dial_code: "+1", name: "United States" },
  { code: "GB", dial_code: "+44", name: "United Kingdom" },
  { code: "CA", dial_code: "+1", name: "Canada" },
  { code: "AU", dial_code: "+61", name: "Australia" },
  { code: "DE", dial_code: "+49", name: "Germany" },
  { code: "FR", dial_code: "+33", name: "France" },
  { code: "CN", dial_code: "+86", name: "China" },
  { code: "JP", dial_code: "+81", name: "Japan" },
  { code: "BR", dial_code: "+55", name: "Brazil" },
  { code: "RU", dial_code: "+7", name: "Russia" },
  { code: "AE", dial_code: "+971", name: "United Arab Emirates" },
  { code: "SA", dial_code: "+966", name: "Saudi Arabia" },
  { code: "SG", dial_code: "+65", name: "Singapore" },
  { code: "MY", dial_code: "+60", name: "Malaysia" },
  { code: "ID", dial_code: "+62", name: "Indonesia" },
  { code: "TH", dial_code: "+66", name: "Thailand" },
  { code: "VN", dial_code: "+84", name: "Vietnam" },
  { code: "PH", dial_code: "+63", name: "Philippines" },
  { code: "NZ", dial_code: "+64", name: "New Zealand" },
  { code: "ZA", dial_code: "+27", name: "South Africa" },
  { code: "NG", dial_code: "+234", name: "Nigeria" },
  { code: "EG", dial_code: "+20", name: "Egypt" },
  { code: "IL", dial_code: "+972", name: "Israel" },
  { code: "TR", dial_code: "+90", name: "Turkey" },
  { code: "ES", dial_code: "+34", name: "Spain" },
  { code: "IT", dial_code: "+39", name: "Italy" },
  { code: "NL", dial_code: "+31", name: "Netherlands" },
  { code: "CH", dial_code: "+41", name: "Switzerland" },
  { code: "SE", dial_code: "+46", name: "Sweden" },
  { code: "NO", dial_code: "+47", name: "Norway" },
  { code: "DK", dial_code: "+45", name: "Denmark" },
  { code: "FI", dial_code: "+358", name: "Finland" },
  { code: "PL", dial_code: "+48", name: "Poland" },
  { code: "AT", dial_code: "+43", name: "Austria" },
  { code: "HU", dial_code: "+36", name: "Hungary" },
  { code: "CZ", dial_code: "+420", name: "Czech Republic" },
  { code: "GR", dial_code: "+30", name: "Greece" },
  { code: "PT", dial_code: "+351", name: "Portugal" },
  { code: "IE", dial_code: "+353", name: "Ireland" },
  { code: "BE", dial_code: "+32", name: "Belgium" },
  { code: "LU", dial_code: "+352", name: "Luxembourg" },
  { code: "AR", dial_code: "+54", name: "Argentina" },
  { code: "CL", dial_code: "+56", name: "Chile" },
  { code: "CO", dial_code: "+57", name: "Colombia" },
  { code: "MX", dial_code: "+52", name: "Mexico" },
  { code: "PE", dial_code: "+51", name: "Peru" },
  { code: "KR", dial_code: "+82", name: "South Korea" },
  { code: "PK", dial_code: "+92", name: "Pakistan" },
  { code: "BD", dial_code: "+880", name: "Bangladesh" },
  { code: "LK", dial_code: "+94", name: "Sri Lanka" },
  { code: "NP", dial_code: "+977", name: "Nepal" },
];

const Step4Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [fullName, setFullName] = useState("");
  const [tagline, setTagline] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [industryPreference, setIndustryPreference] = useState("");
  const [secondaryPreference, setSecondaryPreference] = useState("");
  
  // Country dropdown state
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Add state for social media links
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({
    instagram: "",
    linkedin: "",
    github: "",
    twitter: "",
    facebook: "",
    youtube: "",
    medium: "",
    dribbble: "",
    behance: "",
    leetcode: "",
    codechef: "",
    codingninjas: "",
    geeksforgeeks: "",
    website: ""
  });
  
  // Add state for contact information
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    countryCode: "IN",
    countryDialCode: "+91"
  });
  
  // Add state for location information
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    city: "",
    state: ""
  });
  
  // Add state for tooltip visibility
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  
  // Ref for dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries based on search query
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    country.dial_code.includes(searchQuery)
  );

  // Social media platforms with icons
  const socialPlatforms: SocialMediaPlatform[] = [
    { name: "instagram", icon: <FaInstagram size={20} />, placeholder: "Instagram username", prefix: "@" },
    { name: "linkedin", icon: <FaLinkedinIn size={20} />, placeholder: "LinkedIn username" },
    { name: "website", icon: <IoGlobeOutline size={20} />, placeholder: "Personal website" },
    { name: "github", icon: <FaGithub size={20} />, placeholder: "GitHub username" },
    { name: "twitter", icon: <FaXTwitter size={20} />, placeholder: "Twitter username", prefix: "@" },
    { name: "facebook", icon: <FaFacebookF size={20} />, placeholder: "Facebook username" },
    { name: "youtube", icon: <FaYoutube size={20} />, placeholder: "YouTube channel" },
    { name: "medium", icon: <FaMediumM size={20} />, placeholder: "Medium username", prefix: "@" },
    { name: "dribbble", icon: <FaDribbble size={20} />, placeholder: "Dribbble username" },
    { name: "behance", icon: <FaBehance size={20} />, placeholder: "Behance username" },
    { name: "leetcode", icon: <SiLeetcode size={20} />, placeholder: "LeetCode username" },
    { name: "codechef", icon: <SiCodechef size={20} />, placeholder: "CodeChef username" },
    { name: "codingninjas", icon: <SiCodingninjas size={20} />, placeholder: "Coding Ninjas username" },
    { name: "geeksforgeeks", icon: <SiGeeksforgeeks size={20} />, placeholder: "GeeksforGeeks username" },
  ];

  const industryOptions = [
    "Executive",
    "Governing Body",
  ];
  
  const portfolioOptions = [
    "Technical",
    "Realtions & Outreach",
    "Human Resource",
    "Events",
    "Enterpreneurship Coordinator",
    "Design",
    "Editorial & Research",
    "Media",
    "Marketing",
    "Operations",
  ];
  
  const GBOptions = [
    "Chief Coordinator",
    "Chief Information Officer",
    "Chief Operating Officer",
    "Chief Technology Officer",
  ];

  // Handle social media input changes
  const handleSocialChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  // Handle contact info changes
  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setContactInfo(prev => ({
      ...prev,
      countryCode: country.code,
      countryDialCode: country.dial_code
    }));
    setIsCountryDropdownOpen(false);
    setSearchQuery("");
  };
  
  // Handle location info changes
  const handleLocationChange = (field: keyof LocationInfo, value: string) => {
    setLocationInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    console.log("Full Name:", fullName);
    console.log("Tagline:", tagline);
    console.log("Username:", username);
    console.log("About:", about);
    console.log("Industry Preference:", industryPreference);
    console.log("Secondary Preference:", secondaryPreference);
    console.log("Social Links:", socialLinks);
    console.log("Contact Info:", contactInfo);
    console.log("Location Info:", locationInfo);
    onNext();
  };

  // Reset secondary preference when industry preference changes
  const handleIndustryChange = (industry: string) => {
    setIndustryPreference(industry);
    setSecondaryPreference("");
  };

  // Format phone number with common format
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Apply basic formatting for all countries
    if (phoneNumber.length <= 5) {
      return phoneNumber;
    } else if (phoneNumber.length <= 10) {
      return `${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
    } else {
      return `${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5, 10)}`;
    }
  };

  // Handle phone input with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    // Limit to 15 digits max for any international number
    if (value.length <= 15) {
      handleContactChange('phone', formatPhoneNumber(value));
    }
  };

  // Close the dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Fill Your Personal Information 📝
        </h2>
        {/* Full Name Input */}
        <div className="mb-6">
          <label htmlFor="fullName" className="mb-3 block text-lg font-medium text-gray-700">
            What`s Your Full Name?
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="E.g., John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Tagline Input */}
        <div className="mb-6">
          <label htmlFor="tagline" className="mb-3 block text-lg font-medium text-gray-700">
            What Could Be Your Tagline?
          </label>
          <input
            id="tagline"
            type="text"
            placeholder="E.g., Something that defines you in a sentence or two"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full rounded-lg border p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Username Input */}
        <div className="mb-6">
          <label htmlFor="username" className="mb-3 block text-lg font-medium text-gray-700">
            Create a Username (This reflects ecellmjcet.com/profile/username)
          </label>
          <input
            id="username"
            type="text"
            placeholder="Think of it like your insta id to uniquely identify you"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* About Input */}
        <div className="mb-6">
          <label htmlFor="about" className="mb-3 block text-lg font-medium text-gray-700">
            Tell About Yourself
          </label>
          <textarea
            id="about"
            rows={4}
            placeholder="E.g., Detailed info about yourself, your interests, hobbies, etc."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full rounded-lg border p-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        {/* Industry Preference Selection */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Select Your Position Type
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {industryOptions.map((industry) => (
              <label
                key={industry}
                className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                  industryPreference === industry
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-gray-100"
                }`}
                onClick={() => handleIndustryChange(industry)}
              >
                <input
                  type="radio"
                  name="industryPreference"
                  value={industry}
                  checked={industryPreference === industry}
                  onChange={() => handleIndustryChange(industry)}
                  className="form-radio size-5 text-blue-500"
                />
                <span className="font-medium text-gray-700">{industry}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Conditional Secondary Options */}
        {industryPreference === "Executive" && (
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">
              What`s Your Portfolio? <br /> (Make sure it`s accurate, as our systems constantly check for the same)
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {portfolioOptions.map((portfolio) => (
                <label
                  key={portfolio}
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                    secondaryPreference === portfolio
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-gray-100"
                  }`}
                  onClick={() => setSecondaryPreference(portfolio)}
                >
                  <input
                    type="radio"
                    name="secondaryPreference"
                    value={portfolio}
                    checked={secondaryPreference === portfolio}
                    onChange={() => setSecondaryPreference(portfolio)}
                    className="form-radio size-5 text-blue-500"
                  />
                  <span className="font-medium text-gray-700">{portfolio}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {industryPreference === "Governing Body" && (
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">
              What`s Your Governing Body Position? <br /> (Make sure it`s accurate, as our systems constantly check for the same)
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {GBOptions.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition ${
                    secondaryPreference === option
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-gray-100"
                  }`}
                  onClick={() => setSecondaryPreference(option)}
                >
                  <input
                    type="radio"
                    name="secondaryPreference"
                    value={option}
                    checked={secondaryPreference === option}
                    onChange={() => setSecondaryPreference(option)}
                    className="form-radio size-5 text-blue-500"
                  />
                  <span className="font-medium text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {/* Social Media Links Section */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Social Media Links (Optional)
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Add your social media profiles to connect with visitors. Leave blank any you don`t want to share.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center space-x-2">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  {platform.icon}
                </div>
                <div className="relative flex-1">
                  {platform.prefix && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500">{platform.prefix}</span>
                    </div>
                  )}
                  <input
                    type="text"
                    value={socialLinks[platform.name]}
                    onChange={(e) => handleSocialChange(platform.name, e.target.value)}
                    placeholder={platform.placeholder}
                    className={`w-full rounded-lg border p-2 transition focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      platform.prefix ? 'pl-8' : 'pl-3'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Contact Information Section */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Email Field */}
            <div className="flex items-center space-x-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FiMail size={20} />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  placeholder="Email address (The one you want to showcase with your visitors)"
                  className="w-full rounded-lg border p-2 transition focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            {/* Phone Field with Country Dropdown */}
            <div className="relative flex items-center space-x-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FiPhone size={20} />
              </div>
              <div className="flex-1">
                <div className="flex">
                  {/* Country Code Dropdown */}
                  <div ref={dropdownRef} className="relative">
                    <button 
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="flex items-center gap-2 rounded-l-lg border border-r-0 bg-gray-50 px-3 py-2 text-gray-700 focus:outline-none"
                    >
                      <ReactCountryFlag 
                        countryCode={contactInfo.countryCode} 
                        svg 
                        style={{ width: '20px', height: '20px' }} 
                      />
                      <span>{contactInfo.countryDialCode}</span>
                      <FaChevronDown size={12} className={`transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Dropdown Menu */}
                    {isCountryDropdownOpen && (
                      <div className="absolute left-0 z-10 mt-1 max-h-60 w-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                        <div className="sticky top-0 bg-white p-2">
                          <div className="flex items-center rounded-md border px-2 py-1">
                            <IoSearch className="mr-2 text-gray-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search country or code"
                              className="w-full outline-none"
                            />
                            {searchQuery && (
                              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                                <IoClose size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="py-1">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleCountrySelect(country)}
                              >
                                <div className="flex items-center">
                                  <ReactCountryFlag 
                                    countryCode={country.code} 
                                    svg 
                                    style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                                  />
                                  <span className="flex-1 truncate">{country.name}</span>
                                </div>
                                <span className="text-gray-500">{country.dial_code}</span>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">No countries found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Phone Input */}
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone number"
                    className="w-full rounded-r-lg border p-2 transition focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
              <button 
                onClick={() => setShowPhoneTooltip(!showPhoneTooltip)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdHelpOutline size={20} />
              </button>
              {/* Phone format tooltip */}
              {showPhoneTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg bg-white p-3 shadow-lg"
                >
                  <p className="text-sm text-gray-600">
                    Please select your country code and enter your phone number.
                    <br />
                    For example: 98765-12345
                  </p>
                  <div className="absolute -top-2 right-2 size-3 rotate-45 bg-white"></div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        {/* Location Information Section */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Location Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* City Field */}
            <div className="flex items-center space-x-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <FiMapPin size={20} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={locationInfo.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  placeholder="Your City (e.g., Mumbai, Bangalore)"
                  className="w-full rounded-lg border p-2 transition focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
            {/* State Field */}
            <div className="flex items-center space-x-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <IoLocationOutline size={20} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={locationInfo.state}
                  onChange={(e) => handleLocationChange('state', e.target.value)}
                  placeholder="Your State (e.g., Maharashtra, Karnataka)"
                  className="w-full rounded-lg border p-2 transition focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Your location helps visitors connect with you and may be displayed on your profile.
          </p>
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
            disabled={!fullName || !username || !about || !industryPreference || !secondaryPreference}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              !fullName || !username || !about || !industryPreference || !secondaryPreference
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step4Welcome;