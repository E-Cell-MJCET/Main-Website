import React from "react";
import { Trash2 } from "lucide-react";

import type { Project } from "../../types/ProfileTypes";

interface ProjectsSectionProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsSection({ projects, onChange }: ProjectsSectionProps) {
  const addProject = () => {
    onChange([...projects, { title: "", description: "", year: "" }]);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updatedProjects = projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    onChange(updatedProjects);
  };

  const inputClass =
    "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500 p-3";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-200">Projects</h3>
        <button
          type="button"
          onClick={addProject}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>
      {projects.map((project, index) => (
        <div
          key={index}
          className="space-y-4 rounded-lg bg-gray-800 p-4 shadow"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-200">
                Title
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(index, "title", e.target.value)}
                className={inputClass}
                placeholder="Ex: Portfolio Website"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Year
              </label>
              <input
                type="text"
                value={project.year}
                onChange={(e) => updateProject(index, "year", e.target.value)}
                className={inputClass}
                placeholder="Ex: 2023"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                updateProject(index, "description", e.target.value)
              }
              rows={3}
              className={inputClass}
              placeholder="Describe the project"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
