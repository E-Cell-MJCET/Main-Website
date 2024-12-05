import React, { useState } from 'react';
import { User, Mail, Phone, FileText, Calendar, Image, Palette } from 'lucide-react';

import type { ProfileFormData } from '../../types/ProfileTypes';

import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SocialSection } from './SocialSection';
import { ProjectsSection } from './ProjectsSection';
import { AchievementsSection } from './AchievementsSection';
import { ExtracurricularSection } from './ExtracurricularSection.';

const initialFormData: ProfileFormData = {
  name: '',
  email: '',
  phoneNo: '',
  portfolio: '',
  profileUrl: '',
  experiences: [{ company: '', jobTitle: '', startDate: '', endDate: '', description: '' }],
  education: [{ startDate: '', endDate: '', school: '', degree: '', description: '' }],
  about: '',
  social: {},
  position: '',
  dob: '',
  image: null,
  theme: 'dark',
  projects: [],
  achievements: [],
  branch: '',
  year: '',
  extracurricular: [],
};

export function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const inputClass = "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500";
  const labelClass = "block text-sm font-medium text-gray-200";
  const sectionClass = "bg-gray-800 rounded-lg shadow-md p-6 space-y-6 border border-gray-700";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* Personal Information */}
      <section className={sectionClass}>
        <h2 className="text-2xl font-bold text-gray-100">Personal Information</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Required Fields */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <User className="size-5" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Mail className="size-5" />
              <span>Email *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Phone className="size-5" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNo}
              onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
              className={inputClass}
              placeholder="Ex: +91 73962 11824"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Calendar className="size-5" />
              <span>Date of Birth</span>
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <FileText className="size-5" />
              <span>Branch</span>
            </label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              className={inputClass}
              placeholder="Ex: Computer Science"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Calendar className="size-5" />
              <span>Year</span>
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className={inputClass}
              placeholder="Ex: 2024"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Image alt="" className="size-5"/>
              <span>Profile Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-gray-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-200 hover:file:bg-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Palette className="size-5" />
              <span>Theme</span>
            </label>
            <select
              value={formData.theme}
              onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              className={inputClass}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>About</label>
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            rows={4}
            className={inputClass}
            placeholder="Write a brief description about yourself"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Portfolio</label>
          <input
            type="text"
            value={formData.portfolio}
            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
            className={inputClass}
            placeholder="Ex: Editorial and Research"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Profile URL *</label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">ecellmjcet.com/profile/</span>
            <input
              type="text"
              value={formData.profileUrl}
              onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
              className={inputClass}
              required
              placeholder="username"
            />
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section className={sectionClass}>
        <ExperienceSection
          experiences={formData.experiences}
          onChange={(experiences) => setFormData({ ...formData, experiences })}
        />
      </section>
      {/* Education Section */}
      <section className={sectionClass}>
        <EducationSection
          education={formData.education}
          onChange={(education) => setFormData({ ...formData, education })}
        />
      </section>
      {/* Social Links */}
      <section className={sectionClass}>
        <SocialSection
          social={formData.social}
          onChange={(social) => setFormData({ ...formData, social })}
        />
      </section>
      {/* Projects */}
      <section className={sectionClass}>
        <ProjectsSection
          projects={formData.projects}
          onChange={(projects) => setFormData({ ...formData, projects })}
        />
      </section>
      {/* Achievements */}
      <section className={sectionClass}>
        <AchievementsSection
          achievements={formData.achievements}
          onChange={(achievements) => setFormData({ ...formData, achievements })}
        />
      </section>
      {/* Extracurricular Activities */}
      <section className={sectionClass}>
        <ExtracurricularSection
          activities={formData.extracurricular}
          onChange={(extracurricular: any) => setFormData({ ...formData, extracurricular })}
        />
      </section>
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}
