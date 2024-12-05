import React from 'react';
import { Github, Instagram, Linkedin, Link } from 'lucide-react';

import type { Social } from '../../types/ProfileTypes';

interface SocialSectionProps {
  social: Social;
  onChange: (social: Social) => void;
}

export function SocialSection({ social, onChange }: SocialSectionProps) {
  const updateSocial = (field: keyof Social, value: string) => {
    onChange({ ...social, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-200">Social Links</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Link className="size-6" />
          <input
            type="url"
            placeholder="Custom URL"
            value={social.custom || ''}
            onChange={(e) => updateSocial('custom', e.target.value)}
            className="flex-1 rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Github className="size-6" />
          <input
            type="url"
            placeholder="GitHub Profile"
            value={social.github || ''}
            onChange={(e) => updateSocial('github', e.target.value)}
            className="flex-1 rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Instagram className="size-6" />
          <input
            type="url"
            placeholder="Instagram Profile"
            value={social.instagram || ''}
            onChange={(e) => updateSocial('instagram', e.target.value)}
            className="flex-1 rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Linkedin className="size-6" />
          <input
            type="url"
            placeholder="LinkedIn Profile"
            value={social.linkedin || ''}
            onChange={(e) => updateSocial('linkedin', e.target.value)}
            className="flex-1 rounded-md border-gray-300 bg-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
