"use client";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  onEditExperience: (id: string) => void;
  onDeleteExperience: (id: string) => void;
  onAddExperience: () => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onEditExperience,
  onDeleteExperience,
  onAddExperience,
}) => {
  // Group experiences by company
  const groupedExperiences = experiences.reduce((acc, exp) => {
    if (!acc[exp.company]) {
      acc[exp.company] = [];
    }
    acc[exp.company].push(exp);
    
return acc;
  }, {} as Record<string, Experience[]>);

  return (
    <motion.div 
      className="rounded-xl border-l-4 border-indigo-500 bg-gray-800 p-6 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="text-2xl font-semibold text-gray-100">Experience</h3>
      <button
        onClick={onAddExperience}
        className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white"
      >
        Add Experience
      </button>
      {Object.entries(groupedExperiences).map(([company, experiences]) => (
        <div key={company} className="mt-6">
          <h4 className="text-xl font-semibold text-gray-200">{company}</h4>
          {experiences.map((exp) => (
            <motion.div 
              key={exp.id} 
              className="mt-4 rounded-xl bg-gray-700 p-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-gray-300">{exp.jobTitle}</h5>
                  <p className="text-gray-500">
                    {exp.startDate} - {exp.endDate === "Present" ? "Present" : exp.endDate}
                  </p>
                  <p className="mt-2 text-gray-400">{exp.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => onEditExperience(exp.id)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteExperience(exp.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default ExperienceSection;