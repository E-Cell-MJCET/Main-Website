import React from 'react';
import { Trash2 } from 'lucide-react';

import type { Education } from '../../types/ProfileTypes';

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationSection({ education, onChange }: EducationSectionProps) {
  const addEducation = () => {
    onChange([
      ...education,
      { startDate: '', endDate: '', school: '', degree: '', description: '' },
    ]);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updatedEducation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-200">Education</h3>
        <button
          type="button"
          onClick={addEducation}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          Add Education
        </button>
      </div>
      {education.map((edu, index) => (
        <div key={index} className="space-y-4 rounded-lg bg-gray-800 p-4 shadow">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">School/University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ex: XYZ University"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ex: Bachelor of Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Start Date</label>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">End Date</label>
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/DD/YYYY"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Description</label>
            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe your course or achievements"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
