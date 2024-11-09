"use client";
import { useState } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";
import Link from "next/link"; // Importing Link component

// Interfaces for data structure
interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  description: string;
}

interface User {
  id: string;
  name: string;
  profilePicture: string;
  jobTitle: string;
  location: string;
  bio: string;
  badges: string[];
  experience: Experience[];
  education: Education[];
  socialMedia: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

export default function Page() {
  const initialUserData: User = {
    id: "123",
    name: "Adnan",
    profilePicture: "/assets/Trial.jpg",
    jobTitle: "Software Engineer",
    location: "Hyderabad, India",
    bio: "I just build something amazing!",
    badges: ["Verified", "Technical Execom"],
    experience: [
      {
        id: "1",
        jobTitle: "Senior Software Engineer",
        company: "E-Cell",
        duration: "2024 - Present",
        description: "Working with NextJS 15 is 😭.",
      },
      {
        id: "2",
        jobTitle: "Founder, CEO",
        company: "Electroplix",
        duration: "2024 - Present",
        description: "Developed full-stack applications with React, Express, and PostgreSQL.",
      },
    ],
    education: [
      {
        id: "1",
        degree: "B.E in CSE",
        school: "MJCET",
        year: "2024",
        description: "Focused on software engineering, algorithms, and machine learning.",
      },
    ],
    socialMedia: {
      github: "https://github.com/Adnan00786",
      linkedin: "https://linkedin.com/in/syedadnanali99",
      instagram: "https://instagram.com/yourinstagram",
      website: "https://electroplix.com",
    },
  };

  const [user, setUser] = useState<User>(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<User>(initialUserData);

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditedData(user); // Set initial values for editing
  };

  // Handle input changes for editable fields
  const handleChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  // Save changes
  const handleSave = () => {
    setUser(editedData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-3">
        
        {/* Left Section */}
        <div className="col-span-1 h-fit rounded-xl bg-gray-800 p-6 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="relative mb-4 size-32">
              <Image
                src={user.profilePicture || "/default-profile.png"}
                alt="Profile Picture"
                layout="fill"
                className="rounded-full border-4 border-indigo-600 object-cover"
              />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="rounded-md bg-gray-700 p-2 text-center text-gray-100"
              />
            ) : (
              <h1 className="text-2xl font-semibold text-gray-100">{user.name}</h1>
            )}
            <h2 className="text-lg text-gray-300">{user.jobTitle}</h2>
            <div className="mt-2 flex space-x-2">
              {user.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-indigo-500 px-3 py-1 text-xs text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
            
            {/* Social Media Links */}
            <div className="mt-4 w-full space-y-4">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedData.socialMedia.github}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        socialMedia: { ...editedData.socialMedia, github: e.target.value },
                      })
                    }
                    placeholder="GitHub URL"
                    className="w-full rounded-md bg-gray-700 p-2 text-gray-300"
                  />
                  <input
                    type="text"
                    value={editedData.socialMedia.linkedin}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        socialMedia: { ...editedData.socialMedia, linkedin: e.target.value },
                      })
                    }
                    placeholder="LinkedIn URL"
                    className="w-full rounded-md bg-gray-700 p-2 text-gray-300"
                  />
                  <input
                    type="text"
                    value={editedData.socialMedia.instagram}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        socialMedia: { ...editedData.socialMedia, instagram: e.target.value },
                      })
                    }
                    placeholder="Instagram URL"
                    className="w-full rounded-md bg-gray-700 p-2 text-gray-300"
                  />
                  <input
                    type="text"
                    value={editedData.socialMedia.website}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        socialMedia: { ...editedData.socialMedia, website: e.target.value },
                      })
                    }
                    placeholder="Website URL"
                    className="w-full rounded-md bg-gray-700 p-2 text-gray-300"
                  />
                </>
              ) : (
                <>
                  {user.socialMedia.github && (
                    <div className="flex items-center space-x-2">
                      <FaGithub className="size-6 text-gray-300" />
                      <Link href={user.socialMedia.github} target="_blank" className="text-gray-300 hover:text-white">
                        GitHub
                      </Link>
                    </div>
                  )}
                  {user.socialMedia.linkedin && (
                    <div className="flex items-center space-x-2">
                      <FaLinkedin className="size-6 text-gray-300" />
                      <Link href={user.socialMedia.linkedin} target="_blank" className="text-gray-300 hover:text-white">
                        LinkedIn
                      </Link>
                    </div>
                  )}
                  {user.socialMedia.instagram && (
                    <div className="flex items-center space-x-2">
                      <FaInstagram className="size-6 text-gray-300" />
                      <Link href={user.socialMedia.instagram} target="_blank" className="text-gray-300 hover:text-white">
                        Instagram
                      </Link>
                    </div>
                  )}
                  {user.socialMedia.website && (
                    <div className="flex items-center space-x-2">
                      <FaGlobe className="size-6 text-gray-300" />
                      <Link href={user.socialMedia.website} target="_blank" className="text-gray-300 hover:text-white">
                        Website
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Edit Profile Button */}
            {isEditing ? (
              <button
                className="mt-6 rounded-lg bg-green-600 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-green-500"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-indigo-500"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        {/* Right Section */}
        <div className="col-span-1 space-y-6 md:col-span-2">
          {/* About Section */}
          <div className="rounded-xl border-l-4 border-indigo-500 bg-gray-800 p-6 shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold text-gray-100">About</h3>
            {isEditing ? (
              <textarea
                value={editedData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full rounded-md bg-gray-700 p-2 text-gray-300"
              />
            ) : (
              <p className="text-gray-300">{user.bio}</p>
            )}
          </div>
          {/* Experience Section */}
          <div className="rounded-xl border-l-4 border-indigo-500 bg-gray-800 p-6 shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold text-gray-100">Experience</h3>
            {user.experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <h4 className="text-xl font-semibold text-gray-100">{exp.jobTitle}</h4>
                <p className="text-gray-300">{exp.company} | {exp.duration}</p>
                <p className="mt-2 text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
          {/* Education Section */}
          <div className="rounded-xl border-l-4 border-indigo-500 bg-gray-800 p-6 shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold text-gray-100">Education</h3>
            {user.education.map((edu) => (
              <div key={edu.id} className="mb-6">
                <h4 className="text-xl font-semibold text-gray-100">{edu.degree}</h4>
                <p className="text-gray-300">{edu.school} | {edu.year}</p>
                <p className="mt-2 text-gray-300">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
