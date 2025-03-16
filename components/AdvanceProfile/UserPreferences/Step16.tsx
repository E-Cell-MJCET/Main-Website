/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define types for all data structures
interface ProfileSummaryData {
  theme: string;
  themeBackground: string;
  selectedSections: string[];
  profileHeaderImage: string;
  personalInfo: {
    fullName: string;
    username: string;
    tagline: string;
    about: string;
  };
  industryPreference: string;
  secondaryPreference: string;
  socialProfiles: Record<string, string>;
  contactInfo: {
    email: string;
    phone: string;
    countryCode: string;
    countryDialCode: string;
  };
  locationInfo: {
    city: string;
    state: string;
  };
  experiences: any[];
  education: any[];
  skills: any[];
  projects: any[];
  licenses: any[];
  certifications: any[];
  recommendations: any[];
  honorsAwards: any[];
  featuredItems: any[];
  causes: any[];
  products: any[];
  services: any[];
  testScores: any[];
  volunteerExperiences: any[];
}

// Interface for image gallery items
interface ImageGalleryItem {
  image: string;
  title: string;
  type: string;
  intent: string;
}

const ProfileSummary = ({
  onPrevious,
  onComplete,
}: {
  onPrevious: () => void;
  onComplete: () => void;
}) => {
  const [profileData, setProfileData] = useState<Partial<ProfileSummaryData>>({});
  const [loading, setLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState<ImageGalleryItem[]>([]);

  useEffect(() => {
    const loadProfileData = () => {
      const sessionId = localStorage.getItem("personalized_session_id");
      if (!sessionId) return;
      
      const data: Partial<ProfileSummaryData> = {};
      
      // Load basic theme preferences
      data.theme = localStorage.getItem(`${sessionId}_theme`) || "";
      data.themeBackground = localStorage.getItem(`${sessionId}_theme_background`) || "";
      
      // Load profile header image
      data.profileHeaderImage = localStorage.getItem(`${sessionId}_profile_header_image`) || "";
      
      // Load selected sections
      try {
        const sections = localStorage.getItem(`${sessionId}_selected_sections`);
        data.selectedSections = sections ? JSON.parse(sections) : [];
      } catch (_) {
        console.error("Error parsing selected sections");
        data.selectedSections = [];
      }
      
      // Load personal info
      data.personalInfo = {
        fullName: localStorage.getItem(`${sessionId}_fullName`) || "",
        username: localStorage.getItem(`${sessionId}_username`) || "",
        tagline: localStorage.getItem(`${sessionId}_tagline`) || "",
        about: localStorage.getItem(`${sessionId}_about`) || ""
      };
      
      // Load industry and secondary preferences
      data.industryPreference = localStorage.getItem(`${sessionId}_industryPreference`) || "";
      data.secondaryPreference = localStorage.getItem(`${sessionId}_secondaryPreference`) || "";
      
      // Load social profiles
      try {
        const socialProfiles = localStorage.getItem(`${sessionId}_socialLinks`);
        data.socialProfiles = socialProfiles ? JSON.parse(socialProfiles) : {};
      } catch (_) {
        data.socialProfiles = {};
      }
      
      // Load contact info
      try {
        const contactInfo = localStorage.getItem(`${sessionId}_contactInfo`);
        data.contactInfo = contactInfo ? JSON.parse(contactInfo) : {
          email: "",
          phone: "",
          countryCode: "",
          countryDialCode: ""
        };
      } catch (_) {
        data.contactInfo = {
          email: "",
          phone: "",
          countryCode: "",
          countryDialCode: ""
        };
      }
      
      // Load location info
      try {
        const locationInfo = localStorage.getItem(`${sessionId}_locationInfo`);
        data.locationInfo = locationInfo ? JSON.parse(locationInfo) : {
          city: "",
          state: ""
        };
      } catch (_) {
        data.locationInfo = {
          city: "",
          state: ""
        };
      }
      
      // Load array data from various steps
      const arrayDataItems: Array<{key: keyof ProfileSummaryData, storageKey: string}> = [
        { key: "experiences", storageKey: `${sessionId}_experiences` },
        { key: "education", storageKey: `${sessionId}_education` },
        { key: "skills", storageKey: `${sessionId}_skills` },
        { key: "projects", storageKey: `${sessionId}_projects` },
        { key: "licenses", storageKey: `${sessionId}_licenses` },
        { key: "certifications", storageKey: `${sessionId}_certifications` },
        { key: "recommendations", storageKey: `${sessionId}_recommendations` },
        { key: "honorsAwards", storageKey: `${sessionId}_honors_awards` },
        { key: "featuredItems", storageKey: `${sessionId}_featured_items` },
        { key: "causes", storageKey: `${sessionId}_causes` },
        { key: "products", storageKey: `${sessionId}_products` },
        { key: "services", storageKey: `${sessionId}_services` },
        { key: "testScores", storageKey: `${sessionId}_test_scores` },
        { key: "volunteerExperiences", storageKey: `${sessionId}_volunteer_experiences` },
      ];
      
      arrayDataItems.forEach(item => {
        try {
          const savedData = localStorage.getItem(item.storageKey);
          if (savedData) {
            (data[item.key] as any[]) = JSON.parse(savedData);
          } else {
            (data[item.key] as any[]) = [];
          }
        } catch (error) {
          console.error(`Error parsing ${item.key}:`, error);
          (data[item.key] as any[]) = [];
        }
      });
      
      setProfileData(data);
      
      // Collect all images from different sections
      collectAllImages(data, sessionId);
      
      setLoading(false);
    };
    
    loadProfileData();
  }, []);
  
  // Function to collect all images from different sections
  const collectAllImages = (data: Partial<ProfileSummaryData>, sessionId: string) => {
    const images: ImageGalleryItem[] = [];
    
    // Add profile header image if it exists
    if (data.profileHeaderImage && data.profileHeaderImage.startsWith('data:image')) {
      images.push({
        image: data.profileHeaderImage,
        title: 'Profile Header Image',
        type: 'Header',
        intent: 'This image appears at the top of your profile as your banner image'
      });
    }
    
    // Add project images
    if (data.projects && data.projects.length > 0) {
      data.projects.forEach(project => {
        if (project.image && project.image.startsWith('data:image')) {
          images.push({
            image: project.image,
            title: project.title || 'Untitled Project',
            type: 'Project',
            intent: `Illustration for project: ${project.title || 'Untitled Project'}`
          });
        }
      });
    }
    
    // Add license images
    if (data.licenses && data.licenses.length > 0) {
      data.licenses.forEach(license => {
        if (license.image && license.image.startsWith('data:image')) {
          images.push({
            image: license.image,
            title: license.title || 'Untitled License',
            type: 'License',
            intent: `Visual proof of license: ${license.title || 'Untitled License'}`
          });
        }
      });
    }
    
    // Add certification images
    if (data.certifications && data.certifications.length > 0) {
      data.certifications.forEach(cert => {
        if (cert.image && cert.image.startsWith('data:image')) {
          images.push({
            image: cert.image,
            title: cert.title || 'Untitled Certification',
            type: 'Certification',
            intent: `Visual proof of certification: ${cert.title || 'Untitled Certification'}`
          });
        }
      });
    }
    
    // Add product images
    if (data.products && data.products.length > 0) {
      data.products.forEach(product => {
        if (product.image && product.image.startsWith('data:image')) {
          images.push({
            image: product.image,
            title: product.name || 'Untitled Product',
            type: 'Product',
            intent: `Showcase image for product: ${product.name || 'Untitled Product'}`
          });
        }
      });
    }
    
    setGalleryItems(images);
  };

  // Helper function to render array data with item counts
  const renderArraySection = (title: string, items: any[] = [], keyProperty: string = 'title') => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h4 className="text-md font-semibold text-gray-800">{title} ({items.length})</h4>
        <ul className="mt-1 list-inside list-disc">
          {items.slice(0, 3).map((item, index) => (
            <li key={index} className="text-sm text-gray-700">
              {item[keyProperty] || "Unnamed item"}
            </li>
          ))}
          {items.length > 3 && (
            <li className="text-sm italic text-gray-500">
              ...and {items.length - 3} more
            </li>
          )}
        </ul>
      </div>
    );
  };

  // Helper function to render object data
  const renderObjectSection = (title: string, data: Record<string, any> = {}) => {
    if (!data || Object.keys(data).length === 0) return null;
    
    return (
      <div className="mb-4">
        <h4 className="text-md font-semibold text-gray-800">{title}</h4>
        <ul className="mt-1 list-inside">
          {Object.entries(data).map(([key, value]) => {
            if (!value) return null;
            
            return (
              <li key={key} className="text-sm text-gray-700">
                <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  // Render the image gallery
  const renderImageGallery = () => {
    if (galleryItems.length === 0) {
      return (
        <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-teal-700">Your Media Gallery</h3>
          <p className="py-8 text-center text-sm text-gray-600">
            No images have been uploaded to your profile yet.
          </p>
        </div>
      );
    }
    
    return (
      <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-teal-700">Your Media Gallery</h3>
        <p className="mb-4 text-sm text-gray-600">All images you`ve uploaded across different sections of your profile.</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
              <div className="relative h-48 w-full overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="size-full object-contain"
                />
                {item.type === "Header" && (
                  <div className="absolute left-0 top-0 rounded-br-md bg-teal-600 px-2 py-1 text-xs text-white">
                    Profile Header
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                  <span className="inline-block rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs italic text-gray-600">
                  {item.intent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render profile header image section
  // const renderProfileHeader = () => {
  //   if (!profileData.profileHeaderImage) return null;
    
  //   return (
  //     <div className="relative mb-6 overflow-hidden rounded-lg">
  //       <div className="relative h-40 w-full md:h-48">
  //         <Image
  //           src={profileData.profileHeaderImage}
  //           alt="Profile Header"
  //           width={1200}
  //           height={300}
  //           className="size-full rounded-lg object-cover"
  //         />
  //         <div className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-xs shadow-sm">
  //           Profile Header Image
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-50 to-teal-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Your Profile Summary 🎉
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Thank you for completing your profile! Below is a summary of all the information you`ve provided.
          Your personalized portfolio is now ready to be generated.
        </p>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="size-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600"></div>
          </div>
        ) : (
          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            {/* Profile Header Image */}
            {/* {renderProfileHeader()} */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-teal-700">Personal Information</h3>
                {profileData.personalInfo && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">Basic Details</h4>
                    <ul className="mt-1 list-inside">
                      {profileData.personalInfo.fullName && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">Name:</span> {profileData.personalInfo.fullName}
                        </li>
                      )}
                      {profileData.personalInfo.username && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">Username:</span> {profileData.personalInfo.username}
                        </li>
                      )}
                      {profileData.personalInfo.tagline && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">Tagline:</span> {profileData.personalInfo.tagline}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {/* Position information */}
                {(profileData.industryPreference || profileData.secondaryPreference) && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">Position</h4>
                    <ul className="mt-1 list-inside">
                      {profileData.industryPreference && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">Type:</span> {profileData.industryPreference}
                        </li>
                      )}
                      {profileData.secondaryPreference && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">Role:</span> {profileData.secondaryPreference}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {profileData.theme && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">Theme Preference</h4>
                    <p className="text-sm text-gray-700">{profileData.theme}</p>
                  </div>
                )}
                {/* Contact Information */}
                {profileData.contactInfo && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">Contact Information</h4>
                    <ul className="mt-1 list-inside">
                      {profileData.contactInfo.email && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">Email:</span> {profileData.contactInfo.email}
                        </li>
                      )}
                      {profileData.contactInfo.phone && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">Phone:</span> {profileData.contactInfo.countryDialCode} {profileData.contactInfo.phone}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {/* Location Information */}
                {profileData.locationInfo && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">Location</h4>
                    <ul className="mt-1 list-inside">
                      {profileData.locationInfo.city && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">City:</span> {profileData.locationInfo.city}
                        </li>
                      )}
                      {profileData.locationInfo.state && (
                        <li className="text-sm text-gray-700">
                          <span className="font-medium">State:</span> {profileData.locationInfo.state}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {/* Social Profiles */}
                {profileData.socialProfiles && Object.keys(profileData.socialProfiles).length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">Social Profiles</h4>
                    <ul className="mt-1 list-inside">
                      {Object.entries(profileData.socialProfiles).map(([platform, url]) => {
                        if (!url) return null;
                        
return (
  <li key={platform} className="text-sm text-gray-700">
    <span className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}:</span> {url}
  </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              {/* Professional Information */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-teal-700">Professional Information</h3>
                {renderArraySection("Work Experience", profileData.experiences, "company")}
                {renderArraySection("Education", profileData.education, "school")}
                {renderArraySection("Skills", profileData.skills, "name")}
                {renderArraySection("Licenses", profileData.licenses, "title")}
                {renderArraySection("Certifications", profileData.certifications, "title")}
              </div>
              {/* Additional Sections */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-teal-700">Additional Information</h3>
                {renderArraySection("Projects", profileData.projects, "title")}
                {renderArraySection("Featured Content", profileData.featuredItems, "title")}
                {renderArraySection("Honors & Awards", profileData.honorsAwards, "title")}
                {renderArraySection("Test Scores", profileData.testScores, "title")}
              </div>
              {/* Community & Business */}
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-teal-700">Community & Business</h3>
                {renderArraySection("Volunteer Experience", profileData.volunteerExperiences, "title")}
                {renderArraySection("Causes I Care About", profileData.causes, "title")}
                {renderArraySection("Products", profileData.products, "name")}
                {renderArraySection("Services", profileData.services, "name")}
                {renderArraySection("Recommendations", profileData.recommendations, "title")}
              </div>
            </div>
            {/* About Section */}
            {profileData.personalInfo?.about && (
              <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-bold text-teal-700">About Me</h3>
                <p className="text-sm text-gray-700">
                  {profileData.personalInfo.about.length > 300 
                    ? profileData.personalInfo.about.substring(0, 300) + "..." 
                    : profileData.personalInfo.about
                  }
                </p>
              </div>
            )}
            {/* Image Gallery Section */}
            {renderImageGallery()}
          </div>
        )}
        <p className="mb-8 text-center text-gray-600">
          You`re all set! Click `Complete` below to finalize your profile and continue to your personalized portfolio.
        </p>
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
            onClick={onComplete}
            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600"
            type="button"
          >
            Complete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSummary;