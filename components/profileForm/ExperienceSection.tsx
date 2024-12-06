import React from "react";
import { Trash2 } from "lucide-react";

import type { Experience } from "../../types/ProfileTypes";

interface ExperienceSectionProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceSection({
  experiences,
  onChange,
}: ExperienceSectionProps) {
  const addExperience = () => {
    onChange([
      ...experiences,
      {
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updatedExperiences);
  };
  const inputClass =
    "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500 p-3";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-200">Experience</h3>
        <button
          type="button"
          onClick={addExperience}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          Add Experience
        </button>
      </div>
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="space-y-4 rounded-lg bg-gray-800 p-4 shadow"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                placeholder="Enter company name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Job Title
              </label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) =>
                  updateExperience(index, "jobTitle", e.target.value)
                }
                placeholder="Enter job title"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Start Date
              </label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) =>
                  updateExperience(index, "startDate", e.target.value)
                }
                placeholder="DD/MM/YYYY"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                End Date
              </label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) =>
                  updateExperience(index, "endDate", e.target.value)
                }
                placeholder="DD/MM/YYYY / Present"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              rows={3}
              placeholder="Enter a brief description of your role and responsibilities"
              className={inputClass}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
