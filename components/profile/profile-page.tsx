"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import ExperienceSection from "./ExperienceSection";
import AboutSection from "./AboutSection";
import EducationSection from "./EducationSection";
import LeftSection from "./LeftSection";

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
interface UserType {
    roll_no: string;
    created_at: any;
    name: string;
    email: string;
    phone_no: number;
    experience: Experience[];
    about: string;
    social: {
        github?: string;
        linkedin?: string;
        instagram?: string;
        website?: string;
      };
    portfolio: string;
    position: string;
    dob: any;
    image: string;
    theme: string;
    education: Education[];
    branch: string;
    year: number;
    slur: string;
  }

function CompletePage({userData}:{userData:UserType}) {
  const [user, setUser] = useState<UserType>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: "",
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  useEffect(()=>{
    console.log("user data complete page: ",userData)
    if (userData){
        setUser(userData);
    }
    else{
        console.error("user not found");
    }
  },[userData])

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
    if (editedData) {
      setUser(editedData);
      setIsEditing(false);
    }
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
      const updatedExperience = user?.experience.map((exp) =>
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
    const experienceToEdit = user?.experience.find((exp) => exp.id === id);
    if (experienceToEdit) {
      setEditingExperienceId(id);
      setNewExperience(experienceToEdit);
      setIsCurrentlyWorking(experienceToEdit.endDate === "Present");
      setIsPopupOpen(true);
    }
  };

  // Handle delete experience action
  const handleDeleteExperience = (id: string) => {
    setUser({ ...user, experience: user?.experience.filter((exp) => exp.id !== id) });
  };

  return (
    <div>
      {!user ? (<div>Loading...</div>) : ( <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4 md:grid-cols-3">
          {/* Left Section */}
          <LeftSection
        user={user}
        isEditing={isEditing}
        onEditClick={handleEditClick}
        editedData={editedData}
        handleChange={handleChange}
      />
          {/* Right Section */}
          <div className="col-span-1 space-y-6 md:col-span-2">
            {/* About Section */}
            <AboutSection
          user={user}
          isEditing={isEditing}
          onEditClick={handleEditClick}
          editedData={editedData}
          handleChange={handleChange}
        />
            <ExperienceSection
          experiences={user?.experience}
          onAddExperience={handleAddExperience}
          onEditExperience={handleEditExperience}
          onDeleteExperience={handleDeleteExperience}
        />
            <EducationSection user={user?.education} />
          </div>
        </div>
        {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
          className="w-full max-w-md rounded-xl bg-gray-800 p-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
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
          </motion.div>
        </div>
    )}
      </div>)}
    </div>
  )
}

export default CompletePage
