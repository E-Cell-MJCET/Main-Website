import React from "react";
import { Github, Instagram, Linkedin, Link } from "lucide-react";

import type { Social } from "../../types/ProfileTypes";

interface SocialSectionProps {
  social: Social;
  onChange: (social: Social) => void;
}

export function SocialSection({ social, onChange }: SocialSectionProps) {
  const updateSocial = (field: keyof Social, value: string) => {
    onChange({ ...social, [field]: value });
  };

  const inputClass =
    "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500 p-3";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-200">Social Links</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Link className="size-6" />
          <input
            type="url"
            placeholder="Custom URL"
            value={social.custom || ""}
            onChange={(e) => updateSocial("custom", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Github className="size-6" />
          <input
            type="url"
            placeholder="GitHub Profile"
            value={social.github || ""}
            onChange={(e) => updateSocial("github", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Instagram className="size-6" />
          <input
            type="url"
            placeholder="Instagram Profile"
            value={social.instagram || ""}
            onChange={(e) => updateSocial("instagram", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Linkedin className="size-6" />
          <input
            type="url"
            placeholder="LinkedIn Profile"
            value={social.linkedin || ""}
            onChange={(e) => updateSocial("linkedin", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
