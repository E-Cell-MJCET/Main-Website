"use client";
import { useState } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe, FaEdit, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

// Interfaces for data structure
interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
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
        startDate: "2024-01-01",
        endDate: "Present",
        description: "Working with NextJS 15 is 😭.",
      },
      {
        id: "2",
        jobTitle: "Founder, CEO",
        company: "Electroplix",
        startDate: "2024-01-01",
        endDate: "Present",
        description: "Developed full-stack applications with React, Express, and PostgreSQL.",
      },
      {
        id: "3",
        jobTitle: "Software Engineer",
        company: "E-Cell",
        startDate: "2023-01-01",
        endDate: "2024-01-01",
        description: "Worked on various internal projects.",
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: "",
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);

  // Toggle edit mode for profile
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditedData(user); // Set initial values for editing
  };

  // Handle input changes for editable fields
  const handleChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  // Save changes to profile
  const handleSave = () => {
    setUser(editedData);
    setIsEditing(false);
  };

  // Handle experience popup to add new experience
  const handleAddExperience = () => {
    setIsPopupOpen(true);
    setEditingExperienceId(null); 
    setNewExperience({
      id: "",
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsCurrentlyWorking(false); 
  };

  // Handle closing of experience popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Handle changes in experience form fields
  const handleExperienceChange = (field: string, value: string) => {
    setNewExperience({ ...newExperience, [field]: value });
  };

  // Save the new experience (whether adding or editing)
  const handleSaveExperience = () => {
    if (editingExperienceId) {
      const updatedExperience = user.experience.map((exp) =>
        exp.id === editingExperienceId
          ? { ...exp, ...newExperience, endDate: isCurrentlyWorking ? "Present" : newExperience.endDate }
          : exp
      );
      setUser({ ...user, experience: updatedExperience });
    } else {
      const newExp = { ...newExperience, id: Date.now().toString(), endDate: isCurrentlyWorking ? "Present" : newExperience.endDate };
      setUser({ ...user, experience: [newExp, ...user.experience] });
    }

    setIsPopupOpen(false);
    setNewExperience({
      id: "",
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsCurrentlyWorking(false);
    setEditingExperienceId(null);
  };

  // Handle edit icon click for an existing experience
  const handleEditExperience = (id: string) => {
    const experienceToEdit = user.experience.find((exp) => exp.id === id);
    if (experienceToEdit) {
      setEditingExperienceId(id);
      setNewExperience(experienceToEdit);
      setIsCurrentlyWorking(experienceToEdit.endDate === "Present");
      setIsPopupOpen(true);
    }
  };

  // Handle delete experience action
  const handleDeleteExperience = (id: string) => {
    setUser({ ...user, experience: user.experience.filter((exp) => exp.id !== id) });
  };

  // Group experiences by company
  const groupedExperiences = user.experience.reduce((acc, exp) => {
    if (!acc[exp.company]) {
      acc[exp.company] = [];
    }
    acc[exp.company].push(exp);
    
    return acc;
  }, {} as Record<string, Experience[]>);

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
              <div className="flex justify-center gap-4">
                {user.socialMedia.github && (
                  <Link href={user.socialMedia.github} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                    <FaGithub size={24} />
                  </Link>
                )}
                {user.socialMedia.linkedin && (
                  <Link href={user.socialMedia.linkedin} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                    <FaLinkedin size={24} />
                  </Link>
                )}
                {user.socialMedia.instagram && (
                  <Link href={user.socialMedia.instagram} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                    <FaInstagram size={24} />
                  </Link>
                )}
                {user.socialMedia.website && (
                  <Link href={user.socialMedia.website} target="_blank" className="text-indigo-500 hover:text-indigo-400">
                    <FaGlobe size={24} />
                  </Link>
                )}
              </div>
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
            <h3 className="text-2xl font-semibold text-gray-100">About</h3>
            {isEditing ? (
              <textarea
                value={editedData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="mt-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
              />
            ) : (
              <p className="mt-4 text-gray-300">{user.bio}</p>
            )}
          </div>
          {/* Grouped Experience Section */}
          <div className="rounded-xl border-l-4 border-indigo-500 bg-gray-800 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-100">Experience</h3>
            <button
              onClick={handleAddExperience}
              className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white"
            >
              Add Experience
            </button>
            {Object.entries(groupedExperiences).map(([company, experiences]) => (
              <div key={company} className="mt-6">
                <h4 className="text-xl font-semibold text-gray-200">{company}</h4>
                {experiences.map((exp) => (
                  <div key={exp.id} className="mt-4 p-4 bg-gray-700 rounded-xl">
                    <div className="flex justify-between items-start space-x-4">
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-gray-300">{exp.jobTitle}</h5>
                        <p className="text-gray-500">
                          {exp.startDate} - {exp.endDate === "Present" ? "Present" : exp.endDate}
                        </p>
                        <p className="mt-2 text-gray-400">{exp.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <button
                          onClick={() => handleEditExperience(exp.id)}
                          className="text-yellow-400 hover:text-yellow-300"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Education Section */}
          <div className="rounded-xl border-l-4 border-indigo-500 bg-gray-800 p-6 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-100">Education</h3>
            {user.education.map((edu) => (
              <div key={edu.id} className="mt-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-200">{edu.degree}</h4>
                    <p className="text-gray-300">{edu.school}</p>
                    <p className="text-gray-500">{edu.year}</p>
                    <p className="mt-2 text-gray-400">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Experience Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-xl bg-gray-800 p-6">
            <h3 className="mb-4 text-2xl font-semibold text-gray-100">
              {editingExperienceId ? "Edit Experience" : "Add Experience"}
            </h3>
            <input
              type="text"
              placeholder="Job Title"
              value={newExperience.jobTitle}
              onChange={(e) => handleExperienceChange("jobTitle", e.target.value)}
              className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
            />
            <input
              type="text"
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) => handleExperienceChange("company", e.target.value)}
              className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
            />
            <input
              type="date"
              value={newExperience.startDate}
              onChange={(e) => handleExperienceChange("startDate", e.target.value)}
              className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
            />
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={isCurrentlyWorking}
                onChange={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
                className="mr-2"
              />
              <label className="text-gray-300">Currently working in this role</label>
            </div>
            {!isCurrentlyWorking && (
              <input
                type="date"
                value={newExperience.endDate}
                onChange={(e) => handleExperienceChange("endDate", e.target.value)}
                className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
              />
            )}
            {isCurrentlyWorking && (
              <div className="mb-4 text-gray-300">End Date: Present</div>
            )}
            <textarea
              placeholder="Description"
              value={newExperience.description}
              onChange={(e) => handleExperienceChange("description", e.target.value)}
              className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
            />
            <div className="flex justify-between">
              <button
                onClick={handleClosePopup}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                className="rounded-lg bg-green-600 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
