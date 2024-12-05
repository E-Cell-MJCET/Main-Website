import React from 'react';
import { Trash2 } from 'lucide-react';

import type { ExtracurricularActivity } from '../../types/ProfileTypes';

interface ExtracurricularSectionProps {
  activities: ExtracurricularActivity[];
  onChange: (activities: ExtracurricularActivity[]) => void;
}

export function ExtracurricularSection({ activities, onChange }: ExtracurricularSectionProps) {
  const addActivity = () => {
    onChange([...activities, { title: '', role: '', description: '', duration: '' }]);
  };

  const removeActivity = (index: number) => {
    onChange(activities.filter((_, i) => i !== index));
  };

  const updateActivity = (index: number, field: keyof ExtracurricularActivity, value: string) => {
    const updatedActivities = activities.map((act, i) =>
      i === index ? { ...act, [field]: value } : act
    );
    onChange(updatedActivities);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-200">Extracurricular Activities</h3>
        <button
          type="button"
          onClick={addActivity}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Add Activity
        </button>
      </div>
      {activities.map((activity, index) => (
        <div key={index} className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeActivity(index)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">Activity Title</label>
              <input
                type="text"
                value={activity.title}
                onChange={(e) => updateActivity(index, 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Role</label>
              <input
                type="text"
                value={activity.role}
                onChange={(e) => updateActivity(index, 'role', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-200">Duration</label>
              <input
                type="text"
                value={activity.duration}
                onChange={(e) => updateActivity(index, 'duration', e.target.value)}
                placeholder="e.g., 2022-2023"
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Description</label>
            <textarea
              value={activity.description}
              onChange={(e) => updateActivity(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}