import React from 'react';
import { Trash2 } from 'lucide-react';

import type { Achievement } from '../../types/ProfileTypes';

interface AchievementsSectionProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export function AchievementsSection({ achievements, onChange }: AchievementsSectionProps) {
  const addAchievement = () => {
    onChange([...achievements, { title: '', description: '' }]);
  };

  const removeAchievement = (index: number) => {
    onChange(achievements.filter((_, i) => i !== index));
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = achievements.map((ach, i) =>
      i === index ? { ...ach, [field]: value } : ach
    );
    onChange(updatedAchievements);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-200">Achievements</h3>
        <button
          type="button"
          onClick={addAchievement}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          Add Achievement
        </button>
      </div>
      {achievements.map((achievement, index) => (
        <div key={index} className="space-y-4 rounded-lg bg-gray-800 p-4 shadow">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => removeAchievement(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Title</label>
            <input
              type="text"
              value={achievement.title}
              onChange={(e) => updateAchievement(index, 'title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Best Research Paper"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Description</label>
            <textarea
              value={achievement.description}
              onChange={(e) => updateAchievement(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe the achievement"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
