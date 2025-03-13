"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

// Define types for skill data
type SkillCategory = "Technical" | "Soft Skills" | "Languages" | "Tools" | "Other";
type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsOfExperience?: number;
}

const Step6Welcome = ({
  onNext,
  onPrevious,
}: {
  onNext: () => void;
  onPrevious: () => void;
}) => {
  // State for skills
  const [skills, setSkills] = useState<Skill[]>([
    { name: "", category: "Technical", proficiency: "Intermediate" }
  ]);
  
  // State for the new skill being added
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    category: "Technical",
    proficiency: "Intermediate"
  });

  const skillCategories: SkillCategory[] = ["Technical", "Soft Skills", "Languages", "Tools", "Other"];
  const proficiencyLevels: ProficiencyLevel[] = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setSkills([...skills, { ...newSkill }]);
      setNewSkill({ name: "", category: "Technical", proficiency: "Intermediate" });
    }
  };

  // Update new skill form
  const handleNewSkillChange = (field: keyof Skill, value: any) => {
    setNewSkill({ ...newSkill, [field]: value });
  };

  // Update an existing skill
  const handleSkillChange = (index: number, field: keyof Skill, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  // Remove a skill
  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Filter out empty skills
    const validSkills = skills.filter(skill => skill.name.trim() !== "");
    console.log("Skills:", validSkills);
    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Showcase Your Skills 🚀
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Add skills to your portfolio and set your proficiency level for each one.
        </p>
        {/* Skills List */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Your Skills</h3>
          {skills.length === 0 ? (
            <p className="text-center text-gray-500">No skills added yet. Add your first skill below.</p>
          ) : (
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="w-full sm:w-2/5">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                        placeholder="e.g. JavaScript, Communication, Photoshop"
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="w-full sm:w-1/5">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        value={skill.category}
                        onChange={(e) => handleSkillChange(index, "category", e.target.value as SkillCategory)}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {skillCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full sm:w-1/5">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Proficiency
                      </label>
                      <select
                        value={skill.proficiency}
                        onChange={(e) => handleSkillChange(index, "proficiency", e.target.value as ProficiencyLevel)}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        {proficiencyLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="rounded-md p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
                        aria-label="Remove skill"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  {/* Proficiency visualization */}
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs font-medium text-gray-700">
                        {skill.proficiency} Level
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {skill.proficiency === "Beginner" ? "25%" : 
                         skill.proficiency === "Intermediate" ? "50%" :
                         skill.proficiency === "Advanced" ? "75%" : "100%"}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div 
                        className={`h-2 rounded-full bg-indigo-600`}
                        style={{ 
                          width: skill.proficiency === "Beginner" ? "25%" : 
                                 skill.proficiency === "Intermediate" ? "50%" :
                                 skill.proficiency === "Advanced" ? "75%" : "100%" 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Add New Skill */}
        <div className="mb-8 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
          <h3 className="mb-4 text-lg font-medium text-gray-800">Add a New Skill</h3>
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-2/5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => handleNewSkillChange("name", e.target.value)}
                placeholder="Enter skill name"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={newSkill.category}
                onChange={(e) => handleNewSkillChange("category", e.target.value as SkillCategory)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                {skillCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Proficiency
              </label>
              <select
                value={newSkill.proficiency}
                onChange={(e) => handleNewSkillChange("proficiency", e.target.value as ProficiencyLevel)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!newSkill.name.trim()}
            className={`mt-4 flex items-center rounded-md px-4 py-2 font-medium text-white ${
              !newSkill.name.trim() ? "cursor-not-allowed bg-gray-300" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <Plus size={18} className="mr-2" />
            Add Skill
          </button>
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
            disabled={skills.filter(skill => skill.name.trim() !== "").length === 0}
            className={`rounded-lg px-6 py-3 font-semibold text-white transition ${
              skills.filter(skill => skill.name.trim() !== "").length === 0
                ? "cursor-not-allowed bg-gray-300"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step6Welcome;