"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperiencePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: Experience) => void;
  experienceData?: Experience;
}

const ExperiencePopup: React.FC<ExperiencePopupProps> = ({
  isOpen,
  onClose,
  onSave,
  experienceData,
}) => {
  const [jobTitle, setJobTitle] = useState(experienceData?.jobTitle || "");
  const [company, setCompany] = useState(experienceData?.company || "");
  const [startDate, setStartDate] = useState(experienceData?.startDate || "");
  const [endDate, setEndDate] = useState(experienceData?.endDate || "");
  const [description, setDescription] = useState(
    experienceData?.description || ""
  );
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(
    experienceData?.endDate === "Present"
  );

  const handleSave = () => {
    const newExperience = {
      id: experienceData ? experienceData.id : Date.now().toString(),
      jobTitle,
      company,
      startDate,
      endDate: isCurrentlyWorking ? "Present" : endDate,
      description,
    };
    onSave(newExperience);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity/50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div
        className="w-full max-w-md rounded-xl bg-gray-800 p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-4 text-2xl font-semibold text-gray-100">
          {experienceData ? "Edit Experience" : "Add Experience"}
        </h3>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
        />
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isCurrentlyWorking}
            onChange={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
            className="mr-2"
          />
          <label className="text-gray-300">
            Currently working in this role
          </label>
        </div>
        {!isCurrentlyWorking && (
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
          />
        )}
        {isCurrentlyWorking && (
          <div className="mb-4 text-gray-300">End Date: Present</div>
        )}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4 w-full rounded-md bg-gray-700 p-2 text-gray-100"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-green-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperiencePopup;
